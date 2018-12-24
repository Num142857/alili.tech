---
title: '[Webpack并不难]使用教程（一）--- entry，devtool，output，resolve' 
date: 2018-12-23 2:30:07
hidden: true
slug: nm7m0ed7iq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>Webpack</strong>是什么,我就不过多介绍了，大家都有耳闻，不过还是配张图让大家体会下。<br><span class="img-wrap"><img data-src="/img/bVZUAX?w=1366&amp;h=675" src="https://static.alili.tech/img/bVZUAX?w=1366&amp;h=675" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></blockquote>
<p><strong>我的webpack版本是 <em>3.10.0</em></strong></p>
<ul><li>安装Webpack可以全局安装和局部安装。局部安装的话就最好在安装的当前目录下运行，你硬要在在外部用webpack？那你在命令行要输入安装webpack位置的路径了。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save webpack // 这是局部安装
./node_modules/.bin/webpack --help // 局部安装的使用要带路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>npm install --<span class="hljs-keyword">save</span> webpack <span class="hljs-comment">// 这是局部安装</span>
./node_modules/.bin/webpack --<span class="hljs-keyword">help</span> <span class="hljs-comment">// 局部安装的使用要带路径</span></code></pre>
<p>哇，要写路径，好麻烦哦，没事，那就全局安装吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g webpack</code></pre>
<p>现在用webpack一般都写好配置文件的了，<code>webpack.config.js</code>，那么接下来就说这个配置文件主要怎样写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  devtool: '#eval-source-map', // 这个是打包的方式
  entry: './main.js',          // 入口文件。支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出，对象形式也一样。
  output: {                    
    path: './js',              // 打包后的文件存放位置
    publicPath: '/dist/',      // 这个下面详说
    filename: 'build.js'       // 打包后的文件名
  },
  resolve: {                   // 查找module的话从这里开始查找，下面详说。
    root: 'D:/webpack-test/src',
    extensions: ['.js', '.json', '.scss'],
    alias: {
        // 下面有例子。
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">module</span>.exports = {
  devtool: <span class="hljs-string">'#eval-source-map'</span>, <span class="hljs-comment">// 这个是打包的方式</span>
  entry: <span class="hljs-string">'./main.js'</span>,          <span class="hljs-comment">// 入口文件。支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出，对象形式也一样。</span>
  output: {                    
    path: <span class="hljs-string">'./js'</span>,              <span class="hljs-comment">// 打包后的文件存放位置</span>
    publicPath: <span class="hljs-string">'/dist/'</span>,      <span class="hljs-comment">// 这个下面详说</span>
    filename: <span class="hljs-string">'build.js'</span>       <span class="hljs-comment">// 打包后的文件名</span>
  },
  resolve: {                   <span class="hljs-comment">// 查找module的话从这里开始查找，下面详说。</span>
    root: <span class="hljs-string">'D:/webpack-test/src'</span>,
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.scss'</span>],
    <span class="hljs-keyword">alias</span>: {
        <span class="hljs-comment">// 下面有例子。</span>
    }
  }
};</code></pre>
<h3 id="articleHeader0">
<strong>devtool</strong>：打包方式。（<a href="http://webpack.github.io/docs/configuration.html#devtool" rel="nofollow noreferrer" target="_blank">官网的文档</a>）</h3>
<table>
<thead><tr>
<th>devtool选项</th>
<th>打包速度</th>
<th>重建速度</th>
<th>是否支持生产模式</th>
</tr></thead>
<tbody>
<tr>
<td>source-map</td>
<td>-</td>
<td>-</td>
<td>支持</td>
</tr>
<tr>
<td>eval-source-map</td>
<td>-</td>
<td>+</td>
<td>不支持</td>
</tr>
<tr>
<td>cheap-module-source-map</td>
<td>0</td>
<td>-</td>
<td>支持</td>
</tr>
<tr>
<td>cheap-module-eval-source-map</td>
<td>0</td>
<td>++</td>
<td>不支持</td>
</tr>
<tr>
<td>cheap-source-map</td>
<td>+</td>
<td>0</td>
<td>支持</td>
</tr>
<tr>
<td>cheap-eval-source-map</td>
<td>+</td>
<td>++</td>
<td>不支持</td>
</tr>
<tr>
<td>eval</td>
<td>+++</td>
<td>+++</td>
<td>不支持</td>
</tr>
</tbody>
</table>
<p>从上到下,打包速度越来越快，开发环境一般用<code>eval-source-map</code>，生产环境自行斟酌咯。毕竟打包越快，打包质量也就越差。还有，不知大家发现没，带<code>eval</code>都不支持生产模式哦。</p>
<h3 id="articleHeader1">
<strong>publicPath</strong> （<a href="http://webpack.github.io/docs/configuration.html#output-publicpath" rel="nofollow noreferrer" target="_blank">官网的文档</a>）</h3>
<p><em>它被用来更新内嵌到css、html文件里的url值。</em>  </p>
<p>上面<code> publicPath: '/dist/' </code>,例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background-image:url('./test.png) // 路径变为'/dist/.test.png'
path: '/js' // 上面打包后的文件位置，那么路径变为'/dist/js/build.js'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">background-image</span>:url(<span class="hljs-string">'./test.png</span>) <span class="hljs-comment">// 路径变为'/dist/.test.png'</span>
<span class="hljs-attribute">path</span>: <span class="hljs-string">'/js'</span> <span class="hljs-comment">// 上面打包后的文件位置，那么路径变为'/dist/js/build.js'</span>
</code></pre>
<p><strong>pubilcPath</strong>很重要。在生产模式下如“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu（一个支持多种编程语言的云平台）上边的。一张图片，手动修改下咯，那如果你网站有上百张呢，那<code>publicPath：'你服务器的ip地址'</code>，这样省事很多吧。</p>
<h3 id="articleHeader2">
<strong>resolve</strong> （<a href="http://webpack.github.io/docs/configuration.html#resolve" rel="nofollow noreferrer" target="_blank">官网的文档</a>）</h3>
<ol>
<li>
<strong><em>root</em></strong>：包含您的模块的目录（绝对路径）。</li>
<li>
<strong><em>extensions</em></strong>： 加载模块时可忽略的扩展名。</li>
<li>
<p><strong><em>alias</em></strong>：模块别名定义。举些例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'Abc': '/js/x/y/z/abc.js'  
// require('Abc'); 相当于 require('/js/x/y/z/abc.js')
// 如果 require('Abc/index.js'), 这样不行的。

'Abc': './js/x/y/z/abc.js' 
// 如果该值是一个相对路径，它将相对于包含require的文件。
// 例如：在test.js中require('Abc'), 那么test.js和abc.js要在同目录下的。  
  
'Abc': '/js/store'
// require('Abc') 就相当于 require('/js/store/index.js')
// require('Abc/other.js') 就相当于 require('/js/store/other.js')
  
'Abc$': '/js/store'
// require('Abc') 就相当于 require('/js/store/index.js')
// 后面带有 $ ,意味着要完全匹配 'Abc'
// 如果 require('Abc/other.js')，因为没完全匹配Abc，那么加载的是 node_modules下Abc文件夹里的other.js！！！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-string">'Abc'</span>: <span class="hljs-string">'/js/x/y/z/abc.js'</span>  
<span class="hljs-regexp">//</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc'</span>); 相当于 <span class="hljs-built_in">require</span>(<span class="hljs-string">'/js/x/y/z/abc.js'</span>)
<span class="hljs-regexp">//</span> 如果 <span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc/index.js'</span>), 这样不行的。

<span class="hljs-string">'Abc'</span>: <span class="hljs-string">'./js/x/y/z/abc.js'</span> 
<span class="hljs-regexp">//</span> 如果该值是一个相对路径，它将相对于包含<span class="hljs-built_in">require</span>的文件。
<span class="hljs-regexp">//</span> 例如：在test.js中<span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc'</span>), 那么test.js和abc.js要在同目录下的。  
  
<span class="hljs-string">'Abc'</span>: <span class="hljs-string">'/js/store'</span>
<span class="hljs-regexp">//</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc'</span>) 就相当于 <span class="hljs-built_in">require</span>(<span class="hljs-string">'/js/store/index.js'</span>)
<span class="hljs-regexp">//</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc/other.js'</span>) 就相当于 <span class="hljs-built_in">require</span>(<span class="hljs-string">'/js/store/other.js'</span>)
  
<span class="hljs-string">'Abc$'</span>: <span class="hljs-string">'/js/store'</span>
<span class="hljs-regexp">//</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc'</span>) 就相当于 <span class="hljs-built_in">require</span>(<span class="hljs-string">'/js/store/index.js'</span>)
<span class="hljs-regexp">//</span> 后面带有 $ ,意味着要完全匹配 <span class="hljs-string">'Abc'</span>
<span class="hljs-regexp">//</span> 如果 <span class="hljs-built_in">require</span>(<span class="hljs-string">'Abc/other.js'</span>)，因为没完全匹配Abc，那么加载的是 node_modules下Abc文件夹里的other.js！！！</code></pre>
</li>
</ol>
<hr>
<h4><a href="https://segmentfault.com/a/1190000012351195">使用教程（二）--- module.loaders</a></h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[Webpack并不难]使用教程（一）--- entry，devtool，output，resolve

## 原文链接
[https://segmentfault.com/a/1190000012334562](https://segmentfault.com/a/1190000012334562)

