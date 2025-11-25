---
title: '浅谈 Vue 项目优化' 
date: 2019-01-14 2:30:07
hidden: true
slug: xzozfyh86s
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009443369?w=1280&amp;h=720" src="https://static.alili.tech/img/remote/1460000009443369?w=1280&amp;h=720" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>好久不写博文了，本文作为我使用半年 vue 框架的经验小结，随便谈谈，且本文只适用于 vue-cli 初始化的项目或依赖于 webpack 打包的项目。</p>
<p>前几天看到大家说 vue 项目越大越难优化，带来很多痛苦，这是避免不了的，问题终究要解决，框架的性能是没有问题的，各大测试网站都有相关数据。下面进入正题</p>
<h2 id="articleHeader0">基础优化</h2>
<p>所谓的基础优化是任何 web 项目都要做的，并且是问题的根源。HTML，CSS，JS 是第一步要优化的点</p>
<p>分别对应到 .vue 文件内的，<code>&lt;template&gt;,&lt;style&gt;,&lt;script&gt;</code>，下面逐个谈下 vue 项目里都有哪些值得优化的点</p>
<h3 id="articleHeader1">template</h3>
<p>语义化标签，避免乱嵌套，合理命名属性等等标准推荐的东西就不谈了。</p>
<p>模板部分帮助我们展示结构化数据，vue 通过数据驱动视图，主要注意一下几点</p>
<ul>
<li>v-show，v-if 用哪个？在我来看要分两个维度去思考问题，第一个维度是权限问题，只要涉及到权限相关的展示无疑要用 <code>v-if</code>，第二个维度在没有权限限制下根据用户点击的频次选择，频繁切换的使用 <code>v-show</code>，不频繁切换的使用 <code>v-if</code>，这里要说的优化点在于减少页面中 dom 总数，我比较倾向于使用 <code>v-if</code>，因为减少了 dom 数量，加快首屏渲染，至于性能方面我感觉肉眼看不出来切换的渲染过程，也不会影响用户的体验。</li>
<li>不要在模板里面写过多的表达式与判断 <code>v-if="isShow &amp;&amp; isAdmin &amp;&amp; (a || b)"</code>，这种表达式虽说可以识别，但是不是长久之计，当看着不舒服时，适当的写到 methods 和 computed 里面封装成一个方法，这样的好处是方便我们在多处判断相同的表达式，其他权限相同的元素再判断展示的时候调用同一个方法即可。</li>
<li>循环调用子组件时添加 key，key 可以唯一标识一个循环个体，可以使用例如 <code>item.id</code> 作为 key，假如数组数据是这样的 <code>['a' , 'b', 'c', 'a']</code>,使用 <code>:key="item"</code> 显然没有意义，更好的办法就是在循环的时候 <code>(item, index) in arr</code>，然后 <code>:key="index"</code>来确保 key 的唯一性。</li>
</ul>
<h3 id="articleHeader2">style</h3>
<ul>
<li>将样式文件放在 vue 文件内还是外？讨论起来没有意义，重点是按模块划分，我的习惯是放在 vue 文件内部，方便写代码是在同一个文件里跳转上下对照，无论内外建议加上 <code>&lt;style scoped&gt;</code> 将样式文件锁住，目的很简单，再好用的标准也避免不了多人开发的麻烦，约定命名规则也可能会冲突，锁定区域后尽量采用简短的命名规则，不需要 <code>.header-title__text</code> 之类的 class，直接 <code>.title</code> 搞定。</li>
<li>为了和上一条作区分，说下全局的样式文件，全局的样式文件，尽量抽象化，既然不在每一个组件里重复写，就尽量通用，这部分抽象做的越好说明你的样式文件体积越小，复用率越高。建议将复写组件库如 Element 样式的代码也放到全局中去。</li>
<li>不使用 float 布局，之前看到很多人封装了 <code>.fl -- float: left</code> 到全局文件里去，然后又要 <code>.clear</code>，现在的浏览器还不至于弱到非要用 <code>float</code> 去兼容，完全可以 flex，grid 兼容性一般，功能其实 flex 布局都可以实现，float 会带来布局上的麻烦，用过的都知道不相信解释坑了。</li>
</ul>
<p>至于其他通用的规范这里不赘述，相关文章很多。</p>
<h3 id="articleHeader3">script</h3>
<p>这部分也是最难优化的点，说下个人意见吧。</p>
<ul>
<li>多人开发时尽量保持每个组件 <code>export default {}</code> 内的方法顺序一致，方便查找对应的方法。我个人习惯 data、props、钩子、watch、computed、components。</li>
<li>data 里要说的就是初始化数据的结构尽量详细，命名清晰，简单易懂，避免无用的变量，isEditing 实际可以代表两个状态，true 或 false，不要再去定义 notEditing 来控制展示，完全可以在模板里 <code>"{{" isEditing ? 编辑中 : 保存 "}}"</code>
</li>
<li>props 父子组件传值时尽量 <code>:width="" :heigth=""</code> 不要 <code>:option={}</code>，细化的好处是只传需要修改的参数，在子组件 props 里加数据类型，是否必传，以及默认值，便于排查错误，让传值更严谨。</li>
<li>钩子理解好生命周期的含义就好，什么时间应该请求，什么时间注销方法，哪些方法需要注销。简单易懂，官网都有写。</li>
<li>metheds 中每一个方法一定要简单，只做一件事，尽量封装可复用的简短的方法，参数不易过多。如果十分依赖 lodash 开发，methed 看着会简洁许多，代价就是整体的 bundle 体积会大，假如项目仅仅用到小部分方法可以局部引入 loadsh，不想用 lodash 的话可以自己封装一个 util.js 文件</li>
<li>watch 和 computed 用哪个的问题看官网的例子，计算属性主要是做一层 filter 转换，切忌加一些调用方法进去，watch 的作用就是监听数据变化去改变数据或触发事件如 <code>this.$store.dispatch('update', { ... })</code>
</li>
</ul>
<h2 id="articleHeader4">组件优化</h2>
<p>vue 的组件化深受大家喜爱，到底组件拆到什么程度算是合理，还要因项目大小而异，小型项目可以简单几个组件搞定，甚至不用 vuex，axios 等等，如果规模较大就要细分组件，越细越好，包括布局的封装，按钮，表单，提示框，轮播等，推荐看下 Element 组件库的代码，没时间写这么详细可以直接用 Element 库，分几点进行优化</p>
<ul>
<li>组件有明确含义，只处理类似的业务。复用性越高越好，配置性越强越好。</li>
<li>自己封装组件还是遵循配置 props 细化的规则。</li>
<li>组件分类，我习惯性的按照三类划分，page、page-item 和 layout，page 是路由控制的部分，page-item 属于 page 里各个布局块如 banner、side 等等，layout 里放置多个页面至少出现两次的组件，如 icon, scrollTop 等</li>
</ul>
<h2 id="articleHeader5">vue-router 和 vuex 优化</h2>
<p>vue-router 除了切换路由，用的最多的是处理权限的逻辑，关于权限的控制这里不赘述，相关 demo 和文章有许多，那么说到优化，值得一提的就是<a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">组件懒加载</a></p>
<p>中文官网链接如上，例子如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Foo = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], () =&gt; r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./Foo.vue'</span>)), <span class="hljs-string">'group-foo'</span>)
<span class="hljs-keyword">const</span> Bar = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], () =&gt; r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./Bar.vue'</span>)), <span class="hljs-string">'group-foo'</span>)
<span class="hljs-keyword">const</span> Baz = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], () =&gt; r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'./Baz.vue'</span>)), <span class="hljs-string">'group-foo'</span>)</code></pre>
<p>这段代码将 Foo, Bar, Baz 三个组件打包进了名为 <code>group-foo</code> 的 chunk 文件，当然啦是 js 文件</p>
<p>其余部分正常写就可以，在网站加载时会自动解析需要加载哪个 chunk，虽然分别打包的总体积会变大，但是单看请求首屏速度的话，快了好多。</p>
<p>vuex 面临的问题和解决方案有几点</p>
<ul>
<li>当网站足够大时，一个状态树下，根的部分字段繁多，解决这个问题就要模块化 vuex，官网提供了<a href="https://vuex.vuejs.org/zh-cn/modules.html" rel="nofollow noreferrer" target="_blank">模块化方案</a>，允许我们在初始化 vuex 的时候配置 modules。每一个 module 里面又分别包含 state 、action 等，看似是多个状态树，其实还是基于 rootState 的子树。细分后整个 state 结构就清晰了，管理起来也方便许多。</li>
<li>由于 vuex 的灵活性，带来了编码不统一的情况，完整的闭环是 store.dispatch('action') -&gt; action -&gt; commit -&gt; mutation -&gt; getter -&gt; computed，实际上中间的环节有的可以省略，因为 API 文档提供了以下几个方法 mapState、mapGetters、mapActions、mapMutations，然后在组件里可以直接调取任何一步，还是项目小想怎么调用都可以，项目大的时候，就要考虑 vuex 使用的统一性，我的建议是不论多简单的流程都跑完整个闭环，形成代码的统一，方便后期管理，在我的组件里只允许出现 dispatch 和 mapGetters，其余的流程都在名为 store 的 vuex 文件夹里进行。</li>
<li>基于上面一条，说下每个过程里面要做什么，前后端数据一定会有不一致的地方，或是数据结构，或是字段命名，那么究竟应该在哪一步处理数据转换的逻辑呢？有人会说其实哪一步都可以实现，其实不然，我的建议如下</li>
</ul>
<ol>
<li>在发 dispatch 之前就处理好组件内需要传的参数的数据结构和字段名</li>
<li>到了 action 允许我们做的事情很多，因为这部支持异步，支持 state, rootState, commit, dispatch, getters，由此可见责任重大，首先如果后端需要部分其他 module 里面的数据，要通过 rootState 取值再整合到原有数据上，下一步发出请求,建议（async await + axios），拿到数据后进行筛选转换，再发送 commit 到 mutation</li>
<li>这一步是将转换后的数据更新到 state 里，可能会有数据分发的过程（传进一个 object 改变多个 state 中 key 的 value），可以转换数据结构，但是尽量不做字段转换，在上一步做</li>
<li>此时的 store 已经更新，使用 getter 方法来取值，<code>token: state =&gt; state.token</code>，单单的取值，尽量不要做数据转换，需要转换的点在于多个地方用相同的字段，但是结构不同的情况（很少出现）。</li>
<li>在组件里用 mapGetters 拿到对应的 getter 值。</li>
</ol>
<h2 id="articleHeader6">打包优化</h2>
<p>上面说了代码方面的规范和优化，下面说下重点的打包优化，前段时间打包的 vender bundle 足足 1.4M，app bundle 也有 270K，app bundle 可以通过组件懒加载解决，vender 包该怎么解决？</p>
<p>有人会质疑是不是没压缩或依赖包没去重，其实都做了就是看到的 1.4M。</p>
<p>解决方法很简单，打包 vender 时不打包 vue、vuex、vue-router、axios 等，换用国内的 <a href="http://www.bootcdn.cn/" rel="nofollow noreferrer" target="_blank">bootcdn</a> 直接引入到根目录的 index.html 中。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//cdn.bootcss.com/vue/2.2.5/vue.min.js&quot;></script>
<script src=&quot;//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js&quot;></script>
<script src=&quot;//cdn.bootcss.com/vuex/2.2.1/vuex.min.js&quot;></script>
<script src=&quot;//cdn.bootcss.com/axios/0.15.3/axios.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/2.2.5/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vuex/2.2.1/vuex.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/axios/0.15.3/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 webpack 里有个 externals，可以忽略不需要打包的库</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">externals: {
  <span class="hljs-string">'vue'</span>: <span class="hljs-string">'Vue'</span>,
  <span class="hljs-string">'vue-router'</span>: <span class="hljs-string">'VueRouter'</span>,
  <span class="hljs-string">'vuex'</span>: <span class="hljs-string">'Vuex'</span>,
  <span class="hljs-string">'axios'</span>: <span class="hljs-string">'axios'</span>
}</code></pre>
<p>此时的 vender 包会非常小，如果不够小还可以拆分其他的库，此时增加了请求的数量，但是远比加载一个 1.4M 的 bundle 快的多。</p>
<h2 id="articleHeader7">总结</h2>
<p>本文谈的优化可以解决部分性能问题，实际开发细节很多，总之按着规范写代码，团队的编码风格尽量统一，处理细节上多加思考，大部分性能问题都能迎刃而解。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈 Vue 项目优化

## 原文链接
[https://segmentfault.com/a/1190000009443366](https://segmentfault.com/a/1190000009443366)

