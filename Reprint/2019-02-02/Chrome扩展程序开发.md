---
title: 'Chrome扩展程序开发' 
date: 2019-02-02 2:30:10
hidden: true
slug: ihzd39s8ez
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>十一在家无聊时开发了这个项目。其出发点是想通过chrome插件，来保存网页上选中的文本。后来就顺手把前后端都做了(Koa2 + React)：</p>
<p><a href="https://github.com/ecmadao/cliper-chrome" rel="nofollow noreferrer" target="_blank">chrome插件源码</a></p>
<p><a href="https://github.com/ecmadao/cliper-backend" rel="nofollow noreferrer" target="_blank">插件对应的前后端源码</a></p>
</blockquote>
<h3 id="articleHeader0">概述</h3>
<h4>chrome扩展程序</h4>
<p>chrome扩展程序大家应该都很熟悉了，它可以通过脚本帮我们完成一些快速的操作。通过插件可以捕捉到网页内容、标签页、本地存储，或者用户的操作行为；它也可以在一定程度上改变浏览器的UI，例如页面上右键的菜单、浏览器右上角点击插件logo后的弹窗，或者浏览器新标签页</p>
<h4>开发缘由</h4>
<p>按照惯例，开发前多问问自己 why? how?</p>
<p>why：</p>
<ul><li><p>我在平常看博文时，对于一些段落想进行摘抄或者备注，又懒得复制粘贴</p></li></ul>
<p>how：</p>
<ul>
<li><p>一个chrome扩展程序，可以通过鼠标右键的菜单，或者键盘快捷键快速保存当前页面上选择的文本</p></li>
<li><p>如果没有选择文本，则保存网页链接</p></li>
<li><p>要有对应的后台服务，保存 user、cliper、page (后话，本文不涉及)</p></li>
<li><p>还要有对应的前端，以便浏览我的保存记录 (后话，本文不涉及)</p></li>
</ul>
<p>先上个成果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVEixj?w=424&amp;h=664" src="https://static.alili.tech/img/bVEixj?w=424&amp;h=664" alt="chrome extension - login" title="chrome extension - login" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVEixj?w=424&amp;h=664" src="https://static.alili.tech/img/bVEixj?w=424&amp;h=664" alt="chrome extension - info" title="chrome extension - info" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVEixp?w=1960&amp;h=1420" src="https://static.alili.tech/img/bVEixp?w=1960&amp;h=1420" alt="chrome extension - frontend" title="chrome extension - frontend" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>clip 有剪辑之意，因此项目命名为 cliper</p></blockquote>
<p>这两天终于安奈不住买了服务器，终于把网址部署了，也上线了chrome插件：</p>
<ul>
<li><p><a href="http://cliper.com.cn" rel="nofollow noreferrer" target="_blank">cliper</a></p></li>
<li><p><a href="https://chrome.google.com/webstore/detail/biijehenaabpogldekblkfgooifmagbi" rel="nofollow noreferrer" target="_blank">cliper extension</a></p></li>
</ul>
<h3 id="articleHeader1"><a href="https://crxdoc-zh.appspot.com/extensions/manifest" rel="nofollow noreferrer" target="_blank"><code>manifest.json</code></a></h3>
<p>在项目根目录下创建<code>manifest.json</code>文件，其中会涵盖扩展程序的基本信息，并指明需要的权限和资源文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 以下为必写
  &quot;manifest_version&quot;: 2, // 必须为2，1号版本已弃用
  &quot;name&quot;: &quot;cliper&quot;, // 扩展程序名称
  &quot;version&quot;: &quot;0.01&quot;, // 版本号
  
  // 以下为选填
  
  // 推荐
  &quot;description&quot;: &quot;描述&quot;,
  &quot;icons&quot;: {
    &quot;16&quot;: &quot;icons/icon_16.png&quot;,
    &quot;48&quot;: &quot;icons/icon_48.png&quot;,
    &quot;64&quot;: &quot;icons/icon_64.png&quot;,
    &quot;128&quot;: &quot;icons/icon_128.png&quot;
  },
  &quot;author&quot;: &quot;ecmadao&quot;,
  
  // 根据自己使用的权限填写
  &quot;permissions&quot;: [
    // 例如
    &quot;tab&quot;,
    &quot;storage&quot;,
    // 如果会在js中请求外域API或者资源，则要把外域链接加入
    &quot;http://localhost:5000/*&quot;
  ],
  
  // options_page，指右键点击右上角里的插件logo时，弹出列表中的“选项”是否可点，以及在可以点击时，左键点击后打开的页面
  &quot;options_page&quot;: &quot;view/options.html&quot;,
  
  // browser_action，左键点击右上角插件logo时，弹出的popup框。不填此项则点击logo不会有用
  &quot;browser_action&quot;: {
    &quot;default_icon&quot;: {
      &quot;38&quot;: &quot;icons/icon_38.png&quot;
    },
    &quot;default_popup&quot;: &quot;view/popup.html&quot;, // popup页面，其实就是普通的html
    &quot;default_title&quot; : &quot;保存到cliper&quot;
  },
  
  // background，后台执行的文件，一般只需要指定js即可。会在浏览器打开后全局范围内后台运行
  &quot;background&quot;: {
    &quot;scripts&quot;: [&quot;js/vendor/jquery-3.1.1.min.js&quot;, &quot;js/background.js&quot;],
    // persistent代表“是否持久”。如果是一个单纯的全局后台js，需要一直运行，则不需配置persistent（或者为true）。当配置为false时转变为事件js，依旧存在于后台，在需要时加载，空闲时卸载
    &quot;persistent&quot;: false
  },
  
  // content_scripts，在各个浏览器页面里运行的文件，可以获取到当前页面的上下文DOM
  &quot;content_scripts&quot;: [
    {
      // matches 匹配 content_scripts 可以在哪些页面运行
      &quot;matches&quot; : [&quot;http://*/*&quot;, &quot;https://*/*&quot;],
      &quot;js&quot;: [&quot;js/vendor/jquery-3.1.1.min.js&quot;, &quot;js/vendor/keyboard.min.js&quot;, &quot;js/selection.js&quot;, &quot;js/notification.js&quot;],
      &quot;css&quot;: [&quot;css/notification.css&quot;]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-comment">// 以下为必写</span>
  <span class="hljs-string">"manifest_version"</span>: <span class="hljs-number">2</span>, <span class="hljs-comment">// 必须为2，1号版本已弃用</span>
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"cliper"</span>, <span class="hljs-comment">// 扩展程序名称</span>
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.01"</span>, <span class="hljs-comment">// 版本号</span>
  
  <span class="hljs-comment">// 以下为选填</span>
  
  <span class="hljs-comment">// 推荐</span>
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"描述"</span>,
  <span class="hljs-string">"icons"</span>: {
    <span class="hljs-string">"16"</span>: <span class="hljs-string">"icons/icon_16.png"</span>,
    <span class="hljs-string">"48"</span>: <span class="hljs-string">"icons/icon_48.png"</span>,
    <span class="hljs-string">"64"</span>: <span class="hljs-string">"icons/icon_64.png"</span>,
    <span class="hljs-string">"128"</span>: <span class="hljs-string">"icons/icon_128.png"</span>
  },
  <span class="hljs-string">"author"</span>: <span class="hljs-string">"ecmadao"</span>,
  
  <span class="hljs-comment">// 根据自己使用的权限填写</span>
  <span class="hljs-string">"permissions"</span>: [
    <span class="hljs-comment">// 例如</span>
    <span class="hljs-string">"tab"</span>,
    <span class="hljs-string">"storage"</span>,
    <span class="hljs-comment">// 如果会在js中请求外域API或者资源，则要把外域链接加入</span>
    <span class="hljs-string">"http://localhost:5000/*"</span>
  ],
  
  <span class="hljs-comment">// options_page，指右键点击右上角里的插件logo时，弹出列表中的“选项”是否可点，以及在可以点击时，左键点击后打开的页面</span>
  <span class="hljs-string">"options_page"</span>: <span class="hljs-string">"view/options.html"</span>,
  
  <span class="hljs-comment">// browser_action，左键点击右上角插件logo时，弹出的popup框。不填此项则点击logo不会有用</span>
  <span class="hljs-string">"browser_action"</span>: {
    <span class="hljs-string">"default_icon"</span>: {
      <span class="hljs-string">"38"</span>: <span class="hljs-string">"icons/icon_38.png"</span>
    },
    <span class="hljs-string">"default_popup"</span>: <span class="hljs-string">"view/popup.html"</span>, <span class="hljs-comment">// popup页面，其实就是普通的html</span>
    <span class="hljs-string">"default_title"</span> : <span class="hljs-string">"保存到cliper"</span>
  },
  
  <span class="hljs-comment">// background，后台执行的文件，一般只需要指定js即可。会在浏览器打开后全局范围内后台运行</span>
  <span class="hljs-string">"background"</span>: {
    <span class="hljs-string">"scripts"</span>: [<span class="hljs-string">"js/vendor/jquery-3.1.1.min.js"</span>, <span class="hljs-string">"js/background.js"</span>],
    <span class="hljs-comment">// persistent代表“是否持久”。如果是一个单纯的全局后台js，需要一直运行，则不需配置persistent（或者为true）。当配置为false时转变为事件js，依旧存在于后台，在需要时加载，空闲时卸载</span>
    <span class="hljs-string">"persistent"</span>: <span class="hljs-literal">false</span>
  },
  
  <span class="hljs-comment">// content_scripts，在各个浏览器页面里运行的文件，可以获取到当前页面的上下文DOM</span>
  <span class="hljs-string">"content_scripts"</span>: [
    {
      <span class="hljs-comment">// matches 匹配 content_scripts 可以在哪些页面运行</span>
      <span class="hljs-string">"matches"</span> : [<span class="hljs-string">"http://*/*"</span>, <span class="hljs-string">"https://*/*"</span>],
      <span class="hljs-string">"js"</span>: [<span class="hljs-string">"js/vendor/jquery-3.1.1.min.js"</span>, <span class="hljs-string">"js/vendor/keyboard.min.js"</span>, <span class="hljs-string">"js/selection.js"</span>, <span class="hljs-string">"js/notification.js"</span>],
      <span class="hljs-string">"css"</span>: [<span class="hljs-string">"css/notification.css"</span>]
    }
  ]
}</code></pre>
<p>综上，我们一共有三种资源文件，针对着三个运行环境：</p>
<ul>
<li>
<p><code>browser_action</code></p>
<ul>
<li><p>控制logo点击后出现的弹窗，涵盖相关的html/js/css</p></li>
<li><p>在弹窗中，会进行登录/注册的操作，并将用户信息保存在本地储存中。已登录用户则展现基本信息</p></li>
</ul>
</li>
<li>
<p><code>background</code></p>
<ul>
<li><p>在后台持续运行，或者被事件唤醒后运行</p></li>
<li><p>右键菜单的点击和异步保存事件将在这里触发</p></li>
</ul>
</li>
<li>
<p><code>content_scripts</code></p>
<ul>
<li><p>当前浏览的页面里运行的文件，可以操作DOM</p></li>
<li><p>因此，我会在这个文件里监听用户的选择事件</p></li>
</ul>
</li>
</ul>
<p>注：</p>
<ul>
<li><p><code>content_scripts</code>中如果没有<code>matches</code>，则扩展程序无法正常加载，也不能通过“加载未封装的扩展程序”来添加。如果你的<code>content_scripts</code>中有js可以针对所有页面运行，则填写<code>"matches" : ["http://*/*", "https://*/*"]</code>即可</p></li>
<li><p>推荐将<code>background</code>中的<code>persistent</code>设置为<code>false</code>，根据事件来运行后台js</p></li>
</ul>
<h3 id="articleHeader2">不同运行环境JS的绳命周期</h3>
<p>如上所述，三种JS有着三种运行环境，它们的生命周期、可操作DOM/接口也不同</p>
<h4><a href="https://crxdoc-zh.appspot.com/extensions/content_scripts" rel="nofollow noreferrer" target="_blank"><code>content_scripts</code></a></h4>
<blockquote><p><code>content_scripts</code>会在每个标签页初始化加载的时候进行调用，关闭页面时卸载</p></blockquote>
<p>内容脚本，在每个标签页下运行。虽然它可以访问到页面DOM，但无法访问到这个里面里，其他JS文件创建的全局变量或者函数。也就是说，各个<code>content_scripts</code>(以及外部JS文件)之间是相互独立的，只有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;content_scripts&quot;: [
  {
    &quot;js&quot;: [...]
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"content_scripts"</span>: [
  {
    <span class="hljs-string">"js"</span>: [...]
  }
]</code></pre>
<p><code>js</code>所定义的一个Array里的各个JS可以相互影响。</p>
<h4><a href="https://crxdoc-zh.appspot.com/extensions/event_pages" rel="nofollow noreferrer" target="_blank"><code>background</code></a></h4>
<blockquote><p>官方建议将后台js配置为<code>"persistent": false</code>，以便在需要时加载，再次进入空闲状态后卸载</p></blockquote>
<p>什么时候会让<code>background</code>的资源文件加载呢？</p>
<ul>
<li><p>应用程序第一次安装或者更新</p></li>
<li><p>监听某个事件触发(例如<code>chrome.runtime.onInstalled.addListener</code>)</p></li>
<li><p>监听其他环境的JS文件发送消息(例如<code>chrome.runtime.onMessage.addListener</code>)</p></li>
<li><p>扩展程序的其他资源文件调用了<code>runtime.getBackgroundPage</code></p></li>
</ul>
<h4><a href="https://crxdoc-zh.appspot.com/extensions/browserAction" rel="nofollow noreferrer" target="_blank"><code>browser_action</code></a></h4>
<blockquote><p><code>browser_action</code>里的资源会在弹窗打开时初始化，关闭时卸载</p></blockquote>
<p><code>browser_action</code>里定义的JS/CSS运行环境仅限于popup，并且会在每次点开弹窗的时候初始化。但是它可以调用一些<code>chrome api</code>，以此来和其他js进行交互</p>
<p>除此以外：</p>
<ul>
<li><p><code>browser_action</code>的HTML文件里使用的JS，不能直接以<code>&lt;script&gt;&lt;/script&gt;</code>的形式行内写入HTML里，需要独立成JS文件再引入</p></li>
<li><p>如果有其他第三方依赖，比如<code>jQuery</code>等文件，也无法通过CDN引入，而需要保持资源文件到项目目录后再引入</p></li>
</ul>
<h3 id="articleHeader3">不同运行环境JS之间的交互</h3>
<p>虽然运行环境和绳命周期都不相同，但幸运的是，chrome为我们提供了一些三种JS都通用的API，可以起到JS之间相互通讯的效果。</p>
<h4><a href="https://crxdoc-zh.appspot.com/extensions/runtime" rel="nofollow noreferrer" target="_blank">chrome.runtime</a></h4>
<blockquote><p><a href="https://crxdoc-zh.appspot.com/apps/messaging" rel="nofollow noreferrer" target="_blank">消息传递</a></p></blockquote>
<h5>普通的消息传递</h5>
<p>通过<code>runtime</code>的<code>onMessage</code>、<code>sendMessage</code>等方法，可以在各个JS之间传递并监听消息。举个栗子：</p>
<p>在<code>popup.js</code>中，我们让它初始化之后发送一个消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.runtime.sendMessage({
  method: 'showAlert'
}, function(response) {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">chrome.runtime.sendMessage({
  <span class="hljs-attr">method</span>: <span class="hljs-string">'showAlert'</span>
}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{});</code></pre>
<p>然后在<code>background.js</code>中，监听消息的接收，并进行处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method === 'showAlert') {
    alert('showAlert');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">chrome.runtime.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, sender, sendResponse</span>) </span>{
  <span class="hljs-keyword">if</span> (message.method === <span class="hljs-string">'showAlert'</span>) {
    alert(<span class="hljs-string">'showAlert'</span>);
  }
});</code></pre>
<p>以上代码，会在每次打开插件弹窗的时候弹出一个Alert。</p>
<p><code>chrome.runtime</code>的常用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取当前扩展程序中正在运行的后台网页的 JavaScript window 对象
chrome.runtime.getBackgroundPage(function (backgroundPage) {
  // backgroundPage 即 window 对象
});
// 发送消息
chrome.runtime.sendMessage(message, function(response) {
  // response 代表消息回复，可以接受到通过 sendResponse 方法发送的消息回复
});
// 监听消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // message 就是你发送的 message
  // sender 代表发送者，可以通过 sender.tab 判断消息是否是从内容脚本发出
  // sendResponse 可以直接发送回复，如：
  sendResponse({
    method: 'response',
    message: 'send a response'
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取当前扩展程序中正在运行的后台网页的 JavaScript window 对象</span>
chrome.runtime.getBackgroundPage(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">backgroundPage</span>) </span>{
  <span class="hljs-comment">// backgroundPage 即 window 对象</span>
});
<span class="hljs-comment">// 发送消息</span>
chrome.runtime.sendMessage(message, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-comment">// response 代表消息回复，可以接受到通过 sendResponse 方法发送的消息回复</span>
});
<span class="hljs-comment">// 监听消息</span>
chrome.runtime.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, sender, sendResponse</span>) </span>{
  <span class="hljs-comment">// message 就是你发送的 message</span>
  <span class="hljs-comment">// sender 代表发送者，可以通过 sender.tab 判断消息是否是从内容脚本发出</span>
  <span class="hljs-comment">// sendResponse 可以直接发送回复，如：</span>
  sendResponse({
    <span class="hljs-attr">method</span>: <span class="hljs-string">'response'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'send a response'</span>
  });
});</code></pre>
<p>需要注意的是，即便你在多个JS中注册了消息监听<code>onMessage.addListener</code>，也只有一个监听者能收到通过<code>runtime.sendMessage</code>发送出去的消息。如果需要不同的监听者分别监听消息，则需要使用<code>chrome.tab</code> API来指定消息接收对象</p>
<p>举个栗子：</p>
<p>上文说过，需要在<code>content_scripts</code>中监听选择事件，获取选择的文本，而对于右键菜单的点击则是在<code>background</code>中监听的。那么需要把选择的文本作为消息，发送给<code>background</code>，在<code>background</code>完成异步保存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// content_scripts 中获取选择，并发送消息
// js/selection.js

