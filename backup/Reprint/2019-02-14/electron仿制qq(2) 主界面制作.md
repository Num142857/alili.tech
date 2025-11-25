---
title: 'electron仿制qq(2) 主界面制作' 
date: 2019-02-14 2:30:37
hidden: true
slug: z0itp4ugs1
categories: [reprint]
---

{{< raw >}}

                    
<p>制作从头开始 最后会将写好的组件放到一起的!<br>之前写了好几天的纯css 有点累 本章中将使用<code>sass</code> <br>如果代码太长 会分两个或多个章节写<br>代码中会有详细的注释 以便于大家阅读and理解<br>界面可能会有部分偏差 比较是仿制的</p>
<hr>
<h3 id="articleHeader0">官方界面尺寸</h3>
<p>默认宽度: <code>280px</code> (大约 我之前拉伸过 被记录了 所以没法准确的测量)<br>默认高度: <code>652px</code> (也是大约值)<br>最小高度: <code>528px</code><br>最小宽度: <code>280px</code><br>最大高度: <code>1041px</code> (可能不太准确 有可能是根据分辨率来显示的)<br>最大宽度: <code>605px</code><br>顶部头像区域高度: <code>140px</code><br>底部选项区域高度: <code>40px</code><br>搜索框高度: <code>30px</code><br>头像直径/高度: <code>50px</code><br>右键菜单宽度: <code>180px</code></p>
<h2 id="articleHeader1">下载安装</h2>
<h3 id="articleHeader2">安装electron-vue</h3>
<p>这几天不知道什么情况 老是下载很慢 如果太慢就挂代理吧!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#cd F:\electron
vue init simulatedgreg/electron-vue qq_main
cd qq_main 
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment">#cd F:\electron</span>
vue init simulatedgreg/electron-vue qq_main
cd qq_main 
<span class="hljs-built_in">npm</span> install
<span class="hljs-built_in">npm</span> run dev</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiGBO?w=1083&amp;h=596" src="https://static.alili.tech/img/bVbiGBO?w=1083&amp;h=596" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">开始制作</h2>
<h3 id="articleHeader4">创建路由和界面</h3>
<p>路由:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes: [
        {path: '/', name: 'main', component: () => import('@/components/LandingPage')},
        {path: '/main', name: 'main', component: () => import('@/view/main/index')},
        {path: '*', redirect: '/'}
    ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">routes</span>: [
        {path: <span class="hljs-string">'/'</span>, name: <span class="hljs-string">'main'</span>, component: () =&gt; <span class="hljs-built_in">import</span>(<span class="hljs-string">'@/components/LandingPage'</span>)},
        {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/main'</span>, name: <span class="hljs-string">'main'</span>, component: () =&gt; <span class="hljs-built_in">import</span>(<span class="hljs-string">'@/view/main/index'</span>)},
        {<span class="hljs-attribute">path</span>: <span class="hljs-string">'*'</span>, redirect: <span class="hljs-string">'/'</span>}
    ]
})
</code></pre>
<p>创建的第一个窗口 主窗口 不能使用窗口透明 这也就意味着我们不能使用圆角 所以我们要自己再创建一个窗口 让窗口边透明!<br>将主窗口 show:false 暂时不让显示<br>之后再创建一个main.js 让他来创建我们要做的窗口!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {BrowserWindow} from 'electron'

let main = null;

function createMainWindow() {
    main = new BrowserWindow({
        width: 280, //窗口创建的默认宽度
        height: 652,    //默认高度
        minWidth: 280,  //最小宽度
        minHeight: 528, //最小高度
        maxHeight: 1041,    //最大高度
        maxWidth: 605,  //最大宽度
        alwaysOnTop: true,  //窗口置顶
        useContentSize: true,   //使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认
        frame: false,   //去掉顶部
        transparent: true,  //透明窗口
         type: 'toolbar',    //工具栏窗口
        webPreferences: {
            devTools: false,    //关闭调试工具
        }
    });
}

createMainWindow();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {BrowserWindow} <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>

