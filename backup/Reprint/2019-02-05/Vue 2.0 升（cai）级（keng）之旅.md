---
title: 'Vue 2.0 升（cai）级（keng）之旅' 
date: 2019-02-05 2:30:09
hidden: true
slug: qh7bmnrf0h
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>Troubleshooting of upgrading Vue from 1.0 to 2.0</strong></p>
<blockquote>
<p>系列文章:</p>
<ol>
<li><p>Vue 2.0 升（cai）级（keng）之旅 (本文)</p></li>
<li><p><a href="https://segmentfault.com/a/1190000006673171">Vuex — The core of Vue application</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007753975" target="_blank">从单页应用(SPA)到服务器渲染(SSR)</a></p></li>
</ol>
<p>本文不包含 Vue 2.0 所有新特性，如 SSR 等，本文并没有涉及，本文只包含 <a>个人博客项目</a> 升级中所遇到的经验分享，如有兴趣，可以查看 Vue 2.0 <a href="https://github.com/vuejs/vue/issues/2873" rel="nofollow noreferrer" target="_blank">changes log</a>。</p>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<blockquote><p>这节净是些唠叨，只想看升(tian)级(keng)的可直接跳过。</p></blockquote>
<p>从去年年底开始写博客，那时对怎么搞个博客网站一窍不通，看别人用 <a href="https://pages.github.com/" rel="nofollow noreferrer" target="_blank">Github Pages</a> 写博客挺赞的，就也想搞个玩玩。技术选型时，在 <a href="https://jekyllrb.com/" rel="nofollow noreferrer" target="_blank">jekyll</a> 和 <a href="https://hexo.io/zh-cn/" rel="nofollow noreferrer" target="_blank">hexo</a> 中选择了前者，或许你会问为什么？估计当时大脑的供氧量不足了吧...</p>
<p>于是，我的博客就这么诞生了。（jekyll 版的博客已经废弃了，如果你有兴趣，可以查看之前的<a href="https://github.com/DiscipleD/DiscipleD.github.io/commits/master" rel="nofollow noreferrer" target="_blank">提交</a>）</p>
<p>可是，用久了就发现并不怎么好用，虽然支持 markdown，可代码块要转换成 highlighter 标签；其次，<a href="https://github.com/aron-bordin/neo-hpstr-jekyll-theme" rel="nofollow noreferrer" target="_blank">主题</a>模板是挺好看，可换成中文字杂就那么别扭哪；还有，对 jekyll 的模板又不熟，自定义也不方便。</p>
<p>年初有一天，突然想到自己也是搞技术的，为啥不自己搭一个博客网站哪？对，顺带还能学学新技术，何乐而不为。又到了技术选型的时候了，这次摆在我面前又有 2 个选择，<a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a> 和 <a href="https://vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a>，这次我选择了后者。</p>
<p>Why？因为，后者更轻量级，也更贴近我熟悉的 <a href="https://angularjs.org/" rel="nofollow noreferrer" target="_blank">Angular</a> 的语法，还有，那时网上就有说今年 4 月 Vue 会升级到 2.0 和 Vue 兼具 React 和 Angular 的优点等等。（好吧，老实说，不选 React 只是因为不喜欢 JSX 而已。-_-||）</p>
<p>So，我就用 Vue 1.10+ 搭建了自己的新博客——<a href="http://discipled.me/" rel="nofollow noreferrer" target="_blank">Disciple.Ding Blog</a>(点这里看<a href="https://github.com/DiscipleD/blog" rel="nofollow noreferrer" target="_blank">源码</a>)，并渐渐地往里添加一些新学到的东西，<a href="https://babeljs.io/docs/learn-es2015/" rel="nofollow noreferrer" target="_blank">ES6</a>, <a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">webpack</a>, <a href="https://www.docker.com/" rel="nofollow noreferrer" target="_blank">docker</a> 等，并在 <a href="https://www.daocloud.io/" rel="nofollow noreferrer" target="_blank">DAOcloud</a> 上发布了。(免费用了人家那么久的服务，在这里做个硬广也是应该的，DAOcloud 的确很好用，特别和 Github 绑定之后能自动构建，应用更新也及其简单，只是有个缺点就是有带宽限制。)</p>
<p>在不久之前，Vue 如约发布了 2.0 版本。正如计划之初，博客 Vue 的版本也将升级到 2.0。</p>
<p>说了那么多，再不进入正题就要变成标题党了。好，那就开始我们的升(cai)级(keng)之旅。</p>
<h2 id="articleHeader1">升(tian)级(keng)之旅</h2>
<p>首先，升级依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue@next vue-router@next --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="Bash" style="word-break: break-word; white-space: initial;">npm install vue@next vue-router@next --save</code></pre>
<h3 id="articleHeader2">import vue</h3>
<p>顺利安装完成并按 <a href="https://github.com/vuejs/vue/issues/2873" rel="nofollow noreferrer" target="_blank">changelog</a> 做了修改之后，启动项目也正常，当我兴致勃勃地打开 Browser，驾轻就熟地输入 localhost，并自然而然地按下 Enter，一切水到渠成。</p>
<p>然而，迎接我的竟是一片白板，控制台里赫然映着一串红字。</p>
<blockquote><p>[Vue warn] : You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build. (found in root instance)</p></blockquote>
<p>What? template 选项不能用了，changelog 没提到啊？但 <a href="https://github.com/vuejs/vue-router/tree/43183911dedfbb30ebacccf2d76ced74d998448a/examples" rel="nofollow noreferrer" target="_blank">vue-router</a> 的例子中都在用啊，什么鬼？甚至我将代码全部替换成例子中的代码依旧无法运行，但在 vue-router 项目里就能跑，什么鬼啊！</p>
<p>但是，我并不妥协，分别打断点运行，发现两者竟然跑的不是同一段代码，纳尼！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vue from 'vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span></code></pre>
<p>同样的 <code>import</code> 语句，却有不一样的结果，vue-router 中引的是 vue.js，而在我的项目中引的竟然是 vue.common.js...common...mon...n...</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006435895" src="https://static.alili.tech/img/remote/1460000006435895" alt="懵逼" title="懵逼" style="cursor: pointer;"></span></p>
<p>为什么会引 vue.common.js，<code>from 'vue'</code> 不该引的是 vue.js 么？这就要引入另一个知识点：package.json。</p>
<p>package.json 中的 <code>main</code> 属性决定了，当项目被引入时，输出的是哪个文件，而 vue 的 package.json 中的 <code>main</code> 指向的是 <code>dist/vue.common.js</code>。</p>
<blockquote><p>福利时间：推荐一个网站 <a href="http://json.is/" rel="nofollow noreferrer" target="_blank">json.is</a>，它对 package.json 里的每条属性都有详细的解释。</p></blockquote>
<p>找到了问题产生的原因，那么解决也就轻而易举了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vue from 'vue/dist/vue.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue/dist/vue.js'</span></code></pre>
<p>每次引用 vue 的时候都要写那么长，一点都不优雅，而且为什么 vue-router 的例子可以用啊？</p>
<p>我要一探究竟。确认了 vue-router 中依赖的 vue 的 package.json 文件中的 <code>main</code> 字段指向的也是 <code>dist/vue.common.js</code>。那就只有一个可能了，webpack 对引入做了处理，查看 webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    // 省略...
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">// 省略...</span>
    resolve: {
        <span class="hljs-attr">alias</span>: {
            <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
        }
    },
    ...</code></pre>
