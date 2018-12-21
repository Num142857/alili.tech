---
title: '基于vue2.0 +vuex+ element-ui 后台管理系统' 
date: 2018-12-21 2:30:11
hidden: true
slug: ob0mgik7uq
categories: [reprint]
---

{{< raw >}}

                    
<p><b>xxx金融后台管理系统</b></p>
<p><strong>A magical vue element touzi admin.</strong></p>
<ul>
<li><a href="http://www.jiouai.com" rel="nofollow noreferrer" target="_blank">效果演示地址</a></li>
<li><a href="https://github.com/wdlhao/vue2-element-touzi-admin" rel="nofollow noreferrer" target="_blank">github地址</a></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV0GUv?w=1366&amp;h=662" src="https://static.alili.tech/img/bV0GUv?w=1366&amp;h=662" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV0GUI?w=1366&amp;h=662" src="https://static.alili.tech/img/bV0GUI?w=1366&amp;h=662" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV0GU0?w=1366&amp;h=662" src="https://static.alili.tech/img/bV0GU0?w=1366&amp;h=662" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">About</h2>
<p>此项目是 vue2.0 + element-ui + node+mongodb 构建的后台管理系统，所有的数据都是从服务器实时获取的真实数据，具有真实的注册、登录、数据显示、新增数据、修改数据、删除数据等功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  如果对您对此项目有兴趣，可以点 &quot;Star&quot; 支持一下 谢谢！ ^_^
  
  或者您可以 &quot;follow&quot; 一下，我会不断开源更多的有趣的项目
  
  开发环境 windows 64 、nodejs 6.11.0
  
  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">  如果对您对此项目有兴趣，可以点 <span class="hljs-string">"Star"</span> 支持一下 谢谢！ ^_^
  
  或者您可以 <span class="hljs-string">"follow"</span> 一下，我会不断开源更多的有趣的项目
  
  开发环境 windows 64 、nodejs 6.11.0
  
  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR</code></pre>
