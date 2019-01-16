---
title: '从 JavaScript 到 TypeScript - 模块化和构建' 
date: 2019-01-17 2:30:25
hidden: true
slug: 4gu6y454zfd
categories: [reprint]
---

{{< raw >}}

                    
<p>TypeScript 带来的最大好处就是静态类型检查，所以在从 JavaScript 转向 TypeScript 之前，一定要认识到添加类型定义会带来额外的工作量，这是必要的代价。不过，相对于静态类型检查带来的好处，这些代价是值得的。当然，TypeScript 允许不定义类型或者将所有类型定义为 <code>any</code>，但如果这样做，TypeScript 带来的大部分静态检查功能都会失去作用，换言之，也就没必要使用 TypeScript 了。</p>
<h2 id="articleHeader0">模块化</h2>
<p>在转换之前还要注意的一个问题就是模块化。早期的 JavaScript 代码基本上是每个 HTML 页面对应一个或几个 JavaScript 脚本，那时候的 JavaScript 代码中很少有模块化的概念。不过随着 Web 2.0 的兴起，大量的工作从后端移到前端，JavaScript 程序变得越来越复杂，模块化成为刚需，大量的模块化框架随之而来，其中比较有名的有 RequestJS 及其带来的 AMD 标准，还有 SeaJS 带来的 CMD 标准。而随着 Node.js 的兴起以及 JavaScript 的全栈化，又有了 CommonJS 标准。之后又出现了广为使用的 SystemJS。当然少不了 ES6 的模块化标准，虽然到目前为止 Node.js 和大部分浏览器都还不支持它。</p>
<p>TypeScript 本身支持两种模块化方式，一种是对 ES6 的模块的微小扩展，另一种是在 ES6 发布之前本身模仿 C# 的命名空间。大部分使用命令空间的场景都可以使用 ES6 模块化标准来代替。我们先来看一看两种模块化方式区别。</p>
<h3 id="articleHeader1">命名空间</h3>
<p>使用命令空间写的 TS 脚本在转译成 JS 后，可以不使用任何模块加载框架，直接在页面中加载即可使用。不过很遗憾，这种方式转义出来的 JS 程序不能直接在 Node.js 中使用。因为 <code>tsc</code> 不为会命名空间形式的模块生成 <code>modules.exports</code> 对象以及 <code>require</code> 语句。</p>
<blockquote><p>有一种情况例外。将所有 <code>.ts</code> 文件转译成一个 <code>.js</code>，假设叫 <code>all.js</code>，那么它可以通过 <code>node all</code> 来运行。这种情况下不需要任何模块的导入导出。</p></blockquote>
<p>不过在浏览器环境中，严格的按照依赖顺序引入生成的 <code>.js</code> 文件是可行的。早期没有使用模块化的 JS 文件就可以使用“命名空间”形式的模块化写法，甚至可以将原来成百上千行的大型 JS 源文件，拆分成若干小的 TS 文件，再通过 <code>tsc --outfile</code> 输出单一 JS 文件来使用，这样既能实现模块化重构，又能不改变原有的 HTML(或其它动态页面文件)的代码。</p>
<p>还有一点需要注意的是，在指定生成单一输出文件的情况下，TypeScript 不会通过代码逻辑去检查模块间的依赖关系。默认情况下它会按文件名的字母序逐个转译 <code>.ts</code> 文件，除非源文件中通过 <code>/// &lt;reference path="..." /&gt;</code> 明确指定了依赖项。</p>
<h3 id="articleHeader2">ES6 模块</h3>
<p>在 TypeScript 使用 ES6 模块语法来实现模块化的情况下，<code>tsc</code> 允许通过 <code>module</code> 参数来指定生成的 <code>.js</code> 会应用于何种模块化框架，默认的是 <code>commonjs</code>，其它比较常用的还有 <code>amd</code>、<code>system</code> 等。</p>
<p>显然，如果原来的 JS 程序使用了 AMD 框架，在转换成 TS 的时候，就可以使用 ES6 模块写法，并通过 <code>tsc --module amd</code> 来输出对应的 JS 文件，同样不需要修改原来的页面文件。</p>
<p>但是，如果原来的 JS 文件没有使用任何模块框架的情况下，转换为采用 ES6 模块写法的 TS 代码，在构建的时候就会麻烦一点。这种情况下即使构建成单一输出文件，仍然会需要模块化框架的支持，比如需要 AMD 的 <code>define</code> 和 <code>require</code>，或者需要 System 的 API 支持。</p>
<p>为了避免引入模块化框架，可以考虑以 commonjs 标准输出 JS，然后通过 Webpack 来把所有生成的 JS 打包成单一文件。这里既然用到了 Webpack，构建配置就可以更灵活了，因为 Webpack 可以指定多个 <code>entry</code>，可以有多个输出，它会通过 <code>import ...</code> 转译成的 <code>require(...)</code> 自动检查依赖项。而且 Webpack 还可以使用 <code>ts-loader</code> 直接处理 <code>.ts</code> 文件而不需要先使用 <code>tsc</code> 来进行转译。如果在 TS 中用到了高版本 ECMAScript 语法，比如 <code>async/await</code>，还可以通过 <code>babel-loader</code> 来增加一层处理……非常灵活。</p>
<p>但这里往往会有一个问题，生成的 <code>.js</code> 中所有定义都不在全局范围，那么脚本引入网页之后，如何使用其中定义的内容？这需要借助全局对象 <code>window</code>——这里不需要考虑 Node.js 的全局对象 <code>global</code>，因为在 <code>Node.js</code> 下一般是采用模块化的方式引入，不需要向全局对象注入什么东西。</p>
<p>向 <code>window</code> 注入对象(或函数、值等)的方法也很简单，分两步：申明、赋值，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MyApi from &quot;./myapi&quot;;

