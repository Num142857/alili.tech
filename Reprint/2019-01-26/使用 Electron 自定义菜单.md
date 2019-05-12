---
title: '使用 Electron 自定义菜单' 
date: 2019-01-26 2:30:18
hidden: true
slug: 3h4dh4o0r4k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用 Electron 自定义菜单</h1>
<blockquote><p>此系列文章的应用示例已发布于 <a href="https://github.com/demopark/electron-api-demos-Zh_CN" rel="nofollow noreferrer" target="_blank">GitHub: electron-api-demos-Zh_CN</a>. 可以 Clone 或下载后运行查看. 欢迎 Star .</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJIoZ?w=1080&amp;h=839" src="https://static.alili.tech/img/bVJIoZ?w=1080&amp;h=839" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>使用 <code>Menu</code> 和 <code>MenuItem</code> 模块可用于创建自定义本地菜单.</p>
<p>有两种菜单: 应用程序（顶部）菜单和上下文（右键单击）菜单.</p>
<p>在浏览器中打开 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/menu.md" rel="nofollow noreferrer" target="_blank">完整的 API 文档</a> .</p>
<h2 id="articleHeader1">创建应用程序菜单</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJIo4?w=1079&amp;h=859" src="https://static.alili.tech/img/bVJIo4?w=1079&amp;h=859" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>使用 <code>Menu</code> 和 <code>MenuItem</code> 模块可以自定义你的应用程序菜单. 如果没有设置任何菜单, Electron 将为您的应用默认生成一个最小的菜单.</p>
<p>此应用程序使用下面的代码设置应用程序菜单. 如果您点击应用程序菜单中的 "查看" 选项, 然后点击 "应用程序菜单演示", 则会显示一个信息框.</p>
<p><em>主进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

