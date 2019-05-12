---
title: 'electron 仿制QQ登录界面' 
date: 2019-02-13 2:31:22
hidden: true
slug: 31n0xofum2u
categories: [reprint]
---

{{< raw >}}

                    
<p>首先来看看qq的登录界面:<br><span class="img-wrap"><img data-src="/img/bVbiu16?w=483&amp;h=458" src="https://static.alili.tech/img/bVbiu16?w=483&amp;h=458" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">准备开发</h2>
<h3 id="articleHeader1">制作一个窗口先</h3>
<h4>主进程代码:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {BrowserWindow, webContents, app, ipcMain} from 'electron'

LoginWindow();    //暂时调用

ipcMain.on('quitApp', () => {
    app.quit();
});

function LoginWindow() {
    const loginURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/login` : `file://${__dirname}/index.html/#/login`;
    const loginWindow = new BrowserWindow({
        width: 430,
        height: 328,
        alwaysOnTop: true,
        modal: true,
        frame: false,
        darkTheme: true,
        resizable: false,
        minimizable: false,
        maximizable: false,
        transparent: true,
        webPreferences: {
            devTools: false,
        }
    });


    loginWindow.setMenu(null);
    loginWindow.loadURL(loginURL);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">import</span> <span class="hljs-string">{BrowserWindow,</span> <span class="hljs-string">webContents,</span> <span class="hljs-string">app,</span> <span class="hljs-string">ipcMain}</span> <span class="hljs-string">from</span> <span class="hljs-string">'electron'</span>

<span class="hljs-string">LoginWindow();</span>    <span class="hljs-string">//暂时调用</span>

<span class="hljs-string">ipcMain.on('quitApp',</span> <span class="hljs-string">()</span> <span class="hljs-string">=&gt;</span> <span class="hljs-string">{</span>
    <span class="hljs-string">app.quit();</span>
<span class="hljs-string">});</span>

<span class="hljs-string">function</span> <span class="hljs-string">LoginWindow()</span> <span class="hljs-string">{</span>
    <span class="hljs-string">const</span> <span class="hljs-string">loginURL</span> <span class="hljs-string">=</span> <span class="hljs-string">process.env.NODE_ENV</span> <span class="hljs-string">===</span> <span class="hljs-string">'development'</span> <span class="hljs-string">?</span> <span class="hljs-string">`http://localhost:9080/#/login`</span> <span class="hljs-string">:</span> <span class="hljs-string">`file://${__dirname}/index.html/#/login`;</span>
    <span class="hljs-string">const</span> <span class="hljs-string">loginWindow</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">BrowserWindow({</span>
<span class="hljs-attr">        width:</span> <span class="hljs-number">430</span><span class="hljs-string">,</span>
<span class="hljs-attr">        height:</span> <span class="hljs-number">328</span><span class="hljs-string">,</span>
<span class="hljs-attr">        alwaysOnTop:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        modal:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        frame:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        darkTheme:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        resizable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        minimizable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        maximizable:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        transparent:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        webPreferences:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            devTools:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">});</span>


    <span class="hljs-string">loginWindow.setMenu(null);</span>
    <span class="hljs-string">loginWindow.loadURL(loginURL);</span>
<span class="hljs-string">}</span></code></pre>
<h3 id="articleHeader2">界面基本布局</h3>
<p>我们先大概做一个这样的界面<br><span class="img-wrap"><img data-src="/img/bVbiu3q?w=430&amp;h=328" src="https://static.alili.tech/img/bVbiu3q?w=430&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>页面代码:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;mainWindow&quot;>
        <header class=&quot;header&quot;></header>
        <main>
            <div class=&quot;bg&quot;></div>
            <div class=&quot;body&quot;></div>
        </main>
        <footer class=&quot;footer&quot;></footer>
    </div>
</template>

<script>
    import '@/assets/css/login.css'

    export default {
      
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mainWindow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> <span class="hljs-string">'@/assets/css/login.css'</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
      
    }</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h4>样式代码:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
取消全部的外边距和内边距
 */
* {
    padding: 0;
    margin: 0;
}

/*设置窗口的样式*/
.mainWindow {
    cursor: pointer;    /*设置手型*/
    border: 1px solid red;  /*加一个边框 调试样式 最后要删除或者更改**/
    width: 428px;   /*设置宽度  必须要和主进程中设置的一样 不能大于主进程中设置的宽度 否则会出现滚动条*/
    height: 326px;  /*设置高度  必须要和主进程中设置的一样 不能大于主进程中设置的高度 否则会出现滚动条*/
    position: relative; /*设置为相对定位*/
    border-radius: 4px; /*设置圆角*/
}

/**
header的样式 header中只会有一个关闭按钮 处于右上角
 */
.mainWindow header.header {
    position: absolute; /*设置绝对定位 因为背景在他下面*/
    height: 30px;   /*设置高度*/
    background: rgba(0, 0, 0, 0.5); /*暂时设置的 后面要删除或者更改*/
    border-radius: 4px 4px 0 0; /*给header的左上角 右上角设置圆角 不然会出现很尴尬的页面*/
    width: 428px;   /* 因为设置了绝对定位 设置宽度*/
}

/**
背景
 */
.mainWindow main .bg {
    height: 124px;  /*设置高度*/
    width: 428px;   /*设置宽度 也可以不用设置 因为这个元素没有设置绝对定位 所以默认就是100%*/
    border-radius: 4px 4px 0 0; /*给左上角 右上角设置圆角 不然会出现很尴尬的页面 这里和header重合在一起了*/
    background: blue;  /*暂时设置的 后面要删除或者更改*/
}

/**
放置表单的元素
 */
.mainWindow main .body {
    width: 428px;  /*设置宽度 也可以不用设置 因为这个元素没有设置绝对定位 所以默认就是100%*/
    height: 172px;  /*设置高度 这里的高度是 主窗口(326) - footer(30) - 背景(124) 因为header设置了绝对定位 所以不用关 */
    background: green;  /*暂时设置的 后面要删除或者更改*/
}

.mainWindow footer.footer {
    position: absolute; /* 设置绝对定位 要让他处于窗口的最底部*/
    height: 30px; /*设置高度 */
    background: red;  /*暂时设置的 后面要删除或者更改*/
    bottom: 0;  /*让footer处于底部*/
    width: 428px; /* 因为设置了绝对定位 设置宽度*/
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/**
取消全部的外边距和内边距
 */</span>
* {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-comment">/*设置窗口的样式*/</span>
<span class="hljs-selector-class">.mainWindow</span> {
    <span class="hljs-attribute">cursor</span>: pointer;    <span class="hljs-comment">/*设置手型*/</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;  <span class="hljs-comment">/*加一个边框 调试样式 最后要删除或者更改**/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">428px</span>;   <span class="hljs-comment">/*设置宽度  必须要和主进程中设置的一样 不能大于主进程中设置的宽度 否则会出现滚动条*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">326px</span>;  <span class="hljs-comment">/*设置高度  必须要和主进程中设置的一样 不能大于主进程中设置的高度 否则会出现滚动条*/</span>
    <span class="hljs-attribute">position</span>: relative; <span class="hljs-comment">/*设置为相对定位*/</span>
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>; <span class="hljs-comment">/*设置圆角*/</span>
}

<span class="hljs-comment">/**
header的样式 header中只会有一个关闭按钮 处于右上角
 */</span>
<span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.header</span> {
    <span class="hljs-attribute">position</span>: absolute; <span class="hljs-comment">/*设置绝对定位 因为背景在他下面*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;   <span class="hljs-comment">/*设置高度*/</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5); <span class="hljs-comment">/*暂时设置的 后面要删除或者更改*/</span>
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>; <span class="hljs-comment">/*给header的左上角 右上角设置圆角 不然会出现很尴尬的页面*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">428px</span>;   <span class="hljs-comment">/* 因为设置了绝对定位 设置宽度*/</span>
}

<span class="hljs-comment">/**
背景
 */</span>
<span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">main</span> <span class="hljs-selector-class">.bg</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">124px</span>;  <span class="hljs-comment">/*设置高度*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">428px</span>;   <span class="hljs-comment">/*设置宽度 也可以不用设置 因为这个元素没有设置绝对定位 所以默认就是100%*/</span>
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>; <span class="hljs-comment">/*给左上角 右上角设置圆角 不然会出现很尴尬的页面 这里和header重合在一起了*/</span>
    <span class="hljs-attribute">background</span>: blue;  <span class="hljs-comment">/*暂时设置的 后面要删除或者更改*/</span>
}

<span class="hljs-comment">/**
放置表单的元素
 */</span>
<span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">main</span> <span class="hljs-selector-class">.body</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">428px</span>;  <span class="hljs-comment">/*设置宽度 也可以不用设置 因为这个元素没有设置绝对定位 所以默认就是100%*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">172px</span>;  <span class="hljs-comment">/*设置高度 这里的高度是 主窗口(326) - footer(30) - 背景(124) 因为header设置了绝对定位 所以不用关 */</span>
    <span class="hljs-attribute">background</span>: green;  <span class="hljs-comment">/*暂时设置的 后面要删除或者更改*/</span>
}

