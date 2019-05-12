---
title: 'webpack实战' 
date: 2018-11-29 9:34:56
hidden: true
slug: dwajbk6ehhh
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">webpack实战</h1>
<blockquote>查看所有文档页面：<a href="https://whjin.github.io/full-stack-development/" rel="nofollow noreferrer" target="_blank">全栈开发</a>，获取更多信息。<p>快马加鞭，加班加点，终于把这个文档整理出来了，顺便深入地学习一番，巩固知识，就是太累人，影响睡眠时间和质量。极客就是想要把事情做到极致，开始了就必须到达终点。</p>
<p>原文链接：<a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/" rel="nofollow noreferrer" target="_blank">webpack实战</a>，原文广告模态框遮挡，阅读体验不好，所以整理成本文，方便查找。</p>
</blockquote>
<p>本章教你如何用 Webpack 去解决实际项目中常见的场景。</p>
<p>按照不同场景划分成以下几类：</p>
<ul>
<li>
<p>使用新语言来开发项目：</p>
<ul>
<li>使用 ES6 语言</li>
<li>使用 TypeScript 语言</li>
<li>使用 Flow 检查器</li>
<li>使用 SCSS 语言</li>
<li>使用 PostCSS</li>
</ul>
</li>
<li>
<p>使用新框架来开发项目：</p>
<ul>
<li>使用 React 框架</li>
<li>使用 Vue 框架</li>
<li>使用 Angular2 框架</li>
</ul>
</li>
<li>
<p>用 Webpack 构建单页应用：</p>
<ul>
<li>为单页应用生成 HTML</li>
<li>管理多个单页应用</li>
</ul>
</li>
<li>
<p>用 Webpack 构建不同运行环境的项目：</p>
<ul>
<li>构建同构应用</li>
<li>构建 Electron 应用</li>
<li>构建 Npm 模块</li>
<li>构建离线应用</li>
</ul>
</li>
<li>
<p>Webpack 结合其它工具搭配使用，各取所长：</p>
<ul>
<li>搭配 Npm Script</li>
<li>检查代码</li>
<li>通过 Node.js API 启动 Webpack</li>
<li>使用 Webpack Dev Middleware</li>
</ul>
</li>
<li>
<p>用 Webpack 加载特殊类型的资源：</p>
<ul>
<li>加载图片</li>
<li>加载SVG</li>
<li>加载 Source Map</li>
</ul>
</li>
</ul>
<h2 id="articleHeader1">使用 TypeScript 语言</h2>
<p>由于本文不推荐使用TypeScript，ES6就足够完成大部分任务。原文链接：<a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-2%E4%BD%BF%E7%94%A8TypeScript%E8%AF%AD%E8%A8%80.html" rel="nofollow noreferrer" target="_blank">使用 TypeScript 语言</a></p>
<h2 id="articleHeader2">使用 Angular2 框架</h2>
<p>Angular2不在我的技术栈范围，所以这一章不加入，有兴趣的查看原文：<a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-8%E4%BD%BF%E7%94%A8Angular2%E6%A1%86%E6%9E%B6.html" rel="nofollow noreferrer" target="_blank">使用 Angular2 框架</a></p>
<h1 id="articleHeader3">使用ES6语言</h1>
<p>通常我们需要把采用 ES6 编写的代码转换成目前已经支持良好的 ES5 代码，这包含2件事：</p>
<ol>
<li>把新的 ES6 语法用 ES5 实现，例如 ES6 的 <code>class</code> 语法用 ES5 的 <code>prototype</code> 实现。</li>
<li>给新的 API 注入 polyfill ，例如使用新的 <code>fetch</code> API 时注入对应的 polyfill 后才能让低端浏览器正常运行。</li>
</ol>
<h2 id="articleHeader4">Babel</h2>
<p>Babel 可以方便的完成以上2件事。</p>
<p>Babel 是一个 JavaScript 编译器，能将 ES6 代码转为 ES5 代码，让你使用最新的语言特性而不用担心兼容性问题，并且可以通过插件机制根据需求灵活的扩展。 </p>
<p>在 Babel 执行编译的过程中，会从项目根目录下的 <code>.babelrc</code> 文件读取配置。<code>.babelrc</code> 是一个 JSON 格式的文件，内容大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [
    [
      &quot;transform-runtime&quot;,
      {
        &quot;polyfill&quot;: false
      }
    ]
   ],
  &quot;presets&quot;: [
    [
      &quot;es2015&quot;,
      {
        &quot;modules&quot;: false
      }
    ],
    &quot;stage-2&quot;,
    &quot;react&quot;
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"plugins"</span>: [
    [
      <span class="hljs-string">"transform-runtime"</span>,
      {
        <span class="hljs-attr">"polyfill"</span>: <span class="hljs-literal">false</span>
      }
    ]
   ],
  <span class="hljs-attr">"presets"</span>: [
    [
      <span class="hljs-string">"es2015"</span>,
      {
        <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span>
      }
    ],
    <span class="hljs-string">"stage-2"</span>,
    <span class="hljs-string">"react"</span>
  ]
}
</code></pre>
<h2 id="articleHeader5">Plugins</h2>
<p><code>plugins</code> 属性告诉 Babel 要使用哪些插件，插件可以控制如何转换代码。</p>
<p>以上配置文件里的 <code>transform-runtime</code> 对应的插件全名叫做 <code>babel-plugin-transform-runtime</code>，即在前面加上了 <code>babel-plugin-</code>，要让 Babel 正常运行我们必须先安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D babel-plugin-transform-runtime
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D babel-plugin-<span class="hljs-attribute">transform</span>-runtime
</code></pre>
<p><code>babel-plugin-transform-runtime</code> 是 Babel 官方提供的一个插件，作用是减少冗余代码。 </p>
<p>Babel 在把 ES6 代码转换成 ES5 代码时通常需要一些 ES5 写的辅助函数来完成新语法的实现，例如在转换 <code>class extent</code> 语法时会在转换后的 ES5 代码里注入 <code>_extent</code> 辅助函数用于实现继承：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _extent(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_extent</span>(<span class="hljs-params">target</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
    <span class="hljs-keyword">var</span> source = <span class="hljs-built_in">arguments</span>[i];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source) {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  <span class="hljs-keyword">return</span> target;
}
</code></pre>
<p>这会导致每个使用了 <code>class extent</code> 语法的文件都被注入重复的 <code>_extent</code> 辅助函数代码，<code>babel-plugin-transform-runtime</code> 的作用在于不把辅助函数内容注入到文件里，而是注入一条导入语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _extent = require('babel-runtime/helpers/_extent');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _extent = <span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-runtime/helpers/_extent'</span>);
</code></pre>
<p>这样能减小 Babel 编译出来的代码的文件大小。</p>
<p>同时需要注意的是由于 <code>babel-plugin-transform-runtime</code> 注入了 <code>require('babel-runtime/helpers/_extent')</code> 语句到编译后的代码里，需要安装 <code>babel-runtime</code> 依赖到你的项目后，代码才能正常运行。 也就是说 <code>babel-plugin-transform-runtime</code> 和 <code>babel-runtime</code> 需要配套使用，使用了 <code>babel-plugin-transform-runtime</code> 后一定需要 <code>babel-runtime</code>。</p>
<h2 id="articleHeader6">Presets</h2>
<p><code>presets</code> 属性告诉 Babel 要转换的源码使用了哪些新的语法特性，一个 <code>Presets</code> 对一组新语法特性提供支持，多个 <code>Presets</code> 可以叠加。 </p>
<p><code>Presets</code> 其实是一组 Plugins 的集合，每一个 Plugin 完成一个新语法的转换工作。Presets 是按照 ECMAScript 草案来组织的，通常可以分为以下三大类：</p>
<ol>
<li>
<p>已经被写入 ECMAScript 标准里的特性，由于之前每年都有新特性被加入到标准里；</p>
<ul><li>env 包含当前所有 ECMAScript 标准里的最新特性。</li></ul>
</li>
<li>
<p>被社区提出来的但还未被写入 ECMAScript 标准里特性，这其中又分为以下四种：</p>
<ul>
<li>
<code>stage0</code> 只是一个美好激进的想法，有 Babel 插件实现了对这些特性的支持，但是不确定是否会被定为标准；</li>
<li>
<code>stage1</code> 值得被纳入标准的特性；</li>
<li>
<code>stage2</code> 该特性规范已经被起草，将会被纳入标准里；</li>
<li>
<code>stage3</code> 该特性规范已经定稿，各大浏览器厂商和 Node.js 社区开始着手实现；</li>
<li>
<code>stage4</code> 在接下来的一年将会加入到标准里去。</li>
</ul>
</li>
<li>为了支持一些特定应用场景下的语法，和 ECMAScript 标准没有关系，例如 <code>babel-preset-react</code> 是为了支持 React 开发中的 JSX 语法。</li>
</ol>
<p>在实际应用中，你需要根据项目源码所使用的语法去安装对应的 Plugins 或 Presets。</p>
<h2 id="articleHeader7">接入 Babel</h2>
<p>由于 Babel 所做的事情是转换代码，所以应该通过 Loader 去接入 Babel，Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ]
  },
  // 输出 source-map 方便直接调试 ES6 源码
  devtool: 'source-map'
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: [<span class="hljs-string">'babel-loader'</span>],
      },
    ]
  },
  <span class="hljs-comment">// 输出 source-map 方便直接调试 ES6 源码</span>
  devtool: <span class="hljs-string">'source-map'</span>
};
</code></pre>
<p>配置命中了项目目录下所有的 JavaScript 文件，通过 <code>babel-loader</code> 去调用 Babel 完成转换工作。 在重新执行构建前，需要先安装新引入的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Webpack 接入 Babel 必须依赖的模块
npm i -D babel-core babel-loader 
# 根据你的需求选择不同的 Plugins 或 Presets
npm i -D babel-preset-env
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-comment"># Webpack 接入 Babel 必须依赖的模块</span>
npm i -D <span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span>
<span class="hljs-comment"># 根据你的需求选择不同的 Plugins 或 Presets</span>
npm i -D <span class="hljs-keyword">babel-preset-env
</span></code></pre>
<h1 id="articleHeader8">使用SCSS语言</h1>
<p>SCSS 可以让你用更灵活的方式写 CSS。 它是一种 CSS 预处理器，语法和 CSS 相似，但加入了变量、逻辑等编程元素，代码类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$blue: #1875e7;　

div {
  color: $blue;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-variable">$blue</span>: <span class="hljs-number">#1875e7</span>;　

<span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">$blue</span>;
}
</code></pre>
<p>SCSS 又叫 SASS，区别在于 SASS 语法类似 Ruby，而 SCSS 语法类似 CSS，对于熟悉 CSS 的前端工程师来说会更喜欢 SCSS。</p>
<p>采用 SCSS 去写 CSS 的好处在于可以方便地管理代码，抽离公共的部分，通过逻辑写出更灵活的代码。 和 SCSS 类似的 CSS 预处理器还有 LESS 等。</p>
<p>使用 SCSS 可以提升编码效率，但是必须把 SCSS 源代码编译成可以直接在浏览器环境下运行的 CSS 代码。</p>
<p><code>node-sass</code> 核心模块是由 C++ 编写，再用 Node.js 封装了一层，以供给其它 Node.js 调用。 <code>node-sass</code> 还支持通过命令行调用，先安装它到全局：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g node-sass
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm i -g <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>
</code></pre>
<p>再执行编译命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
# 把 main.scss 源文件编译成 main.css
node-sass main.scss main.css
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>
<span class="hljs-comment"># 把 main.scss 源文件编译成 main.css</span>
<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> main.scss main.css
    </code></pre>
<p>你就能在源码同目录下看到编译后的 <code>main.css</code> 文件。</p>
<h2 id="articleHeader9">接入 Webpack</h2>
<p>Webpack 接入 <code>sass-loader</code> 相关配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        // 增加对 SCSS 文件的支持
        test: /\.scss/,
        // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        <span class="hljs-comment">// 增加对 SCSS 文件的支持</span>
        test: <span class="hljs-regexp">/\.scss/</span>,
        <span class="hljs-comment">// SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader</span>
        use: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'sass-loader'</span>],
      },
    ]
  },
};
</code></pre>
<p>以上配置通过正则 <code>/\.scss/</code> 匹配所有以 <code>.scss</code> 为后缀的 SCSS 文件，再分别使用3个 Loader 去处理。具体处理流程如下：</p>
<ol>
<li>通过 <code>sass-loader</code> 把 SCSS 源码转换为 CSS 代码，再把 CSS 代码交给 <code>css-loader</code> 去处理。</li>
<li>
<code>css-loader</code> 会找出 CSS 代码中的 <code>@import</code> 和 <code>url()</code> 这样的导入语句，告诉 Webpack 依赖这些资源。同时还支持 CSS Modules、压缩 CSS 等功能。处理完后再把结果交给 <code>style-loader</code> 去处理。</li>
<li>
<code>style-loader</code> 会把 CSS 代码转换成字符串后，注入到 JavaScript 代码中去，通过 JavaScript 去给 DOM 增加样式。如果你想把 CSS 代码提取到一个单独的文件而不是和 JavaScript 混在一起，可以使用1-5 使用Plugin 中介绍过的 ExtractTextPlugin。</li>
</ol>
<p>由于接入 <code>sass-loader</code>，项目需要安装这些新的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 Webpack Loader 依赖
npm i -D  sass-loader css-loader style-loader
# sass-loader 依赖 node-sass
npm i -D node-sass
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment"># 安装 Webpack Loader 依赖</span>
npm i -D  sass-loader css-loader style-loader
<span class="hljs-comment"># sass-loader 依赖 node-sass</span>
npm i -D <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>
    </code></pre>
<h1 id="articleHeader10">使用Flow检查器</h1>
<p>Flow 是一个 Facebook 开源的 JavaScript 静态类型检测器，它是 JavaScript 语言的超集。 </p>
<p>你所需要做的就是在需要的地方加上类型检查，例如在两个由不同人开发的模块对接的接口出加上静态类型检查，能在编译阶段就指出部分模块使用不当的问题。 同时 Flow 也能通过类型推断检查出 JavaScript 代码中潜在的 Bug。</p>
<p>Flow 使用效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @flow

// 静态类型检查
function square1(n: number): number {
  return n * n;
}
square1('2'); // Error: square1 需要传入 number 作为参数

// 类型推断检查
function square2(n) {
  return n * n; // Error: 传入的 string 类型不能做乘法运算
}
square2('2');


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// @flow</span>

<span class="hljs-comment">// 静态类型检查</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square1</span><span class="hljs-params">(n: number)</span>: number </span>{
  <span class="hljs-keyword">return</span> n * n;
}
square1(<span class="hljs-string">'2'</span>); <span class="hljs-comment">// Error: square1 需要传入 number 作为参数</span>

<span class="hljs-comment">// 类型推断检查</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square2</span><span class="hljs-params">(n)</span> </span>{
  <span class="hljs-keyword">return</span> n * n; <span class="hljs-comment">// Error: 传入的 string 类型不能做乘法运算</span>
}
square2(<span class="hljs-string">'2'</span>);


</code></pre>
<blockquote>需要注意的时代码中的第一行 <code>// @flow</code> 告诉 Flow 检查器这个文件需要被检查。</blockquote>
<h2 id="articleHeader11">使用 Flow</h2>
<p>Flow 检测器由高性能跨平台的 OCaml 语言编写，它的可执行文件可以通过：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D flow-bin
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D flow-bin
</code></pre>
<p>安装，安装完成后通过先配置 Npm Script：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
   &quot;flow&quot;: &quot;flow&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
   <span class="hljs-string">"flow"</span>: <span class="hljs-string">"flow"</span>
}
</code></pre>
<p>再通过 <code>npm run flow</code> 去调用 Flow 执行代码检查。 </p>
<p>除此之外你还可以通过：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g flow-bin
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -g flow-bin
</code></pre>
<p>把 Flow 安装到全局后，再直接通过 <code>flow</code> 命令去执行代码检查。</p>
<p>安装成功后，在项目根目录下执行 Flow 后，Flow 会遍历出所有需要检查的文件并对其进行检查，输出错误结果到控制台。</p>
<p>采用了 Flow 静态类型语法的 JavaScript 是无法直接在目前已有的 JavaScript 引擎中运行的，要让代码可以运行需要把这些静态类型语法去掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 采用 Flow 的源代码
function foo(one: any, two: number, three?): string {}

// 去掉静态类型语法后输出代码
function foo(one, two, three) {}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 采用 Flow 的源代码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(one: any, two: number, three?)</span>: string </span>{}

<span class="hljs-comment">// 去掉静态类型语法后输出代码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">(one, two, three)</span> </span>{}
</code></pre>
<p>有两种方式可以做到这点：</p>
<ol>
<li>
<code>flow-remove-types</code> 可单独使用，速度快。</li>
<li>
<code>babel-preset-flow</code> 与 Babel 集成。</li>
</ol>
<h2 id="articleHeader12">集成 Webpack</h2>
<p>由于使用了 Flow 项目一般都会使用 ES6 语法，所以把 Flow 集成到使用 Webpack 构建的项目里最方便的方法是借助 Babel。</p>
<ol>
<li>安装 <code>npm i -D babel-preset-flow</code> 依赖到项目。</li>
<li>
<p>修改 <code>.babelrc</code> 配置文件，加入 Flow Preset：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;presets&quot;: [
...[],
&quot;flow&quot;
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"presets"</span>: [
...[],
<span class="hljs-string">"flow"</span>
]</code></pre>
</li>
</ol>
<p>往源码里加入静态类型后重新构建项目，你会发现采用了 Flow 的源码还是能正常在浏览器中运行。</p>
<blockquote>要明确构建的目的只是为了去除源码中的 Flow 静态类型语法，而代码检查和构建无关。 许多编辑器已经整合 Flow，可以实时在代码中高亮指出 Flow 检查出的问题。</blockquote>
<h1 id="articleHeader13">使用PostCSS</h1>
<p>PostCSS 是一个 CSS 处理工具，和 SCSS 不同的地方在于它通过插件机制可以灵活的扩展其支持的特性，而不是像 SCSS 那样语法是固定的。 PostCSS 的用处非常多，包括给 CSS 自动加前缀、使用下一代 CSS 语法等，目前越来越多的人开始用它，它很可能会成为 CSS 预处理器的最终赢家。</p>
<blockquote>PostCSS 和 CSS 的关系就像 Babel 和 JavaScript 的关系，它们解除了语法上的禁锢，通过插件机制来扩展语言本身，用工程化手段给语言带来了更多的可能性。<p>PostCSS 和 SCSS 的关系就像 Babel 和 TypeScript 的关系，PostCSS 更加灵活、可扩张性强，而 SCSS 内置了大量功能而不能扩展。</p>
</blockquote>
<p>给 CSS 自动加前缀，增加各浏览器的兼容性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*输入*/
h1 {
  display: flex;
}

/*输出*/
h1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*输入*/</span>
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">display</span>: flex;
}

<span class="hljs-comment">/*输出*/</span>
<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">display</span>: -webkit-box;
  <span class="hljs-attribute">display</span>: -webkit-flex;
  <span class="hljs-attribute">display</span>: -ms-flexbox;
  <span class="hljs-attribute">display</span>: flex;
}
</code></pre>
<p>使用下一代 CSS 语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*输入*/
:root {
  --red: #d33;
}

