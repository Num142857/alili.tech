---
title: '微豆 - Vue 2.0 实现豆瓣 Web App 教程' 
date: 2019-01-18 2:30:35
hidden: true
slug: aogzptysmm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">微豆 Vdo</h1>
<p>一个使用 Vue.js 与 Material Design 重构 <a href="http://www.douban.com" rel="nofollow noreferrer" target="_blank">豆瓣</a> 的项目。  </p>
<p>项目网站 <a href="http://vdo.ralfz.com/" rel="nofollow noreferrer" target="_blank">http://vdo.ralfz.com/</a></p>
<p>GitHub <a href="https://github.com/RalfZhang/Vdo" rel="nofollow noreferrer" target="_blank">https://github.com/RalfZhang/Vdo</a></p>
<p><span class="img-wrap"><img data-src="/img/bVKNoC?w=370&amp;h=660" src="https://static.alili.tech/img/bVKNoC?w=370&amp;h=660" alt="gif" title="gif" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">快速使用</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 克隆项目到本地
git clone https://github.com/RalfZhang/Vdo.git

# 安装依赖
npm install

# 在 localhost:8080 启动项目
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 克隆项目到本地</span>
git <span class="hljs-built_in">clone</span> https://github.com/RalfZhang/Vdo.git

<span class="hljs-comment"># 安装依赖</span>
npm install

<span class="hljs-comment"># 在 localhost:8080 启动项目</span>
npm run dev</code></pre>
<h1 id="articleHeader2">教程</h1>
<h2 id="articleHeader3">安装 vue-cli 脚手架</h2>
<p>运行如下命令，即可创建一个名为 my-project 的 vue 项目，并且通过本地 8080 端口启动服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli
vue init webpack my-project
cd my-project
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -g vue-cli
vue init webpack my-project
<span class="hljs-built_in">cd</span> my-project
npm install
npm run dev</code></pre>
<p>在运行 <code>vue init webpack my-project</code> 后，会依次要求输入以下配置内容</p>
<ul>
<li><p>项目名称</p></li>
<li><p>项目描述</p></li>
<li><p>作者</p></li>
<li><p>选择 Vue 构建：运行+编译 或 仅运行时</p></li>
<li><p>是否安装 vue-loader</p></li>
<li>
<p>是否使用 ESLint</p>
<ul><li><p>如果是，请选择模式：标准模式、AirBNB 模式、自定义</p></li></ul>
</li>
<li><p>是否使用 Karma + Mocha 的单元测试</p></li>
<li><p>是否使用 Nightwatch e2e 测试</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVKNoW?w=619&amp;h=457" src="https://static.alili.tech/img/bVKNoW?w=619&amp;h=457" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>安装完成后，即可看到以下文件结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
|-- build                            // 项目构建相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查 node、npm 等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack 基础配置（出入口和 loader）
|   |-- webpack.dev.conf.js          // webpack 开发环境配置
|   |-- webpack.prod.conf.js         // webpack 生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量（开发环境接口转发将在此配置）
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                   // vue 公共组件
|   |-- store                        // vuex 的状态管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- test                             // 自动化测试相关文件
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .eslintignore                    // ESLint 检查忽略的文件
|-- .eslistrc.js                     // ESLint 文件，如需更改规则则在此文件添加
|-- .gitignore                       // git 上传需要忽略的文件
|-- README.md                        // 项目说明
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>.
|<span class="hljs-string">-- build                            // 项目构建相关代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- build.js                     // 生产环境构建代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- check-version.js             // 检查 node、npm 等版本
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev-client.js                // 热重载相关
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev-server.js                // 构建本地服务器
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- utils.js                     // 构建工具相关
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.base.conf.js         // webpack 基础配置（出入口和 loader）
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.dev.conf.js          // webpack 开发环境配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.prod.conf.js         // webpack 生产环境配置
</span>|<span class="hljs-string">-- config                           // 项目开发环境配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev.env.js                   // 开发环境变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js                     // 项目一些配置变量（开发环境接口转发将在此配置）
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- prod.env.js                  // 生产环境变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- test.env.js                  // 测试环境变量
</span>|<span class="hljs-string">-- src                              // 源码目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- components                   // vue 公共组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- store                        // vuex 的状态管理
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- App.vue                      // 页面入口文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- main.js                      // 程序入口文件，加载各种公共组件
</span>|<span class="hljs-string">-- static                           // 静态文件，比如一些图片，json数据等
</span>|<span class="hljs-string">-- test                             // 自动化测试相关文件
</span>|<span class="hljs-string">-- .babelrc                         // ES6语法编译配置
</span>|<span class="hljs-string">-- .editorconfig                    // 定义代码格式
</span>|<span class="hljs-string">-- .eslintignore                    // ESLint 检查忽略的文件
</span>|<span class="hljs-string">-- .eslistrc.js                     // ESLint 文件，如需更改规则则在此文件添加
</span>|<span class="hljs-string">-- .gitignore                       // git 上传需要忽略的文件
</span>|<span class="hljs-string">-- README.md                        // 项目说明
</span>|<span class="hljs-string">-- index.html                       // 入口页面
</span>|<span class="hljs-string">-- package.json                     // 项目基本信息
.</span></code></pre>
<h2 id="articleHeader4">ESLint 配置</h2>
<p>ESLint 配置在根目录的 <code>.eslintrc.js</code> 里。  <br>正常情况下，ESLint 报错是因为你的代码不符合现有的 ESLint 规范。<br>如果你的情况实在不想被 ESLint 报错，我举出两个解决方案，来处理 ESLint 报错问题。    </p>
<p>注：本例使用 AirBNB ESLint 规则。  <br>例：通过 <code>npm run dev</code> 启动服务，打开 <code>./src/main.js</code>，添加一句 <code>console.log('abc')</code>，结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './App';
import store from './vuex/store';
/* import router from './router';*/

