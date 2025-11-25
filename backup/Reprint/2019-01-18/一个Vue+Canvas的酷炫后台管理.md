---
title: '一个Vue+Canvas的酷炫后台管理' 
date: 2019-01-18 2:30:34
hidden: true
slug: k2dvprqisul
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>又一个Vue+Cnavas酷炫的后台管理，依然前后端分离（用PC打开，还没适配移动端）。</p></blockquote>
<p><strong>项目地址：</strong> <a href="https://github.com/hzzly/canvas-vue" rel="nofollow noreferrer" target="_blank">https://github.com/hzzly/canv...</a><br><strong>demo地址：</strong> <a href="http://hjingren.cn/curriculum-design/" rel="nofollow noreferrer" target="_blank">http://hjingren.cn/curriculum...</a><br>账号：hzzly 密码：123456<br>欢迎大家的star啦~</p>
<h3 id="articleHeader0"><strong>技术栈</strong></h3>
<p>前台:</p>
<blockquote><ol>
<li><p>vue-cli</p></li>
<li><p>vue</p></li>
<li><p>vue-router</p></li>
<li><p>webpak</p></li>
<li><p>canvas</p></li>
<li><p>ajax</p></li>
</ol></blockquote>
<p>后台:</p>
<blockquote><ol>
<li><p>wamp</p></li>
<li><p>PHP(ThinkPHP)</p></li>
<li><p>mysql</p></li>
</ol></blockquote>
<h3 id="articleHeader1"><strong>功能说明</strong></h3>
<ul>
<li>
<p>登录</p>
<ul>
<li><p>用户登录</p></li>
<li><p>管理员登录</p></li>
</ul>
</li>
<li>
<p>注册</p>
<ul><li><p>用户注册</p></li></ul>
</li>
<li>
<p>Canvas</p>
<ul>
<li><p>流星滑过</p></li>
<li><p>星星闪闪</p></li>
<li><p>后台折线</p></li>
<li><p>折线跟着鼠标滑动</p></li>
</ul>
</li>
<li>
<p>Vue</p>
<ul>
<li><p>弹出框组件</p></li>
<li><p>路由切换动画</p></li>
<li><p>通过Ajax调用后台接口</p></li>
</ul>
</li>
<li><p>留言板(时间轴)</p></li>
<li><p>添加房屋信息</p></li>
<li><p>出租 求租</p></li>
<li><p>出售 求购</p></li>
<li><p>个人信息修改</p></li>
<li><p>密码修改</p></li>
<li><p>......</p></li>
</ul>
<blockquote><p>1.登录注册模块，流星与星星为canvas，登录注册切换动画为vue transition</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008780323?w=1268&amp;h=692" src="https://static.alili.tech/img/remote/1460000008780323?w=1268&amp;h=692" alt="canvas-login" title="canvas-login" style="cursor: pointer;"></span></p>
<p>&lt;!--more--&gt;</p>
<blockquote><p>2.后台管理页面，背景为canvas(会动的折线+跟着鼠标滑动) 功能模块切换为vue transition</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008780324" src="https://static.alili.tech/img/remote/1460000008780324" alt="admin" title="admin" style="cursor: pointer;"></span></p>
<blockquote><p>3.留言板(时间轴特效)</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008780325" src="https://static.alili.tech/img/remote/1460000008780325" alt="msgboard" title="msgboard" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2"><strong>目录结构</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|——canvas-vue/
|   |——build/
|   |——confg/
|   |——node_modules/
|   |——src/
|   |   |——assets/                 //静态文件
|   |   |——components/             //页面组件
|   |   |   |——Menu.vue            //登录注册加载页面
|   |   |   |——Home.vue            //后台首页
|   |   |   |——Login.vue           //登录页面
|   |   |   |——Regist.vue          //注册页面
|   |   |   |——Navbar.vue          //我的发布
|   |   |   |——Messageboard.vue    //留言板页面
|   |   |   |——...                 //等等
|   |   |——router/                 
|   |   |   |——index.js            //页面路由
|   |   |——App.vue                 //父组件
|   |   |——main.js                 //入口文件
|   |——static/                     
|   |——.babelrc
|   |——.editorconfig
|   |——.gitgnore
|   |——index.html
|   |——package.json
|   |——README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">——canvas-vue/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——build/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——confg/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——node_modules/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——src/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——assets/                 //静态文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——components/             //页面组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Menu.vue            //登录注册加载页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Home.vue            //后台首页
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Login.vue           //登录页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Regist.vue          //注册页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Navbar.vue          //我的发布
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——Messageboard.vue    //留言板页面
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——...                 //等等
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——router/                 
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——index.js            //页面路由
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——App.vue                 //父组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">——main.js                 //入口文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——static/                     
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——.babelrc
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——.editorconfig
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——.gitgnore
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——index.html
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——package.json
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">——README.md</span></code></pre>
<h3 id="articleHeader3"><strong>总结</strong></h3>
<p>这个项目还没有完成，后期将不定期更新，敬请期待。。</p>
<p>如果觉得还行，欢迎star<br><strong>项目地址：</strong> <a href="https://github.com/hzzly/canvas-vue" rel="nofollow noreferrer" target="_blank">https://github.com/hzzly/canv...</a><br><strong>项目后台(PHP)地址：</strong> <a href="https://github.com/hzzly/canvas-vue-backstage" rel="nofollow noreferrer" target="_blank">https://github.com/hzzly/canv...</a></p>
<p><strong>我的博客地址：</strong><a href="https://hzzly.github.io/" rel="nofollow noreferrer" target="_blank">https://hzzly.github.io/</a></p>
<p>好了，溜了溜了。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个Vue+Canvas的酷炫后台管理

## 原文链接
[https://segmentfault.com/a/1190000008780320](https://segmentfault.com/a/1190000008780320)

