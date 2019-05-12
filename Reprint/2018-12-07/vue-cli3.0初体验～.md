---
title: 'vue-cli3.0初体验～' 
date: 2018-12-07 2:30:10
hidden: true
slug: n9ue7bxtc5s
categories: [reprint]
---

{{< raw >}}

                    
<p>之前因为parcel的出现，webpack也跟进了零配置<br>vue-cli自然也不能落下,cli3.0也升级到webpack4，并增加许多新特性</p>
<h1 id="articleHeader0">安装并创建一个项目</h1>
<p>支持npm和yarn</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @vue/cli
# or
yarn global add @vue/cli
# 使用vue命令，创建项目(不同于cli2.0的init，create)
vue create my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> -g @vue/cli
# <span class="hljs-keyword">or</span>
yarn <span class="hljs-keyword">global</span> <span class="hljs-keyword">add</span> @vue/cli
# 使用vue命令，创建项目(不同于cli2<span class="hljs-number">.0</span>的init，<span class="hljs-keyword">create</span>)
vue <span class="hljs-keyword">create</span> my-<span class="hljs-keyword">project</span></code></pre>
<p>cli3.0开始支持选项了，觉得对命令行不熟悉的朋友们更友好了～<br>本来只有2个预选项的（default和manually），我之前创建并保存了一个full</p>
<p><span class="img-wrap"><img data-src="/img/bV7qgS?w=1140&amp;h=440" src="https://static.alili.tech/img/bV7qgS?w=1140&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以我们主要看一下 manually（default包含在manually里）</p>
<p>首先是特性选择</p>
<p><span class="img-wrap"><img data-src="/img/bV7qjq?w=1140&amp;h=440" src="https://static.alili.tech/img/bV7qjq?w=1140&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后是每个特性的配置文件存放方式（我选了都放在一起～）</p>
<p><span class="img-wrap"><img data-src="/img/bV7qj7?w=1140&amp;h=440" src="https://static.alili.tech/img/bV7qj7?w=1140&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>最后问你 是否 保存为预设选项</p>
<p><span class="img-wrap"><img data-src="/img/bV7qkb?w=1140&amp;h=440" src="https://static.alili.tech/img/bV7qkb?w=1140&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>其实 里面 还有别的询问 都是大同小异 问你，在选过你用npm还是yarn安装后就不再问了（之后可以在.vuerc文件内修改，cd～能看到）会直接帮你创建项目</p>
<p><span class="img-wrap"><img data-src="/img/bV7qkh?w=1140&amp;h=440" src="https://static.alili.tech/img/bV7qkh?w=1140&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>之后运行<code>npm run serve</code>就好了（也不是以前的 npm run dev了）</p>
<p><span class="img-wrap"><img data-src="/img/bV7qkA?w=1140&amp;h=678" src="https://static.alili.tech/img/bV7qkA?w=1140&amp;h=678" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后打印出前台页面地址和后台服务器地址 会自动打开网页</p>
<p><span class="img-wrap"><img data-src="/img/bV7qkI?w=1140&amp;h=508" src="https://static.alili.tech/img/bV7qkI?w=1140&amp;h=508" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">配置你的项目</h1>
<p>虽说是0配置，其实是把某些可以统一的配置项帮使用者配置好了。<br>当然默认配置也是可以更改的。</p>
<h2 id="articleHeader2">初始目录</h2>
<p>我这个是什么特性也没有选的～<br>（上面选manually只是看看而已～并没有选择任何特性～hhh）<br>应该说是最精简的目录了～<br>相比cli2.0的目录，看起来更清爽～</p>
<p><span class="img-wrap"><img data-src="/img/bV7ql1?w=470&amp;h=674" src="https://static.alili.tech/img/bV7ql1?w=470&amp;h=674" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>public相当于原来的static，里面的index.html是项目的入口<br>src同以前</p>
<p>cli3.0没有build和config了，<br>想要配置的话，需要在项目根目录下创建<code>vue.config.js</code>文件<br>(官方文档这么说哒～)<br>关于详细的配置信息，在此放一份 官方说明 供大家参考～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  baseUrl: '/',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `&quot;error&quot;`
  // 当设置为 `&quot;error&quot;` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  compiler: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},

  // vue-loader 选项
  // 查阅 https://vue-loader.vuejs.org/zh-cn/options.html
  vueLoader: {},

  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // 是否使用 `autoDLLPlugin` 分割供应的包？
  // 也可以是一个在 DLL 包中引入的依赖的显性的数组。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#dll-模式
  dll: false,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli-plugin-pwa/README.md
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null, // string | Object
    before: app => {
      // `app` 是一个 express 实例
    }
  },

  // 三方插件的选项
  pluginOptions: {
    // ...
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 项目部署的基础路径</span>
  <span class="hljs-comment">// 我们默认假设你的应用将会部署在域名的根部，</span>
  <span class="hljs-comment">// 比如 https://www.my-app.com/</span>
  <span class="hljs-comment">// 如果你的应用时部署在一个子路径下，那么你需要在这里</span>
  <span class="hljs-comment">// 指定子路径。比如，如果你的应用部署在</span>
  <span class="hljs-comment">// https://www.foobar.com/my-app/</span>
  <span class="hljs-comment">// 那么将这个值改为 `/my-app/`</span>
  baseUrl: <span class="hljs-string">'/'</span>,

  <span class="hljs-comment">// 将构建好的文件输出到哪里</span>
  outputDir: <span class="hljs-string">'dist'</span>,

  <span class="hljs-comment">// 是否在保存的时候使用 `eslint-loader` 进行检查。</span>
  <span class="hljs-comment">// 有效的值：`ture` | `false` | `"error"`</span>
  <span class="hljs-comment">// 当设置为 `"error"` 时，检查出的错误会触发编译失败。</span>
  lintOnSave: <span class="hljs-literal">true</span>,

  <span class="hljs-comment">// 使用带有浏览器内编译器的完整构建版本</span>
  <span class="hljs-comment">// 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时</span>
  compiler: <span class="hljs-literal">false</span>,

  <span class="hljs-comment">// 调整内部的 webpack 配置。</span>
  <span class="hljs-comment">// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md</span>
  chainWebpack: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},
  <span class="hljs-attr">configureWebpack</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {},

  <span class="hljs-comment">// vue-loader 选项</span>
  <span class="hljs-comment">// 查阅 https://vue-loader.vuejs.org/zh-cn/options.html</span>
  vueLoader: {},

  <span class="hljs-comment">// 是否为生产环境构建生成 source map？</span>
  productionSourceMap: <span class="hljs-literal">true</span>,

  <span class="hljs-comment">// CSS 相关选项</span>
  css: {
    <span class="hljs-comment">// 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)</span>
    extract: <span class="hljs-literal">true</span>,

    <span class="hljs-comment">// 是否开启 CSS source map？</span>
    sourceMap: <span class="hljs-literal">false</span>,

    <span class="hljs-comment">// 为预处理器的 loader 传递自定义选项。比如传递给</span>
    <span class="hljs-comment">// sass-loader 时，使用 `{ sass: { ... } }`。</span>
    loaderOptions: {},

    <span class="hljs-comment">// 为所有的 CSS 及其预处理文件开启 CSS Modules。</span>
    <span class="hljs-comment">// 这个选项不会影响 `*.vue` 文件。</span>
    modules: <span class="hljs-literal">false</span>
  },

  <span class="hljs-comment">// 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`</span>
  <span class="hljs-comment">// 在多核机器下会默认开启。</span>
  parallel: <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>).cpus().length &gt; <span class="hljs-number">1</span>,

  <span class="hljs-comment">// 是否使用 `autoDLLPlugin` 分割供应的包？</span>
  <span class="hljs-comment">// 也可以是一个在 DLL 包中引入的依赖的显性的数组。</span>
  <span class="hljs-comment">// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#dll-模式</span>
  dll: <span class="hljs-literal">false</span>,

  <span class="hljs-comment">// PWA 插件的选项。</span>
  <span class="hljs-comment">// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli-plugin-pwa/README.md</span>
  pwa: {},

  <span class="hljs-comment">// 配置 webpack-dev-server 行为。</span>
  devServer: {
    <span class="hljs-attr">open</span>: process.platform === <span class="hljs-string">'darwin'</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'0.0.0.0'</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
    <span class="hljs-attr">https</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">hotOnly</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理</span>
    proxy: <span class="hljs-literal">null</span>, <span class="hljs-comment">// string | Object</span>
    before: <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
      <span class="hljs-comment">// `app` 是一个 express 实例</span>
    }
  },

  <span class="hljs-comment">// 三方插件的选项</span>
  pluginOptions: {
    <span class="hljs-comment">// ...</span>
  }
}
</code></pre>
<h2 id="articleHeader3">配置文件去哪了？</h2>
<p>由下图可看出 <code>vue-cli-service</code> 就是配置文件,那么它在哪里呢?<br><span class="img-wrap"><img data-src="/img/bV7qnq?w=768&amp;h=1246" src="https://static.alili.tech/img/bV7qnq?w=768&amp;h=1246" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后 我就找到了这个～<br>（没法贴图了，忘记sf的贴图有限制。。）</p>
<p>先贴一个重要的，之后代码都是这里的（删了上面的一个图，才贴成功。呜呜）</p>
<p><span class="img-wrap"><img data-src="/img/bV7qqp?w=440&amp;h=1158" src="https://static.alili.tech/img/bV7qqp?w=440&amp;h=1158" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>vue-cli-service.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env node

