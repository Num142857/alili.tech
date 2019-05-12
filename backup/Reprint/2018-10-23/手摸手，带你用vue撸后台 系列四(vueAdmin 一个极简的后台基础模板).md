---
title: 手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)
hidden: true
categories: [reprint]
slug: 1470dde1
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<p>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a>  </p>
<p>系列文章：</p>
<ul>
<li><a href="https://juejin.im/post/59097cd7a22b9d0065fb61d2" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列一（基础篇）</a></li>
<li><a href="https://juejin.im/post/591aa14f570c35006961acac" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列二(登录权限篇)</a></li>
<li><a href="https://juejin.im/post/593121aa0ce4630057f70d35" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列三 (实战篇)</a></li>
<li><a href="https://juejin.im/post/595b4d776fb9a06bbe7dba56" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a></li>
<li><a href="https://segmentfault.com/a/1190000009090836">手摸手，带你封装一个vue component</a></li>
<li><a href="https://juejin.im/post/59bb864b5188257e7a427c09" rel="nofollow noreferrer" target="_blank">手摸手，带你优雅的使用 icon</a></li>
<li><a href="https://juejin.im/post/5b56909a518825195f499806" rel="nofollow noreferrer" target="_blank">手摸手，带你用合理的姿势使用webpack4（上）</a></li>
<li><a href="https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc" rel="nofollow noreferrer" target="_blank">手摸手，带你用合理的姿势使用webpack4（下）</a></li>
</ul>
<h2 id="articleHeader0">前言</h2>
<p>做这个 <strong>vueAdmin-template</strong> 的主要原因是:  <a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a> 这个项目的初衷是一个 vue 的管理后台集成方案，把平时用到的一些组件或者经验分享给大家，同时它也在不断的维护和拓展中，比如最近重构了dashboard，加入了全屏功能，新增了 tabs-view 等等。所以项目会越来越复杂，不太适合很多初用 vue 的同学来构建后台。所以就写了这个基础模板，它没有复杂的功能，只包含了一个后台需要最基础的东西。<br><strong>vueAdmin-template</strong> 主要是基于vue-cli webpack模板为基础开发的，引入了如下dependencies:</p>
<ul>
<li>element-ui 饿了么出品的vue2.0 pc UI框架</li>
<li>axios 一个现在主流并且很好用的请求库 支持Promise</li>
<li>js-cookie 一个轻量的JavaScript库来处理cookie</li>
<li>normalize.css 格式化css</li>
<li>nprogress 轻量的全局进度条控制</li>
<li>vuex 官方状态管理</li>
<li>vue-router 官方路由</li>
</ul>
<p>该项目只做了一个管理后台需要极简的功能，封装了axios请求，支持无限层级路由，动态权限和动态侧边栏。<br>如果需要更多复杂的功能可以参考 <a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a>，若还有不足，欢迎提issue或者pr。下文会简单说一下用该模板需要注意的地方。</p>
<hr>
<h2 id="articleHeader1">路由懒加载</h2>
<p>路由懒加载应该是写大一点的项目都会用的一个功能，只有在使用这个component的时候才会加载这个相应的组件，这样写大大减少了初始页面 js 的大小并且能更好的利用游览器的缓存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = resolve => require(['./Foo.vue'], resolve)
//或者
const Foo = () => import('./Foo');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Foo = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./Foo.vue'</span>], resolve)
<span class="hljs-comment">//或者</span>
<span class="hljs-keyword">const</span> Foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./Foo'</span>);</code></pre>
<p>在懒加载页面不多的情况下一切是那么的美好，但我司后台业务在不断地迭代，现在项目近百个路由，这时候使用路由懒加载在开发模式下就是一件痛苦的事情了，随手改一行代码热更新都是要6000ms+的，这怎么能忍。楼主整整花了一天多的时间找原因，能webpack优化的方法都用了,什么 <code>dll</code>, <code>HappyPack</code>  等方法都是过了，但提升的效果都不是很明显，正好那段时间出了 <code>webpack3</code> 楼主也升级了，编译速度也得到了很大幅度的提升，不过也要2000ms+。后来经过大神 <a href="https://github.com/jzlxiaohei" rel="nofollow noreferrer" target="_blank">@jzlxiaohei</a> 的指点发现原来是路由懒加载搞得鬼，楼主猜测可能是异步加载导致 webpack 每次的 cache 失效了，所以每次的rebuild 才会这么的慢。找到了原因我们就可以对症下药了，我们就自己封装了一个<code>_import()</code>的方法，只有在正式环境下才使用懒加载。这样解决了困扰多事的rebuild慢问题。<a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/router/index.js#L3" rel="nofollow noreferrer" target="_blank">代码</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _import = require('./_import_' + process.env.NODE_ENV);
const Foo = _import('Foo');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _import = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./_import_'</span> + process.env.NODE_ENV);
<span class="hljs-keyword">const</span> Foo = _import(<span class="hljs-string">'Foo'</span>);</code></pre>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016249418?w=584&amp;h=220" src="https://static.alili.tech/img/remote/1460000016249418?w=584&amp;h=220" alt="" title="" style="cursor: pointer; display: inline;"></span><br>整整比原来6000ms快了十多倍，我终于又能愉快的开发了。</p>
<hr>
<h2 id="articleHeader2">权限 控制</h2>
<p>在<a href="https://segmentfault.com/a/1190000009506097">手摸手，带你用vue撸后台 系列二(登录权限篇)</a>这章中其实已经详细介绍过了。该项目中权限的实现方式是：通过获取当前用户的权限去比对路由表，生成当前用户具的权限可访问的路由表，通过<code>router.addRoutes</code>动态挂载到router上。<br>但其实很多公司的业务逻辑可能不是这样的，举一个例子来说，很多公司的需求是每个页面的权限是动态配置的，不像本项目中是写死预设的。但其实原理是相同的。如这个例子，你可以在后台通过一个tree控件或者其它展现形式给每一个页面动态配置权限，之后将这份路由表存储到后端。当用户登录后根据role，后端返回一个相应的路由表或者前端去请求之前存储的路由表动态生成可访问页面，之后就是<code>router.addRoutes</code>动态挂载到router上，你会发现原来是相同的，万变不离其宗。</p>
<hr>
<h2 id="articleHeader3">导航</h2>
<p><strong>侧边栏</strong>:本项目里的侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要再手动写侧边栏这种麻烦事，同是使用了递归组件，这样不管你路由多少级嵌套，都能愉快的显示了。权限验证那里也做了递归的处理。<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016249419?w=173&amp;h=373" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>面包屑</strong>:本项目中也封装了一个面包屑导航，它也是通过<code>watch  $route</code>动态生成的。<a href="https://github.com/PanJiaChen/vue-admin-template/blob/master/src/components/Breadcrumb/index.vue" rel="nofollow noreferrer" target="_blank">代码</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016249420" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>由于侧边栏导航和面包屑亦或是权限，你会发现其实都是和router密切相关的，所以基于vue-router路由信息对象上做了一下小小的拓展，自定义了一些属性</p>
<blockquote><ul><li>icon : the icon show in the sidebar</li></ul></blockquote>
<ul>
<li>hidden : if <code>hidden:true</code> will not show in the sidebar</li>
<li>redirect : if <code>redirect:noredirect</code> will not redirct in the levelbar</li>
<li>noDropdown : if <code>noDropdown:true</code> will not has submenu in the sidebar</li>
<li>meta : <code>{ role: ['admin'] }</code>  will control the page role</li>
</ul>
<p>大家也可以结合自己的业务需求增改这些自定义属性。</p>
<p>----------</p>
<h2 id="articleHeader4">iconfont</h2>
<p>element-ui自带的图标不是很丰富，但管理后台图标的定制性又很强。这里只给大家推荐使用阿里的 <a href="http://iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a> ，简单好用又方便管理。本项目中已经嵌入了一些 iconfont 作为例子，大家可以自行替换。<br>这里来简单介绍一下 iconfont 的使用方式。首先注册好 iconfont 账号之后，可以在我的项目中管理自己的 iconfont 。我司所有的项目都是用这个管理的，真心推荐使用。<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016249421" src="https://static.alili.tech/img/remote/1460000016249421" alt="" title="" style="cursor: pointer; display: inline;"></span><br>创建好图标库后如果有更新替换也很方便，这里我使用了 Symbol 的方式引入，这里还有<code>unicode</code>，<code>font-class</code>的引入方式，有兴趣的可以<a href="http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.13.HpQ1yI&amp;helptype=code" rel="nofollow noreferrer" target="_blank">自行研究</a>。<br>之后我们点击下载 Symbol，会发现有如下这些文件，我们只要关心<code>iconfont.js</code>就可以了</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016249422" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>我们将它替换项目中的 <a href="https://github.com/PanJiaChen/vue-admin-template/blob/master/src/assets/iconfont/iconfont.js" rel="nofollow noreferrer" target="_blank">iconfont.js</a> 就可以了。本项目中也封装了一个<a href="https://github.com/PanJiaChen/vue-admin-template/blob/master/src/components/SvgIcon/index.vue" rel="nofollow noreferrer" target="_blank">svg component</a> 方便大家使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <icon-svg icon-class=&quot;填入你需要的iconfont名字就能使用了&quot;></icon-svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">icon-svg</span> <span class="hljs-attr">icon-class</span>=<span class="hljs-string">"填入你需要的iconfont名字就能使用了"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon-svg</span>&gt;</span></code></pre>
<h2 id="articleHeader5">favicon</h2>
<p>每个项目都需要有一个属于自己的favicon。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016249423" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span><br>其实实现起来非常的方便，我们主需要借助<a href="https://github.com/jantimon/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack config
function resolveApp(relativePath) {
    return path.resolve(relativePath);
}
new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: resolveApp('favicon.ico')
    })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//webpack config</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolveApp</span>(<span class="hljs-params">relativePath</span>) </span>{
    <span class="hljs-keyword">return</span> path.resolve(relativePath);
}
<span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: config.build.index,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">favicon</span>: resolveApp(<span class="hljs-string">'favicon.ico'</span>)
    }),</code></pre>
