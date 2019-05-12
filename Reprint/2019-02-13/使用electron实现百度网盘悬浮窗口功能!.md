---
title: '使用electron实现百度网盘悬浮窗口功能!' 
date: 2019-02-13 2:31:23
hidden: true
slug: juvlt542pzf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">相关依赖</h2>
<p>里面使用了vuex  vue  vue-route storeJs</p>
<p>storeJs 用来持久化vuex状态</p>
<h2 id="articleHeader1">展示</h2>
<p><span class="img-wrap"><img data-src="/img/bVbisuB?w=592&amp;h=424" src="https://static.alili.tech/img/bVbisuB?w=592&amp;h=424" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbisvG?w=260&amp;h=263" src="https://static.alili.tech/img/bVbisvG?w=260&amp;h=263" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">介绍说明</h2>
<p>没有使用electron内置的<code>-webkit-app-region: drag</code> 因为使用他那个有很多问题<br>比如事件无法使用 右键无法使用 以及不能使用手型等!</p>
<h2 id="articleHeader3">安装</h2>
<p>安装的时候没有截图 所以就参考下我其他的文章吧<br>storeJs 安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install storejs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> storejs</code></pre>
<h2 id="articleHeader4">准备写代码</h2>
<h3 id="articleHeader5">配置路由文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes: [
        {path: '/', name: 'home', component: ()=> import('@/view//home')},
        {path: '/suspension', name: 'suspension', component: ()=> import('@/view/components/suspension')}
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">routes</span>: [
        {path: <span class="hljs-string">'/'</span>, name: <span class="hljs-string">'home'</span>, component: ()=&gt; <span class="hljs-built_in">import</span>(<span class="hljs-string">'@/view//home'</span>)},
        {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/suspension'</span>, name: <span class="hljs-string">'suspension'</span>, component: ()=&gt; <span class="hljs-built_in">import</span>(<span class="hljs-string">'@/view/components/suspension'</span>)}
    ]
})</code></pre>
<h3 id="articleHeader6">写悬浮窗页面</h3>
<p>页面路径 <code>/src/renderer/view/components/suspension.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;suspension&quot;>
        <div class=&quot;logo&quot;></div>
        <div class=&quot;content_body&quot;>
            <div class=&quot;upload&quot;>拖拽上传</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: &quot;suspension&quot;,
        mounted() {
            let win = this.$electron.remote.getCurrentWindow();
            let biasX = 0;
            let biasY = 0;
            let that = this;
            document.addEventListener('mousedown', function (e) {
                switch (e.button) {
                    case 0:
                        biasX = e.x;
                        biasY = e.y;
                        document.addEventListener('mousemove', moveEvent);
                        break;
                    case 2:
                        that.$electron.ipcRenderer.send('createSuspensionMenu');
                        break;
                }
            });

            document.addEventListener('mouseup', function () {
                biasX = 0;
                biasY = 0;
                document.removeEventListener('mousemove', moveEvent)
            });

            function moveEvent(e) {
                win.setPosition(e.screenX - biasX, e.screenY - biasY)
            }
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    .upload {
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        color: #74A1FA;
    }

    .logo {
        width: 40px;
        background: #5B9BFE url(&quot;../../assets/img/logo@2x.png&quot;) no-repeat 2px 3px;
        background-size: 80%;
    }

    .content_body {
        background-color: #EEF4FE;
        width: 100%;
    }

    #suspension {
        -webkit-user-select: none;
        cursor: pointer;
        overflow: hidden;
    }

    #suspension {
        cursor: pointer !important;
        height: 25px;
        border-radius: 4px;
        display: flex;
        border: 1px solid #3388FE;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"suspension"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_body"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"upload"</span>&gt;</span>拖拽上传<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"suspension"</span>,
        mounted() {
            <span class="hljs-keyword">let</span> win = <span class="hljs-keyword">this</span>.$electron.remote.getCurrentWindow();
            <span class="hljs-keyword">let</span> biasX = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">let</span> biasY = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span>;
            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">switch</span> (e.button) {
                    <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
                        biasX = e.x;
                        biasY = e.y;
                        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousemove'</span>, moveEvent);
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
                        that.$electron.ipcRenderer.send(<span class="hljs-string">'createSuspensionMenu'</span>);
                        <span class="hljs-keyword">break</span>;
                }
            });

            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mouseup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                biasX = <span class="hljs-number">0</span>;
                biasY = <span class="hljs-number">0</span>;
                <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mousemove'</span>, moveEvent)
            });

            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">moveEvent</span>(<span class="hljs-params">e</span>) </span>{
                win.setPosition(e.screenX - biasX, e.screenY - biasY)
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-class">.upload</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#74A1FA</span>;
    }

    <span class="hljs-selector-class">.logo</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#5B9BFE</span> <span class="hljs-built_in">url</span>(<span class="hljs-string">"../../assets/img/logo@2x.png"</span>) no-repeat <span class="hljs-number">2px</span> <span class="hljs-number">3px</span>;
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">80%</span>;
    }

    <span class="hljs-selector-class">.content_body</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EEF4FE</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    }

    <span class="hljs-selector-id">#suspension</span> {
        <span class="hljs-attribute">-webkit-user-select</span>: none;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">overflow</span>: hidden;
    }

    <span class="hljs-selector-id">#suspension</span> {
        <span class="hljs-attribute">cursor</span>: pointer <span class="hljs-meta">!important</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#3388FE</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader7">主进程创建悬浮窗页面代码</h3>
