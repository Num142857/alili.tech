---
title: '很全很全的JavaScript的模块讲解' 
date: 2018-12-21 2:30:11
hidden: true
slug: dgwlusfvb06
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在搞基础的东西，弄了一个持续更新的github笔记，可以去看看，诚意之作（本来就是写给自己看的……）链接地址：<a href="https://qiqihaobenben.github.io/Front-End-Basics/" rel="nofollow noreferrer" target="_blank">Front-End-Basics</a>  </p>
<p>此篇文章的地址：<a href="https://qiqihaobenben.github.io/Front-End-Basics/JavaScript/utility/module" rel="nofollow noreferrer" target="_blank">JavaScript的模块</a>  </p>
<p>基础笔记的github地址：<a href="https://github.com/qiqihaobenben/Front-End-Basics" rel="nofollow noreferrer" target="_blank">https://github.com/qiqihaobenben/Front-End-Basics</a> ,可以watch,也可以star。</p>
<hr>
<p>正文开始</p>
<hr>
<h2 id="articleHeader0">JavaScript的模块</h2>
<h3 id="articleHeader1">介绍</h3>
<p>模块通常是指编程语言所提供的代码组织机制，利用此机制可将程序拆解为独立且通用的代码单元。所谓模块化主要是解决代码分割、作用域隔离、模块之间的依赖管理以及发布到生产环境时的自动化打包与处理等多个方面。</p>
<h4>模块的优点</h4>
<ol>
<li>
<strong>可维护性。</strong>  因为模块是独立的，一个设计良好的模块会让外面的代码对自己的依赖越少越好，这样自己就可以独立去更新和改进。</li>
<li>
<strong>命名空间。</strong> 在 JavaScript 里面，如果一个变量在最顶级的函数之外声明，它就直接变成全局可用。因此，常常不小心出现命名冲突的情况。使用模块化开发来封装变量，可以避免污染全局环境。</li>
<li>
<strong>重用代码。</strong> 我们有时候会喜欢从之前写过的项目中拷贝代码到新的项目，这没有问题，但是更好的方法是，通过模块引用的方式，来避免重复的代码库。</li>
</ol>
<h3 id="articleHeader2">CommonJS</h3>
<p>CommonJS 最开始是 Mozilla 的工程师于 2009 年开始的一个项目，它的目的是让浏览器之外的 JavaScript （比如服务器端或者桌面端）能够通过模块化的方式来开发和协作。  </p>
<p>在 CommonJS 的规范中，每个 JavaScript 文件就是一个独立的模块上下文（module context），在这个上下文中默认创建的属性都是私有的。也就是说，在一个文件定义的变量（还包括函数和类），都是私有的，对其他文件是不可见的。  </p>
<p>需要注意的是，CommonJS 规范的主要适用场景是服务器端编程，所以采用同步加载模块的策略。如果我们依赖3个模块，代码会一个一个依次加载它们。  </p>
<p>该模块实现方案主要包含 require 与 module 这两个关键字，其允许某个模块对外暴露部分接口并且由其他模块导入使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sayModule.js
function SayModule () {
    this.hello = function () {
        console.log('hello');
    };

    this.goodbye = function () {
        console.log('goodbye');
    };
}

module.exports = SayModule;

//main.js 引入sayModule.js
var Say = require('./sayModule.js');
var sayer = new Say();
sayer.hello(); //hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//sayModule.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SayModule</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.hello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
    };

    <span class="hljs-keyword">this</span>.goodbye = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'goodbye'</span>);
    };
}

<span class="hljs-built_in">module</span>.exports = SayModule;

<span class="hljs-comment">//main.js 引入sayModule.js</span>
<span class="hljs-keyword">var</span> Say = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./sayModule.js'</span>);
<span class="hljs-keyword">var</span> sayer = <span class="hljs-keyword">new</span> Say();
sayer.hello(); <span class="hljs-comment">//hello</span></code></pre>
<p>作为一个服务器端的解决方案，CommonJS 需要一个兼容的脚本加载器作为前提条件。该脚本加载器必须支持名为 require 和 module.exports 的函数，它们将模块相互导入导出。</p>
<h4><code>Node.js</code></h4>
<p>Node 从 CommonJS 的一些创意中，创造出自己的模块化实现。由于Node 在服务端的流行，Node 的模块形式被（不正确地）称为 CommonJS。</p>
<p>Node.js模块可以分为两大类，一类是核心模块，另一类是文件模块。  <br><strong>核心模块</strong> 就是Node.js标准的API中提供的模块，如fs、http、net等，这些都是由Node.js官方提供的模块，编译成了二进制代码，可以直接通过require获取核心模块，例如require('fs')，核心模块拥有最高的加载优先级，如果有模块与核心模块命名冲突，Node.js总是会加载核心模块。  <br><strong>文件模块</strong> 是存储为单独的文件（或文件夹）的模块，可能是JavaScript代码、JSON或编译好的C/C++代码。在不显式指定文件模块扩展名的时候，Node.js会分别试图加上.js、.json、.node(编译好的C/C++代码)。</p>
<blockquote>加载方式</blockquote>
<ul><li>按路径加载模块</li></ul>
<p>如果require参数以"/"开头，那么就以绝对路径的方式查找模块名称，如果参数以"./"、"../"开头，那么则是以相对路径的方式来查找模块。</p>
<ul><li>通过查找node_modules目录加载模块</li></ul>
<p>如果require参数不以"/"、"./"、"../"开头，而该模块又不是核心模块，那么就要通过查找node_modules加载模块了。我们使用的npm获取的包通常就是以这种方式加载的。</p>
<blockquote>加载缓存</blockquote>
<p>Node.js模块不会被重复加载，这是因为Node.js通过文件名缓存所有加载过的文件模块，所以以后再访问到时就不会重新加载了。  <br><em>注意：</em> Node.js是根据实际文件名缓存的，而不是require()提供的参数缓存的，也就是说即使你分别通过require('express')和require('./node_modules/express')加载两次，也不会重复加载，因为尽管两次参数不同，解析到的文件却是同一个。  </p>
<p>Node.js 中的模块在加载之后是以单例化运行，并且遵循值传递原则：如果是一个对象，就相当于这个对象的引用。</p>
<blockquote>模块载入过程</blockquote>
<p>加载文件模块的工作，主要由原生模块module来实现和完成，该原生模块在启动时已经被加载，进程直接调用到runMain静态方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例如运行： node app.js

