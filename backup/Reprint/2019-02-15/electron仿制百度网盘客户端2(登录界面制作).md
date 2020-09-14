---
title: 'electron仿制百度网盘客户端2(登录界面制作)' 
date: 2019-02-15 2:30:44
hidden: true
slug: zpvhplennsn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">效果预览</h2>
<p><span class="img-wrap"><img data-src="/img/bVbizN2?w=1512&amp;h=622" src="https://static.alili.tech/img/bVbizN2?w=1512&amp;h=622" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">尺寸测量</h2>
<p>百度网盘客户端的尺寸是:<br>主界面 w:662px h:442px<br>顶部header  h:75px bg:#EFF2F6</p>
<h2 id="articleHeader2">开始制作</h2>
<h3 id="articleHeader3">下载安装electron-vue</h3>
<p><span class="img-wrap"><img data-src="/img/bVbizN6?w=997&amp;h=394" src="https://static.alili.tech/img/bVbizN6?w=997&amp;h=394" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">制作登录界面</h3>
<p>首先将主界面 mainWindow 隐藏掉 只需要在主进程index.js 里面设置<code>show: false</code>就可以了<br>之后制作一个登录界面<br>创建一个login.js 在主进程index.js之中引入<br>login.js 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {BrowserWindow} from 'electron'

let loginWindow = null;

const loginUrl = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/login` : `file://${__dirname}/index.html/#/login`;

function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 662,
        height: 442,
        useContentSize: true,
        frame: false,
        resizable: false
    });

    loginWindow.setMenu(null);

    loginWindow.loadURL(loginUrl);
}

createLoginWindow();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {BrowserWindow} <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>

<span class="hljs-keyword">let</span> loginWindow = <span class="hljs-literal">null</span>;

<span class="hljs-keyword">const</span> loginUrl = process.env.NODE_ENV === <span class="hljs-string">'development'</span> ? <span class="hljs-string">`http://localhost:9080/#/login`</span> : <span class="hljs-string">`file://<span class="hljs-subst">${__dirname}</span>/index.html/#/login`</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createLoginWindow</span>(<span class="hljs-params"></span>) </span>{
    loginWindow = <span class="hljs-keyword">new</span> BrowserWindow({
        <span class="hljs-attr">width</span>: <span class="hljs-number">662</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">442</span>,
        <span class="hljs-attr">useContentSize</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">frame</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">resizable</span>: <span class="hljs-literal">false</span>
    });

    loginWindow.setMenu(<span class="hljs-literal">null</span>);

    loginWindow.loadURL(loginUrl);
}

createLoginWindow();</code></pre>
<h3 id="articleHeader5">创建login路由</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {path: '/login', name: 'login', component: () => import('@/view/login')}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">  {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/login'</span>, name: <span class="hljs-string">'login'</span>, component: () =&gt; <span class="hljs-built_in">import</span>(<span class="hljs-string">'@/view/login'</span>)},</code></pre>
<h3 id="articleHeader6">创建登录界面</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;login&quot;>
  <header></header>
 <main></main>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"login"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
 &lt;main&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<h3 id="articleHeader7">样式代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    * {
        padding: 0;
        margin: 0;
    }

    .login {
        width: 662px;
        height: 442px;
        border: 1px solid #999999;
        font-family: &quot;微软雅黑&quot;;
        -webkit-user-select: none;
    }

    header {
        height: 75px;
        background-color: #EFF2F6;
        -webkit-app-region: drag;
        position: relative;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    * {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.login</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">662px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">442px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999999</span>;
        <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"微软雅黑"</span>;
        <span class="hljs-attribute">-webkit-user-select</span>: none;
    }

    <span class="hljs-selector-tag">header</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">75px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EFF2F6</span>;
        <span class="hljs-attribute">-webkit-app-region</span>: drag;
        <span class="hljs-attribute">position</span>: relative;
    }</code></pre>
<h3 id="articleHeader8">图标下载</h3>
<p>去阿里矢量素材中心下载一致的图标, 耐心掉 因为有时候很难找到一样的!<br>下载完毕之后丢到 <code>assets/fonts</code>目录下<br>在 login.vue中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './assets/fonts/iconfont.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/fonts/iconfont.css'</span></code></pre>
<h2 id="articleHeader9">头部制作</h2>
<h3 id="articleHeader10">头部代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<header>
            <div class=&quot;logo&quot;></div>
            <div class=&quot;menu&quot;>
                <span class=&quot;iconfont lee-setting&quot;></span>
                <span class=&quot;iconfont lee-zuixiaohua1&quot;></span>
                <span class=&quot;iconfont lee-close&quot;></span>
            </div>
        </header>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-setting"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-zuixiaohua1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-close"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></code></pre>
