---
title: 'vue.js 异步组件' 
date: 2019-01-28 2:30:09
hidden: true
slug: g224l9wdiv
categories: [reprint]
---

{{< raw >}}

                    
<p>使用时才装入需要的组件，可以有效的提高首次装入页面的速度。比如在路由切换时</p>
<h4>异步组件的实现</h4>
<p>Vue.js允许将组件定义为一个工厂函数，动态地解析组件的定义。工厂函数接收一个resolve回调，成功获取组件定义时调用。也可以调用reject(reason)指示失败。</p>
<p>假设我们有两个组件Home、About。Home组件和首页同步加载，而About组件则按需加载。案例的代码有首页index.html，组件代码about.js构成。</p>
<p>首先是about.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('about', {
  template: '<div>About page</div>'
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Vue.component('<span class="hljs-keyword">about</span>', {
  template: '&lt;<span class="hljs-keyword">div</span>&gt;About page&lt;/<span class="hljs-keyword">div</span>&gt;'
});
</code></pre>
<p>接下来是index.html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  <title>Async Component test</title>
</head>
<body>

  <div id=&quot;app&quot;>
    <router-link to=&quot;/home&quot;>/home</router-link>
    <router-link to=&quot;/about&quot;>/about</router-link>
    <router-view></router-view>
  </div>

  <script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
  <script src=&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;></script>
  <script>
    function load(componentName, path) {
      return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = path;
        script.async = true;
        script.onload = function() {
          var component = Vue.component(componentName);
          if (component) {
            resolve(component);
          } else {
            reject();
          }
        };
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    var router = new VueRouter({
      routes: [
        {
          path: '/',
          redirect:'/home'
        },
        {
          path: '/home',
          component: {
            template: '<div>Home page</div>'
          },
        },
        {
          path: '/about',
          component: function(resolve, reject) {
            load('about', 'about.js').then(resolve, reject);
          }
        }
      ]
    });
    var app = new Vue({
      el: '#app',
      router: router,
    });
  </script>

</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Async Component test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>/home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>/about<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue-router/dist/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">load</span>(<span class="hljs-params">componentName, path</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
        script.src = path;
        script.async = <span class="hljs-literal">true</span>;
        script.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">var</span> component = Vue.component(componentName);
          <span class="hljs-keyword">if</span> (component) {
            resolve(component);
          } <span class="hljs-keyword">else</span> {
            reject();
          }
        };
        script.onerror = reject;
        <span class="hljs-built_in">document</span>.body.appendChild(script);
      });
    }
    <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
      <span class="hljs-attr">routes</span>: [
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
          <span class="hljs-attr">redirect</span>:<span class="hljs-string">'/home'</span>
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/home'</span>,
          <span class="hljs-attr">component</span>: {
            <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;Home page&lt;/div&gt;'</span>
          },
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
            load(<span class="hljs-string">'about'</span>, <span class="hljs-string">'about.js'</span>).then(resolve, reject);
          }
        }
      ]
    });
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
      <span class="hljs-attr">router</span>: router,
    });
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>为了加载在服务器的js文件，我们需要一个HTTP服务器。可以使用node.js的http-server实现。安装并启动一个服务器的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install http-server -g
http-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">http</span>-<span class="hljs-keyword">server</span> -g
<span class="hljs-keyword">http</span>-<span class="hljs-keyword">server</span>
</code></pre>
<p>访问：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://127.0.0.1:8080
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">http:</span><span class="hljs-comment">//127.0.0.1:8080</span>
</code></pre>
<p>我们即可在首页看到home和about的链接，点击home可以显示home组件，点击about，如果还没有加载过，就加载about组件。</p>
<p>对index.html内的代码稍作解释:</p>
<ol>
<li><p>组件定义为<code>function(resolve, reject) {}</code>函数，其内调用load函数，成功后resolve，否则reject</p></li>
<li><p>函数load内通过创建标签<code>script</code>加载指定文件，并通过onload事件当加载完成后，通过<code>Vue.component</code>验证组件，存在就resolve,否则reject</p></li>
</ol>
<h4>异步组件的webpack方案</h4>
<p>如果使用webpack脚手架的方式，加载异步组件将会更加直观。本节会用同样的案例，使用webpack做一次演示。</p>
<p>首先创建脚手架，并安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vuetest
cd vuetest
npm i
npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>vue init webpack vuetest
cd vuetest
npm i
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>访问localhost:8080，可以看到Vue的默认页面。然后替换main.js文件为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import About from './components/about'
Vue.use(VueRouter)

const Home = { template: '<div>home page</div>' }
// const About = { template: '<div>about page</div>' }
const router = new VueRouter({
  routes :[
    { path: '/home', component: Home },
    { path: '/about', component: function (resolve) {
        require(['./components/about'], resolve)
        } 
    },
    { path: '/', redirect: '/home' }
  ]
})
new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>

<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/about'</span>
Vue.use(VueRouter)

<span class="hljs-keyword">const</span> Home = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;home page&lt;/div&gt;'</span> }
<span class="hljs-comment">// const About = { template: '&lt;div&gt;about page&lt;/div&gt;' }</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span> :[
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/home'</span>, <span class="hljs-attr">component</span>: Home },
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/about'</span>], resolve)
        } 
    },
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/home'</span> }
  ]
})
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">router</span>: router,
  <span class="hljs-attr">components</span>: { App }
})</code></pre>
<p>并添加组件about到<code>src/components/about.vue</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>about page</div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>about page<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>再次访问localhost:8080，可以看到Home组件和about组件的链接，点击链接试试，可以看到组件home和about都是可以加载的。</p>
<p>这里特别要解释的是代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="component: function (resolve) {
    require(['./components/about'], resolve)
    } 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/about'</span>], resolve)
    } 
}
</code></pre>
<p>Vue.js支持component定义为一个函数：<code>function (resolve) {}</code>，在函数内，可以使用类似node.js的库引入模式</p>
<p>require(['./components/about'], resolve)</p>
<p>从而大大的简化了异步组件的开发。当然，代价是你需要使用脚手架代码。这个特殊的require语法告诉webpack自动将编译后的代码分割成不同的块，这些块将通过按需自动下载。</p>
<h2 id="articleHeader0">关于</h2>
<p>作者：刘传君</p>
<p>创建过产品，创过业。好读书，求甚解。<br>可以通过 1000copy#gmail.com 联系到我</p>
<h2 id="articleHeader1">出品</h2>
<p>bootstrap小书 <a href="https://www.gitbook.com/book/1000copy/bootstrap/details" rel="nofollow noreferrer" target="_blank">https://www.gitbook.com/book/...</a><br>http小书 <a href="http://www.ituring.com.cn/book/1791" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>Git小书  <a href="http://www.ituring.com.cn/book/1870" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js 异步组件

## 原文链接
[https://segmentfault.com/a/1190000008127586](https://segmentfault.com/a/1190000008127586)