// 添加此句
console.log('abc')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* router,*/
  template: '<App/>',
  components: { App },
  store,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>;
<span class="hljs-comment">/* import router from './router';*/</span>

<span class="hljs-comment">// 添加此句</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'abc'</span>)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-comment">/* router,*/</span>
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">components</span>: { App },
  store,
});</code></pre>
<p>注：为做演示，句末未添加分号。  </p>
<p>保存 <code>main.js</code> 文件后，页面与终端均提示如下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ERROR  Failed to compile with 1 errors 
 error  in ./src/main.js
  ⚠  http://eslint.org/docs/rules/no-console  Unexpected console statement
  C:\Users\Ralf\Documents\code\ralfz\vue\test\vue02\src\main.js:8:1
  console.log('abc')
   ^
  ✘  http://eslint.org/docs/rules/semi        Missing semicolon
  C:\Users\Ralf\Documents\code\ralfz\vue\test\vue02\src\main.js:8:19
  console.log('abc')
                     ^
✘ 2 problems (1 error, 1 warning)
Errors:
  1  http://eslint.org/docs/rules/semi
Warnings:
  1  http://eslint.org/docs/rules/no-console
 @ multi ./build/dev-client ./src/main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"> ERROR  Failed to compile with 1 errors 
 error  <span class="hljs-keyword">in</span> ./src/main.js
  ⚠  http://eslint.org/docs/rules/no-console  Unexpected console statement
  C:\Users\Ralf\Documents\code\ralfz\vue\<span class="hljs-built_in">test</span>\vue02\src\main.js:8:1
  console.log(<span class="hljs-string">'abc'</span>)
   ^
  ✘  http://eslint.org/docs/rules/semi        Missing semicolon
  C:\Users\Ralf\Documents\code\ralfz\vue\<span class="hljs-built_in">test</span>\vue02\src\main.js:8:19
  console.log(<span class="hljs-string">'abc'</span>)
                     ^
✘ 2 problems (1 error, 1 warning)
Errors:
  1  http://eslint.org/docs/rules/semi
Warnings:
  1  http://eslint.org/docs/rules/no-console
 @ multi ./build/dev-client ./src/main.js</code></pre>