// 获取选择的文本
function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.getSelection) {
    return document.getSelection();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
}
// 组建信息
function getSelectionMessage() {
  var text = getSelectedText();
  var title = document.title;
  var url = window.location.href;
  var data = {
    text: text,
    title: title,
    url: url
  };
  var message = {
    method: 'get_selection',
    data: data
  }
  return message;
}
// 发送消息
function sendSelectionMessage(message) {
  chrome.runtime.sendMessage(message, function(response) {});
}
// 监听鼠标松开的事件，只有在右键点击时，才会去获取文本
window.onmouseup = function(e) {
  if (!e.button === 2) {
    return;
  }
  var message = getSelectionMessage();
  sendSelectionMessage(message);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// content_scripts 中获取选择，并发送消息</span>
<span class="hljs-comment">// js/selection.js</span>

<span class="hljs-comment">// 获取选择的文本</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSelectedText</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.getSelection) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getSelection().toString();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.getSelection) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.getSelection();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.selection) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.selection.createRange().text;
  }
}
<span class="hljs-comment">// 组建信息</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSelectionMessage</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> text = getSelectedText();
  <span class="hljs-keyword">var</span> title = <span class="hljs-built_in">document</span>.title;
  <span class="hljs-keyword">var</span> url = <span class="hljs-built_in">window</span>.location.href;
  <span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">text</span>: text,
    <span class="hljs-attr">title</span>: title,
    <span class="hljs-attr">url</span>: url
  };
  <span class="hljs-keyword">var</span> message = {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'get_selection'</span>,
    <span class="hljs-attr">data</span>: data
  }
  <span class="hljs-keyword">return</span> message;
}
<span class="hljs-comment">// 发送消息</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sendSelectionMessage</span>(<span class="hljs-params">message</span>) </span>{
  chrome.runtime.sendMessage(message, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{});
}
<span class="hljs-comment">// 监听鼠标松开的事件，只有在右键点击时，才会去获取文本</span>
<span class="hljs-built_in">window</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (!e.button === <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">var</span> message = getSelectionMessage();
  sendSelectionMessage(message);
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// background 中接收消息，监听右键菜单的点击，并异步保存数据
// js/background.js

// 创建一个全局对象，来保存接收到的消息值
var selectionObj = null;

// 首先要创建菜单
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    type: 'normal',
    title: 'save selection',
    id: 'save_selection',
    // 有选择才会出现
    contexts: ['selection']
  });
});
// 监听菜单的点击
chrome.contextMenus.onClicked.addListener(function(menuItem) {
  if (menuItem.menuItemId === &quot;save_selection&quot;) {
    addCliper();
  }
});

