---
title: '单文件组件下的vue，可以擦出怎样的火花' 
date: 2019-02-10 2:30:42
hidden: true
slug: io3rx9x63v
categories: [reprint]
---

{{< raw >}}

                    
<p>2016注定不是个平凡年，无论是中秋节问世的<a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">angular2</a>，还是全面走向稳定的<a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>，都免不了面对另一个竞争对手<a href="http://vuejs.org/" rel="nofollow noreferrer" target="_blank">vue2</a>。喜欢<code>vue</code>在设计思路上的“先进性”(原谅我用了这么一个词)，敬佩作者<a href="http://weibo.com/arttechdesign" rel="nofollow noreferrer" target="_blank">尤小右</a>本人的“国际范儿”，使得各框架之间的竞争略显妖娆(虽然从已存在问题的解决方案上看，各框架都有部分相似之处)。</p>
<blockquote>因为<code>vue2</code>已经正式release，本教程做了一些修改(针对<code>vue2</code>)</blockquote>
<p>所谓设计上的先进性，以下几点是我比较喜欢的:</p>
<h3 id="articleHeader0">数据驱动的响应式编程体验</h3>
<p>不同于<code>AngularJS</code>里基于<code>digest cycle</code>的脏检查机制，执行效率更高。内部基于<code>Object.defineProperty</code>特性做漂亮的hack实现(而且不支持IE8，大快人心)。更多细节，<a href="http://vuejs.org/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">看这里</a></p>
<p>因为这个机制的出现，我们再也也不需要顾虑双向绑定的效率问题；亦或是像<code>React</code>那样搞什么<a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutability</a>(对这块感兴趣可以看<a href="https://segmentfault.com/a/1190000004906518">(译)JavaScript中的不可变性</a>)，因为<code>Object.definePropery</code>洞悉你的一切，妈妈再也不用担心你忘记实现<code>shouldComponentUpdate</code>了.</p>
<p>到这里你可能还不能体会<code>vue</code>的精妙，是时候来个栗子了！</p>
<p>假设我们有一个字段<code>fullName</code>，它依赖其他字段的变化，在<code>AngularJS</code>里，我们或许会用命令式这样写道：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$scope.user = {
  firstName: '',
  lastName: ''
}
      
$scope.fullName = ''

//告诉程序主动“监视”user的变化，然后修改fullName的值
$scope.$watch('user', function(user) {
  $scope.fullName = user.firstName + ' ' + user.lastName
}, true)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$scope.user = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">lastName</span>: <span class="hljs-string">''</span>
}
      
$scope.fullName = <span class="hljs-string">''</span>

