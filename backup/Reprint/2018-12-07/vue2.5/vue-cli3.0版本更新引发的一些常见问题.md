---
title: 'vue2.5/vue-cli3.0版本更新引发的一些常见问题' 
date: 2018-12-07 2:30:09
hidden: true
slug: ucbixft0pn
categories: [reprint]
---

{{< raw >}}

                    
<p>网上很多教程文章都是基于vue2.0搭建的，vue-cli也是低版本的<br>在跟着教程练习时，就会产生很多疑惑：<br>困扰我很久，问了很多人，<em>竟然</em>没人说对，<br>虽然隐约觉得应该是版本的问题，还是不知如何下手，查阅了许多资料..</p>
<h3 id="articleHeader0"><a href="https://github.com/vuejs/vue-cli/tree/dev/docs" rel="nofollow noreferrer" target="_blank">如果有人告诉我vue/cli只看这个就够了，在查资料查到吐血后，我信了！</a></h3>
<h2 id="articleHeader1"><strong><a href="https://github.com/vuejs/vue-cli/blob/dev/docs/README.md" rel="nofollow noreferrer" target="_blank">vue-cli官方文档</a></strong></h2>
<h3 id="articleHeader2">安装命令调整</h3>
<p>原：npm install -g vue-cli<br>vue init &lt;template-name&gt; &lt;project-name&gt;<br>改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g @vue/cli
# or
yarn global add @vue/cli

vue create my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> -g @vue/cli
# <span class="hljs-keyword">or</span>
yarn <span class="hljs-keyword">global</span> <span class="hljs-keyword">add</span> @vue/cli

