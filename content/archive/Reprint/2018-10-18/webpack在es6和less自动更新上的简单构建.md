---
title: webpack在es6和less自动更新上的简单构建
reprint: true
categories: reprint
abbrlink: 3f067123
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p><strong>更新于2015年/11月/08 babel 6.0版本</strong></p>
<p>仅仅是一个开发工具包？克隆压缩 <a href="https://github.com/jamesknelson/webpack-black-triangle">webpack-black-triangle</a> 或是 <a href="http://unicornstandard.com/packages/boilerplate.html">Unicorn Standard Starter Kit</a>的工作原理</p>
<p>从ES2015 到es2016 已实现了大量压缩，并加入了很棒的特性，事实上，使用它并不能帮助你太多。问题是，虽然ES6是趋势，但是浏览器仍然停留在过去。想要验证的话，在Chrome浏览器控制台输入箭头函数，它将提示你：</p>
<p><img src="https://p0.ssl.qhimg.com/t01068fbe95135ae041.png" alt="Chrome being stuck in the present"></p>
<p>当然，原因不仅如此，现在大多数浏览器都支持ES6，但有一个问题：你需要一个build 的过程。虽然这在过去有很多阻碍，但现在未必如此。</p>
<h2>Build 不在意味着是300行的配置文件</h2>
<p>在过去几年，也有很多关于Javascript的构建工具。webpack的突然出现，不在需要我们处理冗长且复杂的Gulpfiles和Gruntfiles。</p>
<p>Webpack让我们不需要在做很多事，例如，无论是github项目中的配置文件，webpack如何使用Babel转译ES6，编译LESS ，还是文件修改，重新加载页面都只是26行代码。</p>
<p><a href="http://www.reddit.com/user/nickguletskii200">/u/nickguletskii200</a> 这个网站曾提到</p>
<p>&gt; Webpack是我用过的编译JS的最快的软件。</p>
<p>根据这些，我最近选择webpack构建<a href="http://www.memamug.com">memamug.com</a>的系统，小的<a href="https://github.com/jamesknelson/memamug-client">open-source</a> app，前端是基于React-based的。考虑到webpack最大的问题是缺乏文档，我将会带你了解整个过程</p>
<h2>用代码测试build项目</h2>
<p>在开始之前，我们需要运行一些ES6代码在我们的构建的项目中，我为了你们精心设计了一个项目 <a href="https://gist.github.com/jamesknelson/9b7db05268e747b4aa4d">black triangle</a>,开始运行，它就会开始旋转。</p>
<p>在build项目之前，我们先给代码建个目录，并在浏览器运行它。首先，将代码复制在一个新的文件夹中，或者从git上克隆。</p>
<pre><code class="hljs crmsh">$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://gist.github.com/<span class="hljs-number">9</span>b7db05268e747b4aa4d.git black-triangle


</code></pre><p>假设现在已经有了 black-triangle目录，进入，将源文件移到该目录中，并对它进行更改。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> black-triangle</span>
<span class="hljs-meta">$</span><span class="bash"> mkdir src</span>
<span class="hljs-meta">$</span><span class="bash"> mv index.html main.js BlackTriangle.js src</span>


</code></pre><p>在浏览器中运行index.html，正常情况你会看到一个（不可移动的）黑色三角形，像下图这样</p>
<p><img src="https://p0.ssl.qhimg.com/t015cce43ae9dc87c63.png" alt="title"></p>
<h2>最小可行的Webpack</h2>
<p>当然这不是一篇关于黑色三角形的博客，而且关于webpack&amp;&amp; Babel，可以像下面那样，用node创建</p>
<pre><code class="hljs mipsasm">$ npm <span class="hljs-keyword">install </span>webpack-dev-server -g
$ npm <span class="hljs-keyword">install </span>webpack-dev-server webpack <span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-polyfill
</span>

</code></pre><p>完成后，在black-triangle目录下启动服务，执行webpack-dev-server命令 加上HTML的路径和JavaScript的入口文件（如src/main.js）</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> webpack-dev-server --content-base src src/main.js</span>


