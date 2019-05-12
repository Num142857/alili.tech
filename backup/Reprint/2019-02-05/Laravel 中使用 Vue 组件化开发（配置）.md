---
title: 'Laravel 中使用 Vue 组件化开发（配置）' 
date: 2019-02-05 2:30:09
hidden: true
slug: ugpgd7xatjn
categories: [reprint]
---

{{< raw >}}

                    
<p>更多请关注<a href="http://laravel.so" rel="nofollow noreferrer" target="_blank">Laravel.so</a>、<a href="https://pigjian.com" rel="nofollow noreferrer" target="_blank">PIGJIAN BLOG</a></p>
<p>现今前端组件化开发、<code>MVVM</code> 模式，给开发带来了很多的便利，可读性、可维护性更高。然而自 <code>Laravel 5.3</code> 开始，<code>VueJS</code> 成为框架默认的标配。</p>
<p>本文基于 <code>Laravel 5.1 LTS</code> 版本引入 <code>Vue 2.0</code> 进行配置。</p>
<p>我已在 <code>Github</code> 配置好，<code>Laravel 5.1</code> 和 <code>Laravel 5.2</code> 均有，<code>Clone</code> 下来后按照 <code>README</code> 安装依赖后即可用：<br><a href="https://github.com/jcc/vue-laravel-example" rel="nofollow noreferrer" target="_blank">https://github.com/jcc/vue-laravel-example</a></p>
<h3 id="articleHeader0">步骤一：配置 <code>package.json</code>
</h3>
<p><strong>1. 在根目录下修改 <code>package.json</code>, 可在 <code>devDependencies</code> 下配置你所需的所有依赖。我的配置如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;private&quot;: true,
  &quot;scripts&quot;: {
    &quot;prod&quot;: &quot;gulp --production&quot;,
    &quot;dev&quot;: &quot;gulp watch&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;bootstrap-sass&quot;: &quot;^3.3.7&quot;,
    &quot;gulp&quot;: &quot;^3.9.1&quot;,
    &quot;jquery&quot;: &quot;^3.1.0&quot;,
    &quot;laravel-elixir&quot;: &quot;^6.0.0-9&quot;,
    &quot;laravel-elixir-vue&quot;: &quot;^0.1.4&quot;,
    &quot;laravel-elixir-webpack-official&quot;: &quot;^1.0.2&quot;,
    &quot;laravel-elixir-browsersync-official&quot;: &quot;^1.0.0&quot;,
    &quot;lodash&quot;: &quot;^4.14.0&quot;,
    &quot;vue&quot;: &quot;^2.0.0-rc.2&quot;,
    &quot;vue-resource&quot;: &quot;^0.9.3&quot;,
    &quot;vue-router&quot;: &quot;^2.0.0-rc.3&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"private"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"prod"</span>: <span class="hljs-string">"gulp --production"</span>,
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"gulp watch"</span>
  },
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"bootstrap-sass"</span>: <span class="hljs-string">"^3.3.7"</span>,
    <span class="hljs-attr">"gulp"</span>: <span class="hljs-string">"^3.9.1"</span>,
    <span class="hljs-attr">"jquery"</span>: <span class="hljs-string">"^3.1.0"</span>,
    <span class="hljs-attr">"laravel-elixir"</span>: <span class="hljs-string">"^6.0.0-9"</span>,
    <span class="hljs-attr">"laravel-elixir-vue"</span>: <span class="hljs-string">"^0.1.4"</span>,
    <span class="hljs-attr">"laravel-elixir-webpack-official"</span>: <span class="hljs-string">"^1.0.2"</span>,
    <span class="hljs-attr">"laravel-elixir-browsersync-official"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"lodash"</span>: <span class="hljs-string">"^4.14.0"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.0.0-rc.2"</span>,
    <span class="hljs-attr">"vue-resource"</span>: <span class="hljs-string">"^0.9.3"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.0.0-rc.3"</span>
  }
}</code></pre>
<p><strong>2. 安装配置的依赖，在根目录下，运行：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<p>当然你可以通过 <code>npm install {package_name} --save-dev</code> 的方式安装你所需的包。</p>
<h3 id="articleHeader1">步骤二：配置 <code>gulpfile.js</code>
</h3>
<p><code>Laravel 5.1</code> 的 <code>gulpfile.js</code> 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.sass('app.scss');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> elixir = <span class="hljs-built_in">require</span>(<span class="hljs-string">'laravel-elixir'</span>);

