---
title: 'electron打包：electron-packager及electron-builder两种方式实现（for Windows）' 
date: 2018-12-09 2:30:08
hidden: true
slug: 5070wdvrqd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><span class="img-wrap"><img data-src="/img/bV6zNn?w=1319&amp;h=594" src="https://static.alili.tech/img/bV6zNn?w=1319&amp;h=594" alt="electron" title="electron" style="cursor: pointer; display: inline;"></span></p>
<p>本文主要介绍如何通过electron-packager及electron-builder两种方式，将已有的electron应用打包成msi格式和exe可执行文件。打包是一个成熟的应用程序一个重要的环节，希望这篇文章可以给大家一些参考，最后会讲到打包时遇到的一些坑，与大家分享。</p>
<p>本文适用于有一些electron实践经验的小伙伴，知道如何创建一个简单的electron应用，并且知道electron主进程、渲染进程间如何通信。</p>
<h2 id="articleHeader1">electron-packager</h2>
<p>使用命令 <code>npm install electron-packager --save-dev</code> 安装好之后会在<code>package.json</code>中的<code>devDependencies</code>生成代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;devDependencies&quot;: {
    &quot;electron-packager&quot;: &quot;^9.1.0&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-attr">"electron-packager"</span>: <span class="hljs-string">"^9.1.0"</span>
}</code></pre>
<blockquote>注意：<p>1、打包时要分清<code>devDependencies</code>与<code>dependencies</code>的区别，文章后会讲。<br>2、package.json 的额外字段 —— productName、author 和 description，虽然这几个字段并不是打包必备的，但它们会在 Windows 的 Squirrel 安装包（用于自动更新）中使用到，所以请读者根据实际情况添加。</p>
</blockquote>
<p>安装好模块之后，就可以对应用进行打包。electron-packager的打包基本命令是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="electron-packager <sourcedir> <appname> <platform> <architecture> <electron version> <optional options>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>electron-packager <span class="hljs-tag">&lt;<span class="hljs-name">sourcedir</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">appname</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">platform</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">architecture</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">electron</span> <span class="hljs-attr">version</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">optional</span> <span class="hljs-attr">options</span>&gt;</span>
</code></pre>
<p>参数说明：</p>
<ul>
<li>sourcedir：项目所在路径</li>
<li>appname：应用名称</li>
<li>platform：确定了你要构建哪个平台的应用（Windows、Mac 还是 Linux）</li>
<li>architecture：决定了使用 x86 还是 x64 还是两个架构都用</li>
<li>electron version：electron 的版本</li>
<li>optional options：可选选项</li>
</ul>
<p>为了方便起见，在<code>package.json</code>中添加代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;package&quot;: &quot;electron-packager ./ myapp --out ./OutApp --version 1.7.9 --overwrite --icon=./app/img/icon/icon.ico&quot;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"package"</span>: <span class="hljs-string">"electron-packager ./ myapp --out ./OutApp --version 1.7.9 --overwrite --icon=./app/img/icon/icon.ico"</span>
  }
