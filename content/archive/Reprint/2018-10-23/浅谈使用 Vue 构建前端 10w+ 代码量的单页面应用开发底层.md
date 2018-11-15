---
title: 浅谈使用 Vue 构建前端 10w+ 代码量的单页面应用开发底层
hidden: true
categories: reprint
slug: 9a0ea8f2
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015472616?w=845&amp;h=622" src="https://static.alili.tech/img/remote/1460000015472616?w=845&amp;h=622" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">开始之前</h2>
<p>随着业务的不断累积，目前我们 <code>ToC 端</code>主要项目，除去 <code>node_modules</code>， <code>build 配置文件</code>，<code>dist 静态资源文件</code>的代码量为 <code>137521</code> 行，后台管理系统下各个子应用代码，除去依赖等文件的总行数也达到 <code>100万</code> 多一点。</p>
<blockquote>代码量意味不了什么，只能证明模块很多，但相同两个项目，在<code>运行时性能相同</code>情况下，<strong>你的 <code>10 万</code>行代码能容纳并维护 <code>150</code> 个模块，并且开发顺畅，我的项目中 <code>10 万</code>行代码却只能容纳 <code>100</code> 个模块，添加功能也好，维护起来也较为繁琐，这就很值得思考</strong>。</blockquote>
<p>本文会在主要描述以 <code>Vue 技术栈</code>为<code>技术主体</code>，<code>ToC 端</code>项目<code>业务主体</code>，在构建过程中，遇到或者总结的点（也会提及一些 ToB 项目的场景），<strong>可能并不适合你的业务场景（仅供参考），我会尽可能多的描述问题与其中的思考，最大可能的帮助到需要的同学</strong>，也辛苦开发者发现问题或者不合理/不正确的地方及时向我反馈，会尽快修改，欢迎有更好的实现方式来 <code>pr</code>。</p>
<h5>Git 地址</h5>
<ul><li>
<a href="https://github.com/PerseveranceZ/vue-develop-template" rel="nofollow noreferrer" target="_blank">vue-develop-template</a> 完善中，可以运行</li></ul>
<h5>React 项目</h5>
<p>可以参考<code>蚂蚁金服数据体验技术团队</code>编写的文章：</p>
<ul><li><a href="https://juejin.im/post/59cb0d0b5188257e876a2d27" rel="nofollow noreferrer" target="_blank">如何管理好10万行代码的前端单页面应用</a></li></ul>
<p>本文并不是基于上面文章写的，不过当时在看到他们文章之后觉得有相似的地方，相较于这篇文章，本文可能会枯燥些，会有大量代码，同学可以直接用上仓库看。</p>
<h2 id="articleHeader1">① 单页面，多页面</h2>
<p>首先要思考我们的项目最终的<code>构建主体</code>是<code>单页面</code>，还是<code>多页面</code>，还是<code>单页 + 多页</code>，通过他们的优缺点来分析：</p>
<ul>
<li>
<p><strong>单页面（SPA）</strong></p>
<ul>
<li>优点：体验好，路由之间跳转流程，可定制转场动画，使用了<code>懒加载</code>可有效减少首页白屏时间，相较于<code>多页面</code>减少了用户访问静态资源服务器的次数等。</li>
<li>缺点：初始会加载较大的静态资源，并且随着业务增长会越来越大，<code>懒加载</code>也有他的弊端，不做特殊处理不利于 SEO 等。</li>
</ul>
</li>
<li>
<p><strong>多页面（MPA）</strong>：</p>
<ul>
<li>优点：对搜索引擎友好，开发难度较低。</li>
<li>缺点：资源请求较多，整页刷新体验较差，页面间传递数据只能依赖 <code>URL</code>，<code>cookie</code>，<code>storage</code> 等方式，较为局限。</li>
</ul>
</li>
<li>
<p><strong>SPA + MPA</strong></p>
<ul>
<li>这种方式常见于较<code>老 MPA 项目迁移至 SPA 的情况</code>，缺点结合两者，两种主体通信方式也只能以兼容<code>MPA 为准</code>
</li>
<li>不过这种方式也有他的好处，假如你的 SPA 中，有类似文章分享这样（没有后端直出，后端返 <code>HTML 串</code>的情况下），想保证用户体验在 SPA 中开发一个页面，在 MPA 中也开发一个页面，去掉没用的依赖，或者直接用原生 JS 来开发，分享出去是 MPA 的文章页面，这样可以<strong>加快分享出去的打开速度，同时也能减少静态资源服务器的压力</strong>，因为如果分享出去的是 SPA 的文章页面，那 SPA 所需的静态资源<code>至少都需要去进行协商请求</code>,当然如果服务配置了强缓存就忽略以上所说。</li>
</ul>
</li>
</ul>
<p>我们首先根据业务所需，来最终确定<code>构建主体</code>，而我们选择了<code>体验至上的 SPA</code>，并选用 <code>Vue</code> 技术栈。</p>
<h2 id="articleHeader2">② 目录结构</h2>
<p>其实我们看开源的绝大部分项目中，目录结构都会差不太多，我们可以综合一下来个通用的 <code>src</code> 目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
├── assets          // 资源目录 图片，样式，iconfont
├── components      // 全局通用组件目录
├── config          // 项目配置，拦截器，开关
├── plugins         // 插件相关，生成路由、请求、store 等实例，并挂载 Vue 实例
├── directives      // 拓展指令集合
├── routes          // 路由配置
├── service         // 服务层
├── utils           // 工具类
└── views           // 视图层" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>src
├── assets          <span class="hljs-comment">// 资源目录 图片，样式，iconfont</span>
├── components      <span class="hljs-comment">// 全局通用组件目录</span>
├── <span class="hljs-built_in">config</span>          <span class="hljs-comment">// 项目配置，拦截器，开关</span>
├── plugins         <span class="hljs-comment">// 插件相关，生成路由、请求、store 等实例，并挂载 Vue 实例</span>
├── directives      <span class="hljs-comment">// 拓展指令集合</span>
├── routes          <span class="hljs-comment">// 路由配置</span>
├── service         <span class="hljs-comment">// 服务层</span>
├── utils           <span class="hljs-comment">// 工具类</span>
└── views           <span class="hljs-comment">// 视图层</span></code></pre>
<h2 id="articleHeader3">③ 通用组件</h2>
<p><code>components</code> 中我们会存放 UI 组件库中的那些常见通用组件了，在项目中直接通过设置<code>别名</code>来使用，如果其他项目需要使用，就发到 <code>npm</code> 上。</p>
<h4>结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// components 简易结构
components
├── dist
├── build
├── src      
    ├── modal
    ├── toast
    └── ...
├── index.js             
└── package.json        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// components 简易结构</span>
components
├── dist
├── build
├── src      
    ├── modal
    ├── toast
    └── ...
├── index<span class="hljs-selector-class">.js</span>             
└── package<span class="hljs-selector-class">.json</span>        </code></pre>
<h4>项目中使用</h4>
<p>如果想最终编译成 <code>es5</code>，直接在 html 中使用或者部署 CDN 上，在 <code>build</code> 配置简单的打包逻辑，搭配着 <code>package.json</code> 构建 UI组件 的自动化打包发布，最终部署 <code>dist</code> 下的内容，并发布到 <code>npm</code> 上即可。</p>
<p>而我们也可直接使用 <code>es6</code> 的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'Components/src/modal'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'Components/src/modal'</span></code></pre>
<h4>其他项目使用</h4>
<p>假设我们发布的 <code>npm 包</code>叫 <code>bm-ui</code>，并且下载到了本地 <code>npm i bm-ui -S</code>:</p>
<p>修改项目的最外层打包配置，在 rules 里 <code>babel-loader</code> 或 <code>happypack</code> 中添加 <code>include</code>，<code>node_modules/bm-ui</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.conf
...
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        // 这里添加
        include: [resolve('src'), resolve('test'), resolve('node_modules/bm-ui')]
    },{
    ...
    }]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// webpack.base.conf</span>
...
    rules: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
    },
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-comment">// 这里添加</span>
        include: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'node_modules/bm-ui'</span>)]
    },{
    ...
    }]