h1 {
  color: var(--red);
}


/*输出*/
h1 { 
  color: #d33;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*输入*/</span>
<span class="hljs-selector-pseudo">:root</span> {
  <span class="hljs-attribute">--red</span>: <span class="hljs-number">#d33</span>;
}

<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-built_in">var</span>(--red);
}


<span class="hljs-comment">/*输出*/</span>
<span class="hljs-selector-tag">h1</span> { 
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#d33</span>;
}
</code></pre>
<p>PostCSS 全部采用 JavaScript 编写，运行在 Node.js 之上，即提供了给 JavaScript 代码调用的模块，也提供了可执行的文件。 </p>
<p>在 PostCSS 启动时，会从目录下的 <code>postcss.config.js</code> 文件中读取所需配置，所以需要新建该文件，文件内容大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: [
    // 需要使用的插件列表
    require('postcss-cssnext')
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  plugins: [
    <span class="hljs-comment">// 需要使用的插件列表</span>
    require(<span class="hljs-string">'postcss-cssnext'</span>)
  ]
}
</code></pre>
<p>其中的 <code>postcss-cssnext</code> 插件可以让你使用下一代 CSS 语法编写代码，再通过 PostCSS 转换成目前的浏览器可识别的 CSS，并且该插件还包含给 CSS 自动加前缀的功能。</p>
<blockquote>目前 Chrome 等现代浏览器已经能完全支持 <code>cssnext</code> 中的所有语法，也就是说按照 <code>cssnext</code> 语法写的 CSS 在不经过转换的情况下也能在浏览器中直接运行。</blockquote>
<h2 id="articleHeader14">接入 Webpack</h2>
<p>虽然使用 PostCSS 后文件后缀还是 <code>.css</code> 但这些文件必须先交给 <code>postcss-loader</code> 处理一遍后再交给 <code>css-loader</code>。</p>
<p>接入 PostCSS 相关的 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        // 使用 PostCSS 处理 CSS 文件
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ]
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        <span class="hljs-comment">// 使用 PostCSS 处理 CSS 文件</span>
        test: <span class="hljs-regexp">/\.css/</span>,
        use: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span>],
      },
    ]
  },
};
</code></pre>
<p>接入 PostCSS 给项目带来了新的依赖需要安装，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 Webpack Loader 依赖
npm i -D postcss-loader css-loader style-loader
# 根据你使用的特性安装对应的 PostCSS 插件依赖
npm i -D postcss-cssnext
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># 安装 Webpack Loader 依赖</span>
<span class="hljs-built_in">npm</span> i -D postcss-loader css-loader style-loader
<span class="hljs-comment"># 根据你使用的特性安装对应的 PostCSS 插件依赖</span>
<span class="hljs-built_in">npm</span> i -D postcss-cssnext
    </code></pre>
<h1 id="articleHeader15">使用React框架</h1>
<h2 id="articleHeader16">React 语法特征</h2>
<p>使用了 React 项目的代码特征有 JSX 和 Class 语法，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>,<span class="hljs-type">Webpack</span>&lt;/h1&gt;
  }
}   
</code></pre>
<blockquote>在使用了 React 的项目里 JSX 和 Class 语法并不是必须的，但使用新语法写出的代码看上去更优雅。</blockquote>
<p>其中 JSX 语法是无法在任何现有的 JavaScript 引擎中运行的，所以在构建过程中需要把源码转换成可以运行的代码，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原 JSX 语法代码
return <h1>Hello,Webpack</h1>

// 被转换成正常的 JavaScript 代码
return React.createElement('h1', null, 'Hello,Webpack')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 原 JSX 语法代码</span>
<span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello,Webpack<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>

<span class="hljs-comment">// 被转换成正常的 JavaScript 代码</span>
<span class="hljs-keyword">return</span> React.createElement(<span class="hljs-string">'h1'</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">'Hello,Webpack'</span>)
</code></pre>
<h2 id="articleHeader17">React 与 Babel</h2>
<p>要在使用 Babel 的项目中接入 React 框架是很简单的，只需要加入 React 所依赖的 Presets <code>babel-preset-react</code>。 </p>
<p>通过以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 React 基础依赖
npm i -D react react-dom
# 安装 babel 完成语法转换所需依赖
npm i -D babel-preset-react
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># 安装 React 基础依赖</span>
<span class="hljs-built_in">npm</span> i -D react react-dom
<span class="hljs-comment"># 安装 babel 完成语法转换所需依赖</span>
<span class="hljs-built_in">npm</span> i -D babel-preset-react
</code></pre>
<p>安装新的依赖后，再修改 <code>.babelrc</code> 配置文件加入 React Presets</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;presets&quot;: [
    &quot;react&quot;
],
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"react"</span>
],
</code></pre>
<p>就完成了一切准备工作。</p>
<p>再修改 <code>main.js</code> 文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello,Webpack<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  }
}

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span>/&gt;</span></span>, <span class="hljs-built_in">window</span>.document.getElementById(<span class="hljs-string">'app'</span>));
</code></pre>
<p>重新执行构建打开网页你将会发现由 React 渲染出来的 <code>Hello,Webpack</code>。</p>
<h2 id="articleHeader18">React 与 TypeScript</h2>
<p>TypeScript 相比于 Babel 的优点在于它原生支持 JSX 语法，你不需要重新安装新的依赖，只需修改一行配置。 但 TypeScript 的不同在于：</p>
<ul>
<li>使用了 JSX 语法的文件后缀必须是 <code>tsx</code>。</li>
<li>由于 React 不是采用 TypeScript 编写的，需要安装 <code>react</code> 和 <code>react-dom</code> 对应的 TypeScript 接口描述模块 <code>@types/react</code> 和 <code>@types/react-dom</code> 后才能通过编译。</li>
</ul>
<p>修改 TypeScript 编译器配置文件 <code>tsconfig.json</code> 增加对 JSX 语法的支持，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;jsx&quot;: &quot;react&quot; // 开启 jsx ，支持 React
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"jsx"</span>: <span class="hljs-string">"react"</span> // 开启 jsx ，支持 React
  }
}
</code></pre>
<p>由于 <code>main.js</code> 文件中存在 JSX 语法，再把 <code>main.js</code> 文件重命名为 <code>main.tsx</code>，同时修改文件内容为在上面 React 与 Babel 里所采用的 React 代码。 同时为了让 Webpack 对项目里的 <code>ts</code> 与 <code>tsx</code> 原文件都采用 <code>awesome-typescript-loader</code> 去转换， 需要注意的是 Webpack Loader 配置的 <code>test</code> 选项需要匹配到 <code>tsx</code> 类型的文件，并且 <code>extensions</code> 中也要加上 <code>.tsx</code>，配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  // TS 执行入口文件
  entry: './main',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    // 先尝试 ts，tsx 后缀的 TypeScript 源码文件 
    extensions: ['.ts', '.tsx', '.js',] 
  },
  module: {
    rules: [
      {
        // 同时匹配 ts，tsx 后缀的 TypeScript 源码文件 
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// TS 执行入口文件</span>
  entry: <span class="hljs-string">'./main'</span>,
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
  },
  resolve: {
    <span class="hljs-comment">// 先尝试 ts，tsx 后缀的 TypeScript 源码文件 </span>
    extensions: [<span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.tsx'</span>, <span class="hljs-string">'.js'</span>,] 
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        <span class="hljs-comment">// 同时匹配 ts，tsx 后缀的 TypeScript 源码文件 </span>
        test: <span class="hljs-regexp">/\.tsx?$/</span>,
        loader: <span class="hljs-string">'awesome-typescript-loader'</span>
      }
    ]
  },
  devtool: <span class="hljs-string">'source-map'</span>,<span class="hljs-comment">// 输出 Source Map 方便在浏览器里调试 TypeScript 代码</span>
};
</code></pre>
<p>通过<code>npm i react react-dom @types/react @types/react-dom</code>安装新的依赖后重启构建，重新打开网页你将会发现由 React 渲染出来的 <code>Hello,Webpack</code>。</p>
<h1 id="articleHeader19">使用Vue框架</h1>
<p>Vue是一个渐进式的 MVVM 框架，相比于 React、Angular 它更灵活轻量。 它不会强制性地内置一些功能和语法，你可以根据自己的需要一点点地添加功能。 虽然采用 Vue 的项目能用可直接运行在浏览器环境里的代码编写，但为了方便编码大多数项目都会采用 Vue 官方的单文件组件的写法去编写项目。 </p>
<p>Vue 的单文件组件通过一个类似 HTML 文件的 <code>.vue</code> 文件就能描述清楚一个组件所需的模版、样式、逻辑。</p>
<p><code>main.js</code> 入口文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});
</code></pre>
<p>入口文件创建一个 Vue 的根实例，在 ID 为 <code>app</code> 的 DOM 节点上渲染出上面定义的 App 组件。</p>
<h2 id="articleHeader20">接入 Webpack</h2>
<p>目前最成熟和流行的开发 Vue 项目的方式是采用 ES6 加 Babel 转换，这和基本的采用 ES6 开发的项目很相似，差别在于要解析 <code>.vue</code> 格式的单文件组件。 好在 Vue 官方提供了对应的 <code>vue-loader</code> 可以非常方便的完成单文件组件的转换。</p>
<p>修改 Webpack 相关配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.vue$/,
      use: ['vue-loader'],
    },
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">rules</span>: [
    {
      test: /\.vue$/,
      use: [<span class="hljs-string">'vue-loader'</span>],
    },
  ]
}
</code></pre>
<p>安装新引入的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Vue 框架运行需要的库
npm i -S vue
# 构建所需的依赖
npm i -D vue-loader css-loader vue-template-compiler
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># Vue 框架运行需要的库</span>
<span class="hljs-built_in">npm</span> i -S vue
<span class="hljs-comment"># 构建所需的依赖</span>
<span class="hljs-built_in">npm</span> i -D vue-loader css-loader vue-template-compiler
</code></pre>
<p>在这些依赖中，它们的作用分别是：</p>
<ul>
<li>
<code>vue-loader</code>：解析和转换 <code>.vue</code> 文件，提取出其中的逻辑代码 <code>script</code>、样式代码 <code>style</code>、以及 HTML 模版 <code>template</code>，再分别把它们交给对应的 Loader 去处理。</li>
<li>
<code>css-loader</code>：加载由 <code>vue-loader</code> 提取出的 CSS 代码。</li>
<li>
<code>vue-template-compiler</code>：把 <code>vue-loader</code> 提取出的 HTML 模版编译成对应的可执行的 JavaScript 代码，这和 React 中的 JSX 语法被编译成 JavaScript 代码类似。预先编译好 HTML 模版相对于在浏览器中再去编译 HTML 模版的好处在于性能更好。</li>
</ul>
<h2 id="articleHeader21">使用 TypeScript 编写 Vue 应用</h2>
<p>从 Vue 2.5.0+ 版本开始，提供了对 TypeScript 的良好支持，使用 TypeScript 编写 Vue 是一个很好的选择，因为 TypeScript 能检查出一些潜在的错误。</p>
<p>新增 <code>tsconfig.json</code> 配置文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    // 构建出 ES5 版本的 JavaScript，与 Vue 的浏览器支持保持一致
    &quot;target&quot;: &quot;es5&quot;,
    // 开启严格模式，这可以对 `this` 上的数据属性进行更严格的推断
    &quot;strict&quot;: true,
    // TypeScript 编译器输出的 JavaScript 采用 es2015 模块化，使 Tree Shaking 生效
    &quot;module&quot;: &quot;es2015&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>{
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-regexp">//</span> 构建出 ES5 版本的 JavaScript，与 Vue 的浏览器支持保持一致
    <span class="hljs-string">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-regexp">//</span> 开启严格模式，这可以对 <span class="hljs-string">`this`</span> 上的数据属性进行更严格的推断
    <span class="hljs-string">"strict"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-regexp">//</span> TypeScript 编译器输出的 JavaScript 采用 es2015 模块化，使 Tree Shaking 生效
    <span class="hljs-string">"module"</span>: <span class="hljs-string">"es2015"</span>,
    <span class="hljs-string">"moduleResolution"</span>: <span class="hljs-string">"node"</span>
  }
}
</code></pre>
<p>修改 <code>App.vue</code> 脚本部分内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--组件逻辑-->
<script lang=&quot;ts&quot;>
  import Vue from &quot;vue&quot;;

  // 通过 Vue.extend 启用 TypeScript 类型推断
  export default Vue.extend({
    data() {
      return {
        msg: 'Hello,Webpack',
      }
    },
  });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--组件逻辑--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;

  <span class="hljs-comment">// 通过 Vue.extend 启用 TypeScript 类型推断</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.extend({
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">msg</span>: <span class="hljs-string">'Hello,Webpack'</span>,
      }
    },
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>注意 <code>script</code> 标签中的 <code>lang="ts"</code> 是为了指明代码的语法是 TypeScript。</p>
<p>修改 main.ts 执行入口文件为如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});
</code></pre>
<p>由于 TypeScript 不认识 <code>.vue</code> 结尾的文件，为了让其支持 <code>import App from './App.vue'</code> 导入语句，还需要以下文件 <code>vue-shims.d.ts</code> 去定义 <code>.vue</code> 的类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 告诉 TypeScript 编译器 .vue 文件其实是一个 Vue  
declare module &quot;*.vue&quot; {
  import Vue from &quot;vue&quot;;
  export default Vue;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 告诉 TypeScript 编译器 .vue 文件其实是一个 Vue  </span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> "*.vue" {
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue;
}
</code></pre>
<p>Webpack 配置需要修改两个地方，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');

module.exports = {
  resolve: {
    // 增加对 TypeScript 的 .ts 和 .vue 文件的支持
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  module: {
    rules: [
      // 加载 .ts 文件
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          // 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
          appendTsSuffixTo: [/\.vue$/],
        }
      },
    ]
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
  resolve: {
    <span class="hljs-comment">// 增加对 TypeScript 的 .ts 和 .vue 文件的支持</span>
    extensions: [<span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      <span class="hljs-comment">// 加载 .ts 文件</span>
      {
        test: <span class="hljs-regexp">/\.ts$/</span>,
        loader: <span class="hljs-string">'ts-loader'</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        options: {
          <span class="hljs-comment">// 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件</span>
          appendTsSuffixTo: [<span class="hljs-regexp">/\.vue$/</span>],
        }
      },
    ]
  },
};
</code></pre>
<p>除此之外还需要安装新引入的依赖：<code>npm i -D ts-loader typescript</code></p>
<h1 id="articleHeader22">为单页应用生成HTML</h1>
<h2 id="articleHeader23">引入问题</h2>
<p>在使用 React 框架中，是用最简单的 <code>Hello,Webpack</code> 作为例子让大家理解， 这个例子里因为只输出了一个 <code>bundle.js </code>文件，所以手写了一个 <code>index.html</code> 文件去引入这个 <code>bundle.js</code>，才能让应用在浏览器中运行起来。</p>
<p>在实际项目中远比这复杂，一个页面常常有很多资源要加载。接下来举一个实战中的例子，要求如下：</p>
<ol>
<li>项目采用 ES6 语言加 React 框架。</li>
<li>给页面加入 Google Analytics，这部分代码需要内嵌进 HEAD 标签里去。</li>
<li>给页面加入 Disqus 用户评论，这部分代码需要异步加载以提升首屏加载速度。</li>
<li>压缩和分离 JavaScript 和 CSS 代码，提升加载速度。</li>
</ol>
<p>在开始前先来看看该应用最终发布到线上的<a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-9%E4%B8%BA%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E7%94%9F%E6%88%90HTML.html" rel="nofollow noreferrer" target="_blank">代码</a>。</p>
<p>可以看到部分代码被内嵌进了 HTML 的 HEAD 标签中，部分文件的文件名称被打上根据文件内容算出的 Hash 值，并且加载这些文件的 URL 地址也被正常的注入到了 HTML 中。</p>
<h2 id="articleHeader24">解决方案</h2>
<p>推荐一个用于方便地解决以上问题的 Webpack 插件 <a href="https://github.com/gwuhaolin/web-webpack-plugin" rel="nofollow noreferrer" target="_blank">web-webpack-plugin</a>。 该插件已经被社区上许多人使用和验证，解决了大家的痛点获得了很多好评，下面具体介绍如何用它来解决上面的问题。</p>
<p>首先，修改 <a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-9%E4%B8%BA%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E7%94%9F%E6%88%90HTML.html" rel="nofollow noreferrer" target="_blank">Webpack 配置</a>。</p>
<p>以上配置中，大多数都是按照前面已经讲过的内容增加的配置，例如：</p>
<ul>
<li>增加对 CSS 文件的支持，提取出 Chunk 中的 CSS 代码到单独的文件中，压缩 CSS 文件；</li>
<li>定义 <code>NODE_ENV</code> 环境变量为 <code>production</code>，以去除源码中只有开发时才需要的部分；</li>
<li>给输出的文件名称加上 Hash 值；</li>
<li>压缩输出的 JavaScript 代码。</li>
</ul>
<p>但最核心的部分在于 <code>plugins</code> 里的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new WebPlugin({
  template: './template.html', // HTML 模版文件所在的文件路径
  filename: 'index.html' // 输出的 HTML 的文件名称
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">new</span> WebPlugin({
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'./template.html'</span>, <span class="hljs-comment">// HTML 模版文件所在的文件路径</span>
  filename: <span class="hljs-string">'index.html'</span> <span class="hljs-comment">// 输出的 HTML 的文件名称</span>
})
</code></pre>
<p>其中 <code>template: './template.html'</code> 所指的模版文件 <code>template.html</code> 的内容是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <meta charset=&quot;UTF-8&quot;>
  <!--注入 Chunk app 中的 CSS-->
  <link rel=&quot;stylesheet&quot; href=&quot;app?_inline&quot;>
  <!--注入 google_analytics 中的 JavaScript 代码-->
  <script src=&quot;./google_analytics.js?_inline&quot;></script>
  <!--异步加载 Disqus 评论-->
  <script src=&quot;https://dive-into-webpack.disqus.com/embed.js&quot; async></script>
</head>
<body>
<div id=&quot;app&quot;></div>
<!--导入 Chunk app 中的 JS-->
<script src=&quot;app&quot;></script>
<!--Disqus 评论容器-->
<div id=&quot;disqus_thread&quot;></div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-comment">&lt;!--注入 Chunk app 中的 CSS--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"app?_inline"</span>&gt;</span>
  <span class="hljs-comment">&lt;!--注入 google_analytics 中的 JavaScript 代码--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./google_analytics.js?_inline"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-comment">&lt;!--异步加载 Disqus 评论--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://dive-into-webpack.disqus.com/embed.js"</span> <span class="hljs-attr">async</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--导入 Chunk app 中的 JS--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!--Disqus 评论容器--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"disqus_thread"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre>
<p>该文件描述了哪些资源需要被以何种方式加入到输出的 HTML 文件中。</p>
<p>以 <code>&lt;link rel="stylesheet" href="app?_inline"&gt;</code> 为例，按照正常引入 CSS 文件一样的语法来引入 Webpack 生产的代码。<code>href</code> 属性中的 <code>app?_inline</code> 可以分为两部分，前面的 <code>app</code> 表示 CSS 代码来自名叫 <code>app</code> 的 Chunk 中，后面的 <code>_inline</code> 表示这些代码需要被内嵌到这个标签所在的位置。</p>
<p>同样的 <code>&lt;script src="./google_analytics.js?_inline"&gt;&lt;/script&gt;</code> 表示 JavaScript 代码来自相对于当前模版文件 <code>template.html</code> 的本地文件 <code>./google_analytics.js</code>， 而且文件中的 JavaScript 代码也需要被内嵌到这个标签所在的位置。</p>
<p>也就是说资源链接 URL 字符串里问号前面的部分表示资源内容来自哪里，后面的 <code>querystring</code> 表示这些资源注入的方式。</p>
<p>除了 <code>_inline</code> 表示内嵌外，还支持以下属性：</p>
<ul>
<li>
<code>_dist</code> 只有在生产环境下才引入该资源;</li>
<li>
<code>_dev</code> 只有在开发环境下才引入该资源；</li>
<li>
<code>_ie</code> 只有IE浏览器才需要引入的资源，通过 <code>[if IE]&gt;resource&lt;![endif]</code> 注释实现。</li>
</ul>
<p>这些属性之间可以搭配使用，互不冲突。例如 <code>app?_inline&amp;_dist</code> 表示只在生产环境下才引入该资源，并且需要内嵌到 HTML 里去。</p>
<p><code>WebPlugin</code> 插件还支持一些其它更高级的用法，详情可以访问该<a href="https://github.com/gwuhaolin/web-webpack-plugin" rel="nofollow noreferrer" target="_blank">项目主页</a>阅读文档。</p>
<h1 id="articleHeader25">管理多个单页应用</h1>
<h2 id="articleHeader26">引入问题</h2>
<p>在开始前先来看看该应用最终发布到线上的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
<meta charset=&quot;UTF-8&quot;>
<!--从多个页面中抽离出的公共 CSS 代码-->
<link rel=&quot;stylesheet&quot; href=&quot;common_7cc98ad0.css&quot;>
<!--只有这个页面需要的 CSS 代码-->
<link rel=&quot;stylesheet&quot; href=&quot;login_e31e214b.css&quot;>
<!--注入 google_analytics 中的 JS 代码-->
<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');</script>
<!--异步加载 Disqus 评论-->
<script async=&quot;&quot; src=&quot;https://dive-into-webpack.disqus.com/embed.js&quot;></script>
</head>
<body>
<div id=&quot;app&quot;></div>
<!--从多个页面中抽离出的公共 JavaScript 代码-->
<script src=&quot;common_a1d9142f.js&quot;></script>
<!--只有这个页面需要的 JavaScript 代码-->
<script src=&quot;login_f926c4e6.js&quot;></script>
<!--Disqus 评论容器-->
<div id=&quot;disqus_thread&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-comment">&lt;!--从多个页面中抽离出的公共 CSS 代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"common_7cc98ad0.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!--只有这个页面需要的 CSS 代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"login_e31e214b.css"</span>&gt;</span>
<span class="hljs-comment">&lt;!--注入 google_analytics 中的 JS 代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i,s,o,g,r,a,m</span>)</span>{i[<span class="hljs-string">'GoogleAnalyticsObject'</span>]=r;i[r]=i[r]||<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    (i[r].q=i[r].q||[]).push(<span class="hljs-built_in">arguments</span>)},i[r].l=<span class="hljs-number">1</span>*<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();a=s.createElement(o),
    m=s.getElementsByTagName(o)[<span class="hljs-number">0</span>];a.async=<span class="hljs-number">1</span>;a.src=g;m.parentNode.insertBefore(a,m)
})(<span class="hljs-built_in">window</span>,<span class="hljs-built_in">document</span>,<span class="hljs-string">'script'</span>,<span class="hljs-string">'https://www.google-analytics.com/analytics.js'</span>,<span class="hljs-string">'ga'</span>);
ga(<span class="hljs-string">'create'</span>, <span class="hljs-string">'UA-XXXXX-Y'</span>, <span class="hljs-string">'auto'</span>);
ga(<span class="hljs-string">'send'</span>, <span class="hljs-string">'pageview'</span>);</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!--异步加载 Disqus 评论--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">async</span>=<span class="hljs-string">""</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://dive-into-webpack.disqus.com/embed.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--从多个页面中抽离出的公共 JavaScript 代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"common_a1d9142f.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!--只有这个页面需要的 JavaScript 代码--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"login_f926c4e6.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!--Disqus 评论容器--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"disqus_thread"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>构建出的目录结构为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dist
├── common_029086ff.js
├── common_7cc98ad0.css
├── index.html
├── index_04c08fbf.css
├── index_b3d3761c.js
├── login.html
├── login_0a3feca9.js
└── login_e31e214b.css
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>dist
├── common_029086ff<span class="hljs-selector-class">.js</span>
├── common_7cc98ad0<span class="hljs-selector-class">.css</span>
├── index<span class="hljs-selector-class">.html</span>
├── index_04c08fbf<span class="hljs-selector-class">.css</span>
├── index_b3d3761c<span class="hljs-selector-class">.js</span>
├── login<span class="hljs-selector-class">.html</span>
├── login_0a3feca9<span class="hljs-selector-class">.js</span>
└── login_e31e214b<span class="hljs-selector-class">.css</span>
</code></pre>
<p>如果按照上节的思路，可能需要为每个单页应用配置一段如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new WebPlugin({
  template: './template.html', // HTML 模版文件所在的文件路径
  filename: 'login.html' // 输出的 HTML 的文件名称
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">new</span> WebPlugin({
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'./template.html'</span>, <span class="hljs-comment">// HTML 模版文件所在的文件路径</span>
  filename: <span class="hljs-string">'login.html'</span> <span class="hljs-comment">// 输出的 HTML 的文件名称</span>
})
</code></pre>
<p>并且把页面对应的入口加入到 <code>enrty</code> 配置项中，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  index: './pages/index/index.js',// 页面 index.html 的入口文件
  login: './pages/login/index.js',// 页面 login.html 的入口文件
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">entry</span>: {
  <span class="hljs-attribute">index</span>: <span class="hljs-string">'./pages/index/index.js'</span>,<span class="hljs-comment">// 页面 index.html 的入口文件</span>
  <span class="hljs-attribute">login</span>: <span class="hljs-string">'./pages/login/index.js'</span>,<span class="hljs-comment">// 页面 login.html 的入口文件</span>
}
</code></pre>
<p>当有新页面加入时就需要修改 Webpack 配置文件，新插入一段以上代码，这会导致构建代码难以维护而且易错。</p>
<h2 id="articleHeader27">解决方案</h2>
<p>项目源码目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── pages
│   ├── index
│   │   ├── index.css // 该页面单独需要的 CSS 样式
│   │   └── index.js // 该页面的入口文件
│   └── login
│       ├── index.css
│       └── index.js
├── common.css // 所有页面都需要的公共 CSS 样式
├── google_analytics.js
├── template.html
└── webpack.config.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── pages
│   ├── index
│   │   ├── index<span class="hljs-selector-class">.css</span> <span class="hljs-comment">// 该页面单独需要的 CSS 样式</span>
│   │   └── index<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 该页面的入口文件</span>
│   └── login
│       ├── index<span class="hljs-selector-class">.css</span>
│       └── index<span class="hljs-selector-class">.js</span>
├── common<span class="hljs-selector-class">.css</span> <span class="hljs-comment">// 所有页面都需要的公共 CSS 样式</span>
├── google_analytics<span class="hljs-selector-class">.js</span>
├── template<span class="hljs-selector-class">.html</span>
└── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
</code></pre>
<p>从目录结构中可以看成出下几点要求：</p>
<ul>
<li>所有单页应用的代码都需要放到一个目录下，例如都放在 <code>pages</code> 目录下；</li>
<li>一个单页应用一个单独的文件夹，例如最后生成的 <code>index.html</code> 相关的代码都在 <code>index</code> 目录下，<code>login.html</code> 同理；</li>
<li>每个单页应用的目录下都有一个 <code>index.js</code> 文件作为入口执行文件。</li>
</ul>
<blockquote>虽然 <code>AutoWebPlugin</code> 强制性的规定了项目部分的目录结构，但从实战经验来看这是一种优雅的目录规范，合理的拆分了代码，又能让新人快速的看懂项目结构，也方便日后的维护。</blockquote>
<p>Webpack 配置文件修改如下：</p>
<p>&lt;p data-height="465" data-theme-id="0" data-slug-hash="gzJWwB" data-default-tab="js,result" data-user="whjin" data-embed-version="2" data-pen-title="webpack管理多个单页应用" class="codepen"&gt;See the Pen <a href="https://codepen.io/whjin/pen/gzJWwB/" rel="nofollow noreferrer" target="_blank">webpack管理多个单页应用</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/gzJWwB/" data-typeid="3">点击预览</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">点击预览</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src="<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p><code>AutoWebPlugin</code> 会找出 <code>pages</code> 目录下的2个文件夹 <code>index</code> 和 <code>login</code>，把这两个文件夹看成两个单页应用。 并且分别为每个单页应用生成一个 Chunk 配置和 WebPlugin 配置。 每个单页应用的 Chunk 名称就等于文件夹的名称，也就是说 <code>autoWebPlugin.entry()</code> 方法返回的内容其实是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;index&quot;:[&quot;./pages/index/index.js&quot;,&quot;./common.css&quot;],
  &quot;login&quot;:[&quot;./pages/login/index.js&quot;,&quot;./common.css&quot;]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"index"</span>:[<span class="hljs-string">"./pages/index/index.js"</span>,<span class="hljs-string">"./common.css"</span>],
  <span class="hljs-attr">"login"</span>:[<span class="hljs-string">"./pages/login/index.js"</span>,<span class="hljs-string">"./common.css"</span>]
}
</code></pre>
<p>但这些事情 <code>AutoWebPlugin</code> 都会自动为你完成，你不用操心，明白大致原理即可。   </p>
<p><code>template.html</code> 模版文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <!--在这注入该页面所依赖但没有手动导入的 CSS-->
  <!--STYLE-->
  <!--注入 google_analytics 中的 JS 代码-->
  <script src=&quot;./google_analytics.js?_inline&quot;></script>
  <!--异步加载 Disqus 评论-->
  <script src=&quot;https://dive-into-webpack.disqus.com/embed.js&quot; async></script>
