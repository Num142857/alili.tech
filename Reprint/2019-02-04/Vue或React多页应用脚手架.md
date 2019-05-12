---
title: 'Vue或React多页应用脚手架' 
date: 2019-02-04 2:30:58
hidden: true
slug: 6zw4e4s8ey9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>
<p>一直以来都在研究多页应用如何能有一套像SPA一样优雅的开发模式</p>
<p>本套架构在项目上使用感觉还不错（已跑在上百个页面的项目上），所以决定开源出来给大家</p>
<p>阅读完本文能实现在项目中使用ES6(7)+组件化（.vue | .jsx）开发多页应用</p>
<p>(其实我是想把它做为大家多页应用的脚手架)</p>
</blockquote>
<h2 id="articleHeader1">目录结构介绍</h2>
<blockquote><p>TIPS：任何的项目的架构都和目录结构有关，所以这部分非常重要，请仔细耐心阅读</p></blockquote>
<p>我们先宏观的看下结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- public // 生产环境下所需的文件
    |--- static
        |--- css
        |--- es6
        |--- fonts
        |--- images
    |--- views
|--- src
    |--- assets
        |--- fonts
        |--- images
    |--- components
    |--- js
    |--- sass
    |--- static
        |--- css
        |--- es6
        |--- fonts
        |--- images
    |--- views" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- public <span class="hljs-comment">// 生产环境下所需的文件</span>
    |--- <span class="hljs-keyword">static</span>
        |--- css
        |--- es6
        |--- fonts
        |--- images
    |--- views
|--- src
    |--- assets
        |--- fonts
        |--- images
    |--- components
    |--- js
    |--- sass
    |--- <span class="hljs-keyword">static</span>
        |--- css
        |--- es6
        |--- fonts
        |--- images
    |--- views</code></pre>
<p><code>src</code>里的<code>assets,components,js,sass</code>里的文件最后都会生成到<code>src/static</code>下，这个作为我们dev中引用的资源文件。而<code>public</code>不用说，是线上访问的文件。</p>
<hr>
<p>我们展开介绍下具体的页面应该如何对应它的资源。拿<code>js</code>和<code>views</code>为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- views
    |--- home // 官网介绍 业务模块
        |--- index.html
        ...
    |--- shopping // 购物业务模块
        |--- buy.html
        ...
|--- js
    |--- lib
        |--- vue.js
        |--- react.js
        |--- react.dom.js
        ...
    |--- home // 官网介绍业务模块的js
        |--- index.js
        ...
    |--- shopping // 购物业务模块的js
        |--- buy.js
        ...
    tools.js
    common.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- views
    |--- home <span class="hljs-comment">// 官网介绍 业务模块</span>
        |--- index.html
        ...
    |--- shopping <span class="hljs-comment">// 购物业务模块</span>
        |--- buy.html
        ...
|--- js
    |--- lib
        |--- vue.js
        |--- react.js
        |--- react.dom.js
        ...
    |--- home <span class="hljs-comment">// 官网介绍业务模块的js</span>
        |--- index.js
        ...
    |--- shopping <span class="hljs-comment">// 购物业务模块的js</span>
        |--- buy.js
        ...
    tools.js
    common.js</code></pre>
<p>在多页应用中，往往我们的页面以业务模块划分，业务模块由许多的页面组成。<br>如<code>home，shopping</code>，可能就分别为官网介绍和购物的业务模块。在这业务模块下，分别有许多个页面，那我们的js文件也需要命名一一对应。</p>
<p>当然，我们还有第三方的js库是不需要编译的，所以我们专门用一个<code>lib</code>文件夹来存放他们。(包括你自己编写的指令或者filter等，不需要编译的，也直接放在lib下引入即可)</p>
<p>另外，你还有许多自己写的需要编译的工具库直接放在<code>js</code>目录下即可(如，tools.js,common.js)</p>
<hr>
<p>我们的sass也是同理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- sass
    |--- home
        |--- index.scss
        ...
    |--- shopping
        |--- buy.scss
        ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- sass
    |--- home
        |--- index.scss
        ...
    |--- shopping
        |--- buy.scss
        ...</code></pre>