...</code></pre>
<p>然后搭配着 <code>babel-plugin-import</code> 直接在项目中使用即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { modal } from 'bm-ui'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { modal } <span class="hljs-keyword">from</span> <span class="hljs-string">'bm-ui'</span></code></pre>
<h4>多个组件库</h4>
<p>同时有多个组件库的话，又或者有同学专门进行组件开发的话，把 `components<br>内部细分`一下，多一个文件分层。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="components
├── bm-ui-1 
├── bm-ui-2
└── ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">components</span>
├── <span class="hljs-keyword">bm-ui-1 </span>
├── <span class="hljs-keyword">bm-ui-2
</span>└── ...</code></pre>
<p>你的打包配置文件可以放在 <code>components</code> 下，进行统一打包，当然如果要开源出去还是放在对应库下。</p>
<h2 id="articleHeader4">④ 全局配置，插件与拦截器</h2>
<p>这个点其实会是项目中经常被忽略的，或者说很少聚合到一起，但同时我认为是<strong>整个项目中的重要之一</strong>，后续会有例子说道。</p>
<h4>全局配置，拦截器目录结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config
├── index.js             // 全局配置/开关
├── interceptors        // 拦截器
    ├── index.js        // 入口文件
    ├── axios.js        // 请求/响应拦截
    ├── router.js       // 路由拦截
    └── ...
└── ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>config
├── index<span class="hljs-selector-class">.js</span>             <span class="hljs-comment">// 全局配置/开关</span>
├── interceptors        <span class="hljs-comment">// 拦截器</span>
    ├── index<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// 入口文件</span>
    ├── axios<span class="hljs-selector-class">.js</span>        <span class="hljs-comment">// 请求/响应拦截</span>
    ├── router<span class="hljs-selector-class">.js</span>       <span class="hljs-comment">// 路由拦截</span>
    └── ...
└── ...
</code></pre>
<h4>全局配置</h4>
<p>我们在 <code>config/index.js</code> 可能会有如下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/index.js

// 当前宿主平台 兼容多平台应该通过一些特定函数来取得
export const HOST_PLATFORM = 'WEB'
// 这个就不多说了
export const NODE_ENV = process.env.NODE_ENV || 'prod'

// 是否强制所有请求访问本地 MOCK，看到这里同学不难猜到，每个请求也可以单独控制是否请求 MOCK
export const AJAX_LOCALLY_ENABLE = false
// 是否开启监控
export const MONITOR_ENABLE = true
// 路由默认配置，路由表并不从此注入
export const ROUTER_DEFAULT_CONFIG = {
    waitForData: true,
    transitionOnLoad: true
}

// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
    timeout: 20000,
    maxContentLength: 2000,
    headers: {}
}

// vuex 默认配置
export const VUEX_DEFAULT_CONFIG = {
    strict: process.env.NODE_ENV !== 'production'
}

// API 默认配置
export const API_DEFAULT_CONFIG = {
    mockBaseURL: '',
    mock: true,
    debug: false,
    sep: '/'
}

// CONST 默认配置
export const CONST_DEFAULT_CONFIG = {
    sep: '/'
}

// 还有一些业务相关的配置
// ...


// 还有一些方便开发的配置
export const CONSOLE_REQUEST_ENABLE = true      // 开启请求参数打印
export const CONSOLE_RESPONSE_ENABLE = true     // 开启响应参数打印
export const CONSOLE_MONITOR_ENABLE = true      // 监控记录打印" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/index.js</span>

<span class="hljs-comment">// 当前宿主平台 兼容多平台应该通过一些特定函数来取得</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> HOST_PLATFORM = <span class="hljs-string">'WEB'</span>
<span class="hljs-comment">// 这个就不多说了</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> NODE_ENV = process.env.NODE_ENV || <span class="hljs-string">'prod'</span>

<span class="hljs-comment">// 是否强制所有请求访问本地 MOCK，看到这里同学不难猜到，每个请求也可以单独控制是否请求 MOCK</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AJAX_LOCALLY_ENABLE = <span class="hljs-literal">false</span>
<span class="hljs-comment">// 是否开启监控</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> MONITOR_ENABLE = <span class="hljs-literal">true</span>
<span class="hljs-comment">// 路由默认配置，路由表并不从此注入</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ROUTER_DEFAULT_CONFIG = {
    <span class="hljs-attr">waitForData</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">transitionOnLoad</span>: <span class="hljs-literal">true</span>
}

<span class="hljs-comment">// axios 默认配置</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AXIOS_DEFAULT_CONFIG = {
    <span class="hljs-attr">timeout</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-attr">maxContentLength</span>: <span class="hljs-number">2000</span>,
    <span class="hljs-attr">headers</span>: {}
}

<span class="hljs-comment">// vuex 默认配置</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> VUEX_DEFAULT_CONFIG = {
    <span class="hljs-attr">strict</span>: process.env.NODE_ENV !== <span class="hljs-string">'production'</span>
}

<span class="hljs-comment">// API 默认配置</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> API_DEFAULT_CONFIG = {
    <span class="hljs-attr">mockBaseURL</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">mock</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">debug</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">sep</span>: <span class="hljs-string">'/'</span>
}

<span class="hljs-comment">// CONST 默认配置</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CONST_DEFAULT_CONFIG = {
    <span class="hljs-attr">sep</span>: <span class="hljs-string">'/'</span>
}

<span class="hljs-comment">// 还有一些业务相关的配置</span>
<span class="hljs-comment">// ...</span>


<span class="hljs-comment">// 还有一些方便开发的配置</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CONSOLE_REQUEST_ENABLE = <span class="hljs-literal">true</span>      <span class="hljs-comment">// 开启请求参数打印</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CONSOLE_RESPONSE_ENABLE = <span class="hljs-literal">true</span>     <span class="hljs-comment">// 开启响应参数打印</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CONSOLE_MONITOR_ENABLE = <span class="hljs-literal">true</span>      <span class="hljs-comment">// 监控记录打印</span></code></pre>
<p>可以看出这里汇集了项目中<strong>所有用到的配置</strong>，下面我们在 <code>plugins</code> 中实例化插件，注入对应配置，目录如下:</p>
<h4>插件目录结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins
├── api.js              // 服务层 api 插件
├── axios.js            // 请求实例插件
├── const.js            // 服务层 const 插件
├── store.js            // vuex 实例插件
├── inject.js           // 注入 Vue 原型插件
└── router.js           // 路由实例插件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>plugins
├── api<span class="hljs-selector-class">.js</span>              <span class="hljs-comment">// 服务层 api 插件</span>
├── axios<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// 请求实例插件</span>
├── const<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// 服务层 const 插件</span>
├── store<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// vuex 实例插件</span>
├── inject<span class="hljs-selector-class">.js</span>           <span class="hljs-comment">// 注入 Vue 原型插件</span>
└── router<span class="hljs-selector-class">.js</span>           <span class="hljs-comment">// 路由实例插件</span></code></pre>
<h4>实例化插件并注入配置</h4>
<p>这里先举出两个例子，看我们是如何注入配置，拦截器并实例化的</p>
<p>实例化 <code>router</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import ROUTES from 'Routes'
import {ROUTER_DEFAULT_CONFIG} from 'Config/index'
import {routerBeforeEachFunc} from 'Config/interceptors/router'

Vue.use(Router)

// 注入默认配置和路由表
let routerInstance = new Router({
    ...ROUTER_DEFAULT_CONFIG,
    routes: ROUTES
})
// 注入拦截器
routerInstance.beforeEach(routerBeforeEachFunc)

export default routerInstance
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> ROUTES <span class="hljs-keyword">from</span> <span class="hljs-string">'Routes'</span>
<span class="hljs-keyword">import</span> {ROUTER_DEFAULT_CONFIG} <span class="hljs-keyword">from</span> <span class="hljs-string">'Config/index'</span>
<span class="hljs-keyword">import</span> {routerBeforeEachFunc} <span class="hljs-keyword">from</span> <span class="hljs-string">'Config/interceptors/router'</span>

Vue.use(Router)

<span class="hljs-comment">// 注入默认配置和路由表</span>
<span class="hljs-keyword">let</span> routerInstance = <span class="hljs-keyword">new</span> Router({
    ...ROUTER_DEFAULT_CONFIG,
    <span class="hljs-attr">routes</span>: ROUTES
})
<span class="hljs-comment">// 注入拦截器</span>
routerInstance.beforeEach(routerBeforeEachFunc)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> routerInstance
</code></pre>
<p>实例化 <code>axios</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import {AXIOS_DEFAULT_CONFIG} from 'Config/index'
import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from 'Config/interceptors/axios'

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

