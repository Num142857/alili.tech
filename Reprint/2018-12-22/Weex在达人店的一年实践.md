---
title: 'Weex在达人店的一年实践' 
date: 2018-12-22 2:30:11
hidden: true
slug: uxnq74lzrpc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Weex在达人店的一年实践</h1>
<blockquote><p>本文来自尚妆移动端团队<a href="https://github.com/or0fun" rel="nofollow noreferrer" target="_blank">路飞</a><br>发表于尚妆github博客，欢迎订阅！</p></blockquote>
<p>尚妆达人店接入weex也一年的时间了，在此期间，也陆陆续续出了一些文章：<br><a href="https://juejin.im/post/58c22192570c35006d50ba34" rel="nofollow noreferrer" target="_blank">「Android」 详细全面的基于vue2.0Weex接入过程（Android视角）</a><br><a href="https://juejin.im/post/5992db27518825244249e2db" rel="nofollow noreferrer" target="_blank">「前端」weex页面传参</a><br><a href="https://juejin.im/post/59f6d6b46fb9a0450a66a143" rel="nofollow noreferrer" target="_blank">「大前端」weex里native主动发送事件到JS的方案实现</a><br><a href="https://juejin.im/entry/59c388f1f265da065476d024/detail" rel="nofollow noreferrer" target="_blank">weex 三端实现Pager 组件(ViewPager) - 本仁笔记</a><br><a href="https://github.com/ShowJoy-com/showjoy-weex-notice" rel="nofollow noreferrer" target="_blank">记录团队weex实践过程中需要特殊注意的点</a></p>
<p>这里就详细地做一个总结，希望可以给大家带来一些参考。我们团队也比较小，App的量级也不大，很多做得不够好的地方，还希望大神不吝赐教。</p>
<h2 id="articleHeader1">一、什么是Weex</h2>
<blockquote><p>Weex 是一套简单易用的跨平台开发方案，能以 web 的开发体验构建高性能、可扩展的 native 应用，为了做到这些，Weex 与 Vue 合作，使用 Vue 作为上层框架，并遵循 W3C 标准实现了统一的 JSEngine 和 DOM API，这样一来，你甚至可以使用其他框架驱动 Weex，打造三端一致的 native 应用。</p></blockquote>
<p>前言引用了<a href="https://weex.apache.org/cn/guide/" rel="nofollow noreferrer" target="_blank">Weex官网</a>的定义，我们在实践的过程中也实际地体会到了这些。以下是提炼出的几个关键字：<br><span class="img-wrap"><img data-src="/img/remote/1460000012386624?w=559&amp;h=232" src="https://static.alili.tech/img/remote/1460000012386624?w=559&amp;h=232" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>还未接触过weex的同学，如果想先看一下效果，可以访问 Weex 提供的 <a href="http://dotwe.org/vue/3ce15afce07208bead2b5aac9ff3080a" rel="nofollow noreferrer" target="_blank">在线Playground</a>，进行编辑和浏览，App端下载<a href="https://weex.apache.org/cn/playground.html" rel="nofollow noreferrer" target="_blank">playground</a>playground进行扫码浏览效果。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386625?w=1507&amp;h=747" src="https://static.alili.tech/img/remote/1460000012386625?w=1507&amp;h=747" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，Weex可以通过自己设计的DSL，用vue像写 web 页面一样写一个 app 的页面，整个页面书写分成了3段，<code>template</code>、<code>style</code>、<code>script</code>，借鉴了成熟的MVVM的思想。</p>
<blockquote><p>后面会讲到，理论上也可以横向支持采用React、angular等框架来书写页面。阿里开源的Rax，就是基于React的标准，支持在Weex渲染，具体可以看知乎上一个问答<a href="https://www.zhihu.com/question/54738521" rel="nofollow noreferrer" target="_blank">如何看待阿里开源的Rax框架？</a></p></blockquote>
<p>而Playground集成了<code>Weex SDK</code>，扫码后，得到了编译好的<code>JS Bundle</code>，然后通过JS Framework层解析，输出Json格式的<code>Visual Dom</code>，然后通过<code>JS-Native Bridge</code> 来渲染成Native界面，也通过Bridge来进行Js-Native的事件传递。如下是官网给出的架构图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012386626?w=1251&amp;h=831" src="https://static.alili.tech/img/remote/1460000012386626?w=1251&amp;h=831" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>通过断点调试可以看到，JSFramework传给SDK的渲染指令是这样子，SDK 再根据不同的type和参数，渲染成对应的Native组件。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386627?w=1631&amp;h=547" src="https://static.alili.tech/img/remote/1460000012386627?w=1631&amp;h=547" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>传统的App，Native UI 是可以直接获取 Device Power的，而Weex App里，Native UI 和 Device Power之间通过JavaScript来连接，如图所示(图来自weex官网)：<br><span class="img-wrap"><img data-src="/img/remote/1460000012386628?w=1176&amp;h=816" src="https://static.alili.tech/img/remote/1460000012386628?w=1176&amp;h=816" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>在开始接入之前，关于Weex的页面结构，需要了解一下，具体可以查看Weex官网的<a href="https://weex.apache.org/cn/guide/intro/page-architecture.html#sidebar" rel="nofollow noreferrer" target="_blank">Weex页面结构</a>。为了阅读方便，下面直接引用：</p>
<blockquote>
<h3 id="articleHeader2">Weex 页面结构</h3>
<p>界面展示、逻辑处理、设备能力使用、生命周期管理等部分。</p>
<h3 id="articleHeader3">Dom模型</h3>
<p>Weex 页面通过类似 HTML DOM 的方式管理界面，首先页面会被分解为一个 DOM 树，，每个 DOM 结点都代表了一个相对独立的 native 视图的单元。然后不同的视图单元之间通过树形结构组合在了一起，构成一个完整的页面。</p>
<h3 id="articleHeader4">组件</h3>
<p>Weex 支持文字text、图片image、视频video等内容型组件，也支持 div、list、scroller 等容器型组件，还包括 slider、input、textarea、switch 等多种特殊的组件。Weex 的界面就是由这些组件以 DOM 树的方式构建出来的。</p>
<h3 id="articleHeader5">布局系统</h3>
<p>Weex 页面中的组件会按照一定的布局规范来进行排布，我们这里提供了 CSS 中的盒模型、flexbox 和 绝对/相对/固定/吸附布局这三大块布局模型。</p>
<h3 id="articleHeader6">功能</h3>
<p>Weex 提供了非常丰富的系统功能 API，包括弹出存储、网络、导航、弹对话框和 toast 等，开发者可以在 Weex 页面通过获取一个 native module 的方式引入并调用这些客户端功能 API。</p>
<h3 id="articleHeader7">生命周期</h3>
<p>每个 Weex 页面都有其自身的生命周期，页面从开始被创建到最后被销毁，会经历到整个过程。这是通过对 Weex 页面的创建和销毁，在路由中通过 SDK 自行定义并实现的。</p>
</blockquote>
<p>Weex的扩展性很好，可以对网络、图片、存储、UT、组件、接口等根据自身App和业务需求进行扩展，即使weex提供的组件有问题，也都可以直接重写替换。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386629?w=622&amp;h=319" src="https://static.alili.tech/img/remote/1460000012386629?w=622&amp;h=319" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>对于一个新技术的接入，我们首先会去考虑这个技术的优缺点，能给团队和业务带来什么效益；然后考虑接入的成本，包括团队成员的学习成本，对项目的修改成本，时间成本；开发体验，性能监控，容灾处理等。<br>在考虑完这些之后，OK，我们开始决定接入Weex。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386630?w=532&amp;h=299" src="https://static.alili.tech/img/remote/1460000012386630?w=532&amp;h=299" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">二、达人店接入Weex</h2>
<p>达人店目前是一个量级比较小的应用，在一年时间里，目前有46个页面。目前整体都比较稳定，后续所有页面也都会采用weex进行开发。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386631?w=655&amp;h=188" src="https://static.alili.tech/img/remote/1460000012386631?w=655&amp;h=188" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>因为Weex给我们带来的效益是显而易见的：</p>
<ul>
<li>3人/日 -&gt; 1人/日</li>
<li>大程度摆脱App更新限制</li>
<li>Native 体验</li>
</ul>
<p>在接入的过程中，我们在各方面做了很多事情，包括脚手架、配置下发、跳转规则、相对地址、预加载、降级、错误监控、建立组件库、页面传参等等。下面详细介绍一下这个过程，如果您有更好的方法，非常欢迎进行讨论交流。</p>
<h4>(一) 前端</h4>
<p>首先要建立Weex项目，这个可以看做是一个前端的项目，Weex也提供了脚手架工具。</p>
<p>weex 推荐的脚手架全家桶：</p>
<ul>
<li>
<code>weex-toolkit</code>：用来初始化项目，编译，运行，debug所有工具。</li>
<li>
<code>weexpack</code>：用来打包JSBundle的，实际也是对Webpack的封装。</li>
<li>
<code>playground</code>：一个上架的App，这个可以用来通过扫码实时在手机上显示出实际的页面。</li>
<li>
<code>code snippets</code>：这个是一个在线的playground。</li>
<li>
<code>weex devtools</code>：就是为weex前端和native开发工程师服务的一款调试工具。</li>
<li>
<code>weex-loader</code>：Webpack 的一个加载器，针对 Android 和 iOS 平台，用于编译 .vue 格式的单文件组件</li>
</ul>
<p>达人店没有使用weex提供的脚手架，而是我们前端同学定义了适合我们业务的项目结构，以下是达人店的Weex项目结构的一部分，每个页面有一个文件夹，包含了html，js，vue：<br><code>html文件</code>：接入weex 的h5页面<br><code>js文件</code>：webpack编译的入口文件<br><code>vue文件</code>：weex的编辑页面</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386632?w=314&amp;h=446" src="https://static.alili.tech/img/remote/1460000012386632?w=314&amp;h=446" alt="image" title="image" style="cursor: pointer;"></span></p>
<blockquote><p>以下是开发环境的示例，所以引入的js都没有版本号，正式环境的path里会有版本号</p></blockquote>
<p><strong>HTML示例</strong><br>其中，/dist/weex.js 引入<code>weex-vue-render</code>，进行了扩展，包括注册module，注册新的自定义组件。<code>weex-vue-render</code>可以理解为weex在H5的SDK。详情见 <a href="https://weex.apache.org/cn/references/advanced/extend-to-html5.html#" rel="nofollow noreferrer" target="_blank">HTML扩展</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, user-scalable=no&quot;>
    <script src=&quot;http://res.wx.qq.com/open/js/jweixin-1.0.0.js&quot;></script>
  </head>
  <body>
    <div id=&quot;weex&quot;></div>
    <!-- entry -->
    <script src=&quot;//assets.showjoy.net/joyf2e/vendor/weex-extend/dist/weex.js&quot; type=&quot;text/javascript&quot;></script>
    <script src=&quot;./register-weex.min.js&quot; type=&quot;text/javascript&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, user-scalable=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://res.wx.qq.com/open/js/jweixin-1.0.0.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"weex"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- entry --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//assets.showjoy.net/joyf2e/vendor/weex-extend/dist/weex.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./register-weex.min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>Js示例</strong><br>#weex 就是对应html里 <code>&lt;div id="weex"&gt;&lt;/div&gt;</code>，vue渲染后会挂在这个div上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import weexComponent from './register-weex.vue';
