---
title: 'vue + webpack 起手式' 
date: 2019-02-09 2:30:59
hidden: true
slug: c7dmozncdyt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">介紹</h1>
<blockquote><p>2016-10-04 更新為使用 Vue.js 2.x</p></blockquote>
<p>前端的世界變化之快速，從 2010 開始小弟經歷了 jQuery, Backbone, Angular, 到 React。這一路走來雖然學習到了許多高明開發者融合於框架或函式庫中的智慧，卻也因為不斷快速變化感到疲憊。時至 2016 小弟認為在實務與理想之間取得一個完美平衡的前端框架大概就屬 <code>vue.js</code> 了。</p>
<p>當然這前端世界裡並沒有萬能藥可以完美的處理所有問題，不過 <code>vue.js</code> 的精美，不只容易與傳統 MVC 框架(Rails, ASP.NET MVC)等結合，當要使用最新的設計模式如 Flux, redux 等也都是沒問題的，再加上易學與一些你肯定能感受到作者從實戰淬煉出來的特性。因此在 2016 我也決定轉戰 <code>vue.js</code>。</p>
<p>隨著 Javascript 社群快速的演進，很可怕一個問題是 - 專案的環境設定，關於那些 <code>tooling</code> 這不只是 React 的問題，當你想使用 ES2015 的新語法，方便的持續整合與測試，匯入匯出模組時，我們就需要設定這些專案工具。</p>
<p>雖然 vue 本身有提供指令介面 <code>vue-cli</code> 讓我們快速建立專案，但對這些相關技術和設定有些瞭解肯定能幫助你執行更多客製的行為。</p>
<p>從頭自己一點一點設定有一些好處:</p>
<ul>
<li><p>每個專案都有不同的需求，您可以根據自身的需求來設定</p></li>
<li><p>我們也提到 Javascript(nodejs) 的世界變得很快，如果有局部的套件壞了那我們也比較清楚該怎麼處理</p></li>
<li><p>直接使用別人的 start-kit 也許會多裝了一堆你不需要的東西</p></li>
</ul>
<p>這篇文章將會透過實作介紹最基本的概念，使用 webpack 設定一個基本的 vue 專案</p>
<h3 id="articleHeader1">Part 1 基本目錄架構</h3>
<h5>1. 建立專案與 package.json</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir [project_name]
$ cd [project_name]
$ npm init -y
$ npm install vue -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="zsh"><span class="hljs-variable">$ </span>mkdir [project_name]
<span class="hljs-variable">$ </span>cd [project_name]
<span class="hljs-variable">$ </span>npm init -y
<span class="hljs-variable">$ </span>npm install vue -S</code></pre>
<p>我們先把需要的程式與目錄結構準備好，需求是使用 <code>Vue</code> + <code>ES2015</code> 來開發。第一步在根目錄建立一個 <code>index.html</code> 下面是一個簡單的 vue 範例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Vue.js v2</title>
</head>
<body>
  <div id=&quot;app&quot;>"{{" message "}}"</div>
  <script src=&quot;dist/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue.js v2<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>"{{" message "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>注意到兩件事</p>
<ol>
<li><p>我們使用 <strong>dist/build.js</strong> 這個檔案在編譯之前是不存在的</p></li>
<li><p><strong>"{{"message"}}"</strong> 這個語法是 vue.js 處理的</p></li>
</ol>
<p>建立 <code>src</code> 目錄與 <code>src/main.js</code> 檔案，這邊您可以隨您自己的偏好組織專案架構</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'

