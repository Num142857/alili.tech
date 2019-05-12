---
title: 'Electron应用使用electron-builder配合electron-updater实现自动更新' 
date: 2018-12-17 2:30:06
hidden: true
slug: ejrhf7ha8hw
categories: [reprint]
---

{{< raw >}}

                    
<p>开发客户端一定要做的就是自动更新模块，否则每次版本升级都是一个头疼的事。<br>下面是Electron应用使用electron-builder配合electron-updater实现自动更新的解决方案。</p>
<p>1.安装 electron-updater 包模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install electron-updater --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> electron-updater <span class="hljs-comment">--save</span></code></pre>
<p>2.配置package.json文件<br>2.1 为了打包时生成latest.yml文件，需要在 build 参数中添加 publish 配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;build&quot;: {
    &quot;productName&quot;: &quot;***&quot;,//隐藏软件名称
    &quot;appId&quot;: &quot;**&quot;,//隐藏appid
    &quot;directories&quot;: {
      &quot;output&quot;: &quot;build&quot;
    },
    &quot;publish&quot;: [
      {
        &quot;provider&quot;: &quot;generic&quot;,
        &quot;url&quot;: &quot;http://**.**.**.**:3002/download/&quot;,//隐藏版本服务器地址
      }
    ],
    &quot;files&quot;: [
      &quot;dist/electron/**/*&quot;
    ],
    &quot;dmg&quot;: {
      &quot;contents&quot;: [
        {
          &quot;x&quot;: 410,
          &quot;y&quot;: 150,
          &quot;type&quot;: &quot;link&quot;,
          &quot;path&quot;: &quot;/Applications&quot;
        },
        {
          &quot;x&quot;: 130,
          &quot;y&quot;: 150,
          &quot;type&quot;: &quot;file&quot;
        }
      ]
    },
    &quot;mac&quot;: {
      &quot;icon&quot;: &quot;build/icons/icon.icns&quot;,
      &quot;artifactName&quot;: &quot;${productName}_setup_${version}.${ext}&quot;
    },
    &quot;win&quot;: {
      &quot;icon&quot;: &quot;build/icons/icon.ico&quot;,
      &quot;artifactName&quot;: &quot;${productName}_setup_${version}.${ext}&quot;
    },
    &quot;linux&quot;: {
      &quot;icon&quot;: &quot;build/icons&quot;,
      &quot;artifactName&quot;: &quot;${productName}_setup_${version}.${ext}&quot;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>  <span class="hljs-string">"build"</span>: {
    <span class="hljs-string">"productName"</span>: <span class="hljs-string">"***"</span>,<span class="hljs-comment">//隐藏软件名称</span>
    <span class="hljs-string">"appId"</span>: <span class="hljs-string">"**"</span>,<span class="hljs-comment">//隐藏appid</span>
    <span class="hljs-string">"directories"</span>: {
      <span class="hljs-string">"output"</span>: <span class="hljs-string">"build"</span>
    },
    <span class="hljs-string">"publish"</span>: [
      {
        <span class="hljs-string">"provider"</span>: <span class="hljs-string">"generic"</span>,
        <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://**.**.**.**:3002/download/"</span>,<span class="hljs-comment">//隐藏版本服务器地址</span>
      }
    ],
    <span class="hljs-string">"files"</span>: [
      <span class="hljs-string">"dist/electron/**/*"</span>
    ],
    <span class="hljs-string">"dmg"</span>: {
      <span class="hljs-string">"contents"</span>: [
        {
          <span class="hljs-string">"x"</span>: <span class="hljs-number">410</span>,
          <span class="hljs-string">"y"</span>: <span class="hljs-number">150</span>,
          <span class="hljs-string">"type"</span>: <span class="hljs-string">"link"</span>,
          <span class="hljs-string">"path"</span>: <span class="hljs-string">"/Applications"</span>
        },
        {
          <span class="hljs-string">"x"</span>: <span class="hljs-number">130</span>,
          <span class="hljs-string">"y"</span>: <span class="hljs-number">150</span>,
          <span class="hljs-string">"type"</span>: <span class="hljs-string">"file"</span>
        }
      ]
    },
    <span class="hljs-string">"mac"</span>: {
      <span class="hljs-string">"icon"</span>: <span class="hljs-string">"build/icons/icon.icns"</span>,
      <span class="hljs-string">"artifactName"</span>: <span class="hljs-string">"<span class="hljs-subst">${productName}</span>_setup_<span class="hljs-subst">${version}</span>.<span class="hljs-subst">${ext}</span>"</span>
    },
    <span class="hljs-string">"win"</span>: {
      <span class="hljs-string">"icon"</span>: <span class="hljs-string">"build/icons/icon.ico"</span>,
      <span class="hljs-string">"artifactName"</span>: <span class="hljs-string">"<span class="hljs-subst">${productName}</span>_setup_<span class="hljs-subst">${version}</span>.<span class="hljs-subst">${ext}</span>"</span>
    },
    <span class="hljs-string">"linux"</span>: {
      <span class="hljs-string">"icon"</span>: <span class="hljs-string">"build/icons"</span>,
      <span class="hljs-string">"artifactName"</span>: <span class="hljs-string">"<span class="hljs-subst">${productName}</span>_setup_<span class="hljs-subst">${version}</span>.<span class="hljs-subst">${ext}</span>"</span>
    }
  }</code></pre>
<p><strong><em>注意：配置了publish才会生成latest.yml文件，用于自动更新的配置信息；latest.yml文件是打包过程生成的文件，为避免自动更新出错，打包后禁止对latest.yml文件做任何修改。如果文件有误，必须重新打包获取新的latest.yml文件！！！</em></strong></p>
<p>2.2 增加nsis配置（可省略）<br>nsis配置不会影响自动更新功能，但是可以优化用户体验，比如是否允许用户自定义安装位置、是否添加桌面快捷方式、安装完成是否立即启动、配置安装图标等。nsis 配置也是添加在 build 参数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;nsis&quot;: {
      &quot;oneClick&quot;: true,
      &quot;perMachine&quot;: true,
      &quot;allowElevation&quot;: true,
      &quot;allowToChangeInstallationDirectory&quot;: true,
      &quot;createDesktopShortcut&quot;: true,
      &quot;runAfterFinish&quot;: true,
      &quot;installerIcon&quot;: &quot;./build/icon.ico&quot;,
      &quot;uninstallerIcon&quot;: &quot;./build/icon.ico&quot;
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">"nsis":</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      "oneClick":</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "perMachine":</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "allowElevation":</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "allowToChangeInstallationDirectory":</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "createDesktopShortcut":</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "runAfterFinish":</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "installerIcon":</span> <span class="hljs-string">"./build/icon.ico"</span><span class="hljs-string">,</span>
<span class="hljs-attr">      "uninstallerIcon":</span> <span class="hljs-string">"./build/icon.ico"</span>
    <span class="hljs-string">},</span></code></pre>
<p>3.配置主进程main.js文件（或主进程main中的index.js文件），引入 electron-updater 文件，添加自动更新检测和事件监听：<br><strong>注意：一定要是主进程main.js文件（或主进程main中的index.js文件），否则会报错。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { app, BrowserWindow, ipcMain } from 'electron'

// 注意这个autoUpdater不是electron中的autoUpdater
import { autoUpdater } from &quot;electron-updater&quot;
import {uploadUrl} from &quot;../renderer/config/config&quot;;

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle() {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };
  const os = require('os');

  autoUpdater.setFeedURL(uploadUrl);
  autoUpdater.on('error', function (error) {
    sendUpdateMessage(message.error)
  });
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage(message.checking)
  });
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage(message.updateAva)
  });
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage(message.updateNotAva)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {

    ipcMain.on('isUpdateNow', (e, arg) =&amp;gt; {
      console.log(arguments);
      console.log(&quot;开始更新&quot;);
      //some code here to handle event
      autoUpdater.quitAndInstall();
    });

    mainWindow.webContents.send('isUpdateNow')
  });

  ipcMain.on(&quot;checkForUpdate&quot;,()=&amp;gt;{
      //执行自动更新检查
      autoUpdater.checkForUpdates();
  })
}