declare global {
    interface Window {
        mime: MyApi;
    }
}

window.mime = new MyApi();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> MyApi <span class="hljs-keyword">from</span> <span class="hljs-string">"./myapi"</span>;

<span class="hljs-keyword">declare</span> global {
    <span class="hljs-keyword">interface</span> Window {
        mime: MyApi;
    }
}

<span class="hljs-built_in">window</span>.mime = <span class="hljs-keyword">new</span> MyApi();</code></pre>
<h2 id="articleHeader3">常用的构建配置</h2>
<p>我们早期项目中使用 TypeScript 的命名空间，不过最近几乎都重构成 ES6 模块方式了。由于会用到 async 函数，所以一般会配置 TypeScript 输出 ES2017 代码，再通过 Babel 转译成 ES5 代码，最后由 Webpack 打包输出。</p>
<h3 id="articleHeader4">tsconfig.json</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;compilerOptions&quot;: {
        &quot;module&quot;: &quot;commonjs&quot;,
        &quot;target&quot;: &quot;es2017&quot;,
        &quot;lib&quot;: [
            &quot;dom&quot;,
            &quot;es6&quot;,
            &quot;dom.iterable&quot;,
            &quot;scripthost&quot;,
            &quot;es2017&quot;
        ],
        &quot;noImplicitAny&quot;: false,
        &quot;sourceMap&quot;: false
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"compilerOptions"</span>: {
        <span class="hljs-attr">"module"</span>: <span class="hljs-string">"commonjs"</span>,
        <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es2017"</span>,
        <span class="hljs-attr">"lib"</span>: [
            <span class="hljs-string">"dom"</span>,
            <span class="hljs-string">"es6"</span>,
            <span class="hljs-string">"dom.iterable"</span>,
            <span class="hljs-string">"scripthost"</span>,
            <span class="hljs-string">"es2017"</span>
        ],
        <span class="hljs-attr">"noImplicitAny"</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">false</span>
    }
}</code></pre>
<p>在 <code>target</code> 为 <code>es5</code> 或 <code>es6</code> 的时候，TypeScript 会有默认的 <code>lib</code> 列表，这在<a href="http://www.typescriptlang.org/docs/handbook/compiler-options.html" rel="nofollow noreferrer" target="_blank">官方文档</a>中有详细说明。<code>target</code> 定义为 <code>es2017</code> 是为了支持 async 函数，但这个配置没有默认 <code>lib</code> 列表，所以参考官方文档对 <code>--target es6</code> 使用的 <code>lib</code> 列表，补充 <code>es2017</code> 类型库即可。</p>
<h3 id="articleHeader5">webpack.config.js</h3>
<p>这里使用了 Webpack2 的配置格式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        index: &quot;./js/index&quot;
    },
    output: {
        filename: &quot;[name].js&quot;
    },
    devtool: &quot;source-map&quot;,
    resolve: {
        extensions: [&quot;.ts&quot;]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: &quot;babel-loader&quot;,
                        options: {
                            presets: [&quot;es2015&quot;, &quot;stage-3&quot;]
                        }
                    },
                    &quot;ts-loader&quot;
                ],
                exclude: /node_modules/
            }
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">index</span>: <span class="hljs-string">"./js/index"</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].js"</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">"source-map"</span>,
    <span class="hljs-attr">resolve</span>: {
        <span class="hljs-attr">extensions</span>: [<span class="hljs-string">".ts"</span>]
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.ts$/</span>,
                <span class="hljs-attr">use</span>: [
                    {
                        <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel-loader"</span>,
                        <span class="hljs-attr">options</span>: {
                            <span class="hljs-attr">presets</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-3"</span>]
                        }
                    },
                    <span class="hljs-string">"ts-loader"</span>
                ],
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
            }
        ]
    }
};</code></pre>
<h3 id="articleHeader6">gulp task</h3>
<p>如果还使用 gulp，任务是这样写的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const gulp = require(&quot;gulp&quot;);
const gutil = require(&quot;gulp-util&quot;);