Module.runMain = function () {
    // Load the main module--the command line argument.
    Module._load(process.argv[1], null, true);
};

//_load静态方法在分析文件名之后执行
var module = new Module(id, parent);

//并根据文件路径缓存当前模块对象，该模块实例对象则根据文件名加载。
module.load(filename);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>例如运行： node app.js

Module.runMain = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Load the main module--the command line argument.</span>
    Module._load(process.argv[<span class="hljs-number">1</span>], <span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>);
};

<span class="hljs-comment">//_load静态方法在分析文件名之后执行</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">module</span> = <span class="hljs-keyword">new</span> Module(id, <span class="hljs-built_in">parent</span>);

<span class="hljs-comment">//并根据文件路径缓存当前模块对象，该模块实例对象则根据文件名加载。</span>
<span class="hljs-built_in">module</span>.load(filename);</code></pre>
<p>具体说一下上文提到了文件模块的三类模块,这三类文件模块以后缀来区分，Node.js会根据后缀名来决定加载方法，具体的加载方法在下文<code>require.extensions</code>中会介绍。</p>
<ul>
<li>
<code>.js</code> 通过fs模块同步读取js文件并编译执行。</li>
<li>
<code>.node</code> 通过C/C++进行编写的Addon。通过dlopen方法进行加载。</li>
<li>
<code>.json</code> 读取文件，调用JSON.parse解析加载。</li>
</ul>
<p>接下来详细描述js后缀的编译过程。Node.js在编译js文件的过程中实际完成的步骤有对js文件内容进行头尾包装。以app.js为例，包装之后的app.js将会变成以下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//circle.js
var PI = Math.PI;
exports.area = function (r) {
    return PI * r * r;
};
exports.circumference = function (r) {
    return 2 * PI * r;
};

//app.js
var circle = require('./circle.js');
console.log( 'The area of a circle of radius 4 is ' + circle.area(4));

//app包装后
(function (exports, require, module, __filename, __dirname) {
    var circle = require('./circle.js');
    console.log('The area of a circle of radius 4 is ' + circle.area(4));
});

//这段代码会通过vm原生模块的runInThisContext方法执行（类似eval，只是具有明确上下文，不污染全局），返回为一个具体的function对象。最后传入module对象的exports，require方法，module，文件名，目录名作为实参并执行。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//circle.js</span>
<span class="hljs-keyword">var</span> PI = <span class="hljs-built_in">Math</span>.PI;
exports.area = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">r</span>) </span>{
    <span class="hljs-keyword">return</span> PI * r * r;
};
exports.circumference = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">r</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * PI * r;
};

<span class="hljs-comment">//app.js</span>
<span class="hljs-keyword">var</span> circle = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./circle.js'</span>);
<span class="hljs-built_in">console</span>.log( <span class="hljs-string">'The area of a circle of radius 4 is '</span> + circle.area(<span class="hljs-number">4</span>));

<span class="hljs-comment">//app包装后</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">exports, require, module, __filename, __dirname</span>) </span>{
    <span class="hljs-keyword">var</span> circle = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./circle.js'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The area of a circle of radius 4 is '</span> + circle.area(<span class="hljs-number">4</span>));
});