<p>他们编译在<code>static</code>下的文件将为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- static
    |--- css // scss 编译后的
        |--- home
            |--- index.css
        |--- shopping
            |--- buy.css
    |--- js // babel处理后的js
        |--- home
            |--- index.js
        |--- shopping
            |--- buy.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- <span class="hljs-keyword">static</span>
    |--- css <span class="hljs-comment">// scss 编译后的</span>
        |--- home
            |--- index.css
        |--- shopping
            |--- buy.css
    |--- js <span class="hljs-comment">// babel处理后的js</span>
        |--- home
            |--- index.js
        |--- shopping
            |--- buy.js</code></pre>
<p>页面引用的路径就为(home/index.html为例)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
<link rel=&quot;stylesheet&quot; href=&quot;../../static/css/home/index.css&quot;>

...

<script src=&quot;../../static/es6/lib/vue(react).js&quot;></script>
<script src=&quot;../../static/es6/lib/react.dom.js&quot;></script>
<script src=&quot;../../static/es6/home/index.js&quot;></script>
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">...
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../../static/css/home/index.css"</span>&gt;</span>

...

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../static/es6/lib/vue(react).js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../static/es6/lib/react.dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../static/es6/home/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
...</code></pre>
<hr>
<p>js和sass搞定了后，我们的难点是编写组件的过程中，如何知道应该编译哪个入口js文件呢？<br>所以我们需要对我们的组件名进行一些约定，这也就是约定大于配置的前提。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- components
    |--- home // home 业务模块
        |--- home-header.vue(jsx)
        |--- index-info.vue(jsx)
        ...
    |--- shopping  // shopping 业务模块
        |--- buy-list.vue(jsx)
        ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- components
    |--- home <span class="hljs-comment">// home 业务模块</span>
        |--- home-header.vue(jsx)
        |--- index-info.vue(jsx)
        ...
    |--- shopping  <span class="hljs-comment">// shopping 业务模块</span>
        |--- buy-list.vue(jsx)
        ...</code></pre>
<p>我们<code>components</code>下的业务模块名和之前的sass，js一样。具体组件那就有所不同。</p>
<p>我们分为几种类型的组件</p>
<blockquote><ul>
<li><p>一、当前页面使用的组件</p></li>
<li><p>二、当前业务模块下的公用组件</p></li>
<li><p>三、所有业务模块的通用组件</p></li>
</ul></blockquote>
<p>当前页面组件的命名，我们约定为  <code>[页面]-[组件].vue(jsx)</code></p>
<p>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- components
    |--- home
        |--- index-info.vue(jsx)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- components
    |--- home
        |--- index-info.vue(jsx)</code></pre>
<p>这个 <code>index-info</code> 的组件就仅仅只有在<code>home/index.html</code>页面下使用，当你修改了这个组件后，会自动编译<code>home/index.js</code>路口js文件并刷新页面。</p>
<p>当前业务模块下的公用组件，我们约定为 <code>[业务模块]-[组件].vue(jsx)</code></p>
<p>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- components
    |--- home
        |--- home-header.vue(jsx)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- components
    |--- home
        |--- home-header.vue(jsx)</code></pre>
<p>这个<code>home-header</code>组件就属于<code>home</code>业务模块下的公用组件，当你修改了这个组件后，会自动编译<code>home</code>业务模块下所有的js文件并刷新页面。</p>
<p>剩下的就是所有业务模块下的通用组件，我们约定全放在<code>components/common</code>目录下，不需要具体命名约定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- components
    |--- common
        |--- loading.vue(jsx)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">|--- components
    |--- common
        |--- loading.vue(jsx)</code></pre>