<span class="hljs-comment">//告诉程序主动“监视”user的变化，然后修改fullName的值</span>
$scope.$watch(<span class="hljs-string">'user'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">user</span>) </span>{
  $scope.fullName = user.firstName + <span class="hljs-string">' '</span> + user.lastName
}, <span class="hljs-literal">true</span>)</code></pre>
<p>若是<code>vue</code>，改用声明式，写法如何？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    firstName: '',
    lastName: ''
  }
},
computed: {
  fullName() {
    // 生命一个fullName的计算属性，并告诉程序它是由firstName和lastName组成。
    // 至于具体是什么时候/如何完成数据拼装的，你就不用管了
    return this.firstName + ' ' + this.lastName
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data() {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">''</span>
  }
},
<span class="hljs-attr">computed</span>: {
  fullName() {
    <span class="hljs-comment">// 生命一个fullName的计算属性，并告诉程序它是由firstName和lastName组成。</span>
    <span class="hljs-comment">// 至于具体是什么时候/如何完成数据拼装的，你就不用管了</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
  }
}</code></pre>
<p>相对于<code>AngularJS</code>里命令式的告诉框架，<code>fullName</code>一定要监视<code>user</code>对象的变化(注意里面还是deepWatch，效率更差)，并且随之改变；<code>vue</code>以数据驱动为本质，声明式的定义<code>fullName</code>就是由<code>firstName</code>和<code>lastName</code>组成，无论怎么变化，都是如此。这种写法，更优雅有没有？</p>
<blockquote>如果有兴趣看看用<code>angular2</code>如何实现相同的小游戏，<a href="https://github.com/leftstick/angular2-memory-game" rel="nofollow noreferrer" target="_blank">走这里</a>
</blockquote>
<h3 id="articleHeader1">单文件组件模式</h3>
<p>还在为一堆代码文件，到底哪个是<code>JavaScript</code>逻辑部分、哪个是<code>css/less/sass</code>样式部分、哪个是<code>html/template</code>模板部分；他们又该如何组织，怎么“编译”、如何发布？</p>
<p>有了单文件组件范式，配合<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack4</a>(虽然文档依旧WIP)，组件自包含，完美、没毛病！还有强大的开发工具支持，看着都赏心悦目，来个效果图：</p>
<p>用了这么多版面，说了一些好处，那么当我们真正需要面对一个应用，需要上规模开发时，<code>vue</code>又能带来怎样的变化呢？憋了几天，我想今天就写一个小游戏来试试整体感觉，先来看看我们今天的目标:</p>
<p><span class="img-wrap"><img data-src="/img/bVvP9q?w=447&amp;h=667" src="https://static.alili.tech/img/bVvP9q?w=447&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>完整源码在这里：<a href="https://github.com/leftstick/vue-memory-game" rel="nofollow noreferrer" target="_blank">vue-memory-game</a></p>
<p>看了效果，知道源码在哪里了，那我们继续？</p>
<h2 id="articleHeader2">组件分解</h2>
<p><code>Break the UI into a component hierarchy</code>，相信写过<code>React</code>的朋友对这句话都不陌生，在使用一种基于组件开发的模式时，最先考虑，而且也尤为重要的一件事，就是组件分解。下面我们看看组件分解示意图：</p>
<p><span class="img-wrap"><img data-src="/img/bVvQaZ?w=554&amp;h=649" src="https://static.alili.tech/img/bVvQaZ?w=554&amp;h=649" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们根据分解图，先把未来要实现的组件挨个儿列出来：</p>
<ol>
<li>
<code>Game</code>, 最外层的游戏面板</li>
<li>
<code>Dashboard</code>, 上面的<code>logo</code>，<code>游戏进度</code>，<code>最佳战绩</code>的容器</li>
<li>
<code>Logo</code>，左上角的<code>logo</code>
</li>
<li>
<code>MatchInfo</code>, 正中上方的游戏进度组件</li>
<li>
<code>Score</code>, 右上角的最佳战绩组件</li>
<li>
<code>Chessboard</code>, 正中大棋盘</li>
<li>
<code>Card</code>, 中间那十六个棋牌</li>
<li>
<code>PlayStatus</code>, 最下方的游戏状态信息栏</li>
</ol>
<h2 id="articleHeader3">带薪搭环境(又来了？^^)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#创建目录
mkdir vue-memory-game

#创建一个package.json
npm init

#进入目录
cd vue-memory-game

#安装开发环境依赖
npm install --save-dev babel-core babel-loader babel-plugin-transform-object-rest-spread babel-plugin-transform-runtime babel-preset-env css-loader file-loader html-webpack-plugin style-loader vue-hot-reload-api vue-html-loader vue-loader vue-style-loader vue-template-compiler webpack webpack-cli webpack-dev-server webpack-merge

#安装运行时依赖
npm install vue vuex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell"><span class="hljs-comment">#创建目录</span>
mkdir vue-memory-game

<span class="hljs-comment">#创建一个package.json</span>
npm init

<span class="hljs-comment">#进入目录</span>
cd vue-memory-game

<span class="hljs-comment">#安装开发环境依赖</span>
npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-plugin-transform-object-rest-spread </span><span class="hljs-keyword">babel-plugin-transform-runtime </span><span class="hljs-keyword">babel-preset-env </span>css-loader file-loader html-webpack-plugin style-loader vue-hot-reload-api vue-html-loader vue-loader vue-style-loader vue-template-compiler webpack webpack-cli webpack-dev-server webpack-merge

<span class="hljs-comment">#安装运行时依赖</span>
npm <span class="hljs-keyword">install </span>vue vuex</code></pre>
<blockquote>这里开发环境依赖内容有点多，但不要害怕，大部分时候你不太关心里面的东西(当然，如果你要进阶，你要升职、加薪、迎娶白富美，那你最好搞清楚他们每一项都是什么东西)</blockquote>
<p>另外在运行时依赖里不仅看到了<code>vue</code>，还看到了<code>vuex</code>。这又是个什么鬼？先不要慌，也别急着骂娘，我们来考虑一个问题，试想下，整个游戏按照上面分解的组件开发时，各个组件之间想必在逻辑上多少是有关系的，譬如：<code>Card</code>在<code>Chessboard</code>中的翻牌、配对，当然会影响到上方的<code>Dashboard</code>和下面的<code>PlayStatus</code>。那么“通信”，就成了待解决问题。</p>
<p>以前我们试图用事件广播来做，但随之而来的问题是，在应用不断的扩展、变化中，事件变得越来越复杂，越来越不可预料，以至于越来越难调试，越来越难追踪错误的root cause。这当然不是我们想要的，我们希望应用的各个部分都易维护、可扩展、好调试、能预测。</p>
<p>于是一种叫单向数据流的方式就冒了出来，用过<code>React</code>的人想必也不陌生，各组件的间的数据走向永远是单向、可预期的：</p>
<p><span class="img-wrap"><img data-src="/img/bVvQhq?w=1400&amp;h=1100" src="https://static.alili.tech/img/bVvQhq?w=1400&amp;h=1100" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这当然也不是<code>facebook</code>的专利，都说<code>vue</code>牛逼了，那一定也有一个单向数据流的实现，就是我们这里用到的<code>vuex</code>。</p>
<h2 id="articleHeader4">掌握目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-memory-game
├── css
│&nbsp;&nbsp; └── main.css
├── img
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; └── zeppelin.png
├── js
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── card
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Card.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Chessboard.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── dashboard
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Dashboard.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Logo.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── MatchInfo.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Score.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── footer
│&nbsp;&nbsp; │&nbsp;&nbsp; │   └── PlayStatus.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; │
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Game.vue
│&nbsp;&nbsp; │
│&nbsp;&nbsp; ├── vuex
│&nbsp;&nbsp; │   ├── actions
│&nbsp;&nbsp; │   │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; │   ├── getters
│&nbsp;&nbsp; │   │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; │   ├── mutations
│&nbsp;&nbsp; │   │&nbsp;&nbsp; └── index.js
│&nbsp;&nbsp; │   └── store
│&nbsp;&nbsp; │       ├── index.js
│&nbsp;&nbsp; │       └── statusEnum.js
│&nbsp;&nbsp; │
│&nbsp;&nbsp; └── index.js
│
├── index.html_vm
├── package.json
├── webpack.config.js
└── webpack.config.prod.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vue-memory-game
├── css
│&nbsp;&nbsp; └── main<span class="hljs-selector-class">.css</span>
├── <span class="hljs-selector-tag">img</span>
│&nbsp;&nbsp; ├── ...
│&nbsp;&nbsp; └── zeppelin<span class="hljs-selector-class">.png</span>
├── js
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── card
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Card<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Chessboard<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── dashboard
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Dashboard<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── Logo<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── MatchInfo<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── Score<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">footer</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │   └── PlayStatus<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Game<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │
│&nbsp;&nbsp; ├── vuex
│&nbsp;&nbsp; │   ├── actions
│&nbsp;&nbsp; │   │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │   ├── getters
│&nbsp;&nbsp; │   │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │   ├── mutations
│&nbsp;&nbsp; │   │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │   └── store
│&nbsp;&nbsp; │       ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │       └── statusEnum<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
│
├── index<span class="hljs-selector-class">.html_vm</span>
├── package<span class="hljs-selector-class">.json</span>
├── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
└── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.js</span></code></pre>
<h2 id="articleHeader5">配置<code>webpack</code>
</h2>
<p>看了上面的文件目录结构图，要配置<code>webpack</code>，已经没有难度了，直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './js/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: resolve(__dirname, 'build')
  },
  devtool: '#source-map',
  devServer: {
    contentBase: join(__dirname, 'build'),
    compress: false,
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'index.html_vm',
      favicon: 'img/favicon.ico',
      hash: false
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { resolve, join } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'development'</span>,
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">index</span>: <span class="hljs-string">'./js/index.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[hash].bundle.js'</span>,
    <span class="hljs-attr">path</span>: resolve(__dirname, <span class="hljs-string">'build'</span>)
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#source-map'</span>,
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">contentBase</span>: join(__dirname, <span class="hljs-string">'build'</span>),
    <span class="hljs-attr">compress</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'0.0.0.0'</span>,
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">use</span>: [
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>
          }
        ],
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'babel-loader'</span>],
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png)$/</span>,
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'file-loader'</span>]
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-string">'body'</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html_vm'</span>,
      <span class="hljs-attr">favicon</span>: <span class="hljs-string">'img/favicon.ico'</span>,
      <span class="hljs-attr">hash</span>: <span class="hljs-literal">false</span>
    })
  ]
}</code></pre>
<blockquote>我在这儿没有过多的涉及<code>webpack</code>的基本使用，反正<code>webpack4</code>的文档还在进行中，翻源码去吧(~逃)<p>这里我们用了<a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a>里自动将编译后的bundle注入<code>index.html_vm</code>里，并生成最终的<code>html</code>。所以<code>index.html_vm</code>作为模板，我们也要先写出来：</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch index.html_vm" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs irpf90"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">touch</span> <span class="hljs-built_in">index</span>.html_vm</code></pre>
<p>再将如下内容填入其中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>vue-memory-game</title>

  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot; />
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimal-ui&quot;/>

  <meta name=&quot;renderer&quot; content=&quot;webkit&quot;/>
  <meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-siteapp&quot; />