<span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.footer</span> {
    <span class="hljs-attribute">position</span>: absolute; <span class="hljs-comment">/* 设置绝对定位 要让他处于窗口的最底部*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>; <span class="hljs-comment">/*设置高度 */</span>
    <span class="hljs-attribute">background</span>: red;  <span class="hljs-comment">/*暂时设置的 后面要删除或者更改*/</span>
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;  <span class="hljs-comment">/*让footer处于底部*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">428px</span>; <span class="hljs-comment">/* 因为设置了绝对定位 设置宽度*/</span>
}
</code></pre>
<h3 id="articleHeader3">窗口拖动</h3>
<p>注意 不要使用内置的拖动 我们要自己实现!<br>在页面中加入以下代码就可以实现拖动了!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
            return {
                windowX: 0,
                windowY: 0,
            }
        },
        mounted() {
            let win = this.$electron.remote.getCurrentWindow();

            document.addEventListener('mousedown', function (e) {
                this.windowX = e.x;
                this.windowY = e.y;
                document.addEventListener('mousemove', moveEvent);
            });

            document.addEventListener('mouseup', function () {
                this.windowX = 0;
                this.windowY = 0;
                document.removeEventListener('mousemove', moveEvent)
            });

            function moveEvent(e) {

                win.setPosition(e.screenX - this.windowX, e.screenY - this.windowY)
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">windowX</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">windowY</span>: <span class="hljs-number">0</span>,
            }
        },
        mounted() {
            <span class="hljs-keyword">let</span> win = <span class="hljs-keyword">this</span>.$electron.remote.getCurrentWindow();

            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">this</span>.windowX = e.x;
                <span class="hljs-keyword">this</span>.windowY = e.y;
                <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousemove'</span>, moveEvent);
            });

            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mouseup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.windowX = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">this</span>.windowY = <span class="hljs-number">0</span>;
                <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mousemove'</span>, moveEvent)
            });

            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">moveEvent</span>(<span class="hljs-params">e</span>) </span>{

                win.setPosition(e.screenX - <span class="hljs-keyword">this</span>.windowX, e.screenY - <span class="hljs-keyword">this</span>.windowY)
            }
        }</code></pre>
