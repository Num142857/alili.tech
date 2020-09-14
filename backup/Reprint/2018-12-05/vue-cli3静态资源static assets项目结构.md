---
title: 'vue-cli3静态资源static assets项目结构' 
date: 2018-12-05 2:30:09
hidden: true
slug: tqh9sfa471i
categories: [reprint]
---

{{< raw >}}

                    
<p>今天又是纠结的一天...<br>本文又名:vue/cli3中不得不知的webpack配置..<br>如大家所见，我在<a href="https://segmentfault.com/a/1190000014219426">前文</a>也写过</p>
<blockquote>vue-cli3.0默认项目目录与<a href="https://zhuanlan.zhihu.com/p/26038486" rel="nofollow noreferrer">2.0的</a>相比，更精简:<br>1.移除的配置文件根目录下的，<code>build</code>和<code>config</code>等目录，<br>2.移除了<code>static</code>文件夹，新增了<code>public</code>文件夹，并且<code>index.html</code>移动到<code>public</code>中。<br>3.在<code>src</code>文件夹中新增了<code>views</code>文件夹，用于分类 试图组件 和 公共组件 。<br>4.大部分配置 都集成到 vue.config.js这里,在项目根目录下</blockquote>
<p>那我们到底怎么搞这个静态资源呢??</p>
<p>这里插个话：<br>我发现webpack官方文档是有导航栏的<br><span class="img-wrap"><img data-src="/img/bV8Pa7?w=2132&amp;h=1149" src="https://static.alili.tech/img/bV8Pa7?w=2132&amp;h=1149" alt="图片描述" title="图片描述"></span><br>粗心的一直没看到...<br>还在想为什么网址一样内容不一样<br><span class="img-wrap"><img data-src="/img/bV8OZ5?w=1050&amp;h=104" src="https://static.alili.tech/img/bV8OZ5?w=1050&amp;h=104" alt="clipboard.png" title="clipboard.png"></span><br>真的只有我一个人现在才发现有这个导航栏么??????<br>告诉我我不是一个人好不好???</p>
<p>回归正题:<br>我现在发现原来很多我的疑问都可以用这个文档解决...<br>大家在版本更新后不懂就多看看这个吧！！！<br>不知道有没有中文翻译的...没错所有的只要看这个就够了</p>
<h1><a href="https://github.com/vuejs/vue-cli/tree/dev/docs" rel="nofollow noreferrer">Vue/cli3官方文档</a></h1>
<p>今天学习了一下静态资源相关的</p>
<p>总结就是看这篇就够了（是上篇的分支哦微笑）</p>
<h2><a href="https://github.com/vuejs/vue-cli/blob/dev/docs/assets.md" rel="nofollow noreferrer">Static Assets Handling官方文档Vue/cli3</a></h2>
<p>这样写感觉很废话..但是其实说多了你看，可以写下面链接这么多文章，<br>虽然版本不同，但是有些思路类似...要不要翻译看我心情了...<br>翻译一下：</p>
<h3>1.相对路径引入</h3>
<p>使用相对路径引入的静态资源文件，会被webpack处理解析为<strong>模块依赖</strong>。例如，在 &lt;img src="./logo.png"&gt;和 background: url(./logo.png)，以及CSS@import,"./logo.png" 是相对的资源路径。在vue2.x版本类似assets文件夹。</p>
<p>举例 <code>url(./image.png)</code> 会被转换成 <code>require('./image.png')</code><br>而<code>&lt;img src="../image.png"&gt;</code><br>会被编译成<br><code>createElement('img', { attrs: { src: require('../image.png') "}}")</code></p>
<h4>URL转换规则</h4>
<p>URL是绝对路径，如<code>/images/foo.png</code>,会被保留不变。<br>URL以<code>.</code>开始，会被认为是相对模块请求，根据文档结构（folder structure）转换。<br>URL以<code>~</code>开始，会被认为是模块请求,意味着可以在node modules里引用资源：<br><code>&lt;img src="~/some-npm-package/foo.png"&gt;</code><br>URL以<code>@</code>开始，会被认为是模块请求，这很有用因为，Vue CLI对默认别名@是<code>&lt;projectRoot&gt;/src</code></p>
<h3>2.<code>public</code>文件夹</h3>
<p><code>public</code>文件夹下的文件并不会被Webpack处理：它们会直接被复制到最终的打包目录（文件名需指定）下。必须使用绝对路径引用这些文件，简单说就是用来存放<strong>万年不变</strong>的文件。<br>在vue2.x版本类似static/ 文件夹。</p>
<p>有一些细节，懒得翻译 还是看官方文档吧</p>
<p>俗话说的好，叫你看官方文档！叫你看官方文档！叫你看官方文档！<br>可是官方文档也很难读阿。比如我很急阿，都不知道我要看的东西在哪阿。</p>
<p>有点懒得翻译 相关可以参考如下链接<br><a href="https://zhuanlan.zhihu.com/p/25829687" rel="nofollow noreferrer">vue2.x版本相关参考文章</a><br><a href="https://zhuanlan.zhihu.com/p/26038486" rel="nofollow noreferrer">vue2.x版本相关参考文章2</a><br><a href="https://juejin.im/post/59be4d325188257e764c8485" rel="nofollow noreferrer">vue2.x版本相关参考文章3</a><br><a href="https://www.jianshu.com/p/f82c5ecbd3a5" rel="nofollow noreferrer">vue2.x版本相关参考文章4</a></p>
<h2>项目结构</h2>
<p><span class="img-wrap"><img data-src="/img/bV71VV?w=1435&amp;h=650" src="https://static.alili.tech/img/bV71VV?w=1435&amp;h=650" alt="图片描述" title="图片描述"></span><br>main.js 是我们的入口文件，主要作用是初始化vue实例并使用需要的插件。</p>
<p>App.vue是我们的主组件，所有页面都是在App.vue下进行切换的。其实你也可以理解为所有的路由也是App.vue的子组件。所以我将router标示为App.vue的子组件。<br><span class="img-wrap"><img data-src="/img/bV8S6E?w=800&amp;h=345" src="https://static.alili.tech/img/bV8S6E?w=800&amp;h=345" alt="图片描述" title="图片描述"></span></p>
<p>我纠结了很久为什么<strong>App.vue没有import hello from './components/HelloWorld'</strong><br>原来是在home.vue import了<br><span class="img-wrap"><img data-src="/img/bV8S6N?w=800&amp;h=642" src="https://static.alili.tech/img/bV8S6N?w=800&amp;h=642" alt="图片描述" title="图片描述"></span></p>
<p>对了<code>Vue.use(Router)</code>也是写在<code>router.js</code>里的</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli3静态资源static assets项目结构

## 原文链接
[https://segmentfault.com/a/1190000014456796](https://segmentfault.com/a/1190000014456796)