</head>
<body>
  <!-- 这里以一个div#application作为入口，vue2使用body作为入口已废弃 -->
  <div id=&quot;application&quot;></div
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-memory-game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge,chrome=1"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimal-ui"</span>/&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"renderer"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"webkit"</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-siteapp"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 这里以一个div#application作为入口，vue2使用body作为入口已废弃 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"application"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>
&lt;/<span class="hljs-attr">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader6">编写应用入口</h2>
<p>在<code>webpack.config.js</code>里，我们看到了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  index: './js/index.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
  <span class="hljs-attr">index</span>: <span class="hljs-string">'./js/index.js'</span>
}</code></pre>
<p>这也是本章整个<code>vue</code>应用的入口:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入一些初始化的简单样式
import '../css/main.css'
// 引入vue库
import Vue from 'vue'
// 引入本游戏核心入口组件
import Game from './components/Game'
// 引入状态管理机
import store from './vuex/store'

/* eslint-disable no-new */
new Vue({
  el: '#application',
  render(h) {
    return h(Game)
  },
  store
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 引入一些初始化的简单样式</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../css/main.css'</span>
<span class="hljs-comment">// 引入vue库</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">// 引入本游戏核心入口组件</span>
<span class="hljs-keyword">import</span> Game <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Game'</span>
<span class="hljs-comment">// 引入状态管理机</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#application'</span>,
  render(h) {
    <span class="hljs-keyword">return</span> h(Game)
  },
  store
})
</code></pre>
<blockquote>本章代码本采用<code>ES2015</code>语法编写，譬如：<code>components: {Game}</code>，相当于<code>components: {Game: Game}</code>，这是<a href="https://github.com/lukehoban/es6features#enhanced-object-literals" rel="nofollow noreferrer" target="_blank">enhanced-object-literals</a><p>我在这里没有过多介绍<code>vue2</code>的基本使用，不过我尽量列出可能涉及的知识点，便于学习</p>
</blockquote>
<h2 id="articleHeader7">全局初始化样式</h2>
<p>上面<code>js/index.js</code>里第一行就引用了全局初始化样式的<code>css/main.css</code>，我们就先把它写了吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">* {
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<blockquote>本章大量使用<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="nofollow noreferrer" target="_blank">flexbox</a>来布局排版，不了解的可以学习一下(虽然我也是半吊子)</blockquote>
<p>这段<code>css/main.css</code>之所以能被加载成功，多亏了<code>webpack.config.js</code>中的这段配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
  <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
},</code></pre>
<p>得利于<code>css-loader</code>和<code>style-loader</code>，上述<code>css</code>可以成功从<code>index.js</code>文件里引入，并被<code>webpack</code>处理到<code>dom</code>的<code>&lt;style /&gt;</code>标签里</p>
<h2 id="articleHeader8">第一个组件<code>Game</code>
</h2>
<p>刚才的入口<code>js/index.js</code>里，我们注入了游戏主界面组件<code>js/components/Game</code>，下面就来创建它吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;game-panel&quot;>
    TBD...
  </div>