<p>以上输出表明出现两个问题：</p>
<ol>
<li><p>警告：不允许 console 语句。</p></li>
<li><p>错误：句末未加分号。</p></li>
</ol>
<p>解决问题 1</p>
<ul><li><p>在 <code>.eslintrc.js</code> 文件中的 <code>rules</code> 键名下添加<code>'no-console': 'off',</code>，即关闭 console 警告。</p></li></ul>
<p>解决问题 2</p>
<ul>
<li><p>你可以选择继续在 <code>.eslintrc.js</code> 文件中添加关闭句末分号判定的规则。</p></li>
<li><p>或者，也可以把 <code>package.json</code> 文件中的 <code>script</code> 下的 <code>lint</code> 命令改为   <br><code>    "lint": "eslint --fix *.js *.vue src/* test/unit/specs/* test/e2e/specs/*"</code></p></li>
</ul>
<p>即自动修复。值得注意的是，自动修复不能解决所有问题，有时也不甚完美，可以多试几次体会下 fix 的效果。</p>
<p>做完更改后，重新运行 <code>npm run dev</code> 即可看到无问题报告，并且 <code>console</code> 语句后已经自动加上了分号。</p>
<h2 id="articleHeader5">静态页面开发</h2>
<p>此时，浏览器应该已经打开了 localhost:8080 页面。  </p>
<p>在此情况下，请尝试更改 <code>/src/App.vue</code> 和 <code>/src/components/Hello.vue</code> 文件中<code>&lt;template&gt;</code>标签内的内容，保存后即可立即看到浏览器页面已自动更新了你做出的改动。  </p>
<p>接下来，你需要去阅读并学习 <a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">Vue.js 教程页面</a>，务必熟悉 <strong>基础</strong> 部分的内容，掌握 <strong><a href="https://cn.vuejs.org/v2/guide/components.html" rel="nofollow noreferrer" target="_blank">组件</a></strong> 章节。  </p>
<p>熟悉之后，便可以完成基础的静态页面（或者说是组件）设计工作。  </p>
<p>本项目使用了基于 Vue 2.0 和 Material Desigin 的 UI 组件库 <a href="https://museui.github.io/" rel="nofollow noreferrer" target="_blank">Muse-UI</a>。</p>
<p>提示：<code>./src/components</code> 文件夹多用于保存公用组件。至于页面组件，推荐在新建 <code>./src/view</code> 文件夹后存放于此。</p>
<h2 id="articleHeader6">vue-router 2 使用</h2>
<p>当一个个静态组件完成后，需要按照路由组织这些组件文件。  </p>
<p>请前往 <a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router 2 介绍</a> 阅读 <strong>基础</strong> 部分教程，并可以边阅读边配置路由。  </p>
<p>路由文件是 <code>./src/router.index.js</code> 。  </p>
<p>本项目中使用了 <a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">HTML5 History 模式</a>，路由配置比较简单，可以参考。</p>
<h2 id="articleHeader7">API 请求转发配置</h2>
<p>至此，你应该已经完成了所有的静态页面的工作，接下来我们准备搭建请求，为后面的 xhr 请求做好准备。</p>
<ol>
<li><p>打开 <code>http://api.douban.com/v2/movie/in_theaters</code> 查看接口数据，留意此地址。</p></li>
<li>
<p>在 <code>./config/index.js</code> 中的 <code>proxyTable</code> 配置代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
    '/api': {
        target: 'http://api.douban.com/v2',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">proxyTable: {
    <span class="hljs-string">'/api'</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">'http://api.douban.com/v2'</span>,
        <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">pathRewrite</span>: {
            <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }
    }
}</code></pre>
</li>
<li><p>重新启动 <code>npm run dev</code>，打开 <code>localhost:8080/api/movie/in_theaters</code> 查看结果是否与直接请求豆瓣 API 相同。</p></li>
<li>
<p>本应该使用了以下 API：</p>
<ul>
<li><p><code>/v2/movie/search?q={text}</code> 电影搜索api；</p></li>
<li><p><code>/v2/movie/in_theaters</code> 正在上映的电影；</p></li>
<li><p><code>/v2/movie/coming_soon</code> 即将上映的电影；</p></li>
<li><p><code>/v2/movie/subject/:id</code> 单个电影条目信息。</p></li>
</ul>
</li>
</ol>
<blockquote><p>更多请参考 <a href="https://developers.douban.com/wiki" rel="nofollow noreferrer" target="_blank">豆瓣电影 API</a> 文档。</p></blockquote>
<p>这样我们就可以在应用中调用 <code>/api/movie/in_theaters</code> 来访问 <code>http://api.douban.com/v2/movie/in_theaters</code>，从而解决跨域的问题。</p>
<h2 id="articleHeader8">使用 axios</h2>
<p>axios 库使用起来相当简单。  </p>
<p>你可以在单个组件中尝试引入并调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';
axios.get('/v2/movie/in_theaters', { 'city': '广州' })
    .then((result) => {
        console.log(result);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
axios.get(<span class="hljs-string">'/v2/movie/in_theaters'</span>, { <span class="hljs-string">'city'</span>: <span class="hljs-string">'广州'</span> })
    .then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(result);
    });</code></pre>
