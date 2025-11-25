---
title: '[译]Vue 2.5中即将推出的TypeScript变化' 
date: 2018-12-29 2:30:10
hidden: true
slug: kp6qcxwu1z
categories: [reprint]
---

{{< raw >}}

                    
<h2>Vue 2.5中即将推出的TypeScript变化</h2>
<h2>输入提升</h2>
<p>自Vue 2.0发布以来，我们一直在收到更好的 TypeScript 集成请求。 自从发布以来，我们已经为大多数核心库（<code>vue</code>, <code>vue-router</code>, <code>vuex</code>)包含了官方的 TypeScript 类型声明。 然而，当使用开箱即用的 Vue API 时，目前的集成有些缺乏。 例如，TypeScript 不能轻易地推断 Vue 使用的基于对象的默认 API 中 <code>this</code> 的类型。 为了使我们的 Vue 代码可以很好地使用 TypeScript，我们必须使用 <code>vue-class-component</code> 装饰器，这样我们可以使用基于类的语法来创建 Vue 组件。</p>
<p>对于喜欢基于类的API的用户来说，这可能已经足够好了，但对于仅仅为了类型推断的用户不得不使用不同的API是不幸的。 这也使得将现有 Vue 代码库迁移到 TypeScript 更具挑战性。</p>
<p>今年早些时候，TypeScript 引入了许多<a href="https://github.com/Microsoft/TypeScript/pull/14141" rel="nofollow noreferrer">新功能</a>，这样就可以改进Vue的类型声明从而使得 TypeScript 可以更好地理解基于对象字面量的 API。 来自 TypeScript 团队的 Daniel Rosenwasser 开始了一个雄心勃勃的PR（现在由核心团队成员 HerringtonDarkholme 在<a href="https://github.com/vuejs/vue/pull/6391" rel="nofollow noreferrer">这</a>维护），一旦合并，将提供：</p>
<ul>
<li>使用默认的 Vue API 时，对于 <code>this</code> 可以使用适当的类型推断。 它也可以在单文件组件中工作！</li>
<li>基于组件的 <code>props</code> 选项，对于 <code>this</code> 中的 props 输入推断。</li>
<li>最重要的是，<strong>这些改进也使得纯 JavaScript 用户受益匪浅！</strong> 如果你使用 VSCode 与超级棒的的 <a href="https://github.com/vuejs/vetur" rel="nofollow noreferrer">Vetur</a> 扩展，你将获得大大改进的自动完成建议，甚至在Vue组件中使用纯 JavaScript 时也能获得输入提示！ 这是因为<a href="https://www.npmjs.com/package/vue-language-server" rel="nofollow noreferrer">vue-language-server</a>是负责分析 Vue 组件的内部包，可以利用 TypeScript 编译器来提取有关你的代码的更多信息。 此外，任何支持语言服务器协议的编辑器都可以利用 <a href="https://github.com/vuejs/vetur/tree/master/server" rel="nofollow noreferrer"><code>vue-language-server</code></a>来提供类似的功能。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011484401" src="https://static.alili.tech/img/remote/1460000011484401" alt="1-ftkupzygizn1es87jcbs8q" title="1-ftkupzygizn1es87jcbs8q"></span></p>
<p>对于那些好奇的人，你可以通过克隆这个 <a href="https://github.com/octref/veturpack/tree/new-types" rel="nofollow noreferrer">playground 项目</a>（确保获取 <code>new-types</code> 的分支）并使用 VSCode + Vetur 打开它来尝试一下！</p>
<h2>TypeScript用户可能需要的操作</h2>
<p>输入升级将在 Vue 2.5 中发布，目前计划在10月初发布。 我们正在发布一个小版本，因为 JavaScript 公共 API 没有任何突破性的变化，但是升级可能需要现有的 TypeScript + Vue 用户采取一些操作。 这就是为什么我们现在宣布改变，以便你有足够的时间来计划升级。</p>
<ul>
<li>新的输入至少需要 TypeScript 2.4 版本，建议升级到最新版本的 TypeScript 以及 Vue 2.5。</li>
<li>之前，我们已经推荐将 <code>tsconfig.json</code> 设为 <code>“allowSyntheticDefaultImports”: true</code> 从而在任何地方使用 ES 风格的导入(<code>import Vue from 'vue'</code>)。 新的输入将正式转换为ES风格的导入/导出语法，因此不再需要配置，并且用户在所有情况下都需要使用ES风格的导入。</li>
<li>为了配合导出语法的改变，以下依赖于 Vue 核心输入的核心库 <code>vuex</code>, <code>vue-router</code>, <code>vuex-router-sync</code>, <code>vue-class-component</code> 将会收到新的主要版本，并且应与 Vue 核心 2.5 一起升级。</li>
<li>当执行自定义模块扩充时，用户应该使用 <code>interface VueConstructor</code> 而不是 <code>namespace Vue</code>。(example diff)</li>
<li>如果使用 <code>ComponentOptions &lt;Something&gt;</code> 对组件选项进行注释，则此类型的 <code>computed</code>，<code>watch</code>，<code>render</code> 和生命周期钩子将需要手动类型注解。</li>
</ul>
<p>我们尽力减少所需的升级工作，这些类型的改进与 <code>vue-class-component</code> 中使用的基于类的 API 兼容。 对于大多数用户来说，只需升级依赖并切换到ES风格的导入即可。 同时，我们还建议你将Vue 版本锁定到2.4.x，直到你准备升级为止。</p>
<h2>未来规划：vue-cli中的TypeScript支持</h2>
<p>2.5之后，我们计划在下一个版本的 vue-cli 中引入对TypeScript 的官方支持，以便使 TS + Vue 用户更轻松地启动新项目。 敬请关注！</p>
<h2>对于非TypeScript用户</h2>
<p>这些更改不会以任何负面的方式影响非 TypeScript Vue 用户; 根据公共JavaScript API，2.5 将完全向后兼容，并且TypeScript CLI集成将完全选择加入。 但是如上所述，如果你使用<a href="https://github.com/vuejs/vetur/tree/master/server" rel="nofollow noreferrer">vue-language-server</a>强大的编辑器扩展，则会注意到更好的自动完成建议。</p>
<p>—</p>
<p>感谢 <a href="https://github.com/danielrosenwasser" rel="nofollow noreferrer">Daniel Rosenwasser</a>, <a href="https://github.com/HerringtonDarkholme" rel="nofollow noreferrer">HerringtonDarkholme</a>, <a href="https://github.com/ktsn" rel="nofollow noreferrer">Katashin</a> 以及 <a href="https://github.com/octref" rel="nofollow noreferrer">Pine Wu</a> 对于这些特性的工作以及对这篇文章的审阅。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]Vue 2.5中即将推出的TypeScript变化

## 原文链接
[https://segmentfault.com/a/1190000011484396](https://segmentfault.com/a/1190000011484396)