</template>

<script>
export default {
  //TBD
}
</script>

<style scoped>
.game-panel {
  width: 450px;
  height: 670px;
  border: 4px solid #BDBDBD;
  border-radius: 2px;
  background-color: #faf8ef;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"game-panel"</span>&gt;</span>
    TBD...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//TBD</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.game-panel</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">450px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">670px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid <span class="hljs-number">#BDBDBD</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#faf8ef</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>单文件组件的魅力，到这里终于可以瞄一眼了，第一部分是模板<code>&lt;template&gt;&lt;/template&gt;</code>，第二部分是逻辑<code>&lt;script&gt;&lt;/script&gt;</code>，第三部分是样式<code>&lt;style&gt;&lt;/style&gt;</code>。</p>
<blockquote>这里<code>&lt;style&gt;</code>上还有个<code>scoped</code>属性，表示样式仅对当前组件以及其子组件的模板部分生效。</blockquote>
<p>单文件组件的加载由<code>webpack.config.js</code>中的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.vue$/,
  use: [
    {
      loader: 'vue-loader'
    }
  ],
  exclude: /node_modules/
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
  <span class="hljs-attr">use</span>: [
    {
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>
    }
  ],
  <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
},</code></pre>
<p>所以我们可以在<code>.vue</code>文件中使用<code>ES2015</code>语法进行开发。</p>
<p>写了这么多，不运行一下，都说不过去了，现在请打开<code>package.json</code>文件，为其添加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;webpack-dev-server --hot --inline --host 0.0.0.0 --port 8080&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline --host 0.0.0.0 --port 8080"</span>
}</code></pre>
<p>然后在项目根目录调用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#启动调试
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell"><span class="hljs-comment">#启动调试</span>
<span class="hljs-built_in">npm</span> start</code></pre>
<p>浏览器访问：<a href="http://localhost:8080/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/</a>，可以看到如下效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVvQsH?w=450&amp;h=669" src="https://static.alili.tech/img/bVvQsH?w=450&amp;h=669" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>注意<code>js/components/Game</code>里的两个"TBD"部分，我们现在来补齐：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;game-panel&quot;>
     <!-- 组装上、中、下三个部分组件 -->
     <Dashboard></Dashboard>
     <Chessboard></Chessboard>
     <Status></Status>
  </div>