<h3 id="articleHeader4">设置背景图</h3>
<p>将css里面的 .bg修改成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mainWindow main .bg {
    height: 124px;  /*设置高度*/
    width: 428px;   /*设置宽度 也可以不用设置 因为这个元素没有设置绝对定位 所以默认就是100%*/
    border-radius: 4px 4px 0 0; /*给左上角 右上角设置圆角 不然会出现很尴尬的页面 这里和header重合在一起了*/
    background: url(&quot;../images/login-back.gif&quot;) 10px;
    background-size: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">main</span> <span class="hljs-selector-class">.bg</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">124px</span>;  <span class="hljs-comment">/*设置高度*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">428px</span>;   <span class="hljs-comment">/*设置宽度 也可以不用设置 因为这个元素没有设置绝对定位 所以默认就是100%*/</span>
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>; <span class="hljs-comment">/*给左上角 右上角设置圆角 不然会出现很尴尬的页面 这里和header重合在一起了*/</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"../images/login-back.gif"</span>) <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<p>完成之后效果如如下:</p>
<p><span class="img-wrap"><img data-src="/img/bVbiu8m?w=469&amp;h=331" src="https://static.alili.tech/img/bVbiu8m?w=469&amp;h=331" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">制作顶部</h3>
<p>顶部的logo和最小化就不做了 只做一个关闭的按钮<br>去阿里巴巴图标库下载字体文件之后放到assets/fonts目录中<br>在页面中加入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import '@/assets/fonts/iconfont.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">import</span> <span class="hljs-string">'@/assets/fonts/iconfont.css'</span></code></pre>
<p>header代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <header class=&quot;header&quot;>
            <span class=&quot;iconfont icon-guanbi1&quot;></span>
 </header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> &lt;header <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"header"</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-guanbi1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
 &lt;<span class="hljs-regexp">/header&gt;</span></code></pre>