<span class="hljs-comment">//这段代码会通过vm原生模块的runInThisContext方法执行（类似eval，只是具有明确上下文，不污染全局），返回为一个具体的function对象。最后传入module对象的exports，require方法，module，文件名，目录名作为实参并执行。</span></code></pre>
<p>这就是为什么require并没有定义在app.js 文件中，但是这个方法却存在的原因。从Node.js的API文档中可以看到还有<code>__filename</code>、<code>__dirname</code>、<code>module</code>、<code>exports</code>几个没有定义但是却存在的变量。其中<code>__filename</code>和<code>__dirname</code>在查找文件路径的过程中分析得到后传入的。<code>module</code>变量是这个模块对象自身，<code>exports</code>是在module的构造函数中初始化的一个空对象（{}，而不是null）。  <br>在这个主文件中，可以通过require方法去引入其余的模块。而其实这个require方法实际调用的就是module._load方法。  <br>load方法在载入、编译、缓存了module后，返回module的exports对象。这就是circle.js文件中只有定义在exports对象上的方法才能被外部调用的原因。  </p>
<p><strong>以上所描述的模块载入机制均定义在lib/module.js中。</strong></p>
<blockquote>require 函数</blockquote>
<p>require 引入的对象主要是函数。当 Node 调用 require() 函数，并且传递一个文件路径给它的时候，Node 会经历如下几个步骤：</p>
<ul>
<li>Resolving：找到文件的绝对路径；</li>
<li>Loading：判断文件内容类型；</li>
<li>Wrapping：打包，给这个文件赋予一个私有作用范围。这是使 require 和 module 模块在本地引用的一种方法；</li>
<li>Evaluating：VM 对加载的代码进行处理的地方；</li>
<li>Caching：当再次需要用这个文件的时候，不需要重复一遍上面步骤。</li>
</ul>
<blockquote>require.extensions 来查看对三种文件的支持情况</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV0sHs?w=800&amp;h=443" src="https://static.alili.tech/img/bV0sHs?w=800&amp;h=443" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>可以清晰地看到 Node 对每种扩展名所使用的函数及其操作：对 .js 文件使用 module._compile；对 .json 文件使用 JSON.parse；对 .node 文件使用 process.dlopen。  </p>
<p><em>文件查找策略</em></p>
<ul><li>从文件模块缓存中加载</li></ul>
<p>尽管原生模块与文件模块的优先级不同，但是优先级最高的是从文件模块的缓存中加载已经存在的模块。</p>
<ul><li>从原生模块加载</li></ul>
<p>原生模块的优先级仅次于文件模块缓存的优先级。require方法在解析文件名之后，优先检查模块是否在原生模块列表中。以http模块为例，尽管在目录下存在一个<code>http</code>、<code>http.js</code>、<code>http.node</code>、<code>http.json</code>文件，<code>require(“http”)</code>都不会从这些文件中加载，而是从原生模块中加载。  <br>原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。</p>
<ul><li>从文件加载</li></ul>
<p>当文件模块缓存中不存在，而且不是原生模块的时候，Node.js会解析require方法传入的参数，并从文件系统中加载实际的文件，加载过程中的包装和编译细节在前面说过是调用load方法。 <br>··</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当 Node 遇到 require(X) 时，按下面的顺序处理。

（1）如果 X 是内置模块（比如 require('http'）) 
　　a. 返回该模块。 
　　b. 不再继续执行。

（2）如果 X 以 &quot;./&quot; 或者 &quot;/&quot; 或者 &quot;../&quot; 开头 
　　a. 根据 X 所在的父模块，确定 X 的绝对路径。 
　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X
        X.js
        X.json
        X.node

　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X/package.json（main字段）
        X/index.js
        X/index.json
        X/index.node

（3）如果 X 不带路径 
　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。 
　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。

（4） 抛出 &quot;not found&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>当 Node 遇到 require(X) 时，按下面的顺序处理。

（<span class="hljs-number">1</span>）如果 X 是内置模块（比如 require(<span class="hljs-string">'http'</span>）) 
　　<span class="hljs-selector-tag">a</span>. 返回该模块。 
　　<span class="hljs-selector-tag">b</span>. 不再继续执行。

（<span class="hljs-number">2</span>）如果 X 以 <span class="hljs-string">"./"</span> 或者 <span class="hljs-string">"/"</span> 或者 <span class="hljs-string">"../"</span> 开头 
　　<span class="hljs-selector-tag">a</span>. 根据 X 所在的父模块，确定 X 的绝对路径。 
　　<span class="hljs-selector-tag">b</span>. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X
        X<span class="hljs-selector-class">.js</span>
        X<span class="hljs-selector-class">.json</span>
        X<span class="hljs-selector-class">.node</span>

　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
        X/package.json（main字段）
        X/index<span class="hljs-selector-class">.js</span>
        X/index<span class="hljs-selector-class">.json</span>
        X/index<span class="hljs-selector-class">.node</span>

（<span class="hljs-number">3</span>）如果 X 不带路径 
　　<span class="hljs-selector-tag">a</span>. 根据 X 所在的父模块，确定 X 可能的安装目录。 
　　<span class="hljs-selector-tag">b</span>. 依次在每个目录中，将 X 当成文件名或目录名加载。

（<span class="hljs-number">4</span>） 抛出 <span class="hljs-string">"not found"</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0sHG?w=479&amp;h=601" src="https://static.alili.tech/img/bV0sHG?w=479&amp;h=601" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><br></p>
<blockquote>模块循环依赖</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建两个文件，module1.js 和 module2.js，并且让它们相互引用
// module1.js
exports.a = 1;
require('./module2');
exports.b = 2;
exports.c = 3;

// module2.js
const Module1 = require('./module1');
console.log('Module1 is partially loaded here', Module1);

//执行 node module2.js 打印：Module1 is partially loaded here {a:1,b:2,c:3}
//执行 node module1.js 打印：Module1 is partially loaded here {a:1}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//创建两个文件，module1.js 和 module2.js，并且让它们相互引用</span>
<span class="hljs-comment">// module1.js</span>
<span class="hljs-keyword">exports</span>.a = <span class="hljs-number">1</span>;
require(<span class="hljs-string">'./module2'</span>);
<span class="hljs-keyword">exports</span>.b = <span class="hljs-number">2</span>;
<span class="hljs-keyword">exports</span>.c = <span class="hljs-number">3</span>;

