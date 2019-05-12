---
title: 'vue-router 2.0 改变的内容' 
date: 2019-02-05 2:30:09
hidden: true
slug: i61rwrzlp2
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.1" rel="nofollow noreferrer" target="_blank">Beta1.官方说明</a><br><a href="https://github.com/vuejs/vue-router/releases/tag/v2.0.0-beta.2" rel="nofollow noreferrer" target="_blank">Beta2.官方说明</a></p>
<p>2.x 版本的<code>vue-router</code>相比之前的0.7.x版本，有很多破坏性改变：</p>
<h2 id="articleHeader0">通用 API 的修改</h2>
<ul>
<li><p>旧的 <code>router.go()</code> 现在改成了 <code>router.push()</code>.</p></li>
<li><p>新的 <code>router.go</code> 类似 <code>window.history.go()</code>: 接受一个数值作为参数在历史栈中导航</p></li>
<li>
<p>新增的方法:</p>
<ul>
<li><p><code>router.back()</code></p></li>
<li><p><code>router.forward()</code></p></li>
</ul>
</li>
</ul>
<h2 id="articleHeader1">路由配置</h2>
<p>所有路由配置都通过一个单独的对象传到<code>Router</code>的构造函数。所以可用的选项，参见<a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/flow/declarations.js#L8-L16" rel="nofollow noreferrer" target="_blank">configuration object's type declaration</a>。</p>
<p><code>routes</code> 选项取代了 <code>router.map()</code>。此外，路由配置现在用数组而不是用对象哈希表来作为数据结构。这保证了一致的匹配次序（对象键值枚举的次序是依赖浏览器的实现的）。</p>
<p><a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/basic/app.js#L18-L22" rel="nofollow noreferrer" target="_blank">这里</a> 是一个新的配置语法的例子.</p>
<p>以下的路由器实例配置选项被作废了：</p>
<ul>
<li><p><code>history</code> (被 <code>mode</code> 取代)</p></li>
<li><p><code>abstract</code> (被 <code>mode</code> 取代)</p></li>
<li><p><code>root</code> (被 <code>base</code> 取代)</p></li>
<li><p><code>saveScrollPosition</code> (被 <code>scrollBehavior</code> 取代，后者用起来更加灵活，下面会提到)</p></li>
<li><p><code>hashbang</code> (因为 hashbang 在Google爬站的时候不再需要，所以移除了此选项)</p></li>
<li><p><code>transitionOnLoad</code> (因为 Vue 2.0 有显式的视觉表现过渡动画控制，所以此选项移除)</p></li>
<li><p><code>suppressTransitionError</code> (因为钩子函数的系统的简化而移除)</p></li>
</ul>
<p>新的<code>mode</code>选项取值为： (默认是 "hash"):</p>
<ul>
<li><p>"abstract"</p></li>
<li><p>"hash"</p></li>
<li><p>"history"</p></li>
</ul>
<p>在不支持 <code>history.pushState</code> 的浏览器中, 路由器会自动回退为 <code>hash</code> 模式.</p>
<p>下列方法已经作废：</p>
<ul>
<li><p><code>router.map</code> (被 <code>routes</code> 选项取代)</p></li>
<li><p><code>router.beforeEach</code> (被 <code>beforeEach</code> 选项取代，不过 beta2中有修改，见下面)</p></li>
<li><p><code>router.afterEach</code> (被 <code>afterEach</code> 选项取代，不过 beta2中有修改，见下面)</p></li>
<li><p><code>router.redirect</code> (现在可以在 <code>routes</code> 中直接声明, 参见 <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/redirect/app.js#L13-L39" rel="nofollow noreferrer" target="_blank">Example</a>)</p></li>
<li><p><code>router.alias</code> (现在可以在 <code>routes</code> 配置中直接声明, 参见 <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/route-alias/app.js#L11-L26" rel="nofollow noreferrer" target="_blank">Example</a>)</p></li>
</ul>
<p>Beta 2 中，<code>beforeEach</code> 和 <code>afterEach</code> 又被改回成为 <code>router</code>的实例方法。作者说是这可以让插件和模块更加方便的在<code>router</code>实例创建后增加hooks。</p>
<h2 id="articleHeader2">导航钩子函数</h2>
<p>钩子系统被极大简化，所有0.7的迁移钩子都作废了，下面是替代方案：</p>
<ul>
<li><p>使用组件自身的生命周期钩子函数来替代<code>activate</code> 和 <code>deactivate</code></p></li>
<li><p>在<code>$router</code> 上使用 <code>watcher</code> 来响应路由改变 (e.g. 比如基于新的路由参数获取数据 - <a href="https://github.com/vuejs/vue-router/tree/next/examples/data-fetching" rel="nofollow noreferrer" target="_blank">Example</a>)</p></li>
<li><p><code>canActivate</code> 可以被router 的配置中的 <code>beforeEnter</code> 中实现 <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/navigation-guards/app.js#L49" rel="nofollow noreferrer" target="_blank">Example</a></p></li>
<li><p><code>canDeactivate</code> 已经被 <code>beforeRouteLeave</code> 取代, 后者在一个组件的根级定义中指定。这个钩子函数在调用时是将组件的实例作为其上下文的。<a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/navigation-guards/app.js#L35-L38" rel="nofollow noreferrer" target="_blank">Example</a></p></li>
<li><p><code>canReuse</code> 已经被移除，因其容易混淆且很少被用到。</p></li>
</ul>
<p>此外，在2.0版本中所有的钩子函数都有相同简洁的签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="guard (toRoute, redirect, next) {
  // call redirect to redirect to another route
  // call next to confirm current route
  // or do nothing to cancel the navigation
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">guard (toRoute, redirect, next) {
  <span class="hljs-comment">// call redirect to redirect to another route</span>
  <span class="hljs-comment">// call next to confirm current route</span>
  <span class="hljs-comment">// or do nothing to cancel the navigation</span>
}</code></pre>
<p>这些函数也不再支持返回 Promises.</p>
<h2 id="articleHeader3">链接（Links）</h2>
<p><code>v-link</code> 指令已经被 <code>&lt;router-link&gt;</code> 组件替代. 这个组件接受以下属性参数:</p>
<ul>
<li><p><code>to</code>: 一个路径字符串, 或者一个 <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/flow/declarations.js#L50-L57" rel="nofollow noreferrer" target="_blank">Location Descriptor</a> 对象.</p></li>
<li><p><code>tag</code>: 渲染为的 html 元素类型，默认是<code>&lt;a&gt;</code>.</p></li>
<li><p><code>exact</code>: 用于控制当前激活项的匹配行为（严格匹配或者贪婪匹配）.</p></li>
<li><p><code>append</code>: 控制相对链接路径的追加方式</p></li>
<li><p><code>replace</code>: 替代而不是作为历史条目压榨你</p></li>
<li><p><code>active-class</code>: 当链接项激活时增加的 CSS 样式</p></li>
</ul>
<p>这里有个 <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/active-links/app.js#L34-L68" rel="nofollow noreferrer" target="_blank">复杂的例子</a> 展示了<code>&lt;router-link&gt;</code>的用法。</p>
<h2 id="articleHeader4">命名视图 (Named Views)</h2>
<p>单个路由现在可以映射到多个命名组件。这些组件将会在渲染在对应命名的多个 <code>&lt;router-view&gt;</code>中. <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/named-views/app.js" rel="nofollow noreferrer" target="_blank">Example</a><br>(译者注）这个功能很赞，提供了一种新的用多个组件组成页面结构的方法，同时又不增加组件之间的耦合。</p>
<h2 id="articleHeader5">滚动行为（Scroll Behavior）</h2>
<p><code>scrollBehavior</code> 选项接受一个函数，返回在路由导航时控制页面如何滚动的规则。你可以代码控制是否要滚动的页面顶部、书签或者在状态中保存的位置。 <a href="https://github.com/vuejs/vue-router/blob/43183911dedfbb30ebacccf2d76ced74d998448a/examples/scroll-behavior/app.js#L18-L38" rel="nofollow noreferrer" target="_blank">Example</a></p>
<p>Beta2 版本中又对 <code>scrollBehavior</code> 做了修改:</p>
<p>beta.1 中返回 <code>{ hash: true }</code> 来滚动到文档中的一个锚点，现在返回的是 <code>{ selector: route.hash }</code>。这也同时意味着你可以返回任意的 CSS 选择器，来匹配成要滚动到的目标。</p>
<p>此外，你还可以返回<code>{ selector: '...', x: 0, y: 0 }</code>，这会让路由器首先尝试滚动到匹配的元素，如果没有找到匹配元素，那就滚动到 <code>x</code>和<code>y</code>指定的位置。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-router 2.0 改变的内容

## 原文链接
[https://segmentfault.com/a/1190000006623100](https://segmentfault.com/a/1190000006623100)

