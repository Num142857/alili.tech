---
title: '【Chrome扩展开发】定制HTTP请求响应头域' 
date: 2018-12-26 2:30:13
hidden: true
slug: homvplj7c6i
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>本文首发于《程序员》杂志2017年第9、10、11期，下面的版本又经过进一步的修订。</strong></p>
<h3 id="articleHeader0">关于</h3>
<ul>
<li><p>Github：<a href="https://github.com/Louiszhai/IHeader" rel="nofollow noreferrer" target="_blank">IHeader</a></p></li>
<li><p>我的博客：<a href="http://louiszhai.github.io" rel="nofollow noreferrer" target="_blank">louis blog</a></p></li>
<li><p>掘金专栏：<a href="https://juejin.im/user/5735109371cfe4006cdd254d" rel="nofollow noreferrer" target="_blank">路易斯专栏</a></p></li>
<li><p>原文链接：<a href="http://louiszhai.github.io/2017/11/14/iheader/" rel="nofollow noreferrer" target="_blank">【Chrome扩展开发】定制HTTP请求响应头域</a></p></li>
</ul>
<p>本文共15k字，阅读需15分钟。</p>
<h3 id="articleHeader1"><strong>导读</strong></h3>
<p>搜索是程序员的灵魂，为了提升搜索的效率，以便更快的查询信息，我试着同时搜索4个网站，分别是百度、Google、维基、Bing。一个可行的做法就是网页中嵌入4个iframe，通过js拼接前面4个搜索引擎的Search URL并依次在iframe中加载。这个构思丝毫没有问题，简单粗暴。然而就是这么简单的功能，也无法实现。由于Google网站在HTML的response header中添加了<code>X-Frame-Options</code>字段以防止网页被Frame（这项设置常被用来防止Click Cheats），因此我无法将Google Search加入到iframe中来。那么，我会放弃Google吗？</p>
<h3 id="articleHeader2"><strong>Nginx反向代理Google</strong></h3>
<p>显然不会，既然问题出在<code>X-Frame-Options</code>上，我去掉就行了。对于请求或响应头域定制，nginx是个不错的选择，其第三方的<code>ngx_headers_more</code>模块就特别擅长这种处理。由于nginx无法动态加载第三方模块，我动态编译了nginx以便加入<code>ngx_headers_more</code>模块。至此，第一步完成，以下是nginx的部分配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location / {
  more_clear_headers 'X-Frame-Options';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">location</span> <span class="hljs-title">/ {
  more_clear_headers</span> 'X-Frame-Options';
}</code></pre>
<p>为了让<code>www.google.com</code>正常访问，我需要使用另外一个域名比如<code>louis.google.com</code>。通过nginx，让<code>louis.google.com</code>转发到<code>www.google.com</code>，转发的同时去掉响应头域中的<code>X-Frame-Options</code>字段。于是nginx配置看起来像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
  listen 80;
  server_name louis.google.com;
  location / {
    proxy_pass https://www.google.com/;
    more_clear_headers 'X-Frame-Options';
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
  <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
  <span class="hljs-attribute">server_name</span> louis.google.com;
  <span class="hljs-attribute">location</span> / {
    <span class="hljs-attribute">proxy_pass</span> https://www.google.com/;
    <span class="hljs-attribute">more_clear_headers</span> <span class="hljs-string">'X-Frame-Options'</span>;
  }
}</code></pre>
<p>以上的配置有什么问题吗？且不说http直接转https的问题，即使能转发，实际上由于Google的安全策略限制，我们也访问不了Google首页！</p>
<p>最终我使用了一个Nginx Google代理模块<a><code>ngx_http_google_filter_module</code></a>)，nginx配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name louis.google.com;
    resolver 192.168.1.1; # 需要设置为当前路由的网关
    location / {
        google on;
        google_robots_allow on;
        more_clear_headers 'X-Frame-Options';
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> louis.google.com;
    <span class="hljs-attribute">resolver</span> <span class="hljs-number">192.168.1.1</span>; <span class="hljs-comment"># 需要设置为当前路由的网关</span>
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">google</span> <span class="hljs-literal">on</span>;
        <span class="hljs-attribute">google_robots_allow</span> <span class="hljs-literal">on</span>;
        <span class="hljs-attribute">more_clear_headers</span> <span class="hljs-string">'X-Frame-Options'</span>;
    }
}</code></pre>
<p>以上，通过实现一个Google网站的反向代理，代理的同时去掉了响应头域中的<code>X-Frame-Options</code>字段。至此，nginx方案完结。</p>
<p>nginx方案有一个明显的缺陷是，配置中resolver对应的网关IP<code>192.168.1.1</code>是随着路由器的改变而改变的，家里和公司就是两个不同的网关（更别说去星巴克了办公了），因此经常需要手动去修改网关然后重启nginx。</p>
<h3 id="articleHeader3"><strong>IHeader缘起</strong></h3>
<p>nginx方案的这个缺陷多少有些麻烦，恰好Chrome Extension可以定制headers，为了解决这个问题，我便尝试开发Chrome Extension。（使用Chrome以来，我下载试用过无数的Chrome Extension。每每看到一款优秀的Extension，都要激动好久，总有一种相见恨晚的感觉。Extension以其强大的定制能力，神奇的运行机制征服了无数的开发者，我也不例外。然而无论多少次的学习和模仿，最终的目的还是为了使用，故开发一款定制请求的Extension势在必行。）由于Chrome浏览器与网页的天然联系，使用Chrome Extension的方式去掉响应头域字段，比其它方案要更加简单高效。</p>
<p>要知道，Chrome Extension提供的API中有<code>chrome.webRequest.onHeadersReceived</code>。它能够添加对响应头的监听并同步修改响应头域，去掉<code>X-Frame-Options</code>似乎是小case。</p>
<p>于是新建项目，取名<a href="http://github.com/Louiszhai/IHeader" rel="nofollow noreferrer" target="_blank">IHeader</a>。目录结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVYzDC" src="https://static.alili.tech/img/bVYzDC" alt="目录结构" title="目录结构" style="cursor: pointer;"></span></p>
<p>其中，_locales是国际化配置，目前IHeader支持中文和英文两种语言。</p>
<p>res是资源目录，index.html是extension的首页，options.html是选项页面。</p>
<p>manifest.json是extension的声明配置（总入口），在这里配置extension的名称、版本号、图标、快捷键、资源路径以及权限等。</p>
<p>manifest.json贴出来如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;IHeader&quot;, // 扩展名称
  &quot;version&quot;: &quot;1.1.0&quot;, // 扩展版本号
  &quot;icons&quot;: { // 上传到chrome webstore需要32px、64px、128px边长的方形图标
    &quot;128&quot;: &quot;res/images/lightning_green128.png&quot;,
    &quot;32&quot;: &quot;res/images/lightning_green.png&quot;,
    &quot;64&quot;: &quot;res/images/lightning_green64.png&quot;
  },
  &quot;page_action&quot;: { // 扩展的一种类型，说明这是页面级的扩展
    &quot;default_title&quot;: &quot;IHeader&quot;, // 默认名称
    &quot;default_icon&quot;: &quot;res/images/lightning_default.png&quot;, // 默认图标
    &quot;default_popup&quot;: &quot;res/index.html&quot; // 点击时弹出的页面路径
  },
  &quot;background&quot;: { // 扩展在后台运行的脚本
    &quot;persistent&quot;: true, // 由于后台脚本需要持续运行，需要设置为true，反之扩展不活动时可能被浏览器关闭
    &quot;scripts&quot;: [&quot;res/js/message.js&quot;, &quot;res/js/background.js&quot;] // 指定运行的脚本，实际上Chrome会启用一个匿名的html去引用这些js脚本。等同于&quot;pages&quot;:[&quot;background.html&quot;]这种方式（注意这两种互斥，同时设置时，后一种有效）
  },
  &quot;commands&quot;: { // 指定快捷键
    &quot;toggle_status&quot;: { // 快捷命令的名称
      &quot;suggested_key&quot;: { // 快捷命令的热键
        &quot;default&quot;: &quot;Alt+H&quot;,
        &quot;windows&quot;: &quot;Alt+H&quot;,
        &quot;mac&quot;: &quot;Alt+H&quot;,
        &quot;chromeos&quot;: &quot;Alt+H&quot;,
        &quot;linux&quot;: &quot;Alt+H&quot;
      },
      &quot;description&quot;: &quot;Toggle IHeader&quot; // 描述
    }
  },
  &quot;content_scripts&quot;: [ // 随着每个页面加载的内容脚本，通过它可以访问到页面的DOM
    {
      &quot;all_frames&quot;: false, // frame中不加载
      &quot;matches&quot;: [&quot;\u003Call_urls>&quot;], // 匹配所有URL
      &quot;js&quot;: [&quot;res/js/message.js&quot;, &quot;res/js/content.js&quot;] // 内容脚本的路径
    }
  ],
  &quot;default_locale&quot;: &quot;en&quot;, // 默认语言
  &quot;description&quot;: &quot;__MSG_description__&quot;, // 扩展描述
  &quot;manifest_version&quot;: 2, // Chrome 18及更高版本中，应该指定为2，低于v18版本的Chrome浏览器可以指定为1或不指定
  &quot;minimum_chrome_version&quot;: &quot;26.0&quot;, // 最低支持到v26版本，主要受制于chrome.runtime api
  &quot;options_page&quot;: &quot;res/options.html&quot;, // 选项页面的路径
  &quot;permissions&quot;: [ &quot;tabs&quot; , &quot;webRequest&quot;, &quot;webRequestBlocking&quot;, &quot;http://*/*&quot;, &quot;https://*/*&quot;, &quot;contextMenus&quot;, &quot;notifications&quot;] // 扩展需要的权限
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"IHeader"</span>, // 扩展名称
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.1.0"</span>, // 扩展版本号
  <span class="hljs-attr">"icons"</span>: { // 上传到chrome webstore需要32px、64px、128px边长的方形图标
    <span class="hljs-attr">"128"</span>: <span class="hljs-string">"res/images/lightning_green128.png"</span>,
    <span class="hljs-attr">"32"</span>: <span class="hljs-string">"res/images/lightning_green.png"</span>,
    <span class="hljs-attr">"64"</span>: <span class="hljs-string">"res/images/lightning_green64.png"</span>
  },
  <span class="hljs-attr">"page_action"</span>: { // 扩展的一种类型，说明这是页面级的扩展
    <span class="hljs-attr">"default_title"</span>: <span class="hljs-string">"IHeader"</span>, // 默认名称
    <span class="hljs-attr">"default_icon"</span>: <span class="hljs-string">"res/images/lightning_default.png"</span>, // 默认图标
    <span class="hljs-attr">"default_popup"</span>: <span class="hljs-string">"res/index.html"</span> // 点击时弹出的页面路径
  },
  <span class="hljs-attr">"background"</span>: { // 扩展在后台运行的脚本
    <span class="hljs-attr">"persistent"</span>: <span class="hljs-literal">true</span>, // 由于后台脚本需要持续运行，需要设置为true，反之扩展不活动时可能被浏览器关闭
    <span class="hljs-attr">"scripts"</span>: [<span class="hljs-string">"res/js/message.js"</span>, <span class="hljs-string">"res/js/background.js"</span>] // 指定运行的脚本，实际上Chrome会启用一个匿名的html去引用这些js脚本。等同于<span class="hljs-string">"pages"</span>:[<span class="hljs-string">"background.html"</span>]这种方式（注意这两种互斥，同时设置时，后一种有效）
  },
  <span class="hljs-attr">"commands"</span>: { // 指定快捷键
    <span class="hljs-attr">"toggle_status"</span>: { // 快捷命令的名称
      <span class="hljs-attr">"suggested_key"</span>: { // 快捷命令的热键
        <span class="hljs-attr">"default"</span>: <span class="hljs-string">"Alt+H"</span>,
        <span class="hljs-attr">"windows"</span>: <span class="hljs-string">"Alt+H"</span>,
        <span class="hljs-attr">"mac"</span>: <span class="hljs-string">"Alt+H"</span>,
        <span class="hljs-attr">"chromeos"</span>: <span class="hljs-string">"Alt+H"</span>,
        <span class="hljs-attr">"linux"</span>: <span class="hljs-string">"Alt+H"</span>
      },
      <span class="hljs-attr">"description"</span>: <span class="hljs-string">"Toggle IHeader"</span> // 描述
    }
  },
  <span class="hljs-attr">"content_scripts"</span>: [ // 随着每个页面加载的内容脚本，通过它可以访问到页面的DOM
    {
      <span class="hljs-attr">"all_frames"</span>: <span class="hljs-literal">false</span>, // frame中不加载
      <span class="hljs-attr">"matches"</span>: [<span class="hljs-string">"\u003Call_urls&gt;"</span>], // 匹配所有URL
      <span class="hljs-attr">"js"</span>: [<span class="hljs-string">"res/js/message.js"</span>, <span class="hljs-string">"res/js/content.js"</span>] // 内容脚本的路径
    }
  ],
  <span class="hljs-attr">"default_locale"</span>: <span class="hljs-string">"en"</span>, // 默认语言
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"__MSG_description__"</span>, // 扩展描述
  <span class="hljs-attr">"manifest_version"</span>: <span class="hljs-number">2</span>, // Chrome 18及更高版本中，应该指定为2，低于v18版本的Chrome浏览器可以指定为1或不指定
  <span class="hljs-attr">"minimum_chrome_version"</span>: <span class="hljs-string">"26.0"</span>, // 最低支持到v26版本，主要受制于chrome.runtime api
  <span class="hljs-attr">"options_page"</span>: <span class="hljs-string">"res/options.html"</span>, // 选项页面的路径
  <span class="hljs-attr">"permissions"</span>: [ <span class="hljs-string">"tabs"</span> , <span class="hljs-string">"webRequest"</span>, <span class="hljs-string">"webRequestBlocking"</span>, <span class="hljs-string">"http://*/*"</span>, <span class="hljs-string">"https://*/*"</span>, <span class="hljs-string">"contextMenus"</span>, <span class="hljs-string">"notifications"</span>] // 扩展需要的权限
}</code></pre>
<h3 id="articleHeader4"><strong>Chrome Extension简介</strong></h3>
<p>开始开发之前，我们先来刷一波基础知识。</p>
<p>Chrome官方明确规定了插件、扩展和应用的区别：</p>
<ul>
<li><p>插件（Plugin）是通过调用 Webkit 内核 NPAPI 来扩展内核功能的一种组件，工作在内核层面，理论上可以用任何一种生成本地二进制程序的语言开发，比如 C/C++、Java 等。插件重点在于接入浏览器底层，拥有更多的权限，可调用系统API，因此插件一般都不能跨系统。比如说最近Adobe宣布放弃的Flash，下载资源的迅雷以及网上付款的网银，它们都提供了Chrome插件，用以在特定场景启用并运行，从而实现丰富的功能。</p></li>
<li><p>扩展（Extension）是通过调用 Chrome 提供的 Chrome API 来扩展浏览器功能的一种组件，它完全基于Chrome浏览器，借助HTML，CSS，JS等web技术实现功能，是Chrome提供的一种可开发的扩展技术。比如说今年横空出世的微信小程序，它就是微信提供的一种扩展技术。相对于插件而言，扩展程序拥有有限的权限和API，对底层系统不感知，从而具有良好的跨平台特性。注意插件和扩展都只有在Chrome启动后才会运行。</p></li>
<li><p>应用（Application）同样是用于扩充Chrome浏览器功能。它与扩展的区别就在于，它拥有独立运行的用户界面，并且Chrome未启动时也能独立调用，就像一个独立的App一样。</p></li>
</ul>
<p>不注意区分的话，我们讲到Chrome插件，往往指的就是以上三者之一。为了避免引起误解，本篇将严格区分概念，避免使用插件这种含糊的说法。</p>
<h4><strong>如何安装扩展</strong></h4>
<p>开发扩展，首先得从安装开始，从Chrome 21起，Chrome浏览器就增加了对扩展安装的限制，默认只允许从 Chrome Web Store （Chrome 网上应用店）安装扩展和应用，这意味着用户一般只能安装Chrome Web Store内的扩展和应用。</p>
<p>如果你拖动一个crx安装文件到Chrome浏览器的任何一个普通网页，将会出现如下提示。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e26ecca096?w=299&amp;h=40&amp;f=png&amp;s=10013" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e26ecca096?w=299&amp;h=40&amp;f=png&amp;s=10013" alt="扩展功能、应用和主题背景可能会损害您的计算机" title="扩展功能、应用和主题背景可能会损害您的计算机" style="cursor: pointer;"></span></p>
<p>点击<code>继续</code>按钮，则会在浏览器左上角弹出如下警告。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e26f159d74?w=417&amp;h=90&amp;f=png&amp;s=17931" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e26f159d74?w=417&amp;h=90&amp;f=png&amp;s=17931" alt="无法添加来自此网站的应用、扩展程序和用于脚本" title="无法添加来自此网站的应用、扩展程序和用于脚本" style="cursor: pointer;"></span></p>
<p>如果你恰好在Github上发现一个不错的Chrome扩展程序，而Chrome Web Store中没有。是不是就没有办法安装呢？当然不是的，Chrome浏览器还有三种其它的方式可以加载扩展程序。</p>
<ul>
<li><p>如果是扩展程序源码目录，点击<code>chrome://extensions/</code>页面的<code>加载已解压的扩展程序</code>按钮就可以直接安装。</p></li>
<li>
<p>如果是crx安装文件，直接拖动至<code>chrome://extensions/</code>页面即可安装。安装过程如下所示：</p>
<p>1） 拖放安装</p>
</li>
</ul>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e26f130a43?w=438&amp;h=102&amp;f=png&amp;s=7676" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e26f130a43?w=438&amp;h=102&amp;f=png&amp;s=7676" alt="拖放以安装" title="拖放以安装" style="cursor: pointer;"></span></p>
<p>​    2）点击添加扩展程序</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e26f6370aa?w=506&amp;h=174&amp;f=png&amp;s=25028" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e26f6370aa?w=506&amp;h=174&amp;f=png&amp;s=25028" alt="添加扩展" title="添加扩展" style="cursor: pointer;"></span></p>
<p>​    3）添加好的扩展如下所示。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e26ed9575b?w=699&amp;h=173&amp;f=png&amp;s=34741" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e26ed9575b?w=699&amp;h=173&amp;f=png&amp;s=34741" alt="拖放安装后" title="拖放安装后" style="cursor: pointer;"></span></p>
<ul><li><p>启动Chrome时添加参数<code>--enable-easy-off-store-extension-install</code> ，用以开启简单的扩展安装模式，然后就能像之前一样随意拖动crx文件到浏览器页面进行安装。</p></li></ul>
<p>说到安装，自然有人会问，安装了某款扩展后，怎么查看该扩展的源码呢？Mac系统的用户请记住这个目录<code>~/Library/Application Support/Google/Chrome/Default/Extensions/</code>（windows的扩展目录暂无）。</p>
<h4>扩展打包和更新</h4>
<p>另外，中间的<code>打包扩展程序</code>按钮用于将本地开发的扩展程序打包成crx包，首次打包还会生成秘钥文件（如IHeader.pem），如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVYzEg" src="https://static.alili.tech/img/bVYzEg" alt="打包扩展程序" title="打包扩展程序" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e36d4f467e?w=543&amp;h=251&amp;f=png&amp;s=33814" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e36d4f467e?w=543&amp;h=251&amp;f=png&amp;s=33814" alt="已打包好的扩展程序" title="已打包好的扩展程序" style="cursor: pointer;"></span></p>
<p>打包好的扩展程序，可以发送给其他人安装，或发布到Chrome Web Store（开发者注册费用为5$）。</p>
<p>右边的<code>立即更新扩展程序</code>按钮则用于更新扩展。</p>
<h4><strong>扩展的基本组成</strong></h4>
<p>通常一个Chrome扩展包含如下资源或目录：</p>
<ul>
<li><p>manifest.json入口配置文件（1个，位于根目录）</p></li>
<li><p>js文件（至少1个，位于根目录或子级目录）</p></li>
<li><p>32px、64px、128px的方形icon各1个（位于根目录或子级目录）</p></li>
<li><p>_locales目录， 用于提供国际化支持（可选，位于根目录）</p></li>
<li><p>popup.html 弹出页面（可选，位于根目录或子级目录）</p></li>
<li><p>background.html 后台运行的页面，主要用于引入多个后台运行的js（可选，位于根目录或子级目录）</p></li>
<li><p>options.html 选项页面，用于扩展的设置（可选，位于根目录或子级目录）</p></li>
</ul>
<p>为了方便管理，个人倾向于将HTML、JS、CSS，ICON等资源分类统一到同一个目录。</p>
<h4><strong>扩展的分类</strong></h4>
<p>从使用场景上看，Chrome扩展可分为以下三类：</p>
<p>1）Browser Action，浏览器扩展，可通过manifest.json中的<code>browser_action</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;browser_action&quot;: {
  &quot;default_title&quot;: &quot;Qrcode&quot;,
  &quot;default_icon&quot;: &quot;images/icon.png&quot;,
  &quot;default_popup&quot;: &quot;index.html&quot; // 可选的
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"browser_action"</span>: {
  <span class="hljs-attr">"default_title"</span>: <span class="hljs-string">"Qrcode"</span>,
  <span class="hljs-attr">"default_icon"</span>: <span class="hljs-string">"images/icon.png"</span>,
  <span class="hljs-attr">"default_popup"</span>: <span class="hljs-string">"index.html"</span> // 可选的
},</code></pre>
<p>以上是URL生成二维码的Browser Action扩展，运行如下所示：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e36e7b35ff?w=274&amp;h=290&amp;f=gif&amp;s=31839" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e36e7b35ff?w=274&amp;h=290&amp;f=gif&amp;s=31839" alt="Browser Action演示" title="Browser Action演示" style="cursor: pointer;"></span></p>
<p>该类扩展特点：全局扩展，icon长期占据浏览器右上角工具栏，每个页面均可用。</p>
<p>2）Page Action，页面级扩展，可通过manifest.json中的<code>page_action</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;page_action&quot;: {
  &quot;default_title&quot;: &quot;IHeader&quot;,
  &quot;default_icon&quot;: &quot;res/images/lightning_default.png&quot;,
  &quot;default_popup&quot;: &quot;res/index.html&quot; // 可选的
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"page_action"</span>: {
  <span class="hljs-attr">"default_title"</span>: <span class="hljs-string">"IHeader"</span>,
  <span class="hljs-attr">"default_icon"</span>: <span class="hljs-string">"res/images/lightning_default.png"</span>,
  <span class="hljs-attr">"default_popup"</span>: <span class="hljs-string">"res/index.html"</span> // 可选的
},</code></pre>
<p>以上是本篇将要讲解的Page Action的扩展——IHeader，它被指定为所有页面可见，其icon状态切换如下所示。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e3dedaaf2f?w=259&amp;h=232&amp;f=gif&amp;s=87285" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e3dedaaf2f?w=259&amp;h=232&amp;f=gif&amp;s=87285" alt="Page Action演示" title="Page Action演示" style="cursor: pointer;"></span></p>
<p>该类扩展特点：不同页面可以拥有不同的状态和不同的icon，icon在指定的页面可见，可见时位于浏览器右上角工具栏。</p>
<p>由上可见，Browser Action与Page Action功能上非常相似，配置上各自的内部属性也完全一致，它们不仅可以配置点击时弹出的页面，同时还可以绑定点击事件，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下事件绑定一般在background.js中运行
// Browser Action
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log(tab.id, tab.url);
  chrome.tabs.executeScript(tab.id, {file: 'content.js'});
});
// Page Action
chrome.pageAction.onClicked.addListener(function(tab) {
  console.log(tab.id, tab.url);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 以下事件绑定一般在background.js中运行</span>
<span class="hljs-comment">// Browser Action</span>
chrome.browserAction.onClicked.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>) </span>{
  <span class="hljs-built_in">console</span>.log(tab.id, tab.url);
  chrome.tabs.executeScript(tab.id, {<span class="hljs-attr">file</span>: <span class="hljs-string">'content.js'</span>});
});
<span class="hljs-comment">// Page Action</span>
chrome.pageAction.onClicked.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>) </span>{
  <span class="hljs-built_in">console</span>.log(tab.id, tab.url);
});</code></pre>
<p>如果非要说两者的差别，开发中能够感受到的就是：前者不需要维护icon状态，后者需要针对每个启用的页面管理不同的icon状态。</p>
<p>3）Omnibox，全能工具条，可通过manifest.json中的<code>omnibox</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;omnibox&quot;: {
  &quot;keyword&quot;: &quot;mdn-&quot; //URL地址栏输入关键字&quot;mdn-&quot;+空格后，就会触发Omnibox
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"omnibox"</span>: {
  <span class="hljs-attr">"keyword"</span>: <span class="hljs-string">"mdn-"</span> //URL地址栏输入关键字<span class="hljs-string">"mdn-"</span>+空格后，就会触发Omnibox
},</code></pre>
<p>以上是MDN网站快捷查询的Omnibox扩展，运行如下所示：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e4619f4890?w=560&amp;h=136&amp;f=gif&amp;s=235309" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e4619f4890?w=560&amp;h=136&amp;f=gif&amp;s=235309" alt="Omnibox演示" title="Omnibox演示" style="cursor: pointer; display: inline;"></span></p>
<p>很明显，你可以对地址栏的各种输入做定制，Chrome的URL地址栏只所以强大，omnibox可谓功不可没。</p>
<p>该类扩展特点：运行在URL地址栏，无弹出界面，用户在输入时，扩展就可以显示建议或者自动完成一些工作。</p>
<p>以上三类决定了扩展如何在浏览器中运行。除此之外，每个扩展程序还可以任意搭载如下页面或脚本。</p>
<ul>
<li>
<p>Background Page，后台页面，可通过manifest.json中的<code>background</code>属性设置，里面再细分<code>script</code>或<code>page</code>，分别表示脚本和页面，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;background&quot;: {
  &quot;persistent&quot;: true, //默认为false，指定为true时将在后台持续运行
  &quot;scripts&quot;: [&quot;res/js/background.js&quot;] // 指定后台运行的js
  // &quot;page&quot;: [&quot;res/background.html&quot;]  // 指定后台运行的html，html中需引入若干个js，没有用户界面，实际上就相当于引入多个js脚本
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"background"</span>: {
  <span class="hljs-attr">"persistent"</span>: <span class="hljs-literal">true</span>, //默认为false，指定为true时将在后台持续运行
  <span class="hljs-attr">"scripts"</span>: [<span class="hljs-string">"res/js/background.js"</span>] // 指定后台运行的js
  // <span class="hljs-string">"page"</span>: [<span class="hljs-string">"res/background.html"</span>]  // 指定后台运行的html，html中需引入若干个js，没有用户界面，实际上就相当于引入多个js脚本
},</code></pre>
<p>Background Page在扩展中之所以重要，主要归功于<strong>它可以使用所有的Chrome.* API</strong>。借助它<code>popup.js</code> 和 <code>content.js</code> 可以随时进行消息通信，并且调用它们原本无法调用的API。</p>
<p>根据persistent值是否为true，Background Page可分为两类：① <a href="https://developer.chrome.com/extensions/background_pages" rel="nofollow noreferrer" target="_blank">Persistent Background Pages</a>，② <a href="https://developer.chrome.com/extensions/event_pages" rel="nofollow noreferrer" target="_blank">Event Pages</a>。前者持续运行，随时可访问；后者只有在事件触发时才能访问。</p>
<p>该页面特点：运行在浏览器后台，无用户界面，后台页面可用于页面间消息通信以及后台监控，一旦浏览器启动，后台页面就会自动运行。</p>
</li>
<li>
<p>Content Script，内容脚本，可通过manifest.json中的<code>content_scripts</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;content_scripts&quot;: [
  {
    &quot;all_frames&quot;: true, // 默认为false，指定为true意味着frame中也加载内容脚本
    &quot;matches&quot;: [&quot;\u003Call_urls>&quot;], // 匹配所有URL，意味着任何页面都会加载
    &quot;js&quot;: [&quot;res/js/content.js&quot;], // 指定运行的内容脚本
    &quot;run_at&quot;: &quot;document_end&quot; // 页面加载完成后执行
  }
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"content_scripts"</span>: [
  {
    <span class="hljs-attr">"all_frames"</span>: <span class="hljs-literal">true</span>, // 默认为false，指定为true意味着frame中也加载内容脚本
    <span class="hljs-attr">"matches"</span>: [<span class="hljs-string">"\u003Call_urls&gt;"</span>], // 匹配所有URL，意味着任何页面都会加载
    <span class="hljs-attr">"js"</span>: [<span class="hljs-string">"res/js/content.js"</span>], // 指定运行的内容脚本
    <span class="hljs-attr">"run_at"</span>: <span class="hljs-string">"document_end"</span> // 页面加载完成后执行
  }
],</code></pre>
<p>除了配置之外，内容脚本还可以通过js的方式动态载入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 动态载入js文件
chrome.tabs.executeScript(tabId, {file: 'res/js/content.js'});
// 动态载入js语句
chrome.tabs.executeScript(tabId, {code: 'alert(&quot;Hello Extension!&quot;)'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 动态载入js文件</span>
chrome.tabs.executeScript(tabId, {<span class="hljs-attr">file</span>: <span class="hljs-string">'res/js/content.js'</span>});
<span class="hljs-comment">// 动态载入js语句</span>
chrome.tabs.executeScript(tabId, {<span class="hljs-attr">code</span>: <span class="hljs-string">'alert("Hello Extension!")'</span>});</code></pre>
<p>该脚本特点：每个页面在加载时都会加载内容脚本，加载时机可以指定为<code>document_start</code>、<code>idel</code>或<code>end</code>（分别为页面DOM加载开始时，空闲时及完成后）；<strong>内容脚本是唯一可以访问页面DOM的脚本</strong>，通过它可以操作页面的DOM节点，从而影响视觉呈现；基于安全考虑，内容脚本被设计成与页面其他的JS存在于两个不同的沙盒，因此无法互相访问各自的全局变量。</p>
</li>
<li>
<p>Option Html，设置页面，可通过manifest.json中的<code>options_page</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;options_page&quot;: &quot;res/options.html&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"options_page"</span>: <span class="hljs-string">"res/options.html"</span>,</code></pre>
<p>该页面特点：点击扩展程序icon的右键菜单上【选项】按钮进入到设置页面，该页面一般用于扩展的选项设置。</p>
</li>
<li>
<p>Override Html，替换新建标签页的空白页面，可通过manifest.json中的<code>chrome_url_overrides</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;chrome_url_overrides&quot;:{
  &quot;newtab&quot;: &quot;blank.html&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"chrome_url_overrides"</span>:{
  <span class="hljs-attr">"newtab"</span>: <span class="hljs-string">"blank.html"</span>
},</code></pre>
<p>该页面特点：常用于替换浏览器默认的空白标签页内容，多见于新开标签页时的壁纸程序，基于它你完全可以打造一个属于自己的空白页。</p>
</li>
<li>
<p>Devtool Page，开发者页面，可通过manifest.json中的<code>devtools_page</code>属性设置，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;devtools_page&quot;: &quot;debug.html&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"devtools_page"</span>: <span class="hljs-string">"debug.html"</span>,</code></pre>
<p>该页面特点：随着控制台打开而启动，可用于将扩展收到的消息输出到当前控制台。</p>
</li>
</ul>
<p>总之，对于Chrome扩展而言，Browser Action、Page Action 或 Omnibox之间是互斥的，其它情况下它并不限制你需要添加哪些页面或脚本，只要你愿意，就可以随意组合。</p>
<h4><strong>扩展如何运行调试</strong></h4>
<p>只要你会写js，就可以开发Chrome扩展程序了。涉及到开发，调试是不可避免的，Chrome扩展的调试也非常简单。我们都知道Chrome浏览器的 <code>chrome://extensions/</code>页面可以查看所有的Chrome扩展，不仅如此，该页面下的<code>加载已解压的扩展程序</code>按钮，便可以直接加载本地开发的扩展程序，如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVYzEL" src="https://static.alili.tech/img/bVYzEL" alt="加载已解压的扩展程序" title="加载已解压的扩展程序" style="cursor: pointer;"></span></p>
<p>注意：需要勾选开发者模式才会出现<code>加载已解压的扩展程序</code>按钮。</p>
<p>成功加载后的扩展跟正常安装的扩展程序，没有什么不同，接下来，我们就可以使用web技术进行调试了。</p>
<ul>
<li><p>点击以上的<code>选项</code>或<code>背景页</code>按钮，将分别打开选项页面和背景页。选项页面是一个正常的html页面，按<code>⌃+⌘+J</code> 键打开控制台就可以调试了。背景页没有界面，打开的就是控制台。这两个页面都可以断点debug。</p></li>
<li><p>Browser Action 或 Page Action的扩展通常在Chrome浏览器的右上角会出现一个Icon，右键点击该Icon，点击右键菜单的<code>审查弹出内容</code>按钮，将会在打开弹出页面的同时打开它的控制台。这个控制台也可以直接debug。</p></li>
</ul>
<h3 id="articleHeader5"><strong>Chrome Extension API</strong></h3>
<p>Chrome陆续向开发者开放了大量的API。使用这些API，我们可以监听或代理网络请求，存储数据，管理标签页和Cookie，绑定快捷键、设置右键菜单，添加通知和闹钟，获取CPU、电池、内存、显示器的信息等等（还有很多没有列举出来）。具体请阅读<a href="https://developer.chrome.com/extensions/api_index" rel="nofollow noreferrer" target="_blank">Chrome API官方文档</a>。请注意，使用相应的API，往往需要申请对应的权限，如IHeader申请的权限如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;permissions&quot;: [ &quot;tabs&quot; , &quot;webRequest&quot;, &quot;webRequestBlocking&quot;, &quot;http://*/*&quot;, &quot;https://*/*&quot;, &quot;contextMenus&quot;, &quot;notifications&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"permissions"</span>: [ <span class="hljs-string">"tabs"</span> , <span class="hljs-string">"webRequest"</span>, <span class="hljs-string">"webRequestBlocking"</span>, <span class="hljs-string">"http://*/*"</span>, <span class="hljs-string">"https://*/*"</span>, <span class="hljs-string">"contextMenus"</span>, <span class="hljs-string">"notifications"</span>]</code></pre>
<p>以上，IHeader依次申请了标签页、请求、请求断点、http网站，https网站，右键菜单，桌面通知的权限。</p>
<h3 id="articleHeader6"><strong>WebRequest API</strong></h3>
<p>Chrome Extension API中，能够修改请求的，只有chrome.webRequest了。webRequest能够为请求的不同阶段添加事件监听器，这些事件监听器，可以收集请求的详细信息，甚至修改或取消请求。</p>
<p>事件监听器只在特定阶段触发，它们的触发顺序如下所示。（图片来自<a href="https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webRequest" rel="nofollow noreferrer" target="_blank">MDN</a>）</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e4980b474e?w=624&amp;h=340&amp;f=png&amp;s=24362" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e4980b474e?w=624&amp;h=340&amp;f=png&amp;s=24362" alt="" title="" style="cursor: pointer;"></span></p>
<p>事件监听器的含义如下所示。</p>
<ul>
<li><p><strong>onBeforeRequest</strong>，请求发送之前触发（请求的第1个事件，请求尚未创建，此时可以取消或者重定向请求）。</p></li>
<li><p><strong>onBeforeSendHeaders</strong>，请求头发送之前触发（请求的第2个事件，此时可定制请求头，<strong>部分缓存等有关的请求头</strong>（Authorization、Cache-Control、Connection、Content-<br>Length、Host、If-Modified-Since、If-None-Match、If-Range、Partial-Data、Pragma、Proxy-<br>Authorization、Proxy-Connection和Transfer-Encoding）不出现在请求信息中，可以通过添加同名的key覆盖修改其值，但是不能删除）。</p></li>
<li><p><strong>onSendHeaders</strong>，请求头发送之前触发（请求的第3个事件，此时只能查看请求信息，可以确认onBeforeSendHeaders事件中都修改了哪些请求头）。</p></li>
<li><p><strong>onHeadersReceived</strong>，响应头收到之后触发（请求的第4个事件，此时可定制响应头，且只能修改或删除非缓存相关字段或添加字段，由于响应头允许多个同名字段同时存在，因此无法覆盖修改缓存相关的字段）。</p></li>
<li><p><strong>onResponseStarted</strong>，响应内容开始传输之后触发（请求的第5个事件，此时只能查看响应信息，可以确认onHeadersReceived事件中都修改了哪些响应头）。</p></li>
<li><p><strong>onCompleted</strong>，响应接受完成后触发（请求的第6个事件，此时只能查看响应信息）。</p></li>
<li><p><strong>onBeforeRedirect</strong>，onHeadersReceived事件之后，请求重定向之前触发（此时只能查看响应头信息）。</p></li>
<li><p><strong>onAuthRequired</strong>，onHeadersReceived事件之后，收到401或者407状态码时触发（此时可以取消请求、同步提供凭证或异步提供凭证）。</p></li>
</ul>
<p>以上，凡是能够修改请求的事件监听器，都能够指定其extraInfoSpec参数数组中包含"blocking"字符串（意味着能阻塞请求并修改），反之则不行。</p>
<blockquote><p>另外请注意，Chrome对于请求头和响应头的展示有着明确的规定，即控制台中只展示发送出去或刚接收到的字段。因此编辑后的请求字段，控制台的network栏能够正常展示；而编辑后的响应字段由于不属于刚接收到的字段，所以从控制台上就会看不到编辑的痕迹，如同没修改过一样，实际上编辑仍然有效。</p></blockquote>
<p>事件监听器含义虽不同，但语法却一致。接下来我们就以onHeadersReceived为例，进行深入分析。</p>
<h3 id="articleHeader7"><strong>如何绑定header监听</strong></h3>
<p>还记得我们的目标吗？想要去掉Google网站HTML响应头的<code>X-Frame-Options</code>字段。请看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 监听的回调
var callback = function(details) {
  var headers = details.responseHeaders;
  for (var i = 0; i < headers.length; ++i) {
    // 移除X-Frame-Options字段
    if (headers[i].name === 'X-Frame-Options') {
      headers.splice(i, 1);
      break;
    }
  }
  // 返回修改后的headers列表
  return { responseHeaders: headers };
};
// 监听哪些内容
var filter = {
  urls: [&quot;<all_urls>&quot;]
};
// 额外的信息规范，可选的
var extraInfoSpec = [&quot;blocking&quot;, &quot;responseHeaders&quot;];
/* 监听response headers接收事件*/
chrome.webRequest.onHeadersReceived.addListener(callback, filter, extraInfoSpec);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 监听的回调</span>
<span class="hljs-keyword">var</span> callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">details</span>) </span>{
  <span class="hljs-keyword">var</span> headers = details.responseHeaders;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; headers.length; ++i) {
    <span class="hljs-comment">// 移除X-Frame-Options字段</span>
    <span class="hljs-keyword">if</span> (headers[i].name === <span class="hljs-string">'X-Frame-Options'</span>) {
      headers.splice(i, <span class="hljs-number">1</span>);
      <span class="hljs-keyword">break</span>;
    }
  }
  <span class="hljs-comment">// 返回修改后的headers列表</span>
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">responseHeaders</span>: headers };
};
<span class="hljs-comment">// 监听哪些内容</span>
<span class="hljs-keyword">var</span> filter = {
  <span class="hljs-attr">urls</span>: [<span class="hljs-string">"&lt;all_urls&gt;"</span>]
};
<span class="hljs-comment">// 额外的信息规范，可选的</span>
<span class="hljs-keyword">var</span> extraInfoSpec = [<span class="hljs-string">"blocking"</span>, <span class="hljs-string">"responseHeaders"</span>];
<span class="hljs-comment">/* 监听response headers接收事件*/</span>
chrome.webRequest.onHeadersReceived.addListener(callback, filter, extraInfoSpec);</code></pre>
<p>chrome.webRequest.onHeadersReceived.addListener表示添加一个接收响应头的监听。以上代码中的关键参数或属性，下面逐一讲解。</p>
<ul>
<li><p>callback，即事件触发时的回调，该回调默认传入一个参数（details），details就是请求的详情。</p></li>
<li><p>filter，Object类型，限制事件回调callback触发的过滤器。filter有四个属性可以指定，分别为①urls（包含指定url的数组）、②types（请求的类型，共8种）、③tabId（标签页id）、④windowId（窗口id）。</p></li>
<li><p>extraInfoSpec，数组类型，指的是额外的选项列表。对于headersReceived事件而言，包含"blocking"，意味着要求请求同步，基于此才可以修改响应头；包含"responseHeaders"意味着事件回调的默认参数details中将包含responseHeaders字段，该字段指向响应头列表。</p></li>
</ul>
<p>既然有了添加监听的方法，自然，还会有移除监听的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.webRequest.onHeadersReceived.removeListener(listener);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">chrome.webRequest.onHeadersReceived.removeListener(listener);</code></pre>
<p>除此之外，为了避免重复监听，还可以判断监听是否已经存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bool = chrome.webRequest.onHeadersReceived.hasListener(listener);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> bool = chrome.webRequest.onHeadersReceived.hasListener(listener);</code></pre>
<p>为了保证更好的理清以上属性、方法或参数的逻辑关系，请看如下脑图：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86fcf7da724c?w=1000&amp;h=481&amp;f=png&amp;s=301151" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86fcf7da724c?w=1000&amp;h=481&amp;f=png&amp;s=301151" alt="headersReceived事件" title="headersReceived事件" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8"><strong>扩展状态管理</strong></h3>
<h4><strong>监听器的状态管理</strong></h4>
<p>知道了如何绑定监听器，仅仅是第一步。监听器需要在合适的时机绑定，也需要在合适的时机解绑。为了不影响Chrome的访问速度，我们只在需要的标签页创建新的监听器，因此监听器需要依赖filter来区分不同的tabId，考虑到用户可能只需要监听一部分请求类型，types的区分也是不可避免的。又由于一个Tab里不同的时间段可能会加载不同的页面，一个监听器在不同的页面下正常运行也是必须的（因此监听器的filter中不需要指定urls）。</p>
<p>寥寥数语，可能不足以描述出监听器状态管理的原貌，请看下图进一步帮助理解。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e4d2ea395c?w=1327&amp;h=346&amp;f=png&amp;s=58933" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e4d2ea395c?w=1327&amp;h=346&amp;f=png&amp;s=58933" alt="页面监听器" title="页面监听器" style="cursor: pointer;"></span></p>
<p>以上，一个请求将依次触发上述①②③④⑤五个事件回调，每个事件回调都对应着一个监听器，这些监听器分为两类（从颜色上也可看出端倪）。</p>
<ul>
<li><p>②③⑤监听器的主要功能是<strong>记录</strong>，用于监听页面上每一个Request的请求头和响应头，以及请求响应时间。</p></li>
<li><p>①④监听器的主要功能是<strong>更新</strong>，用于增加、删除或修改指定Request的请求头和响应头。</p></li>
</ul>
<p>若Chrome指定的标签页激活了IHeader扩展，②③⑤监听器就会记录当前标签页后续的指定类型的请求信息。若用户在激活了IHeader扩展的标签页更新了Request的请求头或响应头，①或④监听器就会被开启。不用担心监听器开启无限个，我准备了回收机制，单个标签页的所有监听器都会在标签页关闭或IHeader扩展取消激活后释放掉。</p>
<p>首先，为方便管理，先封装下监听器的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 独立的监听器 */
var Listener = (function(){
  var webRequest = chrome.webRequest;

  function Listener(type, filter, extraInfoSpec, callback){
    this.type = type; // 事件名称
    this.filter = filter; // 过滤器
    this.extraInfoSpec = extraInfoSpec; // 额外的参数
    this.callback = callback; // 事件回调
    this.init();
  }
  Listener.prototype.init = function(){
    webRequest[this.type].addListener( // 添加一个监听器
      this.callback,
      this.filter,
      this.extraInfoSpec
    );
    return this;
  };
  Listener.prototype.remove = function(){
    webRequest[this.type].removeListener(this.callback); // 移除监听器
    return this;
  };
  Listener.prototype.reload = function(){ // 重启监听器(用于选项页面更新请求类型后重启所有已开启的监听器)
    this.remove().init();
    return this;
  };
  return Listener;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 独立的监听器 */</span>
<span class="hljs-keyword">var</span> Listener = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> webRequest = chrome.webRequest;

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Listener</span>(<span class="hljs-params">type, filter, extraInfoSpec, callback</span>)</span>{
    <span class="hljs-keyword">this</span>.type = type; <span class="hljs-comment">// 事件名称</span>
    <span class="hljs-keyword">this</span>.filter = filter; <span class="hljs-comment">// 过滤器</span>
    <span class="hljs-keyword">this</span>.extraInfoSpec = extraInfoSpec; <span class="hljs-comment">// 额外的参数</span>
    <span class="hljs-keyword">this</span>.callback = callback; <span class="hljs-comment">// 事件回调</span>
    <span class="hljs-keyword">this</span>.init();
  }
  Listener.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    webRequest[<span class="hljs-keyword">this</span>.type].addListener( <span class="hljs-comment">// 添加一个监听器</span>
      <span class="hljs-keyword">this</span>.callback,
      <span class="hljs-keyword">this</span>.filter,
      <span class="hljs-keyword">this</span>.extraInfoSpec
    );
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
  Listener.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    webRequest[<span class="hljs-keyword">this</span>.type].removeListener(<span class="hljs-keyword">this</span>.callback); <span class="hljs-comment">// 移除监听器</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
  Listener.prototype.reload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">// 重启监听器(用于选项页面更新请求类型后重启所有已开启的监听器)</span>
    <span class="hljs-keyword">this</span>.remove().init();
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
  <span class="hljs-keyword">return</span> Listener;
})();</code></pre>
<p>监听器封装好了，剩下的便是管理，监听器控制器基于标签页的维度统一管理标签页上所有的监听器，代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 监听器控制器 */
var ListenerControler = (function(){
  var allListeners = {}; /* 所有的监听器控制器列表 */
  function ListenerControler(tabId){
    if(allListeners[tabId]){ /* 如有就返回已有的实例 */
      return allListeners[tabId];
    }
    if(!(this instanceof ListenerControler)){ /* 强制以构造器方式调用 */
      return new ListenerControler(tabId);
    }

    /* 初始化变量 */
    var _this = this;
    var filter = getFilter(tabId); // 获取当前监听的filter设置
    /* 捕获requestHeaders */
    var l1 = new Listener('onSendHeaders', filter, ['requestHeaders'], function(details){
      _this.saveMesage('request', details); // 记录请求的头域信息
    });
    /* 捕获responseHeaders */
    var l2 = new Listener('onResponseStarted', filter, ['responseHeaders'], function(details){
      _this.saveMesage('response', details); // 记录响应的头域信息
    });
    /* 捕获 Completed Details */
    var l3 = new Listener('onCompleted', filter, ['responseHeaders'], function(details){
      _this.saveMesage('complete', details); // 记录请求完成时的时间等信息
    });

    allListeners[tabId] = this; // 记录当前的标签页控制器
    this.tabId = tabId;
    this.listeners = {  // 记录已开启的监听器
      'onSendHeaders': l1,
      'onResponseStarted': l2,
      'onCompleted': l3
    };
    this.messages = {}; // 当前标签页的请求信息集合
    console.log('tabId=' + tabId + ' listener on');
  }
  ListenerControler.has = function(tabId){...} // 判断是否包含指定标签页的控制器
  ListenerControler.get = function(tabId){...} // 返回指定标签页的控制器
  ListenerControler.getAll = function(){...} // 获取所有的标签页控制器
  ListenerControler.remove = function(tabId){...} // 移除指定标签页下的所有监听器
  ListenerControler.prototype.remove = function(){...} // 移除当前控制器中的所有监听器
  ListenerControler.prototype.saveMesage = function(type, message){...} // 记录请求信息
  return ListenerControler;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 监听器控制器 */</span>
<span class="hljs-keyword">var</span> ListenerControler = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> allListeners = {}; <span class="hljs-comment">/* 所有的监听器控制器列表 */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ListenerControler</span>(<span class="hljs-params">tabId</span>)</span>{
    <span class="hljs-keyword">if</span>(allListeners[tabId]){ <span class="hljs-comment">/* 如有就返回已有的实例 */</span>
      <span class="hljs-keyword">return</span> allListeners[tabId];
    }
    <span class="hljs-keyword">if</span>(!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> ListenerControler)){ <span class="hljs-comment">/* 强制以构造器方式调用 */</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ListenerControler(tabId);
    }

    <span class="hljs-comment">/* 初始化变量 */</span>
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> filter = getFilter(tabId); <span class="hljs-comment">// 获取当前监听的filter设置</span>
    <span class="hljs-comment">/* 捕获requestHeaders */</span>
    <span class="hljs-keyword">var</span> l1 = <span class="hljs-keyword">new</span> Listener(<span class="hljs-string">'onSendHeaders'</span>, filter, [<span class="hljs-string">'requestHeaders'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">details</span>)</span>{
      _this.saveMesage(<span class="hljs-string">'request'</span>, details); <span class="hljs-comment">// 记录请求的头域信息</span>
    });
    <span class="hljs-comment">/* 捕获responseHeaders */</span>
    <span class="hljs-keyword">var</span> l2 = <span class="hljs-keyword">new</span> Listener(<span class="hljs-string">'onResponseStarted'</span>, filter, [<span class="hljs-string">'responseHeaders'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">details</span>)</span>{
      _this.saveMesage(<span class="hljs-string">'response'</span>, details); <span class="hljs-comment">// 记录响应的头域信息</span>
    });
    <span class="hljs-comment">/* 捕获 Completed Details */</span>
    <span class="hljs-keyword">var</span> l3 = <span class="hljs-keyword">new</span> Listener(<span class="hljs-string">'onCompleted'</span>, filter, [<span class="hljs-string">'responseHeaders'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">details</span>)</span>{
      _this.saveMesage(<span class="hljs-string">'complete'</span>, details); <span class="hljs-comment">// 记录请求完成时的时间等信息</span>
    });

    allListeners[tabId] = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// 记录当前的标签页控制器</span>
    <span class="hljs-keyword">this</span>.tabId = tabId;
    <span class="hljs-keyword">this</span>.listeners = {  <span class="hljs-comment">// 记录已开启的监听器</span>
      <span class="hljs-string">'onSendHeaders'</span>: l1,
      <span class="hljs-string">'onResponseStarted'</span>: l2,
      <span class="hljs-string">'onCompleted'</span>: l3
    };
    <span class="hljs-keyword">this</span>.messages = {}; <span class="hljs-comment">// 当前标签页的请求信息集合</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'tabId='</span> + tabId + <span class="hljs-string">' listener on'</span>);
  }
  ListenerControler.has = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId</span>)</span>{...} <span class="hljs-comment">// 判断是否包含指定标签页的控制器</span>
  ListenerControler.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId</span>)</span>{...} <span class="hljs-comment">// 返回指定标签页的控制器</span>
  ListenerControler.getAll = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 获取所有的标签页控制器</span>
  ListenerControler.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId</span>)</span>{...} <span class="hljs-comment">// 移除指定标签页下的所有监听器</span>
  ListenerControler.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 移除当前控制器中的所有监听器</span>
  ListenerControler.prototype.saveMesage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, message</span>)</span>{...} <span class="hljs-comment">// 记录请求信息</span>
  <span class="hljs-keyword">return</span> ListenerControler;
})();</code></pre>
<p>通过监听器控制器的统一调度，标签页中的多个监听器才能高效的工作。</p>
<p>实际上，还有很多工作，上述代码还没有体现出来。比方说用户在激活了IHeader扩展的标签页更新了Request的请求头或响应头，①beforeSendHeaders或④headersReceived监听器又是怎么运作的呢？这部分内容，请结合『如何绑定header监听』节点的内容理解。</p>
<h4><strong>Page Action图标状态管理</strong></h4>
<p>标签页控制器的状态需要由视觉体现出来，因此Page Action图标的管理也是不可避免的。通常，默认的icon可以在manifest.json中指定。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;page_action&quot;: {
  &quot;default_icon&quot;: &quot;res/images/lightning_default.png&quot;, // 默认图标
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"page_action"</span>: {
  <span class="hljs-attr">"default_icon"</span>: <span class="hljs-string">"res/images/lightning_default.png"</span>, // 默认图标
},</code></pre>
<p>icon有如下3种状态（后两种状态可以互相切换）。</p>
<ul>
<li><p>默认状态，展示默认的icon。</p></li>
<li><p>初始状态，展示扩展初始化后的icon。</p></li>
<li><p>激活状态，展示扩展激活后的icon。</p></li>
</ul>
<p>Chrome提供了chrome.pageAction的API供Page Action使用。目前chrome.pageAction拥有如下方法。</p>
<ul>
<li><p>show，在指定的tab下展示Page Action。</p></li>
<li><p>hide，在指定的tab下隐藏Page Action。</p></li>
<li><p>setTitle，设置Page Action的标题（鼠标移动到该Page Action上时会出现设置好的标题提示）</p></li>
<li><p>getTitle，获取Page Action的标题。</p></li>
<li><p>setIcon，设置Page Action的图标。</p></li>
<li><p>setPopup，设置点击时弹出页面的URL。</p></li>
<li><p>getPopup，获取点击时弹出页面的URL。</p></li>
</ul>
<p>以上，setTitle、setIcon 和 show方法比较常用。其中，show方法有两种作用，①展示icon，②更新icon，因此一般是先设置好icon的标题和路径，然后调用show展示出来（或更新）。需要注意的是，Page Action在show方法被调用之前，是不会响应点击的，所以需要在初始化工作结束之前调用show方法。千言万语不如上代码，如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 声明3种icon状态 */
var UNINIT = 0, // 扩展未初始化
    INITED = 1, // 扩展已初始化，但未激活
    ACTIVE = 2; // 扩展已激活
/* 处理扩展icon状态 */
var PageActionIcon = (function(){
  var pageAction = chrome.pageAction, icons = {}, tips = {};
  icons[INITED] = 'res/images/lightning_green.png'; // 设置不同状态下的icon路径(相对于扩展根目录)
  icons[ACTIVE] = 'res/images/lightning_red.png';

  tips[INITED] = Text('iconTips'); // 其它地方有处理，Text被指向chrome.i18n.getMessage，用以读取_locales中指定语言的对应字段的文本信息
  tips[ACTIVE] = Text('iconHideTips');

  function PageActionIcon(tabId){ // 构造器
    this.tabId  = tabId;
    this.status = UNINIT; // 默认为未初始化状态
    pageAction.show(tabId); // 展示Page Action
  }
  PageActionIcon.prototype.init = function(){...} // 初始化icon
  PageActionIcon.prototype.active = function(){...} // icon切换为激活状态
  PageActionIcon.prototype.hide = function(){...} // 隐藏icon
  PageActionIcon.prototype.setIcon = function(){ // 设置icon
    pageAction.setIcon({ // 设置icon的路径
      tabId : this.tabId,
      path  : icons[this.status]
    });
    pageAction.setTitle({ // 设置icon的标题
      tabId : this.tabId,
      title : tips[this.status]
    });
    return this;
  };
  PageActionIcon.prototype.restore = function(){// 刷新页面后，icon之前的状态会丢失，需要手动恢复
    this.setIcon();
    pageAction.show(this.tabId);
    return this;
  };
  return PageActionIcon;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 声明3种icon状态 */</span>
<span class="hljs-keyword">var</span> UNINIT = <span class="hljs-number">0</span>, <span class="hljs-comment">// 扩展未初始化</span>
    INITED = <span class="hljs-number">1</span>, <span class="hljs-comment">// 扩展已初始化，但未激活</span>
    ACTIVE = <span class="hljs-number">2</span>; <span class="hljs-comment">// 扩展已激活</span>
<span class="hljs-comment">/* 处理扩展icon状态 */</span>
<span class="hljs-keyword">var</span> PageActionIcon = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> pageAction = chrome.pageAction, icons = {}, tips = {};
  icons[INITED] = <span class="hljs-string">'res/images/lightning_green.png'</span>; <span class="hljs-comment">// 设置不同状态下的icon路径(相对于扩展根目录)</span>
  icons[ACTIVE] = <span class="hljs-string">'res/images/lightning_red.png'</span>;

  tips[INITED] = Text(<span class="hljs-string">'iconTips'</span>); <span class="hljs-comment">// 其它地方有处理，Text被指向chrome.i18n.getMessage，用以读取_locales中指定语言的对应字段的文本信息</span>
  tips[ACTIVE] = Text(<span class="hljs-string">'iconHideTips'</span>);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PageActionIcon</span>(<span class="hljs-params">tabId</span>)</span>{ <span class="hljs-comment">// 构造器</span>
    <span class="hljs-keyword">this</span>.tabId  = tabId;
    <span class="hljs-keyword">this</span>.status = UNINIT; <span class="hljs-comment">// 默认为未初始化状态</span>
    pageAction.show(tabId); <span class="hljs-comment">// 展示Page Action</span>
  }
  PageActionIcon.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 初始化icon</span>
  PageActionIcon.prototype.active = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// icon切换为激活状态</span>
  PageActionIcon.prototype.hide = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 隐藏icon</span>
  PageActionIcon.prototype.setIcon = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">// 设置icon</span>
    pageAction.setIcon({ <span class="hljs-comment">// 设置icon的路径</span>
      tabId : <span class="hljs-keyword">this</span>.tabId,
      <span class="hljs-attr">path</span>  : icons[<span class="hljs-keyword">this</span>.status]
    });
    pageAction.setTitle({ <span class="hljs-comment">// 设置icon的标题</span>
      tabId : <span class="hljs-keyword">this</span>.tabId,
      <span class="hljs-attr">title</span> : tips[<span class="hljs-keyword">this</span>.status]
    });
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
  PageActionIcon.prototype.restore = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">// 刷新页面后，icon之前的状态会丢失，需要手动恢复</span>
    <span class="hljs-keyword">this</span>.setIcon();
    pageAction.show(<span class="hljs-keyword">this</span>.tabId);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
  <span class="hljs-keyword">return</span> PageActionIcon;
})();</code></pre>
<p>icon管理的准备工作ok了，剩下的就是使用了，如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new PageActionIcon(this.tabId).init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> PageActionIcon(<span class="hljs-keyword">this</span>.tabId).init();</code></pre>
<h4><strong>标签页的状态管理</strong></h4>
<p>对于IHeader扩展程序，一个标签页同时包含了监听器状态和icon状态的变化。因此需要再抽象出一个标签页控制器，对两者进行统一管理，从而供外部调用。代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 处理标签页状态 */
var TabControler = (function(){
  var tabs = {}; // 所有的标签页控制器列表
  function TabControler(tabId, url){
    if(tabs[tabId]){ /* 如有就返回已有的实例 */
      return tabs[tabId];
    }
    if(!(this instanceof TabControler)){ /* 强制以构造器方式调用 */
      return new TabControler(tabId);
    }
    /* 初始化属性 */
    tabs[tabId] = this;
    this.tabId = tabId;
    this.url    = url;
    this.init();
  }
  TabControler.get = function(tabId){...} // 获取指定的标签页控制器
  TabControler.remove = function(tabId){
    if(tabs[tabId]){
      delete tabs[tabId]; // 移除指定的标签页控制器
      ListenerControler.remove(tabId); // 移除指定的监听器控制器
    }
  };
  TabControler.prototype.init = function(){...} // 初始化标签页控制器
  TabControler.prototype.switchActive = function(){ // 当前标签页状态切换
    var icon = this.icon;
    if(icon){
      var status = icon.status;
      var tabId = this.tabId;
      switch(status){
        case ACTIVE: // 如果是激活状态，则恢复初始状态，移除监听器控制器
          icon.init(); 
          ListenerControler.remove(tabId);
          Message.send(tabId, 'ListeningCancel'); // 通知内容脚本从而在控制台输出取消提示(后续将讲到消息通信)
          break;
        default: // 如果不是激活状态，则激活之，添加监听器控制器
          icon.active();
          ListenerControler(tabId);
          Message.send(tabId, 'Listening'); // 并通知内容脚本从而在控制台输出监听提示
      }
    }
    return this;
  };
  TabControler.prototype.restore = function(){...} // 恢复标签页控制器的状态(针对页面刷新场景)
  TabControler.prototype.remove = function(){...} // 移除标签页控制器
  return TabControler;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 处理标签页状态 */</span>
<span class="hljs-keyword">var</span> TabControler = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> tabs = {}; <span class="hljs-comment">// 所有的标签页控制器列表</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">TabControler</span>(<span class="hljs-params">tabId, url</span>)</span>{
    <span class="hljs-keyword">if</span>(tabs[tabId]){ <span class="hljs-comment">/* 如有就返回已有的实例 */</span>
      <span class="hljs-keyword">return</span> tabs[tabId];
    }
    <span class="hljs-keyword">if</span>(!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> TabControler)){ <span class="hljs-comment">/* 强制以构造器方式调用 */</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> TabControler(tabId);
    }
    <span class="hljs-comment">/* 初始化属性 */</span>
    tabs[tabId] = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.tabId = tabId;
    <span class="hljs-keyword">this</span>.url    = url;
    <span class="hljs-keyword">this</span>.init();
  }
  TabControler.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId</span>)</span>{...} <span class="hljs-comment">// 获取指定的标签页控制器</span>
  TabControler.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId</span>)</span>{
    <span class="hljs-keyword">if</span>(tabs[tabId]){
      <span class="hljs-keyword">delete</span> tabs[tabId]; <span class="hljs-comment">// 移除指定的标签页控制器</span>
      ListenerControler.remove(tabId); <span class="hljs-comment">// 移除指定的监听器控制器</span>
    }
  };
  TabControler.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 初始化标签页控制器</span>
  TabControler.prototype.switchActive = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">// 当前标签页状态切换</span>
    <span class="hljs-keyword">var</span> icon = <span class="hljs-keyword">this</span>.icon;
    <span class="hljs-keyword">if</span>(icon){
      <span class="hljs-keyword">var</span> status = icon.status;
      <span class="hljs-keyword">var</span> tabId = <span class="hljs-keyword">this</span>.tabId;
      <span class="hljs-keyword">switch</span>(status){
        <span class="hljs-keyword">case</span> ACTIVE: <span class="hljs-comment">// 如果是激活状态，则恢复初始状态，移除监听器控制器</span>
          icon.init(); 
          ListenerControler.remove(tabId);
          Message.send(tabId, <span class="hljs-string">'ListeningCancel'</span>); <span class="hljs-comment">// 通知内容脚本从而在控制台输出取消提示(后续将讲到消息通信)</span>
          <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">default</span>: <span class="hljs-comment">// 如果不是激活状态，则激活之，添加监听器控制器</span>
          icon.active();
          ListenerControler(tabId);
          Message.send(tabId, <span class="hljs-string">'Listening'</span>); <span class="hljs-comment">// 并通知内容脚本从而在控制台输出监听提示</span>
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  };
  TabControler.prototype.restore = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 恢复标签页控制器的状态(针对页面刷新场景)</span>
  TabControler.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{...} <span class="hljs-comment">// 移除标签页控制器</span>
  <span class="hljs-keyword">return</span> TabControler;
})();</code></pre>
<p>标签页控制器的抽象，有助于封装扩展的内部运行细节，方便了后续各种场景中对扩展的管理 。</p>
<h4><strong>标签页关闭或更新的妥善处理</strong></h4>
<p>标签页关闭或更新时，为了避免内存泄露和运行稳定，部分数据需要释放或者同步。刚刚封装好的标签页控制器就可以用来做这件事。</p>
<p>首先，Tab关闭时需要释放当前标签页的控制器和监听器对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 监听tab关闭的事件 */
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  TabControler.remove(tabId); // 释放内存，移除标签页控制器和监听器
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 监听tab关闭的事件 */</span>
chrome.tabs.onRemoved.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId, removeInfo</span>)</span>{
  TabControler.remove(tabId); <span class="hljs-comment">// 释放内存，移除标签页控制器和监听器</span>
});</code></pre>
<p>其次，每次Tab在执行跳转或刷新动作时，Page Action的icon都会回到初始状态并且不可点击，此时需要恢复icon之前的状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 监听tab更新的事件、包含跳转或刷新的动作 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
  if(changeInfo.status === 'loading'){ // 页面处于loading时触发
    TabControler(tabId).restore(); // 恢复icon状态
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 监听tab更新的事件、包含跳转或刷新的动作 */</span>
chrome.tabs.onUpdated.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabId, changeInfo</span>)</span>{
  <span class="hljs-keyword">if</span>(changeInfo.status === <span class="hljs-string">'loading'</span>){ <span class="hljs-comment">// 页面处于loading时触发</span>
    TabControler(tabId).restore(); <span class="hljs-comment">// 恢复icon状态</span>
  }
});</code></pre>
<p>以上，页面跳转或刷新时，changeInfo将依次经历两种状态：<code>loading</code> 和<code>complete</code>（部分页面会包含<code>favIconUrl</code>或<code>title</code>信息），如下所示。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e504bae3ff?w=800&amp;h=142&amp;f=png&amp;s=48873" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e504bae3ff?w=800&amp;h=142&amp;f=png&amp;s=48873" alt="changeInfo" title="changeInfo" style="cursor: pointer;"></span></p>
<p>随着状态管理的逐渐完善，那么，是时候进行消息通信了（不知道你注意到上述代码中出现的Message对象没有？它就是消息处理的对象）。</p>
<h3 id="articleHeader9"><strong>消息通信</strong></h3>
<h4><strong>扩展内部消息通信</strong></h4>
<p>Chrome扩展内的各页面之间的消息通信，有如下四种方式（以下接口省略chrome前缀）。</p>
<table>
<thead><tr>
<th align="center">类型</th>
<th align="center">消息发送</th>
<th align="center">消息接收</th>
<th align="center">支持版本</th>
</tr></thead>
<tbody>
<tr>
<td align="center">一次性消息</td>
<td align="center">extension.sendRequest</td>
<td align="center">extension.onRequest</td>
<td align="center">v33起废弃（早期方案）</td>
</tr>
<tr>
<td align="center">一次性消息</td>
<td align="center">extension.sendMessage</td>
<td align="center">extension.onMessage</td>
<td align="center">v20+（不建议使用）</td>
</tr>
<tr>
<td align="center">一次性消息</td>
<td align="center">runtime.sendMessage</td>
<td align="center">runtime.onMessage</td>
<td align="center">v26+（现在主流，推荐使用）</td>
</tr>
<tr>
<td align="center">长期连接</td>
<td align="center">runtime.connect</td>
<td align="center">runtime.onConnect</td>
<td align="center">v26+</td>
</tr>
</tbody>
</table>
<p>目前以上四种方案都可以使用。其中<code>extension.sendRequest</code>发送的消息，只有<code>extension.onRequest</code>才能接收到（已废弃不建议使用，可选读<a href="https://codereview.chromium.org/9965005/#ps3001" rel="nofollow noreferrer" target="_blank">Issue 9965005</a>）。<code>extension.sendMessage</code> 或 <code>runtime.sendMessage</code> 发送的消息，虽然<code>extension.onMessage</code> 和 <code>runtime.onMessage</code>都可以接收，但是runtime api的优先触发。若多个监听同时存在，只有第一个响应才能触发消息的sendResponse回调，其他响应将被忽略，如下所述。</p>
<blockquote><p>If multiple pages are listening for onMessage events, only the first to call sendResponse() for a particular event will succeed in sending the response. All other responses to that event will be ignored.</p></blockquote>
<p>我们先看一次性的消息通信，它的基本规律如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVYzFh" src="https://static.alili.tech/img/bVYzFh" alt="一次性消息通信图示" title="一次性消息通信图示" style="cursor: pointer;"></span></p>
<p>图中出现了一种新的消息通信方式，即<code>chrome.extension.getBackgroundPage</code>，通过它能够获取background.js（后台脚本）的window对象，从而调用window下的任意全局方法。严格来说它不是消息通信，但是它完全能够胜任消息通信的工作，之所以出现在图示中，是因为它才是消息从popup.html到background.js的主流沟通方式。那么你可能会问了，为什么content.js中不具有同样的API呢？</p>
<p>这是因为它们的使用方式不同，各自的权限也不同。popup.html或background.js中chrome.extension对象打印如下：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e61e703a0d?w=800&amp;h=300&amp;f=png&amp;s=72312" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e61e703a0d?w=800&amp;h=300&amp;f=png&amp;s=72312" alt="chrome.extension对象" title="chrome.extension对象" style="cursor: pointer;"></span></p>
<p>content.js中chrome.extension对象打印如下：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e5cb33e1ba?w=757&amp;h=179&amp;f=png&amp;s=32837" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e5cb33e1ba?w=757&amp;h=179&amp;f=png&amp;s=32837" alt="content.js下的chrome.extension对象" title="content.js下的chrome.extension对象" style="cursor: pointer;"></span></p>
<p>可以看出，前者包含了全量的属性，后者只保留少量的属性。content.js中并没有<code>chrome.extension.getBackgroundPage</code>方法，因此content.js不能直接调用background.js中的全局方法。</p>
<p>回到消息通信的话题，请看消息发送和监听的简单示例，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 消息流：弹窗页面、选项页面 或 background.js --> content.js
// 由于每个tab都可能加载内容脚本，因此需要指定tab
chrome.tabs.query( // 查询tab
  { active: true, currentWindow: true }, // 获取当前窗口激活的标签页，即当前tab
  function(tabs) { // 获取的列表是包含一个tab对象的数组
    chrome.tabs.sendMessage( // 向tab发送消息
      tabs[0].id, // 指定tab的id
      { message: 'Hello content.js' }, // 消息内容可以为任意对象
      function(response) { // 收到响应后的回调
        console.log(response);
      }
    );
  }
);

