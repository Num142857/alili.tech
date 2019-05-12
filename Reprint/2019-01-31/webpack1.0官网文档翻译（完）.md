---
title: 'webpack1.0官网文档翻译（完）' 
date: 2019-01-31 2:31:16
hidden: true
slug: da4u4wgwck
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>2018.3.1更：</blockquote>
<p>有赞·微商城(base杭州)部门招前端啦，最近的前端hc有十多个，跪求大佬扔简历，我直接进行内推实时反馈进度，有兴趣的邮件 lvdada#youzan.com，或直接微信勾搭我 wsldd225 了解跟多</p>
<p>有赞开源组件库·<a href="https://www.youzanyun.com/zanui" rel="nofollow noreferrer" target="_blank">zanUI</a></p>
<hr>
<h1 id="articleHeader0">webpack文档翻译(完)</h1>
<blockquote><h1 id="articleHeader1">动机</h1></blockquote>
<p>现在的网站都向webapp进化：</p>
<ul>
<li>在页面中有越来越多的js</li>
<li>现在浏览器能做更多的事情</li>
<li>更少的页面重载刷新 在页面中有更多的代码</li>
</ul>
<p>结论是在浏览器端存在大量的代码。</p>
<p>大段的代码需要被组织，模块系统提供了这个机会把代码分割成模块。</p>
<h2 id="articleHeader2">模块系统的风格</h2>
<p>有许多中引入依赖导出值的标准：</p>
<ul>
<li>
<code>&lt;script&gt;</code>标签风格（没有模块系统）</li>
<li>commonjs</li>
<li>AMD及其相似</li>
<li>ES6</li>
<li>。。。</li>
</ul>
<h3 id="articleHeader3">
<code>&lt;script&gt;</code>标签风格</h3>
<p>如果没有使用模块系统你将会按如下方式处理模块化的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;module1.js&quot;></script>
<script src=&quot;module2.js&quot;></script>
<script src=&quot;libraryA.js&quot;></script>
<script src=&quot;module3.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module1.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"libraryA.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"module3.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>各个模块把接口暴露给全局对象，比如<code>window</code>对象。各个模块之间可以通过全局对象进行访问互相依赖的接口。</p>
<p>普遍的问题：</p>
<ul>
<li>全局对象的冲突</li>
<li>加载的顺序是重要的</li>
<li>开发者需要解决模块的依赖问题</li>
<li>在大项目中模块引入的数目将会非常长并且难以维护</li>
</ul>
<h3 id="articleHeader4">CommonJs：同步的<code>require</code>
</h3>
<p>这种风格使用同步的<code>require</code>方法来加载依赖和返回暴露的接口。一个模块可以通过给<code>exports</code>对象添加属性，或者设置<code>module.exports</code>的值来描述暴露对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;module&quot;);
require(&quot;../file.js&quot;);
exports.doStuff = function() {};
module.exports = someValue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"module"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"../file.js"</span>);
exports.doStuff = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};
<span class="hljs-built_in">module</span>.exports = someValue;</code></pre>
<p>CommonJs规范也在服务端nodejs中使用。</p>
<p>利：</p>
<ul>
<li>服务端代码可以被重用</li>
<li>npm中有大量模块</li>
<li>简易使用</li>
</ul>
<p>弊：</p>
<ul>
<li>阻塞调用在网络中无法应用，网络请求是异步的</li>
<li>不能同时引入多个模块</li>
</ul>
<h3 id="articleHeader5">AMD：异步的<code>require</code>
</h3>
<p><code>异步的模块定义</code></p>
<p>其他一些模块系统（针对浏览器）对同步的<code>require</code>有问题，引出了异步的版本（一种定义模块暴露值的方式）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require([&quot;module&quot;, &quot;../file&quot;], function(module, file) { /* ... */ });
define(&quot;mymodule&quot;, [&quot;dep1&quot;, &quot;dep2&quot;], function(d1, d2) {
  return someExportedValue;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>([<span class="hljs-string">"module"</span>, <span class="hljs-string">"../file"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, file</span>) </span>{ <span class="hljs-comment">/* ... */</span> });
define(<span class="hljs-string">"mymodule"</span>, [<span class="hljs-string">"dep1"</span>, <span class="hljs-string">"dep2"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">d1, d2</span>) </span>{
  <span class="hljs-keyword">return</span> someExportedValue;
});</code></pre>
<p>利：</p>
<ul>
<li>符合了在网络中异步请求的风格</li>
<li>可以同时加载多个模块</li>
</ul>
<p>弊：</p>
<ul>
<li>编码成本 难读难写</li>
<li>看起来像是一种权宜之计</li>
</ul>
<p>实践：</p>
<ul>
<li>require.js</li>
<li>curl</li>
</ul>
<h3 id="articleHeader6">ES6 模块</h3>
<p>ecmascript6添加了一些语言结构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &quot;jquery&quot;;
export function doStuff() {}
module &quot;localModule&quot; {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">"jquery"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStuff</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-built_in">module</span> <span class="hljs-string">"localModule"</span> {}</code></pre>
<p>利：</p>
<ul>
<li>静态分析方便</li>
<li>作为es的标准未来是有保证的。</li>
</ul>
<p>弊：</p>
<ul>
<li>本地浏览器支持还需要时间</li>
<li>这种风格几乎没有成型的模块。</li>
</ul>
<h3 id="articleHeader7">无偏见的解决方案</h3>
<p>开发者可以选择自己的模块风格，确保现存的代码和包能工作。添加习惯的模块风格是方便的。</p>
<h2 id="articleHeader8">传输</h2>
<p>模块要在浏览器端运行，所以他们必须要从后端传输到浏览器端。</p>
<p>传输模块会出现两个极端：</p>
<ul>
<li>每个模块是一个请求</li>
<li>一个请求包含了所有模块</li>
</ul>
<p>这两种使用方法都是疯狂的，但并不理想：</p>
<ul>
<li>
<p>一个模块对应一个请求</p>
<ul>
<li>利：只有需要的模块被传输</li>
<li>弊：多请求意味着更多的开销</li>
<li>弊：因为请求延迟会降低应用初始化时间。</li>
</ul>
</li>
<li>
<p>一个请求包含所有模块</p>
<ul>
<li>利：更少的请求开销，更少的延迟</li>
<li>弊：不需要的模块也会被传输</li>
</ul>
</li>
</ul>
<h3 id="articleHeader9">分块的传输</h3>
<p>一个更灵活的传输方式会更好，两个极端方式的折中方案在大多数例子中会更好。</p>
<p>当编译所有模块时，把一系列模块分割成许多更小的块。</p>
<p>这就允许更多更小更快的请求，初始阶段不需要的模块可以通过命令加载，这样就可以加速初始加载，当你实际需要代码时也能加载相应的代码块。</p>
<p>「分割点」取决于开发者</p>
<p><a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">阅读更多</a></p>
<h2 id="articleHeader10">为什么只有javascript可以模块化？</h2>
<p>为什么模块系统只能帮助开发者解决javascript的模块问题？还有许多其他的资源需要处理：</p>
<ul>
<li>样式stylesheets</li>
<li>图片images</li>
<li>字体webfonts</li>
<li>html模板</li>
<li>。。</li>
</ul>
<p>编译：</p>
<ul>
<li>coffeescript &gt; javascript</li>
<li>elm &gt; javascript</li>
<li>less &gt; css</li>
<li>jade templates &gt; 生成html的js</li>
</ul>
<p>使用起来应该跟下列一样方便：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./style.less&quot;);
require(&quot;./template.jade&quot;);
require(&quot;./image.png&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>require(<span class="hljs-string">"./style.less"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./template.jade"</span>)<span class="hljs-comment">;</span>
require(<span class="hljs-string">"./image.png"</span>)<span class="hljs-comment">;</span></code></pre>
<p><a href="http://webpack.github.io/docs/using-loaders.html" rel="nofollow noreferrer" target="_blank">使用loaders</a><br><a href="http://webpack.github.io/docs/loaders.html" rel="nofollow noreferrer" target="_blank">loaders</a></p>
<h2 id="articleHeader11">静态分析</h2>
<p>当编译这些模块时，静态分析尝试寻找模块的所有依赖。</p>
<p>传统上静态分析寻找只能填写字符串（不带变量），但是<code>require('./template/' + templateName + '.jade')</code>是很普遍的结构。</p>
<p>许多第三方库都有不同的书写风格，一些非常诡异。</p>
<h3 id="articleHeader12">对策</h3>
<p>一个聪明强大的解析器允许几乎所有现存的代码运行，但是开发者写了一些奇怪的代码，这需要找到最合适的解决方法。</p>
<blockquote><h1 id="articleHeader13">什么是webpack</h1></blockquote>
<p><strong>webpack是一个模块打包工具</strong></p>
<p>webpack把有依赖的模块产出代表这些模块的静态资源。</p>
<h3 id="articleHeader14">为什么要用模块打包器？</h3>
<p>现存的模块打包工具不适用大型项目（大型的单页应用）。开发新的模块打包工具最令人激动的原因就是<a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">代码分割</a>，并且静态资源跟模块化也是无缝对接的。</p>
<p>我尝试过拓展现有的模块打包工具，但是无法实现所有目标。</p>
<h3 id="articleHeader15">目标</h3>
<ul>
<li>将依赖树分割成可以命令加载的块</li>
<li>保持初始加载时间短</li>
<li>每个静态资源应该能够成为模块</li>
<li>能够将第三方库结合成模块的能力</li>
<li>自定义模块加载器几乎各个部分的能力</li>
<li>适合大项目</li>
</ul>
<h3 id="articleHeader16">webpack有什么不同</h3>
<p><a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">代码分割</a></p>
<p>webpack有两种依赖类型：同步和异步。异步的依赖充当分割的点并形成新的块。当块的树被优化，一个文件就发射每一个块。</p>
<p><a href="http://webpack.github.io/docs/loaders.html" rel="nofollow noreferrer" target="_blank">loaders</a></p>
<p>webpack默认处理javascript，但是loaders用来把资源转变为javascript，这样做每个资源都能构成模块。</p>
<p><strong>强大的解析能力</strong></p>
<p>webpack有一个非常强大的解析器用来处理几乎所有第三方的类库。它甚至允许在依赖引入时使用表达式<code>require("./templates/" + name + ".jade")</code>。webpack能处理普遍的模块风格： CommonJs和AMD</p>
<p><a href="http://webpack.github.io/docs/plugins.html" rel="nofollow noreferrer" target="_blank">插件系统</a></p>
<p>webpack产出了丰富的插件系统。多数内部特征都在插件系统基础上开发，这允许你根据自己需求自定义webpack，同时也支持贡献通用的开源插件。</p>
<blockquote><h1 id="articleHeader17">使用loaders</h1></blockquote>
<h2 id="articleHeader18">什么是loaders</h2>
<p>loaders是应用在app中静态资源的转换程序。他们是一些能把资源文件中的源代码作为参数并且返回出新的源代码的函数。</p>
<p>举个例子：你可以使用loaders告诉webpack去加载coffeescript或者jsx</p>
<h3 id="articleHeader19">loader 特征</h3>
<ul>
<li>loaders可以链式调用，他们可以应用到资源的管道系统。最后一个loader期待返回js，余下的其他loader可以返回任意形式的源代码，都会被传递到下一个loader。</li>
<li>loaders可以异步或同步。</li>
<li>loaders跑在nodejs</li>
<li>loaders接受参数。这可以用来传递配置给loaders</li>
<li>loaders可以在配置中绑定拓展后缀/正则</li>
<li>loaders可以在npm中发布下载</li>
<li>在loader的package.json的main字段可以导出loader</li>
<li>loader能连接配置</li>
<li>插件可以给loaders更多特征</li>
<li>loaders可以发射额外的随意文件</li>
</ul>
<h2 id="articleHeader20">解析loaders</h2>
<p>loaders与模块有想同的解析方式。一个loader模块预计暴露出一个函数并且使用js在nodejs中编写。通常情况下你在npm中管理loaders，但你也可以在app中管理loaders文件。</p>
<h3 id="articleHeader21">引用loader</h3>
<p>按照约定（并不强制）loaders通常命名为<code>xxx-loader</code>，xxx是一名字。比如<code>json-loader</code>。</p>
<p>你可以通过全名引用loaders（json-loader），或者通过缩略名（json）</p>
<p>loader的名字的约定和搜索优先顺序由webpack配置api中的<code>resolveLoader.moduleTemplates</code>定义。</p>
<p>loader名字的约定是方便的，尤其是用<code>require()</code>进行loader引用的时候。看下列使用方法。</p>
<h3 id="articleHeader22">安装loaders</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install xxx-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install xxx-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h2 id="articleHeader23">使用方法</h2>
<p>有许多中在app中使用loaders的方法：</p>
<ul>
<li>require</li>
<li>在配置文件中进行配置</li>
<li>通过CLI配置</li>
</ul>
<h3 id="articleHeader24">使用require</h3>
<blockquote>注意： 尽可能的避免使用require，如果你打算把scripts标签放入环境无关的环境。对特定的loaders使用配置约定。</blockquote>
<p>用require语句指定loaders是可行的，只需要使用<code>!</code>把loaders跟资源分隔开，每一部分都相对于当前目录进行解析。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./loader!./dir/file.txt&quot;);
// => uses the file &quot;loader.js&quot; in the current directory to transform
//    &quot;file.txt&quot; in the folder &quot;dir&quot;.

require(&quot;jade!./template.jade&quot;);
// => uses the &quot;jade-loader&quot; (that is installed from npm to &quot;node_modules&quot;)
//    to transform the file &quot;template.jade&quot;
//    If configuration has some transforms bound to the file, they will still be applied.

require(&quot;!style!css!less!bootstrap/less/bootstrap.less&quot;);
// => the file &quot;bootstrap.less&quot; in the folder &quot;less&quot; in the &quot;bootstrap&quot;
//    module (that is installed from github to &quot;node_modules&quot;) is
//    transformed by the &quot;less-loader&quot;. The result is transformed by the
//    &quot;css-loader&quot; and then by the &quot;style-loader&quot;.
//    If configuration has some transforms bound to the file, they will not be applied." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>require(<span class="hljs-string">"./loader!./dir/file.txt"</span>);
// =&gt; uses the <span class="hljs-keyword">file</span> <span class="hljs-string">"loader.js"</span> <span class="hljs-keyword">in</span> the current directory <span class="hljs-keyword">to</span> transform
//    <span class="hljs-string">"file.txt"</span> <span class="hljs-keyword">in</span> the folder <span class="hljs-string">"dir"</span>.

require(<span class="hljs-string">"jade!./template.jade"</span>);
// =&gt; uses the <span class="hljs-string">"jade-loader"</span> (that <span class="hljs-keyword">is</span> installed from npm <span class="hljs-keyword">to</span> <span class="hljs-string">"node_modules"</span>)
//    <span class="hljs-keyword">to</span> transform the <span class="hljs-keyword">file</span> <span class="hljs-string">"template.jade"</span>
//    <span class="hljs-keyword">If</span> <span class="hljs-keyword">configuration</span> has some transforms bound <span class="hljs-keyword">to</span> the <span class="hljs-keyword">file</span>, they will still be applied.

require(<span class="hljs-string">"!style!css!less!bootstrap/less/bootstrap.less"</span>);
// =&gt; the <span class="hljs-keyword">file</span> <span class="hljs-string">"bootstrap.less"</span> <span class="hljs-keyword">in</span> the folder <span class="hljs-string">"less"</span> <span class="hljs-keyword">in</span> the <span class="hljs-string">"bootstrap"</span>
//    module (that <span class="hljs-keyword">is</span> installed from github <span class="hljs-keyword">to</span> <span class="hljs-string">"node_modules"</span>) <span class="hljs-keyword">is</span>
//    transformed by the <span class="hljs-string">"less-loader"</span>. The result <span class="hljs-keyword">is</span> transformed by the
//    <span class="hljs-string">"css-loader"</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">then</span> by the <span class="hljs-string">"style-loader"</span>.
//    <span class="hljs-keyword">If</span> <span class="hljs-keyword">configuration</span> has some transforms bound <span class="hljs-keyword">to</span> the <span class="hljs-keyword">file</span>, they will <span class="hljs-keyword">not</span> be applied.</code></pre>
<h3 id="articleHeader25">配置</h3>
<p>你可以把loaders通过配置与正则绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        loaders: [
            { test: /\.jade$/, loader: &quot;jade&quot; },
            // => &quot;jade&quot; loader is used for &quot;.jade&quot; files

            { test: /\.css$/, loader: &quot;style!css&quot; },
            // => &quot;style&quot; and &quot;css&quot; loader is used for &quot;.css&quot; files
            // Alternative syntax:
            { test: /\.css$/, loaders: [&quot;style&quot;, &quot;css&quot;] },
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
    module: {
        loader<span class="hljs-variable">s:</span> [
            { tes<span class="hljs-variable">t:</span> /\.jade$/, loader: <span class="hljs-string">"jade"</span> },
            // =&gt; <span class="hljs-string">"jade"</span> loader <span class="hljs-keyword">is</span> used <span class="hljs-keyword">for</span> <span class="hljs-string">".jade"</span> <span class="hljs-keyword">files</span>

            { tes<span class="hljs-variable">t:</span> /\.css$/, loader: <span class="hljs-string">"style!css"</span> },
            // =&gt; <span class="hljs-string">"style"</span> <span class="hljs-built_in">and</span> <span class="hljs-string">"css"</span> loader <span class="hljs-keyword">is</span> used <span class="hljs-keyword">for</span> <span class="hljs-string">".css"</span> <span class="hljs-keyword">files</span>
            // Alternative <span class="hljs-keyword">syntax</span>:
            { tes<span class="hljs-variable">t:</span> /\.css$/, loader<span class="hljs-variable">s:</span> [<span class="hljs-string">"style"</span>, <span class="hljs-string">"css"</span>] },
        ]
    }
}</code></pre>
<h3 id="articleHeader26">cli</h3>
<p>你可以通过cli的拓展绑定loaders：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --module-bind jade --module-bind 'css=style!css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>webpack --<span class="hljs-keyword">module</span>-bind jade --<span class="hljs-keyword">module</span>-bind <span class="hljs-string">'css=style!css'</span></code></pre>
<p>jade loader处理.jade文件，style cssloader处理.css文件</p>
<h3 id="articleHeader27">查询参数</h3>
<p>loaders穿衣通过查询字符串传递查询参数（跟web一样）。查询字符串使用<code>？</code>添加到loader，类似<code>url-loader?mimetype=image/png</code></p>
<p>注意：查询字符串的形式取决于loader。查询loader的文档。大多数loaders接受常规形式的参数(<code>?key=value&amp;key2=value2</code>)或者json对象（<code>?{"key":"value","key2":"value2"}</code>）</p>
<p><strong>require</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;url-loader?mimetype=image/png!./file.png&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">require(<span class="hljs-string">"url-loader?mimetype=image/png!./file.png"</span>)<span class="hljs-comment">;</span></code></pre>
<p><strong>配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ test: /\.png$/, loader: &quot;url-loader?mimetype=image/png&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attribute">test</span>: /\.png$/, loader: <span class="hljs-string">"url-loader?mimetype=image/png"</span> }</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.png$/,
    loader: &quot;url-loader&quot;,
    query: { mimetype: &quot;image/png&quot; }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.png$/,
    loader: <span class="hljs-string">"url-loader"</span>,
    query: { mimetype: <span class="hljs-string">"image/png"</span> }
}</code></pre>
<p><strong>cli</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --module-bind &quot;png=url-loader?mimetype=image/png&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code style="word-break: break-word; white-space: initial;">webpack --<span class="hljs-keyword">module</span>-<span class="hljs-keyword">bind</span> <span class="hljs-string">"png=url-loader?mimetype=image/png"</span></code></pre>
<blockquote><h1 id="articleHeader28">使用插件</h1></blockquote>
<p>使用插件添加与webpack打包有关的典型功能。举个例子，<a href="https://github.com/senotrusov/bell-on-bundler-error-plugin" rel="nofollow noreferrer" target="_blank">BellOnBundlerErrorPlugin</a>插件能在打包器工作的进程中输出错误信息。</p>
<h3 id="articleHeader29">内置插件</h3>
<p>通过使用webpack的插件属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack should be in the node_modules directory, install if not.
var webpack = require(&quot;webpack&quot;);

module.exports = {
    plugins: [
        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(&quot;bower.json&quot;, [&quot;main&quot;])
        ], [&quot;normal&quot;, &quot;loader&quot;])
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// webpack should be in the node_modules directory, install if not.</span>
<span class="hljs-keyword">var</span> webpack = require(<span class="hljs-string">"webpack"</span>);

module.exports = {
    plugins: <span class="hljs-type"></span>[
        <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.ResolverPlugin([
            <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.ResolverPlugin.DirectoryDescriptionFilePlugin(<span class="hljs-string">"bower.json"</span>, [<span class="hljs-string">"main"</span>])
        ], [<span class="hljs-string">"normal"</span>, <span class="hljs-string">"loader"</span>])
    ]
};</code></pre>
<h3 id="articleHeader30">其他插件</h3>
<p>非内置插件可以通过npm下载或者其他途径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install component-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> component-webpack-<span class="hljs-keyword">plugin</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ComponentPlugin = require(&quot;component-webpack-plugin&quot;);
module.exports = {
    plugins: [
        new ComponentPlugin()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ComponentPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"component-webpack-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> ComponentPlugin()
    ]
}</code></pre>
<p>当通过npm安装第三方插件时我们建议使用这个工具： <a href="https://www.npmjs.com/package/webpack-load-plugins" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p>
<p>这会检查所有安装在依赖中的第三方插件然后在需要的时候进行懒加载。</p>
<h1 id="articleHeader31">getting started</h1>
<h2 id="articleHeader32">欢迎</h2>
<p>这个小教程带你过一遍简单的例子</p>
<p>你会学到：</p>
<ul>
<li>如何安装webpack</li>
<li>如何使用webpack</li>
<li>如何使用loaders</li>
<li>如何使用开发服务器</li>
</ul>
<h2 id="articleHeader33">安装webpack</h2>
<p>你需要先安装nodejs</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack -g
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> webpack -g
</code></pre>
<blockquote>这使得webpack全局命令可用</blockquote>
<h2 id="articleHeader34">设置应用</h2>
<p>从全新的目录开始。</p>
<blockquote>webpack会分析入口文件中的依赖文件。这些文件（也称模块）也会包含在<code>bundle.js</code>中。webpack会给每个模块一个独立的id然后把所有凭id访问的模块存到bundle.js中。只有入口模块在初始化时会被执行。一个小型的运行时会提供一个require函数，当需要时会执行依赖的资源。</blockquote>
<h2 id="articleHeader35">第一个loader</h2>
<p>我们想要给应用添加css文件。</p>
<p>webpack默认只支持javascript，所以我们需要css-loader来处理css文件。</p>
<p>执行<code>npm install css-loader style-loader</code>下载安装loaders（他们需要安装在本地，不带-g）这会创建一个loaders存放的<code>node_modules</code>文件夹。</p>
<p>开始使用他们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;!style!css!./style.css&quot;);
document.write(require(&quot;./content.js&quot;))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"!style!css!./style.css"</span>);
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">"./content.js"</span>))</code></pre>
<blockquote>在引入模块时添加loader的前缀，模块会经历一个loader管道，这些loaders将模块内容以特定的方式进行改变。在所有改变完成后，最后的结果是一个javascript模块。</blockquote>
<h2 id="articleHeader36">绑定loaders</h2>
<p>我们不想写如此长的引用<code>require("!style!css!./style.css")</code></p>
<p>我们可以给loaders绑定拓展所以我们只用写<code>require("./style.css")</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./style.css&quot;);
document.write(require(&quot;./content.js&quot;))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"./style.css"</span>);
<span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">require</span>(<span class="hljs-string">"./content.js"</span>))</code></pre>
<p>跑命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack ./entry.js bundle.js --module-bind 'css=style!css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">webpack ./entry<span class="hljs-selector-class">.js</span> bundle<span class="hljs-selector-class">.js</span> --module-bind <span class="hljs-string">'css=style!css'</span></code></pre>
<h2 id="articleHeader37">配置文件</h2>
<p>我们想把配置信息移到一个配置文件中：</p>
<p>添加配置文件webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: &quot;./entry.js&quot;,
    output: {
        path: __dirname,
        filename: &quot;bundle.js&quot;
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: &quot;style!css&quot; }
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.exports = {
<span class="hljs-symbol">    entry:</span> <span class="hljs-string">"./entry.js"</span>,
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        path:</span> __dirname,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"bundle.js"</span>
    },