<span class="hljs-comment">// module2.js</span>
<span class="hljs-keyword">const</span> Module1 = require(<span class="hljs-string">'./module1'</span>);
console.log(<span class="hljs-string">'Module1 is partially loaded here'</span>, Module1);

<span class="hljs-comment">//执行 node module2.js 打印：Module1 is partially loaded here {a:1,b:2,c:3}</span>
<span class="hljs-comment">//执行 node module1.js 打印：Module1 is partially loaded here {a:1}</span></code></pre>
<p>在 module1 完全加载之前需要先加载 module2，而 module2 的加载又需要 module1。这种状态下，我们从 exports 对象中能得到的就是在发生循环依赖之前的这部分。上面代码中，只有 a 属性被引入，因为 b 和 c 都需要在引入 module2 之后才能加载进来。</p>
<p>Node 使这个问题简单化，在一个模块加载期间开始创建 exports 对象。如果它需要引入其他模块，并且有循环依赖，那么只能部分引入，也就是只能引入发生循环依赖之前所定义的这部分。</p>
<h3 id="articleHeader3">AMD</h3>
<p>AMD 是 Asynchronous Module Definition 的简称，即“异步模块定义”，是从 CommonJS 讨论中诞生的。AMD 优先照顾浏览器的模块加载场景，使用了异步加载和回调的方式。  </p>
<p>AMD 和 CommonJS 一样需要脚本加载器，尽管 AMD 只需要对 define 方法的支持。define 方法需要三个参数：模块名称，模块运行的依赖数组，所有依赖都可用之后执行的函数（该函数按照依赖声明的顺序，接收依赖作为参数）。只有函数参数是必须的。define 既是一种引用模块的方式，也是定义模块的方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// file lib/sayModule.js
define(function (){
    return {
        sayHello: function () {
            console.log('hello');
        }
    };
});

//file main.js
define(['./lib/sayModule'], function (say){
    say.sayHello(); //hello
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// file lib/sayModule.js</span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">sayHello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
        }
    };
});

<span class="hljs-comment">//file main.js</span>
define([<span class="hljs-string">'./lib/sayModule'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">say</span>)</span>{
    say.sayHello(); <span class="hljs-comment">//hello</span>
})</code></pre>
<p>main.js 作为整个应用的入口模块，我们使用 define 关键字声明了该模块以及外部依赖(没有生命模块名称)；当我们执行该模块代码时，也就是执行 define 函数的第二个参数中定义的函数功能，其会在框架将所有的其他依赖模块加载完毕后被执行。这种延迟代码执行的技术也就保证了依赖的并发加载。</p>
<h4><code>RequireJS</code></h4>
<p>RequireJS 是一个前端的模块化管理的工具库，遵循AMD规范,通过一个函数来将所有所需要的或者说所依赖的模块实现装载进来，然后返回一个新的函数（模块），我们所有的关于新模块的业务代码都在这个函数内部操作，其内部也可无限制的使用已经加载进来的以来的模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script data-main='scripts/main' src='scripts/require.js'></script>
//scripts下的main.js则是指定的主代码脚本文件，所有的依赖模块代码文件都将从该文件开始异步加载进入执行。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">data-main</span>=<span class="hljs-string">'scripts/main'</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'scripts/require.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
//scripts下的main.js则是指定的主代码脚本文件，所有的依赖模块代码文件都将从该文件开始异步加载进入执行。</code></pre>
<p>defined用于定义模块，RequireJS要求每个模块均放在独立的文件之中。按照是否有依赖其他模块的情况分为独立模块和非独立模块。  <br><strong>1、独立模块 不依赖其他模块。直接定义</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define({
    methodOne: function (){},
    methodTwo: function (){}
});

//等价于

