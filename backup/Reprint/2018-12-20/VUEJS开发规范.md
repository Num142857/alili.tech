---
title: 'VUEJS开发规范' 
date: 2018-12-20 2:30:10
hidden: true
slug: ckn5cx86xz8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">VUEJS开发规范</h2>
<ol>
<li>基于组件化开发理解</li>
<li>组件命名规范</li>
<li>结构化规范</li>
<li>注释规范</li>
<li>编码规范</li>
</ol>
<hr>
<h3 id="articleHeader1">基于组件化开发理解</h3>
<ul>
<li>
<p>什么是组件？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     组件其实就是页面组成的一部分，好比是电脑中的每一个元件（如硬盘、键盘、鼠标），它是一个具有独立的逻辑和功能或界面，同时又能根据规定的接口规则进行相互融化，变成一个完整的应用。
     页面只不过是这样组件的容器，组件自由组合形成功能完整的界面，当不需要某个组件，或者想要替换某个组件时，可以随时进行替换和删除，而不影响整个应用的运行。前端组件化的核心思想就是将一个巨大复杂的东西拆分成粒度合理的小东西。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>     组件其实就是页面组成的一部分，好比是电脑中的每一个元件（如硬盘、键盘、鼠标），它是一个具有独立的逻辑和功能或界面，同时又能根据规定的接口规则进行相互融化，变成一个完整的应用。
     页面只不过是这样组件的容器，组件自由组合形成功能完整的界面，当不需要某个组件，或者想要替换某个组件时，可以随时进行替换和删除，而不影响整个应用的运行。前端组件化的核心思想就是将一个巨大复杂的东西拆分成粒度合理的小东西。</code></pre>
</li>
<li>
<p>组件化开发的好处</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   提高开发效率
   方便重复使用
   简化调试步骤
   提升整个项目的可维护性
   便于协同开发
   使其高内聚，低耦合，达到分治与复用的目的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>   提高开发效率
   方便重复使用
   简化调试步骤
   提升整个项目的可维护性
   便于协同开发
   使其高内聚，低耦合，达到分治与复用的目的。</code></pre>
</li>
<li>
<p>组件化和模块化的区别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   组件化是从产品功能角度进行分割，模块化是从代码实现角度进行分割，模块化是组件化的前提和基础。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">   组件化是从产品功能角度进行分割，模块化是从代码实现角度进行分割，模块化是组件化的前提和基础。</code></pre>
</li>
<li>
<p>Vue组件化开发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   单文件系统，样式局部作用域
   基本组成结构：<template/> <script/> <style scoped/>
   组件注册方式：1）公共组件全局注册 2）其余组件局部注册" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>   单文件系统，样式局部作用域
   基本组成结构：<span class="hljs-tag">&lt;<span class="hljs-name">template</span>/&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">script</span>/&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>/&gt;</span><span class="undefined">
   组件注册方式：1）公共组件全局注册 2）其余组件局部注册</span></code></pre>
</li>
</ul>
<h3 id="articleHeader2">组件命名规范</h3>
<p>Vue官方文档给予以下说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。
PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>当注册组件 <span class="hljs-comment">(或者 prop)</span> 时，可以使用 kebab-case <span class="hljs-comment">(短横线分隔命名)</span>、camelCase <span class="hljs-comment">(驼峰式命名)</span> 或 PascalCase <span class="hljs-comment">(单词首字母大写命名)</span>。
PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。</code></pre>
<p>命名可遵循以下规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1、有意义的名词、简短、具有可读性
 2、以小写开头，采用短横线分割命名
 3、公共组件命名以公司名称简拼为命名空间(app-xx.vue)
 4、文件夹命名主要以功能模块代表命名
 同时还需要注意：必须符合自定义元素规范: 使用连字符分隔单词，切勿使用保留字。app- 前缀作为命名空间: 如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code> 1、有意义的名词、简短、具有可读性
 2、以小写开头，采用短横线分割命名
 3、公共组件命名以公司名称简拼为命名空间(<span class="hljs-keyword">app</span>-xx.vue)
 4、文件夹命名主要以功能模块代表命名
 同时还需要注意：必须符合自定义元素规范: 使用连字符分隔单词，切勿使用保留字。<span class="hljs-keyword">app</span>- 前缀作为命名空间: 如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。  </code></pre>
