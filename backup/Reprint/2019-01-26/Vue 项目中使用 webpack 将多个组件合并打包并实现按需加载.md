---
title: 'Vue 项目中使用 webpack 将多个组件合并打包并实现按需加载' 
date: 2019-01-26 2:30:18
hidden: true
slug: qrupu4zdxl
categories: [reprint]
---

{{< raw >}}

                    
<p>使用 Vue 开发项目时，如果要使用其单文件组件特性，必然要使用 webpack 或者 Browserify 进行打包，对于大型应用，为了提升加载速度，可以使用 webpack 的 code splitting 功能进行分割打包，生成较小的模块并按需加载，这在 Vue 文档及 vue-router 文档中均有介绍：<a href="http://vuejs.org/v2/guide/components.html#Async-Components" rel="nofollow noreferrer" target="_blank">Async Components</a>、<a href="http://router.vuejs.org/en/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">Lazy Loading</a>。</p>
<p>webpack 的 code splitting 可以使用 webpack 的 require.ensure 特殊语法或者使用 AMD 风格的 callback-require 语法，以 AMD 风格的 callback-require 语法为例——</p>
<p>全局注册 Async Component：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myAsyncComponent = resolve => {
  require(['./my-async-component'], resolve)
}
Vue.component('async-webpack-example', myAsyncComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> myAsyncComponent = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
  <span class="hljs-built_in">require</span>([<span class="hljs-string">'./my-async-component'</span>], resolve)
}
Vue.component(<span class="hljs-string">'async-webpack-example'</span>, myAsyncComponent)</code></pre>
<p>局部注册 Async Component，单文件组件中 script 块内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myAsyncComponent = resolve => {
  require(['./my-async-component'], resolve)
}

