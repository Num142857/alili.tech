---
title: 'vue + typescript 项目起手式' 
date: 2018-12-27 2:30:13
hidden: true
slug: g8727rmhvhd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue + typescript 新项目起手式</h1>
<p><strong><em> 最后更新于2018-06-30，技术文具有时效性，请知悉 </em></strong></p>
<blockquote>我知道你们早就想用上 vue + ts 强类型了</blockquote>
<p><a href="https://segmentfault.com/a/1190000011878086">还有后续 vue + typescript 进阶篇</a></p>
<ul>
<li><em>安装<code>vue-cli</code></em></li>
<li><em>安装<code>ts</code>依赖</em></li>
<li><em>配置 <code>webpack</code></em></li>
<li><em>添加 <code>tsconfig.json</code></em></li>
<li><em>添加 <code>tslint.json</code></em></li>
<li><em>让 <code>ts</code> 识别 <code>.vue</code></em></li>
<li><em>改造 <code>.vue</code>文件</em></li>
</ul>
<h2 id="articleHeader1">什么是typescript</h2>
<p><code>TypeScript</code> 是 <code>JavaScript</code> 的强类型版本。然后在编译期去掉类型和特有语法，生成纯粹的 <code>JavaScript</code> 代码。由于最终在浏览器中运行的仍然是 <code>JavaScript</code>，所以 <code>TypeScript</code> 并不依赖于浏览器的支持，也并不会带来兼容性问题。</p>
<p><code>TypeScript</code> 是 <code>JavaScript</code> 的超集，这意味着他支持所有的 <code>JavaScript</code> 语法。并在此之上对 <code>JavaScript</code> 添加了一些扩展，如 <code>class</code> / <code>interface</code> / <code>module</code> 等。这样会大大提升代码的可阅读性。</p>
<p>与此同时，<code>TypeScript</code> 也是 <code>JavaScript ES6</code> 的超集，<code>Google</code> 的 <code>Angular 2.0</code> 也宣布采用 <code>TypeScript</code> 进行开发。这更是充分说明了这是一门面向未来并且脚踏实地的语言。</p>
<p>强类型语言的优势在于静态类型检查，具体可以参见 <a href="http://www.zhihu.com/question/28016252/answer/39056940" rel="nofollow noreferrer" target="_blank">http://www.zhihu.com/question...</a> 的回答。概括来说主要包括以下几点：</p>
<ol>
<li>静态类型检查</li>
<li>IDE 智能提示</li>
<li>代码重构</li>
<li>可读性</li>
</ol>
<blockquote>静态类型检查可以避免很多不必要的错误, 不用在调试的时候才发现问题</blockquote>
<h2 id="articleHeader2">前言</h2>
<p>随着<code>vue2.5</code> 更好的 <code>TypeScript</code> 集成，同时因为新开项目的契机，故准备动手尝试一下<code>typescript</code> + <code>vue</code></p>
<p>都说<code>ts</code>万般好，不如一个段子来的直观，一个程序员自从用上了<code>ts</code>之后，连续写了<code>3000+</code>行代码一次编译通过一气呵成，然后很激动的打电话跟老婆炫耀这件事情，老婆回了一句 <code>哦</code></p>
<p>之前看文章或者 demo 一直认为 <code>vue</code> + <code>typescript</code> 之后就不能友好的写<code>.vue</code>单文件，并且我也在各种 live 中问<code>vue</code> + <code>ts</code> 或者 <code>flow</code>的集成，也一直没有问出什么好的实践，但是本上强上<code>ts</code>的念头，一个字，就是干！</p>
<p><strong>终于决定自己动手，那接下来从 <code>vue-cli</code> 开始配置 <code>ts</code>，看看事实上集成 <code>ts</code> 的体验到底是如何呢？</strong></p>
<hr>
<p>先贴一张最后配置完毕的.vue文件 ，template 和 style 跟以前的写法保持一致，只有 script 的变化</p>
<h2><span class="img-wrap"><img data-src="/img/bVXqrt?w=1256&amp;h=1382" src="https://static.alili.tech/img/bVXqrt?w=1256&amp;h=1382" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></h2>
<h2 id="articleHeader4">起手vue-cli</h2>
<p>这步应该不用写了</p>
<h2 id="articleHeader5">Vue 引入 TypeScript</h2>
<p>首先Cli之后，接下来需要安装一些必要/以后需要的插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="安装vue的官方插件
npm i vue-class-component vue-property-decorator --save