<p>路径: <code>/src/main/window.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {BrowserWindow, ipcMain, screen, Menu, shell, app, webContents} from 'electron'

var win = null;
const window = BrowserWindow.fromWebContents(webContents.getFocusedWebContents());
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/suspension` : `file://${__dirname}/index.html/#/suspension`;
ipcMain.on('showSuspensionWindow', () => {
    if (win) {
        if (win.isVisible()) {
            createSuspensionWindow();
        } else {
            win.showInactive();
        }
    } else {
        createSuspensionWindow();
    }

});

ipcMain.on('createSuspensionMenu', (e) => {
    const rightM = Menu.buildFromTemplate([
        {label: '开始全部任务', enabled: false},
        {label: '暂停全部任务', enabled: false},
        {label: '本次传输完自动关机'},
        {type: 'separator'},
        {
            label: '隐藏悬浮窗',
            click: () => {
                window.webContents.send('hideSuspension', false);
                win.hide()
            }
        },
        {type: 'separator'},
        {
            label: '加入qq群',
            click: () => {
                shell.openExternal('tencent://groupwpa/?subcmd=all&amp;param=7B2267726F757055696E223A3831343237303636392C2274696D655374616D70223A313533393531303138387D0A');
            }
        },
        {
            label: 'GitHub地址',
            click: () => {
                shell.openExternal('https://github.com/lihaotian0607/auth');
            }
        },
        {
            label: '退出软件',
            click: () => {
                app.quit();
            }
        },
    ]);
    rightM.popup({});
});

function createSuspensionWindow() {
    win = new BrowserWindow({
        width: 107, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
        height: 27, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
        type: 'toolbar',    //创建的窗口类型为工具栏窗口
        frame: false,   //要创建无边框窗口
        resizable: false, //禁止窗口大小缩放
        show: false,    //先不让窗口显示
        webPreferences: {
            devTools: false //关闭调试工具
        },
        transparent: true,  //设置透明
        alwaysOnTop: true,  //窗口是否总是显示在其他窗口之前
    });
    const size = screen.getPrimaryDisplay().workAreaSize;   //获取显示器的宽高
    const winSize = win.getSize();  //获取窗口宽高

    //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
    win.setPosition(size.width - winSize[0], 100);
    win.loadURL(winURL);

    win.once('ready-to-show', () => {
        win.show()
    });

    win.on('close', () => {
        win = null;
    })
}

