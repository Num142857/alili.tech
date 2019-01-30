---
title: 'vue2.0一起在懵逼的海洋里越陷越深（二）' 
date: 2019-01-31 2:31:15
hidden: true
slug: cajbijlgt9
categories: [reprint]
---

{{< raw >}}

                    
<p>承接上文<a href="http://www.leenty.com/2016/10/21/vue2-1/" rel="nofollow noreferrer" target="_blank">vue2.0一起在懵逼的海洋里越陷越深（一）</a></p>
<h3 id="articleHeader0">说好了一起懵逼，那么我们继续下沉</h3>
<p>在上一篇里已经将vue2.0需要的依赖都装齐了<br>那么接下来</p>
<p><span class="img-wrap"><img data-src="/img/bVGbJx?w=640&amp;h=360" src="https://static.alili.tech/img/bVGbJx?w=640&amp;h=360" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为vue最后生成的页面看似静态页面(对于静态页面这里有些偷鸡用法，不管你怎样，反正我已经露出了诡异的微笑?，再贴一个<a href="https://github.com/leenty/vue2" rel="nofollow noreferrer" target="_blank">vue2.0 demo的项目地址</a>，大爷有兴趣可进去看看演示，开心了就加个星)，其实却是个SPA(单页面应用)<br>没错！就是一个SPA</p>
<h3 id="articleHeader1">作为一个SPA，当然有不同的地方</h3>
<p>SPA与传统网页区别的地方是SPA具有前端路由来模拟页面跳转，当然这是众多不同之一，这篇只说前端路由。<br>上一篇中有安装vue-router组件，这个就是vue的前端路由<br>vue + vue-router简直是爽，页面跳转的速度简直是不要不要的<br>不光是用户体验上的提升，作为一名开发者，在使用了如vue，react等这类MVVM框架后，就不会再想回到jQuery的时代了。</p>
<h3 id="articleHeader2">前面搞了半天，现在要开始coding啦！</h3>
<p>好的，用自己的小编辑器打开vue项目（我用的是sublime）<br>可以看到项目目录是这样子的<br><span class="img-wrap"><img data-src="/img/bVGbJF?w=193&amp;h=598" src="https://static.alili.tech/img/bVGbJF?w=193&amp;h=598" alt="files-tree" title="files-tree" style="cursor: pointer; display: inline;"></span></p>
<p>(插一句，如果喜欢这个sublime主题可以<a href="http://www.leenty.com/2016/10/06/sublime-material-theme/" rel="nofollow noreferrer" target="_blank">查看这篇文章</a>)<br>与自己的目录对比发现少几个文件，那是没有什么关系的，接下来要做的就是去创建这些文件。</p>
<h3 id="articleHeader3">作为一个SPA，首先要有路由</h3>
<p>从目录图片里可以看到<code>main.js</code>这个文件，没错这个就是程序的入口<br>这个文件的内容是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import router from './router'

import App from './App'

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  router,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p><a href="https://github.com/leenty/vue2/blob/master/src/main.js" rel="nofollow noreferrer" target="_blank"><code>main.js</code>地址</a><br>这里用的是ES6的语法，使用<code>import</code>来导入包<br>这里导入了vue包，还有两个文件，分别是<code>router.js</code>和<code>App.vue</code><br><code>.js</code>后缀是可以省略的(毕竟是亲生的，你不说导入什么类型的文件，肯定是自家人毕竟亲呀)<br>其实<code>.vue</code>后缀也是可以省略的，我建议还是写一下，如果遇到两个同名文件就尴尬了。</p>
<p>好的，这个<code>router.js</code>就是路由的输出口啦，<br><code>App.vue</code>就是目录里已经存在的那个模板文件啦，你的界面就从这里开始啦。<br>引入了包就可以开始设置路由和挂载模板了</p>
<p>顺带一提，可以看到在<code>new Vue()</code>时传入了一个对象，但是这个对象却不是键值对，<br>是这样，这是ES6的一种语法，当引用的变量名和键名相同时，就可以简写成这样<br>如果还原来是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  router: router,
  render: h => h(App)
}).$mount('app')
// 被简写成了
new Vue({
  router, // 这是ES6对象的简写，扩展开就是router: router
  // 箭头函数(=>)是ES6的新语法
  render: h => h(App) // 这里扩展开就是render: (h) => { return h(App) }
}).$mount('app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">router</span>: router,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'app'</span>)
<span class="hljs-comment">// 被简写成了</span>
<span class="hljs-keyword">new</span> Vue({
  router, <span class="hljs-comment">// 这是ES6对象的简写，扩展开就是router: router</span>
  <span class="hljs-comment">// 箭头函数(=&gt;)是ES6的新语法</span>
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App) <span class="hljs-comment">// 这里扩展开就是render: (h) =&gt; { return h(App) }</span>
}).$mount(<span class="hljs-string">'app'</span>)</code></pre>
<p>PS：ES6的新语法现在网上文章已经有很多了，我之后也会发一版常用的语法</p>
<h3 id="articleHeader4">那么现在在src目录下创建<code>router.js</code>文件</h3>
<p>内容是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 告诉vue要使用router
Vue.use(VueRouter)

