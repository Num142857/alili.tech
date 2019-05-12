---
title: 'webpack踩坑记——DllPlugin和DllReferencePlugin' 
date: 2018-12-27 2:30:12
hidden: true
slug: xbei3nwltr8
categories: [reprint]
---

{{< raw >}}

                    
<h4>场景描述：</h4>
<p>使用vue-cli官方提供的webpack项目，进行钉钉移动端的开发，项目中期遇到文件限制大小的问题，钉钉要求一个js不能超过5MB,而<code>npm run dev</code>的时候，并不会把app.js进行拆分，所以所有的依赖库都在app.js里，太大了。<br>于是就有了这个需求————在dev环境里，也把依赖库拆出来。</p>
<h4>方案一：</h4>
<p>把<code>npm run build</code>里的方法拷贝过来，其实就是<a href="https://doc.webpack-china.org/plugins/commons-chunk-plugin/" rel="nofollow noreferrer" target="_blank">CommonsChunkPlugin</a></p>
<p>原配置里的写法是把node_modules里的库都打包到vendor.js里，这个方法里可以自己配置，返回个布尔值就可以了。<br>拷贝过来以后，发现app.js是变小了，但是vendor.js巨大，5.2mb,还是超了，而且，理论上这些库（vue全家桶、mint、g2）加起来也不应该这么大呀。</p>
<h4>方案二：</h4>
<p>把依赖的库，先整体都不作处理地打包出来，剩余自己的app.js还是该怎么样怎么样，webpack给我们提供了这么个插件<a href="https://doc.webpack-china.org/plugins/dll-plugin/" rel="nofollow noreferrer" target="_blank">DllPlugin</a></p>
<p>新建一个配置文件，比如<code>build/webpack.dll.conf.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['vue','vue-router']
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'vue'</span>,<span class="hljs-string">'vue-router'</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../static'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'dll.[name].js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../'</span>, <span class="hljs-string">'[name]-manifest.json'</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]'</span>
    })
  ]
}</code></pre>
<p>entry里就是先打包出来的库，output就是输出地址和名字，输出到static，因为原配置已经会把static里的内容直接复制到dist里，就不去折腾改其他地方了。<br>Dllplugin里的path，会输出一个vendor-manifest.json，这是用来做关联id的，打包的时候不会打包进去，所以不用放到static里<br>然后运行一下<code>webpack -p --progress --config build/webpack.dll.conf.js</code><br>成功以后，static下会有dll.vendor.js，根目录下会有vendor.manifest.json<br>各自打开看一下，就会看到依赖库的源码和匹配id</p>
<p>ok，到这里，抽离依赖库的事情就完成了，那么接下来问题就是怎么引用呢，怎么在dev和build跑呢？</p>
<p>这里补了一点dll和commonsChunk概念上的区别，commonsChunk之所以慢和大，是因为每次run的时候，都会去做一次打包，而实际上我们不会一直去更新我们引用的依赖库，所以dll的做法就等于是，事先先打包好依赖库，然后只对每次都修改的js做打包。</p>
<h5>继续刚才的步骤</h5>
<p>修改build/webpack.base.conf.js，添加DllReferencePlugin的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const manifest = require('../vendor-manifest.json')
。。。。
plugins: [
    new webpack.DllReferencePlugin({
      manifest
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> manifest = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../vendor-manifest.json'</span>)
。。。。
plugins: [
    <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      manifest
    })
  ]</code></pre>
<p>然后我们直接打开index.html，在底部加上<code>&lt;script src="./static/dll.vendor.js"&gt;&lt;/script&gt;</code><br>是的，就是这么简单粗暴。<br>运行一下<code>npm run dev</code>,打开f12看看网络监控，一切顺利的话，这样就ok了</p>
<p>接下来是打包，只需要把原来的commonsChunkPlugin的东西删掉就可以了。<br><code>npm run build --report</code><br>可以感受到速度比原来快了不是一点点</p>
<blockquote>这里用vue-cli的朋友，有个坑，在build/webpack.base.conf.js里，alias里有个'vue$'，把这个注释掉，否则的话，vue的源码会被重复打包。</blockquote>
<h4>继续优化</h4>
<ol>
<li>依赖从package.json读取，而不是手写；</li>
<li>带上hash，以免线上缓存问题；</li>
<li>带上hash后，自动修改index.html里的引用；</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const webpack = require('webpack')
const package = require('../package.json')
const AssetsPlugin = require('assets-webpack-plugin')
module.exports = {
  entry: {
    //读取package.json里的依赖，normalize.css除外，打包会报错
    //如果使用了chrome的vue-devtool，那打包的时候把vue也排除掉，因为压缩过的vue是不能使用vue-devtool的
    vendor: Object.keys(package.dependencies).filter((item) => {
      return item.indexOf('normalize') < 0 &amp;&amp; item != 'vue'
    })
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'dll.[name]_[hash:6].js',
    library: '[name]_[hash:6]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]_[hash:6]'
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './'
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> package = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-keyword">const</span> AssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assets-webpack-plugin'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">//读取package.json里的依赖，normalize.css除外，打包会报错</span>
    <span class="hljs-comment">//如果使用了chrome的vue-devtool，那打包的时候把vue也排除掉，因为压缩过的vue是不能使用vue-devtool的</span>
    vendor: <span class="hljs-built_in">Object</span>.keys(package.dependencies).filter(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> item.indexOf(<span class="hljs-string">'normalize'</span>) &lt; <span class="hljs-number">0</span> &amp;&amp; item != <span class="hljs-string">'vue'</span>
    })
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../static'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'dll.[name]_[hash:6].js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_[hash:6]'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../'</span>, <span class="hljs-string">'[name]-manifest.json'</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_[hash:6]'</span>
    }),
    <span class="hljs-keyword">new</span> AssetsPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle-config.json'</span>,
      <span class="hljs-attr">path</span>: <span class="hljs-string">'./'</span>
    })
  ]
}</code></pre>
<p>代码不在这里赘述，可以看我<a href="https://github.com/areyouse7en/webpack-project" rel="nofollow noreferrer" target="_blank">吉特哈勃上代码</a></p>
<h4>总结</h4>
<p>没有最好的配置，只有最适合的，遇到问题，思考问题，解决问题</p>
<h4>参考</h4>
<ol>
<li><a href="https://doc.webpack-china.org/plugins/dll-plugin/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></li>
<li><a href="http://engineering.invisionapp.com/post/optimizing-webpack/" rel="nofollow noreferrer" target="_blank">http://engineering.invisionap...</a></li>
<li><a href="https://segmentfault.com/a/1190000010045690">https://segmentfault.com/a/11...</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack踩坑记——DllPlugin和DllReferencePlugin

## 原文链接
[https://segmentfault.com/a/1190000011795931](https://segmentfault.com/a/1190000011795931)