// 注入请求拦截
axiosInstance
    .interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入响应拦截
axiosInstance
    .interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> {AXIOS_DEFAULT_CONFIG} <span class="hljs-keyword">from</span> <span class="hljs-string">'Config/index'</span>
<span class="hljs-keyword">import</span> {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} <span class="hljs-keyword">from</span> <span class="hljs-string">'Config/interceptors/axios'</span>

<span class="hljs-keyword">let</span> axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

<span class="hljs-comment">// 注入请求拦截</span>
axiosInstance
    .interceptors.request.use(requestSuccessFunc, requestFailFunc)
<span class="hljs-comment">// 注入响应拦截</span>
axiosInstance
    .interceptors.response.use(responseSuccessFunc, responseFailFunc)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> axiosInstance</code></pre>
<p>我们在 <code>main.js</code> <strong>注入插件</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import Vue from 'vue'

GLOBAL.vbus = new Vue()

// import 'Components'// 全局组件注册
import 'Directives' // 指令

// 引入插件
import router from 'Plugins/router'
import inject from 'Plugins/inject'
import store from 'Plugins/store'
// 引入组件库及其组件库样式 
// 不需要配置的库就在这里引入 
// 如果需要配置都放入 plugin 即可
import VueOnsen from 'vue-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
// 引入根组件
import App from './App'

Vue.use(inject)
Vue.use(VueOnsen)

// render
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

GLOBAL.vbus = <span class="hljs-keyword">new</span> Vue()

<span class="hljs-comment">// import 'Components'// 全局组件注册</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'Directives'</span> <span class="hljs-comment">// 指令</span>

<span class="hljs-comment">// 引入插件</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'Plugins/router'</span>
<span class="hljs-keyword">import</span> inject <span class="hljs-keyword">from</span> <span class="hljs-string">'Plugins/inject'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'Plugins/store'</span>
<span class="hljs-comment">// 引入组件库及其组件库样式 </span>
<span class="hljs-comment">// 不需要配置的库就在这里引入 </span>
<span class="hljs-comment">// 如果需要配置都放入 plugin 即可</span>
<span class="hljs-keyword">import</span> VueOnsen <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-onsenui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'onsenui/css/onsenui.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'onsenui/css/onsen-css-components.css'</span>
<span class="hljs-comment">// 引入根组件</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>

Vue.use(inject)
Vue.use(VueOnsen)

<span class="hljs-comment">// render</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    router,
    store,
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
    <span class="hljs-attr">components</span>: { App }
})
</code></pre>
<p><code>axios</code> 实例我们并没有直接引用，相信你也猜到他是通过 <code>inject</code> 插件引用的，我们看下 <code>inject</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from './axios'
import api from './api'
import consts from './const'
GLOBAL.ajax = axios
 
export default {
    install: (Vue, options) => {
        Vue.prototype.$api = api
        Vue.prototype.$ajax = axios
        Vue.prototype.$const = consts
        // 需要挂载的都放在这里
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'./axios'</span>
<span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'./api'</span>
<span class="hljs-keyword">import</span> consts <span class="hljs-keyword">from</span> <span class="hljs-string">'./const'</span>
GLOBAL.ajax = axios
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">install</span>: <span class="hljs-function">(<span class="hljs-params">Vue, options</span>) =&gt;</span> {
        Vue.prototype.$api = api
        Vue.prototype.$ajax = axios
        Vue.prototype.$<span class="hljs-keyword">const</span> = consts
        <span class="hljs-comment">// 需要挂载的都放在这里</span>
    }
}</code></pre>
<p>这里可以挂载你想在业务中( <code>vue</code> 实例中)便捷访问的 <code>api</code>，除了 <code>$ajax</code> 之外，<code>api</code> 和 <code>const</code> 两个插件是我们<strong>服务层中主要的功能</strong>，后续会介绍，这样我们插件流程大致运转起来，下面写对应拦截器的方法。</p>
<h4>请求，路由拦截器</h4>
<p>在<code>ajax 拦截器</code>中(<code>config/interceptors/axios.js</code>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/interceptors/axios.js

import {CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE} from '../index.js'

export function requestSuccessFunc (requestObj) {
    CONSOLE_REQUEST_ENABLE &amp;&amp; console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    // ...
    
    return requestObj
}

export function requestFailFunc (requestError) {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    // ...
    
    return Promise.reject(requestError);
}

export function responseSuccessFunc (responseObj) {
    // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
    // ...
    // 假设我们请求体为
    // {
    //     code: 1010,
    //     msg: 'this is a msg',
    //     data: null
    // }
    
    let resData =  responseObj.data
    let {code} = resData
    
    switch(code) {
        case 0: // 如果业务成功，直接进成功回调  
            return resData.data;
        case 1111: 
            // 如果业务失败，根据不同 code 做不同处理
            // 比如最常见的授权过期跳登录
            // 特定弹窗
            // 跳转特定页面等
            
            location.href = xxx // 这里的路径也可以放到全局配置里
            return;
        default:
            // 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层
            !responseObj.config.noShowDefaultError &amp;&amp; GLOBAL.vbus.$emit('global.$dialog.show', resData.msg);
            return Promise.reject(resData);
    }
}

export function responseFailFunc (responseError) {
    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
    // ...
    return Promise.reject(responseError);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/interceptors/axios.js</span>

<span class="hljs-keyword">import</span> {CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE} <span class="hljs-keyword">from</span> <span class="hljs-string">'../index.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestSuccessFunc</span> (<span class="hljs-params">requestObj</span>) </span>{
    CONSOLE_REQUEST_ENABLE &amp;&amp; <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'requestInterceptorFunc'</span>, <span class="hljs-string">`url: <span class="hljs-subst">${requestObj.url}</span>`</span>, requestObj)
    <span class="hljs-comment">// 自定义请求拦截逻辑，可以处理权限，请求发送监控等</span>
    <span class="hljs-comment">// ...</span>
    
    <span class="hljs-keyword">return</span> requestObj
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestFailFunc</span> (<span class="hljs-params">requestError</span>) </span>{
    <span class="hljs-comment">// 自定义发送请求失败逻辑，断网，请求发送监控等</span>
    <span class="hljs-comment">// ...</span>
    
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(requestError);
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">responseSuccessFunc</span> (<span class="hljs-params">responseObj</span>) </span>{
    <span class="hljs-comment">// 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等</span>
    <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// 假设我们请求体为</span>
    <span class="hljs-comment">// {</span>
    <span class="hljs-comment">//     code: 1010,</span>
    <span class="hljs-comment">//     msg: 'this is a msg',</span>
    <span class="hljs-comment">//     data: null</span>
    <span class="hljs-comment">// }</span>
    
    <span class="hljs-keyword">let</span> resData =  responseObj.data
    <span class="hljs-keyword">let</span> {code} = resData
    
    <span class="hljs-keyword">switch</span>(code) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>: <span class="hljs-comment">// 如果业务成功，直接进成功回调  </span>
            <span class="hljs-keyword">return</span> resData.data;
        <span class="hljs-keyword">case</span> <span class="hljs-number">1111</span>: 
            <span class="hljs-comment">// 如果业务失败，根据不同 code 做不同处理</span>
            <span class="hljs-comment">// 比如最常见的授权过期跳登录</span>
            <span class="hljs-comment">// 特定弹窗</span>
            <span class="hljs-comment">// 跳转特定页面等</span>
            
            location.href = xxx <span class="hljs-comment">// 这里的路径也可以放到全局配置里</span>
            <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">default</span>:
            <span class="hljs-comment">// 业务中还会有一些特殊 code 逻辑，我们可以在这里做统一处理，也可以下方它们到业务层</span>
            !responseObj.config.noShowDefaultError &amp;&amp; GLOBAL.vbus.$emit(<span class="hljs-string">'global.$dialog.show'</span>, resData.msg);
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(resData);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">responseFailFunc</span> (<span class="hljs-params">responseError</span>) </span>{
    <span class="hljs-comment">// 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理</span>
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(responseError);
}</code></pre>
<p>定义<code>路由拦截器</code>(<code>config/interceptors/router.js</code>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/interceptors/router.js

export function routerBeforeFunc (to, from, next) {
    // 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理
    
    // next(...)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/interceptors/router.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">routerBeforeFunc</span> (<span class="hljs-params">to, from, next</span>) </span>{
    <span class="hljs-comment">// 这里可以做页面拦截，很多后台系统中也非常喜欢在这里面做权限处理</span>
    
    <span class="hljs-comment">// next(...)</span>
}</code></pre>
<p>最后在<code>入口文件(config/interceptors/index.js)</code>中引入并暴露出来即可:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} from './ajax'
import {routerBeforeEachFunc} from './router'

let interceptors = {
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc,
    routerBeforeEachFunc
}

export default interceptors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc} <span class="hljs-keyword">from</span> <span class="hljs-string">'./ajax'</span>
<span class="hljs-keyword">import</span> {routerBeforeEachFunc} <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