<h3 id="articleHeader3">结构化规范</h3>
<ul>
<li>
<p>基于Vue-cli脚手架的结构基础划分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   ├── index.html                      入口页面
   ├── build                           构建脚本目录
   │   ├── build-server.js                 运行本地构建服务器，可以访问构后的页面
   │   ├── build.js                        生产环境构建脚本
   │   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
   │   ├── dev-server.js                   运行本地开发服务器
   │   ├── utils.js                        构建相关工具方法
   │   ├── webpack.base.conf.js            wabpack基础配置
   │   ├── webpack.dev.conf.js             wabpack开发环境配置
   │   └── webpack.prod.conf.js            wabpack生产环境配置
   ├── config                          项目配置
   │   ├── dev.env.js                      开发环境变量
   │   ├── index.js                        项目配置文件
   │   ├── prod.env.js                     生产环境变量
   │   └── test.env.js                     测试环境变量
   ├── mock                            mock数据目录
   │   └── hello.js
   ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
   ├── src                             项目源码目录    
   │   ├── main.js                         入口js文件
   │   ├── App.vue                         根组件
   │   ├── components                      公共组件目录
   │   │   └── title.vue
   │   ├── assets                          资源目录，这里的资源会被wabpack构建
   │   │   ├── css                         公共样式文件目录
   │   │   ├── js                          公共js文件目录
   │   │   └── img                      图片存放目录
   │   ├── routes                          前端路由
   │   │   └── index.js
   │   ├── store                           应用级数据（state）
   │   │   └── index.js
   │   └── views                           页面目录
   │       ├── hello.vue
   │       └── notfound.vue
   ├── static                          纯静态资源，不会被wabpack构建。
   └── test                            测试文件目录（unit&amp;e2e）
       └── unit                            单元测试
           ├── index.js                        入口脚本
           ├── karma.conf.js                   karma配置文件
           └── specs                           单测case目录
               └── Hello.spec.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>   ├── index<span class="hljs-selector-class">.html</span>                      入口页面
   ├── build                           构建脚本目录
   │   ├── build-server<span class="hljs-selector-class">.js</span>                 运行本地构建服务器，可以访问构后的页面
   │   ├── build<span class="hljs-selector-class">.js</span>                        生产环境构建脚本
   │   ├── dev-client<span class="hljs-selector-class">.js</span>                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
   │   ├── dev-server<span class="hljs-selector-class">.js</span>                   运行本地开发服务器
   │   ├── utils<span class="hljs-selector-class">.js</span>                        构建相关工具方法
   │   ├── webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>            wabpack基础配置
   │   ├── webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>             wabpack开发环境配置
   │   └── webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>            wabpack生产环境配置
   ├── config                          项目配置
   │   ├── dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>                      开发环境变量
   │   ├── index<span class="hljs-selector-class">.js</span>                        项目配置文件
   │   ├── prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>                     生产环境变量
   │   └── test<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>                     测试环境变量
   ├── mock                            mock数据目录
   │   └── hello<span class="hljs-selector-class">.js</span>
   ├── package<span class="hljs-selector-class">.json</span>                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
   ├── src                             项目源码目录    
   │   ├── main<span class="hljs-selector-class">.js</span>                         入口js文件
   │   ├── App<span class="hljs-selector-class">.vue</span>                         根组件
   │   ├── components                      公共组件目录
   │   │   └── title<span class="hljs-selector-class">.vue</span>
   │   ├── assets                          资源目录，这里的资源会被wabpack构建
   │   │   ├── css                         公共样式文件目录
   │   │   ├── js                          公共js文件目录
   │   │   └── <span class="hljs-selector-tag">img</span>                      图片存放目录
   │   ├── routes                          前端路由
   │   │   └── index<span class="hljs-selector-class">.js</span>
   │   ├── store                           应用级数据（state）
   │   │   └── index<span class="hljs-selector-class">.js</span>
   │   └── views                           页面目录
   │       ├── hello<span class="hljs-selector-class">.vue</span>
   │       └── notfound<span class="hljs-selector-class">.vue</span>
   ├── static                          纯静态资源，不会被wabpack构建。
   └── test                            测试文件目录（unit&amp;e2e）
       └── unit                            单元测试
           ├── index<span class="hljs-selector-class">.js</span>                        入口脚本
           ├── karma<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>                   karma配置文件
           └── specs                           单测case目录
               └── Hello<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.js</span>
</code></pre>
</li>
<li>vue文件基本结构</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <template>
          <div>
            <!--必须在div中编写页面-->
          </div>
        </template>
        <script>
          export default {
            components : {
            },
            data () {
              return {
              }
            },
            methods: {
            },
            mounted() {
        
            }
         }
        </script>
        <!--声明语言，并且添加scoped-->
        <style lang=&quot;less&quot; scoped>
        </style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">        <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!--必须在div中编写页面--&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
          <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
            components : {
            }</span><span class="xml"><span class="undefined">,
            data () </span></span><span class="hljs-template-variable">{
              return {
              }</span><span class="xml"><span class="undefined">
            },
            methods: </span></span><span class="hljs-template-variable">{
            }</span><span class="xml"><span class="undefined">,
            mounted() </span></span><span class="hljs-template-variable">{
        
            }</span><span class="xml"><span class="undefined">
         }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-comment">&lt;!--声明语言，并且添加scoped--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<ul><li>
<p>vue文件方法声明顺序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    - components   
    - props    
    - data     
    - created
    - mounted
    - activited
    - update
    - beforeRouteUpdate
    - metods   
    - filter
    - computed
    - watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>    -<span class="ruby"> components   
