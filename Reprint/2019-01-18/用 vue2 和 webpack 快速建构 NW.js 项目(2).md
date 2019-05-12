---
title: '用 vue2 和 webpack 快速建构 NW.js 项目(2)' 
date: 2019-01-18 2:30:34
hidden: true
slug: wz2b9wm5g8r
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">打包NW.js应用和制作windows安装文件</h1>
<p>更新：<br>此文章部分技术点已落后，可以查看 <strong> <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/vuejs-webpack-nwjs-2.md" rel="nofollow noreferrer" target="_blank">最新文章</a> </strong></p>
<hr>
<blockquote><p>这可能是中文史上最详细的 NW.js 打包教程</p></blockquote>
<p>本文适应有一定 js 基础，第一次玩 windows 下 setup 打包的同学，默认的环境 windows。然后，文章太<strong>过于详实</strong>，看完会耗费大量时间，暂时不想实操的，我会直接提供一个 <a href="https://github.com/anchengjian/vue-nw-seed" rel="nofollow noreferrer" target="_blank">vue-nw-seed</a> 种子项目，包含了当前文章的一些优化点。   </p>
<p><strong>本文涉及到的点：</strong></p>
<ul>
<li><p>Node.js 打包 zip 、文件处理、crypto 提取 MD5 、iconv 处理字符串等</p></li>
<li><p>Resource Hacker 配置应用的权限、图标、版权等</p></li>
<li><p>InnoSetup 制作安装包、iss 文件配置</p></li>
<li><p>NW.js 应用的更新（增量、全量更新）</p></li>
<li><p>...</p></li>
</ul>
<p><strong>未涉及到的点：</strong></p>
<ul><li><p>代码加密，本着前端的心态做的桌面端应用，代码 Uglify 后就已经不可看了。如果有机密代码或者加密算法等需要另外考虑，不在本文的讨论范围，提供一个官方文档 <a href="http://docs.nwjs.io/en/latest/For%20Users/Advanced/Protect%20JavaScript%20Source%20Code/" rel="nofollow noreferrer" target="_blank">Protect JavaScript Source Code</a></p></li></ul>
<h2 id="articleHeader1">一、折腾能力强，直接上文档</h2>
<ol>
<li><p><a href="https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps" rel="nofollow noreferrer" target="_blank">How-to-package-and-distribute-your-apps</a></p></li>
<li><p><a href="https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps#setup-on-windows" rel="nofollow noreferrer" target="_blank">setup-on-windows</a></p></li>
</ol>
<p>这部分没啥好说的，都很简单。   </p>
<p>对新手友好。。。还有个 NW.js 的打包在 gayhub 上还专门有个 npm 包 <a href="https://github.com/nwjs/nw-builder" rel="nofollow noreferrer" target="_blank">nw-builder</a> ，这个用起来就更简单了，我连示例都不想写的那种简单。然后这儿需要下载 NW.js 的 SDK 或者 NORMAL 的包，方法同我上一篇文章 <a href="http://anchengjian.com/#/posts/2017/vuejs-webpack-nwjs.md" rel="nofollow noreferrer" target="_blank">用 vue2 和 webpack 快速建构 NW.js 项目</a> 中 <code>网络不太好</code> 部分</p>
<h2 id="articleHeader2">二、自助打包</h2>
<p>NW.js 被打包出来后是一个文件夹，里面有整个 runtime 和一个 exe 文件，这时候整个打包就成功了，差不多有 100MB 左右。  <br>但是，我们的应用不再是给内部使用，给用户下载总不能直接给用户拷贝一个文件夹或者下载 zip 压缩包，那样忒不靠谱的样子，还以为是啥病毒呢。  </p>
<p>我们能不能就像吃自助餐那样，想吃啥就拿啥，想打包成啥样就弄成啥样。  </p>
<p><strong>实现思路</strong>  <br>自己搞一个 runtime，然后用 Node.js 对打包好的代码进行 zip 压缩为 <code>package.nw</code>，然后放到 runtime 中，再用官方推荐的 InnoSetup 来打包成一个 setup.exe。</p>
<h3 id="articleHeader3">1. XP 兼容性问题</h3>
<p>使用 NW.js 的主要优势是兼容 XP，教育行业这个真的很重要呀。。。   <br>NW.js 不是全版本都支持 XP，由于 Chromium50 开始就不支持XP了，所以如果你的客户端要支持 XP，目前最佳的版本选择是 <code>0.14.7</code> 。参见 NW.js 的博客 <a href="https://nwjs.io/blog/v0.14.7/" rel="nofollow noreferrer" target="_blank">NW.js v0.14.7 (LTS) Released</a></p>
<h3 id="articleHeader4">2. 制作一个自己的  runtime</h3>
<p>从官网 <a href="http://dl.nwjs.io/v0.14.7/" rel="nofollow noreferrer" target="_blank">http://dl.nwjs.io/v0.14.7/</a> 下载一个 normal 的包，然后在此基础上进行 DIY。  </p>
<p>大概目录就是这样子<br><span class="img-wrap"><img data-src="/img/bVLc35?w=581&amp;h=394" src="https://static.alili.tech/img/bVLc35?w=581&amp;h=394" alt="原始runtime" title="原始runtime" style="cursor: pointer;"></span></p>
<p>然后就开始优化和自定义工作：  </p>
<p>1) 先整理下 locales 下的语言包，减少部分冗余。  </p>
<p>2) 替换下 <a href="https://github.com/iteufel/nwjs-ffmpeg-prebuilt/releases" rel="nofollow noreferrer" target="_blank">ffmpeg.dll</a> 解决部分格式 video 的播放问题等，下载的时候注意下版本，和 NW.js 相对应就好。</p>
<p>3) 将 <code>nw.exe</code> 改名字为我们的应用的名字，比如<code>myProgramApp.exe</code>，更正规一点。然后用 <code>Resource Hacker</code> 修改下版本和版权公司等相关信息。</p>
<p>4) 再用使用 <code>Resource Hacker</code> 进行图标替换，建议尺寸是256。</p>
<p>5) 同时为其添加管理员权限。因为我们要做增量更新，需要用 Node.js 写文件到应用所在目录，当安装目录是 <code>C:\Program Files\</code> 的时候，普通权限用户没有写权限。  <br>具体操作还是用 <code>Resource Hacker</code> 打开<code>myProgramApp.exe</code>，找到 <code>Manifest</code>中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<requestedExecutionLevel level=&quot;asInvoker&quot; uiAccess=&quot;false&quot;/></requestedPrivileges>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">requestedExecutionLevel</span> <span class="hljs-attr">level</span>=<span class="hljs-string">"asInvoker"</span> <span class="hljs-attr">uiAccess</span>=<span class="hljs-string">"false"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">requestedPrivileges</span>&gt;</span></code></pre>
<p>修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<requestedExecutionLevel level=&quot;requireAdministrator&quot; uiAccess=&quot;false&quot;/></requestedPrivileges>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">requestedExecutionLevel</span> <span class="hljs-attr">level</span>=<span class="hljs-string">"requireAdministrator"</span> <span class="hljs-attr">uiAccess</span>=<span class="hljs-string">"false"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">requestedPrivileges</span>&gt;</span></code></pre>
<p>弄完了大概是这个样子<br><span class="img-wrap"><img data-src="/img/bVLc4c?w=581&amp;h=388" src="https://static.alili.tech/img/bVLc4c?w=581&amp;h=388" alt="DIY完成的runtime" title="DIY完成的runtime" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">3. 用 Node.js 打包 <code>package.nw</code>
</h3>
<p>需要一个 zip 处理的依赖 <a href="https://github.com/archiverjs/node-archiver" rel="nofollow noreferrer" target="_blank">archiver</a>，第一次用这个依赖，建议直接去看他们的英文文档，谨慎使用 <code>bulk</code> 这个方法，在 0.21.0 的时候就被废弃了。  <br>打包 zip 的方法大概就长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const archive = require('archive')