// ts-loader typescript 必须安装，其他的相信你以后也会装上的
npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">安装vue的官方插件
npm <span class="hljs-selector-tag">i</span> vue-class-component vue-property-decorator --save

<span class="hljs-comment">// ts-loader typescript 必须安装，其他的相信你以后也会装上的</span>
npm <span class="hljs-selector-tag">i</span> ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev</code></pre>
<p>这些库大体的作用，可以按需引入：</p>
<ul>
<li>
<a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a>：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件</li>
<li>
<a href="https://github.com/kaorun343/vue-property-decorator" rel="nofollow noreferrer" target="_blank">vue-property-decorator</a>：在 <code>vue-class-component</code> 上增强更多的结合 Vue 特性的装饰器</li>
<li>
<a href="https://github.com/TypeStrong/ts-loader" rel="nofollow noreferrer" target="_blank">ts-loader</a>：TypeScript 为 Webpack 提供了 <code>ts-loader</code>，其实就是为了让webpack识别 .ts .tsx文件</li>
<li>
<a href="https://github.com/wbuchwalter/tslint-loader" rel="nofollow noreferrer" target="_blank">tslint-loader</a>跟<a href="https://github.com/palantir/tslint" rel="nofollow noreferrer" target="_blank">tslint</a>：我想你也会在<code>.ts</code> <code>.tsx</code>文件 约束代码格式（作用等同于eslint）</li>
<li>
<a href="https://github.com/blakeembrey/tslint-config-standard" rel="nofollow noreferrer" target="_blank">tslint-config-standard</a>：<code>tslint</code> 配置 <code>standard</code>风格的约束</li>
</ul>
<h2 id="articleHeader6">配置 webpack</h2>
<p>首先找到<code>./build/webpack.base.conf.js</code></p>
<ul><li>找到<code>entry.app</code> 将<code>main.js</code> 改成 <code>main.ts</code>, 顺便把项目文件中的<code>main.js</code>也改成<code>main.ts</code>, 里面内容保持不变</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  app: './src/main.ts'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
  <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.ts'</span>
}</code></pre>
<ul><li>找到<code>resolve.extensions</code> 里面加上<code>.ts</code> 后缀 （是为了之后引入.ts的时候不写后缀）</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      '@': resolve('src')
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  resolve: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.ts'</span>],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>)
    }
  }</code></pre>
<ul><li>找到<code>module.rules</code> 添加webpack对<code>.ts</code>的解析</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
// 从这里复制下面的代码就可以了
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    },
// 复制以上的
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|vue)$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
      <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
      <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
      }
    },
<span class="hljs-comment">// 从这里复制下面的代码就可以了</span>
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.ts$/</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'tslint-loader'</span>
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'ts-loader'</span>,
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">appendTsSuffixTo</span>: [<span class="hljs-regexp">/\.vue$/</span>],
      }
    },