weexComponent.el = '#weex';
export default new Vue(weexComponent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> weexComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./register-weex.vue'</span>;
weexComponent.el = <span class="hljs-string">'#weex'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue(weexComponent);</code></pre>
<p><strong>Vue示例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;wrapper&quot;>
  <div>
</template>
<style scoped>
  .wrapper {
    background-color: #fff;
    flex: 1;
  }
</style>
<script>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.wrapper</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>构建的时候定义了两套webpackConfig，分别用于编译给h5和Native的JS。之所以需要分开编译，是出于weex的要求，下文来自<a href="https://weex.apache.org/cn/references/vue/difference-with-web.html#" rel="nofollow noreferrer" target="_blank">Weex官网</a>，我们在Jenkins上实现了远程构建。</p>
<blockquote>
<h2 id="articleHeader9">编译环境的差异</h2>
<p>在 Weex 中使用 Vue.js ，你所需要关注的运行平台除了 Web 之外还有 Android 和 iOS ，在开发和编译环境上还有一些不同点。针对 Web 和原生平台，将 Vue 项目源文件编译成目标文件，有两种不同的方式：</p>
<ul>
<li>针对 Web 平台，和普通 Vue 2.X 项目一样，可以使用任意官方推荐的方式编译源文件，如 Webpack + vue-loader 或者 Browserify + vueify 。</li>
<li>针对 Android 和 iOS 平台，我们提供了 weex-loader 工具支持编译 .vue 格式的单文件组件；也就是说，目前只能使用 Webpack + weex-loader 来生成原生端可用的 js bundle。</li>
</ul>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386633?w=1384&amp;h=689" src="https://static.alili.tech/img/remote/1460000012386633?w=1384&amp;h=689" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>(二) Native 接入</h4>
<p>请直接参考官网<a href="https://weex.apache.org/cn/guide/integrate-to-your-app.html" rel="nofollow noreferrer" target="_blank">集成 Weex 到已有应用</a>，SDK的依赖，初始化，渲染，都已说明。</p>
<p>说到底，最后的渲染结果都是返回一个<code>View</code>，理论上根据业务需求，可以将view放置在页面的任何地方。<code>我们达人店，都是整个页面的形式来引入weex。</code></p>
<p>在Android方面，我们把weex的接入放入了自定义的WeexFragment。另外，新建WeexActivity，引用WeexFragment。这样使用起来更灵活。</p>
<p>在iOS方面，我们把weex的接入放入了自定义的WeexViewController。</p>
<h4>（三）跳转规则</h4>
<p>Native 渲染weex页面的时候，需要传入构建出来的js bundle，即一个js文件。但是，不管是Native的日常写法还是前端的惯常用法，都不会直接跳转到一个js文件。所以，考虑到符合前端的日常写法，跳转时，统一跳转到url，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386634?w=836&amp;h=264" src="https://static.alili.tech/img/remote/1460000012386634?w=836&amp;h=264" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>不管是weex，native，webview里的跳转都是url，然后再根据一定的规则进行match，根据match结果来决定是用weex、native还是webview来打开。</p>
<ul>
<li>
<p>要做到weex，native，webview里的跳转都是url，这里需要做两点：</p>
<ul>
<li>1、跳转需要调用统一的openUrl，weex里的a标签href直接可以写目标url，然后在Native端对a标签的跳转进行拦截；</li>
<li>2、webview 里的跳转进行拦截，每个url都要进行规则匹配</li>
</ul>
</li>
<li>
<p>定义规则，App内置一份，并可以动态下发</p>
<ul>
<li>1、url 和 原先 Native 页面的对应关系，page可以根据原先App里的Router设计来定义。</li>
<li>2、url 和 weex js的对应关系,</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`hideTitleBar`:是否隐藏native的titlebar;
`v`：支持最低App版本，不支持就降级；
`page`: 页面名称，作为本地预加载的文件名；
`h5`: h5的url; 
`url`: js的路径；
`md5`: js文件的md5,用于完整性校验
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`hideTitleBar`:是否隐藏native的titlebar<span class="hljs-comment">;</span>
`v`：支持最低App版本，不支持就降级；
`page`: 页面名称，作为本地预加载的文件名；
`h5`: h5的url<span class="hljs-comment">; </span>
`url`: js的路径；
`md5`: js文件的md5,用于完整性校验
</code></pre>
<p><strong>url 和 Native 页面的对应关系示例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         [
                {
                    &quot;page&quot;:&quot;chat&quot;,
                    &quot;url&quot;:&quot;(.*)//shop.m.showjoy.net/shop/chat\?type=1&quot;,
                    &quot;v&quot;:&quot;1.7.0&quot;
                },
                {
                    &quot;page&quot;:&quot;main&quot;,
                    &quot;url&quot;:&quot;(.*)//shop.m.showjoy.net/shop/seller_home&quot;,
                    &quot;v&quot;:&quot;1.12.0&quot;
                }
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>         [
                {
                    <span class="hljs-attr">"page"</span>:<span class="hljs-string">"chat"</span>,
                    <span class="hljs-attr">"url"</span>:<span class="hljs-string">"(.*)//shop.m.showjoy.net/shop/chat\?type=1"</span>,
                    <span class="hljs-attr">"v"</span>:<span class="hljs-string">"1.7.0"</span>
                },
                {
                    <span class="hljs-attr">"page"</span>:<span class="hljs-string">"main"</span>,
                    <span class="hljs-attr">"url"</span>:<span class="hljs-string">"(.*)//shop.m.showjoy.net/shop/seller_home"</span>,
                    <span class="hljs-attr">"v"</span>:<span class="hljs-string">"1.12.0"</span>
                }
    ]</code></pre>
<p><strong>url和weex页面对应关系示例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
    &quot;hideTitleBar&quot;: &quot;&quot;,
    &quot;v&quot;: &quot;1.7.0&quot;,
    &quot;page&quot;: &quot;order&quot;,
    &quot;h5&quot;: &quot;http://shop.m.showjoy.com/u/trade.html&quot;,
    &quot;url&quot;: &quot;http://cdn1.showjoy.com/assets/f2e/showjoy-assets/shop-weex-m/0.8.1/order-list-weex/order-list-weex.weex.min.js&quot;,
    &quot;md5&quot;: &quot;8b3268ef136291f2e9b8bd776e625c6b&quot;
    },
    {
    &quot;hideTitleBar&quot;: &quot;&quot;,
    &quot;v&quot;: &quot;1.7.0&quot;,
    &quot;page&quot;: &quot;shoporder&quot;,
    &quot;h5&quot;: &quot;http://shop.m.showjoy.com/user/tradePage&quot;,
    &quot;url&quot;: &quot;http://cdn1.showjoy.com/assets/f2e/showjoy-assets/shop-weex-m/0.1.1/shop-order-weex/shop-order-weex.weex.min.js&quot;,
    &quot;md5&quot;: &quot;ca818a24588509bfe083cd4b99855841&quot;
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
    <span class="hljs-attr">"hideTitleBar"</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">"v"</span>: <span class="hljs-string">"1.7.0"</span>,
    <span class="hljs-attr">"page"</span>: <span class="hljs-string">"order"</span>,
    <span class="hljs-attr">"h5"</span>: <span class="hljs-string">"http://shop.m.showjoy.com/u/trade.html"</span>,
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://cdn1.showjoy.com/assets/f2e/showjoy-assets/shop-weex-m/0.8.1/order-list-weex/order-list-weex.weex.min.js"</span>,
    <span class="hljs-attr">"md5"</span>: <span class="hljs-string">"8b3268ef136291f2e9b8bd776e625c6b"</span>
    },
    {
    <span class="hljs-attr">"hideTitleBar"</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">"v"</span>: <span class="hljs-string">"1.7.0"</span>,
    <span class="hljs-attr">"page"</span>: <span class="hljs-string">"shoporder"</span>,
    <span class="hljs-attr">"h5"</span>: <span class="hljs-string">"http://shop.m.showjoy.com/user/tradePage"</span>,
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"http://cdn1.showjoy.com/assets/f2e/showjoy-assets/shop-weex-m/0.1.1/shop-order-weex/shop-order-weex.weex.min.js"</span>,
    <span class="hljs-attr">"md5"</span>: <span class="hljs-string">"ca818a24588509bfe083cd4b99855841"</span>
    }
]</code></pre>
<h4>（四）配置平台</h4>
<p>针对跳转规则的配置，我们做了自己的配置平台，针对全量、预发、线下提供不同的配置。参数：</p>
<ul>
<li>appType：1代表android  2代表iOS</li>
<li>preTest：  true 代表预发 false 代表全量</li>
<li>appVersion：App的版本号</li>
</ul>
<p>平台会根据三个参数，下发当前App支持渲染的js页面配置。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386635?w=1512&amp;h=451" src="https://static.alili.tech/img/remote/1460000012386635?w=1512&amp;h=451" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>（五）支持相对地址</h4>
<p>按照平常前端的写法，跳转以及a标签写的基本都是相对地址，这样对于线下、线上环境都不用做特别的处理。如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012386636?w=1487&amp;h=632" src="https://static.alili.tech/img/remote/1460000012386636?w=1487&amp;h=632" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>开始介入weex的时候，大概版本是0.8左右，那时候默认还不支持相对地址，而我们就已经开始自己做了。在weex sdk 0.9.4开始 默认支持了相对地址，但是通过测试和源代码查看，它取的host是js bundle的host，如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012386637?w=850&amp;h=578" src="https://static.alili.tech/img/remote/1460000012386637?w=850&amp;h=578" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>而我们把js bundle放在了cdn，日常页面的域名是shop.m.showjoy.com，两者不一致，所以在Native端，我们重写了<code>URIAdapter</code>(Android)和<code>WXURLRewriteProtocol</code>（iOS），对url进行了处理，如果是相对地址，加上日常h5页面的<code>host</code>，请求也是一样。如此就支持了相对地址。<br><strong>Andoird</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这里还可以配置其他的adapter，比如image,storage等
WXSDKEngine.initialize(application,
                new InitConfig.Builder()
                        .setURIAdapter(new SHCustomURIAdapter())
                        .build());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//这里还可以配置其他的adapter，比如image,storage等</span>
