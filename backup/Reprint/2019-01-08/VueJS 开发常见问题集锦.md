---
title: 'VueJS 开发常见问题集锦' 
date: 2019-01-08 2:30:11
hidden: true
slug: 7ph1qs97kc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVFgor?w=1280&amp;h=720" src="https://static.alili.tech/img/bVFgor?w=1280&amp;h=720" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>由于公司的前端开始转向 <code>VueJS</code>，最近开始使用这个框架进行开发，遇到一些问题记录下来，以备后用。</p>
<p>主要写一些 <strong><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">官方手册</a></strong> 上没有写，但是实际开发中会遇到的问题，需要一定知识基础。</p>
<hr>
<h3 id="articleHeader0">涉及技术栈</h3>
<ul>
<li>CLI: <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">Vue-CLI</a>
</li>
<li>UI: <a href="http://element.eleme.io/" rel="nofollow noreferrer" target="_blank">Element</a>
</li>
<li>HTML: <a href="https://pugjs.org/" rel="nofollow noreferrer" target="_blank">Pug(Jade)</a>
</li>
<li>CSS: <a href="http://lesscss.org/" rel="nofollow noreferrer" target="_blank">Less</a>
</li>
<li>JavaScript: <a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer" target="_blank">ES6</a>
</li>
</ul>
<hr>
<p><strong>正文：</strong></p>
<h3 id="articleHeader1">polyfill 与 transform-runtime</h3>
<p>　　首先，<code>vue-cli</code> 为我们自动添加了 <code>babel-plugin-transform-runtime</code> 这个插件，该插件多数情况下都运作正常，可以转换大部分 <code>ES6</code> 语法。</p>
<p>　　但是，存在如下两个问题：</p>
<ol>
<li><strong>异步加载组件时，会产生 <code>polyfill</code> 代码冗余</strong></li>
<li><strong>不支持对全局函数与实例方法的 <code>polyfill</code></strong></li>
</ol>
<p>　　两个问题的原因均归因于 <code>babel-plugin-transform-runtime</code> 采用了沙箱机制来编译我们的代码（即：不修改宿主环境的内置对象）。</p>
<p>　　由于异步组件最终会被编译为一个单独的文件，所以即使多个组件中使用了同一个新特性（例如：<code>Object.keys()</code>），那么在每个编译后的文件中都会有一份该新特性的 <code>polyfill</code> 拷贝。如果项目较小可以考虑不使用异步加载，但是首屏的压力会比较大。</p>
<p>　　<strong>不支持全局函数</strong>（如：<code>Promise</code>、<code>Set</code>、<code>Map</code>），<code>Set</code> 跟 <code>Map</code> 这两种数据结构应该大家用的也不多，影响较小。但是 <code>Promise</code> 影响可能就比较大了。</p>
<p>　　<strong>不支持实例方法</strong>（如：<code>'abc'.includes('b')</code>、<code>['1', '2', '3'].find((n) =&gt; n &lt; 2)</code> 等等），这个限制几乎废掉了大部分字符串和一半左右数组的新特性。</p>
<blockquote><p>一般情况下 <code>babel-plugin-transform-runtime</code> 能满足大部分的需求，当不满足需求时，推荐使用完整的 <code>babel-polyfill</code>。</p></blockquote>
<h4>替换 babel-polyfill</h4>
<p>　　首先，从项目中移除 <code>babel-plugin-transform-runtime</code><br>　　卸载该依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm un babel-plugin-transform-runtime -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm un babel-plugin-transform-runtime -D</code></pre>
<p>　　修改 <code>babel</code> 配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
  //...
  &quot;plugins&quot;: [
    // - &quot;transform-runtime&quot;
  ]
  //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// .babelrc</span>
{
  <span class="hljs-comment">//...</span>
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-comment">// - "transform-runtime"</span>
  ]
  <span class="hljs-comment">//...</span>
}</code></pre>
<p>　　然后，安装 <code>babel-polyfill</code> 依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-polyfill -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm i babel-polyfill -D</code></pre>
<p>　　最后，在入口文件中导入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js
import 'babel-polyfill'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/main.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span></code></pre>
<h3 id="articleHeader2">ES6 import 引用问题</h3>
<p>　　在 <code>ES6</code> 中，模块系统的导入与导出采用的是引用导出与导入（非简单数据类型），也就是说，如果在一个模块中定义了一个对象并导出，在其他模块中导入使用时，导入的其实是一个变量引用（指针），如果修改了对象中的属性，会影响到其他模块的使用。</p>
<p>　　通常情况下，系统体量不大时，我们可以使用 <code>JSON.parse(JSON.stringify(str))</code> 简单粗暴地来生成一个全新的深度拷贝的 <strong>数据对象</strong>。不过当组件较多、数据对象复用程度较高时，很明显会产生性能问题，这时我们可以考虑使用 <a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">Immutable.js</a>。</p>
<blockquote><p>鉴于这个原因，进行复杂数据类型的导出时，需要注意多个组件导入同一个数据对象时修改数据后可能产生的问题。<br>此外，模块定义变量或函数时即便使用 <code>let</code> 而不是 <code>const</code>，在导入使用时都会变成只读，不能重新赋值，效果等同于用 <code>const</code> 声明。</p></blockquote>
<h3 id="articleHeader3">在 Vue 中使用 Pug 与 Less</h3>
<h4>安装依赖</h4>
<p>　　<code>Vue</code> 中使用 <code>vue-loader</code> 根据 <code>lang</code> 属性自动判断所需要的 <code>loader</code>，所以不用额外配置 <code>Loader</code>，但是需要手动安装相关依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i pug -D
npm i less-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm i pug -D
npm i less-loader -D</code></pre>
<p>还是相当方便的，不用手动修改 <code>webpack</code> 的配置文件添加 <code>loader</code> 就可以使用了</p>
<blockquote><p>使用 <code>pug</code> 还是 <code>pug-loader</code>？<code>sass</code> 两种语法的 <code>loader</code> 如何设置？<br>--- 请参考 <a href="https://vue-loader.vuejs.org/zh-cn/configurations/pre-processors.html" rel="nofollow noreferrer" target="_blank">预处理器 · vue-loader</a></p></blockquote>
<h4>使用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- xxx.vue -->
<style lang=&quot;less&quot;>
  .action {
    color: #ddd;
      ul {
        overflow: hidden;
        li {
          float: left;
        }
      }
  }