<p>果然啊~他用 webpack 的别名功能把 <code>vue/dist/vue.js</code> 命名成了 vue，防不胜防。</p>
<p>在自己项目的 wepack.config.js 里同样给 vue 起别名，这样就又能愉快地使用 <code>import vue from 'vue'</code> 了。</p>
<p>你是不是以为这样就结束了？不，对待一个问题要刨根问底，不能不求甚解。</p>
<p><strong>为什么 vue 默认导出的是 vue.common.js，它和 vue.js 的区别在哪里，又有什么关系？</strong></p>
<p>这个问题在囧克斯的<a href="http://jiongks.name/blog/code-review-for-vue-next/" rel="nofollow noreferrer" target="_blank">博客</a>中有提到。</p>
<blockquote><p>Vue 最早会打包生成三个文件，一个是 runtime only 的文件 vue.common.js，一个是 compiler only 的文件 compiler.js，一个是 runtime + compiler 的文件 vue.js。</p></blockquote>
<p>也就是说，<code>vue.js = vue.common.js + compiler.js</code>，而如果要使用 <code>template</code> 这个属性的话就一定要用 compiler.js，那么，引入 vue.js 是最恰当的。</p>
<h3 id="articleHeader3">路由升级</h3>
<p>vue-router 的升级并不困难，参照 <a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.1" rel="nofollow noreferrer" target="_blank">Releases Note</a> 上的注释修改应该没有什么大问题，主要的变化有两点：</p>
<ol>
<li><p>路由配置从一系列的方法调用，变成了传递一个配置对象</p></li>
<li><p>原先的 <code>v-link</code> 指令，变成了 <code>router-link</code> Component，路径指向用 <code>to</code> 属性</p></li>
</ol>
<p>正当你以为会一路顺风顺水，轻松升级路由完成的时候，现实总会给你当头一棒。</p>
<p>之前博客的 vue-router 中使用了 <code>beforeEach</code> 和 <code>afterEach</code> 方法，根据 <a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.1" rel="nofollow noreferrer" target="_blank">Release Note</a></p>
<blockquote><ul>
<li><p>router.beforeEach (replaced by the beforeEach option)</p></li>
<li><p>router.afterEach (replaced by the afterEach option)</p></li>
</ul></blockquote>
<p>行，那我把它改到配置里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ROUTER_SETTING = {
    routes: [
        // 省略...
    ],
    beforeEach: () => { /* some function */ },
    afterEach: () => { /* some function */ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> ROUTER_SETTING = {
    <span class="hljs-attr">routes</span>: [
        <span class="hljs-comment">// 省略...</span>
    ],
    <span class="hljs-attr">beforeEach</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* some function */</span> },
    <span class="hljs-attr">afterEach</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* some function */</span> }
}</code></pre>
<p>But, not work. What's wrong?</p>
<p>难道我哪里写错了？又经过我一番谷哥和查阅文档之后，发现在下一个版本的 <a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.2" rel="nofollow noreferrer" target="_blank">Release Note</a> 中有这么一段</p>
<blockquote><p>beforeEach and afterEach are reverted as router instance methods (options removed). This makes it more convenient for plugins/modules to add hooks after the router instance has been created.</p></blockquote>
<p>好吧，它又被恢复回路由实例的方法了。那么，改回去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter(ROUTER_SETTING);