// 消息监听，接收从 content_scripts 传递来的消息，并保存在一个全局对象中
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method === 'get_selection') {
    selectionObj = message.data;
  }
});

// 异步保存
function addCliper() {
  $.ajax({
    // ...
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// background 中接收消息，监听右键菜单的点击，并异步保存数据</span>
<span class="hljs-comment">// js/background.js</span>

<span class="hljs-comment">// 创建一个全局对象，来保存接收到的消息值</span>
<span class="hljs-keyword">var</span> selectionObj = <span class="hljs-literal">null</span>;

<span class="hljs-comment">// 首先要创建菜单</span>
chrome.runtime.onInstalled.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  chrome.contextMenus.create({
    <span class="hljs-attr">type</span>: <span class="hljs-string">'normal'</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">'save selection'</span>,
    <span class="hljs-attr">id</span>: <span class="hljs-string">'save_selection'</span>,
    <span class="hljs-comment">// 有选择才会出现</span>
    contexts: [<span class="hljs-string">'selection'</span>]
  });
});
<span class="hljs-comment">// 监听菜单的点击</span>
chrome.contextMenus.onClicked.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">menuItem</span>) </span>{
  <span class="hljs-keyword">if</span> (menuItem.menuItemId === <span class="hljs-string">"save_selection"</span>) {
    addCliper();
  }
});

