---
title: 'webpack进阶之loader篇' 
date: 2019-02-08 2:30:41
hidden: true
slug: zf7o6aqd9z
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack的loaders是一大特色，也是很重要的一部分。这遍博客我将分类讲解一些常用的laoder<br><span class="img-wrap"><img data-src="/img/remote/1460000005742040" src="https://static.alili.tech/img/remote/1460000005742040" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、loaders之 预处理</h2>
<ul>
<li>css-loader 处理css中路径引用等问题</li>
<li>style-loader 动态把样式写入css</li>
<li>sass-loader scss编译器</li>
<li>less-loader less编译器</li>
<li>postcss-loader scss再处理</li>
</ul>
<p><code>npm install --save -dev css-loader style-loader sass-loader less-loader postcss-loader</code>  </p>
<p>栗子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {test: /\.css$/, loader: &quot;style!css?sourceMap!postcss&quot;},
    {test: /\.less$/, loader: &quot;style!css!less|postcss&quot;},
    {test: /\.scss$/, loader: &quot;style!css!sass|postcss&quot;}
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    {test: /\.css$/, loader: <span class="hljs-string">"style!css?sourceMap!postcss"</span>},
    {<span class="hljs-attribute">test</span>: /\.less$/, loader: <span class="hljs-string">"style!css!less|postcss"</span>},
    {<span class="hljs-attribute">test</span>: /\.scss$/, loader: <span class="hljs-string">"style!css!sass|postcss"</span>}
  ]
}</code></pre>
<h2 id="articleHeader1">二、loaders之 js处理</h2>
<ul>
<li>babel-loader</li>
<li>jsx-loader</li>
</ul>
<p><code>npm install --save-dev babel-core babel-preset-es2015  babel-loader jsx-loader</code></p>
<p>栗子  </p>
<p>新建一个名字为<code>.babelrc</code>的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;,&quot;react&quot;],
  &quot;plugins&quot;:[&quot;antd&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>,<span class="hljs-string">"react"</span>],
  <span class="hljs-attr">"plugins"</span>:[<span class="hljs-string">"antd"</span>]
}</code></pre>
<p>新建一个名字为<code>webpack.config.js</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports ={
 entry: './entry.js',
 output: { path: __dirname,
 filename: 'bundle.js'
 },
 module: {
loaders: [
  {test: /\.js$/, loader: &quot;babel&quot;, exclude: /node_modules/},
  {test: /\.jsx$/, loader: &quot;jsx-loader&quot;}
  {test: /.css$/, loader: 'style!css'} ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>module.exports ={
<span class="hljs-symbol"> entry:</span> <span class="hljs-string">'./entry.js'</span>,
<span class="hljs-symbol"> output:</span> { <span class="hljs-string">path:</span> __dirname,
<span class="hljs-symbol"> filename:</span> <span class="hljs-string">'bundle.js'</span>
 },
<span class="hljs-symbol"> module:</span> {
<span class="hljs-string">loaders:</span> [
  {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"babel"</span>, <span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>},
  {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.jsx$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"jsx-loader"</span>}
  {<span class="hljs-string">test:</span> <span class="hljs-regexp">/.css$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style!css'</span>} ]
  }
};</code></pre>
<h2 id="articleHeader2">三、loaders之 图片处理</h2>
<ul><li>url-loader</li></ul>
<p><code>npm install --save-dev url-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {test: /\.(jpg|png)$/, loader: &quot;url?limit=8192&quot;},
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    {test: /\.(jpg|png)$/, loader: <span class="hljs-string">"url?limit=8192"</span>},
  ]
}</code></pre>
<h2 id="articleHeader3">四、loaders之 文件处理</h2>
<ul><li>file-loader</li></ul>
<p><code>npm install --save-dev file-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
      },
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>module: {
  loaders: [
    {
      test: /\.(png|<span class="hljs-type">jpg</span>|<span class="hljs-type">jpeg</span>|<span class="hljs-type">gif</span>|<span class="hljs-type">svg</span>|<span class="hljs-type">woff</span>|<span class="hljs-type">woff2</span>|<span class="hljs-type">ttf</span>|<span class="hljs-type">eot</span>)$/,
      loader: 'file'
      },
  ]
}
</code></pre>
<h2 id="articleHeader4">五、loaders之 json处理</h2>
<ul><li>json-loader</li></ul>
<p><code>npm install --save-dev json-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    {test: /\.json$/,loader: 'json'},
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    {test: /\.json$/,loader: <span class="hljs-string">'json'</span>},
  ]
}</code></pre>
<h2 id="articleHeader5">六、loaders之 html处理</h2>
<ul><li>raw-loader</li></ul>
<p><code>npm install --save-dev raw-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  loaders: [
    { test: /\.html$/,loader: 'raw'},
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    { test: /\.html$/,loader: <span class="hljs-string">'raw'</span>},
  ]
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack进阶之loader篇

## 原文链接
[https://segmentfault.com/a/1190000005742111](https://segmentfault.com/a/1190000005742111)

