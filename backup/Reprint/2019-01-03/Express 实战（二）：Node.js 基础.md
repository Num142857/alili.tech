---
title: 'Express 实战（二）：Node.js 基础' 
date: 2019-01-03 2:30:11
hidden: true
slug: bgzrztky2v
categories: [reprint]
---

{{< raw >}}

                    
<p>在上一篇<a href="https://bignerdcoding.com/archives/Express-shi-zhan-yi-gai-lan.html" rel="nofollow noreferrer" target="_blank">文章</a>中，我们简单的介绍了 Node.js 。了解到它基于 JavaScript、天生异步、拥有大量的第三方类库。本文将会在之前的基础上，对 Node.js 进行更深入的介绍。其中主要内容包括：</p>
<ul>
<li>Node 的安装</li>
<li>如何使用第三方模块生态</li>
<li>第三方模块的安装</li>
<li>一些简单的使用示例</li>
<li>开发过程中的一些建议和技巧</li>
</ul>
<p>在此之前，我假设你已经掌握了 JavaScript 基础知识并且熟悉一些基本的命令行操作。另外，不要臆想通过这一章就全面掌握 Node。但是如果你有心的话，可以去阅读 <strong>Node.js 实战</strong>。</p>
<p>&lt;!--more--&gt;</p>
<h2 id="articleHeader0">安装Node</h2>
<p>JavaScript 世界的一大特点就是它选择性非常多，Node 的安装也不例外。</p>
<p>可以在官方下载<a href="https://nodejs.org/download/" rel="nofollow noreferrer" target="_blank">页面</a>找到各种版本的源代码和安装包文件。建议你使用与自己操作系统对应的安装包进行安装。当然，你也可用使用 apt-get、Homebrew  等包管理器进行安装，如果你系统有的话。具体详见官方的包管理工具的安装<a href="https://nodejs.org/en/download/package-manager/" rel="nofollow noreferrer" target="_blank">指南</a>。</p>
<p>如果你使用的是 Mac 或者 Linux 的话，那么我极力推荐你使用 <a href="https://github.com/creationix/nvm" rel="nofollow noreferrer" target="_blank">NVM</a> 来安装。Window 系统上的对应程序是 <a href="https://github.com/hakobera/nvmw" rel="nofollow noreferrer" target="_blank">NVMW</a>。这些版本管理工具，让你可以在不同版本间进行自由切换。例如，你可以在尝试新版本的特性时，同时在系统中保留一份稳定版。另外，NVM 无需系统管理权限同时卸载也非常容易。而安装过程也只需在终端执行一行命令。</p>
<p>现在，请在你系统中安装好 Node。</p>
<h3 id="articleHeader1">运行你的第一个Node脚本</h3>
<p>安装完成后，先动手写个 "Hello World" 来检验一些。在新建的 <em>helloworld.js</em> 中加入一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;Hello, World!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hello, World!"</span>);</code></pre>
<p>代码中主要就是使用 <em>console.log</em> 来打印字符串 "Hello,world!"，相信对于前端程序员来说并不会感到陌生。下面我们使用 <em>node helloworld.js</em> 运行代码。如果一切正常的话，会出现如下输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819186" src="https://static.alili.tech/img/remote/1460000010819186" alt="02_01" title="02_01" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">模块的使用</h2>
<p>在大多数编程语言中，我们都会对代码进行拆分，然后在使用的时候将这些文件引入其中。例如，C 和 C++ 中的 include，Python 的 import ，Ruby 和 PHP 中的 require。而另外一些语言，如 C# 是在编译时完成跨文件引用的。</p>
<p>很长一段时间内，JavaScript 官方并不支持模块机制。所以社区中有人就编写了 RequireJS 这种工具来解决依赖项导入的问题。但是，大多数时候还是通过 <em>&lt;script&gt;</em> 标签来进行文件导入。而Node 通过实现名为 CommonJS 的标准模块，完美的解决了模块导入问题。</p>
<p>模块系统部分主要有三大主要内容：内置模块的引入，第三方模块引入，个人私有模块引入。下面，将会对这些内容逐一介绍。</p>
<h3 id="articleHeader3">引入内置模块</h3>
<p>Node 已经内置了很多实用模块，例如，文件系统模块 <em>fs</em>，工具函数模块 <em>util</em>。</p>
<p>在 Node 编写的 Web 应用中，最常见的任务当属 URL 解析了。浏览器通过特定的 URL 来请求服务器上对应的资源。例如，访问主页、访问关于页面 的网络请求。这些 URL 都以字符串的形式存在，我们需要对其进行解析然后获取更多的信息。这里我们通过对 URL 进行解析来介绍如何引入内置模块。</p>
<p>内置的 <em>url</em> 模块中暴露的方法不多，不过其中有一个 <em>parse</em> 函数非常有用。它能从 URL 字符串中提取到类似域名和路径等有益信息。</p>
<p>这里我们使用 <em>require</em> 来实现模块导入，该命令与之前提到的 Include、Import 的作用一致。通过将模块名作为参数，该命令就能成功的返回对应的模块。大多数情况下，该返回的对象是一个 <em>object</em> 对象，但有时也可能会是字符串、数字、或者函数。下面是引入改模块的示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = require(&quot;url&quot;);&nbsp;&nbsp; 
var parsedURL = url.parse(&quot;http://www.example.com/profile?name=barry&quot;);&nbsp; 
&nbsp;
console.log(parsedURL.protocol);&nbsp; // &quot;http:&quot;
console.log(parsedURL.host);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  // &quot;www.example.com&quot;
console.log(parsedURL.query);&nbsp;&nbsp;&nbsp;&nbsp; // &quot;name=barry" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);&nbsp;&nbsp; 
<span class="hljs-keyword">var</span> parsedURL = url.parse(<span class="hljs-string">"http://www.example.com/profile?name=barry"</span>);&nbsp; 
&nbsp;
<span class="hljs-built_in">console</span>.log(parsedURL.protocol);&nbsp; <span class="hljs-comment">// "http:"</span>
<span class="hljs-built_in">console</span>.log(parsedURL.host);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span class="hljs-comment">// "www.example.com"</span>
<span class="hljs-built_in">console</span>.log(parsedURL.query);&nbsp;&nbsp;&nbsp;&nbsp; <span class="hljs-comment">// "name=barry</span></code></pre>
<p>在上面的代码中，通过 <em>require("url")</em> 返回一个模块对象，然后就可以像使用其他对象一样调用对象的方法。将这段代码保存到 <em>url-test.js</em> 中并使运行 <em>node url-test.js</em> 命令，你就会看到协议名，域名、查询条件。</p>
<p>另外，绝大多数时候我们在引入模块的时候会用一个同名的变量来接受返回的模块对象。例如，上面就使用 <em>url</em> 来介绍 <em>require("url")</em> 的返回值。当然，你完全可以不遵循上面的规则。如果你想的话，你也可以这么干：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var theURLModule = require(&quot;url&quot;);&nbsp;&nbsp; 
var parsedURL = theURLModule.parse(&quot;http://www.example.com/profile?name=barry&quot;);&nbsp; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> theURLModule = <span class="hljs-built_in">require</span>(<span class="hljs-string">"url"</span>);&nbsp;&nbsp; 
<span class="hljs-keyword">var</span> parsedURL = theURLModule.parse(<span class="hljs-string">"http://www.example.com/profile?name=barry"</span>);&nbsp; </code></pre>
<p>保存变量名和模块名一致只是一个统一风格增加可读性的宽松约定，而不是什么强制规范。</p>
<h3 id="articleHeader4">使用 npm 和 package.json 引入第三方模块</h3>
<p>Node 的内置模块远远不能满足日常开发需要，所以引入第三方模块是一个必须要掌握的技能。</p>
<p>首先，我们需要了解 package.json 文件。所有的 Node 项目都单独存放在一个文件夹中，而项目如果使用了第三方模块，那么其中必定存在一个名为 package.json 的文件。package.json 中的内容非常的简单，一般其中定义了项目名称、版本号、作者，已经项目的外部依赖项。</p>
<p>在新建的 Node 工程文件夹中，将下面的内容复制到 package.json 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
&nbsp; &quot;name&quot;: &quot;my-fun-project&quot;,&nbsp;&nbsp; 
&nbsp; &quot;author&quot;: &quot;Evan Hahn&quot;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; &quot;private&quot;: true,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; &quot;version&quot;: &quot;0.2.0&quot;,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; &quot;dependencies&quot;: {}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
&nbsp; <span class="hljs-attr">"name"</span>: <span class="hljs-string">"my-fun-project"</span>,&nbsp;&nbsp; 
&nbsp; <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Evan Hahn"</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; <span class="hljs-attr">"dependencies"</span>: {}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
}</code></pre>
<p>其实，在进行 Node 安装时实际上还安装了另一个程序：npm 。通常 npm 都被称为 Node 包管理器，而这也是它最大的特色。假设，现在需要在应用中导入一个小型的标准模版系统 <a href="https://mustache.github.io" rel="nofollow noreferrer" target="_blank">Mustache</a>。它能将模版字符串转化为真正的字符串，请看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Returns &quot;Hello, Nicholas Cage!&quot;
Mustache.render(&quot;Hello, "{{"first"}}" "{{"last"}}"!&quot;, {
&nbsp; first: &quot;Nicholas&quot;,
&nbsp; last: &quot;Cage&quot;
});
&nbsp;
// Returns &quot;Hello, Sheryl Sandberg!&quot;
Mustache.render(&quot;Hello, "{{"first"}}" "{{"last"}}"!&quot;, {
&nbsp; first: &quot;Sheryl&quot;,
&nbsp; last: &quot;Sandberg&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// Returns "Hello, Nicholas Cage!"</span>
Mustache.render(<span class="hljs-string">"Hello, "{{"first"}}" "{{"last"}}"!"</span>, {
&nbsp; <span class="hljs-attr">first</span>: <span class="hljs-string">"Nicholas"</span>,
&nbsp; <span class="hljs-attr">last</span>: <span class="hljs-string">"Cage"</span>
});
&nbsp;
<span class="hljs-comment">// Returns "Hello, Sheryl Sandberg!"</span>
Mustache.render(<span class="hljs-string">"Hello, "{{"first"}}" "{{"last"}}"!"</span>, {
&nbsp; <span class="hljs-attr">first</span>: <span class="hljs-string">"Sheryl"</span>,
&nbsp; <span class="hljs-attr">last</span>: <span class="hljs-string">"Sandberg"</span>
});</code></pre>
<p>现在，假设你想通过 Mustache 模块来编写一个简单的 Node 应用来欢迎 Nicolas Cage。</p>
<p>首先，在工程文件夹的根目录里运行 <em>npm install mustache --save</em> 。该命令会新建一个 <em>node_modules</em> 文件夹并将 Mustache 保存到文件夹下。 <em>--save</em> 参数将会把该模块添加到 pakage.json 文件中。此时 pakage.json 文件夹大致如下，其中 Mustache 会使用最新的版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
&nbsp; &quot;name&quot;: &quot;my-fun-project&quot;,
&nbsp; &quot;author&quot;: &quot;Evan Hahn&quot;,
&nbsp; &quot;private&quot;: true,
&nbsp; &quot;version&quot;: &quot;0.2.0&quot;,
&nbsp; &quot;dependencies&quot;: {
&nbsp;&nbsp;&nbsp; &quot;mustache&quot;: &quot;^2.0.0&quot;&nbsp; #A
&nbsp; }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
&nbsp; <span class="hljs-attr">"name"</span>: <span class="hljs-string">"my-fun-project"</span>,
&nbsp; <span class="hljs-attr">"author"</span>: <span class="hljs-string">"Evan Hahn"</span>,
&nbsp; <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
&nbsp; <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.2.0"</span>,
&nbsp; <span class="hljs-attr">"dependencies"</span>: {
&nbsp;&nbsp;&nbsp; <span class="hljs-attr">"mustache"</span>: <span class="hljs-string">"^2.0.0"</span>&nbsp; #A
&nbsp; }
} </code></pre>
<p>如果你没有使用 <em>--save</em> 选项的话，虽然也会创建 <em>node_modules</em> 文件夹将把 Mustache 模块保存到同名子目录下，但是 pakage.json 将不会发生任何变化。这里之所以将这些依赖关系保存到 package.json 是为了方便其他开发者在得到工程后直接使用 <em>npm install</em> 完成所有依赖项的安装。另一个原因是 Node 项目在进行代码管理时通常都会忽略 node_modules 文件夹而只保留 package.json。</p>
<p>安装完成后接下来就是使用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Mustache = require(&quot;mustache&quot;);&nbsp; 
var result = Mustache.render(&quot;Hi, "{{"first"}}" "{{"last"}}"!&quot;, {
&nbsp; first: &quot;Nicolas&quot;,
&nbsp; last: &quot;Cage&quot;
});
console.log(result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> Mustache = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mustache"</span>);&nbsp; 
<span class="hljs-keyword">var</span> result = Mustache.render(<span class="hljs-string">"Hi, "{{"first"}}" "{{"last"}}"!"</span>, {
&nbsp; <span class="hljs-attr">first</span>: <span class="hljs-string">"Nicolas"</span>,
&nbsp; <span class="hljs-attr">last</span>: <span class="hljs-string">"Cage"</span>
});
<span class="hljs-built_in">console</span>.log(result);</code></pre>
<p>保存代码到 mustache-test.js 中并执行 <em>node mustache-test.js</em> 命令。然后你将会看见 Hi,Nicolas Cage! 。</p>
<p>就是这样简单，这些依赖项安装完成后，你可以像使用内置模块一样进行调用。<em>node_modules</em> 中模块引入的工作直接交给 Node 就行了，你无需担心。</p>
<p>当然你可以手动添加工程依赖项，并且你还可以指定依赖项的版本。</p>
<blockquote><p>npm init<br>除了安装依赖项之外，npm 还能完成其他任务。例如，自动生成 package.json 而不是通过手动编辑的方式。在一个新工程的文件夹中可以通过 <em>npm init</em> 来配置工程名、作者、版本等信息，然后 npm 就会自定生成对应的 package.json 文件。这种自动化过程可以节约开发者的时间。</p></blockquote>
<h3 id="articleHeader5">实现私有模块</h3>
<p>前面都是介绍如何使用他人开发好的模块，接下来你将会学到如何去开发一个私有模块。假设现在需要随机返回 0 ~ 100 之间的整数。在不引入其他模块的情况下，代码大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MAX = 100;
function randomInteger()  {
    return Math.floor( (Math.random() * MAX) );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> MAX = <span class="hljs-number">100</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomInteger</span>(<span class="hljs-params"></span>)  </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor( (<span class="hljs-built_in">Math</span>.random() * MAX) );
}</code></pre>
<p>这可能与你在浏览器环境下代码差不多，并没有什么特别之处。但是在 Node 中，我们还需要暴露一个变量给外部使用。这样当其他程序在通过 <em>require</em> 进行引入的时候就能获得该变量。此例中，我们暴露函数 <em>randomInteger</em> 并将代码保存到 <em>random-integer.js</em> 文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MAX = 100;
function randomInteger()  {
    return Math.floor( (Math.random() * MAX) );
}

module.exports = randomInteger;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> MAX = <span class="hljs-number">100</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomInteger</span>(<span class="hljs-params"></span>)  </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor( (<span class="hljs-built_in">Math</span>.random() * MAX) );
}

<span class="hljs-built_in">module</span>.exports = randomInteger;</code></pre>
<p>最后一行代码对于 Node 初学者来说可能感觉有点陌生。每个模块只能暴露一个变量，而且必须通过 module.exports 设置。本例中只暴露了一个函数变量，所以 MAX 就作为模块私有变量无法被其他文件所访问。</p>
<blockquote><p>module.exports 可以暴露任何变量，虽然本例中是一个函数，但是通常都会是一个对象。当然，你可以暴露字符串或者数组。</p></blockquote>
<p>接下来我们就来使用一下这个新模块。在 <em>random-integer.js</em> 同一目录下，新建一个 <em>print-three-random-integers.js</em> 并复制下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var randomInt = require(&quot;./random-integer&quot;);&nbsp; #A
console.log(randomInt());&nbsp; // 12
console.log(randomInt());&nbsp; // 77
console.log(randomInt());&nbsp; // 8
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> randomInt = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./random-integer"</span>);&nbsp; #A
<span class="hljs-built_in">console</span>.log(randomInt());&nbsp; <span class="hljs-comment">// 12</span>
<span class="hljs-built_in">console</span>.log(randomInt());&nbsp; <span class="hljs-comment">// 77</span>
<span class="hljs-built_in">console</span>.log(randomInt());&nbsp; <span class="hljs-comment">// 8</span>
</code></pre>
<p>除了需要通过点语法指定相对路径之外，其余部分与前面几乎一摸一样。通过 <em>node print-three-random-integers.js</em> 命令，我们可以检查程序的运行效果。不出意外的话，将会有三个 0 ～ 100 之间的随机数会被打印出来。</p>
<p>如果你尝试运行 <em>node random-integer.js</em> 的话，你还发现并没有任何事情发生。虽然，我们暴露了模块中的函数，但是改函数并不会执行更不会打印任何输出。</p>
<blockquote><p>注意，这里只涉及了私有模块在工程中的使用。如果你希望将自己的模块发布出去供其他人使用的话，可以去我的个人<a href="http://evanhahn.com/make-an-npm-baby" rel="nofollow noreferrer" target="_blank">站点</a>查看相关内容。</p></blockquote>
<p>以上部分就是 Node 模块系统的简单入门。</p>
<h2 id="articleHeader6">Node：异步的世界</h2>
<p>在第一章中，我用 “烤松饼” 的例子简单的介绍了 Node 中的异步特性。其中的关键点就是，你无法同时做两件事哪怕它们是同时发生的。虽然，在烘焙过程中我可以健身，但是，烤箱毕竟只是个外部事物。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819187" src="https://static.alili.tech/img/remote/1460000010819187" alt="02_02" title="02_02" style="cursor: pointer; display: inline;"></span></p>
<p>Node 的异步工作原理与此类似，例如，你通过浏览器请求 Node 服务器上的一张小猫图片。因为该图片资源太大，所以在进行磁盘读写的时候你可以抽身去处理其他事情。此时，这个磁盘就相当于一个外部资源，我们可以直接处理第二个请求而无需挂起等待费时操作结束。</p>
<p>Express 中主要有两个外部资源：</p>
<ol>
<li>涉及文件系统。例如，磁盘文件的读写。</li>
<li>涉及网络处理。例如，接受请求、发送响应。</li>
</ol>
<p>在 Node 代码中，这些异步都是通过回调进行处理的。其工作原理和在 Web 页面发送 AJAX 请求一样。在发送请求时你会附带一个回调函数，当请求处理完成后你的回调将会被执行。</p>
<p>例如，现在你正在硬盘上读取文件 <em>myfile.txt</em> 。当读取结束后，你希望能够打印出其中字母 X 出现的次数，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);&nbsp; 
&nbsp;
var options = { encoding: &quot;utf-8&quot; };&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
fs.readFile(&quot;myfile.txt&quot;, options, function(err, data) {&nbsp; 
&nbsp; if (err) {&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp; console.error(&quot;Error reading file!&quot;);&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp; return;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
&nbsp; console.log(data.match(/x/gi).length + &quot; letter X's&quot;);&nbsp;&nbsp;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);&nbsp; 
&nbsp;
<span class="hljs-keyword">var</span> options = { <span class="hljs-attr">encoding</span>: <span class="hljs-string">"utf-8"</span> };&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
fs.readFile(<span class="hljs-string">"myfile.txt"</span>, options, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{&nbsp; 
&nbsp; <span class="hljs-keyword">if</span> (err) {&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp; <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"Error reading file!"</span>);&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">return</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
&nbsp; <span class="hljs-built_in">console</span>.log(data.match(<span class="hljs-regexp">/x/gi</span>).length + <span class="hljs-string">" letter X's"</span>);&nbsp;&nbsp;
});</code></pre>
<p>下面我们一步步解释这些代码：</p>
<p>首先，我们导入 Node 自带的文件系统模块。该模块主要处理文件相关内容，其中大多数都是文件读写功能。本例使用的其中的 <em>readFile</em> 方法。</p>
<p>接下来，我们需要设置 <em>fs.readFile</em> 方法中的参数，第一个是文件名，第二个就是会回调函数。并且在读取结束后执行回调函数。</p>
<p>在 Node 中大多数回调函数都会设置错误信息 <em>error</em> 作为第一个参数。正常情况下该参数等于 null ，如果出现错误则该参数会保存错误信息。虽然有时候这些错误信息并不会导致程序终止执行，但是多数情形下我们都需要对错误做出响应，例如，抛出异常并跳出回调函数。这也是 Node 中最常见的回调实践。</p>
<p>最后，当一切正常时我们使用正则表达式匹配字母 X 并打印其数量。</p>
<p>下面我们就来做个测试。这里，我们在上面代码的结束加上一段，那么会发生什么事情呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&quot;fs&quot;);&nbsp; 
&nbsp;
var options = { encoding: &quot;utf-8&quot; };&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
fs.readFile(&quot;myfile.txt&quot;, options, function(err, data) {&nbsp; 
&nbsp; if (err) {&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp; console.error(&quot;Error reading file!&quot;);&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp; return;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
&nbsp; console.log(data.match(/x/gi).length + &quot; letter X's&quot;);&nbsp;&nbsp;
});

console.log(&quot;Hello World!&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);&nbsp; 
&nbsp;
<span class="hljs-keyword">var</span> options = { <span class="hljs-attr">encoding</span>: <span class="hljs-string">"utf-8"</span> };&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
fs.readFile(<span class="hljs-string">"myfile.txt"</span>, options, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>) </span>{&nbsp; 
&nbsp; <span class="hljs-keyword">if</span> (err) {&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp; <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"Error reading file!"</span>);&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">return</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
&nbsp; <span class="hljs-built_in">console</span>.log(data.match(<span class="hljs-regexp">/x/gi</span>).length + <span class="hljs-string">" letter X's"</span>);&nbsp;&nbsp;
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hello World!"</span>);</code></pre>
<p>异步文件读取时异步操作，所以这里先打印出来的是 " Hello world! "，然后才是异步函数中的打印操作。</p>
<p>这就是异步模式强大的地方。当一个外部设备在处理费时操作时，你可以继续运行其他代码。在 Web  应用中这意味着相同的时间可以处理更多的请求。</p>
<blockquote><p>注意：如果你想了解更多 JavaScript 异步的内容的话，你可以去油管上查看这个<a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ" rel="nofollow noreferrer" target="_blank">视频</a>。视频中的讲解同时适用于 Node 和浏览器环境。</p></blockquote>
<h2 id="articleHeader7">用 Node 构建 Web 服务：http 模块</h2>
<p>只有理解了上面那些概念，你才能更好的掌握 Node 内置的 HTTP 模块。而该模块对 Express 框架来说又是最重要的模块之一。Node 和 Express 能够构建 Web 服务正是依赖于这个模块中的功能。</p>
<p>Node 的 HTTP 模块有很多特性（比如，向其他服务器发送网络请求），不过我们将要使用的是其中一个名为 <em>http.createServer</em> 的方法。该方法通过其回调函数来处理每一次的网络请求，并且进行响应。下面代码中我们将所有的响应都设置为了 "hello world" （可以保存到 <em>myserver.js</em> 中）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var http = require(&quot;http&quot;);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp;
function requestHandler(request, response) {&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; console.log(&quot;In comes a request to: &quot; + request.url);&nbsp; 
&nbsp; response.end(&quot;Hello, world!&quot;);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
var server = http.createServer(requestHandler);&nbsp; 
server.listen(3000);&nbsp; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">"http"</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestHandler</span>(<span class="hljs-params">request, response</span>) </span>{&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
&nbsp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"In comes a request to: "</span> + request.url);&nbsp; 
&nbsp; response.end(<span class="hljs-string">"Hello, world!"</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
<span class="hljs-keyword">var</span> server = http.createServer(requestHandler);&nbsp; 
server.listen(<span class="hljs-number">3000</span>);&nbsp; </code></pre>
<p>上面的代码由 4 个部分构成。</p>
<p>首先，我们引入 HTTP 模块并将其保存到变量 http 中。这与之前 URL  模块的操作一致。</p>
<p>接着，定义了一个请求处理函数 <em>requestHandler</em> 。教程中的几乎所有的代码要么是请求处理函数要么是调用处理函数。该函数有两个参数，<em>request</em> 表示请求对象，而 <em>response</em> 则表示响应对象。<em>request</em> 中包含 URL 路径、<em>user-agent</em> 等信息。而通过调用 <em>response</em> 对象方法 Node 会将响应信息打包好并发送给请求者。</p>
<p>余下的代码则是指定内置的 HTTP 服务在请求是执行的处理函数以及服务监听的端口号。</p>
<blockquote><p>对于 HTTPS 来说，我们则可以使用自带的 HTTPS 模块。除了需要配置 SSL 证书，其余的过程都一样。如果你了解 HTTPS 的话那么后期从 HTTP 切换到 HTTPS 两分钟就能搞定。即使你不了解，也不必太过担心。</p></blockquote>
<p>如果你将代码保存到 <em>myserver.js</em> 并执行 <em>node myserver.js</em> 拉起服务。那么，此时你在浏览器中访问 <em><a href="http://localhost:3000/em" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a></em> ，你就会看到：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819188" src="https://static.alili.tech/img/remote/1460000010819188" alt="02_03" title="02_03" style="cursor: pointer; display: inline;"></span></p>
<p>你可能也注意到了，每当你发起请求的时候终端控制台都会打印一些信息。当你尝试访问不同 URL 时，虽然控制台打印的信息不同但是得到的响应却都是 “Hello, world!”。控制台打印的信息类似于：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010819189" src="https://static.alili.tech/img/remote/1460000010819189" alt="02_04" title="02_04" style="cursor: pointer; display: inline;"></span></p>
<p>请注意上面打印的 URL 信息中并不包含 <em>localhost:3000</em>。虽然看起来显得不那么直观，但是反过来这也是对的。毕竟使用相对路径，我们无需修改就能在任何电脑上部署 Node 应用。</p>
<p>而 URL 解析的代码大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function requestHandler(req, res) {
    if (req.url === &quot;/&quot;) {
        res.end(&quot;Welcome to the homepage!&quot;);
    } else if (req.url === &quot;/about&quot;) {
        res.end(&quot;Welcome to the about page!&quot;);
    } else {
        res.end(&quot;Error! File not found.&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestHandler</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">"/"</span>) {
        res.end(<span class="hljs-string">"Welcome to the homepage!"</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">"/about"</span>) {
        res.end(<span class="hljs-string">"Welcome to the about page!"</span>);
    } <span class="hljs-keyword">else</span> {
        res.end(<span class="hljs-string">"Error! File not found."</span>);
    }
}</code></pre>
<p>所有的请求 URL 都可以在这个函数里面完成处理。这样做对于简单的应用来说确实非常简单，但是当应用规模变大之后该函数就会变的臃肿不利于维护。这也是 Express 框架出现的重要原因。</p>
<h2 id="articleHeader8">总结</h2>
<p>本文主要内容：</p>
<ul>
<li>Node 的安装</li>
<li>模块系统的使用</li>
<li>package.json 文件的介绍</li>
<li>通过 package.json 安装第三放模块依赖项</li>
<li>Node 中的异步编程概念。</li>
<li>简单 HTTP 服务应用的创建。</li>
</ul>
<blockquote><p>原文<a href="https://bignerdcoding.com/archives/42.html" rel="nofollow noreferrer" target="_blank">地址</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express 实战（二）：Node.js 基础

## 原文链接
[https://segmentfault.com/a/1190000010819181](https://segmentfault.com/a/1190000010819181)

