---
title: 'PostCSS自学笔记（一）【安装使用篇】' 
date: 2019-01-02 2:30:09
hidden: true
slug: r8e2ehl26h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">PostCSS介绍</h2>
<p><a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">PostCSS</a>是一个利用JS插件来对CSS进行转换的工具，这些插件非常强大，强大到无所不能。其中，<a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">Autoprefixer</a>就是众多PostCSS插件中最流行的一个。</p>
<p>截至目前（2017年7月）PostCSS已经有<strong>超过200</strong>个插件，你可以<a href="https://github.com/postcss/postcss/blob/master/docs/plugins.md" rel="nofollow noreferrer" target="_blank">插件列表</a>查找有没有你所需要的插件。如果你想自己写个插件，据说这是一个不错的主意，而且非常简单（前提掌握node.js，不过我还没学会呢），你可以试着<a href="https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md" rel="nofollow noreferrer" target="_blank">搞点事</a>。</p>
<p>看到这里，你可能没有发现它的强大之处，甚至我自己都没有被我翻译的这段官方文字所打动。<del>因为没(wǒ)有(yě)对(bù)比(tài)就(huì)没(yòng)有(zhè)伤(wán)害(yì)。</del>好了，是时候启动装逼模式了。</p>
<p>维基百科，阿里巴巴，谷歌，Wordpress，Twitter等网站均有使用，大佬们都在用你有什么理由不跟上步伐。</p>
<p>再来看看这张PostCSS下载数量的npm-stat统计表（数据证明一切）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010926817" src="https://static.alili.tech/img/remote/1460000010926817" alt="PostCSS下载数量" title="PostCSS下载数量" style="cursor: pointer;"></span></p>
<p>学习PostCSS之前需要了解一些事情：</p>
<ol>
<li>PostCSS插件的处理方式类似那些CSS预处理器，而非预处理器和后处理器（<a href="https://webdesign.tutsplus.com/tutorials/postcss-deep-dive-what-you-need-to-know--cms-24535" rel="nofollow noreferrer" target="_blank">PostCSS is Not a <em>Pre-</em>processor and Not a <em>Post-</em>processor either</a>）</li>
<li>PostCSS is Not “Future Syntax”（不是新式/未来语法？不知道怎么翻译）</li>
<li>PostCSS本身并非整理或优化CSS的工具</li>
<li>PostCSS可以完成很多意想不到的事情，例如用<a href="https://github.com/vkalinichev/postcss-rtl" rel="nofollow noreferrer" target="_blank">postcss-rtl</a>恶搞一下?</li>
</ol>
<p>那么它还有一些特性，例如创建了一个插件功能极强的生态系统，具有模块化需要什么用什么（<a href="https://github.com/jonathantneal/precss" rel="nofollow noreferrer" target="_blank">precss</a>就是一个集成了类似SASS很多方法的包），相比其他的CSS预处理器它的优势主要体现在以下几个方面：</p>
<ol>
<li>拥有极高的处理性能（<a href="https://github.com/postcss/benchmark" rel="nofollow noreferrer" target="_blank">3倍以上的处理速度</a>）</li>
<li>你既可以写正常的CSS，也可以结合LESS或者SASS一起编写</li>
<li>对Source Map支持更好</li>
<li>他的插件真的太多太强大太便利了</li>
</ol>
<p>其他对比SASS和LESS的区别在于他们内置了大量的方法，而也许你只需要用到几个变量而已，大材小用。而PostCSS则可制定个人需求的一套解决方案（仅安装需要的插件）。这也就是他高性能的主要原因。几乎SASS和LESS有的功能全都有！</p>
<p>总之好处太多了。这里就不一一列举了。迫不及待的你已经等不及安装使用了吧。</p>
<h2 id="articleHeader1">PostCSS安装及使用</h2>
<p>PostCSS一般是结合自动化工具使用，如果要单独使用可以安装<a href="https://github.com/postcss/postcss-cli" rel="nofollow noreferrer" target="_blank">PostCSS CLI</a>，这里我先对PostCSS CLI的安装使用讲解下。Windows下安装（文中操作全部基于WINDOWS环境）：</p>
<p><del><code>npm i -g postcss-cli</code></del>或者<code>npm i --save-dev postcss-cli</code></p>
<p>CLI是否建议全局安装?（这样包括其对应的插件都要全局了？如果不全局就失去了CLI的意义了？）。全局安装完成后，试着输入PostCSS，出现以下结果，说明安装OK</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010926818" src="https://static.alili.tech/img/remote/1460000010926818" alt="安装成功" title="安装成功" style="cursor: pointer;"></span></p>
<p>不过我个人习惯仅安装在项目中，于是我没有选择安装CLI，而是直接在项目中安装PostCSS，<code>npm i --save-dev postcss</code>，我这里有个<a href="https://github.com/whidy/postcss-study" rel="nofollow noreferrer" target="_blank">例子</a>可以看看</p>
<p>接下来，我们还做不了什么，我们需要安装一些插件配合PostCSS，例如，我现在安装一个autoprefixer</p>
<p><code>npm install --save-dev autoprefixer</code>，并参考例子中的<a href="https://github.com/whidy/postcss-study/blob/master/src/style01.css" rel="nofollow noreferrer" target="_blank">style01.css</a>，我要通过PostCSS对它进行处理。这里两个方法：</p>
<ol>
<li>通过<code>cd node_modules/.bin/</code>进入node_modules/.bin/目录内再执行<p><code>postcss ../../src/style01.css -o ../../dist/output_style01.css -u autoprefixer</code></p>
</li>
<li>通过修改package.json中的scripts，增加一条postcss命令<p><code>"postcss:style01": "postcss ./src/style01.css -o ./dist/output_style01.css -u autoprefixer"</code></p>
<p>然后再回到根目录（postcss-study目录）下执行</p>
<p><code>npm run postcss:style01</code></p>
</li>
</ol>
<p>两者效果相同，当然我倾向于后者啦。完成后一条鲜亮的绿色的让人安全感十分强列的提示语出现了<em>√ Finished ...</em>前面还有个sweet的勾勾，请看编译后的<a href="https://github.com/whidy/postcss-study/blob/master/dist/output_style01.css" rel="nofollow noreferrer" target="_blank">output_style01.css</a>聪明的你一定能举一反三的。做出更多惊奇的事情的~</p>
<p>另外我们可以同样的采用Parser插件来编译样式文件（当然我实际上是不会用sugarss的，如果你习惯用sass请安装<a href="https://github.com/postcss/postcss-scss" rel="nofollow noreferrer" target="_blank">postcss-scss</a>），我的<a href="https://github.com/whidy/postcss-study" rel="nofollow noreferrer" target="_blank">DEMO</a>里面请参考<a href="https://github.com/whidy/postcss-study/blob/master/src/style02.sss" rel="nofollow noreferrer" target="_blank">style02.sss</a>文件的编译。这里就不多说了。</p>
<blockquote>
<p>还有一种预先写好配置文件，这个就稍微先进一些，也不会看起来很乱。我们创建一个<strong><a href="https://github.com/whidy/postcss-study/blob/master/postcss.config.js" rel="nofollow noreferrer" target="_blank">postcss.config.js</a></strong>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  parser: 'sugarss',
  plugins: [
    require('autoprefixer')
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">parser</span>: <span class="hljs-string">'sugarss'</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)
  ]
}</code></pre>
<p>不过这种经过我个人测试，<strong>仅适用于全局安装了PostCSS-CLI和sugarss的情况</strong>下再该配置文件目录下执行<code>postcss ./src/style02.sss -o ./dist/test.css</code>命令就好了。这里个人不是很推荐。关于CLI下的一些方法暂时就不多说了，如有错误请各位大佬指正~?</p>
</blockquote>
<h2 id="articleHeader2">PostCSS主要插件说明和介绍</h2>
<p>官方对于插件根据用途做了分类，主要有以下几个类别：</p>
<p>解决全局CSS问题</p>
<p>使用未来的CSS语法</p>
<p>编写可读性更好的CSS</p>
<p>用于图片和字体</p>
<p>CSS语法检查</p>
<p>其他</p>
<p>以上内容主要是用来熟悉一下PostCSS的。接下来说点实际的，如何利用PostCSS结合自动化工作在项目中使用。</p>
<h2 id="articleHeader3">PostCSS结合Webpack应用</h2>
<p>关于webpack基础配置的相关内容这里就不多说了~前面已有大神写了有兴趣可以<a href="http://git.oschina.net/janking/Infinite-f2e/issues/IDOHZ" rel="nofollow noreferrer" target="_blank">膜拜一下</a>。</p>
<p>我们先来创建一个项目目录，结构如下：（style0*.css作为我测试的文件，后面可能增加）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|– dist
|– src
| |– images
| | |– postcss-00.png
| | |– postcss-01.png
| – index.js
| – index.html
| – style04.sss
|– postcss.config.js
|– webpack.config.js
|– package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">– dist
</span>|<span class="hljs-string">– src
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">– images
</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string">– postcss-00.png
</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string">– postcss-01.png
</span>|<span class="hljs-string"> – index.js
</span>|<span class="hljs-string"> – index.html
</span>|<span class="hljs-string"> – style04.sss
</span>|<span class="hljs-string">– postcss.config.js
</span>|<span class="hljs-string">– webpack.config.js
</span>|<span class="hljs-string">– package.json</span></code></pre>
<p>接下来安装依赖包：</p>
<p><code>npm i -D postcss-loader style-loader css-loader webpack webpack-dev-server </code></p>
<p>然后修改已下文件，请仔细阅读?</p>
<p>package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;webpack-dev-server&quot;,
  &quot;build&quot;: &quot;webpack&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>
},</code></pre>
<p>先来个简单的试试：</p>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.sss$/,
      exclude: /node_modules/,
      use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader'
        }
      ]
    }]
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">index</span>: path.resolve(__dirname, <span class="hljs-string">'src/index.js'</span>)
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.sss$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader'</span>,
        },
        {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">importLoaders</span>: <span class="hljs-number">1</span>,
          }
        },
        {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'postcss-loader'</span>
        }
      ]
    }]
  },
  <span class="hljs-attr">devServer</span>: {
    <span class="hljs-attr">contentBase</span>: __dirname,
    <span class="hljs-attr">compress</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">port</span>: <span class="hljs-number">9000</span>,
    <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'0.0.0.0'</span>,
    <span class="hljs-attr">disableHostCheck</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>postcss.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  parser: 'sugarss',
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">parser</span>: <span class="hljs-string">'sugarss'</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>),
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)
  ]
}</code></pre>
<p>读完了应该发现此刻运行肯定会出错的~因为还没有安装其他跟PostCSS相关的插件呢，于是继续安装：</p>
<p><code>npm i -D sugarss precss autoprefixer</code></p>
<p>（插件简单介绍，<a href="https://github.com/postcss/sugarss" rel="nofollow noreferrer" target="_blank">sugarss</a>是比较特别的css语法，我尚未了解到这样写的好处，仅供大家学习参考。<a href="https://github.com/jonathantneal/precss" rel="nofollow noreferrer" target="_blank">precss</a>功能就很强悍了，类似sass的一些功能。<a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">autoprefixer</a>就不用多说啦！）</p>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>这是一个用于PostCSS测试的页面</title>
</head>
<body>
  <div class=&quot;test&quot;>
    <p class=&quot;multiline&quot;>this is a container</p>
  </div>
  <script src=&quot;../dist/index.js&quot;></script>
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
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>这是一个用于PostCSS测试的页面<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"multiline"</span>&gt;</span>this is a container<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../dist/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>style04.sss</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$blue: #056ef0

