---
title: 'puppeteer新手入门(chromium下载跳坑)' 
date: 2018-12-20 2:30:10
hidden: true
slug: erj5ndpwll9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">puppeteer简介</h1>
<p>puppeteer 翻译是操纵木偶的人，利用这个工具，我们能做一个操纵页面的人。puppeteer是一个nodejs的库，支持调用Chrome的API来操纵Web，相比较Selenium或是PhantomJs,它最大的特点就是它的操作Dom可以完全在内存中进行模拟既在V8引擎中处理而不打开浏览器，而且关键是这个是Chrome团队在维护，会拥有更好的兼容性和前景。</p>
<h1 id="articleHeader1">puppeteer功能</h1>
<ul>
<li>生成页面的截图和PDF。</li>
<li>抓取SPA并生成预先呈现的内容（即“SSR”）。</li>
<li>从网站抓取你需要的内容。</li>
<li>自动表单提交，UI测试，键盘输入等</li>
<li>创建一个最新的自动化测试环境。使用最新的JavaScript和浏览器功能，直接在最新版本的Chrome中运行测试。</li>
<li>捕获您的网站的时间线跟踪，以帮助诊断性能问题。</li>
</ul>
<h1 id="articleHeader2">puppeteer轻松入门</h1>
<h4>1. 环境和安装</h4>
<p>Puppeteer 至少需要 Node v6.4.0，如要使用 async / await，只有 Node v7.6.0 或更高版本才支持。 node下载地址： <a href="https://nodejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/zh-cn/</a></p>
<h4>2. 创建项目</h4>
<h5>2.1 创建test目录，进入目录执行npm init</h5>
<h5>2.2 安装 puppeteer</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add puppeteer 或者 npm i puppeteer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">add</span><span class="bash"> puppeteer 或者 npm i puppeteer</span></code></pre>
<p>可能会出现以下报错:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR: Failed to download Chromium r515411! Set &quot;PUPPETEER_SKIP_CHROMIUM_DOWNLOA
D&quot; env variable to skip download." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">ERROR: </span>Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOA
D" env variable to skip download.</code></pre>
<p>是因为在执行安装的过程中需要执行install.js，这里会下载Chromium,官网建议是进行跳过，我们可以执行 —ignore-scripts 忽略这个js执行。也可以通过设置环境变量set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1阻止下载 Chromium （因为封网，直接下载会失败）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save puppeteer --ignore-scripts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">npm</span> <span class="hljs-comment">i</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">save</span> <span class="hljs-comment">puppeteer</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ignore</span><span class="hljs-literal">-</span><span class="hljs-comment">scripts</span></code></pre>
<h5>2.3 手动下载Chromium</h5>
<p>下载地址：<a href="https://download-chromium.appspot.com/" rel="nofollow noreferrer" target="_blank">https://download-chromium.appspot.com/</a>  (打开蓝灯翻墙软件...)</p>
<p>把下载刚刚下载的文件解压出来会有chrome-win32文件夹，把里面的文件拷贝到项目新建的chromium文件夹中</p>
<h5>2.4 新建index.js（截图功能）, 代码如下：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://y.qq.com');
    await page.screenshot({path: 'yqq.png'});
    browser.close();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch(<span class="hljs-params"></span>);
    <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage(<span class="hljs-params"></span>);
    <span class="hljs-keyword">await</span> page.goto(<span class="hljs-params">'https:<span class="hljs-comment">//y.qq.com');</span>
    <span class="hljs-keyword">await</span> page.screenshot(<span class="hljs-params">{path: 'yqq.png'}</span>);
    browser.close(<span class="hljs-params"></span>);
}</span>)(<span class="hljs-params"></span>);</span></span></code></pre>
<p>打开cmd执行index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre>
<p>这时候可能出现以下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(node:8672) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejec
tion id: 1): AssertionError [ERR_ASSERTION]: Chromium revision is not downloaded
. Run &quot;npm install&quot;
(node:8672) [DEP0018] DeprecationWarning: Unhandled promise rejections are depre
cated. In the future, promise rejections that are not handled will terminate the
 Node.js process with a non-zero exit code." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>(<span class="hljs-keyword">node</span><span class="hljs-title">:8672</span>) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejec
tion id: <span class="hljs-number">1</span>): AssertionError [ERR_ASSERTION]: Chromium revision is not downloaded
. Run <span class="hljs-string">"npm install"</span>
(<span class="hljs-keyword">node</span><span class="hljs-title">:8672</span>) [DEP0018] DeprecationWarning: Unhandled promise rejections are depre
cated. <span class="hljs-keyword">In</span> the future, promise rejections that are not handled will terminate the
 <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span> process with a non-zero exit code.</code></pre>
<p>显示chromium 未下载错误，因为chromium默认的下载路径是在node_modules/puppeteer/.local-chromium/目录，这时候我们的chromium是在项目根目录，所以需要配置指定路径，修改index.js文件()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const puppeteer = require('puppeteer');

(async () => {
      const browser = await puppeteer.launch({
        executablePath: './chromium/chrome.exe',
        headless: false
      });
      const page = await browser.newPage();
      await page.goto('http://music.163.com/');
      await page.screenshot({path: 'music.png'});
      browser.close();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch(<span class="hljs-params">{
        executablePath: './chromium/chrome.exe',
        headless: <span class="hljs-literal">false</span>
      }</span>);
      <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage(<span class="hljs-params"></span>);
      <span class="hljs-keyword">await</span> page.goto(<span class="hljs-params">'http:<span class="hljs-comment">//music.163.com/');</span>
      <span class="hljs-keyword">await</span> page.screenshot(<span class="hljs-params">{path: 'music.png'}</span>);
      browser.close(<span class="hljs-params"></span>);
}</span>)(<span class="hljs-params"></span>);</span></span></code></pre>
<p>puppeteer launch参数说明：</p>
<ul>
<li>executablePath： 运行Chromium或Chrome可执行文件的路径</li>
<li>headless： 是否运行在浏览器headless模式，true为不打开浏览器执行，默认为true</li>
<li>timeout： 等待浏览器实例启动的最长时间（以毫秒为单位）。默认为30000（30秒）。通过0禁用超时</li>
<li>args： 传递给浏览器实例的其他参数</li>
</ul>
<p>更多参数请参照<a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser" rel="nofollow noreferrer" target="_blank">官网</a>，再次执行index.js可能出现以下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: Protocol error (Page.getFrameTree): 'Page.getFrameTree' wasn 't found undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Error: </span>Protocol error (Page.getFrameTree): 'Page.getFrameTree' wasn 't found undefined</code></pre>
<p>刚开始找了好久没找到答案，然后上万能的Google找了下，发现了类似的问题<br><span class="img-wrap"><img data-src="/img/remote/1460000012606621" src="https://static.alili.tech/img/remote/1460000012606621" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<p>可能是chromium的版本存在差异，然后重新在<a href="https://download-chromium.appspot.com/" rel="nofollow noreferrer" target="_blank">chromium官网</a>下载最新版本解压到项目（要注意下相应系统chromium）</p>
<p>执行index.js， 脚本运行chromium浏览器跳转到界面，截图保存到项目中，这样就成功了...</p>
<h5>2.5 puppeteer相关地址</h5>
<p><a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-browser" rel="nofollow noreferrer" target="_blank">puppeteer神器官方文档</a>，可以进行其他强大的功能开发...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
puppeteer新手入门(chromium下载跳坑)

## 原文链接
[https://segmentfault.com/a/1190000012606616](https://segmentfault.com/a/1190000012606616)

