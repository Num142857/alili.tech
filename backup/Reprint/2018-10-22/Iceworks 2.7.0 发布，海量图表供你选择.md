---
title: Iceworks 2.7.0 发布，海量图表供你选择
hidden: true
categories: [reprint]
slug: 340bdc28
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<h1 id="articleHeader0">Iceworks 2.7.0 发布，海量图表供你选择</h1>
<blockquote>Iceworks，丰富模板一键创建，提供多种垂直领域模板，快速创建项目，支持风格切换，满足个性化需求；轻松操作页面管理，海量物料自由搭配，页面组合可视化操作更得心应手；开发调试一体化，集成运行环境零配置运行，开箱即用。</blockquote>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016223009?w=2848&amp;h=1408" src="https://static.alili.tech/img/remote/1460000016223009?w=2848&amp;h=1408" alt="cover" title="cover" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2.7.0 发布概览</h2>
<ul>
<li>特性：新增官方推荐物料集合，内置支持 Bizcharts 的所有图表</li>
<li>优化：初次使用项目界面增加项目创建引导项</li>
<li>修复：自定义物料源在 scaffolds 的情况下卡死的问题</li>
<li>模板：丰富的 React、Vue、Angular 模板</li>
</ul>
<h2 id="articleHeader2">Bizcharts 物料源</h2>
<p><a href="https://juejin.im/post/5b847de8f265da4340158800" rel="nofollow noreferrer" target="_blank">阿里巴巴图表库 Bizcharts 正式开源</a> Bizcharts 是基于 <a href="https://antv.alipay.com/zh-cn/g2/3.x/index.html" rel="nofollow noreferrer" target="_blank">G2</a> 引擎的 React 版本的封装。 Bizcharts 的语法设计非常贴切 React 的使用方式，图表的各个部分都拆分成了独立的 React 类，如：<code>&lt;Tooltip /&gt;</code> 代表提示信息， <code>&lt;Axis /&gt;</code> 代表坐标轴。 所有图表的配置项皆为组件的 <code>props</code> 。</p>
<p>正式开源之后，飞冰与 Bizcharts 团队联合推出了图表类物料源，以内置推荐的形式更新到 Iceworks 2.7.0 版本，在设置面板中开启即可使用。该物料源主要由 Bizcharts 团队成员开发和维护，在一定程度能保证该物料源的持续更新和及时反馈。包括：</p>
<ul>
<li>200 多个图表类区块</li>
<li>6 套图表类可视化模板</li>
</ul>
<h3 id="articleHeader3">图表类可视化模板</h3>
<ul>
<li><a href="https://g.alicdn.com/bizcharts-material/scaffold-ad/0.0.5/index.html#/" rel="nofollow noreferrer" target="_blank">广告数据首页</a></li>
<li><a href="https://g.alicdn.com/bizcharts-material/scaffold-cira-crowd/0.0.6/index.html#/" rel="nofollow noreferrer" target="_blank">人群画像分析</a></li>
<li><a href="https://g.alicdn.com/bizcharts-material/2016-olympic-nbc/0.0.6/index.html#/" rel="nofollow noreferrer" target="_blank">电视广告传播分析屏</a></li>
<li><a href="https://g.alicdn.com/bizcharts-material/scaffold-screen-demo/0.0.3/index.html#/" rel="nofollow noreferrer" target="_blank">可视化大屏</a></li>
<li><a href="https://g.alicdn.com/bizcharts-material/scaffold-screen-demo/0.0.3/index.html#/" rel="nofollow noreferrer" target="_blank">监控预警大屏-折线图</a></li>
</ul>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016223010?w=1908&amp;h=1368" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">丰富的图表类区块</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016223011?w=1908&amp;h=1368" src="https://static.alili.tech/img/remote/1460000016223011?w=1908&amp;h=1368" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader5">其他物料源</h2>
<p>除了增加对 React 物料源的支持，我们也增加对 Vue 和 Angular 的支持；可通过 Iceworks 直接创建 Vue 或者 Angular 项目，主要由社区进行维护。</p>
<h3 id="articleHeader6">Vue 模板</h3>
<p><a href="https://github.com/d2-projects/d2-admin" rel="nofollow noreferrer" target="_blank">D2Admin</a> 是一个开源的管理系统前端集成方案，为了方便开发者快速进行管理系统开发而设计，提供了大量开箱即用的功能：</p>
<ul>
<li>登陆和注销的页面、逻辑、路由拦截</li>
<li>主题系统</li>
<li>基于 ElementUI 的优化外观</li>
<li>表格 CRUD 封装 (<a href="https://github.com/d2-projects/d2-crud" rel="nofollow noreferrer" target="_blank">d2-crud</a>)</li>
<li>完善的页面容器组件，六种布局模式，具备顶栏和底栏插槽</li>
<li>表格导入导出</li>
<li>错误处理</li>
<li>模拟数据</li>
<li>集成字体图标库，以及即放即用的 svg 图标组件</li>
<li>同类产品中最强大的出具持久化方案</li>
<li>完善的多标签页用户控制</li>
<li>完善的全局系统控制</li>
</ul>
<p>D2 Admin 主要由社区 <a href="https://github.com/FairyEver" rel="nofollow noreferrer" target="_blank">FairyEver</a> 维护，为了方便开发者快速开发推出的 D2 Admin ICE 和完整版的 D2 Admin 有完全一致的系统功能。D2 Admin ICE 和其它分支同时更新。<a href="http://app.d3collection.cn/d2-admin-doc/lastest/zh/learn-guide/" rel="nofollow noreferrer" target="_blank">D2 Admin 中文文档 | 介绍</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016223012?w=1908&amp;h=1368" src="https://static.alili.tech/img/remote/1460000016223012?w=1908&amp;h=1368" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">Angular 模板</h3>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016223013?w=1908&amp;h=1368" src="https://static.alili.tech/img/remote/1460000016223013?w=1908&amp;h=1368" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader8">自定义编辑器启动脚本</h2>
<p>Iceworks 默认内置了 VSCode、SublimeText、Atom、WebStorm 等，但很难覆盖所有用户的编辑器选择。</p>
<p>因此在改版本中增加了自定义编辑器启动脚本的功能。</p>
<p>例如启动 VSCode 的命令是 <code>code</code>，将脚本定义为 <code>code ${cwd}</code> 即可。</p>
<p><code>${cwd}</code> 在执行时会被替换成当前的项目地址</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016223014" src="https://static.alili.tech/img/remote/1460000016223014" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>扩展信息</p>
<ul><li>官方网站：[飞冰-让前端开发简单而友好</li></ul>
<p>](<a href="https://alibaba.github.io/ice/)" rel="nofollow noreferrer" target="_blank">https://alibaba.github.io/ice/)</a></p>
<ul>
<li>下载 Iceworks：<a href="https://alibaba.github.io/ice/iceworks" rel="nofollow noreferrer" target="_blank">https://alibaba.github.io/ice...</a>
</li>
<li>Github：<a href="http://github.com/alibaba/ice" rel="nofollow noreferrer" target="_blank">http://github.com/alibaba/ice</a>
</li>
<li>飞冰群二维码：<a href="http://ice.alicdn.com/assets/images/qrcode.png" rel="nofollow noreferrer" target="_blank">点击这里查看二维码</a>
</li>
<li>有兴趣加入飞冰，欢迎勾搭 ice-admin@alibaba-inc.com</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016223006](https://segmentfault.com/a/1190000016223006)

## 原文标题
Iceworks 2.7.0 发布，海量图表供你选择
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 
