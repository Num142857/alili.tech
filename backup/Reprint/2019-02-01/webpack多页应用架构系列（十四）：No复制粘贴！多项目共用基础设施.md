---
title: 'webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施' 
date: 2019-02-01 2:30:10
hidden: true
slug: cev3tal9sj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007301770"><code>https://segmentfault.com/a/1190000007301770</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>本文介绍如何在多项目间共用同一套<strong>基础设施</strong>，又或是某种层次的<strong>框架</strong>。</p>
<h3 id="articleHeader1">基础设施是什么？</h3>
<p>一个完整的网站，不可能只包含一个jQuery，或是某个MVVM框架，其中必定包含了许多解决方案，例如：如何上传？如何兼容IE？如何跨域？如何使用本地存储？如何做用户信息反馈？又或者具体到如何选择日期？等等等等……这里面必定包含了UI框架、JS框架、各种小工具库，不论是第三方的还是自己团队研发的。而以上所述的种种，就构成了一套完整的解决方案，也称<strong>基础设施</strong>。</p>
<p>基础设施有个重要的特征，那就是与业务逻辑无关，不论是OA还是CMS又或是CRM，只要整体产品形态类似，我们就可以使用同一套基础设施。</p>
<h3 id="articleHeader2">框架</h3>
<p>框架这个概念很泛，泛得让人心生困惑，但抽象出来说，框架就是一套定义代码在哪里写、怎么写的规则。不能说我们要怎么去<strong>用</strong>框架，反倒是框架<strong>控制</strong>我们怎么去<strong>填</strong>代码。</p>
<p>本系列前面的十来篇文章，分开来看是不同的<strong>点</strong>，但如果所有文章合起来，并连同示例项目（<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>），实际上阐述的就是一套完整的多页应用框架（或称架构）。这套框架规定了整个应用的方方面面，举几个例子：</p>
<ul>
<li>每个页面的文件放在哪个目录？</li>
<li>页面的HTML、入口文件、css、图片等等应该怎么放？</li>
<li>编码规范（由ESLint来保证）。</li>
</ul>
<p>当然，这只是我的框架，我希望你们可以看懂了，然后根据自己的需求来调整，变成<strong>你们的框架</strong>。甚至说，我自己在做不同类型的项目时，整体架构也都会有不少的变化。</p>
<h2 id="articleHeader3">为什么要共用基础设施/框架/架构？</h2>
<h3 id="articleHeader4">缘起</h3>
<p>数月前，我找同事要了一个他自己写的地区选择器，拉回来一看遍地都是ESLint的报错（他负责的项目没有用ESLint，比较随意），我这人有强迫症的怎么看得过眼，卷起袖子就开始改，改好也就正常使用了。过了一段时间，来了新需求，同事在他那改好了地区选择器又发了一份给我，我一看头都大了，又是满地报错，这不是又要我再改一遍吗？当时我就懵了，只好按着他的思路，对我的版本做了修改。从此，也确立了我们公司会有两份外观功能都一致，但是实现却不一样的地区选择器。</p>
<p>很坑爹是吧？</p>
<h3 id="articleHeader5">多项目共享架构变动</h3>
<p>上面说的是组件级的，下面我们来说架构级别的。</p>
<p>我在公司主要负责的项目有两个，在我的不懈努力下，已经做到跟我的脚手架项目<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>大体上同构了。但维持同构显然是要付出代价的，我在脚手架项目试验过的改进，小至改个目录路径，大至引入个plugin啊loader啊什么的，都要分别在公司的两个项目里各做一遍，超烦哒（嫌弃脸</p>
<p>试想只是两个项目就已经这样了，如果是三个、四个，甚至六个、七个呢？堪忧啊堪忧啊！</p>
<h3 id="articleHeader6">快速创建新项目</h3>
<p>不知道你们有没有这样子的经验：接到新项目时，灵机一动“这不就是我的XX项目吗？”，然后赶紧搬出XX项目的源码，然后删掉业务逻辑，保留可复用的基础设施。</p>
<p>也许你会说，这不已经比从零开始要好多了吗？总体上来说，是吧，但还不够好：</p>
<ul>
<li>你需要花时间重温整个项目的架构，搞清楚哪些要删、哪些要留。</li>
<li>毕竟是快刀斩乱麻，清理好的架构比不上原先的思路那么清晰。</li>
<li>清理完代码想着跑跑看，结果一大堆报错，一个一个来调烦的要命，而且还很可能是删错了什么了不得的东西，还要去原先额项目里搬回来。</li>
</ul>
<p>以上这些问题，你每创建一个新项目都要经历一遍，我问你怕了没有。</p>
<h4>脚手架不是可以帮助快速创建新项目吗？</h4>
<p>是的没错，脚手架本身就算是一整套基础设施了，但依然有下列问题：</p>
<ul>
<li>维护一套脚手架你知道有多麻烦吗？公司项目一忙起来，加班都做不完，哪顾得上脚手架啊。最后新建项目的时候发现脚手架已经落后N多了，你到底是用呢还是不用呢？</li>
<li>甭跟我提Github上开源的脚手架，像我这么有个性的人，会直接用那些<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">妖艳贱货</a>吗？</li>
<li>不同类型的项目技术选型不一样，比如说：需不需要兼容低版本IE；是web版的还是Hybrid App的；是前台还是后台。每一套技术选型就是一套脚手架，难道你要维护这么多套脚手架吗？</li>
</ul>
<h3 id="articleHeader7">上述问题，通过<strong>共用基础设施</strong>，都能解决</h3>
<ul>
<li>既然共用了基础设施，要怎么改肯定都是所有项目一起共享的了，不论是组件层面的还是架构本身。</li>
<li>假设你每个不同类型的项目都已经准备好了与其它项目共用基础设施，那么，你根本不需要花费多余的维护成本，创建新项目的时候看准了跟之前哪个项目是属于同一类型的，凑一脚就行了呗，轻松。</li>
</ul>
<h2 id="articleHeader8">怎么实现多项目共用一套基础设施呢？</h2>
<h3 id="articleHeader9">示例项目</h3>
<p>在之前的文章里，我使用的一直都是<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>这个脚手架项目作为示例，而为了实践<strong>多项目共用基础设施</strong>，我对该项目的架构做了较大幅度的调整，升级为<strong>2.0.0</strong>版本。为免大家看前面的文章时发现示例项目货不对板，感到困惑，我新开了一个repo来存放调整后的脚手架：<a href="https://github.com/Array-Huang/webpack-seed-v2" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed-v2</a>(<code>https://github.com/Array-Huang/webpack-seed-v2</code>)，并且，我在两个项目的README里我都注明了相应的内容，大家可不要混淆了哈。</p>
<p>下面就以从<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>到<a href="https://github.com/Array-Huang/webpack-seed-v2" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed-v2</a>的改造过程来介绍如何实现多项目共用基础设施。</p>
<h3 id="articleHeader10">改造思路</h3>
<p>改造思路其实很简单，就是<strong>把预想中多个项目都能用得上的部分从现有项目里抽离出来</strong>。</p>
<h3 id="articleHeader11">如何抽离</h3>
<p><strong>抽离</strong>的说法是针对原项目的，如果单纯从文件系统的角度来说，只不过是<strong>移动</strong>了某些文件和目录。</p>
<p>移动到哪里了呢？自然是移动到与项目目录同级的地方，这样就方便多个项目引用这个<strong>核心</strong>了。</p>
<p>如果你跟我一样，在原项目中定义了大量路径和alias的话，移动这些文件/目录就只是个改变量的活了：</p>
<p>选自<a href="https://github.com/Array-Huang/webpack-seed/blob/master/webpack-config/base/dir-vars.config.js" rel="nofollow noreferrer" target="_blank"><code>webpack-seed/webpack-config/base/dir-vars.config.js</code></a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var moduleExports = {};

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../'); // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src'); // 项目业务代码根目录
moduleExports.vendorDir = path.resolve(moduleExports.staticRootDir, './vendor'); // 存放所有不能用npm管理的第三方库
moduleExports.dllDir = path.resolve(moduleExports.srcRootDir, './dll'); // 存放由各种不常改变的js/css打包而来的dll
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.publicDir = path.resolve(moduleExports.srcRootDir, './public-resource'); // 存放各个页面使用到的公共资源
moduleExports.logicDir = path.resolve(moduleExports.publicDir, './logic'); // 存放公用的业务逻辑
moduleExports.libsDir = path.resolve(moduleExports.publicDir, './libs');  // 与业务逻辑无关的库都可以放到这里
moduleExports.configDir = path.resolve(moduleExports.publicDir, './config'); // 存放各种配置文件
moduleExports.componentsDir = path.resolve(moduleExports.publicDir, './components'); // 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
moduleExports.layoutDir = path.resolve(moduleExports.publicDir, './layout'); // 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路

// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './build'); // 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）

module.exports = moduleExports;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> moduleExports = {};

<span class="hljs-comment">// 源文件目录</span>
moduleExports.staticRootDir = path.resolve(__dirname, <span class="hljs-string">'../../'</span>); <span class="hljs-comment">// 项目根目录</span>
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, <span class="hljs-string">'./src'</span>); <span class="hljs-comment">// 项目业务代码根目录</span>
moduleExports.vendorDir = path.resolve(moduleExports.staticRootDir, <span class="hljs-string">'./vendor'</span>); <span class="hljs-comment">// 存放所有不能用npm管理的第三方库</span>
moduleExports.dllDir = path.resolve(moduleExports.srcRootDir, <span class="hljs-string">'./dll'</span>); <span class="hljs-comment">// 存放由各种不常改变的js/css打包而来的dll</span>
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, <span class="hljs-string">'./pages'</span>); <span class="hljs-comment">// 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等</span>
moduleExports.publicDir = path.resolve(moduleExports.srcRootDir, <span class="hljs-string">'./public-resource'</span>); <span class="hljs-comment">// 存放各个页面使用到的公共资源</span>
moduleExports.logicDir = path.resolve(moduleExports.publicDir, <span class="hljs-string">'./logic'</span>); <span class="hljs-comment">// 存放公用的业务逻辑</span>
moduleExports.libsDir = path.resolve(moduleExports.publicDir, <span class="hljs-string">'./libs'</span>);  <span class="hljs-comment">// 与业务逻辑无关的库都可以放到这里</span>
moduleExports.configDir = path.resolve(moduleExports.publicDir, <span class="hljs-string">'./config'</span>); <span class="hljs-comment">// 存放各种配置文件</span>
moduleExports.componentsDir = path.resolve(moduleExports.publicDir, <span class="hljs-string">'./components'</span>); <span class="hljs-comment">// 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要</span>
moduleExports.layoutDir = path.resolve(moduleExports.publicDir, <span class="hljs-string">'./layout'</span>); <span class="hljs-comment">// 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路</span>