router
    .beforeEach(() => { /* some function */ })
    .afterEach(() => { /* some function */ });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter(ROUTER_SETTING);

router
    .beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* some function */</span> })
    .afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* some function */</span> });</code></pre>
<p>OK，这样总好了吧。然而，并没有...console 中报出无法从 <code>undefined</code> 中读取 <code>afterEach</code>，好吧，我猜这应该是 <code>beforeEach</code> 中没有像之前一样返回路由对象，所以不能链式调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class VueRouter {
    // 省略...
    beforeEach (fn: Function) {
        this.beforeHooks.push(fn)
    }
    
    afterEach (fn: Function) {
        this.afterHooks.push(fn)
    }
    // 省略...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VueRouter</span> </span>{
    <span class="hljs-comment">// 省略...</span>
    beforeEach (fn: <span class="hljs-built_in">Function</span>) {
        <span class="hljs-keyword">this</span>.beforeHooks.push(fn)
    }
    
    afterEach (fn: <span class="hljs-built_in">Function</span>) {
        <span class="hljs-keyword">this</span>.afterHooks.push(fn)
    }
    <span class="hljs-comment">// 省略...</span>
}</code></pre>
<p>看一眼源码，果然如此。</p>
<p>那再将之前的代码稍作修改就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter(ROUTER_SETTING);

router.beforeEach(() => { /* some function */ });
router.afterEach(() => { /* some function */ });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter(ROUTER_SETTING);