<p>css文件<br>注意 在css .mainWindow header.header 添加<br>由于我背景图的关系 按钮可能不太明显 这问题不大 大家可以自己换一个图!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background: rgba(255, 255, 255, 0.2); /*暂时设置的 后面要删除或者更改*/
text-align: right;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">background</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.2</span>); <span class="hljs-comment">/*暂时设置的 后面要删除或者更改*/</span>
<span class="hljs-attribute">text-align</span>: right;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mainWindow header.header span{
    display: inline-block;
    height: 30px;
    width:30px;
    text-align: center;
    line-height: 30px;
    color:#E4393c;
}
.mainWindow header.header span:hover{
    background-color: rgba(255,255,255,0.6);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.header</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#E4393c</span>;
}
<span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.header</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255,255,255,0.6);
}</code></pre>
<h2 id="articleHeader6">制作表单页</h2>
<h3 id="articleHeader7">表单界面代码</h3>
<p>创建一个子组件 login.vue <br>写入如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;form&quot;>
        <form>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-1zhanghu&quot;></i><input type=&quot;text&quot;></div>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-mima1&quot;></i><input type=&quot;password&quot;></div>
        </form>
        <div class=&quot;buttons&quot;>
            <button>登录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: &quot;login&quot;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-1zhanghu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-mima1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"login"</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader8">表单页css</h3>
<p>需要将 .mainWindow main .body 的背景颜色调成#FFFFFF</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".form form{
    padding:10px 90px 0 90px;
}
.form_item{
    height: 40px;
    position: relative;
}
.form_item i.iconfont{
    position: absolute;
    top:5px;
}
.form_item input{
    outline: none;
    border:none;
    padding-left: 20px;
    font-size: 16px;
    width: 230px;
    height: 30px;
    border-bottom: 1px solid #CCC;
}
.buttons{
    text-align: center;
}
.buttons button{
    background-color: #CF000E;
    border: none;
    width: 250px;
    color: #FFFFFF;
    height: 35px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    outline: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.form</span> <span class="hljs-selector-tag">form</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span> <span class="hljs-number">90px</span> <span class="hljs-number">0</span> <span class="hljs-number">90px</span>;
}
<span class="hljs-selector-class">.form_item</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.form_item</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.iconfont</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.form_item</span> <span class="hljs-selector-tag">input</span>{
    <span class="hljs-attribute">outline</span>: none;
    <span class="hljs-attribute">border</span>:none;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">230px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#CCC</span>;
}
<span class="hljs-selector-class">.buttons</span>{
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-tag">button</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CF000E</span>;
    <span class="hljs-attribute">border</span>: none;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">250px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">outline</span>: none;
}</code></pre>
<h3 id="articleHeader9">效果</h3>
<p>最后看到是这样的<br><span class="img-wrap"><img data-src="/img/bVbivgs?w=554&amp;h=419" src="https://static.alili.tech/img/bVbivgs?w=554&amp;h=419" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">复选框美化</h2>
<h3 id="articleHeader11">组件代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;login_options&quot;>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>自动登录</i></label>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>记住密码</i></label>
                <i class=&quot;text&quot;>忘记密码</i>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login_options"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>自动登录<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>记住密码<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>忘记密码<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader12">css代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".login_options{
    margin-bottom: 10px;
    margin-top: 5px;
}
.login_options .option_item {
    display: inline-block;
    width: 13px;
    height: 13px;
    margin-right: 5px;
    position: relative;
    border: 1px solid orange;
    vertical-align: middle;
    cursor: pointer;
    top: -2px;
}