<span class="hljs-keyword">let</span> interceptors = {
    requestSuccessFunc,
    requestFailFunc,
    responseSuccessFunc,
    responseFailFunc,
    routerBeforeEachFunc
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> interceptors</code></pre>
<p>请求拦截这里代码都很简单，对于 <code>responseSuccessFunc</code> 中 switch <code>default</code> 逻辑做下简单说明：</p>
<ol><li>
<code>responseObj.config.noShowDefaultError</code> 这里可能不太好理解</li></ol>
<p>我们在请求的时候，可以传入一个 axios 中并没有意义的 <code>noShowDefaultError</code> 参数为我们业务所用，当值为 false 或者不存在时，我们会触发全局事件 <code>global.dialog.show</code>，<code>global.dialog.show</code>我们会注册在 <code>app.vue</code> 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.vue

export default {
    ...
    created() {
        this.bindEvents
    },
    methods: {
        bindEvents() {
            GLOBAL.vbus.$on('global.dialog.show', (msg) => {
                if(msg) return
                // 我们会在这里注册全局需要操控试图层的事件，方便在非业务代码中通过发布订阅调用
                this.$dialog.popup({
                    content: msg 
                });
            })
        }
        ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app.vue</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    ...
    created() {
        <span class="hljs-keyword">this</span>.bindEvents
    },
    <span class="hljs-attr">methods</span>: {
        bindEvents() {
            GLOBAL.vbus.$on(<span class="hljs-string">'global.dialog.show'</span>, (msg) =&gt; {
                <span class="hljs-keyword">if</span>(msg) <span class="hljs-keyword">return</span>
                <span class="hljs-comment">// 我们会在这里注册全局需要操控试图层的事件，方便在非业务代码中通过发布订阅调用</span>
                <span class="hljs-keyword">this</span>.$dialog.popup({
                    <span class="hljs-attr">content</span>: msg 
                });
            })
        }
        ...
    }
}</code></pre>
<blockquote>这里也可以把弹窗状态放入 <code>Store</code> 中，按团队喜好，我们习惯把<strong>公共的涉及视图逻辑的公共状态在这里注册，和业务区分开来</strong>。</blockquote>
<ol>
<li>
<code>GLOBAL</code> 是我们挂载 <code>window</code> 上的<code>全局对象</code>，我们把需要挂载的东西都放在 <code>window.GLOBAL</code> 里，减少命名空间冲突的可能。</li>
<li>
<code>vbus</code> 其实就是我们开始 <code>new Vue()</code> 挂载上去的</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GLOBAL.vbus = new Vue()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">GLOBAL.vbus = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>()</code></pre>
<ol><li>我们在这里 <code>Promise.reject</code> 出去，我们就可以在 <code>error</code> 回调里面只处理我们的业务逻辑，而其他如<code>断网</code>、<code>超时</code>、<code>服务器出错</code>等均通过拦截器进行统一处理。</li></ol>
<h4>拦截器处理前后对比</h4>
<p>对比下<code>处理前后在业务中的发送请求的代码</code>：</p>
<p><strong>拦截器处理前</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$axios.get('test_url').then(({code, data}) => {
    if( code === 0 ) {
        // 业务成功
    } else if () {}
        // em... 各种业务不成功处理，如果遇到通用的处理，还需要抽离出来
    
    
}, error => {
   // 需要根据 error 做各种抽离好的处理逻辑，断网，超时等等...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'test_url'</span>).then(<span class="hljs-function">(<span class="hljs-params">{code, data}</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span>( code === <span class="hljs-number">0</span> ) {
        <span class="hljs-comment">// 业务成功</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> () {}
        <span class="hljs-comment">// em... 各种业务不成功处理，如果遇到通用的处理，还需要抽离出来</span>
    
    
}, error =&gt; {
   <span class="hljs-comment">// 需要根据 error 做各种抽离好的处理逻辑，断网，超时等等...</span>
})</code></pre>
<p><strong>拦截器处理后</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 业务失败走默认弹窗逻辑的情况
this.$axios.get('test_url').then(({data}) => {
    // 业务成功，直接操作 data 即可
})

// 业务失败自定义
this.$axios.get('test_url', {
    noShowDefaultError: true // 可选
}).then(({data}) => {
    // 业务成功，直接操作 data 即可
    
}, (code, msg) => {
    // 当有特定 code 需要特殊处理，传入 noShowDefaultError:true，在这个回调处理就行
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 业务失败走默认弹窗逻辑的情况</span>
<span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'test_url'</span>).then(<span class="hljs-function">(<span class="hljs-params">{data}</span>) =&gt;</span> {
    <span class="hljs-comment">// 业务成功，直接操作 data 即可</span>
})

<span class="hljs-comment">// 业务失败自定义</span>
<span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'test_url'</span>, {
    <span class="hljs-attr">noShowDefaultError</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// 可选</span>
}).then(<span class="hljs-function">(<span class="hljs-params">{data}</span>) =&gt;</span> {
    <span class="hljs-comment">// 业务成功，直接操作 data 即可</span>
    
}, (code, msg) =&gt; {
    <span class="hljs-comment">// 当有特定 code 需要特殊处理，传入 noShowDefaultError:true，在这个回调处理就行</span>
})</code></pre>
<h4><strong>为什么要如此配置与拦截器？</strong></h4>
<blockquote>在应对项目开发过程中需求的不可预见性时，让我们能处理的更快更好</blockquote>
<p>到这里很多同学会觉得，就这么简单的引入判断，可有可无，<br>就如我们最近做的一个需求来说，我们 ToC 端项目之前一直是在微信公众号中打开的，而我们需要在小程序中通过 webview 打开大部分流程，而我们也<code>没有时间，没有空间</code>在小程序中重写近 100 + 的页面流程，<strong>这是我们开发之初并没有想到的</strong>。这时候必须把项目兼容到小程序端，在兼容过程中可能需要解决以下问题：</p>
<ol>
<li>请求路径完全不同。</li>
<li>需要兼容两套不同的权限系统。</li>
<li>有些流程在小程序端需要做改动，跳转到特定页面。</li>
<li>有些公众号的 <code>api</code> ，在小程序中无用，需要调用小程序的逻辑，需要做兼容。</li>
<li>很多也页面上的元素，小程序端不做展示等。</li>
</ol>
<blockquote>可以看出，稍微不慎，会影响公众号现有逻辑。</blockquote>
<ul>
<li>添加请求拦截 <code>interceptors/minaAjax.js</code>， <code>interceptors/minaRouter.js</code>，原有的换更为 <code>interceptors/officalAjax.js</code>，<code>interceptors/officalRouter.js</code>，在入口文件<code>interceptors/index.js</code>，<strong>根据当前<code>宿主平台</code>，也就是全局配置 <code>HOST_PLATFORM</code>，通过<code>代理模式</code>和<code>策略模式</code>，注入对应平台的拦截器</strong>，<strong>在<code>minaAjax.js</code>中重写请求路径和权限处理，在 <code>minaRouter.js</code> 中添加页面拦截配置，跳转到特定页面</strong>，这样一并解决了上面的<code>问题 1，2，3</code>。</li>
<li>
<code>问题 4</code> 其实也比较好处理了，拷贝需要兼容 <code>api</code> 的页面，重写里面的逻辑，通过<code>路由拦截器一并做跳转处理</code>。</li>
<li>
<code>问题 5</code> 也很简单，拓展两个<strong>自定义指令 v-mina-show 和 v-mina-hide</strong> ，在展示不同步的地方可以直接使用指令。</li>
</ul>
<p>最终用最少的代码，最快的时间完美上线，丝毫没影响到现有 toC 端业务，而且<strong>这样把所有兼容逻辑绝大部分聚合到了一起，方便二次拓展和修改。</strong></p>
<p>虽然这只是根据自身业务结合来说明，可能没什么说服力，不过不难看出全局配置/拦截器 虽然代码不多，但却是整个项目的核心之一，我们可以在里面做更多 <code>awesome</code> 的事情。</p>
<h2 id="articleHeader5">⑤ 路由配置与懒加载</h2>
<p><code>directives</code> 里面没什么可说的，不过很多难题都可以通过他来解决，要时刻记住，我们可以再指令里面<strong>操作虚拟 DOM。</strong></p>
<h4>路由配置</h4>
<p>而我们根据自己的业务性质，最终根据业务流程来拆分配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes
├── index.js            // 入口文件
├── common.js           // 公共路由，登录，提示页等
├── account.js          // 账户流程
├── register.js         // 挂号流程
└── ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>routes
├── index<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// 入口文件</span>
├── common<span class="hljs-selector-class">.js</span>           <span class="hljs-comment">// 公共路由，登录，提示页等</span>
├── account<span class="hljs-selector-class">.js</span>          <span class="hljs-comment">// 账户流程</span>
├── register<span class="hljs-selector-class">.js</span>         <span class="hljs-comment">// 挂号流程</span>
└── ...</code></pre>
<p>最终通过 index.js 暴露出去给 <code>plugins/router</code> 实例使用，这里的拆分配置有两个注意的地方：</p>
<ul>
<li>需要根据自己业务性质来决定，有的项目可能适合<code>业务线</code>划分，有的项目更适合以 <code>功能</code> 划分。</li>
<li>在多人协作过程中，尽可能避免冲突，或者减少冲突。</li>
</ul>
<h4>懒加载</h4>
<p>文章开头说到单页面静态资源过大，<code>首次打开/每次版本升级</code>后都会较慢，可以用<code>懒加载</code>来拆分静态资源，减少白屏时间，但开头也说到<code>懒加载</code>也有待商榷的地方：</p>
<ul>
<li>如果异步加载较多的组件，会给静态资源服务器/ CDN 带来更大的访问压力的同时，如果当多个异步组件都被修改，造成版本号的变动，发布的时候会大大增加 CDN 被击穿的风险。</li>
<li>懒加载首次加载未被缓存的异步组件白屏的问题，造成用户体验不好。</li>
<li>异步加载通用组件，会在页面可能会在网络延时的情况下参差不齐的展示出来等。</li>
</ul>
<p>这就需要我们根据项目情况在<code>空间和时间</code>上做一些权衡。</p>
<p>以下几点可以作为简单的参考：</p>
<ul>
<li>对于访问量可控的项目，如<code>公司后台管理系统</code>中，可以以操作 view 为单位进行异步加载，通用组件全部同步加载的方式。</li>
<li>对于一些复杂度较高，实时度较高的应用类型，可采用按<code>功能模块拆分</code>进行异步组件加载。</li>
<li>如果项目想保证比较高的完整性和体验，迭代频率可控，不太关心首次加载时间的话，可按需使用异步加载或者直接不使用。</li>
</ul>
<blockquote>打包出来的 main.js 的大小，绝大部分都是在路由中引入的并注册的视图组件。</blockquote>
<h2 id="articleHeader6">⑥ Service 服务层</h2>
<p>服务层作为项目中的另一个核心之一，“自古以来”都是大家比较关心的地方。</p>
<p>不知道你是否看到过如下组织代码方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="views/
    pay/
        index.vue
        service.js
        components/
            a.vue
            b.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>views/
    pay/
        index<span class="hljs-selector-class">.vue</span>
        service<span class="hljs-selector-class">.js</span>
        components/
            <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.vue</span>
            <span class="hljs-selector-tag">b</span>.vue</code></pre>
<p>在 <code>service.js</code> 中写入编写数据来源</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const CONFIAG = {
    apple: '苹果',
    banana: '香蕉'
}
// ...

// ① 处理业务逻辑，还弹窗
export function getBInfo ({name = '', id = ''}) {
    return this.$ajax.get('/api/info', {
        name, 
        id
    }).then({age} => {
        this.$modal.show({
            content: age
        })
    })
}

// ② 不处理业务，仅仅写请求方法
export function getAInfo ({name = '', id = ''}) {
    return this.$ajax.get('/api/info', {
        name, 
        id
    })
}

..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CONFIAG = {
    <span class="hljs-attr">apple</span>: <span class="hljs-string">'苹果'</span>,
    <span class="hljs-attr">banana</span>: <span class="hljs-string">'香蕉'</span>
}
<span class="hljs-comment">// ...</span>

<span class="hljs-comment">// ① 处理业务逻辑，还弹窗</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBInfo</span> (<span class="hljs-params">{name = <span class="hljs-string">''</span>, id = <span class="hljs-string">''</span>}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$ajax.get(<span class="hljs-string">'/api/info'</span>, {
        name, 
        id
    }).then({age} =&gt; {
        <span class="hljs-keyword">this</span>.$modal.show({
            <span class="hljs-attr">content</span>: age
        })
    })
}

