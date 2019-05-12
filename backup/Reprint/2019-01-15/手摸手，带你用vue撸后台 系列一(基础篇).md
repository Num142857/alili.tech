---
title: '手摸手，带你用vue撸后台 系列一(基础篇)' 
date: 2019-01-15 2:30:12
hidden: true
slug: axmdao5mbzc
categories: [reprint]
---

{{< raw >}}

                    
<p>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097">手摸手，带你用vue撸后台 系列二（登录权限篇）</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198" target="_blank">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a><br>系类文章：<a href="https://segmentfault.com/a/1190000012213278" target="_blank">手摸手，带你优雅的使用 icon</a><br>系类文章：<a href="https://segmentfault.com/a/1190000009090836">手摸手，带你封装一个vue component</a></p>
<h2 id="articleHeader0">前言</h2>
<p>说好的教程终于来了，第一篇文章主要来说一说在开始写实际业务代码之前的一些准备工作吧，但这里不会教你 webpack 的基础配置，热更新原理是什么，webpack速度优化等等，有需求的请自行 google，相关文章已经很多了。</p>
<h2 id="articleHeader1">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build                      // 构建相关&nbsp;&nbsp;
├── config                     // 配置相关
├── src                        // 源代码
│&nbsp;&nbsp; ├── api                    // 所有请求
│&nbsp;&nbsp; ├── assets                 // 主题 字体等静态资源
│&nbsp;&nbsp; ├── components             // 全局公用组件
│&nbsp;&nbsp; ├── directive              // 全局指令
│&nbsp;&nbsp; ├── filtres                // 全局 filter
│&nbsp;&nbsp; ├── icons                  // 项目所有 svg icons
│&nbsp;&nbsp; ├── lang                   // 国际化 language
│&nbsp;&nbsp; ├── mock                   // 项目mock 模拟数据
│&nbsp;&nbsp; ├── router                 // 路由
│&nbsp;&nbsp; ├── store                  // 全局 store管理
│&nbsp;&nbsp; ├── styles                 // 全局样式
│&nbsp;&nbsp; ├── utils                  // 全局公用方法
│&nbsp;&nbsp; ├── vendor                 // 公用vendor
│&nbsp;&nbsp; ├── views                   // view
│&nbsp;&nbsp; ├── App.vue                // 入口页面
│&nbsp;&nbsp; ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│&nbsp;&nbsp; └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── build                      <span class="hljs-comment">// 构建相关&nbsp;&nbsp;</span>
├── config                     <span class="hljs-comment">// 配置相关</span>
├── src                        <span class="hljs-comment">// 源代码</span>
│&nbsp;&nbsp; ├── api                    <span class="hljs-comment">// 所有请求</span>
│&nbsp;&nbsp; ├── assets                 <span class="hljs-comment">// 主题 字体等静态资源</span>
│&nbsp;&nbsp; ├── components             <span class="hljs-comment">// 全局公用组件</span>
│&nbsp;&nbsp; ├── directive              <span class="hljs-comment">// 全局指令</span>
│&nbsp;&nbsp; ├── filtres                <span class="hljs-comment">// 全局 filter</span>
│&nbsp;&nbsp; ├── icons                  <span class="hljs-comment">// 项目所有 svg icons</span>
│&nbsp;&nbsp; ├── lang                   <span class="hljs-comment">// 国际化 language</span>
│&nbsp;&nbsp; ├── mock                   <span class="hljs-comment">// 项目mock 模拟数据</span>
│&nbsp;&nbsp; ├── router                 <span class="hljs-comment">// 路由</span>
│&nbsp;&nbsp; ├── store                  <span class="hljs-comment">// 全局 store管理</span>
│&nbsp;&nbsp; ├── styles                 <span class="hljs-comment">// 全局样式</span>
│&nbsp;&nbsp; ├── utils                  <span class="hljs-comment">// 全局公用方法</span>
│&nbsp;&nbsp; ├── vendor                 <span class="hljs-comment">// 公用vendor</span>
│&nbsp;&nbsp; ├── views                   <span class="hljs-comment">// view</span>
│&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.vue</span>                <span class="hljs-comment">// 入口页面</span>
│&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// 入口 加载组件 初始化等</span>
│   └── permission<span class="hljs-selector-class">.js</span>          <span class="hljs-comment">// 权限管理</span>
├── static                     <span class="hljs-comment">// 第三方不打包资源</span>
│&nbsp;&nbsp; └── Tinymce                <span class="hljs-comment">// 富文本</span>
├── <span class="hljs-selector-class">.babelrc</span>                   <span class="hljs-comment">// babel-loader 配置</span>
├── eslintrc<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// eslint 配置项</span>
├── <span class="hljs-selector-class">.gitignore</span>                 <span class="hljs-comment">// git 忽略项</span>
├── favicon<span class="hljs-selector-class">.ico</span>                <span class="hljs-comment">// favicon图标</span>
├── index<span class="hljs-selector-class">.html</span>                 <span class="hljs-comment">// html模板</span>
└── package<span class="hljs-selector-class">.json</span>               <span class="hljs-comment">// package.json</span></code></pre>
<p>这里来简单讲一下src文件</p>
<h3 id="articleHeader2">api 和 views</h3>
<p>简单截取一下公司后台项目，现在后台大概有四五十个 api 模块<br><span class="img-wrap"><img data-src="/img/remote/1460000009282310?w=364&amp;h=482" src="https://static.alili.tech/img/remote/1460000009282310?w=364&amp;h=482" alt="" title="" style="cursor: pointer; display: inline;"></span><br>如图可见模块有很多，而且随着业务的迭代，模块还会会越来越多。<br>所以这里建议根据业务模块来划分 views，并且 将views 和 api 两个模块一一对应，从而方便维护。如下图：<br><span class="img-wrap"><img data-src="/img/remote/1460000009282311?w=1240&amp;h=697" src="https://static.alili.tech/img/remote/1460000009282311?w=1240&amp;h=697" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如 article 模块下放的都是文章相关的 api，这样不管项目怎么累加，api和views的维护还是清晰的，当然也有一些全区公用的api模块，如七牛upload，remoteSearch等等，这些单独放置就行。</p>
<h3 id="articleHeader3">components</h3>
<p>这里的 components 放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自views文件下，方便管理。如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000009282312?w=458&amp;h=312" src="https://static.alili.tech/img/remote/1460000009282312?w=458&amp;h=312" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">store</h3>
<p>这里我个人建议不要为了用 vuex 而用 vuex。就拿我司的后台项目来说，它虽然比较庞大，几十个业务模块，几十种权限，但业务之间的耦合度是很低的，文章模块和评论模块几乎是俩个独立的东西，所以根本没有必要使用 vuex 来存储data，每个页面里存放自己的 data 就行。当然有些数据还是需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体当然还是要结合自己的业务场景的。总之还是那句话，不要为了用vuex而用vuex！</p>
<hr>
<h2 id="articleHeader5">webpack</h2>
<blockquote>这里是用 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> 的 <a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack-template</a> 为基础模板构建的，如果你对这个有什么疑惑请自行google，相关的配置绍其它的文章已经介详细了，这里就不再展开了。简单说一些需要注意到地方。</blockquote>
<h3 id="articleHeader6">jquery (本项目已移除)</h3>
<p>管理后台不同于前台项目，会经常用到一些第三方插件，但有些插件是不得不依赖 jquery 的，如市面很多富文本基都是依赖 jquery 的，所以干脆就直接引入到项目中省事(gzip之后只有34kb，而且常年from cache,不要考虑那些吹毛求疵的大小问题，这几kb和提高的开发效率根本不能比)。但是如果第三方库的代码中出现$.xxx或jQuery.xxx或window.jQuery或window.$则会直接报错。要达到类似的效果，则需要使用 webpack 内置的 <code>ProvidePlugin</code> 插件，配置很简单，只需要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  $: 'jquery' ,
  'jQuery': 'jquery'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
  $: <span class="hljs-string">'jquery'</span> ,
  <span class="hljs-string">'jQuery'</span>: <span class="hljs-string">'jquery'</span>
})</code></pre>
<p>这样当 webpack 碰到 require 的第三方库中出现全局的$、jQeury和window.jQuery 时，就会使用 node_module 下 jquery 包 export 出来的东西了。</p>
<h3 id="articleHeader7">alias</h3>
<p>当项目逐渐变大之后，文件与文件直接的引用关系会很复杂，这时候就需要使用<a href="https://webpack.js.org/configuration/resolve/" rel="nofollow noreferrer" target="_blank">alias</a> 了。<br>有的人喜欢alias 指向src目录下，再使用相对路径找文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  alias: {
    '~': resolve(__dirname, 'src')
  }
}