</head>
<body>
<div id=&quot;app&quot;></div>
<!--在这注入该页面所依赖但没有手动导入的 JavaScript-->
<!--SCRIPT-->
<!--Disqus 评论容器-->
<div id=&quot;disqus_thread&quot;></div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-comment">&lt;!--在这注入该页面所依赖但没有手动导入的 CSS--&gt;</span>
  <span class="hljs-comment">&lt;!--STYLE--&gt;</span>
  <span class="hljs-comment">&lt;!--注入 google_analytics 中的 JS 代码--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./google_analytics.js?_inline"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-comment">&lt;!--异步加载 Disqus 评论--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://dive-into-webpack.disqus.com/embed.js"</span> <span class="hljs-attr">async</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--在这注入该页面所依赖但没有手动导入的 JavaScript--&gt;</span>
<span class="hljs-comment">&lt;!--SCRIPT--&gt;</span>
<span class="hljs-comment">&lt;!--Disqus 评论容器--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"disqus_thread"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>由于这个模版文件被当作项目中所有单页应用的模版，就不能再像上一节中直接写 Chunk 的名称去引入资源，因为需要被注入到当前页面的 Chunk 名称是不定的，每个单页应用都会有自己的名称。 <code>&lt;!--STYLE--&gt;</code> 和 <code>&lt;!--SCRIPT--&gt;</code> 的作用在于保证该页面所依赖的资源都会被注入到生成的 HTML 模版里去。</p>
<p><code>web-webpack-plugin</code> 能分析出每个页面依赖哪些资源，例如对于 <code>login.html</code> 来说，插件可以确定该页面依赖以下资源：</p>
<ul>
<li>所有页面都依赖的公共 CSS 代码 <code>common.css</code>；</li>
<li>所有页面都依赖的公共 JavaScrip 代码 <code>common.js</code>；</li>
<li>只有这个页面依赖的 CSS 代码 <code>login.css</code>；</li>
<li>只有这个页面依赖的 JavaScrip 代码 <code>login.css</code>。</li>
</ul>
<p>由于模版文件 <code>template.html</code> 里没有指出引入这些依赖资源的 HTML 语句，插件会自动将没有手动导入但页面依赖的资源按照不同类型注入到 <code>&lt;!--STYLE--&gt;</code> 和 <code>&lt;!--SCRIPT--&gt;</code> 所在的位置。</p>
<ul>
<li>CSS 类型的文件注入到 <code>&lt;!--STYLE--&gt;</code> 所在的位置，如果 <code>&lt;!--STYLE--&gt;</code> 不存在就注入到 HTML HEAD 标签的最后；</li>
<li>JavaScrip 类型的文件注入到 <code>&lt;!--SCRIPT--&gt;</code> 所在的位置，如果 <code>&lt;!--SCRIPT--&gt;</code> 不存在就注入到 HTML BODY 标签的最后。</li>
</ul>
<p>如果后续有新的页面需要开发，只需要在 <code>pages</code> 目录下新建一个目录，目录名称取为输出 HTML 文件的名称，目录下放这个页面相关的代码即可，无需改动构建代码。</p>
<p>由于 <code>AutoWebPlugin</code> 是间接的通过上一节提到的 <code>WebPlugin</code> 实现的，<code>WebPlugin</code> 支持的功能 <code>AutoWebPlugin</code> 都支持。</p>
<h1 id="articleHeader28">构建同构应用</h1>
<p>同构应用是指写一份代码但可同时在浏览器和服务器中运行的应用。</p>
<h2 id="articleHeader29">认识同构应用</h2>
<p>现在大多数单页应用的视图都是通过 JavaScript 代码在浏览器端渲染出来的，但在浏览器端渲染的坏处有：</p>
<ul>
<li>搜索引擎无法收录你的网页，因为展示出的数据都是在浏览器端异步渲染出来的，大部分爬虫无法获取到这些数据。</li>
<li>对于复杂的单页应用，渲染过程计算量大，对低端移动设备来说可能会有性能问题，用户能明显感知到首屏的渲染延迟。</li>
</ul>
<p>为了解决以上问题，有人提出能否将原本只运行在浏览器中的 JavaScript 渲染代码也在服务器端运行，在服务器端渲染出带内容的 HTML 后再返回。 这样就能让搜索引擎爬虫直接抓取到带数据的 HTML，同时也能降低首屏渲染时间。 由于 Node.js 的流行和成熟，以及虚拟 DOM 提出与实现，使这个假设成为可能。</p>
<p>实际上现在主流的前端框架都支持同构，包括 React、Vue2、Angular2，其中最先支持也是最成熟的同构方案是 React。 由于 React 使用者更多，它们之间又很相似，本节只介绍如何用 Webpack 构建 React 同构应用。</p>
<p>同构应用运行原理的核心在于虚拟 DOM，虚拟 DOM 的意思是不直接操作 DOM 而是通过 JavaScript Object 去描述原本的 DOM 结构。 在需要更新 DOM 时不直接操作 DOM 树，而是通过更新 JavaScript Object 后再映射成 DOM 操作。</p>
<p>虚拟 DOM 的优点在于：</p>
<ul>
<li>因为操作 DOM 树是高耗时的操作，尽量减少 DOM 树操作能优化网页性能。而 DOM Diff 算法能找出2个不同 Object 的最小差异，得出最小 DOM 操作；</li>
<li>虚拟 DOM 的在渲染的时候不仅仅可以通过操作 DOM 树来表示出结果，也能有其它的表示方式，例如把虚拟 DOM 渲染成字符串(服务器端渲染)，或者渲染成手机 App 原生的 UI 组件( React Native)。</li>
</ul>
<p>以 React 为例，核心模块 react 负责管理 React 组件的生命周期，而具体的渲染工作可以交给 <code>react-dom</code> 模块来负责。</p>
<p><code>react-dom</code> 在渲染虚拟 DOM 树时有2中方式可选：</p>
<ul>
<li>通过 <code>render()</code> 函数去操作浏览器 DOM 树来展示出结果。</li>
<li>通过 <code>renderToString()</code> 计算出表示虚拟 DOM 的 HTML 形式的字符串。</li>
</ul>
<p>构建同构应用的最终目的是从一份项目源码中构建出2份 JavaScript 代码，一份用于在浏览器端运行，一份用于在 Node.js 环境中运行渲染出 HTML。 其中用于在 Node.js 环境中运行的 JavaScript 代码需要注意以下几点：</p>
<ul>
<li>不能包含浏览器环境提供的 API，例如使用 <code>document</code> 进行 DOM 操作，因为 Node.js 不支持这些 API；</li>
<li>不能包含 CSS 代码，因为服务端渲染的目的是渲染出 HTML 内容，渲染出 CSS 代码会增加额外的计算量，影响服务端渲染性能；</li>
<li>不能像用于浏览器环境的输出代码那样把 <code>node_modules</code> 里的第三方模块和 Node.js 原生模块(例如 <code>fs</code> 模块)打包进去，而是需要通过 CommonJS 规范去引入这些模块。</li>
<li>需要通过 CommonJS 规范导出一个渲染函数，以用于在 HTTP 服务器中去执行这个渲染函数，渲染出 HTML 内容返回。</li>
</ul>
<h2 id="articleHeader30">解决方案</h2>
<p>用于构建浏览器环境代码的 <code>webpack.config.js</code> 配置文件保留不变，新建一个专门用于构建服务端渲染代码的配置文件 <code>webpack_server.config.js</code>，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // JS 执行入口文件
  entry: './main_server.js',
  // 为了不把 Node.js 内置的模块打包进输出文件中，例如 fs net 模块等
  target: 'node',
  // 为了不把 node_modules 目录下的第三方模块打包进输出文件中
  externals: [nodeExternals()],
  output: {
    // 为了以 CommonJS2 规范导出渲染函数，以给采用 Node.js 编写的 HTTP 服务调用
    libraryTarget: 'commonjs2',
    // 把最终可在 Node.js 中运行的代码输出到一个 bundle_server.js 文件
    filename: 'bundle_server.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
        test: /\.css/,
        use: ['ignore-loader'],
      },
    ]
  },
  devtool: 'source-map' // 输出 source-map 方便直接调试 ES6 源码
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> nodeExternals = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-node-externals'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// JS 执行入口文件</span>
  entry: <span class="hljs-string">'./main_server.js'</span>,
  <span class="hljs-comment">// 为了不把 Node.js 内置的模块打包进输出文件中，例如 fs net 模块等</span>
  target: <span class="hljs-string">'node'</span>,
  <span class="hljs-comment">// 为了不把 node_modules 目录下的第三方模块打包进输出文件中</span>
  externals: [nodeExternals()],
  output: {
    <span class="hljs-comment">// 为了以 CommonJS2 规范导出渲染函数，以给采用 Node.js 编写的 HTTP 服务调用</span>
    libraryTarget: <span class="hljs-string">'commonjs2'</span>,
    <span class="hljs-comment">// 把最终可在 Node.js 中运行的代码输出到一个 bundle_server.js 文件</span>
    filename: <span class="hljs-string">'bundle_server.js'</span>,
    <span class="hljs-comment">// 输出文件都放到 dist 目录下</span>
    path: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: [<span class="hljs-string">'babel-loader'</span>],
        exclude: path.resolve(__dirname, <span class="hljs-string">'node_modules'</span>),
      },
      {
        <span class="hljs-comment">// CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件</span>
        test: <span class="hljs-regexp">/\.css/</span>,
        use: [<span class="hljs-string">'ignore-loader'</span>],
      },
    ]
  },
  devtool: <span class="hljs-string">'source-map'</span> <span class="hljs-comment">// 输出 source-map 方便直接调试 ES6 源码</span>
};</code></pre>
<p>以上代码有几个关键的地方，分别是：</p>
<ul>
<li>
<code>target: 'node'</code> 由于输出代码的运行环境是 Node.js，源码中依赖的 Node.js 原生模块没必要打包进去；</li>
<li>
<code>externals: [nodeExternals()]</code> <code>webpack-node-externals</code> 的目的是为了防止 <code>node_modules</code> 目录下的第三方模块被打包进去，因为 Node.js 默认会去 <code>node_modules</code> 目录下寻找和使用第三方模块；</li>
<li>
<code>{test: /\.css/, use: ['ignore-loader']}</code> 忽略掉依赖的 CSS 文件，CSS 会影响服务端渲染性能，又是做服务端渲不重要的部分；</li>
<li>
<code>libraryTarget</code>: <code>'commonjs2'</code> 以 CommonJS2 规范导出渲染函数，以供给采用 Node.js 编写的 HTTP 服务器代码调用。</li>
</ul>
<p>为了最大限度的复用代码，需要调整下目录结构：</p>
<p>把页面的根组件放到一个单独的文件 <code>AppComponent.js</code>，该文件只能包含根组件的代码，不能包含渲染入口的代码，而且需要导出根组件以供给渲染入口调用，<code>AppComponent.js</code> 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import './main.css';