<p>你只要将本项目跟目录下的favicon.ico文件替换为你想要的图标即可。</p>
<hr>
<h2 id="articleHeader6">eslint</h2>
<p><code>vue cli</code> 默认提供了<code>standard</code>和<code>airbnb</code> 两种 lint 规范，说真的一个j检查校验的太松一个又太紧，而且每个团队的 lint 规范又是不同的，所以楼主干脆在项目里把大部分常用的 lint 规范都列举了出来并写上了注释方便大家修改<a href="https://github.com/PanJiaChen/vue-admin-template/blob/master/.eslintrc.js" rel="nofollow noreferrer" target="_blank">代码地址</a>，大家也可以把自己的规范上传到npm，像 vue 一样 <a href="https://github.com/vuejs/eslint-config-vue" rel="nofollow noreferrer" target="_blank">vue-eslint-config</a>。配置 eslint 对多人协作的项目有很大的好处,同时配置好lint 在加 ide 的 lint 插件写代码简直要起飞。相关配置可见<a href="https://segmentfault.com/a/1190000009275424#articleHeader8">第一篇教程</a>。</p>
<h2 id="articleHeader7">postcss</h2>
<p>相信大部分 vue 的项目都是基于 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> 来开发的，不过毕竟每个人需求都是不太一样的，需要自定义一些的东西。就比如拿 postcss 来说 vue-cli 有一个小坑，它默认 autoprefixer 只会对通过 vue-loader 引入的样式有作用，换而言之也就是 .vue 文件里面的 css autoprefixer 才会效果。相关问题<a href="https://github.com/vuejs-templates/webpack/issues/544" rel="nofollow noreferrer" target="_blank">issues/544</a>,<a href="https://github.com/vuejs-templates/webpack/issues/600" rel="nofollow noreferrer" target="_blank">issues/600</a>。解决方案也很简单粗暴</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.vue
<style lang=&quot;scss&quot;>
  @import './styles/index.scss'; // 全局自定义的css样式
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//app.vue
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
  @import './styles/index.scss'; // 全局自定义的css样式
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>你在 .vue 文件中引入你要的样式就可以了，或者你可以改变 vue-cli的文件在 css-loader 前面在加一个 postcss-loader，在前面的issue地址中已经给出了解决方案。<br>这里再来说一下 postcss 的配置问题，新版的<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vue-cli webpack 模板</a> inti 之后跟目录下默认有一个<code>.postcssrc.js</code> 。vue-loader 的 postcss 会默认读取这个文件的里的配置项，所以在这里直接改配置文件就可以了。配置和<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">postcss</a>是一样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//.postcssrc.js
module.exports = {
  &quot;plugins&quot;: {
    // to edit target browsers: use &quot;browserlist&quot; field in package.json
    &quot;autoprefixer&quot;: {}
  }
}
//package.json
&quot;browserslist&quot;: [
    &quot;> 1%&quot;,
    &quot;last 2 versions&quot;,
    &quot;not ie <= 8&quot;
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//.postcssrc.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-string">"plugins"</span>: {
    <span class="hljs-comment">// to edit target browsers: use "browserlist" field in package.json</span>
    <span class="hljs-string">"autoprefixer"</span>: {}
  }
}
<span class="hljs-comment">//package.json</span>
<span class="hljs-string">"browserslist"</span>: [
    <span class="hljs-string">"&gt; 1%"</span>,
    <span class="hljs-string">"last 2 versions"</span>,
    <span class="hljs-string">"not ie &lt;= 8"</span>
  ]</code></pre>
