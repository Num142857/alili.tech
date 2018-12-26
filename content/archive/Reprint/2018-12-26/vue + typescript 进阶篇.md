---
title: 'vue + typescript 进阶篇' 
date: 2018-12-26 2:30:14
hidden: true
slug: ygwajgirhd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue + typescript 进阶篇</h1>
<blockquote>
<p>本文是继 <a href="https://segmentfault.com/a/1190000011744210">Vue + TypeScript 新项目起手式</a> 之后的进阶+踩坑配置，所以推荐先行阅读前文  </p>
<p>完整阅读完之后，基本可以顺利在新项目中使用<code>vue</code> + <code>typescript</code> 了</p>
</blockquote>
<blockquote>
<p><strong>另外特别注意！！！</strong>  </p>
<p>不推荐在已有项目上强加 <code>typescript</code>， 因ts写法的组件跟之前的组件不兼容，若上的话需要修改之前写的组件</p>
</blockquote>
<p>配置完整版可参考 <a href="https://github.com/ws456999/vue-typescript-starter" rel="nofollow noreferrer" target="_blank">vue-typescript-starter</a>，若没配置出来，也可以对照修改配置</p>
<p><strong>直接进入正题：</strong></p>
<h2 id="articleHeader1">概览</h2>
<ul>
<li><p><code>ts</code> 支持 <code>render jsx</code> 写法</p></li>
<li><p><code>ts</code> 支持 <code>es6 / es67</code></p></li>
<li><p>配置 <code>vuex</code></p></li>
<li><p><code>vue</code> 识别全局方法/变量</p></li>
<li><p>支持 <code>mixin</code></p></li>
<li><p>支持 <code>ProvidePlugin</code> 的全局变量，比如 <code>lodash</code>的<code>_</code></p></li>
</ul>
<h2 id="articleHeader2">支持 render jsx 写法</h2>
<p><strong>这里一共分两步</strong></p>
<ol>
<li><p>首先得先让 <code>vue</code> 支持 <code>jsx</code> 写法</p></li>
<li><p>再让 <code>vue</code> 中的 <code>ts</code> 支持 <code>jsx</code> 写法</p></li>
</ol>
<h3 id="articleHeader3">让 vue 支持 jsx</h3>
<p>按照官方做法，安装<a href="https://github.com/vuejs/babel-plugin-transform-vue-jsx" rel="nofollow noreferrer" target="_blank">Babel 插件</a></p>
<p><span class="img-wrap"><img data-src="/img/bVX0ab?w=616&amp;h=329" src="https://static.alili.tech/img/bVX0ab?w=616&amp;h=329" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-es2015\
  --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">npm install\
  babel-plugin-syntax-jsx\
  babel-plugin-transform-vue-jsx\
  babel-helper-vue-jsx-merge-props\
  babel-preset-es2015\
  --save-dev</code></pre>
<p>在<code>.babelrc</code>中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>]
}</code></pre>
<p>之后就可以这些写<code>render</code>，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVX0ab?w=616&amp;h=329" src="https://static.alili.tech/img/bVX0ab?w=616&amp;h=329" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">让 ts 支持 jsx</h3>
<p>首先配置 webpack<br>找到<code>./build/webpack.base.conf.js</code></p>
<ul><li><p>找到<code>resolve.extensions</code> 里面加上<code>.tsx</code> 后缀</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  resolve: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.ts'</span>, <span class="hljs-string">'.tsx'</span>]
  }</code></pre>