<span class="hljs-keyword">let</span> main = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createMainWindow</span>(<span class="hljs-params"></span>) </span>{
    main = <span class="hljs-keyword">new</span> BrowserWindow({
        <span class="hljs-attr">width</span>: <span class="hljs-number">280</span>, <span class="hljs-comment">//窗口创建的默认宽度</span>
        height: <span class="hljs-number">652</span>,    <span class="hljs-comment">//默认高度</span>
        minWidth: <span class="hljs-number">280</span>,  <span class="hljs-comment">//最小宽度</span>
        minHeight: <span class="hljs-number">528</span>, <span class="hljs-comment">//最小高度</span>
        maxHeight: <span class="hljs-number">1041</span>,    <span class="hljs-comment">//最大高度</span>
        maxWidth: <span class="hljs-number">605</span>,  <span class="hljs-comment">//最大宽度</span>
        alwaysOnTop: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//窗口置顶</span>
        useContentSize: <span class="hljs-literal">true</span>,   <span class="hljs-comment">//使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，稍微会大一点，默认</span>
        frame: <span class="hljs-literal">false</span>,   <span class="hljs-comment">//去掉顶部</span>
        transparent: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//透明窗口</span>
         type: <span class="hljs-string">'toolbar'</span>,    <span class="hljs-comment">//工具栏窗口</span>
        webPreferences: {
            <span class="hljs-attr">devTools</span>: <span class="hljs-literal">false</span>,    <span class="hljs-comment">//关闭调试工具</span>
        }
    });
}

createMainWindow();</code></pre>
<h3 id="articleHeader5">页面文件和样式文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;main&quot;>
        <header>
            <div class=&quot;toolbar-header&quot;></div>
            <div class=&quot;search-box&quot;></div>
        </header>
        <footer></footer>
    </div>
</template>

<script>
    export default {
        name: &quot;index&quot;
    }
</script>

<style lang=&quot;sass&quot;>
    #main
        position: absolute
        width: 100%
        height: 100%
        background-color: red
        border-radius: 4px
    header
        position: relative
        border-radius: 4px 4px 0 0
        height: 140px
        background-color: blue
        width: 100%
        .toolbar-header
            position: absolute
            top: 0
            height: 33px
            width: 100%
            background-color: yellow
        .search-box
            position: absolute
            bottom: 0
            width: 100%
            height: 32px
            background-color: black
    footer
        border-radius: 0 0 4px 4px
        height: 40px
        background-color: black
        position: absolute
        bottom: 0
        width: 100%
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;template&gt;
    &lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"main"</span>&gt;
        &lt;header&gt;
            &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"toolbar-header"</span>&gt;&lt;/div&gt;
            &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"search-box"</span>&gt;&lt;/div&gt;
        &lt;/header&gt;
        &lt;footer&gt;&lt;/footer&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        name: <span class="hljs-string">"index"</span>
    }
&lt;/script&gt;

&lt;style lang=<span class="hljs-string">"sass"</span>&gt;
    <span class="hljs-selector-id">#main</span>
        <span class="hljs-attribute">position</span>: absolute
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>
        <span class="hljs-attribute">background-color</span>: red
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>
    <span class="hljs-selector-tag">header</span>
        <span class="hljs-attribute">position</span>: relative
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">140px</span>
        <span class="hljs-attribute">background-color</span>: blue
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
        <span class="hljs-selector-class">.toolbar-header</span>
            <span class="hljs-attribute">position</span>: absolute
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>
            <span class="hljs-attribute">height</span>: <span class="hljs-number">33px</span>
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
            <span class="hljs-attribute">background-color</span>: yellow
        <span class="hljs-selector-class">.search-box</span>
            <span class="hljs-attribute">position</span>: absolute
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
            <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>
            <span class="hljs-attribute">background-color</span>: black
    <span class="hljs-selector-tag">footer</span>
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">4px</span>
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>
        <span class="hljs-attribute">background-color</span>: black
        <span class="hljs-attribute">position</span>: absolute
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
&lt;/style&gt;</code></pre>
<h3 id="articleHeader6">效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVbiGFW?w=678&amp;h=752" src="https://static.alili.tech/img/bVbiGFW?w=678&amp;h=752" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">顶部</h2>
<p>由于图标有点难找 所以找了几个类似的</p>
<h3 id="articleHeader8">顶部按钮组</h3>
<p>界面代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
            <div class=&quot;toolbar-header&quot;>
                <i class=&quot;logo iconfont icon-qq&quot;></i>
                <div class=&quot;buttons&quot;>
                    <span class=&quot;iconfont icon-xunzhang&quot;></span>
                    <span class=&quot;iconfont icon-yifu&quot;></span>
                    <span class=&quot;iconfont icon-Group-&quot;></span>
                    <span class=&quot;iconfont icon-qqkongjian&quot;></span>
                    <span class=&quot;iconfont icon-winfo-icon-zuixiaohua&quot;></span>
                    <span class=&quot;iconfont icon-close close&quot;></span>
                </div>
            </div>
            <div class=&quot;search-box&quot;></div>
        </header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;header&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbar-header"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo iconfont icon-qq"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-xunzhang"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-yifu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-Group-"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-qqkongjian"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-winfo-icon-zuixiaohua"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-close close"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
            &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-box"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/header&gt;</span></code></pre>