define(function (){
    return {
        methodOne: function (){},
        methodTwo: function (){}
    };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>define({
    methodOne: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{},
    methodTwo: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{}
});

<span class="hljs-comment">//等价于</span>

define(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> {
        methodOne: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{},
        methodTwo: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span></span>{}
    };
});</code></pre>
<p><strong>2、非独立模块，对其他模块有依赖</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define([ 'moduleOne', 'moduleTwo' ], function(mOne, mTwo){
    ...
});

//或者

define( function( require ){
    var mOne = require( 'moduleOne' ),
        mTwo = require( 'moduleTwo' );
    ...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>define([ <span class="hljs-string">'moduleOne'</span>, <span class="hljs-string">'moduleTwo'</span> ], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mOne, mTwo</span>)</span>{
    ...
});

<span class="hljs-comment">//或者</span>

define( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> require </span>)</span>{
    <span class="hljs-keyword">var</span> mOne = <span class="hljs-built_in">require</span>( <span class="hljs-string">'moduleOne'</span> ),
        mTwo = <span class="hljs-built_in">require</span>( <span class="hljs-string">'moduleTwo'</span> );
    ...
});</code></pre>
<p>如上代码， define中有依赖模块数组的 和 没有依赖模块数组用require加载 这两种定义模块，调用模块的方法合称为AMD模式，定义模块清晰，不会污染全局变量，清楚的显示依赖关系。AMD模式可以用于浏览器环境并且允许非同步加载模块，也可以按需动态加载模块。</p>
<h3 id="articleHeader4">CMD</h3>
<p>CMD（Common Module Definition），在CMD中，一个模块就是一个文件。  </p>
<p>全局函数define，用来定义模块。  <br>参数 factory  可以是一个函数，也可以为对象或者字符串。  <br>当 factory 为对象、字符串时，表示模块的接口就是该对象、字符串。  </p>
<p><em>定义JSON数据模块：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define({ &quot;foo&quot;: &quot;bar&quot; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;"><span class="hljs-class"><span class="hljs-keyword">define</span></span>({ <span class="hljs-string">"foo"</span>: <span class="hljs-string">"bar"</span> });</code></pre>
<p><em>factory 为函数的时候，表示模块的构造方法，执行构造方法便可以得到模块向外提供的接口。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define( function(require, exports, module) { 
    // 模块代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>define( <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-keyword">require</span>, exports, <span class="hljs-keyword">module</span>)</span> <span class="hljs-comment">{ 
    // 模块代码
}</span>);</span></code></pre>
<h4><code>SeaJS</code></h4>
<p><strong>sea.js 核心特征：</strong></p>
<ol>
<li>遵循CMD规范，与NodeJS般的书写模块代码。</li>
<li>依赖自动加载，配置清晰简洁。</li>
</ol>
<p><code>seajs.use</code>用来在页面中加载一个或者多个模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 // 加载一个模块 
seajs.use('./a');

// 加载模块，加载完成时执行回调
seajs.use('./a'，function(a){
    a.doSomething();
});

// 加载多个模块执行回调
seajs.use(['./a','./b']，function(a , b){
    a.doSomething();
    b.doSomething();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>
 <span class="hljs-comment">// 加载一个模块 </span>
seajs.<span class="hljs-keyword">use</span>(<span class="hljs-string">'./a'</span>);

<span class="hljs-comment">// 加载模块，加载完成时执行回调</span>
seajs.<span class="hljs-keyword">use</span>(<span class="hljs-string">'./a'</span>，<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a)</span></span>{
    a.doSomething();
});

<span class="hljs-comment">// 加载多个模块执行回调</span>
seajs.<span class="hljs-keyword">use</span>([<span class="hljs-string">'./a'</span>,<span class="hljs-string">'./b'</span>]，<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a , b)</span></span>{
    a.doSomething();
    b.doSomething();
});</code></pre>
<blockquote>
<code>AMD和CMD最大的区别是对依赖模块的执行时机处理不同，注意不是加载的时机或者方式不同。</code>  <br>很多人说requireJS是异步加载模块，SeaJS是同步加载模块，这么理解实际上是不准确的，其实加载模块都是异步的，只不过AMD依赖前置，js可以方便知道依赖模块是谁，立即加载，而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。  <p><code>为什么说是执行时机处理不同？</code>  <br>同样都是异步加载模块，AMD在加载模块完成后就会执行该模块，所有模块都加载执行完后会进入回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行。  <br>CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的。</p>
</blockquote>
<h3 id="articleHeader5">UMD</h3>
<p>统一模块定义（UMD：Universal Module Definition ）就是将 AMD 和 CommonJS 合在一起的一种尝试，常见的做法是将CommonJS 语法包裹在兼容 AMD 的代码中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(define) {
    define(function () {
        return {
            sayHello: function () {
                console.log('hello');
            }
        };
    });
}(
    typeof module === 'object' &amp;&amp; module.exports &amp;&amp; typeof define !== 'function' ?
    function (factory) { module.exports = factory(); } :
    define
));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">define</span>) </span>{
    define(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">sayHello</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
            }
        };
    });
}(
    <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports &amp;&amp; <span class="hljs-keyword">typeof</span> define !== <span class="hljs-string">'function'</span> ?
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">factory</span>) </span>{ <span class="hljs-built_in">module</span>.exports = factory(); } :
    define
));</code></pre>
<p>该模式的核心思想在于所谓的 IIFE（Immediately Invoked Function Expression），该函数会根据环境来判断需要的参数类别</p>
<h3 id="articleHeader6">ES6模块(module)</h3>
<h4>严格模式&nbsp;</h4>
<p>ES6 的模块自动采用严格模式，不管有没有在模块头部加上"use strict";。  <br>严格模式主要有以下限制。</p>
<ul>
<li>变量必须声明后再使用</li>
<li>函数的参数不能有同名属性，否则报错</li>
<li>不能使用with语句</li>
<li>不能对只读属性赋值，否则报错</li>
<li>不能使用前缀0表示八进制数，否则报错</li>
<li>不能删除不可删除的属性，否则报错</li>
<li>不能删除变量delete prop，会报错，只能删除属性delete global[prop]</li>
<li>eval不会在它的外层作用域引入变量</li>
<li>eval和arguments不能被重新赋值</li>
<li>arguments不会自动反映函数参数的变化</li>
<li>不能使用arguments.callee</li>
<li>不能使用arguments.caller</li>
<li>禁止this指向全局对象</li>
<li>不能使用fn.caller和fn.arguments获取函数调用的堆栈</li>
<li>增加了保留字（比如protected、static和interface）</li>
</ul>
<h4>模块Module</h4>
<p>一个模块，就是一个对其他模块暴露自己的属性或者方法的文件。</p>
<h4>导出Export</h4>
<p>作为一个模块，它可以选择性地给其他模块暴露（提供）自己的属性和方法，供其他模块使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// profile.js
export var firstName = 'qiqi';
export var lastName = 'haobenben';
export var year = 1992;

