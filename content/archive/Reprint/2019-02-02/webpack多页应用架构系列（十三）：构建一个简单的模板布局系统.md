---
title: 'webpack多页应用架构系列（十三）：构建一个简单的模板布局系统' 
date: 2019-02-02 2:30:11
hidden: true
slug: 34la5juv27h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007159115"><code>https://segmentfault.com/a/1190000007159115</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>上文《webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板》我们基本上已经搞清楚如何利用<code>html-webpack-plugin</code>来生成HTML普通网页&amp;页面模板，本文将以我的脚手架项目<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank"><code>Array-Huang/webpack-seed</code></a>介绍如何在这基础上搭建一套简单的模板布局系统。</p>
<h2 id="articleHeader1">模板布局系统架构图</h2>
<p><span class="img-wrap"><img data-src="/img/bVEbW6?w=1051&amp;h=1005" src="https://static.alili.tech/img/bVEbW6?w=1051&amp;h=1005" alt="模板布局系统架构图" title="模板布局系统架构图" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">模板布局系统各部分详解</h2>
<p><a href="https://segmentfault.com/a/1190000007126268#articleHeader8">上文</a>我们说到，利用模板引擎&amp;模板文件，我们可以控制HTML的内容，但这种控制总体来说还是比较有限的，而且很大程度受限于你对该模板引擎的熟悉程度，那么，有没有更简单的方法呢？</p>
<p>有！我们可以就用我们最熟悉的<strong>js</strong>来肆意组装、拼接出我们想要的HTML！</p>
<p>首先来看一个上文提到的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin(
    title: '按照ejs模板生成出来的页面',
    filename: 'index.html',
    template: 'index.ejs',
  )],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> webpackConfig = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'index.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index_bundle.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [<span class="hljs-keyword">new</span> HtmlWebpackPlugin(
    title: <span class="hljs-string">'按照ejs模板生成出来的页面'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">'index.ejs'</span>,
  )],
};</code></pre>
<p>这个例子是给<code>html-webpack-plugin</code>指定一个名为<code>index.ejs</code>的ejs模板文件，来达到生成HTML页面文件的目的，从<a href="https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md" rel="nofollow noreferrer" target="_blank"><code>html-webpack-plugin</code>的文档</a>我们可以看出，除了默认支持的ejs外，其实还可以使用其它模板引擎（例如<code>jade</code>、<code>handlebars</code>、<code>underscore</code>）,支持的方法是在webpack配置文件中配置好相应的loader即可。</p>
<p>因此，我们可以推理出，<code>html-webpack-plugin</code>其实并不关心你用的是什么模板引擎，只要你的模板最后export出来的是一份完整的HTML代码（字符串）就可以了。于是，我做了一个大胆的尝试，给<code>html-webpack-plugin</code>的<code>template</code>参数指定一个js文件，然后在此js文件末尾export出一份完整的HTML代码来。这个js文件我命名为<strong>“模板接口”</strong>（上面架构图上有标识），意思是，不是光靠这一个js文件就能形成一份模板，“接口”之后是一套完整的<strong>模板布局体系</strong>。下面以webpack-seed项目里的<a href="https://github.com/Array-Huang/webpack-seed/tree/master/src/pages/alert/index" rel="nofollow noreferrer" target="_blank"><code>src/pages/alert/index</code></a>（“消息通知”页）作为例子进行说明。</p>
<h3 id="articleHeader3">
<code>html-webpack-plugin</code>配置</h3>
<p>先来看看我是如何给<code>html-webpack-plugin</code>指定一个js作为模板的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 
  这是用来生成alert/index页的HtmlWebpackPlugin配置
  在原项目中是循环批量new HtmlWebpackPlugin的，此处为了更容易理解，特别针对alert/index页做了修改
*/
new HtmlWebpackPlugin({
    filename: `alert/index/page.html`,
    template: path.resolve(dirVars.pagesDir, `./alert/index/html.js`), // 指定为一个js文件而非普通的模板文件
    chunks: ['alert/index', 'commons'], // 自动加载上index/login的入口文件以及公共chunk
    hash: true, // 为静态资源生成hash值
    xhtml: true,  // 需要符合xhtml的标准
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 
  这是用来生成alert/index页的HtmlWebpackPlugin配置
  在原项目中是循环批量new HtmlWebpackPlugin的，此处为了更容易理解，特别针对alert/index页做了修改
*/</span>
<span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">`alert/index/page.html`</span>,
    <span class="hljs-attr">template</span>: path.resolve(dirVars.pagesDir, <span class="hljs-string">`./alert/index/html.js`</span>), <span class="hljs-comment">// 指定为一个js文件而非普通的模板文件</span>
    chunks: [<span class="hljs-string">'alert/index'</span>, <span class="hljs-string">'commons'</span>], <span class="hljs-comment">// 自动加载上index/login的入口文件以及公共chunk</span>
    hash: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 为静态资源生成hash值</span>
    xhtml: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 需要符合xhtml的标准</span>
});</code></pre>
<h3 id="articleHeader4">模板接口</h3>
<p>下面来介绍这个作为模板接口的js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 选自webpack-seed/pages/alert/index/html.js  */
const content = require('./content.ejs');  // 调取存放本页面实际内容的模板文件
const layout = require('layout');  // 调用管理后台内部所使用的布局方案，我在webpack配置里定义其别名为'layout'
const pageTitle = '消息通知'; // 页面名称