/* eslint-disable no-new */
// 实例化router对象
const router = new VueRouter({
  mode: 'hash', // 设置路由模式 可选值: &quot;hash&quot; | &quot;history&quot; | &quot;abstract&quot;，默认&quot;hash&quot;
  linkActiveClass: 'u-link--Active', // 这是链接激活时的class
  // base: '/app/', // 这个是设置根目录路径，一般用不到，默认'/'
  routes // 挂载路由集合 后面会说
})
// 导出router对象
export default router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>

<span class="hljs-comment">// 告诉vue要使用router</span>
Vue.use(VueRouter)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-comment">// 实例化router对象</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'hash'</span>, <span class="hljs-comment">// 设置路由模式 可选值: "hash" | "history" | "abstract"，默认"hash"</span>
  linkActiveClass: <span class="hljs-string">'u-link--Active'</span>, <span class="hljs-comment">// 这是链接激活时的class</span>
  <span class="hljs-comment">// base: '/app/', // 这个是设置根目录路径，一般用不到，默认'/'</span>
  routes <span class="hljs-comment">// 挂载路由集合 后面会说</span>
})
<span class="hljs-comment">// 导出router对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router</code></pre>
<p><a href="https://github.com/leenty/vue2/blob/master/src/router.js" rel="nofollow noreferrer" target="_blank">这是<code>router.js</code>地址</a><br>这里引入了两个包<code>vue</code>,<code>vue-router</code>和一个包含路由集合的<code>routes.js</code>文件<br>整个文件的逻辑就是，使用<code>Vue.use()</code>方法告诉vue我们使用了路由<br>然后就大大方方的导出路由对象<br><span class="img-wrap"><img data-src="/img/bVGbJZ?w=245&amp;h=102" src="https://static.alili.tech/img/bVGbJZ?w=245&amp;h=102" alt="main.js router" title="main.js router" style="cursor: pointer;"></span></p>
<p>这个时候<code>main.js</code>里就可以接受到这里导出的路由对象，并挂载到vue对象上</p>
<h3 id="articleHeader5">在src目录下创建<code>routes.js</code>文件</h3>
<p><code>routes.js</code>是用来放置路由集合的文件<br>其实路由集合是可以写在<code>router.js</code>里的，这里为什么不写在一起呢？<br>因为当路由集合变得庞大时，如果还是写在<code>router.js</code>里，就会显得拥挤，不便于阅读<br>所以这里推荐单独写出来。<br>同时呢也可以创建路由所对应的模板文件(<code>.vue</code>文件，我把它称为模板文件)，<code>Article.vue</code>和<code>Home.vue</code><br>模板文件叫什么名由自己决定，于是就能看到这张图里所有文件都齐了<br><span class="img-wrap"><img data-src="/img/bVGbJF?w=193&amp;h=598" src="https://static.alili.tech/img/bVGbJF?w=193&amp;h=598" alt="files-tree" title="files-tree" style="cursor: pointer;"></span></p>
<p>那么在编写<code>routes.js</code>文件之前，需要先写好两个模板的内容(不然一会有没有成功都不清楚了，23333)</p>
<p>好的，贴一下<code>home.vue</code>的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;pug&quot;>
.home
  h1.l-ta--c Material Desgin
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang=&quot;stylus&quot;>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"pug"</span>&gt;</span>
.home
  h1.l-ta--c Material Desgin
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>vue模板是html结构的，这也是对界面编写最友好的方式<br>里面的<code>&lt;template&gt; &lt;/template&gt;</code>标签就是视图<br><code>&lt;script&gt;&lt;/script&gt;</code>就是js，这个没有争议<br><code>&lt;style&gt;&lt;/style&gt;</code>是写css的，这个也没有问题<br>但是当仔细看我的代码，发现里面html使用了pug，css使用了stylus<br>其实不用他们也是可行的，只是用pug和stylus写结构比较清晰<br>不用也可以的<br>如果要使用，请打开你的终端，给项目添加几个包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i pug stylus stylus-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> pug stylus stylus-loader -D</code></pre>
<p>里面的css的class(<code>.l-ta--c</code>)看着有点懵逼的，可以看看<a href="http://leenty.com/2016/11/06/css/#main" rel="nofollow noreferrer" target="_blank">使用BEM+emmet的css书写与命名技巧</a><br>好的，模板不需要太复杂，只要有字能显示就好了，至于<code>Article.vue</code>也是一样的，这里就不贴了</p>
<p>Tips：模板里推荐有一个根元素，就像这里的<code>.home</code>就是根元素，这样不容易混乱，结构会清晰</p>
<h3 id="articleHeader6">写好了模板就可以开始编写<code>routes.js</code>了</h3>
<p>先贴代码!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 导入之前写好的两个模板
import Home from './components/Home.vue'
import Article from './components/Article.vue'