export class AppComponent extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> './main.css';

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>,<span class="hljs-type">Webpack</span>&lt;/h1&gt;
  }
}
</code></pre>
<p>分别为不同环境的渲染入口写两份不同的文件，分别是用于浏览器端渲染 DOM 的 <code>main_browser.js</code> 文件，和用于服务端渲染 HTML 字符串的 <code>main_server.js</code> 文件。 </p>
<p><code>main_browser.js</code> 文件内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { render } from 'react-dom';
import { AppComponent } from './AppComponent';

// 把根组件渲染到 DOM 树上
render(<AppComponent/>, window.document.getElementById('app'));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AppComponent'</span>;

<span class="hljs-comment">// 把根组件渲染到 DOM 树上</span>
render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppComponent</span>/&gt;</span></span>, <span class="hljs-built_in">window</span>.document.getElementById(<span class="hljs-string">'app'</span>));
</code></pre>
<p><code>main_server.js</code> 文件内容如下：</p>
<p>为了能把渲染的完整 HTML 文件通过 HTTP 服务返回给请求端，还需要通过用 Node.js 编写一个 HTTP 服务器。 由于本节不专注于将 HTTP 服务器的实现，就采用了 ExpressJS 来实现，<code>http_server.js</code> 文件内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express');
const { render } = require('./dist/bundle_server');
const app = express();

// 调用构建出的 bundle_server.js 中暴露出的渲染函数，再拼接下 HTML 模版，形成完整的 HTML 文件
app.get('/', function (req, res) {
  res.send(`
<html>
<head>
  <meta charset=&quot;UTF-8&quot;>
</head>
<body>
<div id=&quot;app&quot;>${render()}</div>
<!--导入 Webpack 输出的用于浏览器端渲染的 JS 文件-->
<script src=&quot;./dist/bundle_browser.js&quot;></script>
</body>
</html>
  `);
});

// 其它请求路径返回对应的本地文件
app.use(express.static('.'));

app.listen(3000, function () {
  console.log('app listening on port 3000!')
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>const express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
const { render } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dist/bundle_server'</span>);
const app = express();

<span class="hljs-regexp">//</span> 调用构建出的 bundle_server.js 中暴露出的渲染函数，再拼接下 HTML 模版，形成完整的 HTML 文件
app.get(<span class="hljs-string">'/'</span>, function (req, res) {
  res.send(`<span class="javascript">
&lt;html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>${render()}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--导入 Webpack 输出的用于浏览器端渲染的 JS 文件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/bundle_browser.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span>
  </span>`);
});

<span class="hljs-regexp">//</span> 其它请求路径返回对应的本地文件
app.use(express.static(<span class="hljs-string">'.'</span>));

app.listen(<span class="hljs-number">3000</span>, function () {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'app listening on port 3000!'</span>)
});
</code></pre>
<p>再安装新引入的第三方依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 Webpack 构建依赖
npm i -D css-loader style-loader ignore-loader webpack-node-externals
# 安装 HTTP 服务器依赖
npm i -S express
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-comment"># 安装 Webpack 构建依赖</span>
npm i -D css-loader style-loader ignore-loader webpack-<span class="hljs-keyword">node</span><span class="hljs-title">-externals</span>
<span class="hljs-comment"># 安装 HTTP 服务器依赖</span>
npm i -S express
</code></pre>
<p>以上所有准备工作已经完成，接下来执行构建，编译出目标文件：</p>
<ul>
<li>执行命令 <code>webpack --config webpack_server.config.js</code> 构建出用于服务端渲染的 <code>./dist/bundle_server.js</code> 文件。</li>
<li>执行命令 <code>webpack</code> 构建出用于浏览器环境运行的 <code>./dist/bundle_browser.js</code> 文件，默认的配置文件为 <code>webpack.config.js</code>。</li>
</ul>
<p>构建执行完成后，执行 <code>node ./http_server.js</code> 启动 HTTP 服务器后，再用浏览器去访问 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000 就能看到 Hello,Webpack 了。 但是为了验证服务端渲染的结果，你需要打开浏览器的开发工具中的网络抓包一栏，再重新刷新浏览器后，就能抓到请求 HTML 的包了，抓包效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012485472?w=2012&amp;h=546" src="https://static.alili.tech/img/remote/1460000012485472?w=2012&amp;h=546" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到服务器返回的是渲染出内容后的 HTML 而不是 HTML 模版，这说明同构应用的改造完成。</p>
<blockquote>本实例提供<a href="http://webpack.wuhaolin.cn/3-11%E6%9E%84%E5%BB%BA%E5%90%8C%E6%9E%84%E5%BA%94%E7%94%A8.zip" rel="nofollow noreferrer" target="_blank">项目完整代码</a>
</blockquote>
<h1 id="articleHeader31">构建Electron应用</h1>
<p>Electron 是 Node.js 和 Chromium 浏览器的结合体，用 Chromium 浏览器显示出的 Web 页面作为应用的 GUI，通过 Node.js 去和操作系统交互。 当你在 Electron 应用中的一个窗口操作时，实际上是在操作一个网页。当你的操作需要通过操作系统去完成时，网页会通过 Node.js 去和操作系统交互。</p>
<p>采用这种方式开发桌面端应用的优点有：</p>
<ul>
<li>降低开发门槛，只需掌握网页开发技术和 Node.js 即可，大量的 Web 开发技术和现成库可以复用于 Electron；</li>
<li>由于 Chromium 浏览器和 Node.js 都是跨平台的，Electron 能做到写一份代码在不同的操作系统运行。</li>
</ul>
<p>在运行 Electron 应用时，会从启动一个主进程开始。主进程的启动是通过 Node.js 去执行一个入口 JavaScript 文件实现的，这个入口文件 <code>main.js</code> 内容如下：</p>
<p>&lt;p data-height="565" data-theme-id="0" data-slug-hash="vjweQv" data-default-tab="js" data-user="whjin" data-embed-version="2" data-pen-title="Electron-main.js" class="codepen"&gt;See the Pen <a href="https://codepen.io/whjin/pen/vjweQv/" rel="nofollow noreferrer" target="_blank">Electron-main.js</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin/pen/vjweQv/" data-typeid="3">点击预览</button> by whjin (<a href="https://codepen.io/whjin" rel="nofollow noreferrer" target="_blank">@whjin</a><button class="btn btn-xs btn-default ml10 preview" data-url="whjin" data-typeid="3">点击预览</button>) on <a href="https://codepen.io" rel="nofollow noreferrer" target="_blank">CodePen</a>.&lt;/p&gt;<br>&lt;script async src="<a href="https://static.codepen.io/assets/embed/ei.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://static.codepen.io/ass...</a>;&gt;&lt;/script&gt;</p>
<p>主进程启动后会一直驻留在后台运行，你眼睛所看得的和操作的窗口并不是主进程，而是由主进程新启动的窗口子进程。</p>
<p>应用从启动到退出有一系列生命周期事件，通过 <code>electron.app.on()</code> 函数去监听生命周期事件，在特定的时刻做出反应。 例如在 <code>app.on('ready')</code> 事件中通过 <code>BrowserWindow</code> 去展示应用的主窗口。</p>
<p>启动的窗口其实是一个网页，启动时会去加载在 <code>loadURL</code> 中传入的网页地址。 每个窗口都是一个单独的网页进程，窗口之间的通信需要借助主进程传递消息。</p>
<p>总体来说开发 Electron 应用和开发 Web 应用很相似，区别在于 Electron 的运行环境同时内置了浏览器和 Node.js 的 API，在开发网页时除了可以使用浏览器提供的 API 外，还可以使用 Node.js 提供的 API。</p>
<h2 id="articleHeader32">接入 Webpack</h2>
<p>接下来做一个简单的 Electron 应用，要求为应用启动后显示一个主窗口，在主窗口里有一个按钮，点击这个按钮后新显示一个窗口，且使用 React 开发网页。</p>
<p>由于 Electron 应用中的每一个窗口对应一个网页，所以需要开发2个网页，分别是主窗口的 <code>index.html</code> 和新打开的窗口 <code>login.html</code>。 </p>
<p>需要改动的地方如下：</p>
<ul>
<li>在项目根目录下新建主进程的入口文件 <code>main.js</code>，内容和上面提到的一致；</li>
<li>主窗口网页的代码如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import { render } from 'react-dom';
import { remote } from 'electron';
import path from 'path';
import './index.css';

class App extends Component {

  // 在按钮被点击时
  handleBtnClick() {
    // 新窗口对应的页面的 URI 地址
    const modalPath = path.join('file://', remote.app.getAppPath(), 'dist/login.html');
    // 新窗口的大小
    let win = new remote.BrowserWindow({ width: 400, height: 320 })
    win.on('close', function () {
      // 窗口被关闭时清空资源
      win = null
    })
    // 加载网页
    win.loadURL(modalPath)
    // 显示窗口
    win.show()
  }
  
  render() {
    return (
      <div>
        <h1>Page Index</h1>
        <button onClick={this.handleBtnClick}>Open Page Login</button>
      </div>
    )
  }
}

render(<App/>, window.document.getElementById('app'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> { remote } <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.css'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  <span class="hljs-comment">// 在按钮被点击时</span>
  handleBtnClick() {
    <span class="hljs-comment">// 新窗口对应的页面的 URI 地址</span>
    <span class="hljs-keyword">const</span> modalPath = path.join(<span class="hljs-string">'file://'</span>, remote.app.getAppPath(), <span class="hljs-string">'dist/login.html'</span>);
    <span class="hljs-comment">// 新窗口的大小</span>
    <span class="hljs-keyword">let</span> win = <span class="hljs-keyword">new</span> remote.BrowserWindow({ <span class="hljs-attr">width</span>: <span class="hljs-number">400</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">320</span> })
    win.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 窗口被关闭时清空资源</span>
      win = <span class="hljs-literal">null</span>
    })
    <span class="hljs-comment">// 加载网页</span>
    win.loadURL(modalPath)
    <span class="hljs-comment">// 显示窗口</span>
    win.show()
  }
  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Page Index<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleBtnClick}</span>&gt;</span>Open Page Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span></span>, <span class="hljs-built_in">window</span>.document.getElementById(<span class="hljs-string">'app'</span>));</code></pre>
<p>其中最关键的部分在于在按钮点击事件里通过 <code>electron</code> 库里提供的 API 去新打开一个窗口，并加载网页文件所在的地址。</p>
<p>页面部分的代码已经修改完成，接下来修改构建方面的代码。 这里构建需要做到以下几点：</p>
<ul>
<li>构建出2个可在浏览器里运行的网页，分别对应2个窗口的界面；</li>
<li>由于在网页的 JavaScript 代码里可能会有调用 Node.js 原生模块或者 electron 模块，也就是输出的代码依赖这些模块。但由于这些模块都是内置支持的，构建出的代码不能把这些模块打包进去。</li>
</ul>
<p>要完成以上要求非常简单，因为 Webpack 内置了对 Electron 的支持。 只需要给 Webpack 配置文件加上一行代码即可，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target: 'electron-renderer',
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">target:</span> <span class="hljs-string">'electron-renderer'</span>,
</code></pre>
<p>以上修改都完成后重新执行 Webpack 构建，对应的网页需要的代码都输出到了项目根目录下的 <code>dist</code> 目录里。</p>
<p>为了以 Electron 应用的形式运行，还需要安装新依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
# 安装 Electron 执行环境到项目中
npm i -D electron
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-comment"># 安装 Electron 执行环境到项目中</span>
<span class="hljs-built_in">npm</span> i -D electron
</code></pre>
<h1 id="articleHeader33">构建Npm模块</h1>
<p>发布到 Npm 仓库的模块有以下几个特点：</p>
<ul>
<li>每个模块根目录下都必须有一个描述该模块的 <code>package.json</code> 文件。该文件描述了模块的入口文件是哪个，该模块又依赖哪些模块等。</li>
<li>模块中的文件以 JavaScript 文件为主，但不限于 JavaScript 文件。例如一个 UI 组件模块可能同时需要 JavaScript、CSS、图片文件等。</li>
<li>模块中的代码大多采用模块化规范，因为你的这个模块可能依赖其它模块，而且别的模块又可能依赖你的这个模块。因为目前支持比较广泛的是 CommonJS 模块化规范，上传到 Npm 仓库的代码最好遵守该规范。</li>
</ul>
<h2 id="articleHeader34">抛出问题</h2>
<p>Webpack 不仅可用于构建运行的应用，也可用于构建上传到 Npm 的模块。 接下来用教大家如何用 Webpack 构建一个可上传的 Npm 仓库的 React 组件，具体要求如下：</p>
<ol>
<li>源代码采用 ES6 写，但发布到 Npm 仓库的需要是 ES5 的，并且遵守 CommonJS 模块化规范。如果发布到 Npm 上去的 ES5 代码是经过转换的，请同时提供 Source Map 以方便调试。</li>
<li>该 UI 组件依赖的其它资源文件例如 CSS 文件也需要包含在发布的模块里。</li>
<li>尽量减少冗余代码，减少发布出去的组件的代码文件大小。</li>
<li>发布出去的组件的代码中不能含有其依赖的模块的代码，而是让用户可选择性的去安装。例如不能内嵌 React 库的代码，这样做的目的是在其它组件也依赖 React 库时，防止 React 库的代码被重复打包。</li>
</ol>
<p>在开始前先看下最终发布到 Npm 仓库的模块的目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_modules/hello-webpack
├── lib
│   ├── index.css (组件所有依赖的 CSS 都在这个文件中)
│   ├── index.css.map
│   ├── index.js (符合 CommonJS 模块化规范的 ES5 代码)
│   └── index.js.map
├── src (ES6 源码)
│   ├── index.css
│   └── index.js
└── package.json (模块描述文件)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>node_modules/hello-webpack
├── lib
│   ├── index<span class="hljs-selector-class">.css</span> (组件所有依赖的 CSS 都在这个文件中)
│   ├── index<span class="hljs-selector-class">.css</span><span class="hljs-selector-class">.map</span>
│   ├── index<span class="hljs-selector-class">.js</span> (符合 CommonJS 模块化规范的 ES5 代码)
│   └── index<span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
├── src (ES6 源码)
│   ├── index<span class="hljs-selector-class">.css</span>
│   └── index<span class="hljs-selector-class">.js</span>
└── package<span class="hljs-selector-class">.json</span> (模块描述文件)
</code></pre>
<p><code>src/index.js</code> 文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import './index.css';

// 导出该组件供给其它模块使用
export default class HelloWebpack extends Component {
  render() {
    return <h1 className=&quot;hello-component&quot;>Hello,Webpack</h1>
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t';
<span class="hljs-keyword">import</span> './index.css';

<span class="hljs-comment">// 导出该组件供给其它模块使用</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWebpack</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1 className=<span class="hljs-string">"hello-component"</span>&gt;<span class="hljs-type">Hello</span>,<span class="hljs-type">Webpack</span>&lt;/h1&gt;
  }
}
</code></pre>
<p>要使用该模块时只需要这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过 ES6 语法导入
import HelloWebpack from 'hello-webpack';
import 'hello-webpack/lib/index.css';

// 或者通过 ES5 语法导入
var HelloWebpack = require('hello-webpack');
require('hello-webpack/lib/index.css');

// 使用 react-dom 渲染
render(<HelloWebpack/>);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 通过 ES6 语法导入</span>
<span class="hljs-keyword">import</span> HelloWebpack <span class="hljs-keyword">from</span> <span class="hljs-string">'hello-webpack'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'hello-webpack/lib/index.css'</span>;

<span class="hljs-comment">// 或者通过 ES5 语法导入</span>
<span class="hljs-keyword">var</span> HelloWebpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hello-webpack'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'hello-webpack/lib/index.css'</span>);

<span class="hljs-comment">// 使用 react-dom 渲染</span>
render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">HelloWebpack</span>/&gt;</span></span>);
</code></pre>
<h2 id="articleHeader35">使用 Webpack 构建 Npm 模块</h2>
<p><strong>对于要求1，可以这样做到：</strong></p>
<ul>
<li>使用 <code>babel-loader</code> 把 ES6 代码转换成 ES5 的代码。</li>
<li>通过开启 <code>devtool: 'source-map'</code> 输出 Source Map 以发布调试。</li>
<li>设置 <code>output.libraryTarget='commonjs2'</code> 使输出的代码符合CommonJS2 模块化规范，以供给其它模块导入使用。</li>
</ul>
<p>相关的 Webpack 配置代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  output: {
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },
  // 输出 Source Map
  devtool: 'source-map',
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  output: {
    <span class="hljs-comment">// 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。</span>
    libraryTarget: <span class="hljs-string">'commonjs2'</span>,
  },
  <span class="hljs-comment">// 输出 Source Map</span>
  devtool: <span class="hljs-string">'source-map'</span>,
};
</code></pre>
<p><strong>对于要求2，需要通过 <code>css-loader</code> 和 <code>extract-text-webpack-plugin</code> 实现，相关的 Webpack 配置代码如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        <span class="hljs-comment">// 增加对 CSS 文件的支持</span>
        test: <span class="hljs-regexp">/\.css/</span>,
        <span class="hljs-comment">// 提取出 Chunk 中的 CSS 代码到单独的文件中</span>
        use: ExtractTextPlugin.extract({
          use: [<span class="hljs-string">'css-loader'</span>]
        }),
      },
    ]
  },
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-comment">// 输出的 CSS 文件名称</span>
      filename: <span class="hljs-string">'index.css'</span>,
    }),
  ],
};
</code></pre>
<p>此步引入了3个新依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 Webpack 构建所需要的新依赖
npm i -D style-loader css-loader extract-text-webpack-plugin
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-comment"># 安装 Webpack 构建所需要的新依赖</span>
npm i -D style-loader css-loader extract-<span class="hljs-built_in">text</span>-webpack-plugin
</code></pre>
<p><strong>对于要求3，需要注意的是 Babel 在把 ES6 代码转换成 ES5 代码时会注入一些辅助函数。</strong></p>
<p>例如下面这段 ES6 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloWebpack extends Component{
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWebpack</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
}
</code></pre>
<p>在被转换成能正常运行的 ES5 代码时需要以下2个辅助函数：</p>
<ul>
<li>
<code>babel-runtime/helpers/createClass</code> 用于实现 <code>class</code> 语法</li>
<li>
<code>babel-runtime/helpers/inherits</code> 用于实现 <code>extends</code> 语法</li>
</ul>
<p>默认的情况下 Babel 会在每个输出文件中内嵌这些依赖的辅助函数的代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会重复的出现很多次，造成代码冗余。 </p>
<p>为了不让这些辅助函数的代重复出现，可以在依赖它们的时候通过 <code>require('babel-runtime/helpers/createClass')</code> 的方式去导入，这样就能做到只让它们出现一次。 <code>babel-plugin-transform-runtime</code> 插件就是用来做这个事情的。</p>
<p>修改 <code>.babelrc</code> 文件，为其加入 <code>transform-runtime</code> 插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [
    [
      &quot;transform-runtime&quot;,
      {
        // transform-runtime 默认会自动的为你使用的 ES6 API 注入 polyfill
        // 假如你在源码中使用了 Promise，输出的代码将会自动注入 require('babel-runtime/core-js/Promise') 语句
        // polyfill 的注入应该交给模块使用者，因为使用者可能在其它地方已经注入了其它的 Promise polyfill 库
        // 所以关闭该功能
        &quot;polyfill&quot;: false
      }
    ]
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"plugins"</span>: [
    [
      <span class="hljs-string">"transform-runtime"</span>,
      {
        // transform-runtime 默认会自动的为你使用的 ES6 API 注入 polyfill
        // 假如你在源码中使用了 Promise，输出的代码将会自动注入 require(<span class="hljs-name">'babel-runtime/core-js/Promise'</span>) 语句
        // polyfill 的注入应该交给模块使用者，因为使用者可能在其它地方已经注入了其它的 Promise polyfill 库
        // 所以关闭该功能
        <span class="hljs-string">"polyfill"</span>: <span class="hljs-literal">false</span>
      }
    ]
  ]
}
</code></pre>
<p>由于加入 <code>babel-plugin-transform-runtime</code> 后生成的代码中会大量出现类似 <code>require('babel-runtime/helpers/createClass')</code> 这样的语句，所以输出的代码将依赖 <code>babel-runtime</code> 模块。</p>
<p>此步引入了3个新依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 Webpack 构建所需要的新依赖
npm i -D babel-plugin-transform-runtime
# 安装输出代码运行时所需的新依赖
npm i -S babel-runtime
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-comment"># 安装 Webpack 构建所需要的新依赖</span>
<span class="hljs-built_in">npm</span> i -D babel-plugin-transform-runtime
<span class="hljs-comment"># 安装输出代码运行时所需的新依赖</span>
<span class="hljs-built_in">npm</span> i -S babel-runtime
</code></pre>
<p><strong>对于要求4，需要通过在 <a href="https://whjin.github.io/full-stack-development/posts/webpack%E9%85%8D%E7%BD%AE.html" rel="nofollow noreferrer" target="_blank">其它配置项</a> 中介绍过的 <code>Externals</code> 来实现。    </strong></p>
<p>Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。</p>
<p>相关的 Webpack 配置代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = {
  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块
  // 这些模块通过注册在运行环境中的全局变量访问，不用被重复打包进输出的代码里
  externals: /^(react|babel-runtime)/,
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">// 通过正则命中所有以 react 或者 babel-runtime 开头的模块</span>
  <span class="hljs-comment">// 这些模块通过注册在运行环境中的全局变量访问，不用被重复打包进输出的代码里</span>
  externals: /^(react|babel-runtime)/,
};
</code></pre>
<p>开启以上配置后，输出的代码中会存在导入 <code>react</code> 或者 <code>babel-runtime</code> 模块的代码，但是它们的 <code>react</code> 或者 <code>babel-runtime</code> 的内容不会被包含进去，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    (function (module, exports) {
        module.exports = require(&quot;babel-runtime/helpers/inherits&quot;);
    }),
    (function (module, exports) {
        module.exports = require(&quot;react&quot;);
    })
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>[
    (<span class="hljs-name">function</span> (<span class="hljs-name">module</span>, exports) {
        module.exports = require(<span class="hljs-string">"babel-runtime/helpers/inherits"</span>)<span class="hljs-comment">;</span>
    }),
    (<span class="hljs-name">function</span> (<span class="hljs-name">module</span>, exports) {
        module.exports = require(<span class="hljs-string">"react"</span>)<span class="hljs-comment">;</span>
    })
]
</code></pre>
<p>这样就做到了在保持代码正确性的情况下，输出文件不存放 react 或者 babel-runtime 模块的代码。</p>
<p>实际上当你在开发 Npm 模块时，不只需要对 react 和 babel-runtime 模块做这样的处理，而是需要对所有正在开发的模块所依赖的模块进行这样的处理。 因为正在开发的模块所依赖的模块也可能被其它模块所依赖。 当一个项目中一个模块被依赖多次时，Webpack 只会将其打包一次。</p>
<p>完成以上4步后最终的 Webpack 完整配置代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 模块的入口文件
  entry: './src/index.js',
  output: {
    // 输出文件的名称
    filename: 'index.js',
    // 输出文件的存放目录
    path: path.resolve(__dirname, 'lib'),
    // 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。
    libraryTarget: 'commonjs2',
  },
  // 通过正则命中所有以 react 或者 babel-runtime 开头的模块，
  // 这些模块使用外部的，不能被打包进输出的代码里，防止它们出现多次。
  externals: /^(react|babel-runtime)/,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，
        // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换。
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
  // 输出 Source Map
  devtool: 'source-map',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 模块的入口文件</span>
  entry: <span class="hljs-string">'./src/index.js'</span>,
  output: {
    <span class="hljs-comment">// 输出文件的名称</span>
    filename: <span class="hljs-string">'index.js'</span>,
    <span class="hljs-comment">// 输出文件的存放目录</span>
    path: path.resolve(__dirname, <span class="hljs-string">'lib'</span>),
    <span class="hljs-comment">// 输出的代码符合 CommonJS 模块化规范，以供给其它模块导入使用。</span>
    libraryTarget: <span class="hljs-string">'commonjs2'</span>,
  },
  <span class="hljs-comment">// 通过正则命中所有以 react 或者 babel-runtime 开头的模块，</span>
  <span class="hljs-comment">// 这些模块使用外部的，不能被打包进输出的代码里，防止它们出现多次。</span>
  externals: <span class="hljs-regexp">/^(react|babel-runtime)/</span>,
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        use: [<span class="hljs-string">'babel-loader'</span>],
        <span class="hljs-comment">// 排除 node_modules 目录下的文件，</span>
        <span class="hljs-comment">// node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换。</span>
        exclude: path.resolve(__dirname, <span class="hljs-string">'node_modules'</span>),
      },
      {
        <span class="hljs-comment">// 增加对 CSS 文件的支持</span>
        test: <span class="hljs-regexp">/\.css/</span>,
        <span class="hljs-comment">// 提取出 Chunk 中的 CSS 代码到单独的文件中</span>
        use: ExtractTextPlugin.extract({
          use: [<span class="hljs-string">'css-loader'</span>]
        }),
      },
    ]
  },
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-comment">// 输出的 CSS 文件名称</span>
      filename: <span class="hljs-string">'index.css'</span>,
    }),
  ],
  <span class="hljs-comment">// 输出 Source Map</span>
  devtool: <span class="hljs-string">'source-map'</span>,
};</code></pre>
<p>重新执行构建后，你将会在项目目录下看到一个新目录 <code>lib</code>，里面放着要发布到 Npm 仓库的最终代码。</p>
<h2 id="articleHeader36">发布到 Npm</h2>
<p>在把构建出的代码发布到 Npm 仓库前，还需要确保你的模块描述文件 <code>package.json</code> 是正确配置的。</p>
<p>由于构建出的代码的入口文件是 <code>./lib/index.js</code>，需要修改 <code>package.json</code> 中的 <code>main</code> 字段如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;main&quot;: &quot;lib/index.js&quot;,
  &quot;jsnext:main&quot;: &quot;src/index.js&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"lib/index.js"</span>,
  <span class="hljs-attr">"jsnext:main"</span>: <span class="hljs-string">"src/index.js"</span>
}
</code></pre>
<p>其中 <code>jsnext:main</code> 字段用于指出采用 ES6 编写的模块入口文件所在的位置。</p>
<p>修改完毕后在项目目录下执行 <code>npm publish</code> 就能把构建出的代码发布到 Npm 仓库中(确保已经 <code>npm login</code> 过)。</p>
<blockquote>如果你想让发布到 Npm 上去的代码保持和源码的目录结构一致，那么用 Webpack 将不在适合。 因为源码是一个个分割的模块化文件，而 Webpack 会把这些模块组合在一起。 虽然 Webpack 输出的文件也可以是采用 CommonJS 模块化语法的，但在有些场景下把所有模块打包成一个文件发布到 Npm 是不适合的。 例如像 Lodash 这样的工具函数库在项目中可能只用到了其中几个工具函数，如果所有工具函数打包在一个文件中，那么所有工具函数都会被打包进去，而保持模块文件的独立能做到只打包进使用到的。 还有就是像 UI 组件库这样由大量独立组件组成的库也和 Lodash 类似。<br>所以 Webpack 适合于构建完整不可分割的 Npm 模块。</blockquote>
<h1 id="articleHeader37">构建离线应用</h1>
<p>离线应用的核心是离线缓存技术，历史上曾先后出现2种离线离线缓存技术，它们分别是：</p>
<ol>
<li>AppCache 又叫 Application Cache，目前已经从 Web 标准中删除，请尽量不要使用它。</li>
<li>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers" rel="nofollow noreferrer" target="_blank">Service Workers</a> 是目前最新的离线缓存技术，是 Web Worker 的一部分。 它通过拦截网络请求实现离线缓存，比 AppCache 更加灵活。它也是构建 <a href="https://developer.mozilla.org/zh-CN/Apps/Progressive" rel="nofollow noreferrer" target="_blank">PWA</a> 应用的关键技术之一。</li>
</ol>
<h2 id="articleHeader38">认识 Service Workers</h2>
<p>Service Workers 是一个在浏览器后台运行的脚本，它生命周期完全独立于网页。它无法直接访问 DOM，但可以通过 postMessage 接口发送消息来和 UI 进程通信。 拦截网络请求是 Service Workers 的一个重要功能，通过它能完成离线缓存、编辑响应、过滤响应等功能。</p>
<h2 id="articleHeader39">Service Workers 兼容性</h2>
<p>目前 Chrome、Firefox、Opera 都已经全面支持 Service Workers，但对于移动端浏览器就不太乐观了，只有高版本的 Android 支持。 由于 Service Workers 无法通过注入 <code>polyfill</code> 去实现兼容，所以在你打算使用它前请先调查清楚你的网页的运行场景。</p>
<p>判断浏览器是否支持 Service Workers 的最简单的方法是通过以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果 navigator 对象上存在 serviceWorker 对象，就表示支持
if (navigator.serviceWorker) {
  // 通过 navigator.serviceWorker 使用
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// 如果 navigator 对象上存在 serviceWorker 对象，就表示支持</span>
<span class="hljs-keyword">if</span> <span class="hljs-comment">(navigator.serviceWorker)</span> {
  <span class="hljs-comment">// 通过 navigator.serviceWorker 使用</span>
}
</code></pre>
<h2 id="articleHeader40">注册 Service Workers</h2>
<p>要给网页接入 Service Workers，需要在网页加载后注册一个描述 Service Workers 逻辑的脚本。 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (navigator.serviceWorker) {
  window.addEventListener('DOMContentLoaded',function() {
    // 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径
      navigator.serviceWorker.register('/sw.js');
  });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (navigator.serviceWorker) {
  <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径</span>
      navigator.serviceWorker.register(<span class="hljs-string">'/sw.js'</span>);
  });
}
</code></pre>
<p>一旦这个脚本文件被加载，Service Workers 的安装就开始了。这个脚本被安装到浏览器中后，就算用户关闭了当前网页，它仍会存在。 也就是说第一次打开该网页时 Service Workers 的逻辑不会生效，因为脚本还没有被加载和注册，但是以后再次打开该网页时脚本里的逻辑将会生效。</p>
<p>在 Chrome 中可以通过打开网址 <code>chrome://inspect/#service-workers</code> 来查看当前浏览器中所有注册了的 Service Workers。</p>
<h2 id="articleHeader41">使用 Service Workers 实现离线缓存</h2>
<p>Service Workers 在注册成功后会在其生命周期中派发出一些事件，通过监听对应的事件在特点的时间节点上做一些事情。</p>
<p>在 Service Workers 脚本中，引入了新的关键字 <code>self</code> 代表当前的 Service Workers 实例。</p>
<p>在 Service Workers 安装成功后会派发出 <code>install</code> 事件，需要在这个事件中执行缓存资源的逻辑，实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当前缓存版本的唯一标识符，用当前时间代替
var cacheKey = new Date().toISOString();

