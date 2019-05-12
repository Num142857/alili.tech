---
title: 'Headless Chrome 入门' 
date: 2019-01-22 2:30:07
hidden: true
slug: b473qvuu9wq
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#headless-chrome-入门"></a>Headless Chrome 入门</h1>
<h3><a href="#摘要"></a>摘要</h3>
<p>在 Chrome 59　中开始搭载 <a href="https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md">Headless Chrome</a>。这是一种在无需显示headless的环境下运行 Chrome 浏览器的方式。从本质上来说，就是不用 chrome 浏览器来运行 Chrome 的功能！它将 Chromium 和 Blink 渲染引擎提供的所有现代 Web 平台的功能都带入了命令行。</p>
<p>它有什么用？</p>
<p>无需显示headless的浏览器对于自动化测试和不需要可视化 UI 界面的服务器环境是一个很好的工具。例如，你可能需要对真实的网页运行一些测试，创建一个 PDF，或者只是检查浏览器如何呈现 URL。</p>
<blockquote>
<p><strong>注意：</strong> Mac 和 Linux 上的 Chrome 59 都可以运行无需显示模式。<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=686608">对 Windows 的支持</a>将在 Chrome 60 中提供。要检查你使用的 Chrome 版本，请在浏览器中打开 <code>chrome://version</code>。</p>
</blockquote>
<h3><a href="#开启无需显示headless模式命令行界面"></a>开启无需显示headless模式（命令行界面）</h3>
<p>开启无需显示headless模式最简单的方法是从命令行打开 Chrome 二进制文件。如果你已经安装了 Chrome 59 以上的版本，请使用 <code>--headless</code> 标志启动 Chrome：</p>
<pre><code class="hljs haml">chrome \
  -<span class="ruby">-headless \                   <span class="hljs-comment"># Runs Chrome in headless mode.</span>
</span>  -<span class="ruby">-disable-gpu \                <span class="hljs-comment"># Temporarily needed for now.</span>
</span>  -<span class="ruby">-remote-debugging-port=<span class="hljs-number">9222</span> \
</span>  https://www.chromestatus.com   # URL to open. Defaults to about:blank.

</code></pre><blockquote>
<p><strong>注意：</strong>目前你仍然需要使用 <code>--disable-gpu</code> 标志。但它最终会不需要的。</p>
</blockquote>
<p><code>chrome</code> 二进制文件应该指向你安装 Chrome 的位置。确切的位置会因平台差异而不同。当前我在 Mac 上操作，所以我为安装的每个版本的 Chrome 都创建了方便使用的别名。</p>
<p>如果您使用 Chrome 的稳定版，并且无法获得测试版，我建议您使用 <code>chrome-canary</code> 版本：</p>
<pre><code class="hljs monkey"><span class="hljs-keyword">alias</span> <span class="hljs-title">chrome</span>=<span class="hljs-string">"/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">chrome</span>-<span class="hljs-title">canary</span>=<span class="hljs-string">"/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"</span>
<span class="hljs-keyword">alias</span> <span class="hljs-title">chromium</span>=<span class="hljs-string">"/Applications/Chromium.app/Contents/MacOS/Chromium"</span>

</code></pre><p>在<a href="https://www.google.com/chrome/browser/canary.html">这里</a>下载 Chrome Cannary。</p>
<h3><a href="#命令行的功能"></a>命令行的功能</h3>
<p>在某些情况下，你可能不需要<a href="https://developers.google.com/web/updates/2017/04/headless-chrome#node">以脚本编程的方式</a>操作 Headless Chrome。可以使用一些<a href="https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc">有用的命令行标志</a>来执行常见的任务。</p>
<h4><a href="#打印-dom"></a>打印 DOM</h4>
<p><code>--dump-dom</code> 标志将打印 <code>document.body.innerHTML</code> 到标准输出：</p>
<pre><code class="hljs jboss-cli">chrome <span class="hljs-params">--headless</span> <span class="hljs-params">--disable-gpu</span> <span class="hljs-params">--dump-dom</span> https:<span class="hljs-string">//www.chromestatus.com/</span>

</code></pre><h4><a href="#创建一个-pdf"></a>创建一个 PDF</h4>
<p><code>--print-to-pdf</code> 标志将页面转出为 PDF 文件：</p>
<pre><code class="hljs jboss-cli">chrome <span class="hljs-params">--headless</span> <span class="hljs-params">--disable-gpu</span> <span class="hljs-params">--print-to-pdf</span> https:<span class="hljs-string">//www.chromestatus.com/</span>

