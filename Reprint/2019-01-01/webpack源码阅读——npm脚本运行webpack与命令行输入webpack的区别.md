---
title: 'webpack源码阅读——npm脚本运行webpack与命令行输入webpack的区别' 
date: 2019-01-01 2:30:07
hidden: true
slug: r8ypvk494kd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文地址：<a href="http://www.monster1935.com/2017/09/07/webpack%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB-npm%E8%84%9A%E6%9C%AC%E6%89%A7%E8%A1%8Cwebpack%E4%B8%8E%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%BE%93%E5%85%A5webpack%E6%89%A7%E8%A1%8C%E7%9A%84%E5%8C%BA%E5%88%AB/" rel="nofollow noreferrer" target="_blank">webpack源码阅读——npm脚本执行webpack与命令行输入webpack执行的区别</a><br>如有错误，欢迎指正！</blockquote>
<p>webpack是目前被大家广为使用的模块打包器。从命令行输入webpack或者在package.json的npm scripts中配置webpack脚本都可以使用webpack。虽然效果是一样的，但是两者有区别吗？最近在阅读源码的过程中发现了这个事情，原来两者是有区别的。</p>
<h3 id="articleHeader0">webpack安装</h3>
<p>webpack的安装分为全局安装和本地安装。</p>
<p><strong>全局安装</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack -g " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> webpack -g </code></pre>
<p><strong>本地安装</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p><strong>全局安装与本地安装的区别</strong></p>
<ol>
<li>安装时参数不同，全局安装需要添加 <code>-g </code> 参数</li>
<li>
<p>安装后生成的目录不同</p>
<ul>
<li>全局安装会在系统npm的根路径下生成node_modules目录，并在根路径下生成对应的.cmd 脚本文件用于启动webpack</li>
<li>本地安装会在运行npm install 命令的目录下生成node_modules目录，并在node_modules 目录下生成.bin文件夹，里面存放了对应的.cmd脚本文件用于启动webpack</li>
</ul>
</li>
<li>
<p>使用方式不同</p>
<ul><li>全局安装后可以直接在命令行输入webpack命令，使用webpack。否则在命令行输入webpack的情况下，会提示 <code> command not found </code>
</li></ul>
</li>
</ol>
<h3 id="articleHeader1">命令行直接输入webpack的方式</h3>
<p>这种方式使用webpack，必须全局安装webpack，在全局安装了webpack的情况下，命令行输入webpack并敲下回车时，系统会去npm全局根路径下寻找webpack.cmd命令（windows系统下），如何查看当前npm的全局安装目录？ 输入以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm root -g " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> root -g </code></pre>
<p>以windows为例，笔者的路径是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Users\（登录用户名）\AppData\Roaming\npm\node_modules
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\（</span>登录用户名）<span class="hljs-symbol">\A</span>ppData<span class="hljs-symbol">\R</span>oaming<span class="hljs-symbol">\n</span>pm<span class="hljs-symbol">\n</span>ode_modules
</code></pre>
<p>其中node_modules下存放了全局安装的一些npm包，npm文件夹下还存在了对应的webpack.cmd文件用于启动webpack</p>
<p>webpack.cmd</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@IF EXIST &quot;%~dp0\node.exe&quot; (
  &quot;%~dp0\node.exe&quot;  &quot;%~dp0\node_modules\webpack\bin\webpack.js&quot; %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  &quot;%~dp0\node_modules\webpack\bin\webpack.js&quot; %*
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@IF</span> EXIST <span class="hljs-string">"%~dp0\node.exe"</span> (
  <span class="hljs-string">"%~dp0\node.exe"</span>  <span class="hljs-string">"%~dp0\node_modules\webpack\bin\webpack.js"</span> %*
) ELSE (
  <span class="hljs-variable">@SETLOCAL</span>
  <span class="hljs-variable">@SET</span> PATHEXT=%<span class="hljs-attribute">PATHEXT</span>:;.JS;=;%
  node  <span class="hljs-string">"%~dp0\node_modules\webpack\bin\webpack.js"</span> %*
)</code></pre>
<p>这段脚本的意思就是使用当前目录下的node去运行node_modules/webpack/bin/webpack.js,如果当前目录不存在node.exe则使用全局的node去运行。</p>
<h3 id="articleHeader2">npm scripts配置npm脚本运行webpack的方式</h3>
<p>如下所示</p>
<p>package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
scripts: {
    &quot;build&quot;: &quot;webpack&quot;
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>...
scripts: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>
}
...</code></pre>
<p>在package.json中定义了启动webpack的npm脚本，使用<code>npm run build</code>命令即可使用webpack进行构建。</p>
<p>关于执行<code>npm run ***</code>的原理可以参考阮老的教程<a href="http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html" rel="nofollow noreferrer" target="_blank">npm scripts使用指南</a>中的原理部分。</p>
<p>执行<code>npm run build</code>时, 会执行webpack命令，此时系统去<strong>当前目录而非全局npm目录</strong>寻找webpack.cmd文件并执行。其中webpack.cmd文件中定义了需要执行的webpack的目录，也就是在当前目录下寻找webpack/bin/webpack.js。如下：</p>
<p>webpack.cmd</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@IF EXIST &quot;%~dp0\node.exe&quot; (
  &quot;%~dp0\node.exe&quot;  &quot;%~dp0\..\webpack\bin\webpack.js&quot; %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  &quot;%~dp0\..\webpack\bin\webpack.js&quot; %*
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@IF</span> EXIST <span class="hljs-string">"%~dp0\node.exe"</span> (
  <span class="hljs-string">"%~dp0\node.exe"</span>  <span class="hljs-string">"%~dp0\..\webpack\bin\webpack.js"</span> %*
) ELSE (
  <span class="hljs-variable">@SETLOCAL</span>
  <span class="hljs-variable">@SET</span> PATHEXT=%<span class="hljs-attribute">PATHEXT</span>:;.JS;=;%
  node  <span class="hljs-string">"%~dp0\..\webpack\bin\webpack.js"</span> %*
)</code></pre>
<h3 id="articleHeader3">全局版本和本地版本都安装的情况下，使用的究竟是全局的webpack还是本地的webpack</h3>
<p>如题，我们还是从两种方式使用webpack的情况下进行分析。</p>
<p>前提：全局以及本地都安装了webpack</p>
<p><strong>命令行直接输入webpack的方式</strong></p>
<p>这种方式运行的是全局的node_modules/webpack/bin/webpack.js,其中在webpack.js的开始有以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Local version replace global one
try {
    var localWebpack = require.resolve(path.join(process.cwd(), &quot;node_modules&quot;, &quot;webpack&quot;, &quot;bin&quot;, &quot;webpack.js&quot;));
    if(__filename !== localWebpack) {
        return require(localWebpack);
    }
} catch(e) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// Local version replace global one</span>
<span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">var</span> localWebpack = <span class="hljs-built_in">require</span>.resolve(path.join(process.cwd(), <span class="hljs-string">"node_modules"</span>, <span class="hljs-string">"webpack"</span>, <span class="hljs-string">"bin"</span>, <span class="hljs-string">"webpack.js"</span>));
    <span class="hljs-keyword">if</span>(__filename !== localWebpack) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(localWebpack);
    }
} <span class="hljs-keyword">catch</span>(e) {}</code></pre>
<p>这段代码判断了当前的文件路径与node进程运行时所在的路径下的node_modules/webpack/bin/webpack.js 是否相等，如果相等代表目前使用的就是本地的版本，如果不相等代表了当前使用的是全局版本，则直接请求本地版本。</p>
<p>结论：在全局安装以及本地都安装的情况下命令行中输入webpack，在webpack的源码逻辑中控制了直接使用本地安装的webpack。</p>
<p><strong>npm 脚本中配置webpack命令</strong></p>
<p>这种方式直接去本地node_modules/.bin去找webpack.cmd命令，然后运行本地node_modules下的webpack。</p>
<p>结论：在全局安装以及本地都安装的情况下，使用npm脚本的方式运行webpack，则直接运行的是本地版本。</p>
<p><strong>总结：在全局以及本地都安装了webpack的情况下，运行时本地安装的webpack。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack源码阅读——npm脚本运行webpack与命令行输入webpack的区别

## 原文链接
[https://segmentfault.com/a/1190000011052193](https://segmentfault.com/a/1190000011052193)