elixir(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">mix</span>) </span>{
    mix.sass(<span class="hljs-string">'app.scss'</span>);
});</code></pre>
<p>可见还没使用 <code>ES6</code> 的语法，因此我们修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

elixir(mix => {
  mix.webpack('main.js');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> elixir = <span class="hljs-built_in">require</span>(<span class="hljs-string">'laravel-elixir'</span>);

<span class="hljs-built_in">require</span>(<span class="hljs-string">'laravel-elixir-vue'</span>);

elixir(<span class="hljs-function"><span class="hljs-params">mix</span> =&gt;</span> {
  mix.webpack(<span class="hljs-string">'main.js'</span>);
});</code></pre>
<p><code>mix.webpack('main.js')</code> 是将 <code>resources/assets/js</code> 下的所有文件进行编译合并，合并到 <code>public/js/main.js</code> 文件。</p>
<h3 id="articleHeader2">步骤三：配置 <code>Vue</code> 并创建基础例子</h3>
<p><strong>1. 在 <code>resources/assets</code> 文件夹下 创建 <code>js/main.js</code> 文件，该文件主要引入 vue 、<code>vue-router</code> 等所需的包。</strong></p>
<p><code>main.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Example from './components/Example.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/example', component: Example }
  ]
})

new Vue(Vue.util.extend({ router }, App)).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue/dist/vue.js'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

Vue.use(VueRouter)

<span class="hljs-keyword">import</span> Example <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Example.vue'</span>

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">base</span>: __dirname,
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/example'</span>, <span class="hljs-attr">component</span>: Example }
  ]
})

<span class="hljs-keyword">new</span> Vue(Vue.util.extend({ router }, App)).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>由于 <code>vue-router</code> 需要 <code>Vue.js 0.12.10+</code> 并不支持 <code>Vue.js 2.0</code>，因此以上的是根据 <code>vue-router v2.0.0+</code> 的版本配置，配置跟 <code>0.12.10+</code> 有明显区别。</p>
<p><strong>2. 在 js 文件夹下创建 App.vue 文件</strong></p>
<p><code>App.vue</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <router-view></router-view>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p><strong>3. 在 <code>js</code> 文件夹下创建 <code>components/Example.vue</code> 文件</strong></p>
<p><code>Example.vue</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <h1>"{{" msg "}}"</h1>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'This is a Example~!'
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">msg</span>: <span class="hljs-string">'This is a Example~!'</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>到此 <code>vue</code> 的配置已完成，接下来需要配置一下 <code>Laravel</code>, 让 <code>Laravel</code> 成功引导到 <code>Vue</code></p>
<h3 id="articleHeader3">步骤四：定义路由、编译合并 <code>JS</code> 代码</h3>
<p><strong>1. 定义路由，在 <code>app/Http/routes.php</code> 加入：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Route::get('example', function () {
    return view('example');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php">Route::get(<span class="hljs-string">'example'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> view(<span class="hljs-string">'example'</span>);
});</code></pre>
<p><strong>2. 创建 <code>example.blade.php</code> 模板</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Example</title>
</head>
<body>
  <div id=&quot;app&quot;></div>

  <script src=&quot;"{{" asset('js/main.js') "}}"&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Example<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""{{" asset('js/main.js') "}}""</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>3. 编译合并 <code>JS</code> 代码</strong></p>
<p>在命令行下，输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gulp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">gulp</span></code></pre>
<p>如需实时编译，可输入 <code>gulp watch</code></p>
<h3 id="articleHeader4">步骤五：访问</h3>
<p><strong>最后通过浏览器访问：<a href="https://pigjian.com" rel="nofollow noreferrer" target="_blank">http://laravel.app/example</a></strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760621" src="https://static.alili.tech/img/remote/1460000006760621" alt="vue-laravel-example" title="vue-laravel-example" style="cursor: pointer; display: inline;"></span></p>
<h5><a href="https://pigjian.com/article/laravel-vue" rel="nofollow noreferrer" target="_blank">Laravel5.1 + Vue2.0 组件化配置</a></h5>
<h5><a href="https://github.com/jcc/vue-laravel-example" rel="nofollow noreferrer" target="_blank">https://github.com/jcc/vue-laravel-example</a></h5>
<p>更多请关注<a href="http://laravel.so" rel="nofollow noreferrer" target="_blank">Laravel.so</a>、<a href="https://pigjian.com" rel="nofollow noreferrer" target="_blank">PIGJIAN BLOG</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Laravel 中使用 Vue 组件化开发（配置）

## 原文链接
[https://segmentfault.com/a/1190000006650349](https://segmentfault.com/a/1190000006650349)