// 转译JavaScript
gulp.task(&quot;webpack&quot;, () => {
    const webpack = require(&quot;webpack-stream&quot;);
    const config = require(&quot;./webpack.config.js&quot;);
    return gulp.src(&quot;./js/**/*.ts&quot;)
        .pipe(webpack(config, require(&quot;webpack&quot;)))
        .on(&quot;error&quot;, function(err) {
            gutil.log(err);
            this.emit(&quot;end&quot;);
        })
        .pipe(gulp.dest(&quot;../www/js&quot;));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp"</span>);
<span class="hljs-keyword">const</span> gutil = <span class="hljs-built_in">require</span>(<span class="hljs-string">"gulp-util"</span>);

<span class="hljs-comment">// 转译JavaScript</span>
gulp.task(<span class="hljs-string">"webpack"</span>, () =&gt; {
    <span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack-stream"</span>);
    <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.config.js"</span>);
    <span class="hljs-keyword">return</span> gulp.src(<span class="hljs-string">"./js/**/*.ts"</span>)
        .pipe(webpack(config, <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>)))
        .on(<span class="hljs-string">"error"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
            gutil.log(err);
            <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">"end"</span>);
        })
        .pipe(gulp.dest(<span class="hljs-string">"../www/js"</span>));
});</code></pre>
<p>这里需要注意的是 webpack-stream 默认使用的是 webpack1，而我们的配置需要 webpack2，所以为它指定第二个参数，一个特定版本的 webpack 实例 (由 <code>require("webpack")</code> 导入的)。</p>
<h3 id="articleHeader7">需要的 Node 模块</h3>
<p>从上面的构建配置中不难总结出构建过程需要安装的 Node 模块，有这样一些</p>
<ul>
<li><p><a href="https://www.npmjs.com/package/gulp" rel="nofollow noreferrer" target="_blank">gulp</a></p></li>
<li><p><a href="https://www.npmjs.com/package/gulp-util" rel="nofollow noreferrer" target="_blank">gulp-util</a></p></li>
<li><p><a href="https://www.npmjs.com/package/webpack-stream" rel="nofollow noreferrer" target="_blank">webpack-stream</a></p></li>
<li><p><a href="https://www.npmjs.com/package/webpack" rel="nofollow noreferrer" target="_blank">webpack</a></p></li>
<li><p><a href="https://www.npmjs.com/package/ts-loader" rel="nofollow noreferrer" target="_blank">ts-loader</a></p></li>
<li><p><a href="https://www.npmjs.com/package/typescript" rel="nofollow noreferrer" target="_blank">typescript</a></p></li>
<li><p><a href="https://www.npmjs.com/package/babel-loader" rel="nofollow noreferrer" target="_blank">babel-loader</a></p></li>
<li><p><a href="https://www.npmjs.com/package/babel-core" rel="nofollow noreferrer" target="_blank">babel-core</a></p></li>
<li><p><a href="https://www.npmjs.com/package/babel-preset-es2015" rel="nofollow noreferrer" target="_blank">babel-preset-es2015</a></p></li>
<li><p><a href="https://www.npmjs.com/package/babel-preset-stage-3" rel="nofollow noreferrer" target="_blank">babel-preset-stage-3</a></p></li>
</ul>
<h2 id="articleHeader8">在 Node.js 环境直接运行 .ts</h2>
<p>在 Node.js 中可以通过 <a href="https://www.npmjs.com/package/ts-node" rel="nofollow noreferrer" target="_blank">ts-node</a> 包来直接运行 TypeScript 代码。需要做的只是在入口代码文件(当然是个 <code>.js</code> 代码)中添加一句</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('ts-node').register({ /* options */ })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'ts-node'</span>).register({ <span class="hljs-comment">/* options */</span> })</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('ts-node/register')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'ts-node/register'</span>)</code></pre>
<p>因为 Node.js 7.6 开始已经直接支持 async 函数语法，所以即使用到了这个语法，也不用担心 ts-node 在内存的转译结果不能运行。</p>
<p>入口文件仍然必须是 <code>.js</code> 文件，这是个小小的遗憾，不过对于使用 Node.js 写构建脚本的用户来说，有两个好消息：gulp 和 webpack 都直接支持 <code>.ts</code> 入口(或配置)文件。比如以 gulp 为例，可以定义 <code>gulpfile.ts</code> (注意扩展名是 <code>.ts</code>) 如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as gulp from &quot;gulp&quot;;