.login_options .option_item input {
    opacity: 0;
}
.login_options  i.text{
    display: inline-block;
    margin-right: 14px;
    font-size: 13px;
    font-style: normal;
}

.login_options .option_item span.checked {
    position: absolute;
    top: -4px;
    right: -3px;
    font-weight: bold;
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.option_item span.checked img {
    width: 100%;
    height: 100%;
}

input[type=&quot;checkbox&quot;] + span {
    opacity: 0;
}

input[type=&quot;checkbox&quot;]:checked + span {
    opacity: 1;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.login_options</span>{
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-class">.option_item</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid orange;
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">2px</span>;
}

<span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-class">.option_item</span> <span class="hljs-selector-tag">input</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.login_options</span>  <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.text</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">font-style</span>: normal;
}

<span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-class">.option_item</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.checked</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">right</span>: -<span class="hljs-number">3px</span>;
    <span class="hljs-attribute">font-weight</span>: bold;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}

<span class="hljs-selector-class">.option_item</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.checked</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="checkbox"]</span> + <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="checkbox"]</span><span class="hljs-selector-pseudo">:checked</span> + <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
}
</code></pre>
<h3 id="articleHeader13">效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVbivjG?w=573&amp;h=393" src="https://static.alili.tech/img/bVbivjG?w=573&amp;h=393" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVbivkL?w=430&amp;h=328" src="https://static.alili.tech/img/bVbivkL?w=430&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader14">注册页面</h2>
<p>我们改进一点 因为qq的注册是一个连接到web页面去申请qq号码的 不过我做的是点击注册将界面切换到注册界面,只不过是<br>在写注册界面代码之前先将父组件种的login注释掉备用 (别删除哦) 在父组件中引入Register组件<br>注册的逻辑是这样的 在注册界面输入手机号和图形验证码 获取到短信验证码输入之后跳转到下一步输入密码<br>如果将全部的逻辑写到一个组件中会导致太长 虽然有办法解决 但是之后使用动画就很难看了!</p>
<h3 id="articleHeader15">界面代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;form&quot;>
        <form>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-phone_icon&quot;></i><input type=&quot;text&quot;></div>
            <div class=&quot;form_item&quot;>
                <i class=&quot;iconfont icon-yanzhengma2&quot;></i>
                <input type=&quot;password&quot;>
                <div class=&quot;captcha&quot;>
                    <img src=&quot;@/assets/images/captcha.png&quot; alt=&quot;&quot;>
                </div>
            </div>
            <div class=&quot;form_item&quot;>
                <i class=&quot;iconfont icon-yanzhengma5&quot;></i>
                <input type=&quot;password&quot;>
                <div class=&quot;send_sms_captcha&quot;><button>获取短信验证码</button></div>
            </div>
        </form>
        <div class=&quot;buttons&quot;>
            <button>下一步</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: &quot;register&quot;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-phone_icon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-yanzhengma2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"captcha"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/captcha.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-yanzhengma5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"send_sms_captcha"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>获取短信验证码<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>下一步<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"register"</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader16">界面Css代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".captcha {
    position: absolute;
    width: 120px;
    height: 30px;
    top: -2px;
    right: 0;
}