// 编写路由集合
const routes = [
  {
    name: 'Home', // 路由名，这个字段是可选的
    path: '/', // 路由路径，这里是根路径所以是'/'
    component: Home // 模板
  }, // 这些是常用的
  {
    name: 'Article',
    path: '/article',
    component: Article
  }
]
// 导出路由集合
export default routes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 导入之前写好的两个模板</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Home.vue'</span>
<span class="hljs-keyword">import</span> Article <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Article.vue'</span>

<span class="hljs-comment">// 编写路由集合</span>
<span class="hljs-keyword">const</span> routes = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Home'</span>, <span class="hljs-comment">// 路由名，这个字段是可选的</span>
    path: <span class="hljs-string">'/'</span>, <span class="hljs-comment">// 路由路径，这里是根路径所以是'/'</span>
    component: Home <span class="hljs-comment">// 模板</span>
  }, <span class="hljs-comment">// 这些是常用的</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Article'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/article'</span>,
    <span class="hljs-attr">component</span>: Article
  }
]
<span class="hljs-comment">// 导出路由集合</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> routes</code></pre>
<p><a href="https://github.com/leenty/vue2/blob/master/src/routes.js" rel="nofollow noreferrer" target="_blank">然后是文件地址</a><br>最后导出了路由集合(<code>routes</code>)后就可以在<code>router.js</code>里使用了<br>于是，前面的<code>router.js</code>里的<code>routes</code>就有了。</p>
<h3 id="articleHeader7">现在进行最后一步，到<code>App.vue</code>里添加路由</h3>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;pug&quot;>
  .app
    header
      //- 制作一个跳转链接
      //- 这里不要直接用a链接跳转，那样会导致页面重载，
      //- 相比之下用router-link是高效的方案
      //- to属性就是链接的地址啦
      router-link(to=&quot;/&quot;) home
      router-link(to=&quot;/article&quot;) article
    bodyer
      //- 路由地址所对应的模板将会被挂载到router-view标签上
      router-view
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang=&quot;stylus&quot;>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"pug"</span>&gt;</span>
  .app
    header
      //- 制作一个跳转链接
      //- 这里不要直接用a链接跳转，那样会导致页面重载，
      //- 相比之下用router-link是高效的方案
      //- to属性就是链接的地址啦
      router-link(to="/") home
      router-link(to="/article") article
    bodyer
      //- 路由地址所对应的模板将会被挂载到router-view标签上
      router-view
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><a href="https://github.com/leenty/vue2/blob/master/src/App.vue" rel="nofollow noreferrer" target="_blank">地址</a><br>好了，到此为止就完成了路由搭建与使用了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0一起在懵逼的海洋里越陷越深（二）

## 原文链接
[https://segmentfault.com/a/1190000007632915](https://segmentfault.com/a/1190000007632915)