<h3 id="articleHeader11">头部样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    header {
        height: 75px;
        background-color: #EFF2F6;
        -webkit-app-region: drag;
        position: relative;
    }

    header .logo {
        width: 140px;
        height: 75px;
        background: url(&quot;../../assets/img/logo@2x.png&quot;) no-repeat 0 20px;
        background-size: 140px 33px;
        margin: 0 auto;
    }

    header .menu {
        width: 100px;
        height: 30px;
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
        padding-top: 8px;
        padding-right: 8px;
    }

    header .menu span {
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-left: 5px;
        cursor: pointer;
        text-align: center;
        line-height: 22px;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
    <span class="hljs-selector-tag">header</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">75px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EFF2F6</span>;
        <span class="hljs-attribute">-webkit-app-region</span>: drag;
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-tag">header</span> <span class="hljs-selector-class">.logo</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">140px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">75px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">"../../assets/img/logo@2x.png"</span>) no-repeat <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">background-size</span>: <span class="hljs-number">140px</span> <span class="hljs-number">33px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }

    <span class="hljs-selector-tag">header</span> <span class="hljs-selector-class">.menu</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">text-align</span>: right;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">8px</span>;
    }

    <span class="hljs-selector-tag">header</span> <span class="hljs-selector-class">.menu</span> <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">22px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">22px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">22px</span>;
    }
</code></pre>
<h2 id="articleHeader12">左侧扫码</h2>
<h3 id="articleHeader13">模板代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <main>
            <div class=&quot;scan&quot;>
                <h2><i class=&quot;iconfont lee-erweima1&quot;></i>扫一扫登录</h2>
                <p class=&quot;title&quot;>请使用<i>xxxxxApp</i>扫码登录 </p>
                <div class=&quot;qrcode&quot;>
                    <img src=&quot;@/assets/img/qrcode.png&quot; alt=&quot;&quot;>
                </div>
                <span class=&quot;refresh&quot;>刷新二维码</span>
            </div>
        </main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"scan"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-erweima1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>扫一扫登录<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>请使用<span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>xxxxxApp<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>扫码登录 <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"qrcode"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/img/qrcode.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"refresh"</span>&gt;</span>刷新二维码<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></code></pre>
<h3 id="articleHeader14">样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" main {
        height: 365px;
        padding-top: 30px;
        background: #FFFFFF;
    }

    main .scan p.title {
        text-align: center;
        font-size: 14px;
        color: #666666;
        font-weight: normal;
        margin-top: 30px;
    }

    .scan p.title i {
        display: inline-block;
        font-style: normal;
        margin-right: 5px;
        margin-left: 5px;
        color: #398CFF;
        cursor: pointer;
    }

    .scan p.title i:hover {
        border-bottom: 1px solid #398CFF;
    }

    main .scan h2 {
        text-align: center;
        font-size: 16px;
        font-weight: normal;
    }

    main .scan h2 i {
        margin-right: 5px;
        font-size: 14px;
    }

    .scan .qrcode {
        width: 154px;
        height: 154px;
        margin: 20px auto 0 auto;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid #ECEDEE;
    }

    .scan .qrcode img {
        width: 100%;
        height: 100%;
    }

    .scan span.refresh {
        display: block;
        width: 94px;
        height: 30px;
        border: 1px solid #BAD4FD;
        margin: 22px auto 0 auto;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        border-radius: 4px;
        color: #3482F9;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">main</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">365px</span>;
        <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFFFFF</span>;
    }

    <span class="hljs-selector-tag">main</span> <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.title</span> {
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#666666</span>;
        <span class="hljs-attribute">font-weight</span>: normal;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">30px</span>;
    }

    <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.title</span> <span class="hljs-selector-tag">i</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">font-style</span>: normal;
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#398CFF</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }

    <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-tag">p</span><span class="hljs-selector-class">.title</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#398CFF</span>;
    }

    <span class="hljs-selector-tag">main</span> <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-tag">h2</span> {
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">font-weight</span>: normal;
    }

    <span class="hljs-selector-tag">main</span> <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-tag">h2</span> <span class="hljs-selector-tag">i</span> {
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    }

    <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-class">.qrcode</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">154px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">154px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ECEDEE</span>;
    }

    <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-class">.qrcode</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    }

    <span class="hljs-selector-class">.scan</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.refresh</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">94px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#BAD4FD</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">22px</span> auto <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#3482F9</span>;
    }