//使用
import stickTop from '~/components/stickTop'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">resolve: {
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-string">'~'</span>: resolve(__dirname, <span class="hljs-string">'src'</span>)
  }
}

<span class="hljs-comment">//使用</span>
<span class="hljs-keyword">import</span> stickTop <span class="hljs-keyword">from</span> <span class="hljs-string">'~/components/stickTop'</span></code></pre>
<p>或者也可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
  'src': path.resolve(__dirname, '../src'),
  'components': path.resolve(__dirname, '../src/components'),
  'api': path.resolve(__dirname, '../src/api'),
  'utils': path.resolve(__dirname, '../src/utils'),
  'store': path.resolve(__dirname, '../src/store'),
  'router': path.resolve(__dirname, '../src/router')
}

//使用
import stickTop from 'components/stickTop'
import getArticle from 'api/article'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">alias: {
  <span class="hljs-string">'src'</span>: path.resolve(__dirname, <span class="hljs-string">'../src'</span>),
  <span class="hljs-string">'components'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/components'</span>),
  <span class="hljs-string">'api'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/api'</span>),
  <span class="hljs-string">'utils'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/utils'</span>),
  <span class="hljs-string">'store'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/store'</span>),
  <span class="hljs-string">'router'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/router'</span>)
}

<span class="hljs-comment">//使用</span>
<span class="hljs-keyword">import</span> stickTop <span class="hljs-keyword">from</span> <span class="hljs-string">'components/stickTop'</span>
<span class="hljs-keyword">import</span> getArticle <span class="hljs-keyword">from</span> <span class="hljs-string">'api/article'</span></code></pre>
<p>没有好与坏对与错，纯看个人喜好和团队规范。</p>
<hr>
<h2 id="articleHeader8">ESLint</h2>
<p>不管是多人合作还是个人项目，代码规范是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。这所谓工欲善其事，必先利其器，个人推荐 eslint+vscode 来写 vue，绝对有种飞一般的感觉。效果如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000009282313?w=800&amp;h=476" src="https://static.alili.tech/img/remote/1460000009282313?w=800&amp;h=476" alt="eslintGif.gif" title="eslintGif.gif" style="cursor: pointer; display: inline;"></span><br>每次保存，vscode就能标红不符合eslint规则的地方，同时还会做一些简单的自我修正。安装步骤如下：</p>
<p>首先安装eslint插件<br><span class="img-wrap"><img data-src="/img/remote/1460000009282314?w=800&amp;h=408" src="https://static.alili.tech/img/remote/1460000009282314?w=800&amp;h=408" alt="eslint1.png" title="eslint1.png" style="cursor: pointer; display: inline;"></span></p>
<p>安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 文件 &gt; 首选项 &gt; 设置 打开 VSCode 配置文件,添加如下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    &quot;files.autoSave&quot;:&quot;off&quot;,
    &quot;eslint.validate&quot;: [
       &quot;javascript&quot;,
       &quot;javascriptreact&quot;,
       &quot;html&quot;,
       {&nbsp;&quot;language&quot;:&nbsp;&quot;vue&quot;,&nbsp;&quot;autoFix&quot;:&nbsp;true&nbsp;}
     ],
     &quot;eslint.options&quot;: {
        &quot;plugins&quot;: [&quot;html&quot;]
     }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>
    <span class="hljs-string">"files.autoSave"</span>:<span class="hljs-string">"off"</span>,
    <span class="hljs-string">"eslint.validate"</span>: [
       <span class="hljs-string">"javascript"</span>,
       <span class="hljs-string">"javascriptreact"</span>,
       <span class="hljs-string">"html"</span>,
       {&nbsp;<span class="hljs-string">"language"</span>:&nbsp;<span class="hljs-string">"vue"</span>,&nbsp;<span class="hljs-string">"autoFix"</span>:&nbsp;true&nbsp;}
     ],
     <span class="hljs-string">"eslint.options"</span>: {
        <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"html"</span>]
     }