<span class="hljs-symbol">    module:</span> {
<span class="hljs-symbol">        loaders:</span> [
            { test: /\.css$/, loader: <span class="hljs-string">"style!css"</span> }
        ]
    }
};</code></pre>
<h2 id="articleHeader38">漂亮的输出</h2>
<p>如果项目扩大了应用编译会变慢，所以我们想增加以下进度条，并且带有颜色。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --progress --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span></code></pre>
<h2 id="articleHeader39">监控模式</h2>
<p>我们不想每次改动代码都手动进行编译。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --progress --colors --watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">watch</span></code></pre>
<p>webpack能缓存未变化的模块，在每次编译后都能产出文件。</p>
<blockquote>当使用监控模式，webpack对所有文件在编译过程都安装了文件监听器。如果任何改动被捕捉到了，webpack会再次编译。当缓存开启了，webpack会把每个模块都存在内存里，如果没有变动就会重复利用。</blockquote>
<h2 id="articleHeader40">开发服务器</h2>
<p>开发服务器是更棒的选择。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> -g</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --progress --colors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span></code></pre>
<p>这绑定了一个小型express服务器在localhost:8080。作为静态资源和bundle的服务器。当重新编译时浏览器会重新更新。打开 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/webpack-dev-server/bundle 。</p>
<blockquote>dev 服务器会使用webpack的监控模型，这能防止webpack释放结果文件到硬盘上，安装它保持结果文件都是从内存中读取的。</blockquote>
<p>/</p>
<blockquote><h1 id="articleHeader41">commonjs</h1></blockquote>
<p>CommonJS团队通过确保每个模块都在自己的命名空间中执行定义了一种解决javascript作用域问题的模块形式。</p>
<p>commonjs通过强制模块输出正确的想要暴露在全局的变量，同时定义好正确工作所需的其他模块。</p>
<p>为了实现这些<code>commonjs</code>提供了两个工具：</p>
<ul>
<li>require()函数，允许在当前作用域带入模块。</li>
<li>module对象，允许从当前作用域输出一些东西。</li>
</ul>
<p>必须来个<code>hello world</code>例子：</p>
<h3 id="articleHeader42">纯javascript</h3>
<p>这有个不使用commonjs的例子：</p>
<p>在salute.js文件中定义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MySalute = &quot;Hello&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var MySalute</span> = <span class="hljs-string">"Hello"</span>;</code></pre>
<p>然后在第二个文件world.js中取值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(MySalute) // hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(MySalute) <span class="hljs-comment">// hello</span></code></pre>
<h3 id="articleHeader43">模块定义</h3>
<p>实际上，MySalute因为没有定义world.js不会正常工作，我们需要把每个script定义成模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// salute.js
var MySalute = &quot;Hello&quot;;
module.exports = MySalute;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// salute.js</span>
var MySalute = <span class="hljs-string">"Hello"</span>;
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = MySalute;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// world.js
var Result = MySalute + &quot;world!&quot;;
module.exports = Result;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// world.js</span>
var Result = MySalute + <span class="hljs-string">"world!"</span>;
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = Result;</code></pre>
<p>这里我们使用了特殊的对象module然后把变量引用赋值给了module.exports，所以commonjs模块系统知道这事我们想要暴露给世界的模块内的对象。salute.js暴露了MySalute，world.js暴露了Result</p>
<h3 id="articleHeader44">模块依赖</h3>
<p>我们离成功就差了一步：依赖定义。我们早就把每个script定义成了独立的模块，但是world.js还需要知道谁定义了MySalute</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// world.js
var MySalute = require(&quot;./salute&quot;);
var Result = MySalute + &quot;world!&quot;;
module.exports = Result;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// world.js</span>
<span class="hljs-keyword">var</span> MySalute = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./salute"</span>);
<span class="hljs-keyword">var</span> Result = MySalute + <span class="hljs-string">"world!"</span>;
<span class="hljs-built_in">module</span>.exports = Result;</code></pre>
<blockquote><h1 id="articleHeader45">AMD</h1></blockquote>
<p>AMD（异步模块系统）为了适应那些觉得commonjs模块系统还没在browser准备好的人产出的，因为他们觉得commonjs的本质是同步的。</p>
<p>AMD提出了现代js的标准，以至于模块能异步的加载依赖，解决了同步加载的问题。</p>
<h3 id="articleHeader46">说明</h3>
<p>模块有defined函数来定义</p>
<p><code>define</code></p>
<p>define函数用于使用AMD定义一个模块。这只是一个带有签名的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(id?: String, dependencies?: String[], factory: Function|Object);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;">define(id?: <span class="hljs-built_in">String</span>, dependencies?: <span class="hljs-built_in">String</span>[], <span class="hljs-keyword">factory</span>: <span class="hljs-built_in">Function</span>|<span class="hljs-built_in">Object</span>);</code></pre>
<p><code>id</code></p>
<p>指定了模块的名字，可选。</p>
<p><code>dependencies</code></p>
<p>这个参数定义了被定义的模块所依赖的模块。是一个包含了模块标识符的数组，可选项。但是如果省略，默认设置成[“require”, “exports”, “module”].</p>
<p><code>factory</code></p>
<p>最后一个参数定义了模块内容，可以是个函数（立马执行），或者对象。如果factory是个函数，返回值会变成模块的导出值。</p>
<h3 id="articleHeader47">例子</h3>
<h4>命名模块</h4>
<p>定义一个名为myModule依赖jQuery的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define('myModule', ['jquery'], function($) {
    // $ is the export of the jquery module.
    $('body').text('hello world');
});
// and use it
require(['myModule'], function(myModule) {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define(<span class="hljs-string">'myModule'</span>, [<span class="hljs-string">'jquery'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>) </span>{
    <span class="hljs-comment">// $ is the export of the jquery module.</span>
    $(<span class="hljs-string">'body'</span>).text(<span class="hljs-string">'hello world'</span>);
});
<span class="hljs-comment">// and use it</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">'myModule'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">myModule</span>) </span>{});</code></pre>
<p>注意：在webpack中命名模块只在本地使用，在require.js中命名模块是全局的。</p>
<h4>匿名模块</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['jquery'], function($) {
    $('body').text('hello world');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define([<span class="hljs-string">'jquery'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>) </span>{
    $(<span class="hljs-string">'body'</span>).text(<span class="hljs-string">'hello world'</span>);
});</code></pre>
<h4>多依赖</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['jquery', './math.js'], function($, math) {
    // $ and math are the exports of the jquery module.
    $('body').text('hello world');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define([<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'./math.js'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$, math</span>) </span>{
    <span class="hljs-comment">// $ and math are the exports of the jquery module.</span>
    $(<span class="hljs-string">'body'</span>).text(<span class="hljs-string">'hello world'</span>);
});</code></pre>
<h4>导出</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define(['jquery'], function($) {

    var HelloWorldize = function(selector){
        $(selector).text('hello world');
    };

    return HelloWorldize;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define([<span class="hljs-string">'jquery'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>) </span>{

    <span class="hljs-keyword">var</span> HelloWorldize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector</span>)</span>{
        $(selector).text(<span class="hljs-string">'hello world'</span>);
    };

    <span class="hljs-keyword">return</span> HelloWorldize;
});</code></pre>
<blockquote><h1 id="articleHeader48">code Splitting 代码分割</h1></blockquote>
<p>对于大型apps而言将所有代码都放在一个文件中是不高效的。尤其是一些代码块只要某些情况下才需要加载。webpack有一个特性可以将代码分割成可根据命令加载的块。其他一些打包器称呼为「layers」「rollups」「fragments」。这个特性叫做「code splitting」</p>
<p>这是一个可选择的特性，你可以在代码中定义分割点。webpack处理依赖，导出文件以及运行时。</p>
<p>声明一个常见的误解：代码分割不只是提取通用代码放入可分享的块。更显著的特性是可以将代码分割成按需加载的块。这可以控制初始下载更小的代码然后当应用需要的时候下载其他代码。</p>
<h3 id="articleHeader49">定义分割点</h3>
<p>AMD和commonjs定义了不同的方法按需加载代码。他们都被支持并且充当分割的点。</p>
<h4>commonjs <code>require.ensure</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure(dependencies, callback)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">require</span>.<span class="hljs-keyword">ensure</span>(dependencies, callback)</code></pre>
<p><code>require.ensure</code>方法确保当回调调用的时候<code>dependencies</code>里的每个依赖都会被同步的引入。<code>require</code>作为参数传递到回调函数中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([&quot;module-a&quot;, &quot;module-b&quot;], function(require) {
    var a = require(&quot;module-a&quot;);
    // ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">"module-a"</span>, <span class="hljs-string">"module-b"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">"module-a"</span>);
    <span class="hljs-comment">// ...</span>
});</code></pre>
<p>注意：<code>require.ensure</code>只加载模块，并不执行。</p>
<h4>AMD <code>require</code>
</h4>
<p>AMD定义了一个异步的<code>require</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reuqire(dependices, callback)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">reuqire</span><span class="hljs-params">(dependices, callback)</span></span></code></pre>
<p>当调用的时候，所有依赖都被加载，callback函数中能得到依赖暴露出来的对象。</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require([&quot;module-a&quot;, &quot;module-b&quot;], function (a, b) {// ...})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>([<span class="hljs-string">"module-a"</span>, <span class="hljs-string">"module-b"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{<span class="hljs-comment">// ...})</span></code></pre>
<p>note： AMD<code>require</code>加载并执行模块。在webpack中模块由左向右执行</p>
<p>note： 省略回调函数是允许的。</p>
<h4>es6 Modules</h4>
<p>webpack不支持es6模块，根据你的编译器创建的格式直接使用<code>require.ensure</code>或者<code>require</code>。</p>
<p>webpack<code>1.x.x</code>（2.0.0支持）原生不支持es6模块。但是你可以使用编译器得到，比如：babel。把es6的import语法编译成commonjs和amd模块。这个方法是有效的但是也有一个重要的动态加载警告。</p>
<p>模块额外的语法（<code>import x from 'foo'</code>）是特意被设计为可静态分析的。这就意味着你不能动态的import。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 这是非法的
['lodash', 'backbone'].forEach(function (item) {import item})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-comment">// 这是非法的</span>
[<span class="hljs-string">'lodash'</span>, <span class="hljs-string">'backbone'</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span> </span>{<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> item})</span></code></pre>
<p>幸运的是，有个js api 「loader」用来处理动态使用例子：<code>System.load</code>(或者)<code>System.import</code>。这个API跟require变量的作用一样。然而多数编译器不支持转变<code>System.load</code>调用<code>require.ensure</code>。所以你想使用代码分割你可以直接使用require。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//static imports
import _ from 'lodash'

// dynamic imports
require.ensure([], function(require) {
  let contacts = require('./contacts')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//static imports</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>

<span class="hljs-comment">// dynamic imports</span>
<span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
  <span class="hljs-keyword">let</span> contacts = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./contacts'</span>)
})</code></pre>
<h4>块内容</h4>
<p>所有在代码分割点引用的依赖会进入新的块中，其中的依赖也会递归增加。</p>
<p>如果传入了一个函数表达式（或者绑定了一个函数表达式）作为分割点的回调函数。webpack会将所有依赖都放到块中。</p>
<h4>块chunk优化</h4>
<p>如果两个块包含相同的模块，他们会被合并成一个块。</p>
<h4>块chunk加载</h4>
<p>根据配置选项<code>target</code>一个用于块加载的运行时会被添加到打包文件<code>bundle</code>中。举个例子，将target设置成<code>web</code>块会通过jsonp被加载。一个块只会被加载一次，并且平行的请求会被合并成一个。运行时会检查已经加载的块是否满足其他块。</p>
<h4>块的类型</h4>
<p><strong>入口块</strong></p>
<p>一个入口块包含了运行时外加一系列的模块。如果块包含了模块0，运行时会执行它。如果没有运行时会等待包含模块0的块然后执行。</p>
<p><strong>普通的块</strong></p>
<p>普通块不包含运行时，这只包含一系列的模块。结构取决于块加载的算法。举个例子，jsonp中模块会被包装在jsonp的回调函数中。块也会包含一系列满足的id。</p>
<p><strong>初始块（不是入口）</strong></p>
<p>初始的块是个普通的块。唯一的区别在于优化机制认为初始块更重要因为初始块计算初始的时间。这种块的类型会出现在<code>commonsChunkPlugin</code>插件的结合中。</p>
<p><strong>分割app和vendor代码</strong></p>
<p>把你的app分割成两个文件，叫做app.js和vendor.js。你可以在vendor.js中依赖vendor类型的文件，然后传递这些名字到<code>commonsChunkPlugin</code>中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;);

module.exports = {
  entry: {
    app: &quot;./app.js&quot;,
    vendor: [&quot;jquery&quot;, &quot;underscore&quot;, ...],
  },
  output: {
    filename: &quot;bundle.js&quot;
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */&quot;vendor&quot;, /* filename= */&quot;vendor.bundle.js&quot;)
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var webpack = require(<span class="hljs-string">"webpack"</span>);

module.exports = {
<span class="hljs-symbol">  entry:</span> {
<span class="hljs-symbol">    app:</span> <span class="hljs-string">"./app.js"</span>,
<span class="hljs-symbol">    vendor:</span> [<span class="hljs-string">"jquery"</span>, <span class="hljs-string">"underscore"</span>, ...],
  },
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">"bundle.js"</span>
  },
<span class="hljs-symbol">  plugins:</span> [
    new webpack.optimize.CommonsChunkPlugin(<span class="hljs-comment">/* chunkName= */</span><span class="hljs-string">"vendor"</span>, <span class="hljs-comment">/* filename= */</span><span class="hljs-string">"vendor.bundle.js"</span>)
  ]
};</code></pre>
<p>这会从app块中移除所有vendor块。bundle.js将会保留app的代码，没有任何依赖。这些移除的代码将会留在vendor.bundle.js中。在你的html中加载</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;vendor.bundle.js&quot;></script>
<script src=&quot;bundle.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vendor.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader50">多入口的块</h3>
<p>设置多入口的点产出多入口的块是可行的。入口块包含一个运行时且当前页面只有一个运行时。（当然也有例外）</p>
<h4>运行多个入口点</h4>
<p>使用<code>commonChunkPlugin</code>插件运行时会被移到通用的块中。入口点现在在初始的块中。然而只有一个初始块会被加载，多个入口块会被加载。这就显示了在单页面执行多个入口点的可能性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;);
module.exports = {
    entry: { a: &quot;./a&quot;, b: &quot;./b&quot; },
    output: { filename: &quot;[name].js&quot; },
    plugins: [ new webpack.optimize.CommonsChunkPlugin(&quot;init.js&quot;) ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var webpack = require(<span class="hljs-string">"webpack"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> { <span class="hljs-string">a:</span> <span class="hljs-string">"./a"</span>, <span class="hljs-string">b:</span> <span class="hljs-string">"./b"</span> },
<span class="hljs-symbol">    output:</span> { <span class="hljs-string">filename:</span> <span class="hljs-string">"[name].js"</span> },
<span class="hljs-symbol">    plugins:</span> [ <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">"init.js"</span>) ]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;init.js&quot;></script>
<script src=&quot;a.js&quot;></script>
<script src=&quot;b.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"init.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"a.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"b.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>通用的块</h4>
<p><code>CommonsChunkPlugin</code>会把多入口的块移到一个新的入口块（通用块），运行时也会被移到通用的块。这意味着老的入口块现在变成了初始块。</p>
<h4>优化</h4>
<p>以下优化插件可以根据特定条件合并块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="LimitChunkCountPlugin
MinChunkSizePlugin
AggressiveMergingPlugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>LimitChunkCountPlugin
M<span class="hljs-keyword">in</span>ChunkSizePlugin
AggressiveMergingPlugin</code></pre>
<h4>命名块</h4>
<p>require.ensure函数接受额外的第三个参数。这个参数一定是一个字符串。如果两个分割点传递了相同的字符串他们会使用相同的块。</p>
<p><code>require.include</code></p>
<p>require.include是一个webpack特定的函数用来给当前块添加一个模块，但是不执行。（表达式会从bundle中移除。）</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require.ensure([&quot;./file&quot;], function(require) {
  require(&quot;./file2&quot;);
});

// is equal to

require.ensure([], function(require) {
  require.include(&quot;./file&quot;);
  require(&quot;./file2&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">require</span>.ensure([<span class="hljs-string">"./file"</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(require)</span> </span>{
  <span class="hljs-keyword">require</span>(<span class="hljs-string">"./file2"</span>);
});

<span class="hljs-comment">// is equal to</span>

<span class="hljs-keyword">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(require)</span> </span>{
  <span class="hljs-keyword">require</span>.<span class="hljs-keyword">include</span>(<span class="hljs-string">"./file"</span>);
  <span class="hljs-keyword">require</span>(<span class="hljs-string">"./file2"</span>);
});</code></pre>
<p>如果在多子块的情况下require.include是好用的，require.include在父块中会引入模块，在子块中该模块的实例会消失。</p>
<p>例子：</p>
<ul>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/code-splitting" rel="nofollow noreferrer" target="_blank">simple</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/code-splitting-bundle-loader" rel="nofollow noreferrer" target="_blank">with bundle-loader</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/code-splitted-require.context" rel="nofollow noreferrer" target="_blank">with context</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/code-splitted-require.context-amd" rel="nofollow noreferrer" target="_blank">with amd and context</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/code-splitted-dedupe" rel="nofollow noreferrer" target="_blank">with deduplication</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/named-chunks" rel="nofollow noreferrer" target="_blank">named-chunks</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points" rel="nofollow noreferrer" target="_blank">multiple entry chunks</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks" rel="nofollow noreferrer" target="_blank">multiple commons chunks</a></li>
</ul>
<p><a href="http://webpack.github.io/example-app/" rel="nofollow noreferrer" target="_blank">可执行的demo</a>可以在devTools中查看网络</p>
<blockquote><h1 id="articleHeader51">stylesheets</h1></blockquote>
<h2 id="articleHeader52">内联的样式</h2>
<p>通过使用<code>style-loader</code>和<code>css-loader</code>将样式文件内嵌到webpack js打包文件中。通过这种方式你可以将你的样式文件和其他模块一样处理。引入样式如下方式<code>require("./stylesheet.css")</code></p>
<h3 id="articleHeader53">安装</h3>
<p>从npm中安装loaders</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install style-loader css-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader <span class="hljs-comment">--save-dev</span></code></pre>
<h3 id="articleHeader54">配置</h3>
<p>下面介绍一个使<code>require()</code>正常工作的配置例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        loaders: [
            {test: /\.css$/, loader: &quot;style-loader!css-loader&quot;}
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    module: {
        loaders: [
            {test: /\.css$/, loader: <span class="hljs-string">"style-loader!css-loader"</span>}
        ]
    }
}</code></pre>
<blockquote>杜宇预编译的css语言可以查询对应的loader的配置例子，你可以在module中加入</blockquote>
<p>请牢记管理modules的执行顺序是困难的，所以请自行设计好样式文件（你也可以依赖同一份css文件中的顺序）</p>
<h3 id="articleHeader55">使用css</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在模块中直接引用样式文件
// 但这有一个副作用会在dom中添加额外的`style`标签
require(&quot;./stylesheet.css&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 在模块中直接引用样式文件</span>
<span class="hljs-comment">// 但这有一个副作用会在dom中添加额外的`style`标签</span>
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">"./stylesheet.css"</span>)</span></span></code></pre>
<h2 id="articleHeader56">分离出来的css打包文件</h2>
<p>结合<a href="https://github.com/webpack/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>就可以产出独立的css文件。</p>
<p>结合代码分割技术我们可以使用两种不同的方式：</p>
<ul>
<li>为每一份初始块生成一个css文件，在额外的块中内嵌样式信息（推荐）</li>
<li>为每一份初始块生成一个css文件，并且包含其他块的css</li>
</ul>
<p>推荐第一种方法主要是因为对于初始加载时间是最优的。在多入口文件的小型app中推荐第二种方法是因为考虑HTTP请求并发上限以及缓存。</p>
<h3 id="articleHeader57">插件安装</h3>
<p>从npm中安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install extract-text-webpack-plugin --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">extract</span>-<span class="hljs-built_in">text</span>-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader58">常规用法</h3>
<p>为了使用插件你需要改变配置，使用特殊的loader将样式输出到css文件。在代码编写后webpack优化阶段插件会检查哪个相关的模块需要被抽离（在第一种方法中只有初始块）。这些模块通过nodejs执行得到内容，另外模块被会重新编译到原先的包中代替空的模块。</p>
<p>为被抽离的模块创建了新的内容。</p>
<h3 id="articleHeader59">初始块中的样式臭历程单独的css文件</h3>
<p>这个例子展示了多入口，但是也同样适合但入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
module.exports = {
    // The standard entry point and output config
    entry: {
        posts: &quot;./posts&quot;,
        post: &quot;./post&quot;,
        about: &quot;./about&quot;
    },
    output: {
        filename: &quot;[name].js&quot;,
        chunkFilename: &quot;[id].js&quot;
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader&quot;)
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader!less-loader&quot;)
            }
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin(&quot;[name].css&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// webpack.config.js</span>
var ExtractTextPlugin = require(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
module.exports = {
    <span class="hljs-comment">// The standard entry point and output config</span>
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        posts:</span> <span class="hljs-string">"./posts"</span>,
<span class="hljs-symbol">        post:</span> <span class="hljs-string">"./post"</span>,
<span class="hljs-symbol">        about:</span> <span class="hljs-string">"./about"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].js"</span>,
<span class="hljs-symbol">        chunkFilename:</span> <span class="hljs-string">"[id].js"</span>
    },
<span class="hljs-symbol">    module:</span> {
<span class="hljs-symbol">        loaders:</span> [
            <span class="hljs-comment">// Extract css files</span>
            {
<span class="hljs-symbol">                test:</span> /\.css$/,
<span class="hljs-symbol">                loader:</span> ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader"</span>)
            },
            <span class="hljs-comment">// Optionally extract less files</span>
            <span class="hljs-comment">// or any other compile-to-css language</span>
            {
<span class="hljs-symbol">                test:</span> /\.less$/,
<span class="hljs-symbol">                loader:</span> ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader!less-loader"</span>)
            }
            <span class="hljs-comment">// You could also use other loaders the same way. I. e. the autoprefixer-loader</span>
        ]
    },
    <span class="hljs-comment">// Use the plugin to specify the resulting filename (and add needed behavior to the compiler)</span>
<span class="hljs-symbol">    plugins:</span> [
        new ExtractTextPlugin(<span class="hljs-string">"[name].css"</span>)
    ]
}</code></pre>
<h3 id="articleHeader60">所有的样式都被抽离成css文件</h3>
<p>使用第二种方法你只用设置<code>allChunks</code>成<code>true</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
module.exports = {
    // ...
    plugins: [
        new ExtractTextPlugin(&quot;style.css&quot;, {
            allChunks: true
        })
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    <span class="hljs-comment">// ...</span>
    plugins: [
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"style.css"</span>, {
            allChunks: <span class="hljs-keyword">true</span>
        })
    ]
}</code></pre>
<h3 id="articleHeader61">在通用块中的样式</h3>
<p>你可以结合CommonChunkPlugin使用独立的css文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
module.exports = {
    // ...
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(&quot;commons&quot;, &quot;commons.js&quot;),
        new ExtractTextPlugin(&quot;[name].css&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// ...</span>
module<span class="hljs-selector-class">.exports</span> = {
    <span class="hljs-comment">// ...</span>
    plugins: [
        new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>(<span class="hljs-string">"commons"</span>, <span class="hljs-string">"commons.js"</span>),
        new ExtractTextPlugin(<span class="hljs-string">"[name].css"</span>)
    ]
}</code></pre>
<blockquote><h1 id="articleHeader62">优化</h1></blockquote>
<h3 id="articleHeader63">最小化</h3>
<p>去最小化你的脚本（如果你使用css-loader还有css），webpack支持一个简单的选项：</p>
<p><code>--optimize-minize</code>或者 <code>new webpack.optimize.UglifyJsPlugin()</code></p>
<p>这是个最简单但是最有效的优化你的webapp的方法。</p>
<p>正如你所知道的（如果你有持续阅读文档）webpack会给模块和块<code>id</code>去标识他们。webpack可以改变ids的分配去得到最短的id长度作用于常用的ids：</p>
<p><code>--optimize-occurence-order</code>或者<code>new webpack.optimize.OccurenceOrderPlugin()</code></p>
<p>入口块对于文件大小有更高的优先级。</p>
<h3 id="articleHeader64">删除重复数据</h3>
<p>如果你使用一些有很多依赖的第三方库，这可能会发生一些文件会相同。webpack会发现这些文件并删除他们。这会防止你的包里包含相同的代码，相反的会在运行时应用一个函数的引用。这不影响语义，你可以这样开启：</p>
<p><code>--optimize-dedupe</code>或者<code>new webpack.optimize.DedupePlugin()</code></p>
<p>这个特性在入口文件中添加了一些开销。</p>
<h3 id="articleHeader65">块</h3>
<p>在书写代码的时候，你可能早已经添加了许多代码分割点来按需加载代码。当编译后你可能会注意到这么多的块对于http的开销来说是还是太小体量的。幸运的是，webpack可以通过后处理的方式去合并他们。你可以提供两种选项：</p>
<ul>
<li>限制块的最大数量<code>--optimize-max-chunks 15 new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})</code>
</li>
<li>限制块的最小尺寸 <code>--optimize-min-chunk-size 10000 new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})</code>
</li>
</ul>
<p>webpack通过合并chunk来解决这个优化问题（webpack更倾向于合并有相同模块的chunk）。没有东西会被合并到入口chunk，所以不会影响页面加载时间。</p>
<h3 id="articleHeader66">单页应用</h3>
<p>webpack就是被设计优化像单页应用这种web应用的。</p>
<p>你可以将app中的代码分割成多个chunk，由路由判断来加载。入口chunk只包含路由和一些第三方资源，没有内容。当你的用户在app中操作时这会工作顺利，但是对于不同路由的初始加载你可能需要一个来回：第一步获取路由第二步获取当前页内容。</p>
<p>如果你使用HTML5 history的API跳转当前页面，通过客户端代码服务器能知道哪个页面被请求。为了节省桐乡服务器的来回路程你可以包含内容块到返回中。直接添加script标签是可行的。浏览器会加载平行的chunks。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;entry-chunk.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
<script src=&quot;3.chunk.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"entry-chunk.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"3.chunk.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>你可以从stats中提取文件名（<a href="https://www.npmjs.com/package/stats-webpack-plugin" rel="nofollow noreferrer" target="_blank">stats-webpack-plugin</a>能用来导出构建后的stats）</p>
<h3 id="articleHeader67">多页应用</h3>
<p>当你编译多页面的app，你想在多页面之间共享相同的代码。事实上结合webpack这非常容易：只需要结合多个入口点进行编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        p3: &quot;./page3&quot;
    },
    output: {
        filename: &quot;[name].entry.chunk.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        p3:</span> <span class="hljs-string">"./page3"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].entry.chunk.js"</span>
    }
}</code></pre>
<p>这会生成多个入口chunk：<code>p1.entry.chunk.js</code>,<code>p2.entry.chunk.js</code>和<code>p3.entry.chunk.js</code>但是其他的chunk能通过他们分享。</p>
<p>如果你的入口chunks有一些相同的模块，这有个很好用的插件。<code>CommonsChunkPlugin</code>识别相同的模块然后将他们放入一个通用chunk。你需要在页面中加入两个script标签。一个是通用的chunk，一个是入口chunk。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        p3: &quot;./page3&quot;
    },
    output: {
        filename: &quot;[name].entry.chunk.js&quot;
    },
    plugins: [
        new CommonsChunkPlugin(&quot;commons.chunk.js&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var CommonsChunkPlugin = require(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        p3:</span> <span class="hljs-string">"./page3"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].entry.chunk.js"</span>
    },
<span class="hljs-symbol">    plugins:</span> [
        new CommonsChunkPlugin(<span class="hljs-string">"commons.chunk.js"</span>)
    ]
}</code></pre>
<p>这会形成多个入口chunk<code>p1.entry.chunk.js</code>,<code>p2.entry.chunk.js</code>和<code>p3.entry.chunk.js</code>。加上一个<code>common.chunk.js</code>，首先加载<code>common.chunk.js</code>然后加载<code>xx.entry.chunk.js</code></p>
<p>你也可以通过选择入口chunks形成多个通用chunks，你也可以嵌套通用chunks</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        p3: &quot;./page3&quot;,
        ap1: &quot;./admin/page1&quot;,
        ap2: &quot;./admin/page2&quot;
    },
    output: {
        filename: &quot;[name].js&quot;
    },
    plugins: [
        new CommonsChunkPlugin(&quot;admin-commons.js&quot;, [&quot;ap1&quot;, &quot;ap2&quot;]),
        new CommonsChunkPlugin(&quot;commons.js&quot;, [&quot;p1&quot;, &quot;p2&quot;, &quot;admin-commons.js&quot;])
    ]
};
// <script>s required:
// page1.html: commons.js, p1.js
// page2.html: commons.js, p2.js
// page3.html: p3.js
// admin-page1.html: commons.js, admin-commons.js, ap1.js
// admin-page2.html: commons.js, admin-commons.js, ap2.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var CommonsChunkPlugin = require(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        p3:</span> <span class="hljs-string">"./page3"</span>,
<span class="hljs-symbol">        ap1:</span> <span class="hljs-string">"./admin/page1"</span>,
<span class="hljs-symbol">        ap2:</span> <span class="hljs-string">"./admin/page2"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].js"</span>
    },