</code></pre><h4><a href="#截图"></a>截图</h4>
<p>要捕获页面的屏幕截图，请使用 <code>--screenshot</code> 标志：</p>
<pre><code class="hljs jboss-cli">chrome <span class="hljs-params">--headless</span> <span class="hljs-params">--disable-gpu</span> <span class="hljs-params">--screenshot</span> https:<span class="hljs-string">//www.chromestatus.com/</span>

<span class="hljs-comment"># Size of a standard letterhead.</span>
chrome <span class="hljs-params">--headless</span> <span class="hljs-params">--disable-gpu</span> <span class="hljs-params">--screenshot</span> <span class="hljs-params">--window-size=1280</span>,1696 https:<span class="hljs-string">//www.chromestatus.com/</span>

<span class="hljs-comment"># Nexus 5x</span>
chrome <span class="hljs-params">--headless</span> <span class="hljs-params">--disable-gpu</span> <span class="hljs-params">--screenshot</span> <span class="hljs-params">--window-size=412</span>,732 https:<span class="hljs-string">//www.chromestatus.com/</span>

</code></pre><p>使用 <code>--screenshot</code> 标志运行 Headless Chrome 将在当前工作目录中生成一个名为 <code>screenshot.png</code> 的文件。如果你正在寻求整个页面的截图，那么会涉及到很多事情。来自 David Schnurr 的一篇很棒的博文已经介绍了这一内容。请查看 <a href="https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a">使用 headless Chrome 作为自动截屏工具</a>。</p>
<h4><a href="#repl-模式-read-eval-print-loop"></a>REPL 模式 (read-eval-print loop)</h4>
<p><code>--repl</code> 标志可以使 Headless Chrome 运行在一个你可以使用浏览器评估 JS 表达式的模式下。执行下面的命令：</p>
<pre><code class="hljs ruby">$ chrome --headless --disable-gpu --repl <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/www.chromestatus.com/</span>
[<span class="hljs-number">060</span>8/<span class="hljs-number">112805.245285</span><span class="hljs-symbol">:INFO</span><span class="hljs-symbol">:headless_shell</span>.cc(<span class="hljs-number">278</span>)] Type a Javascript expression to evaluate <span class="hljs-keyword">or</span> <span class="hljs-string">"quit"</span> to exit.
<span class="hljs-meta">&gt;&gt;</span>&gt; location.href
{<span class="hljs-string">"result"</span><span class="hljs-symbol">:</span>{<span class="hljs-string">"type"</span><span class="hljs-symbol">:<span class="hljs-string">"string"</span></span>,<span class="hljs-string">"value"</span><span class="hljs-symbol">:<span class="hljs-string">"https://www.chromestatus.com/features"</span></span>"}}"
<span class="hljs-meta">&gt;&gt;</span>&gt; quit

</code></pre><h3><a href="#在没有浏览器界面的情况下调试-chrome"></a>在没有浏览器界面的情况下调试 Chrome</h3>
<p>当你使用 <code>--remote-debugging-port=9222</code> 运行 Chrome 时，它会启动一个支持 <a href="https://chromedevtools.github.io/devtools-protocol/">DevTools 协议</a>的实例。该协议用于与 Chrome 进行通信，并且驱动 Headless Chrome 浏览器实例。它也是一个类似 Sublime、VS Code 和 Node 的工具，可用于应用程序的远程调试。#协同效应</p>
<p>由于你没有浏览器用户界面可用来查看网页，请在另一个浏览器中输入 <code>http://localhost:9222</code>，以检查一切是否正常。你将会看到一个可检查的inspectable页面的列表，可以点击它们来查看 Headless Chrome 正在呈现的内容：</p>
<p><a href="https://camo.githubusercontent.com/04a12285824795b40e1d8f59966249f22759fd21/68747470733a2f2f646576656c6f706572732e676f6f676c652e636f6d2f7765622f757064617465732f696d616765732f323031372f30342f686561646c6573732d6368726f6d652f72656d6f74652d646562756767696e672d75692e6a7067"><img src="https://p0.ssl.qhimg.com/t01eb4e1148de083db9.jpg" alt="DevTools Remote"></a></p>
<p><em>DevTools 远程调试界面</em></p>
<p>从这里，你就可以像往常一样使用熟悉的 DevTools 来检查、调试和调整页面了。如果你以编程方式使用 Headless Chrome，这个页面也是一个功能强大的调试工具，用于查看所有通过网络与浏览器交互的原始 DevTools 协议命令。</p>
<h3><a href="#使用编程模式-node"></a>使用编程模式 （Node）</h3>
<h4><a href="#puppeteer-库-api"></a>Puppeteer 库 API</h4>
<p><a href="https://github.com/GoogleChrome/puppeteer">Puppeteer</a> 是一个由 Chrome 团队开发的 Node 库。它提供了一个高层次的 API 来控制无需显示版（或 完全版）的 Chrome。它与其他自动化测试库，如 Phantom 和 NightmareJS 相类似，但是只适用于最新版本的 Chrome。</p>
<p>除此之外，Puppeteer 还可用于轻松截取屏幕截图，创建 PDF，页面间导航以及获取有关这些页面的信息。如果你想快速地自动化进行浏览器测试，我建议使用该库。它隐藏了 DevTools 协议的复杂性，并可以处理诸如启动 Chrome 调试实例等繁冗的任务。</p>
<p>安装：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> puppeteer
</span>
</code></pre><p><strong>例子</strong> - 打印用户代理：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span>(<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch(<span class="hljs-params"></span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-params"><span class="hljs-keyword">await</span> browser.version(<span class="hljs-params"></span>)</span>);
  browser.close(<span class="hljs-params"></span>);
}</span>)<span class="hljs-params">()</span>;

</span></code></pre><p><strong>例子</strong> - 获取页面的屏幕截图：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span>(<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch(<span class="hljs-params"></span>);
<span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage(<span class="hljs-params"></span>);
<span class="hljs-keyword">await</span> page.goto(<span class="hljs-params">'https:<span class="hljs-comment">//www.chromestatus.com', {waitUntil: 'networkidle'});</span>
<span class="hljs-keyword">await</span> page.pdf(<span class="hljs-params">{path: 'page.pdf', format: 'A4'}</span>);

browser.close(<span class="hljs-params"></span>);
}</span>)(<span class="hljs-params"></span>);

</span></span></code></pre><p>查看 <a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md">Puppeteer 的文档</a>，了解完整 API 的更多信息。</p>
<h4><a href="#cri-库"></a>CRI 库</h4>
<p><a href="https://www.npmjs.com/package/chrome-remote-interface">chrome-remote-interface</a> 是一个比 Puppeteer API 更低层次的库。如果你想要更接近原始信息和更直接地使用 <a href="https://chromedevtools.github.io/devtools-protocol/">DevTools 协议</a>的话，我推荐使用它。</p>
<p><strong>启动 Chrome</strong></p>
<p>chrome-remote-interface 不会为你启动 Chrome，所以你要自己启动它。</p>
<p>在前面的 CLI 章节中，我们使用 <code>--headless --remote-debugging-port=9222</code> <a href="https://developers.google.com/web/updates/2017/04/headless-chrome#cli">手动启动了 Chrome</a>。但是，要想做到完全自动化测试，你可能希望从你的应用程序中启动 Chrome。</p>
<p>其中一种方法是使用 <code>child_process</code>：</p>
<pre><code class="hljs php"><span class="hljs-keyword">const</span> execFile = <span class="hljs-keyword">require</span>(<span class="hljs-string">'child_process'</span>).execFile;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">launchHeadlessChrome</span><span class="hljs-params">(url, callback)</span> </span>{
  <span class="hljs-comment">// Assuming MacOSx.</span>
  <span class="hljs-keyword">const</span> CHROME = <span class="hljs-string">'/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'</span>;
  execFile(CHROME, [<span class="hljs-string">'--headless'</span>, <span class="hljs-string">'--disable-gpu'</span>, <span class="hljs-string">'--remote-debugging-port=9222'</span>, url], callback);
}

