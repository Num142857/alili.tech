---
title: 'webpack从零开始第6课:在Vue开发中使用webpack' 
date: 2018-12-21 2:30:11
hidden: true
slug: b8pd05x3ivc
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>webpack目录</strong></p>
<ul>
<li><a href="https://segmentfault.com/a/1190000012536871">第1课:  安装webpack和webpack-dev-server</a></li>
<li><a href="https://segmentfault.com/a/1190000012536917" target="_blank">第2课:  配置文件 </a></li>
<li><a href="https://segmentfault.com/a/1190000012560205">第3课:  做为node的一个模块来使用</a></li>
<li><a href="https://segmentfault.com/a/1190000012541460" target="_blank">第4课:  插件篇</a></li>
<li><a href="https://segmentfault.com/a/1190000012552628">第5课:  模块篇</a></li>
<li><a href="https://segmentfault.com/a/1190000012560228" target="_blank"><strong>第6课:  在Vue开发中使用webpack</strong></a></li>
</ul>
<hr>
<p><strong>本文参考文档</strong><br><a href="https://cn.vuejs.org/index.html" rel="nofollow noreferrer" target="_blank">vue</a>&nbsp;&nbsp;&nbsp;<a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vuex</a>&nbsp;&nbsp;&nbsp;<a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router</a>&nbsp;&nbsp;&nbsp;<a href="https://vue-loader.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-loader</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/vuejs/awesome-vue" rel="nofollow noreferrer" target="_blank">awesome-vue精彩的vue</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a></p>
<p><strong>写在前面</strong><br>vue官方已经写好一个vue-webpack模板vue_cli，原本自己写一个，发现官方写得已经够好了，自己写显得有点多余，但为了让大家熟悉webpack，决定还是一步一步从0开始写，但源文件就直接拷贝官方的</p>
<p><strong>准备工作</strong></p>
<ol>
<li>新建文件夹<code>D:\03www2018\study\vue2017</code>，下面<code>根目录</code>指的就是这个目录</li>
<li>生成package.json， <code>根目录&gt;cnpm init</code>
</li>
<li>安装webpack和webpack开发服务器， <code>根目录&gt;cnpm i -D webpack webpack-dev-server</code>
</li>
<li>安装vue、vuex、vue-router，<code>根目录&gt;cnpm i -S vue vuex vue-router</code>
</li>
<li>下载vue_cli的webpack模板中src这个<a href="https://github.com/vuejs-templates/webpack/tree/develop/template" rel="nofollow noreferrer" target="_blank">源文件夹</a>到<code>根目录\src</code>中</li>
<li>
<p>常用必装loader, <code>根目录&gt;cnpm i -D xxxxx</code></p>
<ul>
<li>eslint-loader + eslint 代码规范</li>
<li>babel-core babel核心</li>
<li>babel-preset-env</li>
<li>babel-preset-stage-0</li>
<li>babel-loader</li>
<li>less + less-loader或其它css预处理器，如sass+sass-loader</li>
<li>css-loader  导入css文件</li>
<li>style-loader  将css文件注入到style标签中</li>
<li>postcss-loader</li>
<li>html-loader</li>
<li>url-loader + file-loader 处理图片/音频视频/字体，不建议单独使用file-loader</li>
<li>vue-loader + css-loader + vue-template-compiler  导入vue组件</li>
</ul>
</li>
<li>
<p>常用必装plugin,第三方插件安装<code>cnpm i -D xxx-webpack-plugin</code></p>
<ul>
<li>html-webpack-plugin</li>
<li>extract-text-webpack-plugin</li>
</ul>
</li>
<li>
<p>webpack和webpack-dev-server配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 根目录>build/webpack.base.conf.js
module.exports = {
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  // 第一部分: 文件的输入和输出
  context: path.resolve(__dirname, '../src'),
  entry: './main',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './app.js' // dist文件夹不存在时，会自动创建
  },
  // 第二部分: 效率方面
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  },
  // 第三部分：处理不同的模块类型,分js+vue|react类，图片,样式，音频视频，字体几大块
  module: {
    rules: [
      // 01----js部分
      // eslint规范代码
      // babel实现js兼容，以便浏览器识别
      // 识别vue组件
      {
        test: /\.js$/, // 对js文件使用eslint来检查代码的规范
        loader: 'eslint-loader',
        enforce: 'pre', // 但为了保险，建议单独给eslint-loader指定pre值，有关loader的优先级，参考https://webpack.js.org/configuration/module/#rule-enforce
        include: [path.resolve('src')], // 只有些目录下的js文件才使用eslint-loader
        options: {}
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {}
      },
      // 02----图片部分
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          outputPath: 'static/',
          name: 'img/[name].[hash:7].[ext]' //最后生成的图片完整路径是 output.path+ outputPath+name
        }
      },
      // 03----样式处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
      // 04----音频视频

      // 05----字体
    ]
  },
  // 第四部分：插件，功能很多
  plugins: [
    // 01----生产首页
    new HtmlWebpackPlugin({
      title: 'hello,零和壹在线课堂', // html5文件中<title>部分
      filename: 'index.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
      // 也是 context+template是最后模板的完整路径，./不能少
      template: './index.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
      inject: 'body' // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js

    }),
    new ExtractTextPlugin('styles.css')
  ],
  // 第五部分: 服务器的配置
  devServer: {
    contentBase: path.join(__dirname, &quot;../dist&quot;), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    port: 9000, //端口改为9000
    open: true
  }
}

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 根目录&gt;build/webpack.base.conf.js</span>
<span class="hljs-built_in">module</span>.exports = {
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 第一部分: 文件的输入和输出</span>
  context: path.resolve(__dirname, <span class="hljs-string">'../src'</span>),
  entry: <span class="hljs-string">'./main'</span>,
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    filename: <span class="hljs-string">'./app.js'</span> <span class="hljs-comment">// dist文件夹不存在时，会自动创建</span>
  },
  <span class="hljs-comment">// 第二部分: 效率方面</span>
  resolve: {
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: path.resolve(<span class="hljs-string">'src'</span>)
    }
  },
  <span class="hljs-comment">// 第三部分：处理不同的模块类型,分js+vue|react类，图片,样式，音频视频，字体几大块</span>
  <span class="hljs-keyword">module</span>: {
    rules: [
      <span class="hljs-comment">// 01----js部分</span>
      <span class="hljs-comment">// eslint规范代码</span>
      <span class="hljs-comment">// babel实现js兼容，以便浏览器识别</span>
      <span class="hljs-comment">// 识别vue组件</span>
      {
        test: <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-comment">// 对js文件使用eslint来检查代码的规范</span>
        loader: <span class="hljs-string">'eslint-loader'</span>,
        enforce: <span class="hljs-string">'pre'</span>, <span class="hljs-comment">// 但为了保险，建议单独给eslint-loader指定pre值，有关loader的优先级，参考https://webpack.js.org/configuration/module/#rule-enforce</span>
        include: [path.resolve(<span class="hljs-string">'src'</span>)], <span class="hljs-comment">// 只有些目录下的js文件才使用eslint-loader</span>
        options: {}
      },
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>,
        options: {}
      },
      <span class="hljs-comment">// 02----图片部分</span>
      {
        test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10</span>,
          outputPath: <span class="hljs-string">'static/'</span>,
          name: <span class="hljs-string">'img/[name].[hash:7].[ext]'</span> <span class="hljs-comment">//最后生成的图片完整路径是 output.path+ outputPath+name</span>
        }
      },
      <span class="hljs-comment">// 03----样式处理</span>
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: ExtractTextPlugin.extract({
          fallback: <span class="hljs-string">'style-loader'</span>,
          use: <span class="hljs-string">'css-loader'</span>
        })
      }
      <span class="hljs-comment">// 04----音频视频</span>

      <span class="hljs-comment">// 05----字体</span>
    ]
  },
  <span class="hljs-comment">// 第四部分：插件，功能很多</span>
  plugins: [
    <span class="hljs-comment">// 01----生产首页</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      title: <span class="hljs-string">'hello,零和壹在线课堂'</span>, <span class="hljs-comment">// html5文件中&lt;title&gt;部分</span>
      filename: <span class="hljs-string">'index.html'</span>, <span class="hljs-comment">// 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样</span>
      <span class="hljs-comment">// 也是 context+template是最后模板的完整路径，./不能少</span>
      template: <span class="hljs-string">'./index.html'</span>, <span class="hljs-comment">// 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处</span>
      inject: <span class="hljs-string">'body'</span> <span class="hljs-comment">// true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js</span>

    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'styles.css'</span>)
  ],
  <span class="hljs-comment">// 第五部分: 服务器的配置</span>
  devServer: {
    contentBase: path.join(__dirname, <span class="hljs-string">"../dist"</span>), <span class="hljs-comment">//网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误</span>
    port: <span class="hljs-number">9000</span>, <span class="hljs-comment">//端口改为9000</span>
    open: <span class="hljs-literal">true</span>
  }
}

}</code></pre>
</li>
<li>
<p>package.json配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
 &quot;name&quot;: &quot;vue2017&quot;,
 &quot;version&quot;: &quot;1.0.0&quot;,
 &quot;description&quot;: &quot;&quot;,
 &quot;main&quot;: &quot;index.js&quot;,
 &quot;scripts&quot;: {
&quot;a&quot;: &quot;webpack --config ./build/webpack.base.conf.js&quot;,
&quot;b&quot;: &quot;webpack-dev-server --config ./build/webpack.base.conf.js&quot;,
&quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
 },
 &quot;author&quot;: &quot;&quot;,
 &quot;license&quot;: &quot;ISC&quot;,
 &quot;devDependencies&quot;: {
&quot;eslint&quot;: &quot;^4.14.0&quot;,
&quot;eslint-loader&quot;: &quot;^1.9.0&quot;,
&quot;webpack&quot;: &quot;^3.10.0&quot;,
&quot;webpack-dev-server&quot;: &quot;^2.9.7&quot;
 },
 &quot;dependencies&quot;: {
&quot;vue&quot;: &quot;^2.5.13&quot;,
&quot;vue-router&quot;: &quot;^3.0.1&quot;,
&quot;vuex&quot;: &quot;^3.0.1&quot;
 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
 <span class="hljs-attr">"name"</span>: <span class="hljs-string">"vue2017"</span>,
 <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
 <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
 <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
 <span class="hljs-attr">"scripts"</span>: {
<span class="hljs-attr">"a"</span>: <span class="hljs-string">"webpack --config ./build/webpack.base.conf.js"</span>,
<span class="hljs-attr">"b"</span>: <span class="hljs-string">"webpack-dev-server --config ./build/webpack.base.conf.js"</span>,
<span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
 },
 <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
 <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
 <span class="hljs-attr">"devDependencies"</span>: {
<span class="hljs-attr">"eslint"</span>: <span class="hljs-string">"^4.14.0"</span>,
<span class="hljs-attr">"eslint-loader"</span>: <span class="hljs-string">"^1.9.0"</span>,
<span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.10.0"</span>,
<span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.9.7"</span>
 },
 <span class="hljs-attr">"dependencies"</span>: {
<span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.5.13"</span>,
<span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^3.0.1"</span>,
<span class="hljs-attr">"vuex"</span>: <span class="hljs-string">"^3.0.1"</span>
 }
}</code></pre>
</li>
<li>
<p>.eslintrc.js配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// cnpm i -D eslint-plugin-html
// cnpm i -D babel-eslint
// cnpm i -D eslint-config-standard (依赖 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard)
module.exports = {
  root: true,
  parser: 'babel-eslint', // 默认的解析器为espree,这里指定为 babel-eslint，参考 https://github.com/babel/babel-eslint
  parserOptions: { // 解析器的选项，默认支持  ECMAScript 5
    sourceType: 'module'
  },
  env: {
    browser: true, // 环境定义为浏览器
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  plugins: [ //第3方插件 eslint-plugin-html，
    'html'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> cnpm i -D eslint-plugin-html
<span class="hljs-regexp">//</span> cnpm i -D babel-eslint
<span class="hljs-regexp">//</span> cnpm i -D eslint-config-standard (依赖 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard)
module.exports = {
  root: true,
  parser: <span class="hljs-string">'babel-eslint'</span>, <span class="hljs-regexp">//</span> 默认的解析器为espree,这里指定为 babel-eslint，参考 https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/babel/</span>babel-eslint
  parserOptions: { <span class="hljs-regexp">//</span> 解析器的选项，默认支持  ECMAScript <span class="hljs-number">5</span>
    sourceType: <span class="hljs-string">'module'</span>
  },
  env: {
    browser: true, <span class="hljs-regexp">//</span> 环境定义为浏览器
  },
  <span class="hljs-regexp">//</span> https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/standard/</span>standard<span class="hljs-regexp">/blob/m</span>aster<span class="hljs-regexp">/docs/</span>RULES-en.md
  extends: <span class="hljs-string">'standard'</span>,
  plugins: [ <span class="hljs-regexp">//</span>第<span class="hljs-number">3</span>方插件 eslint-plugin-html，
    <span class="hljs-string">'html'</span>
  ],
  rules: {
    <span class="hljs-string">'generator-star-spacing'</span>: <span class="hljs-string">'off'</span>,
    <span class="hljs-string">'no-debugger'</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? <span class="hljs-string">'error'</span> : <span class="hljs-string">'off'</span>
  }
 }</code></pre>
</li>
</ol>
<p>安装vue<br><code>D:\03www2018\study\webpack2018&gt;cnpm i vue -S</code></p>
<p>如果有下面的报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

(found in <Root>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>[Vue warn]: You are using the runtime-only <span class="hljs-keyword">build</span> of Vue <span class="hljs-keyword">where</span> the template compiler <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> available. Either pre-compile the templates <span class="hljs-keyword">into</span> render functions, <span class="hljs-keyword">or</span> <span class="hljs-keyword">use</span> the compiler-included <span class="hljs-keyword">build</span>.

(found <span class="hljs-keyword">in</span> &lt;Root&gt;)</code></pre>
<blockquote>解释: 运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数<br>修改 D:/03www2018/study/webpack2018/build/webpackfile.js</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">resolve</span>: {
        <span class="hljs-attribute">alias</span>: {
            <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
        }
    },</code></pre>
<p>最简单的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\03www2018\study\webpack2018\today\wang\home.js
import Vue from 'vue';
const app = new Vue({
  template: '<div>hello wolr</div>'
}).$mount('#main')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>D:\<span class="hljs-number">03</span>www2018\study\webpack2018\today\wang\<span class="hljs-built_in">home</span>.js
<span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;hello wolr&lt;/div&gt;'</span>
}).$mount(<span class="hljs-string">'#main'</span>)
</code></pre>
<h1 id="articleHeader0">导入第一个vue组件</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// D:\03www2018\study\webpack2018\today\wang\home.js
import App from &quot;./app.vue&quot;
import Vue from 'vue';
const app = new Vue({
  template: '<App />',
  components:{App}
}).$mount('#main')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// D:\03www2018\study\webpack2018\today\wang\home.js</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">"./app.vue"</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App /&gt;'</span>,
  <span class="hljs-attr">components</span>:{App}
}).$mount(<span class="hljs-string">'#main'</span>)
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// D:\03www2018\study\webpack2018\today\wang\App.vue 
<template>
<div>上午好</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>// D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018<span class="hljs-symbol">\t</span>oday<span class="hljs-symbol">\w</span>ang<span class="hljs-symbol">\A</span>pp.vue 
&lt;template&gt;
&lt;div&gt;上午好&lt;/div&gt;
&lt;/template&gt;</code></pre>
<p>报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught Error: Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>Uncaught <span class="hljs-keyword">Error</span>: Module <span class="hljs-keyword">parse</span> failed: Unexpected <span class="hljs-keyword">token</span> (1:0)
You may need <span class="hljs-keyword">an</span> appropriate loader to handle this <span class="hljs-keyword">file</span> <span class="hljs-keyword">type</span>.</code></pre>
<p>安装并配置 vue-loader</p>
<blockquote>官方文档 <a href="https://vue-loader.vuejs.org/zh-cn/options.html#loaders" rel="nofollow noreferrer" target="_blank">https://vue-loader.vuejs.org/...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\03www2018\study\webpack2018>cnpm i vue-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018&gt;cnpm i vue-loader -D</code></pre>
<p>提示要安装css-loader和vue-template-compiler，现在将这两个也一起安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\03www2018\study\webpack2018>cnpm i css-loader vue-template-compiler -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018&gt;cnpm i css-loader vue-template-compiler -D</code></pre>
<p>现在就可以正常显示vue组件</p>
<h1 id="articleHeader1">处理css文件</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// D:\03www2018\study\webpack2018\today\wang\app.css
body{
    color:#09f;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>// D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018<span class="hljs-symbol">\t</span>oday<span class="hljs-symbol">\w</span>ang<span class="hljs-symbol">\a</span>pp.css
body{
    color:#09f;
}</code></pre>
<p>处理单独的css文件<br>没有装css-loader会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ERROR in ./today/wang/app.css
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code><span class="hljs-keyword">ERROR </span>in ./today/wang/app.css
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.</code></pre>
<p>安装和配置</p>
<blockquote>官方文档: <a href="https://webpack.js.org/loaders/css-loader/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/loader...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\03www2018\study\webpack2018>cnpm i -D css-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018&gt;cnpm i -D css-loader</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    loader: 'css-loader', 
}, " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.css$/,
    loader: <span class="hljs-string">'css-loader'</span>, 
}, </code></pre>
<p>对上面导入的css一般有两种处理，一是使用style-loader将css嵌入到html文件的style标签中，一种是单独存在一个文件中</p>
<p>style-loader</p>
<blockquote>官方文档: <a href="https://webpack.js.org/loaders/style-loader/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/loader...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\03www2018\study\webpack2018>cnpm i style-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018&gt;cnpm i style-loader -D</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    loader: 'style-loader!css-loader', 
}, " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.css$/,
    loader: <span class="hljs-string">'style-loader!css-loader'</span>, 
}, </code></pre>
<p>多个loader是从右到左执行，多个loader之间用!连接，上面多个loader也可以写在数组的形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    use: [
        { loader: &quot;style-loader&quot; },
        { loader: &quot;css-loader&quot; }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.css$/,
    use: [
        { loader: <span class="hljs-string">"style-loader"</span> },
        { <span class="hljs-attribute">loader</span>: <span class="hljs-string">"css-loader"</span> }
    ]
}</code></pre>
<p>这种写法是，从下到上执行，先执行css-loader再执行style-loader</p>
<p>将css文件单独打包到一个文件<br>这要使用到ExtractTextWebpackPlugin插件</p>
<h1 id="articleHeader2">处理less/sass等文件</h1>
<p>这要用到less-loader或sass-loader，同时得安装less或sass，如果没安装会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" [Vue warn]: Error in beforeCreate hook: &quot;Error: Cannot find module &quot;!!vue-loader/node_modules/vue-style-loader!css-loader!../../node_modules/_vue-loader@13.6.0@vue-loader/lib/style-compiler/index?{&quot;vue&quot;:true,&quot;id&quot;:&quot;data-v-381730fa&quot;,&quot;scoped&quot;:false,&quot;hasInlineConfig&quot;:false}!less-loader!../../node_modules/_vue-loader@13.6.0@vue-loader/lib/selector?type=styles&amp;index=0&amp;bustCache!./app.vue&quot;&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code> [Vue warn]: Error in beforeCreate hook: <span class="hljs-string">"Error: Cannot find module "</span>!<span class="hljs-title">!vue-loader</span>/node_modules/vue-style-loader<span class="hljs-title">!css-loader</span><span class="hljs-title">!..</span>/../node_modules/_vue-loader<span class="hljs-title">@13</span>.<span class="hljs-number">6.0</span><span class="hljs-title">@vue-loader</span>/lib/style-compiler/index?{<span class="hljs-string">"vue"</span>:<span class="hljs-keyword">true</span>,<span class="hljs-string">"id"</span>:<span class="hljs-string">"data-v-381730fa"</span>,<span class="hljs-string">"scoped"</span>:<span class="hljs-keyword">false</span>,<span class="hljs-string">"hasInlineConfig"</span>:<span class="hljs-keyword">false</span>}<span class="hljs-title">!less-loader</span><span class="hljs-title">!..</span>/../node_modules/_vue-loader<span class="hljs-title">@13</span>.<span class="hljs-number">6.0</span><span class="hljs-title">@vue-loader</span>/lib/selector?<span class="hljs-keyword">type</span>=styles&amp;index=<span class="hljs-number">0</span>&amp;bustCache<span class="hljs-title">!.</span>/app.vue<span class="hljs-string">""</span>
</code></pre>
<p>ave组件的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class='morning'>上午好</div>
</template>
<style lang='less'>
    @color:#f96;
    .morning{
        color:@color
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'morning'</span>&gt;</span>上午好<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'less'</span>&gt;</span><span class="undefined">
    @color:#f96;
    .morning</span></span><span class="hljs-template-variable">{
        color:@color
    }</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>安装less和less-loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="D:\03www2018\study\webpack2018>cnpm i -D less less-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code style="word-break: break-word; white-space: initial;">D:<span class="hljs-symbol">\0</span>3www2018<span class="hljs-symbol">\s</span>tudy<span class="hljs-symbol">\w</span>ebpack2018&gt;cnpm i -D less less-loader</code></pre>
<p>配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
    // fallback: &quot;style-loader&quot;, //备用，如果提取不成功时，会使用style-loader来处理css
    use: &quot;css-loader&quot;
    })
    /*use: [
    { loader: &quot;style-loader&quot; },
    { loader: &quot;css-loader&quot; }
    ]*/
}, 

