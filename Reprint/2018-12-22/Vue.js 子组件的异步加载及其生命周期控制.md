---
title: 'Vue.js 子组件的异步加载及其生命周期控制' 
date: 2018-12-22 2:30:10
hidden: true
slug: 35rum9clzqj
categories: [reprint]
---

{{< raw >}}

                    
<p>前端开发社区的繁荣，造就了很多优秀的基于 MVVM 设计模式的框架，而组件化开发思想也越来越深入人心。这其中不得不提到 Vue.js 这个专注于 VM 层的框架。</p>
<p>本文主要对 Vue.js 组件化开发中子组件的异步加载和其生命周期进行一些探讨。阅读本文需要对 Vue.js 有一定的了解。</p>
<blockquote>注意：本文中的一些例子代码，是以 vue-cli 采用 webpack 模板初始化的项目为基础。</blockquote>
<h2 id="articleHeader0">异步组件</h2>
<p>讨论异步加载，需要先了解下异步组件。Vue.js 的异步组件是把组件定义为一个工厂函数，在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如注册一个全局异步组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('async-demo', function(resolve, reject) {
  setTimeout(function() {
    // 将组件定义传入 resolve 回调函数
    resolve({
      template: '<div>I am async!</div>'
 &nbsp; &nbsp; &nbsp;// 组件的其他选项
    })
  }, 1000)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'async-demo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 将组件定义传入 resolve 回调函数</span>
    resolve({
      <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;I am async!&lt;/div&gt;'</span>
 &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 组件的其他选项</span>
    })
  }, <span class="hljs-number">1000</span>)
})</code></pre>
<p>异步子组件和全局注册很类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('parent-demo', {
 &nbsp;// 父组件的其他选项
 &nbsp;components: {
 &nbsp; &nbsp;'async-demo': function(resolve, reject) {
      setTimeout(function() {
        // 将组件定义传入 resolve 回调函数
        resolve({
          template: '<div>I am async!</div>'
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// 子组件的其他选项
        })
      }, 1000)
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'parent-demo'</span>, {
 &nbsp;<span class="hljs-comment">// 父组件的其他选项</span>
 &nbsp;components: {
 &nbsp; &nbsp;<span class="hljs-string">'async-demo'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 将组件定义传入 resolve 回调函数</span>
        resolve({
          <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;I am async!&lt;/div&gt;'</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 子组件的其他选项</span>
        })
      }, <span class="hljs-number">1000</span>)
    }
  }
})</code></pre>
<p>工厂函数的第一个参数 <code>resolve</code> 为<strong>成功后的回调</strong>，第二个参数 <code>reject</code> 为<strong>失败后的回调</strong>，可以在这里提示用户加载失败等。</p>
<p>这里使用 <code>setTimeout</code> 只是为了模拟异步，在实际项目中，应该配合 webpack 的代码分离功能来实现异步加载。</p>
<h2 id="articleHeader1">异步加载</h2>
<p>在实际的项目中，如果不使用异步加载，则 Vue.js 组件的 JS、CSS 和模板都会打包到一个 .js 文件中，这个文件可能达到几 MB 甚至更多，严重影响首屏加载时间。所以在项目中我们需要启用组件的异步加载。</p>
<h3 id="articleHeader2">webpack 代码分离</h3>
<p>webpack 的代码分离有两种，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案的 <code>import()</code> 语法。第二种，则是使用 webpack 特定的 <code>require.ensure</code>。让我们先看看第一种：</p>
<blockquote>import() 调用会在内部用到 promises。如果在旧有版本浏览器中使用 import()，记得使用一个 polyfill 库（例如 es6-promise 或 promise-polyfill），来 shim Promise。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(
  'async-demo',
  // 该 import 函数返回一个 Promise 对象。
  () => import('./async-demo')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(
  <span class="hljs-string">'async-demo'</span>,
  <span class="hljs-comment">// 该 import 函数返回一个 Promise 对象。</span>
  () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'./async-demo'</span>)
)</code></pre>
<p>上面的例子中，前文提到的工厂函数支持返回一个 Promise 对象，所以可以使用 <code>import()</code> 这种代码分离方式。</p>
<p>局部注册也是类似的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('parent-demo', {
 &nbsp;// 父组件的其他选项
 &nbsp;components: {
 &nbsp; &nbsp;'async-demo': () => import('./async-demo')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'parent-demo'</span>, {
 &nbsp;<span class="hljs-comment">// 父组件的其他选项</span>
 &nbsp;components: {
 &nbsp; &nbsp;<span class="hljs-string">'async-demo'</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./async-demo'</span>)
  }
})</code></pre>
<p>本质上，<code>import()</code> 函数返回一个 Promise 实例，你可以自定义这个过程，下文会有说明。</p>
<p>第二种 webpack 代码分离是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('async-demo', function(resolve) {
  require.ensure([], function(require) {
    resolve(require('./async-demo'))
  }, function(error) {
 &nbsp; &nbsp;// 加载出错执行这里
 &nbsp;})
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.component(<span class="hljs-string">'async-demo'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
  <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require</span>) </span>{
    resolve(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./async-demo'</span>))
  }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
 &nbsp; &nbsp;<span class="hljs-comment">// 加载出错执行这里</span>
 &nbsp;})
})</code></pre>
<p>看起来比较繁琐，如果你使用 webpack 2 及以上版本，则<strong>不建议</strong>使用第二种方式。</p>
<h2 id="articleHeader3">生命周期控制</h2>
<p>在使用子组件（或者叫局部注册）时，我们可能需要在子组件实例化（或者叫创建完毕）后做某些事情。在非异步的子组件中，我们很容易做这件事：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <my-demo ref=&quot;demo&quot;></my-demo>
  </div>
</template>

<script>
import Demo from './Demo'

export default {
  mounted() {
 &nbsp; &nbsp;// 在这里可以通过组件的 $refs 获取到子组件的实例
 &nbsp; &nbsp;// 可以认为，在这里子组件实例化完毕
 &nbsp; &nbsp;console.log(this.$refs.demo)
  },
  components: {
    MyDemo: Demo
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-demo</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-demo</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Demo <span class="hljs-keyword">from</span> <span class="hljs-string">'./Demo'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  mounted() {
 &nbsp; &nbsp;<span class="hljs-comment">// 在这里可以通过组件的 $refs 获取到子组件的实例</span>
 &nbsp; &nbsp;<span class="hljs-comment">// 可以认为，在这里子组件实例化完毕</span>
 &nbsp; &nbsp;<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$refs.demo)
  },
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">MyDemo</span>: Demo
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上例中使用了 Vue.js 的子组件引用，所以可以在生命周期函数 <code>mounted</code> 中很方便的获取到子组件的实例，这样就可以在这个函数中处理一些子组件实例化后要做的事情。</p>
<p>但是在异步子组件中，<code>mounted</code> 函数中是无法获取到子组件的实例的，所以我们需要一些技巧来实现这个功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <my-demo ref=&quot;demo&quot;></my-demo>
  </div>
</template>

<script>
export default {
  components: {
    MyDemo: () => import('./Demo').then(component => {
 &nbsp; &nbsp; &nbsp;// 清理已缓存的组件定义
 &nbsp; &nbsp; &nbsp;component.default._Ctor = {}

      if (!component.default.attached) {
 &nbsp; &nbsp; &nbsp; &nbsp;// 保存原组件中的 created 生命周期函数
 &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupCreated = component.default.created
      }

 &nbsp; &nbsp; &nbsp;// 注入一个特殊的 created 生命周期函数
 &nbsp; &nbsp; &nbsp;component.default.created = function() {
        // 子组件已经实例化完毕

 &nbsp; &nbsp; &nbsp; &nbsp;// this 即为子组件 vm 实例
 &nbsp; &nbsp; &nbsp; &nbsp;console.log(this)

        if (component.default.backupCreated) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// 执行原组件中的 created 生命周期函数
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupCreated.call(this)
        }
      }

 &nbsp; &nbsp; &nbsp;// 表示已经注入过了 
 &nbsp; &nbsp; &nbsp;component.default.attached = true

      return component
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-demo</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-demo</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">MyDemo</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./Demo'</span>).then(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
 &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 清理已缓存的组件定义</span>
 &nbsp; &nbsp; &nbsp;component.default._Ctor = {}

      <span class="hljs-keyword">if</span> (!component.default.attached) {
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 保存原组件中的 created 生命周期函数</span>
 &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupCreated = component.default.created
      }

 &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 注入一个特殊的 created 生命周期函数</span>
 &nbsp; &nbsp; &nbsp;component.default.created = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 子组件已经实例化完毕</span>

 &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// this 即为子组件 vm 实例</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)

        <span class="hljs-keyword">if</span> (component.default.backupCreated) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 执行原组件中的 created 生命周期函数</span>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupCreated.call(<span class="hljs-keyword">this</span>)
        }
      }

 &nbsp; &nbsp; &nbsp;<span class="hljs-comment">// 表示已经注入过了 </span>
 &nbsp; &nbsp; &nbsp;component.default.attached = <span class="hljs-literal">true</span>

      <span class="hljs-keyword">return</span> component
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上例中，可以看到我们对组件异步加载做了一些特殊的控制，其中 <code>import().then()</code> 则是在加载完子组件的 .js 文件后，实例化子组件之前的回调，如果需要处理出错的情况，则 <code>import().then().catch()</code> 即可。</p>
<p>以上代码只是注入了一个 <code>created</code> 函数，如果要注入其他生命周期函数，例如 <code>mounted</code>，也是类似的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <my-demo ref=&quot;demo&quot;></my-demo>
  </div>
</template>

<script>
export default {
  components: {
    MyDemo: () => import('./Demo').then(component => {
 &nbsp; &nbsp; &nbsp;component.default._Ctor = {}

      if (!component.default.attached) {
 &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupMounted = component.default.mounted
      }

 &nbsp; &nbsp; &nbsp;component.default.mounted = function() {
        if (component.default.backupMounted) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupMounted.call(this)
        }
      }

      component.default.attached = true

      return component
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-demo</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"demo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-demo</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">MyDemo</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./Demo'</span>).then(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
 &nbsp; &nbsp; &nbsp;component.default._Ctor = {}

      <span class="hljs-keyword">if</span> (!component.default.attached) {
 &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupMounted = component.default.mounted
      }

 &nbsp; &nbsp; &nbsp;component.default.mounted = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (component.default.backupMounted) {
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;component.default.backupMounted.call(<span class="hljs-keyword">this</span>)
        }
      }

      component.default.attached = <span class="hljs-literal">true</span>

      <span class="hljs-keyword">return</span> component
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>通过上面的讨论，我们可以做到完全控制 Vue.js 组件的异步加载的全过程，这对于需要精确控制子组件加载的组件，会有很大的帮助。</p>
<h2 id="articleHeader4">演示项目</h2>
<p>根据上面的思路，写了一个基于 Bootstrap 的异步弹窗演示项目：</p>
<p><a href="https://github.com/hex-ci/vue-async-bootstrap-modal-demo" rel="nofollow noreferrer" target="_blank">https://github.com/hex-ci/vue...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 子组件的异步加载及其生命周期控制

## 原文链接
[https://segmentfault.com/a/1190000012427477](https://segmentfault.com/a/1190000012427477)

