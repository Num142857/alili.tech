---
title: '详解Webpack+Babel+React开发环境的搭建' 
date: 2019-02-06 2:30:09
hidden: true
slug: qzalzfno9v
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1.认识Webpack</h3>
<p>构建应用前我们先来了解一下Webpack, Webpack是一个模块打包工具，能够把各种文件（例如：ReactJS、Babel、Coffeescript、Less/Sass等）作为模块进行编译后进行打包。</p>
<h3 id="articleHeader1">2.安装Webpack</h3>
<p>要开始使用Webpack在项目中进行开发前我们首先需要在全局环境中进行安装。</p>
<blockquote><p>npm install webpack -g</p></blockquote>
<h3 id="articleHeader2">3.创建一个项目</h3>
<p>安装好后创建一个名叫<strong>learn-webpack</strong>的项目并进入该项目文件夹，当然项目名字你可以起你自己想要的名字。</p>
<blockquote><p>mkdir learn-webpack &amp;&amp; cd learn-webpack</p></blockquote>
<p>通过编辑器找到你刚刚所创建的项目文件夹</p>
<p><span class="img-wrap"><img data-src="/img/bVzy1a?w=656&amp;h=436" src="https://static.alili.tech/img/bVzy1a?w=656&amp;h=436" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>现在我们来创建2个文件:</p>
<p>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('#app').innerHTML = 'Hello World!';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'#app'</span>).innerHTML = <span class="hljs-string">'Hello World!'</span>;</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Learn-webpack</title>
</head>
<body>
  <div id=&quot;app&quot;></div>
  <script src=&quot;dist/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Learn-webpack<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>然后在终端执行</p>
<blockquote><p>webpack ./app.js ./dist/bundle.js</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVzy1b?w=720&amp;h=154" src="https://static.alili.tech/img/bVzy1b?w=720&amp;h=154" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>最后执行启动本地的http服务</p>
<blockquote><p>python -m SimpleHTTPServer</p></blockquote>
<p>这个时候你就可以在浏览器输入:</p>
<blockquote><p><a href="http://localhost:8000" rel="nofollow noreferrer" target="_blank">http://localhost:8000</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVzy1c?w=790&amp;h=170" src="https://static.alili.tech/img/bVzy1c?w=790&amp;h=170" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果你能在浏览器里面看到Hello world!那说明你已经成功的利用Webpack把main.js打包并编译到了bundle.js.是不是很简单？</p>
<h4>定义一个配置文件</h4>
<p>上面的只是对Webpack的使用进行了一些简单的介绍，实际上每个项目下都应该包含一个webpack.config.js，用来告诉Webpack需要做些什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: &quot;app.js&quot;,
  output: {
    path: __dirname+&quot;/dist&quot;,
    filename: &quot;bundle.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.exports = {
<span class="hljs-symbol">  entry:</span> <span class="hljs-string">"app.js"</span>,
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    path:</span> __dirname+<span class="hljs-string">"/dist"</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"bundle.js"</span>
  }
}</code></pre>
<p>现在在终端中运行：</p>
<blockquote><p>webpack</p></blockquote>
<p>看看是不是和之前输入 webpack ./app.js ./dist/bundle.js 的打包编译结果一样。</p>
<h5>entry：指定打包的入口文件</h5>
<ul>
<li><p>1.单个文件打包为单个输出文件，直接写该文件的名字，例如：entry:"main.js"</p></li>
<li><p>2.多个文件打包为单个输出文件，将文件名放进一个数组，例如：entry:['main.js','xx.js']</p></li>
<li><p>3.多个文件打包为多个输出文件，将文件名放入一个键字对，例如：entry: {a:'main.js',b:'xx.js'}</p></li>
</ul>
<h5>output：配置打包结果</h5>
<p>path为定义输出文件夹，filename为打包结果文件的名称，如果指定打包入口文件为上面的1、2种情况，filename里面直接跟你想输出的文件名。若为第3种情况filename里面需写成[name].文件名.js，filename里面的[name]为entry中的键。</p>
<h4>监听变化自动打包</h4>
<p>当我们在不停的对代码进行变动的时候，为了不修改一次然后又手动去进行打包一次。可以使用webpack的watch功能。</p>
<blockquote><p>webpack --watch 或者 webpack -w</p></blockquote>
<p>或者可以直接在配置代码里面把watch设置为true</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: &quot;app.js&quot;,
  output: {
    path: __dirname+&quot;/dist&quot;,
    filename: &quot;bundle.js&quot;
  },
  watch: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.exports = {
<span class="hljs-symbol">  entry:</span> <span class="hljs-string">"app.js"</span>,
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    path:</span> __dirname+<span class="hljs-string">"/dist"</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"bundle.js"</span>
  },