new Vue({
  el: '#app',
  data: {
      message: &quot;Hello Vue&quot;
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-keyword">import</span> Vue from 'vue'

<span class="hljs-title">new</span> <span class="hljs-type">Vue</span>({
  el: '#app',
  <span class="hljs-class"><span class="hljs-keyword">data</span>: {
      <span class="hljs-title">message</span>: "<span class="hljs-type">Hello</span> <span class="hljs-type">Vue</span>"
  }</span>
})</code></pre>
<p>在這一步我們已經完成一個簡單的 Vue 專案，但是關於建置編譯的設定我們還未完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Do not mount Vue to <html> or <body> - mount to normal elements instead.

關於 v2 之後值得注意的地方，便是我們不能直接將元件掛載到 html 或 body 上。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code><span class="hljs-keyword">Do</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">mount</span> Vue <span class="hljs-keyword">to</span> &lt;html&gt; <span class="hljs-keyword">or</span> &lt;<span class="hljs-keyword">body</span>&gt; - <span class="hljs-keyword">mount</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">normal</span> elements instead.

關於 v2 之後值得注意的地方，便是我們不能直接將元件掛載到 html 或 <span class="hljs-keyword">body</span> 上。</code></pre>
<h3 id="articleHeader2">Part 2 webapck 建置設定</h3>
<h5>1. 安裝 webpack, webpack-dev-server 與相關 loaders</h5>
<blockquote><p>為了專注在基本的說明，本次更新已將一些不屬於基本功能的模組移除。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 2016-10-04 更新
$ npm i webpack webpack-dev-server webpack-merge css-loader style-loader file-loader url-loader babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015  vue-loader vue-hot-reload-api -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-comment"># 2016-10-04 更新</span>
$ npm i webpack webpack-dev-server webpack-merge css-loader style-loader file-loader url-loader <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-plugin-transform-runtime </span><span class="hljs-keyword">babel-preset-es2015 </span> vue-loader vue-hot-reload-api -D</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
  &quot;vue&quot;: &quot;^2.0.1&quot;
},
&quot;devDependencies&quot;: {
  &quot;babel-core&quot;: &quot;^6.17.0&quot;, // babel 核心程式
  &quot;babel-loader&quot;: &quot;^6.2.5&quot;, // webpack 使用的 babel 編譯器
  &quot;babel-plugin-transform-runtime&quot;: &quot;^6.15.0&quot;, // 預設 babel 會在每一隻編譯檔案注入 polyfill 的程式碼，為了避免重複而將這部分抽出去。詳細說明：http://babeljs.io/docs/plugins/transform-runtime/
  &quot;babel-preset-es2015&quot;: &quot;^6.16.0&quot;, // 支援 ES2015 語法
  &quot;css-loader&quot;: &quot;^0.25.0&quot;, // webpack 使用於處理 css
  &quot;file-loader&quot;: &quot;^0.9.0&quot;, // webpack 使用於處理檔案
  &quot;style-loader&quot;: &quot;^0.13.1&quot;, // webpack 將 css 整合進元件中
  &quot;url-loader&quot;: &quot;^0.5.7&quot;, // 編譯匯入檔案類型的資源，把檔案轉成 base64
  &quot;vue-hot-reload-api&quot;: &quot;^2.0.6&quot;, // 支援 Hot Reload
  &quot;vue-loader&quot;: &quot;^9.5.1&quot;, // 使用 Vue Component Spec
  &quot;webpack&quot;: &quot;^1.13.2&quot;,
  &quot;webpack-dev-server&quot;: &quot;^1.16.1&quot;, // webpack 開發伺服器
  &quot;webpack-merge&quot;: &quot;^0.14.1&quot; // 合併 webpack 設定參數
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"dependencies"</span>: {
  <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.0.1"</span>
},
<span class="hljs-string">"devDependencies"</span>: {
  <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.17.0"</span>, <span class="hljs-comment">// babel 核心程式</span>
  <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^6.2.5"</span>, <span class="hljs-comment">// webpack 使用的 babel 編譯器</span>
  <span class="hljs-string">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.15.0"</span>, <span class="hljs-comment">// 預設 babel 會在每一隻編譯檔案注入 polyfill 的程式碼，為了避免重複而將這部分抽出去。詳細說明：http://babeljs.io/docs/plugins/transform-runtime/</span>
  <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.16.0"</span>, <span class="hljs-comment">// 支援 ES2015 語法</span>
  <span class="hljs-string">"css-loader"</span>: <span class="hljs-string">"^0.25.0"</span>, <span class="hljs-comment">// webpack 使用於處理 css</span>
  <span class="hljs-string">"file-loader"</span>: <span class="hljs-string">"^0.9.0"</span>, <span class="hljs-comment">// webpack 使用於處理檔案</span>
  <span class="hljs-string">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>, <span class="hljs-comment">// webpack 將 css 整合進元件中</span>
  <span class="hljs-string">"url-loader"</span>: <span class="hljs-string">"^0.5.7"</span>, <span class="hljs-comment">// 編譯匯入檔案類型的資源，把檔案轉成 base64</span>
  <span class="hljs-string">"vue-hot-reload-api"</span>: <span class="hljs-string">"^2.0.6"</span>, <span class="hljs-comment">// 支援 Hot Reload</span>
  <span class="hljs-string">"vue-loader"</span>: <span class="hljs-string">"^9.5.1"</span>, <span class="hljs-comment">// 使用 Vue Component Spec</span>
  <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^1.13.2"</span>,
  <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^1.16.1"</span>, <span class="hljs-comment">// webpack 開發伺服器</span>
  <span class="hljs-string">"webpack-merge"</span>: <span class="hljs-string">"^0.14.1"</span> <span class="hljs-comment">// 合併 webpack 設定參數</span>
}</code></pre>
<h5>2. 裝完 loaders 後，撰寫設定 <code>webpack.config.js</code>
</h5>
<p>根目錄下建立與撰寫 <code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var config = {
  entry: path.join(__dirname, 'src', 'main'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    /**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本，若要使用 standalone 功能則需下列設定
     */
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}

module.exports = config" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">entry</span>: path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'main'</span>),
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>],
    <span class="hljs-comment">/**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本，若要使用 standalone 功能則需下列設定
     */</span>
    alias: {
      <span class="hljs-attr">vue</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
    }
  }
}