<span class="hljs-symbol">    plugins:</span> [
        new CommonsChunkPlugin(<span class="hljs-string">"admin-commons.js"</span>, [<span class="hljs-string">"ap1"</span>, <span class="hljs-string">"ap2"</span>]),
        new CommonsChunkPlugin(<span class="hljs-string">"commons.js"</span>, [<span class="hljs-string">"p1"</span>, <span class="hljs-string">"p2"</span>, <span class="hljs-string">"admin-commons.js"</span>])
    ]
};
<span class="hljs-comment">// &lt;script&gt;s required:</span>
<span class="hljs-comment">// page1.html: commons.js, p1.js</span>
<span class="hljs-comment">// page2.html: commons.js, p2.js</span>
<span class="hljs-comment">// page3.html: p3.js</span>
<span class="hljs-comment">// admin-page1.html: commons.js, admin-commons.js, ap1.js</span>
<span class="hljs-comment">// admin-page2.html: commons.js, admin-commons.js, ap2.js</span></code></pre>
<p>高级用法： 你可以在通用chunk中运行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        commons: &quot;./entry-for-the-commons-chunk&quot;
    },
    plugins: [
        new CommonsChunkPlugin(&quot;commons&quot;, &quot;commons.js&quot;)
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var CommonsChunkPlugin = require(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        commons:</span> <span class="hljs-string">"./entry-for-the-commons-chunk"</span>
    },
<span class="hljs-symbol">    plugins:</span> [
        new CommonsChunkPlugin(<span class="hljs-string">"commons"</span>, <span class="hljs-string">"commons.js"</span>)
    ]
};</code></pre>
<p>看<a href="https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points" rel="nofollow noreferrer" target="_blank">multiple-entry-points example</a>和<a href="https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks" rel="nofollow noreferrer" target="_blank">advanced multiple-commons-chunks example</a></p>
<blockquote><h1 id="articleHeader68">长期缓存</h1></blockquote>
<p>为了有效的缓存文件，文件需要带有hash或者版本号的URL。你可以人为的修改产出的文件的版本号<code>v.1.3</code>但是这样不是很方便。额外的人工才操作以及没有改变的文件不从缓存中加载。</p>
<p>webpack可以根据文件名给文件添加hash值。处理文件的loaders（worker-loader，file-loader）早已经实现，对于chunks你需要开启它，有两种等级：</p>
<ol>
<li>计算所有chunks的hash</li>
<li>为每个chunk计算hash</li>
</ol>
<h3 id="articleHeader69">选择1：一个bundle一个hash</h3>
<p>选择1通过为文件名配置hash选项来开启</p>
<p><code>webpack ./entry output/[hash].bundle.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    output: {
        path: path.join(__dirname, &quot;assets&quot;, &quot;[hash]&quot;),
        publicPath: &quot;assets/[hash]/&quot;,
        filename: &quot;output.[hash].bundle.js&quot;,
        chunkFilename: &quot;[id].[hash].bundle.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">output</span>: {
        path: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"assets"</span>, <span class="hljs-string">"[hash]"</span>),
        publicPath: <span class="hljs-string">"assets/[hash]/"</span>,
        filename: <span class="hljs-string">"output.[hash].bundle.js"</span>,
        chunkFilename: <span class="hljs-string">"[id].[hash].bundle.js"</span>
    }
}</code></pre>
<h3 id="articleHeader70">选择2： 每个chunk一个hash</h3>
<p>选项2通过添加[chunkhash]到chunkFilename配置选项来开启。</p>
<p><code>--output-chunk-file [chunkhash].js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: { chunkFilename: &quot;[chunkhash].bundle.js&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">output</span>: { <span class="hljs-attribute">chunkFilename</span>: <span class="hljs-string">"[chunkhash].bundle.js"</span> }</code></pre>
<p>记得你需要在html中引用带有hash的入口chunk。你可能想从stats提取hash或者文件名。结合热替换你必须使用选项1，但不是在<code>publicPath</code>配置项中。</p>
<h3 id="articleHeader71">从stats中获取文件名</h3>
<p>你可能想得到最后的文件名字嵌入你的html中。这个信息在webpack的stats中是可以获取的。如果你是使用CLI你可以运行<code>--json</code>去得到以json形式输出的stats。</p>
<p>你可以在配置文件中加入<a href="https://www.npmjs.com/package/assets-webpack-plugin" rel="nofollow noreferrer" target="_blank">assets-webpack-plugin</a>插件来允许你得到stats对象。接下来是一个将此写入文件的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  function() {
    this.plugin(&quot;done&quot;, function(stats) {
      require(&quot;fs&quot;).writeFileSync(
        path.join(__dirname, &quot;..&quot;, &quot;stats.json&quot;),
        JSON.stringify(stats.toJson()));
    });
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>plugins: [
  <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.plugin(<span class="hljs-string">"done"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">stats</span>) </span>{
      <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>).writeFileSync(
        path.join(__dirname, <span class="hljs-string">".."</span>, <span class="hljs-string">"stats.json"</span>),
        <span class="hljs-built_in">JSON</span>.stringify(stats.toJson()));
    });
  }
]</code></pre>
<p>stats json包含了好用的对象--<code>assetsByChunkName</code>，这个对象包含了以chunk为键名文件名为键值的对象。</p>
<blockquote><h1 id="articleHeader72">多入口的点</h1></blockquote>
<p>要求：<a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">代码分割</a></p>
<p>如果你需要多个打包文件给多个html页面使用，你可以使用「多入口点」特性。这会同时生成多个打包文件。额外的chunks可以被这些入口chunks共享，模块只会被构建一次。</p>
<blockquote>提示： 如果你想从模块中开始一个入口chunk，这是个错误的想法。使用代码分割！</blockquote>
<p>每一个入口chunk都包含了webpack运行时，所以你只用在每个页面加载一个入口chunk（提示：可以使用commonsChunkPlugin插件去绕过这个限制将运行时放入单个chunk中。）</p>
<h3 id="articleHeader73">配置</h3>
<p>为了使用多入口点你可以往entry选项中传入一个对象。键名代表了入口点的名字，键值代表了入口点。</p>
<p>当应用多入口点时必须改写默认的<code>output.filename</code>选项。不然每个入口点都会写入相同的文件。使用<code>[name]</code>得到入口点的名字。</p>
<h3 id="articleHeader74">最简单的配置例子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        a: &quot;./a&quot;,
        b: &quot;./b&quot;,
        c: [&quot;./c&quot;, &quot;./d&quot;]
    },
    output: {
        path: path.join(__dirname, &quot;dist&quot;),
        filename: &quot;[name].entry.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">entry</span>: {
        a: <span class="hljs-string">"./a"</span>,
        b: <span class="hljs-string">"./b"</span>,
        c: [<span class="hljs-string">"./c"</span>, <span class="hljs-string">"./d"</span>]
    },
    <span class="hljs-selector-tag">output</span>: {
        <span class="hljs-attribute">path</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"dist"</span>),
        filename: <span class="hljs-string">"[name].entry.js"</span>
    }
}</code></pre>
<h3 id="articleHeader75">例子</h3>
<ul>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points" rel="nofollow noreferrer" target="_blank">multiple-entry-points</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/multi-part-library" rel="nofollow noreferrer" target="_blank">multi-part-library</a></li>
<li><a href="https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks" rel="nofollow noreferrer" target="_blank">multiple-commons-chunks</a></li>
</ul>
<blockquote><h1 id="articleHeader76">第三方库和拓展</h1></blockquote>
<p>你开发了一个第三方库然后要分到编译/打包后的版本（除了模块化的版本）。你想要允许用户在script标签或者amd加载器中使用。或者你想取决于不同的预编译器而不限制用户，把这个模块作为普通的commonjs模块。</p>
<h3 id="articleHeader77">配置选项</h3>
<p>webpack有三个跟这个情况相关的配置选项：<code>output.library</code>,<code>output.libraryTarget</code>,<code>externals</code></p>
<p><code>output.libraryTarget</code>允许你控制输出的类型，举例：commonjs,amd,script中使用。</p>
<p><code>output.library</code>允许你指定第三方库的名字。</p>
<p><code>externals</code>允许你指定第三方库的不需要经过webpack处理的依赖。但是是输出文件的依赖。这也表明了他们是在运行时环境中输入的。</p>
<h3 id="articleHeader78">例子</h3>
<p>编译在script中使用的第三方库。</p>
<ul>
<li>依赖jquery，但是jquery不应该包含在打包文件中。</li>
<li>library应该在全局上下文中的Foo中可访问。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = require(&quot;jquery&quot;);
var math = require(&quot;math-library&quot;);

