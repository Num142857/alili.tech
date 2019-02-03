---
title: 'webpack CommonsChunkPlugin详细教程' 
date: 2019-02-04 2:30:58
hidden: true
slug: w1cjbk2fu
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1.demo结构：</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006808868" src="https://static.alili.tech/img/remote/1460000006808868" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2.package.json配置：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;webpack-simple-demo&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;webpack&quot;: &quot;webpack&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;dependencies&quot;: {
    &quot;jquery&quot;: &quot;^3.1.0&quot;,
    &quot;vue&quot;: &quot;^1.0.26&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;css-loader&quot;: &quot;^0.24.0&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;webpack&quot;: &quot;^1.13.2&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.15.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"webpack-simple-demo"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"webpack"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"jquery"</span>: <span class="hljs-string">"^3.1.0"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^1.0.26"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.24.0"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.2"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.15.1"</span>
  }
}</code></pre>
<h3 id="articleHeader2">3.多种打包情况(未使用CommonsChunkPlugin)</h3>
<h4>(1)单一入口，模块单一引用</h4>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
  },
  output: {
    path:__dirname+'/dist',
    filename: 'build.js'
  },
  plugins: [
   
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'build.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
   
  ]
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;jquery&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">require(<span class="hljs-string">"jquery"</span>)<span class="hljs-comment">;</span></code></pre>
<p>demo目录下运行命令行  webpack或npm run webpack<br><span class="img-wrap"><img data-src="/img/remote/1460000006808869" src="https://static.alili.tech/img/remote/1460000006808869" alt="" title="" style="cursor: pointer;"></span><br>jquery模块被一起打包到build.js</p>
<h4>(2)单一入口，模块重复引用</h4>
<p>webpack.config.js不变，main.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk1"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span></code></pre>
<p>chunk1.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk2&quot;);
var chunk1=1;
exports.chunk1=chunk1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span>
var chunk1=<span class="hljs-number">1</span><span class="hljs-comment">;</span>
exports.chunk1=chunk1<span class="hljs-comment">;</span></code></pre>
<p>chunk2.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chunk2=1;
exports.chunk2=chunk2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>var chu<span class="hljs-symbol">nk2</span>=<span class="hljs-number">1</span>;
exports.chu<span class="hljs-symbol">nk2</span>=chu<span class="hljs-symbol">nk2</span>;</code></pre>
<p>main.js引用了chunk1、chunk2,chunk1又引用了chunk2，打包后：<br>build.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ...省略webpack生成代码
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__(1);
    __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__(2);
    var chunk1=1;
    exports.chunk1=chunk1;

/***/ },
/* 2 */
/***/ function(module, exports) {

    var chunk2=1;
    exports.chunk2=chunk2;

/***/ }
/******/ ]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code> ...省略webpack生成代码
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> function(module, exports, __webpack_require__) {

    __webpack_require__(<span class="hljs-number">1</span>);
    __webpack_require__(<span class="hljs-number">2</span>);


<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> },
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> function(module, exports, __webpack_require__) {

    __webpack_require__(<span class="hljs-number">2</span>);
    <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>;
    exports.chunk1=chunk1;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> },
