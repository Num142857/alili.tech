---
title: '我他喵的到底要怎样才能在生产环境中用上 ES6 模块化？' 
date: 2019-01-09 2:30:12
hidden: true
slug: ni37eww88r
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文发表在我的<a href="https://blessing.studio/how-could-i-use-es6-modules-in-production/" rel="nofollow noreferrer" target="_blank">博客</a>上。最近捣鼓了一下 ES6 的模块化，分享一些经验 :)</p></blockquote>
<p>Python3 已经发布了九年了，Python 社区却还在用 Python 2.7；而 JavaScript 社区正好相反，大家都已经开始把还没有实现的语言特性用到生产环境中了 (´_ゝ `)</p>
<p>虽然这种奇妙情况的形成与 JavaScript 自身早期的设计缺陷以及浏览器平台的特殊性质都有关系，但也确实能够体现出 JavaScript 社区的技术栈迭代是有多么屌快。如果你昏迷个一年半载再去看前端圈，可能社区的主流技术栈已经变得它妈都不认识了（如果你没什么实感，可以看看<a href="https://zhuanlan.zhihu.com/p/22782487" rel="nofollow noreferrer" target="_blank">《在 2016 年学习 JavaScript 是一种怎样的体验》</a>这篇文章，你会感受到的，你会的）。</p>
<h2 id="articleHeader0">JavaScript 模块化现状</h2>
<p>随着 JavaScript 越来越广泛的应用，朝着单页应用（SPA）方向发展的网页与代码量的愈发庞大，社区需要一种更好的代码组织形式，这就是模块化：将你的一大坨代码分装为多个不同的模块。</p>
<p>但是在 ES6 标准出台之前，由于标准的缺失（连 CSS 都有 <code>@import</code>，JavaScript 却连个毛线都没），这几年里 JavaScript 社区里冒出了各种各样的模块化解决方案<del>（群魔乱舞）</del>，懵到一种极致。主要的几种模块化方案举例如下：</p>
<h3 id="articleHeader1">CommonJS</h3>
<p>主要用于服务端，模块同步加载（也因此不适合在浏览器中运行，不过也有 <code>Browserify</code> 之类的转换工具），Node.js 的模块化实现就是基于 CommonJS 规范的，通常用法像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
const {bullshit} = require('./bullshit');
console.log(bullshit());

// bullshit.js
function someBullshit() {
  return &quot;hafu hafu&quot;;
}

modules.export = {
  bullshit: someBullshit
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">const</span> {bullshit} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./bullshit'</span>);
<span class="hljs-built_in">console</span>.log(bullshit());

<span class="hljs-comment">// bullshit.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someBullshit</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">"hafu hafu"</span>;
}

modules.export = {
  <span class="hljs-attr">bullshit</span>: someBullshit
};</code></pre>
<p>而且 <code>require()</code> 是动态加载模块的，完全就是模块中 <code>modules.export</code> 变量的传送门，这也就意味着更好的灵活性（按条件加载模块，参数可为表达式 etc.）。</p>
<h3 id="articleHeader2">AMD</h3>
<p>即异步模块定义（Asynchronous Module Definition），<del>不是那个日常翻身的农企啦</del>。</p>
<p>主要用于浏览器端，模块异步加载（还是用的回调函数），可以给模块注入依赖、动态加载代码块等。具体实现有 RequireJS，代码大概长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
require(['bullshit'], words => {
  console.log(words.bullshit());
});

// bullshit.js
define('bullshit', ['dep1', 'dep2'], (dep1, dep2) => {
  function someBullshit() {
    return &quot;hafu hafu&quot;;
  }

  return { bullshit: someBullshit };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">'bullshit'</span>], words =&gt; {
  <span class="hljs-built_in">console</span>.log(words.bullshit());
});

<span class="hljs-comment">// bullshit.js</span>
define(<span class="hljs-string">'bullshit'</span>, [<span class="hljs-string">'dep1'</span>, <span class="hljs-string">'dep2'</span>], (dep1, dep2) =&gt; {
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someBullshit</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"hafu hafu"</span>;
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">bullshit</span>: someBullshit };
});</code></pre>
<p>可惜不能在 Node.js 中直接使用，而且模块定义与加载也比较冗长。</p>
<h3 id="articleHeader3">ES6 Module?</h3>
<p>在 ES6 模块标准出来之前，主要的模块化方案就是上述 CommonJS 和 AMD 两种了，一种用于服务器，一种用于浏览器。其他的规范还有：</p>
<ul>
<li><p>最古老的 IIFE（立即执行函数）；</p></li>
<li><p>CMD（Common Module Definition，和 AMD 挺像的，可以参考：<a href="https://github.com/seajs/seajs/issues/277" rel="nofollow noreferrer" target="_blank">与 RequireJS 的异同</a>）；</p></li>
<li><p>UMD（Universal Module Definition，兼容 AMD 和 CommonJS 的语法糖规范）；</p></li>
</ul>
<p>等等，这里就按下不表。</p>
<p>ES6 的模块化代码大概长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
import {bullshit} from './bullshit';
console.log(bullshit());

// bullshit.js
function someBullshit() {
  return &quot;hafu hafu&quot;;
}

export {
  someBullshit as bullshit
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> {bullshit} <span class="hljs-keyword">from</span> <span class="hljs-string">'./bullshit'</span>;
<span class="hljs-built_in">console</span>.log(bullshit());

<span class="hljs-comment">// bullshit.js</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">someBullshit</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">"hafu hafu"</span>;
}

<span class="hljs-keyword">export</span> {
  someBullshit <span class="hljs-keyword">as</span> bullshit
};</code></pre>
<p>那我们为啥应该使用 ES6 的模块化规范呢？</p>
<ul>
<li><p>这是 ECMAScript 官方标准（嗯）；</p></li>
<li><p>语义化的语法，清晰明了，同时支持服务器端和浏览器；</p></li>
<li><p>静态 / 编译时加载（与上面俩规范的动态 / 运行时加载不同），可以做静态优化（比如下面提到的 tree-shaking），加载效率高（不过相应地灵活性也降低了，期待 <a href="https://github.com/tc39/proposal-dynamic-import" rel="nofollow noreferrer" target="_blank"><code>import()</code></a> 也成为规范）；</p></li>
<li><p>输出的是值的引用，可动态修改；</p></li>
</ul>
<p>嗯，你说的都对，那我tm到底要怎样才能在生产环境中用上 ES6 的模块化特性呢？</p>
<p>很遗憾，你永远无法控制用户的浏览器版本，可能要等上一万年，你才能直接在生产环境中写 ES6 而不用提心吊胆地担心兼容性问题。因此，你还是需要各种各样杂七杂八的工具来转换你的代码：Babel、Webpack、Browserify、Gulp、Rollup.js、System.js ……</p>
<p>噢，我可去你妈的吧，这些东西都tm是干嘛的？我就是想用个模块化，我到底该用啥子？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078904" src="https://static.alili.tech/img/remote/1460000010078904" alt="我可去你妈的吧" title="我可去你妈的吧" style="cursor: pointer;"></span></p>
<p>本文正旨在列出几种可用的在生产环境中放心使用 ES6 模块化的方法，希望能帮到诸位后来者（这方面的中文资源实在是忒少了）。</p>
<h2 id="articleHeader4">问题分析</h2>
<p>想要开心地写 ES6 的模块化代码，首先你需要一个转译器（Transpiler）来把你的 ES6 代码转换成大部分浏览器都支持的 ES5 代码。这里我们就选用最多人用的 Babel（我不久之前才知道原来 Babel 就是巴别塔里的「巴别」……）。</p>
<p>用了 Babel 后，我们的 ES6 模块化代码会被转换为 ES5 + CommonJS 模块规范的代码，这倒也没什么，毕竟我们写的还是 ES6 的模块，至于编译生成的结果，管它是个什么屌东西呢（笑）</p>
<p>所以我们需要另外一个打包工具来将我们的模块依赖给打包成一个 bundle 文件。目前来说，依赖打包应该是最好的方法了。不然，你也可以等上一万年，等你的用户把浏览器升级到全部支持 HTTP/2（支持连接复用后模块不打包反而比较好）以及 <code>&lt;script type="module" src="fuck.js"&gt;</code> 定义 ( ﾟ∀。)</p>
<p>所以我们整个工具链应该是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078905" src="https://static.alili.tech/img/remote/1460000010078905" alt="处理流程" title="处理流程" style="cursor: pointer;"></span></p>
<p>而目前来看，主要可用的模块打包工具有这么几个：</p>
<ul>
<li><p>Browserify</p></li>
<li><p>Webpack</p></li>
<li><p>Rollup.js</p></li>
</ul>
<p>本来我还想讲一下 FIS3 的，结果去看了一下，人家竟然还没原生的支持 ES6 Modules，而且 <code>fis3-hook-commonjs</code> 插件也几万年没更新了，所以还是算了吧。至于 SystemJS 这类动态模块加载器本文也不会涉及，就像我上面说的一样，在目前这个时间点上还是先用模块打包工具比较好。</p>
<p>下面分别介绍这几个工具以及如何使用它们配合 Babel 实现 ES6 模块转译。</p>
<h2 id="articleHeader5">Browserify</h2>
<p>Browserify 这个工具也是有些年头了，它通过打包所有的依赖来让你能够在浏览器中使用 CommonJS 的语法来 <code>require('modules')</code>，这样你就可以像在 Node.js 中一样在浏览器中使用 npm 包了，可以爽到。<del>而且我也很喜欢 Browserify 这个 LOGO</del></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010079039" src="https://static.alili.tech/img/remote/1460000010079039" alt="Browserify" title="Browserify" style="cursor: pointer;"></span></p>
<p>既然 Babel 会把我们的 ES6 Modules 语法转换成 ES5 + CommonJS 规范的模块语法，那我们就可以直接用 Browserify 来解析 Babel 的转译生成物，然后把所有的依赖给打包成一个文件，岂不是美滋滋。</p>
<p>不过除了 Babel 和 Browserify 这俩工具外，我们还需要一个叫做 <code>babelify</code> 的东西……好吧好吧，这是最后一个了，真的。</p>
<p>那么，babelify 是拿来干嘛的呢？因为 Browserify 只看得懂 CommonJS 的模块代码，所以我们得把 ES6 模块代码转换成 CommonJS 规范的，再拿给 Browserify 去看：这一步就是 Babel 要干的事情了。但是 Browserify 人家是个模块打包工具啊，它是要去分析 AST（抽象语法树），把那些 <code>reuqire()</code> 的依赖文件给找出来再帮你打包的，你总不能把所有的源文件都给 Babel 转译了再交给 Browserify 吧？那太蠢了，我的朋友。</p>
<p><code>babelify</code> (Browserify transform for Babel) 要做的事情，就是在所有 ES6 文件拿给 Browserify 看之前，先把它用 Babel 给转译一下（<code>browserify().transform</code>），这样 Browserify 就可以直接看得懂并打包依赖，避免了要用 Babel 先转译一万个文件的尴尬局面。</p>
<p>好吧，那我们要怎样把这些工具捣鼓成一个完整的工具链呢？下面就是喜闻乐见的依赖包安装环节：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 我用的 yarn，你用 npm 也差不多
# gulp 也可以全局安装，方便一点
# babel-preset 记得选适合自己的
# 最后那俩是用来配合 gulp stream 的
$ yarn add --dev babel-cli babel-preset-env babelify browserify gulp vinyl-buffer vinyl-source-stream" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell"><span class="hljs-comment"># 我用的 yarn，你用 npm 也差不多</span>
<span class="hljs-comment"># gulp 也可以全局安装，方便一点</span>
<span class="hljs-comment"># babel-preset 记得选适合自己的</span>
<span class="hljs-comment"># 最后那俩是用来配合 gulp stream 的</span>
$ yarn <span class="hljs-keyword">add </span>--dev <span class="hljs-keyword">babel-cli </span><span class="hljs-keyword">babel-preset-env </span><span class="hljs-keyword">babelify </span><span class="hljs-keyword">browserify </span>gulp vinyl-<span class="hljs-keyword">buffer </span>vinyl-source-stream</code></pre>
<p>这里我们用 Gulp 作为任务管理工具来实现自动化（什么，都 7012 年了你还不知道 Gulp？那为什么不去问问<a href="https://www.google.com/" rel="nofollow noreferrer" target="_blank">神奇海螺</a>呢？），<code>gulpfile.js</code> 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp       = require('gulp'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer');

gulp.task('build', function () {
    return browserify(['./src/index.js'])
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'))
        .pipe(buffer());
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> gulp       = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>),
    browserify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'browserify'</span>),
    babelify   = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babelify'</span>),
    source     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vinyl-source-stream'</span>),
    buffer     = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vinyl-buffer'</span>);

gulp.task(<span class="hljs-string">'build'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> browserify([<span class="hljs-string">'./src/index.js'</span>])
        .transform(babelify)
        .bundle()
        .pipe(source(<span class="hljs-string">'bundle.js'</span>))
        .pipe(gulp.dest(<span class="hljs-string">'dist'</span>))
        .pipe(buffer());
});</code></pre>
<p>相信诸位都能看得懂吧，<code>browserify()</code> 第一个参数是入口文件，可以是数组或者其他乱七八糟的，具体参数说明请自行参照 Browserify 文档。而且记得在根目录下创建 <code>.babelrc</code> 文件指定转译的 preset，或者在 <code>gulpfile.js</code> 中配置也可以，这里就不再赘述。</p>
<p>最后运行 <code>gulp build</code>，就可以生成能直接在浏览器中运行的打包文件了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  browserify $ gulp build
[12:12:01] Using gulpfile E:\wwwroot\es6-module-test\browserify\gulpfile.js
[12:12:01] Starting 'build'...
[12:12:01] Finished 'build' after 720 ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code class="shell">➜  browserify $ gulp build
[<span class="hljs-number">12</span>:<span class="hljs-number">12</span>:<span class="hljs-number">01</span>] <span class="hljs-symbol">Using</span> gulpfile <span class="hljs-symbol">E</span>:\wwwroot\es6-module-test\browserify\gulpfile.js
[<span class="hljs-number">12</span>:<span class="hljs-number">12</span>:<span class="hljs-number">01</span>] <span class="hljs-symbol">Starting</span> <span class="hljs-string">'build'</span>...
[<span class="hljs-number">12</span>:<span class="hljs-number">12</span>:<span class="hljs-number">01</span>] <span class="hljs-symbol">Finished</span> <span class="hljs-string">'build'</span> after <span class="hljs-number">720</span> ms</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078906" src="https://static.alili.tech/img/remote/1460000010078906" alt="Browserify Result" title="Browserify Result" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">Rollup.js</h2>
<p>我记得这玩意最开始出来的时候号称为「下一代的模块打包工具」，并且自带了可大大减小打包体积的 <code>tree-shaking</code> 技术（DCE 无用代码移除的一种，运用了 ES6 静态分析语法树的特性，只打包那些用到了的代码），在当时很新鲜。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078907" src="https://static.alili.tech/img/remote/1460000010078907" alt="Rollup.js" title="Rollup.js" style="cursor: pointer;"></span></p>
<p>但是现在 Webpack2+ 已经支持了 Tree Shaking 的情况下，我们又有什么特别的理由去使用 Rollup.js 呢？不过毕竟也是一种可行的方法，这里也提一提：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 我也不知道为啥 Rollup.js 要依赖这个 external-helpers
$ yarn add --dev rollup rollup-plugin-babel babel-preset-env babel-plugin-external-helpers" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell"><span class="hljs-comment"># 我也不知道为啥 Rollup.js 要依赖这个 external-helpers</span>
$ yarn <span class="hljs-keyword">add </span>--dev rollup rollup-plugin-<span class="hljs-keyword">babel </span><span class="hljs-keyword">babel-preset-env </span><span class="hljs-keyword">babel-plugin-external-helpers</span></code></pre>
<p>然后修改根目录下的 <code>rollup.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'esm',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  dest: 'dist/bundle.js'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'src/index.js'</span>,
  <span class="hljs-attr">format</span>: <span class="hljs-string">'esm'</span>,
  <span class="hljs-attr">plugins</span>: [
    babel({
      <span class="hljs-attr">exclude</span>: <span class="hljs-string">'node_modules/**'</span>
    })
  ],
  <span class="hljs-attr">dest</span>: <span class="hljs-string">'dist/bundle.js'</span>
};</code></pre>
<p>还要修改 <code>.babelrc</code> 文件，把 Babel 转换 ES6 模块到 CommonJS 模块的转换给关掉，不然会导致 Rollup.js 处理不来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;, {
      &quot;modules&quot;: false
    }]
  ],
  &quot;plugins&quot;: [
    &quot;external-helpers&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>
    }]
  ],
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"external-helpers"</span>
  ]
}</code></pre>
<p>然后在根目录下运行 <code>rollup -c</code> 即可打包依赖，也可以配合 Gulp 来使用，官方文档里就有，这里就不赘述了。可以看到，Tree Shaking 的效果还是很显著的，经测试，未使用的代码确实不会被打包进去，比起上面几个工具生成的结果要清爽多了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078908" src="https://static.alili.tech/img/remote/1460000010078908" alt="Rollup.js Result" title="Rollup.js Result" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">Webpack</h2>
<p>对，Webpack，就是那个丧心病狂想要把啥玩意都给模块化的模块打包工具。既然人家已经到了 <code>3.0.0</code> 版本了，所以下面的都是基于 Webpack3 的。什么？现在还有搞前端的不知道 Webpack？神奇海螺以下略。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078909" src="https://static.alili.tech/img/remote/1460000010078909" alt="Webpack" title="Webpack" style="cursor: pointer;"></span></p>
<p>喜闻乐见的依赖安装环节：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# webpack 也可以全局安装，方便一些
$ yarn add --dev babel-loader babel-core babel-preset-env webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell"><span class="hljs-comment"># webpack 也可以全局安装，方便一些</span>
$ yarn <span class="hljs-keyword">add </span>--dev <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-preset-env </span>webpack</code></pre>
<p>然后配置 <code>webpack.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/index.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">use</span>: {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">presets</span>: [<span class="hljs-string">'env'</span>]
          }
        }
      }
    ]
  }
};</code></pre>
<p>差不多就是这么个配置，<code>babel-loader</code> 的其他 <code>options</code> 请参照文档，而且这个配置文件的括号嵌套也是说不出话，ZTMJLWC。</p>
<p>然后运行 <code>webpack</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  webpack $ webpack
Hash: 5c326572cf1440dbdf64
Version: webpack 3.0.0
Time: 1194ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.86 kB       0  [emitted]  main
   [0] ./src/index.js 106 bytes {0} [built]
   [1] ./src/bullshit.js 178 bytes {0} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code class="shell">➜  webpack $ webpack
Hash: 5c326572cf1440dbdf64
Version: webpack 3.0.0
<span class="hljs-keyword">Time:</span> 1194ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.86 kB       0  [emitted]  main
   [0] ./src/index.js 106 bytes {0} [built]
   [1] ./src/bullshit.js 178 bytes {0} [built]</code></pre>
<p>情况呢就是这么个情况：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010078910" src="https://static.alili.tech/img/remote/1460000010078910" alt="Webpack Result" title="Webpack Result" style="cursor: pointer;"></span></p>
<blockquote>
<p><strong>Tips: 关于 Webpack 的 Tree Shaking</strong></p>
<p>Webpack 现在是自带 Tree-Shaking 的，不过需要你把 Babel 默认的转换 ES6 模块至 CommonJS 格式给关掉，就像上面 Rollup.js 那样在 <code>.babelrc</code> 中添加个 <code>"modules": false</code>。原因的话上面也提到过，tree-shaking 是基于 ES6 模块的静态语法分析的，如果交给 Webpack 的是已经被 Babel 转换成 CommonJS 的代码的话那就没戏了。</p>
<p>而且 Webpack 自带的 tree-shaking 只是把没用到的模块从 <code>export</code> 中去掉而已，之后还要再接一个 UglifyJS 之类的工具把冗余代码干掉才能达到 Rollup.js 那样的效果。</p>
</blockquote>
<p>Webpack 也可以配合 Gulp 工作流让开发更嗨皮，有兴趣的可自行研究。目前来看，这三种方案中，我本人更倾向于使用 Webpack，不知道诸君会选用什么呢？</p>
<h2 id="articleHeader8">写在后面</h2>
<p>前几天我在捣鼓 <a href="https://github.com/printempw/blessing-skin-server" rel="nofollow noreferrer" target="_blank">printempw/blessing-skin-server</a> 那坨 shi 一样 JavaScript 代码的模块化的时候，打算试着使用一下 ES6 标准中的模块化方案，并找了 Google 大老师问 ES6 模块转译打包相关的资源，找了半天，几乎没有什么像样的中文资源。全是讲 ES6 模块是啥、有多好、为什么要用之类的，没几个是讲到底该怎么在生产环境中使用的（也有可能是我搜索姿势不对），说不出话。遂撰此文，希望能帮到后来人。</p>
<p>且本人水平有限，如果文中有什么错误，欢迎在下方评论区批评指出。</p>
<h3 id="articleHeader9">参考链接</h3>
<ul>
<li><p><a>Getting import/export working ES6 style using Browserify + Babelify + Gulp = -5hrs of life</a></p></li>
<li><p><a href="https://rollupjs.org/" rel="nofollow noreferrer" target="_blank">rollup.js • guide</a></p></li>
<li><p><a href="http://brooch.me/2017/06/30/webpack-tree-shaking/" rel="nofollow noreferrer" target="_blank">使用 webpack 2 tree-shaking 机制时需要注意的细节</a></p></li>
<li><p><a href="http://xwjgo.github.io/2016/09/23/webpack+babel%E5%AE%9E%E7%8E%B0%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AB%AF%E4%BD%BF%E7%94%A8es6%E6%A8%A1%E5%9D%97%E8%AF%AD%E6%B3%95/" rel="nofollow noreferrer" target="_blank">webpack+babel 加载 es6 模块</a></p></li>
<li><p><a href="https://webpack.js.org/configuration/" rel="nofollow noreferrer" target="_blank">Documentation - webpack</a></p></li>
<li><p><a href="https://www.zhihu.com/question/41922432" rel="nofollow noreferrer" target="_blank">如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我他喵的到底要怎样才能在生产环境中用上 ES6 模块化？

## 原文链接
[https://segmentfault.com/a/1190000010078899](https://segmentfault.com/a/1190000010078899)

