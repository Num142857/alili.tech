---
title: 'Vue with TypeScript' 
date: 2019-01-04 2:30:10
hidden: true
slug: yuzpoo84gn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>如果说，2017 年计算机领域的潮流是人工智能的话，那么前端界的潮流想必就是 TypeScript 了。</p></blockquote>
<ul>
<li><p><a>前言</a></p></li>
<li><p><a>安装 TypeScript</a></p></li>
<li><p><a>tsconfig.json 配置</a></p></li>
<li><p><a>Tslint</a></p></li>
<li><p><a>Vue 中使用 typescript 需要注意的问题</a></p></li>
<li><p><a>其他问题</a></p></li>
<li><p><a>最后</a></p></li>
</ul>
<p><a></a></p>
<h2 id="articleHeader0">前言</h2>
<p>大家一听到 ts 是强类型语言，想到 js 要像其他语言那样定义变量类型就头疼，心里多少有些抵触情绪。起初我也是这样认为的，写的时候的确也是这样。但在另一方面，它强大的静态分析功能会使你所写的代码更健壮，从而大大减少 bug 的发生概率，将 bug 掐死在摇篮里。</p>
<p>这样的好东西就想尝试着把它用到自己的项目里。可当要将 ts 加入到现有的 vue 项目中时，突然有无从下手的感觉，总感觉 ts 的类型和 vue 绑定数据的方式无法有效地结合起来。同时，印象中一直听到的都是 react 和 angular 的项目在使用 ts，还没有听说哪个成功的 vue 项目是用 ts 开发的。（<a href="https://github.com/ElemeFE/element" rel="nofollow noreferrer" target="_blank">element</a> 也不是。）</p>
<p>那是不是 vue 就不能同 ts 一起用哪？一度我也这样怀疑过，不过搜了波资料之后，发现 vue 官网已经给出了如何整合 ts 的<a href="https://vuejs.org/v2/guide/typescript.html" rel="nofollow noreferrer" target="_blank">教程</a>。微软这边也有个 <a href="https://github.com/Microsoft/TypeScript-Vue-Starter" rel="nofollow noreferrer" target="_blank">TypeScript-Vue-Starter</a>，但是，这个 starter 也无法解决组件属性上的类型检测。这令 ts 类型检测的能力大大降低，而 vue 则是推荐另一个官方工具 <a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a> 来解决这个问题。</p>
<p>扯了那么多，总结一句话就是：TS 和 Vue 能搞。</p>
<p>那么，下面直接开搞。</p>
<p><a></a></p>
<h2 id="articleHeader1">安装 TypeScript</h2>
<p>首先，自然是安装，typescript 和其他依赖没有什么不同，直接通过 npm 安装就可以了。因为项目之前用的是 webpack，所以还要装上另外两个 loader：<a href="https://github.com/s-panferov/awesome-typescript-loader" rel="nofollow noreferrer" target="_blank"><code>awesome-typescript-loader</code></a> 和 <a href="https://github.com/webpack-contrib/source-map-loader" rel="nofollow noreferrer" target="_blank"><code>source-map-loader</code></a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i typescript awesome-typescript-loader source-map-loader -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="Bash" style="word-break: break-word; white-space: initial;">npm i typescript awesome-typescript-loader <span class="hljs-built_in">source</span>-map-loader -S</code></pre>
<p>有了 loader 那么让 webpack 去管理 ts 的文件也就轻而易举了。别忘了在 <code>resolve</code> -&gt; <code>extensions</code> 中添加 <code>.ts</code>，让 webpack 能够识别以 ts 结尾的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
    resolve: {
        // ...
        extensions: [&quot;.ts&quot;, &quot;.js&quot;, &quot;.json&quot;]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: &quot;awesome-typescript-loader&quot;
            },
            // ...
        ]
    }
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// ...</span>
    resolve: {
        <span class="hljs-comment">// ...</span>
        extensions: [<span class="hljs-string">".ts"</span>, <span class="hljs-string">".js"</span>, <span class="hljs-string">".json"</span>]
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"awesome-typescript-loader"</span>
            },
            <span class="hljs-comment">// ...</span>
        ]
    }