<p>如上代码所述，autoprefixe r回去读取 package.json 下 browserslist的配置文件</p>
<ul>
<li>
<code>&gt; 1% </code> 兼容全球使用率大于1%的游览器</li>
<li>
<code>last 2 versions</code> 兼容每个游览器的最近两个版本</li>
<li>
<code>not ie &lt;= 8</code> 不兼容ie8及以下</li>
</ul>
<p>具体可见 <a href="https://github.com/ai/browserslist" rel="nofollow noreferrer" target="_blank">browserslist</a>, postcss也还有很多很多其它的功能大家可以<a href="https://www.postcss.parts/" rel="nofollow noreferrer" target="_blank">自行去把玩</a></p>
<hr>
<h2 id="articleHeader8">babel-polyfill</h2>
<p>本项目暂时没有兼容性需求，如有兼容性需求可自行使用babel-polyfill。<br>在Node/Browserify/webpack中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save babel-polyfill //下载依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code class="shell" style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-keyword">save</span> babel-polyfill <span class="hljs-comment">//下载依赖</span></code></pre>
<p>在入口文件中引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill';
// 或者
require('babel-polyfill');//es6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>;
<span class="hljs-comment">// 或者</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'babel-polyfill'</span>);<span class="hljs-comment">//es6</span></code></pre>
<p>在webpack.config.js中加入babel-polyfill到你的入口数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry:[&quot;babel-polyfill&quot;,&quot;./app/js&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:[<span class="hljs-string">"babel-polyfill"</span>,<span class="hljs-string">"./app/js"</span>]
}</code></pre>
<p>具体可参考 <a href="https://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">link</a></p>
<p>或者更简单暴力 <a href="https://cdn.polyfill.io/v2/docs/" rel="nofollow noreferrer" target="_blank">polyfill.io</a> 使用它给的一个 cdn 地址，引入这段js之后它会自动判断游览器，加载缺少的那部分 polyfill，但国内速度肯能不行，大家可以自己搭 cdn。</p>
<hr>
<h2 id="articleHeader9">跨域问题</h2>
<p>楼主 vue 群里的小伙伴们问的最多的问题还是关于跨域的，其实跨域问题真的不是一个很难解决的问题。这里我来简单总结一下我推荐的几种跨域解决方案。</p>
<ul>
<li>我最推荐的也是我司常用的方式就是<strong><code>cors</code></strong>全称为 Cross Origin Resource Sharing（跨域资源共享）。这玩意对应前端来说和平时发请求写法上没有任何区别，工作量基本都在后端这里。每一次请求浏览器必须先以 OPTIONS 请求方式发送一个预请求，从而获知服务器端对跨源请求所支持 HTTP 方法。在确认服务器允许该跨源请求的情况下，以实际的 HTTP 请求方法发送那个真正的请求。推荐的原因是只要第一次配好了，之后不管有多少接口和项目复用就可以了，一劳永逸的解决了跨域问题，而且不管是开发环境还是测试环境都能方便的使用。</li>
<li>但总有后端觉得麻烦不想这么搞。那前端也是有解决方案的，在<br>dev 开发模式下可以下使用<strong><code>webpack 的 proxy</code></strong>使用也是很方便的看一下文档就会使用了，楼主一些个人项目使用的该方法。但这种方法在生成环境是不适用的。在生产环境中需要使 用<strong>Nginx反向代理</strong> 不管是 proxy 和 nginx 的原理都是一样的通过搭建一个中转服务器来转发请求规避跨域的问题。</li>
</ul>
<table>
<thead><tr>
<th align="center">开发环境</th>
<th>生成环境</th>
</tr></thead>
<tbody>
<tr>
<td align="center">cors</td>
<td>cors</td>
</tr>
<tr>
<td align="center">proxy</td>
<td>nginx</td>
</tr>
</tbody>
</table>
<p>这里我只推荐这两种方式跨域，其它的跨域方式都很多，但真心主流的也就这两种方式。</p>
<hr>
<h2 id="articleHeader10">easy-mock</h2>
<p><a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a> 由于是一个纯前端个人项目,所以所以的数据都是用<a href="https://github.com/nuysoft/Mock" rel="nofollow noreferrer" target="_blank">mockjs</a>生成的,它的原理是:拦截了所有的请求并代理到本地模拟数据，所以 network 中没有任何的请求发出。不过这并不符合实际业务开发中的场景，所以这个项目中使用了前不久刚出的 <a href="https://easy-mock.com/" rel="nofollow noreferrer" target="_blank">easy-mock</a>，支持跨域，mockjs 的语法，支持Swagger  这几点还是挺不错的。<a href="https://juejin.im/post/58ff1fae61ff4b0066792f6e" rel="nofollow noreferrer" target="_blank">相关文章</a></p>
<h2 id="articleHeader11">baseurl</h2>
<p>线上或者测试环境接口的 base_url 不一样是很长见得需求，或者你在本地用了如 easy-mock 这种模拟数据到线上环境你想用自己公司生产环境的数据，这些需求都可以简单的通过用 baseurl 来解决。首先我们在<code>config/</code>下有<code>dev.env.js</code>和<code>prod.env.js</code>这两个配置文件。用它来区分不同环境的配置参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//dev.env.js
module.exports = {
  NODE_ENV: '&quot;development&quot;',
  BASE_API: '&quot;https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin&quot;',
}
//prod.env.js
module.exports = {
  NODE_ENV: '&quot;production&quot;',
  BASE_API: '&quot;https://prod-xxx&quot;',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//dev.env.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"development"'</span>,
  <span class="hljs-attr">BASE_API</span>: <span class="hljs-string">'"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'</span>,
}
<span class="hljs-comment">//prod.env.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"production"'</span>,
  <span class="hljs-attr">BASE_API</span>: <span class="hljs-string">'"https://prod-xxx"'</span>,
}</code></pre>
<p>同时本项目封装了axios拦截器，方便大家使用，大家也可根据自己的业务自行修改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url 读取config配置文件
  timeout: 5000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject(error);
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> { Message } <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../store'</span>;