WXSDKEngine.initialize(application,
                <span class="hljs-keyword">new</span> <span class="hljs-type">InitConfig</span>.Builder()
                        .setURIAdapter(<span class="hljs-keyword">new</span> <span class="hljs-type">SHCustomURIAdapter</span>())
                        .build());</code></pre>
<p><strong>iOS</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[WXSDKEngine registerHandler:[WXSJNetworkDefaultlmpl new] withProtocol:@protocol(WXURLRewriteProtocol)];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-name">WXSDKEngine</span> registerHandler:[<span class="hljs-name">WXSJNetworkDefaultlmpl</span> new] withProtocol:@protocol(<span class="hljs-name">WXURLRewriteProtocol</span>)]<span class="hljs-comment">;</span></code></pre>
<blockquote>
<p>实现的时候，重写rewrite接口，我们会根据线下、线上、预发等环境配置不一样的host，另外还会支持Native的协议，如：sms://, weixin://dl/privacy</p>
<p><strong>PS</strong>: A 标签的跳转，Native SDK的实现是调用Module“event”的openURL接口。可是默认没有注册“event”的Module，所以需要自己注册event，或者自己重新实现 a标签。<br>sdk里对a标签跳转的处理<br><span class="img-wrap"><img data-src="/img/remote/1460000012386638?w=850&amp;h=297" src="https://static.alili.tech/img/remote/1460000012386638?w=850&amp;h=297" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>自定义event  module.<br><span class="img-wrap"><img data-src="/img/remote/1460000012386639?w=864&amp;h=358" src="https://static.alili.tech/img/remote/1460000012386639?w=864&amp;h=358" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
</blockquote>
<h4>（六）预加载方案</h4>
<p>如图，是在本地开发时抓的包，加载的js bundle 虽然也不大，duration也很短。但是为了让速度更进一步，我们还是做了预加载方案。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386640?w=1620&amp;h=543" src="https://static.alili.tech/img/remote/1460000012386640?w=1620&amp;h=543" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>方案设计如下：</strong></p>
<ul>
<li>1）每次更新完配置文件，遍历，check pagename.js文件的md5</li>
<li>2）如果本地存在md5一致的文件，就跳过，否则下载</li>
<li>
<p>3）下载完成后，保存格式为pagename.js，已存在则覆盖，校验md5来保证文件的完整性：</p>
<ul>
<li>相同的话，记录文件的最后修改时间；</li>
<li>不同的话，删除已下载文件，重新下载，重复校验流程。</li>
</ul>
</li>
<li>
<p>4）每次打开指定页面的时候：</p>
<ul><li>
<p>先检查本地是否有对应page文件</p>
<ul>
<li>如果不存在，则直接使用配置里的remote url</li>
<li>
<p>如果存在，则校验记录的修改时间是否与该文件的最后修改时间是否一致(这么做，是为了<code>防篡改</code>；不直接计算md5来校验，是考虑到md5的计算有时间消耗)</p>
<ul>
<li>一致就加载</li>
<li>不一致就用配置里的remote url</li>
</ul>
</li>
</ul>
</li></ul>
</li>
</ul>
<h4>（七）Native-JS通信</h4>
<h5>1、JS 调用Native</h5>
<ul><li>Weex 提供了Module扩展接口，开发者可以自己注册Module，Module里定义接口；</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386641" src="https://static.alili.tech/img/remote/1460000012386641" alt="image" title="image" style="cursor: pointer;"></span></p>
<h5>2、Native调用JS</h5>
<ul>
<li>Module接口可以设置Callback，接口实现处理完后，可以直接调用Callback，回调JS.</li>
<li>WXSDKInstance.fireEvent 是元素级别的，fireEvent 是instance的成员函数，需要传递elementRef。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386642?w=1481&amp;h=665" src="https://static.alili.tech/img/remote/1460000012386642?w=1481&amp;h=665" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>WXSDKInstance.fireGlobalEventCallback 是页面级别的，需要传递instanceID</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386643?w=1308&amp;h=685" src="https://static.alili.tech/img/remote/1460000012386643?w=1308&amp;h=685" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>（八）错误监控</h4>
<p>*Native 端可以通过接口 IWXRenderListener 中的 onException 方法进行处理，这里包括render error，js exception，network error等。</p>
<ul><li>Weex层，自定义loge接口来实现错误的监控</li></ul>
<h4>（九）页面传参</h4>
<p>关于页面传参，我们团队的南洋同学写过一篇文章(Weex页面传参)[<a href="https://juejin.im/post/5992db27518825244249e2db" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5992db...</a>]，为了方便阅读，这里再讲述一遍。</p>
<p><strong>1、正向传参：x.com/a.html  跳转到 x.com/b.html?age=12</strong><br>Native 渲染的时候，除了传入JS Bundle，还有options参数，我们把url后面的参数都存入options，然后传到weex页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[_instance renderWithURL:[NSURL URLWithString:mstrURL] options:[self SHWeexOptionsWithH5URL:mstrH5URL withURL:mstrURL] data:nil];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">[_instance <span class="hljs-string">renderWithURL:</span>[NSURL <span class="hljs-string">URLWithString:</span>mstrURL] <span class="hljs-string">options:</span>[self <span class="hljs-string">SHWeexOptionsWithH5URL:</span>mstrH5URL <span class="hljs-string">withURL:</span>mstrURL] <span class="hljs-string">data:</span>nil];</code></pre>
<p>这个参数，在书写weex时，可以通过<code>weex.config.age</code>获取。</p>
<p>为了获取参数的统一性，H5页面也一样，打开一个url时，首先获取url后面的参数，存入window.weex.config。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let key in urlParamObj) {
  window.weex.config[key] = encodeURIComponent(urlParamObj[key]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> <span class="hljs-built_in">key</span> in urlParamObj) {
  <span class="hljs-built_in">window</span>.weex.config[<span class="hljs-built_in">key</span>] = encodeURIComponent(urlParamObj[<span class="hljs-built_in">key</span>]);
}</code></pre>
<p><strong>2、反向传参：x.com/b.html  回退到 x.com/a.html，带回参数age=2</strong><br>这个是为了实现类似Android里 onActivityResult的功能，可以把参数传回给上个页面。而实现这样的功能，iOS Native的实现也只要加个Delegate就可以了。</p>
<p>在weex要实现这个效果，本身没有提供直接可以使用的方法，下面是我们目前采取的方案。</p>
<ul><li>首先自定义定义Module，增加setResult接口，然后再weex调用，参数是k-v的形式。接口的实现，就是把数据先存在本地；</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386644?w=1286&amp;h=710" src="https://static.alili.tech/img/remote/1460000012386644?w=1286&amp;h=710" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul><li>回到上个页面，resume/willappear时候，获取存储的k-v，并通过fireGlobalEventCallback把数据传递到weex页面。，并且remove数据。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386645?w=1607&amp;h=718" src="https://static.alili.tech/img/remote/1460000012386645?w=1607&amp;h=718" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>在weex页面进行监听，并处理</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386646?w=554&amp;h=148" src="https://static.alili.tech/img/remote/1460000012386646?w=554&amp;h=148" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>(十) 降级方案</h4>
<p>所谓降级，就是当前新页面渲染失败，或者当前App版本不够新，无法支持新页面，故会访问h5页面。这里我们区分了两种情况：</p>
<ul>
<li>1、渲染失败： 一致跳转到h5页面</li>
<li>
<p>2、版本控制：</p>
<ul>
<li>新增的页面：无法支持新页面的App版本就降级访问h5页面</li>
<li>老页面的修改：无法支持新页面的App版本会访问老页面</li>
</ul>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012386647?w=1073&amp;h=291" src="https://static.alili.tech/img/remote/1460000012386647?w=1073&amp;h=291" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>（十一）屏幕适配</h4>
<p>屏幕适配一直是移动端开发不可避开的话题。在Weex的世界里，定义了一个默认屏幕尺寸，用来适配iOS，Android各种不同大小的屏幕。weex框架在底层做了针对不同屏幕的适配工作，具体计算公式为 <code>实际高宽 = 代码高宽 * (屏幕宽度 / 750)</code><br><span class="img-wrap"><img data-src="/img/remote/1460000012386648?w=1585&amp;h=172" src="https://static.alili.tech/img/remote/1460000012386648?w=1585&amp;h=172" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>目前我们设计给的视觉稿是375的，我们开发的时候只要拿到值x2，就可以了。<br>其中有一种普遍会遇到需要的计算的地方，这里详细讲一下。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386649?w=350&amp;h=322" src="https://static.alili.tech/img/remote/1460000012386649?w=350&amp;h=322" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>使用List和scroll的时候，高度是需要设置的，而这个高度需要根据不同页面进行计算，以上图为例，首先想到的是：<br><strong>list高度 = screen高度 - titlebarHeight</strong></p>
<blockquote><p>weex可以通过<code>$getConfig().env.deviceHeight</code>和<code>$getConfig().env.deviceWidth</code>的形式来获取手机屏幕的高度<br>但是其实这样是不准确的，因为Android Native的总高度，事实上是可供显示的全屏高度，而不一定是物理屏幕的高度，因为有状态栏，虚拟按键栏，Smartbar等等安卓碎片化引入的额外显示元素，实际全屏高度很有可能小于物理屏幕高度。<br>所以真正的容器高度，需要由外部传入，</p></blockquote>
<p><strong>List实际高度 = ContainnerHeight - titleBar的高度字面量 * 转换比例ratio</strong><br>转化比例ratio = this.$getConfig().env.deviceWidth / 750</p>
<p>ps: 外部传入的ContainnerHeight通过Module的接口传入</p>
<p>`list的字面量高度 =  list实际高度 / 转换比例ratio <br>= ContainnerHeight / ratio - titleBar的高度字面量`</p>
<p>另外，weex也提供<code>this.$getConfig().env.scale</code>，如有需要可以利用它来计算dp2px。</p>
<h2 id="articleHeader10">三、我们遇到的一些问题和解决方案</h2>
<p>1）Android 的weex sdk 0.13.1，input组件初始值是空时，粘贴的时候无法触发事件@input<br><code>设置初始值，点击时，如果初始值与placeholder一致，就清空</code><br>2）在iOS9.x系统中文本被截断<br><code>在iOS9.x系统中不支持line-height，被强行绘制，存在兼容性问题，暂时不要使用font-size和line-height相同大小</code><br>3）class 的动态绑定<br>`vue的写法<br>:class={'header': true}  <br>weex的写法<br>:class=“[true ? 'header' : '']"`<br>4）animation动画在iOS 8及以下的H5页面失效<br><code>对于webkit不兼容的css样式(transform)进行兼容</code><br>5）scroller横向滚动时iOS设备元素无法横向排列<br><code>需要给scroller设置样式 flex-deriction: row，这样可以确保三端显示一致。</code><br>6）Js Date 转换时间，Android差8小时<br>`dateConfigTimeZone(timeValue, offset) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const date = new Date(timeValue);
  // UTC时间 (1970-1-1至今毫秒数 + 本地时间与GMT分钟差)
  const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  // 返回 (UTC时间 + 时区差)
  return new Date(utc + (60 * 60 * 1000 * offset));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>  <span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(timeValue);
  <span class="hljs-comment">// UTC时间 (1970-1-1至今毫秒数 + 本地时间与GMT分钟差)</span>
  <span class="hljs-keyword">const</span> utc = <span class="hljs-built_in">date</span>.getTime() + (<span class="hljs-built_in">date</span>.getTimezoneOffset() * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>);
  <span class="hljs-comment">// 返回 (UTC时间 + 时区差)</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(utc + (<span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * offset));
}</code></pre>
<p>`</p>
<h2 id="articleHeader11">四、我们还在做的事情</h2>
<h4>（一）weex组件库</h4>
<p>一年的实践，我们也积累了一些基础组件和业务组件，如图，有description、import、example、preview、qrcode等。<br><span class="img-wrap"><img data-src="/img/remote/1460000012386650?w=1474&amp;h=703" src="https://static.alili.tech/img/remote/1460000012386650?w=1474&amp;h=703" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>看下 spon-ui 组件库项目的目录结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|- spon-ui
||-- build
||-- docs
||-- examples
||-- packages
|||--- weex-field
||||---- index.js
||||---- field.vue
||||---- example.vue
||||---- readme.md
||||---- package.json
||-- src" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code><span class="hljs-params">|- spon-ui
|</span><span class="hljs-params">|-- build
|</span><span class="hljs-params">|-- docs
|</span><span class="hljs-params">|-- examples
|</span><span class="hljs-params">|-- packages
|</span><span class="hljs-params">||</span>--- weex-field
<span class="hljs-params">||</span><span class="hljs-params">||</span>---- index.js
<span class="hljs-params">||</span><span class="hljs-params">||</span>---- field.vue
<span class="hljs-params">||</span><span class="hljs-params">||</span>---- example.vue
<span class="hljs-params">||</span><span class="hljs-params">||</span>---- readme.md
<span class="hljs-params">||</span><span class="hljs-params">||</span>---- package.json
<span class="hljs-params">||</span>-- src</code></pre>
<ul>
<li>build 中存放一些脚本执行文件，用于工程的调试、发布。</li>
<li>docs 中存放文档调试的脚本，生成一个文档调试服务器。</li>
<li>examples 中存放组件调试的脚本，生成一个组件调试服务器。（不存放组件例子）</li>
<li>packages 存放真实组件，以及组件的文档和例子。</li>
<li>src 存放组件可以使用的公共方法。</li>
</ul>
<p>详情请查看我们的前端同学南洋写<a href="https://github.com/ShowJoy-com/showjoy-blog/issues/37" rel="nofollow noreferrer" target="_blank">「大前端」尚妆达人店 UI 组件化 工程实践</a></p>
<h4>(二) 其他</h4>
<ul>
<li>Cookie 支持</li>
<li>HttpDNS 接入</li>
<li>图片支持裁剪、webp</li>
<li>性能监控，正在做</li>
<li>增量更新，正在做</li>
</ul>
<blockquote>
<p>以上就是我们这一年的总结，希望能给大家带来参考。欢迎讨论交流文中的不足。</p>
<p>感谢团队所有成员，以上是我们一起努力的结果。<br>@嘉文，资深iOS，<a href="https://github.com/Luis-X" rel="nofollow noreferrer" target="_blank">github</a>，<a href="http://www.jianshu.com/u/6387bbe37e0a" rel="nofollow noreferrer" target="_blank">博客</a><br>@黎鹤，资深iOS，<a href="https://github.com/EmptyWalker" rel="nofollow noreferrer" target="_blank">github</a><br>@路远，资深Android，<a href="https://github.com/chendongMarch" rel="nofollow noreferrer" target="_blank">github</a>，<a href="http://cdevlab.top" rel="nofollow noreferrer" target="_blank">博客</a><br>@米奇，前端女神，欢迎关注<a href="https://weibo.com/RyenCheer" rel="nofollow noreferrer" target="_blank">微博</a><br>@南洋，前端大神，欢迎关注<a href="https://weibo.com/u/2115840795" rel="nofollow noreferrer" target="_blank">微博</a> ，技术文章产出高，<br>@路飞，移动端负责人，<a href="https://github.com/or0fun" rel="nofollow noreferrer" target="_blank">github</a>，<a href="http://ie8384.com" rel="nofollow noreferrer" target="_blank">博客</a></p>
<p>感谢以下大神文章提供的帮助：（看了很多文章，如果没有加了，麻烦告知一声）<br><a href="https://weex.apache.org/cn/" rel="nofollow noreferrer" target="_blank">Weex官网</a><br><a>Weex github</a><br><a href="http://react-china.org/t/rax-rax/11552" rel="nofollow noreferrer" target="_blank">Rax官网</a><br><a href="http://www.jianshu.com/p/32a6ac9fc503" rel="nofollow noreferrer" target="_blank">网易严选App感受Weex开发</a><br><a href="http://www.jianshu.com/p/d085032d4788" rel="nofollow noreferrer" target="_blank">由FlexBox算法强力驱动的Weex布局引擎</a><br><a href="http://www.jianshu.com/p/419b96aecc39" rel="nofollow noreferrer" target="_blank">Weex 事件传递的那些事儿</a><br><a href="http://www.jianshu.com/p/edaf0448df01" rel="nofollow noreferrer" target="_blank">Weex 中别具匠心的 JS Framework</a><br><a href="http://www.jianshu.com/p/740431068ff5" rel="nofollow noreferrer" target="_blank">地球上最全的weex踩坑攻略-出自大量实践与沉淀</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex在达人店的一年实践

## 原文链接
[https://segmentfault.com/a/1190000012386619](https://segmentfault.com/a/1190000012386619)