// 通过main进程发送事件给renderer进程，提示更新信息
function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { app, BrowserWindow, ipcMain } <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>

<span class="hljs-comment">// 注意这个autoUpdater不是electron中的autoUpdater</span>
<span class="hljs-keyword">import</span> { autoUpdater } <span class="hljs-keyword">from</span> <span class="hljs-string">"electron-updater"</span>
<span class="hljs-keyword">import</span> {uploadUrl} <span class="hljs-keyword">from</span> <span class="hljs-string">"../renderer/config/config"</span>;

<span class="hljs-comment">// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateHandle</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> message = {
    <span class="hljs-attr">error</span>: <span class="hljs-string">'检查更新出错'</span>,
    <span class="hljs-attr">checking</span>: <span class="hljs-string">'正在检查更新……'</span>,
    <span class="hljs-attr">updateAva</span>: <span class="hljs-string">'检测到新版本，正在下载……'</span>,
    <span class="hljs-attr">updateNotAva</span>: <span class="hljs-string">'现在使用的就是最新版本，不用更新'</span>,
  };
  <span class="hljs-keyword">const</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>);

  autoUpdater.setFeedURL(uploadUrl);
  autoUpdater.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    sendUpdateMessage(message.error)
  });
  autoUpdater.on(<span class="hljs-string">'checking-for-update'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    sendUpdateMessage(message.checking)
  });
  autoUpdater.on(<span class="hljs-string">'update-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">info</span>) </span>{
    sendUpdateMessage(message.updateAva)
  });
  autoUpdater.on(<span class="hljs-string">'update-not-available'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">info</span>) </span>{
    sendUpdateMessage(message.updateNotAva)
  });

  <span class="hljs-comment">// 更新下载进度事件</span>
  autoUpdater.on(<span class="hljs-string">'download-progress'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">progressObj</span>) </span>{
    mainWindow.webContents.send(<span class="hljs-string">'downloadProgress'</span>, progressObj)
  })
  autoUpdater.on(<span class="hljs-string">'update-downloaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate</span>) </span>{

    ipcMain.on(<span class="hljs-string">'isUpdateNow'</span>, (e, arg) =&amp;gt; {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"开始更新"</span>);
      <span class="hljs-comment">//some code here to handle event</span>
      autoUpdater.quitAndInstall();
    });

    mainWindow.webContents.send(<span class="hljs-string">'isUpdateNow'</span>)
  });

  ipcMain.on(<span class="hljs-string">"checkForUpdate"</span>,()=&amp;gt;{
      <span class="hljs-comment">//执行自动更新检查</span>
      autoUpdater.checkForUpdates();
  })
}

