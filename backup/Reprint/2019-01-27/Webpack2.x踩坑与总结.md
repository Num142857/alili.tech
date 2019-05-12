---
title: 'Webpack2.x踩坑与总结' 
date: 2019-01-27 2:30:59
hidden: true
slug: 2751yldukfe
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本篇为在学习Vue2.x的时候使用Webpack2.x的踩坑与总结，关于Vue2.x的踩坑与总结，<a href="https://segmentfault.com/a/1190000008279436">点击链接</a></p></blockquote>
<p>原文链接：<a href="http://mrzhang123.github.io/2017/02/07/webpack2/" rel="nofollow noreferrer" target="_blank">http://mrzhang123.github.io/2...</a><br>项目地址：<a href="https://github.com/MrZhang123/Vue_project/tree/master/vue2.x" rel="nofollow noreferrer" target="_blank">https://github.com/MrZhang123...</a></p>
<h1 id="articleHeader0">本地安装npm包后如何在命令行运行</h1>
<p>在npm安装包的时候，如果使用全局安装，即<code>npm install &lt;packageName&gt; -g</code>，则在安装完成后可以在终端运行作为命令去运行，但是如果是本地安装的包<code>npm install --save-dev &lt;packageName&gt;</code>，则无法这样直接运行。那么如何运行本地安装的包呢？首先进入项目目录（即package.json所在目录），然后使用以下命令即可运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ node_modules/.bin/<packageName>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="shell">
$ node_modules/.<span class="hljs-keyword">bin/&lt;packageName&gt;
</span></code></pre>
<p>除了可以这样在命令行运行外，还可以在文件中运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//index.js

let webpack = require('webpack');

webpack();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">//index.js</span>

<span class="hljs-keyword">let</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