<p>这个<code>loading</code>组件就属于所有业务模块下的公用组件，当你修改了这个组件后，会自动编译所有业务模块下的js文件并刷新页面。</p>
<p>编译组件的原理以及为什么约定命名的原因是：</p>
<blockquote><p>我会根据组件更改变动，去读取文件夹名，组件名，并编译对应名的路口js</p></blockquote>
<p>至此，我们就把组件的问题也解决了</p>
<p>由于我采用的是主gulp辅webpack，webpack仅仅只编译用，所以编译基本达到秒编译。比单纯利用webpack做构建快得多。如果单纯采用webpack做构建，需要去配置entry，配置HTMLPlugin。所以会慢得多，然而我这一套并不需要如此繁琐。</p>
<h2 id="articleHeader2">图片&amp;&amp;字体文件</h2>
<blockquote><p>这其实是一个大坑</p></blockquote>
<p>我们的实现目标是<strong>组件能相对路径引入图片或字体文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如 在html标签里这样
<template>
    <figure>
        <img src=&quot;../../assets/images/home/logo.jpg&quot; alt=&quot;头像&quot;>
    </figure>
</template>

// 在style里这样
<style rel=&quot;stylesheet/scss&quot; lang=&quot;sass&quot;>
    @import &quot;../../sass/home/index-info&quot;;
    // 甚至可能在这@import面引入相对路径，这都会算是在组件里引入相对路径
    #bg h3 {
        background: url(&quot;../../assets/images/holmes.jpg&quot;);
        color: #fff;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 如 在html标签里这样</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">figure</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../assets/images/home/logo.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"头像"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="hljs-comment">// 在style里这样</span>
&lt;style rel=<span class="hljs-string">"stylesheet/scss"</span> lang=<span class="hljs-string">"sass"</span>&gt;
    @<span class="hljs-keyword">import</span> <span class="hljs-string">"../../sass/home/index-info"</span>;
    <span class="hljs-comment">// 甚至可能在这@import面引入相对路径，这都会算是在组件里引入相对路径</span>
    #bg h3 {
        <span class="hljs-attr">background</span>: url(<span class="hljs-string">"../../assets/images/holmes.jpg"</span>);
        color: #fff;
    }
&lt;<span class="hljs-regexp">/style&gt;</span></code></pre>
<p>这个坑，真是<strong>不可描述</strong>，我个人尝试了各种体位，才把这个坑配置好。</p>
<p>直接给大家看最后实现是怎样的。</p>
<blockquote><p><code>dev</code> 的路径是这样，页面可以显示图片或字体。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006789549" src="https://static.alili.tech/img/remote/1460000006789549" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p><code>build</code> 后的路径是这样</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006789550" src="https://static.alili.tech/img/remote/1460000006789550" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这样就达到了开发和发布后的资源统一，摸索这一步真是挺累的 T.T，有兴趣的自己看源码吧。</p>
<h2 id="articleHeader3">环境变量的配置</h2>
<blockquote><p>我们在webpack中经常会遇见不同环境下不同配置的问题</p></blockquote>
<p>首先可在<code>package.json</code>里配置一条<code>script</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
&quot;scripts&quot;: {
    &quot;build&quot;: &quot;NODE_ENV=production gulp build&quot;,
    &quot;dev&quot;: &quot;NODE_ENV=dev gulp reload&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// package.json</span>
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"NODE_ENV=production gulp build"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"NODE_ENV=dev gulp reload"</span>
},</code></pre>
<p>假设我们需要为不同环境配置不同的api请求地址,就可以利用我们在<code>package.json</code>设置的<code>NODE_ENV</code>来识别当前环境(这部分我在gulpfile中处理了，所以在文件里可直接识别NODE_ENV，如下)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  src/js/ajaxurl.js
 
const server1 = 'https://production.server.com';
const server2 = 'https://dev.server.com';

let useServer = null;
if(NODE_ENV === 'production') {
    useServer = server1;
} else if(NODE_ENV === 'dev') {
    useServer = server2;
}

export default useServer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//  src/js/ajaxurl.js</span>
 