// 给layout传入“页面名称”这一参数（当然有需要的话也可以传入其它参数），同时也传入页面实际内容的HTML字符串。content({ pageTitle })的意思就是把pageTitle作为模板变量传给ejs模板引擎并返回最终生成的HTML字符串。
module.exports = layout.init({ pageTitle }).run(content({ pageTitle })); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 选自webpack-seed/pages/alert/index/html.js  */</span>
<span class="hljs-keyword">const</span> content = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./content.ejs'</span>);  <span class="hljs-comment">// 调取存放本页面实际内容的模板文件</span>
<span class="hljs-keyword">const</span> layout = <span class="hljs-built_in">require</span>(<span class="hljs-string">'layout'</span>);  <span class="hljs-comment">// 调用管理后台内部所使用的布局方案，我在webpack配置里定义其别名为'layout'</span>
<span class="hljs-keyword">const</span> pageTitle = <span class="hljs-string">'消息通知'</span>; <span class="hljs-comment">// 页面名称</span>

<span class="hljs-comment">// 给layout传入“页面名称”这一参数（当然有需要的话也可以传入其它参数），同时也传入页面实际内容的HTML字符串。content({ pageTitle })的意思就是把pageTitle作为模板变量传给ejs模板引擎并返回最终生成的HTML字符串。</span>
<span class="hljs-built_in">module</span>.exports = layout.init({ pageTitle }).run(content({ pageTitle })); </code></pre>
<p>从代码里我们可以看出，模板接口的作用实际上就是整理好当前页面独有的内容，然后交与layout作进一步的渲染；另一方面，模板接口直接把layout最终返回的结果（完整的HTML文档）给export出来，供<code>html-webpack-plugin</code>生成HTML文件使用。</p>
<h3 id="articleHeader5">页面实际内容长啥样？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 选自webpack-seed/pages/alert/index/content.ejs -->
<div id=&quot;page-wrapper&quot;>
  <div class=&quot;container-fluid&quot; >
    <h2 class=&quot;page-header&quot;><%= pageTitle %></h2>
    <!-- ...... -->
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code class="ejs"><span class="xml"><span class="hljs-comment">&lt;!-- 选自webpack-seed/pages/alert/index/content.ejs --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"page-wrapper"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container-fluid"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-header"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> pageTitle </span><span class="xml"><span class="hljs-tag">%&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ...... --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEb3V?w=401&amp;h=750" src="https://static.alili.tech/img/bVEb3V?w=401&amp;h=750" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">layout</h3>
<p>接着我们来看看整套模板布局系统的核心——layout。layout的主要功能就是接收各个页面独有的参数（比如说页面名称），并将这些参数传入各个公共组件生成各组件的HTML，然后根据layout本身的模板文件将各组件的HTML以及页面实际内容的HTML拼接在一起，最终形成一个完整的HTML页面文档。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 选自webpack-seed/src/public-resource/layout/layout/html.js */
const config = require('configModule');
const noJquery = require('withoutJqueryModule');
const layout = require('./html.ejs'); // 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构
const header = require('../../components/header/html.ejs'); // 页头的模板
const footer = require('../../components/footer/html.ejs'); // 页脚的模板
const topNav = require('../../components/top-nav/html.ejs'); // 顶部栏的模板
const sideMenu = require('../../components/side-menu/html.ejs'); // 侧边栏的模板
const dirsConfig = config.DIRS;

/* 整理渲染公共部分所用到的模板变量 */
const pf = {
  pageTitle: '',
  constructInsideUrl: noJquery.constructInsideUrl,
};

const moduleExports = {
  /* 处理各个页面传入而又需要在公共区域用到的参数 */
  init({ pageTitle }) {
    pf.pageTitle = pageTitle; // 比如说页面名称，会在<title>或面包屑里用到
    return this;
  },

  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
  run(content) {
    const headerRenderData = Object.assign(dirsConfig, pf); // 页头组件需要加载css/js等，因此需要比较多的变量
    const renderData = {
      header: header(headerRenderData),
      footer: footer(),
      topNav: topNav(pf),
      sideMenu: sideMenu(pf),
      content,
    };
    return layout(renderData);
  },
};