/* 消息流：
 * 1. 弹窗页面或选项页面 --> background.js
 * 2. background.js --> 弹窗页面或选项页面
 * 3. content.js --> 弹窗页面、选项页面 或 background.js
 */
chrome.runtime.sendMessage({ message: 'runtime-message' }, function(response) {
  console.log(response);
});

// 可任意选用runtime或extension的onMessage方法监听消息
chrome.runtime.onMessage.addListener( // 添加消息监听
  function(request, sender, sendResponse) { // 三个参数分别为①消息内容，②消息发送者，③发送响应的方法
    console.log(sender.tab ?
                &quot;from a content script:&quot; + sender.tab.url :
                &quot;from the extension&quot;);
    if (request.message === 'Hello content.js'){
      sendResponse({ answer: 'goodbye' }); // 发送响应内容
    }
    // return true; // 如需异步调用sendResponse方法，需要显式返回true
  }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 消息流：弹窗页面、选项页面 或 background.js --&gt; content.js</span>
<span class="hljs-comment">// 由于每个tab都可能加载内容脚本，因此需要指定tab</span>
chrome.tabs.query( <span class="hljs-comment">// 查询tab</span>
  { <span class="hljs-attr">active</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">currentWindow</span>: <span class="hljs-literal">true</span> }, <span class="hljs-comment">// 获取当前窗口激活的标签页，即当前tab</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{ <span class="hljs-comment">// 获取的列表是包含一个tab对象的数组</span>
    chrome.tabs.sendMessage( <span class="hljs-comment">// 向tab发送消息</span>
      tabs[<span class="hljs-number">0</span>].id, <span class="hljs-comment">// 指定tab的id</span>
      { <span class="hljs-attr">message</span>: <span class="hljs-string">'Hello content.js'</span> }, <span class="hljs-comment">// 消息内容可以为任意对象</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{ <span class="hljs-comment">// 收到响应后的回调</span>
        <span class="hljs-built_in">console</span>.log(response);
      }
    );
  }
);