let template = [{
  label: '编辑',
  submenu: [{
    label: '撤销',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: '重做',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: '剪切',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: '复制',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: '粘贴',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: '全选',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: '查看',
  submenu: [{
    label: '重载',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // 重载之后, 刷新并关闭所有的次要窗体
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: '切换全屏',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: '切换开发者工具',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: '应用程序菜单演示',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: '应用程序菜单演示',
          buttons: ['好的'],
          message: '此演示用于 &quot;菜单&quot; 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
        }
        electron.dialog.showMessageBox(focusedWindow, options, function () {})
      }
    }
  }]
}, {
  label: '窗口',
  role: 'window',
  submenu: [{
    label: '最小化',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: '关闭',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: '重新打开窗口',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '学习更多',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }]
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: '正在检查更新',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: '检查更新',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: '重启并安装更新',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `关于 ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: '服务',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `隐藏 ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: '隐藏其它',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: '显示全部',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: '退出',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // 窗口菜单.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: '前置所有',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-keyword">const</span> BrowserWindow = electron.BrowserWindow
<span class="hljs-keyword">const</span> Menu = electron.Menu
<span class="hljs-keyword">const</span> app = electron.app

<span class="hljs-keyword">let</span> template = [{
  <span class="hljs-attr">label</span>: <span class="hljs-string">'编辑'</span>,
  <span class="hljs-attr">submenu</span>: [{
    <span class="hljs-attr">label</span>: <span class="hljs-string">'撤销'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+Z'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'undo'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'重做'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'Shift+CmdOrCtrl+Z'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'redo'</span>
  }, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'剪切'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+X'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'cut'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'复制'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+C'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'copy'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'粘贴'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+V'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'paste'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'全选'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+A'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'selectall'</span>
  }]
}, {
  <span class="hljs-attr">label</span>: <span class="hljs-string">'查看'</span>,
  <span class="hljs-attr">submenu</span>: [{
    <span class="hljs-attr">label</span>: <span class="hljs-string">'重载'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+R'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, focusedWindow</span>) </span>{
      <span class="hljs-keyword">if</span> (focusedWindow) {
        <span class="hljs-comment">// 重载之后, 刷新并关闭所有的次要窗体</span>
        <span class="hljs-keyword">if</span> (focusedWindow.id === <span class="hljs-number">1</span>) {
          BrowserWindow.getAllWindows().forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">win</span>) </span>{
            <span class="hljs-keyword">if</span> (win.id &gt; <span class="hljs-number">1</span>) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'切换全屏'</span>,
    <span class="hljs-attr">accelerator</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (process.platform === <span class="hljs-string">'darwin'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Ctrl+Command+F'</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'F11'</span>
      }
    })(),
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, focusedWindow</span>) </span>{
      <span class="hljs-keyword">if</span> (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'切换开发者工具'</span>,
    <span class="hljs-attr">accelerator</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (process.platform === <span class="hljs-string">'darwin'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Alt+Command+I'</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'Ctrl+Shift+I'</span>
      }
    })(),
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, focusedWindow</span>) </span>{
      <span class="hljs-keyword">if</span> (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'应用程序菜单演示'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, focusedWindow</span>) </span>{
      <span class="hljs-keyword">if</span> (focusedWindow) {
        <span class="hljs-keyword">const</span> options = {
          <span class="hljs-attr">type</span>: <span class="hljs-string">'info'</span>,
          <span class="hljs-attr">title</span>: <span class="hljs-string">'应用程序菜单演示'</span>,
          <span class="hljs-attr">buttons</span>: [<span class="hljs-string">'好的'</span>],
          <span class="hljs-attr">message</span>: <span class="hljs-string">'此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'</span>
        }
        electron.dialog.showMessageBox(focusedWindow, options, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{})
      }
    }
  }]
}, {
  <span class="hljs-attr">label</span>: <span class="hljs-string">'窗口'</span>,
  <span class="hljs-attr">role</span>: <span class="hljs-string">'window'</span>,
  <span class="hljs-attr">submenu</span>: [{
    <span class="hljs-attr">label</span>: <span class="hljs-string">'最小化'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+M'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'minimize'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'关闭'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+W'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'close'</span>
  }, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'重新打开窗口'</span>,
    <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'CmdOrCtrl+Shift+T'</span>,
    <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">key</span>: <span class="hljs-string">'reopenMenuItem'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      app.emit(<span class="hljs-string">'activate'</span>)
    }
  }]
}, {
  <span class="hljs-attr">label</span>: <span class="hljs-string">'帮助'</span>,
  <span class="hljs-attr">role</span>: <span class="hljs-string">'help'</span>,
  <span class="hljs-attr">submenu</span>: [{
    <span class="hljs-attr">label</span>: <span class="hljs-string">'学习更多'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      electron.shell.openExternal(<span class="hljs-string">'http://electron.atom.io'</span>)
    }
  }]
}]

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addUpdateMenuItems</span> (<span class="hljs-params">items, position</span>) </span>{
  <span class="hljs-keyword">if</span> (process.mas) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">const</span> version = electron.app.getVersion()
  <span class="hljs-keyword">let</span> updateItems = [{
    <span class="hljs-attr">label</span>: <span class="hljs-string">`Version <span class="hljs-subst">${version}</span>`</span>,
    <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'正在检查更新'</span>,
    <span class="hljs-attr">enabled</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">key</span>: <span class="hljs-string">'checkingForUpdate'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'检查更新'</span>,
    <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">key</span>: <span class="hljs-string">'checkForUpdate'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).autoUpdater.checkForUpdates()
    }
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'重启并安装更新'</span>,
    <span class="hljs-attr">enabled</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">key</span>: <span class="hljs-string">'restartToUpdate'</span>,
    <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, <span class="hljs-number">0</span>].concat(updateItems))
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findReopenMenuItem</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> menu = Menu.getApplicationMenu()
  <span class="hljs-keyword">if</span> (!menu) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">let</span> reopenMenuItem
  menu.items.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">if</span> (item.submenu) {
      item.submenu.items.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">if</span> (item.key === <span class="hljs-string">'reopenMenuItem'</span>) {
          reopenMenuItem = item
        }
      })
    }
  })
  <span class="hljs-keyword">return</span> reopenMenuItem
}