<span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> function(module, exports) {

    <span class="hljs-keyword">var</span> chunk2=<span class="hljs-number">1</span>;
    exports.chunk2=chunk2;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-emphasis">***</span>/</span></span> }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ]);</code></pre>
<h4>(3)多入口，模块单一引用，分文件输出</h4>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
    main1:'./main1.js'
  },
  output: {
    path:__dirname+'/dist',
    filename: '[name].js'
  },
  plugins: [
   
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
    <span class="hljs-attr">main1</span>:<span class="hljs-string">'./main1.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
   
  ]
};</code></pre>
<p>打包后文件main.js,main1.js  内容与（2）build.js一致</p>
<h4>（4）多入口，模块单一引用，单一文件输出</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
    main1:'./main1.js'
  },
  output: {
    path:__dirname+'/dist',
    filename: 'buid.js'
  },
  plugins: [
   
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
    <span class="hljs-attr">main1</span>:<span class="hljs-string">'./main1.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'buid.js'</span>
  },
  <span class="hljs-attr">plugins</span>: [
   
  ]
};</code></pre>
<p>build.js与（2）一致</p>
<h4>（5）多入口，模块重复引用，单文件输出</h4>
<p>webpack.config.js与（4）一致<br>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);
exports.main=1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk1"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span>
exports.main=<span class="hljs-number">1</span><span class="hljs-comment">;</span></code></pre>
<p>main1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);
require(&quot;./main&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk1"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./main"</span>)<span class="hljs-comment">;</span></code></pre>
<p>报错：ERROR in ./main1.js<br>Module not found: Error: a dependency to an entry point is not allowed<br> @ ./main1.js 3:0-17</p>
<h3 id="articleHeader3">4.使用CommonsChunkPlugin</h3>
<p>(1)单一入口，模块单一引用，分文件输出:<br>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
  },
  output: {
    path:__dirname+'/dist',
    filename: '[name].js'//不使用[name]，并且插件中没有filename，这输出文件中只用chunk.js的内容， 
    main.js的内容不知跑哪里去了
  },
  plugins: [
   new CommonsChunkPlugin({
       name:&quot;chunk&quot;,
       filename:&quot;chunk.js&quot;//忽略则以name为输出文件的名字，否则以此为输出文件名字
   })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span><span class="hljs-comment">//不使用[name]，并且插件中没有filename，这输出文件中只用chunk.js的内容， </span>
    main.js的内容不知跑哪里去了
  },
  <span class="hljs-attr">plugins</span>: [
   <span class="hljs-keyword">new</span> CommonsChunkPlugin({
       <span class="hljs-attr">name</span>:<span class="hljs-string">"chunk"</span>,
       <span class="hljs-attr">filename</span>:<span class="hljs-string">"chunk.js"</span><span class="hljs-comment">//忽略则以name为输出文件的名字，否则以此为输出文件名字</span>
   })
  ]
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);
require(&quot;jquery&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk1"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"jquery"</span>)<span class="hljs-comment">;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006808870" src="https://static.alili.tech/img/remote/1460000006808870" alt="" title="" style="cursor: pointer; display: inline;"></span><br>输出文件main.js chunk.js,chunk1.js,chunck2.js,jquery都被打包到main.js里，好像并没有什么卵用，但是页面上使用的时候chunk.js必须在mian.js前引用</p>
<p>将chunk1.js,chunck2.js打包到chunk.js:<br>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
    chunk: [&quot;./chunk1&quot;, &quot;./chunk2&quot;],//插件中name,filename必须以这个key为值
  },
  output: {
    path:__dirname+'/dist',
    filename: '[name].js'//不使用[name]，并且插件中没有filename，
    这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
  },
  plugins: [
   new CommonsChunkPlugin({
       name:&quot;chunk&quot;,
      // filename:&quot;chunk.js&quot;//忽略则以name为输出文件的名字，否则以此为输出文件名字
   })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
    <span class="hljs-attr">chunk</span>: [<span class="hljs-string">"./chunk1"</span>, <span class="hljs-string">"./chunk2"</span>],<span class="hljs-comment">//插件中name,filename必须以这个key为值</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span><span class="hljs-comment">//不使用[name]，并且插件中没有filename，</span>
    这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
  },
  <span class="hljs-attr">plugins</span>: [
   <span class="hljs-keyword">new</span> CommonsChunkPlugin({
       <span class="hljs-attr">name</span>:<span class="hljs-string">"chunk"</span>,
      <span class="hljs-comment">// filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字</span>
   })
  ]
};</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006808871" src="https://static.alili.tech/img/remote/1460000006808871" alt="" title="" style="cursor: pointer;"></span></p>
<h4>(1)单一入口，模块重复引用，分文件输出(单一入口CommonsChunkPlugin能否将多次引用的模块打包到公共模块呢？)：</h4>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
    //main1:'./main1.js',
  },
  output: {
    path:__dirname+'/dist',
    filename: '[name].js'//不使用[name]，并且插件中没有filename，
这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
  },
  plugins: [
   new CommonsChunkPlugin({
       name:&quot;chunk&quot;,
      // filename:&quot;chunk.js&quot;//忽略则以name为输出文件的名字，否则以此为输出文件名字
      minChunks:2
   })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
    <span class="hljs-comment">//main1:'./main1.js',</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span><span class="hljs-comment">//不使用[name]，并且插件中没有filename，</span>
这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
  },
  <span class="hljs-attr">plugins</span>: [
   <span class="hljs-keyword">new</span> CommonsChunkPlugin({
       <span class="hljs-attr">name</span>:<span class="hljs-string">"chunk"</span>,
      <span class="hljs-comment">// filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字</span>
      minChunks:<span class="hljs-number">2</span>
   })
  ]
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk1"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span></code></pre>
<p>chunk1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk2&quot;);
var chunk1=1;
exports.chunk1=chunk1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span>
var chunk1=<span class="hljs-number">1</span><span class="hljs-comment">;</span>
exports.chunk1=chunk1<span class="hljs-comment">;</span></code></pre>
<p>chunk2模块被引用了两次<br>打包后，所有模块还是被打包到main.js中</p>
<h4>(3)多入口，模块重复引用，分文件输出（将多次引用的模块打包到公共模块）</h4>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
  entry: 
  {
    main:'./main.js',
    main1:'./main1.js',
  },
  output: {
    path:__dirname+'/dist',
    filename: '[name].js'//不使用[name]，并且插件中没有filename，
    这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
  },
  plugins: [
   new CommonsChunkPlugin({
       name:&quot;chunk&quot;,
      // filename:&quot;chunk.js&quot;//忽略则以name为输出文件的名字，否则以此为输出文件名字
      minChunks:2
   })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: 
  {
    <span class="hljs-attr">main</span>:<span class="hljs-string">'./main.js'</span>,
    <span class="hljs-attr">main1</span>:<span class="hljs-string">'./main1.js'</span>,
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>:__dirname+<span class="hljs-string">'/dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span><span class="hljs-comment">//不使用[name]，并且插件中没有filename，</span>
    这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
  },
  <span class="hljs-attr">plugins</span>: [
   <span class="hljs-keyword">new</span> CommonsChunkPlugin({
       <span class="hljs-attr">name</span>:<span class="hljs-string">"chunk"</span>,
      <span class="hljs-comment">// filename:"chunk.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字</span>
      minChunks:<span class="hljs-number">2</span>
   })
  ]
};</code></pre>
<p>main.js,main1.js里都引用chunk1,chunk2.<br>打包后：<br>chunk1,chunk2被打包到chunk.js,不再像3(3)chunk1,chunk2分别被打包到mian,mian1中。</p>
<h3 id="articleHeader4">5.将公共业务模块与类库或框架分开打包</h3>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        main: './main.js',
        main1: './main1.js',
        common1: ['jquery'],
        common2: ['vue']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'//不使用[name]，并且插件中没有filename，
        //这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了
    },
    plugins: [
        new CommonsChunkPlugin({
            name: [&quot;chunk&quot;,&quot;common1&quot;,&quot;common2&quot;],//页面上使用的时候common2
            //必须最先加载
            // filename:&quot;chunk.js&quot;//忽略则以name为输出文件的名字，
                //否则以此为输出文件名字
            minChunks: 2
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">main</span>: <span class="hljs-string">'./main.js'</span>,
        <span class="hljs-attr">main1</span>: <span class="hljs-string">'./main1.js'</span>,
        <span class="hljs-attr">common1</span>: [<span class="hljs-string">'jquery'</span>],
        <span class="hljs-attr">common2</span>: [<span class="hljs-string">'vue'</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span><span class="hljs-comment">//不使用[name]，并且插件中没有filename，</span>
        <span class="hljs-comment">//这输出文件中只用chunk.js的内容，main.js的内容不知跑哪里去了</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: [<span class="hljs-string">"chunk"</span>,<span class="hljs-string">"common1"</span>,<span class="hljs-string">"common2"</span>],<span class="hljs-comment">//页面上使用的时候common2</span>
            <span class="hljs-comment">//必须最先加载</span>
            <span class="hljs-comment">// filename:"chunk.js"//忽略则以name为输出文件的名字，</span>
                <span class="hljs-comment">//否则以此为输出文件名字</span>
            minChunks: <span class="hljs-number">2</span>
        })
    ]
};</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006808968" src="https://static.alili.tech/img/remote/1460000006808968" alt="" title="" style="cursor: pointer;"></span><br>jquery被打包到common1.js,vue被打包到common2.js,chunk.js打包的是公共的业务模块(webpack用插件CommonsChunkPlugin进行打包的时候，将符合引用次数(minChunks)的模块打包到name参数的数组的第一个块里（chunk）,然后数组后面的块依次打包(查找entry里的key,没有找到相关的key就生成一个空的块)，最后一个块包含webpack生成的在浏览器上使用各个块的加载代码，所以页面上使用的时候最后一个块必须最先加载)<br>将webpack.config.js改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {

        main: './main.js',
        main1: './main1.js',
        jquery:[&quot;jquery&quot;],
        vue:[&quot;vue&quot;]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: [&quot;common&quot;,&quot;jquery&quot;,&quot;vue&quot;,&quot;load&quot;],

            minChunks:2

        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {

        <span class="hljs-attr">main</span>: <span class="hljs-string">'./main.js'</span>,
        <span class="hljs-attr">main1</span>: <span class="hljs-string">'./main1.js'</span>,
        <span class="hljs-attr">jquery</span>:[<span class="hljs-string">"jquery"</span>],
        <span class="hljs-attr">vue</span>:[<span class="hljs-string">"vue"</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: [<span class="hljs-string">"common"</span>,<span class="hljs-string">"jquery"</span>,<span class="hljs-string">"vue"</span>,<span class="hljs-string">"load"</span>],

            <span class="hljs-attr">minChunks</span>:<span class="hljs-number">2</span>

        })
    ]
};</code></pre>
<p>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);
var jq=require(&quot;jquery&quot;);
console.log(jq);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"./chunk1"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./chunk2"</span>);
<span class="hljs-keyword">var</span> jq=<span class="hljs-built_in">require</span>(<span class="hljs-string">"jquery"</span>);
<span class="hljs-built_in">console</span>.log(jq);</code></pre>
<p>main1.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./chunk1&quot;);
require(&quot;./chunk2&quot;);
var vue=require(&quot;vue&quot;);
console.log(vue);
exports.vue=vue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./chunk1"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./chunk2"</span>)<span class="hljs-comment">;</span>
var vue=require(<span class="hljs-string">"vue"</span>)<span class="hljs-comment">;</span>
console.log(vue)<span class="hljs-comment">;</span>
exports.vue=vue<span class="hljs-comment">;</span></code></pre>
<p>打包后<br><span class="img-wrap"><img data-src="/img/remote/1460000006812414" src="https://static.alili.tech/img/remote/1460000006812414" alt="" title="" style="cursor: pointer;"></span><br>common.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackJsonp([4,5],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__(3);
    var chunk1=1;
    exports.chunk1=chunk1;

/***/ },
/* 3 */
/***/ function(module, exports) {

    var chunk2=1;
    exports.chunk2=chunk2;

/***/ }
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>webpackJsonp([<span class="hljs-number">4</span>,<span class="hljs-number">5</span>],[
<span class="hljs-comment">/* 0 */</span>,
<span class="hljs-comment">/* 1 */</span>,
<span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports, __webpack_require__)</span> </span>{

    __webpack_require__(<span class="hljs-number">3</span>);
    <span class="hljs-keyword">var</span> chunk1=<span class="hljs-number">1</span>;
    exports.chunk1=chunk1;

<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 3 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(module, exports)</span> </span>{

    <span class="hljs-keyword">var</span> chunk2=<span class="hljs-number">1</span>;
    exports.chunk2=chunk2;

<span class="hljs-comment">/***/</span> }
]);</code></pre>
<p>相当于公共的业务代码都打包到了common.js里<br>load.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ (function(modules) { // webpackBootstrap
/******/     // install a JSONP callback for chunk loading
/******/     var parentJsonpFunction = window[&quot;webpackJsonp&quot;];
/******/     window[&quot;webpackJsonp&quot;] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/         // add &quot;moreModules&quot; to the modules object,
/******/         // then flag all &quot;chunkIds&quot; as loaded and fire callback
/******/         var moduleId, chunkId, i = 0, callbacks = [];
/******/         for(;i < chunkIds.length; i++) {
/******/             chunkId = chunkIds[i];
/******/             if(installedChunks[chunkId])
/******/                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/             installedChunks[chunkId] = 0;
/******/         }
/******/         for(moduleId in moreModules) {
/******/             modules[moduleId] = moreModules[moduleId];
/******/         }
/******/         if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/         while(callbacks.length)
/******/             callbacks.shift().call(null, __webpack_require__);
/******/         if(moreModules[0]) {
/******/             installedModules[0] = 0;
/******/             return __webpack_require__(0);
/******/         }
/******/     };

/******/     // The module cache
/******/     var installedModules = {};

/******/     // object to store loaded and loading chunks
/******/     // &quot;0&quot; means &quot;already loaded&quot;
/******/     // Array means &quot;loading&quot;, array contains callbacks
/******/     var installedChunks = {
/******/         5:0
/******/     };

/******/     // The require function
/******/     function __webpack_require__(moduleId) {

/******/         // Check if module is in cache
/******/         if(installedModules[moduleId])
/******/             return installedModules[moduleId].exports;

/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             exports: {},
/******/             id: moduleId,
/******/             loaded: false
/******/         };

/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/         // Flag the module as loaded
/******/         module.loaded = true;

/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }

/******/     // This file contains only the entry chunk.
/******/     // The chunk loading function for additional chunks
/******/     __webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/         // &quot;0&quot; is the signal for &quot;already loaded&quot;
/******/         if(installedChunks[chunkId] === 0)
/******/             return callback.call(null, __webpack_require__);

/******/         // an array means &quot;currently loading&quot;.
/******/         if(installedChunks[chunkId] !== undefined) {
/******/             installedChunks[chunkId].push(callback);
/******/         } else {
/******/             // start chunk loading
/******/             installedChunks[chunkId] = [callback];
/******/             var head = document.getElementsByTagName('head')[0];
/******/             var script = document.createElement('script');
/******/             script.type = 'text/javascript';
/******/             script.charset = 'utf-8';
/******/             script.async = true;

/******/             script.src = __webpack_require__.p + &quot;&quot; + chunkId + &quot;.&quot; + ({&quot;0&quot;:&quot;jquery&quot;,&quot;1&quot;:&quot;main&quot;,&quot;2&quot;:&quot;main1&quot;,&quot;3&quot;:&quot;vue&quot;,&quot;4&quot;:&quot;common&quot;}[chunkId]||chunkId) + &quot;.js&quot;;
/******/             head.appendChild(script);
/******/         }
/******/     };

/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;

