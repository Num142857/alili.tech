---
title: 'Vue全家桶+Mint-Ui打造高仿QQMusic，搭配详细说明' 
date: 2019-01-13 2:30:11
hidden: true
slug: 43rkepkz1jp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue-QQMusic</h2>
<h4>简介：</h4>
<p>最近有点小闲置，于是乎希望写点东西，正好自己喜欢听歌，便决定自己写一个QQ音乐的简易版。<br>顺便进一步加深下自己对移动端的知识。我会在每个核心组件和部分都加下注解大致说明原理，争取提供一个良好的代码阅读环境，在注视部分是采用英文写的，请原谅我撇脚的英语o(╯□╰)o，欢迎大家给我提出更好的意见( *︾▽︾)</p>
<h4>原理简介：</h4>
<p>首先这里通过Jsonp来进行跨域获取QQ音乐API数据，在<a href="https://github.com/Panda-Hope/vue-qqmusic/blob/master/src/api/index.js" rel="nofollow noreferrer" target="_blank">API Hanler</a>对API进行处理导出统一的方法来获取数据。  <br>核心文件则是在<a href="https://github.com/Panda-Hope/vue-qqmusic/blob/master/src/store/index.js" rel="nofollow noreferrer" target="_blank">Store</a>,在这里使用Vuex统一管理页面切换动画，歌曲播放状态，歌曲进度等信息。所有对于歌曲的操作都通过Vuex来进行全局管理，然后对相应的变化做出全局改变。</p>
<h2 id="articleHeader1">技术栈</h2>
<ul>
<li><p>Vue全家桶（使用Vue-cli作为构建工具）</p></li>
<li><p>Webpack</p></li>
<li><p>Mint-Ui</p></li>
<li><p>Es6</p></li>
<li><p>Sass</p></li>
<li><p>Velocity, AlloyTouch等第三方库</p></li>
</ul>
<h2 id="articleHeader2">运行演示</h2>
<h4>线上地址：<a href="https://panda-hope.github.io/" rel="nofollow noreferrer" target="_blank">Vue-QQMusic</a>
</h4>
<h4>源码地址：<a href="https://github.com/Panda-Hope/vue-qqmusic" rel="nofollow noreferrer" target="_blank">源码</a>
</h4>
<h4>移动端请扫描下面二维码：</h4>
<p><span class="img-wrap"><img data-src="/img/bVOnlO?w=300&amp;h=300" src="https://static.alili.tech/img/bVOnlO?w=300&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>运行截图：</h4>
<p><span class="img-wrap"><img data-src="/img/bVOnlS?w=726&amp;h=1268" src="https://static.alili.tech/img/bVOnlS?w=726&amp;h=1268" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVOnlT?w=720&amp;h=1270" src="https://static.alili.tech/img/bVOnlT?w=720&amp;h=1270" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVOnlW?w=708&amp;h=1264" src="https://static.alili.tech/img/bVOnlW?w=708&amp;h=1264" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVOnlY?w=710&amp;h=1260" src="https://static.alili.tech/img/bVOnlY?w=710&amp;h=1260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVOnlU?w=710&amp;h=1266" src="https://static.alili.tech/img/bVOnlU?w=710&amp;h=1266" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">项目组件</h2>
<ul>
<li><p>[x] 首页 -- 完成</p></li>
<li><p>[ ] 电台 -- 无法获取电台API</p></li>
<li><p>[X] 歌手信息 -- 完成</p></li>
<li><p>[X] 歌手列表 -- 完成</p></li>
<li><p>[x] 歌曲排行 -- 完成</p></li>
<li><p>[x] 歌曲列表 -- 完成</p></li>
<li><p>[x] 热门推荐 -- 完成</p></li>
<li><p>[x] 歌曲搜索 -- 完成</p></li>
<li><p>[x] 歌曲播放 -- 完成</p></li>
<li><p>[x] 底部固定歌曲播放条 -- 完成</p></li>
</ul>
<h2 id="articleHeader4">项目结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- src &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 源码目录 
| &nbsp; |-- api &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // QQ音乐Api分析文件
|       |-- index.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
|   |-- assets &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 图片资源文件
| &nbsp; |-- components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 组件
| &nbsp; &nbsp; &nbsp; |-- fallback.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 公用后退组件
| &nbsp; &nbsp; &nbsp; |-- header.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      // 重写Mini-Ui头部组件，来实现更多效果
| &nbsp; &nbsp; &nbsp; |-- index.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 首页界面
| &nbsp; &nbsp; &nbsp; |-- list.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 公用歌曲列表组件
| &nbsp; &nbsp; &nbsp; |-- lyrics.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌词组件
| &nbsp; &nbsp; &nbsp; |-- play-fixed.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 底部固定歌曲播放组件
| &nbsp; &nbsp; &nbsp; |-- playing.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 歌曲播放页面
| &nbsp; &nbsp; &nbsp; |-- radio.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 电台界面
| &nbsp; &nbsp; &nbsp; |-- ranklist.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌曲排行榜界面
| &nbsp; &nbsp; &nbsp; |-- recommend.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// 推荐歌曲界面
| &nbsp; &nbsp; &nbsp; |-- search.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 搜索界面
| &nbsp; &nbsp; &nbsp; |-- singer.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌手界面
| &nbsp; &nbsp; &nbsp; |-- singerlist.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌手列表界面
| &nbsp; &nbsp; &nbsp; |-- slider.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌词滑动组件
| &nbsp; &nbsp; &nbsp; |-- special.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 特殊界面用于使用Iframe包含封面等QQ音乐原生界面
| &nbsp; &nbsp; &nbsp; |-- toplist.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // QQ音乐巅峰榜界面
| &nbsp; |-- mixin &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 全局mixin方法
| &nbsp; &nbsp; &nbsp; |-- index.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
| &nbsp; |-- router &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Vue 路由
| &nbsp; &nbsp; &nbsp; |-- index.js
| &nbsp; |-- sass &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // css文件夹，采用Sass进行预编译
| &nbsp; &nbsp; &nbsp; |-- packages &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Mint-Ui文件夹，覆盖Mint-Ui原有样式
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|-- cell.scss
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|-- header.scss
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|-- index.scss
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|-- navbar.scss
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|-- search.scss
| &nbsp; &nbsp; &nbsp; |-- themes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // APP主题CSS，未来将增加主题切换功能
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |-- index.scss
| &nbsp; &nbsp; &nbsp; |-- transition &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 全局公用Transition, Animation
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;|-- index.scss
| &nbsp; &nbsp; &nbsp; |-- dimension.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 阿里SUI, Rem屏幕适应变化css(暂未使用)
| &nbsp; &nbsp; &nbsp; |-- index.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Sass 入口文件
| &nbsp; &nbsp; &nbsp; |-- mixins.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Sass 公用全局Mixin
| &nbsp; &nbsp; &nbsp; |-- normalize.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Normalize.css
| &nbsp; &nbsp; &nbsp; |-- page.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 页面布局css
| &nbsp; &nbsp; &nbsp; |-- scaffold.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // scaffold css 设置基本全局样式
| &nbsp; &nbsp; &nbsp; |-- util.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      // 公用全局Sass组件
| &nbsp; &nbsp; &nbsp; |-- var.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;       // 全局Sass变量，这里使用sass-resources-loader向全局注入Sass变量
| &nbsp; |-- store &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Vuex Store文件，APP核心所在
| &nbsp; &nbsp; &nbsp; |-- index.js &nbsp; &nbsp; &nbsp; 
| &nbsp; |-- util &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 全局公用函数
| &nbsp; &nbsp; &nbsp; |-- index.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
| &nbsp; |-- App.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // App入口文件
| &nbsp; |-- filter.js&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 注册全局Vue filter
| &nbsp; |-- main.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 程序入口文件，加载Vuex,Vue-router等插件
| &nbsp; |-- mintUi.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Mint-Ui配置文件
| &nbsp; |-- test &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 测试目录，暂未使用
|-- .babelrc &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .eslintignore &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Eslint 忽略的文件
|-- .eslintrc.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // EsLint 配置&nbsp;暂未使用 
|-- .gitignore                       // git ingnore
|-- .postcssrc.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // post css 配置文件
|-- README.md                        // README
|-- index.html &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 入口html文件
`-- package.json                     // 项目及工具的依赖配置文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>
|<span class="hljs-string">-- build                            // webpack配置文件
</span>|<span class="hljs-string">-- config                           // 项目打包路径
</span>|<span class="hljs-string">-- src &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 源码目录 
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- api &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // QQ音乐Api分析文件
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- index.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- assets &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 图片资源文件
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- fallback.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 公用后退组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- header.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      // 重写Mini-Ui头部组件，来实现更多效果
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 首页界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- list.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 公用歌曲列表组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- lyrics.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌词组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- play-fixed.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 底部固定歌曲播放组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- playing.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 歌曲播放页面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- radio.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 电台界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- ranklist.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌曲排行榜界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- recommend.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// 推荐歌曲界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- search.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 搜索界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- singer.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌手界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- singerlist.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌手列表界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- slider.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 歌词滑动组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- special.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 特殊界面用于使用Iframe包含封面等QQ音乐原生界面
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- toplist.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // QQ音乐巅峰榜界面
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- mixin &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 全局mixin方法
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- router &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Vue 路由
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.js
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- sass &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // css文件夹，采用Sass进行预编译
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- packages &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Mint-Ui文件夹，覆盖Mint-Ui原有样式
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>|<span class="hljs-string">-- cell.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>|<span class="hljs-string">-- header.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>|<span class="hljs-string">-- index.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>|<span class="hljs-string">-- navbar.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>|<span class="hljs-string">-- search.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- themes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // APP主题CSS，未来将增加主题切换功能
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- transition &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 全局公用Transition, Animation
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>|<span class="hljs-string">-- index.scss
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- dimension.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 阿里SUI, Rem屏幕适应变化css(暂未使用)
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Sass 入口文件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- mixins.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Sass 公用全局Mixin
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- normalize.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // Normalize.css
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- page.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 页面布局css
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- scaffold.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // scaffold css 设置基本全局样式
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- util.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;      // 公用全局Sass组件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- var.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;       // 全局Sass变量，这里使用sass-resources-loader向全局注入Sass变量
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- store &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Vuex Store文件，APP核心所在
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.js &nbsp; &nbsp; &nbsp; 
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- util &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 全局公用函数
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- index.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- App.vue &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // App入口文件
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- filter.js&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 注册全局Vue filter
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- main.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // 程序入口文件，加载Vuex,Vue-router等插件
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- mintUi.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Mint-Ui配置文件
</span>|<span class="hljs-string"> &nbsp; </span>|<span class="hljs-string">-- test &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 测试目录，暂未使用
</span>|<span class="hljs-string">-- .babelrc &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // ES6语法编译配置
</span>|<span class="hljs-string">-- .editorconfig                    // 代码编写规格
</span>|<span class="hljs-string">-- .eslintignore &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // Eslint 忽略的文件
</span>|<span class="hljs-string">-- .eslintrc.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // EsLint 配置&nbsp;暂未使用 
</span>|<span class="hljs-string">-- .gitignore                       // git ingnore
</span>|<span class="hljs-string">-- .postcssrc.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  // post css 配置文件
</span>|<span class="hljs-string">-- README.md                        // README
</span>|<span class="hljs-string">-- index.html &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 入口html文件
`-- package.json                     // 项目及工具的依赖配置文件
</span></code></pre>
<h2 id="articleHeader5">Build Setup</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# download
git clone https://github.com/Panda-Hope/vue-qqmusic

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># download</span>
git <span class="hljs-built_in">clone</span> https://github.com/Panda-Hope/vue-qqmusic

<span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report

<span class="hljs-comment"># run unit tests</span>
npm run unit

<span class="hljs-comment"># run e2e tests</span>
npm run e2e

<span class="hljs-comment"># run all tests</span>
npm <span class="hljs-built_in">test</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶+Mint-Ui打造高仿QQMusic，搭配详细说明

## 原文链接
[https://segmentfault.com/a/1190000009583786](https://segmentfault.com/a/1190000009583786)

