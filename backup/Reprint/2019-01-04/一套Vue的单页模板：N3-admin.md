---
title: '一套Vue的单页模板：N3-admin' 
date: 2019-01-04 2:30:11
hidden: true
slug: myiqarfowok
categories: [reprint]
---

{{< raw >}}

                    
<p>趁着周末偷来一点闲，总结近期的工作和学习，想着该花点心思把N3-admin这套基于N3-components的单页应用模板简单的给介绍一下。</p>
<blockquote><p>首发于个人博客；<a href="http://blog.lxstart.net/2017/08/13/%E4%B8%80%E5%A5%97Vue%E7%9A%84%E5%8D%95%E9%A1%B5%E6%A8%A1%E6%9D%BF%EF%BC%9AN3-admin/" rel="nofollow noreferrer" target="_blank">blog.lxstart.net</a><br>项目路径: <a href="https://github.com/N3-components/N3-admin" rel="nofollow noreferrer" target="_blank">https://github.com/N3-compone...</a><br>ps: 本项目不同于vue-admin等模板项目介绍大量的组件，基础组件的用法请参考：<a href="https://n3-components.github.io/N3-components/" rel="nofollow noreferrer" target="_blank">https://n3-components.github....</a></p></blockquote>
<p>&lt;!-- more --&gt;</p>
<h2 id="articleHeader0">1、概述</h2>
<p>首先N3-admin是一个基于vue / vuex / vue-router / N3 / axios 的单页应用，适用于单页应用的快速上手，并不仅限于N3-components的使用，而是提供一个<strong>比较完善的项目构建的思路和结构</strong>，提供给初学者学习。同时也是一套可扩展的Vue单页应用开发模板。</p>
<p>项目工程基于Vue-cli，因此大部分同学都能快速上手和理解，往下介绍一下特性和结构。</p>
<h2 id="articleHeader1">2、特性</h2>
<ul>
<li>
<p>[x] 项目工程相关</p>
<ul>
<li><p>[x] 开发环境；静态文件服务器、HTTP代理、热更新</p></li>
<li><p>[x] 生产构建：代码编译提取压缩合并混淆hash命名base64~</p></li>
<li><p>[x] eslint</p></li>
<li><p>[x] babel</p></li>
<li><p>[x] webpack 2.x</p></li>
</ul>
</li>
<li>
<p>[x] vue</p>
<ul>
<li><p>[x] 组件分级 [路由级组件、复用型组件、基础组件(N3)]</p></li>
<li><p>[x] Vue扩展 [filters、directives等]</p></li>
</ul>
</li>
<li>
<p>vue-router</p>
<ul>
<li><p>[x] 二级路由</p></li>
<li><p>[x] 转场动画</p></li>
<li><p>[x] 路由拦截器</p></li>
</ul>
</li>
<li>
<p>vuex</p>
<ul><li><p>[x] 多模块(module)支持</p></li></ul>
</li>
<li>
<p>[x] axios</p>
<ul>
<li><p>[x] 支持多实例</p></li>
<li><p>[x] 请求、响应拦截器</p></li>
<li><p>[x] Vue 扩展，通过实例的方法可访问</p></li>
</ul>
</li>
<li><p>[x] layout 布局</p></li>
<li><p>[x] 全局进度条 Nprogress</p></li>
<li>
<p>[x] css 预处理</p>
<ul>
<li><p>[x] less</p></li>
<li><p>[x] postcss</p></li>
<li><p>[] stylus         &lt;=  仅需安装预处理器和loader</p></li>
<li><p>[] sass / scss    &lt;=  仅需安装预处理器和loader</p></li>
</ul>
</li>
<li>
<p>[x] API 调用支持</p>
<ul>
<li><p>[x] 接口配置</p></li>
<li><p>[] mock</p></li>
</ul>
</li>
</ul>
<h2 id="articleHeader2">3、布局方式</h2>
<blockquote><p>二级路由下生效</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSM3R?w=1390&amp;h=1064" src="https://static.alili.tech/img/bVSM3R?w=1390&amp;h=1064" alt="Layout" title="Layout" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">4、文件结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md                           <=  项目介绍
├── build                               <=  工程构建相关 <Vue-cli>
│&nbsp;&nbsp; ├── build.js                        <=  构建脚本
│&nbsp;&nbsp; ├── check-versions.js               <=  Node Npm版本检查
│&nbsp;&nbsp; ├── dev-client.js                   <=  开发客户端：浏览器刷新
│&nbsp;&nbsp; ├── dev-server.js                   <=  开发服务器：静态文件服务器、代理、热更新
│&nbsp;&nbsp; ├── utils.js                        <=  utils
│&nbsp;&nbsp; ├── webpack.base.conf.js            <=  webpack基础配置
│&nbsp;&nbsp; ├── webpack.dev.conf.js             <=  webpack开发配置
│&nbsp;&nbsp; └── webpack.prod.conf.js            <=  webpack生产配置
├── config                              <=  工程构建配置：开发服务器端口、代理，静态资源打包位置等
│&nbsp;&nbsp; ├── dev.env.js                      <=  开发环境配置
│&nbsp;&nbsp; ├── index.js                        <=  入口
│&nbsp;&nbsp; ├── prod.env.js                     <=  生产环境配置
│&nbsp;&nbsp; └── test.env.js                     <=  测试环境配置
├── index.html                          <=  单页应用入口
├── package-lock.json                   <=  Npm Package 版本锁
├── package.json                        <=  Npm Package 配置
├── src                                 <=  项目源代码
│&nbsp;&nbsp; ├── App.vue                         <=  Vue 根组件
│&nbsp;&nbsp; ├── api.js                          <=  api 配置
│&nbsp;&nbsp; ├── assets                          <=  静态资源
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── font
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.eot
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.svg
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont.ttf
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── iconfont.woff
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── images
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── logo.png
│&nbsp;&nbsp; │&nbsp;&nbsp; └── styles
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── base.css
│&nbsp;&nbsp; ├── config.js                       <=  项目配置
│&nbsp;&nbsp; ├── extend                          <=  Vue 扩展相关
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── filters.js                  <=  全局过滤器
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── directive.js                <=  全局指令
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js                    <=  扩展入口
│&nbsp;&nbsp; ├── layout                          <=  布局组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── container.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── header.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── levelbar.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── navbar.vue
│&nbsp;&nbsp; ├── main.js                         <=  Vue 入口
│&nbsp;&nbsp; ├── mock                            <=  Mock
│&nbsp;&nbsp; ├── router                          <=  路由配置
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── routes.js
│&nbsp;&nbsp; ├── store                           <=  Vuex
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── user.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── modules
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── app.js
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── user.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── mutation-types.js
│&nbsp;&nbsp; ├── style                           <=  样式文件 
│&nbsp;&nbsp; │&nbsp;&nbsp; └── define.less
│&nbsp;&nbsp; ├── utils                           <=  utils
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── axios.js                    <=  axios
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── const.js                    <=  常量
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── storage.js                  <=  storage
│&nbsp;&nbsp; └── widgets                         <=  可复用组件
│&nbsp;&nbsp; └── views                           <=  路由级别的组件
│&nbsp;&nbsp;     ├── Login.vue
│&nbsp;&nbsp;     ├── form
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.vue
│&nbsp;&nbsp;     ├── table
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index.vue
│&nbsp;&nbsp;     └── test
│&nbsp;&nbsp;         └── query.vue
├── static                              <=  服务器静态资源
│&nbsp;&nbsp; └── favicon.ico
└── test                                <=  测试文件夹  
    └── unit
        ├── index.js
        ├── karma.conf.js
        └── specs
            └── Hello.spec.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── README<span class="hljs-selector-class">.md</span>                           &lt;=  项目介绍
