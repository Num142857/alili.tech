---
title: '有哪些 JS 调试技巧——devtool，以及安装问题的解决' 
date: 2019-02-07 2:30:15
hidden: true
slug: l2k4dwe1uc
categories: [reprint]
---

{{< raw >}}

                    
<p>转自本人知乎回答</p>
<p>作者：mdluo<br>链接：<a href="https://www.zhihu.com/question/20260762/answer/89388634" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/question/20260762/answer/89388634</a><br>来源：知乎<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
<p>貌似有些人不能理解这个和 Chrome 的开发者工具有什么区别：</p>
<p>这个工具不依赖 Chrome，占用资源更少，但是 Chrome 开发者工具的功能全都有，就是目前最高票回答的那样。另外 devtool 可以直接在命令行下启动，和 node 命令类似，不需要开个 HTTP 服务器或者把 js 文件嵌入到 html 中（来使用 Chrome 开发者工具）。</p>
<p>试试 16 年年初出的 node.js 调试神器 devtool：</p>
<p><span class="img-wrap"><img data-src="/img/bVy7sN" src="https://static.alili.tech/img/bVy7sN" alt="b5f13ffe06450224983fe587192ba150_b.png" title="b5f13ffe06450224983fe587192ba150_b.png" style="cursor: pointer; display: inline;"></span></p>
<p>基于 Electron 将 Node.js 和 Chromium 的功能融合在了一起。它的目的在于为调试、分析和开发 Node.js 应用程序提供一个简单的界面。</p>
<p>devtool 的详细介绍请参考：在 Chrome 开发者工具中调试 node.js，译者：sqrthree (根号三)</p>
<p>以下是我的使用体会：</p>
<ul>
<li><p>虽然看起来和 Chrome 的 Developer Tools 没什么两样，但是如果只是一些小的 js 脚本，就不需要去写一个 html 网页再引用；</p></li>
<li><p>或者需要 node 环境运行的 js 文件，也不需要 WebStorm 这个庞大的 IDE；</p></li>
<li><p>相比 node-inspector，devtool 提供的调试功能更多，包括 Elements、Timeline、Profiles、Resources、Audit 这些面板，以及最新的 Chrome 开发者工具里带了的功能，比如 Workspace（分分钟变 IDE）、移动设备模拟、Promise inspector（Experiments），但是这些 node-inspector 都没有。</p></li>
</ul>
<p>直接命令行下启动，替代 node 命令和在 Terminal 下没有交互的 <code>console.log()</code>。</p>
<p>安装方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g devtool" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g devtool</code></pre>
<p>安装过程会从 GitHub 下载 electron-prebuilt，而国内你懂的原因可能会下载失败，或者如果没耐心中断下载，用 devtool 的时候会报错。解决方法在最下面。</p>
<p><strong>小技巧</strong></p>
<p>另外启动调试可以用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devtool path/to/file.js -w --break" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">devtool path/<span class="hljs-keyword">to</span>/<span class="hljs-built_in">file</span>.js -w <span class="hljs-comment">--break</span></code></pre>
<p>这样可以监听文件变化自动 restart，以及在文件开头自动 break 以便打断点调试。</p>
<p><strong>—— Update 2016-03-09——</strong></p>
<p>为 devtool 添加一个别名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias dt='devtool -w --break'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">alias</span> dt=<span class="hljs-number">'de</span>vtool -w --<span class="hljs-keyword">break</span>'</code></pre>
<p><strong>—— Update 2016-06-12——</strong></p>
<p>错误更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: ENOENT: no such file or directory, open '/usr/local/lib/node_modules/devtool/node_modules/electron-prebuilt/path.txt'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Error: </span>ENOENT: no such file or directory, open '/usr/local/lib/node_modules/devtool/node_modules/electron-prebuilt/path.txt'</code></pre>
<p>因为 npm 安装 devtool 会自动从 GitHub 下载，而如果安装的时候中断了，安装程序不会识别到，哪怕重新安装 devtool。这时候需要安装 electron-prebuilt：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g electron-prebuilt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g electron-prebuilt</code></pre>
<p>或者用浏览器从 GitHub 下载对应版本（安装 electron-prebuilt 的时候会显示下载的 Electron 版本）：<a href="https://github.com/electron/electron/releases" rel="nofollow noreferrer" target="_blank">https://github.com/electron/electron/releases</a> </p>
<p>PS：用浏览器下载一般会快很多。</p>
<p>然后在 <code>/usr/local/lib/node_modules/devtool/node_modules/electron-prebuilt/</code> 下创建 path.txt （Mac系统为例，其他系统要根据报错的路径来），内容为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./dist/Electron.app/Contents/MacOS/Electron" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">.<span class="hljs-regexp">/dist/</span>Electron.app<span class="hljs-regexp">/Contents/</span>MacOS<span class="hljs-regexp">/Electron</span></code></pre>
<p>以及 dist 文件夹，把下载下来的解压，Electron.app 放到 dist 里，就可以了。</p>
<p><strong>—— Update 2016-06-21——</strong></p>
<p>今天又遇到个问题 devtool 完全用不了了，这样解决了：</p>
<p>先卸载 devtool 和相关的 package：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall -g devtool electron-prebuilt electron-packager" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">uninstall</span> -g devtool electron-<span class="hljs-keyword">prebuilt</span> electron-packager</code></pre>
<p>再安装 devtool：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g devtool" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g devtool</code></pre>
<p><strong>—— Update 2016-07-12——</strong></p>
<p>发现 cnpm（npm.taobao.org/mirrors，也就是俗称的淘宝镜像）已经收录了 electron 的二进制文件，这样就可以直接设置下载源即可，不用再去 GitHub 下载了（原理：electron-download/index.js at master · electron-userland/electron-download · GitHub）</p>
<p>方法1，环境变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm i devtool -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">ELECTRON_MIRROR=https:<span class="hljs-regexp">//</span><span class="hljs-built_in">npm</span>.taobao.org<span class="hljs-regexp">/mirrors/electron/</span> <span class="hljs-built_in">npm</span> i devtool -g</code></pre>
<p>方法2，在 <code>~/.npmrc</code> 里添加一行（如果是用的 cnpm ，要在 <code>~/.cnpmrc</code> 里面添加）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">ELECTRON_MIRROR=https:<span class="hljs-regexp">//</span>npm.taobao.org<span class="hljs-regexp">/mirrors/</span>electron<span class="hljs-regexp">/</span></code></pre>
<p>然后再 <code>npm i devtool -g</code>，推荐方法2，一次设置以后都不会再出现下载失败的问题了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
有哪些 JS 调试技巧——devtool，以及安装问题的解决

## 原文链接
[https://segmentfault.com/a/1190000005947826](https://segmentfault.com/a/1190000005947826)

