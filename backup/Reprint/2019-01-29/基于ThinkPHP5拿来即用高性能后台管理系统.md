---
title: '基于ThinkPHP5拿来即用高性能后台管理系统' 
date: 2019-01-29 2:30:10
hidden: true
slug: 2krut77u4hn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>喜欢就Star，不只是Fork；</p>
<p>想要分享的动机才是驱动力，而技术仅仅是一种方法。</p>
<p>数据库文件已经上传，安装配置就可以使用</p>
</blockquote>
<h1><span class="img-wrap"><img data-src="/img/bVG7pn?w=2560&amp;h=1600" src="https://static.alili.tech/img/bVG7pn?w=2560&amp;h=1600" alt="5853ff7f0001505e25601600.jpg" title="5853ff7f0001505e25601600.jpg" style="cursor: pointer; display: inline;"></span></h1>
<h1 id="articleHeader1">TP-Web(简称Web)</h1>
<p>TP-Web即基于ThinkPHP5的web后台管理系统</p>
<h2 id="articleHeader2">官方文档</h2>
<p>地址：<a href="http://doc.web.shijinrong.cn/" rel="nofollow noreferrer" target="_blank">http://doc.web.shijinrong.cn/</a></p>
<h2 id="articleHeader3">在线体验</h2>
<p>地址：<a href="http://web.shijinrong.cn/admin/login" rel="nofollow noreferrer" target="_blank">http://web.shijinrong.cn/admin/login</a> </p>
<p>账户：13330613321</p>
<p>密码：123</p>
<h2 id="articleHeader4">线上仓库</h2>
<p>在线地址：<a href="https://github.com/Aierui/web" rel="nofollow noreferrer" target="_blank">https://github.com/Aierui/web</a></p>
<h3 id="articleHeader5">源代码下载</h3>
<p><strong>git克隆</strong>：<code>git clone https://github.com/Aierui/web</code> </p>
<p><strong>直接下载</strong>：<a href="https://github.com/Aierui/web/archive/master.zip" rel="nofollow noreferrer" target="_blank">https://github.com/Aierui/web/archive/master.zip</a></p>
<h2 id="articleHeader6">本地部署</h2>
<p><strong>运行环境要求</strong></p>
<blockquote><ul>
<li><p>PHP &gt;= 5.4.0</p></li>
<li><p>PDO PHP Extension</p></li>
<li><p>MBstring PHP Extension</p></li>
<li><p>CURL PHP Extension</p></li>
</ul></blockquote>
<p>建议配置虚拟域名（若不清楚，请自行解决之），方便接下来开展你的开发工作。</p>
<blockquote><p>按照TP5默认，入口文件位于<code>public/index.php</code><br>入口文件位置的设计是为了让应用部署更安全，public目录为web可访问目录，其他的文件都可以放到非WEB访问目录下面。</p></blockquote>
<p>除非</p>
<blockquote><p>你是一名高级PHPer，也可以为每一个模块自定义入口文件</p></blockquote>
<p><strong>部署完成后</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://your-domain/ 例如虚拟域名配置为www.web.com 则http://www.web.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span><span class="hljs-comment">//your-domain/ 例如虚拟域名配置为www.web.com 则http://www.web.com</span></code></pre>
<p><strong>详细参考</strong><a href="http://www.kancloud.cn/manual/thinkphp5/129745" rel="nofollow noreferrer" target="_blank">ThinkPHP5官方手册中的部署部分</a>官方手册更加完善且很清楚</p>
<h2 id="articleHeader7">开发规范</h2>
<p>tp-web-admin框架严格遵循ThinkPHP5开发规范，详情请参照<a href="http://www.kancloud.cn/manual/thinkphp5/118007" rel="nofollow noreferrer" target="_blank">官方手册</a></p>
<h1 id="articleHeader8">TP-Web——拿来即用高性能后台管理系统</h1>
<p>TP-Web即基于ThinkPHP5的web后台管理系统</p>
<h3 id="articleHeader9">主要特性：</h3>
<ul>
<li><p><strong>菜单管理</strong>：自定义添加菜单，自动生成菜单节点</p></li>
<li><p><strong>角色管理</strong>：自定义后台各菜单各节点权限分配</p></li>
<li><p><strong>账号管理</strong>：平台后台账号统一管理，自定义分配角色</p></li>
<li><p><strong>日志记录</strong>：自动记录网站操作写入数据库</p></li>
<li><p><strong>数据验证</strong>：表单数据自动验证</p></li>
<li><p><strong>基础封装</strong>：后台基础类，如权限验证、实时登录等</p></li>
<li><p><strong><a href="https://github.com/Aierui/web/blob/master/public/js/admin/main.js" rel="nofollow noreferrer" target="_blank">系统集成js</a></strong>:初始化selector、空对象判断、重定向、modal、封装全局ajax请求、下载js、下载样式、表单验证、jquery扩展ajax提交表单、弹出提示信息alertMsg()、弹出确认提示框alertConfirm()等</p></li>
<li><p><strong><a href="https://github.com/Aierui/web/blob/master/public/js/admin/gridview.js" rel="nofollow noreferrer" target="_blank">GridViewjs</a></strong>:数据表格显示优化、表格数据初始化、关键词搜索、支持4种事件类型（1. 自定义 2.视图  3.默认 4.脚本）、视图事件支持3种新页面打开方式（1.<strong>模态框</strong>2.本页打开 3.在新窗口打开）</p></li>
<li><p><strong>小特性，自己挖掘哦~~ 更多新特性、正在完善中……</strong></p></li>
<li><p><strong>也期待有想法的你加入</strong></p></li>
</ul>
<h3 id="articleHeader10">支持TP-web的用户请到 <a href="https://github.com/Aierui/web" rel="nofollow noreferrer" target="_blank">GitHub</a> 给我一个star ^_^</h3>
<h3 id="articleHeader11">为什么要选择TP5</h3>
<p>因为TP5在框架中就有如下高级特性</p>
<ul>
<li><ul><li><ul><li><ul><li><p>*</p></li></ul></li></ul></li></ul></li>
<li><p><strong>规范</strong>：遵循PSR-2、PSR-4规范，Composer及单元测试支持；</p></li>
<li><p><strong>严谨</strong>：异常严谨的错误检测和安全机制，详细的日志信息，为你的开发保驾护航；</p></li>
<li><p><strong>灵活</strong>：减少核心依赖，扩展更灵活、方便，支持命令行指令扩展；</p></li>
<li><p><strong>API友好</strong>：出色的性能和REST支持、远程调试，更好的支持API开发；</p></li>
<li><p><strong>高效</strong>：惰性加载，及路由、配置和自动加载的缓存机制；</p></li>
<li><p><strong>ORM</strong>：重构的数据库、模型及关联，MongoDb支持；</p></li>
</ul>
<h3 id="articleHeader12">合理使用轮子</h3>
<p>排名部分先后顺序</p>
<ul>
<li><p>框架：ThinkPHP5.0.2、jQuery3.1.0</p></li>
<li><p>插件：bootstrap3.3.0、bootstrap-table1.11.0、validate.js0.10.0、jstree3.1.1、font-awesome4.6.3</p></li>
<li><p>平台：Github</p></li>
<li><p>……</p></li>
</ul>
<blockquote><p>在此非常感谢各框架、插件、平台的支持</p></blockquote>
<h2 id="articleHeader13">交流</h2>
<ul>
<li><p>大家可以在github上Issues</p></li>
<li><p>在<a href="http://web.shijinrong.cn/admin/" rel="nofollow noreferrer" target="_blank">这个后台</a>我增加了一个用户建议、也可以留言</p></li>
<li><p>欢迎提出bug、便于我接下来修改</p></li>
<li><p>若你还有足够的精力和时间，欢迎你也加入进来</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于ThinkPHP5拿来即用高性能后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000007854237](https://segmentfault.com/a/1190000007854237)