<span class="hljs-built_in">module</span>.exports = config</code></pre>
<blockquote><p>Failed to mount component: template or render function not defined. (found in root instance)</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="若您看到上面錯誤訊息，這是由於 Vue 2 之後分成 standalone 完整版與 runtime-only 版。差異在於完整版包含了編譯器，支援 template 以及使用了瀏覽器的 API。

而 NPM 模組預設只會匯出 runtime-only ，若要加入 compiler 和 template 支援則需增加 webpack 的設定。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>若您看到上面錯誤訊息，這是由於 Vue <span class="hljs-number">2</span> 之後分成 standalone 完整版與 <span class="hljs-keyword">runtime</span>-<span class="hljs-keyword">only</span> 版。差異在於完整版包含了編譯器，支援 template 以及使用了瀏覽器的 API。

而 NPM 模組預設只會匯出 <span class="hljs-keyword">runtime</span>-<span class="hljs-keyword">only</span> ，若要加入 <span class="hljs-keyword">compiler</span> 和 template 支援則需增加 webpack 的設定。</code></pre>
<h5>3. 設定 babel 的部分</h5>
<p>根目錄建立 <code>.babelrc</code> 簡化 <code>webpack.config.js</code>，這是因為 <code>babel 6</code> 之後把功能拆散了，要用就要裝。同時也可以用 <code>.babelrc</code> 來設定，如果不使用這個檔案我們就需要在 <code>webapck.config.js</code> 設定。</p>
<p><code>.babelrc</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<blockquote><p>另外 <code>package.json</code> 和環境變數也能夠設定，不過為了單純起見我們選擇建立 .babelrc 。當然您也可以選擇設定在 package.json 中。</p></blockquote>
<p><code>package.json</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;YOUR PROJECT NAME&quot;,
  ...,
  &quot;babel&quot;: {
    &quot;presets&quot;: [
      &quot;es2015&quot;
    ],
    &quot;plugins&quot;: [
      &quot;transform-runtime&quot;
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"YOUR PROJECT NAME"</span>,
  ...,
  <span class="hljs-attr">"babel"</span>: {
    <span class="hljs-attr">"presets"</span>: [
      <span class="hljs-string">"es2015"</span>
    ],
    <span class="hljs-attr">"plugins"</span>: [
      <span class="hljs-string">"transform-runtime"</span>
    ]
  }
}</code></pre>
<p>上面我們已經完成基本的設定，雖然我們一口氣安裝了很多 loaders 但相關設定我們只先設定了 babel 的部份。到了這一步我們的專案架構已經可以被編譯執行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 如果在這一步您想先執行編譯看看可以安裝全域的 webpack
$ npm i webpack -g
$ webpack
$ open index.html # 編譯後檢視內容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 如果在這一步您想先執行編譯看看可以安裝全域的 webpack</span>
$ npm i webpack -g
$ webpack
$ open index.html <span class="hljs-comment"># 編譯後檢視內容</span></code></pre>
<p>編譯之後點擊 <code>index.html</code> 即可以運行。眼尖的讀者可能會好奇，那我們剛剛有裝 <code>vue-loader</code> 那是在幹嘛的？</p>
<h3 id="articleHeader3">Part 3 使用 vue-loader 與 .vue</h3>
<p><code>vue-loader</code> 的用途是提供一種更方便的組織方式讓我們把元件即一個 component 中需要的 js 行為, css 樣式, template 樣板放在一個 <code>.vue</code> 的檔案中。</p>
<h5>1. 修改 view</h5>
<p>首先讓我們先修改 <code>index.html</code> ，加入 <code>&lt;app&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Vue.js v2</title>
</head>
<body>
  <div id=&quot;app&quot;>
    <app></app>
  </div>

  <script src=&quot;dist/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue.js v2<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h5>2. 匯入元件</h5>
<p>接著我們在 <code>main.js</code> 把元件 <code>app.vue</code> 加入 components，在這邊我們是反向的推導回去，從<code>想</code>怎麼使用接著反著建立程式檔案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './app.vue'

new Vue({
  el: '#app',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">components</span>: { App }
})</code></pre>
<h5>3. 新增元件</h5>
<p>最後我們新增一個 <code>app.vue</code> 檔案</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div>
    <div class=&quot;message&quot;>
      "{{" message "}}"
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Helo, Vue.js 2.0'
    }
  }
}
</script>

