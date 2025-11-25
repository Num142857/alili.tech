---
title: '基于Vue2.0+Vuex+Axios+NodeJs+Express+MySQL实现京东移动web商城' 
date: 2019-01-17 2:30:25
hidden: true
slug: apos01ar8y5
categories: [reprint]
---

{{< raw >}}

                    
<p>项目地址<a href="https://github.com/huangche007/vue-jd" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/huangche007/vue-jd" rel="nofollow noreferrer" target="_blank">https://github.com/huangche00...</a></p>
<ul><li><p>经过一个多月总算完成第一个版本</p></li></ul>
<h2 id="articleHeader0">前端架构</h2>
<ul>
<li><p>页面结构(H5,CSS3,原生JS)</p></li>
<li><p>框架(基于Vue脚手架:vue-cli)进行搭建</p></li>
<li><p>数据请求处理框架(Axios)</p></li>
<li><p>Vue-Router进行路由处理</p></li>
<li><p>Vue-LazyLoad进行图片赖加载</p></li>
</ul>
<h2 id="articleHeader1">服务端架构</h2>
<ul>
<li><p>选用NodeJs进行后台开发</p></li>
<li>
<p>Express中间件进行服务的配置，路由、请求的处理</p>
<ul><li><p>官网 <a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">http://www.expressjs.com.cn/</a></p></li></ul>
</li>
<li><p>Mysql中间件处理与数据库的"通信"</p></li>
<li><p>Body-Parser中间件进行前端请求参数的获取</p></li>
<li><p>Cookie-Parser、Cookie-Session进行cookie与session的处理</p></li>
</ul>
<h2 id="articleHeader2">数据库选取</h2>
<ul><li><p>采用MySQL进行相关数据库的设计与实现</p></li></ul>
<h2 id="articleHeader3">目前项目已实现功能</h2>
<ol>
<li><p>首页数据的展示</p></li>
<li><p>分类页数据的展示</p></li>
<li><p>购物车</p></li>
<li><p>我的</p></li>
<li><p>注册</p></li>
<li><p>登录</p></li>
<li><p>商品详情页</p></li>
<li><p>商品搜索</p></li>
</ol>
<h2 id="articleHeader4">PC端仿京东首页</h2>
<ul><li><p><a href="https://github.com/huangche007/jd" rel="nofollow noreferrer" target="_blank">https://github.com/huangche007/jd</a></p></li></ul>
<h2 id="articleHeader5">安装</h2>
<p>已安装MySQL数据库，然后导入migou.sql文件</p>
<p>然后通过<code>npm</code>安装本地服务第三方依赖模块(需要已安装<a href="https://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue-jd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> vue-jd</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install 或 cnpm install(个人比较喜欢使用后者，下载依赖模块速度较快)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> 或 cnpm <span class="hljs-keyword">install</span>(个人比较喜欢使用后者，下载依赖模块速度较快)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>最后开启后台服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js</code></pre>
<h2 id="articleHeader6">目录结构</h2>
<p>&lt;pre&gt;<br>.<br>├── README.md           <br>├── libs                       // 后台常用工具模块的封装，比如格式化事件、MD5加密等<br>├── route                      // 后台接口的编写目录<br>├── server.js                  // 后台服务的配置文件<br>├── webpack.config.js          // webpack配置文件<br>├── index.html                 // 项目入口文件<br>├── package.json               // 项目配置文件<br>├── src                        // 生产目录<br>│&nbsp;&nbsp; ├── assets                 // css js 和图片资源<br>│&nbsp;&nbsp; ├── components             // 各种Vue组件<br>│&nbsp;&nbsp; ├── store                  // vuex状态管理器<br>│&nbsp;&nbsp; ├── App.vue                // 项目中全局Vue<br>│&nbsp;&nbsp; ├── main.js                // Webpack 预编译入口<br>│&nbsp;&nbsp; └── router.config.js    // vue路由配置文件<br>&lt;/pre&gt;</p>
<h2 id="articleHeader7">项目效果图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986497?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986497?w=1000&amp;h=800" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986498?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986498?w=1000&amp;h=800" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986499?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986499?w=1000&amp;h=800" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986500?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986500?w=1000&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986501?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986501?w=1000&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986502?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986502?w=1000&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008986503?w=1000&amp;h=800" src="https://static.alili.tech/img/remote/1460000008986503?w=1000&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>....未完待续 QQ交流群:526450553</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue2.0+Vuex+Axios+NodeJs+Express+MySQL实现京东移动web商城

## 原文链接
[https://segmentfault.com/a/1190000008986494](https://segmentfault.com/a/1190000008986494)

