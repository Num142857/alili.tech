---
title: '你应该要知道的Vue.js' 
date: 2018-12-09 2:30:08
hidden: true
slug: agq3ugm4mo
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://github.com/Alvin-Liu/Blog/issues/13" rel="nofollow noreferrer" target="_blank">你应该要知道的Vue.js</a></p>
<h3 id="articleHeader0">组件data为什么必须是函数？</h3>
<p>因为组件可能被多处使用，但他们的data是私有的，所以每个组件都要return一个新的data对象</p>
<h3 id="articleHeader1">组件通信</h3>
<ul>
<li>父子组件通信：<code>$on</code>、<code>$emit</code>
</li>
<li>非父子组件的通信: event bus</li>
<li>复杂情况： vuex</li>
</ul>
<h3 id="articleHeader2">怎么动态添加组件</h3>
<p>场景：在vue中，点击button，随机生成a、b、c组件中的一个</p>
<ul>
<li><code>is</code></li>
<li><code>render</code></li>
</ul>
<p>思路：设定一个components数组，button点击一次，push一个组件名，<code>v-for</code>遍历components，并用<code>is</code>或<code>render</code>动态生成</p>
<h3 id="articleHeader3">vue-loader是什么？</h3>
<p>vue-loader 是一个 webpack 的 loader，可以将单文件组件转换为 JavaScript 模块</p>
<p>引用文档的说法：</p>
<ul>
<li>默认支持 <code>ES2015</code>；</li>
<li>允许对 Vue 组件的组成部分使用其它 <code>webpack loader</code>，比如对 <code>&lt;style&gt;</code> 使用 <code>Sass</code> 和对 <code>&lt;template&gt;</code> 使用 <code>Jade</code>；</li>
<li>
<code>.vue</code> 文件中允许自定义节点，然后使用自定义的 loader 进行处理；</li>
<li>把 <code>&lt;style&gt;</code> 和 <code>&lt;template&gt;</code> 中的静态资源当作模块来对待，并使用 <code>webpack loader</code> 进行处理；</li>
<li>对每个组件模拟出 CSS 作用域；</li>
<li>支持开发期组件的热重载。</li>
</ul>
<h3 id="articleHeader4">数据双向绑定原理</h3>
<p>实现数据绑定的常见做法：</p>
<ul>
<li>
<code>Object.defineProperty</code>：劫持各个属性的<code>setter</code>，<code>getter</code>
</li>
<li>脏值检测：通过特定事件进行轮循</li>
<li>发布/订阅模式：通过消息发布并将消息进行订阅</li>
</ul>
<p>vue采用的是数据劫持结合发布者-订阅者模式的方式，通过<code>Object.defineProperty()</code>来实现对属性的劫持，并在数据变动时发布消息给订阅者，使其触发相应的监听回调。</p>
<p>具体步骤：</p>
<p>1、 实现Observer</p>
<p>将需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上<code>setter</code>和<code>getter</code>。实现一个消息订阅器，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法</p>
<p>2、 实现Compile</p>
<p>compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图</p>
<p>3、 实现Watcher</p>
<p>Watcher订阅者是Observer和Compile之间通信的桥梁</p>
<p>主要做的事情是:</p>
<ul>
<li>在自身实例化时往属性订阅器(dep)里面添加自己</li>
<li>自身必须有一个update()方法</li>
<li>待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。</li>
</ul>
<p>4、 实现MVVM</p>
<p>MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据model变更的双向绑定效果</p>
<p>参考：<a href="https://segmentfault.com/a/1190000006599500#articleHeader4">剖析Vue原理&amp;实现双向绑定MVVM</a></p>
<h3 id="articleHeader5">对Vue.js的template编译的理解</h3>
<p>template会被编译成AST语法树，AST会经过generate得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点</p>
<h3 id="articleHeader6">vue 为什么采用<code>Virtual DOM</code>？</h3>
<p>一方面是出于性能方面的考量：</p>
<ul>
<li>创建真实DOM的代价高：真实的 DOM 节点 node 实现的属性很多，而 vnode 仅仅实现一些必要的属性，相比起来，创建一个 vnode 的成本比较低。</li>
<li>触发多次浏览器重绘及回流：使用 vnode ，相当于加了一个缓冲，让一次数据变动所带来的所有 node 变化，先在 vnode 中进行修改，然后 diff 之后对所有产生差异的节点集中一次对 DOM tree 进行修改，以减少浏览器的重绘及回流</li>
</ul>
<p>但是性能受场景的影响是非常大的，不同的场景可能造成不同实现方案之间成倍的性能差距，所以依赖细粒度绑定及 <code>Virtual DOM</code>哪个的性能更好不是一个容易下定论的问题。更重要的原因是为了解耦<code>HTML</code>依赖，这带来两个非常重要的好处是：</p>
<ul>
<li>不再依赖 HTML 解析器进行模版解析，可以进行更多的 AOT 工作提高运行时效率：通过模版 AOT 编译，Vue 的运行时体积可以进一步压缩，运行时效率可以进一步提升；</li>
<li>可以渲染到 DOM 以外的平台，实现 SSR、同构渲染这些高级特性，Weex 等框架应用的就是这一特性。</li>
</ul>
<p>综上，<code>Virtual DOM</code> 在性能上的收益并不是最主要的，更重要的是它使得 Vue 具备了现代框架应有的高级特性。</p>
<h3 id="articleHeader7">vue 和 react 区别</h3>
<p>相同点:</p>
<ul>
<li>都支持<code>SSR</code>
</li>
<li>都有<code>Virtual DOM</code>
</li>
<li>组件化开发</li>
<li>数据驱动</li>
<li>...</li>
</ul>
<p>不同点:</p>
<ul>
<li>vue推荐的是使用 webpack + vue-loader 的单文件组件格式，React 推荐的做法是 JSX + inline style</li>
<li>vue 的<code>Virtual DOM</code>是追踪每个组件的依赖关系，不会渲染整个组件树，react 每当应该状态被改变时，全部子组件都会 re-render</li>
<li>...</li>
</ul>
<p>更多内容待更新...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你应该要知道的Vue.js

## 原文链接
[https://segmentfault.com/a/1190000013913788](https://segmentfault.com/a/1190000013913788)

