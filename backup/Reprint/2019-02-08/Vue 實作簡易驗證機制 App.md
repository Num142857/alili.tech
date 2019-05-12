---
title: 'Vue 實作簡易驗證機制 App' 
date: 2019-02-08 2:30:41
hidden: true
slug: ji5k3krbyzr
categories: [reprint]
---

{{< raw >}}

                    
<p>為了顯示出 Vue.js 強大的能力 ，本文將會逐步指導建置一個簡單的前端應用程式。搭配 Node 所建置的後端程式範例。前後端兩個程式是完全分離的，後端使用 RESTful API 的方式負責取得資料與驗證。本文旨在說明如何替 Vue.js 程式加上驗證機制，過程中我們會使用 <code>vue-router</code>, <code>vue-resource</code> 實作 <code>Login</code> 與 <code>Signup</code> 元件展示如何檢索和儲存使用者的 <code>jwt token</code>，最後執行驗證機制取得那些需要授權的資料。</p>
<h2 id="articleHeader0">安裝與設定</h2>
<p>首先從組織前端程式開始，讓我們先來建立專案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir auth-front-app
$ cd auth-front-app
$ npm init --yes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ mkdir auth-front-app
$ <span class="hljs-built_in">cd</span> auth-front-app
$ npm init --yes</code></pre>
<p>安裝我們所需要的 npm 套件，我們會在這個專案使用 Babel, Webpack 負責建置工具的部份：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-runtime css-loader style-loader vue-hot-reload-api vue-html-loader vue-style-loader vue-loader webpack webpack-dev-server -D

$ npm i bootstrap vue-resource vue-router vue -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm i babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-runtime css-loader style-loader vue-hot-reload-api vue-html-loader vue-style-loader vue-loader webpack webpack-dev-server -D

$ npm i bootstrap vue-resource vue-router vue -S</code></pre>
<p>package.json 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;auth-front-app&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;keywords&quot;: [],
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.10.4&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.4&quot;,
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.9.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.9.0&quot;,
    &quot;babel-runtime&quot;: &quot;^6.9.2&quot;,
    &quot;css-loader&quot;: &quot;^0.23.1&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;vue-hot-reload-api&quot;: &quot;^1.3.3&quot;,
    &quot;vue-html-loader&quot;: &quot;^1.2.3&quot;,
    &quot;vue-loader&quot;: &quot;^8.5.3&quot;,
    &quot;vue-style-loader&quot;: &quot;^1.0.0&quot;,
    &quot;webpack&quot;: &quot;^1.13.1&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.14.1&quot;
  },
  &quot;dependencies&quot;: {
    &quot;bootstrap&quot;: &quot;^3.3.6&quot;,
    &quot;vue&quot;: &quot;^1.0.25&quot;,
    &quot;vue-resource&quot;: &quot;^0.8.0&quot;,
    &quot;vue-router&quot;: &quot;^0.7.13&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"auth-front-app"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"keywords"</span>: [],
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.10.4"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.2.4"</span>,
    <span class="hljs-attr">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-runtime"</span>: <span class="hljs-string">"^6.9.2"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.23.1"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"vue-hot-reload-api"</span>: <span class="hljs-string">"^1.3.3"</span>,
    <span class="hljs-attr">"vue-html-loader"</span>: <span class="hljs-string">"^1.2.3"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^8.5.3"</span>,
    <span class="hljs-attr">"vue-style-loader"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.1"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.14.1"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"bootstrap"</span>: <span class="hljs-string">"^3.3.6"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^1.0.25"</span>,
    <span class="hljs-attr">"vue-resource"</span>: <span class="hljs-string">"^0.8.0"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^0.7.13"</span>
  }
}</code></pre>
<p>安裝完套件之後就是專案目錄下新增 <code>webpack.config.js</code> 設定檔：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')