<p>这里，可以用返回的 <code>result</code> 去更新 <code>data(){ }</code> 中 <code>return</code> 的数据。</p>
<blockquote><p>更多 axios 用法请参考 <a href="https://github.com/mzabriskie/axios#example" rel="nofollow noreferrer" target="_blank">文档</a></p></blockquote>
<h2 id="articleHeader9">使用 Vuex 并分离代码</h2>
<p>为了试代码更加结构化，我们应当将数据请求和视图分离。  </p>
<p>这一节中，我们有两个任务要做：</p>
<ol>
<li><p>分离数据请求层逻辑。</p></li>
<li><p>使用 Vuex 管理状态。</p></li>
</ol>
<p>将二者放到同一节中主要是因为二者再同一目录下，我们来查看 <code>./store</code> 文件夹的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
|-- store                          // 数据处理根目录
|   |-- movies                     // 单个电影模块文件夹
|   |   |-- api.js                 // 电影模块对外开放的接口
|   |   |-- module.js              // Vuex 模块
|   |   |-- type.js                // Vuex 操作 key
|   |-- base.js                    // 基础方法
|   |-- store.js                   // Vuex 入口
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>.
|<span class="hljs-string">-- store                          // 数据处理根目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- movies                     // 单个电影模块文件夹
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- api.js                 // 电影模块对外开放的接口
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- module.js              // Vuex 模块
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- type.js                // Vuex 操作 key
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- base.js                    // 基础方法
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- store.js                   // Vuex 入口
.</span></code></pre>
<p>针对第一个任务：</p>
<ul>
<li><p><code>base.js</code> 存放封装的基础请求函数</p></li>
<li><p><code>**/api.js</code> 存放该模块下公开的请求函数</p></li>
</ul>
<p>针对第二个任务，我们需要先了解 Vuex。  </p>
<p>请查看 <a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Vuex 文档</a>，了解其 <strong>核心概念</strong>。</p>
<blockquote><p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。</p></blockquote>
<p>其实在我看来，Vuex 相当于某种意义上设置了读写权限的全局变量，将数据保存保存到该“全局变量”下，并通过一定的方法去读写数据。（希望这能帮助你理解 Vuex）</p>
<p>为了方便模块化管理：</p>
<ul>
<li><p>我将 <code>store.js</code> 作为入口文件，去挂载各个模块；</p></li>
<li><p><code>/movies/</code>文件夹下为电影相关的模块；</p></li>
<li><p><code>/movies/moudule.js</code> 为电影模块的主要 Vuex 文件；</p></li>
<li><p><code>/movies/type.js</code> 为<a href="https://vuex.vuejs.org/zh-cn/mutations.html" rel="nofollow noreferrer" target="_blank">使用常量替代 Mutation 事件类型</a>的实现。</p></li>
</ul>
<p>到此便完成了所有开发上的基础问题。</p>
<h2 id="articleHeader10">发布</h2>
<ol>
<li><p>运行 <code>npm run build</code>，即可在生成的 <code>/dist</code> 文件夹下看到所有文件。</p></li>
<li><p>将文件复制到你的服务器上某个目录（我的是<code>/var/www/Vdo/dist</code>），按照下一节配置 Nginx 即可</p></li>
</ol>
<p>提示：可以使用 <code>scp</code> 命令将本地文件拷贝至服务器，例如 <code>scp -P 20 -r dist user@host:/target/location</code></p>
<h2 id="articleHeader11">附：配置与开启 Nginx</h2>
<p>注：以下以 CentOS 为例</p>
<ol>
<li><p>安装 Nginx：<code>yum install nginx</code></p></li>
<li><p>打开 <code>/etc/nginx/conf.d/default.conf</code></p></li>
<li><p>替换全文为本项目 <code>/doc/nginx.conf</code> 文件中的内容</p></li>
<li><p>运行 <code>nginx</code></p></li>
</ol>
<p>提示：</p>
<ol>
<li><p><code>403 Forbidden</code> 错误可能是由于文件和文件夹权限引起的，请用 <code>chmod</code> 把存放 <code>index.html</code> 的所有路径上的文件夹权限设置为 755，并将 <code>index.html</code> 文件权限设置成 644 即可。</p></li>
<li><p>更改 Nginx 配置文件后，可以使用 <code>nginx -s reload</code> 命令刷新。</p></li>
</ol>
<h1 id="articleHeader12">结语</h1>
<p>至此，主体工作已经完成。  </p>
<p>欢迎 Star 本项目。</p>
<p><a href="https://github.com/RalfZhang/Vdo" rel="nofollow noreferrer" target="_blank">https://github.com/RalfZhang/Vdo</a></p>
<h1 id="articleHeader13">感谢&amp;参考</h1>
<ul>
<li><p><a href="https://github.com/superman66/vue2.x-douban" rel="nofollow noreferrer" target="_blank">https://github.com/superman66...</a></p></li>
<li><p><a href="http://blog.guowenfh.com/2016/03/24/vue-webpack-01-base/" rel="nofollow noreferrer" target="_blank">http://blog.guowenfh.com/2016...</a></p></li>
<li><p><a href="http://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">http://vuejs-templates.github...</a></p></li>
<li><p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">https://github.com/mzabriskie...</a></p></li>
<li><p><a href="https://museui.github.io/" rel="nofollow noreferrer" target="_blank">https://museui.github.io/</a></p></li>
<li><p><a href="https://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">https://vuejs-templates.githu...</a></p></li>
</ul>
<h1 id="articleHeader14">License</h1>
<p>MIT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微豆 - Vue 2.0 实现豆瓣 Web App 教程

## 原文链接
[https://segmentfault.com/a/1190000008730669](https://segmentfault.com/a/1190000008730669)