<style lang=&quot;css&quot;>
.message {
  color: pink;
  font-size: 1.4em;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"message"</span>&gt;</span>
      "{{" message "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">message</span>: <span class="hljs-string">'Helo, Vue.js 2.0'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.message</span> {
  <span class="hljs-attribute">color</span>: pink;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.4em</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h5>4. 更新 webpack.config.js</h5>
<p>這個時候如果直接執行 <code>webpack</code> 編譯會產生錯誤，因為我們還沒設定 <code>webpack.config.js</code> 處理 <code>.vue</code> 檔案的部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')

var config = {
  entry: [
    'webpack/hot/dev-server',
    path.join(__dirname, 'src', 'main')
  ],
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  resolve: {
    /**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本
     */
    alias: {
      vue: 'vue/dist/vue.js'
    },
    extensions: ['.js', '.vue']
  }
}

module.exports = config" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">entry</span>: [
    <span class="hljs-string">'webpack/hot/dev-server'</span>,
    path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'main'</span>)
  ],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>,
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">/**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本
     */</span>
    alias: {
      <span class="hljs-attr">vue</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
    },
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>]
  }
}

<span class="hljs-built_in">module</span>.exports = config</code></pre>
<p>再次執行 <code>webpack</code> 編譯，我們的 <code>app.vue</code> 可以正常運作了。</p>
<h3 id="articleHeader4">Part 4 HMR / Hot Reload</h3>
<blockquote><p>如果您有發現修改之後卻沒有改變的問題，請注意關於路徑部分，取得的是編譯後的實體檔案還是 webpack-dev-server 使用記憶體中的內容</p></blockquote>
<p><code>Hot Module Replacement</code> 或稱 <code>Hot Reload</code> 是 Javascript 世界中近期很熱門的新技術，簡單的說就是當你在開發時，你一存檔，改寫的部份就即時更新元件到執行環境。大致上流程就是</p>
<ol>
<li><p>處於開發 app 階段，撰寫程式碼</p></li>
<li><p>打開瀏覽器觀察 app 行為</p></li>
<li><p>app 在瀏覽器畫面上運作</p></li>
<li><p>當你發現一些 bug 或行為不如您所預期您通常會編輯程式碼，然後重新載入</p></li>
<li><p>使用 HRM 時，當你一存檔 webpack 就會偵測那些改變的部分並更新瀏覽器</p></li>
<li><p>重點是一些關於<code>狀態</code>的資料並不會被洗掉</p></li>
</ol>
<p>要完成這功能，我們會需要 <code>webpack-dev-server</code> 以及套件 <code>vue-hot-reload-api</code>。然後執行。</p>
<p>在這之前，我們需要修改一下 webpack.config.js 加入 <code>webpack/hot/dev-server</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack')