<span class="hljs-comment">// 通过main进程发送事件给renderer进程，提示更新信息</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendUpdateMessage</span>(<span class="hljs-params">text</span>) </span>{
  mainWindow.webContents.send(<span class="hljs-string">'message'</span>, text)
}</code></pre>
<p>注：在添加自动更新检测和事件监听之后，在主进程createWindow中需要调用一下updateHandle()。如下图所示：<br><span class="img-wrap"><img data-src="/img/bV8CQ2?w=712&amp;h=756" src="https://static.alili.tech/img/bV8CQ2?w=712&amp;h=756" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>4.在视图（View）层中触发自动更新，并添加自动更新事件的监听。<br>触发自动更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ipcRenderer.send(&quot;checkForUpdate&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">ipcRenderer.send(<span class="hljs-string">"checkForUpdate"</span>)<span class="hljs-comment">;</span></code></pre>
<p>监听自动更新事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import { ipcRenderer } from &quot;electron&quot;;
  ipcRenderer.on(&quot;message&quot;, (event, text) =&amp;gt; {
            console.log(arguments);
            this.tips = text;
        });
        //注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
        ipcRenderer.on(&quot;downloadProgress&quot;, (event, progressObj)=&amp;gt; {
            console.log(progressObj);
            this.downloadPercent = progressObj.percent || 0;
        });
        ipcRenderer.on(&quot;isUpdateNow&quot;, () =&amp;gt; {
            ipcRenderer.send(&quot;isUpdateNow&quot;);
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  <span class="hljs-keyword">import</span> { ipcRenderer } <span class="hljs-keyword">from</span> <span class="hljs-string">"electron"</span>;
  ipcRenderer.<span class="hljs-literal">on</span>(<span class="hljs-string">"message"</span>, (event, text) =&amp;gt; {
            <span class="hljs-built_in">console</span>.log(arguments);
            <span class="hljs-keyword">this</span>.tips = text;
        });
        <span class="hljs-regexp">//</span>注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
        ipcRenderer.<span class="hljs-literal">on</span>(<span class="hljs-string">"downloadProgress"</span>, (event, progressObj)=&amp;gt; {
            <span class="hljs-built_in">console</span>.log(progressObj);
            <span class="hljs-keyword">this</span>.downloadPercent = progressObj.percent || <span class="hljs-number">0</span>;
        });
        ipcRenderer.<span class="hljs-literal">on</span>(<span class="hljs-string">"isUpdateNow"</span>, () =&amp;gt; {
            ipcRenderer.send(<span class="hljs-string">"isUpdateNow"</span>);
        });</code></pre>
<p><strong>注意：子进程中“downloadProgress”事件可能出现无法触发的问题，那是因为下载速度很快，就会跳过“downloadProgress”事件；只需要限制一下本地下载网速就好了！</strong></p>
<p>为避免多次切换页面造成监听的滥用，切换页面前必须移除监听事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//组件销毁前移除所有事件监听channel
        ipcRenderer.removeAll([&quot;message&quot;, &quot;downloadProgress&quot;, &quot;isUpdateNow&quot;]);//remove只能移除单个事件，单独封装removeAll移除所有事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//组件销毁前移除所有事件监听channel</span>
        <span class="hljs-selector-tag">ipcRenderer</span><span class="hljs-selector-class">.removeAll</span>([<span class="hljs-string">"message"</span>, <span class="hljs-string">"downloadProgress"</span>, <span class="hljs-string">"isUpdateNow"</span>]);<span class="hljs-comment">//remove只能移除单个事件，单独封装removeAll移除所有事件</span></code></pre>
<p>5.项目打包<br>执行electron-builder进行打包，windows下会生成安装包exe和latest.yml等文件，执行exe安装软件；Mac下会生成安装包dmg、zip和latest-mac.yml文件，执行dmg安装软件。<br><strong>注意：mac上不签名也可以打包成功，但是涉及到自动更新等需要身份认证的功能则不能用，也不能发布到mac app store中。所以说经过代码签名的MAC包才是完整的包。我们这里一定是经过代码签名的完整包！切记！</strong><br>具体打包流程请参考：<a href="https://segmentfault.com/a/1190000012899824">Electron 桌面应用打包（npm run build）简述(windows + mac)</a><br>MAC打包中报Error: Could not get code signature for running application错误可参考：<a href="https://segmentfault.com/a/1190000012902525" target="_blank">Electron 打包Mac安装包代码签名问题解决方案</a><br>windows打包生成文件：<br><span class="img-wrap"><img data-src="/img/bV2jdI?w=1185&amp;h=653" src="https://static.alili.tech/img/bV2jdI?w=1185&amp;h=653" alt="TIM%E6%88%AA%E5%9B%BE20180117165614.png" title="TIM%E6%88%AA%E5%9B%BE20180117165614.png" style="cursor: pointer;"></span></p>
<p>Mac打包生成文件：<br><span class="img-wrap"><img data-src="/img/bV2jdP?w=1542&amp;h=874" src="https://static.alili.tech/img/bV2jdP?w=1542&amp;h=874" alt="TIM%E6%88%AA%E5%9B%BE20180117165401.png" title="TIM%E6%88%AA%E5%9B%BE20180117165401.png" style="cursor: pointer;"></span></p>
<p>6.软件升级版本，修改package.json中的version属性，例如：改为 version: “1.1.0” (之前为1.0.0)；<br>7.再次执行electron-builder打包，Windows下将新版本latest.yml文件和exe文件（MAC下将latest-mac.yml,zip和dmg文件）放到package.json中build -&gt; publish中的url对应的地址下；<br>8.在应用中触发更新检查，electron-updater自动会通过对应url下的yml文件检查更新；</p>
<p>windows上自动更新示例：</p>
<p><span class="img-wrap"><img data-src="/img/bV2qb8?w=866&amp;h=598" src="https://static.alili.tech/img/bV2qb8?w=866&amp;h=598" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2qen?w=868&amp;h=620" src="https://static.alili.tech/img/bV2qen?w=868&amp;h=620" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>mac上自动更新示例：<br><span class="img-wrap"><img data-src="/img/bV2qck?w=800&amp;h=548" src="https://static.alili.tech/img/bV2qck?w=800&amp;h=548" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2qcr?w=800&amp;h=548" src="https://static.alili.tech/img/bV2qcr?w=800&amp;h=548" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>附：项目目录层次：<br><span class="img-wrap"><img data-src="/img/bV45Rc?w=279&amp;h=909" src="https://static.alili.tech/img/bV45Rc?w=279&amp;h=909" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong><em>如果这篇文章对你的工作或者学习有帮助的话，请收藏或点个赞。如果对其中有什么不明白的或者报错，可以留言或者加<a href="https://jq.qq.com/?_wv=1027&amp;k=5OOFkES" rel="nofollow noreferrer" target="_blank">QQ群140455228</a>交流</em></strong>。</p>
<p><strong>注意：请支持原创，本文谢绝转载，确有需要可链接到本文。本文链接地址：<a href="https://segmentfault.com/a/1190000012904543">https://segmentfault.com/a/11...</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Electron应用使用electron-builder配合electron-updater实现自动更新

## 原文链接
[https://segmentfault.com/a/1190000012904543](https://segmentfault.com/a/1190000012904543)