</span>    -<span class="ruby"> props    
</span>    -<span class="ruby"> data     
</span>    -<span class="ruby"> created
</span>    -<span class="ruby"> mounted
</span>    -<span class="ruby"> activited
</span>    -<span class="ruby"> update
</span>    -<span class="ruby"> beforeRouteUpdate
</span>    -<span class="ruby"> metods   
</span>    -<span class="ruby"> filter
</span>    -<span class="ruby"> computed
</span>    -<span class="ruby"> watch</span></code></pre>
</li></ul>
<h3 id="articleHeader4">注释规范</h3>
<p>代码注释在一个项目的后期维护中显的尤为重要，所以我们要为每一个被复用的组件编写组件使用说明，为组件中每一个方法编写方法说明。<br>以下情况，务必添加注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.公共组件使用说明
2.各组件中重要函数或者类说明
3.复杂的业务逻辑处理说明
4.特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
5.注释块必须以/**（至少两个星号）开头**/；
6.单行注释使用//；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>公共组件使用说明
<span class="hljs-number">2.</span>各组件中重要函数或者类说明
<span class="hljs-number">3.</span>复杂的业务逻辑处理说明
<span class="hljs-number">4.</span>特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
<span class="hljs-number">5.</span>注释块必须以<span class="hljs-comment">/**（至少两个星号）开头**/</span>；
<span class="hljs-number">6.</span>单行注释使用<span class="hljs-comment">//；</span>
</code></pre>
<ul>
<li>
<p>单行注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   普通方法一般使用单行注释// 来说明该方法主要作用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>   普通方法一般使用单行注释<span class="hljs-comment">// 来说明该方法主要作用</span>
</code></pre>
</li>
<li>
<p>多行注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   组件使用说明，和调用说明 
   <!--公用组件：数据表格
      /**
      * 组件名称
      * @module 组件存放位置
      * @desc 组件描述
      * @author 组件作者
      * @date 2017年12月05日17:22:43
      * @param {Object} [title]    - 参数说明
      * @param {String} [columns] - 参数说明
      * @example 调用示例
      *  <hbTable :title=&quot;title&quot; :columns=&quot;columns&quot; :tableData=&quot;tableData&quot;></hbTable>
          */
       -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">   组件使用说明，和调用说明 
   <span class="hljs-comment">&lt;!--公用组件：数据表格
      /**
      * 组件名称
      * @module 组件存放位置
      * @desc 组件描述
      * @author 组件作者
      * @date 2017年12月05日17:22:43
      * @param </span></span><span class="hljs-template-variable">{Object}</span><span class="xml"><span class="hljs-comment"> [title]    - 参数说明
      * @param </span></span><span class="hljs-template-variable">{String}</span><span class="xml"><span class="hljs-comment"> [columns] - 参数说明
      * @example 调用示例
      *  &lt;hbTable :title="title" :columns="columns" :tableData="tableData"&gt;&lt;/hbTable&gt;
          */
       --&gt;</span></span></code></pre>
</li>
</ul>
<h3 id="articleHeader5">编码规范</h3>
<p>优秀的项目源码，即使是多人开发，看代码也如出一人之手。统一的编码规范，可使代码更易于阅读，易于理解，易于维护。<strong>尽量按照ESLint格式要求编写代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.使用ES6风格编码源码
        定义变量使用let ,定义常量使用const
        使用export ，import 模块化
    2.组件 props 原子化
        提供默认值
        使用 type 属性校验类型
        使用 props 之前先检查该 prop 是否存在
    3.避免 this.$parent
    4.谨慎使用 this.$refs
    5.无需将 this 赋值给 component 变量
    6.调试信息console.log() debugger 使用完及时删除
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>    <span class="hljs-number">1.</span>使用ES6风格编码源码
        定义变量使用<span class="hljs-keyword">let</span> ,定义常量使用<span class="hljs-keyword">const</span>
        使用<span class="hljs-keyword">export</span> ，<span class="hljs-keyword">import</span> 模块化
    <span class="hljs-number">2.</span>组件 props 原子化
        提供默认值
        使用 type 属性校验类型
        使用 props 之前先检查该 prop 是否存在
    <span class="hljs-number">3.</span>避免 <span class="hljs-keyword">this</span>.$<span class="hljs-built_in">parent</span>
    <span class="hljs-number">4.</span>谨慎使用 <span class="hljs-keyword">this</span>.$refs
    <span class="hljs-number">5.</span>无需将 <span class="hljs-keyword">this</span> 赋值给 component 变量
    <span class="hljs-number">6.</span>调试信息<span class="hljs-built_in">console</span>.log() <span class="hljs-keyword">debugger</span> 使用完及时删除
    </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUEJS开发规范

## 原文链接
[https://segmentfault.com/a/1190000012610056](https://segmentfault.com/a/1190000012610056)

