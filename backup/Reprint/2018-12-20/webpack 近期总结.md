---
title: 'webpack 近期总结' 
date: 2018-12-20 2:30:10
hidden: true
slug: 1rijiasj78ah
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack 近期总结</h1>
<p>webpack 是一个前端常用的模块化打包工具，它的作用就是将 JavaScript 代码或者其他静态文件进行分析、压缩，最终合并打包成浏览器可以识别的代码。关于<code>模块化</code>，拿 ES6 module 来说，可以通过 export 导出，import 导入的代码块或者静态资源都可以成为模块。从入口文件开始，webpack 会通过递归的方式将应用程序所依赖的模块进行打包成一个或者多个 bundle。</p>
<h2 id="articleHeader1">webpack2 基本配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let option = {
  entry: ‘.／index.js’,     // 来指定一个入口起点（或多个入口起点），是打包的开始文件
  output: {                      // 告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。
    path: path.resolve('./web'),  // 输出的文件路径
    filename: 'build/js/[name].bundle.js',   // 打包后的文件名称，此时的名称是入口文件的名称
  },
  module: {
    rules: [{
        test: /\.vue$/,       //识别出应该被对应的 loader 进行转换的 vue 文件。
        loader: 'vue-loader',  //转换 vue 文件，从而使其能够被添加到依赖图中（并且最终添加到 bundle 中）
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,    // 排除 node_modules ,不转译 node_modules 文件夹
        options: {
          presets: ['es2015'],
          cacheDirectory: true  //将 babel-loader 提速至少两倍。 这会将转译的结果缓存到文件系统中。loader 将使用默认的缓存目录 node_modules/.cache/babel-loader
        }
      }, 
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'  //链式loaders ,可将相关正则匹配到的文件资源数据在几个loader之间进行共享传递
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',  
          outputPath: 'build/img/'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        loader: 'file-loader?name=build/img/[name].[hash:6].[ext]' // 将图片命名为 基本名称 + 哈希值 + 扩展名 格式并指定到 build/img 目录下
      } 
    ]
  },
  resolve: {   //设置模块如何被解析
    extensions: ['.js', '.vue', '.css'],   //自动解析确定的扩展,能够使用户在引入模块时不带扩展名
    alias: {    // 设置模块别名,便于我们更方便通过import 或 require 引用
      'vue': 'vue/dist/vue.js'
    }
   },
    plugins: [   // webpack 插件列表
      new HtmlWebpackPlugin({template: './src/index.html'})
 ]
}
 module.exports = option

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> option = {
  entry: ‘.／index.js’,     <span class="hljs-comment">// 来指定一个入口起点（或多个入口起点），是打包的开始文件</span>
  output: {                      <span class="hljs-comment">// 告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。</span>
    path: path.resolve(<span class="hljs-string">'./web'</span>),  <span class="hljs-comment">// 输出的文件路径</span>
    filename: <span class="hljs-string">'build/js/[name].bundle.js'</span>,   <span class="hljs-comment">// 打包后的文件名称，此时的名称是入口文件的名称</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [{
        test: <span class="hljs-regexp">/\.vue$/</span>,       <span class="hljs-comment">//识别出应该被对应的 loader 进行转换的 vue 文件。</span>
        loader: <span class="hljs-string">'vue-loader'</span>,  <span class="hljs-comment">//转换 vue 文件，从而使其能够被添加到依赖图中（并且最终添加到 bundle 中）</span>
      },
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        loader: <span class="hljs-string">'babel-loader'</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,    <span class="hljs-comment">// 排除 node_modules ,不转译 node_modules 文件夹</span>
        options: {
          presets: [<span class="hljs-string">'es2015'</span>],
          cacheDirectory: <span class="hljs-literal">true</span>  <span class="hljs-comment">//将 babel-loader 提速至少两倍。 这会将转译的结果缓存到文件系统中。loader 将使用默认的缓存目录 node_modules/.cache/babel-loader</span>
        }
      }, 
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        loader: <span class="hljs-string">'style-loader!css-loader'</span>  <span class="hljs-comment">//链式loaders ,可将相关正则匹配到的文件资源数据在几个loader之间进行共享传递</span>
      },
      {
        test: <span class="hljs-regexp">/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/</span>,
        loader: <span class="hljs-string">'file-loader'</span>,
        options: {
          name: <span class="hljs-string">'[name].[ext]?[hash]'</span>,  
          outputPath: <span class="hljs-string">'build/img/'</span>
        }
      },
      {
        test: <span class="hljs-regexp">/\.(png|jpg|gif|svg|jpeg)$/</span>,
        loader: <span class="hljs-string">'file-loader?name=build/img/[name].[hash:6].[ext]'</span> <span class="hljs-comment">// 将图片命名为 基本名称 + 哈希值 + 扩展名 格式并指定到 build/img 目录下</span>
      } 
    ]
  },
  resolve: {   <span class="hljs-comment">//设置模块如何被解析</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.css'</span>],   <span class="hljs-comment">//自动解析确定的扩展,能够使用户在引入模块时不带扩展名</span>
    alias: {    <span class="hljs-comment">// 设置模块别名,便于我们更方便通过import 或 require 引用</span>
      <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
    }
   },
    plugins: [   <span class="hljs-comment">// webpack 插件列表</span>
      <span class="hljs-keyword">new</span> HtmlWebpackPlugin({template: <span class="hljs-string">'./src/index.html'</span>})
 ]
}
 <span class="hljs-built_in">module</span>.exports = option

