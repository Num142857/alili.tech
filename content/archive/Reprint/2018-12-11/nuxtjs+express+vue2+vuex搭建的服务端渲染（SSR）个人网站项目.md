---
title: 'nuxtjs+express+vue2+vuex搭建的服务端渲染（SSR）个人网站项目' 
date: 2018-12-11 2:30:10
hidden: true
slug: yu2na2d7de
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">5se7en.com</h2>
<p>nuxtjs+express+vue2.0+vuex搭建的服务端渲染个人网站项目.<br><br>github项目地址: <a href="https://github.com/se7en-1992/5se7en.com" rel="nofollow noreferrer" target="_blank">https://github.com/se7en-1992...</a><br>项目线上地址：<a href="https://5se7en.com/" rel="nofollow noreferrer" target="_blank">https://5se7en.com/</a></p>
<h2 id="articleHeader1">注意事项</h2>
<ul>
<li>node&gt;=v8.0.0+ (nuxt1.0.0以上版本的node版本号必须大于v8.0.0否则启动的时候会报错)<br>
</li>
<li>若要测试游戏登录请点击前往<a href="https://www.hybjf.com/game/20170925Activity" rel="nofollow noreferrer" target="_blank">套马游戏</a>注册一个账号</li>
</ul>
<h2 id="articleHeader2">技术选型</h2>
<p>这里先说两句题外话，谈一谈对前端开发产生了深远影响的两个时间点<br></p>
<ul>
<li>ajax的出现，促成了Web 2.0时代的来临</li>
<li>nodejs的出现，让前端能做的更多，让js不仅仅只是浏览器端的语言。</li>
</ul>
<p>这里为什么要说这个呢，有些前端开发者会说node不是做后端的吗？我为什么要学nodejs呢？其实随着前端的发展，尤其是node出现，前端发展日新月异，各种自动化工具，框架层出不穷。很多都是依赖node。node不仅仅只是用来拿来写后端，可以这么说，当前时间如果你对node毫无知晓，也不去学的话，那么你已经被前端浪潮所覆盖了。</p>
<ul>
<li>本项目用的是node中使用最多的express前端web框架，官网的demo是这么形容的=&gt; <a href="http://expressjs.com/" rel="nofollow noreferrer" target="_blank">ExpressJS</a> + <a href="https://nuxtjs.org" rel="nofollow noreferrer" target="_blank">Nuxt.js</a> = ⚡️  没错可以说是非常极速了，我的个人网站服务器是阿里云1核1g学生版机，网站除了第一次打开稍微慢点，后面可以说得上是光速了。比我以前使用的任何框架都要极速。</li>
<li>
<p>下面再谈一下为什么要使用服务端渲染和选用nuxtjs？</p>
<ul>
<li>
<p>知乎上有个论题大家可以看一看<a href="https://www.zhihu.com/question/59578433/answer/326694511" rel="nofollow noreferrer" target="_blank">为什么现在又流行服务端渲染html？</a>，回答的人比较多，也比较杂，我这里就简单的总结一下</p>
<ul>
<li>服务端渲染，主要解决两个痛点 SEO优化(一些新闻资讯类的网站都需要做一些搜索引擎优化)和大型应用的首屏渲染(解决一些大型应用首页加载速度问题)</li>
<li>其实这又要谈到历史了，一开始html就是后端渲染的，前端实际上就是在切图（CSS）和做特效(JS)，所以所有程序员中前端工资最低，职位也最低。所以前后端的鄙视链就出现了。</li>
<li>nodejs 和前端 mvc 的兴起让前端变得复杂起来，前端发现翻身的机会，于是全力支持这两种技术，造成本不该做成 spa 的网站也成了 spa。慢慢地前后端分离运动从大公司开始兴起，目的就是前端脱离后端的指指点点，独立发展。（表面上是为了「代码分离」，实际上是为了「人员分离」，也就是「前后端分家」，前端不再附属于后端团队）</li>
<li>spa 之后发现 seo 问题很大，而且首屏渲染速度贼慢，但是自己选的路再难走也要走下去，于是用 nodejs 在服务端渲染这一条路被看成是一条出路</li>
<li>简而言之就是前端一开始骚不起来，后来node和MVC/MVVM（Vue,React,Angular）的出现前端开始骚起来了，搞独立，把本应要做成服务端渲染的东西也做成了SPA，现在新技术又出来了，要及时发现错误，进行改正。前后端分离是趋势，既然都分开了，总不能还让后端去渲染，那咱们前端自己想办法做服务端渲染吧，于是服务端渲染框架也就出现了。</li>
</ul>
</li>
<li>
<p>为什么选用nuxtjs?</p>
<ul>
<li>一开始我用的服务端渲染是学习<a href="https://github.com/nswbmw/N-blog" rel="nofollow noreferrer" target="_blank">N-blog</a>利用nodejs的express+ejs模版渲染做的，效果其实也还不错，里面的代码并没有完全的组件化，我做的项目还使用的jQuery,这多low啊，那我怎么能忍，我肯定要换个技术来玩。（这里没有贬低jQuery的意思，我觉得jQuery是个很不错的JavaScript库，曾经也可以说是一统前端了，包括现在，不会用jQuery的前端基本上没几个，但是怎么说呢，jQuery在慢慢沉寂，操作dom在现在对比下来并不是一个最优的选择了。）前端在不断发展，我们要做的就是选择最优。</li>
<li>在vue官网中也对nuxtjs做了强力的推荐，再加上nuxtjs的github上express模版demo介绍<a href="http://expressjs.com/" rel="nofollow noreferrer" target="_blank">ExpressJS</a> + <a href="https://nuxtjs.org" rel="nofollow noreferrer" target="_blank">Nuxt.js</a> =⚡看到这个我就选了这个框架了。没错就是他了.</li>
<li>nuxtjs结合vue2、Webpack、vue-loader、babel-loader、vuex、Vue-Meta</li>
<li>不需要在配置繁琐的webpack配置,vue-loader自动生成路由，只需要在pages目录下创建文件就是自动生成对应的路由文件</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="articleHeader3">开发环境</h2>
<ul>
<li>Node.js: <code>^8.9.4</code>
</li>
<li>express: <code>^4.16.2</code>
</li>
<li>nuxtjs: <code>^1.0.0-rc11</code>
</li>
<li>vue: <code>^2.5.3</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install
npm run dev</code></pre>
<p>使用浏览器打开 <code>http://localhost:5757</code></p>
<h2 id="articleHeader4">友情提示</h2>
<ul>
<li>
<a href="https://github.com/nswbmw/N-blog" rel="nofollow noreferrer" target="_blank">N-blog</a>(一个不错的Nodejs + Express + MongoDB入门项目)</li>
<li><a href="https://vuejs.org/" rel="nofollow noreferrer" target="_blank">vue2.0官网文档</a></li>
<li><a href="https://nuxtjs.org/" rel="nofollow noreferrer" target="_blank">nuxtjs官方文档</a></li>
<li>
<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">vue2-elm</a>(一个不错的vue2.0个人项目)</li>
<li><a href="https://github.com/nuxt/nuxtjs.org" rel="nofollow noreferrer" target="_blank">nuxtjs.org</a></li>
</ul>
<h2 id="articleHeader5">nuxt介绍</h2>
<ul><li>nuxt详细的入门教程这里不做详细的介绍，<a href="https://nuxtjs.org/" rel="nofollow noreferrer" target="_blank">官方文档</a>讲解的已经非常详细了。这里简单介绍一下项目目录作用</li></ul>
<h3 id="articleHeader6">nuxt目录介绍</h3>
<ul>
<li>
<p>assets</p>
<ul>
<li>如果你的静态资源文件需要 Webpack 做构建编译处理，可以放到 assets 目录，否则可以放到 static 目录中去。</li>
<li>Nuxt 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下，像 robots.txt 或 sitemap.xml 这种类型的文件就很适合放到 static 目录中。</li>
</ul>
</li>
<li>
<p>components</p>
<ul><li>组件目录 components 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 <a href="https://nuxtjs.org/api/" rel="nofollow noreferrer" target="_blank">asyncData</a> 方法的特性。</li></ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="简而言之此目录就是普通的vue组件目录。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>简而言之此目录就是普通的vue组件目录。
</code></pre>
<ul>
<li>
<p>layouts</p>
<ul>
<li>该目录名为Nuxt.js保留的，不可更改。</li>
<li>你可以自定义合适自己网站的默认样式和错误样式</li>
</ul>
</li>
<li>
<p>middleware</p>
<ul><li>
<p>中间件执行流程顺序：</p>
<ul>
<li>nuxt.config.js</li>
<li>匹配布局</li>
<li>匹配页面</li>
</ul>
</li></ul>
</li>
<li>
<p>pages</p>
<ul>
<li>该目录名为Nuxt.js保留的，不可更改。</li>
<li>页面目录 pages 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。</li>
<li>此页面的.vue文件都具有<a href="https://nuxtjs.org/api/" rel="nofollow noreferrer" target="_blank">asyncData</a>、<a href="https://nuxtjs.org/api/pages-fetch" rel="nofollow noreferrer" target="_blank">fech</a>方法。</li>
</ul>
</li>
<li>
<p>plugins</p>
<ul>
<li>插件目录 plugins 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。</li>
<li>我们可以将element-ui或者mint-ui以及其他更多的插件都可以放在plugins中使用</li>
</ul>
</li>
<li>
<p>static</p>
<ul>
<li>该目录名为Nuxt.js保留的，不可更改。</li>
<li>静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。</li>
</ul>
</li>
<li>
<p>store</p>
<ul>
<li>该目录名为Nuxt.js保留的，不可更改。</li>
<li>store 目录用于组织应用的 Vuex 状态树 文件。 Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置。</li>
</ul>
</li>
</ul>
<h3 id="articleHeader7">nuxt配置介绍</h3>
<ul>
<li>
<p>config</p>
<ul>
<li>此目录并不是nuxt自身目录而是一些项目经验促使我添加此目录从来更加方便的去管理和使用在项目中所需要的变量。</li>
<li>NEWRELIC_KEY:<a href="https://newrelic.com/" rel="nofollow noreferrer" target="_blank">newrelic</a>的密钥，newrelic是服务器端性能监控的一款软件</li>
<li>TIMBER_KEY:<a href="https://timber.io/" rel="nofollow noreferrer" target="_blank">timber</a>的密钥，timber是一种云日志记录系统，简单的来说就是纪录线上的一些日志</li>
<li>SENTRY_PROJECT_ID/SENTRY_PUBLIC_KEY/SENTRY_PRIVATE_KEY:<a href="https://sentry.io" rel="nofollow noreferrer" target="_blank">Sentry</a>的项目id,公钥,私钥，Sentry是一个开源的实时错误报告工具</li>
<li>porductionProxy/developmentProxy: 是nuxt的axios模块代理请求的路径设置</li>
<li>其实我在项目启动的时候还使用了<a href="http://pm2.keymetrics.io/" rel="nofollow noreferrer" target="_blank">pm2</a>有express项目经验的人用过都说好，有日志记录状态监控等，真的很好用。</li>
</ul>
</li>
<li><a href="https://nuxtjs.org/guide/configuration" rel="nofollow noreferrer" target="_blank">nuxt.config.js</a></li>
<li>
<p><a href="http://editorconfig.org/" rel="nofollow noreferrer" target="_blank">.editorconfig</a></p>
<ul><li>EditorConfig是一套用于统一代码格式的解决方案</li></ul>
</li>
<li>
<p><a href="https://eslint.org/" rel="nofollow noreferrer" target="_blank">.eslintrc.js</a></p>
<ul><li>ESLint是一个应用广泛的 JavaScript 代码检查工具</li></ul>
</li>
<li>
<p><a href="https://git-scm.com/docs/gitignore" rel="nofollow noreferrer" target="_blank">gitignore</a></p>
<ul><li>git提交忽略项配置文件</li></ul>
</li>
<li>
<p><a href="https://newrelic.com/" rel="nofollow noreferrer" target="_blank">newrelic.js</a></p>
<ul><li>newrelic配置文件</li></ul>
</li>
<li>
<p>start.js</p>
<ul><li>express启动入口文件，开发环境直接使用nuxt启动并没有走start.js，生产环境用<a href="http://pm2.keymetrics.io/" rel="nofollow noreferrer" target="_blank">pm2</a>启动的该文件</li></ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nuxtjs+express+vue2+vuex搭建的服务端渲染（SSR）个人网站项目

## 原文链接
[https://segmentfault.com/a/1190000013604144](https://segmentfault.com/a/1190000013604144)

