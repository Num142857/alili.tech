---
title: 'webpack4 Mode的默认设置' 
date: 2018-12-10 2:30:07
hidden: true
slug: zl8me1t5d7
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack功能强大，有很多独特的功能，但其中一个难点是配置文件。为此,webpack团队改变了这一现状：webpack 4默认不需要配置文件。可以通过mode选项为webpack指定一些默认的配置。mode分为development/production,默认为production。每个选项的默认配置如下(common指两个配置项都存在的属性):</p>
<h3 id="articleHeader0">common</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//parent chunk中解决了的chunk会被删除
optimization.removeAvailableModules:true
//删除空的chunks
optimization.removeEmptyChunks:true
//合并重复的chunk
optimization.mergeDuplicateChunks:true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//parent chunk中解决了的chunk会被删除</span>
optimization.<span class="hljs-string">removeAvailableModules:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//删除空的chunks</span>
optimization.<span class="hljs-string">removeEmptyChunks:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//合并重复的chunk</span>
optimization.<span class="hljs-string">mergeDuplicateChunks:</span><span class="hljs-literal">true</span>
</code></pre>
<p><strong>development</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//调试
devtool:eval
//缓存模块, 避免在未更改时重建它们。
cache:true
//缓存已解决的依赖项, 避免重新解析它们。
module.unsafeCache:true
//在 bundle 中引入「所包含模块信息」的相关注释
output.pathinfo:true
//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
optimization.providedExports:true
//找到chunk中共享的模块,取出来生成单独的chunk
optimization.splitChunks:true
//为 webpack 运行时代码创建单独的chunk
optimization.runtimeChunk:true
//编译错误时不写入到输出
optimization.noEmitOnErrors:true
//给模块有意义的名称代替ids
optimization.namedModules:true
//给模chunk有意义的名称代替ids
optimization.namedChunks:true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//调试</span>
<span class="hljs-string">devtool:</span>eval
<span class="hljs-comment">//缓存模块, 避免在未更改时重建它们。</span>
<span class="hljs-string">cache:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//缓存已解决的依赖项, 避免重新解析它们。</span>
module.<span class="hljs-string">unsafeCache:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//在 bundle 中引入「所包含模块信息」的相关注释</span>
output.<span class="hljs-string">pathinfo:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。</span>
optimization.<span class="hljs-string">providedExports:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//找到chunk中共享的模块,取出来生成单独的chunk</span>
optimization.<span class="hljs-string">splitChunks:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//为 webpack 运行时代码创建单独的chunk</span>
optimization.<span class="hljs-string">runtimeChunk:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//编译错误时不写入到输出</span>
optimization.<span class="hljs-string">noEmitOnErrors:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//给模块有意义的名称代替ids</span>
optimization.<span class="hljs-string">namedModules:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//给模chunk有意义的名称代替ids</span>
optimization.<span class="hljs-string">namedChunks:</span><span class="hljs-literal">true</span>
</code></pre>
<p><strong>production</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//性能相关配置
performance:{hints:&quot;error&quot;....}
//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
optimization.flagIncludedChunks:true
//给经常使用的ids更短的值
optimization.occurrenceOrder:true
//确定每个模块下被使用的导出
optimization.usedExports:true
//识别package.json or rules sideEffects 标志
optimization.sideEffects:true
//尝试查找模块图中可以安全连接到单个模块中的段。- -
optimization.concatenateModules:true
//使用uglify-js压缩代码
optimization.minimize:true


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//性能相关配置</span>
<span class="hljs-string">performance:</span>{<span class="hljs-string">hints:</span><span class="hljs-string">"error"</span>....}
<span class="hljs-comment">//某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载</span>
optimization.<span class="hljs-string">flagIncludedChunks:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//给经常使用的ids更短的值</span>
optimization.<span class="hljs-string">occurrenceOrder:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//确定每个模块下被使用的导出</span>
optimization.<span class="hljs-string">usedExports:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//识别package.json or rules sideEffects 标志</span>
optimization.<span class="hljs-string">sideEffects:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//尝试查找模块图中可以安全连接到单个模块中的段。- -</span>
optimization.<span class="hljs-string">concatenateModules:</span><span class="hljs-literal">true</span>
<span class="hljs-comment">//使用uglify-js压缩代码</span>
optimization.<span class="hljs-string">minimize:</span><span class="hljs-literal">true</span>


</code></pre>
<p>webpack运行时还会根据mode设置一个全局变量process.env.NODE_ENV,这里的process.env.NODE_ENV不是node中的环境变量,而是webpack.DefinePlugin中定义的全局变量,允许你根据不同的环境执行不同的代码.<br><span class="img-wrap"><img data-src="/img/bV6cZe?w=689&amp;h=295" src="https://static.alili.tech/img/bV6cZe?w=689&amp;h=295" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV6cZZ?w=996&amp;h=143" src="https://static.alili.tech/img/bV6cZZ?w=996&amp;h=143" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(process.env.NODE_ENV === 'development'){
    //开发环境 do something
}else{
    //生产环境 do something
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(process.env.NODE_ENV === <span class="hljs-string">'development'</span>){
    <span class="hljs-comment">//开发环境 do something</span>
}<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">//生产环境 do something</span>
}</code></pre>
<p>最终将编译成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(true){
   //开发环境 do something
}else{
   //生产环境 do something
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span>(<span class="hljs-literal">true</span>){
   <span class="hljs-comment">//开发环境 do something</span>
}<span class="hljs-keyword">else</span>{
   <span class="hljs-comment">//生产环境 do something</span>
}</code></pre>
<p>生产环境下,uglify打包代码时会自动删除不可达代码,也就是说生产环境压缩后最终的代码为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //生产环境 do something" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">  <span class="hljs-comment">//生产环境 do something</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4 Mode的默认设置

## 原文链接
[https://segmentfault.com/a/1190000013712229](https://segmentfault.com/a/1190000013712229)

