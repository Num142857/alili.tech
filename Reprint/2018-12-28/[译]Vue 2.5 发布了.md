---
title: '[译]Vue 2.5 发布了' 
date: 2018-12-28 2:30:11
hidden: true
slug: 3qusen90loy
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>原文：<a href="https://medium.com/the-vue-point/vue-2-5-released-14bd65bf030b" rel="nofollow noreferrer" target="_blank">Vue 2.5 released</a></p>
<p>译者：<a href="https://github.com/neal1991" rel="nofollow noreferrer" target="_blank">neal1991</a></p>
<p>welcome to star my <a href="https://github.com/neal1991" rel="nofollow noreferrer" target="_blank">articles-translator </a>, providing you advanced articles translation. Any suggestion, please issue or contact <a href="mailto:bing@stu.ecnu.edu.cn">me</a></p>
<p>LICENSE: <a href="https://opensource.org/licenses/MIT" rel="nofollow noreferrer" target="_blank">MIT</a></p>
</blockquote>
<p>我们很高兴宣布 Vue 2.5 Level E 的发布！本次发布包括多个功能提升并且我们推荐你查看<a href="https://github.com/vuejs/vue/releases/tag/v2.5.0" rel="nofollow noreferrer" target="_blank">发布说明</a>来获取完整详细信息。 在这篇文章中，我们将重点介绍一些更重要的的变化：更好的 TypeScript 集成，更好的错误处理，更好地支持单文件组件中的函数式组件以及与环境无关的服务端渲染。</p>
<h2 id="articleHeader0">更好的 TypeScript 集成</h2>
<p><span class="img-wrap"><img data-src="/img/bVWGlr?w=800&amp;h=248" src="https://static.alili.tech/img/bVWGlr?w=800&amp;h=248" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>得益于 TypeScript 团队的帮助，2.5 提供了大大改进的类型声明，可以与 Vue 的开箱即用的 API 一起使用，而不需要组件类装饰器。 新的类型声明还可以让 Vetur 等编辑器扩展功能更强大，为纯 JavaScript 用户提供更好的Intellisense 支持。 更多详细信息，请查看<a href="https://medium.com/the-vue-point/upcoming-typescript-changes-in-vue-2-5-e9bd7e2ecf08" rel="nofollow noreferrer" target="_blank">我们之前关于更改的信息</a>（<a href="https://segmentfault.com/a/1190000011484396">翻译版本</a>）。</p>
<p><em>感谢来自 TypeScript 团队的 Daniel Rosenwasser 发起的PR，以及核心团队成员 Herrington Darkholme和 Katashin 的改进和审查。</em></p>
<blockquote><p>注意：TypeScript 用户还应将以下包更新为最新版本从而兼容类型声明：<code>vue-router</code>，<code>vuex</code>，<code>vuex-router-sync</code> 和<code>vue-class-component</code>。</p></blockquote>
<h2 id="articleHeader1">更好地错误处理</h2>
<p><span class="img-wrap"><img data-src="/img/bVWGlw?w=300&amp;h=213" src="https://static.alili.tech/img/bVWGlw?w=300&amp;h=213" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在2.4及更早版本中，我们通常使用全局 <code>config.errorHandleroption</code> 来处理应用程序中的意外错误。 我们还有<code>renderError</code> 组件选项来处理渲染函数中的错误。 但是，我们缺少处理应用程序特定部分内的泛型错误的机制。</p>
<p>在2.5中，我们引入了新的 <code>errorCaptured</code> 钩子。 具有此钩子的组件捕获其子组件树（不包括其自身）中的所有错误（不包括在异步回调中调用的那些）。 如果你熟悉React，这与 React 16 中引入的<a href="https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#introducing-error-boundaries" rel="nofollow noreferrer" target="_blank">错误边界</a>的概念相似。钩子接收与全局 <code>errorHandler</code> 相同的参数，你可以利用这个钩子来<a href="https://gist.github.com/yyx990803/9bdff05e5468a60ced06c29c39114c6b#error-handling-with-errorcaptured-hook" rel="nofollow noreferrer" target="_blank">优雅地处理和显示错误</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/9bdff05e5468a60ced06c29c39114c6b" data-typeid="1">点击预览</button>。</p>
<h2 id="articleHeader2">更好地支持 <code>SFC</code> 中的函数式组件</h2>
<p><span class="img-wrap"><img data-src="/img/bVWGlz?w=800&amp;h=359" src="https://static.alili.tech/img/bVWGlz?w=800&amp;h=359" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>使用 <code>vue-loader&gt; = 13.3.0</code> 和 <code>Vue 2.5</code>，在 <code>* .vue</code> 文件中定义为单个文件组件的函数式组件现在可以得到<a href="https://vue-loader.vuejs.org/en/features/functional.html" rel="nofollow noreferrer" target="_blank">正确的模板编译，Scoped CSS和热重新加载支持</a>。 这使得将叶子组件转换为函数式的更为容易，从而进行性能优化。</p>
<p>*感谢核心团队成员<a href="https://github.com/blake-newman" rel="nofollow noreferrer" target="_blank">Blake Newman</a> 对于这些功能做出的贡献。</p>
<h2 id="articleHeader3">与环境无关的服务端渲染</h2>
<p><code>vue-server-renderer</code> 的默认构建假定一个 Node.js 环境，这使得它在有的 JavaScript 运行时（如 <a href="https://github.com/phpv8/v8js" rel="nofollow noreferrer" target="_blank">php-v8js</a> 或Nashorn）中不可用。 在 2.5 中，我们已经发布了<a href="https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/basic.j" rel="nofollow noreferrer" target="_blank">一个与环境无关的 <code>vue-server-renderer</code> 版本</a>，可以在浏览器或纯 JavaScript 引擎中使用。 这可以打开有趣的策略，例如<a href="https://gist.github.com/yyx990803/9bdff05e5468a60ced06c29c39114c6b#environment-agnostic-ssr" rel="nofollow noreferrer" target="_blank">直接在 PHP 进程中使用 Vue 服务端渲染</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/9bdff05e5468a60ced06c29c39114c6b" data-typeid="1">点击预览</button>。</p>
<p>同样，我们建议你查看完整的<a href="https://github.com/vuejs/vue/releases/tag/v2.5.0" rel="nofollow noreferrer" target="_blank">发布说明</a>从而了解其他 API 的改进，包括 <code>v-on</code>，<code>v-model</code>，<code>scoped slot</code>，<code>provide/inject</code> 等。 你可能也对我们的<a href="https://github.com/vuejs/roadmap" rel="nofollow noreferrer" target="_blank">公共蓝图</a>感兴趣，详细说明了团队的工作。 干杯!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]Vue 2.5 发布了

## 原文链接
[https://segmentfault.com/a/1190000011563461](https://segmentfault.com/a/1190000011563461)