</template>

<script>
import Dashboard from './dashboard/Dashboard'
import Chessboard from './card/Chessboard'
import Status from './footer/PlayStatus'

//从vuex中拿出mapActions工具
import { mapActions } from 'vuex'
//状态枚举
import { STATUS } from 'vuex/store/statusEnum'

export default {

  //通过mapActions将actions映射到methods里
  methods: {
    ...mapActions([
      'updateStatus',
      'reset'
    ])
  },
    
  //生命周期钩子，组件实例创建后自动被调用
  created() {
    //触发一个状态更新的action
    this.updateStatus(STATUS.READY)
    //触发一个游戏重置的action
    this.reset()
  },
  //子组件注入
  components: {Dashboard, Chessboard, Status}
}
</script>
<style scoped>
.game-panel{
  width: 450px;
  height: 670px;
  border: 4px solid #BDBDBD;
  border-radius: 2px;
  background-color: #faf8ef;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 450px) {
  .game-panel{
    width: 100%;
    height: 100%;
    justify-content: space-around;
  }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"game-panel"</span>&gt;</span>
     <span class="hljs-comment">&lt;!-- 组装上、中、下三个部分组件 --&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Dashboard</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">Chessboard</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Chessboard</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">Status</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Status</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Dashboard <span class="hljs-keyword">from</span> <span class="hljs-string">'./dashboard/Dashboard'</span>
<span class="hljs-keyword">import</span> Chessboard <span class="hljs-keyword">from</span> <span class="hljs-string">'./card/Chessboard'</span>
<span class="hljs-keyword">import</span> Status <span class="hljs-keyword">from</span> <span class="hljs-string">'./footer/PlayStatus'</span>

<span class="hljs-comment">//从vuex中拿出mapActions工具</span>
<span class="hljs-keyword">import</span> { mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-comment">//状态枚举</span>
<span class="hljs-keyword">import</span> { STATUS } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex/store/statusEnum'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

  <span class="hljs-comment">//通过mapActions将actions映射到methods里</span>
  methods: {
    ...mapActions([
      <span class="hljs-string">'updateStatus'</span>,
      <span class="hljs-string">'reset'</span>
    ])
  },
    
  <span class="hljs-comment">//生命周期钩子，组件实例创建后自动被调用</span>
  created() {
    <span class="hljs-comment">//触发一个状态更新的action</span>
    <span class="hljs-keyword">this</span>.updateStatus(STATUS.READY)
    <span class="hljs-comment">//触发一个游戏重置的action</span>
    <span class="hljs-keyword">this</span>.reset()
  },
  <span class="hljs-comment">//子组件注入</span>
  components: {Dashboard, Chessboard, Status}
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.game-panel</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">450px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">670px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">4px</span> solid <span class="hljs-number">#BDBDBD</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#faf8ef</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-direction</span>: column;
}

@<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">450px</span>) {
  <span class="hljs-selector-class">.game-panel</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">justify-content</span>: space-around;
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<blockquote>这里<a href="https://github.com/leftstick/vue-memory-game/blob/master/js/vuex/actions/index.js" rel="nofollow noreferrer" target="_blank">vuex/actions/index.js</a>和<a href="https://github.com/leftstick/vue-memory-game/blob/master/js/vuex/store/statusEnum.js" rel="nofollow noreferrer" target="_blank">vuex/store/statusEnum.js</a>，我就不分别在这里写源码了，内容很简单，<a href="https://vuex.vuejs.org/en/" rel="nofollow noreferrer" target="_blank">官网基本教程</a>读完理解无障碍。</blockquote>
<p>因为功能比较简单，大部分组件仅样式有差别，为了节省时间，我只挑一个最具代表性的<a href="https://github.com/leftstick/vue-memory-game/blob/master/js/components/card/Chessboard.vue" rel="nofollow noreferrer" target="_blank">components/card/Chessboard.vue</a>来讲讲</p>
<h3 id="articleHeader9">components/card/Chessboard.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;chessboard&quot;>
    <Card v-for=&quot;(card, index) of cards&quot; :key=&quot;index&quot; :option=&quot;card&quot; v-on:flipped=&quot;onFlipped&quot;></Card>
  </div>
</template>

<script>
// 引入Card子组件
import Card from './Card';

//从vuex中拿出mapActions和mapGetters工具
import { mapActions, mapGetters } from 'vuex';

import { STATUS } from 'js/vuex/store/statusEnum';

export default {

  data() {
    return {
      // 初始化一个空的lastCard
      lastCard: null
    }
  },
    
  // 通过mapGetters映射各getter为computed属性
  // 可以响应vuex对state的mutation
  // 我们压根儿不用关心这些数据什么时候被改的
  // 只管拿来用，数据和UI就是up-to-date
  // 这个feel倍儿爽
  computed: {
    ...mapGetters(['leftMatched', 'cards', 'status'])
  },

  methods: {
    
    // 通过mapActions映射各action为local method
    ...mapActions(['updateStatus', 'match', 'flipCards']),

    onFlipped(e) {
      // 游戏开始后，第一次翻牌时，开始为游戏计时
      if (this.status === STATUS.READY) {
        this.updateStatus(STATUS.PLAYING)
      }
      // 如果之前没有牌被翻开，把这张牌赋值给lastCard
      if (!this.lastCard) {
        return (this.lastCard = e)
      }
      // 如果之前有牌被翻了，而且当前翻的这张又正好和之前那张花色相同
      if (this.lastCard !== e &amp;&amp; this.lastCard.cardName === e.cardName) {
        // 将lastCard置空
        this.lastCard = null
        // 触发配对成功的action
        this.match()
        // 如果棋盘内所有牌都配对完毕，触发状态变更action，并告知已过关
        return this.leftMatched || this.updateStatus(STATUS.PASS)
      }

      // 之前有牌被翻了，当前翻的这张花色与之前的不同
      const lastCard = this.lastCard
      this.lastCard = null
      setTimeout(() => {
        // 一秒钟后将之前那种牌，当前牌再翻回去
        this.flipCards([lastCard, e])
      }, 1000)
    }

  },
  // 这里只用到了Card子组件
  components: { Card }
}
</script>

<style scoped>
.chessboard {
  margin-top: 20px;
  width: 100%;
  background-color: #fff;
  height: 530px;
  border-radius: 4px;
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-around;
}

.container:nth-child(4n) {
  margin-right: 0px;
}

@media screen and (max-width: 450px) {
  .chessboard {
    height: 480px;
    padding: 10px 0px;
  }
}
@media screen and (max-width: 370px) {
  .chessboard {
    height: 450px;
  }
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"chessboard"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Card</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(card, index) of cards"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"card"</span> <span class="hljs-attr">v-on:flipped</span>=<span class="hljs-string">"onFlipped"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 引入Card子组件</span>
<span class="hljs-keyword">import</span> Card <span class="hljs-keyword">from</span> <span class="hljs-string">'./Card'</span>;

<span class="hljs-comment">//从vuex中拿出mapActions和mapGetters工具</span>
<span class="hljs-keyword">import</span> { mapActions, mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;

<span class="hljs-keyword">import</span> { STATUS } <span class="hljs-keyword">from</span> <span class="hljs-string">'js/vuex/store/statusEnum'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// 初始化一个空的lastCard</span>
      lastCard: <span class="hljs-literal">null</span>
    }
  },
    
  <span class="hljs-comment">// 通过mapGetters映射各getter为computed属性</span>
  <span class="hljs-comment">// 可以响应vuex对state的mutation</span>
  <span class="hljs-comment">// 我们压根儿不用关心这些数据什么时候被改的</span>
  <span class="hljs-comment">// 只管拿来用，数据和UI就是up-to-date</span>
  <span class="hljs-comment">// 这个feel倍儿爽</span>
  computed: {
    ...mapGetters([<span class="hljs-string">'leftMatched'</span>, <span class="hljs-string">'cards'</span>, <span class="hljs-string">'status'</span>])
  },

  <span class="hljs-attr">methods</span>: {
    
    <span class="hljs-comment">// 通过mapActions映射各action为local method</span>
    ...mapActions([<span class="hljs-string">'updateStatus'</span>, <span class="hljs-string">'match'</span>, <span class="hljs-string">'flipCards'</span>]),

    onFlipped(e) {
      <span class="hljs-comment">// 游戏开始后，第一次翻牌时，开始为游戏计时</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status === STATUS.READY) {
        <span class="hljs-keyword">this</span>.updateStatus(STATUS.PLAYING)
      }
      <span class="hljs-comment">// 如果之前没有牌被翻开，把这张牌赋值给lastCard</span>
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.lastCard) {
        <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.lastCard = e)
      }
      <span class="hljs-comment">// 如果之前有牌被翻了，而且当前翻的这张又正好和之前那张花色相同</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.lastCard !== e &amp;&amp; <span class="hljs-keyword">this</span>.lastCard.cardName === e.cardName) {
        <span class="hljs-comment">// 将lastCard置空</span>
        <span class="hljs-keyword">this</span>.lastCard = <span class="hljs-literal">null</span>
        <span class="hljs-comment">// 触发配对成功的action</span>
        <span class="hljs-keyword">this</span>.match()
        <span class="hljs-comment">// 如果棋盘内所有牌都配对完毕，触发状态变更action，并告知已过关</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.leftMatched || <span class="hljs-keyword">this</span>.updateStatus(STATUS.PASS)
      }

      <span class="hljs-comment">// 之前有牌被翻了，当前翻的这张花色与之前的不同</span>
      <span class="hljs-keyword">const</span> lastCard = <span class="hljs-keyword">this</span>.lastCard
      <span class="hljs-keyword">this</span>.lastCard = <span class="hljs-literal">null</span>
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 一秒钟后将之前那种牌，当前牌再翻回去</span>
        <span class="hljs-keyword">this</span>.flipCards([lastCard, e])
      }, <span class="hljs-number">1000</span>)
    }

  },
  <span class="hljs-comment">// 这里只用到了Card子组件</span>
  components: { Card }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.chessboard</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">530px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">align-content</span>: space-around;
}