// 需要被缓存的文件的 URL 列表
var cacheFileList = [
  '/index.html',
  '/app.js',
  '/app.css'
];

// 监听 install 事件
self.addEventListener('install', function (event) {
  // 等待所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function (cache) {
      // 要缓存的文件 URL 列表
      return cache.addAll(cacheFileList);
    })
  );
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 当前缓存版本的唯一标识符，用当前时间代替</span>
<span class="hljs-keyword">var</span> cacheKey = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toISOString();

<span class="hljs-comment">// 需要被缓存的文件的 URL 列表</span>
<span class="hljs-keyword">var</span> cacheFileList = [
  <span class="hljs-string">'/index.html'</span>,
  <span class="hljs-string">'/app.js'</span>,
  <span class="hljs-string">'/app.css'</span>
];

<span class="hljs-comment">// 监听 install 事件</span>
self.addEventListener(<span class="hljs-string">'install'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-comment">// 等待所有资源缓存完成时，才可以进行下一步</span>
  event.waitUntil(
    caches.open(cacheKey).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cache</span>) </span>{
      <span class="hljs-comment">// 要缓存的文件 URL 列表</span>
      <span class="hljs-keyword">return</span> cache.addAll(cacheFileList);
    })
  );
});
</code></pre>
<p>接下来需要监听网络请求事件去拦截请求，复用缓存，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener('fetch', function(event) {
  event.respondWith(
    // 去缓存中查询对应的请求
    caches.match(event.request).then(function(response) {
        // 如果命中本地缓存，就直接返回本地的资源
        if (response) {
          return response;
        }
        // 否则就去用 fetch 下载资源
        return fetch(event.request);
      }
    )
  );
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">self</span>.addEventListener(<span class="hljs-string">'fetch'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  event.respondWith(
    <span class="hljs-comment">// 去缓存中查询对应的请求</span>
    caches.match(event.request).then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(response)</span> </span>{
        <span class="hljs-comment">// 如果命中本地缓存，就直接返回本地的资源</span>
        <span class="hljs-keyword">if</span> (response) {
          <span class="hljs-keyword">return</span> response;
        }
        <span class="hljs-comment">// 否则就去用 fetch 下载资源</span>
        <span class="hljs-keyword">return</span> fetch(event.request);
      }
    )
  );
});
</code></pre>
<p>以上就实现了离线缓存。</p>
<h2 id="articleHeader42">更新缓存</h2>
<p>线上的代码有时需要更新和重新发布，如果这个文件被离线缓存了，那就需要 Service Workers 脚本中有对应的逻辑去更新缓存。 这可以通过更新 Service Workers 脚本文件做到。</p>
<p>浏览器针对 Service Workers 有如下机制：</p>
<ol>
<li>每次打开接入了 Service Workers 的网页时，浏览器都会去重新下载 Service Workers 脚本文件（所以要注意该脚本文件不能太大），如果发现和当前已经注册过的文件存在字节差异，就将其视为“新服务工作线程”。</li>
<li>新 Service Workers 线程将会启动，且将会触发其 <code>install</code> 事件。</li>
<li>当网站上当前打开的页面关闭时，旧 Service Workers 线程将会被终止，新 Service Workers 线程将会取得控制权。</li>
<li>新 Service Workers 线程取得控制权后，将会触发其 activate 事件。</li>
</ol>
<p>新 Service Workers 线程中的 activate 事件就是最佳的清理旧缓存的时间点，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当前缓存白名单，在新脚本的 install 事件里将使用白名单里的 key 
var cacheWhitelist = [cacheKey];

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 不在白名单的缓存全部清理掉
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 删除缓存
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 当前缓存白名单，在新脚本的 install 事件里将使用白名单里的 key </span>
<span class="hljs-keyword">var</span> cacheWhitelist = [cacheKey];

self.addEventListener(<span class="hljs-string">'activate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  event.waitUntil(
    caches.keys().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cacheNames</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(
        cacheNames.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cacheName</span>) </span>{
          <span class="hljs-comment">// 不在白名单的缓存全部清理掉</span>
          <span class="hljs-keyword">if</span> (cacheWhitelist.indexOf(cacheName) === <span class="hljs-number">-1</span>) {
            <span class="hljs-comment">// 删除缓存</span>
            <span class="hljs-keyword">return</span> caches.delete(cacheName);
          }
        })
      );
    })
  );
});
</code></pre>
<p>最终完整的代码 Service Workers 脚本代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当前缓存版本的唯一标识符，用当前时间代替
var cacheKey = new Date().toISOString();

// 当前缓存白名单，在新脚本的 install 事件里将使用白名单里的 key
var cacheWhitelist = [cacheKey];

// 需要被缓存的文件的 URL 列表
var cacheFileList = [
  '/index.html',
  'app.js',
  'app.css'
];

// 监听 install 事件
self.addEventListener('install', function (event) {
  // 等待所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function (cache) {
      // 要缓存的文件 URL 列表
      return cache.addAll(cacheFileList);
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // 去缓存中查询对应的请求
    caches.match(event.request).then(function (response) {
        // 如果命中本地缓存，就直接返回本地的资源
        if (response) {
          return response;
        }
        // 否则就去用 fetch 下载资源
        return fetch(event.request);
      }
    )
  );
});

// 新 Service Workers 线程取得控制权后，将会触发其 activate 事件
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 不在白名单的缓存全部清理掉
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 删除缓存
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 当前缓存版本的唯一标识符，用当前时间代替</span>
<span class="hljs-keyword">var</span> cacheKey = <span class="hljs-keyword">new</span> Date().toISOString();

<span class="hljs-comment">// 当前缓存白名单，在新脚本的 install 事件里将使用白名单里的 key</span>
<span class="hljs-keyword">var</span> cacheWhitelist = [cacheKey];

<span class="hljs-comment">// 需要被缓存的文件的 URL 列表</span>
<span class="hljs-keyword">var</span> cacheFileList = [
  <span class="hljs-string">'/index.html'</span>,
  <span class="hljs-string">'app.js'</span>,
  <span class="hljs-string">'app.css'</span>
];