module.exports = {
  entry: ['./src/index.js', './src/auth/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  /**
   * option: 您可以選擇把下面這段設定置於 .babelrc
   */
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">'./src/index.js'</span>, <span class="hljs-string">'./src/auth/index.js'</span>],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      }
    ]
  },
  <span class="hljs-comment">/**
   * option: 您可以選擇把下面這段設定置於 .babelrc
   */</span>
  babel: {
    <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>],
    <span class="hljs-attr">plugins</span>: [<span class="hljs-string">'transform-runtime'</span>]
  }
}</code></pre>
<p>設定檔中首要的就是我們程式的進入點，我們設定了 <code>src/index.js</code> 和 <code>src/auth/index.js</code> 這兩支程式，最後會被輸出成 <code>bundle.js</code>。到這一步先別擔心我們還沒完成任何程式，習慣上小弟我會先構想整個專案架構，透過組織 webpack.config 可以讓我們先好好思考一下。</p>
<p>因為我們想使用 <code>vue 元件</code> 的方式組織程式碼。於是設定了負責處理 <code>.vue</code> 的部分，即 <code>vue-loader</code> 協助編譯。<br>到此便是我們目前所需的設定，最後我們只要透過 <code>webpack-dev-server --inline --hot</code> 就可觀察開發的前端程式。</p>
<blockquote><p>Module not found: Error: Cannot resolve 因為到目前為止我們只是預先規劃兩隻進入點的程式還沒實作，所以執行 webpack-dev-server 會產生錯誤。</p></blockquote>
<h2 id="articleHeader1">設定後端程式</h2>
<p>因為本篇文章主要是要討論關於 Vue.js 處理驗證機制的作法，所以我們在後端部分採用 <a href="https://github.com/auth0/nodejs-jwt-authentication-sample" rel="nofollow noreferrer" target="_blank">nodejs-jwt-authentication-sample</a>。使用概略如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 記得切換到另外的目錄
$ git clone git@github.com:auth0-blog/nodejs-jwt-authentication-sample.git
$ cd nodejs-jwt-authentication-sample
$ npm install

# 啟動後端程式
$ PORT=3001 node server.js

# 建立使用者 POST /users
# 注意：username 和 password 必須替換
$ curl -d &quot;username=[replace_me]&amp;password=[replace_me]&quot; http://localhost:3001/users
# 建立成功應會回傳 { &quot;id_token&quot;: &quot;...&quot; }

# 登入 POST /sessions/create
$ curl -d &quot;username=[replace_me]&amp;password=[replace_me]&quot; http://localhost:3001/sessions/create
# 登入成功應會回傳 { &quot;id_token&quot;: &quot;...&quot; }

# 不需授權 API: http://localhost:3001/api/random-quote
# 受保護 API: http://localhost:3001/api/protected/random-quote" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 記得切換到另外的目錄</span>
$ git <span class="hljs-built_in">clone</span> git@github.com:auth0-blog/nodejs-jwt-authentication-sample.git
$ <span class="hljs-built_in">cd</span> nodejs-jwt-authentication-sample
$ npm install

<span class="hljs-comment"># 啟動後端程式</span>
$ PORT=3001 node server.js

<span class="hljs-comment"># 建立使用者 POST /users</span>
<span class="hljs-comment"># 注意：username 和 password 必須替換</span>
$ curl <span class="hljs-_">-d</span> <span class="hljs-string">"username=[replace_me]&amp;password=[replace_me]"</span> http://localhost:3001/users
<span class="hljs-comment"># 建立成功應會回傳 { "id_token": "..." }</span>

<span class="hljs-comment"># 登入 POST /sessions/create</span>
$ curl <span class="hljs-_">-d</span> <span class="hljs-string">"username=[replace_me]&amp;password=[replace_me]"</span> http://localhost:3001/sessions/create
<span class="hljs-comment"># 登入成功應會回傳 { "id_token": "..." }</span>