function buildZipFile({ outZipPath, files, mainPackage } = {}) {
  let filesArr = Array.isArray(files) ? files : [files]

  // 创建一个可写流的 zip 文件
  var output = fs.createWriteStream(outZipPath)
  var archive = archiver('zip', { store: true })

  archive.on('error', console.error)

  // 打包 dist 目录为 zip 压缩包格式的 nw 文件
  archive.pipe(output)

  if (filesArr.length > 0) {
    filesArr.forEach(p => {
      if (!p) return

      // 剔除 package.json
      let hasPackJson = path.resolve(p, 'package.json')
      if (fs.existsSync(hasPackJson)) fs.unlinkSync(hasPackJson)

      // 压缩目录
      archive.directory(p, '')
    })

    // 添加 package.json
    archive.file(mainPackage, { name: 'package.json' })
  }

  archive.finalize()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> archive = <span class="hljs-built_in">require</span>(<span class="hljs-string">'archive'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildZipFile</span>(<span class="hljs-params">{ outZipPath, files, mainPackage } = {}</span>) </span>{
  <span class="hljs-keyword">let</span> filesArr = <span class="hljs-built_in">Array</span>.isArray(files) ? files : [files]

  <span class="hljs-comment">// 创建一个可写流的 zip 文件</span>
  <span class="hljs-keyword">var</span> output = fs.createWriteStream(outZipPath)
  <span class="hljs-keyword">var</span> archive = archiver(<span class="hljs-string">'zip'</span>, { <span class="hljs-attr">store</span>: <span class="hljs-literal">true</span> })

  archive.on(<span class="hljs-string">'error'</span>, <span class="hljs-built_in">console</span>.error)

  <span class="hljs-comment">// 打包 dist 目录为 zip 压缩包格式的 nw 文件</span>
  archive.pipe(output)

  <span class="hljs-keyword">if</span> (filesArr.length &gt; <span class="hljs-number">0</span>) {
    filesArr.forEach(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (!p) <span class="hljs-keyword">return</span>

      <span class="hljs-comment">// 剔除 package.json</span>
      <span class="hljs-keyword">let</span> hasPackJson = path.resolve(p, <span class="hljs-string">'package.json'</span>)
      <span class="hljs-keyword">if</span> (fs.existsSync(hasPackJson)) fs.unlinkSync(hasPackJson)

      <span class="hljs-comment">// 压缩目录</span>
      archive.directory(p, <span class="hljs-string">''</span>)
    })

    <span class="hljs-comment">// 添加 package.json</span>
    archive.file(mainPackage, { <span class="hljs-attr">name</span>: <span class="hljs-string">'package.json'</span> })
  }

  archive.finalize()
}</code></pre>
<h3 id="articleHeader6">4. InnoSetup 打包安装包</h3>
<p>Node.js 的丰富的生态已经有人提供了一个 <a href="https://github.com/felicienfrancois/node-innosetup-compiler" rel="nofollow noreferrer" target="_blank">node-innosetup-compiler</a> 了，所以这个也很方便。不过对于我这种第一次玩这个的玩家还是有点懵逼，特别是那个 <code>iss</code> 文件的编写。。。</p>
<p>鉴于本文不想写成 InnoSetup 的使用教程，所以只讲讲普通使用，如果你需要更复杂的功能,给你个文档 <a href="http://www.jrsoftware.org/ishelp/index.php?topic=setup_defaultdirname" rel="nofollow noreferrer" target="_blank">Inno Setup Help</a>   </p>
<p>我提供一个我用的 <code>setup.iss </code> 文件，其中用下划线开头（如: _appName ）这种将会被 js 正则匹配掉</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; 该执行目录为 setup.iss 所在的目录，请注意拼接相对目录

#define MyAppName &quot;_appName&quot;
#define MyAppNameZh &quot;_appZhName&quot;
#define MyAppVersion &quot;_appVersion&quot;
#define MyAppPublisher &quot;_appPublisher&quot;
#define MyAppURL &quot;_appURL&quot;
#define MyAppExeName &quot;_appName.exe&quot;
#define OutputPath &quot;_appOutputPath&quot;
#define SourceMain &quot;_appRuntimePath\_appName.exe&quot;
#define SourceFolder &quot;_appRuntimePath\*&quot;
#define LicenseFilePath &quot;_appResourcesPath\license.txt&quot;
#define SetupIconFilePath &quot;_appResourcesPath\_appName.ico&quot;
#define MyAppId &quot;_appId&quot;

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppName}
LicenseFile={#LicenseFilePath}
OutputDir={#OutputPath}
OutputBaseFilename={#MyAppName}-v{#MyAppVersion}-setup
SetupIconFile={#SetupIconFilePath}
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
Uninstallable=yes
UninstallDisplayName={#MyAppNameZh}
DefaultGroupName={#MyAppNameZh}

[Tasks]
Name: &quot;desktopicon&quot;; Description: &quot;{cm:CreateDesktopIcon}&quot;; GroupDescription: &quot;{cm:AdditionalIcons}&quot;; Flags: checkedonce

[Files]
Source: {#SourceMain}; DestDir: &quot;{app}&quot;; Flags: ignoreversion
Source: {#SourceFolder}; DestDir: &quot;{app}&quot;; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: &quot;{commondesktop}\{#MyAppNameZh}&quot;; Filename: &quot;{app}\{#MyAppExeName}&quot;; Tasks: desktopicon
Name: &quot;{group}\{#MyAppNameZh}&quot;; Filename: &quot;{app}\{#MyAppExeName}&quot;
Name: &quot;{group}\卸载{#MyAppNameZh}&quot;; Filename: &quot;{uninstallexe}&quot;

[Languages]
Name: &quot;chinese&quot;; MessagesFile: &quot;innosetup\Languages\ChineseSimp.isl&quot;

[Run]
Filename: &quot;{app}\{#MyAppExeName}&quot;; Description: &quot;{cm:LaunchProgram,{#StringChange(MyAppName, '&amp;', '&amp;&amp;')"}}"&quot;; Flags: nowait postinstall skipifsilent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; 该执行目录为 setup.iss 所在的目录，请注意拼接相对目录

<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppName <span class="hljs-string">"_appName"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppNameZh <span class="hljs-string">"_appZhName"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppVersion <span class="hljs-string">"_appVersion"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppPublisher <span class="hljs-string">"_appPublisher"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppURL <span class="hljs-string">"_appURL"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppExeName <span class="hljs-string">"_appName.exe"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> OutputPath <span class="hljs-string">"_appOutputPath"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SourceMain <span class="hljs-string">"_appRuntimePath\_appName.exe"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SourceFolder <span class="hljs-string">"_appRuntimePath\*"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> LicenseFilePath <span class="hljs-string">"_appResourcesPath\license.txt"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SetupIconFilePath <span class="hljs-string">"_appResourcesPath\_appName.ico"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> MyAppId <span class="hljs-string">"_appId"</span></span>

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={<span class="hljs-meta">#MyAppId}</span>
AppName={<span class="hljs-meta">#MyAppName}</span>
AppVersion={<span class="hljs-meta">#MyAppVersion}</span>
AppVerName={<span class="hljs-meta">#MyAppName}</span>
AppPublisher={<span class="hljs-meta">#MyAppPublisher}</span>
AppPublisherURL={<span class="hljs-meta">#MyAppURL}</span>
AppSupportURL={<span class="hljs-meta">#MyAppURL}</span>
AppUpdatesURL={<span class="hljs-meta">#MyAppURL}</span>
DefaultDirName={pf}\{<span class="hljs-meta">#MyAppName}</span>
LicenseFile={<span class="hljs-meta">#LicenseFilePath}</span>
OutputDir={<span class="hljs-meta">#OutputPath}</span>
OutputBaseFilename={<span class="hljs-meta">#MyAppName}-v{#MyAppVersion}-setup</span>
SetupIconFile={<span class="hljs-meta">#SetupIconFilePath}</span>
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
Uninstallable=yes
UninstallDisplayName={<span class="hljs-meta">#MyAppNameZh}</span>
DefaultGroupName={<span class="hljs-meta">#MyAppNameZh}</span>

[Tasks]
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"desktopicon"</span>; Description: <span class="hljs-string">"{cm:CreateDesktopIcon}"</span>; GroupDescription: <span class="hljs-string">"{cm:AdditionalIcons}"</span>; Flags: checkedonce

[Files]
<span class="hljs-symbol">Source:</span> {<span class="hljs-meta">#SourceMain}; DestDir: <span class="hljs-string">"{app}"</span>; Flags: ignoreversion</span>
<span class="hljs-symbol">Source:</span> {<span class="hljs-meta">#SourceFolder}; DestDir: <span class="hljs-string">"{app}"</span>; Flags: ignoreversion recursesubdirs createallsubdirs</span>

[Icons]
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"{commondesktop}\{#MyAppNameZh}"</span>; Filename: <span class="hljs-string">"{app}\{#MyAppExeName}"</span>; Tasks: desktopicon
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"{group}\{#MyAppNameZh}"</span>; Filename: <span class="hljs-string">"{app}\{#MyAppExeName}"</span>
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"{group}\卸载{#MyAppNameZh}"</span>; Filename: <span class="hljs-string">"{uninstallexe}"</span>

[Languages]
<span class="hljs-symbol">Name:</span> <span class="hljs-string">"chinese"</span>; MessagesFile: <span class="hljs-string">"innosetup\Languages\ChineseSimp.isl"</span>

[Run]
<span class="hljs-symbol">Filename:</span> <span class="hljs-string">"{app}\{#MyAppExeName}"</span>; Description: <span class="hljs-string">"{cm:LaunchProgram,{#StringChange(MyAppName, '&amp;', '&amp;&amp;')"}}""</span>; Flags: nowait postinstall skipifsilent</code></pre>
<p>创建一个 resources 文件夹，里面放上 icon 和 license，就像这样<br><span class="img-wrap"><img data-src="/img/bVLc4e?w=225&amp;h=164" src="https://static.alili.tech/img/bVLc4e?w=225&amp;h=164" alt="resources目录" title="resources目录" style="cursor: pointer;"></span></p>
<p>再然后此 iss 配合 <code>makeExeSetup</code> 使用，格外酸爽，请忽略那一串 replace，233333333</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新依赖，用于处理 utf 和 ansi 的字符串
const iconv = require('iconv-lite')

function makeExeSetup(opt) {
  const { issPath, outputPath, mainPackage, runtimePath, resourcesPath, appPublisher, appURL, appId } = opt
  const { name, appName, version } = require(mainPackage)
  const tmpIssPath = path.resolve(path.parse(issPath).dir, '_tmp.iss')
  const innosetupCompiler = require('innosetup-compiler')

  // rewrite name, version to iss
  fs.readFile(issPath, null, (err, text) => {
    if (err) throw err

    let str = iconv.decode(text, 'gbk')
      .replace(/_appName/g, name)
      .replace(/_appZhName/g, appName)
      .replace(/_appVersion/g, version)
      .replace(/_appOutputPath/g, outputPath)
      .replace(/_appRuntimePath/g, runtimePath)
      .replace(/_appResourcesPath/g, resourcesPath)
      .replace(/_appPublisher/g, appPublisher)
      .replace(/_appURL/g, appURL)
      .replace(/_appId/g, appId)


    fs.writeFile(tmpIssPath, iconv.encode(str, 'gbk'), null, err => {
      if (err) throw err

      // inno setup start
      innosetupCompiler(tmpIssPath, { gui: false, verbose: true }, function(err) {
        fs.unlinkSync(tmpIssPath)
        if (err) throw err
      })
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 新依赖，用于处理 utf 和 ansi 的字符串</span>
<span class="hljs-keyword">const</span> iconv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'iconv-lite'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeExeSetup</span>(<span class="hljs-params">opt</span>) </span>{
  <span class="hljs-keyword">const</span> { issPath, outputPath, mainPackage, runtimePath, resourcesPath, appPublisher, appURL, appId } = opt
  <span class="hljs-keyword">const</span> { name, appName, version } = <span class="hljs-built_in">require</span>(mainPackage)
  <span class="hljs-keyword">const</span> tmpIssPath = path.resolve(path.parse(issPath).dir, <span class="hljs-string">'_tmp.iss'</span>)
  <span class="hljs-keyword">const</span> innosetupCompiler = <span class="hljs-built_in">require</span>(<span class="hljs-string">'innosetup-compiler'</span>)

  <span class="hljs-comment">// rewrite name, version to iss</span>
  fs.readFile(issPath, <span class="hljs-literal">null</span>, (err, text) =&gt; {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err

    <span class="hljs-keyword">let</span> str = iconv.decode(text, <span class="hljs-string">'gbk'</span>)
      .replace(<span class="hljs-regexp">/_appName/g</span>, name)
      .replace(<span class="hljs-regexp">/_appZhName/g</span>, appName)
      .replace(<span class="hljs-regexp">/_appVersion/g</span>, version)
      .replace(<span class="hljs-regexp">/_appOutputPath/g</span>, outputPath)
      .replace(<span class="hljs-regexp">/_appRuntimePath/g</span>, runtimePath)
      .replace(<span class="hljs-regexp">/_appResourcesPath/g</span>, resourcesPath)
      .replace(<span class="hljs-regexp">/_appPublisher/g</span>, appPublisher)
      .replace(<span class="hljs-regexp">/_appURL/g</span>, appURL)
      .replace(<span class="hljs-regexp">/_appId/g</span>, appId)


    fs.writeFile(tmpIssPath, iconv.encode(str, <span class="hljs-string">'gbk'</span>), <span class="hljs-literal">null</span>, err =&gt; {
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err

      <span class="hljs-comment">// inno setup start</span>
      innosetupCompiler(tmpIssPath, { <span class="hljs-attr">gui</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        fs.unlinkSync(tmpIssPath)
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
      })
    })
  })
}</code></pre>
<p>这个时候就能制作出一个安装包了，就像这样<br><span class="img-wrap"><img data-src="/img/bVLc4k?w=603&amp;h=61" src="https://static.alili.tech/img/bVLc4k?w=603&amp;h=61" alt="安装包" title="安装包" style="cursor: pointer; display: inline;"></span></p>
<p>然后是安装的流程<br><span class="img-wrap"><img data-src="/img/bVLc4p?w=861&amp;h=562" src="https://static.alili.tech/img/bVLc4p?w=861&amp;h=562" alt="安装流程" title="安装流程" style="cursor: pointer; display: inline;"></span></p>
<p>安装完成的目录<br><span class="img-wrap"><img data-src="/img/bVLc4u?w=616&amp;h=550" src="https://static.alili.tech/img/bVLc4u?w=616&amp;h=550" alt="安装完成的目录" title="安装完成的目录" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">三、炫酷的安装界面</h2>
<p>虽然 InnoSetup 简单好使，但是制作出来的安装包的安装界面默认是 windows2000 的界面，那个丑那个老旧哟。。。   </p>
<p>如果你的应用只要能用就行了，那这一步已经完全够了。   <br>但技术人怎么能不折腾，下面，我们来搞炫酷的安装包的制作方法。   </p>
<p>先摆一个被我模仿的例子 <a href="http://blog.csdn.net/HarounCloud/article/details/50613590" rel="nofollow noreferrer" target="_blank">INNOSETUP 仿有道云安装包界面</a>，同时还有个参考资料:<a href="http://blog.csdn.net/oceanlucy/article/details/50033773" rel="nofollow noreferrer" target="_blank">互联网软件的安装包界面设计-Inno setup</a> 真心吐个槽，这方面的资料真少。。。</p>
<p>我其实都按照已有的素材包写好了一个了，但我们的 ui 还没设计出更漂亮的安装界面出来，所以，我就暂时不放相关资源和效果了。</p>
<h2 id="articleHeader8">四、应用的更新</h2>
<p>这一块，应该是最轻松的，蛤。  </p>
<p>我们的更新策略分为两种，一种是只更新我们的业务代码，每次只需要下载1MB多的业务代码就搞定，走增量更新渠道；另一种是更新了我们的 runtime ，或者其他啥玩意的重要更新，需要全量更新，走全量更新的渠道。  </p>
<p><strong>实现思路</strong>  <br>在打包的时候把版本和更新信息写入到 <code>update.json</code> 中，在每次客户端打开的时候都去请求这个 json ，检查 json 中版本和客户端版本是否匹配，不匹配则根据 json 中的约定规则进行增量更新或全量更新。</p>
<h3 id="articleHeader9">1、准备好更新文件</h3>
<p>一个开发原则是能懒就懒，能用工具做的就一定要用工具做。蛤蛤，在这个原则的坚持下，我们来继续优化上文提到的打包建构。  </p>
<p>用 Node.js 把之前临时放在 runtime 中的 package.nw (zip) 包拷贝到 output 目录，再根据 <code>changelog.txt</code> 文件写更新信息到 update.json 中。</p>
<p>准备一个 changelog.txt 文件在 config 配置目录下，大概就长这样子，每次更新以<code>---</code> 进行分割，第一行是版本，后面是更新信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1.0
- 程序员 peter 开始开发了！
- 顺便，请老板给 peter 涨工资。
---
1.0.0
- 客户端正式版成功发布啦！
- 同时，peter 因为要求涨工资已被打残住院中，所以暂时不会有其他更新。
---" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>0.1.0
<span class="hljs-bullet">- </span>程序员 peter 开始开发了！
<span class="hljs-section">- 顺便，请老板给 peter 涨工资。
---</span>
1.0.0
<span class="hljs-bullet">- </span>客户端正式版成功发布啦！
<span class="hljs-section">- 同时，peter 因为要求涨工资已被打残住院中，所以暂时不会有其他更新。
---</span></code></pre>
<p>有同学问我，为啥要这么设计个 log.txt 出来，不直接用 json 等其他形式进行描述？  <br>因为这个文件在未来可能要被打包到应用中，连同 license 文件进行打包；还有就是分离这部分描述，更易扩展。  </p>
<p>然后写一读取这个 log 的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getLatestLogBycheckVersion({ changelogPath, mainPackage }) {
  // get package.json by package
  const packageJson = require(mainPackage)

  // check version
  // 大于等于3是因为合法的版本信息最少 &quot;---&quot; 有3个长度
  const changeLogArr = fs.readFileSync(changelogPath, 'utf-8').split('---').filter(v => v.trim().length >= 3)
  const latestInfo = changeLogArr.pop().split('\n').map(v => v.trim()).filter(v => v.length)
  const version = latestInfo[0]

  if (packageJson.version !== version) {
    // 更新 package.json 的版本
    packageJson.version = version
    fs.writeFileSync(mainPackage, JSON.stringify(packageJson, null, '  '), 'utf-8')
  }
  return latestInfo
}

// 这就是全局的 options
opt.latestLog = getLatestLogBycheckVersion(opt)

// 更新约定，用来判断当前版本是否需要增量更新
opt.noIncremental = process.argv.indexOf('--noIncremental') >= 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLatestLogBycheckVersion</span>(<span class="hljs-params">{ changelogPath, mainPackage }</span>) </span>{
  <span class="hljs-comment">// get package.json by package</span>
  <span class="hljs-keyword">const</span> packageJson = <span class="hljs-built_in">require</span>(mainPackage)

  <span class="hljs-comment">// check version</span>
  <span class="hljs-comment">// 大于等于3是因为合法的版本信息最少 "---" 有3个长度</span>
  <span class="hljs-keyword">const</span> changeLogArr = fs.readFileSync(changelogPath, <span class="hljs-string">'utf-8'</span>).split(<span class="hljs-string">'---'</span>).filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v.trim().length &gt;= <span class="hljs-number">3</span>)
  <span class="hljs-keyword">const</span> latestInfo = changeLogArr.pop().split(<span class="hljs-string">'\n'</span>).map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v.trim()).filter(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v.length)
  <span class="hljs-keyword">const</span> version = latestInfo[<span class="hljs-number">0</span>]

  <span class="hljs-keyword">if</span> (packageJson.version !== version) {
    <span class="hljs-comment">// 更新 package.json 的版本</span>
    packageJson.version = version
    fs.writeFileSync(mainPackage, <span class="hljs-built_in">JSON</span>.stringify(packageJson, <span class="hljs-literal">null</span>, <span class="hljs-string">'  '</span>), <span class="hljs-string">'utf-8'</span>)
  }
  <span class="hljs-keyword">return</span> latestInfo
}

<span class="hljs-comment">// 这就是全局的 options</span>
opt.latestLog = getLatestLogBycheckVersion(opt)

<span class="hljs-comment">// 更新约定，用来判断当前版本是否需要增量更新</span>
opt.noIncremental = process.argv.indexOf(<span class="hljs-string">'--noIncremental'</span>) &gt;= <span class="hljs-number">0</span></code></pre>
<p><strong>增量更新的约定</strong>  <br>通过 <code>process.argv</code> 来检测当前是否需要增量更新，并写入到 options 中，这一点看起来有点稍微繁琐，如果有其他更好的点子，欢迎踊跃来提 <a href="https://github.com/anchengjian/anchengjian.github.io/issues" rel="nofollow noreferrer" target="_blank">issue</a> 或者直接私信我，谢谢！  </p>
<p>接下来继续处理打包完成的系列流程，需求是要移动 nw 到 output 目录，还要写一个 update.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const crypto = require('crypto')

function finishedPackage(opt) {
  const { mainPackage, outputPath, latestLog, outZipPath, updateServerPath, noIncremental } = opt
  const { name, appName, version } = require(mainPackage)

  let versionCode = parseInt(version.replace(/\./g, ''))
  let updateDesc = latestLog.slice(1).join('#%#')

  let outNWName = `${name}-v${version}.nw`
  let outNWPath = path.resolve(outputPath, outNWName)
  let updateJsonPath = path.resolve(outputPath, 'update.json')

  // write update.json
  let updateJson = {
    appName,
    version,
    versionCode,
    requiredVersion: version,
    requiredVersionCode: versionCode,
    updateDesc,
    filePath: updateServerPath + outNWName,
    incremental: !noIncremental
  }

  // fileSize and MD5
  getMd5ByFile(outZipPath, (err, hexStr) => {
    if (err) throw err
    updateJson.MD5 = hexStr
    updateJson.fileSize = fs.statSync(outZipPath).size
    fs.writeFileSync(updateJsonPath, JSON.stringify(updateJson, null, '  '), 'utf-8')

    copyFile(outZipPath, outNWPath)
    fs.unlink(outZipPath, err => err &amp;&amp; console.error(err))
  })
}

function getMd5ByFile(filePath, callback) {
  let rs = fs.createReadStream(filePath)
  let hash = crypto.createHash('md5')
  rs.on('error', err => {
    if (typeof callback === 'function') callback(err)
  })
  rs.on('data', hash.update.bind(hash))
  rs.on('end', () => {
    if (typeof callback === 'function') callback(null, hash.digest('hex'))
  })
}

function copyFile(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">finishedPackage</span>(<span class="hljs-params">opt</span>) </span>{
  <span class="hljs-keyword">const</span> { mainPackage, outputPath, latestLog, outZipPath, updateServerPath, noIncremental } = opt
  <span class="hljs-keyword">const</span> { name, appName, version } = <span class="hljs-built_in">require</span>(mainPackage)

  <span class="hljs-keyword">let</span> versionCode = <span class="hljs-built_in">parseInt</span>(version.replace(<span class="hljs-regexp">/\./g</span>, <span class="hljs-string">''</span>))
  <span class="hljs-keyword">let</span> updateDesc = latestLog.slice(<span class="hljs-number">1</span>).join(<span class="hljs-string">'#%#'</span>)

  <span class="hljs-keyword">let</span> outNWName = <span class="hljs-string">`<span class="hljs-subst">${name}</span>-v<span class="hljs-subst">${version}</span>.nw`</span>
  <span class="hljs-keyword">let</span> outNWPath = path.resolve(outputPath, outNWName)
  <span class="hljs-keyword">let</span> updateJsonPath = path.resolve(outputPath, <span class="hljs-string">'update.json'</span>)

  <span class="hljs-comment">// write update.json</span>
  <span class="hljs-keyword">let</span> updateJson = {
    appName,
    version,
    versionCode,
    <span class="hljs-attr">requiredVersion</span>: version,
    <span class="hljs-attr">requiredVersionCode</span>: versionCode,
    updateDesc,
    <span class="hljs-attr">filePath</span>: updateServerPath + outNWName,
    <span class="hljs-attr">incremental</span>: !noIncremental
  }

  <span class="hljs-comment">// fileSize and MD5</span>
  getMd5ByFile(outZipPath, (err, hexStr) =&gt; {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    updateJson.MD5 = hexStr
    updateJson.fileSize = fs.statSync(outZipPath).size
    fs.writeFileSync(updateJsonPath, <span class="hljs-built_in">JSON</span>.stringify(updateJson, <span class="hljs-literal">null</span>, <span class="hljs-string">'  '</span>), <span class="hljs-string">'utf-8'</span>)

    copyFile(outZipPath, outNWPath)
    fs.unlink(outZipPath, err =&gt; err &amp;&amp; <span class="hljs-built_in">console</span>.error(err))
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getMd5ByFile</span>(<span class="hljs-params">filePath, callback</span>) </span>{
  <span class="hljs-keyword">let</span> rs = fs.createReadStream(filePath)
  <span class="hljs-keyword">let</span> hash = crypto.createHash(<span class="hljs-string">'md5'</span>)
  rs.on(<span class="hljs-string">'error'</span>, err =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">'function'</span>) callback(err)
  })
  rs.on(<span class="hljs-string">'data'</span>, hash.update.bind(hash))
  rs.on(<span class="hljs-string">'end'</span>, () =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">'function'</span>) callback(<span class="hljs-literal">null</span>, hash.digest(<span class="hljs-string">'hex'</span>))
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyFile</span>(<span class="hljs-params">src, dst</span>) </span>{
  fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}</code></pre>
<p>整个打包完了差不多就这样子了<br><span class="img-wrap"><img data-src="/img/bVLc4C?w=595&amp;h=154" src="https://static.alili.tech/img/bVLc4C?w=595&amp;h=154" alt="output-dir" title="output-dir" style="cursor: pointer;"></span></p>
<p>那个 update.json 里面的实际内容就是这些</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;appName&quot;: &quot;doudou&quot;,
  &quot;version&quot;: &quot;1.0.1-beta19&quot;,
  &quot;versionCode&quot;: 101,
  &quot;requiredVersion&quot;: &quot;1.0.1-beta19&quot;,
  &quot;requiredVersionCode&quot;: 101,
  &quot;updateDesc&quot;: &quot;- 程序员 peter 无话可说&quot;,
  &quot;filePath&quot;: &quot;http://upgrade.iclassedu.com/doudou/upgrade/teacher/doudou-v1.0.1-beta19.nw&quot;,
  &quot;incremental&quot;: true,
  &quot;MD5&quot;: &quot;9be46fc8fb04d38449eeb4358c3b5a31&quot;,
  &quot;fileSize&quot;: 5469
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"appName"</span>: <span class="hljs-string">"doudou"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.1-beta19"</span>,
  <span class="hljs-attr">"versionCode"</span>: <span class="hljs-number">101</span>,
  <span class="hljs-attr">"requiredVersion"</span>: <span class="hljs-string">"1.0.1-beta19"</span>,
  <span class="hljs-attr">"requiredVersionCode"</span>: <span class="hljs-number">101</span>,
  <span class="hljs-attr">"updateDesc"</span>: <span class="hljs-string">"- 程序员 peter 无话可说"</span>,
  <span class="hljs-attr">"filePath"</span>: <span class="hljs-string">"http://upgrade.iclassedu.com/doudou/upgrade/teacher/doudou-v1.0.1-beta19.nw"</span>,
  <span class="hljs-attr">"incremental"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"MD5"</span>: <span class="hljs-string">"9be46fc8fb04d38449eeb4358c3b5a31"</span>,
  <span class="hljs-attr">"fileSize"</span>: <span class="hljs-number">5469</span>
}</code></pre>
<h3 id="articleHeader10">2、获取 update.json 并检查更新</h3>
<p>上代码，代码切换到 src 目录中，在我们的应用代码中写上 <code>utils/update.js</code> 的相关方法。具体的几个小方法，看注释吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { updateApi } from 'config/app'
import { App } from 'nw.gui'

const options = { method: 'GET', mode: 'cors', credentials: 'include' }
let tmpUpdateJson = null

// 请求 update.json，返回的是 promise 类型的 json
export function getUpdateJson(noCache) {
  if (!noCache &amp;&amp; tmpUpdateJson) return new Promise((resolve, reject) => resolve(tmpUpdateJson))
  return window.fetch(updateApi + '?' + (new Date().getTime()), options)
    .then(resp => resp.json())
    .then(json => {
      tmpUpdateJson = json
      return tmpUpdateJson
    })
}

// 检查版本，如果有更新则跳转到更新页面
export function checkUpdate() {
  getUpdateJson().then(json => {
    if (json.version === App.manifest.version) return
    setTimeout(() => { window.location.hash = '/update' }, 500)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { updateApi } <span class="hljs-keyword">from</span> <span class="hljs-string">'config/app'</span>
<span class="hljs-keyword">import</span> { App } <span class="hljs-keyword">from</span> <span class="hljs-string">'nw.gui'</span>

<span class="hljs-keyword">const</span> options = { <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>, <span class="hljs-attr">mode</span>: <span class="hljs-string">'cors'</span>, <span class="hljs-attr">credentials</span>: <span class="hljs-string">'include'</span> }
<span class="hljs-keyword">let</span> tmpUpdateJson = <span class="hljs-literal">null</span>

<span class="hljs-comment">// 请求 update.json，返回的是 promise 类型的 json</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getUpdateJson</span>(<span class="hljs-params">noCache</span>) </span>{
  <span class="hljs-keyword">if</span> (!noCache &amp;&amp; tmpUpdateJson) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> resolve(tmpUpdateJson))
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.fetch(updateApi + <span class="hljs-string">'?'</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()), options)
    .then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> resp.json())
    .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
      tmpUpdateJson = json
      <span class="hljs-keyword">return</span> tmpUpdateJson
    })
}

<span class="hljs-comment">// 检查版本，如果有更新则跳转到更新页面</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkUpdate</span>(<span class="hljs-params"></span>) </span>{
  getUpdateJson().then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (json.version === App.manifest.version) <span class="hljs-keyword">return</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">window</span>.location.hash = <span class="hljs-string">'/update'</span> }, <span class="hljs-number">500</span>)
  })
}</code></pre>
<p>然后在 main.js 中进行更新检查</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 优先更新
import { checkUpdate } from '@/utils/update'
if (process.env.NODE_ENV !== 'development') checkUpdate()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 优先更新</span>
<span class="hljs-keyword">import</span> { checkUpdate } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils/update'</span>
<span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'development'</span>) checkUpdate()</code></pre>
<h3 id="articleHeader11">3、更新</h3>
<p>在上面的基础上做增量更新，基本思路就是用 Node.js 去下载 nw 包到应用所在的目录，并直接替换掉原有的 package.nw ，再重启一下自己就搞定了；全量更新的话，就直接打开应用的下载页面，让用户自行下载覆盖安装就搞定了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下载 nw 包
export function updatePackage() {
  return new Promise((resolve, reject) => {
    getUpdateJson().then(json => {
      // 全量更新
      if (!json.incremental) {
        Shell.openExternal(getSetupApi)
        return reject({ message: '请下载最新版本，再覆盖安装' })
      }

      // 增量更新
      let packageZip = fs.createWriteStream(tmpNWPath)
      http
        .get(json.filePath, res => {
          if (res.statusCode < 200 || res.statusCode >= 300) return reject({ message: '下载出错，请稍后重试' })
          res.on('end', () => {
            if (fs.statSync(tmpNWPath).size < 10) return reject({ message: '更新包出错，请稍后重试' })
            fs.renameSync(tmpNWPath, appPath)
            resolve(json)
          })
          res.pipe(packageZip)
        })
        .on('error', reject)
    })
  })
}

// 重启自己
export function restartSelf(waitTime) {
  setTimeout(() => {
    require('child_process').spawn('restart.bat', [], { detached: true, cwd: rootPath })
  }, ~~waitTime || 2000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 下载 nw 包</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updatePackage</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    getUpdateJson().then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
      <span class="hljs-comment">// 全量更新</span>
      <span class="hljs-keyword">if</span> (!json.incremental) {
        Shell.openExternal(getSetupApi)
        <span class="hljs-keyword">return</span> reject({ <span class="hljs-attr">message</span>: <span class="hljs-string">'请下载最新版本，再覆盖安装'</span> })
      }

      <span class="hljs-comment">// 增量更新</span>
      <span class="hljs-keyword">let</span> packageZip = fs.createWriteStream(tmpNWPath)
      http
        .get(json.filePath, res =&gt; {
          <span class="hljs-keyword">if</span> (res.statusCode &lt; <span class="hljs-number">200</span> || res.statusCode &gt;= <span class="hljs-number">300</span>) <span class="hljs-keyword">return</span> reject({ <span class="hljs-attr">message</span>: <span class="hljs-string">'下载出错，请稍后重试'</span> })
          res.on(<span class="hljs-string">'end'</span>, () =&gt; {
            <span class="hljs-keyword">if</span> (fs.statSync(tmpNWPath).size &lt; <span class="hljs-number">10</span>) <span class="hljs-keyword">return</span> reject({ <span class="hljs-attr">message</span>: <span class="hljs-string">'更新包出错，请稍后重试'</span> })
            fs.renameSync(tmpNWPath, appPath)
            resolve(json)
          })
          res.pipe(packageZip)
        })
        .on(<span class="hljs-string">'error'</span>, reject)
    })
  })
}

<span class="hljs-comment">// 重启自己</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">restartSelf</span>(<span class="hljs-params">waitTime</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn(<span class="hljs-string">'restart.bat'</span>, [], { <span class="hljs-attr">detached</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">cwd</span>: rootPath })
  }, ~~waitTime || <span class="hljs-number">2000</span>)
}</code></pre>
<p>这儿有个小小的 hack ，仔细看看代码的同学应该已经发现了 <code>restart.bat</code> 。我尝试了很多办法，想让 NW.exe 重启自己，最终多番尝试后失败了。。。就写了个 bat 来重启自己。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="taskkill /im doudou.exe /f
start .\doudou.exe
exit" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="bat">taskkill <span class="hljs-regexp">/im doudou.exe /</span>f
start .\doudou.exe
<span class="hljs-keyword">exit</span></code></pre>
<p>如果有其他更好的办法，欢迎踊跃来提 <a href="https://github.com/anchengjian/anchengjian.github.io/issues" rel="nofollow noreferrer" target="_blank">issue</a> 或者直接私信我，谢谢！  </p>
<p>可能会有同学会问，为啥不直接下载 exe 包下来，再打开引导安装？  <br>我试过了，当应用被安装在 <code>C:\Program Files</code> 目录里面，管理员权限都不能写 <code>.exe</code> 后缀的文件进去。。。所以，我干脆用浏览器打开我们的应用的下载页，让用户自己去下载后，自己安装算了。这儿应该可以优化，下载到 用户数据目录，或者其他临时目录。</p>
<h3 id="articleHeader12">4、update 页面</h3>
<p>这个页面就没啥技术点，就是体力劳动了。根据前面 <code>getUpdateJson</code> 方法获得的 json 来渲染出要更新的版本和更新信息，然后提供一个更新按钮，按钮点击后，执行 <code>updatePackage</code> 这个方法，如果顺利执行就在 then 里面调用 <code>restartSelf</code> 重启自己就行了。</p>
<p>整体效果就是这样的<br><span class="img-wrap"><img data-src="/img/bVLc4J?w=913&amp;h=604" src="https://static.alili.tech/img/bVLc4J?w=913&amp;h=604" alt="更新效果" title="更新效果" style="cursor: pointer; display: inline;"></span></p>
<p>如果对您有用，帮我点个 <a href="https://github.com/anchengjian/anchengjian.github.io" rel="nofollow noreferrer" target="_blank">star</a> ，谢谢！您的支持是我继续更新下去的动力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 vue2 和 webpack 快速建构 NW.js 项目(2)

## 原文链接
[https://segmentfault.com/a/1190000008829356](https://segmentfault.com/a/1190000008829356)