<ul><li><p>找到<code>module.rules</code> 修改webpack对<code>.tsx</code> <code>.ts</code> 的解析</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  module: {
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
        // 如果之前按照起手式配置的同学，请替换配置
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: Object.assign(vueLoaderConfig, {
          loaders: {
            ts: &quot;ts-loader&quot;,
            tsx: &quot;babel-loader!ts-loader&quot;
          }
        })
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          &quot;babel-loader&quot;,
          {
            loader: &quot;ts-loader&quot;,
            options: { appendTsxSuffixTo: [/\.vue$/] }
          }
        ]
      },
      // 复制截止
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-built_in">module</span>: {
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
        <span class="hljs-comment">// 如果之前按照起手式配置的同学，请替换配置</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'tslint-loader'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-built_in">Object</span>.assign(vueLoaderConfig, {
          <span class="hljs-attr">loaders</span>: {
            <span class="hljs-attr">ts</span>: <span class="hljs-string">"ts-loader"</span>,
            <span class="hljs-attr">tsx</span>: <span class="hljs-string">"babel-loader!ts-loader"</span>
          }
        })
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.tsx?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">use</span>: [
          <span class="hljs-string">"babel-loader"</span>,
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"ts-loader"</span>,
            <span class="hljs-attr">options</span>: { <span class="hljs-attr">appendTsxSuffixTo</span>: [<span class="hljs-regexp">/\.vue$/</span>] }
          }
        ]
      },
      <span class="hljs-comment">// 复制截止</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)]
      },</code></pre>
<p>上面的配置，主要意思是 <code>vue</code> 文件识别<code>ts/tsx</code>代码的时候，先过一遍<code>ts-loader</code>，在过一遍<code>babel-loader</code>，我知道这听起来有点蠢，但是<code>jsx</code>不能不要对吧？</p>
<p>然后在 <code>tsconfig.json</code>中，添加对<code>jsx</code>的支持</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;compilerOptions&quot;: {
    &quot;jsx&quot;: &quot;preserve&quot;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-attr">"jsx"</span>: <span class="hljs-string">"preserve"</span>
    }</code></pre>
<p>之后就可以顺利在<code>.vue</code>单文件中的<code>ts</code>写<code>jsx</code>代码了，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVX0at?w=1110&amp;h=988" src="https://static.alili.tech/img/bVX0at?w=1110&amp;h=988" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>敲黑板，这里又有重点，使用 <code>jsx</code> 写法的话， 一定要使用 <code>.tsx</code>，不要用<code>.ts</code>了，切记！！！</p></blockquote>
<h2 id="articleHeader5">支持es6 / es7</h2>
<p>在 <code>tsconfig.json</code>中，添加对<code>es6 / es7</code>的支持，更多的配置请见<a href="https://tslang.cn/docs/handbook/compiler-options.html" rel="nofollow noreferrer" target="_blank">tsconfig - 编译选项</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;lib&quot;: [
      &quot;dom&quot;,
      &quot;es5&quot;,
      &quot;es6&quot;,
      &quot;es7&quot;,
      &quot;es2015.promise&quot;
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">    <span class="hljs-string">"lib"</span>: [
      <span class="hljs-string">"dom"</span>,
      <span class="hljs-string">"es5"</span>,
      <span class="hljs-string">"es6"</span>,
      <span class="hljs-string">"es7"</span>,
      <span class="hljs-string">"es2015.promise"</span>
    ]</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVX0a8?w=839&amp;h=619" src="https://static.alili.tech/img/bVX0a8?w=839&amp;h=619" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>不然的话，连<code>Object.assign</code> 这种最基本的函数也会在<code>ts</code>中报错，真的令人难过</p>
<h2 id="articleHeader6">配置 vuex</h2>
<p>这里就比较简单了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装依赖
npm i vuex vuex-class --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 安装依赖</span>
npm i vuex vuex-class --save</code></pre>
<ul>
<li><p><a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">vuex</a>：在 <code>vue</code> 中集中管理应用状态</p></li>
<li><p><a href="https://github.com/ktsn/vuex-class" rel="nofollow noreferrer" target="_blank">vuex-class</a> ：在 <code>vue-class-component</code> 写法中 绑定 <code>vuex</code></p></li>
</ul>
<p><code>Store</code>的配置跟原来一模一样，引用的时候有一点区别，下面的例子介绍了用法，应该一看便知，这里我不做赘述</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const ModuleGetter = namespace('path/to/module', Getter)

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @ModuleGetter('foo') moduleGetterFoo

  // If the argument is omitted, use the property name
  // for each state/getter/action/mutation type
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    this.stateFoo // -> store.state.foo
    this.stateBar // -> store.state.bar
    this.getterFoo // -> store.getters.foo
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
    this.moduleGetterFoo // -> store.getters['path/to/module/foo']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-class-component'</span>
