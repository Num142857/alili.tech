---
title: 'cordova研习笔记(一) —— 初试牛刀之cordova.js概要' 
date: 2019-01-16 2:30:07
hidden: true
slug: zuljw35yls
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>来新公司的第一个任务，研究hybrid App中间层实现原理，做中间层插件开发。这个任务挺有意思，也很有挑战性，之前在DCloud虽然做过5+ App开发，但是中间层的东西确实涉及不多。本系列文章属于系列开篇cordova学习笔记，本文主要是从零开始搭建一个cordova工程，并了解cordova开发的基本内容。</p>
<h2 id="articleHeader1"><a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/cli/index.html" rel="nofollow noreferrer" target="_blank">创建第一个App</a></h2>
<p>Apache Cordova是一个开源的移动开发框架。允许你用标准的web技术-HTML5,CSS3和JavaScript做跨平台开发。 应用在每个平台的具体执行被封装了起来，并依靠符合标准的API绑定去访问每个设备的功能，比如说：传感器、数据、网络状态等。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009199804" src="https://static.alili.tech/img/remote/1460000009199804" alt="cordova应用架构" title="cordova应用架构" style="cursor: pointer; display: inline;"></span></p>
<p>Cordova官网：<a href="http://cordova.apache.org/" rel="nofollow noreferrer" target="_blank">http://cordova.apache.org/</a><br>Cordova中文网：<a href="http://cordova.axuer.com/" rel="nofollow noreferrer" target="_blank">http://cordova.axuer.com/</a><br>Cordova中文站：<a href="http://www.cordova.org.cn/" rel="nofollow noreferrer" target="_blank">http://www.cordova.org.cn/</a></p>
<h3 id="articleHeader2"><strong>1.安装 Cordova CLI</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g cordova" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g cordova</code></pre>
<p>安装完成可以通过<code>cordova -v</code>查看版本号，本文是在V6.5.0下构建。</p>
<h3 id="articleHeader3"><strong>2.新建项目</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova create <PATH> [ID [NAME [CONFIG]]] [options]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code style="word-break: break-word; white-space: initial;">cordova create &lt;PATH&gt; <span class="hljs-comment">[ID <span class="hljs-comment">[NAME <span class="hljs-comment">[CONFIG]</span>]</span>]</span> <span class="hljs-comment">[options]</span></code></pre>
<p><strong>Create a Cordova project：</strong></p>
<ul>
<li>PATH —— 项目路径</li>
<li>ID —— app 包名 - used in &lt;widget id&gt;</li>
<li>NAME —— app 名称</li>
<li>CONFIG —— 配置文件地址 json string whose key/values will be included in [PATH]/.cordova/config.json</li>
</ul>
<p><strong>Options：</strong></p>
<ul>
<li>--template=&lt;PATH|NPM PACKAGE|GIT URL&gt; ... use a custom template located locally, in NPM, or GitHub.</li>
<li>--copy-from|src=&lt;PATH&gt; .................. deprecated, use --template instead.</li>
<li>--link-to=&lt;PATH&gt; ........................ symlink to custom www assets without creating a copy.</li>
</ul>
<p><strong>Example：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova create hello-cordova io.zhaomenghuan HelloCordova" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">cordova create hello-cordova io<span class="hljs-selector-class">.zhaomenghuan</span> HelloCordova</code></pre>
<p>这将会为你的cordova应用创造必须的目录。默认情况下，cordova create命令生成基于web的应用程序的骨骼，项目的主页是 www/index.html 文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009199805" src="https://static.alili.tech/img/remote/1460000009199805" alt="图为创建好的项目" title="图为创建好的项目" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4"><strong>3.添加平台</strong></h3>
<p>所有后续命令都需要在项目目录或者项目目录的任何子目录运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd hello-cordova" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> hello-cordova</code></pre>
<p>给你的App添加目标平台。我们将会添加<code>ios</code>和<code>android</code>平台，并确保他们保存在了config.xml中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova platform add ios --save
cordova platform add android --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>cordova <span class="hljs-built_in">platform</span> <span class="hljs-built_in">add</span> ios <span class="hljs-comment">--save</span>
cordova <span class="hljs-built_in">platform</span> <span class="hljs-built_in">add</span> android <span class="hljs-comment">--save</span></code></pre>
<p>运行<code>add</code>或者<code>remove</code>平台的命令将会影响项目<code>platforms</code>的内容，在这个目录中每个指定平台都有一个子目录。</p>
<blockquote><p>注意：在你使用CLI创建应用的时候， 不要 修改/platforms/目录中的任何文件。当准备构建应用或者重新安装插件时这个目录通常会被重写。</p></blockquote>
<p>检查你当前平台设置状况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova platform is

Installed platforms:
  android 6.1.2
Available platforms:
  amazon-fireos ~3.6.3 (deprecated)
  blackberry10 ~3.8.0
  browser ~4.1.0
  firefoxos ~3.6.3
  webos ~3.7.0
  windows ~4.4.0
  wp8 ~3.8.2 (deprecated)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">cordova</span> <span class="hljs-selector-tag">platform</span> <span class="hljs-selector-tag">is</span>

<span class="hljs-selector-tag">Installed</span> <span class="hljs-selector-tag">platforms</span>:
  <span class="hljs-selector-tag">android</span> 6<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.2</span>