<span class="hljs-keyword">const</span> server1 = <span class="hljs-string">'https://production.server.com'</span>;
<span class="hljs-keyword">const</span> server2 = <span class="hljs-string">'https://dev.server.com'</span>;

<span class="hljs-keyword">let</span> useServer = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">if</span>(NODE_ENV === <span class="hljs-string">'production'</span>) {
    useServer = server1;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(NODE_ENV === <span class="hljs-string">'dev'</span>) {
    useServer = server2;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> useServer;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/home/index.js

import url from '../ajaxurl';
console.log(url);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/js/home/index.js</span>

<span class="hljs-keyword">import</span> url <span class="hljs-keyword">from</span> <span class="hljs-string">'../ajaxurl'</span>;
<span class="hljs-built_in">console</span>.log(url);</code></pre>
<p>这样就解决了我们不同环境下不同配置的问题，我默认配置了<code>dev</code>和<code>production</code>，大家可以自行拓展。比如</p>
<p>假设你需要在 <strong>开发中</strong> 配置测试，你可以写一条<code>NODE_ENV=test gulp reload</code>。</p>
<p>如果需要 <strong>预发布打包</strong> 测试，就可以另一条<code>NODE_ENV=preproduction gulp build</code>。</p>
<p>总之就是打包使用<code>gulp build</code>，开发使用<code>gulp reload</code>。</p>
<h2 id="articleHeader4">注意事项</h2>
<p>开发：执行命令  <code>npm run dev</code><br>发布：执行命令 <code>npm run build</code> (BTW，别忘了去<code>gulpfile.js</code>里替换你的CDN链接，进入gulp文件修改 const CDN = 'yourCDNLink'这里的变量即可) </p>
<p>命名一定要按约定来！<br>命名一定要按约定来！<br>命名一定要按约定来！</p>
<p>否则不知道要编译谁！！！</p>
<p>gulp配置很简单，大家可以看一下针对各自项目进行修改，不懂得可以直接问我。</p>
<p>如果你们不完全的前后端分离，把这个src直接放在后台目录下也没有问题。</p>
<p>写vue和react都没问题，我把示例demo都写好了，下面是分别两个的repo地址。</p>
<p>vue-multpage : <a href="https://github.com/MeCKodo/vue-multipage" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo/vue-multipage</a></p>
<p>react-multpage : <a href="https://github.com/MeCKodo/react-multipage" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo/react-multipage</a></p>
<h2 id="articleHeader5">TODO</h2>
<ul>
<li><p>[ ] 项目的Unit test</p></li>
<li><p>[ ] 项目Cli脚手架</p></li>
</ul>
<h2 id="articleHeader6">后话</h2>
<p>本来是想写成<code>vue-cli</code>或者是<code>create-react-app</code>这种cli脚手架的，但是！本人真是太懒又没有时间了！ 各位看官可以先尝试clone把玩把玩，如果有足够多人喜欢，我就把他写成cli，发布npm :)</p>
<p>我是用mac下开发完成的，用了半天多时间专门去给window写了兼容，window还可能会有bug，不是我说！<strong>window就是辣鸡！</strong></p>
<p>最后给大家看下我们的某项目结构。</p>
<hr>
<p><strong>总览</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000006789551" src="https://static.alili.tech/img/remote/1460000006789551" alt="总览" title="总览" style="cursor: pointer;"></span></p>
<p><strong>js部分</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000006789552" src="https://static.alili.tech/img/remote/1460000006789552" alt="js部分" title="js部分" style="cursor: pointer;"></span></p>
<p><strong>sass部分</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000006789553" src="https://static.alili.tech/img/remote/1460000006789553" alt="sass部分" title="sass部分" style="cursor: pointer; display: inline;"></span></p>
<p><strong>组件和页面</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000006789554" src="https://static.alili.tech/img/remote/1460000006789554" alt="组件和页面" title="组件和页面" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>Have a nice day</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue或React多页应用脚手架

## 原文链接
[https://segmentfault.com/a/1190000006789546](https://segmentfault.com/a/1190000006789546)