<span class="hljs-symbol">  watch:</span> true
}</code></pre>
<h3 id="articleHeader3">4.使用Babel</h3>
<p>Babel是什么？Babel 是一个 JavaScript 编译器。使用它可以将ES6的语法转换为ES5的语法，以便在现在有的环境执行。</p>
<p>在终端执行:</p>
<blockquote><p>npm install webpack babel-loader babel-core babel-preset-es2015 --save-dev</p></blockquote>
<p>执行安装完成后需要将之前的webpack.config.js修改为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: &quot;./app.js&quot;,
  output: {
    path: __dirname+&quot;/dist&quot;,
    filename: &quot;bundle.js&quot;
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['','.coffee','.js']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {
  entry: <span class="hljs-string">"./app.js"</span>,
  outpu<span class="hljs-variable">t:</span> {
    path: __dirname+<span class="hljs-string">"/dist"</span>,
    filename: <span class="hljs-string">"bundle.js"</span>
  },
  module: {
    loader<span class="hljs-variable">s:</span> [
      {
        tes<span class="hljs-variable">t:</span> /\.jsx?$/,
        loader: <span class="hljs-string">'babel-loader'</span>,
        exclude: /node_modules/,
        query: {
          preset<span class="hljs-variable">s:</span> [<span class="hljs-string">'es2015'</span>]
        }
      }
    ]
  },
  <span class="hljs-built_in">resolve</span>: {
    extension<span class="hljs-variable">s:</span> [<span class="hljs-string">''</span>,<span class="hljs-string">'.coffee'</span>,<span class="hljs-string">'.js'</span>]
  }
}</code></pre>
<p>现在就能在文件里面以ES6的语法进行代码编写，我们来测试一下，在app.js加入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = str => {
  console.log(str);
};
func('我现在在使用Babel!');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>var <span class="hljs-function"><span class="hljs-keyword">func</span> = <span class="hljs-title">str</span> =&gt; {</span>
  console.<span class="hljs-built_in">log</span>(str)<span class="hljs-comment">;</span>
}<span class="hljs-comment">;</span>
<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(<span class="hljs-string">'我现在在使用Babel!'</span>)</span>;</span></code></pre>
<p>ES6支持用箭头方式来定义函数，如果你能在控制台看到“我现在在使用Babel!”的打印文字，说明我们的Babel模块安装成功，可以开始使用ES6进行代码编写了。</p>
<p>loaders项里面表示用来加载这种类型的资源的loader，loader的使用可以参考 <a href="http://webpack.github.io/docs/using-loaders.html" rel="nofollow noreferrer" target="_blank">using loaders</a>，更多的loader可以参考 <a href="http://webpack.github.io/docs/list-of-loaders.html" rel="nofollow noreferrer" target="_blank">list of loaders</a>。</p>
<p>test，是一段正则，表示进行匹配的资源类型。</p>
<p>exclude为指定应该被忽略的文件，我们在这儿指定了/node_modules/。</p>
<p>query有2种写法，参见<a href="http://webpack.github.io/docs/using-loaders.html#query-parameters" rel="nofollow noreferrer" target="_blank">query-parameters</a>, 一种是直接以字符串形式跟在loader名后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader: 'babel-loader?presets[]=es2015" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">loader: 'babel-loader?presets<span class="hljs-string">[]</span>=es2015</code></pre>
<p>另一种如本文所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query: {
  presets: ['es2015']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">query</span>: {
  <span class="hljs-attribute">presets</span>: [<span class="hljs-string">'es2015'</span>]
}</code></pre>
<p>resolve.extensions 用于指明程序自动补全识别哪些后缀,<br>注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.</p>
<h3 id="articleHeader4">5.结合React</h3>
<p>前面我们已经对Webpack和Babel进行了配置并做了一些介绍，基本的环境已经搭建好了，现在我们开始在使用React。</p>
<p>终端输入以下代码对react和react-dom进行安装</p>
<blockquote><p>npm install react react-dom --save</p></blockquote>
<p>Babel针对React的所有的预设插件</p>
<blockquote><p>npm install babel-preset-react --save-dev</p></blockquote>
<p>由于我们增加了react的预设插件，所以需要对webpack.config.js进行修改。</p>
<p>将module -&gt; loaders下面的query修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="query: {
    presets: ['es2015','react']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">query</span>: {
    <span class="hljs-attribute">presets</span>: [<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'react'</span>]
}</code></pre>
<p>现在创建一个名为hello.js的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;

class Hello extends React.Component{
  render() {
    return (
      <div>
          Hello, World!
      </div>
    )
  }
}

export default Hello;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-string">"react"</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
          <span class="hljs-type">Hello</span>, <span class="hljs-type">World</span>!
      &lt;/div&gt;
    )
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Hello</span>;</code></pre>
<p>然后将app.js里面的文件修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom&quot;;
import Hello from &quot;./hello&quot;;

// var func = str => {
//   console.log(str);
// };
//
// func('我现在在使用Babel!');
// document.querySelector('#app').innerHTML = 'Hello World!';

ReactDOM.render(
  <Hello />,
  document.querySelector('#app')
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">"react"</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">"react-dom"</span>;
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">"./hello"</span>;

<span class="hljs-regexp">// var func = str =&gt; {
//</span>   <span class="hljs-built_in">console</span>.log(str);
<span class="hljs-regexp">// };
//</span>
<span class="hljs-regexp">// func('我现在在使用Babel!');
//</span> <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#app'</span>).innerHTML = <span class="hljs-string">'Hello World!'</span>;

ReactDOM.render(
  &lt;Hello /&gt;,
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#app'</span>)
);
</code></pre>
<p>如果你能在浏览器里面看到 "Hello, React!"，就说明我们已经将Webpack+Babel+React的环境搭建好了，接下来我们就可以此基础上来进行开发了。</p>
<p>出处:<a href="https://xiaoqing.org/webpack-babel-react/" rel="nofollow noreferrer" target="_blank">https://xiaoqing.org/webpack-...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解Webpack+Babel+React开发环境的搭建

## 原文链接
[https://segmentfault.com/a/1190000006053772](https://segmentfault.com/a/1190000006053772)

