---
title: '一步一步教你webpack打包' 
date: 2018-12-15 2:30:11
hidden: true
slug: 9yn7p1jmmti
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>webpack是一个现代Javascript应用程序的模块打包器（module<br>bundler）它会分析目录结构，找到js模块（包括浏览器不能直接识别的代码，typescript<br>sass等），打包成合适的格式供浏览器访问。下面将从核心、安装、使用等方面来讲述。</blockquote>
<p>一、核心</p>
<ol>
<li>一切皆模块： 正如js文件可以是一个“模块（module）”一样，其他的（如css、image或html）文件也可视作模 块。因此，你可以require('myJSfile.js')亦可以require('myCSSfile.css')。这意味着我们可以将事物（业务）分割成更小的易于管理的片段，从而达到重复利用等的目的。</li>
<li>按需加载： 传统的模块打包工具（module bundlers）最终将所有的模块编译生成一个庞大的bundle.js文件。但是在真实的app里边，“bundle.js”文件可能有10M到15M之大可能会导致应用一直处于加载中状态。因此Webpack使用许多特性来分割代码然后生成多个“bundle”文件，而且异步加载部分代码以实现按需加载。</li>
</ol>
<p>二.安装</p>
<ul>
<li>1.安装node.js（在node官网下载即可）。</li>
<li>2.安装webpack: npm run webpack -g（tips:可以用webpack -h来验证是否安装成功）。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV0XYZ?w=960&amp;h=168" src="https://static.alili.tech/img/bV0XYZ?w=960&amp;h=168" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>三.使用</p>
<ul>
<li>1.创建工作目录；</li>
<li>2.npm init（创建package.json文件） <span class="img-wrap"><img data-src="/img/bV0XY7?w=904&amp;h=138" src="https://static.alili.tech/img/bV0XY7?w=904&amp;h=138" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bV0XZa?w=902&amp;h=76" src="https://static.alili.tech/img/bV0XZa?w=902&amp;h=76" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span> tips:npm init了之后默认会创建一个项目依赖的package.json文件</li>
<li>3.npm install webpack --save-dev <span class="img-wrap"><img data-src="/img/bV0XZo?w=844&amp;h=72" src="https://static.alili.tech/img/bV0XZo?w=844&amp;h=72" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span> tips:npm install了之后会安装一些项目依赖的包在node_modules文件夹内。</li>
<li>4.创建一个静态页（index.html）及入口文件（app.js）</li>
<li>5.执行命令：webpack app.js bundle.js<br><span class="img-wrap"><img data-src="/img/bV0XZr?w=1118&amp;h=310" src="https://static.alili.tech/img/bV0XZr?w=1118&amp;h=310" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   【tips】可以看到执行该命令之后，生成了一个bundle.js文件。之后再跟大家解释文件内部关联</li>
</ul>
<p>三.添加模块</p>
<ul>
<li>1.被引用的文件：<p>module.exports='';</p>
</li>
<li>2.引用文件：<p>var module = require("./module.js") <br>   import module from ("./module.js")</p>
</li>
<li>3.新建hello.js world.js；<p><span class="img-wrap"><img data-src="/img/bV0XZv?w=428&amp;h=126" src="https://static.alili.tech/img/bV0XZv?w=428&amp;h=126" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV0XZB?w=432&amp;h=136" src="https://static.alili.tech/img/bV0XZB?w=432&amp;h=136" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>4.在app.js中引用这两个js；<p><span class="img-wrap"><img data-src="/img/bV0XZE?w=526&amp;h=242" src="https://static.alili.tech/img/bV0XZE?w=526&amp;h=242" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>5.浏览器预览效果：<p><span class="img-wrap"><img data-src="/img/bV0XZG?w=1064&amp;h=214" src="https://static.alili.tech/img/bV0XZG?w=1064&amp;h=214" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
</ul>
<p>四.扩展</p>
<ul><li>
<p>每次，我们都需要指定两个文件来打包很不方便，并且每次文件有修改需要手动在重新打包也比较崩溃<br>  将webpack写入package.json来扩展命令直接用npm webpack即可运行命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  --watch 自动更新
  --progress 显示打包进度
  --display-modules 列出打包模块
  --display-reasons 列出打包原因
  --p 压缩混淆脚本
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>  -<span class="ruby">-watch 自动更新
</span>  -<span class="ruby">-progress 显示打包进度
</span>  -<span class="ruby">-display-modules 列出打包模块
</span>  -<span class="ruby">-display-reasons 列出打包原因
</span>  -<span class="ruby">-p 压缩混淆脚本
</span></code></pre>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV0XZW?w=896&amp;h=484" src="https://static.alili.tech/img/bV0XZW?w=896&amp;h=484" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul><li>添加完上面的配置之后，文件一有修改便可以自动更新，并且展示进度等。 当然，这里需要指定打包的入口和输出，具体的指定规则往下看～</li></ul>
<p>五.核心概念</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.入口(entry) :使用哪个模块来构建内部依赖图的开始
2.输出(output) :在哪里输出它所创建的bundles及命名规则
3.loader :可以促使webpack额外地处理非javascript文件
4.插件(plugins) :执行范围更广的任务，如：打包优化和压缩等 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">1</span>.入口(entry) :使用哪个模块来构建内部依赖图的开始
<span class="hljs-selector-tag">2</span>.输出(output) :在哪里输出它所创建的<span class="hljs-selector-tag">bundles</span>及命名规则
<span class="hljs-selector-tag">3</span><span class="hljs-selector-class">.loader</span> :可以促使<span class="hljs-selector-tag">webpack</span>额外地处理非<span class="hljs-selector-tag">javascript</span>文件
<span class="hljs-selector-tag">4</span>.插件(plugins) :执行范围更广的任务，如：打包优化和压缩等 
</code></pre>
<p>我们可以新建webpack.config.js来制定以上概念。接下来一项一项来解释。</p>
<ul>
<li>1entry（如下图所示，分为单入口、多入口、混合入口）<p><span class="img-wrap"><img data-src="/img/bV0XZZ?w=690&amp;h=188" src="https://static.alili.tech/img/bV0XZZ?w=690&amp;h=188" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>2输出  <br><span class="img-wrap"><img data-src="/img/bV0XZ1?w=922&amp;h=208" src="https://static.alili.tech/img/bV0XZ1?w=922&amp;h=208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   【tips】这里需要注意的用__dirname需要引用node自带的path  <br><span class="img-wrap"><img data-src="/img/bV0XZ6?w=682&amp;h=38" src="https://static.alili.tech/img/bV0XZ6?w=682&amp;h=38" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   【tips】filename中的[name]会对应入口中的path参数，没有默认是main。文件会被打包到pach+filename下。   <br>  因为在配置文件里面已经指定了入口文件及输出，因此，我们不需要再在命令中指定入口和出口了，可以利用四中的npm run。      webpack来实验下：  <br><span class="img-wrap"><img data-src="/img/bV0X0e?w=1126&amp;h=562" src="https://static.alili.tech/img/bV0X0e?w=1126&amp;h=562" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   运行后可以看到生成了main.package.js文件，一共打包了三个文件。    <br>  【tips】特别值得注意的是，在被打包文件最开始的位置有[0],[1],[2]的标示，这是文件的id分配，这是webpack打包的核心。我们接下来看下main.package.js文件，这里打包完的文件可以通过id值来引用对应的js文件。<br><span class="img-wrap"><img data-src="/img/bV0X0m?w=966&amp;h=924" src="https://static.alili.tech/img/bV0X0m?w=966&amp;h=924" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>   【添加css】接下来我们给页面添加一点样式  <br><span class="img-wrap"><img data-src="/img/bV0X0s?w=542&amp;h=294" src="https://static.alili.tech/img/bV0X0s?w=542&amp;h=294" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><p>npm run webpack之后可以发现以下报错：  <span class="img-wrap"><img data-src="/img/bV0X0w?w=1112&amp;h=588" src="https://static.alili.tech/img/bV0X0w?w=1112&amp;h=588" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>  【tips】这个是因为webpack只能处理js文件，如果需要处理css 图片等文件需要安装对应的loader</p>
</li>
<li>
<p>3 loader（将程序资源文件进行转换，是nodejs的函数  ）<br>   第一步：安装loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm install style-loader css-loader —save-dev npm install less-loader —save-dev       
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>  npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader —<span class="hljs-keyword">save</span>-dev npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span>-loader —<span class="hljs-keyword">save</span>-dev       
 </code></pre>