<span class="hljs-comment">// 监听 install 事件</span>
<span class="hljs-keyword">self</span>.addEventListener(<span class="hljs-string">'install'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span> </span>{
  <span class="hljs-comment">// 等待所有资源缓存完成时，才可以进行下一步</span>
  event.waitUntil(
    caches.open(cacheKey).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(cache)</span> </span>{
      <span class="hljs-comment">// 要缓存的文件 URL 列表</span>
      <span class="hljs-keyword">return</span> cache.addAll(cacheFileList);
    })
  );
});

<span class="hljs-comment">// 拦截网络请求</span>
<span class="hljs-keyword">self</span>.addEventListener(<span class="hljs-string">'fetch'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span> </span>{
  event.respondWith(
    <span class="hljs-comment">// 去缓存中查询对应的请求</span>
    caches.match(event.request).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> </span>{
        <span class="hljs-comment">// 如果命中本地缓存，就直接返回本地的资源</span>
        <span class="hljs-keyword">if</span> (response) {
          <span class="hljs-keyword">return</span> response;
        }
        <span class="hljs-comment">// 否则就去用 fetch 下载资源</span>
        <span class="hljs-keyword">return</span> fetch(event.request);
      }
    )
  );
});

<span class="hljs-comment">// 新 Service Workers 线程取得控制权后，将会触发其 activate 事件</span>
<span class="hljs-keyword">self</span>.addEventListener(<span class="hljs-string">'activate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span> </span>{
  event.waitUntil(
    caches.keys().then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(cacheNames)</span> </span>{
      <span class="hljs-keyword">return</span> Promise.all(
        cacheNames.map(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(cacheName)</span> </span>{
          <span class="hljs-comment">// 不在白名单的缓存全部清理掉</span>
          <span class="hljs-keyword">if</span> (cacheWhitelist.indexOf(cacheName) === <span class="hljs-number">-1</span>) {
            <span class="hljs-comment">// 删除缓存</span>
            <span class="hljs-keyword">return</span> caches.delete(cacheName);
          }
        })
      );
    })
  );
});</code></pre>
<h2 id="articleHeader43">接入 Webpack</h2>
<p>用 Webpack 构建接入 Service Workers 的离线应用要解决的关键问题在于如何生成上面提到的 <code>sw.js</code> 文件， 并且<code>sw.js</code>文件中的 <code>cacheFileList</code> 变量，代表需要被缓存文件的 URL 列表，需要根据输出文件列表所对应的 URL 来决定，而不是像上面那样写成静态值。</p>
<p>假如构建输出的文件目录结构为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── app_4c3e186f.js
├── app_7cc98ad0.css
└── index.html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── app_4c3e186f<span class="hljs-selector-class">.js</span>
├── app_7cc98ad0<span class="hljs-selector-class">.css</span>
└── index<span class="hljs-selector-class">.html</span>
</code></pre>
<p>那么 <code>sw.js</code> 文件中 <code>cacheFileList</code> 的值应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cacheFileList = [
  '/index.html',
  'app_4c3e186f.js',
  'app_7cc98ad0.css'
];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var cacheFileList</span> = [
  <span class="hljs-string">'/index.html'</span>,
  <span class="hljs-string">'app_4c3e186f.js'</span>,
  <span class="hljs-string">'app_7cc98ad0.css'</span>
];
</code></pre>
<p>Webpack 没有原生功能能完成以上要求，幸好庞大的社区中已经有人为我们做好了一个插件 <a href="https://github.com/oliviertassinari/serviceworker-webpack-plugin" rel="nofollow noreferrer" target="_blank">serviceworker-webpack-plugin</a> 可以方便的解决以上问题。 使用该插件后的 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  entry: {
    app: './main.js'// Chunk app 的 JS 执行入口文件
  },
  output: {
    filename: '[name].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css/,// 增加对 CSS 文件的支持
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader'] // 压缩 CSS 代码
        }),
      },
    ]
  },
  plugins: [
    // 一个 WebPlugin 对应一个 HTML 文件
    new WebPlugin({
      template: './template.html', // HTML 模版文件所在的文件路径
      filename: 'index.html' // 输出的 HTML 的文件名称
    }),
    new ExtractTextPlugin({
      filename: `[name].css`,// 给输出的 CSS 文件名称加上 Hash 值
    }),
    new ServiceWorkerWebpackPlugin({
      // 自定义的 sw.js 文件所在路径
      // ServiceWorkerWebpackPlugin 会把文件列表注入到生成的 sw.js 中
      entry: path.join(__dirname, 'sw.js'),
    }),
  ],
  devServer: {
    // Service Workers 依赖 HTTPS，使用 DevServer 提供的 HTTPS 功能。
    https: true,
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> { WebPlugin } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'web-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> ServiceWorkerWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'serviceworker-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  entry: {
    app: <span class="hljs-string">'./main.js'</span><span class="hljs-comment">// Chunk app 的 JS 执行入口文件</span>
  },
  output: {
    filename: <span class="hljs-string">'[name].js'</span>,
    publicPath: <span class="hljs-string">''</span>,
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.css/</span>,<span class="hljs-comment">// 增加对 CSS 文件的支持</span>
        <span class="hljs-comment">// 提取出 Chunk 中的 CSS 代码到单独的文件中</span>
        use: ExtractTextPlugin.extract({
          use: [<span class="hljs-string">'css-loader'</span>] <span class="hljs-comment">// 压缩 CSS 代码</span>
        }),
      },
    ]
  },
  plugins: [
    <span class="hljs-comment">// 一个 WebPlugin 对应一个 HTML 文件</span>
    <span class="hljs-keyword">new</span> WebPlugin({
      template: <span class="hljs-string">'./template.html'</span>, <span class="hljs-comment">// HTML 模版文件所在的文件路径</span>
      filename: <span class="hljs-string">'index.html'</span> <span class="hljs-comment">// 输出的 HTML 的文件名称</span>
    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      filename: <span class="hljs-string">`[name].css`</span>,<span class="hljs-comment">// 给输出的 CSS 文件名称加上 Hash 值</span>
    }),
    <span class="hljs-keyword">new</span> ServiceWorkerWebpackPlugin({
      <span class="hljs-comment">// 自定义的 sw.js 文件所在路径</span>
      <span class="hljs-comment">// ServiceWorkerWebpackPlugin 会把文件列表注入到生成的 sw.js 中</span>
      entry: path.join(__dirname, <span class="hljs-string">'sw.js'</span>),
    }),
  ],
  devServer: {
    <span class="hljs-comment">// Service Workers 依赖 HTTPS，使用 DevServer 提供的 HTTPS 功能。</span>
    https: <span class="hljs-literal">true</span>,
  }
};</code></pre>
<p>以上配置有2点需要注意：</p>
<ul>
<li>由于 Service Workers 必须在 HTTPS 环境下才能拦截网络请求实现离线缓存，使用在 DevServer https 中提到的方式去实现 HTTPS 服务。</li>
<li>
<code>serviceworker-webpack-plugin</code> 插件为了保证灵活性，允许使用者自定义 <code>sw.js</code>，构建输出的 <code>sw.js</code> 文件中会在头部注入一个变量 <code>serviceWorkerOption.assets</code> 到全局，里面存放着所有需要被缓存的文件的 URL 列表。</li>
</ul>
<p>需要修改上面的 <code>sw.js</code> 文件中写成了静态值的 <code>cacheFileList</code> 为如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 需要被缓存的文件的 URL 列表
var cacheFileList = global.serviceWorkerOption.assets;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 需要被缓存的文件的 URL 列表</span>
<span class="hljs-keyword">var</span> cacheFileList = <span class="hljs-keyword">global</span>.serviceWorkerOption.assets;
</code></pre>
<p>以上已经完成所有文件的修改，在重新构建前，先安装新引入的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D serviceworker-webpack-plugin webpack-dev-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D serviceworker-webpack-plugin webpack-dev-server
</code></pre>
<p>安装成功后，在项目根目录下执行 <code>webpack-dev-server</code> 命令后，DevServer 将以 HTTPS 模式启动。</p>
<h1 id="articleHeader44">搭配Npm Script</h1>
<p>Npm Script 是一个任务执行者。 Npm 是在安装 Node.js 时附带的包管理器，Npm Script 则是 Npm 内置的一个功能，允许在 <code>package.json</code> 文件里面使用 <code>scripts</code> 字段定义任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node dev.js&quot;,
    &quot;pub&quot;: &quot;node build.js&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"node dev.js"</span>,
    <span class="hljs-attr">"pub"</span>: <span class="hljs-string">"node build.js"</span>
  }
}
</code></pre>
<p>里面的 <code>scripts</code> 字段是一个对象，每一个属性对应一段脚本，以上定义了两个任务 <code>dev</code> 和 <code>pub</code>。 Npm Script 底层实现原理是通过调用 Shell 去运行脚本命令，例如执行 <code>npm run pub</code> 命令等同于执行命令 <code>node build.js</code>。</p>
<p>Npm Script 还有一个重要的功能是能运行安装到项目目录里的 <code>node_modules</code> 里的可执行模块，例如在通过命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D webpack
</code></pre>
<p>将 Webpack 安装到项目中后，是无法直接在项目根目录下通过命令 webpack 去执行 Webpack 构建的，而是要通过命令 <code>./node_modules/.bin/webpack</code> 去执行。</p>
<p>Npm Script 能方便的解决这个问题，只需要在 <code>scripts</code> 字段里定义一个任务，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack"</span>
  }
}
</code></pre>
<p>Npm Script 会先去项目目录下的 <code>node_modules</code> 中寻找有没有可执行的 <code>webpack</code> 文件，如果有就使用本地的，如果没有就使用全局的。 所以现在执行 Webpack 构建只需要通过执行 <code>npm run build</code> 去实现。</p>
<h2 id="articleHeader45">Webpack 为什么需要 Npm Script</h2>
<p>Webpack 只是一个打包模块化代码的工具，并没有提供任何任务管理相关的功能。 但在实际场景中通常不会是只通过执行 webpack 就能完成所有任务的，而是需要多个任务才能完成。</p>
<ol>
<li>在开发阶段为了提高开发体验，使用 DevServer 做开发，并且需要输出 Source Map 以方便调试，同时还需要开启自动刷新功能。</li>
<li>为了减小发布到线上的代码尺寸，在构建出发布到线上的代码时，需要压缩输出的代码。</li>
<li>在构建完发布到线上的代码后，需要把构建出的代码提交给发布系统。</li>
</ol>
<p>可以看出要求1和要求2是相互冲突的，其中任务3又依赖任务2。要满足以上三个要求，需要定义三个不同的任务。</p>
<p>接下来通过 Npm Script 来定义上面的3个任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --open&quot;,
  &quot;dist&quot;: &quot;NODE_ENV=production webpack --config webpack_dist.config.js&quot;,
  &quot;pub&quot;: &quot;npm run dist &amp;&amp; rsync dist&quot;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --open"</span>,
  <span class="hljs-string">"dist"</span>: <span class="hljs-string">"NODE_ENV=production webpack --config webpack_dist.config.js"</span>,
  <span class="hljs-string">"pub"</span>: <span class="hljs-string">"npm run dist &amp;&amp; rsync dist"</span>
},
</code></pre>
<p>含义分别是：</p>
<ul>
<li>
<code>dev</code> 代表用于开发时执行的任务，通过 DevServer 去启动构建。所以在开发项目时只需执行 <code>npm run dev</code>。</li>
<li>
<code>dist</code> 代表构建出用于发布到线上去的代码，输出到 <code>dist</code> 目录中。其中的 <code>NODE_ENV=production</code> 是为了在运行任务时注入环境变量。</li>
<li>
<code>pub</code> 代表先构建出用于发布到线上去的代码，再同步 <code>dist</code> 目录中的文件到发布系统(如何同步文件需根据你所使用的发布系统而定)。所以在开发完后需要发布时只需执行 <code>npm run pub</code>。</li>
</ul>
<p>使用 Npm Script 的好处是把一连串复杂的流程简化成了一个简单的命令，需要时只需要执行对应的那个简短的命令，而不用去手动的重复整个流程。 这会大大的提高我们的效率和降低出错率。</p>
<h1 id="articleHeader46">检查代码</h1>
<p>检查代码和 Code Review 很相似，都是去审视提交的代码可能存在的问题。 但 Code Review 一般通过人去执行，而检查代码是通过机器去执行一些自动化的检查。 自动化的检查代码成本更低，实施代价更小。</p>
<p>检查代码主要检查以下几项：</p>
<ul>
<li>代码风格：让项目成员强制遵守统一的代码风格，例如如何缩紧、如何写注释等，保障代码可读性，不把时间浪费在争论如何写代码更好看上；</li>
<li>潜在问题：分析出代码在运行过程中可能出现的潜在 Bug。</li>
</ul>
<p>目前已经有成熟的工具可以检验诸如 JavaScript、TypeScript、CSS、SCSS 等常用语言。</p>
<h2 id="articleHeader47">检查 JavaScript</h2>
<p>目前最常用的 JavaScript 检查工具是 ESlint ，它不仅内置了大量常用的检查规则，还可以通过插件机制做到灵活扩展。</p>
<p>ESlint 的使用很简单，在通过：<code>npm i -g eslint</code></p>
<p>按照到全局后，再在项目目录下执行：<code>eslint init</code></p>
<p>来新建一个 ESlint 配置文件 <code>.eslintrc</code>，该文件格式为 JSON。</p>
<p>如果你想覆盖默认的检查规则，或者想加入新的检查规则，你需要修改该文件，例如使用以下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // 从 eslint:recommended 中继承所有检查规则
    &quot;extends&quot;: &quot;eslint:recommended&quot;,
    // 再自定义一些规则     
    &quot;rules&quot;: {
        // 需要在每行结尾加 ;        
        &quot;semi&quot;: [&quot;error&quot;, &quot;always&quot;],
        // 需要使用 &quot;&quot; 包裹字符串         
        &quot;quotes&quot;: [&quot;error&quot;, &quot;double&quot;]
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>{
    <span class="hljs-regexp">//</span> 从 eslint:recommended 中继承所有检查规则
    <span class="hljs-string">"extends"</span>: <span class="hljs-string">"eslint:recommended"</span>,
    <span class="hljs-regexp">//</span> 再自定义一些规则     
    <span class="hljs-string">"rules"</span>: {
        <span class="hljs-regexp">//</span> 需要在每行结尾加 ;        
        <span class="hljs-string">"semi"</span>: [<span class="hljs-string">"error"</span>, <span class="hljs-string">"always"</span>],
        <span class="hljs-regexp">//</span> 需要使用 <span class="hljs-string">""</span> 包裹字符串         
        <span class="hljs-string">"quotes"</span>: [<span class="hljs-string">"error"</span>, <span class="hljs-string">"double"</span>]
    }
}
</code></pre>
<p>写好配置文件后，再执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eslint yourfile.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>eslint yourfile<span class="hljs-selector-class">.js</span>
</code></pre>
<p>去检查 <code>yourfile.js</code> 文件，如果你的文件没有通过检查，ESlint 会输出错误原因，例如：</p>
<h2 id="articleHeader48">检查 TypeScript</h2>
<p>TSLint 是一个和 ESlint 相似的 TypeScript 代码检查工具，区别在于 TSLint 只专注于检查 TypeScript 代码。</p>
<p>TSLint 和 ESlint 的使用方法很相似，首先通过：<code>npm i -g tslint</code></p>
<p>安装到全局，再去项目根目录下执行：<code>tslint --init</code></p>
<p>生成配置文件<code> tslint.json</code>，在配置好后，再执行：<code>tslint yourfile.ts</code>去检查 <code>yourfile.ts</code> 文件。</p>
<h2 id="articleHeader49">检查 CSS</h2>
<p>stylelint 是目前最成熟的 CSS 检查工具，内置了大量检查规则的同时也提供插件机制让用户自定义扩展。 stylelint 基于 PostCSS，能检查任何 PostCSS 能解析的代码，诸如 SCSS、Less 等。</p>
<p>首先通过<code>npm i -g stylelint</code></p>
<p>安装到全局后，去项目根目录下新建 <code>.stylelintrc</code> 配置文件， 该配置文件格式为 JSON，其格式和 ESLint 的配置相似，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 继承 stylelint-config-standard 中的所有检查规则
  &quot;extends&quot;: &quot;stylelint-config-standard&quot;,
  // 再自定义检查规则  
  &quot;rules&quot;: {
    &quot;at-rule-empty-line-before&quot;: null
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
  <span class="hljs-comment">// 继承 stylelint-config-standard 中的所有检查规则</span>
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"stylelint-config-standard"</span>,
  <span class="hljs-comment">// 再自定义检查规则  </span>
  <span class="hljs-string">"rules"</span>: {
    <span class="hljs-string">"at-rule-empty-line-before"</span>: <span class="hljs-literal">null</span>
  }
}
</code></pre>
<p>配置好后，再执行<code>stylelint "yourfile.css"</code>去检查 <code>yourfile.css</code> 文件。</p>
<h2 id="articleHeader50">结合 Webpack 检查代码</h2>
<h3 id="articleHeader51">结合 ESLint</h3>
<p><code>eslint-loader</code> 可以方便的把 ESLint 整合到 Webpack 中，使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // node_modules 目录的下的代码不用检查
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 把 eslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 eslint-loader 去检查
        enforce: 'pre',
      },
    ],
  },
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-comment">// node_modules 目录的下的代码不用检查</span>
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        loader: <span class="hljs-string">'eslint-loader'</span>,
        <span class="hljs-comment">// 把 eslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 eslint-loader 去检查</span>
        enforce: <span class="hljs-string">'pre'</span>,
      },
    ],
  },
}
</code></pre>
<p>接入 eslint-loader 后就能在控制台中看到 ESLint 输出的错误日志了。</p>
<h3 id="articleHeader52">结合 TSLint</h3>
<p><code>tslint-loader</code> 是一个和 <code>eslint-loader</code> 相似的 Webpack Loader， 能方便的把 TSLint 整合到 Webpack，其使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // node_modules 目录的下的代码不用检查
        exclude: /node_modules/,
        loader: 'tslint-loader',
        // 把 tslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 tslint-loader 去检查
        enforce: 'pre',
      },
    ],
  },
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-comment">// node_modules 目录的下的代码不用检查</span>
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        loader: <span class="hljs-string">'tslint-loader'</span>,
        <span class="hljs-comment">// 把 tslint-loader 的执行顺序放到最前面，防止其它 Loader 把处理后的代码交给 tslint-loader 去检查</span>
        enforce: <span class="hljs-string">'pre'</span>,
      },
    ],
  },
}
</code></pre>
<h3 id="articleHeader53">结合 stylelint</h3>
<p>StyleLintPlugin 能把 stylelint 整合到 Webpack，其使用方法很简单，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new StyleLintPlugin(),
  ],
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code>
<span class="hljs-keyword">const</span> StyleLintPlugin = require(<span class="hljs-string">'stylelint-webpack-plugin'</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">// ...</span>
  plugins: [
    <span class="hljs-keyword">new</span> StyleLintPlugin(),
  ],
}
</code></pre>
<h2 id="articleHeader54">一些建议</h2>
<p>把代码检查功能整合到 Webpack 中会导致以下问题：</p>
<ul>
<li>由于执行检查步骤计算量大，整合到 Webpack 中会导致构建变慢；</li>
<li>在整合代码检查到 Webpack 后，输出的错误信息是通过行号来定位错误的，没有编辑器集成显示错误直观；</li>
</ul>
<p>为了避免以上问题，还可以这样做：</p>
<ul>
<li>使用集成了代码检查功能的编辑器，让编辑器实时直观地显示错误；</li>
<li>把代码检查步骤放到代码提交时，也就是说在代码提交前去调用以上检查工具去检查代码，只有在检查都通过时才提交代码，这样就能保证提交到仓库的代码都是通过了检查的。</li>
</ul>
<p>如果你的项目是使用 Git 管理，Git 提供了 Hook 功能能做到在提交代码前触发执行脚本。</p>
<p>husky 可以方便快速地为项目接入 Git Hook， 执行<code>npm i -D husky</code></p>
<p>安装 husky 时，husky 会通过 <code>Npm Script Hook</code> 自动配置好 Git Hook，你需要做的只是在 <code>package.json</code> 文件中定义几个脚本，方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    // 在执行 git commit 前会执行的脚本  
    &quot;precommit&quot;: &quot;npm run lint&quot;,
    // 在执行 git push 前会执行的脚本  
    &quot;prepush&quot;: &quot;lint&quot;,
    // 调用 eslint、stylelint 等工具检查代码
    &quot;lint&quot;: &quot;eslint &amp;&amp; stylelint&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-comment">// 在执行 git commit 前会执行的脚本  </span>
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"npm run lint"</span>,
    <span class="hljs-comment">// 在执行 git push 前会执行的脚本  </span>
    <span class="hljs-string">"prepush"</span>: <span class="hljs-string">"lint"</span>,
    <span class="hljs-comment">// 调用 eslint、stylelint 等工具检查代码</span>
    <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint &amp;&amp; stylelint"</span>
  }
}
</code></pre>
<p><code>precommit</code> 和 <code>prepush</code> 你需要根据自己的情况选择一个，无需两个都设置。</p>
<h1 id="articleHeader55">通过 Node.js API 启动 Webpack</h1>
<p>Webpack 除了提供可执行的命令行工具外，还提供可在 Node.js 环境中调用的库。 通过 Webpack 暴露的 API，可直接在 Node.js 程序中调用 Webpack 执行构建。</p>
<p>通过 API 去调用并执行 Webpack 比直接通过可执行文件启动更加灵活，可用在一些特殊场景，下面将教你如何使用 Webpack 提供的 API。</p>
<blockquote>Webpack 其实是一个 Node.js 应用程序，它全部通过 JavaScript 开发完成。 在命令行中执行 <code>webpack</code> 命令其实等价于执行 <code>node ./node_modules/webpack/bin/webpack.js</code>。</blockquote>
<h2 id="articleHeader56">安装和使用 Webpack 模块</h2>
<p>在调用 Webpack API 前，需要先安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D webpack
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D webpack
</code></pre>
<p>安装成功后，可以采用以下代码导入 Webpack 模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');