</code></pre>
<p>这样每次保存的时候就可以根据根目录下.eslintrc.js你配置的eslint规则来检查和做一些简单的fix。这里提供了一份我平时的eslint规则<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js" rel="nofollow noreferrer" target="_blank">地址</a>，都简单写上了注释。每个人和团队都有自己的代码规范，统一就好了，去打造一份属于自己的eslint 规则上传到npm吧，如饿了么团队的 <a href="https://www.npmjs.com/package/eslint-config-elemefe" rel="nofollow noreferrer" target="_blank">config</a>，vue的 <a href="https://github.com/vuejs/eslint-config-vue" rel="nofollow noreferrer" target="_blank">config</a>。</p>
<p><a href="https://github.com/varHarrie/Dawn-Blossoms/issues/10" rel="nofollow noreferrer" target="_blank">vscode 插件和配置推荐</a></p>
<hr>
<h2 id="articleHeader9">封装 axios</h2>
<p>我们经常遇到一些线上 的bug，但测试环境很难模拟。其实可以通过简单的配置就可以在本地调试线上环境。<br>这里结合业务封装了axios ，<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/fetch.js" rel="nofollow noreferrer" target="_blank">线上代码</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response,
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> { Message } <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'@/store'</span>
<span class="hljs-keyword">import</span> { getToken } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils/auth'</span>

