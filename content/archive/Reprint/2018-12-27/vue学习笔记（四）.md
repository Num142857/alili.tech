---
title: 'vue学习笔记（四）' 
date: 2018-12-27 2:30:13
hidden: true
slug: pagbdcgd187
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、vue-router</h1>
<h2 id="articleHeader1">1、简介</h2>
<p>我们经常使用vue开发单页面应用程序（SPA）。在开发SPA过程中，路由是必不可少的部分，vue的官方推荐是vue-router。单页面应用程序看起来好像是一个页面，其实是在一个页面中切换不同的html部分，从而达到所谓的单页面,在这切换之中，就需要使用路由来实现不同的页面内容的展现。</p>
<h2 id="articleHeader2">2、基本用法</h2>
<h3 id="articleHeader3">（1）.使用步骤</h3>
<p>vue-router的基本使用步骤如下：</p>
<ul>
<li>定义需要切换的组件</li>
<li>配置路由，规定路径到组件的映射关系</li>
<li>创建路由实例</li>
<li>将路由挂载到vue实例</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//1.定义组件，用于路由切换
var Home = {
    template: '<div>我是主页</div>'
}
var News = {
    template: '<div>我是新闻</div>'
}

//2.配置路由
const routes = [{
        path: '/home',
        component: Home
    },{
        path: '/news',
        component: News
    },{ //这一路由配置用于首次访问或者找不到所请求路由，自动跳转home页
        path: '*',
        redirect: '/home'
}];

//3.创建路由实例
var router = new VueRouter({
    routes  //传入配置好的路由信息
});

//4.挂载路由到根组件
new Vue({
    el: '#app',
    router 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//1.定义组件，用于路由切换</span>
<span class="hljs-keyword">var</span> Home = {
    template: <span class="hljs-string">'&lt;div&gt;我是主页&lt;/div&gt;'</span>
}
<span class="hljs-keyword">var</span> News = {
    template: <span class="hljs-string">'&lt;div&gt;我是新闻&lt;/div&gt;'</span>
}

<span class="hljs-comment">//2.配置路由</span>
<span class="hljs-keyword">const</span> routes = [{
        path: <span class="hljs-string">'/home'</span>,
        component: Home
    },{
        path: <span class="hljs-string">'/news'</span>,
        component: News
    },{ <span class="hljs-comment">//这一路由配置用于首次访问或者找不到所请求路由，自动跳转home页</span>
        path: <span class="hljs-string">'*'</span>,
        redirect: <span class="hljs-string">'/home'</span>
}];

<span class="hljs-comment">//3.创建路由实例</span>
<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
    routes  <span class="hljs-comment">//传入配置好的路由信息</span>
});

<span class="hljs-comment">//4.挂载路由到根组件</span>
<span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    router 
});</code></pre>
<p>这样我们就配置好了一个完整的路由。在切换组件的时候会根据路由加载不同的组件。我们使用类似a标签的<code>&lt;router-link to="url"&gt;&lt;/router-link&gt;</code>触发组件的切换，<code>to</code>属性存放的是路径。使用<code>&lt;router-view&gt;&lt;/router-view&gt;</code>来显示所切换组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <router-link to=&quot;/home&quot;>主页</router-link>
    <router-link to=&quot;/news&quot;>新闻</router-link>

    <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/news"</span>&gt;</span>新闻<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这样我们就可以实现主页和新闻组件间的切换。</p>
