---
title: 'vue2.0登录注册demo' 
date: 2019-01-29 2:30:10
hidden: true
slug: l9cobt6i29m
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<p>刚学的vue试着做了个demo<br>基于vue2全家桶spa的登录注册<br>后台接口使用express和mongodb</p>
<hr>
<h3 id="articleHeader0">环境依赖模块</h3>
<p>使用vue-cli生产项目,登录注册通过后台生成的token存放在游览器localstoage中实现</p>
<ul>
<li><p>vue-cli</p></li>
<li><p>vue2</p></li>
<li><p>vue-router</p></li>
<li><p>vuex</p></li>
<li><p>vue-axios</p></li>
<li><p>express</p></li>
<li><p>mongoose</p></li>
<li><p>jsonwebtoken</p></li>
</ul>
<hr>
<h3 id="articleHeader1">路由说明</h3>
<p>需要实现的路由,和简单的登录权限</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/home &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   // 首页，不需要登录可以访问
/person               // 个人页，需要登录后可以访问
/login                // 登录，不需要登录可以访问，登录后不可以访问
/reg                  // 注册，不需要登录可以访问，登录后不可以访问
/logout               // 退出登录，需要登录后才可以访问" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>/<span class="hljs-built_in">home</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <span class="hljs-comment">// 首页，不需要登录可以访问</span>
/person               <span class="hljs-comment">// 个人页，需要登录后可以访问</span>
/login                <span class="hljs-comment">// 登录，不需要登录可以访问，登录后不可以访问</span>
/reg                  <span class="hljs-comment">// 注册，不需要登录可以访问，登录后不可以访问</span>
/logout               <span class="hljs-comment">// 退出登录，需要登录后才可以访问</span></code></pre>
<hr>
<h3 id="articleHeader2">运行程序</h3>
<p>到这里基本实现了后前后端分离,不足的地方也请大神指出<br>还有很多能扩展的功能也没有做,我也会在之后的项目中试着添加进去,把vue的坑一个个踩过去<br>放上源码地址<a href="https://github.com/xuyd/vue-login" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/xuyd/vue-login" rel="nofollow noreferrer" target="_blank">https://github.com/xuyd/vue-l...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
//开启mongodb
mongod --dbpath
node app
npm run dev
http://localhost:8080/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm install
//开启mongodb
mongod --dbpath
<span class="hljs-keyword">node</span> <span class="hljs-title">app</span>
npm run dev
http://localhost:<span class="hljs-number">8080</span>/</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0登录注册demo

## 原文链接
[https://segmentfault.com/a/1190000007867600](https://segmentfault.com/a/1190000007867600)