</code></pre>
<h2 id="articleHeader15">右侧表单</h2>
<h3 id="articleHeader16">模板代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div class=&quot;form&quot;>
                <div class=&quot;login_options&quot;>
                    <div class=&quot;header&quot;>
                        <span>账号密码登录</span>
                        <i>短信快捷登录></i>
                    </div>
                    <div class=&quot;validate_msg&quot;></div>
                    <form action=&quot;&quot;>
                        <div class=&quot;form_item&quot;><i class=&quot;iconfont lee-account&quot;></i><input placeholder=&quot;手机号码/邮箱/用户名&quot; class=&quot;text&quot; type=&quot;text&quot;>
                        </div>
                        <div class=&quot;form_item&quot;><i class=&quot;iconfont lee-mima&quot;></i><input class=&quot;text&quot; placeholder=&quot;请输入密码&quot; type=&quot;password&quot;>
                        </div>
                        <div class=&quot;form_options&quot;>
                            <label>
                                <div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img
                                        src=&quot;@/assets/img/checked.png&quot; alt=&quot;&quot;></span></div>
                                <span class=&quot;text&quot;>自动登录</span></label>
                            <label>
                                <div class=&quot;option_item&quot;><input type=&quot;checkbox&quot;><span class=&quot;checked&quot;><img
                                        src=&quot;@/assets/img/checked.png&quot; alt=&quot;&quot;></span></div>
                                <span class=&quot;text&quot;>记住密码</span></label>
                            <i>忘记密码?</i>
                        </div>
                    </form>
                    <button type=&quot;button&quot; class=&quot;submit&quot;>登录</button>
                    <div class=&quot;footer&quot;>
                        <i class=&quot;register&quot;>注册账号</i>
                        <div class=&quot;thirdparty&quot;>
                            <i class=&quot;iconfont lee-weixin2&quot;></i>
                            <i class=&quot;iconfont lee-xinlangweibo1&quot;></i>
                            <i class=&quot;iconfont lee-tubiao215&quot;></i>
                        </div>
                    </div>
                </div>
            </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login_options"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>账号密码登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>短信快捷登录&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"validate_msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">""</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-account"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"手机号码/邮箱/用户名"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-mima"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入密码"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form_options"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span>
                                        <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/img/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>自动登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option_item"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checked"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span>
                                        <span class="hljs-attr">src</span>=<span class="hljs-string">"@/assets/img/checked.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>记住密码<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>忘记密码?<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"register"</span>&gt;</span>注册账号<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"thirdparty"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-weixin2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-xinlangweibo1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont lee-tubiao215"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader17">样式代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".form {
        padding-right: 30px;
        padding-left: 10px;
    }

    .form .validate_msg {
        height: 37px;
    }

    .form .header {
        display: flex;
    }

    .form .header i {
        font-style: normal;
        color: #3482F9;
        cursor: pointer;
        margin-left: auto;
        font-size: 12px;
    }

    .form input, .form button {
        outline: none;
    }

    .form input.text {
        height: 40px;
        width: 290px;
        border: 1px solid #C7C7C7;
        padding-left: 35px;
        border-radius: 1px;
    }

    .form .form_item {
        margin-bottom: 16px;
        position: relative;
    }
    .form .form_item:nth-last-child(2){
        /*margin-bottom: 10px;*/
    }

    .form .form_item i {
        position: absolute;
        font-size: 16px;
        top: 12px;
        left: 10px;
        color: #000000;
    }

    .form .form_options {
        display: flex;
    }

    .form .form_options i {
        margin-left: auto;
        font-style: normal;
        font-size: 12px;
        color: #3482F9;
        cursor: pointer;
        position: relative;
        top:3px;
    }

    .form .form_options i:hover {
        text-decoration: underline;
    }

    .login_options .option_item {
        display: inline-block;
        width: 13px;
        height: 13px;
        margin-right: 5px;
        position: relative;
        border: 1px solid #B3B3B3;
        vertical-align: middle;
        cursor: pointer;
        top: -1px;
    }

    .login_options .option_item input {
        opacity: 0;
    }

    .login_options span.text {
        display: inline-block;
        margin-right: 14px;
        font-size: 13px;
    }

    .login_options .option_item span.checked {
        position: absolute;
        top: -5px;
        right: -1px;
        font-weight: bold;
        display: inline-block;
        width: 13px;
        height: 13px;
        cursor: pointer;
    }

    .form_options label {
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

    button.submit {
        margin-top: 25px;
        width: 100%;
        height: 38px;
        background-color: #398CFF;
        color: #FFFFFF;
        border:none;
        border-radius: 3px;
        font-size: 16px;
        font-family: 微软雅黑;
    }

    .form .footer{
        display: flex;
        position: absolute;
        bottom: 15px;
        width:300px;
    }

    .form .footer i.register{
        font-style: normal;
        font-size: 13px;
        color: #3482F9;
        cursor: pointer;

    }
    .form .footer i.register:hover{
        text-decoration: underline;
    }
    .form .footer div{
        margin-left: auto;
        color:#5D9BFA;
    }
    .form .footer div i{
        display: inline-block;
        margin-left: 10px;
        width:20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        font-size: 18px;
    }
    .form .footer div i:hover{
        background-color: #EBF3FF;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.form</span> {
        <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">10px</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.validate_msg</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">37px</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.header</span> {
        <span class="hljs-attribute">display</span>: flex;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.header</span> <span class="hljs-selector-tag">i</span> {
        <span class="hljs-attribute">font-style</span>: normal;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#3482F9</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">margin-left</span>: auto;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-tag">input</span>, <span class="hljs-selector-class">.form</span> <span class="hljs-selector-tag">button</span> {
        <span class="hljs-attribute">outline</span>: none;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.text</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">290px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#C7C7C7</span>;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">35px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">1px</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.form_item</span> {
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.form_item</span><span class="hljs-selector-pseudo">:nth-last-child(2)</span>{
        <span class="hljs-comment">/*margin-bottom: 10px;*/</span>
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.form_item</span> <span class="hljs-selector-tag">i</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#000000</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.form_options</span> {
        <span class="hljs-attribute">display</span>: flex;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.form_options</span> <span class="hljs-selector-tag">i</span> {
        <span class="hljs-attribute">margin-left</span>: auto;
        <span class="hljs-attribute">font-style</span>: normal;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#3482F9</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">3px</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.form_options</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">text-decoration</span>: underline;
    }

    <span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-class">.option_item</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">13px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">13px</span>;
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#B3B3B3</span>;
        <span class="hljs-attribute">vertical-align</span>: middle;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">1px</span>;
    }

    <span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-class">.option_item</span> <span class="hljs-selector-tag">input</span> {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.text</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
    }

    <span class="hljs-selector-class">.login_options</span> <span class="hljs-selector-class">.option_item</span> <span class="hljs-selector-tag">span</span><span class="hljs-selector-class">.checked</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">5px</span>;
        <span class="hljs-attribute">right</span>: -<span class="hljs-number">1px</span>;
        <span class="hljs-attribute">font-weight</span>: bold;
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">13px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">13px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }

    <span class="hljs-selector-class">.form_options</span> <span class="hljs-selector-tag">label</span> {
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

    <span class="hljs-selector-tag">button</span><span class="hljs-selector-class">.submit</span> {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">25px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">38px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#398CFF</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFFFFF</span>;
        <span class="hljs-attribute">border</span>:none;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">font-family</span>: 微软雅黑;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.footer</span>{
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">15px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
    }

    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.register</span>{
        <span class="hljs-attribute">font-style</span>: normal;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#3482F9</span>;
        <span class="hljs-attribute">cursor</span>: pointer;

    }
    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.register</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">text-decoration</span>: underline;
    }
    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">margin-left</span>: auto;
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#5D9BFA</span>;
    }
    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">i</span>{
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
    }
    <span class="hljs-selector-class">.form</span> <span class="hljs-selector-class">.footer</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EBF3FF</span>;
    }</code></pre>
<h2 id="articleHeader18">完结</h2>
<p>到这里就完成了,没有制作短信登录的界面!</p>
<h2 id="articleHeader19">声明:</h2>
<p>本项目只用于学习使用,请不要用于商业用途,项目中使用的百度网盘的Logo只作为学习使用!</p>
<h2 id="articleHeader20">下载代码</h2>
<p>github: <a href="https://github.com/lihaotian0607/baidupanLogin" rel="nofollow noreferrer" target="_blank">https://github.com/lihaotian0...</a><br>码云地址:  <a href="https://gitee.com/leehaotian/baidupanLogin" rel="nofollow noreferrer" target="_blank">https://gitee.com/leehaotian/...</a><br>qq群: 814270669</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron仿制百度网盘客户端2(登录界面制作)

## 原文链接
[https://segmentfault.com/a/1190000016781540](https://segmentfault.com/a/1190000016781540)