</style>
<template lang=&quot;pug&quot;>
  .action(v-if='hasRight')
    ul
      li 编辑
      li 删除
</template>
<script>
  export default {
    data () {
      return {
        hasRight: true
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- xxx.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
  .action {
    color: #ddd;
      ul {
        overflow: hidden;
        li {
          float: left;
        }
      }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"pug"</span>&gt;</span>
  .action(v-if='hasRight')
    ul
      li 编辑
      li 删除
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">hasRight</span>: <span class="hljs-literal">true</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader4">定义全局函数或变量</h3>
<p>　　许多时候我们需要定义一些全局函数或变量，来处理一些频繁的操作（这里拿 <code>AJAX</code> 的异常处理举例说明）。但是在 <code>Vue</code> 中，每一个单文件组件都有一个独立的上下文（<code>this</code>）。通常在异常处理中，需要在视图上有所体现，这个时候我们就需要访问 <code>this</code> 对象，但是全局函数的上下文通常是 <code>window</code>，这时候就需要一些特殊处理了。</p>
<h4>简单粗暴型</h4>
<p>　　最简单的方法就是直接在 <code>window</code> 对象上定义一个全局方法，在组件内使用的时候用 <code>bind</code>、<code>call</code> 或 <code>apply</code> 来改变上下文。</p>
<p>　　定义一个全局异常处理方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// errHandler.js
window.errHandler = function () { // 不能使用箭头函数
  if (err.code &amp;&amp; err.code !== 200) {
    this.$store.commit('err', true)
  } else {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// errHandler.js</span>
<span class="hljs-built_in">window</span>.errHandler = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 不能使用箭头函数</span>
  <span class="hljs-keyword">if</span> (err.code &amp;&amp; err.code !== <span class="hljs-number">200</span>) {
    <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'err'</span>, <span class="hljs-literal">true</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>　　在入口文件中导入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js
import 'errHandler.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/main.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'errHandler.js'</span></code></pre>
<p>　　在组件中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// xxx.vue
export default {
  created () {
    this.errHandler = window.errHandler.bind(this)
  },
  method: {
    getXXX () {
      this.$http.get('xxx/xx').then(({ body: result }) => {
        if (result.code === 200) {
          // ...
        } else {
          this.errHandler(result)
        }
      }).catch(this.errHandler)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// xxx.vue</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  created () {
    <span class="hljs-keyword">this</span>.errHandler = <span class="hljs-built_in">window</span>.errHandler.bind(<span class="hljs-keyword">this</span>)
  },
  <span class="hljs-attr">method</span>: {
    getXXX () {
      <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'xxx/xx'</span>).then(<span class="hljs-function">(<span class="hljs-params">{ body: result }</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (result.code === <span class="hljs-number">200</span>) {
          <span class="hljs-comment">// ...</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.errHandler(result)
        }
      }).catch(<span class="hljs-keyword">this</span>.errHandler)
    }
  }
}</code></pre>
<h4>优雅安全型</h4>
<p>　　在大型多人协作的项目中，污染 <code>window</code> 对象还是不太妥当的。特别是一些比较有个人特色的全局方法（可能在你写的组件中几乎处处用到，但是对于其他人来说可能并不需要）。这时候推荐写一个模块，更优雅安全，也比较自然，唯一不足之处就是每个需要使用该函数或方法的组件都需要进行导入。</p>
<p>　　使用方法与前一种大同小异，就不多作介绍了。￣ω￣=</p>
<h3 id="articleHeader5">Moment.JS 与 Webpack</h3>
<p>　　在使用 <code>Moment.js</code> 遇到一些问题，发现最终打包的文件中将 <code>Moment.js</code> 的全部语言包都打包了，导致最终文件徒然增加 100+kB。查了一下，发现可能是 <code>webpack</code> 打包或是 <code>Moment.js</code> 资源引用问题（?），目前该问题还未被妥善处理，需要通过一些 <code>trick</code> 来解决这个问题。</p>
<p>　　在 <code>webpack</code> 的生产配置文件中的 <code>plugins</code> 字段中添加一个插件，使用内置的方法类 <a href="https://webpack.js.org/plugins/context-replacement-plugin/" rel="nofollow noreferrer" target="_blank">ContextReplacementPlugin</a> 过滤掉 <code>Moment.js</code> 中那些用不到的语言包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// build/webpack.prod.conf.js
new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// build/webpack.prod.conf.js</span>
<span class="hljs-keyword">new</span> webpack.ContextReplacementPlugin(<span class="hljs-regexp">/moment[\\/]locale$/</span>, /^\.\/(zh-cn)$/)</code></pre>
<blockquote><p>解决方案采自 <a href="https://github.com/webpack/webpack/issues/3128#issuecomment-291790964" rel="nofollow noreferrer" target="_blank">oleg-nogin@webpack/webpack#3128</a>。<br>问题讨论详见 GitHub Issue: <a href="https://github.com/moment/moment/issues/2373" rel="nofollow noreferrer" target="_blank">moment/moment#2373</a>、<a href="https://github.com/webpack/webpack/issues/3128" rel="nofollow noreferrer" target="_blank">webpack/webpack#3128</a>。</p></blockquote>
<h3 id="articleHeader6">自定义路径别名</h3>
<p>　　可能有些人注意到了，在 <code>vue-cli</code> 生成的模板中在导入组件时使用了这样的语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Index from '@/components/Index'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Index'</span></code></pre>
<p>　　这个 <code>@</code> 是什么东西？后来改配置文件的时候发现这个是 <code>webpack</code> 的配置选项之一：路径别名。</p>
<p>　　我们也可以在基础配置文件中添加自己的路径别名，比如下面这个就把 <code>~</code> 设置为路径 <code>src/components</code> 的别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// build/webpack.base.js
{
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('src/components')
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// build/webpack.base.js</span>
{
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
      <span class="hljs-string">'~'</span>: resolve(<span class="hljs-string">'src/components'</span>)
    }
  }
}</code></pre>
<p>　　然后我们导入组件的时候就可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import YourComponent from 'YourComponent'
// import YourComponent from './YourComponent'
// import YourComponent from '../YourComponent'
// import YourComponent from '/src/components/YourComponent'
import YourComponent from '~/YourComponent'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// import YourComponent from 'YourComponent'</span>
<span class="hljs-comment">// import YourComponent from './YourComponent'</span>
<span class="hljs-comment">// import YourComponent from '../YourComponent'</span>
<span class="hljs-comment">// import YourComponent from '/src/components/YourComponent'</span>
<span class="hljs-keyword">import</span> YourComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'~/YourComponent'</span></code></pre>
<p>　　既解决了路径过长的麻烦，又解决了相对路径的烦恼，方便很多吧！ヾ(ﾟ∀ﾟゞ)</p>
<h3 id="articleHeader7">CSS 作用域与模块</h3>
<h4>组件内样式</h4>
<p>　　通常，组件中 <code>&lt;style&gt;&lt;/style&gt;</code> 标签里的样式是全局的，在使用第三方 UI 库（如：<code>Element</code>）时，全局样式很可能影响 UI 库的样式。</p>
<p>　　我们可以通过添加 <code>scoped</code> 属性来使 <code>style</code> 中的样式只作用于当前组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;less&quot; scoped>
  @import 'other.less';
  .title {
    font-size: 1.2rem;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">import</span> <span class="hljs-string">'other.less'</span>;
  <span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.2rem</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<blockquote>
<p>在有 <code>scoped</code> 属性的 <code>style</code> 标签内导入其他样式，同样会受限于作用域，变为组件内样式。复用程度较高的样式不建议这样使用。</p>
<p>另，在组件内样式中应避免使用元素选择器，原因在于元素选择器与属性选择器组合时，性能会大大降低。</p>
<p>--- 两种组合选择器的测试：<a href="http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&amp;sel=.class%5Bclass%5E%3D%27class%27%5D&amp;body=background%3A+%23CFD&amp;ne=1000" rel="nofollow noreferrer" target="_blank">classes selector</a>，<a href="http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&amp;sel=a%5Bclass%5E%3D%27class%27%5D&amp;body=background%3A+%23CFD&amp;ne=1000" rel="nofollow noreferrer" target="_blank">elements selector</a></p>
</blockquote>
<h4>导入样式</h4>
<p>　　相对于 <code>style</code> 使用 <code>scoped</code> 属性时的组件内样式，有时候我们也需要添加一些全局样式。当然我们可以用没有 <code>scoped</code> 属性的 <code>style</code> 来写全局样式。</p>
<p>　　但是相比较，更推荐下面这种写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 单独的全局样式文件 */
/* style-global.less */
body {
  font-size: 10px;
}
.title {
  font-size: 1.4rem;
  font-weight: bolder;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 单独的全局样式文件 */</span>
<span class="hljs-comment">/* style-global.less */</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.title</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.4rem</span>;
  <span class="hljs-attribute">font-weight</span>: bolder;
}</code></pre>
<p>　　然后在入口文件中导入全局样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js
import 'style-global.less'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/main.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'style-global.less'</span></code></pre>
<h3 id="articleHeader8">获取表单控件值</h3>
<p>　　通常我们可以直接使用 <code>v-model</code> 将表单控件与数据进行绑定，但是有时候我们也会需要在用户输入的时候获取当前值（比如：实时验证当前输入控件内容的有效性）。</p>
<p>　　这时我们可以使用 <code>@input</code> 或 <code>@change</code> 事件绑定我们自己的处理函数，并传入 <code>$event</code> 对象以获取当前控件的输入值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type='text' @change='change($event)'>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'text'</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">'change($event)'</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="change (e) {
  let curVal = e.target.value
  if (/^\d+$/.test(curVal)) {
    this.num = +curVal
  } else {
    console.error('%s is not a number!', curVal)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">change (e) {
  <span class="hljs-keyword">let</span> curVal = e.target.value
  <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^\d+$/</span>.test(curVal)) {
    <span class="hljs-keyword">this</span>.num = +curVal
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'%s is not a number!'</span>, curVal)
  }
}</code></pre>
<blockquote><p>当然，如果 UI 框架采用 <code>Element</code> 会更简单，它的事件回调会直接传入当前值。</p></blockquote>
<h3 id="articleHeader9">v-for 的使用 tips</h3>
<p>　　<code>v-for</code> 指令很强大，它不仅可以用来遍历数组、对象，甚至可以遍历一个数字或字符串。</p>
<p>　　基本语法就不讲了，这里讲个小 tips：</p>
<h4>索引值</h4>
<p>　　在使用 <code>v-for</code> 根据对象或数组生成 <code>DOM</code> 时，有时候需要知道当前的索引。我们可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li v-for='(item, key) in items' :key='key'> "{{" key "}}" - "{{" item "}}"
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">'(item, key) in items'</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">'key'</span>&gt;</span> "{{" key "}}" - "{{" item "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>　　<strong>但是</strong>，在遍历数字的时候需要注意，数字的 <code>value</code> 是从 1 开始，而 <code>key</code> 是从 0 开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li v-for='(v, k) in 3' :key='k'> "{{" k "}}"-"{{" v "}}" 
  <!-- output to be 0-1, 1-2, 2-3 -->
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">'(v, k) in 3'</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">'k'</span>&gt;</span> "{{" k "}}"-"{{" v "}}" 
  <span class="hljs-comment">&lt;!-- output to be 0-1, 1-2, 2-3 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<blockquote><p><code>2.2.0+</code> 的版本里，当在组件中使用 <code>v-for</code> 时，<code>key</code> 现在是必须的。</p></blockquote>
<h3 id="articleHeader10">模板的唯一根节点</h3>
<p>　　与 <code>JSX</code> 相同，组件中的模板只能有一个根节点，即下面这种写法是 <strong>错误</strong> 的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <h1>Title</h1>
  <article>Balabala...</article>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>Balabala...<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>　　我们需要用一个块级元素把他包裹起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>Title</h1>
    <article>Balabala...</article>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>Balabala...<span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<blockquote><p>原因参考：<a href="//blog.beard.ink/JavaScript/React-" rel="nofollow noreferrer">React-小记：组件开发注意事项#唯一根节点</a></p></blockquote>
<h3 id="articleHeader11">项目路径配置</h3>
<p>　　由于 <code>vue-cli</code> 配置的项目提供了一个内置的静态服务器，在开发阶段基本不会有什么问题。但是，当我们把代码放到服务器上时，经常会遇到静态资源引用错误，导致界面一片空白的问题。</p>
<p>　　这是由于 <code>vue-cli</code> 默认配置的 <code>webpack</code> 是以站点根目录引用的文件，然而有时候我们可能需要把项目部署到子目录中。</p>
<p>　　我们可以通过 <code>config/index.js</code> 来修改文件引用的相对路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  build.assetsSubDirectory: 'static'
  build.assetsPublicPath: '/'

  dev.assetsSubDirectory: 'static'
  dev.assetsPublicPath: '/'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  build.assetsSubDirectory: <span class="hljs-string">'static'</span>
  build.assetsPublicPath: <span class="hljs-string">'/'</span>

  dev.assetsSubDirectory: <span class="hljs-string">'static'</span>
  dev.assetsPublicPath: <span class="hljs-string">'/'</span></code></pre>
<p>　　我们可以看到导出对象中 <code>build</code> 与 <code>dev</code> 均有 <code>assetsSubDirectory</code>、<code>assetsPublicPath</code> 这两个属性。</p>
<p>　　其中 <strong>assetsSubDirectory</strong> 指静态资源文件夹，也就是打包后的　<code>js</code>、<code>css</code>、图片等文件所放置的文件夹，这个默认一般不会有问题。</p>
<p>　　<strong>assetsPublicPath</strong> 指静态资源的引用路径，默认配置为 <code>/</code>，即网站根目录，与 <strong>assetsSubDirectory</strong> 组合起来就是完整的静态资源引用路径 <code>/static</code>。</p>
<p>　　写到这里解决方法已经很明显了，只要把根目录改为相对目录就好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  build.assetsSubDirectory: 'static'
  build.assetsPublicPath: './'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  build.assetsSubDirectory: <span class="hljs-string">'static'</span>
  build.assetsPublicPath: <span class="hljs-string">'./'</span></code></pre>
<p>　　没错！就是一个 <code>.</code> 的问题。ㄟ( ▔, ▔ )ㄏ</p>
<h3 id="articleHeader12">更小的 Polyfill 开销</h3>
<p>　　在引入 <code>Polyfill</code> 之后，可以在 <code>.babelrc</code> 文件中开启 <code>useBulitIns</code> 属性。启用该属性后，编译项目时会根据项目中新特性的使用情况将完整的 <code>polyfill</code> 拆分成独立的模块序列。<br>　　启用 <code>useBuiltIns</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // .babelrc
  {
    &quot;presets&quot;: [
      [&quot;env&quot;, {
        &quot;modules&quot;: false,
        &quot;useBuiltIns&quot;: true
      }],
      &quot;es2015&quot;,
      &quot;stage-2&quot;
    ]
    // ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// .babelrc</span>
  {
    <span class="hljs-string">"presets"</span>: [
      [<span class="hljs-string">"env"</span>, {
        <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-string">"useBuiltIns"</span>: <span class="hljs-literal">true</span>
      }],
      <span class="hljs-string">"es2015"</span>,
      <span class="hljs-string">"stage-2"</span>
    ]
    <span class="hljs-comment">// ...</span>
  }</code></pre>
<p>　　安装后引入 <code>babel-polyfill</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // src/main.js
  import 'babel-polyfill'

  [1, 2, 3].find((v => v > 2))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// src/main.js</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>

  [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].find((<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v &gt; <span class="hljs-number">2</span>))</code></pre>
<p>启用 <code>useBulitIns</code> 后自动拆分 <code>babel-polyfill</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import 'core-js/modules/es6.array.find'

  [1, 2, 3].find((v => v > 2))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">import</span> <span class="hljs-string">'core-js/modules/es6.array.find'</span>

  [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].find((<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v &gt; <span class="hljs-number">2</span>))</code></pre>
<blockquote><p>经测试最大减少了一半左右的 <code>polyfill</code> 体积<br>没深入研究哈，猜测可能加了 <code>core-js</code> 跟一些基础的 <code>polyfill</code></p></blockquote>
<h3 id="articleHeader13">使用 ESnext class 特性</h3>
<h4>对比</h4>
<p>　　默认时，<code>Vue</code> 单文件组件使用一个对象来描述组件内部的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const App = {
    // initialized data
    data () {
      return {
        init: false
      }
    }
    // lifecycle hook
    created () {}
    mounted () {}
    // ...
  }

  export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">const</span> App = {
    <span class="hljs-comment">// initialized data</span>
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">init</span>: <span class="hljs-literal">false</span>
      }
    }
    <span class="hljs-comment">// lifecycle hook</span>
    created () {}
    mounted () {}
    <span class="hljs-comment">// ...</span>
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre>
<p>　　我们可以通过安装一些依赖来支持最新的 <code>class</code> 写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  class App extends Vue {
    init = false;
    created () {}
    mounted () {}
  }

  export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
  <span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-class-component'</span>

  @Component
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
    init = <span class="hljs-literal">false</span>;
    created () {}
    mounted () {}
  }

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre>
<blockquote><p>不可否认，确实多些了一些代码哈，不过个人还是比较倾向新语法特性的写法的，毕竟标准即是灯塔<br>P.S 这里使用了还处于 <code>Stage 3</code> 的 <a href="https://github.com/tc39/proposal-class-fields#field-declarations" rel="nofollow noreferrer" target="_blank">Field declarations</a> 来声明组件的初始 <code>data</code></p></blockquote>
<h4>使用</h4>
<p>　　下面来看看需要做哪些改动以支持使用 <code>class</code> 的写法：</p>
<ol>
<li>首先，最明显的就是我们需要 <code>vue-class-component</code> 这个依赖了。</li>
<li>然后，这个依赖需要 <code>babel</code> 的 <code>transform-decorators-legacy</code> 插件支持。</li>
<li>最后，如果你也想使用 Field declarations 字段声明写法，再添加一个 <code>transform-class-properties</code> 就好了。</li>
</ol>
<p>　　安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm i vue-class-component -D
  npm i babel-plugin-transform-decorators-legacy -D
  npm i babel-plugin-transform-class-properties -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">  npm i vue-class-component -D
  npm i babel-plugin-transform-decorators-legacy -D
  npm i babel-plugin-transform-class-properties -D</code></pre>
<p>　　配置 <code>babel</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // .babelrc
  {
    // ...
    &quot;plugins&quot;: [
      &quot;transform-runtime&quot;,
      &quot;transform-decorators-legacy&quot;,
      &quot;transform-class-properties&quot;
    ]
    // ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// .babelrc</span>
  {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-string">"plugins"</span>: [
      <span class="hljs-string">"transform-runtime"</span>,
      <span class="hljs-string">"transform-decorators-legacy"</span>,
      <span class="hljs-string">"transform-class-properties"</span>
    ]
    <span class="hljs-comment">// ...</span>
  }</code></pre>
<blockquote><p><strong>注意</strong>：<code>transform-decorators-legacy</code> 需放在 <code>transform-class-properties</code> 之前</p></blockquote>
<h3 id="articleHeader14">响应式数据失效</h3>
<h4>数组</h4>
<p>　　由于 <code>Vue.js</code> 响应式数据依赖于<strong>对象方法</strong> <code>Object.defineProperty</code>。但很明显，数组这个特殊的“对象”并没有这个方法，自然也无法设置对象属性的 <code>descriptor</code>，从而也就没有 <code>getter()</code> 和 <code>setter()</code> 方法。所以在使用数组索引角标的形式更改元素数据时（<code>arr[index] = newVal</code>），视图往往无法响应式更新。<br>　　为解决这个问题，<code>Vue.js</code> 中提供了 <code>$set()</code> 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.arr.$set(0, 'newVal')
// vm.arr[0] = 'newVal'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">vm.arr.$set(<span class="hljs-number">0</span>, <span class="hljs-string">'newVal'</span>)
<span class="hljs-comment">// vm.arr[0] = 'newVal'</span></code></pre>
<h4>对象</h4>
<blockquote><p>受现代 <code>JavaScript</code> 的限制（以及废弃 <code>Object.observe</code>），<code>Vue</code> <strong>不能检测到对象属性的添加或删除</strong>。由于 <code>Vue</code> 会在初始化实例时对属性执行 <code>getter/setter</code> 转化过程，所以属性必须在 <code>data</code> 对象上存在才能让 <code>Vue</code> 转换它，这样才能让它是响应的。<br>Ref: <a href="https://cn.vuejs.org/v2/guide/reactivity.html#" rel="nofollow noreferrer" target="_blank">深入响应式原理 - Vue.js</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>
  }
})
<span class="hljs-comment">// `vm.a` 是响应的</span>
vm.b = <span class="hljs-number">2</span>
<span class="hljs-comment">// `vm.b` 是非响应的</span></code></pre>
<h3 id="articleHeader15">静态类型检测</h3>
<p>　　推荐在开发较复杂的组件时使用 <code>props</code> 静态类型检测，提高组件的健壮性，多数情况下可以在转码阶段提前发现错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// before
prop: [
  'id',
  'multiple',
  'callback',
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// before</span>
prop: [
  <span class="hljs-string">'id'</span>,
  <span class="hljs-string">'multiple'</span>,
  <span class="hljs-string">'callback'</span>,
]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// after
props: {
  id: {
    type: [ Number, Array ],
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  callback : Function,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// after</span>
props: {
  <span class="hljs-attr">id</span>: {
    <span class="hljs-attr">type</span>: [ <span class="hljs-built_in">Number</span>, <span class="hljs-built_in">Array</span> ],
    <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
  },
  <span class="hljs-attr">multiple</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-literal">false</span>,
  },
  <span class="hljs-attr">callback</span> : <span class="hljs-built_in">Function</span>,
}</code></pre>
<h3 id="articleHeader16">异步组件</h3>
<p>　　使用处于 <code>Stage.3</code> 阶段的动态导入函数 <code>import()</code>，同时借助 <code>webpack</code> 的代码分割功能，在 <code>Vue.js</code> 中我们可以很轻松地实现一个异步组件。</p>
<h4>异步路由组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AsyncComponent = () => import('./AsyncComponent')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> AsyncComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./AsyncComponent'</span>)</code></pre>
<h4>异步组件工厂</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(
  <span class="hljs-string">'async-webpack-example'</span>,
  () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'./my-async-component'</span>)
)</code></pre>
<blockquote><p>相比于异步路由组建，异步组件工厂一般适用于组件内进一步小颗粒度的拆分处理，如：大体量组件内初次加载时的非必要组件（组件内嵌套的弹窗组件或 <code>Popover</code> 组件等）。</p></blockquote>
<hr>
<p><strong>To be continue...</strong></p>
<blockquote>
<p>文章还在完善中，欢迎大家一起讨论 Vue.JS 开发中遇到的一些问题哈 (ﾟ▽ﾟ)/</p>
<p>看看你的收藏列表，你确定收藏了会记得看吗_(:зゝ∠)_<br>读一读开发的时候至少会有个印象，点个赞打卡啦~</p>
<p>原文：<a href="https://blog.beard.ink/JavaScript/VueJS-%E5%BC%80%E5%8F%91%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E9%9B%86%E9%94%A6/" rel="nofollow noreferrer" target="_blank">VueJS 开发常见问题集锦</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VueJS 开发常见问题集锦

## 原文链接
[https://segmentfault.com/a/1190000010230843](https://segmentfault.com/a/1190000010230843)

