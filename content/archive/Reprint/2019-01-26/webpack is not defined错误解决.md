---
title: 'webpack is not defined错误解决' 
date: 2019-01-26 2:30:18
hidden: true
slug: sufgz1vmdd
categories: [reprint]
---

{{< raw >}}

                    
<p>1、 webpack.config.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    devtool: 'eval-source-map',
  entry:  __dirname + &quot;/app/a.js&quot;,//已多次提及的唯一入口文件
  output: {
      // devtool: 'eval-source-map',
    path: __dirname + &quot;/public&quot;,//打包后的文件存放的地方
    filename: &quot;bundle.js&quot;//打包后输出文件的文件名
  },  
   module: {//在配置文件里添加JSON loader
    loaders: [
    {
        test:/\.json$/,
        loader:'json-loader'
    },
        {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'//添加对样式表的处理
      }
    ]
  },
    plugins: [
    new webpack.BannerPlugin(&quot;Copyright Flying Unicorns inc.&quot;)
  ]//????????????????npm start的时候此处出错
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
    devtool: <span class="hljs-string">'eval-source-map'</span>,
  entry:  __dirname + <span class="hljs-string">"/app/a.js"</span>,<span class="hljs-comment">//已多次提及的唯一入口文件</span>
  output: {
      <span class="hljs-comment">// devtool: 'eval-source-map',</span>
    path: __dirname + <span class="hljs-string">"/public"</span>,<span class="hljs-comment">//打包后的文件存放的地方</span>
    filename: <span class="hljs-string">"bundle.js"</span><span class="hljs-comment">//打包后输出文件的文件名</span>
  },  
   <span class="hljs-keyword">module</span>: {<span class="hljs-comment">//在配置文件里添加JSON loader</span>
    loaders: [
    {
        test:<span class="hljs-regexp">/\.json$/</span>,
        loader:<span class="hljs-string">'json-loader'</span>
    },
        {
        test: <span class="hljs-regexp">/\.js$/</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        loader: <span class="hljs-string">'babel-loader'</span>,<span class="hljs-comment">//在webpack的module部分的loaders里进行配置即可</span>
        
      },
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        loader: <span class="hljs-string">'style-loader!css-loader?modules'</span><span class="hljs-comment">//添加对样式表的处理</span>
      }
    ]
  },
    plugins: [
    <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">"Copyright Flying Unicorns inc."</span>)
  ]<span class="hljs-comment">//????????????????npm start的时候此处出错</span>
}</code></pre>
<p>2、出错图片<br><span class="img-wrap"><img data-src="/img/bVJg2q?w=642&amp;h=644" src="https://static.alili.tech/img/bVJg2q?w=642&amp;h=644" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>3、解决方法：<br>只需在此文件头部加上  var webpack = require('webpack');即可</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack is not defined错误解决

## 原文链接
[https://segmentfault.com/a/1190000008367991](https://segmentfault.com/a/1190000008367991)

