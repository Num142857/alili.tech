---
title: '【入门】WEEX快速创建工程 Hello World' 
date: 2019-01-02 2:30:09
hidden: true
slug: el4853ftm8v
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984860" src="https://static.alili.tech/img/remote/1460000010984860" alt="Hello WEEX" title="Hello WEEX" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>本不想写此引导性博文的，但个人在创建第一个Demo时确实出现了太多坑，且官方并未给出很好但入门引导。顾撰写此文，希望对初学者有所帮助，不至于出现“从入门到弃门而去”的现象。文中若有不当之处，还请不吝指正。</p></blockquote>
<h1 id="articleHeader0">开发环境</h1>
<p>根据你所使用的操作系统、针对的目标平台不同，具体步骤有所不同。如果想同时开发iOS和Android也没问题，你只需要先选一个平台开始，另一个平台的环境搭建只是稍有不同。</p>
<ul>
<li>开发IOS应用需要MacOS系统</li>
<li>开发Android应用，MacOS、Linux、Window均可<br>下面以IOS开发环境为例进行介绍</li>
</ul>
<h2 id="articleHeader1">必须安装的软件</h2>
<h3 id="articleHeader2">Homebrew</h3>
<p><a href="http://brew.sh/" rel="nofollow noreferrer" target="_blank">Homebrew</a>, Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/usr/bin/ruby -e &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">/usr/</span>bin<span class="hljs-regexp">/ruby -e "$(curl -fsSL https:/</span><span class="hljs-regexp">/raw.githubusercontent.com/</span>Homebrew<span class="hljs-regexp">/install/m</span>aster<span class="hljs-regexp">/install)"</span></code></pre>
<p>译注：在Max OS X 10.11（El Capitan)版本中，homebrew在安装软件时可能会碰到/usr/local<br>目录不可写的权限问题。可以使用下面的命令修复：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo chown -R `whoami` /usr/local" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code style="word-break: break-word; white-space: initial;">$ sudo <span class="hljs-keyword">chown</span> -R <span class="hljs-string">`whoami`</span> /usr/<span class="hljs-keyword">local</span></code></pre>
<h3 id="articleHeader3">Node</h3>
<p>使用Homebrew来安装<a href="https://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a>，或直接安装<br><strong>Weex目前需要NodeJS 6.0或更高版本。</strong>Homebrew默认安装的是最新版本，一般都满足要求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ brew install node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ brew install <span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<p>安装完node后建议设置npm镜像以加速后面的过程（或使用科学上网工具）。注意：不要使用cnpm！cnpm安装的模块路径比较奇怪，packager不能正常识别！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm config set registry https://registry.npm.taobao.org --global
$ npm config set disturl https://npm.taobao.org/dist --global" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> config set registry https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org --<span class="hljs-built_in">global</span>
$ <span class="hljs-built_in">npm</span> config set disturl https:<span class="hljs-regexp">//</span><span class="hljs-built_in">npm</span>.taobao.org/dist --<span class="hljs-built_in">global</span></code></pre>
<h3 id="articleHeader4">Xcode IDE</h3>
<p>如果要支持 iOS 平台则需要配置 iOS 开发环境<br>安装&nbsp;<a href="https://itunes.apple.com/us/app/xcode/id497799835?mt=12" rel="nofollow noreferrer" target="_blank">Xcode IDE</a>&nbsp;，启动一次 Xcode ，使 Xcode 自动安装开发者工具和确认使用协议。<br>安装 cocoaPods。</p>
<blockquote><p>虽然一般来说命令行工具都是默认安装了，但你最好还是启动Xcode，并在Xcode | Preferences | Locations菜单中检查一下是否装有某个版本的Command Line Tools。Xcode的命令行工具中也包含一些必须的工具，比如git等。</p></blockquote>
<h3 id="articleHeader5">Android Studio</h3>
<p>如果要支持 Android 平台则需要配置 Android 开发环境：安装&nbsp;<a href="https://developer.android.com/studio/install.html" rel="nofollow noreferrer" target="_blank">Android Studio</a>（推荐）或者&nbsp;<a href="https://developer.android.com/studio/releases/sdk-tools.html" rel="nofollow noreferrer" target="_blank">Android SDK</a>。打开&nbsp;<a href="https://developer.android.com/studio/run/managing-avds.html" rel="nofollow noreferrer" target="_blank">AVD Manager</a>&nbsp;，新建 Android 模拟器并启动 。（如果有安装&nbsp;<a href="https://www.docker.com/" rel="nofollow noreferrer" target="_blank">Docker</a>&nbsp;，请关闭 Docker Server 。）<br><strong>保证Android build-tool的版本为23.0.2。</strong></p>
<h3 id="articleHeader6">weex-toolkit</h3>
<p><a href="https://github.com/weexteam/weex-toolkit" rel="nofollow noreferrer" target="_blank">weex-toolkit</a>&nbsp;是官方提供的一个脚手架命令行工具，你可以使用它进行 Weex 项目的创建，调试以及打包等功能。<br>使用 <strong>npm</strong> 安装:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g weex-toolkit" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> -g weex-toolkit</code></pre>
<p>安装成功后，你输入&nbsp;weex，应该可以看到下面的提示效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000010984861" src="https://static.alili.tech/img/remote/1460000010984861" alt="" title="" style="cursor: pointer;"></span><br>如果你安装的过程中遇到了问题，比如&nbsp;<em>permission error</em>&nbsp;你可以去&nbsp;<a href="https://github.com/weexteam/weex-toolkit/issues" rel="nofollow noreferrer" target="_blank">weex-toolkit issues</a>&nbsp;找到解决方法。</p>
<h3 id="articleHeader7">weexpack</h3>
<p><a href="https://github.com/weexteam/weex-pack" rel="nofollow noreferrer" target="_blank">weexpack</a> 是新一代的weex应用工程和插件工程开发套件，是基于weex快速搭建应用原型的利器。可以创建weex应用工程和插件工程，快速打包 weex 应用并安装到手机运行，还可以创建weex插件模版并发布插件到weex应用市场。 使用weexpack 能够方便的在在weex工程和native工程中安装插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g weexpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> -g weexpack</code></pre>
<h1 id="articleHeader8">准备工程</h1>
<h2 id="articleHeader9">创建工程</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weexpack create appName" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>weexpack create appName</code></pre>
<p>生成工程的目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WeexProject 
├── README.md 
├── android.config.json 
├── config.xml 
├── hooks 
│&nbsp;&nbsp; └── README.md 
├── ios.config.json 
├── package.json 
├── platforms // 平台模版目录 
├── plugins // 插件下载目录 
│&nbsp;&nbsp; └── README.md 
├── src // 业务代码（we文件）目录
│&nbsp;&nbsp; └── index.we 
├── start 
├── start.bat 
├── tools 
│&nbsp;&nbsp; └── webpack.config.plugin.js 
├── web 
│&nbsp;&nbsp; ├── index.html 
│&nbsp;&nbsp; ├── index.js 
│&nbsp;&nbsp; └── js 
│&nbsp;&nbsp; └── init.js 
└── webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>WeexProject 
├── README<span class="hljs-selector-class">.md</span> 
├── android<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.json</span> 
├── config<span class="hljs-selector-class">.xml</span> 
├── hooks 
│&nbsp;&nbsp; └── README<span class="hljs-selector-class">.md</span> 
├── ios<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.json</span> 
├── package<span class="hljs-selector-class">.json</span> 
├── platforms <span class="hljs-comment">// 平台模版目录 </span>
├── plugins <span class="hljs-comment">// 插件下载目录 </span>
│&nbsp;&nbsp; └── README<span class="hljs-selector-class">.md</span> 
├── src <span class="hljs-comment">// 业务代码（we文件）目录</span>
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.we</span> 
├── start 
├── start<span class="hljs-selector-class">.bat</span> 
├── tools 
│&nbsp;&nbsp; └── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.plugin</span><span class="hljs-selector-class">.js</span> 
├── web 
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.html</span> 
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span> 
│&nbsp;&nbsp; └── js 
│&nbsp;&nbsp; └── init<span class="hljs-selector-class">.js</span> 
└── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<p>通过 create 命令创建的工程默认不包含 ios 和 android 工程模版，创建完成之后就可以切换到appName目录下并安装依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd appName &amp;&amp; npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">cd</span> appName &amp;&amp; npm install</code></pre>
<h2 id="articleHeader10">安装 weex 应用模版</h2>
<p>添加应用模版，官方提供的模版默认支持 weex bundle 调试和插件机制，注意模版名称均为小写，模版被安装到platforms目录下。<br><strong>IOS</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $ weexpack platform add ios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">  $ weexpack platform <span class="hljs-keyword">add</span><span class="bash"> ios</span></code></pre>
<p><strong>Android</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $ weexpack platform add android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">  $ weexpack platform <span class="hljs-keyword">add</span><span class="bash"> android</span></code></pre>
<p>安装模版之后，会在工程目录下增加如下模版目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="WeexProject 
├── platforms 
│   ├── ios
│   └── android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">WeexProject</span> 
├── platforms 
│   ├── ios
│   └── android</code></pre>
<h1 id="articleHeader11">Hello Weex</h1>
<p>直接上代码吧，一下是初始化的自带Weex代码，位于<code>/src/index.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;wrapper&quot; @click=&quot;update&quot;>
    <image :src=&quot;logoUrl&quot; class=&quot;logo&quot;></image>
    <text class=&quot;title&quot;>Hello "{{"target"}}"</text>
    <text class=&quot;desc&quot;>Now, let's use vue to build your weex app.</text>
  </div>