<span class="hljs-comment">// 消息监听，接收从 content_scripts 传递来的消息，并保存在一个全局对象中</span>
chrome.runtime.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, sender, sendResponse</span>) </span>{
  <span class="hljs-keyword">if</span> (message.method === <span class="hljs-string">'get_selection'</span>) {
    selectionObj = message.data;
  }
});

<span class="hljs-comment">// 异步保存</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addCliper</span>(<span class="hljs-params"></span>) </span>{
  $.ajax({
    <span class="hljs-comment">// ...</span>
  });
}</code></pre>
<h5>长链接</h5>
<p>通过<code>chrome.runtime.connect</code>（或者<code>chrome.tabs.connect</code>）可以建立起不同类型JS之间的长链接。</p>
<p>信息的发送者需要制定独特的信息类型，发送并监听信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var port = chrome.runtime.connect({type: &quot;connection&quot;});
port.postMessage({
  method: &quot;add&quot;,
  datas: [1, 2, 3]
});
port.onMessage.addListener(function(msg) {
  if (msg.method === &quot;answer&quot;) {
      console.log(msg.data);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> port = chrome.runtime.connect({<span class="hljs-attr">type</span>: <span class="hljs-string">"connection"</span>});
port.postMessage({
  <span class="hljs-attr">method</span>: <span class="hljs-string">"add"</span>,
  <span class="hljs-attr">datas</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
});
port.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
  <span class="hljs-keyword">if</span> (msg.method === <span class="hljs-string">"answer"</span>) {
      <span class="hljs-built_in">console</span>.log(msg.data);
  }
});</code></pre>
<p>而接受者则要注册监听，并判断消息的类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.type == &quot;connection&quot;);
  port.onMessage.addListener(function(msg) {
    if (msg.method == &quot;add&quot;) {
      var result = msg.datas.reduce(function(previousValue, currentValue, index, array){
      return previousValue + currentValue;
  });
      port.postMessage({
        method: &quot;answer&quot;,
        data: result
      });
    }
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">chrome.runtime.onConnect.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port</span>) </span>{
  <span class="hljs-built_in">console</span>.assert(port.type == <span class="hljs-string">"connection"</span>);
  port.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-keyword">if</span> (msg.method == <span class="hljs-string">"add"</span>) {
      <span class="hljs-keyword">var</span> result = msg.datas.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">previousValue, currentValue, index, array</span>)</span>{
      <span class="hljs-keyword">return</span> previousValue + currentValue;
  });
      port.postMessage({
        <span class="hljs-attr">method</span>: <span class="hljs-string">"answer"</span>,
        <span class="hljs-attr">data</span>: result
      });
    }
  });
});</code></pre>
<h4><a href="https://crxdoc-zh.appspot.com/extensions/tabs" rel="nofollow noreferrer" target="_blank">chrome.tabs</a></h4>
<p>要使用这个API则需要先在<code>manifest.json</code>中注册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;permissions&quot;: [
  &quot;tabs&quot;,
  // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"permissions"</span>: [
  <span class="hljs-string">"tabs"</span>,
  <span class="hljs-comment">// ...</span>
]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取到当前的Tab
chrome.tabs.getCurrent(function(tab) {
  // 通过 tab.id 可以拿到标签页的ID
});