<span class="hljs-comment"># 不需授權 API: http://localhost:3001/api/random-quote</span>
<span class="hljs-comment"># 受保護 API: http://localhost:3001/api/protected/random-quote</span></code></pre>
<blockquote><p>注意這個後端範例的帳號資料會放在記憶體中，重啟就會消失。</p></blockquote>
<h2 id="articleHeader2">配置 Vue 元件</h2>
<p>現在可以來替我們的應用程式建置元件。在專案配置一節我們安裝與使用了 <code>vue-loader</code> 然後提到它讓我們可以使用 <code>.vue</code> 的方式來撰寫元件。具體來說就是我們在一隻 <code>[component_name].vue</code> 的檔案中分別撰寫 <code>&lt;template&gt;</code>, <code>&lt;script&gt;</code>, <code>&lt;style&gt;</code> ，最終這隻檔案會被輸出成一個元件供我們組合或使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 在專案目錄下
$ mkdir -p src/components
$ touch src/components/Home.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 在專案目錄下</span>
$ mkdir -p src/components
$ touch src/components/Home.vue</code></pre>
<p>Home 元件主要透過 API 去得不須授權的資料並顯示 <code>src/components/Home.vue</code> 元件程式碼如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/Home.vue -->

<template>
  <div class=&quot;col-sm-6 col-sm-offset-3&quot;>
    <h1>取得不需授權的 Chunck Norris 名言</h1>
    <button class=&quot;btn btn-primary&quot; @click=&quot;getQuote&quot;>取得名言</button>
    <div class=&quot;quote-area&quot; v-if=&quot;quote&quot;>
      <h2><blockquote>"{{"quote"}}"</blockquote></h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      quote: ''
    }
  },
  methods: {
    getQuote () {
      this.$http.get('http://localhost:3001/api/random-quote')
        .then((res) => {
          this.quote = res.data
        })
        .catch((err) => { console.log(err) })
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/Home.vue --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-6 col-sm-offset-3"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>取得不需授權的 Chunck Norris 名言<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getQuote"</span>&gt;</span>取得名言<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"quote-area"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"quote"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">blockquote</span>&gt;</span>"{{"quote"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">blockquote</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">quote</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    getQuote () {
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost:3001/api/random-quote'</span>)
        .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-keyword">this</span>.quote = res.data
        })
        .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> { <span class="hljs-built_in">console</span>.log(err) })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><code>&lt;template&gt;</code> 裡的就是我們要顯示的 HTML 標籤結構，裡面有一個按鈕用來呼叫 <code>getQuote</code>，還有一些看起來像 <code>Angular 1.x</code> 的特殊屬性，它們是 Vue 的 <code>directive</code>，像是 <code>@click</code>, <code>v-if</code> 這些都是，而 <code>@click</code> 又可以寫成 <code>v-on:click</code> 當點擊的時候會觸發我們綁定的事件(從 methods 來)，<code>v-if</code> 可以根據綁定的資料 <code>quote</code> 來決定 <code>&lt;div class="quote-area"&gt;</code> 是否要輸出顯示。當然 Vue 也可以在樣板中使用 <code>"{{""}}"</code> 的語法用來作資料綁定(從 data 來)。</p>
<p><code>&lt;script&gt;</code> 的部分會匯出一個 JS 物件，接著會被 Vue 轉換為一個 Vue 元件。大體來說 <code>data</code> 可以提供我們作資料繫結，<code>methods</code> 可以協助我們綁定一些互動的事件。<code>getQuote</code> 中的 <code>this.$http</code> 則是從 <code>vue-resource</code> 中加入的功能。</p>
<p>目前為止程式仍無法運作，不過我們簡單的介紹了一個 <code>.vue</code> 元件長啥樣和一些語法的作用。詳細的用法還是需要花點時間閱讀手冊。</p>
<h2 id="articleHeader3">主程式 index.js 和 App.vue</h2>
<p><code>index.js</code> 是程式主要的進入點，我們會在這邊匯入元件，設定路由等等等。為了單純起見，整個程式所有需要的設定都會放在這隻檔案中。</p>
<p>新增 <code>src/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 替 Vue 掛上 HTTP Request 的功能
Vue.use(VueResource)

// 替 Vue 掛上路由的功能
Vue.use(VueRouter)

// export 是為了讓其他分離的程式碼也能取得路由的物件實例
export var router = new VueRouter()

// 定義路由
router.map({
  '/home': {
    component: Home
  },
  '/secretquote': {
    component: SecretQuote
  },
  'login': {
    component: Login
  },
  'signup': {
    component: Signup
  }
})

router.redirect({
  '*': '/home'
})

auth.check()
// 啟動路由並將 root component 掛載到 HTML 中 id=&quot;app&quot; 的 DOM 上
router.start(App, '#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/App.vue'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Home.vue'</span>
<span class="hljs-keyword">import</span> SecretQuote <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/SecretQuote.vue'</span>
<span class="hljs-keyword">import</span> Signup <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Signup.vue'</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Login.vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

<span class="hljs-comment">// 替 Vue 掛上 HTTP Request 的功能</span>
Vue.use(VueResource)

<span class="hljs-comment">// 替 Vue 掛上路由的功能</span>
Vue.use(VueRouter)

<span class="hljs-comment">// export 是為了讓其他分離的程式碼也能取得路由的物件實例</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter()

<span class="hljs-comment">// 定義路由</span>
router.map({
  <span class="hljs-string">'/home'</span>: {
    <span class="hljs-attr">component</span>: Home
  },
  <span class="hljs-string">'/secretquote'</span>: {
    <span class="hljs-attr">component</span>: SecretQuote
  },
  <span class="hljs-string">'login'</span>: {
    <span class="hljs-attr">component</span>: Login
  },
  <span class="hljs-string">'signup'</span>: {
    <span class="hljs-attr">component</span>: Signup
  }
})

router.redirect({
  <span class="hljs-string">'*'</span>: <span class="hljs-string">'/home'</span>
})

auth.check()
<span class="hljs-comment">// 啟動路由並將 root component 掛載到 HTML 中 id="app" 的 DOM 上</span>
router.start(App, <span class="hljs-string">'#app'</span>)</code></pre>
<p>現在我們匯入了一些 Vue 元件大致上讓我們理解該怎麼使用元件與 <code>vue-router</code>，但注意到我們還未實作任何程式碼。</p>
<p><code>vue-router</code> 和 <code>vue-resource</code> 需要透過 <code>Vue.use()</code> 將功能附加到 Vue 中。同時我們也定義了一些路由，理解 <code>vue-router</code> 中一個路由可以對應一個元件。</p>
<p>接著我們便可以開始完善這些元件。第一個是我們的根元件 <code>App.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/App.vue -->

<template>
  <div>
  <!-- 注意：少了最外層的 wrapper 會出現
      Attribute &quot;id&quot; is ignored on component 警告
  -->
  <nav class=&quot;navbar navbar-default&quot;>
    <div class=&quot;container&quot;>
      <ul class=&quot;nav navbar-nav&quot;>
        <li><a v-link=&quot;'home'&quot;>Home</a></li>
        <li><a v-link=&quot;'login'&quot;>Login</a></li>
        <li><a v-link=&quot;'signup'&quot;>Signup</a></li>
        <li><a v-link=&quot;'secretquote'&quot;>Secret Quote</a></li>
        <li><a v-link=&quot;'login'&quot;>Logout</a></li>
      </ul>
    </div>
  </nav>
  <div class=&quot;container&quot;>
    <router-view></router-view>
  </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/App.vue --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 注意：少了最外層的 wrapper 會出現
      Attribute "id" is ignored on component 警告
  --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar navbar-default"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav navbar-nav"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'home'"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'login'"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'signup'"</span>&gt;</span>Signup<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'secretquote'"</span>&gt;</span>Secret Quote<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'login'"</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>在 <code>App.vue</code> 元件中我們組織了最外層的結構，我們需要一個 <code>navbar</code> 來切換，而更換的元件會顯示在 <code>&lt;router-view&gt;&lt;/router-view&gt;</code> 位置。切換頁面的連結只要使用 <code>v-link</code> 屬性即可。最後我們需要一個 <code>index.html</code> 來載入 <code>bundle.js</code> 以及 <code>app</code> 的掛載點。</p>
<blockquote><p>注意到 v-link 中的 <code>"'home'"</code>，v-link 有三種設定方式請參考<a href="http://router.vuejs.org/zh-cn/basic.html" rel="nofollow noreferrer" target="_blank">說明文件</a></p></blockquote>
<p>新增 <code>index.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->

<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Authenticate Vue App</title>
  <link rel=&quot;stylesheet&quot; href=&quot;node_modules/bootstrap/dist/css/bootstrap.min.css&quot;>
</head>
<body>
  <div id=&quot;app&quot;></div>
  <script src=&quot;bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>

<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Authenticate Vue App<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"node_modules/bootstrap/dist/css/bootstrap.min.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>到這一步如果您很著急想看看到底實作了些什麼，您可以先把 <code>webpack.config</code> 中的 <code>src/auth/index.js</code> 移除並在 <code>src/index.js</code> 把還沒實作的元件註解。</p>
<p>執行 <code>webpack-dev-server --inline --hot</code> 應該可以看到如下圖</p>
<p><span class="img-wrap"><img data-src="http://i.imgur.com/UHC4zAc.png" src="https://static.alili.techhttp://i.imgur.com/UHC4zAc.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">驗證機制</h2>
<p>為了讓使用者登入我們需要發送一個 HTTP 請求給後端程式驗證，然後儲存回傳的 jwt 到 <code>localStorage</code>。我們可以將這段邏輯放到 Login 元件裡，不過為了重複使用，我們會將這些驗證邏輯抽出來放到 <code>src/auth/index.js</code> 中。</p>
<p>新增 <code>src/auth/index.js</code> 撰寫程式碼如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 看到我們之前鋪的梗了吧，exprt router 就是這邊使用。
import {router} from '../index'

const API_URL = 'http://localhost:3001'

export default {
  user: {
    authenticated: false
  },
  login (context, creds, redirect) {
    var url = API_URL + '/sessions/create'

    context.$http.post(url, creds)
      .then((res) => {
        localStorage.setItem('id_token', res.data.id_token)
        this.user.authenticated = true
        console.log('Login successfully', res.data.id_token)
        if (redirect) {
          router.go(redirect)
        }
      })
      .catch((err) => {
        console.log(err)
        context.error = err.data
      })
  },
  signup (context, creds, redirect) {
    var url = API_URL + '/users'

    context.$http.post(url, creds)
      .then((res) => {
        localStorage.setItem('id_token', res.data.id_token)
        this.user.authenticated = true

        if (redirect) {
          router.go(redirect)
        }
      })
      .catch((err) => {
        console.log(err)
        context.error = err.data
      })
  },
  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },
  check () {
    /**
     * 這邊只是單純示範，您不該在驗證邏輯單純只判斷是否有 token
     */
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 看到我們之前鋪的梗了吧，exprt router 就是這邊使用。</span>
<span class="hljs-keyword">import</span> {router} <span class="hljs-keyword">from</span> <span class="hljs-string">'../index'</span>

<span class="hljs-keyword">const</span> API_URL = <span class="hljs-string">'http://localhost:3001'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">user</span>: {
    <span class="hljs-attr">authenticated</span>: <span class="hljs-literal">false</span>
  },
  login (context, creds, redirect) {
    <span class="hljs-keyword">var</span> url = API_URL + <span class="hljs-string">'/sessions/create'</span>

    context.$http.post(url, creds)
      .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        localStorage.setItem(<span class="hljs-string">'id_token'</span>, res.data.id_token)
        <span class="hljs-keyword">this</span>.user.authenticated = <span class="hljs-literal">true</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Login successfully'</span>, res.data.id_token)
        <span class="hljs-keyword">if</span> (redirect) {
          router.go(redirect)
        }
      })
      .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(err)
        context.error = err.data
      })
  },
  signup (context, creds, redirect) {
    <span class="hljs-keyword">var</span> url = API_URL + <span class="hljs-string">'/users'</span>

    context.$http.post(url, creds)
      .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        localStorage.setItem(<span class="hljs-string">'id_token'</span>, res.data.id_token)
        <span class="hljs-keyword">this</span>.user.authenticated = <span class="hljs-literal">true</span>

        <span class="hljs-keyword">if</span> (redirect) {
          router.go(redirect)
        }
      })
      .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(err)
        context.error = err.data
      })
  },
  logout () {
    localStorage.removeItem(<span class="hljs-string">'id_token'</span>)
    <span class="hljs-keyword">this</span>.user.authenticated = <span class="hljs-literal">false</span>
  },
  check () {
    <span class="hljs-comment">/**
     * 這邊只是單純示範，您不該在驗證邏輯單純只判斷是否有 token
     */</span>
    <span class="hljs-keyword">var</span> jwt = localStorage.getItem(<span class="hljs-string">'id_token'</span>)
    <span class="hljs-keyword">if</span> (jwt) {
      <span class="hljs-keyword">this</span>.user.authenticated = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.user.authenticated = <span class="hljs-literal">false</span>
    }
  },
  getAuthHeader () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + localStorage.getItem(<span class="hljs-string">'id_token'</span>)
    }
  }
}</code></pre>
<p>還記得我們在 <code>src/index.js</code> 中有匯出 <code>export var router</code> 所以這邊可以取得 router 的物件實例。<br>這隻 <code>src/auth/index.js</code> 匯出一些 methods 協助我們執行登入，登出，驗證帳密，註冊的行為。<br>登入只負責取回 jwt 然後儲存，如果帳密驗證失敗整個請求就會出現錯誤，自然就不會登入成功。最後我們透過這些方法和屬性來處理前端關於<code>登入的相關邏輯</code>，例如使用 <code>user.authenticated</code> 屬性來判斷是否登入。</p>
<h2 id="articleHeader5">實作 Login 元件</h2>
<p>Login 元件中我們需要兩個 <code>&lt;input&gt;</code> 來輸入帳密然後使用 <code>auth</code> 去驗證是否成功登入。</p>
<p>新增 <code>src/components/Login.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/Login.vue -->

