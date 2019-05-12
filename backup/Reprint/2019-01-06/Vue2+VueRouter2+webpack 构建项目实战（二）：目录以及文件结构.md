---
title: 'Vue2+VueRouter2+webpack 构建项目实战（二）：目录以及文件结构' 
date: 2019-01-06 2:30:10
hidden: true
slug: 92ko5kwnz2q
categories: [reprint]
---

{{< raw >}}

                    
<p>通过上一篇博文<a href="https://segmentfault.com/a/1190000010432463">《Vue2+VueRouter2+webpack 构建项目实战（一）：准备工作》</a>,我们已经新建好了一个基于vue+webpack的项目。本篇文章详细介绍下项目的结构。</p>
<h2 id="articleHeader0">项目目录以及文件结构</h2>
<p>如图所示：<br><span class="img-wrap"><img data-src="/img/bVRWcj?w=200&amp;h=195" src="https://static.alili.tech/img/bVRWcj?w=200&amp;h=195" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，自动构建的vue项目的结构就是这样。</p>
<table>
<thead><tr>
<th>目录/文件</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>build</td>
<td>这个是我们最终发布的时候会把代码发布在这里，在开发阶段，我们基本不用管。</td>
</tr>
<tr>
<td>config</td>
<td>配置目录，默认配置没有问题，所以我们也不用管</td>
</tr>
<tr>
<td>node_modules</td>
<td>项目开发依赖的一些模块</td>
</tr>
<tr>
<td>src</td>
<td>开发目录（绝大多数工作都是在这里开展）</td>
</tr>
<tr>
<td>static</td>
<td>资源目录</td>
</tr>
<tr>
<td>test</td>
<td>初始测试目录，没用，删除即可</td>
</tr>
<tr>
<td>.xxxx文件</td>
<td>这些是一些配置文件，包括语法配置，git配置等。基本不用管，放着就是了</td>
</tr>
<tr>
<td>index.html</td>
<td>首页入口文件，基本不用管，如果是开发移动端项目，可以在head区域加上你合适的meta头</td>
</tr>
<tr>
<td>package.json</td>
<td>项目配置文件。前期基本不用管，但是你可以找一下相关的资料，学习一下里面的各项配置。至少，要知道分别是干嘛的。初期就不管了。</td>
</tr>
<tr>
<td>README.md</td>
<td>不用管</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">src文件夹</h2>
<p><span class="img-wrap"><img data-src="/img/bVRWfI?w=250&amp;h=184" src="https://static.alili.tech/img/bVRWfI?w=250&amp;h=184" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，这是src文件夹下面的初始情况，里面有一些示例代码之类的。比如，它吧logo放在assets文件夹里面。</p>
<p><code>commponents</code>目录里面放了一个演示的组件文件。<br><code>router</code>文件放路由配置文件；<br><code>App.vue</code>是项目入口文件。<br><code>main.js</code>这是项目的核心文件，全局的配置都在这个文件里面配置</p>
<p>其中App.vue项目入口代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>
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
<p>核心文件main.js代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// The Vue build version to <span class="hljs-keyword">load</span> <span class="hljs-keyword">with</span> the <span class="hljs-string">`import`</span> command
// (runtime-<span class="hljs-keyword">only</span> <span class="hljs-keyword">or</span> <span class="hljs-keyword">standalone</span>) has been <span class="hljs-keyword">set</span> <span class="hljs-keyword">in</span> webpack.base.conf <span class="hljs-keyword">with</span> an alias.
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>这个配核心配置文件，就是引入vue，导入入口vue以及引入路由，最后new了一个Vue实例对象，来加载数据。</p>
<p>router文件夹下的index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Hello'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Hello'</span>,
      component: Hello
    }
  ]
})</code></pre>
<p>在这个index.js中引入了Hello.vue组件模块，配置路由信息。</p>
<h2 id="articleHeader2">整理目录</h2>
<p>上面只是让大家了解一下具体是什么情况，下面，我们开始动手，把不想管的干掉，然后把src变成这个样子:<br><span class="img-wrap"><img data-src="/img/bVRXRV?w=298&amp;h=441" src="https://static.alili.tech/img/bVRXRV?w=298&amp;h=441" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，把文件夹和文件都新建好，后面的博文我会详细给出每个文件的代码的。</p>
<table>
<thead><tr>
<th>文件目录</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>component</td>
<td>组件文件夹我们写的一些公用的内容可以放在这里的。</td>
</tr>
<tr>
<td>config</td>
<td>核心配置文件夹</td>
</tr>
<tr>
<td>frame</td>
<td>存放自路由的文件夹</td>
</tr>
<tr>
<td>page</td>
<td>项目模板文件夹,所有的页面文件全部存放与此，后面会根据需要来建立各种子目录</td>
</tr>
<tr>
<td>style</td>
<td>样式存放目录</td>
</tr>
</tbody>
</table>
<blockquote><p>vue支持每一个模板里面写css，这样可以做到随用随取。但是，我个人不太喜欢这样，我还是喜欢吧css给单独放出来，因为这样便于整理，另外，使用scss的朋友都知道，我们会预设大量的变量，代码片供我们在写css的时候使用，如果每个模板文件里面都需要引用一次那是及其操蛋的。</p></blockquote>
<h2 id="articleHeader3">参考</h2>
<p>参考地址：<a href="http://blog.csdn.net/fungleo/article/details/53171614" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/fungleo/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2+VueRouter2+webpack 构建项目实战（二）：目录以及文件结构

## 原文链接
[https://segmentfault.com/a/1190000010433694](https://segmentfault.com/a/1190000010433694)