// ES6 语法
import webpack from &quot;webpack&quot;;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-comment">// ES6 语法</span>
<span class="hljs-keyword">import</span> webpack <span class="hljs-keyword">from</span> <span class="hljs-string">"webpack"</span>;
</code></pre>
<p>导出的 <code>webpack</code> 其实是一个函数，使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack({
  // Webpack 配置，和 webpack.config.js 文件一致
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 构建过程出错
  }
  // 成功执行完构建
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">webpack</span>({
  <span class="hljs-comment">// Webpack 配置，和 webpack.config.js 文件一致</span>
}, (err, stats) =&gt; {
  <span class="hljs-selector-tag">if</span> (err || stats.hasErrors()) {
    <span class="hljs-comment">// 构建过程出错</span>
  }
  <span class="hljs-comment">// 成功执行完构建</span>
});
</code></pre>
<p>如果你的 Webpack 配置写在 <code>webpack.config.js</code> 文件中，可以这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 读取 webpack.config.js 文件中的配置
const config = require('./webpack.config.js');
webpack(config , callback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 读取 webpack.config.js 文件中的配置</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = require(<span class="hljs-string">'./webpack.config.js'</span>);
webpack(<span class="hljs-built_in">config</span> , callback);
</code></pre>
<h2 id="articleHeader57">以监听模式运行</h2>
<p>以上使用 Webpack API 的方法只能执行一次构建，无法以监听模式启动 Webpack，为了在使用 API 时以监听模式启动，需要获取 Compiler 实例，方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果不传 callback 回调函数，就会返回一个 Compiler 实例，用于让你去控制启动，而不是像上面那样立即启动
const compiler = webpack(config);

// 调用 compiler.watch 以监听模式启动，返回的 watching 用于关闭监听
const watching = compiler.watch({
  // watchOptions
  aggregateTimeout: 300,
},(err, stats)=>{
  // 每次因文件发生变化而重新执行完构建后
});

// 调用 watching.close 关闭监听 
watching.close(()=>{
  // 在监听关闭后
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 如果不传 callback 回调函数，就会返回一个 Compiler 实例，用于让你去控制启动，而不是像上面那样立即启动</span>
<span class="hljs-keyword">const</span> compiler = webpack(config);

<span class="hljs-comment">// 调用 compiler.watch 以监听模式启动，返回的 watching 用于关闭监听</span>
<span class="hljs-keyword">const</span> watching = compiler.watch({
  <span class="hljs-comment">// watchOptions</span>
  aggregateTimeout: <span class="hljs-number">300</span>,
},<span class="hljs-function">(<span class="hljs-params">err, stats</span>)=&gt;</span>{
  <span class="hljs-comment">// 每次因文件发生变化而重新执行完构建后</span>
});

<span class="hljs-comment">// 调用 watching.close 关闭监听 </span>
watching.close(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
  <span class="hljs-comment">// 在监听关闭后</span>
});</code></pre>
<h1 id="articleHeader58">使用 Webpack Dev Middleware</h1>
<p>DevServer 是一个方便开发的小型 HTTP 服务器， DevServer 其实是基于 <a href="https://github.com/webpack/webpack-dev-middleware" rel="nofollow noreferrer" target="_blank">webpack-dev-middleware</a> 和 Expressjs 实现的， 而 webpack-dev-middleware 其实是 Expressjs 的一个中间件。</p>
<p>也就是说，实现 DevServer 基本功能的代码大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

// 从 webpack.config.js 文件中读取 Webpack 配置 
const config = require('./webpack.config.js');
// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config);
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackMiddleware(compiler));
// 启动 HTTP 服务器，服务器监听在 3000 端口 
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> webpackMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>);

<span class="hljs-comment">// 从 webpack.config.js 文件中读取 Webpack 配置 </span>
<span class="hljs-keyword">const</span> config = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./webpack.config.js'</span>);
<span class="hljs-comment">// 实例化一个 Expressjs app</span>
<span class="hljs-keyword">const</span> app = express();

<span class="hljs-comment">// 用读取到的 Webpack 配置实例化一个 Compiler</span>
<span class="hljs-keyword">const</span> compiler = webpack(config);
<span class="hljs-comment">// 给 app 注册 webpackMiddleware 中间件</span>
app.<span class="hljs-keyword">use</span>(webpackMiddleware(compiler));
<span class="hljs-comment">// 启动 HTTP 服务器，服务器监听在 3000 端口 </span>
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>从以上代码可以看出，从 <code>webpack-dev-middleware</code> 中导出的 <code>webpackMiddleware</code> 是一个函数，该函数需要接收一个 Compiler 实例。Webpack API 导出的 <code>webpack</code> 函数会返回一个Compiler 实例。</p>
<p><code>webpackMiddleware</code> 函数的返回结果是一个 Expressjs 的中间件，该中间件有以下功能：</p>
<ul>
<li>接收来自 Webpack Compiler 实例输出的文件，但不会把文件输出到硬盘，而是保存在内存中；</li>
<li>往 Expressjs app 上注册路由，拦截 HTTP 收到的请求，根据请求路径响应对应的文件内容；</li>
</ul>
<p>通过 <code>webpack-dev-middleware</code> 能够将 DevServer 集成到你现有的 HTTP 服务器中，让你现有的 HTTP 服务器能返回 Webpack 构建出的内容，而不是在开发时启动多个 HTTP 服务器。 这特别适用于后端接口服务采用 Node.js 编写的项目。</p>
<h2 id="articleHeader59">Webpack Dev Middleware 支持的配置项</h2>
<p>在 Node.js 中调用 webpack-dev-middleware 提供的 API 时，还可以给它传入一些配置项，方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpackMiddleware 函数的第二个参数为配置项
app.use(webpackMiddleware(compiler, {
    // webpack-dev-middleware 所有支持的配置项
    // 只有 publicPath 属性为必填，其它都是选填项

    // Webpack 输出资源绑定在 HTTP 服务器上的根目录，
    // 和 Webpack 配置中的 publicPath 含义一致 
    publicPath: '/assets/',

    // 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志
    noInfo: false,

    // 不输出任何类型的日志到控制台
    quiet: false,

    // 切换到懒惰模式，这意味着不监听文件变化，只会在请求到时再去编译对应的文件，
    // 这适合页面非常多的项目。
    lazy: true,

    // watchOptions
    // 只在非懒惰模式下才有效
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // 默认的 URL 路径, 默认是 'index.html'.
    index: 'index.html',

    // 自定义 HTTP 头
    headers: {'X-Custom-Header': 'yes'},

    // 给特定文件后缀的文件添加 HTTP mimeTypes ，作为文件类型映射表
    mimeTypes: {'text/html': ['phtml']},

    // 统计信息输出样式
    stats: {
        colors: true
    },

    // 自定义输出日志的展示方法
    reporter: null,

    // 开启或关闭服务端渲染
    serverSideRender: false,
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpackMiddleware 函数的第二个参数为配置项</span>
<span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.use</span>(webpackMiddleware(compiler, {
    <span class="hljs-comment">// webpack-dev-middleware 所有支持的配置项</span>
    <span class="hljs-comment">// 只有 publicPath 属性为必填，其它都是选填项</span>

    <span class="hljs-comment">// Webpack 输出资源绑定在 HTTP 服务器上的根目录，</span>
    <span class="hljs-comment">// 和 Webpack 配置中的 publicPath 含义一致 </span>
    <span class="hljs-attribute">publicPath</span>: <span class="hljs-string">'/assets/'</span>,

    <span class="hljs-comment">// 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志</span>
    <span class="hljs-attribute">noInfo</span>: false,

    <span class="hljs-comment">// 不输出任何类型的日志到控制台</span>
    <span class="hljs-attribute">quiet</span>: false,

    <span class="hljs-comment">// 切换到懒惰模式，这意味着不监听文件变化，只会在请求到时再去编译对应的文件，</span>
    <span class="hljs-comment">// 这适合页面非常多的项目。</span>
    <span class="hljs-attribute">lazy</span>: true,

    <span class="hljs-comment">// watchOptions</span>
    <span class="hljs-comment">// 只在非懒惰模式下才有效</span>
    <span class="hljs-attribute">watchOptions</span>: {
        <span class="hljs-attribute">aggregateTimeout</span>: <span class="hljs-number">300</span>,
        <span class="hljs-attribute">poll</span>: true
    },

    <span class="hljs-comment">// 默认的 URL 路径, 默认是 'index.html'.</span>
    <span class="hljs-attribute">index</span>: <span class="hljs-string">'index.html'</span>,

    <span class="hljs-comment">// 自定义 HTTP 头</span>
    <span class="hljs-attribute">headers</span>: {<span class="hljs-string">'X-Custom-Header'</span>: <span class="hljs-string">'yes'</span>},

    <span class="hljs-comment">// 给特定文件后缀的文件添加 HTTP mimeTypes ，作为文件类型映射表</span>
    <span class="hljs-attribute">mimeTypes</span>: {<span class="hljs-string">'text/html'</span>: [<span class="hljs-string">'phtml'</span>]},

    <span class="hljs-comment">// 统计信息输出样式</span>
    <span class="hljs-attribute">stats</span>: {
        <span class="hljs-attribute">colors</span>: true
    },

    <span class="hljs-comment">// 自定义输出日志的展示方法</span>
    <span class="hljs-attribute">reporter</span>: null,

    <span class="hljs-comment">// 开启或关闭服务端渲染</span>
    <span class="hljs-attribute">serverSideRender</span>: false,
}));</code></pre>
<h2 id="articleHeader60">Webpack Dev Middleware 与模块热替换</h2>
<p>DevServer 提供了一个方便的功能，可以做到在监听到文件发生变化时自动替换网页中的老模块，以做到实时预览。 </p>
<p>DevServer 虽然是基于 <code>webpack-dev-middleware</code> 实现的，但 <code>webpack-dev-middleware</code> 并没有实现模块热替换功能，而是 DevServer 自己实现了该功能。</p>
<p>为了在使用 <code>webpack-dev-middleware</code> 时也能使用模块热替换功能去提升开发效率，需要额外的再接入 <a href="https://github.com/glenjamin/webpack-hot-middleware" rel="nofollow noreferrer" target="_blank">webpack-hot-middleware</a>。 需要做以下修改才能实现模块热替换。</p>
<p>第1步：修改 <code>webpack.config.js</code> 文件，加入 <code>HotModuleReplacementPlugin</code> 插件，修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = {
  entry: [
    // 为了支持模块热替换，注入代理客户端
    'webpack-hot-middleware/client',
    // JS 执行入口文件
    './src/main.js'
  ],
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
  },
  plugins: [
    // 为了支持模块热替换，生成 .hot-update.json 文件
    new HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> HotModuleReplacementPlugin = require(<span class="hljs-string">'webpack/lib/HotModuleReplacementPlugin'</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: [
    <span class="hljs-comment">// 为了支持模块热替换，注入代理客户端</span>
    <span class="hljs-string">'webpack-hot-middleware/client'</span>,
    <span class="hljs-comment">// JS 执行入口文件</span>
    <span class="hljs-string">'./src/main.js'</span>
  ],
  output: {
    <span class="hljs-comment">// 把所有依赖的模块合并输出到一个 bundle.js 文件</span>
    filename: <span class="hljs-string">'bundle.js'</span>,
  },
  plugins: [
    <span class="hljs-comment">// 为了支持模块热替换，生成 .hot-update.json 文件</span>
    <span class="hljs-keyword">new</span> HotModuleReplacementPlugin(),
  ],
  devtool: <span class="hljs-string">'source-map'</span>,
};</code></pre>
<p>第2步：修改 HTTP 服务器代码 <code>server.js</code> 文件，接入 <code>webpack-hot-middleware</code> 中间件，修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

// 从 webpack.config.js 文件中读取 Webpack 配置
const config = require('./webpack.config.js');
// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config);
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackMiddleware(compiler));
// 为了支持模块热替换，响应用于替换老模块的资源
app.use(require('webpack-hot-middleware')(compiler));
// 把项目根目录作为静态资源目录，用于服务 HTML 文件
app.use(express.static('.'));
// 启动 HTTP 服务器，服务器监听在 3000 端口
app.listen(3000, () => {
  console.info('成功监听在 3000');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> webpackMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>);

<span class="hljs-comment">// 从 webpack.config.js 文件中读取 Webpack 配置</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./webpack.config.js'</span>);
<span class="hljs-comment">// 实例化一个 Expressjs app</span>
<span class="hljs-keyword">const</span> app = express();

<span class="hljs-comment">// 用读取到的 Webpack 配置实例化一个 Compiler</span>
<span class="hljs-keyword">const</span> compiler = webpack(config);
<span class="hljs-comment">// 给 app 注册 webpackMiddleware 中间件</span>
app.<span class="hljs-keyword">use</span>(webpackMiddleware(compiler));
<span class="hljs-comment">// 为了支持模块热替换，响应用于替换老模块的资源</span>
app.<span class="hljs-keyword">use</span>(<span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)(compiler));
<span class="hljs-comment">// 把项目根目录作为静态资源目录，用于服务 HTML 文件</span>
app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(<span class="hljs-string">'.'</span>));
<span class="hljs-comment">// 启动 HTTP 服务器，服务器监听在 3000 端口</span>
app.listen(<span class="hljs-number">3000</span>, () =&gt; {
  console.info(<span class="hljs-string">'成功监听在 3000'</span>);
});</code></pre>
<p>第3步：修改执行入口文件 <code>main.js</code>，加入替换逻辑，在文件末尾加入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (module.hot) {
  module.hot.accept();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code><span class="hljs-keyword">if</span> (<span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">hot</span>) {</span>
  <span class="hljs-class"><span class="hljs-keyword">module</span>.<span class="hljs-title">hot</span>.<span class="hljs-title">accept</span>();</span>
}
</code></pre>
<p>第4步：安装新引入的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D webpack-dev-middleware webpack-hot-middleware express
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D webpack-dev-middleware webpack-hot-middleware express
</code></pre>
<p>安装成功后，通过 <code>node ./server.js</code> 就能启动一个类似于 DevServer 那样支持模块热替换的自定义 HTTP 服务了。</p>
<blockquote>本实例提供<a href="http://webpack.wuhaolin.cn/3-18%E4%BD%BF%E7%94%A8WebpackDevMiddleware.zip" rel="nofollow noreferrer" target="_blank">项目完整代码</a>
</blockquote>
<h1 id="articleHeader61">加载图片</h1>
<p>在网页中不可避免的会依赖图片资源，例如 PNG、JPG、GIF，下面来教你如何用 Webpack 加载图片资源。</p>
<h2 id="articleHeader62">使用 <code>file-loader</code>
</h2>
<p><a href="https://github.com/webpack-contrib/file-loader" rel="nofollow noreferrer" target="_blank">file-loader</a> 可以把 JavaScript 和 CSS 中导入图片的语句替换成正确的地址，并同时把文件输出到对应的位置。</p>
<p>例如 CSS 源码是这样写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#app {
  background-image: url(./imgs/a.png);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(./imgs/a.png);
}
</code></pre>
<p>被 <code>file-loader</code> 转换后输出的 CSS 会变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#app {
  background-image: url(5556e1251a78c5afda9ee7dd06ad109b.png);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(5556e1251a78c5afda9ee7dd06ad109b.png);
}
</code></pre>
<p>并且在输出目录 <code>dist</code> 中也多出 <code>./imgs/a.png</code> 对应的图片文件 <code>hash.png</code>， 输出的文件名是根据文件内容的计算出的 Hash 值。    </p>
<p>同理在 JavaScript 中导入图片的源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import imgB from './imgs/b.png';

window.document.getElementById('app').innerHTML = `
<img src=&quot;${imgB}&quot;/>
`;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> imgB <span class="hljs-keyword">from</span> <span class="hljs-string">'./imgs/b.png'</span>;

<span class="hljs-built_in">window</span>.<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>).innerHTML = `<span class="javascript">
&lt;img src=<span class="hljs-string">"${imgB}"</span>/&gt;
</span>`;
</code></pre>
<p>经过 <code>file-loader</code> 处理后输出的 JavaScript 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = __webpack_require__.p + &quot;0bcc1f8d385f78e1271ebfca50668429.png&quot;;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = __webpack_require__.p + <span class="hljs-string">"0bcc1f8d385f78e1271ebfca50668429.png"</span>;
</code></pre>
<p>也就是说 <code>imgB</code> 的值就是图片对应的 URL 地址。  </p>
<p>在 Webpack 中使用 <code>file-loader</code> 非常简单，相关配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        use: ['file-loader']
      }
    ]
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.png$/,
        <span class="hljs-keyword">use</span>: ['file-loader']
      }
    ]
  }
};
</code></pre>
<h2 id="articleHeader63">使用 <code>url-loader</code>
</h2>
<p><a href="https://github.com/webpack-contrib/url-loader" rel="nofollow noreferrer" target="_blank">url-loader</a> 可以把文件的内容经过 <code>base64</code> 编码后注入到 JavaScript 或者 CSS 中去。</p>
<p>例如 CSS 源码是这样写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#app {
  background-image: url(./imgs/a.png);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(./imgs/a.png);
}
</code></pre>
<p>被 <code>url-loader</code> 转换后输出的 CSS 会变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#app {
  background-image: url(data:image/png;base64,iVBORw01afer...); /* 结尾省略了剩下的 base64 编码后的数据 */
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(data:image/png;base64,iVBORw01afer...); <span class="hljs-comment">/* 结尾省略了剩下的 base64 编码后的数据 */</span>
}
</code></pre>
<p>同理在 JavaScript 中效果也类似。</p>
<p>从上面的例子中可以看出 <code>url-loader</code> 会把根据图片内容计算出的 <code>base64</code> 编码的字符串直接注入到代码中，由于一般的图片数据量巨大，这会导致 JavaScript、CSS 文件也跟着变大。 所以在使用 <code>url-loader</code> 时一定要注意图片体积不能太大，不然会导致 JavaScript、CSS 文件过大而带来的网页加载缓慢问题。</p>
<p>一般利用 <code>url-loader</code> 把网页需要用到的小图片资源注入到代码中去，以减少加载次数。因为在 HTTP/1 协议中，每加载一个资源都需要建立一次 HTTP 链接， 为了一个很小的图片而新建一次 HTTP 连接是不划算的。</p>
<p><code>url-loader</code> 考虑到了以上问题，并提供了一个方便的选择 <code>limit</code>，该选项用于控制当文件大小小于 <code>limit</code> 时才使用 <code>url-loader</code>，否则使用 <code>fallback</code> 选项中配置的 <code>loader</code>。 相关 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 30KB 以下的文件采用 url-loader
            limit: 1024 * 30,
            // 否则采用 file-loader，默认值就是 file-loader 
            fallback: 'file-loader',
          }
        }]
      }
    ]
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    rules:</span> <span class="hljs-string">[</span>
      <span class="hljs-string">{</span>
<span class="hljs-attr">        test:</span> <span class="hljs-string">/\.png$/,</span>
<span class="hljs-attr">        use:</span> <span class="hljs-string">[{</span>
<span class="hljs-attr">          loader:</span> <span class="hljs-string">'url-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          options:</span> <span class="hljs-string">{</span>
            <span class="hljs-string">//</span> <span class="hljs-number">30</span><span class="hljs-string">KB</span> <span class="hljs-string">以下的文件采用</span> <span class="hljs-string">url-loader</span>
<span class="hljs-attr">            limit:</span> <span class="hljs-number">1024</span> <span class="hljs-string">*</span> <span class="hljs-number">30</span><span class="hljs-string">,</span>
            <span class="hljs-string">//</span> <span class="hljs-string">否则采用</span> <span class="hljs-string">file-loader，默认值就是</span> <span class="hljs-string">file-loader</span> 
<span class="hljs-attr">            fallback:</span> <span class="hljs-string">'file-loader'</span><span class="hljs-string">,</span>
          <span class="hljs-string">}</span>
        <span class="hljs-string">}]</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">]</span>
  <span class="hljs-string">},</span>
