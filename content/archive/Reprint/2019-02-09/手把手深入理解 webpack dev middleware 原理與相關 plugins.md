---
title: '手把手深入理解 webpack dev middleware 原理與相關 plugins' 
date: 2019-02-09 2:30:59
hidden: true
slug: 5shjve5m9xe
categories: [reprint]
---

{{< raw >}}

                    
<p>本文將對 webpack 周邊的 middleware 與 plugin 套件等作些介紹，若您對於 webpack 還不了解可以參考這篇<a href="http://andyyou.github.io/javascript/2015/07/23/webpack.html" rel="nofollow noreferrer" target="_blank">彙整的翻譯</a>。</p>
<h3 id="articleHeader0">webpack dev server 是什麼?</h3>
<p><code>webpack dev server</code> 是一個開發伺服器，內建 webpack 使用的 live reloading 功能。</p>
<h3 id="articleHeader1">那 webpack dev middleware 是啥?</h3>
<p>它就是一個用來組織包裝 webpack 使其可以變成中介軟體，或稱中間件的容器。回想一下 express 你大概可以明白關於 middleware 的用途，就是在輸入到輸出的過程中 <code>加工</code> 的一種手段。單純說 middleware 的話我們可以想成一系列<code>任務, 動作</code>(actions stack)，不只 express 有，在 Ruby 中的 rake 也具備這種機制。</p>
<p>先看看<a href="https://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">web dev server</a>的說明</p>
<blockquote><p>The webpack-dev-server is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.</p></blockquote>
<p>從頭說起的話就是 <code>webpack</code> 本身只負責打包編譯的功能 <code>bundle</code>, <code>webpack-dev-server</code> 當然就是協助我們開發的伺服器，這個伺服器底層是靠 express 來實作的，接著思考一下我們要如何更新(live reload)呢? 當然是需要取得 webpack 編好的資料啊，於是就需要在從 <code>request</code> 到 <code>response</code> 的過程中透過 express 的 middleware 取得資料，而方法就是透過 webpack-dev-middleware 。</p>
<p>比起直接編譯成檔案，webpack-dev-middleware 這個套件還多了一些好處:</p>
<ul>
<li><p>不需要一直寫入磁碟，所有產生的結果會直接存在記憶體</p></li>
<li><p>在監視模式(watch mode)下如果檔案發生異動，middleware 會馬上停止提供舊版的 bundle 並且會延遲請求的回應直到編譯完成，如此一來我們就不需要去<code>觀察編譯是否結束了</code></p></li>
</ul>
<h3 id="articleHeader2">webpack hot middleware 是什麼?</h3>
<p>我們都知道 webpack dev server 有提供一種<code>Hot Module Replacement/Hot Reloading</code> 熱替換的功能。在一般 <code>webpack-dev-server</code> 的時候我們會在 <code>webpack.config.js</code> 加入 <code>new webpack.HotModuleReplacementPlugin()</code> 或設定來啟用。</p>
<p>而 <strong>webpack hot middleware</strong> 是給 <code>webpack-dev-middleware</code> 用的。就是讓我們在一般的 server 上加上熱替換的功能，總結來說就是 <code>webpack-dev-middleware</code> + <code>webpack-hot-middleware</code> 即可讓我們用 express 客製一個有熱替換功能的 webpack 開發伺服器。</p>
<h3 id="articleHeader3">使用 webpack-dev-server 當中介軟體</h3>
<p>webpack 提供了 express 的 middleware 讓我們可以處理一些靜態資源檔而不是使用 <code>express.static</code>。要達成這項功能，我們需要安裝 <code>webpack-dev-middleware</code> 和 <code>webpack-hot-middleware</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i webpack express webpack-dev-middleware webpack-hot-middleware -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="zsh" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-selector-tag">i</span> webpack express webpack-dev-middleware webpack-hot-middleware -D</code></pre>
<p>安裝完成套件之後，首先我們需要設定一個 <code>webpack.dev.config.js</code> 檔案，並且在 <code>entry</code> 中加上 <code>webpack/hot/dev-server</code> 和 <code>webpack-hot-middleware/client</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client',
  'client/index.js'
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>entry: [
  <span class="hljs-symbol">'webpack</span>/hot/dev-server',
  <span class="hljs-symbol">'webpack</span>-hot-middleware/client',
  <span class="hljs-symbol">'client</span>/index.js'
]</code></pre>
<p>這個 <code>webpack.config</code> 主要是給開發伺服器用的，由於這時的匯出都會存在記憶體中，因此 <code>path</code> 可以直接設為根</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  path: '/',
  publicPath: 'http://localhost:8080/scripts/',
  filename: 'bundle.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">output</span>: {
  <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
  publicPath: <span class="hljs-string">'http://localhost:8080/scripts/'</span>,
  filename: <span class="hljs-string">'bundle.js'</span>
}</code></pre>
<p>最後補上任何您所需要的 loaders，最重要的是記得。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new webpack.HotModuleReplacementPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
]</code></pre>
<p>接著下來我們開始來撰寫這個開發環境的設定檔和 express 程式。</p>
<p>我們會匯入 webpack，webpack-dev-middleware， webpack-hot-middleware 和 express。</p>
<blockquote><p>若需要搭配樣板引擎請自行安裝 ejs 或 jade</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express')
var webpack = require('webpack')
var WebpackDevMiddleware = require('webpack-dev-middleware')
var WebpackHotMiddleware = require('webpack-hot-middleware')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> WebpackDevMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)
<span class="hljs-keyword">var</span> WebpackHotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)</code></pre>
<p>載入套件之後，使用 express 建立一個 http 應用程式與路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app = express()
router = express.Router()

