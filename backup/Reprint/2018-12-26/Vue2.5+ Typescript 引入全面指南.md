---
title: 'Vue2.5+ Typescript 引入全面指南' 
date: 2018-12-26 2:30:14
hidden: true
slug: bl64pl38epi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue2.5+ Typescript 引入全面指南</h1>
<p>系列目录：</p>
<ul>
<li>Vue2.5+ Typescript 引入全面指南</li>
<li><a href="https://segmentfault.com/a/1190000011864013">Vue2.5+ Typescript 引入全面指南 - Vuex篇</a></li>
</ul>
<h1 id="articleHeader1">写在前面</h1>
<p>写这篇文章时的我，Vue使用经验三个多月，Typescript完全空白，<br>花了大概三个晚上把手头项目迁移至Typescript，因此这篇文章更像个入门指引。</p>
<h1 id="articleHeader2">总原则</h1>
<p>两大原则：</p>
<h2 id="articleHeader3">最小依赖引入</h2>
<p>由于我个人从Javascript到Typescript的升级，更倾向于平滑顺移，因此，我对新依赖的引入整体保持克制原则，只引入了必要项，以尽量贴近原生vue写法：</p>
<ul>
<li><code>typescript</code></li>
<li><code>ts-loader</code></li>
</ul>
<p>以下依赖均未引入：</p>
<ul>
<li>
<code>vue-class-component</code>：官方维护，学习成本小，但与<code>vuex</code>融合性较差，计划等官方完善对<code>vuex</code>支持后再考虑引入</li>
<li>
<code>vue-property-decorator</code>：非官方维护，一定学习成本</li>
<li>
<code>vuex-class</code>：非官方维护，在 vue-class-component 基础上补充一定<code>vuex</code>支持（支持有限）</li>
<li>
<code>vuex-ts-decorators</code>/<code>vuex-typescript</code>等：非官方维护，学习成本极高</li>
</ul>
<blockquote>PS: 后总结，vue官方维护的 vue-class-component 还是很有必要引入的，文末有详细说明。<p>PS: <code>tslint-loader</code>由于对<code>vue</code>的支持尚不完美，作为可选项文末有详细说明。</p>
</blockquote>
<h2 id="articleHeader4">既然用了 Typescript，不到万不得已不用 any!</h2>
<p><code>any</code> 任意类型的存在，在我看来就是个潘多拉魔盒，一旦开启，很容易养成偷懒的习惯，碰到难题就上 <code>any</code>。因此，我的建议是，尽量不要去碰它，除非你无路可走。</p>
<h1 id="articleHeader5">Vue-cli 生成项目启用 Typescript</h1>
<blockquote>注：这里只介绍Webpack模板下使用。</blockquote>
<p><code>vue init webpack &lt;项目名称&gt;</code> 生成的项目需做如下改动以兼容 Typescript:</p>
<h2 id="articleHeader6">依赖安装</h2>
<p><code>npm i --save-dev typescript ts-loader</code> 安装必要依赖。推荐使用 npm 8及以上版本。</p>
<h2 id="articleHeader7">Webpack 配置</h2>
<p><code>./build/webpack.base.conf.js</code>，作如下改动：</p>
<ul><li>entry入口文件<code>main.js</code>改为<code>main.ts</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  app: './src/main.ts'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
  <span class="hljs-attribute">app</span>: <span class="hljs-string">'./src/main.ts'</span>
}</code></pre>
<ul><li>
<code>resolve.extensions</code>添加<code>.ts</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  extensions: ['.js', '.ts', '.vue', '.json']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
  <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>]
}</code></pre>
<ul><li>
<code>module.rules</code>添加<code>.ts</code>解析规则：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/]
      }
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  rules:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      test:</span> <span class="hljs-string">/\.tsx?$/,</span>
<span class="hljs-attr">      loader:</span> <span class="hljs-string">'ts-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      exclude:</span> <span class="hljs-string">/node_modules/,</span>
<span class="hljs-attr">      options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        appendTsSuffixTo:</span> <span class="hljs-string">[/\.vue$/]</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">]</span>
<span class="hljs-string">}</span></code></pre>
<h2 id="articleHeader8">tsconfig.json</h2>
<p>项目根路径下添加文件<code>tsconfig.json</code>，官方推荐配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tsconfig.json
{
  &quot;compilerOptions&quot;: {
    // 与 Vue 的浏览器支持保持一致
    &quot;target&quot;: &quot;es5&quot;,
    // 这可以对 `this` 上的数据属性进行更严格的推断
    &quot;strict&quot;: true,
    // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
    &quot;module&quot;: &quot;es2015&quot;,
    &quot;moduleResolution&quot;: &quot;node&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// tsconfig.json</span>
{
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-comment">// 与 Vue 的浏览器支持保持一致</span>
    <span class="hljs-string">"target"</span>: <span class="hljs-string">"es5"</span>,
    <span class="hljs-comment">// 这可以对 `this` 上的数据属性进行更严格的推断</span>
    <span class="hljs-string">"strict"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:</span>
    <span class="hljs-string">"module"</span>: <span class="hljs-string">"es2015"</span>,
    <span class="hljs-string">"moduleResolution"</span>: <span class="hljs-string">"node"</span>
  }
}</code></pre>
<h2 id="articleHeader9">vue-shim.d.ts</h2>
<p><code>src</code>目录下添加文件<code>vue-shim.d.ts</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module &quot;*.vue&quot; {
  import Vue from &quot;vue&quot;;
  export default Vue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> "*.vue" {
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue;
}</code></pre>
<p>意思是告诉TypeScript <code>*.vue</code>后缀的文件可以交给<code>vue</code>模块来处理。</p>
<h2 id="articleHeader10">.js 文件重命名为 .ts 文件</h2>
<p>从<code>src/main.js</code>开始，包括<code>src/router/index.js</code>等逐一从<code>.js</code>重命名为<code>.ts</code></p>
<blockquote>注意：重命名后对<code>vue</code>文件的<code>import</code>，需添加<code>.vue</code>后缀</blockquote>
<p>因为Typescript默认只识别<code>*.ts</code>文件，不识别<code>*.vue</code>文件</p>
<p>之前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from './App'
import HelloWorld from '@/components/HelloWorld'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span></code></pre>
<p>需改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from './App.vue'
import HelloWorld from '@/components/HelloWorld.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld.vue'</span></code></pre>
<h2 id="articleHeader11">.vue 文件改造</h2>
<p>要点：</p>
<ul>
<li>
<code>&lt;script&gt;</code>标签添加<code>lang="ts"</code>声明</li>
<li>使用<code>Vue.extend</code>定义组件</li>
</ul>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/HelloWorld.vue
<script lang=&quot;ts&quot;>
import Vue from 'vue'
export default Vue.extend({
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// src/components/HelloWorld.vue
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.extend({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>
    }
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader12">npm run dev</h2>
<p>至此运行项目，即可正常运行，vue对typescript的初步引入，基本完成。</p>
<h1 id="articleHeader13">TSLint</h1>
<p>2017-12-6更新：<br>当前（2017年12月），对<code>.vue</code>文件，VSCode编辑器的编辑时提示，有了一个非官方方案（官方进度见以下issue，仍均未解决），<a href="https://marketplace.visualstudio.com/items?itemName=prograhammer.tslint-vue" rel="nofollow noreferrer" target="_blank">TSLint Vue</a>。</p>
<p>简单讲，一<a href="https://github.com/prograhammer" rel="nofollow noreferrer" target="_blank">给力小哥</a> Fork 了 VSCode 官方的 <a href="https://marketplace.visualstudio.com/items?itemName=eg2.tslint" rel="nofollow noreferrer" target="_blank">TSLint插件</a>，添加了对 Vue 文件的支持。小哥更新蛮频繁的，基本上第一时间跟随官方插件的最新版，亲测可用。</p>
<p>使用方式：VSCode Plugin，关闭 TSLint，下载并启用 TSLint Vue即可：<br><span class="img-wrap"><img data-src="/img/bVZNvj?w=280&amp;h=112" src="https://static.alili.tech/img/bVZNvj?w=280&amp;h=112" alt="TSLint Vue Plugin" title="TSLint Vue Plugin" style="cursor: pointer;"></span></p>
<hr>
<p>当前（2017年11月），对<code>.vue</code>文件，可以在关闭<code>no-consecutive-blank-lines</code>检查前提下，开启构建时<code>TSLint</code>支持；至于VSCode编辑器的编辑时提示，完全没有。</p>
<p>详见TSLint的 <a href="https://github.com/palantir/tslint/issues/2099" rel="nofollow noreferrer" target="_blank">issue</a> 及vetur的 <a href="https://github.com/vuejs/vetur/issues/170" rel="nofollow noreferrer" target="_blank">issue</a></p>
<p>不幸的是，也不能拿<code>ESLint</code>将就用，不然一堆如下的Error等着你：<br><span class="img-wrap"><img data-src="/img/bVXTHZ?w=630&amp;h=340" src="https://static.alili.tech/img/bVXTHZ?w=630&amp;h=340" alt="Typescript ESLint Errors" title="Typescript ESLint Errors" style="cursor: pointer; display: inline;"></span></p>
<p>所以，只剩俩选择，要么关了，要么按照下面的配置将就着用：</p>
<ul><li>添加依赖</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i --save-dev tslint tslint-loader tslint-config-standard" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm i --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> tslint tslint-loader tslint-config-standard</code></pre>
<ul><li>
<code>module.rules</code>移除<code>eslint-loader</code>，添加<code>tslint-loader</code>预处理</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./build/webpack.base.conf.js
module: {
  rules: [
    // {
    //   test: /\.(js|vue)$/,
    //   enforce: 'pre',
    //   exclude: /node_modules/,
    //   use: {
    //     loader: 'eslint-loader',
    //     options: {
    //       formatter: require('eslint-friendly-formatter')
    //     }
    //   }
    // },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> .<span class="hljs-regexp">/build/</span>webpack.base.conf.js
module: {
  rules: [
    <span class="hljs-regexp">//</span> {
    <span class="hljs-regexp">//</span>   test: <span class="hljs-regexp">/\.(js|vue)$/</span>,
    <span class="hljs-regexp">//</span>   enforce: <span class="hljs-string">'pre'</span>,
    <span class="hljs-regexp">//</span>   exclude: <span class="hljs-regexp">/node_modules/</span>,
    <span class="hljs-regexp">//</span>   use: {
    <span class="hljs-regexp">//</span>     loader: <span class="hljs-string">'eslint-loader'</span>,
    <span class="hljs-regexp">//</span>     options: {
    <span class="hljs-regexp">//</span>       formatter: require(<span class="hljs-string">'eslint-friendly-formatter'</span>)
    <span class="hljs-regexp">//</span>     }
    <span class="hljs-regexp">//</span>   }
    <span class="hljs-regexp">//</span> },
    {
      test: <span class="hljs-regexp">/\.ts$/</span>,
      exclude: <span class="hljs-regexp">/node_modules/</span>,
      enforce: <span class="hljs-string">'pre'</span>,
      loader: <span class="hljs-string">'tslint-loader'</span>
    },
    {
      test: <span class="hljs-regexp">/\.vue$/</span>,
      loader: <span class="hljs-string">'vue-loader'</span>,
      options: vueLoaderConfig
    },
  ]
}</code></pre>
<ul><li>
<code>vue-loader</code>中开启<code>tslint-loader</code>选项：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./build/vue-loader.conf.js

const merge = require('webpack-merge')

module.exports = {
  loaders: merge(utils.cssLoaders({
      sourceMap: isProduction
        ? config.build.productionSourceMap
        : config.dev.cssSourceMap,
      extract: isProduction
    }), {
      ts: ['ts-loader', 'tslint-loader']
    }
  ),
  ... // 其他内容
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// ./build/vue-loader.conf.js</span>

<span class="hljs-keyword">const</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)

<span class="hljs-keyword">module</span>.exports = {
  loaders: merge(utils.cssLoaders({
      sourceMap: isProduction
        ? <span class="hljs-built_in">config</span>.build.productionSourceMap
        : <span class="hljs-built_in">config</span>.dev.cssSourceMap,
      extract: isProduction
    }), {
      ts: [<span class="hljs-string">'ts-loader'</span>, <span class="hljs-string">'tslint-loader'</span>]
    }
  ),
  ... <span class="hljs-comment">// 其他内容</span>
}</code></pre>
<ul><li>项目根路径下添加文件<code>tslint.json</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tslint.json
{
  &quot;extends&quot;: &quot;tslint-config-standard&quot;,
  &quot;globals&quot;: {
    &quot;require&quot;: true
  },
  &quot;rules&quot;: {
    &quot;no-consecutive-blank-lines&quot;: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// tslint.json</span>
{
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"tslint-config-standard"</span>,
  <span class="hljs-string">"globals"</span>: {
    <span class="hljs-string">"require"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-string">"rules"</span>: {
    <span class="hljs-string">"no-consecutive-blank-lines"</span>: <span class="hljs-literal">false</span>
  }
}</code></pre>
<p><code>no-consecutive-blank-lines</code> 关闭的解释 <a href="https://github.com/palantir/tslint/issues/2099#issuecomment-293972671" rel="nofollow noreferrer" target="_blank">见这里</a></p>
<p>简单翻译，<code>vue-loader</code>与<code>tslint-loader</code>结合使用，就像是把.vue文件里的<code>&lt;template&gt;</code>与<code>&lt;style&gt;</code>等非js内容全部置为了空行一样，为此，只能关闭此检查。</p>
<p>重新运行<code>npm run dev</code>，即可看到构建时可能输出的<code>tslint</code>警告（tslint默认级别warning，不阻断构建，如需error级别，可自行修改）<br><span class="img-wrap"><img data-src="/img/bVXTH2?w=426&amp;h=249" src="https://static.alili.tech/img/bVXTH2?w=426&amp;h=249" alt="Typescript TSLint Warning" title="Typescript TSLint Warning" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader14">vue-class-component 的必要性</h1>
<p>原生vue组件写法会导致一很烦的问题：</p>
<p><code>data()</code>如果如下形式定义数组，将会被推导为<code>[]never</code>类型:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default Vue.extend({
  data () {
    return {
      list: []  // type: []never
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.extend({
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-built_in">list</span>: []  <span class="hljs-comment">// type: []never</span>
    }
  }
})</code></pre>
<p>这样一来，此<code>array</code>直接废掉，因为不能往上附加值，只能如此提前声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default Vue.extend({
  data () {
    const list: string[] = []
    return {
      list: list
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.extend({
  data () {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">list</span>: <span class="hljs-built_in">string</span>[] = []
    <span class="hljs-keyword">return</span> {
      <span class="hljs-built_in">list</span>: <span class="hljs-built_in">list</span>
    }
  }
})</code></pre>
<p>而引入<code>vue-class-component</code>后的<code>class</code>写法，则可以一行搞定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script lang=&quot;ts&quot;>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  list: string[] = []

  hello () {
    list.push('Hello world')
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;script lang=<span class="hljs-string">"ts"</span>&gt;
<span class="hljs-keyword">import</span> <span class="hljs-type">Vue</span> from <span class="hljs-symbol">'vu</span>e'
<span class="hljs-keyword">import</span> <span class="hljs-type">Component</span> from <span class="hljs-symbol">'vue</span>-<span class="hljs-class"><span class="hljs-keyword">class</span><span class="hljs-title">-component</span>'</span>

<span class="hljs-meta">@Component</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  list: string[] = []

  hello () {
    list.push(<span class="hljs-symbol">'Hello</span> world')
  }
}
&lt;/script&gt;</code></pre>
<p>我个人是考虑到 <code>vue-class-component</code> 对 <code>vuex</code> 的 <code>mapState</code>, <code>mapGetters</code> 等函数支持较差，（可以借助<code>vuex-class</code>引用），再加<code>Decorators</code>并不是我对typescript的核心需求（<code>Interface</code>才是！），决定的暂缓引入，先不增加复杂度。</p>
<h1 id="articleHeader15">Vuex</h1>
<p>见文章 <a href="https://segmentfault.com/a/1190000011864013">Vue2.5+ Typescript 引入全面指南 - Vuex篇</a></p>
<h1 id="articleHeader16">完整代码</h1>
<p>见 Github 库：<a href="https://github.com/qidaizhe11/vue-vuex-typescript-demo" rel="nofollow noreferrer" target="_blank">vue-vuex-typescript-demo</a>，<code>master</code> 分支为整合 <code>vuex</code> 示例，<code>basic</code> 分支为不含 <code>vuex</code> 的基础示例。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.5+ Typescript 引入全面指南

## 原文链接
[https://segmentfault.com/a/1190000011853167](https://segmentfault.com/a/1190000011853167)