<h3 id="articleHeader4">（2）.参数传递</h3>
<p>可能我们需要向所切换组件传递参数。vue提供了两种向组件传递参数的方式。</p>
<ul>
<li>查询字符串的形式</li>
<li><ul><li>/home?name=dawei&amp;pwd=666</li></ul></li>
<li><ul><li>在组件内部使用<code>"{{"$route.query"}}"</code>接收参数</li></ul></li>
<li>rest风格</li>
<li><ul><li>/news/param1/param2</li></ul></li>
<li><ul><li>在组件内部使用<code>"{{"$route.params"}}"</code>接收参数</li></ul></li>
</ul>
<h3 id="articleHeader5">（3）.路由嵌套</h3>
<p>路由还可以多层嵌套使用，使用<code>children</code>属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path:'/user',
    component:User,
    children:[
        {
            path:'login',  
            component:Login
        },
        {
            path:'regist',
            component:Regist
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">path</span>:<span class="hljs-string">'/user'</span>,
    component:User,
    children:[
        {
            path:<span class="hljs-string">'login'</span>,  
            component:Login
        },
        {
            <span class="hljs-attribute">path</span>:<span class="hljs-string">'regist'</span>,
            component:Regist
        }
    ]
}</code></pre>
<p>子路由项路径不要使用<code>/</code>开头，以 <code>/ </code>开头的嵌套路径会被当作根路径。</p>
<p>在组件中就可以使用该路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <h3>用户信息</h3>
    <ul>
        <router-link to=&quot;/user/login&quot;>用户登陆</router-link>
        <router-link to=&quot;/user/regist&quot;>用户注册</router-link>
    </ul>
    <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>用户信息<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/login"</span>&gt;</span>用户登陆<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/regist"</span>&gt;</span>用户注册<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>注意路径的写法。</p>
<h2 id="articleHeader6">3、路由实例的方法</h2>
<p>这里学习两个路由实例的方法：<code>router.push()</code>和<code>router.replace()</code>。</p>
<ul>
<li>router.push()：添加路由，功能上与<code>&lt;route-link&gt;</code>相同</li>
<li>
<p>router.replace()： 替换路由，不产生历史记录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push({path:'home'})

router.replace({path:'user'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({<span class="hljs-attribute">path</span>:<span class="hljs-string">'home'</span>})

<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.replace</span>({<span class="hljs-attribute">path</span>:<span class="hljs-string">'user'</span>})</code></pre>
</li>
</ul>
<h2 id="articleHeader7">4、路由结合动画</h2>
<p>路由结合动画使用很简单，我们可以用 &lt;transition&gt; 组件给它添加一些动画效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition>
  <router-view></router-view>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;transition&gt;</span>
  <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
<span class="hljs-section">&lt;/transition&gt;</span></code></pre>
<h1 id="articleHeader8">二、单文件组件</h1>
<h2 id="articleHeader9">1、.vue文件</h2>
<p><code>.vue</code>文件称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js代码。</p>
<p><code>.vue</code>文件由三部分组成：<code>&lt;template&gt;</code>、<code>&lt;style&gt;</code>、<code>&lt;script&gt;</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    //html  
</template>

<script>
    //js    
</script>

<style>
    //css      
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    //html  
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">//js    </span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    //css      
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h2 id="articleHeader10">2、vue-loader</h2>
<p>浏览器本身并不认识.vue文件，此时需要vue-loader对.vue文件进行加载解析，。类似的loader还有许多，如：html-loader、css-loader、style-loader、babel-loader等。需要注意的是vue-loader是基于webpack的。</p>
<h2 id="articleHeader11">3、webpack</h2>
<p>webpack是一个前端资源模板化加载器和打包工具，它能够把各种资源都作为模块来使用和处理。实际上，webpack是通过不同的loader将这些资源加载后打包，然后输出打包后文件。简单来说，webpack就是一个模块加载器，所有资源都可以作为模块来加载，最后打包输出。</p>
<h1 id="articleHeader12">三、vue-cli</h1>
<h2 id="articleHeader13">1. 简介</h2>
<p>vue-cli是一个vue脚手架，可以帮助我们快速构造项目结构，减少开发人员开发阻力。vue-cli集成了多种版本：</p>
<ul>
<li>simple  ：比较简单</li>
<li>webpack ：包含ESLint代码规范检查和unit单元测试等</li>
<li>webpack-simple： 没有代码规范检查和单元测试</li>
<li>browserify： 使用的也比较多</li>
<li>browserify-simple</li>
</ul>
<h2 id="articleHeader14">2.安装、操作步骤</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安装vue-cli，配置vue命令环境 
    cnpm install vue-cli -g
    vue --version
    vue list

// 初始化项目，生成项目模板
    vue init 模板名  项目名

//进入生成的项目目录，安装模块包
    cd vue-cli-demo
    cnpm install

//运行
    npm run dev  //启动测试服务
    npm run build //将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//安装vue-cli，配置vue命令环境 </span>
    cnpm install vue-<span class="hljs-keyword">cli</span> -<span class="hljs-keyword">g</span>
    vue --<span class="hljs-keyword">version</span>
    vue <span class="hljs-keyword">list</span>

<span class="hljs-comment">// 初始化项目，生成项目模板</span>
    vue init 模板名  项目名

<span class="hljs-comment">//进入生成的项目目录，安装模块包</span>
    <span class="hljs-keyword">cd</span> vue-<span class="hljs-keyword">cli</span>-demo
    cnpm install

<span class="hljs-comment">//运行</span>
    npm <span class="hljs-keyword">run</span> dev  <span class="hljs-comment">//启动测试服务</span>
    npm <span class="hljs-keyword">run</span> build <span class="hljs-comment">//将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上</span></code></pre>
<h2 id="articleHeader15">3.文件介绍</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                     // vue组件
|   |-- store                          // 状态管理
|   |-- App.vue                        // 页面入口vue文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件
|   |-- data                           
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico                      //网页图标
|-- index.html                       // 入口页面
|-- package.json                     // 项目配置信息
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>.
|<span class="hljs-string">-- build                            // 项目构建(webpack)相关代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- build.js                     // 生产环境构建代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- check-version.js             // 检查node、npm等版本
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev-client.js                // 热重载相关
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev-server.js                // 构建本地服务器
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- utils.js                     // 构建工具相关
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.base.conf.js         // webpack基础配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.dev.conf.js          // webpack开发环境配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.prod.conf.js         // webpack生产环境配置
</span>|<span class="hljs-string">-- config                           // 项目开发环境配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev.env.js                   // 开发环境变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js                     // 项目一些配置变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- prod.env.js                  // 生产环境变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- test.env.js                  // 测试环境变量
</span>|<span class="hljs-string">-- src                              // 源码目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- components                     // vue组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- store                          // 状态管理
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- App.vue                        // 页面入口vue文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- main.js                        // 程序入口文件，加载各种公共组件
</span>|<span class="hljs-string">-- static                           // 静态文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- data                           
</span>|<span class="hljs-string">-- .babelrc                         // ES6语法编译配置
</span>|<span class="hljs-string">-- .editorconfig                    // 定义代码格式
</span>|<span class="hljs-string">-- .gitignore                       // git上传需要忽略的文件格式
</span>|<span class="hljs-string">-- README.md                        // 项目说明
</span>|<span class="hljs-string">-- favicon.ico                      //网页图标
</span>|<span class="hljs-string">-- index.html                       // 入口页面
</span>|<span class="hljs-string">-- package.json                     // 项目配置信息
.</span></code></pre>
<blockquote><p>此列表拷贝自：<a href="https://segmentfault.com/a/1190000007880723">https://segmentfault.com/a/11...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue学习笔记（四）

## 原文链接
[https://segmentfault.com/a/1190000011732022](https://segmentfault.com/a/1190000011732022)

