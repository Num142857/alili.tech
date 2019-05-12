---
title: '基于 Nest.js(Node.js) + React 的模块化敏捷开发系统架构 Notadd 2.0 Beta2 发布' 
date: 2018-12-11 2:30:10
hidden: true
slug: q9nohuefs8b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>大多数 node.js 框架都没解决架构问题，使得 node.js 没能像 spring 一样的适合大型项目开发和维护的框架。 nest.js 出现改变了这种现状。<br>我们基于 nest.js 开发了 Notadd ，更加解决了快速开发需求。</p>
<p>[开发快] 像搭积木一样快速满足自己的开发需求</p>
<p>[高性能] 单机并发轻松上万</p>
<p>[易维护] 类 spring 一般优秀的架构，便于维护和二次开发</p>
<h2 id="articleHeader1">更新内容</h2>
<p>新增：</p>
<ul>
<li>拓展机制的支持</li>
<li>支持 RPC 通信</li>
<li>基于 npm 的应用升级机制</li>
<li>多语言机制的支持</li>
<li>完整的后端 json 表单生成机制</li>
</ul>
<p>优化：</p>
<ul>
<li>升级 Material-ui 至 1.0 Beta35</li>
<li>安装流程优化(支持创建后台用户名密码)</li>
<li>sqlite 不再要求输入数据库名 用户名等</li>
</ul>
<p>修复：</p>
<ul>
<li>修复 yarn dev 无法运行的问题。</li>
<li>修复 yarn install 安装时部分包由于 ts 版本导致的编译问题。</li>
</ul>
<h2 id="articleHeader2">相关技术</h2>
<ul>
<li>Typescript</li>
<li>Node.js &amp; Nest.js</li>
<li>React.js &amp; material-ui</li>
<li>GraphQL API</li>
<li>Redis</li>
</ul>
<h2 id="articleHeader3">特点</h2>
<ul>
<li>[x] 前后端完全分离，页面无刷新，大大降低后端负载</li>
<li>[x] 异步高性能应用，单机并发轻松上万</li>
<li>[ ] 支持 SSR 渲染，更好的 SEO</li>
<li>[x] 支持 React 动态表单生成</li>
<li>[x] GraphQL 接口，多次请求合并</li>
<li>[x] 基于 Typeorm 原生支持超过 6 种数据库</li>
<li>[x] 原生支持 Websocket 实时通信</li>
<li>[x] 原生支持 Grpc，可跨进程，跨语言，跨服务器通信</li>
<li>[ ] 支持 PWA 技术，实现断网提醒，断网表单保存，网页离线消息推送。</li>
</ul>
<h2 id="articleHeader4">模块化设计</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011131742" src="https://static.alili.tech/img/remote/1460000011131742" alt="notadd" title="notadd" style="cursor: pointer;"></span></p>
<p>(配图是 PHP 版的，后续修改)</p>
<p>企业官网：CMS 模块 + Neditor 插件、留言板插件</p>
<p>信息发布：CMS 模块、用户模块 + CMS 多用户插件、Neditor 插件</p>
<p>微信商城： 用户模块、商城模块、微信模块 + 微信大转盘、支付插件、线下核验插件</p>
<p>餐饮方案： 用户模块、商城模块、微信模块 + 点餐插件、扫码支付插件、客流监测插件... + 红外传感拓展、WIFI 探针拓展</p>
<p>酒店方案： 用户模块、酒店模块、微信模块 + 预定插件、支付插件、智能 WIFI 插件 + WIFI 探针拓展、门卡系统拓展</p>
<p>CRM 系统： 用户模块、CRM 模块...</p>
<p>更多可畅想的...</p>
<h2 id="articleHeader5">CDN 方案</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229200" src="https://static.alili.tech/img/remote/1460000013229200" alt="cdn" title="cdn" style="cursor: pointer; display: inline;"></span></p>
<p>(配图是 PHP 版的，后续修改)</p>
<h2 id="articleHeader6">系统环境</h2>
<p>支持系统：Linux / macOS / Windows 2008 及以上版本</p>
<p>Node.js 版本：≥8.0</p>
<p>数据库：PostgreSQL 9.4+/ MySQL 5.7+ / Oracle 12+ / MS SQL Server 2012+ / MariaDB 10.2.28+ / SQLite 3.9+</p>
<p>缓存：Redis 3.2+  （当前版本非必须）</p>
<h2 id="articleHeader7">2.0 后台的全平台支持 （手机、PC、平板）</h2>
<p>现在，2.0 的后台管理完整支持了手机、PC、平板，后台操作更加随心所欲。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229201?w=1466&amp;h=776" src="https://static.alili.tech/img/remote/1460000013229201?w=1466&amp;h=776" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229202?w=312&amp;h=563" src="https://static.alili.tech/img/remote/1460000013229202?w=312&amp;h=563" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">2.0 后台 json 生成表单</h2>
<p>常用的表单都可以通过 json 生成，后端不需要再写 React 代码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229203?w=1199&amp;h=814" src="https://static.alili.tech/img/remote/1460000013229203?w=1199&amp;h=814" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">2.0 初步的多数据库支持</h2>
<p>现在，在安装过程中可以选择数据库，并且输入相应的信息就能下载对应的驱动并且建立数据库连接。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229204?w=597&amp;h=245" src="https://static.alili.tech/img/remote/1460000013229204?w=597&amp;h=245" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229205?w=637&amp;h=423" src="https://static.alili.tech/img/remote/1460000013229205?w=637&amp;h=423" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">快速开始</h2>
<h2 id="articleHeader11">下载</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/notadd/notadd.git --branch=next
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/notadd/</span>notadd.git --branch=<span class="hljs-keyword">next</span>
</code></pre>
<p>码云高速下载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://gitee.com/notadd/notadd.git  --branch=next" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">git clone https:<span class="hljs-regexp">//gi</span>tee.com<span class="hljs-regexp">/notadd/</span>notadd.git  --branch=<span class="hljs-keyword">next</span></code></pre>
<p>### 安装</p>
<p>执行 NPM 包安装，（如无yarn ，请先执行 <code>npm i yarn -g</code>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">install</span></code></pre>
<p>自动创建数据库配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn run:install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">yarn <span class="hljs-keyword">run</span><span class="bash">:install</span></code></pre>
<p>必须使用 yarn ！！！必须使用 yarn ！！！必须使用 yarn ！！！</p>
<p>## 运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">yarn dev</span></code></pre>
<h2 id="articleHeader12">更新月报</h2>
<p><a href="https://blog.notadd.com/2018/03/20/2018-03//" rel="nofollow noreferrer" target="_blank">2018 年 3 月</a></p>
<p><a href="https://blog.notadd.com/2018/02/20/2018-02/" rel="nofollow noreferrer" target="_blank">2018 年 2 月</a></p>
<p><a href="https://blog.notadd.com/2018/01/01/2018-01/" rel="nofollow noreferrer" target="_blank">2018 年 1 月</a></p>
<p><a href="https://blog.notadd.com/2017/12/08/2017-12/" rel="nofollow noreferrer" target="_blank">2017 年 12 月</a></p>
<p><a href="https://blog.notadd.com/2017/11/11/2017-11/" rel="nofollow noreferrer" target="_blank">2017 年 11 月</a></p>
<p><a href="https://blog.notadd.com/2017/10/11/2017-10/" rel="nofollow noreferrer" target="_blank">2017 年 10 月</a></p>
<p><a href="https://blog.notadd.com/2017/09/22/2017-09/" rel="nofollow noreferrer" target="_blank">2017 年 9 月</a></p>
<p><a href="https://blog.notadd.com/2017/09/01/2017-08/" rel="nofollow noreferrer" target="_blank">2017 年 8 月</a></p>
<p><a href="https://blog.notadd.com/2017/08/01/2017-07/" rel="nofollow noreferrer" target="_blank">2017 年 7 月</a></p>
<h2 id="articleHeader13">下载地址</h2>
<p><a href="https://gitee.com/notadd/notadd/tree/next/" rel="nofollow noreferrer" target="_blank">码云</a></p>
<p><a href="https://github.com/notadd/notadd/tree/next" rel="nofollow noreferrer" target="_blank">github</a></p>
<h2 id="articleHeader14">一点说明</h2>
<p>3月将发布 用户中心模块 和 CMS模块 ，4月/5月 后续还会有 商城模块、微信模块~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Nest.js(Node.js) + React 的模块化敏捷开发系统架构 Notadd 2.0 Beta2 发布

## 原文链接
[https://segmentfault.com/a/1190000013568724](https://segmentfault.com/a/1190000013568724)

