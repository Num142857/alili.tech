---
title: 'Webpack的dll功能' 
date: 2019-02-07 2:30:15
hidden: true
slug: 5one34giwqu
categories: [reprint]
---

{{< raw >}}

                    
<p>最近使用Webpack遇到了一个坑。</p>
<p>我们构建前端项目的时候，往往希望第三方库（vendors）和自己写的代码可以分开打包，因为第三方库往往不需要经常打包更新。对此Webpack的<a href="https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk" rel="nofollow noreferrer" target="_blank">文档</a>建议用<code>CommonsChunkPlugin</code>来单独打包第三方库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  vendor: [&quot;jquery&quot;, &quot;other-lib&quot;],
  app: &quot;./entry&quot;
}
new CommonsChunkPlugin({
  name: &quot;vendor&quot;,

  // filename: &quot;vendor.js&quot;
  // (Give the chunk a different name)

  minChunks: Infinity,
  // (with more entries, this ensures that no other module
  //  goes into the vendor chunk)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">entry:</span> {
<span class="hljs-symbol">  vendor:</span> [<span class="hljs-string">"jquery"</span>, <span class="hljs-string">"other-lib"</span>],
<span class="hljs-symbol">  app:</span> <span class="hljs-string">"./entry"</span>
}
new CommonsChunkPlugin({
<span class="hljs-symbol">  name:</span> <span class="hljs-string">"vendor"</span>,

  <span class="hljs-comment">// filename: "vendor.js"</span>
  <span class="hljs-comment">// (Give the chunk a different name)</span>
<span class="hljs-symbol">
  minChunks:</span> Infinity,
  <span class="hljs-comment">// (with more entries, this ensures that no other module</span>
  <span class="hljs-comment">//  goes into the vendor chunk)</span>
})</code></pre>
<p>通常为了对抗缓存，我们会给售出文件的文件名中加入hash的后缀——但是——我们编辑了app部分的代码后，重新打包，发现vendor的hash也变化了！</p>
<p><span class="img-wrap"><img data-src="/img/bVzc4Q" src="https://static.alili.tech/img/bVzc4Q" alt="两次打包，并没有修改vendor部分的代码，然而hash变化了" title="两次打包，并没有修改vendor部分的代码，然而hash变化了" style="cursor: pointer; display: inline;"></span></p>
<p>这么一来，意味着每次发布版本的时候，vendor代码都要刷新，即使我并没有修改其中的代码。这样并不符合我们分开打包的初衷。</p>
<p>带着问题我浏览了Github上<a href="https://github.com/webpack/webpack/issues/1150" rel="nofollow noreferrer" target="_blank">的讨论</a>，发现了一个神器：dll。</p>
<p>Dll是Webpack最近新加的功能，我在网上并没有找到什么中文的介绍，所以在这里我就简单介绍一下。</p>
<p>Dll这个概念应该是借鉴了Windows系统的dll。一个dll包，就是一个纯纯的依赖库，它本身不能运行，是用来给你的app引用的。</p>
<p>打包dll的时候，Webpack会将所有包含的库做一个索引，写在一个manifest文件中，而引用dll的代码（dll user）在打包的时候，只需要读取这个manifest文件，就可以了。</p>
<p>这么一来有几个好处：</p>
<ol>
<li><p>Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，因此线上的dll代码不需要随着版本发布频繁更新。</p></li>
<li><p>App部分代码修改后，只需要编译app部分的代码，dll部分，只要包含的库没有增减、升级，就不需要重新打包。这样也大大提高了每次编译的速度。</p></li>
<li><p>假设你有多个项目，使用了相同的一些依赖库，它们就可以共用一个dll。</p></li>
</ol>
<p>如何使用呢？</p>
<p>首先要先建立一个dll的配置文件，<code>entry</code>只包含第三方库：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

const vendors = [
  'antd',
  'isomorphic-fetch',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-promise-middleware',
  'redux-thunk',
  'superagent',
];

module.exports = {
  output: {
    path: 'build',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> webpack = require(<span class="hljs-string">'webpack'</span>);

<span class="hljs-keyword">const</span> vendors = [
  <span class="hljs-string">'antd'</span>,
  <span class="hljs-string">'isomorphic-fetch'</span>,
  <span class="hljs-string">'react'</span>,
  <span class="hljs-string">'react-dom'</span>,
  <span class="hljs-string">'react-redux'</span>,
  <span class="hljs-string">'react-router'</span>,
  <span class="hljs-string">'redux'</span>,
  <span class="hljs-string">'redux-promise-middleware'</span>,
  <span class="hljs-string">'redux-thunk'</span>,
  <span class="hljs-string">'superagent'</span>,
];

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  output: {
    path: <span class="hljs-string">'build'</span>,
    filename: <span class="hljs-string">'[name].[chunkhash].js'</span>,
    library: <span class="hljs-string">'[name]_[chunkhash]'</span>,
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      path: <span class="hljs-string">'manifest.json'</span>,
      name: <span class="hljs-string">'[name]_[chunkhash]'</span>,
      context: __dirname,
    }),
  ],
};
</code></pre>
<p><code>webpack.DllPlugin</code>的选项中，<code>path</code>是manifest文件的输出路径；<code>name</code>是dll暴露的对象名，要跟<code>output.library</code>保持一致；<code>context</code>是解析包路径的上下文，这个要跟接下来配置的dll user一致。</p>
<p>运行Webpack，会输出两个文件一个是打包好的vendor.js，一个就是manifest.json，长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;vendor_ac51ba426d4f259b8b18&quot;,
  &quot;content&quot;: {
    &quot;./node_modules/antd/dist/antd.js&quot;: 1,
    &quot;./node_modules/react/react.js&quot;: 2,
    &quot;./node_modules/react/lib/React.js&quot;: 3,
    &quot;./node_modules/react/node_modules/object-assign/index.js&quot;: 4,
    &quot;./node_modules/react/lib/ReactChildren.js&quot;: 5,
    &quot;./node_modules/react/lib/PooledClass.js&quot;: 6,
    &quot;./node_modules/react/lib/reactProdInvariant.js&quot;: 7,
    &quot;./node_modules/fbjs/lib/invariant.js&quot;: 8,
    &quot;./node_modules/react/lib/ReactElement.js&quot;: 9,
    
    ............" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"vendor_ac51ba426d4f259b8b18"</span>,
  <span class="hljs-string">"content"</span>: {
    <span class="hljs-string">"./node_modules/antd/dist/antd.js"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">"./node_modules/react/react.js"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">"./node_modules/react/lib/React.js"</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">"./node_modules/react/node_modules/object-assign/index.js"</span>: <span class="hljs-number">4</span>,
    <span class="hljs-string">"./node_modules/react/lib/ReactChildren.js"</span>: <span class="hljs-number">5</span>,
    <span class="hljs-string">"./node_modules/react/lib/PooledClass.js"</span>: <span class="hljs-number">6</span>,
    <span class="hljs-string">"./node_modules/react/lib/reactProdInvariant.js"</span>: <span class="hljs-number">7</span>,
    <span class="hljs-string">"./node_modules/fbjs/lib/invariant.js"</span>: <span class="hljs-number">8</span>,
    <span class="hljs-string">"./node_modules/react/lib/ReactElement.js"</span>: <span class="hljs-number">9</span>,
    
    ............</code></pre>
<p>Webpack将每个库都进行了编号索引，之后的dll user可以读取这个文件，直接用id来引用。</p>
<p>Dll user的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

module.exports = {
  output: {
    path: 'build',
    filename: '[name].[chunkhash].js',
  },
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
    }),
  ],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'build'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash].js'</span>,
  },
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/index.js'</span>,
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./manifest.json'</span>),
    }),
  ],
};</code></pre>
<p><code>DllReferencePlugin</code>的选项中，<code>context</code>需要跟之前保持一致，这个用来指导Webpack匹配manifest中库的路径；<code>manifest</code>用来引入刚才输出的manifest文件。</p>
<p>运行Webpack之后，结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVzc8h" src="https://static.alili.tech/img/bVzc8h" alt="分离出dll后打包" title="分离出dll后打包" style="cursor: pointer; display: inline;"></span></p>
<p>对比一下不做分离的情况下打包的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVzc8a" src="https://static.alili.tech/img/bVzc8a" alt="不分离的打包" title="不分离的打包" style="cursor: pointer; display: inline;"></span></p>
<p>速度快了，文件也小了。</p>
<p>平时开发的时候，修改代码后重新编译的速度会大大减少，节省时间。</p>
<p>如果有多个项目，使用相同的一套库，你可以在打包的时候引用相同的manifest文件，这样就可以在项目之间共享了。</p>
<p>参考：</p>
<ul>
<li><p><a href="https://webpack.github.io/docs/list-of-plugins.html#dllplugin" rel="nofollow noreferrer" target="_blank">https://webpack.github.io/docs/list-of-plugins.html#dllplugin</a></p></li>
<li><p><a href="https://github.com/webpack/webpack/tree/master/examples/dll" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/webpack/tree/master/examples/dll</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack的dll功能

## 原文链接
[https://segmentfault.com/a/1190000005969643](https://segmentfault.com/a/1190000005969643)