</code></pre>
<p><strong>补充:</strong></p>
<p><code>css-loader</code>: 能够通过类似 @import 和 url（...）的方式，在 js 文件中实现通过 require 或者 import 引入 css 文件。</p>
<p><code>style-loader</code>: 将模块的导出作为样式添加到 DOM 中，通常与 css-loader 配合使用。</p>
<p><code>file-loader</code>: 指示webpack将所需的对象作为文件发送并返回其公用URL</p>
<p><code> url-loader </code>: url-loader 封装了 file-loader,url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 将图片复制到指定路径。</p>
<h2 id="articleHeader2">常用插件</h2>
<h3 id="articleHeader3"><a href="https://segmentfault.com/a/1190000008590102">html-webpack-plugin</a></h3>
<p>在打包的路径下自动生成一个 html 文件，并且自动引入 bundle.js 文件和 css 文件</p>
<h3 id="articleHeader4"><a href="https://www.cnblogs.com/sloong/p/5826818.html" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a></h3>
<p>抽离 css 到一个指定的 css 文件中，并打包到指定的目录下</p>
<h2 id="articleHeader5">常见问题</h2>
<h3 id="articleHeader6">devServer</h3>
<p>使用webpack构建本地服务器,首先需要安装 webpack-dev-server，webpack-dev-server 是一个小型的 NodeJS Express 服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    devServer: {
        historyApiFallback: true,  //不跳转
        noInfo: true,    //启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        proxy: [{       // 跨越,代理http://127.0.0.1:9000 下的/api路径
          context: ['/api'],
          target: 'http://127.0.0.1:9000',
          changeOrigin: true,  //代理服务器会在请求头中加入相应Host首部，然后目标服务器就可以根据这个首部来区别要访问的站点了
          secure: false. // 可以运行在 HTTPS 上
        }]
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">    devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>  <span class="hljs-string">//不跳转</span>
<span class="hljs-attr">        noInfo:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>    <span class="hljs-string">//启用</span> <span class="hljs-string">noInfo</span> <span class="hljs-string">后，诸如「启动时和每次保存之后，那些显示的</span> <span class="hljs-string">webpack</span> <span class="hljs-string">包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。</span>
<span class="hljs-attr">        proxy:</span> <span class="hljs-string">[{</span>       <span class="hljs-string">//</span> <span class="hljs-string">跨越,代理http://127.0.0.1:9000</span> <span class="hljs-string">下的/api路径</span>
<span class="hljs-attr">          context:</span> <span class="hljs-string">['/api'],</span>
<span class="hljs-attr">          target:</span> <span class="hljs-string">'http://127.0.0.1:9000'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          changeOrigin:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>  <span class="hljs-string">//代理服务器会在请求头中加入相应Host首部，然后目标服务器就可以根据这个首部来区别要访问的站点了</span>
<span class="hljs-attr">          secure:</span> <span class="hljs-literal">false</span>. <span class="hljs-string">//</span> <span class="hljs-string">可以运行在</span> <span class="hljs-string">HTTPS</span> <span class="hljs-string">上</span>
        <span class="hljs-string">}]</span>
      <span class="hljs-string">}</span></code></pre>
<h3 id="articleHeader7">webpack 图片的路径与打包</h3>
<p>output.publicPath 表示资源的发布地址，当配置过该属性后，打包文件中所有通过相对路径引用的资源都会被配置的路径所替换。</p>
<p>问题：    vue + webpack 如果使用固定的 src 可以显示图片 ，但是图片路径使用变量，可以显示标题，无法显示图片？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div>
    <div v-for=&quot;item in pictures&quot;>
      <img :src=&quot;item.src&quot; /> 
      <p>"{{"item.title"}}"</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pictures:[
        {
          title:'标题1',
          src: '../assets/bg1.png',
        },
        {
          title:'标题2',
          src: '../assets/bg2.png'
        },
        {
          title:'标题3',
          src: '../assets/bg3.png'
        }
      ]
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in pictures"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.src"</span> /&gt;</span> 
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data(){
    <span class="hljs-keyword">return</span>{
      <span class="hljs-attr">pictures</span>:[
        {
          <span class="hljs-attr">title</span>:<span class="hljs-string">'标题1'</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'../assets/bg1.png'</span>,
        },
        {
          <span class="hljs-attr">title</span>:<span class="hljs-string">'标题2'</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'../assets/bg2.png'</span>
        },
        {
          <span class="hljs-attr">title</span>:<span class="hljs-string">'标题3'</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'../assets/bg3.png'</span>
        }
      ]
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. express 的 static 提供静态资源服务
2.  pictures:[{title:'标题1',src: require('../assets/bg1.png')}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-number">1.</span> express 的 <span class="hljs-keyword">static</span> 提供静态资源服务
<span class="hljs-number">2.</span>  <span class="hljs-string">pictures:</span>[{<span class="hljs-string">title:</span><span class="hljs-string">'标题1'</span>,<span class="hljs-string">src:</span> require(<span class="hljs-string">'../assets/bg1.png'</span>)}</code></pre>
<p>问题：vue-cli 中解决项目打包后找不到背景图片的问题<br>解决方法： 找到 build/util.js 文件中<code>ExtractTextPlugin</code>的css路径，手动添加 <code>publicPath</code> 参数， 重新build.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    if (options.extract) {
          return ExtractTextPlugin.extract({
            use: loaders,
            publicPath: '../../',
            fallback: 'vue-style-loader'
          })
        } else {
          return ['vue-style-loader'].concat(loaders)
        }
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-keyword">if</span> (options.extract) {
          <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
            use: loaders,
            publicPath: <span class="hljs-string">'../../'</span>,
            fallback: <span class="hljs-string">'vue-style-loader'</span>
          })
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
        }
   </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 近期总结

## 原文链接
[https://segmentfault.com/a/1190000012625058](https://segmentfault.com/a/1190000012625058)