<span class="hljs-selector-tag">Available</span> <span class="hljs-selector-tag">platforms</span>:
  <span class="hljs-selector-tag">amazon-fireos</span> ~3<span class="hljs-selector-class">.6</span><span class="hljs-selector-class">.3</span> (<span class="hljs-selector-tag">deprecated</span>)
  <span class="hljs-selector-tag">blackberry10</span> ~3<span class="hljs-selector-class">.8</span><span class="hljs-selector-class">.0</span>
  <span class="hljs-selector-tag">browser</span> ~4<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.0</span>
  <span class="hljs-selector-tag">firefoxos</span> ~3<span class="hljs-selector-class">.6</span><span class="hljs-selector-class">.3</span>
  <span class="hljs-selector-tag">webos</span> ~3<span class="hljs-selector-class">.7</span><span class="hljs-selector-class">.0</span>
  <span class="hljs-selector-tag">windows</span> ~4<span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.0</span>
  <span class="hljs-selector-tag">wp8</span> ~3<span class="hljs-selector-class">.8</span><span class="hljs-selector-class">.2</span> (<span class="hljs-selector-tag">deprecated</span>)</code></pre>
<p>安装构建先决条件：<br>要构建和运行App，你需要安装每个你需要平台的SDK。另外，当你使用浏览器开发你可以添加 browser平台，它不需要任何平台SDK。</p>
<p>检测你是否满足构建平台的要求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova requirements

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed android-7,android-8,android-9,android-10,android-11,android-12,android-13,android-14,android-15,android-16,android-17,android-18,android-19,android-20,android-21,android-22,android-23,android-24,android-25
Gradle: installed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>cordova requirements

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed android<span class="hljs-string">-7</span>,android<span class="hljs-string">-8</span>,android<span class="hljs-string">-9</span>,android<span class="hljs-string">-10</span>,android<span class="hljs-string">-11</span>,android<span class="hljs-string">-12</span>,android<span class="hljs-string">-13</span>,android<span class="hljs-string">-14</span>,android<span class="hljs-string">-15</span>,android<span class="hljs-string">-16</span>,android<span class="hljs-string">-17</span>,android<span class="hljs-string">-18</span>,android<span class="hljs-string">-19</span>,android<span class="hljs-string">-20</span>,android<span class="hljs-string">-21</span>,android<span class="hljs-string">-22</span>,android<span class="hljs-string">-23</span>,android<span class="hljs-string">-24</span>,android<span class="hljs-string">-25</span>
Gradle: installed</code></pre>
<p>初次使用我们可能会遇到下面的报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: Failed to find 'ANDROID_HOME' environment variable. Try setting setting it manually.
Failed to find 'android' command in your 'PATH'. Try update your 'PATH' to include path to valid SDK directory." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>Error: Failed <span class="hljs-keyword">to</span> <span class="hljs-built_in">find</span> <span class="hljs-string">'ANDROID_HOME'</span> environment variable. <span class="hljs-keyword">Try</span> setting setting it manually.
Failed <span class="hljs-keyword">to</span> <span class="hljs-built_in">find</span> <span class="hljs-string">'android'</span> command <span class="hljs-built_in">in</span> your <span class="hljs-string">'PATH'</span>. <span class="hljs-keyword">Try</span> update your <span class="hljs-string">'PATH'</span> <span class="hljs-keyword">to</span> include path <span class="hljs-keyword">to</span> valid SDK directory.</code></pre>
<p>这是因为我们没有配置环境变量：</p>
<ul>
<li>设置JAVA_HOME环境变量，指定为JDK安装路径</li>
<li>设置ANDROID_HOME环境变量，指定为Android SDK安装路径</li>
<li>添加Android SDK的tools和platform-tools目录到你的PATH</li>
</ul>
<p>对于android平台下的环境配置在这里不再赘述，具体可以参考：</p>
<ul>
<li><a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/platforms/android/index.html#requirements-and-support" rel="nofollow noreferrer" target="_blank">Android平台的要求</a></li>
<li><a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/platforms/ios/index.html#requirements-and-support" rel="nofollow noreferrer" target="_blank">iOS平台的要求</a></li>
<li><a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/platforms/win8/index.html#requirements-and-support" rel="nofollow noreferrer" target="_blank">Windows平台的要求</a></li>
</ul>
<h3 id="articleHeader5"><strong>4.构建App</strong></h3>
<p>默认情况下,&nbsp;cordova create生产基于web应用程序的骨架，项目开始页面位于www/index.html<br>&nbsp;文件。任何初始化任务应该在www/js/index.js文件中的<a href="http://cordova.axuer.com/docs/zh-cn/latest/cordova/events/events.html#deviceready" rel="nofollow noreferrer" target="_blank">deviceready</a>事件的事件处理函数中。</p>
<p>运行下面命令为所有添加的平台构建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">cordova build</span></code></pre>
<p>你可以在每次构建中选择限制平台范围 - 这个例子中是<code>android</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova build android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">cordova</span> <span class="hljs-keyword">build </span><span class="hljs-keyword">android</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009199806" src="https://static.alili.tech/img/remote/1460000009199806" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>注意：首次使用时，命令行提示 <code>Downloading https://services.gradle.org/distributions/gradle-2.14.1-all.zip</code>，是在下载对应的gradle并自动解压安装，根据网络状况，可能耗时极长，且容易报错。</p>
<p>使用Cordova编译Android平台程序提示：Could not reserve enough space for 2097152KB object heap。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error occurred during initialization of VM
Could not reserve enough space for 2097152KB object heap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">Error </span>occurred during initialization of VM
Could not reserve enough space for 2097152KB object heap</code></pre>
<p>大体的意思是系统内存不够用，创建VM失败。试了网上好几种方法都不行，最后这个方法可以了：</p>
<p>开始-&gt;控制面板-&gt;系统-&gt;高级设置-&gt;环境变量-&gt;系统变量<br>新建变量：<br>变量名: _JAVA_OPTIONS   <br>变量值: -Xmx512M</p>
<h3 id="articleHeader6"><strong>5.运行App</strong></h3>
<p>我们有多种方式运行我们的App，在不同场景下使用不同的方式有助于我们快速开发和测试我们的应用。</p>
<p>在命令行运行下面的命令，会重新构建App并可以在特定平台的模拟器上查看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova emulate android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">cordova <span class="hljs-built_in">emulate</span> android</code></pre>
<p>你可以将你的手机插入电脑，在手机上直接测试App：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova run android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova <span class="hljs-keyword">run</span><span class="bash"> android</span></code></pre>
<p>在进行打包操作前，我们可以通过创建一个本地服务预览app UI，使用指定的端口或缺省值为8000运行本地Web服务器www/assets。访问项目：<a>http://HOST_IP:PORT/PLATFORM/www</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova serve [port]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">cordova serve <span class="hljs-string">[port]</span></code></pre>
<p>参考文档：</p>
<ul>
<li><a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/platforms/android/index.html#setting-up-an-emulator" rel="nofollow noreferrer" target="_blank">设置Android模拟器</a></li>
<li><a href="http://cordova.axuer.com/docs/zh-cn/latest/reference/cordova-cli/index.html#cordova-run-command" rel="nofollow noreferrer" target="_blank">Cordova run 命令参考文档</a></li>
<li><a href="http://cordova.axuer.com/docs/zh-cn/latest/reference/cordova-cli/index.html#cordova-emulate-command" rel="nofollow noreferrer" target="_blank">Cordova emulate 命令参考文档</a></li>
</ul>
<h3 id="articleHeader7"><strong>6.安装插件</strong></h3>
<p>cordova的强大之处在于我们可以通过安装插件，拓展我们web工程的能力，比如调用系统底层API来调用设备上的底层功能，如摄像头、相册。通过<code>cordova plugin</code>命令实现插件管理。</p>
<p>可以在这里搜索需要的插件：<a href="http://cordova.apache.org/plugins/" rel="nofollow noreferrer" target="_blank">Cordova Plugins</a> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova {plugin | plugins} [
    add <plugin-spec> [..] {--searchpath=<directory> | --noregistry | --link | --save | --browserify | --force} |
    {remove | rm} {<pluginid> | <name>} --save |
    {list | ls} |
    search [<keyword>] |
    save |
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>cordova {plugin |<span class="hljs-string"> plugins} [
    add &lt;plugin-spec&gt; [..] {--searchpath=&lt;directory&gt; </span>|<span class="hljs-string"> --noregistry </span>|<span class="hljs-string"> --link </span>|<span class="hljs-string"> --save </span>|<span class="hljs-string"> --browserify </span>|<span class="hljs-string"> --force} </span>|
    {remove |<span class="hljs-string"> rm} {&lt;pluginid&gt; </span>|<span class="hljs-string"> &lt;name&gt;} --save </span>|
    {list |<span class="hljs-string"> ls} </span>|
    search [<span class="hljs-variable">&lt;keyword&gt;</span>] |<span class="hljs-string">
    save </span>|
]</code></pre>
<p>添加插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova plugin add <plugin-spec> [...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">cordova plugin <span class="hljs-keyword">add</span><span class="bash"> &lt;plugin-spec&gt; [...]</span></code></pre>
<p>移除插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova plugin remove [...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">cordova plugin remove <span class="hljs-string">[...]</span></code></pre>
<h3 id="articleHeader8"><strong>7.平台为中心的工作流开发App</strong></h3>
<p>上面我们是在跨平台(CLI)的工作流进行，原则上如果我们不需要自己写原生层自定义组件，我们完全可以只在CLI上完成我们的工作，当然如果需要进一步深入了解cordova native与js的通信联系，我们需要切换到平台为中心的工作流，即将我们的cordova工程导入到原生工程。例如：我们可以使用android studio导入我们新建的cordova工程。<br><span class="img-wrap"><img data-src="/img/remote/1460000009199807" src="https://static.alili.tech/img/remote/1460000009199807" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9"><a href="http://cordova.axuer.com/docs/zh-cn/6.x/guide/hybrid/plugins/index.html" rel="nofollow noreferrer" target="_blank">自定义插件开发</a></h2>
<p>官方推荐的插件遵循相同的目录结构，根目录下是<code>plugin.xml</code>配置文件，src目录下放平台原生代码，www下放js接口代码，基本配置方法和代码结构由一定规律，我们使用plugman可以生成一个插件模板，改改就可以写一个自定义插件。</p>
<h3 id="articleHeader10"><strong>1.安装 plugman ，使用 plugman 创建插件模板</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g plugman" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g plugman</code></pre>
<p>比如这里我们创建一个nativeUI的插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugman create --name NativeUI --plugin_id cordova-plugin-nativeui --plugin_version 0.0.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">plugman</span> <span class="hljs-comment">create</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">name</span> <span class="hljs-comment">NativeUI</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">plugin_id</span> <span class="hljs-comment">cordova</span><span class="hljs-literal">-</span><span class="hljs-comment">plugin</span><span class="hljs-literal">-</span><span class="hljs-comment">nativeui</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">plugin_version</span> <span class="hljs-comment">0</span><span class="hljs-string">.</span><span class="hljs-comment">0</span><span class="hljs-string">.</span><span class="hljs-comment">1</span></code></pre>
<p>参数介绍：<br>pluginName: 插件名字：NativeUI<br>pluginID: 插件id : cordova-plugin-nativeui<br>oversion: 版本 : 0.0.1<br>directory:一个绝对或相对路径的目录，该目录将创建插件项目<br>variable NAME=VALUE: 额外的描述，如作者信息和相关描述</p>
<p>进入插件目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd NativeUI" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> NativeUI</code></pre>
<p>给 plugin.xml 增加Android平台</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugman platform add --platform_name android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">plugman <span class="hljs-built_in">platform</span> <span class="hljs-built_in">add</span> <span class="hljs-comment">--platform_name android</span></code></pre>
<p>生成的插件文件结构为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NativeUI：

├── src
    └── android
        └── NativeUI.java
├── www
    └── NativeUI.js
└── plugin.xml" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>NativeUI：

├── src
    └── android
        └── NativeUI<span class="hljs-selector-class">.java</span>
├── www
    └── NativeUI<span class="hljs-selector-class">.js</span>
└── plugin.xml</code></pre>
<h3 id="articleHeader11"><strong>2.修改配置文件</strong></h3>
<p><code>plugin.xml</code>文件字段含义：</p>
<table>
<thead><tr>
<th align="center">元素</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center">plugin</td>
<td align="left">定义命名空间，ID和插件版本。应该用定义在<em><a href="http://apache.org/cordova/ns/plugins/1.0/em" rel="nofollow noreferrer" target="_blank">http://apache.org/cordova/ns/...</a>命名空间。plugin的ID在输入<em>cordova plugins</em>命令时在插件列表中显示。</em>
</td>
</tr>
<tr>
<td align="center">name</td>
<td align="left">定义插件的名字。</td>
</tr>
<tr>
<td align="center">description</td>
<td align="left">定义插件的描述信息。</td>
</tr>
<tr>
<td align="center">author</td>
<td align="left">定义插件作者的名字。</td>
</tr>
<tr>
<td align="center">keywords</td>
<td align="left">定义与插件相关的关键字。Cordova研发组建立了公开、可搜索的插件仓库，添加的关键字能在你把插件提交到仓库后帮助被发现。</td>
</tr>
<tr>
<td align="center">license</td>
<td align="left">定义插件的许可。</td>
</tr>
<tr>
<td align="center">engines</td>
<td align="left">用来定义插件支持的Cordova版本。再添加<em>engine</em>元素定义每个支持的Cordova版本。</td>
</tr>
<tr>
<td align="center">js-module</td>
<td align="left">指js文件名，而这个文件会自动以<code>&lt;script</code>&gt;标签的形式添加到Cordova项目的起始页。通过在<em>js-module</em>中列出插件，可以减少开发者的工作。</td>
</tr>
<tr>
<td align="center">info</td>
<td align="left">它是另一个除了<em>description</em>外说插件信息的地方。</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?xml version='1.0' encoding='utf-8'?>
<plugin id=&quot;cordova-plugin-nativeui&quot; version=&quot;0.0.1&quot; xmlns=&quot;http://apache.org/cordova/ns/plugins/1.0&quot; xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;>
    <name>NativeUI</name>
    <js-module name=&quot;NativeUI&quot; src=&quot;www/NativeUI.js&quot;>
        <clobbers target=&quot;agree.nativeUI&quot; />
    </js-module>
    <platform name=&quot;android&quot;>
        <config-file parent=&quot;/*&quot; target=&quot;res/xml/config.xml&quot;>
            <feature name=&quot;NativeUI&quot;>
                <param name=&quot;android-package&quot; value=&quot;cn.com.agree.nativeui.NativeUI&quot; />
            </feature>
        </config-file>
        <config-file parent=&quot;/*&quot; target=&quot;AndroidManifest.xml&quot;></config-file>
        <source-file src=&quot;src/android/NativeUI.java&quot; target-dir=&quot;src/cn/com/agree/nativeui&quot; />
    </platform>
</plugin>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">'1.0'</span> encoding=<span class="hljs-string">'utf-8'</span><span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">plugin</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"cordova-plugin-nativeui"</span> <span class="hljs-attr">version</span>=<span class="hljs-string">"0.0.1"</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://apache.org/cordova/ns/plugins/1.0"</span> <span class="hljs-attr">xmlns:android</span>=<span class="hljs-string">"http://schemas.android.com/apk/res/android"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>NativeUI<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">js-module</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"NativeUI"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"www/NativeUI.js"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">clobbers</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"agree.nativeUI"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">js-module</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">platform</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"android"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">config-file</span> <span class="hljs-attr">parent</span>=<span class="hljs-string">"/*"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"res/xml/config.xml"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">feature</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"NativeUI"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">param</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"android-package"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"cn.com.agree.nativeui.NativeUI"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">feature</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">config-file</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">config-file</span> <span class="hljs-attr">parent</span>=<span class="hljs-string">"/*"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"AndroidManifest.xml"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">config-file</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">source-file</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"src/android/NativeUI.java"</span> <span class="hljs-attr">target-dir</span>=<span class="hljs-string">"src/cn/com/agree/nativeui"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">platform</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">plugin</span>&gt;</span></code></pre>
<p>这个配置文件有几个地方很关键，一开始没有认真看，将插件导进工程跑的时候各种问题，十分头痛，不得不重新认真看看<a href="http://cordova.axuer.com/docs/zh-cn/6.x/plugin_ref/spec.html" rel="nofollow noreferrer" target="_blank">plugin.xml文档</a>。</p>
<ul>
<li>id：原则上没有严格规定，参考官方插件写法，这里我也写的是<code>cordova-plugin-nativeui</code>，通过plugman创建插件模板的时候需要指定。</li>
<li>name：插件名称。</li>
<li>clobbers-&gt;target：用于指定插入module.exports的窗口对象下的命名空间，也就是用户调用该插件时的js层暴露的顶层对象。这个很关键，虽然可以任意指定，但是涉及到我们调用插件的属性或者方法，所以需要特别关注。plugman默认生成的是将id中的<code>-</code>转换成`.'的对象。这里需要说明的是我们可以写多个js-module，每个js-module下可以指定不同的clobbers。</li>
<li>feature -&gt; param - &gt; value 标识了实际提供服务的Native类别名称，这里直接定位至具体类，然而上述通过plugman生成模板的时候中没有指定NativeUI的包名，会自定生成<code>cordova-plugin-nativeui.NativeUI</code>，这里我们需要改成符合自己要求的类名，如我这里使用公司的域名：<code>cn.com.agree.nativeui.NativeUI</code>。需要说明的是这里的类名可以与插件名称不同。</li>
<li>source-file -&gt; target-dir 同理<code>target-dir</code>需要修改为： <code>src/cn/com/agree/nativeui</code>，同时需要修改平台下的native部分的代码：如：<code>package cn.com.agree.nativeui;</code>
</li>
<li>platform -&gt; config-file下可以指定程序所需的权限<code>uses-permission</code>，如：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<config-file target=&quot;AndroidManifest.xml&quot; parent=&quot;/*&quot;>
    <uses-permission android:name=&quot;android.permission.ACCESS_NETWORK_STATE&quot; />
</config-file>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;config-<span class="hljs-built_in">file</span> target=<span class="hljs-string">"AndroidManifest.xml"</span> parent=<span class="hljs-string">"/*"</span>&gt;
    &lt;uses-permission android:<span class="hljs-built_in">name</span>=<span class="hljs-string">"android.permission.ACCESS_NETWORK_STATE"</span> /&gt;
&lt;/config-<span class="hljs-built_in">file</span>&gt;</code></pre>
<h3 id="articleHeader12"><strong>3.导入到平台工程中的目录结构</strong></h3>
<p>这里我们以android平台为例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009199808" src="https://static.alili.tech/img/remote/1460000009199808" alt="" title="" style="cursor: pointer;"></span></p>
<p>cordova.js在创建Android工程的时候，是从cordova的lib目录下Copy到<code>platforms\android\assets\www\cordova.js</code>的。同时备份到<code>platforms\android\platform_www\cordova.js</code>。下一篇文章我会试着读一下cordova.js的源码，这里对cordova.js暂不做深入探究。</p>
<p>这里我们主要关心几个地方，我们的原生代码在src目录下，assets/www目录下是我们的web 程序。www目录下的plugins文件夹就是我们的插件js部分，cordova_plugins.js是根据plugins文件夹的内容生成的。 </p>
<p>cordova_plugins.js的整体结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        &quot;id&quot;: &quot;cordova-plugin-nativeui.NativeUI&quot;,
        &quot;file&quot;: &quot;plugins/cordova-plugin-nativeui/www/NativeUI.js&quot;,
        &quot;pluginId&quot;: &quot;cordova-plugin-nativeui&quot;,
        &quot;clobbers&quot;: [
            &quot;agree.nativeUI&quot;
        ]
    },
    ...
];
module.exports.metadata = 
// TOP OF METADATA
{
    &quot;cordova-plugin-nativeui&quot;: &quot;0.0.1&quot;,
    ...
};
// BOTTOM OF METADATA
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>cordova.define(<span class="hljs-string">'cordova/plugin_list'</span>, function(require, <span class="hljs-keyword">exports</span>, <span class="hljs-keyword">module</span>) {
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = [
    {
        <span class="hljs-string">"id"</span>: <span class="hljs-string">"cordova-plugin-nativeui.NativeUI"</span>,
        <span class="hljs-string">"file"</span>: <span class="hljs-string">"plugins/cordova-plugin-nativeui/www/NativeUI.js"</span>,
        <span class="hljs-string">"pluginId"</span>: <span class="hljs-string">"cordova-plugin-nativeui"</span>,
        <span class="hljs-string">"clobbers"</span>: [
            <span class="hljs-string">"agree.nativeUI"</span>
        ]
    },
    ...
];
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>.metadata = 
<span class="hljs-comment">// TOP OF METADATA</span>
{
    <span class="hljs-string">"cordova-plugin-nativeui"</span>: <span class="hljs-string">"0.0.1"</span>,
    ...
};
<span class="hljs-comment">// BOTTOM OF METADATA</span>
});</code></pre>
<h2 id="articleHeader13"><a href="http://cordova.axuer.com/docs/zh-cn/6.x/guide/platforms/android/plugin.html" rel="nofollow noreferrer" target="_blank">Android插件开发指南</a></h2>
<p>Android插件基于Cordova-Android，它是基于具有Javscript-to-native桥接的Android WebView构建的。 Android插件的本机部分至少包含一个扩展CordovaPlugin类的Java类，并重写其一个执行方法。</p>
<h3 id="articleHeader14"><strong>插件类映射</strong></h3>
<p>插件的JavaScript接口使用cordova.exec方法，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova.exec(<successFunction>, <failFunction>, <service>, <action>, [<args>]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">cordova.exec(&lt;successFunction&gt;, &lt;failFunction&gt;, &lt;service&gt;, &lt;action&gt;, <span class="hljs-meta">[&lt;args&gt;]</span>);</code></pre>
<ul>
<li>
<code>function(winParam) {}</code>: 成功回调</li>
<li>
<code>function(error) {}</code>: 错误回调</li>
<li>
<code>service</code>: 原生层服务名称</li>
<li>
<code>action</code>: js层调用方法名</li>
<li>
<code>[args]</code>: js层传递到原生层的数据</li>
</ul>
<p>这将WebView的请求传递给Android本机端，有效地在服务类上调用action方法，并在args数组中传递其他参数。无论您将插件分发为Java文件还是作为自己的jar文件，必须在Cordova-Android应用程序的res / xml / config.xml文件中指定该插件。 有关如何使用plugin.xml文件注入此要素的详细信息，请参阅应用程序插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<feature name=&quot;<service_name>&quot;>
    <param name=&quot;android-package&quot; value=&quot;<full_name_including_namespace>&quot; />
</feature>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">feature</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"&lt;service_name&gt;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">param</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"android-package"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"&lt;full_name_including_namespace&gt;"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">feature</span>&gt;</span></code></pre>
<h3 id="articleHeader15"><strong>插件初始化及其生命周期</strong></h3>
<p>一个插件对象的一个实例是为每个WebView的生命创建的。 插件不会被实例化，直到它们被JavaScript的调用首次引用为止，除非在config.xml中将具有onload name属性的&lt;param&gt;设置为“true”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<feature name=&quot;Echo&quot;>
    <param name=&quot;android-package&quot; value=&quot;<full_name_including_namespace>&quot; />
    <param name=&quot;onload&quot; value=&quot;true&quot; />
</feature>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>&lt;feature <span class="hljs-built_in">name</span>=<span class="hljs-string">"Echo"</span>&gt;
    &lt;<span class="hljs-built_in">param</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"android-package"</span> value=<span class="hljs-string">"&lt;full_name_including_namespace&gt;"</span> /&gt;
    &lt;<span class="hljs-built_in">param</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"onload"</span> value=<span class="hljs-string">"true"</span> /&gt;
&lt;/feature&gt;</code></pre>
<p>插件使用 initialize 初始化启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Override
public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    // your init code here
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-meta">@Override</span>
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">initialize</span><span class="hljs-params">(CordovaInterface cordova, CordovaWebView webView)</span> </span>{
    <span class="hljs-keyword">super</span>.initialize(cordova, webView);
    <span class="hljs-comment">// your init code here</span>
}</code></pre>
<p>插件还可以访问Android生命周期事件，并可以通过扩展所提供的方法（onResume，onDestroy等）来处理它们。 具有长时间运行请求的插件，媒体播放，侦听器或内部状态等背景活动应实现onReset（）方法。 当WebView导航到新页面或刷新时，它会执行，这会重新加载JavaScript。</p>
<h3 id="articleHeader16"><strong>编写Android Java插件</strong></h3>
<p>一个JavaScript调用触发对本机端的插件请求，并且相应的Java插件在config.xml文件中正确映射，但最终的Android Java Plugin类是什么样的？ 使用JavaScript的exec函数发送到插件的任何东西都被传递到插件类的execute方法中。 </p>
<p>插件的JavaScript不会在WebView界面的主线程中运行; 而是在WebCore线程上运行，执行方法也是如此。 如果需要与用户界面进行交互，应该使用Activity的runOnUiThread方法。</p>
<p>如果不需要在UI线程上运行，但不希望阻止WebCore线程，则应使用<code>cordova.getThreadPool()</code>获得的<code>Cordova ExecutorService</code>执行代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
@Override
public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals(&quot;toast&quot;)) {
        this.toast(args.getString(0));
        return true;
    }
    return false;
}

/**
 * Builds and shows a native Android toast with given Strings
 *
 * @param message The message the toast should display
 */
private void toast(final String message) {
    final CordovaInterface cordova = this.cordova;
    if (message != null &amp;&amp; message.length() > 0) {
        final int duration = Toast.LENGTH_SHORT;
        Runnable runnable = new Runnable() {
            public void run() {
                Toast toast = Toast.makeText(cordova.getActivity().getApplicationContext(), message, duration);
                toast.show();
            }
        };
        cordova.getActivity().runOnUiThread(runnable);
    }
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>...
<span class="hljs-meta">@Override</span>
<span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">boolean</span> <span class="hljs-title">execute</span><span class="hljs-params">(String action, JSONArray args, CallbackContext callbackContext)</span> <span class="hljs-keyword">throws</span> JSONException </span>{
    <span class="hljs-keyword">if</span> (action.equals(<span class="hljs-string">"toast"</span>)) {
        <span class="hljs-keyword">this</span>.toast(args.getString(<span class="hljs-number">0</span>));
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
}

<span class="hljs-comment">/**
 * Builds and shows a native Android toast with given Strings
 *
 * <span class="hljs-doctag">@param</span> message The message the toast should display
 */</span>
<span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">toast</span><span class="hljs-params">(<span class="hljs-keyword">final</span> String message)</span> </span>{
    <span class="hljs-keyword">final</span> CordovaInterface cordova = <span class="hljs-keyword">this</span>.cordova;
    <span class="hljs-keyword">if</span> (message != <span class="hljs-keyword">null</span> &amp;&amp; message.length() &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span> duration = Toast.LENGTH_SHORT;
        Runnable runnable = <span class="hljs-keyword">new</span> Runnable() {
            <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">run</span><span class="hljs-params">()</span> </span>{
                Toast toast = Toast.makeText(cordova.getActivity().getApplicationContext(), message, duration);
                toast.show();
            }
        };
        cordova.getActivity().runOnUiThread(runnable);
    }
}
...</code></pre>
<p>js部分的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var exec = require('cordova/exec');

module.exports = {
    toast: function(message) {
        exec(null, null, 'NativeUI', 'toast', [message]);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cordova/exec'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">toast</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message</span>) </span>{
        exec(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'NativeUI'</span>, <span class="hljs-string">'toast'</span>, [message]);
    }
}</code></pre>
<p><code>callbackContext.success</code>可以将原生层字符串作为参数传递给JavaScript层的成功回调，<code>callbackContext.error</code>可以将给JavaScript层的错误回调函数传递参数。</p>
<h3 id="articleHeader17"><strong>添加依赖库</strong></h3>
<p>如果你的Android插件有额外的依赖关系，那么它们必须以两种方式之一列在plugin.xml中：</p>
<ul>
<li>首选的方法是使用&lt;framework /&gt;标签（有关详细信息，请参阅插件规范）。以这种方式指定库可以通过Gradle的依赖管理逻辑来解决。这允许诸如gson，android-support-v4和google-play-services之类的常用库被多个插件使用而没有冲突。</li>
<li>第二个选项是使用&lt;lib-file /&gt;标签来指定jar文件的位置（有关更多详细信息，请参阅插件规范）。 只有当您确定没有其他插件将依赖于您所引用的库（例如，该库特定于您的插件）时，才应使用此方法。 否则，如果另一个插件添加了相同的库，则可能导致插件用户造成构建错误。 值得注意的是，Cordova应用程序开发人员不一定是本地开发人员，因此本地平台构建错误可能特别令人沮丧。</li>
</ul>
<h3 id="articleHeader18"><strong>Android集成</strong></h3>
<p>Android具有Intent系统，允许进程相互通信。插件可以访问CordovaInterface对象，可以访问运行应用程序的Android Activity。 这是启动新的Android Intent所需的上下文。 CordovaInterface允许插件为结果启动Activity，并为Intent返回应用程序时设置回调插件。</p>
<p>从Cordova 2.0开始，插件无法再直接访问上下文，并且旧的ctx成员已被弃用。 所有的ctx方法都存在于Context中，所以getContext()和getActivity()都可以返回所需的对象。</p>
<blockquote><p><strong>运行权限（Cordova-Android 5.0.0+）</strong></p></blockquote>
<p>Android 6.0 "Marshmallow" 引入了新的权限模型，用户可以根据需要启用和禁用权限。这意味着应用程序必须将这些权限更改处理为将来，这是Cordova-Android 5.0.0发行版的重点。</p>
<p>就插件而言，可以通过调用权限方法来请求权限，该签名如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova.requestPermission(CordovaPlugin plugin, int requestCode, String permission);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">cordova.requestPermission(CordovaPlugin plugin, <span class="hljs-keyword">int</span> requestCode, <span class="hljs-keyword">String</span> permission);</code></pre>
<p>为了减少冗长度，将此值分配给本地静态变量是标准做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public static final String READ = Manifest.permission.READ_CONTACTS;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> final <span class="hljs-keyword">String</span> <span class="hljs-keyword">READ</span> = Manifest.permission.READ_CONTACTS;</code></pre>
<p>定义requestCode的标准做法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public static final int SEARCH_REQ_CODE = 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-keyword">int</span> SEARCH_REQ_CODE = <span class="hljs-number">0</span>;</code></pre>
<p>然后，在exec方法中，应该检查权限：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(cordova.hasPermission(READ)) {
    search(executeArgs);
} else {
    getReadPermission(SEARCH_REQ_CODE);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">if</span>(cordova.hasPermission(<span class="hljs-keyword">READ</span>)) {
    <span class="hljs-keyword">search</span>(executeArgs);
} <span class="hljs-keyword">else</span> {
    getReadPermission(SEARCH_REQ_CODE);
}</code></pre>
<p>在这种情况下，我们只需调用requestPermission：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="protected void getReadPermission(int requestCode) {
    cordova.requestPermission(this, requestCode, READ);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">protected</span> <span class="hljs-keyword">void</span> <span class="hljs-title">getReadPermission</span><span class="hljs-params">(<span class="hljs-keyword">int</span> requestCode)</span> </span>{
    cordova.requestPermission(<span class="hljs-keyword">this</span>, requestCode, READ);
}</code></pre>
<p>这将调用该活动并引起提示出现要求该权限。 一旦用户拥有权限，结果必须使用onRequestPermissionResult方法处理，每个插件应该覆盖该方法。 一个例子可以在下面找到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
    for(int r:grantResults) {
        if(r == PackageManager.PERMISSION_DENIED) {
            this.callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, PERMISSION_DENIED_ERROR));
            return;
        }
    }
    switch(requestCode) {
        case SEARCH_REQ_CODE:
            search(executeArgs);
            break;
        case SAVE_REQ_CODE:
            save(executeArgs);
            break;
        case REMOVE_REQ_CODE:
            remove(executeArgs);
            break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onRequestPermissionResult</span><span class="hljs-params">(<span class="hljs-keyword">int</span> requestCode, String[] permissions, <span class="hljs-keyword">int</span>[] grantResults)</span> <span class="hljs-keyword">throws</span> JSONException </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> r:grantResults) {
        <span class="hljs-keyword">if</span>(r == PackageManager.PERMISSION_DENIED) {
            <span class="hljs-keyword">this</span>.callbackContext.sendPluginResult(<span class="hljs-keyword">new</span> PluginResult(PluginResult.Status.ERROR, PERMISSION_DENIED_ERROR));
            <span class="hljs-keyword">return</span>;
        }
    }
    <span class="hljs-keyword">switch</span>(requestCode) {
        <span class="hljs-keyword">case</span> SEARCH_REQ_CODE:
            search(executeArgs);
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> SAVE_REQ_CODE:
            save(executeArgs);
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> REMOVE_REQ_CODE:
            remove(executeArgs);
            <span class="hljs-keyword">break</span>;
    }
}</code></pre>
<p>上面的switch语句将从提示符返回，并且根据传入的requestCode，它将调用该方法。 应该注意的是，如果执行不正确地处理权限提示可能会堆叠，并且应该避免这种情况。</p>
<p>除了要求获得单一权限的权限之外，还可以通过定义权限数组来请求整个组的权限，如同Geolocation插件所做的那样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String [] permissions = { 
  Manifest.permission.ACCESS_COARSE_LOCATION,
  Manifest.permission.ACCESS_FINE_LOCATION 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mathematica"><code><span class="hljs-keyword">String</span> [] permissions = { 
  Manifest.permission.ACCESS_COARSE_LOCATION,
  Manifest.permission.ACCESS_FINE_LOCATION 
};</code></pre>
<p>然后当请求权限时，需要完成的所有操作如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cordova.requestPermissions(this, 0, permissions);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">cordova.requestPermissions(<span class="hljs-keyword">this</span>, <span class="hljs-number">0</span>, permissions);</code></pre>
<p>这将请求数组中指定的权限。 提供公开访问的权限阵列是一个好主意，因为可以使用插件作为依赖关系使用，尽管这不是必需的。</p>
<h3 id="articleHeader19"><strong>启动其他活动</strong></h3>
<p>如果你的插件启动将Cordova活动推送到后台的活动，则需要特别考虑。 如果设备运行内存不足，Android操作系统将在后台销毁活动。在这种情况下，CordovaPlugin实例也将被销毁。 如果您的插件正在等待其启动的活动的结果，则当Cordova活动返回到前台并获得结果时，将创建一个新的插件实例。 但是，插件的状态不会自动保存或恢复，插件的CallbackContext将丢失。 CordovaPlugin可以实现两种方法来处理这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Called when the Activity is being destroyed (e.g. if a plugin calls out to an
 * external Activity and the OS kills the CordovaActivity in the background).
 * The plugin should save its state in this method only if it is awaiting the
 * result of an external Activity and needs to preserve some information so as
 * to handle that result; onRestoreStateForActivityResult() will only be called
 * if the plugin is the recipient of an Activity result
 *
 * @return  Bundle containing the state of the plugin or null if state does not
 *          need to be saved
 */