var config = {
  entry: [
    'webpack/hot/dev-server',
    path.join(__dirname, 'src', 'main')
  ],
  ...
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">entry</span>: [
    <span class="hljs-string">'webpack/hot/dev-server'</span>,
    path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'main'</span>)
  ],
  ...
  plugins: [
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ]
}</code></pre>
<p>接著，您可以選擇在全域安裝 webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i webpack-dev-server -g
$ webpack-dev-server --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm i webpack-dev-server -g
$ webpack-dev-server --inline --hot</code></pre>
<p>又或者使用我們早先已安裝在專案中的 webpack-dev-server，一般來說會建議使用專案相依的這個。</p>
<p>需要在 package.json 加上 scripts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server"</span>
}</code></pre>
<p>然後執行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm run dev</code></pre>
<p>為了觀察出我們是否有正確的啟用 hot reload 我們修改 <code>app.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div>
    <div class=&quot;message&quot;>
      "{{" message "}}"
    </div>
    <div>
      "{{" count "}}"
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Helo, Vue.js 2.0',
      count: 0
    }
  },

  mounted () {
    this.handle = setInterval(() => {
      this.count++
    }, 1000)
  },

  destroyed () {
    clearInterval(this.handle)
  }
}
</script>

<style lang=&quot;css&quot;>
.message {
  color: pink;
  font-size: 1.4em;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"message"</span>&gt;</span>
      "{{" message "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      "{{" count "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">message</span>: <span class="hljs-string">'Helo, Vue.js 2.0'</span>,
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },

  mounted () {
    <span class="hljs-keyword">this</span>.handle = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.count++
    }, <span class="hljs-number">1000</span>)
  },

  destroyed () {
    clearInterval(<span class="hljs-keyword">this</span>.handle)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.message</span> {
  <span class="hljs-attribute">color</span>: pink;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.4em</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>打開 <code>http://localhost:8080</code> 然後異動 <code>app.vue</code> css 與 template 的部分觀察看看變化。<br>至此我們已經跑完一次基本的用法。</p>
<p>文章剩下的部份則是整理一些 webpack 的指令與設定。</p>
<h1 id="articleHeader5">webpack 編譯指令</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack [source] [destination]
$ webpack src/v1.js dist/v1.bundle.js
$ webpack bar=./src/v2.js &quot;dist/[name].bundle.js&quot;
# >> output dist/bar.bundle.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="zsh">$ webpack [source] [destination]
$ webpack src/<span class="hljs-built_in">v1</span>.js dist/<span class="hljs-built_in">v1</span>.<span class="hljs-keyword">bundle.js
</span>$ webpack <span class="hljs-keyword">bar=./src/v2.js </span><span class="hljs-string">"dist/[name].bundle.js"</span>
# &gt;&gt; output dist/<span class="hljs-keyword">bar.bundle.js</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 指定設定檔
$ webpack --config [webpack.config.js]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="zsh"><span class="hljs-comment"># 指定設定檔</span>
$ webpack <span class="hljs-comment">--config [webpack.config.js]</span></code></pre>
<blockquote>
<p>注意 require 的 path 分成 <code>函式庫</code> <code>相對路徑</code> <code>絕對路徑</code></p>
<ul>
<li><p>函式庫：什麼都不加，單純 library name</p></li>
<li><p>相對路徑：<code>./</code> 開頭</p></li>
<li><p>絕對路徑：<code>/</code> 開頭</p></li>
</ul>
</blockquote>
<h1 id="articleHeader6">資源</h1>
<ul>
<li><p><a href="https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.zap5b4dvo" rel="nofollow noreferrer" target="_blank">webpack 令人困惑的地方 - 英</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000005089993">webpack 令人困惑的地方 - 中</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">補充關於 Babel</a></p></li>
<li><p><a href="https://github.com/andyyou/vue-dinner-demo" rel="nofollow noreferrer" target="_blank">一步一步設定 webpack Demo</a></p></li>
</ul>
<h1 id="articleHeader7">快速指令流程 &amp; 程式碼片段</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init -y
$ npm i webpack -D

# Add webpack.config.js
# Add scripts to package.json
# Setup webpack-dev-server

$ npm i webpack-dev-server -D

# 由於 prod &amp; dev 會需要不同的設定因此我們需要至少兩份設定檔
# 有許多實作方式如下：
#   1. 維護多份設定檔，透過 `--config` 指定不同的檔案
#   2. 把設定組織成一份 Library
#   3. 在一份檔案中依據 `環境` 或 `指令` 套用不同設定
#      使用 webpack-merge，合併設定更方便

$ npm i webpack-merge -D
$ npm i css-loader style-loader -D
$ npm i file-loader url-loader -D

# 強大のplugin
# npm i npm-install-webpack-plugin -D

# 安裝處理 ES2015
$ npm i babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 -D

# 加入 .babelrc
# 加入 loader 設定

# (Optional)安裝 vue-loader
$ npm i vue-loader vue-hot-reload-api -D

# 安裝 vue 與所需的模組" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm init -y
$ npm i webpack -D

<span class="hljs-comment"># Add webpack.config.js</span>
<span class="hljs-comment"># Add scripts to package.json</span>
<span class="hljs-comment"># Setup webpack-dev-server</span>

$ npm i webpack-dev-server -D

<span class="hljs-comment"># 由於 prod &amp; dev 會需要不同的設定因此我們需要至少兩份設定檔</span>
<span class="hljs-comment"># 有許多實作方式如下：</span>
<span class="hljs-comment">#   1. 維護多份設定檔，透過 `--config` 指定不同的檔案</span>
<span class="hljs-comment">#   2. 把設定組織成一份 Library</span>
<span class="hljs-comment">#   3. 在一份檔案中依據 `環境` 或 `指令` 套用不同設定</span>
<span class="hljs-comment">#      使用 webpack-merge，合併設定更方便</span>

$ npm i webpack-merge -D
$ npm i css-loader style-loader -D
$ npm i file-loader url-loader -D

<span class="hljs-comment"># 強大のplugin</span>
<span class="hljs-comment"># npm i npm-install-webpack-plugin -D</span>

<span class="hljs-comment"># 安裝處理 ES2015</span>
$ npm i babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 -D

<span class="hljs-comment"># 加入 .babelrc</span>
<span class="hljs-comment"># 加入 loader 設定</span>

<span class="hljs-comment"># (Optional)安裝 vue-loader</span>
$ npm i vue-loader vue-hot-reload-api -D

<span class="hljs-comment"># 安裝 vue 與所需的模組</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code class="rc">{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var T = process.env.npm_lifecycle_event

var common = {
  entry: {
    main: path.join(__dirname, 'src', 'main'),
    venders: path.join(__dirname, 'src', 'venders')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
        /* include: path.join(__dirname, 'src') */
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.posix.join(__dirname, 'public', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json', '.css']
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
}

if (T === 'dev' || !T) {
  var config = merge(common, {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT
    },
    devtool: 'eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })

  config.entry.main = ['webpack/hot/dev-server', config.entry.main]
  module.exports = config
}

if (T === 'build') {
  module.exports = merge(common, {})
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> precss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
<span class="hljs-keyword">var</span> T = process.env.npm_lifecycle_event

<span class="hljs-keyword">var</span> common = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">main</span>: path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'main'</span>),
    <span class="hljs-attr">venders</span>: path.join(__dirname, <span class="hljs-string">'src'</span>, <span class="hljs-string">'venders'</span>)
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].bundle.js'</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'style'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'postcss'</span>]
        <span class="hljs-comment">/* include: path.join(__dirname, 'src') */</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: path.posix.join(__dirname, <span class="hljs-string">'public'</span>, <span class="hljs-string">'[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.css'</span>]
  },
  <span class="hljs-attr">postcss</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> [precss, autoprefixer];
  }
}

<span class="hljs-keyword">if</span> (T === <span class="hljs-string">'dev'</span> || !T) {
  <span class="hljs-keyword">var</span> config = merge(common, {
    <span class="hljs-attr">devServer</span>: {
      <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">progress</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">stats</span>: <span class="hljs-string">'errors-only'</span>,
      <span class="hljs-attr">host</span>: process.env.HOST || <span class="hljs-string">'0.0.0.0'</span>,
      <span class="hljs-attr">port</span>: process.env.PORT
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'eval-source-map'</span>,
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
    ]
  })

  config.entry.main = [<span class="hljs-string">'webpack/hot/dev-server'</span>, config.entry.main]
  <span class="hljs-built_in">module</span>.exports = config
}

<span class="hljs-keyword">if</span> (T === <span class="hljs-string">'build'</span>) {
  <span class="hljs-built_in">module</span>.exports = merge(common, {})
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;build&quot;: &quot;webpack&quot;,
  &quot;dev&quot;: &quot;webpack-dev-server&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>,
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server"</span>
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue + webpack 起手式

## 原文链接
[https://segmentfault.com/a/1190000005363030](https://segmentfault.com/a/1190000005363030)