<h3 id="articleHeader9">css代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        header
            position: relative
            -webkit-app-region: drag
            height: 140px
            background: url(&quot;../../assets/img/bg.png&quot;) no-repeat
            background-size: 100% 100%
            width: 100%
            border-radius: 4px 4px 0 0
            .toolbar-header
                position: absolute
                border-radius: 4px 4px 0 0
                top: 0
                height: 33px
                width: 100%
                line-height: 33px
                background-color: rgba(255, 255, 255, 0)
                display: flex
                .logo
                    color: #808080
                    margin-left: 10px
                    width: 30px
                .buttons
                    margin-left: auto
                    color: #FFFFFF
                    -webkit-app-region: no-drag
                    span
                        display: inline-block
                        height: 30px
                        text-align: center
                        width: 30px
                        border-radius: 3px
                        &amp;:hover
                            background-color: rgba(255, 255, 255, 0.3)
                    .close:hover
                        background-color: red
                        border-radius: 0 4px 0 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>        <span class="hljs-selector-tag">header</span>
            <span class="hljs-attribute">position</span>: relative
            -webkit-app-region: drag
            <span class="hljs-attribute">height</span>: <span class="hljs-number">140px</span>
            <span class="hljs-attribute">background</span>: url(<span class="hljs-string">"../../assets/img/bg.png"</span>) no-repeat
            <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100%</span> <span class="hljs-number">100%</span>
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
            <span class="hljs-selector-class">.toolbar-header</span>
                <span class="hljs-attribute">position</span>: absolute
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>
                <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>
                <span class="hljs-attribute">height</span>: <span class="hljs-number">33px</span>
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">33px</span>
                <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>)
                <span class="hljs-attribute">display</span>: flex
                <span class="hljs-selector-class">.logo</span>
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#808080</span>
                    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>
                    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>
                <span class="hljs-selector-class">.buttons</span>
                    <span class="hljs-attribute">margin-left</span>: auto
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span>
                    -webkit-app-region: no-drag
                    <span class="hljs-selector-tag">span</span>
                        <span class="hljs-attribute">display</span>: inline-block
                        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>
                        <span class="hljs-attribute">text-align</span>: center
                        <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>
                        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>
                        &amp;:hover
                            <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.3</span>)
                    <span class="hljs-selector-class">.close</span>:hover
                        <span class="hljs-attribute">background-color</span>: red
                        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span></code></pre>
<h2 id="articleHeader10">搜索框</h2>
<h3 id="articleHeader11">界面代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;search-box&quot;>
                <div class=&quot;search&quot;>
                    <i class=&quot;iconfont icon-sousuo&quot;></i>
                    <input type=&quot;text&quot; class=&quot;search-input&quot; placeholder=&quot;搜索&quot;>
                </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-box"</span>&gt;
                &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search"</span>&gt;
                    &lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"iconfont icon-sousuo"</span>&gt;&lt;/i&gt;
                    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-input"</span> placeholder=<span class="hljs-string">"搜索"</span>&gt;
                &lt;/div&gt;