router.beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* some function */</span> });
router.afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">/* some function */</span> });</code></pre>
<p>不过，不能链式调用似乎没之前的优雅了哪~</p>
<p>最后，提一下 vue-router 2.0 里所有的 hook（就像之前的 <code>beforeEach</code>, <code>afterEach</code>，以及每个路由状态中的 <code>beforeEnter</code>, <code>beforeRouteLeave</code>等）都具有相同的参数签名，这在 <a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.1" rel="nofollow noreferrer" target="_blank">Release Note</a> 中也有提到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn (toRoute, redirect, next) {
    // toRoute: {Object} 当前路由对象
    // redirect: {Function} 调用跳转至另一路由
    // next: {Function} 调用继续当前路由跳转
    // 什么都不做，则取消当前跳转
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">fn (toRoute, redirect, next) {
    <span class="hljs-comment">// toRoute: {Object} 当前路由对象</span>
    <span class="hljs-comment">// redirect: {Function} 调用跳转至另一路由</span>
    <span class="hljs-comment">// next: {Function} 调用继续当前路由跳转</span>
    <span class="hljs-comment">// 什么都不做，则取消当前跳转</span>
}</code></pre>
<p>路由升级完成后，如果控制台没有什么报错，那么，路由可以相互切换了，那些不依赖数据读取的组件已经可以正常显示了。</p>
<p>那些依赖数据读取的组件哪？</p>
<p>这就要提到组件的<strong>生命周期钩子（即 lifecycle hooks）</strong>。</p>
<h3 id="articleHeader4">Lifecycle hooks</h3>
<p><strong>生命周期钩子</strong>应该算 vue 这次升级中 broken changes 最多的一部分了，对照 1.0 的<a href="https://vuejs.org/api/#Options-Lifecycle-Hooks" rel="nofollow noreferrer" target="_blank">文档</a>和 <a href="https://github.com/vuejs/vue/issues/2873" rel="nofollow noreferrer" target="_blank">release note</a>，作了下面这张表</p>
<table>
<thead><tr>
<th align="left">vue 1.0+</th>
<th align="left">vue 2.0</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">init</td>
<td align="left">beforeCreate</td>
<td>组件实例刚被创建，组件属性计算之前，如 data 属性等</td>
</tr>
<tr>
<td align="left">created</td>
<td align="left">created</td>
<td>组件实例创建完成，属性已绑定，但 DOM 还未生成，<code>$el</code> 属性还不存在</td>
</tr>
<tr>
<td align="left">beforeCompile</td>
<td align="left">beforeMount</td>
<td>模板编译/挂载之前</td>
</tr>
<tr>
<td align="left">compiled</td>
<td align="left">mounted</td>
<td>模板编译/挂载之后</td>
</tr>
<tr>
<td align="left">ready</td>
<td align="left">mounted</td>
<td>模板编译/挂载之后（不保证组件已在 document 中）</td>
</tr>
<tr>
<td align="left">-</td>
<td align="left">beforeUpdate</td>
<td>组件更新之前</td>
</tr>
<tr>
<td align="left">-</td>
<td align="left">updated</td>
<td>组件更新之后</td>
</tr>
<tr>
<td align="left">-</td>
<td align="left">activated</td>
<td>for <code>keep-alive</code>，组件被激活时调用</td>
</tr>
<tr>
<td align="left">-</td>
<td align="left">deactivated</td>
<td>for <code>keep-alive</code>，组件被移除时调用</td>
</tr>
<tr>
<td align="left">attached</td>
<td align="left">-</td>
<td>不用了还说啥哪...</td>
</tr>
<tr>
<td align="left">detached</td>
<td align="left">-</td>
<td>那就不说了吧...</td>
</tr>
<tr>
<td align="left">beforeDestory</td>
<td align="left">beforeDestory</td>
<td>组件销毁前调用</td>
</tr>
<tr>
<td align="left">destoryed</td>
<td align="left">destoryed</td>
<td>组件销毁后调用</td>
</tr>
</tbody>
</table>
<p>知道了 hooks 升级前后的对应关系，那么升级起来就轻而易举了，改改组件的属性名就可以了。</p>
<p>那么，改完属性名是不是就完成了？然而并没有。</p>
<p>因为，在 vue 1.0+ 中，如果一个组件和路由相关，那么，它就可能不单单有自己组件的 lifecycle hooks，它还会有基于 vue-router 的 lifecycle hooks。</p>
<p>而在 vue 2.0 中，<strong>router lifecycle hooks 全部被移除了</strong>，因为，这些 hooks 可以通过其他的方式来代替，这样不但简化了配置，还不用在组件中去处理路由相关的业务，降低了耦合。那这些 hooks 该如何替换，我们接下来就来看一下。</p>
<ul>
<li><p><code>activate</code> &amp; <code>deactivate</code>：使用组件自身的 lifecycle hook 替代</p></li>
<li><p><code>data</code>：通过组件 <code>watch</code> 属性来监听当前路由 <code>$route</code> 的变化</p></li>
<li><p><code>canActivate</code>：由路由属性 <code>beforeEnter</code> 来代替</p></li>
<li><p><code>canDeactivate</code>：由路由属性 <code>beforeRouteLeave</code> 来代替</p></li>
<li><p><code>canReuse</code>：去除</p></li>
</ul>
<p>那个这个是不是也直接改改属性名就好了哪？</p>
<p>恩，差不多。不过需要注意的是，如果原先 hooks 中使用了有关路由信息的 <code>transition</code> 参数是肯定不能用了。比如，根据路由参数来进行查询，原先通过 <code>transition.to.params</code> 获取路由参数，现在就要通过刚刚提到的<strong>当前路由对象</strong> <code>this.$route.params</code> 来获取。</p>
<p>在升级这里的过程中，还遇到一个问题：当用户输入的 URL 满足路由匹配，但根据路由参数无法获得正确的文章时，我想让路由直接跳转到首页。</p>
<p>在 1.0 版本中，我通过 <code>transition.redirect('/');</code> 就轻松的回到了首页，由于 2.0 中没有 <code>transition</code> 参数，而 <code>$route</code> 只包含当前路由的信息，并不包换路由切换的操作。那该怎么做哪？再一次谷哥和查阅文档，然而一无所获。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006435901" src="https://static.alili.tech/img/remote/1460000006435901" alt="i choose death" title="i choose death" style="cursor: pointer; display: inline;"></span></p>
<p>最后在 vue-router 的例子中找到了解决问题的钥匙——<code>$router</code>。</p>
<p><code>$router</code> 返回的是整个项目路由的实例，它是只读的。于是，刚刚那个问题就可以通过 <code>this.$router.replace('/');</code> 来解决。</p>
<p>这里还有一点，在 1.0 版本中组件配置 route 属性时还可以设置一个叫 <code>waitForData</code> 的属性。这个在 2.0 中，我还没有找到直接的替换方式，不过，我在整个组件上添加 <code>v-if</code> 来处理。从理论和效果的角度上讲，<code>v-if</code> 是可以替代原先的 <code>waitForData</code> 属性，就似乎不那么优雅。</p>
<p>剩余其他小点，看控制台报错信息，然后查查 <a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.1" rel="nofollow noreferrer" target="_blank">Release Note</a> 都能轻松处理啦~</p>
<blockquote><p>至此，我的整个 <a href="http://discipled.me/" rel="nofollow noreferrer" target="_blank">Blog</a> 也升级完成了，欢迎来访。（查看源码戳<a href="https://github.com/DiscipleD/blog" rel="nofollow noreferrer" target="_blank">这里</a>）</p></blockquote>
<h2 id="articleHeader5">写在最后</h2>
<p>如果现在再让我选一个技术来搭博客的话，我会选 React。为啥？</p>
<p>因为 vue 我已经玩过啦，哈哈哈~</p>
<p>最后，借用外国网友的一句话：</p>
<blockquote><p>I'm constantly rewriting / refactoring this silly little blog using the latest and buzziest tech, so that I can stay up to date on these libraries and frameworks.</p></blockquote>
<p>这也是我自己搭博客，而不是直接使用博客系统的主要原因。</p>
<p>最后的最后，安利下自己的 <a href="http://discipled.me/" rel="nofollow noreferrer" target="_blank">Blog</a>，以及 <a href="https://github.com/DiscipleD/blog" rel="nofollow noreferrer" target="_blank">Source Code</a>。</p>
<p>欢迎交流，喷子绕道。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 升（cai）级（keng）之旅

## 原文链接
[https://segmentfault.com/a/1190000006435886](https://segmentfault.com/a/1190000006435886)