<span class="hljs-comment">// 创建axios实例</span>
<span class="hljs-keyword">const</span> service = axios.create({
  <span class="hljs-attr">baseURL</span>: process.env.BASE_API, <span class="hljs-comment">// api的base_url</span>
  timeout: <span class="hljs-number">5000</span> <span class="hljs-comment">// 请求超时时间</span>
})

<span class="hljs-comment">// request拦截器</span>
service.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-comment">// Do something before request is sent</span>
  <span class="hljs-keyword">if</span> (store.getters.token) {
    config.headers[<span class="hljs-string">'X-Token'</span>] = getToken() <span class="hljs-comment">// 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改</span>
  }
  <span class="hljs-keyword">return</span> config
}, error =&gt; {
  <span class="hljs-comment">// Do something with request error</span>
  <span class="hljs-built_in">console</span>.log(error) <span class="hljs-comment">// for debug</span>
  <span class="hljs-built_in">Promise</span>.reject(error)
})

<span class="hljs-comment">// respone拦截器</span>
service.interceptors.response.use(
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response,
  <span class="hljs-comment">/**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */</span>
  <span class="hljs-comment">//  const res = response.data;</span>
  <span class="hljs-comment">//     if (res.code !== 20000) {</span>
  <span class="hljs-comment">//       Message({</span>
  <span class="hljs-comment">//         message: res.message,</span>
  <span class="hljs-comment">//         type: 'error',</span>
  <span class="hljs-comment">//         duration: 5 * 1000</span>
  <span class="hljs-comment">//       });</span>
  <span class="hljs-comment">//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;</span>
  <span class="hljs-comment">//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {</span>
  <span class="hljs-comment">//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {</span>
  <span class="hljs-comment">//           confirmButtonText: '重新登录',</span>
  <span class="hljs-comment">//           cancelButtonText: '取消',</span>
  <span class="hljs-comment">//           type: 'warning'</span>
  <span class="hljs-comment">//         }).then(() =&gt; {</span>
  <span class="hljs-comment">//           store.dispatch('FedLogOut').then(() =&gt; {</span>
  <span class="hljs-comment">//             location.reload();// 为了重新实例化vue-router对象 避免bug</span>
  <span class="hljs-comment">//           });</span>
  <span class="hljs-comment">//         })</span>
  <span class="hljs-comment">//       }</span>
  <span class="hljs-comment">//       return Promise.reject('error');</span>
  <span class="hljs-comment">//     } else {</span>
  <span class="hljs-comment">//       return response.data;</span>
  <span class="hljs-comment">//     }</span>
  error =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err'</span> + error)<span class="hljs-comment">// for debug</span>
    Message({
      <span class="hljs-attr">message</span>: error.message,
      <span class="hljs-attr">type</span>: <span class="hljs-string">'error'</span>,
      <span class="hljs-attr">duration</span>: <span class="hljs-number">5</span> * <span class="hljs-number">1000</span>
    })
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
  })

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> service
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import request from '@/utils/request'