// Vue 扩展实例选项，其他选项略
export default {
  components: {
    'async-webpack-example': myAsyncComponent
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> myAsyncComponent = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
  <span class="hljs-built_in">require</span>([<span class="hljs-string">'./my-async-component'</span>], resolve)
}

<span class="hljs-comment">// Vue 扩展实例选项，其他选项略</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'async-webpack-example'</span>: myAsyncComponent
  }
}</code></pre>
<p>在使用 vue-router 时，为实现不同路由下的组件异步加载，在路由映射中可以使用同样的方式来设置路由项的 component 属性。</p>
<p>这里的 myAsyncComponent 被定义为一个工厂函数，在需要时才会以 Vue 或者 vue-router 定义的用于解析组件选项的 resolve 回调函数（是的，在 Vue 和 vue-router 中有两个不同的解析组件选项的函数）为参数执行 callback-require 函数（resolve 回调函数的参数是组件选项），这样，在执行打包脚本时，my-async-component.vue 文件会被单独打包成一个文件，并且仅当该组件被使用时才会加载。</p>
<p>当要求异步加载的组件较多时，将会生成更多的单个文件，对于前端性能而言，虽然每个文件更小了，但可能意味着更多的网络连接建立和关闭的开销，因此在前端优化的实践中，通常需要在文件数量和单个文件大小之间取得平衡。</p>
<p>本文介绍如何将多个组件合并打包成一个单独的文件，一方面可以减少代码块的数量，另一方面，如果合并打包的这些组件在不同地方多次重复使用，由于 Vue 的缓存机制，可以加快后续组件的加载速度，并且如果这些通用组件长时间不会变化（如 UI 相关的组件），打包生成的文件也长期不会变化，可以充分利用浏览器的缓存功能，实现前端加载速度的优化。</p>
<p>先上效果图，在使用 vue-router 的 SPA 应用中，将除根路由之外的路由项对应的 ComponentA、ComponentB、ComponentC 等三个组件合并打包成一个文件。初次加载页面时，从开发者工具的 Network 面板上可以看到，此时未加载包含 ComponentA、ComponentB、ComponentC 这三个组件的 0.a5a1bae6addad442ac82.js 文件，当点击 Page A 链接时，加载了该文件，然后再点击 Page B、Page C 链接时，没有重新加载该文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVJjbh?w=900&amp;h=545" src="https://static.alili.tech/img/bVJjbh?w=900&amp;h=545" alt="result" title="result" style="cursor: pointer; display: inline;"></span></p>
<p>我们首先通过 vue-cli 命令行工具使用 webpack 项目模板创建一个包含 vue-router 的项目，在其 src/components 目录下创建一个 CommonComponents 目录，在该目录中创建 ComponentA、ComponentB、ComponentC 这三个组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVJjbu?w=781&amp;h=599" src="https://static.alili.tech/img/bVJjbu?w=781&amp;h=599" alt="CommonComponents" title="CommonComponents" style="cursor: pointer; display: inline;"></span></p>
<p>同时在 CommonComponents 目录下创建 index.js，其内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.ComponentA = require('./ComponentA')
exports.ComponentB = require('./ComponentB')
exports.ComponentC = require('./ComponentC')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.ComponentA = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ComponentA'</span>)
exports.ComponentB = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ComponentB'</span>)
exports.ComponentC = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./ComponentC'</span>)</code></pre>
<p>这样，我们只需要使用 webpack 的 require.ensure 特殊语法或者使用 AMD 风格的 callback-require 语法异步加载 CommonComponents 目录下的 index.js，在使用 webpack 进行打包时，就可以实现将 ComponentA、ComponentB、ComponentC 这三个组件合并打包。以 AMD 风格的 callback-require 语法为例示范如下，这里的 callback 回调函数的形式没有任何特殊要求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['components/CommonComponents'], function (CommonComponents) {
  // do whatever you want with CommonComponents
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>([<span class="hljs-string">'components/CommonComponents'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">CommonComponents</span>) </span>{
  <span class="hljs-comment">// do whatever you want with CommonComponents</span>
})</code></pre>
<p>components/CommonComponents 模块加载成功时，这里的回调函数中的 CommonComponents 参数将会是一个包含 ComponentA、ComponentB、ComponentC 这三个组件选项的对象。</p>
<p>在定义异步组件时，我们使用的是一个工厂函数 <code>resolve =&gt; {require(['./my-async-component'], resolve)}</code>，如果需要在路由配置文件中添加 component 属性为 ComponentA 组件的路由项，应该定义什么样的工厂函数呢？记住这里的 resolve 是一个用于解析组件选项的回调函数，其参数是所获取的组件选项，而上一段代码中的 CommonComponents 恰好是包含若干个组件选项的对象，因此我们可以将 CommonComponents 的子属性作为参数用于 resolve 调用，我们编写一个函数 getCommonComponent，用于根据组件名称返回获取相应的组件选项的工厂函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getCommonComponent = componentName => resolve => require(['components/CommonComponents'], components => resolve(components[componentName]))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> getCommonComponent = <span class="hljs-function"><span class="hljs-params">componentName</span> =&gt;</span> resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">'components/CommonComponents'</span>], components =&gt; resolve(components[componentName]))</code></pre>
<p>在组件模板或者路由映射等使用其中某一个组件的地方，可以使用类似于 <code>getCommonComponent('ComponentA')</code> 这样的函数调用进行组件设置，在路由映射中的使用示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes: [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/a',
    name: 'A',
    component: getCommonComponent('ComponentA')
  },
  {
    path: '/b',
    name: 'B',
    component: getCommonComponent('ComponentB')
  },
  {
    path: '/c',
    name: 'C',
    component: getCommonComponent('ComponentC')
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">routes</span>: [
  {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'Hello'</span>,
    <span class="hljs-attribute">component</span>: Hello
  },
  {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/a'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'A'</span>,
    <span class="hljs-attribute">component</span>: getCommonComponent(<span class="hljs-string">'ComponentA'</span>)
  },
  {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/b'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'B'</span>,
    <span class="hljs-attribute">component</span>: getCommonComponent(<span class="hljs-string">'ComponentB'</span>)
  },
  {
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/c'</span>,
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'C'</span>,
    <span class="hljs-attribute">component</span>: getCommonComponent(<span class="hljs-string">'ComponentC'</span>)
  }
]</code></pre>
<p>最终打包生成的文件列表如下图所示，其中的 0.a5a1bae6addad442ac82.js 包含了  ComponentA、ComponentB、ComponentC 这三个组件。</p>
<p><span class="img-wrap"><img data-src="/img/bVJjby?w=398&amp;h=191" src="https://static.alili.tech/img/bVJjby?w=398&amp;h=191" alt="built" title="built" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader0">进阶学习</h2>
<p><a href="https://segmentfault.com/l/1500000008881284">SF 讲堂《学习 Vue 你需要知道的 webpack 知识》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 项目中使用 webpack 将多个组件合并打包并实现按需加载

## 原文链接
[https://segmentfault.com/a/1190000008376183](https://segmentfault.com/a/1190000008376183)