// 通过 queryInfo，以Array的形式筛选出符合条件的tabs
chrome.tabs.query(queryInfo, function(tabs) {})

// 精准的给某个页面的`content_scripts`发送消息
chrome.tabs.sendMessage(tabId, message, function(response) {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取到当前的Tab</span>
chrome.tabs.getCurrent(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>) </span>{
  <span class="hljs-comment">// 通过 tab.id 可以拿到标签页的ID</span>
});

<span class="hljs-comment">// 通过 queryInfo，以Array的形式筛选出符合条件的tabs</span>
chrome.tabs.query(queryInfo, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{})

<span class="hljs-comment">// 精准的给某个页面的`content_scripts`发送消息</span>
chrome.tabs.sendMessage(tabId, message, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{});</code></pre>
<p>举个栗子：</p>
<p>在<code>background.js</code>中，我们获取到当前Tab，并发送消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.tabs.getCurrent(function(tab) {
  chrome.tabs.sendMessage(tab.id, {
    method: 'tab',
    message: 'get active tab'
  }, function(response) {});
});
// 或者
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {
    method: 'tab',
    message: 'get active tab'
  }, function(response) {
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">chrome.tabs.getCurrent(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>) </span>{
  chrome.tabs.sendMessage(tab.id, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'tab'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'get active tab'</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{});
});
<span class="hljs-comment">// 或者</span>
chrome.tabs.query({<span class="hljs-attr">active</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">currentWindow</span>: <span class="hljs-literal">true</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{
  chrome.tabs.sendMessage(tabs[<span class="hljs-number">0</span>].id, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">'tab'</span>,
    <span class="hljs-attr">message</span>: <span class="hljs-string">'get active tab'</span>
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  });
});</code></pre>
<p>然后在<code>content_scripts</code>中，进行消息监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method === 'tab') {
    console.log(message.message);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">chrome.runtime.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, sender, sendResponse</span>) </span>{
  <span class="hljs-keyword">if</span> (message.method === <span class="hljs-string">'tab'</span>) {
    <span class="hljs-built_in">console</span>.log(message.message);
  }
});</code></pre>
<h4><a href="https://crxdoc-zh.appspot.com/apps/storage" rel="nofollow noreferrer" target="_blank">chrome.storage</a></h4>
<p><code>chrome.storage</code>是一个基于<code>localStorage</code>的本地储存，但chrome对其进行了IO的优化，可以储存对象形式的数据，也不会因为浏览器完全关闭而清空。</p>
<p>同样，使用这个API需要先在<code>manifest.json</code>中注册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;permissions&quot;: [
  &quot;storage&quot;,
  // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"permissions"</span>: [
  <span class="hljs-string">"storage"</span>,
  <span class="hljs-comment">// ...</span>
]</code></pre>
<p><code>chrome.storage</code>有两种形式，<code>chrome.storage.sync</code>和<code>chrome.storage.local</code>：</p>
<p><code>chrome.storage.local</code>是基于本地的储存，而<code>chrome.storage.sync</code>会先判断当前用户是否登录了google账户，如果登录，则会将储存的数据通过google服务自动同步，否则，会使用<code>chrome.storage.local</code>仅进行本地储存</p>
<blockquote><p>注：因为储存区没有加密，所以不应该储存用户的敏感信息</p></blockquote>
<p>API:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数据储存
StorageArea.set(object items, function callback)