//使用
export function getInfo(params) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils/request'</span>

<span class="hljs-comment">//使用</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getInfo</span>(<span class="hljs-params">params</span>) </span>{
  <span class="hljs-keyword">return</span> request({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'/user/info'</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
    params
  });
}</code></pre>
<p>比如后台项目，每一个请求都是要带 token 来验证权限的，这样封装以下的话我们就不用每个请求都手动来塞 token，或者来做一些统一的异常处理，一劳永逸。<br>而且因为我们的 api 是根据 <code>env</code> 环境变量动态切换的，如果以后线上出现了bug，我们只需配置一下 <code>@/config/dev.env.js</code> 再重启一下服务，就能在本地模拟线上的环境了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    NODE_ENV: '&quot;development&quot;',
    BASE_API: '&quot;https://api-dev&quot;', //修改为'&quot;https://api-prod&quot;'就行了
    APP_ORIGIN: '&quot;https://wallstreetcn.com&quot;' //为公司打个广告 pc站为vue+ssr
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>module.exports = {
    NODE_ENV: <span class="hljs-type"></span>'<span class="hljs-string">"development"</span><span class="hljs-string">',
    BASE_API: '</span><span class="hljs-string">"https://api-dev"</span><span class="hljs-string">', //修改为'</span><span class="hljs-string">"https://api-prod"</span><span class="hljs-string">'就行了
    APP_ORIGIN: '</span><span class="hljs-string">"https://wallstreetcn.com"</span><span class="hljs-string">' //为公司打个广告 pc站为vue+ssr
}
</span></code></pre>
<p><strong>妈妈再也不用担心我调试线上bug了。</strong><br>当然这里只是简单举了个例子，axios还可以执行多个并发请求，拦截器什么的，大家自行去研究吧。</p>
<hr>
<h2 id="articleHeader10">多环境</h2>
<p>vue-cli 默认只提供了<code>dev</code>和<code>prod</code>两种环境。但其实正真的开发流程可能还会多一个<code>sit</code>或者<code>stage</code>环境，就是所谓的测试环境和预发布环境。所以我们就要简单的修改一下代码。其实很简单就是设置不同的环境变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build:prod&quot;: &quot;NODE_ENV=production node build/build.js&quot;,
&quot;build:sit&quot;: &quot;NODE_ENV=sit node build/build.js&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>"<span class="hljs-keyword">build</span>:prod<span class="hljs-string">": "</span>NODE_ENV=production node <span class="hljs-keyword">build</span>/<span class="hljs-keyword">build</span>.js<span class="hljs-string">",
"</span><span class="hljs-keyword">build</span>:sit<span class="hljs-string">": "</span>NODE_ENV=sit node <span class="hljs-keyword">build</span>/<span class="hljs-keyword">build</span>.js<span class="hljs-string">",</span></code></pre>
<p>之后在代码里自行判断，想干就干啥</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var env = process.env.NODE_ENV === 'production' ? config.build.prodEnv : config.build.sitEnv" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">var env = <span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">'production'</span> ? <span class="hljs-built_in">config</span>.build.prodEnv : <span class="hljs-built_in">config</span>.build.sitEnv</code></pre>
<p>新版的 vue-cli 也内置了 <code>webpack-bundle-analyzer</code> 一个模块分析的东西，相当的好用。使用方法也很简单，和之前一样封装一个 npm script 就可以。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
 &quot;build:sit-preview&quot;: &quot;cross-env NODE_ENV=production env_config=sit npm_config_preview=true  npm_config_report=true node build/build.js&quot;