public Bundle onSaveInstanceState() {}

/**
 * Called when a plugin is the recipient of an Activity result after the
 * CordovaActivity has been destroyed. The Bundle will be the same as the one
 * the plugin returned in onSaveInstanceState()
 *
 * @param state             Bundle containing the state of the plugin
 * @param callbackContext   Replacement Context to return the plugin result to
 */
public void onRestoreStateForActivityResult(Bundle state, CallbackContext callbackContext) {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>/**
 * Called when the Activity is being destroyed (e.g. if a plugin calls <span class="hljs-keyword">out</span> <span class="hljs-keyword">to</span> an
 * external Activity and the OS kills the CordovaActivity <span class="hljs-keyword">in</span> the background).
 * The plugin should save its <span class="hljs-keyword">state</span> <span class="hljs-keyword">in</span> this method only if it is awaiting the
 * result of an external Activity and needs <span class="hljs-keyword">to</span> preserve some information so as
 * <span class="hljs-keyword">to</span> handle that result; <span class="hljs-keyword">on</span>RestoreStateForActivityResult() will only be called
 * if the plugin is the recipient of an Activity result
 *
 * @return  Bundle containing the <span class="hljs-keyword">state</span> of the plugin or null if <span class="hljs-keyword">state</span> does not
 *          need <span class="hljs-keyword">to</span> be saved
 */
public Bundle <span class="hljs-keyword">on</span>SaveInstanceState() {}

/**
 * Called when a plugin is the recipient of an Activity result after the
 * CordovaActivity has been destroyed. The Bundle will be the same as the one
 * the plugin returned <span class="hljs-keyword">in</span> <span class="hljs-keyword">on</span>SaveInstanceState()
 *
 * @param <span class="hljs-keyword">state</span>             Bundle containing the <span class="hljs-keyword">state</span> of the plugin
 * @param callbackContext   Replacement Context <span class="hljs-keyword">to</span> return the plugin result <span class="hljs-keyword">to</span>
 */
public void <span class="hljs-keyword">on</span>RestoreStateForActivityResult(Bundle <span class="hljs-keyword">state</span>, CallbackContext callbackContext) {}</code></pre>
<h2 id="articleHeader20">总结</h2>
<p>cordova 是否能够发挥出它出彩的一面还是源于我们对原生的熟练程度，只有对原生足够熟练，对cordova的运行机制足够熟悉才能做出一个相对比较令人满意的App，后面的文章我会尝试阅读cordova的源码，深入解析cordova的实现原理和插件机制，也会教大家封装一些常用的自定义组件。本文内容基本取材于官方文档，只是借助谷歌翻译以及自己在探索过程中的一些问题，做了一些增删，如果有任何问题，希望各位不吝指教。</p>
<p>写文章不容易，也许写这些代码就几分钟的事，写一篇大家好接受的文章或许需要几天的酝酿，然后加上几天的码字，累并快乐着。如果文章对您有帮助请我喝杯咖啡吧！</p>
<p><span class="img-wrap"><img data-src="/img/bVMMoV?w=612&amp;h=384" src="https://static.alili.tech/img/bVMMoV?w=612&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>转载需标注本文原始地址：<a href="https://zhaomenghuan.github.io/" rel="nofollow noreferrer" target="_blank">https://zhaomenghuan.github.io/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
cordova研习笔记(一) —— 初试牛刀之cordova.js概要

## 原文链接
[https://segmentfault.com/a/1190000009199801](https://segmentfault.com/a/1190000009199801)