</code></pre><p>在 <a href="http://localhost:8080/">localhost:8080</a>打开项目，webpack被ES6阻塞，我们仍然看到一个不动的黑色三角形，是什么原因呢？</p>
<h2>配置 Webpack</h2>
<p>虽然我们已经安装了所有webpack解析ES6所需的包，但是我们仍然需要告诉它如何做到这一点。我们需要有个webpack的配置文件webpack.config.js 这个文件将包含我们整个项目的权限</p>
<p>为了使三角形旋转，在你的black-triangle目录下添加webpack.config.js文件，内容如下。然后重启webpack-dev-server服务，并重新加载页面，现不需要关心它是如何实现的，下面我会提到</p>
<pre><code class="hljs typescript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  entry: [
    <span class="hljs-string">'babel-polyfill'</span>,
    <span class="hljs-string">'./src/main'</span>
  ],
  output: {
      publicPath: <span class="hljs-string">'/'</span>,
      filename: <span class="hljs-string">'main.js'</span>
  },
  devtool: <span class="hljs-string">'source-map'</span>,
  <span class="hljs-keyword">module</span>: {
    loaders: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        include: path.join(__dirname, <span class="hljs-string">'src'</span>),
        loader: <span class="hljs-string">'babel-loader'</span>,
        query: {
          presets: [<span class="hljs-string">"es2015"</span>],  
        }
      }
    ]
  },
  debug: <span class="hljs-literal">true</span>
};