function Foo() {}

// ...

module.exports = Foo;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> jQuery = <span class="hljs-built_in">require</span>(<span class="hljs-string">"jquery"</span>);
<span class="hljs-keyword">var</span> math = <span class="hljs-built_in">require</span>(<span class="hljs-string">"math-library"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Foo</span>(<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// ...</span>

<span class="hljs-built_in">module</span>.exports = Foo;</code></pre>
<p>推荐的配置（与之相关）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    output: {
        // export itself to a global var
        libraryTarget: &quot;var&quot;,
        // name of the global var: &quot;Foo&quot;
        library: &quot;Foo&quot;
    },
    externals: {
        // require(&quot;jquery&quot;) is external and available
        //  on the global var jQuery
        &quot;jquery&quot;: &quot;jQuery&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
    outpu<span class="hljs-variable">t:</span> {
        // export itself <span class="hljs-keyword">to</span> <span class="hljs-keyword">a</span> <span class="hljs-keyword">global</span> var
        libraryTarge<span class="hljs-variable">t:</span> <span class="hljs-string">"var"</span>,
        // name of the <span class="hljs-keyword">global</span> var: <span class="hljs-string">"Foo"</span>
        library: <span class="hljs-string">"Foo"</span>
    },
    external<span class="hljs-variable">s:</span> {
        // require(<span class="hljs-string">"jquery"</span>) <span class="hljs-keyword">is</span> external <span class="hljs-built_in">and</span> available
        //  <span class="hljs-keyword">on</span> the <span class="hljs-keyword">global</span> var jQuery
        <span class="hljs-string">"jquery"</span>: <span class="hljs-string">"jQuery"</span>
    }
}</code></pre>
<p>打包结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Foo = (/* ... webpack bootstrap ... */
{
    0: function(...) {
        var jQuery = require(1);
        /* ... */
    },
    1: function(...) {
        module.exports = jQuery;
    },
    /* ... */
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Foo = (<span class="hljs-comment">/* ... webpack bootstrap ... */</span>
{
    <span class="hljs-number">0</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...) {
        var</span> jQuery = require(1)</span></span>;
        <span class="hljs-comment">/* ... */</span>
    },
    <span class="hljs-number">1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-rest_arg">...) {
        module</span>.exports = jQuery;
    },
    <span class="hljs-comment">/* ... */</span>
})</span></span>;
</code></pre>
<h3 id="articleHeader79">应用以及外部资源</h3>
<p>你也可以使用<code>externals</code>选项向应用导出一个存在的接口。举个例子，你想使用cdn资源script引用的jquery，但又明确声明通过<code>require('jquery')</code>作为依赖，你可以像这样把他指定为外部资源：<code>{externals: {jquery: "jQuery""}}"</code></p>
<h3 id="articleHeader80">分解以及外部资源</h3>
<p>外部资源在分解请求之前执行，这意味着你需要指定没有分解的请求。externals中不能应用loaders，所以你需要用loader具体化一个请求。<code>require("bundle!jquery")  { externals: {"bundle!jquery": "bundledJQuery""}}"</code></p>
<blockquote><h1 id="articleHeader81">垫板模块（shim）</h1></blockquote>
<p>不是所有js文件都可以直接使用webpack。此文件可能是webpack不支持的文件，甚至没有任何模块形式。</p>
<p>webpack提供一些loaders使这些文件可以跟webpack一起工作。</p>
<p>下面的例子使用require保持简洁。你通常都会在webpack中配置他们。</p>
<h2 id="articleHeader82">输入</h2>
<p>如果一个文件的依赖不是通过require()引入的，你可以使用以下loader中的一种。</p>
<h3 id="articleHeader83"><code>imports-loader</code></h3>
<p>import loader允许你根据不同的全局变量去使用模块。</p>
<p>对于依赖像$或者this的第三方模块这是很方便的。imports loader会添加必要的<code>require('whatever')</code>调用。所以这些模块可以跟webpack工作。</p>
<p>例子： </p>
<p>file.js 需要一个全局的$变量，你也有一个应该被使用的jquery模块。</p>
<p><code>require("imports?$=jquery!./file.js")</code></p>
<p>file.js需要一个全局的配置变量<code>xConfig</code>，你希望是<code>{value: 123}</code></p>
<p><code>require("imports?xConfig=&gt;{value:123}!./file.js")</code></p>
<p>file.js需要一个全局的this对象。</p>
<p><code>require("imports?this=&gt;window!./file.js") or require("imports?this=&gt;global!./file.js")</code></p>
<h3 id="articleHeader84">
<a href="http://webpack.github.io/docs/list-of-plugins.html" rel="nofollow noreferrer" target="_blank">plugin</a> 提供插件</h3>
<p>这个插件使得一个模块在任何模块中能称为一个变量。只有当你使用这个变量的时候才会依赖这个模块。</p>
<p>例子： 不需要写<code>require("jquery")</code>就能在任何模块中使用$和jquery变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
    $: &quot;jquery&quot;,
    jQuery: &quot;jquery&quot;,
    &quot;window.jQuery&quot;: &quot;jquery&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
    $: <span class="hljs-string">"jquery"</span>,
    jQuery: <span class="hljs-string">"jquery"</span>,
    <span class="hljs-string">"window.jQuery"</span>: <span class="hljs-string">"jquery"</span>
})</code></pre>
<h2 id="articleHeader85">输出</h2>
<p>不暴露值的文件。</p>
<h3 id="articleHeader86"><code>exports-loader</code></h3>
<p>这个loader暴露文件的内部变量。</p>
<p>例子：</p>
<p>这个文件在全局上下文定义了一个变量<code>var XModule = ...</code></p>
<p><code>var XModule = require("exports?XModule!./file.js")</code></p>
<p>这个文件在全局上下文定义了多个变量 <code>var XParser, Minimizer</code></p>
<p><code>var XModule = require("exports?Parser=XParser&amp;Minimizer!./file.js"); XModule.Parser; XModule.Minimizer</code></p>
<p>这个文件设置了一个全局变量 <code>XModule = ....</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;imports?XModule=>undefined!exports?XModule!./file.js&quot;) (import to not leak to the global context)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">require</span>(<span class="hljs-string">"imports?XModule=&gt;undefined!exports?XModule!./file.js"</span>) (<span class="hljs-keyword">import</span> <span class="hljs-keyword">to</span> <span class="hljs-literal">not</span> leak <span class="hljs-keyword">to</span> the <span class="hljs-built_in">global</span> context)</code></pre>
<p>这个文件在window对象下设置了属性 <code>window.XModule = ...</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;imports?window=>{}!exports?window.XModule!./file.js&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">"imports?window=&gt;{}!exports?window.XModule!./file.js"</span>)</span></span></code></pre>
<h2 id="articleHeader87">修复错误使用的模块风格</h2>
<p>有些模块使用了错误的模块风格。你想去修复并且告诉webpack不要使用这种风格。</p>
<h3 id="articleHeader88">使模块风格失效</h3>
<p>例子：</p>
<h4>AMD失效</h4>
<p>require("imports?define=&gt;false!./file.js")</p>
<h4>CommonJs失效</h4>
<p>require("imports?require=&gt;false!./file.js")</p>
<h3 id="articleHeader89">
<a href="http://webpack.github.io/docs/configuration.html" rel="nofollow noreferrer" target="_blank">配置</a> 选项 <code>module.noParse</code>
</h3>
<p>webpack会使解析失效，因此你不能使用依赖，这对已经打包好的第三方库比较实用。</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        noParse: [
            /XModule[\\\/]file\.js$/,
            path.join(__dirname, &quot;web_modules&quot;, &quot;XModule2&quot;)
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">module</span>: {
        noParse: [
            /XModule[\\\/]file\.js$/,
            path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"web_modules"</span>, <span class="hljs-string">"XModule2"</span>)
        ]
    }
}</code></pre>
<blockquote>exports 和 module任然是可用的，你可以使用imports-loader使他们失效。</blockquote>
<h3 id="articleHeader90"><code>script-loader</code></h3>
<p>这个loader在全局上下文中评估代码，就跟你在script中添加代码一样。这种方式每一个第三方库都能正常工作，require、module等都会失效。</p>
<blockquote>注意：此文件会被当做字符串加入到bundle中，不会被webpack压缩，所以我们需要使用压缩版本。也没有作用于这种loader加载的第三方库的开发者工具。</blockquote>
<h2 id="articleHeader91">暴露</h2>
<p>有些情况你想一个模块暴露出自己。</p>
<p>除非必须不然少用（providePlugin更好）</p>
<h3 id="articleHeader92"><code>expose-loader</code></h3>
<p>这个loader将模块暴露到全局上下文中。</p>
<p>例子： </p>
<p>将file.js暴露到全局上下文中的XModule变量。</p>
<p><code>require("expose?XModule!./file.js")</code></p>
<p>另一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   require('expose?$!expose?jQuery!jquery');

   ...

   $(document).ready(function() {
   console.log(&quot;hey&quot;);
   })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-built_in">require</span>(<span class="hljs-string">'expose?$!expose?jQuery!jquery'</span>);

   ...

   $(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hey"</span>);
   })</code></pre>
