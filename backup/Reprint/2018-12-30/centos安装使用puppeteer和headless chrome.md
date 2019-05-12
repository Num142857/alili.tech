---
title: 'centos安装使用puppeteer和headless chrome' 
date: 2018-12-30 2:30:10
hidden: true
slug: l1e1n4l0avl
categories: [reprint]
---

{{< raw >}}

                    
<p>Google推出了无图形界面的headless Chrome之后，可以直接在远程服务器上直接跑一些测试脚本或者爬虫脚本了，猴开心！Google还附送了<a href="https://github.com/GoogleChrome/puppeteer" rel="nofollow noreferrer" target="_blank">Puppeteer</a>用于驱动没头的Chome。</p>
<p>阿里的Macaca也顺势写了<a href="https://github.com/macacajs/macaca-puppeteer" rel="nofollow noreferrer" target="_blank">Macaca-puppeteer</a>，可以在Macaca上直接写通用的测试用例，在开发机上用图形界面看效果，上服务器走生产，岂不是美滋滋。</p>
<p>然鹅，可达鸭眉头一皱，发现事情并没有那么简单。</p>
<p>在阿里云的Centos 7.3上，安装puppeteer之后，会发现并不能启动官方的example：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript"><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch();
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage();
  <span class="hljs-keyword">await</span> page.goto(<span class="hljs-string">'https://example.com'</span>);
  <span class="hljs-keyword">await</span> page.screenshot({<span class="hljs-attr">path</span>: <span class="hljs-string">'example.png'</span>});

  <span class="hljs-keyword">await</span> browser.close();
})();</code></pre>
<h2 id="articleHeader0">依赖安装</h2>
<p>仔细看错误栈，核心的错误是如下一段：</p>
<blockquote>
<p>...node_modules/puppeteer/.local-chromium/linux-496140/chrome-linux/chrome: error while loading shared libraries: libpangocairo-1.0.so.0: cannot open shared object file: No such file or directory</p>
<p>TROUBLESHOOTING: <a href="https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md" rel="nofollow noreferrer" target="_blank">https://github.com/GoogleChro...</a></p>
</blockquote>
<p>原来puppet虽然帮你下了一个Chromium，但并没有帮你把依赖都装好。于是你要自己把那些so都装好。</p>
<p>官方给的是Ubuntu版本的各个so包的apt-get安装方式，centos版本居然没有放！于是遍历了各个issue之后，终于发现还是有人给出了centos的库名，在一个<a href="https://github.com/GoogleChrome/puppeteer/issues/560#issuecomment-325224766" rel="nofollow noreferrer" target="_blank">看起来并不相关的issue里</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#依赖库
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

#字体
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment">#依赖库</span>
yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

<span class="hljs-comment">#字体</span>
yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y</code></pre>
<p>总算不用挨个去google了……</p>
<h2 id="articleHeader1">sandbox去沙箱</h2>
<p>这时候你再去执行脚本，发现还是跑不起来。但是报错终于变了。这个时候变成了一个莫名其妙的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(node:30559) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Failed to connect to chrome!
(node:30559) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>(<span class="hljs-keyword">node</span><span class="hljs-title">:30559</span>) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: <span class="hljs-number">1</span>): Error: Failed to connect to chrome!
(<span class="hljs-keyword">node</span><span class="hljs-title">:30559</span>) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. <span class="hljs-keyword">In</span> the future, promise rejections that are not handled will terminate the <span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span> process with a non-zero exit code.
</code></pre>
<p>要疯掉了有没有，这啥玩意啊！！！！关键是这时候另外一个<a href="https://github.com/GoogleChrome/puppeteer/issues/290" rel="nofollow noreferrer" target="_blank">看起来是解决上面问题的issue</a>，对这个错误进行了详细的讨论，然而直到今天（2017年9月27日）并没有讨论出什么结果。</p>
<p>网上很多讨论是说，直接调试那个Chrome。按照并不能解决问题的说法：直接去puppeteer的目录找到.local-chrome里面的Chromium执行文件，直接执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./chrome -v --no-sandbox --disable-setuid-sandbox

(chrome:5333): Gtk-WARNING **: cannot open display: " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>./chrome -v --<span class="hljs-keyword">no</span>-<span class="hljs-keyword">sandbox</span> --disable-setuid-<span class="hljs-keyword">sandbox</span>

(chrome:<span class="hljs-number">5333</span>): Gtk-WARNING **: cannot <span class="hljs-keyword">open</span> <span class="hljs-keyword">display</span>: </code></pre>
<p>发现加上了<code>--no-sanbox</code>其实是能启动的，但是提示没有Gtk图形界面，那干脆加上--headless是不是就行了嘞？确实没有报错了。</p>
<p>回到puppeteer示例脚本，修改启动浏览器的代码，加上args：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="Javascript"><span class="hljs-keyword">const</span> puppeteer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'puppeteer'</span>);

<span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.launch({<span class="hljs-attr">args</span>: [<span class="hljs-string">'--no-sandbox'</span>, <span class="hljs-string">'--disable-setuid-sandbox'</span>]});
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.newPage();
  <span class="hljs-keyword">await</span> page.goto(<span class="hljs-string">'https://example.com'</span>);
  <span class="hljs-keyword">await</span> page.screenshot({<span class="hljs-attr">path</span>: <span class="hljs-string">'example.png'</span>});

  <span class="hljs-keyword">await</span> browser.close();
})();</code></pre>
<p>啊哈，终于执行成功了。下载下来了example.com的截图看了一眼，简直泪流满面。</p>
<p>回想一下，Puppet本身估计自带了--headless，所以如果直接去命令行执行chrome，还是要带上--headless。</p>
<p>终于搞定这一切发现Macaca顺便还提供了一个<a href="https://github.com/macacajs/macaca-puppeteer-docker" rel="nofollow noreferrer" target="_blank">基于Ubuntu的Macaca-puppeteer的Docker</a>，艾玛这方便太多了，早知道不自己折腾了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
centos安装使用puppeteer和headless chrome

## 原文链接
[https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)