//等价于

var firstName = 'qiqi';
var lastName = 'haobenben';
var year = 1992;
export {firstName, lastName, year}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// profile.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> firstName = <span class="hljs-string">'qiqi'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> lastName = <span class="hljs-string">'haobenben'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> year = <span class="hljs-number">1992</span>;

<span class="hljs-comment">//等价于</span>

<span class="hljs-keyword">var</span> firstName = <span class="hljs-string">'qiqi'</span>;
<span class="hljs-keyword">var</span> lastName = <span class="hljs-string">'haobenben'</span>;
<span class="hljs-keyword">var</span> year = <span class="hljs-number">1992</span>;
<span class="hljs-keyword">export</span> {firstName, lastName, year}
</code></pre>
<p><code>1、 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

//上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">function</span> <span class="hljs-built_in">v1</span>() { ... }
<span class="hljs-symbol">function</span> <span class="hljs-built_in">v2</span>() { ... }

<span class="hljs-symbol">export</span> {
  <span class="hljs-built_in">v1</span> as <span class="hljs-keyword">streamV1,
</span>  <span class="hljs-built_in">v2</span> as <span class="hljs-keyword">streamV2,
</span>  <span class="hljs-built_in">v2</span> as <span class="hljs-keyword">streamLatestVersion
</span>}<span class="hljs-comment">;</span>

//上面代码使用as关键字，重命名了函数<span class="hljs-built_in">v1</span>和<span class="hljs-built_in">v2</span>的对外接口。重命名后，<span class="hljs-built_in">v2</span>可以用不同的名字输出两次。</code></pre>
<p><code>2、 需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 报错
export 1;

// 报错
var m = 1;
export m;

//上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。

/ 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

//上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">export</span> <span class="hljs-number">1</span>;

<span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">var</span> m = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> m;

<span class="hljs-comment">//上面两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1。1只是一个值，不是接口。</span>

/ 写法一
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> m = <span class="hljs-number">1</span>;

<span class="hljs-comment">// 写法二</span>
<span class="hljs-keyword">var</span> m = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> {m};

<span class="hljs-comment">// 写法三</span>
<span class="hljs-keyword">var</span> n = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> {n <span class="hljs-keyword">as</span> m};

<span class="hljs-comment">//上面三种写法都是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。</span></code></pre>
<p><code>3、最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，接下来说的import命令也是如此。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  export default 'bar' // SyntaxError
}
foo()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-string">'bar'</span> <span class="hljs-comment">// SyntaxError</span>
}
foo()</code></pre>
<h4>导入import</h4>
<p>作为一个模块，可以根据需要，引入其他模块的提供的属性或者方法，供自己模块使用。  </p>
<p><code>1、 import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { lastName as surename } from './profile';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { lastName <span class="hljs-keyword">as</span> surename } <span class="hljs-keyword">from</span> <span class="hljs-string">'./profile'</span>;</code></pre>
<p><code>2、import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js路径可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。</code>  </p>
<p><code>3、注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();

import { foo } from 'my_module';

//上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>foo();

<span class="hljs-keyword">import</span> { foo } <span class="hljs-keyword">from</span> <span class="hljs-string">'my_module'</span>;

<span class="hljs-regexp">//</span>上面的代码不会报错，因为<span class="hljs-keyword">import</span>的执行早于foo的调用。这种行为的本质是，<span class="hljs-keyword">import</span>命令是编译阶段执行的，在代码运行之前。</code></pre>
<p><code>4、由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>/ 报错
<span class="hljs-keyword">import</span> { <span class="hljs-string">'f'</span> + <span class="hljs-string">'oo'</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'my_module'</span>;

<span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">let</span> <span class="hljs-built_in">module</span> = <span class="hljs-string">'my_module'</span>;
<span class="hljs-keyword">import</span> { foo } <span class="hljs-keyword">from</span> <span class="hljs-built_in">module</span>;

<span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">if</span> (x === <span class="hljs-number">1</span>) {
  <span class="hljs-keyword">import</span> { foo } <span class="hljs-keyword">from</span> <span class="hljs-string">'module1'</span>;
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">import</span> { foo } <span class="hljs-keyword">from</span> <span class="hljs-string">'module2'</span>;
}</code></pre>
<p><code>5、最后，import语句会执行所加载的模块，因此可以有下面的写法。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'lodash';
//上面代码仅仅执行lodash模块，但是不输入任何值。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'lodash';</span>
<span class="hljs-comment">//上面代码仅仅执行lodash模块，但是不输入任何值。</span></code></pre>
<h3 id="articleHeader7">默认导出(export default)</h3>
<p>每个模块支持我们导出<code>一个</code>没有名字的变量，使用关键语句export default来实现.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function(){
    &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; console.log(&quot;I am default Fn&quot;);
     &nbsp; &nbsp;}
//使用export default关键字对外导出一个匿名函数，导入这个模块的时候，可以为这个匿名函数取任意的名字

