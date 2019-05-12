---
title: 'webpack教程' 
date: 2018-12-02 2:30:15
hidden: true
slug: vw6sjxzmq6s
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.安装</h2>
<p>先装好node和npm，因为webpack是一个基于node的项目。然后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> -g webpack
</code></pre>
<h2 id="articleHeader1">2.建立项目</h2>
<p>建一个文件夹，然后新建一个package.json的文件在项目根目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir testwebpack
cd  testwebpack
npm init
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">mkdir</span> testwebpack
<span class="hljs-built_in">cd</span>  testwebpack
npm init
</code></pre>
<h2 id="articleHeader2">2.1询问一些问题:按回车选择默认值 自动生成文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" package.json
 package name: (webpack-test)   包名(demo)
 version: (1.0.0)               版本
 description:                   描述
 entry point:                   入口程序(main.js)
 test command:                  测试指令(&quot;dev&quot;: &quot;webpack-dev-server&quot;,&quot;build&quot;: &quot;webpack -p&quot;)
 git repository:                node_modules
 keywords:                      关键字
 author:                        作者
 license: (ISC) MIT             MIT
 Is this ok? (yes)              yes    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code> <span class="hljs-keyword">package</span>.json
 <span class="hljs-keyword">package</span> <span class="hljs-string">name:</span> (webpack-test)   包名(demo)
<span class="hljs-symbol"> version:</span> (<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>)               版本
<span class="hljs-symbol"> description:</span>                   描述
 entry <span class="hljs-string">point:</span>                   入口程序(main.js)
 test <span class="hljs-string">command:</span>                  测试指令(<span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server"</span>,<span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack -p"</span>)
 git <span class="hljs-string">repository:</span>                node_modules
<span class="hljs-symbol"> keywords:</span>                      关键字
<span class="hljs-symbol"> author:</span>                        作者
<span class="hljs-symbol"> license:</span> (ISC) MIT             MIT
 Is <span class="hljs-keyword">this</span> ok? (yes)              yes    
</code></pre>
<h2 id="articleHeader3">3.在创建webpack.config.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './main.js',  /*你要打包的js文件*/
  output: {
    filename: 'bundle.js'  /*打包后生成的文件*/
  },
   module: {
rules:[
  {
    test: /\.css$/, /*引入css文件配置*/
    use: [ 'style-loader', 'css-loader' ]
  },
]
  },
  module: {
rules:[
  {
    test: /\.(png|jpg)$/, /*引入图片文件配置*/
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }
    ]
  }
]
 }
};

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  entry: <span class="hljs-string">'./main.js'</span>,  <span class="hljs-comment">/*你要打包的js文件*/</span>
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>  <span class="hljs-comment">/*打包后生成的文件*/</span>
  },
   <span class="hljs-keyword">module</span>: {
rules:[
  {
    test: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-comment">/*引入css文件配置*/</span>
    use: [ <span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span> ]
  },
]
  },
  <span class="hljs-keyword">module</span>: {
rules:[
  {
    test: <span class="hljs-regexp">/\.(png|jpg)$/</span>, <span class="hljs-comment">/*引入图片文件配置*/</span>
    use: [
      {
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">8192</span>
        }
      }
    ]
  }
]
 }
};

</code></pre>
<h2 id="articleHeader4">3.1例如我的main.js里写</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
document.write('<h1>Hello World</h1>');

require('./app.css');

var img = document.createElement(&quot;img&quot;);
img.src = require(&quot;./small.png&quot;);
document.body.appendChild(img);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;h1&gt;Hello World&lt;/h1&gt;'</span>);

<span class="hljs-built_in">require</span>(<span class="hljs-string">'./app.css'</span>);

<span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
img.src = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./small.png"</span>);
<span class="hljs-built_in">document</span>.body.appendChild(img);
</code></pre>
<h2 id="articleHeader5">3.2查看打包好后使用的JS则创建html文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <body>
    <script type=&quot;text/javascript&quot; src=&quot;bundle.js&quot;></script>
  </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h2 id="articleHeader6">4.创建服务器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g webpack webpack-dev-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -g webpack webpack-dev-server
</code></pre>
<h2 id="articleHeader7">5.安装依赖关系。</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>  npm <span class="hljs-keyword">install</span>
</code></pre>
<h2 id="articleHeader8">6.打包</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;"> npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack教程

## 原文链接
[https://segmentfault.com/a/1190000014735488](https://segmentfault.com/a/1190000014735488)