<span class="hljs-comment">// ② 不处理业务，仅仅写请求方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getAInfo</span> (<span class="hljs-params">{name = <span class="hljs-string">''</span>, id = <span class="hljs-string">''</span>}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$ajax.get(<span class="hljs-string">'/api/info'</span>, {
        name, 
        id
    })
}

...</code></pre>
<p>简单分析：</p>
<ul>
<li>① 就不多说了，拆分的不够单纯，当做二次开发的时候，你还得去找这弹窗到底哪里出来的。</li>
<li>② 看起来很美好，不掺杂业务逻辑，但不知道你与没遇到过这样情况，<strong>经常会有其他业务需要用到一样的枚举，请求一样的接口，而开发其他业务的同学并不知道你在这里有一份数据源，最终造成的结果就是数据源的代码到处冗余</strong>。</li>
</ul>
<p>我相信②在绝大多数项目中都能看到。</p>
<p>那么我们的目的就很明显了，<strong>解决冗余，方便使用</strong>，我们把枚举和请求接口的方法，通过插件，挂载到一个大对象上，注入 Vue 原型，方面业务使用即可。</p>
<h4>目录层级（仅供参考）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="service
├── api
    ├── index.js             // 入口文件
    ├── order.js             // 订单相关接口配置
    └── ...
├── const                   
    ├── index.js             // 入口文件
    ├── order.js             // 订单常量接口配置
    └── ...
├── store                    // vuex 状态管理
├── expands                  // 拓展
    ├── monitor.js           // 监控
    ├── beacon.js            // 打点
    ├── localstorage.js      // 本地存储
    └── ...                  // 按需拓展
└── ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>service
├── api
    ├── index.js             <span class="hljs-comment">// 入口文件</span>
    ├── <span class="hljs-keyword">order</span>.js             <span class="hljs-comment">// 订单相关接口配置</span>
    └── <span class="hljs-params">...</span>
├── const                   
    ├── index.js             <span class="hljs-comment">// 入口文件</span>
    ├── <span class="hljs-keyword">order</span>.js             <span class="hljs-comment">// 订单常量接口配置</span>
    └── <span class="hljs-params">...</span>
├── store                    <span class="hljs-comment">// vuex 状态管理</span>
├── expands                  <span class="hljs-comment">// 拓展</span>
    ├── monitor.js           <span class="hljs-comment">// 监控</span>
    ├── beacon.js            <span class="hljs-comment">// 打点</span>
    ├── localstorage.js      <span class="hljs-comment">// 本地存储</span>
    └── <span class="hljs-params">...</span>                  <span class="hljs-comment">// 按需拓展</span>