/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;

/******/     // __webpack_public_path__
/******/     __webpack_require__.p = &quot;&quot;;
/******/ })
/************************************************************************/
/******/ ([]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> (function(modules) { <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// install a JSONP callback for chunk loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> parentJsonpFunction = <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-built_in">window</span>[<span class="hljs-string">"webpackJsonp"</span>] = function webpackJsonpCallback(chunkIds, moreModules) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// add "moreModules" to the modules object,</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// then flag all "chunkIds" as loaded and fire callback</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> moduleId, chunkId, i = <span class="hljs-number">0</span>, callbacks = [];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">for</span>(;i &lt; chunkIds.length; i++) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             chunkId = chunkIds[i];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">if</span>(installedChunks[chunkId])
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>                 callbacks.push.apply(callbacks, installedChunks[chunkId]);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = <span class="hljs-number">0</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">for</span>(moduleId <span class="hljs-keyword">in</span> moreModules) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             modules[moduleId] = moreModules[moduleId];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">while</span>(callbacks.length)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             callbacks.shift().call(<span class="hljs-keyword">null</span>, __webpack_require__);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(moreModules[<span class="hljs-number">0</span>]) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedModules[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> __webpack_require__(<span class="hljs-number">0</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> installedModules = {};

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// object to store loaded and loading chunks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// "0" means "already loaded"</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// Array means "loading", array contains callbacks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-keyword">var</span> installedChunks = {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-number">5</span>:<span class="hljs-number">0</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The require function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     function __webpack_require__(moduleId) {

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Check if module is in cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedModules[moduleId])
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> installedModules[moduleId].exports;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Create a new module (and put it into the cache)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">var</span> module = installedModules[moduleId] = {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             exports: {},
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             id: moduleId,
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             loaded: <span class="hljs-keyword">false</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Execute the module function</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Flag the module as loaded</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         module.loaded = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// Return the exports of the module</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">return</span> module.exports;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     }

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// This file contains only the entry chunk.</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// The chunk loading function for additional chunks</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.e = function requireEnsure(chunkId, callback) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// "0" is the signal for "already loaded"</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] === <span class="hljs-number">0</span>)
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">return</span> callback.call(<span class="hljs-keyword">null</span>, __webpack_require__);

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-comment">// an array means "currently loading".</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         <span class="hljs-keyword">if</span>(installedChunks[chunkId] !== undefined) {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId].push(callback);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         } <span class="hljs-keyword">else</span> {
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-comment">// start chunk loading</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             installedChunks[chunkId] = [callback];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>];
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.type = <span class="hljs-string">'text/javascript'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.charset = <span class="hljs-string">'utf-8'</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.<span class="hljs-keyword">async</span> = <span class="hljs-keyword">true</span>;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             script.src = __webpack_require__.p + <span class="hljs-string">""</span> + chunkId + <span class="hljs-string">"."</span> + ({<span class="hljs-string">"0"</span>:<span class="hljs-string">"jquery"</span>,<span class="hljs-string">"1"</span>:<span class="hljs-string">"main"</span>,<span class="hljs-string">"2"</span>:<span class="hljs-string">"main1"</span>,<span class="hljs-string">"3"</span>:<span class="hljs-string">"vue"</span>,<span class="hljs-string">"4"</span>:<span class="hljs-string">"common"</span>}[chunkId]||chunkId) + <span class="hljs-string">".js"</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>             head.appendChild(script);
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>         }
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     };

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the modules object (__webpack_modules__)</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.m = modules;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// expose the module cache</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.c = installedModules;

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     <span class="hljs-comment">// __webpack_public_path__</span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span>     __webpack_require__.p = <span class="hljs-string">""</span>;
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> })
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**/</span></span>
<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span>*/</span></span> ([]);</code></pre>
<p>使用的时候必须最先加载load.js</p>
<h3 id="articleHeader5">6.参数minChunks: Infinity</h3>
<p>看一下下面的配置会是什么结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {

        main: './main.js',
        main1: './main1.js',
        jquery:[&quot;jquery&quot;]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: &quot;jquery&quot;,

            minChunks:2

        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {

        <span class="hljs-attr">main</span>: <span class="hljs-string">'./main.js'</span>,
        <span class="hljs-attr">main1</span>: <span class="hljs-string">'./main1.js'</span>,
        <span class="hljs-attr">jquery</span>:[<span class="hljs-string">"jquery"</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">"jquery"</span>,

            <span class="hljs-attr">minChunks</span>:<span class="hljs-number">2</span>

        })
    ]
};</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006812415" src="https://static.alili.tech/img/remote/1460000006812415" alt="" title="" style="cursor: pointer;"></span><br>main.js,main1.js共同引用的chunk1和chunk2会被打包到jquery.js里</p>
<p>minChunks:2修改为minChunks:Infinity后，chunk1和chunk2都打包到main.js,main1.js里</p>
<h3 id="articleHeader6">7.参数chunks</h3>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {

        main: './main.js',
        main1: './main1.js',
        jquery:[&quot;jquery&quot;]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new CommonsChunkPlugin({
            name: &quot;jquery&quot;,

            minChunks:2,

            chunks:[&quot;main&quot;,&quot;main1&quot;]

        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CommonsChunkPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {

        <span class="hljs-attr">main</span>: <span class="hljs-string">'./main.js'</span>,
        <span class="hljs-attr">main1</span>: <span class="hljs-string">'./main1.js'</span>,
        <span class="hljs-attr">jquery</span>:[<span class="hljs-string">"jquery"</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">'/dist'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">"jquery"</span>,

            <span class="hljs-attr">minChunks</span>:<span class="hljs-number">2</span>,

            <span class="hljs-attr">chunks</span>:[<span class="hljs-string">"main"</span>,<span class="hljs-string">"main1"</span>]

        })
    ]
};</code></pre>
<p>只有在main.js和main1.js中都引用的模块才会被打包的到公共模块（这里即jquery.js）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack CommonsChunkPlugin详细教程

## 原文链接
[https://segmentfault.com/a/1190000006808865](https://segmentfault.com/a/1190000006808865)