router.get('/', MainController)
app.use(router)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app = express()
router = express.Router()

router.get(<span class="hljs-string">'/'</span>, MainController)
app.use(router)</code></pre>
<p>上面只是一個一般的 Server 應用，為了達成 webpack 的神奇黑魔法我們需要匯入 webpack 的設定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require('./webpack.dev.config')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.dev.config'</span>)</code></pre>
<p>webpack 的角色就是我們的編譯器，透過下面的程式碼建立編譯器的 instance</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compiler = webpack(config)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">var compiler = webpack(<span class="hljs-name">config</span>)</code></pre>
<p>重點來了，我們有了伺服器 express，有了編譯核心 webpack，接著我們需要 wrapper 來打包 webpack 將其合進 express 的 middleware stack 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(WebpackDevMiddleware(compiler, {
  <span class="hljs-attr">publicPath</span>: config.output.publicPath,
  <span class="hljs-attr">stats</span>: { <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span> }
}))</code></pre>
<p><code>publicPath</code> 就是我們想要存取前端 bundle 的網址，路徑，位置。然後我們要再加上 webpack-hot-middleware 使其具備熱替換的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(WebpackHotMiddleware(compiler, {
  log: console.log
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(WebpackHotMiddleware(compiler, {
  <span class="hljs-attr">log</span>: <span class="hljs-built_in">console</span>.log
}))</code></pre>
<p>最後則是 express 的監聽事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.listen(8080, function () {
  console.log('Listening on 8080')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening on 8080'</span>)
})</code></pre>
<p>完整的 server 程式碼如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express')
var webpack = require('webpack')
var WebpackDevMiddleware = require('webpack-dev-middleware')
var WebpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./config/webpack.dev.config')
var compiler = webpack(config)

app = express()
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))
app.use(WebpackHotMiddleware(compiler))

var router = express.Router()
router.get('/', function (req, res, next) {
  res.render('index', { message: 'Hey there!'});
})
app.use(router)

app.listen(8080, function () {
  console.log('Listening on 8080')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> WebpackDevMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)
<span class="hljs-keyword">var</span> WebpackHotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config/webpack.dev.config'</span>)
<span class="hljs-keyword">var</span> compiler = webpack(config)

app = express()
app.set(<span class="hljs-string">'views'</span>, <span class="hljs-string">'./views'</span>)
app.set(<span class="hljs-string">'view engine'</span>, <span class="hljs-string">'ejs'</span>)
app.use(express.static(<span class="hljs-string">'public'</span>));

app.use(WebpackDevMiddleware(compiler, {
  <span class="hljs-attr">publicPath</span>: config.output.publicPath,
  <span class="hljs-attr">stats</span>: { <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span> }
}))
app.use(WebpackHotMiddleware(compiler))

<span class="hljs-keyword">var</span> router = express.Router()
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  res.render(<span class="hljs-string">'index'</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">'Hey there!'</span>});
})
app.use(router)

app.listen(<span class="hljs-number">8080</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening on 8080'</span>)
})</code></pre>
<h3 id="articleHeader4">換個思路</h3>
<p>假設我們並不是要實作一個全站 SPA 的站，實務上我們的確會遇到需要拆分為許多 view <code>.html</code> 的狀況，這種情況下我們會希望自己客製的這個 server 就像 <code>webpack-dev-server</code> 一樣，當然，這邊只是要指出做法，如果一樣您當然就直接用 webpack-dev-server 就好了。</p>
<p>根據上面這個需求最簡單的方式就是透過 <code>express.static(__dirname)</code> 讓 express 直接 return raw 檔案。</p>
<h3 id="articleHeader5">html-webpack-plugin</h3>
<p>小弟認為在學習的過程中，最重要的就是搞懂動機，而這個 <code>html-webpack-plugin</code> 插件，其用途就是簡化建立 html 的過程。</p>
<p>先回頭看看上一小節，很直覺的，我們會依據需求建立<code>不同的頁面(.html)</code>，因為在開發過程中很多時候前端只需要注重那些<code>互動介面的邏輯</code>，<code>樣式</code>，<code>樣板</code>，<code>標籤結構</code> ，那我們的重點只有 client 端的 html, js, css 就不在話下了吧！再如果我們又以<code>元件</code>為思路中心來設計實踐的話，那麼 html 裡面大部分的東西都會往元件的 template 搬。依據 SPA 的思路，html 的責任就只是把我們的 bundle 載入並掛載 <code>root component</code>。</p>
<p>如果照著這樣的想法，不斷的新增 html 結果大部分的內容都是重複的那就不太靠譜啦。我們就需要一種簡化工作的方式。</p>
<p>這個套件如上面所說就是簡化<code>建立載入 bundle 的 html</code>的步驟，用在 webpack 打包的檔案包含每次編譯都會更新的 hash 時特方便。</p>
<p>我們可以讓套件幫我們產生 html 或者搭配 loaders 與其他樣版引擎。</p>
<h3 id="articleHeader6">基本的用法</h3>
<p>第一種最簡單的用途就是為我們的 bundle 包上一層 html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new HtmlWebpackPlugin({
    filename: 'i_love_this_file.html'
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">'i_love_this_file.html'</span>
  })
]</code></pre>
<p>如果我們有多個 <code>entry</code> 進入點，那麼所有的 bundle 都會被加進這個自動產生的 HTML 中。<br>如果我們透過 webpack 匯出了 css 資源檔(例如 extract-text-plugin) 那麼這些檔案也會透過 <code>&lt;link&gt;</code> 被加入 HTML 中。</p>
<h3 id="articleHeader7">html-webpack-plugin 的設定</h3>
<p>當然這個套件也有一些參數，讓我們可以透過設定提供其他的功能。</p>
<ul>
<li><p><code>title</code>: 設定該 html  的 <code>&lt;title&gt;</code> 標籤</p></li>
<li><p><code>filename</code>: html 檔名，也當作路徑存取。預設是 <code>index.html</code></p></li>
<li><p><code>template</code>: 樣板的路徑，也就是說我們可以先組織 HTML 在載入讓 <code>html-webpack-plugin</code> 幫我們注入(inject) bundle。此部分要注意相對路徑是從 server 程式檔案出發。</p></li>
<li>
<p><code>inject</code>: 將所有的資源檔注入 <code>template</code> 或 <code>templateContent</code>，當值是 <code>true</code>, <code>'body'</code> 的時候所有的 js 資源檔都會被注入 <code>&lt;/body&gt;</code> 之前，<code>'head'</code> 則是 <code>&lt;head&gt;</code> 之間，<code>false</code> 自然就是關閉</p>
<ul>
<li><p>true: Boolean</p></li>
<li><p>false: Boolean</p></li>
<li><p>head: String</p></li>
<li><p>body: String</p></li>
</ul>
</li>
<li><p><code>favicon</code>: 替 HTML 加上 favicon 路徑</p></li>
<li>
<p><code>minify</code>: 傳入 <a href="https://github.com/kangax/html-minifier#options-quick-reference" rel="nofollow noreferrer" target="_blank">html-minifier</a> 參數物件，壓縮輸出。</p>
<ul>
<li><p>options: Object</p></li>
<li><p>false: Boolean</p></li>
</ul>
</li>
<li>
<p><code>hash</code>: <code>true</code> 時替 webpack 編譯的檔案或結果路徑結尾補上 hash，這麼做的用意是在開發時期當檔案有異動時可以避免瀏覽器快取</p>
<ul>
<li><p>true: Boolean</p></li>
<li><p>false: Boolean</p></li>
</ul>
</li>
<li>
<p><code>cache</code>: 預設是 <code>true</code> 快取檔案，除非檔案有異動</p>
<ul>
<li><p>true: Boolean</p></li>
<li><p>false: Boolean</p></li>
</ul>
</li>
<li>
<p><code>showErrors</code>: 預設 <code>true</code> 例外或錯誤資訊會寫入 html 頁面</p>
<ul>
<li><p>true: Boolean</p></li>
<li><p>false: Boolean</p></li>
</ul>
</li>
<li><p><code>chunks</code>: 允許我們加入一些程式碼片段，例如單元測試</p></li>
<li>
<p><code>chunksSortMode</code>: 控制 chunks 排序</p>
<ul>
<li><p>none: String</p></li>
<li><p>auto: String</p></li>
<li><p>dependency: String</p></li>
<li><p>{}: Function</p></li>
</ul>
</li>
<li><p><code>excludeChunks</code>: 略過部分 chunk 程式碼片段</p></li>
<li>
<p><code>xhtml</code>: 設定為 <code>true</code> 的話 <code>link</code> 標籤會是 self-closing ，預設是 <code>false</code></p>
<ul>
<li><p>true: Boolean</p></li>
<li><p>false: Boolean</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader8">腦力激盪 - 如果要多個頁面搭配各自的 bundle?</h3>
<p>webapck 難就難在其靈活之中伴隨著複雜，不同的思路有著不同的做法。這一小節目的是為了不讓我們對 webpack 使用上僵化而提出的一個小題目。</p>
<p>要達成這個需求，我們可以先使用 webpack.config 中 <code>[name]</code> 的功能拆分我們的 bundle</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  entry: {
    a: './path/src/a',
    b: './path/src/b',
    c: './path/src/c'
  },
  output: {
    filename: '[name].bundle.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">entry</span>: {
    a: <span class="hljs-string">'./path/src/a'</span>,
    b: <span class="hljs-string">'./path/src/b'</span>,
    c: <span class="hljs-string">'./path/src/c'</span>
  },
  <span class="hljs-selector-tag">output</span>: {
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].bundle.js'</span>
  }
}</code></pre>
<p>接著透過 <code>html-webpack-plugin</code> 的參數，把 <code>inject: false</code> 然後 <code>template</code> 在各自的 template 中使用 bundle。</p>
<h3 id="articleHeader9">
<a href="https://github.com/jaketrent/html-webpack-template" rel="nofollow noreferrer" target="_blank">html-webpack-template</a> - 更牛的方式</h3>
<p>照著上面的方式你可能又跟我抱怨，那不是又要產一堆 HTML 了嗎? 對啊！原本這個架構就是針對 SPA 設計的嘛。不過透過這樣來來回回的思考動機與流程我相信對於您日後使用 webpack 與閱讀設定有很大的幫助。現在的問題是 - 你覺得產一大堆 HTML 不是很靠譜，於是我們就有了 <code>html-webpack-template</code> 的產生啦。</p>
<p>這個東西大略的用法就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new HtmlWebpackPlugin({
    title: 'Sample',
    filename: 'sample.html'
  }),
  new HtmlWebpackPlugin({
    inject: false, // 必須
    template: require('html-webpack-template'), // 必須
    filename: 'sp.html', // 存取的路徑

    // 只需要特定 bundle 可以這樣設定
    chunks: ['vender'],
    title: 'OH My Gosh',
    // 可以參考 html-webpack-template 的參數設定
    // 下面為提供 GA
    googleAnalytics: {
      trackingId: 'UA-XXXX-XX',
      pageViewOnLoad: true
    }
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">title</span>: <span class="hljs-string">'Sample'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'sample.html'</span>
  }),
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 必須</span>
    template: <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-template'</span>), <span class="hljs-comment">// 必須</span>
    filename: <span class="hljs-string">'sp.html'</span>, <span class="hljs-comment">// 存取的路徑</span>

    <span class="hljs-comment">// 只需要特定 bundle 可以這樣設定</span>
    chunks: [<span class="hljs-string">'vender'</span>],
    <span class="hljs-attr">title</span>: <span class="hljs-string">'OH My Gosh'</span>,
    <span class="hljs-comment">// 可以參考 html-webpack-template 的參數設定</span>
    <span class="hljs-comment">// 下面為提供 GA</span>
    googleAnalytics: {
      <span class="hljs-attr">trackingId</span>: <span class="hljs-string">'UA-XXXX-XX'</span>,
      <span class="hljs-attr">pageViewOnLoad</span>: <span class="hljs-literal">true</span>
    }
  })
]</code></pre>
<h3 id="articleHeader10">html-webpack-plugin 事件</h3>
<p>特地介紹此套件的事件也是因為挺有可能會需要一些時間點對 html 動些手腳，有了事件的機制我們就可以讓<code>其他套件</code>修改產生的 html</p>
<p>非同步事件:</p>
<ul>
<li><p><code>html-webpack-plugin-before-html-generation</code></p></li>
<li><p><code>html-webpack-plugin-before-html-processing</code></p></li>
<li><p><code>html-webpack-plugin-after-html-processing</code></p></li>
<li><p><code>html-webpack-plugin-after-emit</code></p></li>
</ul>
<p>同步事件:</p>
<ul><li><p><code>html-webpack-plugin-alter-chunks</code></p></li></ul>
<p>大略的用法就是在透過 hook event 綁定的事件做些處理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin('compilation', function(compilation) {
  console.log('The compiler is starting a new compilation...');

  compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
    htmlPluginData.html += 'The magic footer';
    callback(null, htmlPluginData);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The compiler is starting a new compilation...'</span>);

  compilation.plugin(<span class="hljs-string">'html-webpack-plugin-before-html-processing'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">htmlPluginData, callback</span>) </span>{
    htmlPluginData.html += <span class="hljs-string">'The magic footer'</span>;
    callback(<span class="hljs-literal">null</span>, htmlPluginData);
  });
});</code></pre>
<h3 id="articleHeader11">webpack-hot-middleware</h3>
<p><code>webpack-hot-middleware</code> 這個套件只能搭配 <code>webpack-dev-middleware</code> 使用，其實就是把熱替換的功能加到一般 server 應用。</p>
<p>這個模組只專注在處理 webpack 和瀏覽器溝通的機制。這個中介軟體會去訂閱監聽開發伺服器，當更新或異動發生的時候它就透過 webpack 的 HMR API 來更新。實際上讓您的程式能無縫的使用熱替換已超過本文範圍，在這部分通常會靠其他模組來處理。</p>
<p>安裝完套件與在伺服器 app 中套用之外，要記得 webpack.config 的 plugin 也要加上 <code>HotModuleReplacementPlugin</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  // Webpack 1.0
  new webpack.optimize.OccurenceOrderPlugin(),
  // Webpack 2.0 fixed this mispelling
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-comment">// Webpack 1.0</span>
  <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
  <span class="hljs-comment">// Webpack 2.0 fixed this mispelling</span>
  <span class="hljs-comment">// new webpack.optimize.OccurrenceOrderPlugin(),</span>
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
  <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin()
]</code></pre>
<p>簡短地介紹一下 <code>OccurrenceOrderPlugin</code> 部份，您應該知道 webapck 會給編譯好的程式碼片段一個 id 以用來辨別。</p>
<p>透過上面的這個 plugin 可以讓 webpack 在 id 的分派上優化並保持一致性。</p>
<p>接著要在 entry point 加上 <code>webpack-hot-middleware/client</code> 這隻檔案會連到 server 目的是當 server 重新編譯好檔案時收到通知然後更新 client 的檔案。</p>
<h3 id="articleHeader12">如何撰寫 plugin</h3>
<p>為什麼要了解怎麼寫 plugin 呢? 因為某些 plugin 可以擴展支援其他 plugin 相互傳遞資料或需要客製後續任務，所以稍微明白 plugin 的寫法可以讓我們對於 plugin 的設定更加清楚。</p>
<p>plugin 的架構設計促使第三方開發者讓 webpack 核心發揮出無限的潛力。在不同建置階段執行 callback ，開發者可以自訂出特有的行為。</p>
<p>當然建置 plugin 比起開發 loader 是較進階的議題，因為我們必須要理解 webpack 內部的一些 hook 事件。</p>
<h5>編譯器與編譯結果</h5>
<p>要開發 plugin 第一步就是先了解其中最重要的兩個角色 <code>compiler</code> 和 <code>compilation</code> 物件</p>
<ul>
<li><p><code>compiler</code> 編譯器物件代表一個完整設定的 webpack 環境。這個物件在 webpack 發動之後就會被建置，而且只會建置一次。然後它會配置所有可以操作的設定包含 <code>loaders</code>, <code>plugins</code>。當我們套用一個 plugin 這個 plugin 會收到 <code>compiler</code> 的參考透過存取這個<code>參考 reference</code>就可以取得 webpack 環境</p></li>
<li><p><code>compilation</code> 編譯成果這個物件代表的是<code>某個版本的編譯後的資源檔</code>，在運行 webpack dev middleware 期間每當檔案發生異動就會產生一個新的 <code>compilation</code> 也就是產生新的編譯結果。這個<code>編譯結果</code>包含的訊息包含 module 模組的狀態，編譯後的資源檔，發生異動的檔案，被觀察的相依套件等。這個編譯結果物件也提供一些執行 callback 的機會讓我們可以在過程中客製一些自己想要的行為。</p></li>
</ul>
<p>任何 webpack plugin 都必須依靠這兩者來完成，所以有需要對其原始碼有些大概的了解</p>
<ul>
<li><p><a href="https://github.com/webpack/webpack/blob/master/lib/Compiler.js" rel="nofollow noreferrer" target="_blank">Compiler Source</a></p></li>
<li><p><a href="https://github.com/webpack/webpack/blob/master/lib/Compilation.js" rel="nofollow noreferrer" target="_blank">Compilation Source</a></p></li>
</ul>
<h3 id="articleHeader13">基本 plugin 架構</h3>
<p>本質上來說 plugin 只是一個物件實例具有 apply 方法，這個 <code>apply</code> 會在安裝時期被 <code>webpack compiler</code> 執行一次。</p>
<p>透過這一次的執行呢我們就可以繫結許多事件，直接來看看程式碼您就明白了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyPlugin(options) {
  // 設定參數
  this.options = options
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    // 當 plugin 安裝完成就會...
    console.log('Hello World!');
  })

  // 我們自然需要拿到編譯的結果
  compiler.plugin(&quot;compilation&quot;, function(compilation) {
    console.log(compilation.assets)

    compilation.plugin(&quot;optimize&quot;, function() {
      console.log(&quot;Assets are being optimized.&quot;);
    });
 });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyPlugin</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-comment">// 設定參數</span>
  <span class="hljs-keyword">this</span>.options = options
}