<p>第二步：使用loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.引用模块时添加 `require(&quot;!style-loader!css-loader!./style.css&quot;)` 
 2.命令行 `webpack entry.js bundle.js --module-bind ‘css=style-loader!css-loader’`
 3.配置文件 `module:{ loaders:[ { test:/\.css$/, loaders:['style-loader','css-loader']   //loader:   'style-loader!css-loader' } ] }`  
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> <span class="hljs-number">1.</span>引用模块时添加 `require(<span class="hljs-string">"!style-loader!css-loader!./style.css"</span>)` 
 <span class="hljs-number">2.</span>命令行 `webpack entry.js bundle.js --<span class="hljs-keyword">module</span>-bind ‘css=style-loader!css-loader’`
 <span class="hljs-number">3.</span>配置文件 `<span class="hljs-keyword">module</span>:{ loaders:[ { test:/\.css$/, loaders:[<span class="hljs-string">'style-loader'</span>,<span class="hljs-string">'css-loader'</span>]   <span class="hljs-comment">//loader:   'style-loader!css-loader' } ] }`  </span>
   </code></pre>
<p>这里推荐在配置文件修改配置，就不用在文件或者命令行中指定比较方便   <br><span class="img-wrap"><img data-src="/img/bV0X0F?w=846&amp;h=412" src="https://static.alili.tech/img/bV0X0F?w=846&amp;h=412" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bV0X0G?w=1040&amp;h=614" src="https://static.alili.tech/img/bV0X0G?w=1040&amp;h=614" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>常用loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm install babel-loader bable-core —save-dev 
  npm install babel-preset —save-dev 
  npm install html-loader —save-dev 
  npm install file-loader —save-dev 


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>  npm <span class="hljs-keyword">install</span> babel-loader bable-core —<span class="hljs-keyword">save</span>-dev 
  npm <span class="hljs-keyword">install</span> babel-preset —<span class="hljs-keyword">save</span>-dev 
  npm <span class="hljs-keyword">install</span> html-loader —<span class="hljs-keyword">save</span>-dev 
  npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-loader —<span class="hljs-keyword">save</span>-dev 