<h2 id="articleHeader1">技术栈</h2>
<p><strong>前端技术栈：</strong> vue2 + vuex + vue-router + webpack2.0 + ES6/7 + less + element-ui</p>
<p><strong>服务端技术栈：</strong>nodejs + express  + mongodb</p>
<h2 id="articleHeader2">前序准备</h2>
<p><strong>运行前准备：</strong></p>
<p>1、不需要在本地调试及开发：<br><a href="http://www.jiouai.com" rel="nofollow noreferrer" target="_blank">请访问本项目的服务器地址。</a></p>
<p>2、需要在本地调试及开发：</p>
<p>由于此项目是基于nodejs和mongodb的前后端结合项目，你需要进行nodejs和mongodb的相关准备工作。项目运行之前，请确保系统已经安装以下应用：</p>
<p>(1)、node (6.0 及以上版本)。使用细节，请参考：<a href="https://nodejs.org/en/download/" rel="nofollow noreferrer" target="_blank">node的下载及安装。</a></p>
<p>(2)、mongodb 。使用细节，请参考：<a href="https://pan.baidu.com/s/1jIxPJrK" rel="nofollow noreferrer" target="_blank">mongodb的下载及使用。</a>【下载，db/log配置，开启服务，use touzi，导入数据】</p>
<p>(3)、robomongod。使用细节，请参考：<a href="https://pan.baidu.com/s/1hsQuc08" rel="nofollow noreferrer" target="_blank">robomongod的下载及使用。</a>（注意：mongodb可视化视图工具，本项目不是必须安装，主要用于方便查看数据库数据）。</p>
<h2 id="articleHeader3">开发：</h2>
<p>git clone <a href="https://github.com/wdlhao/vue2-element-touzi-admin" rel="nofollow noreferrer" target="_blank">https://github.com/wdlhao/vue...</a></p>
<p>cd vue2-element-touzi-admin</p>
<p>npm install</p>
<p><strong>npm run dev</strong> (访问本地后台系统，需开启服务端express服务)。运行之后，会默认打开本地访问路径：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8012</p>
<p>开启服务端express服务方法如下：双击server/start.bat启动文件，执行命令&gt;node index.js即可，启动后切记不要关闭cmd窗口。</p>
<h2 id="articleHeader4">发布</h2>
<p><strong>npm run bulid</strong> (生成打包之后的项目文件,此文件主要用于项目部署)。</p>
<h2 id="articleHeader5">功能</h2>
<ul>
<li>登录/退出 -- 完成</li>
<li>首页 -- 完成</li>
<li>用户列表 -- 完成</li>
<li>信息列表 -- 完成</li>
<li>
<p>信息管理</p>
<ul>
<li>个人信息 -- 完成</li>
<li>修改信息 -- 完成</li>
</ul>
</li>
<li>
<p>资金管理</p>
<ul>
<li>资金流水 -- 完成</li>
<li>支付单据 -- 完成</li>
</ul>
</li>
<li>
<p>投资管理</p>
<ul>
<li>省份投资 -- 完成</li>
<li>区域投资 -- 完成</li>
</ul>
</li>
<li>
<p>金融文章</p>
<ul>
<li>文章发布 -- 完成</li>
<li>文章编辑 -- 完成</li>
<li>查看文章 -- 完成</li>
</ul>
</li>
<li>
<p>资金数据</p>
<ul>
<li>投资分布 -- 完成</li>
<li>项目分布 -- 完成</li>
<li>收支统计 -- 完成</li>
</ul>
</li>
</ul>
<h2 id="articleHeader6">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build                      // 构建相关  
├── config                     // 配置相关
├── exampleImgs                // 项目示例图片
├── outdb                      // 导入数据库的初始化数据
├── server                     // node服务端
│   ├── api.js                    // 封装的接口请求
│   ├── db.js                     // db数据模型定义
│   ├── index.js                  // express服务器
│   ├── mutils.js                 // 服务端工具类
├── src                        // 源代码
│   ├── assets                 // 图片等静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 接口请求配置
│   ├── fonts                  // fontawesome字体库文件
│   ├── layout                 // 全局 组件
│   ├── page                   // 项目所有的视图
│   ├── register               // 第三方库注册
│   ├── router                 // 登录路由
│   ├── store                  // 项目vuex数据存储器
│   ├── style                  // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .gitignore                 // git 忽略项
├── eslintrc.js                // eslint 配置项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
├── package.json               // 包依赖配置
└── README.md                  // 说明文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── build                      <span class="hljs-comment">// 构建相关  </span>
├── config                     <span class="hljs-comment">// 配置相关</span>
├── exampleImgs                <span class="hljs-comment">// 项目示例图片</span>
├── outdb                      <span class="hljs-comment">// 导入数据库的初始化数据</span>
├── server                     <span class="hljs-comment">// node服务端</span>
│   ├── api<span class="hljs-selector-class">.js</span>                    <span class="hljs-comment">// 封装的接口请求</span>
│   ├── db<span class="hljs-selector-class">.js</span>                     <span class="hljs-comment">// db数据模型定义</span>
│   ├── index<span class="hljs-selector-class">.js</span>                  <span class="hljs-comment">// express服务器</span>
│   ├── mutils<span class="hljs-selector-class">.js</span>                 <span class="hljs-comment">// 服务端工具类</span>
├── src                        <span class="hljs-comment">// 源代码</span>
│   ├── assets                 <span class="hljs-comment">// 图片等静态资源</span>
│   ├── components             <span class="hljs-comment">// 全局公用组件</span>
│   ├── config                 <span class="hljs-comment">// 接口请求配置</span>
│   ├── fonts                  <span class="hljs-comment">// fontawesome字体库文件</span>
│   ├── layout                 <span class="hljs-comment">// 全局 组件</span>
│   ├── page                   <span class="hljs-comment">// 项目所有的视图</span>
│   ├── register               <span class="hljs-comment">// 第三方库注册</span>
│   ├── router                 <span class="hljs-comment">// 登录路由</span>
│   ├── store                  <span class="hljs-comment">// 项目vuex数据存储器</span>
│   ├── style                  <span class="hljs-comment">// 全局样式</span>
│   ├── utils                  <span class="hljs-comment">// 全局公用方法</span>
│   ├── vendor                 <span class="hljs-comment">// 公用vendor</span>
│   ├── App<span class="hljs-selector-class">.vue</span>                <span class="hljs-comment">// 入口页面</span>
│   ├── main<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// 入口 加载组件 初始化</span>
├── static                     <span class="hljs-comment">// 第三方不打包资源</span>
│   └── Tinymce                <span class="hljs-comment">// 富文本</span>
├── <span class="hljs-selector-class">.babelrc</span>                   <span class="hljs-comment">// babel-loader 配置</span>
├── <span class="hljs-selector-class">.gitignore</span>                 <span class="hljs-comment">// git 忽略项</span>
├── eslintrc<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// eslint 配置项</span>
├── favicon<span class="hljs-selector-class">.ico</span>                <span class="hljs-comment">// favicon图标</span>
├── index<span class="hljs-selector-class">.html</span>                 <span class="hljs-comment">// html模板</span>
├── package<span class="hljs-selector-class">.json</span>               <span class="hljs-comment">// 包依赖配置</span>
└── README<span class="hljs-selector-class">.md</span>                  <span class="hljs-comment">// 说明文件</span>
</code></pre>
<h2 id="articleHeader7"><a href="http://www.jiouai.com" rel="nofollow noreferrer" target="_blank">查看更多demo</a></h2>
<h2 id="articleHeader8">License</h2>
<p>MIT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue2.0 +vuex+ element-ui 后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000012519539](https://segmentfault.com/a/1190000012519539)