<span class="hljs-string">};</span>
</code></pre>
<p>除此之外，你还可以做以下优化：</p>
<ul>
<li>通过 <a href="https://www.npmjs.com/package/imagemin-webpack-plugin" rel="nofollow noreferrer" target="_blank">imagemin-webpack-plugin</a> 压缩图片；</li>
<li>通过 <a href="https://www.npmjs.com/package/webpack-spritesmith" rel="nofollow noreferrer" target="_blank">webpack-spritesmith</a> 插件制作雪碧图。</li>
</ul>
<p>以上加载图片的方法同样适用于其它二进制类型的资源，例如 PDF、SWF 等等。</p>
<blockquote>本实例提供<a href="http://webpack.wuhaolin.cn/3-19%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87url-loader.zip" rel="nofollow noreferrer" target="_blank">项目完整代码</a>
</blockquote>
<h1 id="articleHeader64">加载 SVG</h1>
<p>SVG 作为矢量图的一种标准格式，已经得到了各大浏览器的支持，它也成为了 Web 中矢量图的代名词。 在网页中采用 SVG 代替位图有如下好处：</p>
<ol>
<li>SVG 相对于位图更清晰，在任意缩放的情况下后不会破坏图形的清晰度，SVG 能方便地解决高分辨率屏幕下图像显示不清楚的问题。</li>
<li>在图形线条比较简单的情况下，SVG 文件的大小要小于位图，在扁平化 UI 流行的今天，多数情况下 SVG 会更小。</li>
<li>图形相同的 SVG 比对应的高清图有更好的渲染性能。</li>
<li>SVG 采用和 HTML 一致的 XML 语法描述，灵活性很高。</li>
</ol>
<p>画图工具能导出一个个 <code>.svg</code> 文件，SVG 的导入方法和图片类似，既可以像下面这样在 CSS 中直接使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  background-image: url(./svgs/activity.svg);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(./svgs/activity.svg);
}
</code></pre>
<p>也可以在 HTML 中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;./svgs/activity.svg&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"./svgs/activity.svg"</span>/&gt;
</code></pre>
<p>也就是说可以直接把 SVG 文件当成一张图片来使用，方法和使用图片时完全一样。</p>
<p>使用 <code>file-loader</code> 和使用 <code>url-loader</code> 对 SVG 来说同样有效，只需要把 Loader test 配置中的文件后缀改成 <code>.svg</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.svg/,
        use: ['file-loader']
      }
    ]
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.svg/,
        <span class="hljs-keyword">use</span>: ['file-loader']
      }
    ]
  },
};
</code></pre>
<p>由于 SVG 是文本格式的文件，除了以上两种方法外还有其它方法，下面来一一说明。</p>
<h2 id="articleHeader65">使用 <code>raw-loader</code>
</h2>
<p><a href="https://github.com/webpack-contrib/raw-loader" rel="nofollow noreferrer" target="_blank">raw-loader</a> 可以把文本文件的内容读取出来，注入到 JavaScript 或 CSS 中去。</p>
<p>例如在 JavaScript 中这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import svgContent from './svgs/alert.svg';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> svgContent <span class="hljs-keyword">from</span> <span class="hljs-string">'./svgs/alert.svg'</span>;
</code></pre>
<p>经过 <code>raw-loader</code> 处理后输出的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = &quot;<svg xmlns=\&quot;http://www.w3.org/2000/svg\&quot;... </svg>&quot; // 末尾省略 SVG 内容
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = <span class="hljs-string">"&lt;svg xmlns=\"http://www.w3.org/2000/svg\"... &lt;/svg&gt;"</span> <span class="hljs-comment">// 末尾省略 SVG 内容</span>
</code></pre>
<p>也就是说 <code>svgContent</code> 的内容就等于字符串形式的 SVG，由于 SVG 本身就是 HTML 元素，在获取到 SVG 内容后，可以直接通过以下代码将 SVG 插入到网页中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
window.document.getElementById('app').innerHTML = svgContent;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
<span class="hljs-built_in">window</span>.<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>).innerHTML = svgContent;
</code></pre>
<p>使用 <code>raw-loader</code> 时相关的 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      }
    ]
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.svg$/,
        <span class="hljs-keyword">use</span>: ['raw-loader']
      }
    ]
  }
};
</code></pre>
<p>由于 <code>raw-loader</code> 会直接返回 SVG 的文本内容，并且无法通过 CSS 去展示 SVG 的文本内容，因此采用本方法后无法在 CSS 中导入 SVG。 也就是说在 CSS 中不可以出现 <code>background-image: url(./svgs/activity.svg)</code> 这样的代码，因为 <code>background-image: url(&lt;svg&gt;...&lt;/svg&gt;)</code> 是不合法的。</p>
<h2 id="articleHeader66">使用 <code>svg-inline-loader</code>
</h2>
<p><a href="https://github.com/webpack-contrib/svg-inline-loader" rel="nofollow noreferrer" target="_blank">svg-inline-loader</a> 和上面提到的 <code>raw-loader</code> 非常相似， 不同在于 <code>svg-inline-loader</code> 会分析 SVG 的内容，去除其中不必要的部分代码，以减少 SVG 的文件大小。</p>
<p>在使用画图工具如 Adobe Illustrator、Sketch 制作 SVG 后，在导出时这些工具会生成对网页运行来说不必要的代码。 举个例子，以下是 Sketch 导出的 SVG 的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg class=&quot;icon&quot; verison=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;24&quot; height=&quot;24&quot; viewBox=&quot;0 0 24 24&quot;
     stroke=&quot;#000&quot;>
  <circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot;/>
</svg>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;svg <span class="hljs-keyword">class</span>=<span class="hljs-string">"icon"</span> verison=<span class="hljs-string">"1.1"</span> xmlns=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-built_in">width</span>=<span class="hljs-string">"24"</span> <span class="hljs-built_in">height</span>=<span class="hljs-string">"24"</span> viewBox=<span class="hljs-string">"0 0 24 24"</span>
     <span class="hljs-built_in">stroke</span>=<span class="hljs-string">"#000"</span>&gt;
  &lt;<span class="hljs-built_in">circle</span> cx=<span class="hljs-string">"12"</span> cy=<span class="hljs-string">"12"</span> r=<span class="hljs-string">"10"</span>/&gt;
&lt;/svg&gt;
</code></pre>
<p>被 <code>svg-inline-loader</code> 处理后会精简成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg viewBox=&quot;0 0 24 24&quot; stroke=&quot;#000&quot;><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;10&quot;/></svg>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 24 24"</span> <span class="hljs-attr">stroke</span>=<span class="hljs-string">"#000"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"10"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
</code></pre>
<p>也就是说 <code>svg-inline-loader</code> 增加了对 SVG 的压缩功能。</p>
<p>使用 <code>svg-inline-loader</code> 时相关的 Webpack 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ]
  }
};   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> {
  <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span>
    rules: [
      {
        test: /\.svg$/,
        <span class="hljs-keyword">use</span>: ['svg-inline-loader']
      }
    ]
  }
};   
</code></pre>
<h1 id="articleHeader67">加载 Source Map</h1>
<p>由于在开发过程中经常会使用新语言去开发项目，最后会把源码转换成能在浏览器中直接运行的 JavaScript 代码。 这样做虽能提升开发效率，在调试代码的过程中你会发现生成的代码可读性非常差，这给代码调试带来了不便。</p>
<p>Webpack 支持为转换生成的代码输出对应的 Source Map 文件，以方便在浏览器中能通过源码调试。 控制 Source Map 输出的 Webpack 配置项是 <code>devtool</code>，它有很多选项，下面来一一详细介绍。</p>
<table>
<thead><tr>
<th>devtool</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>空</td>
<td>不生成 Source Map</td>
</tr>
<tr>
<td><code>eval</code></td>
<td>每个 <code>module</code> 会封装到 <code>eval</code> 里包裹起来执行，并且会在每个 <code>eval</code> 语句的末尾追加注释 <code>//# sourceURL=webpack:///./main.js</code>
</td>
</tr>
<tr>
<td><code>source-map</code></td>
<td>会额外生成一个单独 Source Map 文件，并且会在 JavaScript 文件末尾追加 <code>//# sourceMappingURL=bundle.js.map</code>
</td>
</tr>
<tr>
<td><code>hidden-source-map</code></td>
<td>和 <code>source-map</code> 类似，但不会在 JavaScript 文件末尾追加 <code>//# sourceMappingURL=bundle.js.map</code>
</td>
</tr>
<tr>
<td><code>inline-source-map</code></td>
<td>和 <code>source-map</code> 类似，但不会额外生成一个单独 Source Map 文件，而是把 Source Map 转换成 <code>base64</code> 编码内嵌到 JavaScript 中</td>
</tr>
<tr>
<td><code>eval-source-map</code></td>
<td>和 <code>eval</code> 类似，但会把每个模块的 Source Map 转换成 <code>base64</code> 编码内嵌到 <code>eval</code> 语句的末尾，例如 <code>//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW...</code>
</td>
</tr>
<tr>
<td><code>cheap-source-map</code></td>
<td>和 <code>source-map</code> 类似，但生成的 Source Map 文件中没有列信息，因此生成速度更快</td>
</tr>
<tr>
<td><code>cheap-module-source-map</code></td>
<td>和 <code>cheap-source-map</code> 类似，但会包含 Loader 生成的 Source Map</td>
</tr>
</tbody>
</table>
<p>其实以上表格只是列举了 <code>devtool</code> 可能取值的一部分， 它的取值其实可以由 <code>source-map</code>、<code>eval</code>、<code>inline</code>、<code>hidden</code>、<code>cheap</code>、<code>module</code> 这六个关键字随意组合而成。 这六个关键字每个都代表一种特性，它们的含义分别是：</p>
<ul>
<li>
<code>eval</code>：用 <code>eval</code> 语句包裹需要安装的模块；</li>
<li>
<code>source-map</code>：生成独立的 Source Map 文件；</li>
<li>
<code>hidden</code>：不在 JavaScript 文件中指出 Source Map 文件所在，这样浏览器就不会自动加载 Source Map；</li>
<li>
<code>inline</code>：把生成的 Source Map 转换成 <code>base64</code> 格式内嵌在 JavaScript 文件中；</li>
<li>
<code>cheap</code>：生成的 Source Map 中不会包含列信息，这样计算量更小，输出的 Source Map 文件更小；同时 Loader 输出的 Source Map 不会被采用；</li>
<li>
<code>module</code>：来自 Loader 的 Source Map 被简单处理成每行一个模块；</li>
</ul>
<h2 id="articleHeader68">该如何选择</h2>
<p>如果你不关心细节和性能，只是想在不出任何差错的情况下调试源码，可以直接设置成 <code>source-map</code>，但这样会造成两个问题：</p>
<ul>
<li>
<code>source-map</code> 模式下会输出质量最高最详细的 Source Map，这会造成构建速度缓慢，特别是在开发过程需要频繁修改的时候会增加等待时间；</li>
<li>
<code>source-map</code> 模式下会把 Source Map 暴露出去，如果构建发布到线上的代码的 Source Map 暴露出去就等于源码被泄露；</li>
</ul>
<p>为了解决以上两个问题，可以这样做：</p>
<ul>
<li>在开发环境下把 <code>devtool</code> 设置成 <code>cheap-module-eval-source-map</code>，因为生成这种 Source Map 的速度最快，能加速构建。由于在开发环境下不会做代码压缩，Source Map 中即使没有列信息也不会影响断点调试；</li>
<li>在生产环境下把 <code>devtool</code> 设置成 <code>hidden-source-map</code>，意思是生成最详细的 Source Map，但不会把 Source Map 暴露出去。由于在生产环境下会做代码压缩，一个 JavaScript 文件只有一行，所以需要列信息。</li>
</ul>
<blockquote>在生产环境下通常不会把 Source Map 上传到 HTTP 服务器让用户获取，而是上传到 JavaScript 错误收集系统，在错误收集系统上根据 Source Map 和收集到的 JavaScript 运行错误堆栈计算出错误所在源码的位置。<p>不要在生产环境下使用 <code>inline</code> 模式的 Source Map， 因为这会使 JavaScript 文件变得很大，而且会泄露源码。</p>
</blockquote>
<h2 id="articleHeader69">加载现有的 Source Map</h2>
<p>有些从 Npm 安装的第三方模块是采用 ES6 或者 TypeScript 编写的，它们在发布时会同时带上编译出来的 JavaScript 文件和对应的 Source Map 文件，以方便你在使用它们出问题的时候调试它们；</p>
<p>默认情况下 Webpack 是不会去加载这些附加的 Source Map 文件的，Webpack 只会在转换过程中生成 Source Map。 为了让 Webpack 加载这些附加的 Source Map 文件，需要安装 <a href="https://github.com/webpack-contrib/source-map-loader" rel="nofollow noreferrer" target="_blank">source-map-loader</a> 。 使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 只加载你关心的目录下的 Source Map，以提升构建速度
        include: [path.resolve(root, 'node_modules/some-components/')],
        use: ['source-map-loader'],
        // 要把 source-map-loader 的执行顺序放到最前面，如果在 source-map-loader 之前有 Loader 转换了该 JavaScript 文件，会导致 Source Map 映射错误
        enforce: 'pre'
      }
    ]
  }
};


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-comment">// 只加载你关心的目录下的 Source Map，以提升构建速度</span>
        include: [path.resolve(root, <span class="hljs-string">'node_modules/some-components/'</span>)],
        use: [<span class="hljs-string">'source-map-loader'</span>],
        <span class="hljs-comment">// 要把 source-map-loader 的执行顺序放到最前面，如果在 source-map-loader 之前有 Loader 转换了该 JavaScript 文件，会导致 Source Map 映射错误</span>
        enforce: <span class="hljs-string">'pre'</span>
      }
    ]
  }
};


</code></pre>
<blockquote>由于 <code>source-map-loader</code> 在加载 Source Map 时计算量很大，因此要避免让该 Loader 处理过多的文件，不然会导致构建速度缓慢。 通常会采用 <code>include</code> 去命中只关心的文件。</blockquote>
<p>再安装新引入的依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D source-map-loader
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> -D source-map-loader
</code></pre>
<p>重启 Webpack 后，你就能在浏览器中调试 <code>node_modules/some-components/</code> 目录下的源码了。</p>
<h1 id="articleHeader70">实战总结</h1>
<p>在实际应用中，会遇到各种各样的需求，虽然前面的小节中已经给出了大部分场景需求的解决方案，但还是很难涵盖所有的可能性。 所以你自己需要有能力去分析遇到的问题，然后去寻找对应的解决方案，你可以按照以下思路去分析和解决问题：</p>
<ol>
<li>对所面临的问题本身要了解。例如在用 Webpack 去构建 React 应用时你需要先掌握 React 的基础知识。</li>
<li>找出现实和目标之间的差异。例如在 React 应用的源码中用到了 JSX 语法和 ES6 语法，需要把源码转换成 ES5。</li>
<li>找出从现实到目标的可能路径。例如把新语法转换成 ES5 可以使用 Babel 去转换源码。</li>
<li>搜索社区中有没有现成的针对可能路径的 Webpack 集成方案。例如社区中已经有 <code>babel-loader</code>。</li>
<li>如果找不到现成的方案说明你的需求非常特别，这时候你就需要编写自己的 Loader 或者 Plugin 了。</li>
</ol>
<p>在解决问题的过程中有以下2点能力很重要：</p>
<ol>
<li>从一个知识你需要尽可能多的联想到其相关连的知识，这有利于打通你的知识体系,从经验中更快地得出答案。</li>
<li>善于使用搜索引擎去寻找你所面临的问题，这有利于借助他人的经验更快地得出答案，而不是自己重新探索。</li>
</ol>
<p>最重要的是你需要多实战，自己去解决问题，这有利于加深你的影响和理解，而不是只看不做。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack实战

## 原文链接
[https://segmentfault.com/a/1190000015020658](https://segmentfault.com/a/1190000015020658)