<span class="hljs-comment">// 复制以上的</span>
  }
}</code></pre>
<p>是不是加完了，那现在来解释一下</p>
<p><code>ts-loader</code> 会检索当前目录下的 <code>tsconfig.json</code> 文件，根据里面定义的规则来解析<code>.ts</code>文件（就跟<code>.babelrc</code>的作用一样）</p>
<p><code>tslint-loader</code> 作用等同于 <code>eslint-loader</code></p>
<h2 id="articleHeader7">添加 tsconfig.json</h2>
<p>接下来在根路径下创建<code>tsconfig.json</code>文件</p>
<p>这里有一份参考的 <code>tsconfig.json</code> 配置，完成的配置请点击 <a href="http://json.schemastore.org/tsconfig" rel="nofollow noreferrer" target="_blank">tsconfig.json</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 编译选项
  &quot;compilerOptions&quot;: {
    // 输出目录
    &quot;outDir&quot;: &quot;./output&quot;,
    // 是否包含可以用于 debug 的 sourceMap
    &quot;sourceMap&quot;: true,
    // 以严格模式解析
    &quot;strict&quot;: true,
    // 采用的模块系统
    &quot;module&quot;: &quot;esnext&quot;,
    // 如何处理模块
    &quot;moduleResolution&quot;: &quot;node&quot;,
    // 编译输出目标 ES 版本
    &quot;target&quot;: &quot;es5&quot;,
    // 允许从没有设置默认导出的模块中默认导入
    &quot;allowSyntheticDefaultImports&quot;: true,
    // 将每个文件作为单独的模块
    &quot;isolatedModules&quot;: false,
    // 启用装饰器
    &quot;experimentalDecorators&quot;: true,
    // 启用设计类型元数据（用于反射）
    &quot;emitDecoratorMetadata&quot;: true,
    // 在表达式和声明上有隐含的any类型时报错
    &quot;noImplicitAny&quot;: false,
    // 不是函数的所有返回路径都有返回值时报错。
    &quot;noImplicitReturns&quot;: true,
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    &quot;importHelpers&quot;: true,
    // 编译过程中打印文件名
    &quot;listFiles&quot;: true,
    // 移除注释
    &quot;removeComments&quot;: true,
    &quot;suppressImplicitAnyIndexErrors&quot;: true,
    // 允许编译javascript文件
    &quot;allowJs&quot;: true,
    // 解析非相对模块名的基准目录
    &quot;baseUrl&quot;: &quot;./&quot;,
    // 指定特殊模块的路径
    &quot;paths&quot;: {
      &quot;jquery&quot;: [
        &quot;node_modules/jquery/dist/jquery&quot;
      ]
    },
    // 编译过程中需要引入的库文件的列表
    &quot;lib&quot;: [
      &quot;dom&quot;,
      &quot;es2015&quot;,
      &quot;es2015.promise&quot;
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-comment">// 编译选项</span>
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-comment">// 输出目录</span>
    <span class="hljs-string">"outDir"</span>: <span class="hljs-string">"./output"</span>,
    <span class="hljs-comment">// 是否包含可以用于 debug 的 sourceMap</span>
    <span class="hljs-string">"sourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 以严格模式解析</span>
    <span class="hljs-string">"strict"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 采用的模块系统</span>
    <span class="hljs-string">"module"</span>: <span class="hljs-string">"esnext"</span>,
    <span class="hljs-comment">// 如何处理模块</span>
    <span class="hljs-string">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
    <span class="hljs-comment">// 编译输出目标 ES 版本</span>
    <span class="hljs-string">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-comment">// 允许从没有设置默认导出的模块中默认导入</span>
    <span class="hljs-string">"allowSyntheticDefaultImports"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 将每个文件作为单独的模块</span>
    <span class="hljs-string">"isolatedModules"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// 启用装饰器</span>
    <span class="hljs-string">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 启用设计类型元数据（用于反射）</span>
    <span class="hljs-string">"emitDecoratorMetadata"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 在表达式和声明上有隐含的any类型时报错</span>
    <span class="hljs-string">"noImplicitAny"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// 不是函数的所有返回路径都有返回值时报错。</span>
    <span class="hljs-string">"noImplicitReturns"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 从 tslib 导入外部帮助库: 比如__extends，__rest等</span>
    <span class="hljs-string">"importHelpers"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 编译过程中打印文件名</span>
    <span class="hljs-string">"listFiles"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 移除注释</span>
    <span class="hljs-string">"removeComments"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"suppressImplicitAnyIndexErrors"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 允许编译javascript文件</span>
    <span class="hljs-string">"allowJs"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 解析非相对模块名的基准目录</span>
    <span class="hljs-string">"baseUrl"</span>: <span class="hljs-string">"./"</span>,
    <span class="hljs-comment">// 指定特殊模块的路径</span>
    <span class="hljs-string">"paths"</span>: {
      <span class="hljs-string">"jquery"</span>: [
        <span class="hljs-string">"node_modules/jquery/dist/jquery"</span>
      ]
    },
    <span class="hljs-comment">// 编译过程中需要引入的库文件的列表</span>
    <span class="hljs-string">"lib"</span>: [
      <span class="hljs-string">"dom"</span>,
      <span class="hljs-string">"es2015"</span>,
      <span class="hljs-string">"es2015.promise"</span>
    ]
  }
}</code></pre>
<p><strong>顺便贴一份自己的配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;include&quot;: [
    &quot;src/**/*&quot;
  ],
  &quot;exclude&quot;: [
    &quot;node_modules&quot;
  ],
  &quot;compilerOptions&quot;: {
    &quot;allowSyntheticDefaultImports&quot;: true,
    &quot;experimentalDecorators&quot;: true,
    &quot;allowJs&quot;: true,
    &quot;module&quot;: &quot;esnext&quot;,
    &quot;target&quot;: &quot;es5&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;,
    &quot;isolatedModules&quot;: true,
    &quot;lib&quot;: [
      &quot;dom&quot;,
      &quot;es5&quot;,
      &quot;es2015.promise&quot;
    ],
    &quot;sourceMap&quot;: true,
    &quot;pretty&quot;: true
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"include"</span>: [
    <span class="hljs-string">"src/**/*"</span>
  ],
  <span class="hljs-string">"exclude"</span>: [
    <span class="hljs-string">"node_modules"</span>
  ],
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-string">"allowSyntheticDefaultImports"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"allowJs"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"module"</span>: <span class="hljs-string">"esnext"</span>,
    <span class="hljs-string">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-string">"moduleResolution"</span>: <span class="hljs-string">"node"</span>,
    <span class="hljs-string">"isolatedModules"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"lib"</span>: [
      <span class="hljs-string">"dom"</span>,
      <span class="hljs-string">"es5"</span>,
      <span class="hljs-string">"es2015.promise"</span>
    ],
    <span class="hljs-string">"sourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"pretty"</span>: <span class="hljs-literal">true</span>
  }
}
</code></pre>
<h2 id="articleHeader8">添加 tslint.json</h2>
<p>在根路径下创建<code>tslint.json</code>文件</p>
<p>这里就很简单了，就是 引入 <code>ts</code> 的 <code>standard</code> 规范</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;tslint-config-standard&quot;,
  &quot;globals&quot;: {
    &quot;require&quot;: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"tslint-config-standard"</span>,
  <span class="hljs-string">"globals"</span>: {
    <span class="hljs-string">"require"</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<h2 id="articleHeader9">让 ts 识别 .vue</h2>
<p>由于 <code>TypeScript</code> 默认并不支持 <code>*.vue</code> 后缀的文件，所以在 <code>vue</code> 项目中引入的时候需要创建一个 <code>vue-shim.d.ts</code> 文件，放在项目项目对应使用目录下，例如 <code>src/vue-shim.d.ts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module &quot;*.vue&quot; {
  import Vue from &quot;vue&quot;;
  export default Vue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">declare <span class="hljs-built_in">module</span> <span class="hljs-string">"*.vue"</span> {
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue;
}</code></pre>
<blockquote>敲黑板，下面有重点！</blockquote>
<p>意思是告诉 <code>TypeScript</code> <code>*.vue</code> 后缀的文件可以交给 <code>vue</code> 模块来处理。</p>
<p>而在代码中导入 <code>*.vue</code> 文件的时候，需要写上 <code>.vue</code> 后缀。原因还是因为 <code>TypeScript</code> 默认只识别 <code>*.ts</code> 文件，不识别 <code>*.vue</code> 文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Component from 'components/component.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'components/component.vue'</span></code></pre>
<h2 id="articleHeader10">改造 <code>.vue</code> 文件</h2>
<p>在这之前先让我们了解一下所需要的插件（下面的内容需要掌握<code>es7</code>的<a href="http://taobaofed.org/blog/2015/11/16/es7-decorator/" rel="nofollow noreferrer" target="_blank">装饰器</a>, 就是下面使用的@符号）</p>
<h3 id="articleHeader11">vue-class-component</h3>
<p><a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a> 对 <code>Vue</code> 组件进行了一层封装，让 <code>Vue</code> 组件语法在结合了 <code>TypeScript</code> 语法之后更加扁平化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <input v-model=&quot;msg&quot;>
    <p>msg: "{{" msg "}}"</p>
    <p>computed msg: "{{" computedMsg "}}"</p>
    <button @click=&quot;greet&quot;>Greet</button>
  </div>
</template>

<script lang=&quot;ts&quot;>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class App extends Vue {
    // 初始化数据
    msg = 123

    // 声明周期钩子
    mounted () {
      this.greet()
    }

    // 计算属性
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // 方法
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>msg: </span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>computed msg: </span><span class="hljs-template-variable">"{{" computedMsg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"greet"</span>&gt;</span>Greet<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-class-component'</span>

  @Component
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
    <span class="hljs-comment">// 初始化数据</span>
    msg = <span class="hljs-number">123</span>

    <span class="hljs-comment">// 声明周期钩子</span>
    mounted () {
      <span class="hljs-keyword">this</span>.greet()
    }

    <span class="hljs-comment">// 计算属性</span>
    get computedMsg () {
      <span class="hljs-keyword">return</span> <span class="hljs-string">'computed '</span> + <span class="hljs-keyword">this</span>.msg
    }

    <span class="hljs-comment">// 方法</span>
    greet () {
      alert(<span class="hljs-string">'greeting: '</span> + <span class="hljs-keyword">this</span>.msg)
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>上面的代码跟下面的代码作用是一样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data () {
    return {
      msg: 123
    }
  }

  // 声明周期钩子
  mounted () {
    this.greet()
  }

  // 计算属性
  computed: {
    computedMsg () {
      return 'computed ' + this.msg
    }
  }

  // 方法
  methods: {
    greet () {
      alert('greeting: ' + this.msg)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="vue">export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      msg: <span class="hljs-number">123</span>
    }
  }

  <span class="hljs-comment">// 声明周期钩子</span>
  mounted () {
    <span class="hljs-keyword">this</span>.greet()
  }

  <span class="hljs-comment">// 计算属性</span>
  computed: {
    computedMsg () {
      <span class="hljs-keyword">return</span> <span class="hljs-string">'computed '</span> + <span class="hljs-keyword">this</span>.msg
    }
  }

  <span class="hljs-comment">// 方法</span>
  methods: {
    greet () {
      alert(<span class="hljs-string">'greeting: '</span> + <span class="hljs-keyword">this</span>.msg)
    }
  }
}</code></pre>
<h3 id="articleHeader12">vue-property-decorator</h3>
<p><a href="https://github.com/kaorun343/vue-property-decorator" rel="nofollow noreferrer" target="_blank">vue-property-decorator</a> 是在 <code>vue-class-component</code> 上增强了更多的结合 <code>Vue</code> 特性的装饰器，新增了这 7 个装饰器：</p>
<ul>
<li><code>@Emit</code></li>
<li><code>@Inject</code></li>
<li><code>@Model</code></li>
<li><code>@Prop</code></li>
<li><code>@Provide</code></li>
<li><code>@Watch</code></li>
<li>
<code>@Component</code> (从 <code>vue-class-component</code> 继承)</li>
</ul>
<p>在这里列举几个常用的<code>@Prop/@Watch/@Component</code>, 更多信息，详见<a href="https://github.com/kaorun343/vue-property-decorator" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

@Component
export class MyComponent extends Vue {
  
  @Prop()
  propA: number = 1

  @Prop({ default: 'default value' })
  propB: string

  @Prop([String, Boolean])
  propC: string | boolean

  @Prop({ type: null })
  propD: any

  @Watch('child')
  onChildChanged(val: string, oldVal: string) { }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="vue"><span class="hljs-keyword">import</span> { <span class="hljs-type">Component</span>, <span class="hljs-type">Emit</span>, <span class="hljs-type">Inject</span>, <span class="hljs-type">Model</span>, <span class="hljs-type">Prop</span>, <span class="hljs-type">Provide</span>, <span class="hljs-type">Vue</span>, <span class="hljs-type">Watch</span> } from <span class="hljs-symbol">'vue</span>-property-decorator'

<span class="hljs-meta">@Component</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  
  <span class="hljs-meta">@Prop</span>()
  propA: number = <span class="hljs-number">1</span>

  <span class="hljs-meta">@Prop</span>({ <span class="hljs-keyword">default</span>: <span class="hljs-symbol">'default</span> value' })
  propB: string

  <span class="hljs-meta">@Prop</span>([<span class="hljs-type">String</span>, <span class="hljs-type">Boolean</span>])
  propC: string | boolean

  <span class="hljs-meta">@Prop</span>({ <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-literal">null</span> })
  propD: any

  <span class="hljs-meta">@Watch</span>(<span class="hljs-symbol">'chil</span>d')
  onChildChanged(<span class="hljs-keyword">val</span>: string, oldVal: string) { }
}</code></pre>
<p>上面的代码相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  props: {
    checked: Boolean,
    propA: Number,
    propB: {
      type: String,
      default: 'default value'
    },
    propC: [String, Boolean],
    propD: { type: null }
  }
  methods: {
    onChildChanged(val, oldVal) { }
  },
  watch: {
    'child': {
      handler: 'onChildChanged',
      immediate: false,
      deep: false
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="vue"><span class="hljs-string">export</span> <span class="hljs-string">default</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  props:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    checked:</span> <span class="hljs-string">Boolean,</span>
<span class="hljs-attr">    propA:</span> <span class="hljs-string">Number,</span>
<span class="hljs-attr">    propB:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      type:</span> <span class="hljs-string">String,</span>
<span class="hljs-attr">      default:</span> <span class="hljs-string">'default value'</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    propC:</span> <span class="hljs-string">[String,</span> <span class="hljs-string">Boolean],</span>
<span class="hljs-attr">    propD:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-literal">null</span> <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-attr">  methods:</span> <span class="hljs-string">{</span>
    <span class="hljs-string">onChildChanged(val,</span> <span class="hljs-string">oldVal)</span> <span class="hljs-string">{</span> <span class="hljs-string">}</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  watch:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    'child':</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      handler:</span> <span class="hljs-string">'onChildChanged'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      immediate:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">      deep:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<h3 id="articleHeader13">开始修改<code>App.vue</code>文件</h3>
<ol>
<li>在<code>script</code> 标签上加上 <code>lang="ts"</code>, 意思是让<code>webpack</code>将这段代码识别为<code>typescript</code> 而非<code>javascript</code>
</li>
<li>修改vue组件的构造方式( 跟<code>react</code>组件写法有点类似, 详见<a href="https://cn.vuejs.org/v2/guide/typescript.html#%E5%9F%BA%E4%BA%8E%E7%B1%BB%E7%9A%84-Vue-%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer" target="_blank">官方</a> )， 如下图</li>
<li>用<code>vue-property-decorator</code>语法改造之前代码</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVXqRW?w=627&amp;h=495" src="https://static.alili.tech/img/bVXqRW?w=627&amp;h=495" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当然也可以直接复制下面的代码替换就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <router-view/>
  </div>
</template>

<script lang=&quot;ts&quot;>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-class-component'</span>

@Component({})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>接下来用相同的方式修改HelloWorld.vue即可</p>
<h2 id="articleHeader14">npm run dev</h2>
<p>这个时候运行项目就应该能正常跑起来了</p>
<p>到这里我们的配置就已经结束了</p>
<h1 id="articleHeader15">最后</h1>
<p>如果按照文章没有配置出来，可以参考此<code>repo</code> <a href="https://github.com/ws456999/vue-typescript-starter" rel="nofollow noreferrer" target="_blank">vue-typescript-starter</a> (安全按照文章一步一步操作的版本)</p>
<p>总的来说，就如本文最初讲，ts 从数据类型、结构入手，通过静态类型检测来增强你代码的健壮性，从而避免 bug 的产生。</p>
<p>同时可以继续使用<code>.vue</code>单文件</p>
<p>而且我个人认为加上了<code>typescript</code>，项目逼格提升2个level，也能让后端大哥们不吐槽js弱语言的诟病了</p>
<p>相信之后 <code>vue</code> 对于 <code>ts</code> 的集成会更加友善，期待尤大之后的动作</p>
<p><a href="https://segmentfault.com/a/1190000011878086">还有后续 vue + typescript 进阶篇</a></p>
<h1 id="articleHeader16">参考链接/推荐阅读</h1>
<ul>
<li><a href="https://www.tslang.cn/" rel="nofollow noreferrer" target="_blank">TypeScript</a></li>
<li><a href="https://cn.vuejs.org/v2/guide/typescript.html" rel="nofollow noreferrer" target="_blank">vue typescript 支持</a></li>
<li><a href="https://segmentfault.com/a/1190000011520912">从 JavaScript 到 TypeScript 6 - Vue 引入 TypeScript</a></li>
<li><a href="https://segmentfault.com/a/1190000010641821#articleHeader4" target="_blank">Vue with TypeScript</a></li>
<li><a href="http://taobaofed.org/blog/2015/11/16/es7-decorator/" rel="nofollow noreferrer" target="_blank">ES7 Decorator 装饰者模式</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue + typescript 项目起手式

## 原文链接
[https://segmentfault.com/a/1190000011744210](https://segmentfault.com/a/1190000011744210)