</code></pre>
<p>然后在命令行中执行<code>npm run package</code> </p>
<p><span class="img-wrap"><img data-src="/img/bV6y4W?w=843&amp;h=549" src="https://static.alili.tech/img/bV6y4W?w=843&amp;h=549" alt="命令行输出" title="命令行输出" style="cursor: pointer;"></span></p>
<p>打包成功后，会在OutApp目录（此处的目录是在参数中配置的）下生成.exe，运行该文件，并且没有报错，则说明本次打包成功。</p>
<p><span class="img-wrap"><img data-src="/img/bV6zDS?w=575&amp;h=380" src="https://static.alili.tech/img/bV6zDS?w=575&amp;h=380" alt="可执行的exe程序" title="可执行的exe程序" style="cursor: pointer;"></span></p>
<blockquote>特点：<p>1、支持平台有：Windows (32/64 bit)、OS X (also known as macOS)、Linux (x86/x86_64);<br>2、进行应用更新时，使用electron内置的<code>autoUpdate</code>进行更新<br>3、支持CLI和JS API两种使用方式；</p>
</blockquote>
<h2 id="articleHeader2">electron-builder</h2>
<p>首先来看看什么是electron-builder，来自官方的解释：</p>
<blockquote>A complete solution to package and build a ready for distribution Electron, Proton Native or Muon app for macOS, Windows and Linux with “auto update” support out of the box.</blockquote>
<p>简单的说，electron-builder就是有比electron-packager有更丰富的的功能，支持更多的平台，同时也支持了自动更新。除了这几点之外，由electron-builder打出的包更为轻量，并且可以打包出不暴露源码的setup安装程序。考虑到以上几点，我果断选择了electron-builder    &amp;nbsp&amp;nbsp&amp;nbsp&amp;nbsp&amp;nbsp  （微笑</p>
<p>首先，依旧是安装依赖。<br><em>（这里官方<strong>强烈</strong>推荐使用yarn安装依赖包，但我使用了npm安装的依赖也可以正常打包，所以至于为什么官方强<strong>烈推</strong>荐用yarn，我还没搞懂其原因，还请了解缘由的大佬们赐教）</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add electron-builder --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">yarn</span> <span class="hljs-keyword">add </span>electron-<span class="hljs-keyword">builder </span>--save-dev</code></pre>
<p>在<code>package.json</code>中做如下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;: {
    &quot;appId&quot;: &quot;com.xxx.app&quot;,
    &quot;mac&quot;: {
      &quot;target&quot;: [&quot;dmg&quot;,&quot;zip&quot;]
    },
    &quot;win&quot;: {
      &quot;target&quot;: [&quot;nsis&quot;,&quot;zip&quot;]
    }
},
&quot;scripts&quot;: {
    &quot;dist&quot;: &quot;electron-builder --win --x64&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"build"</span>: {
    <span class="hljs-attr">"appId"</span>: <span class="hljs-string">"com.xxx.app"</span>,
    <span class="hljs-attr">"mac"</span>: {
      <span class="hljs-attr">"target"</span>: [<span class="hljs-string">"dmg"</span>,<span class="hljs-string">"zip"</span>]
    },
    <span class="hljs-attr">"win"</span>: {
      <span class="hljs-attr">"target"</span>: [<span class="hljs-string">"nsis"</span>,<span class="hljs-string">"zip"</span>]
    }
},
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"dist"</span>: <span class="hljs-string">"electron-builder --win --x64"</span>
},</code></pre>
<p>在命令行中执行<code>npm run dist</code> ，执行结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV6AfM?w=843&amp;h=549" src="https://static.alili.tech/img/bV6AfM?w=843&amp;h=549" alt="使用electron-builder打包" title="使用electron-builder打包" style="cursor: pointer; display: inline;"></span></p>
<p>打包后在dist目录生成如下文件：</p>
<p><span class="img-wrap"><img data-src="/img/bV6Ah7?w=569&amp;h=238" src="https://static.alili.tech/img/bV6Ah7?w=569&amp;h=238" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>解压zip包或执行setup安装文件，应用启动后且没有报错，则说明本次打包成功。</p>
<blockquote>特点：<p>1、electron-builder 可以打包成msi、exe、dmg文件，macOS系统，只能打包dmg文件，window系统才能打包exe，msi文件；<br>2、几乎支持了所有平台的所有格式；<br>3、支持Auto Update；<br>4、支持CLI和JS API两种使用方式；</p>
</blockquote>
<h2 id="articleHeader3">坑</h2>
<p>研究electron打包的过程中踩了不少坑，打包涉及到不少系统级别的问题，从最初的选型到最后的成功打包，看似是个简单的过程，但其中仍有一些需要注意到的地方，我在这里分两点说明：</p>
<h3 id="articleHeader4">devDependencies与dependencies的区别</h3>
<p><code>dependencies</code> 表示我们要在生产环境下使用该依赖，<code>devDependencies</code> 则表示我们仅在开发环境使用该依赖。在打包时，一定要分清哪些包属于生产依赖，哪些属于开发依赖，尤其是在项目较大，依赖包较多的情况下。若在生产环境下错应或者少引依赖包，即便是成功打包，但在使用应用程序期间也会报错，导致打包好的程序无法正常运行。</p>
<h3 id="articleHeader5">npm与cnpm的区别</h3>
<p>说到<code>npm</code>与<code>cnpm</code>的区别，可能大家都知道，但大家容易忽视的一点，是<code>cnpm</code>装的各种<code>node_module</code>，这种方式下所有的包都是扁平化的安装。一下子<code>node_modules</code>展开后有非常多的文件。导致了在打包的过程中非常慢。但是如果改用<code>npm</code>来安装<code>node_modules</code>的话，所有的包都是树状结构的，层级变深。</p>
<p>由于这个不同，对一些项目比较大的应用，很容易出现打包过程慢且node内存溢出的问题（这也是在解决electron打包过程中困扰我比较久的问题，最后想到了npm与cnpm的这点不同，解决了node打包内存溢出的问题，从打包一次一小时优化到打包一次一分钟，极大的提高了效率）。</p>
<p>所以建议大家在打包前，讲使用<code>cnpm</code>安装的依赖包删除，替换成<code>npm</code>安装的依赖包。</p>
<h2 id="articleHeader6">写在最后</h2>
<p>本次研究electron的目的是为electron自动更新做前期准备，下篇文章我将分享如何实现electron应用的版本更新。由于是初次接触electron，如读者在文中发现错误，请及时指正。<br>如有问题，欢迎私信、微信交流，WeChat：zeus9447<br>(*￣︶￣)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron打包：electron-packager及electron-builder两种方式实现（for Windows）

## 原文链接
[https://segmentfault.com/a/1190000013924153](https://segmentfault.com/a/1190000013924153)