//取任意名字均可
import sayDefault from &quot;./module-B.js&quot;;
sayDefault();
//结果：I am default Fn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I am default Fn"</span>);
     &nbsp; &nbsp;}
<span class="hljs-comment">//使用export default关键字对外导出一个匿名函数，导入这个模块的时候，可以为这个匿名函数取任意的名字</span>

<span class="hljs-comment">//取任意名字均可</span>
<span class="hljs-keyword">import</span> sayDefault <span class="hljs-keyword">from</span> <span class="hljs-string">"./module-B.js"</span>;
sayDefault();
<span class="hljs-comment">//结果：I am default Fn</span></code></pre>
<p><code>1、默认输出和正常输出的比较</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一组
export default function diff() { // 输出
  // ...
}

import diff from 'diff'; // 输入

// 第二组
export function diff() { // 输出
  // ...
};

import {diff} from 'diff'; // 输入

//上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 第一组</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 输出</span>
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">import</span> diff <span class="hljs-keyword">from</span> <span class="hljs-string">'diff'</span>; <span class="hljs-comment">// 输入</span>

<span class="hljs-comment">// 第二组</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 输出</span>
  <span class="hljs-comment">// ...</span>
};

<span class="hljs-keyword">import</span> {diff} <span class="hljs-keyword">from</span> <span class="hljs-string">'diff'</span>; <span class="hljs-comment">// 输入</span>

<span class="hljs-comment">//上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。</span></code></pre>
<blockquote>export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。</blockquote>
<p><br></p>
<p><code>2、因为export default本质是将该命令后面的值，赋给default变量以后再默认，所以直接将一个值写在export default之后。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ 正确
export default 42;

// 报错
export 42;

//上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定外对接口为default。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>/ 正确
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-number">42</span>;

<span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">export</span> <span class="hljs-number">42</span>;

<span class="hljs-comment">//上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定外对接口为default。</span></code></pre>
<p><code>3、如果想在一条import语句中，同时输入默认方法和其他变量，可以写成下面这样。</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _, { each } from 'lodash';

//对应上面代码的export语句如下
export default function (){
    //...
}
export function each (obj, iterator, context){
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> _, { each } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-comment">//对应上面代码的export语句如下</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//...</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">each</span> (<span class="hljs-params">obj, iterator, context</span>)</span>{
    <span class="hljs-comment">//...</span>
}</code></pre>
<h3 id="articleHeader8">export 与 import 的复合写法</h3>
<p>如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export { foo, bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
export { foo, bar };

/ 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">export</span> { foo, bar } <span class="hljs-keyword">from</span> <span class="hljs-string">'my_module'</span>;

<span class="hljs-comment">// 等同于</span>
<span class="hljs-keyword">import</span> { foo, bar } <span class="hljs-keyword">from</span> <span class="hljs-string">'my_module'</span>;
<span class="hljs-keyword">export</span> { foo, bar };

/ 接口改名
<span class="hljs-keyword">export</span> { foo <span class="hljs-keyword">as</span> myFoo } <span class="hljs-keyword">from</span> <span class="hljs-string">'my_module'</span>;

<span class="hljs-comment">// 整体输出</span>
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">'my_module'</span>;</code></pre>
<blockquote>注意事项  <br>1、声明的变量，对外都是只读的。但是导出的是对象类型的值，就可修改。  <br>2、导入不存在的变量，值为undefined。</blockquote>
<h4>ES6 中的循环引用</h4>
<p>ES6 中，imports 是 exports 的只读视图，直白一点就是，imports 都指向 exports 原本的数据，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//------ lib.js ------
export let counter = 3;
export function incCounter() {
    counter++;
}

//------ main.js ------
import { counter, incCounter } from './lib';

// The imported value `counter` is live
console.log(counter); // 3
incCounter();
console.log(counter); // 4

// The imported value can’t be changed
counter++; // TypeError" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//------ lib.js ------</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> counter = <span class="hljs-number">3</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incCounter</span>(<span class="hljs-params"></span>) </span>{
    counter++;
}

<span class="hljs-comment">//------ main.js ------</span>
<span class="hljs-keyword">import</span> { counter, incCounter } <span class="hljs-keyword">from</span> <span class="hljs-string">'./lib'</span>;

<span class="hljs-comment">// The imported value `counter` is live</span>
<span class="hljs-built_in">console</span>.log(counter); <span class="hljs-comment">// 3</span>
incCounter();
<span class="hljs-built_in">console</span>.log(counter); <span class="hljs-comment">// 4</span>

<span class="hljs-comment">// The imported value can’t be changed</span>
counter++; <span class="hljs-comment">// TypeError</span></code></pre>
<p>因此在 ES6 中处理循环引用特别简单，看下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//------ a.js ------
import {bar} from 'b'; // (1)
export function foo() {
  bar(); // (2)
}

//------ b.js ------
import {foo} from 'a'; // (3)
export function bar() {
  if (Math.random()) {
    foo(); // (4)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//------ a.js ------</span>
<span class="hljs-keyword">import</span> {bar} <span class="hljs-keyword">from</span> <span class="hljs-string">'b'</span>; <span class="hljs-comment">// (1)</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  bar(); <span class="hljs-comment">// (2)</span>
}

<span class="hljs-comment">//------ b.js ------</span>
<span class="hljs-keyword">import</span> {foo} <span class="hljs-keyword">from</span> <span class="hljs-string">'a'</span>; <span class="hljs-comment">// (3)</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.random()) {
    foo(); <span class="hljs-comment">// (4)</span>
  }
}</code></pre>
<p>假设先加载模块 a，在模块 a 加载完成之后，bar 间接性地指向的是模块 b 中的 bar。无论是加载完成的 imports 还是未完成的 imports，imports 和 exports 之间都有一个间接的联系，所以总是可以正常工作。</p>
<h4>实例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//---module-B.js文件---
//导出变量：name
export var name = &quot;cfangxu&quot;;