vue <span class="hljs-keyword">create</span> my-<span class="hljs-keyword">project</span></code></pre>
<p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli官方仓库</a><br>命名方式已经改为npm推荐的新的<a href="https://zcfy.cc/article/the-npm-blog-new-package-moniker-rules" rel="nofollow noreferrer" target="_blank">包名规则，使用作用域</a></p>
<h3 id="articleHeader3">项目初始化的不同</h3>
<p>一般人都会告诉你选默认，然后就掉坑里了...(当然选了也掉）<br>发现手动初始的时候可以定义的东西挺多的..是<strong>选择manual才会有</strong><br>参考上面那篇vue-cli3.0初体验..<br>比如less/sass都可以在这里配置...<br>比如我选了less在本地node_modules，就会多less的包<br>大概就是已经npm install less-loader style-loader less<br><span class="img-wrap"><img data-src="/img/bV7PPM?w=1326&amp;h=606" src="https://static.alili.tech/img/bV7PPM?w=1326&amp;h=606" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>手动初始化加入vuex,vue-router之后,<br>public相当于原来的static，里面的index.html是项目的入口<br>src同以前<br><span class="img-wrap"><img data-src="/img/bV7PST?w=1590&amp;h=1379" src="https://static.alili.tech/img/bV7PST?w=1590&amp;h=1379" alt="vue-cli3.0项目结构" title="vue-cli3.0项目结构" style="cursor: pointer; display: inline;"></span>
</blockquote>
<p>eslint这个怎么选呢</p>
<h3 id="articleHeader4">项目结构变化</h3>
<p>选择default初始化，可以看到项目结构为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  package-lock.json
│  package.json
├─public
│      favicon.ico
│      index.html
└─src
    │  App.vue
    │  main.js
    ├─assets
    │      logo.png
    └─components
            HelloWorld.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>│  package-lock<span class="hljs-selector-class">.json</span>
│  package<span class="hljs-selector-class">.json</span>
├─public
│      favicon<span class="hljs-selector-class">.ico</span>
│      index<span class="hljs-selector-class">.html</span>
└─src
    │  App<span class="hljs-selector-class">.vue</span>
    │  main<span class="hljs-selector-class">.js</span>
    ├─assets
    │      logo<span class="hljs-selector-class">.png</span>
    └─components
            HelloWorld.vue</code></pre>
<h4>build哪里去了？config哪里去了？配置都消失了？</h4>
<p>vue-cli3.0默认项目目录与<a href="https://segmentfault.com/q/1010000008863946">2.0的</a>相比，更精简:<br>1.移除的配置文件根目录下的，<code>build</code>和<code>config</code>等目录，<br>2.移除了<code>static</code>文件夹，新增了<code>public</code>文件夹，并且<code>index.html</code>移动到<code>public</code>中。<br>3.在<code>src</code>文件夹中新增了<code>views</code>文件夹，用于分类 试图组件 和 公共组件 。<br>4.大部分配置 都集成到 vue.config.js这里,在项目根目录下</p>
<blockquote>在vue.config.js里大概配置<br>常用的路径名、根目录、预处理、devServer配置、pwa、dll、第三方插件<br><a href="https://github.com/vuejs/vue-cli/blob/dev/docs/config.md" rel="nofollow noreferrer" target="_blank">vue.config.js</a>
</blockquote>
<p>这里不负责任的扔一篇自己写的很口水的<a href="https://segmentfault.com/a/1190000014456796">static assets静态资源相关</a></p>
<h3 id="articleHeader5">Q:webpack.config.js 去哪了?</h3>
<p><a href="https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md" rel="nofollow noreferrer" target="_blank">webpack相关配置</a><br><span class="img-wrap"><img data-src="/img/bV7Pm6?w=1655&amp;h=429" src="https://static.alili.tech/img/bV7Pm6?w=1655&amp;h=429" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>那么具体在项目中如何修改呢，<br>这里我也还没搞的非常清楚，待研究...<br>不知道是不是能直接在这里设置<br><code>&lt;projectRoot&gt;/node_modules/@vue/cli-service/webpack.config.js</code><br><a href="https://forum.vuejs.org/t/editing-webpack-config-js-when-using-vue-cli-3/30251/2" rel="nofollow noreferrer" target="_blank">一个使用的例子</a><br>之前是分webpack.base.config.js/ dev / prod<br>现在去哪了呢<br><a href="https://doc.webpack-china.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>webpack-dev-server 的配置现在在 webpack.config.js/devServer 下<br><a href="https://doc.webpack-china.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">devserver</a></p>
<p><a href="https://github.com/vuejs/vue-cli/issues/589" rel="nofollow noreferrer" target="_blank">关于3.0更新的官方issue</a><br>尤大的解释是这样的..<br><span class="img-wrap"><img data-src="/img/bV7XP9?w=1288&amp;h=910" src="https://static.alili.tech/img/bV7XP9?w=1288&amp;h=910" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>1.<code>vue-cli@3.0</code>修改的方向是逐步成为“config/script in a package”的模型<br>2.为避免使用户预先做一些不可逆的设置，<br>-我们将逐步一出browserify支持，webpack讲只基于一个template<br>-在预设时就可以配置常见的（pwa/ts/ssr）设置<br>3.除了封装包，提供通过<code>vue.config.js</code>配置的可能<br>-为高级功能 如 env variables, css extraction API proxying提供了一个集中的入口<br>-如本地预设一样，提供了底层的webpack设置支持，可能是webpackchain</blockquote>
<p>可能的方向???（显然并不明确）<br>他这里貌似是提的设想，到底实现了多少呢?好像也没说的很明白..<br>去哪看他实现了多少呢???..<br><span class="img-wrap"><img data-src="/img/bV7Ppu?w=1417&amp;h=699" src="https://static.alili.tech/img/bV7Ppu?w=1417&amp;h=699" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">Q:npm run dev改了？</h3>
<p>在根目录的<code>package.json</code>里有如下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;serve&quot;: &quot;vue-cli-service serve&quot;,
&quot;build&quot;: &quot;vue-cli-service build&quot;,
&quot;lint&quot;: &quot;vue-cli-service lint&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"serve"</span>: <span class="hljs-string">"vue-cli-service serve"</span>,
<span class="hljs-string">"build"</span>: <span class="hljs-string">"vue-cli-service build"</span>,
<span class="hljs-string">"lint"</span>: <span class="hljs-string">"vue-cli-service lint"</span></code></pre>
<p>所以以前那些用npm run dev的，约莫是只能npm run serve/npm run build了<br>然后就如上图egoist设想接近了<br>当然本身是“打包了一个express之类的serve工具啥的.????”<br>具体是package.json里面“scripts”有写..键值..<br>我在哪看的，想不起来了...有空改吧..<br>我最近用的是<code>npm run serve</code><br>不知道<code>vue-scripts dev</code>行不行 参考上面一段<br><a href="https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md" rel="nofollow noreferrer" target="_blank">vue-cli-service官方文档</a></p>
<blockquote>vue-cli-service serve starts a dev server based on webpack-dev-server. It comes with hot-module-replacement (HMR) out of the box.</blockquote>
<h3 id="articleHeader7">Q:使用vue-cli初始化后，到底还要不要装vuex,vue-router?</h3>
<p><span class="img-wrap"><img data-src="/img/bV7Pzz?w=578&amp;h=955" src="https://static.alili.tech/img/bV7Pzz?w=578&amp;h=955" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>当我们初始项目的时候，如果使用 <em>默认配置</em> ,本地node_modules应该是这样的，所以，<br>没有vuex,vue-router阿！ 但是估计是有vue-loader，也有webpack..<br>和旧版本不一样的，2.0的版本好像都会装（看教程里揣测的），反正根目录下有vuex/vue-router文件夹..</p>
<blockquote>但是初始项目的时候，如果是 <strong>手动安装</strong>  的话，选了，就会有！参考问题1.<br>这次我们手动选择初始化...<br><span class="img-wrap"><img data-src="/img/bV7PQb?w=1326&amp;h=1354" src="https://static.alili.tech/img/bV7PQb?w=1326&amp;h=1354" alt="手动选择初始化" title="手动选择初始化" style="cursor: pointer; display: inline;"></span><br>项目结构就发生了一些变化...多了views??<br><strong>多了router.js(vue-router) / store.js(vuex)</strong><br><span class="img-wrap"><img data-src="/img/bV7PQi?w=1588&amp;h=1354" src="https://static.alili.tech/img/bV7PQi?w=1588&amp;h=1354" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>
</blockquote>
<h3 id="articleHeader8">Q:原来写在src/router/index.js 现在放哪呢</h3>
<p>教程里一般都是<span class="img-wrap"><img data-src="/img/bV7PDy?w=1155&amp;h=779" src="https://static.alili.tech/img/bV7PDy?w=1155&amp;h=779" alt="index.js" title="index.js" style="cursor: pointer; display: inline;"></span></p>
<blockquote>那现在我们放哪呢?<br>ok，经过自定义带router的初始化，我们可以<strong>放在router.js</strong>里~</blockquote>
<p>全部的组件都是注册到app.vue么? 还是都引入在main.js<br>这里是真的不太懂，主要是不懂vue开发者项目结构的思路..其实只要引入import export了能用就行..<br>但是为了追求完美..待研究...<br>（对了这里的@components是webpack alias??配置，忘了在哪看的了<a href="https://zhuanlan.zhihu.com/p/31774301" rel="nofollow noreferrer" target="_blank">webpack alias</a>）<br>脑壳痛，关于webpack4.0大约也要写一篇文章..</p>
<h4>Q:render/mount/app的一些问题</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  render: h => h(App)
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>这一段我一开始没看懂，现在略略有点懂了..<br>详细参见<a href="https://segmentfault.com/a/1190000014254740">render h=&gt;h(app)都是些啥</a><br>基本上就是..</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  render: function(h) {
    return h(app)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  render: <span class="hljs-built_in">function</span>(h) {
    return <span class="hljs-built_in">h</span>(app)
  }
})</code></pre>
<h4>css相关</h4>
<p><a href="https://github.com/vuejs/vue-cli/blob/dev/docs/css.md" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-...</a></p>
<h4>Q: webpack4.0的一些问题..</h4>
<p>待更新..<br>我搜到的参考文章:<br><a href="https://www.imooc.com/article/23555" rel="nofollow noreferrer" target="_blank">https://www.imooc.com/article...</a><br><a href="https://juejin.im/post/5ac9dc9af265da23884d5543" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5ac9dc...</a></p>
<p>有空再更新了</p>
<p>扔一点学习资料：<br><a href="https://juejin.im/post/59fa9257f265da43062a1b0e?utm_source=weibo&amp;utm_campaign=admin" rel="nofollow noreferrer" target="_blank">Vue 脱坑记 - 查漏补缺(汇总下群里高频询问的xxx及给出不靠谱的解决方案</a><br>话说我觉得这个真的可以写成官方q&amp;a特别3.0一出<br>如果有的话麻烦甩下连接谢谢..<br>不过现在很多都写在报错提示上了，还是很赞的..</p>
<p>本文参考：<br><a href="https://segmentfault.com/a/1190000014123259">vue-cli3.0初体验..</a><br><a href="https://www.uis.cc/2018/02/27/New-features-of-vue-cli-3-speed/" rel="nofollow noreferrer" target="_blank">vue-cli3.0特性</a><br><a href="https://segmentfault.com/a/1190000014094732">vue3.0入门</a><br><a href="https://segmentfault.com/a/1190000013090943" target="_blank">Vue CLI 3.x 简单体验</a></p>
<p>其他可供参考<br><a href="http://www.bkjia.com/Javascript/1317607.html" rel="nofollow noreferrer" target="_blank">常用配置修改</a></p>
<p>欢迎加q群讨论备注sf：669072360</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.5/vue-cli3.0版本更新引发的一些常见问题

## 原文链接
[https://segmentfault.com/a/1190000014219426](https://segmentfault.com/a/1190000014219426)

