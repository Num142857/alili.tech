---
title: 'electron 将pc端（vue）页面打包为桌面端应用' 
date: 2018-12-26 2:30:14
hidden: true
slug: exjty65028
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p><span class="img-wrap"><img data-src="/img/bVYowg?w=1922&amp;h=862" src="https://static.alili.tech/img/bVYowg?w=1922&amp;h=862" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>最近在学习<a href="http://cn.rx.js.org/" rel="nofollow noreferrer" target="_blank">RxJS</a>，平时边看文档边顺手就敲一敲那些API，有时候想回顾一些自己写的东西，就要先把项目跑起来，这也难免有些麻烦。于是乎，就想着把自己写的这个小项目打包成桌面端，方面每次打开电脑就能看。经过网上查阅，比较成熟的解决方案很多，比如electron，nw.js等等。最终选定用electron，因为他的星星最多，哈哈。</p>
<p>这个练手Rxjs的小项目是用vue跑的，之前没玩过vue，顺手玩一下。打包桌面端，跟前端框架无关，只是想夸一下vue在构建项目上的体验真的好，简单方便，会以yes or no的形式让你完成一个主流的前端框架（<em>回想以前构建angular应用，还要打开help，看一大堆api，在这一点用户体验上angular真是输了，不知道最近的ng5变没变</em>）。</p>
<h2 id="articleHeader1">electron</h2>
<p><em>Electron uses Chromium and Node.js so you can build your app with HTML, CSS, and JavaScript. Open Source Cross Platform Compatible with Mac, Windows, ...</em></p>
<p>简单来说，electron是基于Chromium 和 Node.js 来构建一个跨平台应用的。Chromium是一个开源浏览器，与chrome区别是不会自动更新，但是一些新特性貌似会在Chromium先上。</p>
<h3 id="articleHeader2">electron-quick-start</h3>
<p>最开始的时候，没敢直接在vue中插入这个electron(毕竟连怎么用都不知道)，于是先clone了一个starter来快速学习一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/electron/electron-quick-start
cd electron-quick-start
cnpm install //这里我用的是cnpm,npm太慢了 
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/electron/electron-quick-<span class="hljs-literal">start</span>
cd electron-quick-<span class="hljs-literal">start</span>
cnpm install //这里我用的是cnpm,npm太慢了 
npm <span class="hljs-literal">start</span></code></pre>
<p>项目跑起来之后，不出意外就出现了electron的桌面端页面，看了下其中的入口文件main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">mainWindow</span><span class="hljs-selector-class">.loadURL</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-class">.format</span>({
    <span class="hljs-attribute">pathname</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'index.html'</span>),
    protocol: <span class="hljs-string">'file:'</span>,
    slashes: true
  }))</code></pre>
<p>这段代码就是配置桌面端应用的入口，于是果断去把vue的项目打包，直接把前端静态资源扔到这里，替换之前的文件。然后继续运行npm run start，<strong>然后白屏</strong>（<em>习惯性的首次失败。。</em>），不过问题也很快解决了，因为vue打包项目，默认使用的是绝对路径，所以到这里就有点小问题。解决方法：</p>
<p><span class="img-wrap"><img data-src="/img/bVYowh?w=1567&amp;h=421" src="https://static.alili.tech/img/bVYowh?w=1567&amp;h=421" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>进入config文件夹下的index.js将其中的assetsPublicPath修改为相对路径 ./。 </p>
<p>再次运行npm run start，成功将vue的项目，显示为桌面应用。</p>
<p><span class="img-wrap"><img data-src="/img/bVYowi?w=1527&amp;h=912" src="https://static.alili.tech/img/bVYowi?w=1527&amp;h=912" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>此时还是在electron的starter项目当中，这样显然太麻烦了，于是下面就将electron引入 vue。</p>
<h2 id="articleHeader3">vue 中引入electron</h2>
<p>首先在vue项目的package.json中加入electron的依赖，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install electron --save-dev 
cnpm install electron-packager --save-dev //这个是打成exe文件的插件，之后要用，提前下载好" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>cnpm install electron --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> 
cnpm install electron-packager --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> <span class="hljs-comment">//这个是打成exe文件的插件，之后要用，提前下载好</span></code></pre>
<p>把electron-quick-start项目中的<strong>main.js</strong>搬到vue的build文件中，并改个名字<strong>electron.js</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bVYowv?w=1580&amp;h=891" src="https://static.alili.tech/img/bVYowv?w=1580&amp;h=891" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>因为文件的相对位置进行了改变，electron的入口文件变成了vue build之后的文件地址，也就是dist文件夹下的 index.html，所以此时的electron.js 里面的引用地址也要变，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">mainWindow</span><span class="hljs-selector-class">.loadURL</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-class">.format</span>({
    <span class="hljs-attribute">pathname</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    protocol: <span class="hljs-string">'file:'</span>,
    slashes: true
  }))</code></pre>
<p>在package.json文件中增加一条指令，用来启动electron，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;lint&quot;: &quot;eslint --ext .js,.vue src&quot;,
    &quot;electron_dev&quot;: &quot;npm run build &amp;&amp; electron build/electron.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>,
    <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint --ext .js,.vue src"</span>,
    <span class="hljs-string">"electron_dev"</span>: <span class="hljs-string">"npm run build &amp;&amp; electron build/electron.js"</span>
  },</code></pre>