moduleA模块代码：
//导入 模块B的属性 name &nbsp; &nbsp;
import { name } from &quot;./module-B.js&quot;;&nbsp; &nbsp;
console.log(name)
//打印结果：cfangxu" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-comment">//---module-B.js文件---</span>
<span class="hljs-comment">//导出变量：name</span>
export var <span class="hljs-keyword">name</span> = <span class="hljs-string">"cfangxu"</span>;

moduleA模块代码：
<span class="hljs-comment">//导入 模块B的属性 name &nbsp; &nbsp;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-keyword">name</span> } from <span class="hljs-string">"./module-B.js"</span>;&nbsp; &nbsp;
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">name</span>)
<span class="hljs-comment">//打印结果：cfangxu</span></code></pre>
<p><em>批量导出</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//属性name
var name = &quot;cfangxu&quot;;
//属性age
var age&nbsp; = 26;
//方法 say
var say = function(){
     &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; console.log(&quot;say hello&quot;);
      &nbsp; &nbsp;}
//批量导出
export {name,age,say}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//属性name</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"cfangxu"</span>;
<span class="hljs-comment">//属性age</span>
<span class="hljs-keyword">var</span> age&nbsp; = <span class="hljs-number">26</span>;
<span class="hljs-comment">//方法 say</span>
<span class="hljs-keyword">var</span> say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"say hello"</span>);
      &nbsp; &nbsp;}
<span class="hljs-comment">//批量导出</span>
<span class="hljs-keyword">export</span> {name,age,say}</code></pre>
<p><em>批量导入</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//导入 模块B的属性
import { name,age,say } from &quot;./module-B.js&quot;;
console.log(name)
//打印结果：cfangxu
console.log(age)
//打印结果：26
say()
//打印结果：say hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">//导入 模块B的属性</span>
import { <span class="hljs-built_in">name</span>,age,<span class="hljs-built_in">say</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"./module-B.js"</span>;
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>)
<span class="hljs-comment">//打印结果：cfangxu</span>
console.<span class="hljs-built_in">log</span>(age)
<span class="hljs-comment">//打印结果：26</span>
<span class="hljs-built_in">say</span>()
<span class="hljs-comment">//打印结果：say hello</span></code></pre>
<p><em>重命名导入变量</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {name as myName} from './module-B.js';
console.log(myName) //cfangxu" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {name <span class="hljs-keyword">as</span> myName} <span class="hljs-keyword">from</span> <span class="hljs-string">'./module-B.js'</span>;
<span class="hljs-built_in">console</span>.log(myName) <span class="hljs-comment">//cfangxu</span></code></pre>
<p><em>整体导入</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/使用*实现整体导入
import * as obj from &quot;./module-B.js&quot;;

console.log(obj.name)
//结果：&quot;cfangxu&quot;
console.log(obj.age)
//结果：26
obj.say();
//结果：say hello
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>/使用*实现整体导入
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> obj from <span class="hljs-string">"./module-B.js"</span>;

console.<span class="hljs-built_in">log</span>(obj.<span class="hljs-keyword">name</span>)
<span class="hljs-comment">//结果："cfangxu"</span>
console.<span class="hljs-built_in">log</span>(obj.age)
<span class="hljs-comment">//结果：26</span>
obj.say();
<span class="hljs-comment">//结果：say hello</span>
</code></pre>
<h3 id="articleHeader9">推荐资料</h3>
<ul>
<li><a href="http://blog.chinaunix.net/uid-26672038-id-4112229.html" rel="nofollow noreferrer" target="_blank"> JavaSript模块规范 - AMD规范与CMD规范介绍 </a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651226355&amp;idx=1&amp;sn=aedf47d5a3be53f6c7d5562977624861&amp;chksm=bd4959778a3ed06198cbb746067393cd0f189612f4fc577417e0741df3a2b620373ea025978b&amp;scene=21#wechat_redirect" rel="nofollow noreferrer" target="_blank">JavaScript 模块演化简史</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2015/05/require.html" rel="nofollow noreferrer" target="_blank">require() 源码解读</a></li>
<li><a href="https://segmentfault.com/a/1190000009060866#articleHeader0">在 Node.js 中引入模块：你所需要知道的一切都在这里</a></li>
<li><a href="http://www.infoq.com/cn/articles/nodejs-module-mechanism#" rel="nofollow noreferrer" target="_blank">深入浅出Node.js（三）：深入Node.js的模块机制</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
很全很全的JavaScript的模块讲解

## 原文链接
[https://segmentfault.com/a/1190000012464333](https://segmentfault.com/a/1190000012464333)