module.exports = moduleExports;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 选自webpack-seed/src/public-resource/layout/layout/html.js */</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'configModule'</span>);
<span class="hljs-keyword">const</span> noJquery = <span class="hljs-built_in">require</span>(<span class="hljs-string">'withoutJqueryModule'</span>);
<span class="hljs-keyword">const</span> layout = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./html.ejs'</span>); <span class="hljs-comment">// 整个页面布局的模板文件，主要是用来统筹各个公共组件的结构</span>
<span class="hljs-keyword">const</span> header = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../components/header/html.ejs'</span>); <span class="hljs-comment">// 页头的模板</span>
<span class="hljs-keyword">const</span> footer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../components/footer/html.ejs'</span>); <span class="hljs-comment">// 页脚的模板</span>
<span class="hljs-keyword">const</span> topNav = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../components/top-nav/html.ejs'</span>); <span class="hljs-comment">// 顶部栏的模板</span>
<span class="hljs-keyword">const</span> sideMenu = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../components/side-menu/html.ejs'</span>); <span class="hljs-comment">// 侧边栏的模板</span>
<span class="hljs-keyword">const</span> dirsConfig = config.DIRS;

<span class="hljs-comment">/* 整理渲染公共部分所用到的模板变量 */</span>
<span class="hljs-keyword">const</span> pf = {
  <span class="hljs-attr">pageTitle</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">constructInsideUrl</span>: noJquery.constructInsideUrl,
};