<span class="hljs-selector-class">.container</span><span class="hljs-selector-pseudo">:nth-child(4n)</span> {
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">0px</span>;
}

@<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">450px</span>) {
  <span class="hljs-selector-class">.chessboard</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">480px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0px</span>;
  }
}
@<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">370px</span>) {
  <span class="hljs-selector-class">.chessboard</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">450px</span>;
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>写在最后，整体写完的效果，可以<a href="http://leftstick.github.io/vue-memory-game/" rel="nofollow noreferrer" target="_blank">在这里</a>把玩。</p>
<blockquote>线上demo另加入了排行榜功能，如需查看源码的，请<code>git checkout stage-1</code>切换到<code>stage-1</code>分支</blockquote>
<p>整个项目结构清晰，尤其单文件组件的表现力尤为突出，使得每个组件的逻辑都没有过于复杂，而且在<code>vuex</code>的统筹下，<code>action</code> -&gt; <code>mutation</code> -&gt; <code>state</code>的单向数据流模式使得所有的变化都在可控制、可预期的范围内。这点非常利于大型、复杂应用的开发。</p>
<p>另，<code>vue2</code>已经问世，对于之前跟着一起操作过<code>vue</code>版的朋友，发现源码里有疑惑的变更，请参考<a href="http://vuejs.org/guide/migration.html" rel="nofollow noreferrer" target="_blank">升级指南</a>。</p>
<p><code>vue</code>作为一个仅<code>7000</code>多行的轻量级框架而言，无论生态系统、社区、工具的发展都非常均衡、成熟，完全可以适应多业务场景以及稳定性需求。而且，<code>vue2</code>中对服务器端渲染的支持(而且是前所未有的流式支持)，使得你不必再为单页应用的<code>SEO</code>问题、首屏渲染加速问题而担忧。欲知详情，看<a href="http://vuejs.org/guide/ssr.html" rel="nofollow noreferrer" target="_blank">SSR</a></p>
<p>总的来说，2016年，<code>vue</code>让你的编程生涯，又多了一丝情怀(原谅我实在找不到什么好词儿了)。</p>
<p>如果关于代码有疑问，欢迎<a href="https://github.com/leftstick/vue-memory-game/issues" rel="nofollow noreferrer" target="_blank">issue</a>，也欢迎<a href="https://github.com/leftstick/vue-memory-game" rel="nofollow noreferrer" target="_blank">start</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
单文件组件下的vue，可以擦出怎样的火花

## 原文链接
[https://segmentfault.com/a/1190000005168085](https://segmentfault.com/a/1190000005168085)

