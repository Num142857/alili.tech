---
title: 'Vue 2.5中将迎来有关TypeScript的改进！' 
date: 2018-12-29 2:30:10
hidden: true
slug: japulfvdzt9
categories: [reprint]
---

{{< raw >}}

                    
<h2>类型改进</h2>
<p>自Vue2.0发布以来，我们一直在收到更好集成TypeScript的请求。从那时起，我们已经为大多数核心库（<code>vue</code>，<code>vue-router</code>，<code>vuex</code>）加入了官方的TypeScript类型声明。然而，当使用开箱即用的Vue API时，目前的集成还是有所欠缺。例如：TypeScript不能轻易的推断出Vue使用的基于对象的默认API中的<code>this</code>类型。想要使我们的Vue代码与TypeScript更好的运作，我们需要使用<a href="https://github.com/vuejs/vue-class-component" rel="nofollow noreferrer">vue-class-component</a>装饰器，它允许我们使用基于类的语法来写Vue组件。</p>
<p>对于喜欢基于类的API的用户，这可能就够好了，但是有点糟的是，只是为了类型判断，用户就不得不使用不同的API。这也使得将现有的Vue代码库向TypeScript迁移更具挑战。</p>
<p>今年的早些时候，TypeScript引入了一些<a href="https://github.com/Microsoft/TypeScript/pull/14141" rel="nofollow noreferrer">新特性</a>，能使TypeScript更好的理解基于对象字面量的API，这也使得改进Vue的类型声明更具可能。来自TypeScript团队的<a href="https://github.com/DanielRosenwasser" rel="nofollow noreferrer">Daniel Rosenwasser</a>发起了一个<a href="https://github.com/vuejs/vue/pull/5887" rel="nofollow noreferrer">雄心勃勃的PR</a>（现在由核心团队成员<a href="https://github.com/HerringtonDarkholme" rel="nofollow noreferrer">HerringtonDarkholme</a>持有），一旦通过合并，将会提供：</p>
<ul>
<li>使用默认的Vue API时对<code>this</code>的正确的类型推断。这也能在单文件组件中很好的运行！</li>
<li>基于组件的<code>props</code>配置的<code>this</code>的<code>props</code>的类型推断。</li>
<li>更重要的是，<strong>这些改进也会使纯粹的JavaScript用户受益！</strong>，如果你正在配合很棒的<a href="https://github.com/vuejs/vetur" rel="nofollow noreferrer">Vetur</a>扩展使用VSCode，在Vue组件中使用纯粹的JavaScript时，你会感受到关于自动补全提示甚至是类型提示的显著改进！ 这是因为<a href="https://www.npmjs.com/package/vue-language-server" rel="nofollow noreferrer">vue-language-server</a>，这个分析Vue组件的内部包，可以利用TypeScript编译器来提取关于你代码的更多信息。此外，任何支持语言服务协议的的编辑器都可以利用<a href="https://github.com/vuejs/vetur/tree/master/server" rel="nofollow noreferrer">vue-language-server</a>来提供类似的功能。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760432" src="https://static.alili.tech/img/remote/1460000006760432" alt="" title=""></span><br><span class="img-wrap"><img data-src="/img/bVWkdf?w=1098&amp;h=671" src="https://static.alili.tech/img/bVWkdf?w=1098&amp;h=671" alt="" title=""></span></p>
<p>运行中的 VSCode + Vetur + 新类型声明</p>
<p>感兴趣的话，就克隆<a href="https://github.com/octref/veturpack/tree/new-types" rel="nofollow noreferrer">这个体验项目</a>（确保是<code>new-types</code>分支）并使用VSCode + Vetur打开它来尝试一下吧。</p>
<h2>TypeScript用户可能需要的操作</h2>
<p>类型改进将在vue 2.5中实装，目前计划在十月初前后发布。我们正在发布一个小版本，因为JavaScript公共API还没有取得突破性改变，但是，升级可能需要现有的Vue+TypeScript用户进行一些操作。这也是我们现在公布改动的原因，便于你有足够的时间来规划升级。</p>
<ul>
<li>新的类型需要至少2.4版的TypeScript。建议你随着Vue2.5升级至最新的TypeScript版本。</li>
<li>之前，我们建议在<code>tsconfig.json</code>中配置<code>"allowSyntheticDefaultImports": true</code>来使用ES风格的导入语法（<code>import Vue from 'vue'</code>）。新的类型将正式转换至ES风格的导入/导出语法，这样上述配置就不需要了，而且用户在所有情况下都要使用ES风格的导入。</li>
<li>为了配合语法的变化，下述有Vue核心类型依赖的库将会有主版本更新，需要跟随Vue2.5进行升级：<code>vuex</code>, <code>vue-router</code>, <code>vuex-router-sync</code>, <code>vue-class-component</code>。</li>
<li>现在，当增加自定义模块时，用户需要使用<code>interface VueConstructor</code>来代替<code>namespace Vue</code>(<a href="https://github.com/vuejs/vue/pull/6391/files#diff-1c3e3e4cf681d5fde88941717da1058aL11" rel="nofollow noreferrer">差异对比</a>)</li>
<li>如果你使用<code>as ComponentOptions&lt;something&gt;</code>来注释你的组件配置，像<code>computed</code>, <code>watch</code>, <code>render</code>和生命周期钩子这种类型的需要手动进行类型注释。</li>
</ul>
<p>我们尽力去减小升级成本，并使这些类型改进与<code>vue-class-component</code>中使用的基于类的API兼容。对于绝大多数用户，只需要升级依赖关系，并切换至ES风格的导入就好。同时我们建议你在准备好升级前，将你的Vue版本锁定在<code>2.4.x</code>。</p>
<h2>蓝图：vue-cli中的TypeScript类型支持</h2>
<p>在2.5版本后，我们计划在下个vue-cli版本中去引入官方TypeScript支持，以便TS+Vue用户能轻松的启动新项目。敬请期待吧！</p>
<h2>对于非TypeScript用户</h2>
<p>这些改动不会对非TypeScript用户产生负面影响；就公共JavaScript API而言，2.5会完全向下兼容，TypeScript CLI集成也可以完全的选择性加入。但是正如刚才所提到的，如果你使用<a href="https://github.com/vuejs/vetur/tree/master/server" rel="nofollow noreferrer">vue-language-server</a>编辑器扩展，你会收到更好的自动补全提示。</p>
<p>—</p>
<p>感谢 <a href="https://github.com/danielrosenwasser" rel="nofollow noreferrer">Daniel Rosenwasser</a>, <a href="https://github.com/HerringtonDarkholme" rel="nofollow noreferrer">HerringtonDarkholme</a>, <a href="https://github.com/ktsn" rel="nofollow noreferrer">Katashin</a> 与 <a href="https://github.com/octref" rel="nofollow noreferrer">Pine Wu</a> 对这些特性做出的工作和对这篇文章的审核。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.5中将迎来有关TypeScript的改进！

## 原文链接
[https://segmentfault.com/a/1190000011474717](https://segmentfault.com/a/1190000011474717)