<span class="hljs-keyword">const</span> moduleExports = {
  <span class="hljs-comment">/* 处理各个页面传入而又需要在公共区域用到的参数 */</span>
  init({ pageTitle }) {
    pf.pageTitle = pageTitle; <span class="hljs-comment">// 比如说页面名称，会在&lt;title&gt;或面包屑里用到</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  },

  <span class="hljs-comment">/* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */</span>
  run(content) {
    <span class="hljs-keyword">const</span> headerRenderData = <span class="hljs-built_in">Object</span>.assign(dirsConfig, pf); <span class="hljs-comment">// 页头组件需要加载css/js等，因此需要比较多的变量</span>
    <span class="hljs-keyword">const</span> renderData = {
      <span class="hljs-attr">header</span>: header(headerRenderData),
      <span class="hljs-attr">footer</span>: footer(),
      <span class="hljs-attr">topNav</span>: topNav(pf),
      <span class="hljs-attr">sideMenu</span>: sideMenu(pf),
      content,
    };
    <span class="hljs-keyword">return</span> layout(renderData);
  },
};

<span class="hljs-built_in">module</span>.exports = moduleExports;</code></pre>
<p>接下来看看layout本身的模板文件长啥样吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 选自webpack-seed/src/public-resource/layout/layout/html.ejs -->
<%= header %>
<div id=&quot;wrapper&quot;>
  <%= topNav %>
  <%= sideMenu %>
  <%= content %>
</div>
<%= footer %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code class="ejs"><span class="xml"><span class="hljs-comment">&lt;!-- 选自webpack-seed/src/public-resource/layout/layout/html.ejs --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> header </span><span class="xml"><span class="hljs-tag">%&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> topNav </span><span class="xml"><span class="hljs-tag">%&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> sideMenu </span><span class="xml"><span class="hljs-tag">%&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> content </span><span class="xml"><span class="hljs-tag">%&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> footer </span><span class="xml"><span class="hljs-tag">%&gt;</span></span></code></pre>
<h3 id="articleHeader7">组件</h3>
<p>整个页面的公共部分，被我以区域的形式切分成一个一个的组件，下面以页头组件作为例子进行解释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cmn-Hans&quot;>
<head>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot; />
  <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=UTF-8&quot; />
  <title><% if (pageTitle) { %> <%= pageTitle %> - <% } %> XXXX后台</title>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1,maximum-scale=1&quot; /> 
  <meta name=&quot;renderer&quot; content=&quot;webkit&quot; />

  <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;<%= BUILD_FILE.dll.css %>&quot;>
  <script type=&quot;text/javascript&quot; src=&quot;<%= BUILD_FILE.dll.js %>&quot;></script>
  <!--[if lt IE 10]>
    <script src=&quot;<%= BUILD_FILE.js.xdomain %>&quot; slave=&quot;<%= SERVER_API_URL %>cors-proxy.html&quot;></script>
    <script src=&quot;<%= BUILD_FILE.js.html5shiv %>&quot;></script>
  <![endif]-->
</head>
<body>
  <!--[if lt IE 9]>
    <script src=&quot;<%= BUILD_FILE.js.respond %>&quot;></script>
  <![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code class="ejs"><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cmn-Hans"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=UTF-8"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">if</span> (pageTitle) { </span><span class="xml"><span class="hljs-tag">%&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> pageTitle </span><span class="xml"><span class="hljs-tag">%&gt;</span> - <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span> XXXX后台<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1,maximum-scale=1"</span> /&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"renderer"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"webkit"</span> /&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> BUILD_FILE.dll.css </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> BUILD_FILE.dll.js </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-comment">&lt;!--[if lt IE 10]&gt;
    &lt;script src="&lt;%=</span></span><span class="ruby"> BUILD_FILE.js.xdomain </span><span class="xml"><span class="hljs-comment">%&gt;" slave="&lt;%=</span></span><span class="ruby"> SERVER_API_URL </span><span class="xml"><span class="hljs-comment">%&gt;cors-proxy.html"&gt;&lt;/script&gt;
    &lt;script src="&lt;%=</span></span><span class="ruby"> BUILD_FILE.js.html5shiv </span><span class="xml"><span class="hljs-comment">%&gt;"&gt;&lt;/script&gt;
  &lt;![endif]--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!--[if lt IE 9]&gt;
    &lt;script src="&lt;%=</span></span><span class="ruby"> BUILD_FILE.js.respond </span><span class="xml"><span class="hljs-comment">%&gt;"&gt;&lt;/script&gt;
  &lt;![endif]--&gt;</span></span></code></pre>
<p>页头组件控制的范围基本上就是整个&lt;head&gt;以及&lt;body&gt;的头部。</p>
<p>不要小看这<strong>&lt;body&gt;的头部</strong>，由于webpack在使用<code>extract-text-webpack-plugin</code>生成CSS文件并自动加载时，会把&lt;link&gt;放在&lt;head&gt;的最后，而众所周知，实现IE8下<strong>Media Queries</strong>特性的<code>respond.js</code>是需要放在css后面来加载的，因此，我们就只能把<code>respond.js</code>放到&lt;body&gt;的头部来加载了。</p>
<p>由于我的脚手架项目还是比较简单的，所以这些公共组件的HTML都是直接根据模板文件来输出的；如果组件本身要处理的逻辑比较多，可以使用跟<strong>模板接口</strong>一样的思路，利用js文件来拼接。</p>
<p>至于组件本身行为的逻辑(js)，可以一并放到各组件的目录里，在公共chunk里调用便是了。本文实际上只关注于如何生成HTML，这里提到这个只是提示一下组件的文件目录结构。</p>
<p>这里稍微再解释一下<code>BUILD_FILE.js.*</code>和<code>BUILD_FILE.dll.*</code>是什么，这些其实都是没有用webpack打包起来的js/css，我用file-loader把这些文件从src目录搬到build目录了，这里模板变量输出的都是搬运后的路径，具体请看<a href="https://segmentfault.com/a/1190000006907701#articleHeader7">《webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？》</a>。启动搬运的代码放在<a href="https://github.com/Array-Huang/webpack-seed/blob/master/src/public-resource/config/build-file.config.js" rel="nofollow noreferrer" target="_blank"><code>webpack-seed/src/public-resource/config/build-file.config.js</code></a>。</p>
<h2 id="articleHeader8">总结</h2>
<p>有了这套模板布局系统，我们就可以轻松地生成具有相同布局的多个静态页面了，<strong>“如何管理页面布局公共部分”</strong>这一多页应用的痛点也就顺利解决了。</p>
<h2 id="articleHeader9">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>（<code>https://github.com/Array-Huang/webpack-seed</code>）。</p>
<h2 id="articleHeader10">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？：<code>https://segmentfault.com/a/1190000006871991</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？:<code>https://segmentfault.com/a/1190000006887523</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？:<code>https://segmentfault.com/a/1190000006897458</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？:<code>https://segmentfault.com/a/1190000006907701</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？:<code>https://segmentfault.com/a/1190000006952432</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？:<code>https://segmentfault.com/a/1190000006992218</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码:<code>https://segmentfault.com/a/1190000007030775</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap:<code>https://segmentfault.com/a/1190000007043716</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译:<code>https://segmentfault.com/a/1190000007104372</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板:<code>https://segmentfault.com/a/1190000007126268</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统:<code>https://segmentfault.com/a/1190000007159115</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施:<code>https://segmentfault.com/a/1190000007301770</code></a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007159115"><code>https://segmentfault.com/a/1190000007159115</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（十三）：构建一个简单的模板布局系统

## 原文链接
[https://segmentfault.com/a/1190000007159115](https://segmentfault.com/a/1190000007159115)