<template>
  <div class=&quot;col-sm-4 col-sm-offset-4&quot;>
    <h2>登入</h2>
    <p>
      登入帳號取得更棒的名言。
    </p>
    <div class=&quot;alert alert-danger&quot; v-if=&quot;error&quot;>
      "{{"error"}}"
    </div>
    <div class=&quot;form-group&quot;>
      <input
        type=&quot;text&quot;
        class=&quot;form-control&quot;
        placeholder=&quot;帳號&quot;
        v-model=&quot;credentials.username&quot;
      >
    </div>
    <div class=&quot;form-group&quot;>
      <input
        type=&quot;password&quot;
        class=&quot;form-control&quot;
        placeholder=&quot;密碼&quot;
        v-model=&quot;credentials.password&quot;
      >
    </div>
    <button class=&quot;btn btn-primary&quot; @click=&quot;submit&quot;>登入並存取</button>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      auth.login(this, credentials, 'secretquote')
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/Login.vue --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-4 col-sm-offset-4"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>登入<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      登入帳號取得更棒的名言。
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alert alert-danger"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"error"</span>&gt;</span>
      "{{"error"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"帳號"</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"credentials.username"</span>
      &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"密碼"</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"credentials.password"</span>
      &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"submit"</span>&gt;</span>登入並存取<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> auth <span class="hljs-keyword">from</span> <span class="hljs-string">'../auth'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">credentials</span>: {
        <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>
      },
      <span class="hljs-attr">error</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    submit () {
      <span class="hljs-keyword">var</span> credentials = {
        <span class="hljs-attr">username</span>: <span class="hljs-keyword">this</span>.credentials.username,
        <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.credentials.password
      }
      auth.login(<span class="hljs-keyword">this</span>, credentials, <span class="hljs-string">'secretquote'</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>HTTP 請求是透過 <code>vue-reource</code> 來完成的，由於我們把 <code>auth</code> 抽出去，所以在第一個參數部分，我們需要把 <code>context</code> 也就是該元件的物件實例(instance)傳過去，如此一來在發生錯誤的時候我們也才能夠把錯誤訊息傳回去。第二個參數是使用者登入所需的驗證資料，第三個參數則是完成登入後要切換的頁面路由。</p>
<p>緊接著 Signup 元件的部份跟 Login 幾乎一樣，只是使用的 <code>auth</code> 方法不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/Signup.vue -->

<template>
  <div class=&quot;col-sm-4 col-sm-offset-4&quot;>
    <h2>註冊</h2>
    <p>
      建立一組新帳號吧！
    </p>
    <div class=&quot;alert alert-danger&quot; v-if=&quot;error&quot;>
      "{{"error"}}"
    </div>
    <div class=&quot;form-group&quot;>
      <input
        type=&quot;text&quot;
        class=&quot;form-control&quot;
        placeholder=&quot;帳號&quot;
        v-model=&quot;credentials.username&quot;
      >
    </div>
    <div class=&quot;form-group&quot;>
      <input
        type=&quot;password&quot;
        class=&quot;form-control&quot;
        placeholder=&quot;密碼&quot;
        v-model=&quot;credentials.password&quot;
      >
    </div>
    <button class=&quot;btn btn-primary&quot; @click=&quot;submit&quot;>註冊並存取</button>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      auth.signup(this, credentials, 'secretquote')
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/Signup.vue --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-4 col-sm-offset-4"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>註冊<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      建立一組新帳號吧！
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alert alert-danger"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"error"</span>&gt;</span>
      "{{"error"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"帳號"</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"credentials.username"</span>
      &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span>
        <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"密碼"</span>
        <span class="hljs-attr">v-model</span>=<span class="hljs-string">"credentials.password"</span>
      &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"submit"</span>&gt;</span>註冊並存取<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> auth <span class="hljs-keyword">from</span> <span class="hljs-string">'../auth'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">credentials</span>: {
        <span class="hljs-attr">username</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">password</span>: <span class="hljs-string">''</span>
      },
      <span class="hljs-attr">error</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    submit () {
      <span class="hljs-keyword">var</span> credentials = {
        <span class="hljs-attr">username</span>: <span class="hljs-keyword">this</span>.credentials.username,
        <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.credentials.password
      }
      auth.signup(<span class="hljs-keyword">this</span>, credentials, <span class="hljs-string">'secretquote'</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader6">實作 SecretQuote 元件 - 取得受保護的資料</h2>
<p>使用者需要登入成功之後就才能存取 <code>secret-quote</code> 路由，<code>SecretQuote</code> 元件看起來跟 Home 很像，不過在呼叫 API 的過程需要使用 jwt token。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/SecretQuote.vue -->

<template>
  <div class=&quot;col-sm-6 col-sm-offset-3&quot;>
    <h1>取得需要授權的名言</h1>
    <button class=&quot;btn btn-warning&quot; @click=&quot;getQuote()&quot;>取得名言</button>
    <div class=&quot;quote-area&quot; v-if=&quot;quote&quot;>
      <h2><blockquote>"{{"quote"}}"</blockquote></h2>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      quote: ''
    }
  },
  methods: {
    getQuote () {
      this.$http.get('http://localhost:3001/api/protected/random-quote', null, {
          headers: auth.getAuthHeader()
        })
        .then( (res) => {
          this.quote = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  route: {
    canActivate () {
      return auth.user.authenticated
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/SecretQuote.vue --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-6 col-sm-offset-3"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>取得需要授權的名言<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-warning"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getQuote()"</span>&gt;</span>取得名言<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"quote-area"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"quote"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">blockquote</span>&gt;</span>"{{"quote"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">blockquote</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> auth <span class="hljs-keyword">from</span> <span class="hljs-string">'../auth'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">quote</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    getQuote () {
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost:3001/api/protected/random-quote'</span>, <span class="hljs-literal">null</span>, {
          <span class="hljs-attr">headers</span>: auth.getAuthHeader()
        })
        .then( <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-keyword">this</span>.quote = res.data
        })
        .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          <span class="hljs-built_in">console</span>.log(err)
        })
    }
  },
  <span class="hljs-attr">route</span>: {
    canActivate () {
      <span class="hljs-keyword">return</span> auth.user.authenticated
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>透過傳入 <code>options</code> 參數我們可以附加資料到請求的 <code>header</code> 中。而 jwt header 可以透過 <code>auth.getAuthHeader</code> 來取得。</p>
<p>最關鍵的部分，因為我們不希望在使用者未登入時能夠存取該路由。所以在這一步我們就會透過 <code>vue-router</code> 的 <code>canActivate</code> hook 處理。</p>
<h2 id="articleHeader7">完成剩餘的部分</h2>
<p>最後針對不同狀態處理一些是否該顯示的地方完善我們的程式碼 <code>App.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/App.vue -->

<template>
  <div>
  <!-- 注意：少了最外層的 wrapper 會出現
      Attribute &quot;id&quot; is ignored on component 警告
  -->
  <nav class=&quot;navbar navbar-default&quot;>
    <div class=&quot;container&quot;>
      <ul class=&quot;nav navbar-nav&quot;>
        <li><a v-link=&quot;'home'&quot;>Home</a></li>
        <li><a v-link=&quot;'login'&quot; v-if=&quot;!user.authenticated&quot;>Login</a></li>
        <li><a v-link=&quot;'signup'&quot; v-if=&quot;!user.authenticated&quot;>Signup</a></li>
        <li><a v-link=&quot;'secretquote'&quot; v-if=&quot;user.authenticated&quot;>Secret Quote</a></li>
        <li><a v-link=&quot;'login'&quot; v-if=&quot;user.authenticated&quot; @click=&quot;logout&quot;>Logout</a></li>
      </ul>
    </div>
  </nav>
  <div class=&quot;container&quot;>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      user: auth.user
    }
  },
  methods: {
    logout () {
      auth.logout()
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/App.vue --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 注意：少了最外層的 wrapper 會出現
      Attribute "id" is ignored on component 警告
  --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar navbar-default"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav navbar-nav"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'home'"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'login'"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!user.authenticated"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'signup'"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!user.authenticated"</span>&gt;</span>Signup<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'secretquote'"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"user.authenticated"</span>&gt;</span>Secret Quote<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'login'"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"user.authenticated"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"logout"</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> auth <span class="hljs-keyword">from</span> <span class="hljs-string">'../auth'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">user</span>: auth.user
    }
  },
  <span class="hljs-attr">methods</span>: {
    logout () {
      auth.logout()
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader8">參考資源</h2>
<ul><li><p><a href="https://auth0.com/blog/2015/11/13/build-an-app-with-vuejs/" rel="nofollow noreferrer" target="_blank">Build an app with Vuejs</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 實作簡易驗證機制 App

## 原文链接
[https://segmentfault.com/a/1190000005783325](https://segmentfault.com/a/1190000005783325)