launchHeadlessChrome(<span class="hljs-string">'https://www.chromestatus.com'</span>, (err, stdout, stderr) =&gt; {
  ...
});

</code></pre><p>但是如果你想要在多个平台上运行可移植的解决方案，事情会变得很棘手。请注意 Chrome 的硬编码路径：</p>
<p><strong>使用 ChromeLauncher</strong></p>
<p><a href="https://developers.google.com/web/tools/lighthouse/">Lighthouse</a> 是一个令人称奇的网络应用的质量测试工具。Lighthouse 内部开发了一个强大的用于启动 Chrome 的模块，现在已经被提取出来单独使用。<a href="https://www.npmjs.com/package/chrome-launcher">chrome-launcher NPM 模块</a> 可以找到 Chrome 的安装位置，设置调试实例，启动浏览器和在程序运行完之后将其杀死。它最好的一点是可以跨平台工作，感谢 Node！</p>
<p>默认情况下，<strong>chrome-launcher 会尝试启动 Chrome Canary</strong>（如果已经安装），但是你也可以更改它，手动选择使用的 Chrome 版本。要想使用它，首先从 npm 安装：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> chrome-launcher
</span>
</code></pre><p><strong>例子</strong> - 使用 <code>chrome-launcher</code> 启动 Headless Chrome：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> chromeLauncher = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chrome-launcher'</span>);