└── <span class="hljs-params">...</span>
</code></pre>
<h4>抽离模型</h4>
<p>首先抽离请求接口模型，可按照<code>领域模型抽离</code> (<code>service/api/index.js</code>):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    user: [{
        name: 'info',
        method: 'GET',
        desc: '测试接口1',
        path: '/api/info',
        mockPath: '/api/info',
        params: {
            a: 1,
            b: 2
        }
    }, {
        name: 'info2',
        method: 'GET',
        desc: '测试接口2',
        path: '/api/info2',
        mockPath: '/api/info2',
        params: {
            a: 1,
            b: 2,
            b: 3
        }
    }],
    order: [{
        name: 'change',
        method: 'POST',
        desc: '订单变更',
        path: '/api/order/change',
        mockPath: '/api/order/change',
        params: {
            type: 'SUCCESS'
        }
    }]
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">user</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'info'</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
        <span class="hljs-attr">desc</span>: <span class="hljs-string">'测试接口1'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/api/info'</span>,
        <span class="hljs-attr">mockPath</span>: <span class="hljs-string">'/api/info'</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
        }
    }, {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'info2'</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
        <span class="hljs-attr">desc</span>: <span class="hljs-string">'测试接口2'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/api/info2'</span>,
        <span class="hljs-attr">mockPath</span>: <span class="hljs-string">'/api/info2'</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
            <span class="hljs-attr">b</span>: <span class="hljs-number">3</span>
        }
    }],
    <span class="hljs-attr">order</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'change'</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
        <span class="hljs-attr">desc</span>: <span class="hljs-string">'订单变更'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/api/order/change'</span>,
        <span class="hljs-attr">mockPath</span>: <span class="hljs-string">'/api/order/change'</span>,
        <span class="hljs-attr">params</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-string">'SUCCESS'</span>
        }
    }]
    ...
}</code></pre>
<p>定制下需要的几个功能：</p>
<ul>
<li>请求参数自动截取。</li>
<li>请求参数不传，则发送默认配置参数。</li>
<li>得需要命名空间。</li>
<li>通过全局配置开启调试模式。</li>
<li>通过全局配置来控制走本地 mock 还是线上接口等。</li>
</ul>
<h4>插件编写</h4>
<p>定制好功能，开始编写简单的 <code>plugins/api.js</code> 插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from './axios'
import _pick from 'lodash/pick'
import _assign from 'lodash/assign'
import _isEmpty from 'lodash/isEmpty'

import { assert } from 'Utils/tools'
import { API_DEFAULT_CONFIG } from 'Config'
import API_CONFIG from 'Service/api'


class MakeApi {
    constructor(options) {
        this.api = {}
        this.apiBuilder(options)
    }


    apiBuilder({
        sep = '|',
        config = {},
        mock = false, 
        debug = false,
        mockBaseURL = ''
    }) {
        Object.keys(config).map(namespace => {
            this._apiSingleBuilder({
                namespace, 
                mock, 
                mockBaseURL, 
                sep, 
                debug, 
                config: config[namespace]
            })
        })
    }
    _apiSingleBuilder({
        namespace, 
        sep = '|',
        config = {},
        mock = false, 
        debug = false,
        mockBaseURL = ''
    }) {
        config.forEach( api => {
            const {name, desc, params, method, path, mockPath } = api
            let apiname = `${namespace}${sep}${name}`,// 命名空间
                url = mock ? mockPath : path,//控制走 mock 还是线上
                baseURL = mock &amp;&amp; mockBaseURL
            
            // 通过全局配置开启调试模式。
            debug &amp;&amp; console.info(`调用服务层接口${apiname}，接口描述为${desc}`)
            debug &amp;&amp; assert(name, `${apiUrl} :接口name属性不能为空`)
            debug &amp;&amp; assert(apiUrl.indexOf('/') === 0, `${apiUrl} :接口路径path，首字符应为/`)

            Object.defineProperty(this.api, `${namespace}${sep}${name}`, {
                value(outerParams, outerOptions) {
                
                    // 请求参数自动截取。
                    // 请求参数不穿则发送默认配置参数。
                    let _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params))
                    return axios(_normoalize(_assign({
                        url,
                        desc,
                        baseURL,
                        method
                    }, outerOptions), _data))
                }
            })      
        })
    }       
}

function _normoalize(options, data) {
    // 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容
    if (options.method === 'POST') {
        options.data = data
    } else if (options.method === 'GET') {
        options.params = data
    }
    return options
} 
// 注入模型和全局配置，并暴露出去
export default new MakeApi({
    config: API_CONFIG,
    ...API_DEFAULT_CONFIG
})['api']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'./axios'</span>
<span class="hljs-keyword">import</span> _pick <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/pick'</span>
<span class="hljs-keyword">import</span> _assign <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/assign'</span>
<span class="hljs-keyword">import</span> _isEmpty <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash/isEmpty'</span>

<span class="hljs-keyword">import</span> { assert } <span class="hljs-keyword">from</span> <span class="hljs-string">'Utils/tools'</span>
<span class="hljs-keyword">import</span> { API_DEFAULT_CONFIG } <span class="hljs-keyword">from</span> <span class="hljs-string">'Config'</span>
<span class="hljs-keyword">import</span> API_CONFIG <span class="hljs-keyword">from</span> <span class="hljs-string">'Service/api'</span>


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MakeApi</span> </span>{
    <span class="hljs-keyword">constructor</span>(options) {
        <span class="hljs-keyword">this</span>.api = {}
        <span class="hljs-keyword">this</span>.apiBuilder(options)
    }


    apiBuilder({
        sep = <span class="hljs-string">'|'</span>,
        config = {},
        mock = <span class="hljs-literal">false</span>, 
        debug = <span class="hljs-literal">false</span>,
        mockBaseURL = <span class="hljs-string">''</span>
    }) {
        <span class="hljs-built_in">Object</span>.keys(config).map(<span class="hljs-function"><span class="hljs-params">namespace</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>._apiSingleBuilder({
                namespace, 
                mock, 
                mockBaseURL, 
                sep, 
                debug, 
                <span class="hljs-attr">config</span>: config[namespace]
            })
        })
    }
    _apiSingleBuilder({
        namespace, 
        sep = <span class="hljs-string">'|'</span>,
        config = {},
        mock = <span class="hljs-literal">false</span>, 
        debug = <span class="hljs-literal">false</span>,
        mockBaseURL = <span class="hljs-string">''</span>
    }) {
        config.forEach( <span class="hljs-function"><span class="hljs-params">api</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> {name, desc, params, method, path, mockPath } = api
            <span class="hljs-keyword">let</span> apiname = <span class="hljs-string">`<span class="hljs-subst">${namespace}</span><span class="hljs-subst">${sep}</span><span class="hljs-subst">${name}</span>`</span>,<span class="hljs-comment">// 命名空间</span>
                url = mock ? mockPath : path,<span class="hljs-comment">//控制走 mock 还是线上</span>
                baseURL = mock &amp;&amp; mockBaseURL
            
            <span class="hljs-comment">// 通过全局配置开启调试模式。</span>
            debug &amp;&amp; <span class="hljs-built_in">console</span>.info(<span class="hljs-string">`调用服务层接口<span class="hljs-subst">${apiname}</span>，接口描述为<span class="hljs-subst">${desc}</span>`</span>)
            debug &amp;&amp; assert(name, <span class="hljs-string">`<span class="hljs-subst">${apiUrl}</span> :接口name属性不能为空`</span>)
            debug &amp;&amp; assert(apiUrl.indexOf(<span class="hljs-string">'/'</span>) === <span class="hljs-number">0</span>, <span class="hljs-string">`<span class="hljs-subst">${apiUrl}</span> :接口路径path，首字符应为/`</span>)

            <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.api, <span class="hljs-string">`<span class="hljs-subst">${namespace}</span><span class="hljs-subst">${sep}</span><span class="hljs-subst">${name}</span>`</span>, {
                value(outerParams, outerOptions) {
                
                    <span class="hljs-comment">// 请求参数自动截取。</span>
                    <span class="hljs-comment">// 请求参数不穿则发送默认配置参数。</span>
                    <span class="hljs-keyword">let</span> _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), <span class="hljs-built_in">Object</span>.keys(params))
                    <span class="hljs-keyword">return</span> axios(_normoalize(_assign({
                        url,
                        desc,
                        baseURL,
                        method
                    }, outerOptions), _data))
                }
            })      
        })
    }       
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_normoalize</span>(<span class="hljs-params">options, data</span>) </span>{
    <span class="hljs-comment">// 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容</span>
    <span class="hljs-keyword">if</span> (options.method === <span class="hljs-string">'POST'</span>) {
        options.data = data
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.method === <span class="hljs-string">'GET'</span>) {
        options.params = data
    }
    <span class="hljs-keyword">return</span> options
} 
<span class="hljs-comment">// 注入模型和全局配置，并暴露出去</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> MakeApi({
    <span class="hljs-attr">config</span>: API_CONFIG,
    ...API_DEFAULT_CONFIG
})[<span class="hljs-string">'api'</span>]</code></pre>
<p>挂载到 <code>Vue 原型</code>上，上文有说到，通过 <code>plugins/inject.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import api from './api'
 