<p><strong>electron_dev</strong> 就是用来启动electron的，在此之前我们一定要确保项目当中已经有构建好的静态资源文件，因此 在运行 <strong>electron build/electron.js</strong> 之前，首先运行 <strong>npm run build。</strong></p>
<p>经过这样的处理，在命令行中，运行 <strong>npm run electron_dev</strong>之后，就会将之前在electron-quick-start中显示的桌面应用，再次显示出来。</p>
<p>到这一步，一直非常顺利，然而就在一切都理所应当的时候，打包exe文件出现了问题。</p>
<h2 id="articleHeader4">打包exe文件</h2>
<p><em>以上这些东西自己连调带试的搞了1小时左右吧，没看时间，反正我觉得挺快。然而，之后打包这个exe就花了1个小时还多！心好累。。。</em></p>
<p>首先，为之前下载好的electron-packager，增加一条启动命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;lint&quot;: &quot;eslint --ext .js,.vue src&quot;,
    &quot;electron_dev&quot;: &quot;npm run build &amp;&amp; electron build/electron.js&quot;,
    &quot;electron_build&quot;: &quot;electron-packager ./dist/ --platform=win32 --arch=x64 --icon=./src/assets/favicon.ico --overwrite&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>,
    <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint --ext .js,.vue src"</span>,
    <span class="hljs-string">"electron_dev"</span>: <span class="hljs-string">"npm run build &amp;&amp; electron build/electron.js"</span>,
    <span class="hljs-string">"electron_build"</span>: <span class="hljs-string">"electron-packager ./dist/ --platform=win32 --arch=x64 --icon=./src/assets/favicon.ico --overwrite"</span>
  },</code></pre>
<p>关于electron-packager的配置，简单介绍一下。<br>electron-packager  &lt;sourcedir&gt; &lt;appname&gt; --platform=&lt;platform&gt; --arch=&lt;arch&gt; [optional flags...]</p>
<ul>
<li><p>sourcedir 资源路径，在本例中既是./dist/</p></li>
<li><p>appname 打包出的exe名称</p></li>
<li><p>platform 平台名称（windows是win32）</p></li>
<li><p>arch 版本，本例为x64</p></li>
</ul>
<p>后边的配置项都是选填，可以设置二进制打包等，默认是没有这些的，这里只选填了exe的图标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run electron_build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> electron_build</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYoww?w=739&amp;h=808" src="https://static.alili.tech/img/bVYoww?w=739&amp;h=808" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>运行打包exe的命令，还是一如既往的顺利，项目中成功出现打包好的文件夹，但是去文件夹中启动exe时，状况发生了。</p>
<p><span class="img-wrap"><img data-src="/img/bVYowx?w=1009&amp;h=579" src="https://static.alili.tech/img/bVYowx?w=1009&amp;h=579" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>报错说找不到一个合法的app，什么鬼。。。<br>谷歌上搜了半天，有说版本不对，重新下载node模块的，有说路径不对的。其中我看到报错指向了asar，可我明明没有设置二进制打包啊，于是跟这个asar斗争了很久。</p>
<p><strong>最后发现跟这个asar屁关系没有！</strong></p>
<p><strong>在看到有相关问题出现的谈论下，看到解决方案是没有把package.json放入文件夹，开始还搞不明白为什么还要一个package.json ，后来翻回头来才发现自己太想当然了，以为dist/下是去拿index.html，其实人家是要去拿package，然后再去找入口的js，最后才去找index.html.</strong></p>
<p>于是先手动在dist文件夹下增加electron.js和package.json。</p>
<p><span class="img-wrap"><img data-src="/img/bVYowy?w=1395&amp;h=227" src="https://static.alili.tech/img/bVYowy?w=1395&amp;h=227" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>package的main指向从build文件夹中复制来的electron.js（记得把electron.js中index.html的路径做修改）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">mainWindow</span><span class="hljs-selector-class">.loadURL</span>(<span class="hljs-selector-tag">url</span><span class="hljs-selector-class">.format</span>({
    <span class="hljs-attribute">pathname</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'index.html'</span>),
    protocol: <span class="hljs-string">'file:'</span>,
    slashes: true
  }))</code></pre>
<p>再次运行npm run electron_build得到打包好的文件夹，找到其中的*.exe，双击运行，终于又出现了熟悉的画面。</p>
<p><span class="img-wrap"><img data-src="/img/bVYowB?w=1467&amp;h=867" src="https://static.alili.tech/img/bVYowB?w=1467&amp;h=867" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>至此，vue打包桌面端就这样完成了。在此过程中，发现自己做东西还是有些武断，太想当然了，导致在一些弯路里绕了很久。以后还是要多看文档，稳扎稳打！</p>
<p>项目地址：<a href="https://github.com/jiwenjiang/rxjs-practice" rel="nofollow noreferrer" target="_blank">https://github.com/jiwenjiang...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron 将pc端（vue）页面打包为桌面端应用

## 原文链接
[https://segmentfault.com/a/1190000011971612](https://segmentfault.com/a/1190000011971612)