<span class="hljs-comment">// 创建axios实例</span>
<span class="hljs-keyword">const</span> service = axios.create({
  <span class="hljs-attr">baseURL</span>: process.env.BASE_API, <span class="hljs-comment">// api的base_url 读取config配置文件</span>
  timeout: <span class="hljs-number">5000</span>                  <span class="hljs-comment">// 请求超时时间</span>
});

<span class="hljs-comment">// request拦截器</span>
service.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (store.getters.token) {
    config.headers[<span class="hljs-string">'X-Token'</span>] = store.getters.token; <span class="hljs-comment">// 让每个请求携带自定义token 请根据实际情况自行修改</span>
  }
  <span class="hljs-keyword">return</span> config;
}, error =&gt; {
  <span class="hljs-comment">// Do something with request error</span>
  <span class="hljs-built_in">console</span>.log(error); <span class="hljs-comment">// for debug</span>
  <span class="hljs-built_in">Promise</span>.reject(error);
})

<span class="hljs-comment">// respone拦截器</span>
service.interceptors.response.use(
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
  <span class="hljs-comment">/**
  * code为非20000是抛错 可结合自己业务进行修改
  */</span>
    <span class="hljs-keyword">const</span> res = response.data;
    <span class="hljs-keyword">if</span> (res.code !== <span class="hljs-number">20000</span>) {
      Message({
        <span class="hljs-attr">message</span>: res.data,
        <span class="hljs-attr">type</span>: <span class="hljs-string">'error'</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">5</span> * <span class="hljs-number">1000</span>
      });

      <span class="hljs-comment">// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;</span>
      <span class="hljs-keyword">if</span> (res.code === <span class="hljs-number">50008</span> || res.code === <span class="hljs-number">50012</span> || res.code === <span class="hljs-number">50014</span>) {
        MessageBox.confirm(<span class="hljs-string">'你已被登出，可以取消继续留在该页面，或者重新登录'</span>, <span class="hljs-string">'确定登出'</span>, {
          <span class="hljs-attr">confirmButtonText</span>: <span class="hljs-string">'重新登录'</span>,
          <span class="hljs-attr">cancelButtonText</span>: <span class="hljs-string">'取消'</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">'warning'</span>
        }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          store.dispatch(<span class="hljs-string">'FedLogOut'</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            location.reload();<span class="hljs-comment">// 为了重新实例化vue-router对象 避免bug</span>
          });
        })
      }
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> response.data;
    }
  },
  error =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'err'</span> + error);<span class="hljs-comment">// for debug</span>
    Message({
      <span class="hljs-attr">message</span>: error.message,
      <span class="hljs-attr">type</span>: <span class="hljs-string">'error'</span>,
      <span class="hljs-attr">duration</span>: <span class="hljs-number">5</span> * <span class="hljs-number">1000</span>
    });
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  }
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> service;</code></pre>
<p>由于axios每一个都是一个实例，你的请求都是基于这个实例来的，所以所以配置的参数属性都继承了下来.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//api.xxx.js
import fetch from '@/utils/fetch';
export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
//你可以直接这样使用，之前拦截器写的东西都是生效的，
//它自动会有一个你之前配置的baseURL,
//但你说我这个请求baseURL和其它的不同,
//这也是很方便的，你可以字请求内部修改，
//它会自动覆盖你在创建实例时候写的参数如
export function getInfo(token) {
  return fetch({
    baseURL: https://api2-xxxx.com
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//api.xxx.js</span>
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">'@/utils/fetch'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getInfo</span>(<span class="hljs-params">token</span>) </span>{
  <span class="hljs-keyword">return</span> fetch({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'/user/info'</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
    <span class="hljs-attr">params</span>: { token }
  });
}
<span class="hljs-comment">//你可以直接这样使用，之前拦截器写的东西都是生效的，</span>
<span class="hljs-comment">//它自动会有一个你之前配置的baseURL,</span>
<span class="hljs-comment">//但你说我这个请求baseURL和其它的不同,</span>
<span class="hljs-comment">//这也是很方便的，你可以字请求内部修改，</span>
<span class="hljs-comment">//它会自动覆盖你在创建实例时候写的参数如</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getInfo</span>(<span class="hljs-params">token</span>) </span>{
  <span class="hljs-keyword">return</span> fetch({
    <span class="hljs-attr">baseURL</span>: https:<span class="hljs-comment">//api2-xxxx.com</span>
    url: <span class="hljs-string">'/user/info'</span>,
    <span class="hljs-attr">method</span>: <span class="hljs-string">'get'</span>,
    <span class="hljs-attr">params</span>: { token }
  });
}</code></pre>
<hr>
<h2 id="articleHeader12">总结</h2>
<p>这篇文章主要是介绍了 <strong>vueAdmin</strong> 做了哪些事情，希望大家如果有后台新项目要开发，建议基于 <a href="https://github.com/PanJiaChen/vue-admin-template" rel="nofollow noreferrer" target="_blank">vue-admin-template</a> 来开发，而 <a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a> 更多的是用来当做一个集成方案，你要什么功能就去里面找拿来用，因为两者的基础架构是一样的，所以复用成本也很低。</p>
<h2 id="articleHeader13">占坑</h2>
<p>常规占坑，这里是手摸手，带你用vue撸后台系列。   <br>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a>  <br>系类文章一：<a href="https://juejin.im/post/59097cd7a22b9d0065fb61d2" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列一（基础篇）</a>  <br>系类文章二：<a href="https://juejin.im/post/591aa14f570c35006961acac" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列二(登录权限篇)</a>  <br>系类文章三：<a href="https://juejin.im/post/593121aa0ce4630057f70d35" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue 撸后台 系列三 (实战篇)</a>  <br>系类文章四：<a href="https://juejin.im/post/595b4d776fb9a06bbe7dba56" rel="nofollow noreferrer" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a>  <br>系类文章：<a href="https://juejin.im/post/59bb864b5188257e7a427c09" rel="nofollow noreferrer" target="_blank">手摸手，带你优雅的使用 icon</a>  <br>系类文章：<a href="https://segmentfault.com/a/1190000009090836">手摸手，带你封装一个vue component</a>  <br>楼主个人免费<a href="https://jianshiapp.com/circles/1209" rel="nofollow noreferrer" target="_blank">圈子</a></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000010043013](https://segmentfault.com/a/1190000010043013)

## 原文标题
手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)
