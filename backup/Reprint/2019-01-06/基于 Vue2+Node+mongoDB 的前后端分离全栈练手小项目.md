---
title: '基于 Vue2+Node+mongoDB 的前后端分离全栈练手小项目' 
date: 2019-01-06 2:30:10
hidden: true
slug: z0l8vjq49a
categories: [reprint]
---

{{< raw >}}

                    
<p>本文源码：<a href="https://github.com/gjincai/vue-node-proj" rel="nofollow noreferrer" target="_blank">Github</a></p>
<p><strong>简介：</strong></p>
<blockquote>
<p>之前刚入门vue并做好了一个简而全的纯vue2全家桶的项目，数据都是本地 json 模拟请求的；详情请移步这里：<a href="https://github.com/gjincai/vue-proj-demo" rel="nofollow noreferrer" target="_blank">vue-proj-demo</a></p>
<p>为了真正做到数据库的真实存取，于是又开始入门了 node+express+mongoose 、并以此来为之前的vue页面写后台数据接口。</p>
</blockquote>
<h2 id="articleHeader0">项目说明：</h2>
<p>前端：<code>client</code> 目录；主要技术：<code>vue-cli + vue2 + vue-router2 + vuex2 + axios + es6 + sass + eslint</code></p>
<p>后台：<code>server</code> 目录；主要技术：<code>node(express)+mongodb(mongoose)</code></p>
<p>（前后端分离，路由跳转在前端通过 vue-router 控制，后台只负责数据接口）</p>
<h2 id="articleHeader1">代码目录说明：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--vue-node-proj
    |--client                   //前端vue页面：http://gjincai.github.io/tags/vue/
    |--s1_serverNodeBegin       //《Node入门》学习练习代码，地址：https://www.nodebeginner.org/index-zh-cn.html
    |--s2_serverExpress         //express入门学习练习
    |--s3_Mongodb               //mongodb入门学习练习：http://gjincai.github.io/tags/mongodb/
    |--s4_mongoose              //mongoose入门学习练习：http://gjincai.github.io/tags/mongodb/
    |--s5_server                //express与mongoose整合，实现注册登录的数据在mongodb的存取
    |--server               //前端client页面的正式后台：
        |--api.js               //所有接口
        |--db.js                //数据库初始化、Schema数据模型
        |--index.js             //后台服务启动入口
        |--initCarts.json       //首次连接数据库，购物车数据的初始化
        |--initGoods.json       //首次连接数据库，所有商品数据的初始化
        |--package.json         //安装依赖：express，mongoose" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>|--vue-node-proj
    |--client                   /<span class="hljs-regexp">/前端vue页面：http:/</span><span class="hljs-regexp">/gjincai.github.io/tags</span><span class="hljs-regexp">/vue/</span>
    |--s1_serverNodeBegin       /<span class="hljs-regexp">/《Node入门》学习练习代码，地址：https:/</span><span class="hljs-regexp">/www.nodebeginner.org/index</span>-zh-cn.html
    |--s2_serverExpress         /<span class="hljs-regexp">/express入门学习练习
    |--s3_Mongodb               /</span><span class="hljs-regexp">/mongodb入门学习练习：http:/</span><span class="hljs-regexp">/gjincai.github.io/tags</span><span class="hljs-regexp">/mongodb/</span>
    |--s4_mongoose              /<span class="hljs-regexp">/mongoose入门学习练习：http:/</span><span class="hljs-regexp">/gjincai.github.io/tags</span><span class="hljs-regexp">/mongodb/</span>
    |--s5_server                /<span class="hljs-regexp">/express与mongoose整合，实现注册登录的数据在mongodb的存取
    |--server               /</span><span class="hljs-regexp">/前端client页面的正式后台：
        |--api.js               /</span><span class="hljs-regexp">/所有接口
        |--db.js                /</span><span class="hljs-regexp">/数据库初始化、Schema数据模型
        |--index.js             /</span><span class="hljs-regexp">/后台服务启动入口
        |--initCarts.json       /</span><span class="hljs-regexp">/首次连接数据库，购物车数据的初始化
        |--initGoods.json       /</span><span class="hljs-regexp">/首次连接数据库，所有商品数据的初始化
        |--package.json         /</span><span class="hljs-regexp">/安装依赖：express，mongoose</span></code></pre>
<h2 id="articleHeader2">项目运行：</h2>
<h3 id="articleHeader3">环境配置：</h3>
<p><strong>node.js 与 express 入门：</strong></p>
<p>学习练习代码：参考本项目中的文件夹 <code>vue-node-proj/s1_serverNodeBegin</code> 和 <code>vue-node-proj/s2_serverExpress</code>；</p>
<p><strong>mongodb的安装与配置、mongoose的基本使用：</strong></p>
<p>blog学习笔记：<a href="http://gjincai.github.io/categories/mongodb/" rel="nofollow noreferrer" target="_blank">http://gjincai.github.io/categories/mongodb/</a>；</p>
<p>学习练习代码：参考本项目中的文件夹 <code>vue-node-proj/s3_Mongodb</code> 和 <code>vue-node-proj/s3_Mongodb</code>；</p>
<h3 id="articleHeader4">运行顺序：</h3>
<p>新建命令行窗口1，开启本地mongodb服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mongod" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">mongod</span></code></pre>
<p>新建命令行窗口2，开启本地后台node服务器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue-node-proj/server
cnpm install --save
node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>cd vue-<span class="hljs-keyword">node</span><span class="hljs-title">-proj</span>/server
cnpm install --save
<span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre>
<p>新建命令行窗口3，开启本地前端vue的dev模式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue-node-proj/client
cnpm install --save
npm run dev --color" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>cd vue-<span class="hljs-keyword">node</span><span class="hljs-title">-proj</span>/client
cnpm install --save
npm run dev --color</code></pre>
<p>然后在浏览器打开：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:8080" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">localhost:</span><span class="hljs-number">8080</span></code></pre>
<h2 id="articleHeader5">相关学习笔记</h2>
<p><a href="http://gjincai.github.io/2017/07/26/express-mongoose-%E5%AE%9E%E7%8E%B0%E7%AE%80%E6%98%93%E5%90%8E%E5%8F%B0%E6%95%B0%E6%8D%AE%E6%8E%A5%E5%8F%A3/" rel="nofollow noreferrer" target="_blank">express+mongoose 实现简易后台数据接口</a></p>
<h2 id="articleHeader6">效果呈现：</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010414689" src="https://static.alili.tech/img/remote/1460000010414689" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010414690" src="https://static.alili.tech/img/remote/1460000010414690" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010414691" src="https://static.alili.tech/img/remote/1460000010414691" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010414692" src="https://static.alili.tech/img/remote/1460000010414692" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010414693" src="https://static.alili.tech/img/remote/1460000010414693" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010414694" src="https://static.alili.tech/img/remote/1460000010414694" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Vue2+Node+mongoDB 的前后端分离全栈练手小项目

## 原文链接
[https://segmentfault.com/a/1190000010414686](https://segmentfault.com/a/1190000010414686)