&lt;/div&gt;</code></pre>
<h3 id="articleHeader12">css代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="            .search-box
                position: absolute
                bottom: 0
                width: 100%
                height: 32px
                background-color: rgba(255, 255, 255, 0.2)
                -webkit-app-region: no-drag
                cursor: text
                color: #FFFFFF
                line-height: 32px
                .search
                    i
                        position: absolute
                        left: 10px
                        top: 3px
                .search-input
                    width: 100%
                    background-color: rgba(255, 255, 255, 0)
                    height: 32px
                    outline: none
                    text-indent: 2rem
                    border: none
                    color: #FFFFFF
                    &amp;::placeholder
                        color: #FFFFFF" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>            <span class="hljs-selector-class">.search-box</span>
                <span class="hljs-attribute">position</span>: absolute
                <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
                <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>
                <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0.2</span>)
                -webkit-app-region: no-drag
                <span class="hljs-attribute">cursor</span>: text
                <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span>
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">32px</span>
                <span class="hljs-selector-class">.search</span>
                    <span class="hljs-selector-tag">i</span>
                        <span class="hljs-attribute">position</span>: absolute
                        <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>
                        <span class="hljs-attribute">top</span>: <span class="hljs-number">3px</span>
                <span class="hljs-selector-class">.search-input</span>
                    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
                    <span class="hljs-attribute">background-color</span>: rgba(<span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>)
                    <span class="hljs-attribute">height</span>: <span class="hljs-number">32px</span>
                    <span class="hljs-attribute">outline</span>: none
                    <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">2rem</span>
                    <span class="hljs-attribute">border</span>: none
                    <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span>
                    &amp;::placeholder
                        <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span></code></pre>
<h2 id="articleHeader13">底部</h2>
<p>界面代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <footer>
            <div class=&quot;left_menu&quot;>
                <span class=&quot;iconfont icon-menu3caidan3&quot;></span>
                <span class=&quot;iconfont icon-tianjiahaoyou&quot;></span>
                <span class=&quot;iconfont icon-wendang&quot;></span>
            </div>
            <div class=&quot;pull-right&quot;>
                <span class=&quot;iconfont icon-live_icon&quot;></span>
                <span class=&quot;iconfont icon-shipin1&quot;></span>
                <span class=&quot;iconfont icon-yinle&quot;></span>
                <span class=&quot;iconfont icon-anquan&quot;></span>
                <span class=&quot;iconfont icon-tubiaozhizuomobanyihuifu-&quot;></span>
            </div>
        </footer>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_menu"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-menu3caidan3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-tianjiahaoyou"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-wendang"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pull-right"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-live_icon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-shipin1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-yinle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-anquan"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-tubiaozhizuomobanyihuifu-"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></code></pre>
<p>css代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        footer
            border-radius: 0 0 4px 4px
            height: 40px
            line-height: 40px
            position: absolute
            bottom: 0
            width: 100%
            display: flex
            color: #333
            border-top: 1px solid #BDD0DB
            .pull-right
                margin-left: auto
            span
                display: inline-block
                width: 30px
                height: 40px
                text-align: center
                font-size: 18px
                &amp;:hover
                    background-color: #BDD0DB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>        <span class="hljs-selector-tag">footer</span>
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">4px</span>
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>
            <span class="hljs-attribute">position</span>: absolute
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>
            <span class="hljs-attribute">display</span>: flex
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>
            <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#BDD0DB</span>
            <span class="hljs-selector-class">.pull-right</span>
                <span class="hljs-attribute">margin-left</span>: auto
            <span class="hljs-selector-tag">span</span>
                <span class="hljs-attribute">display</span>: inline-block
                <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>
                <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>
                <span class="hljs-attribute">text-align</span>: center
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>
                &amp;:hover
                    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#BDD0DB</span></code></pre>
<h2 id="articleHeader14">最后效果</h2>
<p><span class="img-wrap"><img data-src="/img/bVbiGMK?w=401&amp;h=760" src="https://static.alili.tech/img/bVbiGMK?w=401&amp;h=760" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>比对qq<br><span class="img-wrap"><img data-src="/img/bVbiGMO?w=675&amp;h=751" src="https://static.alili.tech/img/bVbiGMO?w=675&amp;h=751" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>给main 加一个背景就差不多了 其实qq主界面的背景色是一整个图 然而我们并没有采取这种方式<br><span class="img-wrap"><img data-src="/img/bVbiGNl?w=665&amp;h=724" src="https://static.alili.tech/img/bVbiGNl?w=665&amp;h=724" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">版权声明</h2>
<p>本文只学习electron使用 不做任何商业用途,文章中使用的腾讯qq相关图片和相关Logo都作为学习使用,如果侵犯了腾讯的相关权益,请联系作者删除!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron仿制qq(2) 主界面制作

## 原文链接
[https://segmentfault.com/a/1190000016807560](https://segmentfault.com/a/1190000016807560)