{
    test: /\.less$/,
    use: [
         {
             loader: &quot;style-loader&quot; // creates style nodes from JS strings
         },
        {
        loader: &quot;css-loader&quot; // translates CSS into CommonJS
        },
        {
        loader: &quot;less-loader&quot; // compiles Less to CSS
        }
    ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.css$/,
    use: ExtractTextPlugin.<span class="hljs-built_in">extract</span>({
    // fallback: <span class="hljs-string">"style-loader"</span>, //备用，如果提取不成功时，会使用style-loader来处理css
    use: <span class="hljs-string">"css-loader"</span>
    })
    <span class="hljs-comment">/*use: [
    { loader: "style-loader" },
    { loader: "css-loader" }
    ]*/</span>
}, 

{
    <span class="hljs-attribute">test</span>: /\.less$/,
    use: [
         {
             loader: <span class="hljs-string">"style-loader"</span> // creates style nodes from JS strings
         },
        {
        <span class="hljs-attribute">loader</span>: <span class="hljs-string">"css-loader"</span> // translates CSS into CommonJS
        },
        {
        <span class="hljs-attribute">loader</span>: <span class="hljs-string">"less-loader"</span> // compiles Less to CSS
        }
    ]
},</code></pre>
<p>上面这个例子，只有导入的css文件单单独存在一个文件中，vue组件中的less归到了style中了，</p>
<blockquote>说明：在vue组件&lt;style&gt;中，如果lang="less"，在vue-loader中默认配置好了less，无须另外配置<br>说明: 上面例子是配置的是单独的less文件，不适合uve中的less<br>说明：如何将vue中的less也放到单独的css文件中呢? 参考<a href="https://vue-loader.vuejs.org/zh-cn/options.html#extractcss" rel="nofollow noreferrer" target="_blank">https://vue-loader.vuejs.org/...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        extractCSS: true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">    test:</span> <span class="hljs-string">/\.vue$/,</span>
<span class="hljs-attr">    loader:</span> <span class="hljs-string">'vue-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        extractCSS:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<p>但上面有个缺点，会覆盖之前css中的配置中生成style.css文件，如何解决呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');