<span class="hljs-keyword">import</span> {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-class'</span>

<span class="hljs-keyword">const</span> ModuleGetter = namespace(<span class="hljs-string">'path/to/module'</span>, Getter)

@Component
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  @State(<span class="hljs-string">'foo'</span>) stateFoo
  @State(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.bar) stateBar
  @Getter(<span class="hljs-string">'foo'</span>) getterFoo
  @Action(<span class="hljs-string">'foo'</span>) actionFoo
  @Mutation(<span class="hljs-string">'foo'</span>) mutationFoo
  @ModuleGetter(<span class="hljs-string">'foo'</span>) moduleGetterFoo

  <span class="hljs-comment">// If the argument is omitted, use the property name</span>
  <span class="hljs-comment">// for each state/getter/action/mutation type</span>
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created () {
    <span class="hljs-keyword">this</span>.stateFoo <span class="hljs-comment">// -&gt; store.state.foo</span>
    <span class="hljs-keyword">this</span>.stateBar <span class="hljs-comment">// -&gt; store.state.bar</span>
    <span class="hljs-keyword">this</span>.getterFoo <span class="hljs-comment">// -&gt; store.getters.foo</span>
    <span class="hljs-keyword">this</span>.actionFoo({ <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// -&gt; store.dispatch('foo', { value: true })</span>
    <span class="hljs-keyword">this</span>.mutationFoo({ <span class="hljs-attr">value</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// -&gt; store.commit('foo', { value: true })</span>
    <span class="hljs-keyword">this</span>.moduleGetterFoo <span class="hljs-comment">// -&gt; store.getters['path/to/module/foo']</span>
  }
}</code></pre>
<h2 id="articleHeader7">让 vue 识别全局方法/变量</h2>
<p>在项目中使用 ui 组件是很正常的操作</p>
<p>比如使用 <code>Element-uI</code>  的 <code>meesage</code>，用法如下图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.$message({
    message: '恭喜你，这是一条成功消息',
    type: 'success'
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">this</span>.$message({
    <span class="hljs-attr">message</span>: <span class="hljs-string">'恭喜你，这是一条成功消息'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'success'</span>
  })</code></pre>
<p>但是在配置了 <code>typescript</code>之后</p>
<p><span class="img-wrap"><img data-src="/img/bVX0bs?w=629&amp;h=54" src="https://static.alili.tech/img/bVX0bs?w=629&amp;h=54" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>那是因为 <code>$message</code>属性，并没有在  <code>vue</code>实例中声明</p>
<p>解决办法也非常简单，那我们就声明一下呗</p>
<p>在之前文章中创建的 <code>src/vue-shim.d.ts</code>文件中，增加如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 声明全局方法</span>
declare <span class="hljs-built_in">module</span> <span class="hljs-string">'vue/types/vue'</span> {
  interface Vue {
    <span class="hljs-attr">$Message</span>: any,
    <span class="hljs-attr">$Modal</span>: any
  }
}
</code></pre>
<p>这样，之后再使用this.$message()的话就不会报错了</p>
<h2 id="articleHeader8">支持 mixin</h2>
<p>我在<code>vue-property-decorator</code>里里外外找了好几圈，缺没有找到<code>mixin</code>这个修饰器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 如果全局mixin，那也太蠢了
 Vue.mixin( mixin )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code> <span class="hljs-comment">// 如果全局mixin，那也太蠢了</span>
 Vue.<span class="hljs-keyword">mixin</span>( <span class="hljs-keyword">mixin</span> )</code></pre>
<p>找非常多的 <code>ts + vue</code> 项目，但是没有找到我理想的<code>mixin</code>的方式，<br>那么就自己进行探索咯，下图是我自己使用的目前最佳<code>mixin</code>方式：</p>
<p>声明了一个mixin组件，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVX0bE?w=1048&amp;h=1492" src="https://static.alili.tech/img/bVX0bE?w=1048&amp;h=1492" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>其实就是我在<code>mixin</code>中声明了声明属性 / 方法，那么我就在<code>vue</code>实例中声明这个属性 / 方法</p>
<p>使用方式如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVX0bJ?w=1124&amp;h=302" src="https://static.alili.tech/img/bVX0bJ?w=1124&amp;h=302" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">支持 ProvidePlugin 的全局变量，比如 lodash 的 _</h2>
<p>如果我们在项目中有使用 <code>jquery，lodash</code> 这样的工具库的时候，肯定不希望在所有用到的地方都<code>import _ from ‘lodash’</code><br>@types/lodash</p>
<p>那我们就来配置一下：</p>
<p>首先还是在<code>webpack.base.conf.js</code> 中添加一个插件、并把这个 <code>vendor</code>拉出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  entry: {
    app: './src/main.ts',
    vendor: [
      &quot;lodash&quot;
    ]
  }

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
  entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.ts'</span>,
    <span class="hljs-attr">vendor</span>: [
      <span class="hljs-string">"lodash"</span>
    ]
  }

  plugins: [
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
      <span class="hljs-attr">_</span>: <span class="hljs-string">'lodash'</span>
    })
  ]</code></pre>
<p>上面的意思是，当模块使用这些变量的时候<code>wepback</code>会自动加载</p>
<p>然后，你需要告诉<code>eslint</code>这个 <code>_</code> 是全局的</p>
<p>在<code>.eslintrc.js</code>中添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  globals: {
    _: true
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  globals: {
    <span class="hljs-attr">_</span>: <span class="hljs-literal">true</span>
  },</code></pre>
<p>接下来，你还需要告诉<code>ts</code>这个 <code>_</code> 是全局的</p>
<p>在<code>vue-shim.d.ts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare global {
  const _: typeof lodash
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">declare global {
  <span class="hljs-keyword">const</span> _: <span class="hljs-keyword">typeof</span> lodash
}</code></pre>
<blockquote><p>如果没有上面这段声明，但是在 <code>ts</code> 中使用的话，会报如下的错误：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVX0bO?w=1598&amp;h=280" src="https://static.alili.tech/img/bVX0bO?w=1598&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个问题<a href="https://github.com/Microsoft/TypeScript/issues/10178" rel="nofollow noreferrer" target="_blank">Consider allowing access to UMD globals from modules · Issue #10178 · Microsoft/TypeScript · GitHub</a></p>
<p>有一个很简单的解释，就是害怕你全局声明的<code>_</code> 跟 <code>import _ from 'lodash'</code> 的行为不一致，这样的话，之后会留下隐患</p>
<p>到这里，本文的配置就到此结束</p>
<h2 id="articleHeader10">最后</h2>
<p>本文的这些配置都是在新项目开发中，一步步用血汗踩出来的</p>
<p>目测已经涵盖了大部分的使用问题，如果有其他的意见或建议的话，欢迎在本文下面评论~~</p>
<p>再发一次，配置完整版可参考 <a href="https://github.com/ws456999/vue-typescript-starter" rel="nofollow noreferrer" target="_blank">vue-typescript-starter</a>，若没配置出来，也可以对照修改配置</p>
<p>在刚上<code>typescript</code>的时候，我是拒绝的，嫌弃每个地方都要声明类型，不然就走不下去，但是如果让你们做以下一个选择题：</p>
<ul>
<li><p>在编译时发现问题</p></li>
<li><p>还是运行时发现问题</p></li>
</ul>
<p>我会毫不犹豫选择前者，这是ts强类型带给我最大的亮点</p>
<h2 id="articleHeader11">参考链接/推荐阅读</h2>
<ul>
<li><p><a href="https://tslang.cn/docs/handbook/compiler-options.html" rel="nofollow noreferrer" target="_blank">tsconfig配置</a></p></li>
<li><p><a href="https://juejin.im/post/59c46bc86fb9a00a4636f939" rel="nofollow noreferrer" target="_blank">TypeScript体系调研报告 - 掘金</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue + typescript 进阶篇

## 原文链接
[https://segmentfault.com/a/1190000011878086](https://segmentfault.com/a/1190000011878086)