<span class="hljs-keyword">if</span> (process.platform === <span class="hljs-string">'darwin'</span>) {
  <span class="hljs-keyword">const</span> name = electron.app.getName()
  template.unshift({
    <span class="hljs-attr">label</span>: name,
    <span class="hljs-attr">submenu</span>: [{
      <span class="hljs-attr">label</span>: <span class="hljs-string">`关于 <span class="hljs-subst">${name}</span>`</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">'about'</span>
    }, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
    }, {
      <span class="hljs-attr">label</span>: <span class="hljs-string">'服务'</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">'services'</span>,
      <span class="hljs-attr">submenu</span>: []
    }, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
    }, {
      <span class="hljs-attr">label</span>: <span class="hljs-string">`隐藏 <span class="hljs-subst">${name}</span>`</span>,
      <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'Command+H'</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">'hide'</span>
    }, {
      <span class="hljs-attr">label</span>: <span class="hljs-string">'隐藏其它'</span>,
      <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'Command+Alt+H'</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">'hideothers'</span>
    }, {
      <span class="hljs-attr">label</span>: <span class="hljs-string">'显示全部'</span>,
      <span class="hljs-attr">role</span>: <span class="hljs-string">'unhide'</span>
    }, {
      <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
    }, {
      <span class="hljs-attr">label</span>: <span class="hljs-string">'退出'</span>,
      <span class="hljs-attr">accelerator</span>: <span class="hljs-string">'Command+Q'</span>,
      <span class="hljs-attr">click</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        app.quit()
      }
    }]
  })

  <span class="hljs-comment">// 窗口菜单.</span>
  template[<span class="hljs-number">3</span>].submenu.push({
    <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span>
  }, {
    <span class="hljs-attr">label</span>: <span class="hljs-string">'前置所有'</span>,
    <span class="hljs-attr">role</span>: <span class="hljs-string">'front'</span>
  })

  addUpdateMenuItems(template[<span class="hljs-number">0</span>].submenu, <span class="hljs-number">1</span>)
}

<span class="hljs-keyword">if</span> (process.platform === <span class="hljs-string">'win32'</span>) {
  <span class="hljs-keyword">const</span> helpMenu = template[template.length - <span class="hljs-number">1</span>].submenu
  addUpdateMenuItems(helpMenu, <span class="hljs-number">0</span>)
}

app.on(<span class="hljs-string">'ready'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on(<span class="hljs-string">'browser-window-created'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> reopenMenuItem = findReopenMenuItem()
  <span class="hljs-keyword">if</span> (reopenMenuItem) reopenMenuItem.enabled = <span class="hljs-literal">false</span>
})

