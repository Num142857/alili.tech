---
title: 'vue2+element 管理后台 集成解决方案 没有没做的，只要想不到的！' 
date: 2019-01-16 2:30:07
hidden: true
slug: 6xctlje1na3
categories: [reprint]
---

{{< raw >}}

                    
<p>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a><br>系类文章一：<a href="https://segmentfault.com/a/1190000009275424">手摸手，带你用vue撸后台 系列一（基础篇）</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097" target="_blank">手摸手，带你用vue撸后台 系列二（登录权限篇）</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a></p>
<h2 id="articleHeader0">前言</h2>
<blockquote>这半年来一直在用vue写管理后台，目前后台已经有七十多个页面，十几种权限，但维护成本依然很低，效率依然很高，所以准备开源分享一下后台开发的经验和成果。目前的技术栈主要的采用vue+element+axios.由于是个人项目，所以数据请求都是用了mockjs代替。</blockquote>
<p>后续会出一系列的教程配套文章，如如何从零构建后台项目框架，如何做完整的用户系统（如权限验证，二次登录等），如何二次开发组件（如富文本），如何整合七牛等等文章，各种后台开发经验等等。莫急~~</p>
<h2 id="articleHeader1">功能</h2>
<ul>
<li>登录/注销</li>
<li>权限验证</li>
<li>侧边栏</li>
<li>面包屑</li>
<li>富文本编辑器</li>
<li>Markdown编辑器</li>
<li>JSON编辑器</li>
<li>列表拖拽</li>
<li>plitPane</li>
<li>Dropzone</li>
<li>Sticky</li>
<li>CountTo</li>
<li>echarts图表</li>
<li>401，401错误页面</li>
<li>错误日志</li>
<li>导出excel</li>
<li>table example</li>
<li>form example</li>
<li>多环境发布</li>
<li>dashboard</li>
<li>二次登录</li>
<li>动态侧边栏</li>
<li>mock数据</li>
<li>svg iconfont</li>
</ul>
<h2 id="articleHeader2">开发</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    # 克隆项目
    git clone https://github.com/PanJiaChen/vue-element-admin.git

    # 安装依赖
    npm install

    # 本地开发 开启服务
    npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    <span class="hljs-comment"># 克隆项目</span>
    git <span class="hljs-built_in">clone</span> https://github.com/PanJiaChen/vue-element-admin.git

    <span class="hljs-comment"># 安装依赖</span>
    npm install

    <span class="hljs-comment"># 本地开发 开启服务</span>
    npm run dev</code></pre>
<p>浏览器访问 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:9527</p>
<h2 id="articleHeader3">发布</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    <span class="hljs-comment"># 发布测试环境 带webpack ananalyzer</span>
    npm run build:sit-preview

    <span class="hljs-comment"># 构建生成环境</span>
    npm run build:prod</code></pre>
