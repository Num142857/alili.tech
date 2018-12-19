---
title: 'webpack搭建多页面系统（一）：对webpack 构建工具的理解' 
date: 2018-12-19 2:30:07
hidden: true
slug: ap8qiftw9y6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">为什么使用webpack构建工具？</h2>
<p>1、开发效率方面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一般的开发过程中，分发好任务后，每个人完成自己单独的页面，如果有的人开发完成之后，接手别人的任务，就有可能造成开发时候的冲突。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">在一般的开发过程中，分发好任务后，每个人完成自己单独的页面，如果有的人开发完成之后，接手别人的任务，就有可能造成开发时候的冲突。</code></pre>
<p>如果利用模块化开发，就可以避免这一问题。前端模块化开发的问题大家可以参照文献：<a href="https://github.com/fouber/blog/issues/10?from=timeline&amp;isappinstalled=0#" rel="nofollow noreferrer" target="_blank">https://github.com/fouber/blo...</a></p>
<p>2、对js、css、html等文件的管理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在页面完成之后，一般要对js、css、html进行打包压缩，通常要借助于第三方的工具。webpack可以通过合适的loader在代码上线的时候，对其进行压缩，删除注释。这可以节约资源。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;">在页面完成之后，一般要对<span class="hljs-keyword">js</span>、css、html进行打包压缩，通常要借助于第三方的工具。webpack可以通过合适的loader在代码上线的时候，对其进行压缩，删除注释。这可以节约资源。</code></pre>
<p>3、实时刷新功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我们之前在开发的时候，都是通过配置nginx进行代理，来访问后台的数据，每次修改配置文件都要重启服务器，很麻烦！！！在修改代码之后，要按一下f5,才能刷新，甚至时ctrl+f5强制刷新，感觉有点麻烦。可以利用webpack 的热更新做到实时刷新。提高了开发的效率。    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">我们之前在开发的时候，都是通过配置nginx进行代理，来访问后台的数据，每次修改配置文件都要重启服务器，很麻烦！！！在修改代码之后，要按一下<span class="hljs-built_in">f5</span>,才能刷新，甚至时ctrl+<span class="hljs-built_in">f5</span>强制刷新，感觉有点麻烦。可以利用webpack 的热更新做到实时刷新。提高了开发的效率。    </code></pre>
<p>4、使用es6新语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对于不兼容es6的浏览器，利用webpack中的babel-loader加载器可以解析es6语法，支持各种浏览器。感觉webpack的对模块化开发真的好强大，这是通过一个项目之后，对webpack的认识，不过对webpack的性能优化这方面做的很少，看了开发文档，还是遇到各种问题，欢迎各位大神指点。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">对于不兼容es6的浏览器，利用webpack中的babel-loader加载器可以解析es6语法，支持各种浏览器。感觉webpack的对模块化开发真的好强大，这是通过一个项目之后，对webpack的认识，不过对webpack的性能优化这方面做的很少，看了开发文档，还是遇到各种问题，欢迎各位大神指点。</code></pre>
<p>webpack是基于node环境搭建的，首先自行安装node。<br>参考文献：<a href="https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143450141843488beddae2a1044cab5acb5125baf0882000" rel="nofollow noreferrer" target="_blank">https://www.liaoxuefeng.com/w...</a><br>项目地址：<a href="https://github.com/houseLiYong/moule-home-frontend" rel="nofollow noreferrer" target="_blank">https://github.com/houseLiYon...</a><br>在cmd命令行中git clone <a href="https://github.com/houseLiYong/moule-home-frontend.git" rel="nofollow noreferrer" target="_blank">https://github.com/houseLiYon...</a><br>安装淘宝镜像后：cnpm install;安装各种依赖；可能加载器的版本不对应，请安装对应的版本。<br>之后在webpack.config.js中，修改devServer的host;我的主机ip是<br>192.168.10.143.查看自己本机的ip,cmd命令行中，输入ipconfig;修改为自己的IP。<br>然后执行：cnpm run server 本地就打开项目。</p>
<h3 id="articleHeader1">目录结构</h3>
<p><span class="img-wrap"><img data-src="/img/bV1xG0?w=612&amp;h=447" src="https://static.alili.tech/img/bV1xG0?w=612&amp;h=447" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>第一次写文章，可能表述不清楚，欢迎指点！！！<br>对于第一次使用webpack 同学，可能学起来有点吃力，建议先去慕课网上学习一下基本的课程：<a href="http://www.imooc.com/video/14187/0" rel="nofollow noreferrer" target="_blank">http://www.imooc.com/video/14...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack搭建多页面系统（一）：对webpack 构建工具的理解

## 原文链接
[https://segmentfault.com/a/1190000012720279](https://segmentfault.com/a/1190000012720279)