.test 
  box-sizing: border-box
  padding: 50px
  border: 10px solid $blue
  width: 200px
  height: 200px

.multiline,
.selector
  box-shadow: 1px 0 9px rgba(0, 0, 0, .4),
              1px 0 3px rgba(0, 0, 0, .6)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-variable">$blue</span>: <span class="hljs-number">#056ef0</span>

.test 
  box-sizing: border-box
  padding: <span class="hljs-number">50px</span>
  border: <span class="hljs-number">10px</span> solid <span class="hljs-variable">$blue</span>
  width: <span class="hljs-number">200px</span>
  height: <span class="hljs-number">200px</span>

.multiline,
.selector
  box-shadow: <span class="hljs-number">1px</span> <span class="hljs-number">0</span> <span class="hljs-number">9px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">4</span>),
              <span class="hljs-number">1px</span> <span class="hljs-number">0</span> <span class="hljs-number">3px</span> rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">6</span>)</code></pre>
<p>基本工作大功告成，开两个终端跑两条命令试试看。</p>
<p><code>npm run start</code></p>
<p><code>npm run build</code></p>
<p>一切运行OK，接下来访问<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:9000/src/，看起来也都还不错。当然写到这里只是介绍了如何结合webpack使用PostCSS。而实际项目应用中，我目前还在探索更多实用的插件，构建一个基本可以替代SASS，LESS等</p>
<p>参考文献：</p>
<p><a href="https://webpack.js.org/loaders/postcss-loader/" rel="nofollow noreferrer" target="_blank">webpack官方说明：postcss-loader</a></p>
<h2 id="articleHeader4">PostCSS结合Gulp应用</h2>
<p>Gulp我用的很少，不是很熟悉，这里结合官方一些和自己尝试的DEMO进行说明。</p>
<p>我基于之前的代码来继续补充内容。</p>
<p>安装Gulp相关的包：</p>
<p><code>npm run i -D gulp gulp-postcss gulp-sourcemaps</code></p>
<p>增加Gulp配置文件<a href="https://github.com/whidy/postcss-study/blob/master/gulpfile.js" rel="nofollow noreferrer" target="_blank">gulpfile.js</a>，页面<a href="https://github.com/whidy/postcss-study/blob/master/src/index2.html" rel="nofollow noreferrer" target="_blank">index2.html</a>，样式<a href="https://github.com/whidy/postcss-study/blob/master/src/style05.css" rel="nofollow noreferrer" target="_blank">style05.css</a>，修改package.json的script如下：</p>
<p><a href="https://github.com/whidy/postcss-study/blob/master/gulpfile.js" rel="nofollow noreferrer" target="_blank">gulpfile.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var postcss = require('gulp-postcss');
var gulp = require('gulp');

gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/style05.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('precss'), require('autoprefixer')]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> postcss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-postcss'</span>);
<span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>);

gulp.task(<span class="hljs-string">'css'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> postcss = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-postcss'</span>);
  <span class="hljs-keyword">var</span> sourcemaps = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-sourcemaps'</span>);

  <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">'src/style05.css'</span>)
    .pipe(sourcemaps.init())
    .pipe(postcss([<span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>), <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)]))
    .pipe(sourcemaps.write(<span class="hljs-string">'.'</span>))
    .pipe(gulp.dest(<span class="hljs-string">'dist/'</span>));
});</code></pre>
<p><a href="https://github.com/whidy/postcss-study/blob/master/src/index2.html" rel="nofollow noreferrer" target="_blank">index2.html</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>这是一个用于PostCSS测试的页面(gulp)</title>
  <link href=&quot;../dist/style05.css&quot; rel=&quot;stylesheet&quot;>
</head>
<body>
  <div class=&quot;test&quot;>
    <p class=&quot;box&quot;>this is a box</p>
    <p class=&quot;box&quot;>this is another box</p>
  </div>
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
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>这是一个用于PostCSS测试的页面(gulp)<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"../dist/style05.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>this is a box<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>this is another box<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><a href="https://github.com/whidy/postcss-study/blob/master/src/style05.css" rel="nofollow noreferrer" target="_blank">style05.css</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* gulp下测试 */
$blue: #056ef0;
.test {
  display: flex;
  color: $blue;
  .box {
    flex: 1;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code class="sass"><span class="hljs-comment">/* gulp下测试 */</span>
<span class="hljs-variable">$blue</span>: <span class="hljs-number">#056ef0</span>;
<span class="hljs-selector-class">.test</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">$blue</span>;
  <span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
  }
}</code></pre>
<p><a href="https://github.com/whidy/postcss-study/blob/master/package.json" rel="nofollow noreferrer" target="_blank">package.json</a>的scripts部分如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;start&quot;: &quot;webpack-dev-server&quot;,
  &quot;build&quot;: &quot;webpack&quot;,
  &quot;gulp&quot;: &quot;gulp css&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server"</span>,
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>,
  <span class="hljs-string">"gulp"</span>: <span class="hljs-string">"gulp css"</span>
},</code></pre>
<p>一切就绪后，我们来执行伟大的命令了：</p>
<p><code>npm run gulp</code></p>
<p>我的电脑等待了约1.26s~1.29s，提示finish啦~</p>
<p>和之前相同，我这里依旧采用了webpack-dev-server启动的服务器（当然这个又依赖webpack配置，除非你将配置直接写入package.json内），那么你当然也可以使用其他自己喜欢的服务器（例如<a href="https://github.com/indexzero/http-server" rel="nofollow noreferrer" target="_blank">http-server</a>），我们依旧先启动服务器npm run start，然后访问本地<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:9000/src/index2.html就可以看到效果了。或者你也可以直接去看dist目录内生成出来的style05.css文件，一切都是那么美好~</p>
<h2 id="articleHeader5">PostCSS学习心得及总结</h2>
<p>因为这次学习，纯粹是根据“教科书”来学，来讲解的，因此也就没有什么真正的精髓，我也是才开始接触PostCSS，文中有错误之处还请指正。我希望以后在项目中尽可能的用好PostCSS，再次带来一篇简短而有力的文章分享给大家。因时间和精力有限希望这篇文章能给大家带来些帮助。目前能想到的，还有一些未来需要补充的内容包括：</p>
<ol>
<li>sourcemaps</li>
<li>是否有移动端基于PostCSS的自适应解决方案</li>
<li>自己写个可能会比较实用的插件</li>
<li>结合<a href="https://github.com/AleshaOleg/postcss-sass" rel="nofollow noreferrer" target="_blank">postcss-sass</a>究竟有什么好处</li>
<li>postcss对图片和字体等资源文件处理</li>
</ol>
<p>暂时想到这些，如果你还有一些想到的欢迎在下面留言哦?</p>
<blockquote>其他参考文献汇总：<p><strong><a href="https://webdesign.tutsplus.com/series/postcss-deep-dive--cms-889" rel="nofollow noreferrer" target="_blank">PostCSS Deep Dive</a></strong>（强烈推荐！我看完了才发现有部分译文：<a href="http://www.w3cplus.com/PostCSS/postcss-deep-dive-what-you-need-to-know.html" rel="nofollow noreferrer" target="_blank">PostCSS深入学习</a>）</p>
<p><a href="https://www.w3cplus.com/PostCSS/using-postcss-together-with-sass-stylus-or-less.html" rel="nofollow noreferrer" target="_blank">PostCSS深入学习: PostCSS和Sass、Stylus或LESS一起使用</a></p>
<p><a href="https://segmentfault.com/a/1190000003909268">PostCSS 是个什么鬼东西？</a></p>
<p><a href="http://www.cnblogs.com/givebest/p/4771154.html" rel="nofollow noreferrer" target="_blank">PostCSS一种更优雅、更简单的书写CSS方式</a></p>
<p><a href="http://www.css88.com/archives/7317" rel="nofollow noreferrer" target="_blank">PostCSS及其常用插件介绍</a></p>
<p><a href="https://www.smashingmagazine.com/2015/12/introduction-to-postcss/" rel="nofollow noreferrer" target="_blank">PostCSS – A Comprehensive Introduction</a></p>
<p><a href="http://www.cnblogs.com/terrylin/p/5229169.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/terrylin/p/5229169.html</a></p>
<p>相当不错的PPT形式</p>
<p><a href="https://ai.github.io/about-postcss/en/" rel="nofollow noreferrer" target="_blank">https://ai.github.io/about-postcss/en/</a></p>
<p>postcss的优势</p>
<p><a href="https://pawelgrzybek.com/from-sass-to-postcss/" rel="nofollow noreferrer" target="_blank">From Sass to PostCSS</a></p>
<p><a href="https://ashleynolan.co.uk/blog/postcss-a-review" rel="nofollow noreferrer" target="_blank">PostCSS – Sass Killer or Preprocessing Pretender?</a></p>
</blockquote>
<h2 id="articleHeader6">其他</h2>
<p>关于我个人的PostCSS一系列学习, 介绍及总结, 有兴趣可以参阅:</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000010926812">PostCSS自学笔记（一）【安装使用篇】</a></li>
<li><a href="https://segmentfault.com/a/1190000010934375" target="_blank">PostCSS自学笔记（二）【插件篇】</a></li>
<li><a href="https://segmentfault.com/a/1190000010947054">PostCSS自学笔记（二）【番外篇一】</a></li>
<li><a href="https://segmentfault.com/a/1190000013233142" target="_blank">PostCSS自学笔记（二）【番外篇二】</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PostCSS自学笔记（一）【安装使用篇】

## 原文链接
[https://segmentfault.com/a/1190000010926812](https://segmentfault.com/a/1190000010926812)