<span class="hljs-comment">// ...</span></code></pre>
<p>这样 webpack 的配置就完成了，接着在根目录下添加 <code>tsconfig.json</code> 文件来配置 ts。</p>
<p><a></a></p>
<h2 id="articleHeader2">配置 tsconfig.json</h2>
<p><code>tsconfig.json</code> 所包含的属性并不多，只有 7 个，ms 官方也给出了它的<a href="http://json.schemastore.org/tsconfig" rel="nofollow noreferrer" target="_blank">定义文件</a>。但看起来并不怎么舒服，这里就翻译整理一下。（若有误，还请指出）</p>
<ul>
<li><p><code>files</code>: 数组类型，用于表示由 ts 管理的文件的具体文件路径</p></li>
<li><p><code>exclude</code>: 数组类型，用于表示 ts 排除的文件（2.0 以上支持 Glob）</p></li>
<li><p><code>include</code>: 数组类型，用于表示 ts 管理的文件（2.0 以上）</p></li>
<li><p><code>compileOnSave</code>: 布尔类型，用于 IDE 保存时是否生成编译后的文件</p></li>
<li><p><code>extends</code>: 字符串类型，用于继承 ts 配置，2.1 版本后支持</p></li>
<li><p><code>compilerOptions</code>: 对象类型，设置编译的选项，不设置则使用默认配置，配置项比较多，后面再列</p></li>
<li>
<p><code>typeAcquisition</code>: 对象类型，设置自动引入库类型定义文件(<code>.d.ts</code>)相关，该对象下面有 3 个子属性分别是：</p>
<ul>
<li><p><code>enable</code>: 布尔类型，是否开启自动引入库类型定义文件(<code>.d.ts</code>)，默认为 <code>false</code></p></li>
<li><p><code>include</code>: 数组类型，允许自动引入的库名，如：["jquery", "lodash"]</p></li>
<li><p><code>exculde</code>: 数组类型，排除的库名</p></li>
</ul>
</li>
</ul>
<p>如不设定 <code>files</code> 和 <code>include</code>，ts 默认是 <code>exclude</code> 以外的所有的以 <code>.ts</code> 和 <code>.tsx</code> 结尾的文件。如果，同时设置 <code>files</code> 的优先级最高，<code>exclude</code> 次之，<code>include</code> 最低。</p>
<p>上面都是文件相关的，编译相关的都是靠 <code>compilerOptions</code> 设置的，接着就来看一看。</p>
<div class="table-wrap"><table>
<thead><tr>
<th>属性名</th>
<th>值类型</th>
<th>默认值</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>allowJs</td>
<td>boolean</td>
<td>false</td>
<td>编译时，允许有 js 文件</td>
</tr>
<tr>
<td>allowSyntheticDefaultImports</td>
<td>boolean</td>
<td>module === "system"</td>
<td>允许引入没有默认导出的模块</td>
</tr>
<tr>
<td>allowUnreachableCode</td>
<td>boolean</td>
<td>false</td>
<td>允许覆盖不到的代码</td>
</tr>
<tr>
<td>allowUnusedLabels</td>
<td>boolean</td>
<td>false</td>
<td>允许未使用的标签</td>
</tr>
<tr>
<td>alwaysStrict</td>
<td>boolean</td>
<td>false</td>
<td>严格模式，为每个文件添加 "use strict"</td>
</tr>
<tr>
<td>baseUrl</td>
<td>string</td>
<td> </td>
<td>与 <code>path</code> 一同定义模块查找的路径，详细参考<a href="http://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url" rel="nofollow noreferrer" target="_blank">这里</a>
</td>
</tr>
<tr>
<td>charset</td>
<td>string</td>
<td>"utf8"</td>
<td>输入文件的编码类型</td>
</tr>
<tr>
<td>checkJs</td>
<td>boolean</td>
<td>false</td>
<td>验证 js 文件，与 <code>allowJs</code> 一同使用</td>
</tr>
<tr>
<td>declaration</td>
<td>boolean</td>
<td>false</td>
<td>生成 <code>.d.ts</code> 定义文件</td>
</tr>
<tr>
<td>declarationDir</td>
<td>string</td>
<td> </td>
<td>生成定义文件的存放文件夹（2.0 以上）</td>
</tr>
<tr>
<td>diagnostics</td>
<td>boolean</td>
<td>false</td>
<td>是否显示诊断信息</td>
</tr>
<tr>
<td>downlevelIteration</td>
<td>boolean</td>
<td>false</td>
<td>当 <code>target</code> 为 ES5 或 ES3 时，提供对 <code>for..of</code>，解构等的支持</td>
</tr>
<tr>
<td>emitBOM</td>
<td>boolean</td>
<td>false</td>
<td>在输出文件头添加 utf-8 (BOM)字节标记</td>
</tr>
<tr>
<td>emitDecoratorMetadata</td>
<td>boolean</td>
<td>false</td>
<td>详见 <a href="https://github.com/Microsoft/TypeScript/issues/2577" rel="nofollow noreferrer" target="_blank">issue</a>
</td>
</tr>
<tr>
<td>experimentalDecorators</td>
<td>boolean</td>
<td>false</td>
<td>允许注解语法</td>
</tr>
<tr>
<td>forceConsistentCasingInFileNames</td>
<td>boolean</td>
<td>false</td>
<td>不允许不同变量来代表同一文件</td>
</tr>
<tr>
<td>importHelpers</td>
<td> </td>
<td>boolean</td>
<td>false</td>
<td>引入帮助（2.1 以上）</td>
</tr>
<tr>
<td>inlineSourceMap</td>
<td>boolean</td>
<td>false</td>
<td>将 source map 一同生成到输出文件中</td>
</tr>
<tr>
<td>inlineSources</td>
<td>boolean</td>
<td>false</td>
<td>将 ts 源码生成到 source map 中，需要同时设置 <code>inlineSourceMap</code> 或 <code>sourceMap</code>
</td>
</tr>
<tr>
<td>isolatedModules</td>
<td>boolean</td>
<td>false</td>
<td>将每个文件作为单独的模块</td>
</tr>
<tr>
<td>jsx</td>
<td>string</td>
<td>"preserve"</td>
<td>jsx 的<a href="http://www.typescriptlang.org/docs/handbook/jsx.html" rel="nofollow noreferrer" target="_blank">编译方式</a>
</td>
</tr>
<tr>
<td>jsxFactory</td>
<td>string</td>
<td>"React.createElement"</td>
<td>定义 jsx 工厂方法，<code>React.createElement</code> 还是 <code>h</code>（2.1 以上）</td>
</tr>
<tr>
<td>lib</td>
<td>string[]</td>
<td> </td>
<td>引入库定义文件，可以是["es5", "es6", "es2015", "es7", "es2016", "es2017", "esnext", "dom", "dom.iterable", "webworker", "scripthost", "es2015.core", "es2015.collection", "es2015.generator", "es2015.iterable", "es2015.promise", "es2015.proxy", "es2015.reflect", "es2015.symbol", "es2015.symbol.wellknown", "es2016.array.include", "es2017.object", "es2017.sharedmemory", "esnext.asynciterable"]（2.0 以上）</td>
</tr>
<tr>
<td>listEmittedFiles</td>
<td>boolean</td>
<td>false</td>
<td>显示输入文件名</td>
</tr>
<tr>
<td>listFiles</td>
<td>boolean</td>
<td>false</td>
<td>显示编译输出文件名</td>
</tr>
<tr>
<td>locale</td>
<td>string</td>
<td>随系统</td>
<td>错误信息的语言</td>
</tr>
<tr>
<td>mapRoot</td>
<td>string</td>
<td> </td>
<td>定义 source map 的存放位置</td>
</tr>
<tr>
<td>maxNodeModuleJsDepth</td>
<td>number</td>
<td>0</td>
<td>检查引入 js 模块的深度，需同 <code>allowJs</code> 一同使用</td>
</tr>
<tr>
<td>module</td>
<td>string</td>
<td> </td>
<td>指定模块生成方式，["commonjs", "amd", "umd", "system", "es6", "es2015", "esnext", "none"]</td>
</tr>
<tr>
<td>moduleResolution</td>
<td>string</td>
<td> </td>
<td>指定模块解析方式，["classic" : "node"]</td>
</tr>
<tr>
<td>newLine</td>
<td>string</td>
<td>随系统</td>
<td>行位换行符，"crlf" (windows) 或 "lf" (unix)</td>
</tr>
<tr>
<td>noEmit</td>
<td>boolean</td>
<td>false</td>
<td>不显示输出</td>
</tr>
<tr>
<td>noEmitHelpers</td>
<td>boolean</td>
<td>false</td>
<td>不在输出文件中生成帮助</td>
</tr>
<tr>
<td>noEmitOnError</td>
<td>boolean</td>
<td>false</td>
<td>出错后，不输出文件</td>
</tr>
<tr>
<td>noFallthroughCasesInSwitch</td>
<td>boolean</td>
<td>false</td>
<td>
<code>switch</code> 语句中，每个 <code>case</code> 都要有 <code>break</code>
</td>
</tr>
<tr>
<td>noImplicitAny</td>
<td>boolean</td>
<td>false</td>
<td>不允许隐式 <code>any</code>
</td>
</tr>
<tr>
<td>noImplicitReturns</td>
<td>boolean</td>
<td>false</td>
<td>函数所有路径都必须有显示 <code>return</code>
</td>
</tr>
<tr>
<td>noImplicitThis</td>
<td>boolean</td>
<td>false</td>
<td>不允许 <code>this</code> 为隐式 <code>any</code>
</td>
</tr>
<tr>
<td>noImplicitUseStrict</td>
<td>boolean</td>
<td>false</td>
<td>输出中不添加 "use strict"</td>
</tr>
<tr>
<td>noLib</td>
<td>boolean</td>
<td>false</td>
<td>不引入默认库文件</td>
</tr>
<tr>
<td>noResolve</td>
<td>boolean</td>
<td>false</td>
<td>不编译三斜杠或模块引入的文件</td>
</tr>
<tr>
<td>noUnusedLocals</td>
<td>boolean</td>
<td>false</td>
<td>未使用的本地变量将报错（2.0 以上）</td>
</tr>
<tr>
<td>noUnusedParameters</td>
<td>boolean</td>
<td>false</td>
<td>未使用的参数将报错（2.0 以上）</td>
</tr>
<tr>
<td>outDir</td>
<td>string</td>
<td> </td>
<td>定义输出文件的文件夹</td>
</tr>
<tr>
<td>outFile</td>
<td>string</td>
<td> </td>
<td>合并输出到一个文件</td>
</tr>
<tr>
<td>paths</td>
<td>object</td>
<td> </td>
<td>与 <code>baseUrl</code> 一同定义模块查找的路径，详细参考<a href="http://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url" rel="nofollow noreferrer" target="_blank">这里</a>
</td>
</tr>
<tr>
<td>preserveConstEnums</td>
<td>boolean</td>
<td>false</td>
<td>不去除枚举声明</td>
</tr>
<tr>
<td>pretty</td>
<td>boolean</td>
<td>false</td>
<td>美化错误信息</td>
</tr>
<tr>
<td>reactNamespace</td>
<td>string</td>
<td>"React"</td>
<td>废弃。改用<code>jsxFactory</code>
</td>
</tr>
<tr>
<td>removeComments</td>
<td>boolean</td>
<td>false</td>
<td>去除注释</td>
</tr>
<tr>
<td>rootDir</td>
<td>string</td>
<td>当前目录</td>
<td>定义输入文件根目录</td>
</tr>
<tr>
<td>rootDirs</td>
<td>string []</td>
<td> </td>
<td>定义输入文件根目录</td>
</tr>
<tr>
<td>skipDefaultLibCheck</td>
<td>boolean</td>
<td>false</td>
<td>废弃。改用 <code>skipLibCheck</code>
</td>
</tr>
<tr>
<td>skipLibCheck</td>
<td>boolean</td>
<td>false</td>
<td>对库定义文件跳过类型检查（2.0 以上）</td>
</tr>
<tr>
<td>sourceMap</td>
<td>boolean</td>
<td>false</td>
<td>生成对应的 map 文件</td>
</tr>
<tr>
<td>sourceRoot</td>
<td>string</td>
<td> </td>
<td>调试时源码位置</td>
</tr>
<tr>
<td>strict</td>
<td>boolean</td>
<td>false</td>
<td>同时开启 <code>alwaysStrict</code>, <code>noImplicitAny</code>, <code>noImplicitThis</code> 和 <code>strictNullChecks</code> (2.3 以上)</td>
</tr>
<tr>
<td>strictNullChecks</td>
<td>boolean</td>
<td>false</td>
<td>
<code>null</code> 检查（2.0 以上）</td>
</tr>
<tr>
<td>stripInternal</td>
<td>boolean</td>
<td>false</td>
<td>不输出 JSDoc 注解</td>
</tr>
<tr>
<td>suppressExcessPropertyErrors</td>
<td>boolean</td>
<td>false</td>
<td>不提示对象外属性错误</td>
</tr>
<tr>
<td>suppressImplicitAnyIndexErrors</td>
<td>boolean</td>
<td>false</td>
<td>不提示对象索引隐式 any 的错误</td>
</tr>
<tr>
<td>target</td>
<td>string</td>
<td>"es3"</td>
<td>输出代码 ES 版本，可以是 ["es3", "es5", "es2015", "es2016", "es2017", "esnext"]</td>
</tr>
<tr>
<td>traceResolution</td>
<td>boolean</td>
<td>false</td>
<td>跟踪模块查找信息</td>
</tr>
<tr>
<td>typeRoots</td>
<td>string []</td>
<td> </td>
<td>定义文件的文件夹位置（2.0 以上）</td>
</tr>
<tr>
<td>types</td>
<td>string []</td>
<td> </td>
<td>设置引入的定义文件（2.0 以上）</td>
</tr>
<tr>
<td>watch</td>
<td>boolean</td>
<td>false</td>
<td>监听文件变更</td>
</tr>
</tbody>
</table></div>
<p>一般情况下，tsconfig.json 文件只需配置 <code>compilerOptions</code> 部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;allowSyntheticDefaultImports&quot;: true,
    &quot;module&quot;: &quot;es2015&quot;,
    &quot;removeComments&quot;: true,
    &quot;preserveConstEnums&quot;: true,
    &quot;sourceMap&quot;: true,
    &quot;strict&quot;: true,
    &quot;target&quot;: &quot;es5&quot;,
    &quot;lib&quot;: [
      &quot;dom&quot;,
      &quot;es5&quot;,
      &quot;es2015&quot;
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="Json">{
  <span class="hljs-attr">"compilerOptions"</span>: {
    <span class="hljs-attr">"allowSyntheticDefaultImports"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"module"</span>: <span class="hljs-string">"es2015"</span>,
    <span class="hljs-attr">"removeComments"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"preserveConstEnums"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"sourceMap"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"strict"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-attr">"lib"</span>: [
      <span class="hljs-string">"dom"</span>,
      <span class="hljs-string">"es5"</span>,
      <span class="hljs-string">"es2015"</span>
    ]
  }
}</code></pre>
<p>其中，<code>allowSyntheticDefaultImports</code> 是使用 vue 必须的，而设置 <code>module</code> 则是让模块交由 webpack 处理，从而可以使用 webpack2 的摇树。另外，加上<code>allowJs</code>，这样就可以一点点将现有的 js 代码转换为 ts 代码了。</p>
<p>如果，你在 webpack 中设置过 <code>resolve</code> -&gt; <code>alias</code>，那么，在 ts config 中也需要通过 <code>baseUrl</code> + <code>path</code> 的方式来定义模块查找的方式。</p>
<p><a></a></p>
<h2 id="articleHeader3">Tslint</h2>
<p>同 js 一样，ts 也有自己的 lint —— <code>tslint</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i tslint tslint-loader -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="Bash" style="word-break: break-word; white-space: initial;">npm i tslint tslint-loader -S</code></pre>
<p>之前项目是通过 webpack 打包的，所以一并把 <code>tslint-loader</code> 也装上，并修改 webpack loader 的配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
    {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader'
    },
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> ...
    {
        test: <span class="hljs-regexp">/\.tsx?$/</span>,
        enforce: <span class="hljs-string">'pre'</span>,
        loader: <span class="hljs-string">'tslint-loader'</span>
    },