<span class="hljs-comment">// Optional: set logging level of launcher to see its output.</span>
<span class="hljs-comment">// Install it using: yarn add lighthouse-logger</span>
<span class="hljs-comment">// const log = require('lighthouse-logger');</span>
<span class="hljs-comment">// log.setLevel('info');</span>

<span class="hljs-comment">/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise&lt;ChromeLauncher&gt;}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">launchChrome</span>(<span class="hljs-params">headless=true</span>) </span>{
  <span class="hljs-keyword">return</span> chromeLauncher.launch({
    <span class="hljs-comment">// port: 9222, // Uncomment to force a specific port of your choice.</span>
    chromeFlags: [
      <span class="hljs-string">'--window-size=412,732'</span>,
      <span class="hljs-string">'--disable-gpu'</span>,
      headless ? <span class="hljs-string">'--headless'</span> : <span class="hljs-string">''</span>
    ]
  });
}

launchChrome().then(<span class="hljs-function"><span class="hljs-params">chrome</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Chrome debuggable on port: <span class="hljs-subst">${chrome.port}</span>`</span>);
  ...
  <span class="hljs-comment">// chrome.kill();</span>
});

</code></pre><p>运行这个脚本没有做太多的事情，但你应该能在任务管理器中看到启动了一个 Chrome 的实例，它加载了页面 <code>about:blank</code>。记住，它不会有任何的浏览器界面，我们是无需显示的。</p>
<p>为了控制浏览器，我们需要 DevTools 协议！</p>
<h4><a href="#检索有关页面的信息"></a>检索有关页面的信息</h4>
<blockquote>
<p><strong>警告：</strong> DevTools 协议可以做一些有趣的事情，但是起初可能有点令人生畏。我建议先花点时间浏览 <a href="https://chromedevtools.github.io/devtools-protocol/">DevTools 协议查看器</a>。然后，转到 <code>chrome-remote-interface</code> 的 API 文档，看看它是如何包装原始协议的。</p>
</blockquote>
<p>我们来安装该库：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> chrome-remote-interface
</span>
</code></pre><p><strong>例子</strong> - 打印用户代理：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> CDP = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chrome-remote-interface'</span>);

...

launchChrome().then(<span class="hljs-keyword">async</span> chrome =&gt; {
  <span class="hljs-keyword">const</span> version = <span class="hljs-keyword">await</span> CDP.Version({<span class="hljs-attr">port</span>: chrome.port});
  <span class="hljs-built_in">console</span>.log(version[<span class="hljs-string">'User-Agent'</span>]);
});

</code></pre><p>结果是类似这样的东西：<code>HeadlessChrome/60.0.3082.0</code>。</p>
<p><strong>例子</strong> - 检查网站是否有 <a href="https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/">Web 应用程序清单</a>：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> CDP = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chrome-remote-interface'</span>);

...

(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

<span class="hljs-keyword">const</span> chrome = <span class="hljs-keyword">await</span> launchChrome();
<span class="hljs-keyword">const</span> protocol = <span class="hljs-keyword">await</span> CDP({<span class="hljs-attr">port</span>: chrome.port});

<span class="hljs-comment">// Extract the DevTools protocol domains we need and enable them.</span>
<span class="hljs-comment">// See API docs: https://chromedevtools.github.io/devtools-protocol/</span>
<span class="hljs-keyword">const</span> {Page} = protocol;
<span class="hljs-keyword">await</span> Page.enable();

Page.navigate({<span class="hljs-attr">url</span>: <span class="hljs-string">'https://www.chromestatus.com/'</span>});

<span class="hljs-comment">// Wait for window.onload before doing stuff.</span>
Page.loadEventFired(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> manifest = <span class="hljs-keyword">await</span> Page.getAppManifest();

  <span class="hljs-keyword">if</span> (manifest.url) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Manifest: '</span> + manifest.url);
    <span class="hljs-built_in">console</span>.log(manifest.data);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Site has no app manifest'</span>);
  }

  protocol.close();
  chrome.kill(); <span class="hljs-comment">// Kill Chrome.</span>
});

})();

</code></pre><p><strong>例子</strong> - 使用 DOM API 提取页面的 <code>&lt;title&gt;</code>：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> CDP = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chrome-remote-interface'</span>);

...

(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

<span class="hljs-keyword">const</span> chrome = <span class="hljs-keyword">await</span> launchChrome();
<span class="hljs-keyword">const</span> protocol = <span class="hljs-keyword">await</span> CDP({<span class="hljs-attr">port</span>: chrome.port});

<span class="hljs-comment">// Extract the DevTools protocol domains we need and enable them.</span>
<span class="hljs-comment">// See API docs: https://chromedevtools.github.io/devtools-protocol/</span>
<span class="hljs-keyword">const</span> {Page, Runtime} = protocol;
<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([Page.enable(), Runtime.enable()]);

Page.navigate({<span class="hljs-attr">url</span>: <span class="hljs-string">'https://www.chromestatus.com/'</span>});

<span class="hljs-comment">// Wait for window.onload before doing stuff.</span>
Page.loadEventFired(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> js = <span class="hljs-string">"document.querySelector('title').textContent"</span>;
  <span class="hljs-comment">// Evaluate the JS expression in the page.</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> Runtime.evaluate({<span class="hljs-attr">expression</span>: js});

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Title of page: '</span> + result.result.value);

  protocol.close();
  chrome.kill(); <span class="hljs-comment">// Kill Chrome.</span>
});

})();

</code></pre><h3><a href="#使用-seleniumwebdriver-和-chromedriver"></a>使用 Selenium、WebDriver 和 ChromeDriver</h3>
<p>现在，Selenium 开启了 Chrome 的完整实例。换句话说，这是一个自动化的解决方案，但不是完全无需显示的。但是，Selenium 只需要进行小小的配置即可运行 Headless Chrome。如果你想要关于如何自己设置的完整说明，我建议你阅读“<a href="https://intoli.com/blog/running-selenium-with-headless-chrome/">使用 Headless Chrome 来运行 Selenium</a>”，不过你可以从下面的一些示例开始。</p>
<h4><a href="#使用-chromedriver"></a>使用 ChromeDriver</h4>
<p><a href="https://sites.google.com/a/chromium.org/chromedriver/">ChromeDriver</a> 2.3.0 支持 Chrome 59 及更新版本，可与 Headless Chrome 配合使用。在某些情况下，你可能需要等到 Chrome 60 以解决 bug。例如，Chrome 59 中屏幕截图已知存在问题。</p>
<p>安装：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> selenium-webdriver chromedriver
</span>
</code></pre><p>例子：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">const</span> webdriver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'selenium-webdriver'</span>);
<span class="hljs-keyword">const</span> chromedriver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chromedriver'</span>);

<span class="hljs-comment">// This should be the path to your Canary installation.</span>
<span class="hljs-comment">// I'm assuming Mac for the example.</span>
<span class="hljs-keyword">const</span> PATH_TO_CANARY = <span class="hljs-string">'/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'</span>;

<span class="hljs-keyword">const</span> chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set(<span class="hljs-string">'chromeOptions'</span>, {
  <span class="hljs-attr">binary</span>: PATH_TO_CANARY <span class="hljs-comment">// Screenshots require Chrome 60\. Force Canary.</span>
  <span class="hljs-string">'args'</span>: [
    <span class="hljs-string">'--headless'</span>,
  ]
});

<span class="hljs-keyword">const</span> driver = <span class="hljs-keyword">new</span> webdriver.Builder()
  .forBrowser(<span class="hljs-string">'chrome'</span>)
  .withCapabilities(chromeCapabilities)
  .build();

<span class="hljs-comment">// Navigate to google.com, enter a search.</span>
driver.get(<span class="hljs-string">'https://www.google.com/'</span>);
driver.findElement({<span class="hljs-attr">name</span>: <span class="hljs-string">'q'</span>}).sendKeys(<span class="hljs-string">'webdriver'</span>);
driver.findElement({<span class="hljs-attr">name</span>: <span class="hljs-string">'btnG'</span>}).click();
driver.wait(webdriver.until.titleIs(<span class="hljs-string">'webdriver - Google Search'</span>), <span class="hljs-number">1000</span>);

<span class="hljs-comment">// Take screenshot of results page. Save to disk.</span>
driver.takeScreenshot().then(<span class="hljs-function"><span class="hljs-params">base64png</span> =&gt;</span> {
  fs.writeFileSync(<span class="hljs-string">'screenshot.png'</span>, <span class="hljs-keyword">new</span> Buffer(base64png, <span class="hljs-string">'base64'</span>));
});

driver.quit();

</code></pre><h4><a href="#使用-webdriverio"></a>使用 WebDriverIO</h4>
<p><a href="http://webdriver.io/">WebDriverIO</a> 是一个在 Selenium WebDrive 上构建的更高层次的 API。</p>
<p>安装：</p>
<pre><code class="hljs dockerfile">yarn <span class="hljs-keyword">add</span><span class="bash"> webdriverio chromedriver
</span>
</code></pre><p>例子：过滤 chromestatus.com 上的 CSS 功能：</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">const</span> webdriverio = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webdriverio'</span>);
<span class="hljs-keyword">const</span> chromedriver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chromedriver'</span>);

<span class="hljs-comment">// This should be the path to your Canary installation.</span>
<span class="hljs-comment">// I'm assuming Mac for the example.</span>
<span class="hljs-keyword">const</span> PATH_TO_CANARY = <span class="hljs-string">'/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'</span>;
<span class="hljs-keyword">const</span> PORT = <span class="hljs-number">9515</span>;

chromedriver.start([
  <span class="hljs-string">'--url-base=wd/hub'</span>,
  <span class="hljs-string">`--port=<span class="hljs-subst">${PORT}</span>`</span>,
  <span class="hljs-string">'--verbose'</span>
]);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {

<span class="hljs-keyword">const</span> opts = {
  port: PORT,
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: PATH_TO_CANARY <span class="hljs-comment">// Screenshots require Chrome 60\. Force Canary.</span>
      args: ['--headless']
    }
  }
};

<span class="hljs-keyword">const</span> browser = webdriverio.remote(<span class="hljs-params">opts</span>).init(<span class="hljs-params"></span>);

<span class="hljs-keyword">await</span> browser.url(<span class="hljs-params">'https:<span class="hljs-comment">//www.chromestatus.com/features');</span>

<span class="hljs-keyword">const</span> title = <span class="hljs-keyword">await</span> browser.getTitle(<span class="hljs-params"></span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-params">`Title: ${title}`</span>);

<span class="hljs-keyword">await</span> browser.waitForText(<span class="hljs-params">'.num-features', 3000</span>);
<span class="hljs-keyword">let</span> numFeatures = <span class="hljs-keyword">await</span> browser.getText(<span class="hljs-params">'.num-features'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-params">`Chrome has ${numFeatures} total features`</span>);

<span class="hljs-keyword">await</span> browser.setValue(<span class="hljs-params">'input[<span class="hljs-keyword">type</span>="search"]', 'CSS'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-params">'Filtering features...'</span>);
<span class="hljs-keyword">await</span> browser.pause(<span class="hljs-params">1000</span>);

numFeatures = <span class="hljs-keyword">await</span> browser.getText(<span class="hljs-params">'.num-features'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-params">`Chrome has ${numFeatures} CSS features`</span>);

<span class="hljs-keyword">const</span> buffer = <span class="hljs-keyword">await</span> browser.saveScreenshot(<span class="hljs-params">'screenshot.png'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-params">'Saved screenshot...'</span>);

chromedriver.stop(<span class="hljs-params"></span>);
browser.end(<span class="hljs-params"></span>);

}</span>)(<span class="hljs-params"></span>);

</span></span></code></pre><h3><a href="#更多资源"></a>更多资源</h3>
<p>以下是一些可以带你入门的有用资源：</p>
<p>文档</p>
<ul>
<li><a href="https://chromedevtools.github.io/devtools-protocol/">DevTools Protocol Viewer</a> - API 参考文档</li>
</ul>
<p>工具</p>
<ul>
<li><a href="https://www.npmjs.com/package/chrome-remote-interface">chrome-remote-interface</a> - 基于 DevTools 协议的 node 模块</li>
<li><a href="https://github.com/GoogleChrome/lighthouse">Lighthouse</a> - 测试 Web 应用程序质量的自动化工具；大量使用了协议</li>
<li><a href="https://github.com/GoogleChrome/lighthouse/tree/master/chrome-launcher">chrome-launcher</a> - 用于启动 Chrome 的 node 模块，可以自动化</li>
</ul>
<p>样例</p>
<ul>
<li>"<a href="https://paul.kinlan.me/the-headless-web/">The Headless Web</a>" - Paul Kinlan 发布的使用了 Headless 和 api.ai 的精彩博客</li>
</ul>
<h3><a href="#常见问题"></a>常见问题</h3>
<p><strong>我需要 <code>--disable-gpu</code> 标志吗？</strong></p>
<p>目前是需要的。<code>--disable-gpu</code> 标志在处理一些 bug 时是需要的。在未来版本的 Chrome 中就不需要了。查看 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=546953#c152">https://crbug.com/546953#c152</a> 和 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=695212">https://crbug.com/695212</a> 获取更多信息。</p>
<p><strong>所以我仍然需要 Xvfb 吗？</strong></p>
<p>不。Headless Chrome 不使用窗口，所以不需要像 Xvfb 这样的显示服务器。没有它你也可以愉快地运行你的自动化测试。</p>
<p>什么是 Xvfb？Xvfb 是一个用于类 Unix 系统的运行于内存之内的显示服务器，可以让你运行图形应用程序（如 Chrome），而无需附加的物理显示器。许多人使用 Xvfb 运行早期版本的 Chrome 进行 “headless” 测试。</p>
<p><strong>如何创建一个运行 Headless Chrome 的 Docker 容器？</strong></p>
<p>查看 <a href="https://github.com/ebidel/lighthouse-ci">lighthouse-ci</a>。它有一个使用 Ubuntu 作为基础镜像的 <a href="https://github.com/ebidel/lighthouse-ci/blob/master/builder/Dockerfile.headless">Dockerfile 示例</a>，并且在 App Engine Flexible 容器中安装和运行了 Lighthouse。</p>
<p><strong>我可以把它和 Selenium / WebDriver / ChromeDriver 一起使用吗？</strong></p>
<p>是的。查看 <a href="https://developers.google.com/web/updates/2017/04/headless-chrome#drivers">Using Selenium, WebDrive, or ChromeDriver</a>。</p>
<p><strong>它和 PhantomJS 有什么关系？</strong></p>
<p>Headless Chrome 和 <a href="http://phantomjs.org/">PhantomJS</a> 是类似的工具。它们都可以用来在无需显示的环境中进行自动化测试。两者的主要不同在于 Phantom 使用了一个较老版本的 WebKit 作为它的渲染引擎，而 Headless Chrome 使用了最新版本的 Blink。</p>
<p>目前，Phantom 提供了比 <a href="https://chromedevtools.github.io/devtools-protocol/">DevTools protocol</a> 更高层次的 API。</p>
<p><strong>我在哪儿提交 bug？</strong></p>
<p>对于 Headless Chrome 的 bug，请提交到 <a href="https://bugs.chromium.org/p/chromium/issues/entry?components=Blink&amp;blocking=705916&amp;cc=skyostil%40chromium.org&amp;Proj=Headless">crbug.com</a>。</p>
<p>对于 DevTools 协议的 bug，请提交到 <a href="https://github.com/ChromeDevTools/devtools-protocol/issues/new">github.com/ChromeDevTools/devtools-protocol</a>。</p>
<hr>
<p>作者简介</p>
<p><a href="https://developers.google.com/web/resources/contributors#ericbidelman">Eric Bidelman</a> 谷歌工程师，Lighthouse 开发，Web 和 Web 组件开发，Chrome 开发</p>
<hr>
<p>via: <a href="https://developers.google.com/web/updates/2017/04/headless-chrome">https://developers.google.com/web/updates/2017/04/headless-chrome</a></p>
<p>作者：<a href="https://developers.google.com/web/resources/contributors#ericbidelman">Eric Bidelman</a> 译者：<a href="https://github.com/firmianay">firmianay</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Headless Chrome 入门

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-headless-chrome](https://www.zcfy.cc/article/getting-started-with-headless-chrome)