webpack();
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
$ node index.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">
$ <span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js
</code></pre>
<h1 id="articleHeader1">webpack1.x升级2.x</h1>
<h2 id="articleHeader2">1.<code>module.loaders</code>改成了<code>module.rules</code>
</h2>
<p>旧的<code>loaders</code>被新的<code>rules</code>取代，后者允许配置<code>loader</code>以及其他更多项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
-   loaders: [
+   rules: [
      {
        test: /\.css$/,
-       loaders: [
+       use: [
          {
            loader: &quot;style-loader&quot;
          },
          {
            loader: &quot;css-loader&quot;,
-           query: {
+           options: {
              modules: true
            }
        ]
      },
      {
        test: /\.jsx$/,
        loader: &quot;babel-loader&quot;, // Do not use &quot;use&quot; here
        options: {
          // ...
        }
      }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-built_in">module</span>: {
-   loaders: [
+   rules: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
-       loaders: [
+       use: [
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader"</span>
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
-           query: {
+           options: {
              <span class="hljs-attr">modules</span>: <span class="hljs-literal">true</span>
            }
        ]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel-loader"</span>, <span class="hljs-comment">// Do not use "use" here</span>
        options: {
          <span class="hljs-comment">// ...</span>
        }
      }
    ]
  }</code></pre>
<p>以上写法中，<code>Rule.loader</code>是<code>Rule.use: [ { loader } ]</code>的简写。</p>
<h2 id="articleHeader3">2.链式调用loaders</h2>
<p>在webpack1.x中loaders可以链式调用，在2.x中依旧有该特性，使用<code>rule.use</code>配置项，<code>use</code>中设置一个loaders的数组而在1.x中使用<code>!</code>连接各个loader，旧版写法只有在使用旧的<code>module.loaders</code>时有效。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
-   loaders: {
+   rules: {
      test: /\.less$/,
-     loader: &quot;style-loader!css-loader!less-loader&quot;
+     use: [
+       &quot;style-loader&quot;,
+       &quot;css-loader&quot;,
+       &quot;less-loader&quot;
+     ]
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-built_in">module</span>: {
-   loaders: {
+   rules: {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
-     loader: <span class="hljs-string">"style-loader!css-loader!less-loader"</span>
+     use: [
+       <span class="hljs-string">"style-loader"</span>,
+       <span class="hljs-string">"css-loader"</span>,
+       <span class="hljs-string">"less-loader"</span>
+     ]
    }
  }</code></pre>
<h2 id="articleHeader4">3.取消在模块中自动添加<code>-loader</code>后缀</h2>
<p>webpack2.x中不再添加<code>-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
    rules: [
      {
        use: [
-         &quot;style&quot;,
+         &quot;style-loader&quot;,
-         &quot;css&quot;,
+         &quot;css-loader&quot;,
-         &quot;less&quot;,
+         &quot;less-loader&quot;,
        ]
      }
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">use</span>: [
-         <span class="hljs-string">"style"</span>,
+         <span class="hljs-string">"style-loader"</span>,
-         <span class="hljs-string">"css"</span>,
+         <span class="hljs-string">"css-loader"</span>,
-         <span class="hljs-string">"less"</span>,
+         <span class="hljs-string">"less-loader"</span>,
        ]
      }
    ]
  }</code></pre>
<p>根据官方说法，做出这样更改的原因是省略<code>-loader</code>会对新手造成误解，所以去掉这个功能，如果想打开这个旧的功能，可以配置<code>resolveLoader.moduleExtensions</code>，但是并不推荐这么做，具体参阅<a href="https://github.com/webpack/webpack/issues/2986" rel="nofollow noreferrer" target="_blank">issues#2986</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ resolveLoader: {
+   moduleExtensions: [&quot;-loader&quot;]
+ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">+ resolveLoader: {
+   moduleExtensions: [<span class="hljs-string">"-loader"</span>]
+ }</code></pre>
<h2 id="articleHeader5">4.使用options配置loader</h2>
<p>在webpack1.x中可以通过webpack.config.js的自定义属性来配置loader，这在webpack2.x中无法执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = { 
  ...
  module: { 
    use: [{ 
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  // does not work with webpack 2
  ts: { transpileOnly: false } 
}
//webpack2 use options
module.exports = { 
  ...
  module: { 
    use: [{ 
      test: /\.tsx?$/,
      loader: 'ts-loader'
      options:  { transpileOnly: false }
    }]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = { 
  ...
  module: { 
    <span class="hljs-attr">use</span>: [{ 
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader'</span>
    }]
  },
  <span class="hljs-comment">// does not work with webpack 2</span>
  ts: { <span class="hljs-attr">transpileOnly</span>: <span class="hljs-literal">false</span> } 
}
<span class="hljs-comment">//webpack2 use options</span>
<span class="hljs-built_in">module</span>.exports = { 
  ...
  module: { 
    <span class="hljs-attr">use</span>: [{ 
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader'</span>
      options:  { <span class="hljs-attr">transpileOnly</span>: <span class="hljs-literal">false</span> }
    }]
  }
}</code></pre>
<h1 id="articleHeader6">webpack插件的使用</h1>
<h2 id="articleHeader7">webpack-dev-server1.x升级2.x</h2>
<p>1.在CLI使用的时候，--inline默认开启，无需在输入命令时添加</p>
<p>2.删除contentBase用proxy代替</p>
<p>3.减少控制台无用输出，在1.x中，当我们停掉服务器后，控制台会一直输出错误信息，但是在2.x中只会输出<code>[WDS] Disconnected!</code></p>
<h2 id="articleHeader8">extract-text-webpack-plugin</h2>
<p>在使用webpack将vue_spa打包后，并不会出现css，因为css被打包入build.js，如果从vue组件中抽离出css，需要安装插件<strong>extract-text-webpack-plugin</strong>，在使用的时候需要配合v2版本的才可以使用（如果使用了webpack2，则对应的插件版本都需要用v2版本）。具体配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module:{
  rules:[
    {
      test: /\.vue$/,
      loader: 'vue',
      options: {
        loaders:{
          css: extractTextPlugin.extract({
            loader: 'css-loader',
            fallbackLoader: 'vue-style-loader'
          })
        }
      }
    }
  ]
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new extractTextPlugin({
    filename:'/style.css',
    allChunks:true
  })
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>:{
  <span class="hljs-attr">rules</span>:[
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>,
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">loaders</span>:{
          <span class="hljs-attr">css</span>: extractTextPlugin.extract({
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
            <span class="hljs-attr">fallbackLoader</span>: <span class="hljs-string">'vue-style-loader'</span>
          })
        }
      }
    }
  ]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
  <span class="hljs-keyword">new</span> extractTextPlugin({
    <span class="hljs-attr">filename</span>:<span class="hljs-string">'/style.css'</span>,
    <span class="hljs-attr">allChunks</span>:<span class="hljs-literal">true</span>
  })
],</code></pre>
<p>在options中：</p>
<p>options.loader: string | object | loader[]  (必填项) 这里的 loader(s) 用于将资源转换为css导出模块</p>
<p>options.fallbackLoader: string | object | loader[] 当css没有被导出的时候这里的 loader(s) 会被使用 （即当在plugins模块中设置allChunks:false的时候）</p>
<p>在plugins中：</p>
<p>filename：可以设置被导出的css文件的路径以及名字</p>
<p>allChunks：从所有附加块中提取（默认情况下，它只从初始块中提取）</p>
<h2 id="articleHeader9">html-webpack-plugin</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new htmlWwebpackPlugin({
    filename: 'assets/admin.html'
  }),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-keyword">new</span> htmlWwebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'assets/admin.html'</span>
  }),
]</code></pre>
<p>title：用于生成文档的document</p>
<p>filename：要注入的html文件，默认为index.html。可以自定义（例如：assets/admin.html）</p>
<p>inject：<br>true | ‘head’ | ‘body’ | false <br>将资源注入所给的template或templateContent，当设置为 true 或者 ‘body’，所有的资源会被注入到body底部。而head则会将js放到headelement</p>
<p>favicon: 在输出的html中添加favicon</p>
<p>hash: true | false 如果为true，则将一个唯一的webpack编译散列附加到所有包含的脚本和CSS文件。这对缓存清除很有用。</p>
<p>cache: true | false 如果为true（默认），尝试仅在更改后才发出文件。</p>
<h2 id="articleHeader10">是否要更换preset？</h2>
<p>webpack2.x默认支持es6的模块，所以在编译时候没有必要将它们先转换为CommonJS模块再处理，所以在github中出现了babel-preset-es2015-webpack，但是这个模块我在使用的时候出现了<code>Cannot remove 'babel-plugin-transform-es2015-modules-commonjs' from the plugin list.</code>的问题，根据babel-preset-es2015-webpack中的叙述以及<a href="https://github.com/gajus/babel-preset-es2015-webpack/issues/14" rel="nofollow noreferrer" target="_blank">issues#14</a>可知，babel-preset-es2015已经支持不转换模块中的<code>import</code>和<code>export</code>，只需要设置<code>.babelrc</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [
        [
            &quot;es2015&quot;,
            {
                &quot;modules&quot;: false
            }
        ]
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"presets"</span>: [
        [
            <span class="hljs-string">"es2015"</span>,
            {
                <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>
            }
        ]
    ]
}</code></pre>
<h1 id="articleHeader11">参考：</h1>
<p><a href="http://www.zcfy.cc/article/migrating-from-v1-to-v2-2378.html" rel="nofollow noreferrer" target="_blank">从 webpack v1 迁移到 webpack v2</a><br><a href="https://medium.com/webpack/whats-new-in-webpack-dev-server-2-0-a66848c3679#.b8ftvlujv" rel="nofollow noreferrer" target="_blank">What’s new in webpack dev server 2.0</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack2.x踩坑与总结

## 原文链接
[https://segmentfault.com/a/1190000008279459](https://segmentfault.com/a/1190000008279459)