const semver = require('semver')
const { error } = require('@vue/cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const Service = require('../lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-comment">#!/usr/bin/env node</span>

const semver = require(<span class="hljs-string">'semver'</span>)
const { error } = require(<span class="hljs-string">'@vue/cli-shared-utils'</span>)
const requiredVersion = require(<span class="hljs-string">'../package.json'</span>).engines.node

<span class="hljs-keyword">if</span> (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node <span class="hljs-variable">${process.version}</span>, but vue-cli-service ` +
    `requires Node <span class="hljs-variable">${requiredVersion}</span>.\nPlease upgrade your Node version.`
  )
  process.<span class="hljs-keyword">exit</span>(<span class="hljs-number">1</span>)
}

const Service = require(<span class="hljs-string">'../lib/Service'</span>)
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(<span class="hljs-number">2</span>)
const args = require(<span class="hljs-string">'minimist'</span>)(rawArgv)
const command = args._[<span class="hljs-number">0</span>]

service.run(command, args, rawArgv).catch(err =&gt; {
  error(err)
  process.<span class="hljs-keyword">exit</span>(<span class="hljs-number">1</span>)
})
</code></pre>
<p>然后顺藤摸瓜，来看看这个～<br><code>Service.js</code></p>
<p>在这个文件里找到run方法 再往下一点 看到了 <em>vue.config.js</em><br>等等～这不就是文档说的我们的配置文件吗～<br>哈哈哈～这就算是完全找到了吧～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="很多代码↑
  loadUserOptions (inlineOptions) {
    // vue.config.js
    let fileConfig, pkgConfig, resolved, resovledFrom
    const configPath = (
      process.env.VUE_CLI_SERVICE_CONFIG_PATH ||
      path.resolve(this.context, 'vue.config.js')
    )
    if (fs.existsSync(configPath)) {
      try {
        fileConfig = require(configPath)
        if (!fileConfig || typeof fileConfig !== 'object') {
          error(
            `Error loading ${chalk.bold('vue.config.js')}: should export an object.`
          )
          fileConfig = null
        }
      } catch (e) {
        error(`Error loading ${chalk.bold('vue.config.js')}:`)
        throw e
      }
    }
很多代码↓    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>很多代码↑
  loadUserOptions (inlineOptions) {
    <span class="hljs-comment">// vue.config.js</span>
    <span class="hljs-keyword">let</span> fileConfig, pkgConfig, resolved, resovledFrom
    <span class="hljs-keyword">const</span> configPath = (
      process.env.VUE_CLI_SERVICE_CONFIG_PATH ||
      path.resolve(<span class="hljs-keyword">this</span>.context, <span class="hljs-string">'vue.config.js'</span>)
    )
    <span class="hljs-keyword">if</span> (fs.existsSync(configPath)) {
      <span class="hljs-keyword">try</span> {
        fileConfig = <span class="hljs-built_in">require</span>(configPath)
        <span class="hljs-keyword">if</span> (!fileConfig || <span class="hljs-keyword">typeof</span> fileConfig !== <span class="hljs-string">'object'</span>) {
          error(
            <span class="hljs-string">`Error loading <span class="hljs-subst">${chalk.bold(<span class="hljs-string">'vue.config.js'</span>)}</span>: should export an object.`</span>
          )
          fileConfig = <span class="hljs-literal">null</span>
        }
      } <span class="hljs-keyword">catch</span> (e) {
        error(<span class="hljs-string">`Error loading <span class="hljs-subst">${chalk.bold(<span class="hljs-string">'vue.config.js'</span>)}</span>:`</span>)
        <span class="hljs-keyword">throw</span> e
      }
    }
很多代码↓    </code></pre>
<h1 id="articleHeader4">关于vue-cli3.0体验的感想</h1>
<p>早些年，安卓2.2的时候，热衷于刷机，尝试各种rom修改版<br>现在rom都优化的很好，都是拿来直接用<br>除非必要，已经没有多少人热衷刷机了</p>
<p>对于0配置，也是如此<br>已经配置好的部分放在里面，外面简洁方便大多数人使用<br>当你想使用自己的配置时，也可以很方便的修改</p>
<p>降低学习成本增加易用性才是王道啊～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli3.0初体验～

## 原文链接
[https://segmentfault.com/a/1190000014123259](https://segmentfault.com/a/1190000014123259)