<span class="hljs-comment">// 生成文件目录</span>
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, <span class="hljs-string">'./build'</span>); <span class="hljs-comment">// 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）</span>

<span class="hljs-built_in">module</span>.exports = moduleExports;</code></pre>
<p>选自<a href="https://github.com/Array-Huang/webpack-seed/blob/master/webpack-config/resolve.config.js" rel="nofollow noreferrer" target="_blank"><code>webpack-seed/webpack-config/resolve.config.js</code></a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var dirVars = require('./base/dir-vars.config.js');
module.exports = {
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    /* 各种目录 */
    iconfontDir: path.resolve(dirVars.publicDir, 'iconfont/'),
    configDir: dirVars.configDir,

    /* vendor */
    /* bootstrap 相关 */
    metisMenu: path.resolve(dirVars.vendorDir, 'metisMenu/'),

    /* libs */
    withoutJqueryModule: path.resolve(dirVars.libsDir, 'without-jquery.module'),
    routerModule: path.resolve(dirVars.libsDir, 'router.module'),

    libs: path.resolve(dirVars.libsDir, 'libs.module'),

    /* less */
    lessDir: path.resolve(dirVars.publicDir, 'less'),

    /* components */

    /* layout */
    layout: path.resolve(dirVars.layoutDir, 'layout/html'),
    'layout-without-nav': path.resolve(dirVars.layoutDir, 'layout-without-nav/html'),

    /* logic */
    cm: path.resolve(dirVars.logicDir, 'common.module'),
    cp: path.resolve(dirVars.logicDir, 'common.page'),

    /* config */
    configModule: path.resolve(dirVars.configDir, 'common.config'),
    bootstrapConfig: path.resolve(dirVars.configDir, 'bootstrap.config'),
  },

  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extentions: ['', 'js'],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> dirVars = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./base/dir-vars.config.js'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的</span>
  alias: {
    <span class="hljs-comment">/* 各种目录 */</span>
    iconfontDir: path.resolve(dirVars.publicDir, <span class="hljs-string">'iconfont/'</span>),
    <span class="hljs-attr">configDir</span>: dirVars.configDir,

    <span class="hljs-comment">/* vendor */</span>
    <span class="hljs-comment">/* bootstrap 相关 */</span>
    metisMenu: path.resolve(dirVars.vendorDir, <span class="hljs-string">'metisMenu/'</span>),

    <span class="hljs-comment">/* libs */</span>
    withoutJqueryModule: path.resolve(dirVars.libsDir, <span class="hljs-string">'without-jquery.module'</span>),
    <span class="hljs-attr">routerModule</span>: path.resolve(dirVars.libsDir, <span class="hljs-string">'router.module'</span>),

    <span class="hljs-attr">libs</span>: path.resolve(dirVars.libsDir, <span class="hljs-string">'libs.module'</span>),

    <span class="hljs-comment">/* less */</span>
    lessDir: path.resolve(dirVars.publicDir, <span class="hljs-string">'less'</span>),

    <span class="hljs-comment">/* components */</span>

    <span class="hljs-comment">/* layout */</span>
    layout: path.resolve(dirVars.layoutDir, <span class="hljs-string">'layout/html'</span>),
    <span class="hljs-string">'layout-without-nav'</span>: path.resolve(dirVars.layoutDir, <span class="hljs-string">'layout-without-nav/html'</span>),

    <span class="hljs-comment">/* logic */</span>
    cm: path.resolve(dirVars.logicDir, <span class="hljs-string">'common.module'</span>),
    <span class="hljs-attr">cp</span>: path.resolve(dirVars.logicDir, <span class="hljs-string">'common.page'</span>),

    <span class="hljs-comment">/* config */</span>
    configModule: path.resolve(dirVars.configDir, <span class="hljs-string">'common.config'</span>),
    <span class="hljs-attr">bootstrapConfig</span>: path.resolve(dirVars.configDir, <span class="hljs-string">'bootstrap.config'</span>),
  },

  <span class="hljs-comment">// 当require的模块找不到时，尝试添加这些后缀后进行寻找</span>
  extentions: [<span class="hljs-string">''</span>, <span class="hljs-string">'js'</span>],
};</code></pre>
<h3 id="articleHeader12">抽离对象</h3>
<p>抽离的方法很简单，那么关键就看到底是哪些部分可以抽离、需要抽离了，这一点看我<a href="https://github.com/Array-Huang/webpack-seed-v2" rel="nofollow noreferrer" target="_blank">抽离后的成果</a>就比较清晰了：</p>
<p>先来看根目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─ core # 抽离出来的基础设施，或称“核心”
├─ example-admin-1 # 示例项目1，被抽离后剩下的
├─ example-admin-2 # 示例项目2，嗯，简单起见，直接复制了example-admin-1，不过还是要做一点调整的，比如说配置
├─ npm-scripts # 没想到npm-scripts也能公用吧？
├─ vendor # 无法在npm上找到的第三方库
├─ .eslintrc # ESLint的配置文件
├─ package.json # 所有的npm库依赖建议都写到这里，不建议写到具体项目的package.json里" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├─ core <span class="hljs-comment"># 抽离出来的基础设施，或称“核心”</span>
├─ example-admin-1 <span class="hljs-comment"># 示例项目1，被抽离后剩下的</span>
├─ example-admin-2 <span class="hljs-comment"># 示例项目2，嗯，简单起见，直接复制了example-admin-1，不过还是要做一点调整的，比如说配置</span>
├─ npm-scripts <span class="hljs-comment"># 没想到npm-scripts也能公用吧？</span>
├─ vendor <span class="hljs-comment"># 无法在npm上找到的第三方库</span>
├─ .eslintrc <span class="hljs-comment"># ESLint的配置文件</span>
├─ package.json <span class="hljs-comment"># 所有的npm库依赖建议都写到这里，不建议写到具体项目的package.json里</span></code></pre>
<p>再来看看<code>core</code>目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─ _webpack.dev.config.js # 整理好公用的开发环境webpack配置，以备继承
├─ _webpack.product.config.js # 整理好公用的生产环境webpack配置，以备继承
├─ webpack-dll.config.js # 用来编译Dll文件用的webpack配置文件
├─ manifest.json # Dll文件的资源目录
├─ package.json # 没有什么实质内容，我这里就放了个编译Dll用的npm script
├─components # 各种UI组件
│  ├─footer
│  ├─header
│  ├─side-menu
│  └─top-nav
├─config # 公共配置，有些是提供给具体项目的配置来继承的，有些本身就有用（比如说“核心”部分本身需要的配置）
├─dll # 之前的文章里就说过，我建议把各种第三方库（包括npm库也包括非npm库）都打包成Dll来加速webpack编译过程，这部分明显就属于基础设施了
├─iconfont # 字体图标能不能公用，这点我也是比较犹豫的，看项目实际需要吧，不折腾的话还是推荐公用
├─layout # 布局，既然是同类型项目，布局肯定是基本一样的
│  ├─layout
│  └─layout-without-nav
├─less # 样式基础，在我这项目里就是针对bootstrap的SB-Admin主题做了修改
│  ├─base-dir
│  └─components-dir
├─libs # 自己团队研发的一些公共的方法/库，又或是针对第三方库的适配器（比如说对alert库封装一层，后面要更换库的时候就方便了）
├─npm-scripts # 与根目录下的npm-scripts目录不一样，这里的不是用来公用的，而是“核心”使用到的script，比如我在这里就放了编译dll的npm script
└─webpack-config # 公用的webpack配置，尤其是关系到“核心”部分的配置，比如说各第三方库的alias。这里的配置是用来给具体项目来继承的，老实说我现在继承的方法也比较复杂，回头看看有没有更简单的方法。
    ├─base
    ├─inherit
    └─vendor" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├─ _webpack.dev.config.js <span class="hljs-comment"># 整理好公用的开发环境webpack配置，以备继承</span>