<p>通过jquery文件暴露到全局上下文，你可以在项目中的任何地方使用jquery。同理你想使用bootstrap也可以通过这种方法。</p>
<p>注意： 使用太多全局变量会使你的app缺少效率，如果你想使用大量命名空间，考虑在项目中加入<a href="http://babeljs.io/docs/plugins/transform-runtime/" rel="nofollow noreferrer" target="_blank">Babel runtime</a></p>
<h2 id="articleHeader93">loader的顺序</h2>
<p>在非常小的应用场景下你需要应用不只一个配置，你需要使用正确的loader顺序。内嵌：<code>expose!imports!exports</code> ，配置项：expose before imports before exports.。</p>
<blockquote><h1 id="articleHeader94">测试</h1></blockquote>
<p>有两种方式可以测试web应用：</p>
<ul>
<li>浏览器：你可以得到更现实的测试，但是你需要准备更多的基础建设，且测试需要花费更多时间。你可以测试dom。</li>
<li>nodejs：你不能测试dom，但是测试会更快。</li>
</ul>
<h3 id="articleHeader95">浏览器测试</h3>
<h4>mocha-loader</h4>
<p>mocha-loader使用mocha框架执行你的代码。如果执行代码你会在浏览器看到测试结果。</p>
<p>提示：当在bash命令行使用<code>！</code>时，你需要使用<code>\</code>转义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack 'mocha!./test.js' testBundle.js
<!--index.html is a HTML page which loads testBundle.js-->
open index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>webpack 'mocha!./test.js' testBundle.js
<span class="hljs-comment">&lt;!--index.html is a HTML page which loads testBundle.js--&gt;</span>
open index.html</code></pre>
<h4>webpack-dev-server</h4>
<p>webpack-dev-server会自动的创建加载脚本的HTML页面。当文件改变时会重新执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server 'mocha!./test.js' --hot --inline --output-filename test.js
open http://localhost:8080/test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>webpack-dev-server <span class="hljs-string">'mocha!./test.js'</span> --hot --<span class="hljs-keyword">inline</span> --output-filename test.js
<span class="hljs-built_in">open</span> http:<span class="hljs-comment">//localhost:8080/test</span></code></pre>
<p>提示：使用<code>--hot</code>服务器只会在该文件或该文件的依赖有变化时重新执行测试。</p>
<h4>karma与webpack</h4>
<p>你可以将webpack与karma一起使用，将webpack作为<a href="https://github.com/webpack/karma-webpack" rel="nofollow noreferrer" target="_blank">预处理器</a>加进karma的配置中</p>
<h3 id="articleHeader96">nodejs</h3>
<blockquote><h1 id="articleHeader97">打包性能</h1></blockquote>
<p>如果你在寻找加速webpack打包的方法，你可能要通过以下几种方法去更加深入的提高你配置的webpack的打包性能。</p>
<h2 id="articleHeader98">逐步的打包</h2>
<p>确保每次打包的时候不会全部重新打包。webpack有一个强大的缓存层允许你使用内存中早已编译好的模块，以下几种方法帮助使用：</p>
<ul>
<li>webpack-dev-server： 将所有资源存到内存，性能最好。</li>
<li>webpack-dev-middleware：与webpack-dev-server有相同的性能，提供给有深层定制的用户</li>
<li>webpack --watch 或者 <code>watch: true</code> 有缓存，但是缓存到硬盘，性能一般。</li>
</ul>
<h2 id="articleHeader99">不解析某些模块</h2>
<p>使用<code>noParse</code>可以在解析时排除大的第三方库，但是会中断。</p>
<h2 id="articleHeader100">打包过程的信息</h2>
<p>有个<a href="http://webpack.github.io/analyse/" rel="nofollow noreferrer" target="_blank">分析工具</a>可以提供详细的分析和一些可以帮助你优化打包文件大小和性能的有用信息。</p>
<h2 id="articleHeader101">chunks</h2>
<p>从内部表现生成源文件代价是高的。只有当这个chunk内部没有任何改变时，chunk都由自己缓存。大多数chunk取决于自身包含的模块，但是入口chunk不同，如果额外的chunk名字改变了，入口块同样会被认为是脏的，即被修改过的。所以使用在文件名中使用<code>[hash]或者[chunkhash]</code>时，入口chunk几乎会在每次修改中都重新构建。</p>
<p>使用HMR入口chunk会嵌入编译的hash所以每次改变也会被认为是脏的。</p>
<h2 id="articleHeader102">sourcemaps</h2>
<p>优秀的sourceMaps会减慢build</p>
<p><code>devtool: "source-map"</code> 不会缓存模块的sourcemaps而且会重新生成chunk的sourcemaps。这是给生产环境用的。</p>
<p><code>devtool: "eval-source-map"</code> 跟上一种异样好，但是会缓存模块的sourcemaps，对于重复构建速度会快。</p>
<p><code>devtool: "eval-cheap-module-source-map"</code> 只提供行的sourcemaps，速度更快</p>
<p><code>devtool: "eval-cheap-source-map"</code> 不会生成模块的sourcemaps，例如jsx向js的mapping</p>
<p><code>devtool: "eval"</code> 性能最好，但只生产模块的sourcemaps，在一些情况下这是足够的。使用<code>output.pathinfo: true</code>编译</p>
<p>UglifyJsPlugin插件使用sourcemaps生成对应源代码的错误信息，但是sourcemaps是慢的，在生产环境使用是ok的，如果构建时速度太慢（甚至不能完成），你需要关闭这个功能。<code>new UglifyJsPlugin({ sourceMap: false })</code></p>
<h2 id="articleHeader103">RESOLVE.ROOT 对比 RESOLVE.MODULESDIRECTORIES</h2>
<p>只在嵌套路径下使用<a href="http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories" rel="nofollow noreferrer" target="_blank">resolve.modulesDirectories</a>，大多数路径使用<a href="http://webpack.github.io/docs/configuration.html#resolve-root" rel="nofollow noreferrer" target="_blank">resolve.root</a>，这可以给出<a href="https://github.com/webpack/webpack/issues/1574#issuecomment-157520561" rel="nofollow noreferrer" target="_blank">性能展示</a> 看<a href="https://github.com/webpack/webpack/issues/472#issuecomment-55706013" rel="nofollow noreferrer" target="_blank">讨论</a></p>
<h2 id="articleHeader104">优化的插件</h2>
<p>只在生产环境使用优化用的插件</p>
<h2 id="articleHeader105">提前取得模块</h2>
<p><a href="http://webpack.github.io/docs/list-of-plugins.html#prefetchplugin" rel="nofollow noreferrer" target="_blank">prefetch</a></p>
<h2 id="articleHeader106">动态链接的库</h2>
<p>如果你有大量很少改变的模块（比如说vendor），chunking不会带来多大的性能提升（commonChunkPlugin），这有两个插件可以在分隔的大包进程中创建一个打包文件，但是也会在appbundle中引用。</p>
<p>提前创建DLL包你需要使用Dllplugin，这是<a href="https://github.com/webpack/webpack/tree/master/examples/dll" rel="nofollow noreferrer" target="_blank">例子</a>。这会触发公共的打包文件和私有的清单文件。</p>
<p>从APP打包文件中引用DLL打包文件，你需要使用<code>DllRefencePlugin</code>这是<a href="https://github.com/webpack/webpack/tree/master/examples/dll-user" rel="nofollow noreferrer" target="_blank">例子</a>，在找到Dll打包文件之前会阻止依赖app的文件。</p>
<blockquote><h1 id="articleHeader107">热加载</h1></blockquote>
<p>注意模块热替换机制目前还处于试验阶段。</p>
<h2 id="articleHeader108">介绍</h2>
<p>模块热替换（HMR）会在应用运行时替换、增加、移除模块而不用重新加载页面。</p>
<h3 id="articleHeader109">要求</h3>
<ul>
<li>使用plugins <a href="http://webpack.github.io/docs/using-plugins.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a>
</li>
<li>代码分割： <a href="http://webpack.github.io/docs/code-splitting.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a>
</li>
<li>webpack-dev-serve <a href="http://webpack.github.io/docs/webpack-dev-server.html" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs...</a>
</li>
</ul>
<h3 id="articleHeader110">HMR如何工作</h3>
<p>webpack在构建打包的过程中增加一个小型的HMR运行时到打包文件中。当构建完成时，webpack不会退出并保持活跃。观察源文件的变化。如果webpack检测到文件的变化，他会重新构建变化的模块。取决于webpack的设置，webpack会给HMR运行时发送一个信号，或者HMR运行时会查询webpack的变化。不管哪种形式，改变的模块会被发送到HMR运行时，然后应用热更新。首先HMR运行时会检查更新的模块能不能自我accept，如果不会那么会检查依赖这些变化模块的模块。如果这些模块也不会accept，则会冒泡到下一个层级，知道能执行accept方法，或者到达app的入口文件，这也意味着热更新是失败的。</p>
<h3 id="articleHeader111">从app的视角</h3>
<p>app代码请求HMR检查更新，HMR运行时异步的下载更新然后告知app代码更新是可用的。然后app代码告知HMR运行时应用这些更新，然后HMR同步的应用更新。app代码要不要依赖用户的输入取决于开发者自己。</p>
<h3 id="articleHeader112">从编译器（webpack）的视角</h3>
<p>除了普通的资源编译器还需要触发「update」以允许从之前的版本更新到当前版本，「update」包含两部分：</p>
<ol>
<li>更新清单（json）</li>
<li>一个或多个更新的chunk（js）</li>
</ol>
<p>清单包含新的hash值和更新的chunk。</p>
<p>更新的chunks包含了所有模块。</p>
<p>编译器额外确保模块和chunk的id在build之间是不变的。他使用「record」json文件去存储或者在内存中存储。</p>
<h3 id="articleHeader113">从模块视角</h3>
<p>HMR是一个可选的特性，所以这只会影响包含HMR代码的模块。文档描述的API在模块中都是可用的。通常情况下模块开发者需要写一个handles，这个handles在这个模块的依赖更新时会被触发。他也能写一个当此模块更新时就会触发的handle。在大多数情况下在每个模块中写HMR的代码不是强制的。如果一个模块没有HMRhandles那么更新会传递到下一个层级。这就意味了一个handle能沿着模块树处理一个更新。如果一个模块更新了，整个模块树都会重载（只重载不转移）</p>
<h3 id="articleHeader114">从HMR运行时视角</h3>
<p>对于模块系统来说运行时是额外的代码用来触发追踪父模块和子模块。</p>
<p>在管理方面运行时支持两个方法： <code>check</code>和<code>apply</code></p>
<p><code>check</code>从更新清单发起http请求，如果请求失败则没有更新的内容。不然请求来的chunks列表会跟当前已经加载的chunks进行对比。每一个已加载的chunk与之对应的更新chunk会被下载。所有的模块更新在更新的同时都会存到运行时中。此时runtime进入「ready」状态，意味着更新已经下载等待被应用。</p>
<p>在ready状态下每个新的chunk请求也会被下载。</p>
<p><code>apply</code>方法标记所有更新的模块为无效。对于每一个无效的模块需要一个updatehandle或者在其父模块上需要update handle。不然无效打包文件会将所有父级都标记为无效。这个过程一直持续到没有冒泡发生。如果冒泡到入口chunk则热替换失败。</p>
<p>现在所有无效模块都被处理了但是没有加载。然后当前的hash更新所有的accept被调用。runtime重新回到「idle」状态。</p>
<h3 id="articleHeader115">生成文件</h3>
<h3 id="articleHeader116">我能用它做什么</h3>
<p>你可以在开发环境当成livereload去使用它。事实上webpack-dev-server支持热替换模式，尝试在重新加载整个页面之前用HMR替换。你只需要添加<code>webpack/hot/dev-server</code>入口点然后用<code>--hot</code>开启开发服务器。</p>
<p><code>webpack/hot/dev-server</code>当HMR更细失败后会重新加载整个页面。如果你想用你自己的方式重载页面，你可以添加在入口点<code>webpack/hot/only-dev-server</code>。</p>
<p>你也当做更新机制在生产环境使用。你需要写相关的代码与HMR交互。</p>
<p>一些loaders生产的模块已经是可以热更新的。<code>style-loader</code>能改变样式表。你不需要做其他特殊的东西。</p>
<h3 id="articleHeader117">使用它需要做什么</h3>
<p>一个模块只有你accept才会更新。所以你需要写<code>module.hot.accept</code>在模块的父级及以上。举例：router是个好地方。</p>
<p>如果你只是想与webpack-dev-server一起使用，只用加<code>webpack/hot/dev-server</code>当做入口点。不然你需要使用能调用<code>check</code>和<code>apply</code>HMR代码。</p>
<p>你需要开启编译器的record去跟踪编译过程中的id（watch方式和webpack-dev-server会将records保存到内存，所以在开发过程中不需要）</p>
<p>你需要在编译器开启HMR并且添加HMR运行时。</p>
<h3 id="articleHeader118">为什么看起来这么酷</h3>
<ul>
<li>这是模块层级的实时更新</li>
<li>可以在生产环境使用</li>
<li>更新考虑代码分割，只会下载app所需部分的更新。</li>
<li>你可以在你的app部分代码使用这个功能，并不影响其他模块。</li>
<li>如果HMR关闭了，所有HMR代码会被移除（在<code>if(module.not)</code>包裹下）</li>
</ul>
<h2 id="articleHeader119">练习</h2>
<p>配合webpack使用热替换你需要4件事：</p>
<ul>
<li>records （--records-path, recordsPath: ...）</li>
<li>全局允许热替换（HotModuleReplacementPlugin）</li>
<li>在你的代码里加入热替换<code>module.hot.accept</code>
</li>
<li>热替换管理代码<code>module.hot.check, module.hot.apply</code>
</li>
</ul>
<p>小栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* style.css */
body {
    background: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* style.css */</span>
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background</span>: red;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* entry.js */
require(&quot;./style.css&quot;);
document.write(&quot;<input type='text' />&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* entry.js */</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./style.css"</span>);
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;input type='text' /&gt;"</span>);</code></pre>
<p>然后就可以使用dev-server使用热替换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-dev-server -g
npm install webpack css-loader style-loader
webpack-dev-server ./entry --hot --inline --module-bind &quot;css=style\!css&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> webpack webpack-dev-<span class="hljs-keyword">server</span> -g
npm <span class="hljs-keyword">install</span> webpack css-loader <span class="hljs-keyword">style</span>-loader
webpack-dev-<span class="hljs-keyword">server</span> ./entry <span class="hljs-comment">--hot --inline --module-bind "css=style\!css"</span></code></pre>
<p>dev-server提供内存records，这对于开发是很好地。</p>
<p><code>--hot</code>开关开启代码热替换。</p>
<blockquote>这会添加HotModuleReplacementPlugin，确保不么添加<code>--hot</code>，不么就在webpack.config.js里添加HotModuleReplacementPlugin，但是永远不要同一时间两个都加。HMR插件会添加两次。</blockquote>
<p>有个特殊的控制代码<code>webpack/hot/dev-server</code>，会被<code>--inline</code>自动添加。（你不用手动添加在webpack.config.js）</p>
<p><code>style-loader</code>已经包含热替换代码。</p>
<p>阅读更多关于如何写热替换代码<a href="http://webpack.github.io/docs/hot-module-replacement.html" rel="nofollow noreferrer" target="_blank">hot module replacement</a></p>
<p>联系作者<a href="http://weibo.com/u/2115840795" rel="nofollow noreferrer" target="_blank">微博</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack1.0官网文档翻译（完）

## 原文链接
[https://segmentfault.com/a/1190000007568507](https://segmentfault.com/a/1190000007568507)