</template>

<style>
  .wrapper { align-items: center; margin-top: 120px; }
  .title { padding-top:40px; padding-bottom: 40px; font-size: 48px; }
  .logo { width: 360px; height: 156px; }
  .desc { padding-top: 20px; color:#888; font-size: 24px;}
</style>

<script>
  export default {
    data: {
      logoUrl: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png',
      target: 'World'
    },
    methods: {
      update: function (e) {
        this.target = 'Weex'
        console.log('target:', this.target)
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"update"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"logoUrl"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>Hello </span><span class="hljs-template-variable">"{{"target"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>Now, let's use vue to build your weex app.<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.wrapper</span> { <span class="hljs-attribute">align-items</span>: center; <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">120px</span>; }
  <span class="hljs-selector-class">.title</span> { <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">40px</span>; <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">40px</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">48px</span>; }
  <span class="hljs-selector-class">.logo</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">360px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">156px</span>; }
  <span class="hljs-selector-class">.desc</span> { <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20px</span>; <span class="hljs-attribute">color</span>:<span class="hljs-number">#888</span>; <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">logoUrl</span>: <span class="hljs-string">'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png'</span>,
      <span class="hljs-attr">target</span>: <span class="hljs-string">'World'</span>
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-attr">update</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-keyword">this</span>.target = <span class="hljs-string">'Weex'</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'target:'</span>, <span class="hljs-keyword">this</span>.target)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>Weex开发使用了VUE的框架，基本语法详见<a href="http://weex.apache.org/cn/references/" rel="nofollow noreferrer" target="_blank">官方手册</a></p>
<h1 id="articleHeader12">运行看效果</h1>
<h1 id="articleHeader13">web</h1>
<p>执行如下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build //web工程打包
$ npm run dev &amp; npm run serve " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>$ npm <span class="hljs-keyword">run</span><span class="bash"> build //web工程打包
</span>$ npm <span class="hljs-keyword">run</span><span class="bash"> dev &amp; npm run serve </span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984862" src="https://static.alili.tech/img/remote/1460000010984862" alt="执行效果" title="执行效果" style="cursor: pointer;"></span><br>或者执行单页调试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weex src/index.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">$ weex src/<span class="hljs-keyword">index</span>.vue</code></pre>
<ul><li>如果有<code>EACCES</code>报错，可以使用<code>sudo</code>命令执行。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984863" src="https://static.alili.tech/img/remote/1460000010984863" alt="执行效果" title="执行效果" style="cursor: pointer;"></span></p>
<h1 id="articleHeader14">虚拟机&amp;真机运行</h1>
<p>官方给的启动指令为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weex run ios " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ weex <span class="hljs-keyword">run</span><span class="bash"> ios </span></code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weexpack run ios " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ weexpack <span class="hljs-keyword">run</span><span class="bash"> ios </span></code></pre>
<p>但是如此运行坑较多不说，问题排查起来也是很麻烦，推荐使用xcode运行</p>
<h2 id="articleHeader15">xcode运行</h2>
<p><em>这块也是官方未提及的部分</em><br>添加Weex中ios工程<br><span class="img-wrap"><img data-src="/img/remote/1460000010984864" src="https://static.alili.tech/img/remote/1460000010984864" alt="添加Weex中ios工程" title="添加Weex中ios工程" style="cursor: pointer;"></span><br>选对工程文件，<br>注意：此处应选择文件<strong>WeexDemo.xcworkspace</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000010984865" src="https://static.alili.tech/img/remote/1460000010984865" alt="" title="" style="cursor: pointer;"></span><br>打开后简单的简单点配置下基本配置，如项目名、识别符、版本、开发者等<br><span class="img-wrap"><img data-src="/img/remote/1460000010984866" src="https://static.alili.tech/img/remote/1460000010984866" alt="" title="" style="cursor: pointer; display: inline;"></span><br>你可以选择虚拟机活着真机执行<br>不过执行前你要保证代码是最新打包的<br>打包方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ weex build ios " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">$ weex <span class="hljs-keyword">build </span>ios </code></pre>
<p>注意了！到这个地方就不要进行下去了，直接<code>control+c</code>退出，因为如果继续进行下去就会覆盖掉之前在XCode上的配置，后面就没法继续进行了<br><span class="img-wrap"><img data-src="/img/bVUrim?w=1412&amp;h=692" src="https://static.alili.tech/img/bVUrim?w=1412&amp;h=692" alt="" title="" style="cursor: pointer; display: inline;"></span><br>这一步是关键骤主，要的作用是将weex工程打包成jsbundle文件，并且放入对应<code>plantforms</code>下的ios和android包下<br>具体地址为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# ios位置
/platforms/ios/bundlejs/index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-comment"># ios位置</span>
<span class="hljs-regexp">/platforms/i</span>os<span class="hljs-regexp">/bundlejs/i</span>ndex.js</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# android位置
/platforms/android/app/src/main/assets/dist/index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-comment"># android位置</span>
<span class="hljs-regexp">/platforms/</span>android<span class="hljs-regexp">/app/</span>src<span class="hljs-regexp">/main/</span>assets<span class="hljs-regexp">/dist/i</span>ndex.js</code></pre>
<p>打包后即可安装到真机或者虚拟机了。<br><span class="img-wrap"><img data-src="/img/remote/1460000010984867" src="https://static.alili.tech/img/remote/1460000010984867" alt="" title="" style="cursor: pointer;"></span><br>然后点击执行即可<br><span class="img-wrap"><img data-src="/img/remote/1460000010984868" src="https://static.alili.tech/img/remote/1460000010984868" alt="" title="" style="cursor: pointer;"></span><br>如果你看到如下界面，说明你的环境和配置已经走通了，后面可以发挥你的真正实力了！<br><span class="img-wrap"><img data-src="/img/remote/1460000010984869" src="https://static.alili.tech/img/remote/1460000010984869" alt="" title="" style="cursor: pointer;"></span><br>如果你看到的是如下界面，说明还有地方需要打磨<br><span class="img-wrap"><img data-src="/img/remote/1460000010984870" src="https://static.alili.tech/img/remote/1460000010984870" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader16">帮你填坑</h1>
<p>如果你构建的时候报如下错误，请对号入座解决问题。<br>1、'ATSDK/ATManager.h' file not found</p>
<blockquote><p>'ATSDK/ATManager.h' file not found</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984871" src="https://static.alili.tech/img/remote/1460000010984871" alt="" title="" style="cursor: pointer;"></span><br>解决方法：<br><a href="http://www.jianshu.com/p/88a33c570692" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/88a3...</a></p>
<p>2、could not find gradle wrapper within android sdk</p>
<blockquote><p>error: could not find gradle wrapper within android sdk. might need to update your android sdk</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984872" src="https://static.alili.tech/img/remote/1460000010984872" alt="" title="" style="cursor: pointer;"></span><br>解决方法：<br><a href="http://www.jianshu.com/p/5d925413c79f" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/5d92...</a></p>
<p>3、Environment variable $ANDROID_HOME not found</p>
<blockquote><p>MacOS开发Android app经常会遇到环境的坑，$ANDROID_HOME就是其中之一</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984873" src="https://static.alili.tech/img/remote/1460000010984873" alt="" title="" style="cursor: pointer;"></span><br>解决方法：<br><a href="http://www.jianshu.com/p/a77396301b22" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/a773...</a></p>
<p>4、weex-vue-render/index.js（404 Not Found）</p>
<blockquote><p>资源报错【weex-vue-render/index.js】（404 Not Found）</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010984874" src="https://static.alili.tech/img/remote/1460000010984874" alt="" title="" style="cursor: pointer;"></span><br>解决方法：<br><a href="http://www.jianshu.com/p/75867f209310" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/7586...</a></p>
<p>5、ERROR in xxx.js from UglifyJs</p>
<blockquote><p>ERROR in index.js from UglifyJs</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011212549" src="https://static.alili.tech/img/remote/1460000011212549" alt="" title="" style="cursor: pointer;"></span></p>
<p>这是因为webpack在打包vue文件时没有成功转换ES6的语法<br>解决方法：<br><a href="https://segmentfault.com/a/1190000011212544">https://segmentfault.com/a/11...</a></p>
<p>其他问题后续持续更新，欢迎留言或关注专题【<a href="https://segmentfault.com/blog/willspace" target="_blank">willspace</a>】</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【入门】WEEX快速创建工程 Hello World

## 原文链接
[https://segmentfault.com/a/1190000010984857](https://segmentfault.com/a/1190000010984857)