├─ _webpack.product.config.js <span class="hljs-comment"># 整理好公用的生产环境webpack配置，以备继承</span>
├─ webpack-dll.config.js <span class="hljs-comment"># 用来编译Dll文件用的webpack配置文件</span>
├─ manifest.json <span class="hljs-comment"># Dll文件的资源目录</span>
├─ package.json <span class="hljs-comment"># 没有什么实质内容，我这里就放了个编译Dll用的npm script</span>
├─components <span class="hljs-comment"># 各种UI组件</span>
│  ├─footer
│  ├─header
│  ├─side-menu
│  └─top-nav
├─config <span class="hljs-comment"># 公共配置，有些是提供给具体项目的配置来继承的，有些本身就有用（比如说“核心”部分本身需要的配置）</span>
├─dll <span class="hljs-comment"># 之前的文章里就说过，我建议把各种第三方库（包括npm库也包括非npm库）都打包成Dll来加速webpack编译过程，这部分明显就属于基础设施了</span>
├─iconfont <span class="hljs-comment"># 字体图标能不能公用，这点我也是比较犹豫的，看项目实际需要吧，不折腾的话还是推荐公用</span>
├─layout <span class="hljs-comment"># 布局，既然是同类型项目，布局肯定是基本一样的</span>
│  ├─layout
│  └─layout-without-nav
├─less <span class="hljs-comment"># 样式基础，在我这项目里就是针对bootstrap的SB-Admin主题做了修改</span>
│  ├─base-dir
│  └─components-dir
├─libs <span class="hljs-comment"># 自己团队研发的一些公共的方法/库，又或是针对第三方库的适配器（比如说对alert库封装一层，后面要更换库的时候就方便了）</span>
├─npm-scripts <span class="hljs-comment"># 与根目录下的npm-scripts目录不一样，这里的不是用来公用的，而是“核心”使用到的script，比如我在这里就放了编译dll的npm script</span>
└─webpack-config <span class="hljs-comment"># 公用的webpack配置，尤其是关系到“核心”部分的配置，比如说各第三方库的alias。这里的配置是用来给具体项目来继承的，老实说我现在继承的方法也比较复杂，回头看看有没有更简单的方法。</span>
    ├─base
    ├─inherit
    └─vendor</code></pre>
