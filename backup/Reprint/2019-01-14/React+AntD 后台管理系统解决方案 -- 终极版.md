---
title: 'React+AntD 后台管理系统解决方案 -- 终极版' 
date: 2019-01-14 2:30:07
hidden: true
slug: rgn4y4d2oxn
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">文档地址：<a href="https://github.com/yezihaohao/react-admin/wiki" rel="nofollow noreferrer" target="_blank">wiki</a>
</h3>
<h3 id="articleHeader1">问题和方案汇总：<a href="https://github.com/yezihaohao/react-admin/issues/12" rel="nofollow noreferrer" target="_blank">issue</a>
</h3>
<h3 id="articleHeader2">最下方增加版本更新日志</h3>
<h3 id="articleHeader3">前言</h3>
<blockquote>网上react后台管理开源免费的完整版项目比较少，所以利用空余时间集成了一个版本出来，已放到GitHub<br>  启动和打包的时间都稍长，请耐心等待两分钟</blockquote>
<ul>
<li><a href="https://yezihaohao.github.io/2017/05/09/React-AntD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88-%E7%BB%88%E6%9E%81%E7%89%88/" rel="nofollow noreferrer" target="_blank">原博客地址</a></li>
<li><a href="https://juejin.im/entry/5914001fda2f600064e0468a" rel="nofollow noreferrer" target="_blank">掘金地址</a></li>
<li><a href="https://github.com/yezihaohao/react-admin" rel="nofollow noreferrer" target="_blank">GitHub地址</a></li>
<li>
<a href="http://cheng_haohao.oschina.io/reactadmin/#/app/dashboard/index" rel="nofollow noreferrer" target="_blank">预览地址</a>(已增加响应式，可手机预览?)</li>
</ul>
<h3 id="articleHeader4">依赖模块</h3>
<p>项目是用create-react-app创建的，主要还是列出新加的功能依赖包</p>
<p>点击名称可跳转相关网站??</p>
<ul>
<li><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">react@15.5.0</a></li>
<li>
<a href="https://react-guide.github.io/react-router-cn/" rel="nofollow noreferrer" target="_blank">react-router@3.0.2</a>(react路由,4.x的差异还是比较大，暂时还是3.x的版本)</li>
<li>
<a href="https://ant.design/index-cn" rel="nofollow noreferrer" target="_blank">antd@2.9.3</a>(蚂蚁金服开源的react ui组件框架)</li>
<li>
<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios@0.16.1</a>(http请求模块，可用于前端任何场景，很强大?)</li>
<li>
<a href="https://github.com/hustcc/echarts-for-react" rel="nofollow noreferrer" target="_blank">echarts-for-react@1.2.0</a>(可视化图表，别人基于react对echarts的封装，足够用了)</li>
<li>
<a href="http://recharts.org/#/zh-CN/" rel="nofollow noreferrer" target="_blank">recharts@0.22.3</a>(另一个基于react封装的图表，个人觉得是没有echarts好用)</li>
<li>
<a href="https://github.com/rstacruz/nprogress" rel="nofollow noreferrer" target="_blank">nprogress@0.2.0</a>(顶部加载条，蛮好用?)</li>
<li>
<a href="https://github.com/jpuri/react-draft-wysiwyg" rel="nofollow noreferrer" target="_blank">react-draft-wysiwyg@1.9.6</a>(别人基于react的富文本封装，如果找到其他更好的可以替换)</li>
<li>
<a href="https://github.com/mzabriskie/react-draggable" rel="nofollow noreferrer" target="_blank">react-draggable@2.2.4</a>(拖拽模块，找了个简单版的)</li>
<li>
<a href="https://github.com/sindresorhus/screenfull.js/" rel="nofollow noreferrer" target="_blank">screenfull@3.2.0</a>(全屏插件)</li>
<li>
<a href="https://github.com/dimsemenov/photoswipe" rel="nofollow noreferrer" target="_blank">photoswipe@4.1.2</a>(图片弹层查看插件，不依赖jQuery，还是蛮好用?)</li>
<li>
<a href="http://daneden.me/animate" rel="nofollow noreferrer" target="_blank">animate.css@3.5.1</a>(css动画库)</li>
<li>其他小细节省略</li>
</ul>
<h3 id="articleHeader5">功能模块</h3>
<p>备注：项目只引入了ant-design的部分组件，其他的组件antd官网有源码，可以直接复制到项目中使用，后续有时间补上全部组件。</p>
<p>项目使用了antd的自定义主题功能--&gt;黑色，若想替换其他颜色，具体操作请查看antd官网</p>
<ul>
<li>
<p>首页</p>
<ul>
<li>完整布局</li>
<li>换肤(全局功能，暂时只实现了顶部导航的换肤，后续加上其他模块)</li>
</ul>
</li>
<li>
<p>导航菜单</p>
<ul>
<li>顶部导航(菜单伸缩，全屏功能)</li>
<li>左边菜单(增加滚动条以及适配路由的active操作)</li>
</ul>
</li>
<li>
<p>UI模块</p>
<ul>
<li>按钮(antd组件)</li>
<li>图标(antd组件并增加彩色表情符)</li>
<li>加载中(antd组件并增加顶部加载条)</li>
<li>通知提醒框(antd组件)</li>
<li>标签页(antd组件)</li>
<li>轮播图(ant动效组件)</li>
<li>富文本</li>
<li>拖拽</li>
<li>画廊</li>
</ul>
</li>
<li>
<p>动画</p>
<ul>
<li>基础动画(animate.css所有动画)</li>
<li>动画案例</li>
</ul>
</li>
<li>
<p>表格</p>
<ul>
<li>基础表格(antd组件)</li>
<li>高级表格(antd组件)</li>
<li>异步表格(数据来自掘金酱的接口)</li>
</ul>
</li>
<li>
<p>表单</p>
<ul><li>基础表单(antd组件)</li></ul>
</li>
<li>
<p>图表</p>
<ul>
<li>echarts图表</li>
<li>recharts图表</li>
</ul>
</li>
<li>
<p>页面</p>
<ul>
<li>登录页面(包括GitHub第三方登录)</li>
<li>404页面</li>
</ul>
</li>
</ul>
<h3 id="articleHeader6">功能截图</h3>
<h4>首页</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379225?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379225?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>按钮图标等</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379226?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379226?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>轮播图</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379227?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379227?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>富文本</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379228?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379228?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>拖拽</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379229?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379229?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>画廊</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379230" src="https://static.alili.tech/img/remote/1460000009379230" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>动画</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379231?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379231?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>表格</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379232?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379232?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>表单</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379233?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379233?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>图表</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379234?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379234?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h4>页面</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009379235?w=1350&amp;h=628" src="https://static.alili.tech/img/remote/1460000009379235?w=1350&amp;h=628" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">代码目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 
|   --- index.html                            ---首页入口html文件
|   --- npm.json                            ---echarts测试数据
|   --- weibo.json                            ---echarts测试数据
+-- src/                                    ---核心代码目录
|   +-- axios                               ---http请求存放目录
|   |    --- index.js
|   +-- components                          ---各式各样的组件存放目录
|   |    +-- animation                      ---动画组件
|   |    |    --- ...   
|   |    +-- charts                         ---图表组件
|   |    |    --- ...   
|   |    +-- dashboard                      ---首页组件
|   |    |    --- ...   
|   |    +-- forms                          ---表单组件
|   |    |    --- ...   
|   |    +-- pages                          ---页面组件
|   |    |    --- ...   
|   |    +-- tables                         ---表格组件
|   |    |    --- ...   
|   |    +-- ui                             ---ui组件
|   |    |    --- ...   
|   |    --- BreadcrumbCustom.jsx           ---面包屑组件
|   |    --- HeaderCustom.jsx               ---顶部导航组件
|   |    --- Page.jsx                       ---页面容器
|   |    --- SiderCustom.jsx                ---左边菜单组件
|   +-- style                               ---项目的样式存放目录，主要采用less编写
|   +-- utils                               ---工具文件存放目录
|   --- App.js                              ---组件入口文件
|   --- index.js                            ---项目的整体js入口文件，包括路由配置等
--- .env                                    ---启动项目自定义端口配置文件
--- .eslintrc                               ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json                                    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 
|   --- index.html                            ---首页入口html文件
|   --- npm.json                            ---echarts测试数据
|   --- weibo.json                            ---echarts测试数据
+-- src/                                    ---核心代码目录
|   +-- axios                               ---http请求存放目录
|   |    --- index.js
|   +-- components                          ---各式各样的组件存放目录
|   |    +-- animation                      ---动画组件
|   |    |    --- ...   
|   |    +-- charts                         ---图表组件
|   |    |    --- ...   
|   |    +-- dashboard                      ---首页组件
|   |    |    --- ...   
|   |    +-- forms                          ---表单组件
|   |    |    --- ...   
|   |    +-- pages                          ---页面组件
|   |    |    --- ...   
|   |    +-- tables                         ---表格组件
|   |    |    --- ...   
|   |    +-- ui                             ---ui组件
|   |    |    --- ...   
|   |    --- BreadcrumbCustom.jsx           ---面包屑组件
|   |    --- HeaderCustom.jsx               ---顶部导航组件
|   |    --- Page.jsx                       ---页面容器
|   |    --- SiderCustom.jsx                ---左边菜单组件
|   +-- style                               ---项目的样式存放目录，主要采用less编写
|   +-- utils                               ---工具文件存放目录
|   --- App.js                              ---组件入口文件
|   --- index.js                            ---项目的整体js入口文件，包括路由配置等
--- .env                                    ---启动项目自定义端口配置文件
--- .eslintrc                               ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json                                    </code></pre>
<h3 id="articleHeader8">安装运行</h3>
<h5>1.下载或克隆项目源码</h5>
<h5>2.npm安装相关包文件(国内建议增加淘宝镜像源，不然很慢，你懂的?)</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm i</code></pre>
<h5>3.启动项目</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm start</code></pre>
<h5>4.打包项目</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm run build</code></pre>
<h3 id="articleHeader9">更新日志</h3>
<h4>2017-07-08</h4>
<ul><li>
<p>依赖包版本升级</p>
<ul>
<li>react@15.6.1</li>
<li>antd@2.11.2</li>
<li>webpack@2.6.1</li>
<li>等等</li>
</ul>
</li></ul>
<h4>2017-08-01</h4>
<ul>
<li>
<p>引入redux系列</p>
<ul>
<li>redux@3.7.2</li>
<li>redux-thunk@2.2.0</li>
<li>react-redux@5.0.5</li>
</ul>
</li>
<li>
<p>增加权限管理模块</p>
<ul>
<li>使用easy-mock模拟数据模拟登录接口</li>
<li>使用redux系列将登录用户数据传递给权限组件</li>
<li>权限组件采用Render Callback的方式传递权限给需要受控制的组件（具体做法请查看源代码。）</li>
<li>用户状态保存在localStorage中</li>
<li>具体做法请运行项目查看</li>
<li>PS：以上管理权限只是一种方式，但这绝对不是唯一的方式，也不是最好的方式。如果你有更好的方式，不妨加上面的群和大家一起分享下。??</li>
</ul>
</li>
<li>
<p>增加路径别名</p>
<ul>
<li>使用@别名处理引入组件相对路径过长问题。</li>
<li>缺点：编辑器不能使用快捷提示和快捷跳转到相应的文件</li>
</ul>
</li>
</ul>
<h4>2017-08-13</h4>
<ul><li>
<p>权限管理模块增加页面跳转权限验证</p>
<ul>
<li>点击权限管理的路由拦截，若没有访问权限则会跳转到404页面。</li>
<li>大致实现方式(非常简单)：通过向自定义router组件传入store，登录之后可获取到redux中的权限state数据，并通过判断是否包含权限进行跳转。ps: 该demo的效果是管理员登录之后才能跳转到路由拦截页面。具体操作请拉取代码尝试。</li>
</ul>
</li></ul>
<h4>2017-08-26</h4>
<ul><li>
<p>增加响应式布局</p>
<ul>
<li>替换antd Col 组件的响应式栅格为md(具体参数用法请查看antd官方文档)</li>
<li>初始化页面是获取当前浏览器宽度设置菜单显示类型</li>
<li>监听window的onresize函数，设置菜单显示类型。PS：浏览器宽度存入redux中，方便组件之间传递。</li>
</ul>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010862699" src="https://static.alili.tech/img/remote/1460000010862699" alt="截图" title="截图" style="cursor: pointer;"></span></p>
<h4>2017-09-13</h4>
<ul><li>
<p>依赖包版本升级</p>
<ul><li>antd@2.13.1(目前最新版)</li></ul>
</li></ul>
<h4>2017-10-21</h4>
<ul><li>
<p>开发环境增加react-hot-loader-保持状态刷新组件(译：实时调整组件),可参考以下相关项目</p>
<ul><li><a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">react-hot-loader</a></li></ul>
</li></ul>
<h4>2017-12-12</h4>
<ul>
<li>
<p>依赖包版本升级</p>
<ul>
<li>antd@3.0.1(目前最新版)</li>
<li>react-router-dom@4.2.2</li>
</ul>
</li>
<li>
<p>大改动</p>
<ul>
<li>react-router切换4.x版本，切换响应的版本路由写法(具体见代码更新日志)</li>
<li>ps: react-router 3.x的版本请查看代码分支router3.x</li>
</ul>
</li>
</ul>
<h4>2018-01-12</h4>
<ul><li>
<p>增加cssmodule的支持（css, less）</p>
<ul><li>建议用css预处理器，文件名为xxx.module.less，引入相应组件即可使用。</li></ul>
</li></ul>
<p>&nbsp;  - 具体做法参见新增模块，路由后缀：/app/cssModule。<a href="http://cheng_haohao.oschina.io/reactadmin/#/app/cssModule" rel="nofollow noreferrer" target="_blank">点击访问</a></p>
<h3 id="articleHeader10">结尾</h3>
<p>该项目会不定时更新，后续时间会添加更多的模块</p>
<p>欢迎和感谢大家PR~~??</p>
<p>若有问题，可加QQ群264591039与我交流</p>
<p>ps:以上群满的时候请加群：592688854</p>
<p>如果对你有帮助，给个star哟~~❤️❤️❤️❤️</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React+AntD 后台管理系统解决方案 -- 终极版

## 原文链接
[https://segmentfault.com/a/1190000009379222](https://segmentfault.com/a/1190000009379222)