gulp.task(&quot;hello&quot;, () => {
    console.log(&quot;hello gulp&quot;);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> gulp <span class="hljs-keyword">from</span> <span class="hljs-string">"gulp"</span>;

gulp.task(<span class="hljs-string">"hello"</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hello gulp"</span>);
});</code></pre>
<p>不过 gulp 也是通过 ts-node 模块来实现使用 TypeScript 的，而 ts-node 的功能依赖于 typescript，所以别忘了安装这两个模块。</p>
<h2 id="articleHeader9">扩展阅读</h2>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009653948">从 JavaScript 到 TypeScript - 声明类型</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000010774159" target="_blank">从 JavaScript 到 TypeScript - 泛型</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000010979494">从 JavaScript 到 TypeScript - 接口</a></p></li>
</ul>
<hr>
<p>关注作者的公众号“边城客栈” →</p>
<p><span class="img-wrap"><img data-src="https://sfault-avatar.b0.upaiyun.com/291/548/2915488432-59576fecc6382_huge256" src="https://static.alili.techhttps://sfault-avatar.b0.upaiyun.com/291/548/2915488432-59576fecc6382_huge256" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 JavaScript 到 TypeScript - 模块化和构建

## 原文链接
[https://segmentfault.com/a/1190000008996172](https://segmentfault.com/a/1190000008996172)