<p>最后总结一下，是哪些资源被抽离出来了：</p>
<ul>
<li>webpack配置中属于架构的部分，比如说各种loader、plugin、“核心”部分的alias。</li>
<li>“核心”部分所需的配置，比如我这项目里为了定制bootstrap而建的配置。</li>
<li>各种与UI相关的资源，比如UI框架/样式、UI组件、字体图标。</li>
<li>第三方库，以Dll文件的形式存在。</li>
<li>自研库/适配器。</li>
</ul>
<h2 id="articleHeader13">结构图</h2>
<p>上传上来以后发现图被压小了，请到这里看<a href="https://github.com/Array-Huang/webpack-seed-v2/blob/master/Array-Huang-webpack-seed-v2%20%E7%BB%93%E6%9E%84%E5%9B%BE.png" rel="nofollow noreferrer" target="_blank">原图</a></p>
<p><span class="img-wrap"><img data-src="/img/bVENFq?w=824&amp;h=1255" src="https://static.alili.tech/img/bVENFq?w=824&amp;h=1255" alt="Array-Huang-webpack-seed-v2 结构图" title="Array-Huang-webpack-seed-v2 结构图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">附系列文章目录（同步更新）</h2>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000007301770"><code>https://segmentfault.com/a/1190000007301770</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施

## 原文链接
[https://segmentfault.com/a/1190000007301770](https://segmentfault.com/a/1190000007301770)