export default {
    install: (Vue, options) => {
        Vue.prototype.$api = api
        // 需要挂载的都放在这里
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'./api'</span>
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">install</span>: <span class="hljs-function">(<span class="hljs-params">Vue, options</span>) =&gt;</span> {
        Vue.prototype.$api = api
        <span class="hljs-comment">// 需要挂载的都放在这里</span>
    }
}</code></pre>
<h4>使用</h4>
<p>这样我们可以在<code>业务中</code>愉快的使用业务层代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .vue 中
export default {
    methods: {
        test() {
            this.$api['order/info']({
                a: 1,
                b: 2
            })
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// .vue 中</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
        test() {
            <span class="hljs-keyword">this</span>.$api[<span class="hljs-string">'order/info'</span>]({
                <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
            })
        }
    }
}</code></pre>
<p>即使在<code>业务之外</code>也可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import api from 'Plugins/api'

api['order/info']({
    a: 1,
    b: 2
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'Plugins/api'</span>

api[<span class="hljs-string">'order/info'</span>]({
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>
})
</code></pre>
<p>当然对于<code>运行效率要求高</code>的项目中，<code>避免内存使用率过大</code>，我们需要改造 API，用解构的方式引入使用，最终利用 <code>webpack</code> 的 <code>tree-shaking</code> 减少打包体积。<a href="https://github.com/PerseveranceZ/vue-develop-template/issues/4" rel="nofollow noreferrer" target="_blank">几个简单的思路</a></p>
<blockquote>一般来说，多人协作时候大家都可以先看 <code>api</code> 是否有对应接口，当业务量上来的时候，也肯定会有人出现找不到，或者找起来比较费劲，这时候我们完全可以在 请求拦截器中，把当前请求的 <code>url</code> 和 <code>api</code> 中的请求做下判断，如果有重复接口请求路径，则提醒开发者已经配置相关请求，根据情况是否进行二次配置即可。</blockquote>
<p>最终我们可以拓展 Service 层的各个功能：</p>
<p><strong>基础</strong></p>
<ul>
<li>
<strong>api</strong>：<code>异步与后端交互</code>
</li>
<li>
<strong>const</strong>：<code>常量枚举</code>
</li>
<li>
<strong>store</strong>：<code>Vuex</code> 状态管理</li>
</ul>
<p><strong>拓展</strong></p>
<ul>
<li>
<strong>localStorage</strong>：本地数据，稍微封装下，支持存取对象即可</li>
<li>
<strong>monitor</strong>：<code>监控</code>功能，自定义搜集策略，调用 <code>api</code> 中的接口发送</li>
<li>
<strong>beacon</strong>：<code>打点</code>功能，自定义搜集策略，调用 <code>api</code> 中的接口发送</li>
<li>...</li>
</ul>
<p><code>const</code>，<code>localStorage</code>，<code>monitor</code> 和 <code>beacon</code> 根据业务自行拓展暴露给业务使用即可，思想也是一样的，下面着重说下 <code>store(Vuex)</code>。</p>
<blockquote>插一句：如果看到这里没感觉不妥的话，想想上面 <code>plugins/api.js</code> 有没有用<code>单例模式</code>？该不该用？</blockquote>
<h2 id="articleHeader7">⑦ 状态管理与视图拆分</h2>
<p><a href="https://github.com/PerseveranceZ/zero-blog/issues/2" rel="nofollow noreferrer" target="_blank">Vuex 源码分析可以看我之前写的文章</a>。</p>
<h4>我们是不是真的需要状态管理？</h4>
<blockquote>答案是否定的，就算你的项目达到 10 万行代码，那也并不意味着你必须使用 Vuex，应该由<strong>业务场景</strong>决定。</blockquote>
<h4>业务场景</h4>
<ol><li>第一类项目：<strong>业务/视图复杂度不高，不建议使用 Vuex，会带来开发与维护的成本</strong>，使用简单的 <code>vbus</code> 做好<strong>命名空间</strong>，来解耦即可。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let vbus = new Vue()
vbus.$on('print.hello', () => {
    console.log('hello')
})

vbus.$emit('print.hello')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> vbus = <span class="hljs-keyword">new</span> Vue()
vbus.$on(<span class="hljs-string">'print.hello'</span>, () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>)
})

vbus.$emit(<span class="hljs-string">'print.hello'</span>)</code></pre>
<ol><li>第二类项目：类似<code>多人协作项目管理</code>，<code>有道云笔记</code>，<code>网易云音乐</code>，<code>微信网页版/桌面版</code>等<strong>应用</strong>，功能集中，空间利用率高，实时交互的项目，无疑 <code>Vuex 是较好的选择</code>。这类应用中我们可以直接<code>抽离业务领域模型</code>：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store
├── index.js          
├── actions.js        // 根级别 action
├── mutations.js      // 根级别 mutation
└── modules
    ├── user.js       // 用户模块
    ├── products.js   // 产品模块
    ├── order.js      // 订单模块
    └── ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>store
├── <span class="hljs-keyword">index</span>.js          
├── actions.js        <span class="hljs-comment">// 根级别 action</span>
├── mutations.js      <span class="hljs-comment">// 根级别 mutation</span>
└── modules
    ├── user.js       <span class="hljs-comment">// 用户模块</span>
    ├── products.js   <span class="hljs-comment">// 产品模块</span>
    ├── <span class="hljs-keyword">order</span>.js      <span class="hljs-comment">// 订单模块</span>
    └── ...</code></pre>
<p>当然对于这类项目，<code>vuex</code> 或许不是最好的选择，有兴趣的同学可以学习下 <code>rxjs</code>。</p>
<ol><li>第三类项目：<code>后台系统</code>或者<code>页面之间业务耦合不高的项目</code>，这类项目是占比应该是很大的，我们思考下这类项目：</li></ol>
<p>全局共享状态不多，但是难免在某个模块中会有复杂度较高的功能(客服系统，实时聊天，多人协作功能等)，这时候如果为了项目的可管理性，我们也在 <code>store</code> 中进行管理，随着项目的迭代我们不难遇到这样的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store/
    ...
    modules/
        b.js
        ...
views/
    ...
    a/
        b.js
        ...
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>store/
    ...
    modules/
        <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.js</span>
        ...
views/
    ...
    a/
        <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.js</span>
        ...
        </code></pre>
<ul>
<li>试想下有几十个 module，对应这边上百个业务模块，开发者在两个平级目录之间调试与开发的成本是巨大的。</li>
<li>这些 module 可以在项目中任一一个地方被访问，但往往他们都是冗余的，除了引用的功能模块之外，基本不会再有其他模块引用他。</li>
<li>项目的可维护程度会随着项目增大而增大。</li>
</ul>
<h4>如何解决第三类项目的 store 使用问题？</h4>
<p>先梳理我们的目标：</p>
<ul>
<li>项目中模块可以自定决定是否使用 Vuex。（渐进增强）</li>
<li>
<strong>从有状态管理的模块，跳转没有的模块，我们不想把之前的状态挂载到 <code>store</code> 上，想提高运行效率</strong>。（冗余）</li>
<li>让这类项目的状态管理变的更加可维护。（开发成本/沟通成本）</li>
</ul>
<h4>实现</h4>
<p>我们借助 Vuex 提供的 <code>registerModule</code> 和 <code>unregisterModule</code> 一并解决这些问题，我们在 <code>service/store</code> 中放入全局共享的状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="service/
    store/
        index.js
        actions.js
        mutations.js
        getters.js
        state.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>service/
    store/
        index<span class="hljs-selector-class">.js</span>
        actions<span class="hljs-selector-class">.js</span>
        mutations<span class="hljs-selector-class">.js</span>
        getters<span class="hljs-selector-class">.js</span>
        state.js</code></pre>
<blockquote>一般这类项目全局状态不多，如果多了拆分 module 即可。</blockquote>
<p>编写插件生成 <code>store 实例</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import {VUEX_DEFAULT_CONFIG} from 'Config'
import commonStore from 'Service/store'

Vue.use(Vuex)

export default new Vuex.Store({
    ...commonStore,
    ...VUEX_DEFAULT_CONFIG
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> {VUEX_DEFAULT_CONFIG} <span class="hljs-keyword">from</span> <span class="hljs-string">'Config'</span>
<span class="hljs-keyword">import</span> commonStore <span class="hljs-keyword">from</span> <span class="hljs-string">'Service/store'</span>

Vue.use(Vuex)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    ...commonStore,
    ...VUEX_DEFAULT_CONFIG
})</code></pre>
<p>对一个需要状态管理页面或者模块进行分层：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="views/
    pageA/
        index.vue
        components/
            a.vue
            b.vue
            ...
        children/
            childrenA.vue
            childrenB.vue
            ...
        store/
            index.js
            actions.js
            moduleA.js  
            moduleB.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>views/
    pageA/
        index<span class="hljs-selector-class">.vue</span>
        components/
            <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.vue</span>
            <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.vue</span>
            ...
        children/
            childrenA<span class="hljs-selector-class">.vue</span>
            childrenB<span class="hljs-selector-class">.vue</span>
            ...
        store/
            index<span class="hljs-selector-class">.js</span>
            actions<span class="hljs-selector-class">.js</span>
            moduleA<span class="hljs-selector-class">.js</span>  
            moduleB.js</code></pre>
<p>module 中直接包含了 <code>getters</code>，<code>mutations</code>，<code>state</code>，我们在 <code>store/index.js</code> 中做文章：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Store from 'Plugins/store'
import actions from './actions.js'
import moduleA from './moduleA.js'
import moduleB from './moduleB.js'

export default {
    install() {
        Store.registerModule(['pageA'], {
            actions,
            modules: {
                moduleA,
                moduleB
            },
            namespaced: true
        })
    },
    uninstall() {
        Store.unregisterModule(['pageA'])
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Store <span class="hljs-keyword">from</span> <span class="hljs-string">'Plugins/store'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions.js'</span>
<span class="hljs-keyword">import</span> moduleA <span class="hljs-keyword">from</span> <span class="hljs-string">'./moduleA.js'</span>
<span class="hljs-keyword">import</span> moduleB <span class="hljs-keyword">from</span> <span class="hljs-string">'./moduleB.js'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    install() {
        Store.registerModule([<span class="hljs-string">'pageA'</span>], {
            actions,
            <span class="hljs-attr">modules</span>: {
                moduleA,
                moduleB
            },
            <span class="hljs-attr">namespaced</span>: <span class="hljs-literal">true</span>
        })
    },
    uninstall() {
        Store.unregisterModule([<span class="hljs-string">'pageA'</span>])
    }
}
</code></pre>
<p>最终在 <code>index.vue</code> 中引入使用， <strong>在页面跳转之前注册这些状态和管理状态的规则，在路由离开之前，先卸载这些状态和管理状态的规则</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './store'
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters('pageA', ['aaa', 'bbb', 'ccc'])
    },
    beforeRouterEnter(to, from, next) {
        store.install()
        next()
    },
    beforeRouterLeave(to, from, next) {
        store.uninstall()
        next()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> {mapGetters} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span>: {
        ...mapGetters(<span class="hljs-string">'pageA'</span>, [<span class="hljs-string">'aaa'</span>, <span class="hljs-string">'bbb'</span>, <span class="hljs-string">'ccc'</span>])
    },
    beforeRouterEnter(to, <span class="hljs-keyword">from</span>, next) {
        store.install()
        next()
    },
    beforeRouterLeave(to, <span class="hljs-keyword">from</span>, next) {
        store.uninstall()
        next()
    }
}</code></pre>
<p>当然如果你的状态要共享到全局，就不执行 <code>uninstall</code>。</p>
<blockquote>这样就解决了开头的三个问题，不同开发者在开发页面的时候，可以根据页面特性，渐进增强的选择某种开发形式。</blockquote>
<h2 id="articleHeader8">其他</h2>
<p>这里简单列举下其他方面，需要自行根据项目深入和使用。</p>
<h4>打包，构建</h4>
<p>这里网上已经有很多优化方法：<code>dll</code>，<code>happypack</code>，<code>多线程打包</code>等，但随着项目的代码量级，每次 dev 保存的时候编译的速度也是会愈来愈慢的，而一过慢的时候我们就不得不进行拆分，这是肯定的，而在拆分之前尽可能容纳更多的可维护的代码，有几个可以尝试和规避的点：</p>
<ol>
<li>优化项目流程：这个点看起来好像没什么用，但改变却是最直观的，页面/业务上的化简为繁会直接体现到代码上，同时也会增大项目的可维护，可拓展性等。</li>
<li>减少项目文件层级纵向深度。</li>
<li>减少无用业务代码，避免使用无用或者过大依赖（类似 <code>moment.js</code> 这样的库）等。</li>
</ol>
<h4>样式</h4>
<ul>
<li>尽可能抽离各个模块，让整个样式底层更加灵活，同时也应该尽可能的减少冗余。</li>
<li>如果使用的 <code>sass</code> 的话，善用 <code>%placeholder</code> 减少无用代码打包进来。</li>
</ul>
<blockquote>
<code>MPA 应用</code>中样式冗余过大，<code>%placeholder</code> 也会给你带来帮助。</blockquote>
<h4>Mock</h4>
<p>很多大公司都有自己的 <code>mock 平台</code>，当前后端定好接口格式，放入生成对应 <code>mock api</code>，如果没有 mock 平台，那就找相对好用的工具如 <code>json-server</code> 等。</p>
<h4>代码规范</h4>
<p>请强制使用 <code>eslint</code>，挂在 git 的钩子上。定期 diff 代码，定期培训等。</p>
<h4>TypeScript</h4>
<p>非常建议用 TS 编写项目，可能写 .vue 有些别扭，这样前端的大部分错误在编译时解决，同时也能提高浏览器运行时效率，可能减少 <code>re-optimize</code> 阶段时间等。</p>
<h4>测试</h4>
<p>这也是项目非常重要的一点，如果你的项目还未使用一些测试工具，请尽快接入，这里不过多赘述。</p>
<h4>拆分系统</h4>
<p>当项目到达到一定业务量级时，由于项目中的模块过多，新同学维护成本，开发成本都会直线上升，不得不拆分项目，后续会分享出来我们 <code>ToB</code> 项目在拆分系统中的简单实践。</p>
<h3 id="articleHeader9">最后</h3>
<p>时下有各种成熟的方案，这里只是一个简单的构建分享，里面依赖的版本都是我们稳定下来的版本，需要根据自己实际情况进行升级。</p>
<p>项目底层构建往往会成为前端忽略的地方，我们既要从一个大局观来看待一个项目或者整条业务线，又要对每一行代码精益求精，对开发体验不断优化，慢慢累积后才能更好的应对未知的变化。</p>
<ul>
<li><a href="https://github.com/PerseveranceZ" rel="nofollow noreferrer" target="_blank">关于我，可以叫我 Zero，附上 Git 地址</a></li>
<li><a href="https://www.zcool.com.cn/article/ZNDI0NTgw.html" rel="nofollow noreferrer" target="_blank">文章标题图片地址</a></li>
</ul>
<h2 id="articleHeader10">最后请允许我打一波小小的广告</h2>
<h4>EROS</h4>
<p>如果<strong>前端同学想尝试使用 <code>Vue</code> 开发 <code>App</code></strong>，或者熟悉  <code>weex</code> 开发的同学，可以来尝试使用我们的开源解决方案 <strong><code>eros</code></strong>，虽然没做过什么广告，但不完全统计，<code>50 个在线 APP 还是有的</code>，期待你的加入。</p>
<ul>
<li>[[文章] 浅谈混合应用演进](<a href="https://juejin.im/post/5b189fc9f265da6e326c5104)" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5b189f...</a>
</li>
<li>[[文章] 深入了解 weex](<a href="https://juejin.im/post/5b18a03ce51d45069d2263e3)" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5b18a0...</a>
</li>
<li>[[文章] weex-eros 入门指南](<a href="https://bmfe.github.io/eros-docs/#/zh-cn/tutorial_newcomer)" rel="nofollow noreferrer" target="_blank">https://bmfe.github.io/eros-d...</a>
</li>
<li><a href="https://github.com/bmfe/eros" rel="nofollow noreferrer" target="_blank">项目地址</a></li>
<li><a href="https://bmfe.github.io/eros-docs/" rel="nofollow noreferrer" target="_blank">文档地址</a></li>
</ul>
<p>最后附上部分产品截图~</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015472617?w=970&amp;h=3648" src="https://static.alili.tech/img/remote/1460000015472617?w=970&amp;h=3648" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>(逃~)</p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000015472744](https://segmentfault.com/a/1190000015472744)

## 原文标题
浅谈使用 Vue 构建前端 10w+ 代码量的单页面应用开发底层