ipcMain.on('hideSuspensionWindow', () => {
    if (win) {
        win.hide();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {BrowserWindow, ipcMain, screen, Menu, shell, app, webContents} <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>

<span class="hljs-keyword">var</span> win = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">const</span> <span class="hljs-built_in">window</span> = BrowserWindow.fromWebContents(webContents.getFocusedWebContents());
<span class="hljs-keyword">const</span> winURL = process.env.NODE_ENV === <span class="hljs-string">'development'</span> ? <span class="hljs-string">`http://localhost:9080/#/suspension`</span> : <span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html/#/suspension`</span>;
ipcMain.on(<span class="hljs-string">'showSuspensionWindow'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (win) {
        <span class="hljs-keyword">if</span> (win.isVisible()) {
            createSuspensionWindow();
        } <span class="hljs-keyword">else</span> {
            win.showInactive();
        }
    } <span class="hljs-keyword">else</span> {
        createSuspensionWindow();
    }

});

ipcMain.on(<span class="hljs-string">'createSuspensionMenu'</span>, <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> rightM = Menu.buildFromTemplate([
        {label: <span class="hljs-string">'开始全部任务'</span>, enabled: <span class="hljs-literal">false</span>},
        {label: <span class="hljs-string">'暂停全部任务'</span>, enabled: <span class="hljs-literal">false</span>},
        {label: <span class="hljs-string">'本次传输完自动关机'</span>},
        {<span class="hljs-keyword">type</span>: <span class="hljs-string">'separator'</span>},
        {
            label: <span class="hljs-string">'隐藏悬浮窗'</span>,
            click: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-built_in">window</span>.webContents.send(<span class="hljs-string">'hideSuspension'</span>, <span class="hljs-literal">false</span>);
                win.hide()
            }
        },
        {<span class="hljs-keyword">type</span>: <span class="hljs-string">'separator'</span>},
        {
            label: <span class="hljs-string">'加入qq群'</span>,
            click: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                shell.openExternal(<span class="hljs-string">'tencent://groupwpa/?subcmd=all&amp;param=7B2267726F757055696E223A3831343237303636392C2274696D655374616D70223A313533393531303138387D0A'</span>);
            }
        },
        {
            label: <span class="hljs-string">'GitHub地址'</span>,
            click: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                shell.openExternal(<span class="hljs-string">'https://github.com/lihaotian0607/auth'</span>);
            }
        },
        {
            label: <span class="hljs-string">'退出软件'</span>,
            click: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                app.quit();
            }
        },
    ]);
    rightM.popup({});
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createSuspensionWindow</span>(<span class="hljs-params"></span>) </span>{
    win = <span class="hljs-keyword">new</span> BrowserWindow({
        width: <span class="hljs-number">107</span>, <span class="hljs-comment">//悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框</span>
        height: <span class="hljs-number">27</span>, <span class="hljs-comment">//悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框</span>
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'toolbar'</span>,    <span class="hljs-comment">//创建的窗口类型为工具栏窗口</span>
        frame: <span class="hljs-literal">false</span>,   <span class="hljs-comment">//要创建无边框窗口</span>
        resizable: <span class="hljs-literal">false</span>, <span class="hljs-comment">//禁止窗口大小缩放</span>
        show: <span class="hljs-literal">false</span>,    <span class="hljs-comment">//先不让窗口显示</span>
        webPreferences: {
            devTools: <span class="hljs-literal">false</span> <span class="hljs-comment">//关闭调试工具</span>
        },
        transparent: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//设置透明</span>
        alwaysOnTop: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//窗口是否总是显示在其他窗口之前</span>
    });
    <span class="hljs-keyword">const</span> size = screen.getPrimaryDisplay().workAreaSize;   <span class="hljs-comment">//获取显示器的宽高</span>
    <span class="hljs-keyword">const</span> winSize = win.getSize();  <span class="hljs-comment">//获取窗口宽高</span>

    <span class="hljs-comment">//设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度</span>
    win.setPosition(size.width - winSize[<span class="hljs-number">0</span>], <span class="hljs-number">100</span>);
    win.loadURL(winURL);

    win.once(<span class="hljs-string">'ready-to-show'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        win.show()
    });

    win.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        win = <span class="hljs-literal">null</span>;
    })
}

ipcMain.on(<span class="hljs-string">'hideSuspensionWindow'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (win) {
        win.hide();
    }
});</code></pre>
<h3 id="articleHeader8">store文件</h3>
<p>路径: <code>/src/renderer/store/modules/suspension.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import storejs from 'storejs'

const state = {
    show: storejs.get('showSuspension')
};

const actions = {
    showSuspension: function ({state, commit}) {
        let status = true;
        storejs.set('showSuspension', status);
        state.show = status;
    },

    hideSuspension: function ({state, commit}) {
        let status = false;
        storejs.set('showSuspension', status);
        state.show = status;
    },
};

export default ({
    state,
    actions
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import storejs <span class="hljs-keyword">from</span> 'storejs'

const <span class="hljs-keyword">state</span> = {
    show: storejs.get('showSuspension')
};

const actions = {
    showSuspension: function ({<span class="hljs-keyword">state</span>, commit}) {
        let status = true;
        storejs.<span class="hljs-built_in">set</span>('showSuspension', status);
        <span class="hljs-keyword">state</span>.show = status;
    },

    hideSuspension: function ({<span class="hljs-keyword">state</span>, commit}) {
        let status = false;
        storejs.<span class="hljs-built_in">set</span>('showSuspension', status);
        <span class="hljs-keyword">state</span>.show = status;
    },
};

export <span class="hljs-keyword">default</span> ({
    <span class="hljs-keyword">state</span>,
    actions
});</code></pre>
<h2 id="articleHeader9">版权说明</h2>
<p>里面使用的百度的图标以及UI作为学习使用,请不要作为商业用途!</p>
<h2 id="articleHeader10">遗留问题</h2>
<p>在软件关闭之后重启会导致悬浮窗口的位置重置 也曾尝试在主进程中使用store.js  但是不能用!<br>如果想解决这个问题 可以在渲染进程中将拖动的最后坐标保存到storejs中<br>在渲染进程给主进程发送异步消息的时候将坐标携带进去  也可以使用nedb在主进程中存储坐标!</p>
<h2 id="articleHeader11">github地址</h2>
<p>使用electron制作百度网盘客户端: <a href="https://github.com/lihaotian0607/baidupan" rel="nofollow noreferrer" target="_blank">https://github.com/lihaotian0...</a><br>使用electron制作百度网盘悬浮窗: <a href="https://github.com/lihaotian0607/electron-suspension" rel="nofollow noreferrer" target="_blank">https://github.com/lihaotian0...</a></p>
<p>目前这个开源代码中没有悬浮窗 有时间了会加上去!!!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用electron实现百度网盘悬浮窗口功能!

## 原文链接
[https://segmentfault.com/a/1190000016753488](https://segmentfault.com/a/1190000016753488)

