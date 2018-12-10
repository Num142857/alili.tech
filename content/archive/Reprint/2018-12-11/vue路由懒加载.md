---
title: 'vue路由懒加载' 
date: 2018-12-11 2:30:10
hidden: true
slug: pnxl0zojil
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue的路由懒加载</h2>
<p>我们可以把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件。</p>
<ol>
<li>component可以是一个箭头函数，我们可以使用动态 import语法来定义代码分块点；</li>
<li>如果想在network里面看到动态加载的组件名字，可以加webpackChunkName；</li>
<li>同时要在webpack.base.conf.js里面的output里面的filename下面加上chunkFileName</li>
</ol>
<p>代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router里面的index.js


import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      /* 
       *  使用动态组件，component可以是一个箭头函数
       *  @表示src目录
       *  如果想在network里面看到动态加载的组件名字，可以加webpackChunkName，同时要在webpack.base.conf.js里面的output里面的filename下面加上chunkFileName
       *  network里面动态加载模块名称
       */
      
      component: () => import(/* webpackChunkName: 'home' */'@/pages/Homes')
    
      
    },
    {
      path: '/todos',
      name: 'Todos',
      component: () => import(/* webpackChunkName: 'todo' */'@/pages/Todos')
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// router里面的index.js</span>


<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>


Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'home'</span>,
      <span class="hljs-comment">/* 
       *  使用动态组件，component可以是一个箭头函数
       *  @表示src目录
       *  如果想在network里面看到动态加载的组件名字，可以加webpackChunkName，同时要在webpack.base.conf.js里面的output里面的filename下面加上chunkFileName
       *  network里面动态加载模块名称
       */</span>
      
      component: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: 'home' */</span><span class="hljs-string">'@/pages/Homes'</span>)
    
      
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/todos'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Todos'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: 'todo' */</span><span class="hljs-string">'@/pages/Todos'</span>)
    }
  ]
})</code></pre>
<p><strong>注意</strong>  上面的@代表当前src目录，具体可以去参考webpack的配置</p>
<p>webpack.base.conf.js里面添加 chunkFilename: '[name].js'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  path: config.build.assetsRoot,
  filename: '[name].js',
  // 需要配置的地方
  chunkFilename: '[name].js',
  publicPath: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">output: {
  <span class="hljs-attr">path</span>: config.build.assetsRoot,
  <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
  <span class="hljs-comment">// 需要配置的地方</span>
  chunkFilename: <span class="hljs-string">'[name].js'</span>,
  <span class="hljs-attr">publicPath</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath
}</code></pre>
<h2 id="articleHeader1">分析</h2>
<p>创建了home和todos两个组件使用了路由懒加载，配置好之后我们执行npm run dev来运行项目，打开network之后刷新一下，我们会发现加载了home.js，我们会发现和上面定义的webpackChunkName名字一样，同时点todos会加载todo.js。这就是路由懒加载的简单使用。</p>
<h2 id="articleHeader2">其他</h2>
<p>在main.js里面项目的入口我们可以使用template的语法，也可以使用render函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  router,
  components: { App },

  /*
  * 这里使用的template的语法
  * 也可以使用render函数,直接return一个html结构
  */
  // template: '<App/>'
  render() {

    return (
      <div>
        <App></App>
      </div>
    )
  }

  
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-attr">components</span>: { App },

  <span class="hljs-comment">/*
  * 这里使用的template的语法
  * 也可以使用render函数,直接return一个html结构
  */</span>
  <span class="hljs-comment">// template: '&lt;App/&gt;'</span>
  render() {

    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">App</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }

  
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue路由懒加载

## 原文链接
[https://segmentfault.com/a/1190000013652135](https://segmentfault.com/a/1190000013652135)