//之后通过process.env.npm_config_report来判断是否来启用webpack-bundle-analyzer

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
webpackConfig.plugins.push(new BundleAnalyzerPlugin())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//package.json</span>
 <span class="hljs-string">"build:sit-preview"</span>: <span class="hljs-string">"cross-env NODE_ENV=production env_config=sit npm_config_preview=true  npm_config_report=true node build/build.js"</span>

<span class="hljs-comment">//之后通过process.env.npm_config_report来判断是否来启用webpack-bundle-analyzer</span>

<span class="hljs-keyword">var</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())</code></pre>
<p>效果图<br><span class="img-wrap"><img data-src="/img/remote/1460000009282315?w=1240&amp;h=597" src="https://static.alili.tech/img/remote/1460000009282315?w=1240&amp;h=597" alt="analyzer.png" title="analyzer.png" style="cursor: pointer;"></span><br>webpack-bundle-analyzer这个插件还是很有用的，对后期的代码优化什么的，最重要的是它够<strong>装逼</strong>~</p>
<hr>
<h2 id="articleHeader11">前后端交互</h2>
<p>每个公司都有自己一套的开发流程，没有绝对的好与坏。这里我来讲讲我司的前后端交互流程。</p>
<h3 id="articleHeader12">跨域问题</h3>
<p>首先前后端交互不可避免的就会遇到跨域问题，我司现在全是用 <code>cors</code>来解决的，如果你司后端嫌麻烦不肯配置的话，dev环境也可以通过<br><code>webpack-dev-server</code>的<code>proxy</code>来解决，开发环境用<code>nginx</code>反代理一下就好了，具体配置这里就不展开了。</p>
<h3 id="articleHeader13">前后端的交互问题</h3>
<p>其实大家也知道，平时的开发中交流成本占据了我们很大一部分时间，但前后端如果有一个好的协作方式的话能解决很多时间。我司开发流程都是前后端和产品一起开会讨论项目，之后后端根据需求，首先定义数据格式和api，然后 mock api 生成好文档，我们前端才是对接接口的。这里推荐一个文档生成器 <a href="http://swagger.io/" rel="nofollow noreferrer" target="_blank">swagger</a>。<br><strong>swagger</strong>是一个REST APIs文档生成工具，可以在许多不同的平台上从代码注释中自动生成，开源，支持大部分语言，社区好，总之就是一个强大，如下图的api 文档(swagger自动生成，ui忽略)</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009282316?w=1240&amp;h=690" src="https://static.alili.tech/img/remote/1460000009282316?w=1240&amp;h=690" alt="" title="" style="cursor: pointer;"></span><br>api 地址，需要传是没参数，需要的传参类型，返回的数据格式什么都一清二楚了。</p>
<h3 id="articleHeader14">前端自行mock</h3>
<p>如果后端不肯来帮你 mock 数据的话，前端自己来 mock 也是很简单的。你可以使用mock server 或者使用 <a href="https://github.com/badoo/MockJS" rel="nofollow noreferrer" target="_blank">mockjs</a> + <a href="https://github.com/thx/RAP" rel="nofollow noreferrer" target="_blank">rap</a> 也是很方便的。<br> 不久前出的 <a href="https://easy-mock.com/" rel="nofollow noreferrer" target="_blank">easy-mock</a>也相当的不错，还能结合 swagger。<br> 我们大前端终于不用再看后端的脸色了~</p>
<h3 id="articleHeader15">iconfont</h3>
<p>element-ui 默认的icon不是很多，这里要安利一波阿里的<a href="http://iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a>简直是神器，不管是公司项目还是个人项目都在使用。它提供了png,ai,svg三种格式，同时使用也支持unicode，font-class，symbol三种方式。由于是管理后台对兼容性要求不高，楼主平时都喜欢用symbol，晒一波我司后台的图标(都是楼主自己发挥的)。<br><span class="img-wrap"><img data-src="/img/remote/1460000009282317?w=332&amp;h=628" src="https://static.alili.tech/img/remote/1460000009282317?w=332&amp;h=628" alt="iconfont.png" title="iconfont.png" style="cursor: pointer; display: inline;"></span><br>详细具体的使用可以见文章 <a href="https://juejin.im/post/59bb864b5188257e7a427c09" rel="nofollow noreferrer" target="_blank">手摸手，带你优雅的使用 icon</a></p>
<hr>
<h2 id="articleHeader16">router-view</h2>
<p>different router the same component vue。真实的业务场景中，这种情况很多。比如<span class="img-wrap"><img data-src="/img/remote/1460000009282318?w=1014&amp;h=84" src="https://static.alili.tech/img/remote/1460000009282318?w=1014&amp;h=84" alt="router-view.png" title="router-view.png" style="cursor: pointer; display: inline;"></span><br>我创建和编辑的页面使用的是同一个component,默认情况下当这两个页面切换时并不会触发vue的created或者mounted钩子，官方说你可以通过watch $route的变化来做处理，但其实说真的还是蛮麻烦的。后来发现其实可以简单的在 router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-view :key=&quot;key&quot;></router-view>

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;router-view <span class="hljs-symbol">:key=<span class="hljs-string">"key"</span>&gt;&lt;/router-view&gt;</span>