app.on(<span class="hljs-string">'window-all-closed'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> reopenMenuItem = findReopenMenuItem()
  <span class="hljs-keyword">if</span> (reopenMenuItem) reopenMenuItem.enabled = <span class="hljs-literal">true</span>
})</code></pre>
<h3 id="articleHeader2">高级技巧</h3>
<p><strong>了解操作系统菜单的差异.</strong></p>
<p>在为多个操作系统设计应用程序时, 请务必注意应用程序菜单在每个操作系统上的不同约定之处。</p>
<p>例如, 在 Windows 上, 加速器设置为 <code>＆</code> . 命名约定也有所不同, 如 "设置" 或 "首选项". 下面是学习操作系统特定标准的资源:</p>
<ul>
<li><a href="https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/MenuBarMenus.html#//apple_ref/doc/uid/20000957-CH29-SW1" rel="nofollow noreferrer" target="_blank">macOS</a></li>
<li>
<a href="https://msdn.microsoft.com/en-us/library/windows/desktop/bb226797(v=vs.85" rel="nofollow noreferrer" target="_blank">Windows</a>.aspx)</li>
<li><a href="https://developer.gnome.org/hig/stable/menu-bars.html.en" rel="nofollow noreferrer" target="_blank">Linux</a></li>
</ul>
<h2 id="articleHeader3">创建上下文菜单</h2>
<blockquote><p>支持: Win, macOS, Linux | 进程: Main</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVJIpd?w=1079&amp;h=838" src="https://static.alili.tech/img/bVJIpd?w=1079&amp;h=838" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以使用 <code>Menu</code> 和 <code>MenuItem</code> 模块创建上下文或右键单击菜单. 您可以右键单击此应用程序中的任何位置, 或单击示例按钮以查看示例上下文菜单.</p>
<p>在这个示例中, 我们使用 <code>ipcRenderer</code> 模块来展示从渲染器进程显式调用它时的上下文菜单.</p>
<p>有关所有可用的属性请查看 <a href="https://github.com/electron/electron/blob/master/docs-translations/zh-CN/api/web-contents.md#event-context-menu" rel="nofollow noreferrer" target="_blank">上下文菜单事件文档</a> .</p>
<p><em>主进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
const app = electron.app

const menu = new Menu()
menu.append(new MenuItem({ label: 'Hello' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
})

ipc.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> electron = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>)
<span class="hljs-keyword">const</span> BrowserWindow = electron.BrowserWindow
<span class="hljs-keyword">const</span> Menu = electron.Menu
<span class="hljs-keyword">const</span> MenuItem = electron.MenuItem
<span class="hljs-keyword">const</span> ipc = electron.ipcMain
<span class="hljs-keyword">const</span> app = electron.app

<span class="hljs-keyword">const</span> menu = <span class="hljs-keyword">new</span> Menu()
menu.append(<span class="hljs-keyword">new</span> MenuItem({ <span class="hljs-attr">label</span>: <span class="hljs-string">'Hello'</span> }))
menu.append(<span class="hljs-keyword">new</span> MenuItem({ <span class="hljs-attr">type</span>: <span class="hljs-string">'separator'</span> }))
menu.append(<span class="hljs-keyword">new</span> MenuItem({ <span class="hljs-attr">label</span>: <span class="hljs-string">'Electron'</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'checkbox'</span>, <span class="hljs-attr">checked</span>: <span class="hljs-literal">true</span> }))

app.on(<span class="hljs-string">'browser-window-created'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, win</span>) </span>{
  win.webContents.on(<span class="hljs-string">'context-menu'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, params</span>) </span>{
    menu.popup(win, params.x, params.y)
  })
})

ipc.on(<span class="hljs-string">'show-context-menu'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">const</span> win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})</code></pre>
<p><em>渲染器进程</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ipc = require('electron').ipcRenderer

// 告诉主进程在单击示例按钮时显示菜单
const contextMenuBtn = document.getElementById('context-menu')
contextMenuBtn.addEventListener('click', function () {
  ipc.send('show-context-menu')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ipc = <span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).ipcRenderer

<span class="hljs-comment">// 告诉主进程在单击示例按钮时显示菜单</span>
<span class="hljs-keyword">const</span> contextMenuBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'context-menu'</span>)
contextMenuBtn.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  ipc.send(<span class="hljs-string">'show-context-menu'</span>)
})</code></pre>
<blockquote><p>如果这边文章对您有帮助, 感谢 下方点赞 或 Star  <a href="https://github.com/demopark/electron-api-demos-Zh_CN" rel="nofollow noreferrer" target="_blank">GitHub: electron-api-demos-Zh_CN</a> 支持, 谢谢.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Electron 自定义菜单

## 原文链接
[https://segmentfault.com/a/1190000008473121](https://segmentfault.com/a/1190000008473121)