<h2 id="articleHeader4">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build                      // 构建相关&nbsp;&nbsp;
├── config                     // 配置相关
├── src                        // 源代码
│&nbsp;&nbsp; ├── api                    // 所以请求
│&nbsp;&nbsp; ├── assets                 // 主题 字体等静态资源
│&nbsp;&nbsp; ├── components             // 全局公用组件
│&nbsp;&nbsp; ├── directive              // 全局指令
│&nbsp;&nbsp; ├── filtres                // 全局filter
│&nbsp;&nbsp; ├── mock                   // mock数据
│&nbsp;&nbsp; ├── router                 // 路由
│&nbsp;&nbsp; ├── store                  // 全局store管理
│&nbsp;&nbsp; ├── styles                 // 全局样式
│&nbsp;&nbsp; ├── utils                  // 全局公用方法
│&nbsp;&nbsp; ├── view                   // view
│&nbsp;&nbsp; ├── App.vue                // 入口页面
│&nbsp;&nbsp; └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│&nbsp;&nbsp; ├── jquery
│&nbsp;&nbsp; └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── build                      <span class="hljs-comment">// 构建相关&nbsp;&nbsp;</span>
├── config                     <span class="hljs-comment">// 配置相关</span>
├── src                        <span class="hljs-comment">// 源代码</span>
│&nbsp;&nbsp; ├── api                    <span class="hljs-comment">// 所以请求</span>
│&nbsp;&nbsp; ├── assets                 <span class="hljs-comment">// 主题 字体等静态资源</span>
│&nbsp;&nbsp; ├── components             <span class="hljs-comment">// 全局公用组件</span>
│&nbsp;&nbsp; ├── directive              <span class="hljs-comment">// 全局指令</span>
│&nbsp;&nbsp; ├── filtres                <span class="hljs-comment">// 全局filter</span>
│&nbsp;&nbsp; ├── mock                   <span class="hljs-comment">// mock数据</span>
│&nbsp;&nbsp; ├── router                 <span class="hljs-comment">// 路由</span>
│&nbsp;&nbsp; ├── store                  <span class="hljs-comment">// 全局store管理</span>
│&nbsp;&nbsp; ├── styles                 <span class="hljs-comment">// 全局样式</span>
│&nbsp;&nbsp; ├── utils                  <span class="hljs-comment">// 全局公用方法</span>
│&nbsp;&nbsp; ├── view                   <span class="hljs-comment">// view</span>
│&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.vue</span>                <span class="hljs-comment">// 入口页面</span>
│&nbsp;&nbsp; └── main<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// 入口 加载组件 初始化等</span>
├── static                     <span class="hljs-comment">// 第三方不打包资源</span>
│&nbsp;&nbsp; ├── jquery
│&nbsp;&nbsp; └── Tinymce                <span class="hljs-comment">// 富文本</span>
├── <span class="hljs-selector-class">.babelrc</span>                   <span class="hljs-comment">// babel-loader 配置</span>
├── eslintrc<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// eslint 配置项</span>
├── <span class="hljs-selector-class">.gitignore</span>                 <span class="hljs-comment">// git 忽略项</span>
├── favicon<span class="hljs-selector-class">.ico</span>                <span class="hljs-comment">// favicon图标</span>
├── index<span class="hljs-selector-class">.html</span>                 <span class="hljs-comment">// html模板</span>
└── package<span class="hljs-selector-class">.json</span>               <span class="hljs-comment">// package.json</span>
</code></pre>
<h2 id="articleHeader5">状态管理</h2>
<p>后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。</p>
<h2 id="articleHeader6">效果图</h2>
<h4>两步验证登录 支持微信和qq</h4>
<p><span class="img-wrap"><img data-src="/img/bVMIw0?w=1265&amp;h=574" src="https://static.alili.tech/img/bVMIw0?w=1265&amp;h=574" alt="2login.gif" title="2login.gif" style="cursor: pointer; display: inline;"></span>)</p>
<h4>真正的动态换肤</h4>
<p><span class="img-wrap"><img data-src="/img/bVMIxe?w=1257&amp;h=462" src="https://static.alili.tech/img/bVMIxe?w=1257&amp;h=462" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>拖拽排序</h4>
<p><span class="img-wrap"><img data-src="/img/bVMIxU?w=1080&amp;h=318" src="https://static.alili.tech/img/bVMIxU?w=1080&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>上传裁剪头像</h4>
<p><span class="img-wrap"><img data-src="/img/bVMIx9?w=1080&amp;h=429" src="https://static.alili.tech/img/bVMIx9?w=1080&amp;h=429" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>错误统计</h4>
<p><span class="img-wrap"><img data-src="/img/bVMIye?w=1082&amp;h=564" src="https://static.alili.tech/img/bVMIye?w=1082&amp;h=564" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>富文本(整合七牛 打水印等个性化功能)</h4>
<p><span class="img-wrap"><img data-src="/img/bVMIym?w=1009&amp;h=442" src="https://static.alili.tech/img/bVMIym?w=1009&amp;h=442" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7"><a href="http://panjiachen.github.io/vue-element-admin/" rel="nofollow noreferrer" target="_blank">更多demo</a></h2>
<h3 id="articleHeader8">占坑</h3>
<p><a href="https://segmentfault.com/a/1190000009275424">系类文章一</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2+element 管理后台 集成解决方案 没有没做的，只要想不到的！

## 原文链接
[https://segmentfault.com/a/1190000009188689](https://segmentfault.com/a/1190000009188689)