<span class="hljs-regexp">//</span> ...</code></pre>
<p>同时，在项目目录下添加 <code>tslint.json</code> 文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;tslint:recommended&quot;,
  &quot;rules&quot;: {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="JSON">{
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"tslint:recommended"</span>,
  <span class="hljs-attr">"rules"</span>: {
    // ...
  }
}</code></pre>
<p>有些<a href="https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts" rel="nofollow noreferrer" target="_blank">推荐的配置</a>和自己的习惯不太一样，可以通过 <code>rules</code> 去自定义（<a href="https://palantir.github.io/tslint/rules/" rel="nofollow noreferrer" target="_blank">查看所有规则</a>）。</p>
<p>tslint 默认都是警告类型，这样对做迁移也比较方便，也可以在配置中将提示类型从警告改为错误。</p>
<p>配置差不多完了，剩下就是码代码了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010641826" src="https://static.alili.tech/img/remote/1460000010641826" alt="" title="" style="cursor: pointer;"></span></p>
<p><a></a></p>
<h2 id="articleHeader4">Vue 中使用 typescript 需要注意的问题</h2>
<h3 id="articleHeader5">定义组件</h3>
<p><code>this</code> 在 vue 组件中非常常见，但 vue 组件的申明方式无法让 typescript 了解组件实例所包含的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default Vue.component('blog', {
    template,
    created() {
        this.loadBrowserSetting();
        this.loadNavList();
        this.loadSocialLink();
    },
    computed: mapGetters(['isDesktop', 'navList', 'socialLinkList', 'title']),
    methods: mapActions(['loadBrowserSetting', 'loadNavList', 'loadSocialLink']),
    watch: {
        'title': function() {
            setBlogTitle(this.title);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.component(<span class="hljs-string">'blog'</span>, {
    template,
    created() {
        <span class="hljs-keyword">this</span>.loadBrowserSetting();
        <span class="hljs-keyword">this</span>.loadNavList();
        <span class="hljs-keyword">this</span>.loadSocialLink();
    },
    <span class="hljs-attr">computed</span>: mapGetters([<span class="hljs-string">'isDesktop'</span>, <span class="hljs-string">'navList'</span>, <span class="hljs-string">'socialLinkList'</span>, <span class="hljs-string">'title'</span>]),
    <span class="hljs-attr">methods</span>: mapActions([<span class="hljs-string">'loadBrowserSetting'</span>, <span class="hljs-string">'loadNavList'</span>, <span class="hljs-string">'loadSocialLink'</span>]),
    <span class="hljs-attr">watch</span>: {
        <span class="hljs-string">'title'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            setBlogTitle(<span class="hljs-keyword">this</span>.title);
        }
    }
});</code></pre>
<p>所以，就需要通过继承 vue 提供的 <code>ComponentOptions</code> 接口来申明组件所用到的每个属性，比如 <code>methods</code>, <code>getter</code> 中的属性等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface IBlogContainer extends Vue {
    title: string;
    loadBrowserSetting: () => void;
    loadNavList: () => void;
    loadSocialLink: () => void;
}

export default Vue.component('blog', {
    template,
    created() {
        this.loadBrowserSetting();
        this.loadNavList();
        this.loadSocialLink();
    },
    computed: mapGetters(['isDesktop', 'navList', 'socialLinkList', 'title']),
    methods: mapActions(['loadBrowserSetting', 'loadNavList', 'loadSocialLink']),
    watch: {
        title() {
            setBlogTitle(this.title);
        },
    },
} as ComponentOptions<IBlogContainer>);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> IBlogContainer <span class="hljs-keyword">extends</span> Vue {
    title: <span class="hljs-built_in">string</span>;
    loadBrowserSetting: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;
    loadNavList: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;
    loadSocialLink: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.component(<span class="hljs-string">'blog'</span>, {
    template,
    created() {
        <span class="hljs-keyword">this</span>.loadBrowserSetting();
        <span class="hljs-keyword">this</span>.loadNavList();
        <span class="hljs-keyword">this</span>.loadSocialLink();
    },
    computed: mapGetters([<span class="hljs-string">'isDesktop'</span>, <span class="hljs-string">'navList'</span>, <span class="hljs-string">'socialLinkList'</span>, <span class="hljs-string">'title'</span>]),
    methods: mapActions([<span class="hljs-string">'loadBrowserSetting'</span>, <span class="hljs-string">'loadNavList'</span>, <span class="hljs-string">'loadSocialLink'</span>]),
    watch: {
        title() {
            setBlogTitle(<span class="hljs-keyword">this</span>.title);
        },
    },
} <span class="hljs-keyword">as</span> ComponentOptions&lt;IBlogContainer&gt;);</code></pre>
<p>看上去还不错？但这还不是最终的方案，可以更好，那就是一开始提到的 <a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a>。</p>
<p><code>vue-class-component</code> 既可以用于 ts，也能够用于 js。它都让你的组件定义文件变得相当清晰。将生命周期函数，<code>data</code>, <code>methods</code> 中的方法直接定义在 class 上，而将其他的组件 <code>options</code> 传入注解中就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    computed: mapGetters(['isDesktop', 'navList', 'socialLinkList', 'title']),
    methods: mapActions(['loadBrowserSetting', 'loadNavList', 'loadSocialLink']),
    template,
    watch: {
        title() {
            setBlogTitle((this as BlogContainer).title);
        },
    },
})
class BlogContainer extends Vue {
    public title: string;
    public loadBrowserSetting: () => void;
    public loadNavList: () => void;
    public loadSocialLink: () => void;

    public created() {
        this.loadBrowserSetting();
        this.loadNavList();
        this.loadSocialLink();
    }
}

export default Vue.component('blog', BlogContainer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-meta">@Component</span>({
    computed: mapGetters([<span class="hljs-string">'isDesktop'</span>, <span class="hljs-string">'navList'</span>, <span class="hljs-string">'socialLinkList'</span>, <span class="hljs-string">'title'</span>]),
    methods: mapActions([<span class="hljs-string">'loadBrowserSetting'</span>, <span class="hljs-string">'loadNavList'</span>, <span class="hljs-string">'loadSocialLink'</span>]),
    template,
    watch: {
        title() {
            setBlogTitle((<span class="hljs-keyword">this</span> <span class="hljs-keyword">as</span> BlogContainer).title);
        },
    },
})
<span class="hljs-keyword">class</span> BlogContainer <span class="hljs-keyword">extends</span> Vue {
    <span class="hljs-keyword">public</span> title: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">public</span> loadBrowserSetting: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-keyword">public</span> loadNavList: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;
    <span class="hljs-keyword">public</span> loadSocialLink: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">void</span>;

    <span class="hljs-keyword">public</span> created() {
        <span class="hljs-keyword">this</span>.loadBrowserSetting();
        <span class="hljs-keyword">this</span>.loadNavList();
        <span class="hljs-keyword">this</span>.loadSocialLink();
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.component(<span class="hljs-string">'blog'</span>, BlogContainer);</code></pre>
<p>需要注意的是，全局组件还是需要在最后调用 <code>Vue.component</code> 语法来声明一下。</p>
<h3 id="articleHeader6">服务器渲染组件服务器端获取数据</h3>
<p>Vue 服务器渲染会为某些需要动态获取数据的组件添加额外的方法，并在服务端接受到请求后调用，这个方法的名字可以是任意的（通常是 <code>preFetch</code> 或 <code>asyncData</code>）。同样的，它并没有在 vue 的定义文件中被定义，所以，需要各自去定义它。</p>
<p>在同一个项目中，组件获取数据的方法是相同的，所以可以扩展现有的 vue 的类型定义，而不用一遍遍的重复申明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vue.d.ts
import Vue from 'vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';

import { IRootState } from 'vuexModule/index';

declare global {
  interface Window {
    __INITIAL_STATE__: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    preFetch?: (store: Store<IRootState>, router?: VueRouter) => Promise<any>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-comment">// vue.d.ts</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { Store } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;

<span class="hljs-keyword">import</span> { IRootState } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuexModule/index'</span>;

<span class="hljs-keyword">declare</span> global {
  <span class="hljs-keyword">interface</span> Window {
    __INITIAL_STATE__: <span class="hljs-built_in">any</span>
  }
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> 'vue/types/options' {
  <span class="hljs-keyword">interface</span> ComponentOptions&lt;V <span class="hljs-keyword">extends</span> Vue&gt; {
    preFetch?: <span class="hljs-function">(<span class="hljs-params">store: Store&lt;IRootState&gt;, router?: VueRouter</span>) =&gt;</span> <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;
  }
}</code></pre>
<p>同样的方法也可以用来扩展浏览器的定义文件，比如一些尝试性的 API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// pwa.d.ts
interface ShareInfo {
    title: string,
    url?: string,
    text?: string
}

interface Navigator {
    readonly share: (o: ShareInfo) => Promise<void>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-comment">// pwa.d.ts</span>
<span class="hljs-keyword">interface</span> ShareInfo {
    title: <span class="hljs-built_in">string</span>,
    url?: <span class="hljs-built_in">string</span>,
    text?: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">interface</span> Navigator {
    readonly share: <span class="hljs-function">(<span class="hljs-params">o: ShareInfo</span>) =&gt;</span> <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
}</code></pre>
<p>再回到刚刚的组件服务器端获取数据。</p>
<p>众所周知，在使用 vuex 管理的系统获取数据通常使用的是调一个 action 方法，然而，action 将变动传递到 mutation。其中，action 需要接受一个对象作为参数，其中包含了 <code>commit</code> 和 <code>dispatch</code> 方法。在 Redux 中，这个参数是 store，但在 vue 中，它的类型是 <code>ActionContext&lt;S, R&gt;</code>。</p>
<p>同时，可以看到刚刚的 <code>preFetch</code> 方法的签名是 <code>store</code> 和 <code>router</code>。尽管，<code>store</code> 中也包含 <code>commit</code> 和 <code>dispatch</code> 方法，但它的类型是 <code>Store&lt;R&gt;</code>。这可以在原先的 js 中顺利运行，但在 ts 中，类型不同是会报错的。所以，这时你需要一个中间方法将传入的 <code>Store&lt;R&gt;</code> 类型转换为 <code>ActionContext&lt;S, R&gt;</code>。</p>
<p>这里推荐大家借鉴 <a href="https://github.com/istrib/vuex-typescript" rel="nofollow noreferrer" target="_blank">vuex-typescript</a> 中 <code>getStoreAccessors</code> 的实现方法。(自己写得不太好，不够通用，就不贴出来了)</p>
<h3 id="articleHeader7">服务端渲染永远返回新实例</h3>
<p>在之前一篇关于 <a href="https://discipled.me/posts/upgrade-ssr-of-vue" rel="nofollow noreferrer" target="_blank">vue 2.3 SSR 升级手册</a>中有提到过，</p>
<blockquote><p>因为 node 端服务启动后，vue 的实例就被初始化完成，所有的请求会公用这同一个实例，这就可能造成混乱。所以为每个请求返回一个新的 vue 的实例是一个比较好的处理方法，router 和 store 同样适用这个道理。</p></blockquote>
<p>的确，我也这样做了。但在这次升级过程中，我还是发现了原先的一个 bug，甚至可以说是大 issue。</p>
<p>先来看一眼，原先的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vuex/index.js
import modules from './module';

Vue.use(Vuex);

const createStore = () =>
    new Vuex.Store({
        modules,
        strict: true
    });

export default createStore;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// vuex/index.js</span>
<span class="hljs-keyword">import</span> modules <span class="hljs-keyword">from</span> <span class="hljs-string">'./module'</span>;

Vue.use(Vuex);

<span class="hljs-keyword">const</span> createStore = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
    <span class="hljs-keyword">new</span> Vuex.Store({
        modules,
        <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span>
    });

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createStore;</code></pre>
<p>是不是觉得没问题？返回的是一个方法，方法每次调用会返回一个新的 store 对象。的确！</p>
<p>继续看下去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vuex/module/index.js
import browser from './browser';
import home from './home';
import aboutMe from './about-me';
import post from './post';
import site from './site';
import tags from './tags';

export default {
    browser,
    site,
    aboutMe,
    home,
    post,
    tags
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// vuex/module/index.js</span>
<span class="hljs-keyword">import</span> browser <span class="hljs-keyword">from</span> <span class="hljs-string">'./browser'</span>;
<span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'./home'</span>;
<span class="hljs-keyword">import</span> aboutMe <span class="hljs-keyword">from</span> <span class="hljs-string">'./about-me'</span>;
<span class="hljs-keyword">import</span> post <span class="hljs-keyword">from</span> <span class="hljs-string">'./post'</span>;
<span class="hljs-keyword">import</span> site <span class="hljs-keyword">from</span> <span class="hljs-string">'./site'</span>;
<span class="hljs-keyword">import</span> tags <span class="hljs-keyword">from</span> <span class="hljs-string">'./tags'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    browser,
    site,
    aboutMe,
    home,
    post,
    tags
};</code></pre>
<p>是不是发现什么了？没错。问题就在于，<code>store</code> 的确是新的对象了，但 <code>modules</code> 因为是对象引用的关系，所以永远是同一个。以此类推，<code>modules</code> 下面的每个模块也有着同样的问题。</p>
<blockquote><p>记住：在服务器渲染中，总是通过方法返回新的实例。</p></blockquote>
<p><a></a></p>
<h2 id="articleHeader8">其他问题</h2>
<h3 id="articleHeader9">IDE</h3>
<p>首先，最直观的体会就是 webstorm 对 typescript 的支持非常差，代码提示做的还不错，但类型检测，错误提示等等可以说是几乎没有。而同是微软出品的 vscode，自然在这些方面都有着良好的表现。</p>
<blockquote><p>VScode，你值得拥有。</p></blockquote>
<p>PS：没用过的童鞋可以用一下试试，真的好用。（用下来除了 git 操作比 ws 用起来麻烦一点，其他都很棒，墙裂安利...）</p>
<h3 id="articleHeader10">引入 <code>.ts</code> 以外类型的文件</h3>
<p>在 webpack 中可以引入各式各样的文件，只要你装了相应的 loader，比如 <code>json</code>, <code>scss</code>, <code>jpg</code> 文件等等。但这些文件在 ts 里引入时，就有问题了，ts 的模块是无法理解这些文件的，ts 的模块只负责对 <code>.tsx?</code> 或 <code>.jsx?</code> 文件类型的编译。</p>
<p>这时可以添加一个定义文件来 hack 它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// support-loader.d.ts
declare module &quot;*.json&quot; {
    const value: any;
    export default value;
}

declare module &quot;*.html&quot; {
    const value: any;
    export default value;
}

declare module &quot;*.jpg&quot; {
    const value: any;
    export default value;
}
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-comment">// support-loader.d.ts</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> "*.json" {
    <span class="hljs-keyword">const</span> value: <span class="hljs-built_in">any</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> "*.html" {
    <span class="hljs-keyword">const</span> value: <span class="hljs-built_in">any</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> "*.jpg" {
    <span class="hljs-keyword">const</span> value: <span class="hljs-built_in">any</span>;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> value;
}
<span class="hljs-comment">// ...</span></code></pre>
<h3 id="articleHeader11"><code>process.env</code></h3>
<p>大家肯定很熟悉 <code>process.env</code> 这个变量，这里也就不多解释了。虽然大家都熟悉它，但 ts 不了解它，不知道它是什么类型，所以会报错。</p>
<p>遇到这个问题，可以通过安装 <code>@types/node</code> 来解决。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @types/node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="Bash" style="word-break: break-word; white-space: initial;">npm install @types/node</code></pre>
<p>Typescript 2.0 之后，ts 通过 npm 来安装类定义文件（@types）。</p>
<p>Ts 会默认读取项目下 node_modules 下面的 @types 中的类定义文件，也可以通过之前提到的 <code>tsconfig.json</code> 中的 <code>typeRoots</code> 和 <code>types</code> 属性就行修改。</p>
<p><code>typeRoots</code> 用于修改查找定义文件的位置，而 <code>types</code> 则是选择引入哪些定义文件，不填则默认不设限制，即 <code>typeRoots</code> 下所有定义文件。</p>
<h3 id="articleHeader12">export default 无法同 ES6 对象字面量增强同时使用</h3>
<p>ES6 中新增了一个特性是对象字面量的键可以为一个变量或一个表达式，像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    [key]: 'something'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">{
    [key]: <span class="hljs-string">'something'</span>
}</code></pre>
<p>当它同 ES 6 模块的默认导出同时使用时，<code>babel-loader</code> 工作正常，但在 <code>awesome-typescript-loader</code> 这里就出了问题。</p>
<blockquote><p>You may need an appropriate loader to handle this file type.</p></blockquote>
<p>直接 export 动态对象字面量就会报错，但将它们拆分开来就可以了。（不是很理解其中的原因，还望大神解惑）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// error...
export default {
    [SomeAction](state) { /* ... */ }
}

// compile success
const mutations = { [SomeAction](state) { /* ... */ } };

export default mutations;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// error...</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    [SomeAction](state) { <span class="hljs-comment">/* ... */</span> }
}

<span class="hljs-comment">// compile success</span>
<span class="hljs-keyword">const</span> mutations = { [SomeAction](state) { <span class="hljs-comment">/* ... */</span> } };

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mutations;</code></pre>
<blockquote><p>ps: <code>typescript</code> 版本为 2.4.1，<code>awesome-typescript-loader</code> 版本为 3.2.1。</p></blockquote>
<p>至此，客户端升级至 typescript 就完成了。（服务端因为类型定义的问题没有全部转换完成，还得再琢磨琢磨。）</p>
<p><a></a></p>
<h2 id="articleHeader13">最后</h2>
<p>总的来说，就如本文最初讲，ts 从数据类型、结构入手，通过静态类型检测来增强你代码的健壮性，从而避免 bug 的产生。</p>
<p>与此同时，vue 也有解决方案（<a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer" target="_blank">vue-class-component</a>）可以与 ts 结合得非常棒。</p>
<blockquote><p>首发于<a href="https://discipled.me/posts/vue-with-typescript" rel="nofollow noreferrer" target="_blank">个人博客</a>，<a href="https://discipled.me" rel="nofollow noreferrer" target="_blank">欢迎订阅</a>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue with TypeScript

## 原文链接
[https://segmentfault.com/a/1190000010641821](https://segmentfault.com/a/1190000010641821)