<span class="hljs-comment">/* 消息流：
 * 1. 弹窗页面或选项页面 --&gt; background.js
 * 2. background.js --&gt; 弹窗页面或选项页面
 * 3. content.js --&gt; 弹窗页面、选项页面 或 background.js
 */</span>
chrome.runtime.sendMessage({ <span class="hljs-attr">message</span>: <span class="hljs-string">'runtime-message'</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(response);
});

<span class="hljs-comment">// 可任意选用runtime或extension的onMessage方法监听消息</span>
chrome.runtime.onMessage.addListener( <span class="hljs-comment">// 添加消息监听</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, sender, sendResponse</span>) </span>{ <span class="hljs-comment">// 三个参数分别为①消息内容，②消息发送者，③发送响应的方法</span>
    <span class="hljs-built_in">console</span>.log(sender.tab ?
                <span class="hljs-string">"from a content script:"</span> + sender.tab.url :
                <span class="hljs-string">"from the extension"</span>);
    <span class="hljs-keyword">if</span> (request.message === <span class="hljs-string">'Hello content.js'</span>){
      sendResponse({ <span class="hljs-attr">answer</span>: <span class="hljs-string">'goodbye'</span> }); <span class="hljs-comment">// 发送响应内容</span>
    }
    <span class="hljs-comment">// return true; // 如需异步调用sendResponse方法，需要显式返回true</span>
  }
);</code></pre>
<h5><strong>一次性消息通信API</strong></h5>
<p>上述涉及到的API语法如下：</p>
<ul><li><p><em>chrome.tabs.query(object queryInfo, function callback)</em>，查询符合条件的tab。其中，callback为查询结果的回调，默认传入tabs列表作为参数；queryInfo为标签页的描述信息，包含如下属性。</p></li></ul>
<table>
<thead><tr>
<th align="center">属性</th>
<th align="center">类型</th>
<th align="center">支持性</th>
<th align="center">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center">active</td>
<td align="center">boolean</td>
<td align="center"> </td>
<td align="center">tab是否激活</td>
</tr>
<tr>
<td align="center">audible</td>
<td align="center">boolean</td>
<td align="center">v45+</td>
<td align="center">tab是否允许声音播放</td>
</tr>
<tr>
<td align="center">autoDiscardable</td>
<td align="center">boolean</td>
<td align="center">v54+</td>
<td align="center">tab是否允许被丢弃</td>
</tr>
<tr>
<td align="center">currentWindow</td>
<td align="center">boolean</td>
<td align="center">v19+</td>
<td align="center">tab是否在当前窗口中</td>
</tr>
<tr>
<td align="center">discarded</td>
<td align="center">boolean</td>
<td align="center">v54+</td>
<td align="center">tab是否处于被丢弃状态</td>
</tr>
<tr>
<td align="center">highlighted</td>
<td align="center">boolean</td>
<td align="center"> </td>
<td align="center">tab是否高亮</td>
</tr>
<tr>
<td align="center">index</td>
<td align="center">Number</td>
<td align="center">v18+</td>
<td align="center">tab在窗口中的序号</td>
</tr>
<tr>
<td align="center">muted</td>
<td align="center">boolean</td>
<td align="center">v45+</td>
<td align="center">tab是否静音</td>
</tr>
<tr>
<td align="center">lastFocusedWindow</td>
<td align="center">boolean</td>
<td align="center">v19+</td>
<td align="center">tab是否位于最后选中的窗口中</td>
</tr>
<tr>
<td align="center">pinned</td>
<td align="center">boolean</td>
<td align="center"> </td>
<td align="center">tab是否固定</td>
</tr>
<tr>
<td align="center">status</td>
<td align="center">String</td>
<td align="center"> </td>
<td align="center">tab的状态，可选值为<code>loading</code>或<code>complete</code>
</td>
</tr>
<tr>
<td align="center">title</td>
<td align="center">String</td>
<td align="center"> </td>
<td align="center">tab中页面的标题（需要申请tabs权限）</td>
</tr>
<tr>
<td align="center">url</td>
<td align="center">String or Array</td>
<td align="center"> </td>
<td align="center">tab中页面的链接</td>
</tr>
<tr>
<td align="center">windowId</td>
<td align="center">Number</td>
<td align="center"> </td>
<td align="center">tab所处窗口的id</td>
</tr>
<tr>
<td align="center">windowType</td>
<td align="center">String</td>
<td align="center"> </td>
<td align="center">tab所处窗口的类型，值包含<code>normal</code>、<code>popup</code>、<code>panel</code>、<code>app</code>or<code>devtools</code>
</td>
</tr>
</tbody>
</table>
<p>注：丢弃的tab指的是tab内容已经从内存中卸载，但是tab未关闭。</p>
<ul>
<li><p><strong><em>chrome.tabs.sendMessage(integer tabId, any request, object options, function responseCallback)</em></strong>，向指定tab下的content.js发送单次消息。其中tabId为标签页的id，request为消息内容，options参数从v41版开始支持，通过它可以指定frameId的值，以便向指定的frame发送消息，responseCallback即收到响应后的回调。</p></li>
<li><p><strong><em>chrome.runtime.sendMessage(string extensionId, any message, object options, function responseCallback)</em></strong>，向扩展内或指定的其他扩展发送消息。其中extensionId为其他指定扩展的id，扩展内通信可以忽略该参数，message为消息内容，options参数从v32版开始支持，通过它可以指定includeTlsChannelId（boolean）的值，以便决定TLS通道ID是否会传递到onMessageExternal事件监听回调中，responseCallback即收到响应后的回调。</p></li>
<li><p><strong><em>chrome.runtime.onMessage.addListener(function callback)</em></strong>，添加单次消息通信的监听。其中callback类似function(any message, MessageSender sender, function sendResponse) {...}这种函数，message为消息内容，sender即消息发送者，sendResponse用于向消息发送者回复响应，如果需要异步发送响应，请在callback回调中return true（此时将保持消息通道不关闭直到sendResponse方法被调用）。</p></li>
</ul>
<p>综上，我们选用chrome.runtime api即可完美的进行消息通信，对于v25，甚至v20以下的版本，请参考以下兼容代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var callback = function(message, sender, sendResponse) {
  // Do something
});
var message = { message: 'hello' }; // message
if (chrome.extension.sendMessage) { // chrome20+
  var runtimeOrExtension = chrome.runtime &amp;&amp; chrome.runtime.sendMessage ? 'runtime' : 'extension';
  chrome[runtimeOrExtension].onMessage.addListener(callback); // bind event
  chrome[runtimeOrExtension].sendMessage(message); // send message
} else { // chrome19-
  chrome.extension.onRequest.addListener(callback); // bind event
  chrome.extension.sendRequest(message); // send message
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">message, sender, sendResponse</span>) </span>{
  <span class="hljs-comment">// Do something</span>
});
<span class="hljs-keyword">var</span> message = { <span class="hljs-attr">message</span>: <span class="hljs-string">'hello'</span> }; <span class="hljs-comment">// message</span>
<span class="hljs-keyword">if</span> (chrome.extension.sendMessage) { <span class="hljs-comment">// chrome20+</span>
  <span class="hljs-keyword">var</span> runtimeOrExtension = chrome.runtime &amp;&amp; chrome.runtime.sendMessage ? <span class="hljs-string">'runtime'</span> : <span class="hljs-string">'extension'</span>;
  chrome[runtimeOrExtension].onMessage.addListener(callback); <span class="hljs-comment">// bind event</span>
  chrome[runtimeOrExtension].sendMessage(message); <span class="hljs-comment">// send message</span>
} <span class="hljs-keyword">else</span> { <span class="hljs-comment">// chrome19-</span>
  chrome.extension.onRequest.addListener(callback); <span class="hljs-comment">// bind event</span>
  chrome.extension.sendRequest(message); <span class="hljs-comment">// send message</span>
}</code></pre>
<h5><strong>长期连接消息通信</strong></h5>
<p>想必，一次性的消息通信你已经驾轻就熟了。如果是频繁的通信呢？此时，一次性的消息通信就显得有些复杂。为了满足这种频繁通信的需要，Chrome浏览器专门提供了<code>Chrome.runtime.connect</code> API。基于它，通信的双方就可以建立长期的连接。</p>
<p>长期连接基本规律如下所示：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e6eaab094f?w=1414&amp;h=548&amp;f=png&amp;s=95420" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e6eaab094f?w=1414&amp;h=548&amp;f=png&amp;s=95420" alt="一次性消息通信图示" title="一次性消息通信图示" style="cursor: pointer;"></span></p>
<p>以上，与上述一次性消息通信一样，长期连接也可以在popup.html、background.js 和 content.js三者中两两之间建立（注意：无论何时主动与content.js建立连接，都需要指定tabId）。如下是popup.html与content.js之间建立长期连接的举例?。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// popup.html 发起长期连接
chrome.tabs.query(
  {active: true, currentWindow: true}, // 获取当前窗口的激活tab
  function(tabs) {
    // 建立连接，如果是与background.js建立连接，应该使用chrome.runtime.connect api
    var port = chrome.tabs.connect( // 返回Port对象
      tabs[0].id, // 指定tabId
      {name: 'call2content.js'} // 连接名称
    );
    port.postMessage({ greeting: 'Hello' }); // 发送消息
    port.onMessage.addListener(function(msg) { // 监听消息
      if (msg.say == 'Hello, who\'s there?') {
        port.postMessage({ say: 'Louis' });
      } else if (msg.say == &quot;Oh, Louis, how\'s it going?&quot;) {
        port.postMessage({ say: 'It\'s going well, thanks. How about you?' });
      } else if (msg.say == &quot;Not good, can you lend me five bucks?&quot;) {
        port.postMessage({ say: 'What did you say? Inaudible? The signal was terrible' });
        port.disconnect(); // 断开长期连接
      }
    });
  }
);