MyPlugin.prototype.apply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compiler</span>) </span>{
  compiler.plugin(<span class="hljs-string">'done'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 當 plugin 安裝完成就會...</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello World!'</span>);
  })

  <span class="hljs-comment">// 我們自然需要拿到編譯的結果</span>
  compiler.plugin(<span class="hljs-string">"compilation"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">compilation</span>) </span>{
    <span class="hljs-built_in">console</span>.log(compilation.assets)

    compilation.plugin(<span class="hljs-string">"optimize"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Assets are being optimized."</span>);
    });
 });
}</code></pre>
<p>OK! 我們現在並不是要開發套件所以點到這邊我想就足夠了，剩下的您可以自行參考相關文件。</p>
<ul><li><p><a href="https://github.com/webpack/docs/wiki/plugins" rel="nofollow noreferrer" target="_blank">詳細 plugin API</a></p></li></ul>
<h3 id="articleHeader14">extract-text-webpack-plugin</h3>
<p>顧名思義這個 plugin 的用途就是把 text 類型的結果匯出成一個檔案，先說這不是非常精確的描述，但概念來說 text 類型指的就是<code>不會</code>輸出成 <code>module.exports</code> 或 <code>json</code> 的資料。而像是 CSS 這類的資源檔 webpack 其實最終就是在 JS 中幫我們建個 style tag 的  dom 然後整包放進去。<code>file-loader</code>, <code>raw-loader</code> 等等這類內容大略就屬於 text 類型。<a href="https://webpack.github.io/docs/loader-conventions.html" rel="nofollow noreferrer" target="_blank">查閱各種 loaders 回傳資料類型</a></p>
<p>於是乎以 entry point 為單位過程中解析的 text 內容就會被抽出來匯出成一個檔案。最常見的用法就是把 css 抽出來:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;)

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract(&quot;style&quot;, &quot;css&quot;) }
    ]
  },
  plugins: [
    // 注意: 這邊的副檔名如果亂下是會造成瀏覽器行為不符合預期的，例如不給副檔名那瀏覽器就會當作 binary 下載
    new ExtractTextPlugin(&quot;styles.css&quot;)
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">"style"</span>, <span class="hljs-string">"css"</span>) }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// 注意: 這邊的副檔名如果亂下是會造成瀏覽器行為不符合預期的，例如不給副檔名那瀏覽器就會當作 binary 下載</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"styles.css"</span>)
  ]
}</code></pre>
<p>如果想要拆分多個檔案，那麼就先初始化 instance</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ExtractTextPlugin = require('extract-text-webpack-plugin');