.captcha img {
    width: 100%;
    height: 100%;
}

.send_sms_captcha {
    position: absolute;
    top: -2px;
    right: 0;
}
.send_sms_captcha  button{
    width:120px;
    height: 30px;
    border:none;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.captcha</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">2px</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.captcha</span> <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.send_sms_captcha</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">2px</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.send_sms_captcha</span>  <span class="hljs-selector-tag">button</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">120px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border</span>:none;
    <span class="hljs-attribute">outline</span>: none;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
}</code></pre>
<h3 id="articleHeader17">父组件代码</h3>
<p>部分代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<main>
        <div class=&quot;bg&quot;></div>
         <div class=&quot;body&quot;>
                <!--<Login></Login>-->
                <Register></Register>
            </div>
        </main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;main&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
         &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"body"</span>&gt;
                <span class="xml"><span class="hljs-comment">&lt;!--&lt;Login&gt;&lt;/Login&gt;--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Register</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Register</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/main&gt;</span></code></pre>
<h3 id="articleHeader18">效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVbivsb?w=430&amp;h=328" src="https://static.alili.tech/img/bVbivsb?w=430&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader19">注册步骤2</h2>
<h3 id="articleHeader20">界面代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;form&quot;>
        <form>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-zaicishurumima&quot;></i><input type=&quot;text&quot;></div>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-mima1&quot;></i><input type=&quot;password&quot;></div>
            <div class=&quot;login_options&quot; style=&quot;text-align: center&quot;>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>自动登录</i></label>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>记住密码</i></label>
            </div>
        </form>
        <div class=&quot;buttons&quot;>
            <button>登录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: &quot;steps2&quot;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-zaicishurumima"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-mima1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login_options"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"text-align: center"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>自动登录<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>记住密码<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"steps2"</span>
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader21">展示</h3>
<p><span class="img-wrap"><img data-src="/img/bVbivuc?w=430&amp;h=328" src="https://static.alili.tech/img/bVbivuc?w=430&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader22">footer代码</h2>
<h3 id="articleHeader23">jie简介</h3>
<p>在上面中footer里面显示了注册账号<br>其实这只是暂时的方案 为了方便截图<br>首先来分析一下 在登录页面的时候在底部显示注册账号 在注册第一步的时候在底部左侧显示已经账号,在第二步骤的时候显示返回上一步<br>我们有很多办法在子组件通知父组件去显示不同的文字<br>作者给出两个方案:<br>1: 通过子组件给父组件传值 <br>2: 使用vuex<br>3: 将footer拆分到各个组件中<br>我们代码中使用拆分就行了 比较简单点<br>将父组件的footer删除<br>往组件login.vue steps1.vue steps2.vue 组件中加入footer</p>
<h3 id="articleHeader24">login.vue:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;form&quot;>
        <form>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-1zhanghu&quot;></i><input type=&quot;text&quot;></div>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-mima1&quot;></i><input type=&quot;password&quot;></div>
            <div class=&quot;login_options&quot;>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>自动登录</i></label>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>记住密码</i></label>
                <i class=&quot;text&quot;>忘记密码</i>
            </div>
        </form>
        <div class=&quot;buttons&quot;>
            <button>登录</button>
        </div>
        <footer class=&quot;footer&quot;>
            <span @click=&quot;toggleWindow&quot;>注册账号</span>
        </footer>
    </div>
</template>