module.exports={    
    plugins: [
        extractCSS,
        extractLESS
    ],
    
    module: {
        rules: [
            
             {
                test: /\.css$/,
                use: extractCSS.extract({
                 // fallback: &quot;style-loader&quot;, //备用，如果提取不成功时，会使用style-loader来处理css
                 use: &quot;css-loader&quot;
                })
        
            }, 

              {
                  test: /\.vue$/,
                  loader: 'vue-loader',
                  options: {
                     // extractCSS: true
                     extractCSS: function(){
                         return extractLESS
                     }
                    }
                }
        ]
    },  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-keyword">const</span> extractCSS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name]-one.css'</span>);
<span class="hljs-keyword">const</span> extractLESS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name]-two.css'</span>);

<span class="hljs-built_in">module</span>.exports={    
    plugins: [
        extractCSS,
        extractLESS
    ],
    
    <span class="hljs-keyword">module</span>: {
        rules: [
            
             {
                test: <span class="hljs-regexp">/\.css$/</span>,
                use: extractCSS.extract({
                 <span class="hljs-comment">// fallback: "style-loader", //备用，如果提取不成功时，会使用style-loader来处理css</span>
                 use: <span class="hljs-string">"css-loader"</span>
                })
        
            }, 

              {
                  test: <span class="hljs-regexp">/\.vue$/</span>,
                  loader: <span class="hljs-string">'vue-loader'</span>,
                  options: {
                     <span class="hljs-comment">// extractCSS: true</span>
                     extractCSS: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                         <span class="hljs-keyword">return</span> extractLESS
                     }
                    }
                }
        ]
    },  
}
</code></pre>
<p>导入图片</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// D:\03www2018\study\webpack2018\today\wang\App.vue中增加图片
<template>
    <div class='morning'>
    <img src=&quot;../images/logo.jpg&quot; />
    <img src=&quot;../images/a.jpg&quot; />
    上午好
    </div>
</template>
<style lang='less'>
    @color:#f96;
    .morning{
        color:@color
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">// D:\03www2018\study\webpack2018\today\wang\App.vue中增加图片
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'morning'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../images/logo.jpg"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../images/a.jpg"</span> /&gt;</span>
    上午好
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'less'</span>&gt;</span><span class="undefined">
    @color:#f96;
    .morning</span></span><span class="hljs-template-variable">{
        color:@color
    }</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>如果安装并配置好了url-loader，图片会生成data:image格式<br>发现生成<code>&lt;img src="data:image/jpeg;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICIzNDk0NWM0MDMyMWQyMDk3YTY5Zjg2MGZkNWQ1M2FlZC5qcGciOw=="&gt;</code>，但是不显示出图片，url-loader不配置会显示图片，显示如下&lt;img src="34945c40321d2097a69f860fd5d53aed.jpg"&gt;</p>
<p>安装<br>D:03www2018studywebpack2018&gt;cnpm i url-loader -D</p>
<p>安装<br>D:03www2018studywebpack2018&gt;cnpm i file-loader -D</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack从零开始第6课:在Vue开发中使用webpack

## 原文链接
[https://segmentfault.com/a/1190000012560228](https://segmentfault.com/a/1190000012560228)

