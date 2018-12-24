---
title: 'Vue2.0构建——踩过的坑' 
date: 2018-12-25 2:30:11
hidden: true
slug: y4jus53sg0h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>vue.js 初步学习</strong></h2>
<p>传说中的vue 全家桶 ：vue +  vue-router +  vuex </p>
<p><strong>1、构建新项目（基于webpack 3.8.1，前提安装node环境）</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --global vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>npm install --global vue-cli
<span class="hljs-variable">$ </span>vue init webpack my-project
<span class="hljs-variable">$ </span>cd my-project
<span class="hljs-variable">$ </span>npm install
<span class="hljs-variable">$ </span>npm run dev

</code></pre>
<blockquote>注意：进行项目创建和初始化之后是没有一些依赖包的，目录中的node_moduless文件夹是没有的，这个时候我们就要进入项目的目录下，使用"npm install"来初始化依赖包，初始化需要的包都在package.json里面设置好了。</blockquote>
<p><strong>2、vue-loader</strong></p>
<p>vue-loader其实就是一个webpack的loader。用来把vue组件转换成可部署的js,html,css模块。如果要想在vue项目中使用scss,要告诉vue-loader怎么样解析我的scss文件。</p>
<p>在webpack中，所有预处理器都要匹配相应的loader,vue-loader允许其他的webpack loader处理组件中的代码，然后它根据lang属性自动判断出要使用的loaders。 因为在新版本的vue-cli已经帮我们把sass-loader配置好了，放在了util.js里面。 所以无需在webpack.base.config.js对scss进行配置，只要安装处理sass/scss的loader，就能在vue中使用scss了。</p>
<p>（1）、Vue对scss的依赖</p>
<p>①、首先安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install node-sass --save-dev
$ npm install sass-loader --save-dev " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>$ npm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --save-dev
$ npm install sass-loader --save-dev </code></pre>
<p>②、在需要用到scss的地方标注：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;scss&quot;> </style>
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined"> </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 </code></pre>
<p><strong>3、配置文件</strong></p>
<p>（1）、解释一下webpack.base.config.js，webpack.base.conf.js是一个基础的的环境配置文件，里面包含各个环境（包括开发环境，生产环境，测试环境）都需要的配置，即公用部分。比如说入口文件和输出文件这类，然后开发环境的webpack.dev.conf.js中开头位置有这么一句：<br>const devWebpackConfig = merge(baseWebpackConfig,  // 将 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置进行合并，这样重复的配置代码就不用写两次了。</p>
<p>（2）、使用两个独立的Webpack配置文件，一个用于开发（webpack.dev.conf.js），另一个用于生产(webpack.prod.conf.js),共用的配置部分放在webpack.base.conf.js中。</p>
<p>（3）、在build/build.js文件中定义变量：process.env.NODE_ENV = 'production'(在使用webpack和vue-cli构建的项目中，Vue会根据 process.env.NODE_ENV 决定是否启用生产环境模式，默认为开发模式)</p>
<p><strong>4、项目结构</strong><br>(1)、整体项目目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--build   
--config  
--dist   //npm run build 之后再生成的目录
--src  
  --components   // 存放组件
  --page    //页面组件，由vue-router引入
  --router  //路由
  --store   // 数据流管理
  main.js   //入口文件
  app.vue   //主组件 
--static   //静态文件目录
.babelrc    
.gitignore  //git忽略上传文件
index.html  //静态文件入口
package.json  //配置文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">-build   
</span>-<span class="ruby">-config  
</span>-<span class="ruby">-dist   /<span class="hljs-regexp">/npm run build 之后再生成的目录
</span></span>-<span class="ruby"><span class="hljs-regexp">-src  
</span></span>  -<span class="ruby"><span class="hljs-regexp">-components   /</span><span class="hljs-regexp">/ 存放组件
</span></span>  -<span class="ruby"><span class="hljs-regexp">-page    /</span><span class="hljs-regexp">/页面组件，由vue-router引入
</span></span>  -<span class="ruby"><span class="hljs-regexp">-router  /</span><span class="hljs-regexp">/路由
</span></span>  -<span class="ruby"><span class="hljs-regexp">-store   /</span><span class="hljs-regexp">/ 数据流管理
</span></span>  main.js   //入口文件
  app.vue   //主组件 
-<span class="ruby"><span class="hljs-regexp">-static   /</span><span class="hljs-regexp">/静态文件目录
</span></span>.babelrc    
.gitignore  //git忽略上传文件
index.html  //静态文件入口
package.json  //配置文件
</code></pre>
<p>(2)、main.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
//开启debug模式
Vue.config.debug = true

new Vue({
  el: '#app',
  router, // 创建和挂载根实例。记得要通过 router 配置参数注入路由
  template: '<App/>',
  components: { App },
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;

Vue.config.productionTip = <span class="hljs-keyword">false</span>;
<span class="hljs-comment">//开启debug模式</span>
Vue.config.debug = <span class="hljs-keyword">true</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router, <span class="hljs-comment">// 创建和挂载根实例。记得要通过 router 配置参数注入路由</span>
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App },
});
</code></pre>
<p>(3)、app.vue文件</p>
<blockquote>app.vue是我们的主组件，所有页面都是在App.vue下进行切换的,app.vue在所有页面都有，通常将公用的组件放在里面</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <main-header></main-header>
    <mainSidebar/>
    <!-- Content Wrapper. Contains page content -->
    <router-view></router-view>
    <!-- /.content-wrapper -->
    <MainFooter/>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">main-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mainSidebar</span>/&gt;</span>
    <span class="hljs-comment">&lt;!-- Content Wrapper. Contains page content --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- /.content-wrapper --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">MainFooter</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p><strong>5、npm run build 后生成的dist文件访问本地static路径下的data.json数据有问题，需要修改productionSourceMap属性为false</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" module.exports = {
  build:{
     assetsSubDirectory: 'static',  //修改这里成你项目放置静态文件的目录
     assetsPublicPath: './',     //修改这里成你项目放置静态文件的目录
     productionSourceMap: false     //修改为false
  }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code> <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  build:{
     assetsSubDirectory: <span class="hljs-string">'static'</span>,  <span class="hljs-comment">//修改这里成你项目放置静态文件的目录</span>
     assetsPublicPath: <span class="hljs-string">'./'</span>,     <span class="hljs-comment">//修改这里成你项目放置静态文件的目录</span>
     productionSourceMap: <span class="hljs-keyword">false</span>     <span class="hljs-comment">//修改为false</span>
  }
 }
</code></pre>
<p><strong>6、异步DOM更新</strong>   </p>
<p>如果需要拿到更新后dom中的数据，则需要通过 Vue.nextTick(callback)，在DOM更新后，执行某个操作（属于DOM操作）<br>实例调用vm.$nextTick(function () {})</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  fn() {
    this.msg = 'change'
    this.$nextTick(function () {
      console.log('$nextTick中打印：', this.$el.children[0].innerText);
    })
  }
}

   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>methods: {
  fn() {
    <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">'change'</span>
    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'$nextTick中打印：'</span>, <span class="hljs-keyword">this</span>.$el.children[<span class="hljs-number">0</span>].innerText);
    })
  }
}

   
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0构建——踩过的坑

## 原文链接
[https://segmentfault.com/a/1190000012125570](https://segmentfault.com/a/1190000012125570)