</code></pre><p>想要停止webpack-dev-server服务, ctrl-c (对于mac).</p>
<p>文件改变时不需要重启服务webpack.config.js就会重新刷新页面。</p>
<p>你的三角形旋转了吗？如果没有，请留言我将会帮助你。让我们来快速浏览下配置文件。</p>
<h2>webpack.config.js的两部分</h2>
<p>第一 关于文件本身</p>
<ul>
<li><p>webpack.config.js 是 node生成的正常的JavaScript文件，</p>
</li>
<li><p>你可以用node 引入模块，来检查环境变量</p>
</li>
<li><p>Webpack’s 配置对象中以文件导出，需要的时module.exports引入</p>
</li>
</ul>
<p>接下来是，关于我们在配置对象中的key值</p>
<ul>
<li><p>entry是一个数组，包括JavaScript的主文件，之前还需要一个babel-polyfill</p>
</li>
<li><p>output 是webpack-dev-server提供编译后main.js的文件，为浏览器提供入口。</p>
</li>
<li><p>devtool告诉webpack要自动为我们提供源文件，这样浏览器就可以在他们的开发控制台中显示原始的文件(而不是编译的文件)。</p>
</li>
<li><p>module.loaders 是 <a href="https://github.com/webpack/docs/wiki/list-of-loaders">loaders</a> 的目录，包括我们的编译源.通过<em>babel-loader</em> 告诉webpack 运行src目录下面的 .js 的文件，使用es2015插件将es2015(即ES6)转换为ES5。</p>
</li>
<li><p>debug是作为loader中的一个调试模式选项</p>
</li>
</ul>
<p>如果你还想了解一些关于webpack配置的，可以参考网上这篇文章 <a href="http://webpack.github.io/docs/configuration.html">documentation</a> 它并不是关于webpack配置的要点，因此，不必要的时候不需要阅读</p>
<p>概括起来，你还需要知道：</p>
<ul>
<li><p>entry 是脚本的入口位置</p>
</li>
<li><p>module.loaders 是放你编译代码的地方</p>
</li>
</ul>
<p>和往常一样，也有例外：插件配置选项只在你需要部署的时候有用。我将在以后的指南中解释如何用插件实现最小化之类的功能，为了不错过需要加我的邮件。我将用免费提供ES6 cheatsheet的最佳期刊作为你发来邮件的回报！但是现在，让我们在给webpack配置加一些调整来结束。</p>
<h3>获取ES6 Cheatsheet</h3>
<p>感谢！请检查你的邮件中的cheatsheets链接</p>
<p>提示订阅的错误请重试</p>
<p>名</p>
<p>邮件地址</p>
<p>订阅我的简讯</p>
<h2>让你的生活更轻松</h2>
<h3>1. 保存后自动重新加载页面</h3>
<p>使用webpack-dev-server最大的优势是当文件发生改变它就通知浏览器。当然，如果你不监听这些通知也不会发生什么。但幸运的是webpack-dev-server包含一个方便且完备的脚本，当监听到通知的时候，将会为你重新加载页面。</p>
<p>关于脚本'webpack-dev-server/client?<a href="http://localhost:8080'(http://localhost:8080'">http://localhost:8080'(http://localhost:8080'))的问题</a>)的问题). 为什么不试着根据你在上面学到的东西自己添加它呢?完成后，touch或hover在下面的空白框上，以获得答案。</p>
<pre><code class="hljs 1c">  entry: [
    'babel-polyfill',
    './src/main',
    'webpack-dev-server/client?http://localhost:<span class="hljs-number">8080</span>'
  ],


</code></pre><h3>2. webpack-dev-server的默认选项</h3>
<p>当你想启动服务的时候输入并执行以下命令</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> webpack-dev-server --content-base src src/main.js</span>


</code></pre><p>幸运的是，你可以通过在webpack.config.js添加devServer对象在中，来指定webpack-dev-server 的默认选项。这个对象中的key值，是那些您驼峰命名实现版本控制。</p>
<p>如果这有点拗口，别担心——你只需要知道你应该把这个添加到你的webpack.config.js:</p>
<pre><code class="hljs css">  <span class="hljs-selector-tag">devServer</span>: {
    <span class="hljs-attribute">contentBase</span>: <span class="hljs-string">"./src"</span>
  }


</code></pre><p>然后您可以从上面的命令中省略-content-base的src。</p>
<h3>3. 使用package.json记录依赖项和入口点</h3>
<p><em>如果你知道package.json的工作原理，你可以跳过这部分.</em></p>
<p>最后一步是创建一个package.json，使用它有很多很好的理由，我不能一一列举，但这里有两个相关的理由:</p>
<ul>
<li><p>你可以添加依赖(如. webpack &amp; babel), 用npm install 安装他们</p>
</li>
<li><p>你可以定义一个起始脚本， 这样你就不需要记住webpack-dev-server使用npm start即可</p>
</li>
</ul>
<p>创建package.json是如此的简单，你没有理由不去做它，因此，现在让我们在你的black-triangle目录中创建它，方式如下</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">npm</span> init


</code></pre><p>现在按照提示输入src/main。作为你的入口点</p>
<p>现你已有属于你自己的package.json，如此的简单。让我们通过告诉npm，当我们输入npm start后应该做什么来结束它: 在package.json脚本文件中生成新的对象key，如下：</p>
<pre><code class="hljs sql">"<span class="hljs-keyword">start</span><span class="hljs-string">": "</span>node_modules/webpack-dev-<span class="hljs-keyword">server</span>/<span class="hljs-keyword">bin</span>/webpack-dev-server.js<span class="hljs-string">"


</span></code></pre><p>最后，关闭当前服务（如果服务运行）输入npm start并查看 <a href="http://localhost:8080/">localhost:8080</a>来测试</p>
<p>通过输入npm start重新加载服务，如此简单的实现编译ES6</p>
<p>但是现在不要关闭标签。读过这篇文章后，你需要记住重要的部分，还有什么比做一个有用的练习更好的方法。</p>
<h2>练习: 编译并监听 LESS/SCSS文件</h2>
<p>这个练习范围小，但是结果显著。它只需要在webpack.config中添加两行js，当你将更改保存.less 或.scss 时，你会立即得到浏览器样式表的即时更新。</p>
<p>开始之前，你需要装一些依赖包</p>
<pre><code class="hljs sql">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader autoprefixer-loader css-loader <span class="hljs-keyword">less</span>-loader <span class="hljs-comment">--save-dev</span>


</code></pre><p>如果是这样情况，可以用less-loader代替scss-loader</p>
<p>一旦包已经安装，你需要对webpack.config.js进行两处改变</p>
<ul>
<li><p>将新的loaders添加到module.loaders部分中的.less或.css行中。使用!使loaders相互连接的字符(更多参考文章(<a href="http://webpack.github.io/docs/loaders.html">http://webpack.github.io/docs/loaders.html</a>) )</p>
</li>
<li><p>在entry中添加新的stylesheet(是的，你可以在webpack中包含更多的JavaScript)</p>
</li>
</ul>
<p>测试时，不要忘记在 index.html 中移出样式</p>
<p>确保你不会在这个练习中陷入困境——在10分钟左右的时间里，你可以自由地离开。 重要的是你要试一试。 <em>你一旦尝试</em>, 你可以看看我的解决方案，以及我是如何将整个项目连接在一起的，(<a href="https://github.com/jamesknelson/webpack-black-triangle">https://github.com/jamesknelson/webpack-black-triangle)</a>).</p>
<h2>如何配置app来进行部署?</h2>
<p>首先，要把它进行压缩. 然后, 您可能引入一些环境变量，以便在开发和生产中设置不同的API键。你需要提取CSS作为一个分开的文件, 并进行缓存. 这需要一些方法来修改你的src属性</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/webpack-made-simple-building-es6-less-with-autorefresh](https://www.zcfy.cc/article/webpack-made-simple-building-es6-less-with-autorefresh)
原文标题: webpack在es6和less自动更新上的简单构建
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