<script>
    export default {
        name: &quot;login&quot;,
        methods:{
            toggleWindow(){
                this.$store.dispatch('toggleLogin');
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-1zhanghu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-mima1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login_options"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>自动登录<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>记住密码<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>忘记密码<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleWindow"</span>&gt;</span>注册账号<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"login"</span>,
        <span class="hljs-attr">methods</span>:{
            toggleWindow(){
                <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'toggleLogin'</span>);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader25">steps1.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;form&quot;>
        <form>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-phone_icon&quot;></i><input type=&quot;text&quot;></div>
            <div class=&quot;form_item&quot;>
                <i class=&quot;iconfont icon-yanzhengma2&quot;></i>
                <input type=&quot;password&quot;>
                <div class=&quot;captcha&quot;>
                    <img src=&quot;@/assets/images/captcha.png&quot; alt=&quot;&quot;>
                </div>
            </div>
            <div class=&quot;form_item&quot;>
                <i class=&quot;iconfont icon-yanzhengma5&quot;></i>
                <input type=&quot;password&quot;>
                <div class=&quot;send_sms_captcha&quot;><button>获取短信验证码</button></div>
            </div>
        </form>
        <div class=&quot;buttons&quot;>
            <button @click=&quot;toggleSteps&quot;>下一步</button>
        </div>
        <footer class=&quot;footer&quot;>
            <span @click=&quot;toggleWindow&quot;>已有账号</span>
        </footer>
    </div>
</template>

<script>
    export default {
        name: &quot;steps1&quot;,
        methods:{
            toggleWindow(){
                this.$store.dispatch('toggleLogin');
            },
            toggleSteps(){
                this.$store.dispatch('toggleSteps');
            },
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-phone_icon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-yanzhengma2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"captcha"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/captcha.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-yanzhengma5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"send_sms_captcha"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>获取短信验证码<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleSteps"</span>&gt;</span>下一步<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleWindow"</span>&gt;</span>已有账号<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"steps1"</span>,
        <span class="hljs-attr">methods</span>:{
            toggleWindow(){
                <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'toggleLogin'</span>);
            },
            toggleSteps(){
                <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'toggleSteps'</span>);
            },
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader26">steps2.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;form&quot;>
        <form>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-zaicishurumima&quot;></i><input type=&quot;text&quot;></div>
            <div class=&quot;form_item&quot;><i class=&quot;iconfont icon-mima1&quot;></i><input type=&quot;password&quot;></div>
            <div class=&quot;login_options&quot; style=&quot;text-align: center&quot;>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>立即登录</i></label>
                <label><div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img src=&quot;@/assets/images/checked.png&quot; alt=&quot;&quot;></span></div><i class=&quot;text&quot;>记住密码</i></label>
            </div>
        </form>
        <div class=&quot;buttons&quot;>
            <button>注册</button>
        </div>
        <footer class=&quot;footer&quot;>
            <span @click=&quot;toggleSteps&quot;>返回上一步</span>
        </footer>
    </div>
</template>

<script>
    export default {
        name: &quot;steps2&quot;,
        methods:{
            toggleSteps(){
                this.$store.dispatch('toggleSteps');
            },
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-zaicishurumima"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-mima1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login_options"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"text-align: center"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>立即登录<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/images/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>记住密码<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">footer</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleSteps"</span>&gt;</span>返回上一步<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"steps2"</span>,
        <span class="hljs-attr">methods</span>:{
            toggleSteps(){
                <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'toggleSteps'</span>);
            },
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader27">vuex 代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
    steps: true,
    login: true,
};

const actions = {
    toggleSteps: function ({state, commit}) {
        // state.steps = true;
        state.steps = !state.steps;
    },

    toggleLogin({state, commit}){
        state.login = !state.login;
    }
};

export default ({
    state,
    actions
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const <span class="hljs-keyword">state</span> = {
    steps: true,
    login: true,
};

const actions = {
    toggleSteps: function ({<span class="hljs-keyword">state</span>, commit}) {
        // <span class="hljs-keyword">state</span>.steps = true;
        <span class="hljs-keyword">state</span>.steps = !<span class="hljs-keyword">state</span>.steps;
    },

    toggleLogin({<span class="hljs-keyword">state</span>, commit}){
        <span class="hljs-keyword">state</span>.login = !<span class="hljs-keyword">state</span>.login;
    }
};

export <span class="hljs-keyword">default</span> ({
    <span class="hljs-keyword">state</span>,
    actions
});</code></pre>
<h3 id="articleHeader28">效果展示</h3>
<p><span class="img-wrap"><img data-src="/img/bVbivAx?w=349&amp;h=246" src="https://static.alili.tech/img/bVbivAx?w=349&amp;h=246" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader29">添加动画效果</h2>
<p>上面这些完成之后有点单调 尤其是切换的时候 我们可以用到 animateCss <br>animateCss 下载地址:<a href="https://daneden.github.io/animate.css/" rel="nofollow noreferrer" target="_blank">https://daneden.github.io/ani...</a></p>
<p>子组件加入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import '@/assets/css/animate.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">import</span> <span class="hljs-string">'@/assets/css/animate.css'</span></code></pre>
<p>之后我们在代码中加入效果就行了<br>将父组件改成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <main>
            <div class=&quot;bg&quot;></div>
                <transition
                        :duration=&quot;500&quot;
                        :enter-active-class=&quot;'animated ' + (login ?  'bounceInRight' : 'bounceInLeft')&quot;
                        :leave-active-class=&quot;'animated ' + (login ? 'bounceOutLeft' : 'bounceOutRight')&quot;
                >
                <Login v-if=&quot;login === true&quot; key=&quot;login&quot;></Login>
                <Register v-else key=&quot;register&quot;></Register>
                </transition>
        </main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">transition</span>
                        <span class="hljs-attr">:duration</span>=<span class="hljs-string">"500"</span>
                        <span class="hljs-attr">:enter-active-class</span>=<span class="hljs-string">"'animated ' + (login ?  'bounceInRight' : 'bounceInLeft')"</span>
                        <span class="hljs-attr">:leave-active-class</span>=<span class="hljs-string">"'animated ' + (login ? 'bounceOutLeft' : 'bounceOutRight')"</span>
                &gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Login</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"login === true"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"login"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Login</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Register</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"register"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Register</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></code></pre>
<p>子组件 register.vue改成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <transition
                :duration=&quot;500&quot;
                :enter-active-class=&quot;'animated ' + (steps ?  'bounceInRight' : 'bounceInLeft')&quot;
                :leave-active-class=&quot;'animated ' + (steps ? 'bounceOutLeft' : 'bounceOutRight')&quot;
        >
        <Steps1 v-if=&quot;steps === true&quot; key=&quot;steps&quot;></Steps1>
        <Steps2 v-else key=&quot;steps&quot;></Steps2>
        </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  &lt;transition
                :duration=<span class="hljs-string">"500"</span>
                :enter-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"'animated ' + (steps ?  'bounceInRight' : 'bounceInLeft')"</span>
                :leave-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"'animated ' + (steps ? 'bounceOutLeft' : 'bounceOutRight')"</span>
        &gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Steps1</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"steps === true"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">"steps"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Steps1</span>&gt;</span></span>
        &lt;Steps2 v-<span class="hljs-keyword">else</span> key=<span class="hljs-string">"steps"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">Steps2</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/transition&gt;</span></code></pre>
<p>修改下css 因为要使用动画就要将main定位才能用<br>加入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mainWindow main {
    position: absolute;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.mainWindow</span> <span class="hljs-selector-tag">main</span> {
    <span class="hljs-attribute">position</span>: absolute;
}</code></pre>
<p>效果展示:<br><span class="img-wrap"><img data-src="/img/bVbivDx?w=318&amp;h=227" src="https://static.alili.tech/img/bVbivDx?w=318&amp;h=227" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>到这里就差不多了 代码太多没法一一发布上来 如果有需要的可以去github下载或者加QQ群 814270669<br>github地址:<a href="https://github.com/lihaotian0607/qqLogin" rel="nofollow noreferrer" target="_blank">https://github.com/lihaotian0...</a><br>码云地址: <a href="https://gitee.com/leehaotian/qqLogin" rel="nofollow noreferrer" target="_blank">https://gitee.com/leehaotian/...</a></p>
<p>我的github账号出了问题 一直登录不上去 所以就先发布到码云了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron 仿制QQ登录界面

## 原文链接
[https://segmentfault.com/a/1190000016763275](https://segmentfault.com/a/1190000016763275)