</code></pre>
<p>步骤总结：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.安装对应loader (npm install xxx —save-dev)  
b.修改配置文件（module） 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span>.安装对应loader (npm install xxx —save-dev)  
<span class="hljs-selector-tag">b</span>.修改配置文件（module） 

</code></pre>
<p>常见loader配置：</p>
<p><span class="img-wrap"><img data-src="/img/bV0X0R?w=1366&amp;h=760" src="https://static.alili.tech/img/bV0X0R?w=1366&amp;h=760" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>
<p>4常用插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     webpack.BannerPlugin - banner注释 
     htmlWebpackPlugin - 关联文件 
     CommonsChunkPlugin - 按需加载 
     ExtractTextWebpackPlugin - 分离css

这里需要特别提到的是关联文件的插件，在日常项目中我们一般会有模板。   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>     webpack.<span class="hljs-keyword">BannerPlugin </span>- <span class="hljs-keyword">banner注释 </span>
     htmlWebpackPlugin - 关联文件 
     CommonsChunkPlugin - 按需加载 
     <span class="hljs-keyword">ExtractTextWebpackPlugin </span>- 分离css

这里需要特别提到的是关联文件的插件，在日常项目中我们一般会有模板。   </code></pre>
<p>在模板文件中，我们不需要关注css，不需要关注js，只需要写好对应的html模板。  <span class="img-wrap"><img data-src="/img/bV0X0V?w=586&amp;h=362" src="https://static.alili.tech/img/bV0X0V?w=586&amp;h=362" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>4.1我们在配置文件中写好plugins，  <span class="img-wrap"><img data-src="/img/bV0X01?w=2046&amp;h=546" src="https://static.alili.tech/img/bV0X01?w=2046&amp;h=546" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>  4.2执行打包之后，就可以在输出文件中看到对应的js等等  <span class="img-wrap"><img data-src="/img/bV0X1g?w=1496&amp;h=406" src="https://static.alili.tech/img/bV0X1g?w=1496&amp;h=406" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>  4.3这里需要特别注意的是这个js的文件可以通过配置文件publicPath来配置。大家可以翻到最前面查看该属性。     当然了，也可以利用banner注释插件来添加注释：  <span class="img-wrap"><img data-src="/img/bV0X1v?w=736&amp;h=128" src="https://static.alili.tech/img/bV0X1v?w=736&amp;h=128" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li>
</ul>
<p>六.按需加载</p>
<ul>
<li>利用require.ensure来实现按需加载。<br><span class="img-wrap"><img data-src="/img/bV0X1I?w=455&amp;h=97" src="https://static.alili.tech/img/bV0X1I?w=455&amp;h=97" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>在打包的时候可以看到打包了两个文件<br><span class="img-wrap"><img data-src="/img/bV0X1O?w=219&amp;h=72" src="https://static.alili.tech/img/bV0X1O?w=219&amp;h=72" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
<li>页面载入是是不会加载0.package.js的，只有按钮点击时才会实时去加载该js<br><span class="img-wrap"><img data-src="/img/bV0X1Q?w=476&amp;h=79" src="https://static.alili.tech/img/bV0X1Q?w=476&amp;h=79" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步一步教你webpack打包

## 原文链接
[https://segmentfault.com/a/1190000013052777](https://segmentfault.com/a/1190000013052777)