// 数据获取
StorageArea.get(string or array of string or object keys, function callback)

// 数据移除
StorageArea.remove(string or array of string keys, function callback)

// 清空全部储存
StorageArea.clear(function callback)

// 监听储存的变化
chrome.storage.onChanged.addListener(function(changes, namespace) {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 数据储存</span>
StorageArea.set(object items, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>)

// 数据获取
<span class="hljs-title">StorageArea</span>.<span class="hljs-title">get</span>(<span class="hljs-params">string or array of string or object keys, function callback</span>)

// 数据移除
<span class="hljs-title">StorageArea</span>.<span class="hljs-title">remove</span>(<span class="hljs-params">string or array of string keys, function callback</span>)

// 清空全部储存
<span class="hljs-title">StorageArea</span>.<span class="hljs-title">clear</span>(<span class="hljs-params">function callback</span>)

// 监听储存的变化
<span class="hljs-title">chrome</span>.<span class="hljs-title">storage</span>.<span class="hljs-title">onChanged</span>.<span class="hljs-title">addListener</span>(<span class="hljs-params">function(changes, namespace</span>) </span>{});</code></pre>
<p>举栗子：</p>
<p>我们在<code>browser_action</code>完成了用户的登录/注册操作，将部分用户信息储存在<code>storage</code>中。每次初始化时，都会检查是否有储存，没有的话则需要用户登录，成功后再添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// browser_action
// js.popup.js

chrome.storage.sync.get('user', function(result) {
  // 通过 result.user 获取到储存的 user 对象
  result &amp;&amp; setPopDOM(result.user);
});

function setPopDOM(user) {
  if (user &amp;&amp; user.userId) {
    // show user UI
  } else {
    // show login UI
  }
};

document.getElementById('login').onclick = function() {
  // login user..
  // 通过 ajax 请求异步登录，获取到成功的回调后，将返回的 user 对象储存在 storage 中
  chrome.storage.sync.set({user: user}, function(result) {});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// browser_action</span>
<span class="hljs-comment">// js.popup.js</span>

chrome.storage.sync.get(<span class="hljs-string">'user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
  <span class="hljs-comment">// 通过 result.user 获取到储存的 user 对象</span>
  result &amp;&amp; setPopDOM(result.user);
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setPopDOM</span>(<span class="hljs-params">user</span>) </span>{
  <span class="hljs-keyword">if</span> (user &amp;&amp; user.userId) {
    <span class="hljs-comment">// show user UI</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// show login UI</span>
  }
};

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'login'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// login user..</span>
  <span class="hljs-comment">// 通过 ajax 请求异步登录，获取到成功的回调后，将返回的 user 对象储存在 storage 中</span>
  chrome.storage.sync.set({<span class="hljs-attr">user</span>: user}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{});
}</code></pre>
<p>而在其他环境的JS里，我们可以监听<code>storage</code>的变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// background
// js/background.js

// 一个全局的 user 对象，用来保存用户信息，以便在异步时发生 userId
var user = null;

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    if (key === 'user') {
      console.log('user storage changed!');
      user = changes[key];
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// background</span>
<span class="hljs-comment">// js/background.js</span>

<span class="hljs-comment">// 一个全局的 user 对象，用来保存用户信息，以便在异步时发生 userId</span>
<span class="hljs-keyword">var</span> user = <span class="hljs-literal">null</span>;

chrome.storage.onChanged.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">changes, namespace</span>) </span>{
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> changes) {
    <span class="hljs-keyword">if</span> (key === <span class="hljs-string">'user'</span>) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'user storage changed!'</span>);
      user = changes[key];
    }
  }
});</code></pre>
<blockquote><p>大体上，我们目前为止理清了三种环境下JS的不同，以及他们交流和储存的方式。除此以外，还有popup弹窗、右键菜单的创建和使用。其实使用这些知识就足够做出一个简单的chrome扩展了。</p></blockquote>
<h3 id="articleHeader4">正式发布</h3>
<p>其实我觉得整个过程中最蛋疼的一步就是把插件正式发布到chrome商店了。</p>
<ul>
<li><p>首先，你要在<a href="https://chrome.google.com/webstore/developer/dashboard/" rel="nofollow noreferrer" target="_blank">开发者信息中心</a>进行登记，缴费5刀。这一步可以参照<a href="https://segmentfault.com/a/1190000006035525">如何成为一名Chrome应用开发者</a>一文来通过验证和支付。但需要注意的是，我在尝试时使用的账户为中国google账户，因此完全无法支付，直到重新注册了一个香港账户才搞定</p></li>
<li><p>之后，要填写一系列的发布信息。google对icon和banner的尺寸要求的相当严格。。这一步可以参考<a href="http://www.cnblogs.com/xishuai/p/google-chrome-webstore-developer-upload-program.html" rel="nofollow noreferrer" target="_blank">Google Chrome 应用商店上传扩展程序</a>一文</p></li>
</ul>
<p>最后终于搞定，线上可见：<a href="https://chrome.google.com/webstore/detail/biijehenaabpogldekblkfgooifmagbi" rel="nofollow noreferrer" target="_blank">cliper extension</a></p>
<h3 id="articleHeader5">学习资源</h3>
<ul>
<li><p><a href="https://crxdoc-zh.appspot.com/extensions/getstarted" rel="nofollow noreferrer" target="_blank">建立 Chrome 扩展程序</a></p></li>
<li><p><a href="http://www.cnblogs.com/guogangj/p/3235703.html" rel="nofollow noreferrer" target="_blank">Chrome插件（Extensions）开发攻略</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006035525">如何成为一名Chrome应用开发者</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005071240" target="_blank">chrome扩展的开发</a></p></li>
</ul>
<h3 id="articleHeader6">下一步？</h3>
<ul>
<li><p>插件功能丰富化</p></li>
<li><p>插件可在网页上高亮展示标记的文本</p></li>
<li><p>用<code>es6</code> + <code>babel</code>重构</p></li>
<li><p>需要使用框架吗？</p></li>
</ul>
<hr>
<p>注：本文源码位于<a href="https://github.com/ecmadao/cliper-chrome" rel="nofollow noreferrer" target="_blank">github仓库：cliper-chrome</a>，线上产品见：<a href="http://cliper.com.cn" rel="nofollow noreferrer" target="_blank">cliper</a> 和 <a href="https://chrome.google.com/webstore/detail/biijehenaabpogldekblkfgooifmagbi" rel="nofollow noreferrer" target="_blank">cliper extension</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome扩展程序开发

## 原文链接
[https://segmentfault.com/a/1190000007182038](https://segmentfault.com/a/1190000007182038)