├── build                               &lt;=  工程构建相关 &lt;Vue-cli&gt;
│&nbsp;&nbsp; ├── build<span class="hljs-selector-class">.js</span>                        &lt;=  构建脚本
│&nbsp;&nbsp; ├── check-versions<span class="hljs-selector-class">.js</span>               &lt;=  Node Npm版本检查
│&nbsp;&nbsp; ├── dev-client<span class="hljs-selector-class">.js</span>                   &lt;=  开发客户端：浏览器刷新
│&nbsp;&nbsp; ├── dev-server<span class="hljs-selector-class">.js</span>                   &lt;=  开发服务器：静态文件服务器、代理、热更新
│&nbsp;&nbsp; ├── utils<span class="hljs-selector-class">.js</span>                        &lt;=  utils
│&nbsp;&nbsp; ├── webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>            &lt;=  webpack基础配置
│&nbsp;&nbsp; ├── webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>             &lt;=  webpack开发配置
│&nbsp;&nbsp; └── webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>            &lt;=  webpack生产配置
├── config                              &lt;=  工程构建配置：开发服务器端口、代理，静态资源打包位置等
│&nbsp;&nbsp; ├── dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>                      &lt;=  开发环境配置
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>                        &lt;=  入口
│&nbsp;&nbsp; ├── prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>                     &lt;=  生产环境配置
│&nbsp;&nbsp; └── test<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>                     &lt;=  测试环境配置
├── index<span class="hljs-selector-class">.html</span>                          &lt;=  单页应用入口
├── package-lock<span class="hljs-selector-class">.json</span>                   &lt;=  Npm Package 版本锁
├── package<span class="hljs-selector-class">.json</span>                        &lt;=  Npm Package 配置
├── src                                 &lt;=  项目源代码
│&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.vue</span>                         &lt;=  Vue 根组件
│&nbsp;&nbsp; ├── api<span class="hljs-selector-class">.js</span>                          &lt;=  api 配置
│&nbsp;&nbsp; ├── assets                          &lt;=  静态资源
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-attribute">font</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont<span class="hljs-selector-class">.eot</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont<span class="hljs-selector-class">.svg</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── iconfont<span class="hljs-selector-class">.ttf</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── iconfont<span class="hljs-selector-class">.woff</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── images
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── logo<span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── logo<span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── styles
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── base<span class="hljs-selector-class">.css</span>
│&nbsp;&nbsp; ├── config<span class="hljs-selector-class">.js</span>                       &lt;=  项目配置
│&nbsp;&nbsp; ├── extend                          &lt;=  Vue 扩展相关
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── filters<span class="hljs-selector-class">.js</span>                  &lt;=  全局过滤器
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── directive<span class="hljs-selector-class">.js</span>                &lt;=  全局指令
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>                    &lt;=  扩展入口
│&nbsp;&nbsp; ├── layout                          &lt;=  布局组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── container<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── levelbar<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── navbar<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>                         &lt;=  Vue 入口
│&nbsp;&nbsp; ├── mock                            &lt;=  Mock
│&nbsp;&nbsp; ├── router                          &lt;=  路由配置
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── routes<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── store                           &lt;=  Vuex
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── user<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── modules
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── app<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── user<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── mutation-types<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── style                           &lt;=  样式文件 
│&nbsp;&nbsp; │&nbsp;&nbsp; └── define<span class="hljs-selector-class">.less</span>
│&nbsp;&nbsp; ├── utils                           &lt;=  utils
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── axios<span class="hljs-selector-class">.js</span>                    &lt;=  axios
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── const<span class="hljs-selector-class">.js</span>                    &lt;=  常量
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── storage<span class="hljs-selector-class">.js</span>                  &lt;=  storage
│&nbsp;&nbsp; └── widgets                         &lt;=  可复用组件
│&nbsp;&nbsp; └── views                           &lt;=  路由级别的组件
│&nbsp;&nbsp;     ├── Login<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">form</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;     ├── <span class="hljs-selector-tag">table</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;     └── test
│&nbsp;&nbsp;         └── query<span class="hljs-selector-class">.vue</span>
├── static                              &lt;=  服务器静态资源
│&nbsp;&nbsp; └── favicon<span class="hljs-selector-class">.ico</span>
└── test                                &lt;=  测试文件夹  
    └── unit
        ├── index<span class="hljs-selector-class">.js</span>
        ├── karma<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
        └── specs
            └── Hello<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.js</span></code></pre>
<h2 id="articleHeader4">5、使用说明</h2>
<ul><li><p>开发环境</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<ul><li><p>生产环境</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h2 id="articleHeader5">6、效果图</h2>
<ul><li><p>总览</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVSM3X?w=2549&amp;h=1013" src="https://static.alili.tech/img/bVSM3X?w=2549&amp;h=1013" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>登录<br><span class="img-wrap"><img data-src="/img/bVSM31?w=2502&amp;h=1251" src="https://static.alili.tech/img/bVSM31?w=2502&amp;h=1251" alt="Login" title="Login" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>Table</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVSM32?w=2300&amp;h=935" src="https://static.alili.tech/img/bVSM32?w=2300&amp;h=935" alt="Table" title="Table" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>Form</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVSM4k?w=2294&amp;h=503" src="https://static.alili.tech/img/bVSM4k?w=2294&amp;h=503" alt="Form" title="Form" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一套Vue的单页模板：N3-admin

## 原文链接
[https://segmentfault.com/a/1190000010635993](https://segmentfault.com/a/1190000010635993)