// multiple extract instances
let cssExtractor = new ExtractTextPlugin('stylesheets/[name].css');
let lessExtractor = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
  module: {
    loaders: [
      {test: /\.scss$/i, loader: cssExtractor.extract(['css','sass'])},
      {test: /\.less$/i, loader: lessExtractor.extract(['css','less'])},
      ...
    ]
  },
  plugins: [
    cssExtractor,
    lessExtractor
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-comment">// multiple extract instances</span>
<span class="hljs-keyword">let</span> cssExtractor = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'stylesheets/[name].css'</span>);
<span class="hljs-keyword">let</span> lessExtractor = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'stylesheets/[name].less'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/i</span>, <span class="hljs-attr">loader</span>: cssExtractor.extract([<span class="hljs-string">'css'</span>,<span class="hljs-string">'sass'</span>])},
      {<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/i</span>, <span class="hljs-attr">loader</span>: lessExtractor.extract([<span class="hljs-string">'css'</span>,<span class="hljs-string">'less'</span>])},
      ...
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    cssExtractor,
    lessExtractor
  ]
}</code></pre>
<h3 id="articleHeader15">HMR 熱替換</h3>
<p>Hot Module Replacement (HRM) 又稱熱替換，功能就是在程式運行中交換，移除，增加模組且不會使頁面重新載入。這跟我們伺服器的熱插拔差不多概念。</p>
<h5>它是怎麼運作的?</h5>
<p>webpack 在 bundle 中即我們的 js 裡加入了一個小型的 HMR 執行環境，在編譯過程中這個 runtime 會在我們的 app 中運行。</p>
<p>當建置完成時 webpack 也不會消失反而會持續存在，繼續監控原始碼檔案是否發生修改。一旦 webpack 發現程式有改變他就會去重新編譯那些有修改的模組，不全部重建。根據設定要嘛就是 webpack 把訊號丟給 HRM runtime 要嘛就是 HRM 自己更新異動資訊。不管哪種方式反正重點就是 HRM runtime 會取得修改的模組，接著就試著在運行的狀態下更新模組。首先會先檢查更新的模組是否能 <code>self-accept</code>。</p>
<p>關於 <code>self-accept</code> 先看看<a href="https://github.com/webpack/hot-node-example/blob/master/index.js" rel="nofollow noreferrer" target="_blank">範例</a>和<a href="https://github.com/webpack/webpack/tree/master/test/hotCases/runtime" rel="nofollow noreferrer" target="_blank">原始碼</a>，意思是要<code>支援熱替換的模組或說編譯結果</code>基本上是應該要實作 <code>module.hot.accept</code> 和遵循其他熱替換的規則。</p>
<p>如果沒有辦法自己確認自己可以直接被更新，那就往上傳，通知那些 require 匯入使用自己的模組更新，就這樣層層往上。直到有人可以 accept 或到頂，不過一旦到根就表示熱替換失敗。</p>
<p>讀到這邊你可能通了，為什麼當我們要讓 React 支援 Hot Mode 的時候需要一個 <code>react-hot-loader</code>。以及因為要和 HRM 執行環境溝通的關係我們需要在 bundle 的 entry point 加上 <code>webpack/hot/dev-server</code>, <code>webpack-hot-middleware/client</code> 之類的東西。</p>
<h5>從 App 的角度</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006763873" src="https://static.alili.tech/img/remote/1460000006763873" alt="" title="" style="cursor: pointer;"></span></p>
<p>當 App 程式開始執行(就是載入 bundle) HMR runtime 執行環境就會啟用，接下來程式就會要求 HMR runtime 幫我們檢查是否需要更新。HMR 會幫我們下載更新然後通知 App 程式有哪些更新可用。</p>
<h5>從編譯器(webpack/compiler)的角度</h5>
<p>除了一般的資源檔像是圖片，css，編譯器還需要觸發<code>更新事件</code>讓程式碼可以完成新舊替換。這個"更新"包含兩個部分</p>
<ol>
<li><p>更新的 Manifest 支援配置文件(json)</p></li>
<li><p>一或多個更新的<code>chunks</code>程式片段(js)</p></li>
</ol>
<p>支援配置文件包含更新後編譯結果的 hash 和新的 chunks 程式碼片段的列表。而新的 chunks 則包含更新後模組的程式碼或 <code>flag</code>。</p>
<p>編譯器同時也會確保模組和片段 ID 是一致的，透過一個 <code>records</code> 的 json 檔案來儲存相關資訊。</p>
<h5>從模組角度</h5>
<p>HMR 是選擇性的功能，所以只有在模組包含 HRM 程式碼才會被影響作用。也就是在模組中使用文件有提供的 API。一般來說模組的開發者 handler 會在模組相依的部分更新時被執行。當然也可以寫一個 handler 在這個模組更新時被呼叫。</p>
<p>在大部分的情況並不需要為每一個模組都撰寫<code>支援 HMR 的程式碼</code>，當一個模組沒有遵循處理規則時就會往上層傳遞事件，意味著只有上方有一個 handler 可以處理就好，但不要讓這個冒泡事件一路冒到頂喔。</p>
<h5>從 HMR runtime 角度</h5>
<p>模組系統的執行環境其實是額外加入的程式，用來追蹤模組之間的父子關係。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(module.hot) {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(<span class="hljs-built_in">module</span>.hot) {
    ...
}</code></pre>
<p>從管理的角度，這個執行環境 runtime 支援 <code>check</code> 和 <code>apply</code> 兩個方法。</p>
<p><code>check</code> 的功能是發出 HTTP request 用來取得上面提到的 Manifest，當 request 失敗時就等於沒有任何更新。否則就會依照得到的<code>更新列表</code>去比對 chunks。</p>
<p>對每個已載入的 chunk 都會有對應更新的程式碼要被下載。所有模組更新會被存在 runtime 中準備拿來更新。當執行環境切換成 <code>ready</code> 狀態就表示更新的程式碼都被下載完成了隨時可以套用。</p>
<p>接著 <code>apply</code> 方法會將所有已更新的模組的 <code>flag</code> 標記為 <code>invalid</code> 無效，然後無效的模組需要 update 的 handler 處理函式，這個 handler 會在模組中或者父節點上。只要沒有這個 handler 就會持續往上曾傳遞並標註為 <code>invalid</code>，一旦冒泡機制冒到頂端即 <code>entry point</code> 就表示熱替換失敗。</p>
<p>所有被標記為無效的模組都會透過 <code>module.hot.dispose</code> 卸載，然後更新 hash，再來所有 <code>module.hot.accept</code> 的 handlers 會被調用。</p>
<p>執行環境切回 <code>idle</code> 狀態表示所有更新都完成了。</p>
<p>講這麼多其實簡單來說就是我們的模組要補一些 hot mode 的邏輯</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = require(&quot;./app&quot;);

// 模擬每 5 秒更新一次
setInterval(function() {
    console.log(app(new Date()));
}, 5000);

if(module.hot) {
    module.hot.accept(&quot;./app&quot;, function() {
        app = require(&quot;./app&quot;);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./app"</span>);

<span class="hljs-comment">// 模擬每 5 秒更新一次</span>
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(app(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()));
}, <span class="hljs-number">5000</span>);

<span class="hljs-keyword">if</span>(<span class="hljs-built_in">module</span>.hot) {
    <span class="hljs-built_in">module</span>.hot.accept(<span class="hljs-string">"./app"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        app = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./app"</span>);
    });
}</code></pre>
<h5>檔案的更新流程</h5>
<p>左邊表示初始化時編譯器產生的結構，右邊則是當模組 4 和 9 更新時的流程。<br>方塊表示從 Entry 開始，webpack 幫我們編譯產生的部份從 Entry 然後轉換成 Chunk 0 - 4</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004840685" src="https://static.alili.tech/img/remote/1460000004840685" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader16">資源參考</h3>
<ul>
<li><p><a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a></p></li>
<li><p><a href="http://madole.github.io/blog/2015/08/26/setting-up-webpack-dev-middleware-in-your-express-application/" rel="nofollow noreferrer" target="_blank">webpack dev middleware 說明</a></p></li>
</ul>
<h3 id="articleHeader17">備註</h3>
<p>部分內容可能理解不夠精確若有錯誤歡迎指教留言</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手深入理解 webpack dev middleware 原理與相關 plugins

## 原文链接
[https://segmentfault.com/a/1190000005614604](https://segmentfault.com/a/1190000005614604)