// content.js 监听并响应长期连接
chrome.runtime.onConnect.addListener(function(port) { // 监听长期连接，默认传入Port对象
  console.assert(port.name == &quot;call2content.js&quot;); // 筛选连接名称
  console.group('Long-lived connection is established, sender:' + JSON.stringify(port.sender));
  port.onMessage.addListener(function(msg) {
    var word;
    if (msg.greeting == 'Hello') {
      word = 'Hello, who\'s there?';
      port.postMessage({ say: word });
    } else if (msg.say == 'Louis') {
      word = 'Oh, Louis, how\'s it going?';
      port.postMessage({ say: word });
    } else if (msg.say == 'It\'s going well, thanks. How about you?') {
      word = 'Not good, can you lend me five bucks?';
      port.postMessage({ say: word });
    } else if (msg.say == 'What did you say? Inaudible? The signal was terrible') {
      word = 'Don\'t hang up!';
      port.postMessage({ say: word });
    }
    console.log(msg);
    console.log(word);
  });
  port.onDisconnect.addListener(function(port) { // 监听长期连接的断开事件
    console.groupEnd();
    console.warn(port.name + ': The phone went dead');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// popup.html 发起长期连接</span>
chrome.tabs.query(
  {<span class="hljs-attr">active</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">currentWindow</span>: <span class="hljs-literal">true</span>}, <span class="hljs-comment">// 获取当前窗口的激活tab</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{
    <span class="hljs-comment">// 建立连接，如果是与background.js建立连接，应该使用chrome.runtime.connect api</span>
    <span class="hljs-keyword">var</span> port = chrome.tabs.connect( <span class="hljs-comment">// 返回Port对象</span>
      tabs[<span class="hljs-number">0</span>].id, <span class="hljs-comment">// 指定tabId</span>
      {<span class="hljs-attr">name</span>: <span class="hljs-string">'call2content.js'</span>} <span class="hljs-comment">// 连接名称</span>
    );
    port.postMessage({ <span class="hljs-attr">greeting</span>: <span class="hljs-string">'Hello'</span> }); <span class="hljs-comment">// 发送消息</span>
    port.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{ <span class="hljs-comment">// 监听消息</span>
      <span class="hljs-keyword">if</span> (msg.say == <span class="hljs-string">'Hello, who\'s there?'</span>) {
        port.postMessage({ <span class="hljs-attr">say</span>: <span class="hljs-string">'Louis'</span> });
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.say == <span class="hljs-string">"Oh, Louis, how\'s it going?"</span>) {
        port.postMessage({ <span class="hljs-attr">say</span>: <span class="hljs-string">'It\'s going well, thanks. How about you?'</span> });
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.say == <span class="hljs-string">"Not good, can you lend me five bucks?"</span>) {
        port.postMessage({ <span class="hljs-attr">say</span>: <span class="hljs-string">'What did you say? Inaudible? The signal was terrible'</span> });
        port.disconnect(); <span class="hljs-comment">// 断开长期连接</span>
      }
    });
  }
);

<span class="hljs-comment">// content.js 监听并响应长期连接</span>
chrome.runtime.onConnect.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port</span>) </span>{ <span class="hljs-comment">// 监听长期连接，默认传入Port对象</span>
  <span class="hljs-built_in">console</span>.assert(port.name == <span class="hljs-string">"call2content.js"</span>); <span class="hljs-comment">// 筛选连接名称</span>
  <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'Long-lived connection is established, sender:'</span> + <span class="hljs-built_in">JSON</span>.stringify(port.sender));
  port.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-keyword">var</span> word;
    <span class="hljs-keyword">if</span> (msg.greeting == <span class="hljs-string">'Hello'</span>) {
      word = <span class="hljs-string">'Hello, who\'s there?'</span>;
      port.postMessage({ <span class="hljs-attr">say</span>: word });
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.say == <span class="hljs-string">'Louis'</span>) {
      word = <span class="hljs-string">'Oh, Louis, how\'s it going?'</span>;
      port.postMessage({ <span class="hljs-attr">say</span>: word });
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.say == <span class="hljs-string">'It\'s going well, thanks. How about you?'</span>) {
      word = <span class="hljs-string">'Not good, can you lend me five bucks?'</span>;
      port.postMessage({ <span class="hljs-attr">say</span>: word });
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.say == <span class="hljs-string">'What did you say? Inaudible? The signal was terrible'</span>) {
      word = <span class="hljs-string">'Don\'t hang up!'</span>;
      port.postMessage({ <span class="hljs-attr">say</span>: word });
    }
    <span class="hljs-built_in">console</span>.log(msg);
    <span class="hljs-built_in">console</span>.log(word);
  });
  port.onDisconnect.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port</span>) </span>{ <span class="hljs-comment">// 监听长期连接的断开事件</span>
    <span class="hljs-built_in">console</span>.groupEnd();
    <span class="hljs-built_in">console</span>.warn(port.name + <span class="hljs-string">': The phone went dead'</span>);
  });
});</code></pre>
<p>控制台输出如下：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e7bbd4c1fe?w=1000&amp;h=291&amp;f=png&amp;s=95832" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e7bbd4c1fe?w=1000&amp;h=291&amp;f=png&amp;s=95832" alt="扩展内长期连接消息通信输出" title="扩展内长期连接消息通信输出" style="cursor: pointer;"></span></p>
<p>建立长期连接涉及到的API语法如下：</p>
<ul>
<li><p><em>chrome.tabs.connect(integer tabId, object connectInfo)</em>，与content.js建立长期连接。tabId为标签页的id，connectInfo为连接的配置信息，可以指定两个属性，分别为name和frameId。name属性指定连接的名称，frameId属性指定tab中唯一的frame去建立连接。</p></li>
<li><p><em>chrome.runtime.connect(string extensionId, object connectInfo)</em>，发起长期的连接。其中extensionId为扩展的id，connectInfo为连接的配置信息，目前可以指定两个属性，分别是name和includeTlsChannelId。name属性指定连接的名称，includeTlsChannelId属性从v32版本开始支持，表示TLS通道ID是否会传递到onConnectExternal的监听器中。</p></li>
<li><p><em>chrome.runtime.onConnect.addListener(function callback)</em>，监听长期连接的建立。callback为连接建立后的事件回调，该回调默认传入Port对象，通过Port对象可进行页面间的双向通信。Port对象结构如下：</p></li>
</ul>
<table>
<thead><tr>
<th align="center">属性</th>
<th align="center">类型</th>
<th align="center">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center">name</td>
<td align="center">String</td>
<td align="center">连接的名称</td>
</tr>
<tr>
<td align="center">disconnect</td>
<td align="center">Function</td>
<td align="center">立即断开连接（已经断开的连接再次调用没有效果，连接断开后将不会收到新的消息）</td>
</tr>
<tr>
<td align="center">onDisconnect</td>
<td align="center">Object</td>
<td align="center">断开连接时触发（可添加监听器）</td>
</tr>
<tr>
<td align="center">onMessage</td>
<td align="center">Object</td>
<td align="center">收到消息时触发（可添加监听器）</td>
</tr>
<tr>
<td align="center">postMessage</td>
<td align="center">Function</td>
<td align="center">发送消息</td>
</tr>
<tr>
<td align="center">sender</td>
<td align="center"><a href="https://developer.chrome.com/extensions/runtime#type-MessageSender" rel="nofollow noreferrer" target="_blank">MessageSender</a></td>
<td align="center">连接的发起者（该属性只会出现在连接监听器中，即onConnect 或onConnectExternal中）</td>
</tr>
</tbody>
</table>
<h4><strong>扩展程序间消息通信</strong></h4>
<p>相对于扩展内部的消息通信而言，扩展间的消息通信更加简单。对于一次性消息通信，共涉及到如下两个API：</p>
<ul>
<li><p><strong>chrome.runtime.sendMessage</strong>，之前讲过，需要特别指定第一个参数extensionId，其它不变。</p></li>
<li><p><strong>chrome.runtime.onMessageExternal</strong>，监听其它扩展的消息，用法与chrome.runtime.onMessage一致。</p></li>
</ul>
<p>对于长期连接消息通信，共涉及到如下两个API：</p>
<ul>
<li><p><strong>chrome.runtime.connect</strong>，之前讲过，需要特别指定第一个参数extensionId，其它不变。</p></li>
<li><p><strong>chrome.runtime.onConnectExternal</strong>，监听其它扩展的消息，用法与chrome.runtime.onConnect一致。</p></li>
</ul>
<p>发送消息可参考如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var extensionId = &quot;oknhphbdjjokdjbgnlaikjmfpnhnoend&quot;; // 目标扩展id
// 发起一次性消息通信
chrome.runtime.sendMessage(extensionId, { message: 'hello' }, function(response) {
  console.log(response);
});
// 发起长期连接消息通信
var port = chrome.runtime.connect(extensionId, {name: 'web-page-messages'});
port.postMessage({ greeting: 'Hello' });
port.onMessage.addListener(function(msg) {
  // 通信逻辑见『长期连接消息通信』popup.html示例代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> extensionId = <span class="hljs-string">"oknhphbdjjokdjbgnlaikjmfpnhnoend"</span>; <span class="hljs-comment">// 目标扩展id</span>
<span class="hljs-comment">// 发起一次性消息通信</span>
chrome.runtime.sendMessage(extensionId, { <span class="hljs-attr">message</span>: <span class="hljs-string">'hello'</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(response);
});
<span class="hljs-comment">// 发起长期连接消息通信</span>
<span class="hljs-keyword">var</span> port = chrome.runtime.connect(extensionId, {<span class="hljs-attr">name</span>: <span class="hljs-string">'web-page-messages'</span>});
port.postMessage({ <span class="hljs-attr">greeting</span>: <span class="hljs-string">'Hello'</span> });
port.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
  <span class="hljs-comment">// 通信逻辑见『长期连接消息通信』popup.html示例代码</span>
});</code></pre>
<p>监听消息可参考如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 监听一次性消息
chrome.runtime.onMessageExternal.addListener( function(request, sender, sendResponse) {
  console.group('simple request arrived');
  console.log(JSON.stringify(request));
  console.log(JSON.stringify(sender));
  sendResponse('bye');
});
// 监听长期连接
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == &quot;web-page-messages&quot;);
  console.group('Long-lived connection is established, sender:' + JSON.stringify(port.sender));
  port.onMessage.addListener(function(msg) {
    // 通信逻辑见『长期连接消息通信』content.js示例代码
  });
  port.onDisconnect.addListener(function(port) {
    console.groupEnd();
    console.warn(port.name + ': The phone went dead');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 监听一次性消息</span>
chrome.runtime.onMessageExternal.addListener( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, sender, sendResponse</span>) </span>{
  <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'simple request arrived'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(request));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(sender));
  sendResponse(<span class="hljs-string">'bye'</span>);
});
<span class="hljs-comment">// 监听长期连接</span>
chrome.runtime.onConnect.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port</span>) </span>{
  <span class="hljs-built_in">console</span>.assert(port.name == <span class="hljs-string">"web-page-messages"</span>);
  <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'Long-lived connection is established, sender:'</span> + <span class="hljs-built_in">JSON</span>.stringify(port.sender));
  port.onMessage.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
    <span class="hljs-comment">// 通信逻辑见『长期连接消息通信』content.js示例代码</span>
  });
  port.onDisconnect.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">port</span>) </span>{
    <span class="hljs-built_in">console</span>.groupEnd();
    <span class="hljs-built_in">console</span>.warn(port.name + <span class="hljs-string">': The phone went dead'</span>);
  });
});</code></pre>
<p>控制台输出如下：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86e87ec344fb?w=1200&amp;h=328&amp;f=png&amp;s=199979" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86e87ec344fb?w=1200&amp;h=328&amp;f=png&amp;s=199979" alt="扩展间消息通信输出" title="扩展间消息通信输出" style="cursor: pointer;"></span></p>
<h4><strong>Web页面与扩展间消息通信</strong></h4>
<p>除了扩展内部和扩展之间的通信，Web pages 也可以与扩展进行消息通信（单向）。这种通信方式与扩展间的通信非常相似，共需要如下三步便可以通信。</p>
<p>首先，manifest.json指定可接收页面的url规则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;externally_connectable&quot;: {
  &quot;matches&quot;: [&quot;https://developer.chrome.com/*&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"externally_connectable"</span>: {
  <span class="hljs-attr">"matches"</span>: [<span class="hljs-string">"https://developer.chrome.com/*"</span>]
}</code></pre>
<p>其次，Web pages 发送信息，比如说在 <a href="https://developer.chrome.com/extensions/messaging" rel="nofollow noreferrer" target="_blank">https://developer.chrome.com/...</a> 页面控制台执行以上『扩展程序间消息通信』小节——消息发送的语句。</p>
<p>最后，扩展监听消息，代码同以上『扩展程序间消息通信』小节——消息监听部分。</p>
<p>至此，扩展程序的消息通信聊得差不多了。基于以上内容，你完全可以自行封装一个message.js，用于简化消息通信。实际上，<a href="https://chrome.google.com/webstore/detail/iibolhpkjjmoepndefdmdlmbpfhlgjpl" rel="nofollow noreferrer" target="_blank">阅读模式</a>扩展程序就封装了一个<a href="https://github.com/Louiszhai/IHeader/blob/master/res/js/message.js" rel="nofollow noreferrer" target="_blank">message.js</a>，IHeader扩展中的消息通信便基于它。</p>
<h3 id="articleHeader10"><strong>设置快捷键</strong></h3>
<p>一般涉及到状态切换的，快捷键能有效提升使用体验。为此我也为IHeader添加了快捷键功能。</p>
<p>为扩展程序设置快捷键，共需要两步。</p>
<ol>
<li>
<p>manifest.json中添加commands声明（可以指定多个命令）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;commands&quot;: { // 命令
  &quot;toggle_status&quot;: { // 命令名称
    &quot;suggested_key&quot;: { // 指定默认的和各个平台上绑定的快捷键
      &quot;default&quot;: &quot;Alt+H&quot;, 
      &quot;windows&quot;: &quot;Alt+H&quot;,
      &quot;mac&quot;: &quot;Alt+H&quot;,
      &quot;chromeos&quot;: &quot;Alt+H&quot;,
      &quot;linux&quot;: &quot;Alt+H&quot;
    }, 
    &quot;description&quot;: &quot;Toggle IHeader&quot; // 命令的描述
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"commands"</span>: { // 命令
  <span class="hljs-attr">"toggle_status"</span>: { // 命令名称
    <span class="hljs-attr">"suggested_key"</span>: { // 指定默认的和各个平台上绑定的快捷键
      <span class="hljs-attr">"default"</span>: <span class="hljs-string">"Alt+H"</span>, 
      <span class="hljs-attr">"windows"</span>: <span class="hljs-string">"Alt+H"</span>,
      <span class="hljs-attr">"mac"</span>: <span class="hljs-string">"Alt+H"</span>,
      <span class="hljs-attr">"chromeos"</span>: <span class="hljs-string">"Alt+H"</span>,
      <span class="hljs-attr">"linux"</span>: <span class="hljs-string">"Alt+H"</span>
    }, 
    <span class="hljs-attr">"description"</span>: <span class="hljs-string">"Toggle IHeader"</span> // 命令的描述
  }
},</code></pre>
</li>
<li>
<p>background.js中添加命令的监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 监听快捷键 */
chrome.commands.onCommand.addListener(function(command) {
  if (command == &quot;toggle_status&quot;) { // 匹配命令名称
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // 查询当前激活tab
      var tab = tabs[0];
      tab &amp;&amp; TabControler(tab.id, tab.url).switchActive(); // 切换tab控制器的状态
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 监听快捷键 */</span>
chrome.commands.onCommand.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">command</span>) </span>{
  <span class="hljs-keyword">if</span> (command == <span class="hljs-string">"toggle_status"</span>) { <span class="hljs-comment">// 匹配命令名称</span>
    chrome.tabs.query({<span class="hljs-attr">active</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">currentWindow</span>: <span class="hljs-literal">true</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{ <span class="hljs-comment">// 查询当前激活tab</span>
      <span class="hljs-keyword">var</span> tab = tabs[<span class="hljs-number">0</span>];
      tab &amp;&amp; TabControler(tab.id, tab.url).switchActive(); <span class="hljs-comment">// 切换tab控制器的状态</span>
    });
  }
});</code></pre>
</li>
</ol>
<p>以上，按下<code>Alt+H</code>键，便可以切换IHeader扩展程序的监听状态了。</p>
<p>设置快捷键时，请注意Mac与Windows、linux等系统的差别，Mac既有<code>Ctrl</code>键又有<code>Command</code>键。另外，若设置的快捷键与Chrome的默认快捷键冲突，那么设置将静默失败，因此请记得绕过以下Chrome快捷键（KeyCue是查看快捷键的应用，请忽略之）。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86eb5d677c17?w=912&amp;h=461&amp;f=png&amp;s=199419" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86eb5d677c17?w=912&amp;h=461&amp;f=png&amp;s=199419" alt="Chrome快捷键" title="Chrome快捷键" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11"><strong>添加右键菜单</strong></h3>
<p>除了快捷键外，还可以为扩展程序添加右键菜单，如IHeader的右键菜单。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86ecfc4130f1?w=250&amp;h=367&amp;f=gif&amp;s=146873" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86ecfc4130f1?w=250&amp;h=367&amp;f=gif&amp;s=146873" alt="IHeader右键菜单演示" title="IHeader右键菜单演示" style="cursor: pointer;"></span></p>
<p>为扩展程序添加右键菜单，共需要三步。</p>
<ol>
<li>
<p>申请菜单权限，需在manifest.json的permissions属性中添加"contextMenus"权限。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;permissions&quot;: [&quot;contextMenus&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"permissions"</span>: [<span class="hljs-string">"contextMenus"</span>]</code></pre>
</li>
<li>
<p>菜单需在background.js中手动创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.contextMenus.removeAll(); // 创建之前建议清空菜单
chrome.contextMenus.create({ // 创建右键菜单
  title: '切换Header监听模式', // 指定菜单名称
  id: 'contextMenu-0', // 指定菜单id
  contexts: ['all'] // 所有地方可见
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">chrome.contextMenus.removeAll(); <span class="hljs-comment">// 创建之前建议清空菜单</span>
chrome.contextMenus.create({ <span class="hljs-comment">// 创建右键菜单</span>
  title: <span class="hljs-string">'切换Header监听模式'</span>, <span class="hljs-comment">// 指定菜单名称</span>
  id: <span class="hljs-string">'contextMenu-0'</span>, <span class="hljs-comment">// 指定菜单id</span>
  contexts: [<span class="hljs-string">'all'</span>] <span class="hljs-comment">// 所有地方可见</span>
});</code></pre>
<p>由于<em>chrome.contextMenus.create(object createProperties, function callback)</em>方法默认返回新菜单的id，因此它通过回调（第二个参数callback）来告知是否创建成功，而第一个参数createProperties则为菜单项指定配置信息。</p>
</li>
<li>
<p>绑定右键菜单的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.contextMenus.onClicked.addListener(function (menu, tab){ // 绑定点击事件
  TabControler(tab.id, tab.url).switchActive(); // 切换扩展状态
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">chrome.contextMenus.onClicked.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">menu, tab</span>)</span>{ <span class="hljs-comment">// 绑定点击事件</span>
  TabControler(tab.id, tab.url).switchActive(); <span class="hljs-comment">// 切换扩展状态</span>
});</code></pre>
</li>
</ol>
<h3 id="articleHeader12"><strong>安装或更新</strong></h3>
<p>Chrome为扩展程序提供了丰富的API，比如说，你可以监听扩展安装或更新事件，进行一些初始化处理或给予友好的提示，如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 安装提示 */
chrome.runtime.onInstalled.addListener(function(data){
  if(data.reason == 'install' || data.reason == 'update'){
    chrome.tabs.query({}, function(tabs){
      tabs.forEach(function(tab){
        TabControler(tab.id).restore(); // 恢复所有tab的状态
      });
    });
    // 初始化时重启全局监听器 ...
    // 动态载入Notification js文件
    setTimeout(function(){
      var partMessage = data.reason == 'install' ? '安装成功' : '更新成功';
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        if (!/chrome:\/\//.test(tab.url)){ // 只能在url不是&quot;Chrome:// URL&quot;开头的页面注入内容脚本
          chrome.tabs.executeScript(tab.id, {file: 'res/js/notification.js'}, function(){
            chrome.tabs.executeScript(tab.id, {code: 'notification(&quot;IHeader'+ partMessage +'&quot;)'}, function(log){
              log[0] &amp;&amp; console.log('[Notification]: 成功弹出通知');
            });
          });
        } else {
          console.log('[Notification]: Cannot access a chrome:// URL');
        }
      });
    },1000); // 延迟1s的目的是为了调试时能够及时切换到其他的tab下，从而弹出Notification。
    console.log('[扩展]:', data.reason);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 安装提示 */</span>
chrome.runtime.onInstalled.addListener(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
  <span class="hljs-keyword">if</span>(data.reason == <span class="hljs-string">'install'</span> || data.reason == <span class="hljs-string">'update'</span>){
    chrome.tabs.query({}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>)</span>{
      tabs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>)</span>{
        TabControler(tab.id).restore(); <span class="hljs-comment">// 恢复所有tab的状态</span>
      });
    });
    <span class="hljs-comment">// 初始化时重启全局监听器 ...</span>
    <span class="hljs-comment">// 动态载入Notification js文件</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> partMessage = data.reason == <span class="hljs-string">'install'</span> ? <span class="hljs-string">'安装成功'</span> : <span class="hljs-string">'更新成功'</span>;
      chrome.tabs.query({<span class="hljs-attr">active</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">currentWindow</span>: <span class="hljs-literal">true</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tabs</span>) </span>{
        <span class="hljs-keyword">var</span> tab = tabs[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/chrome:\/\//</span>.test(tab.url)){ <span class="hljs-comment">// 只能在url不是"Chrome:// URL"开头的页面注入内容脚本</span>
          chrome.tabs.executeScript(tab.id, {<span class="hljs-attr">file</span>: <span class="hljs-string">'res/js/notification.js'</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            chrome.tabs.executeScript(tab.id, {<span class="hljs-attr">code</span>: <span class="hljs-string">'notification("IHeader'</span>+ partMessage +<span class="hljs-string">'")'</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">log</span>)</span>{
              log[<span class="hljs-number">0</span>] &amp;&amp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Notification]: 成功弹出通知'</span>);
            });
          });
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[Notification]: Cannot access a chrome:// URL'</span>);
        }
      });
    },<span class="hljs-number">1000</span>); <span class="hljs-comment">// 延迟1s的目的是为了调试时能够及时切换到其他的tab下，从而弹出Notification。</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[扩展]:'</span>, data.reason);
  }
});</code></pre>
<p>以上，<em>chrome.tabs.executeScript(integer tabId, object details)</em>接口，用于动态注入内容脚本，且只能在url不是"Chrome:// URL"开头的页面注入。其中tabId参数用于指定目标标签页的id，details参数用于指定内容脚本的路径或语句，它的file属性指定脚本路径，code属性指定动态语句。若分别往同一个标签页注入多个脚本或语句，这些注入的脚本或语句处于同一个沙盒，即全局变量可以共享。</p>
<p>notification.js如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function notification(message) {
  if (!('Notification' in window)) { // 判断浏览器是否支持Notification功能
    console.log('This browser does not support desktop notification');
  } else if (Notification.permission === &quot;granted&quot;) { // 判断是否授予通知的权限
    new Notification(message); // 创建通知
    return true;
  } else if (Notification.permission !== 'denied') { // 首次向用户申请权限
    Notification.requestPermission(function (permission) { // 申请权限
      if (permission === &quot;granted&quot;) { // 用户授予权限后, 弹出通知
        new Notification(message); // 创建通知
        return true;
      }
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notification</span>(<span class="hljs-params">message</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-string">'Notification'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>)) { <span class="hljs-comment">// 判断浏览器是否支持Notification功能</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'This browser does not support desktop notification'</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (Notification.permission === <span class="hljs-string">"granted"</span>) { <span class="hljs-comment">// 判断是否授予通知的权限</span>
    <span class="hljs-keyword">new</span> Notification(message); <span class="hljs-comment">// 创建通知</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (Notification.permission !== <span class="hljs-string">'denied'</span>) { <span class="hljs-comment">// 首次向用户申请权限</span>
    Notification.requestPermission(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">permission</span>) </span>{ <span class="hljs-comment">// 申请权限</span>
      <span class="hljs-keyword">if</span> (permission === <span class="hljs-string">"granted"</span>) { <span class="hljs-comment">// 用户授予权限后, 弹出通知</span>
        <span class="hljs-keyword">new</span> Notification(message); <span class="hljs-comment">// 创建通知</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      }
    });
  }
}</code></pre>
<p>最终弹出通知如下。</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86ed5f203654?w=646&amp;h=126&amp;f=png&amp;s=37805" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86ed5f203654?w=646&amp;h=126&amp;f=png&amp;s=37805" alt="Notification" title="Notification" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13"><strong>国际化</strong></h3>
<p>为了让全球都能使用你开发的扩展，国际化是必须的。从软件工程的角度讲，国际化就是将产品用户界面中可见的字符串全部存放在资源文件中，然后根据用户所处不同的语言环境，展示相应语言的视觉信息。Chrome从v17版本开始就提供了国际化标准API——chrome.i18n。i18n即internationalization（国际化），由于i和n中间共计18个字母，故简称为i18n。</p>
<p>Chrome扩展预留了_locales目录，用于存放多种语言版本的资源文件——message.json。目录结构为 "_locales/locales_code/message.json"，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_locales
|-- en
    |-- message.json
|-- zh_CN
    |-- message.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>_locales
<span class="hljs-string">|-- en</span>
    <span class="hljs-string">|-- message.json</span>
<span class="hljs-string">|-- zh_CN</span>
    <span class="hljs-string">|-- message.json</span></code></pre>
<p>locales_code不仅包含以上举例的en（英文）、zh_CN（简体中文）等，还包含全球多种其它语言，具体请参考<a href="https://developer.chrome.com/webstore/i18n?csw=1#localeTable" rel="nofollow noreferrer" target="_blank">Choosing locales to support</a>，对于不支持的locale，Chrome会自动忽略。</p>
<p>message.json资源文件如下所示，其中key为关键字，其message属性指定了它对应的值，description属性用于描述该key。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;key&quot;: {
    &quot;message&quot;: &quot;the value for the key&quot;,
    &quot;description&quot;: &quot;the description for the key&quot;
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"key"</span>: {
    <span class="hljs-attr">"message"</span>: <span class="hljs-string">"the value for the key"</span>,
    <span class="hljs-attr">"description"</span>: <span class="hljs-string">"the description for the key"</span>
  },
  ...
}</code></pre>
<p>根据i18n的官网文档</p>
<blockquote><p><strong>Important:</strong> If an extension has a <code>_locales</code> directory, the manifest <strong>must</strong> define "default_locale".</p></blockquote>
<p>一旦扩展中有了_locales目录，那么就必须要在manifest.json中指定"default_locale"，如下所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;default_locale&quot;: &quot;en&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"default_locale"</span>: <span class="hljs-string">"en"</span>,</code></pre>
<h4><strong>如何引用国际化字符串</strong></h4>
<ul>
<li>
<p>如需在manifest.json或CSS文件中引用一个名称为"key"的字符串，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__MSG_key__" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="hljs-strong">__MSG_key__</span></code></pre>
</li>
<li>
<p>如需在扩展程序的JS中引用key对应的字符串，则需要借助<em>chrome.i18n.getMessage(string messageName, any substitutions)</em>这个API。其中messageName指的是信息的关键字（key），substitutions数组用于存放字符串待替换字符对应的值（该参数可选，且最多不超过9个替换值）。使用如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.i18n.getMessage(&quot;key&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">chrome.i18n.getMessage(<span class="hljs-string">"key"</span>);</code></pre>
<p>如果获取不到key对应的值，chrome.i18n.getMessage将返回空字符串<code>""</code>；若messageName不是字符串或者substitutions数组长度超过9，那么该方法将返回<code>undefined</code>。</p>
<p>那么，如何为message.json添加含有占位符的字符串呢？如下就以IHeader中message.json的代码做测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;iconTips&quot;: {
  &quot;message&quot;: &quot;进入Header监听模式 $a$ $b$&quot;,
  &quot;placeholders&quot;: {
    &quot;a&quot;: {
      &quot;content&quot;: &quot;$1&quot;
    },
    &quot;b&quot;: {
      &quot;content&quot;: &quot;$2&quot;
    }
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"iconTips"</span>: {
  <span class="hljs-attr">"message"</span>: <span class="hljs-string">"进入Header监听模式 $a$ $b$"</span>,
  <span class="hljs-attr">"placeholders"</span>: {
    <span class="hljs-attr">"a"</span>: {
      <span class="hljs-attr">"content"</span>: <span class="hljs-string">"$1"</span>
    },
    <span class="hljs-attr">"b"</span>: {
      <span class="hljs-attr">"content"</span>: <span class="hljs-string">"$2"</span>
    }
  }
},</code></pre>
<p>如上，占位符格式为<code>$key$</code>，<code>$key$</code>为字符串待注入标示, key是注入点名称，它需要在placeholders配置中指定第几个substitutions的值注入到这里。如上所述，注入点<code>a</code>的内容指定为<code>$1</code>，即第一个替换的值注入到<code>a</code>所在的位置，注入点<code>b</code>的内容指定为<code>$2</code>，即第二个替换的值注入到<code>b</code>所在的位置，以此类推。</p>
<p>实际上，我们有如下两种方式去注入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 替换注入点a为&quot;apple&quot;，如果只是替换一个占位点的话，传入数组或字符串都行
chrome.i18n.getMessage('iconTips', 'apple'); 
chrome.i18n.getMessage('iconTips', ['apple']);

// 替换注入点a为&quot;apple&quot;，替换b为&quot;oranges&quot;，对于两个或以上的点位的替换，substitutions类型只能为数组
chrome.i18n.getMessage('iconTips', ['apple', 'oranges']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 替换注入点a为"apple"，如果只是替换一个占位点的话，传入数组或字符串都行</span>
chrome.i18n.getMessage(<span class="hljs-string">'iconTips'</span>, <span class="hljs-string">'apple'</span>); 
chrome.i18n.getMessage(<span class="hljs-string">'iconTips'</span>, [<span class="hljs-string">'apple'</span>]);

<span class="hljs-comment">// 替换注入点a为"apple"，替换b为"oranges"，对于两个或以上的点位的替换，substitutions类型只能为数组</span>
chrome.i18n.getMessage(<span class="hljs-string">'iconTips'</span>, [<span class="hljs-string">'apple'</span>, <span class="hljs-string">'oranges'</span>]);</code></pre>
</li>
</ul>
<p>实际效果如图：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86ed7de6a4c9?w=357&amp;h=72&amp;f=gif&amp;s=96143" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86ed7de6a4c9?w=357&amp;h=72&amp;f=gif&amp;s=96143" alt="通过占位符注入内容" title="通过占位符注入内容" style="cursor: pointer;"></span></p>
<p>以上引用过程，如下所示（图片来自MDN）：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2017/11/14/15fb86edb06f143b?w=782&amp;h=228&amp;f=gif&amp;s=16256" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2017/11/14/15fb86edb06f143b?w=782&amp;h=228&amp;f=gif&amp;s=16256" alt="国际化字符串引用图示" title="国际化字符串引用图示" style="cursor: pointer;"></span></p>
<h4><strong>预定义消息</strong></h4>
<p>以上，提供了这些API还不够，国际化系统还提供了一些预定义的消息，它们如下。</p>
<table>
<thead><tr>
<th align="center">Message Name</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">@@extension_id</td>
<td>扩展ID，可用于拼接链接，即使没有国际化的扩展也可用，注意不能用于manifest.json文件。</td>
</tr>
<tr>
<td align="center">@@ui_locale</td>
<td>当前语言，可用于拼接本地化的链接。</td>
</tr>
<tr>
<td align="center">@@bidi_dir</td>
<td>当前语言的文字方向，包含<code>ltr</code>、<code>rtl</code>，分别为从左到右、从右到左。</td>
</tr>
<tr>
<td align="center">@@bidi_reversed_dir</td>
<td>若@@bidi_dir值为<code>ltr</code>，则它的值为<code>rtl</code>，否则为<code>ltr</code>
</td>
</tr>
<tr>
<td align="center">@@bidi_start_edge</td>
<td>若@@bidi_dir值为<code>rtl</code>，则它的值为<code>left</code>，否则为<code>right</code>
</td>
</tr>
<tr>
<td align="center">@@bidi_end_edge</td>
<td>若@@bidi_dir值为<code>ltr</code>，则它的值为<code>right</code>，否则为<code>left</code>
</td>
</tr>
</tbody>
</table>
<p>预定义的消息可在Chrome扩展的JavaScript和CSS中使用，如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var extensionId = chrome.i18n.getMessage('@@extension_id');
location.href = 'chrome-extension://' + extensionId + '/res/options.html';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> extensionId = chrome.i18n.getMessage(<span class="hljs-string">'@@extension_id'</span>);
location.href = <span class="hljs-string">'chrome-extension://'</span> + extensionId + <span class="hljs-string">'/res/options.html'</span>;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  direction: __MSG_@@bidi_dir__;
  background-image:url('chrome-extension://__MSG_@@extension_id__/background.png');
}
div {
  padding-__MSG_@@bidi_start_edge__: 5px;
  padding-__MSG_@@bidi_end_edge__: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">direction</span>: __MSG_@@bidi_dir__;
  <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">'chrome-extension://__MSG_@@extension_id__/background.png'</span>);
}
<span class="hljs-selector-tag">div</span> {
  padding-__MSG_@@<span class="hljs-attribute">bidi_start_edge__</span>: <span class="hljs-number">5px</span>;
  padding-__MSG_@@<span class="hljs-attribute">bidi_end_edge__</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<h4>其它国际化API</h4>
<p>除了chrome.i18n.getMessage外，还有另外三个API。</p>
<ul>
<li>
<p>getAcceptLanguages，获取浏览器可接受的语言列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.i18n.getAcceptLanguages(function(languageArray){
    console.log(languageArray);
});
// 由于IHeader只支持中文和英文，故输出 [&quot;zh-CN&quot;, &quot;zh&quot;, &quot;en&quot;, &quot;zh-TW&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">chrome.i18n.getAcceptLanguages(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">languageArray</span>)</span>{
    <span class="hljs-built_in">console</span>.log(languageArray);
});
<span class="hljs-comment">// 由于IHeader只支持中文和英文，故输出 ["zh-CN", "zh", "en", "zh-TW"]</span></code></pre>
</li>
<li>
<p>getUILanguage，获取浏览器用户界面的语言（从Chrome v35起支持）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.i18n.getUILanguage(); // &quot;zh-CN&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">chrome.i18n.getUILanguage(); <span class="hljs-comment">// "zh-CN"</span></code></pre>
</li>
<li>
<p>detectLanguage，使用CLD检测文本对应的语言。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome.i18n.detectLanguage('你好nihaoこんにちは how are you', function(result){
  console.log(result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">chrome.i18n.detectLanguage(<span class="hljs-string">'你好nihaoこんにちは how are you'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
  <span class="hljs-built_in">console</span>.log(result);
});</code></pre>
<p>输出如下图：</p>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVYzFO" src="https://static.alili.tech/img/bVYzFO" alt="chrome.i18n.detectLanguage" title="chrome.i18n.detectLanguage" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader14"><strong>Chrome扩展开发的心得</strong></h3>
<p>到目前为止，IHeader是我业余开发时间最长的一款Chrome扩展。从今年的5月8号始，到6月14号，第一版才完工，然后又经过7月、8月近两个月的陆续修改，最终v1.1.0版才成型，这才达到了我最初的开发初衷。</p>
<p>现在网络上流传的各种扩展开发教程非常之多，甚至API翻译的网站也很多，就我所知道的至少有这些：</p>
<ul>
<li><p><a href="http://open.chrome.360.cn/extension_dev/overview.html" rel="nofollow noreferrer" target="_blank">360--扩展开发文档</a></p></li>
<li><p><a href="https://chajian.baidu.com/developer/extensions/api_index.html" rel="nofollow noreferrer" target="_blank">JavaScript API -百度浏览器应用开发文档</a></p></li>
<li><p><a href="http://www.ituring.com.cn/book/1421" rel="nofollow noreferrer" target="_blank">Chrome扩展及应用开发（首发版）</a></p></li>
<li><p><a href="http://www.cnblogs.com/champagne/tag/Google%20Chrome%E6%89%A9%E5%B1%95/" rel="nofollow noreferrer" target="_blank">Chrome扩展开发极客</a></p></li>
</ul>
<p>通过查看这些资源，基本上就能快速上手Chrome扩展开发。</p>
<p>当然，教程再完善也不及官方文档，开发过程中，最难过的就是Chrome开发者网站连接不稳定，经常无法访问（即使自带梯子），因此查看官方网站的资料有些困难，这点比较影响开发进度，所以本文有意多介绍了一些Chrome API的用法。另外，开发好的扩展发布过程中也需要注意两点：</p>
<ol>
<li><p>注册Chrome开发者需要5$，亲测浦发的visa信用卡可以支付，没有网上讲的那么复杂。</p></li>
<li><p>发布的扩展，为方便用户查看，需要完善的文档。由于Chrome webstore的扩展面向全球用户，所以文档至少要支持两种语言：中文和英文。</p></li>
</ol>
<p>总之，Chrome扩展，万变不离其宗，无论扩展多么神奇和强大，最终都是通过HTML、CSS、JS来实现功能，脱离不了Web的小天地。因此理论上，只要你会写JS，就完全可以开发Chrome扩展。甚至，连第一个Demo，Chrome都帮你写好了，下载并安装<a href="https://developer.chrome.com/extensions/samples" rel="nofollow noreferrer" target="_blank">Sample Extensions - Google Chrome</a>网站的随意一个扩展源码，修修改改你就能运行属于自己的扩展了。</p>
<p>当然，一个好的扩展应该是对工作或生活有帮助的。只要你抓住痛点，用心实现功能，利用业余时间开发出一个强大的扩展自然不是问题。</p>
<h3 id="articleHeader15"><strong>小结</strong></h3>
<p>至此，Chrome扩展有关的介绍差不多了，让我们来看看IHeader的效果。借助IHeader扩展程序，我去掉了 www.google.com 网站response的<code>X-Frame-Options</code>字段，终于解决了文章开头的难题，如下所示。</p>
<p><span class="img-wrap"><img data-src="/img/bVYzGa" src="https://static.alili.tech/img/bVYzGa" alt="定制response header" title="定制response header" style="cursor: pointer;"></span></p>
<p>安装好IHeader后，可以戳此链接<a href="http://louiszhai.github.io/res/search/index.html?q=123" rel="nofollow noreferrer" target="_blank">http://louiszhai.github.io/re...</a> ，试用IHeader。</p>
<p>不仅如此，IHeader还可以新增、删除或编辑任意指定url的请求响应头，并且即使浏览器重启后，全局监听器依然有效。它适合用于HTTP缓存研究，HTTP接口字段调试，甚至还可以为接口调试时的跨域问题提供临时的解决方案（笔者基于此完成了很多跨域接口的调试工作）。因此，只要您基于HTTP请求响应头去做事情，IHeader都可以帮您简化工作。至于如何使用，这里有一个<a href="https://github.com/Louiszhai/IHeader/blob/master/README_zh_CN.md#iheader" rel="nofollow noreferrer" target="_blank">IHeader-Guide</a>（由于网络原因，Chrome webstore上更新可能不及时，推荐安装Github上的IHeader源码）。</p>
<p>对Chrome扩展感兴趣的同学，欢迎来<a href="https://github.com/Louiszhai/IHeader/issues" rel="nofollow noreferrer" target="_blank">Github</a>学习交流扩展开发的经验。</p>
<p>本文以IHeader扩展程序为引，逐步讲解Chrome扩展程序的开发，涉及内容较多，难免有所疏漏，欢迎批评斧正，谢谢。</p>
<hr>
<p>版权声明：转载需注明作者和出处。</p>
<p>本文作者：<a href="https://github.com/Louiszhai" rel="nofollow noreferrer" target="_blank">louis</a></p>
<p>本文链接：<a href="http://louiszhai.github.io/2017/11/14/iheader/" rel="nofollow noreferrer" target="_blank">http://louiszhai.github.io/20...</a></p>
<p>相关文章</p>
<ul>
<li><p><a href="https://developer.chrome.com/extensions/" rel="nofollow noreferrer" target="_blank">JavaScript APIs - Google Chrome</a></p></li>
<li><p><a href="https://developer.chrome.com/extensions/messaging" rel="nofollow noreferrer" target="_blank">Message Passing - Google Chrome</a></p></li>
<li><p><a href="https://stackoverflow.com/questions/15718066/chrome-runtime-sendmessage-not-working-as-expected/15718294#15718294" rel="nofollow noreferrer" target="_blank">chromium - chrome.runtime.sendMessage not working as expected</a></p></li>
<li><p><a href="https://codereview.chromium.org/9965005/#ps3001" rel="nofollow noreferrer" target="_blank">Issue 9965005: Deprecate chrome.extension.sendRequest in favor of sendMessage, with a safer - Code Review</a></p></li>
<li><p><a href="http://www.cnblogs.com/champagne/p/4848520.html" rel="nofollow noreferrer" target="_blank">Chrome浏览器扩展开发系列之十三：消息传递Message</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Chrome扩展开发】定制HTTP请求响应头域

## 原文链接
[https://segmentfault.com/a/1190000011997656](https://segmentfault.com/a/1190000011997656)