<span class="hljs-symbol">computed:</span> {
    key() {
        <span class="hljs-keyword">return</span> this.<span class="hljs-variable">$route</span>.name !== undefined? this.<span class="hljs-variable">$route</span>.name + +new Date(): this.<span class="hljs-variable">$route</span> + +new Date()
    }
 }</code></pre>
<hr>
<h2 id="articleHeader17">优化</h2>
<p>有些人会觉得现在构建是不是有点慢，我司现在技术栈是容器服务，后台项目会把dist文件夹里的东西都会打包成一个docker镜像，基本步骤为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
npm run build:prod
加打包镜像，一共是耗时如下" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm install
npm <span class="hljs-keyword">run</span><span class="bash"> build:prod
</span>加打包镜像，一共是耗时如下</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009282319?w=800&amp;h=52" src="https://static.alili.tech/img/remote/1460000009282319?w=800&amp;h=52" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p>还是属于能接受时间的范围。<br>主站PC站基于nodejs、Vue实现服务端渲染，所以不仅需要依赖nodejs，而且需要利用pm2进行nodejs生命周期的管理。为了加速线上镜像构建的速度，我们利用taobao源 <a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a> 进行加速, 并且将一些常见的npm依赖打入了基础镜像，避免每次都需要重新下载。<br>这里注意下 建议不要使用cnpm install或者update 它的包都是一个link，反正会有各种诡异的bug，这里建议这样使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --registry=https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org</code></pre>
<p>如果你觉得慢还是有可优化的空间如使用<code>webpack dll</code> 或者把那些第三方vendor单独打包 external出去，或者我司现在用的是http2 可以使用<code>AggressiveSplittingPlugin</code>等等，这里有需求的可以自行优化。</p>
<hr>
<h2 id="articleHeader18">占坑</h2>
<p>常规占坑，这里是手摸手，带你用vue撸后台系列。<br>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097">手摸手，带你用vue撸后台 系列二（登录权限篇）</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198" target="_blank">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a><br>系类文章：<a href="https://segmentfault.com/a/1190000012213278" target="_blank">手摸手，带你优雅的使用 icon</a><br>系类文章：<a href="https://segmentfault.com/a/1190000009090836">手摸手，带你封装一个vue component</a><br>楼主个人免费<a href="https://jianshiapp.com/circles/1209" rel="nofollow noreferrer" target="_blank">圈子</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手摸手，带你用vue撸后台 系列一(基础篇)

## 原文链接
[https://segmentfault.com/a/1190000009275424](https://segmentfault.com/a/1190000009275424)

