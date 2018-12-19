---
title: '个人 vue 项目的优化总结' 
date: 2018-12-20 2:30:10
hidden: true
slug: tzqevgeee6
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>主要说的是，我在项目中，自己遇到的一些小问题和解决方案</blockquote>
<h2 id="articleHeader0">图片 base64 问题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 有一个 test 的组件
<template>
  <div class='icon'></div>
</template>
<style>
  .icon {
    background: url(../assets/test.png);
  }
</style>

// 然后有三个页面，引入了 test 组件
// h1.vue, h2.vue, h3.vue 分别都引入 test 组件
<template>
  <test></test>
</template>
<script>
import test from '@/components/test.vue'
// ...
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 有一个 test 的组件
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'icon'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.icon</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(../assets/test.png);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

// 然后有三个页面，引入了 test 组件
// h1.vue, h2.vue, h3.vue 分别都引入 test 组件
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">test</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">test</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/test.vue'</span>
<span class="hljs-comment">// ...</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>第一次打包文件之后，三个页面的 js 文件，都会出现相同的一个 base64 图片</p>
<p><span class="img-wrap"><img data-src="http://oxnbdd4i9.bkt.clouddn.com/vueOptimizationpic1.jpg" src="https://static.alili.techhttp://oxnbdd4i9.bkt.clouddn.com/vueOptimizationpic1.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>后面第二次打包使用 <code>import</code> 进行引用，或者直接在标签写死，就不会出现上面这种情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import a from 'a.jpg'
<div style='backgroundImage: url(a.jpg)'></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> a <span class="hljs-keyword">from</span> <span class="hljs-string">'a.jpg'</span>
&lt;div style=<span class="hljs-string">'backgroundImage: url(a.jpg)'</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h2 id="articleHeader1">使用 keep-alive</h2>
<p>使用 <code>keep-alive</code> 对某些页面进行缓存</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.vue
<keep-alive :include=&quot;['a', 'b', 'c']&quot;>
  <router-view></router-view>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// app.vue</span>
&lt;<span class="hljs-keyword">keep</span>-alive :<span class="hljs-keyword">include</span>=<span class="hljs-string">"['a', 'b', 'c']"</span>&gt;
  &lt;router-<span class="hljs-keyword">view</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;/<span class="hljs-keyword">keep</span>-alive&gt;</code></pre>
<p>在 <code>router-view</code> 父级，加上一层 <code>keep-alive</code>，再使用 <code>include</code> ，告诉 vue 有哪些页面需要缓存，就行了。</p>
<p>其中 a, b, c 是 <code>.vue</code> 文件的 <code>name</code> 属性值</p>
<p><code>keep-alive</code> 标签，支持两个属性</p>
<ul>
<li>include: 只有匹配的组件会被缓存</li>
<li>exclude: 任何匹配的组件都不会被缓存</li>
</ul>
<p>会被缓存的页面（其实就是一个 vue 组件），离开时，vue 会在内部缓存当前组件的状态，下次再次进入这个页面，就会显示离开时的状态</p>
<p>如果有些需求，需要你在特定得状态下，才需要缓存，而在其他时间，进入页面都是保持最初的状态时，我们可以使用 vue 的一个方法，去销毁该组件，达到刷新的效果</p>
<p>在 <code>activated</code> 或 <code>deactivated</code> 钩子函数事件中，使用 <code>this.$destroy()</code> 这个方法进行销毁组件</p>
<p>使用 keepa-alive 的好处，缓存组件，的确是很好，我在项目体验中，更重要是缓存页面离开时的状态，这个真得非常棒。</p>
<p>比如我在一个支付页面，有 M 种状态，然后要用户去另外一个页面去设置密码后，才能支付（特定需求），这时不能用一个遮罩去挡住，而是真正得跳转另一个页面，然后用户在另外一个页面操作完后，跳回去支付页面，此时支付页面还是维持离开时的状态，大大减少了很多工作（可以用 vuex 实现此效果，不过有点麻烦）</p>
<p>而且配上钩子函数和 $destroy 销毁组件的方法，可以处理好各种情况</p>
<p><strong>2018.01.15 更新</strong></p>
<p>使用 $destroy 对组件进行销毁，会有个 BUG。</p>
<p>有三个页面 A，B，C。B 页面是要进行缓存的。B 页面，配置了 keep-alive</p>
<p>A -&gt; B</p>
<p>B -&gt; C（B 到 C 要进行缓存，所以不销毁）</p>
<p>C -&gt; B  (B 维持跳去 C 时的状态)</p>
<p>B -&gt; A (不缓存)</p>
<p>A -&gt; B</p>
<p>B -&gt; C（B 到 C 要进行缓存，所以不销毁）</p>
<p>C -&gt; B  (这时候就会出问题了！，会触发 activated 和 created 两个钩子函数。在 vue 的 issue 中有人提出过这个问题，尤大也说了不支持。这里是链接)</p>
<p>解决方案：</p>
<p>我现在是把页面加进去 keep-alive 里面，然后离开时，判断下次进入要不要刷新页面。如果要刷新页面，手动把 state 更新…..超级麻烦，不优雅</p>
<p><strong>2018.01.17 更新</strong></p>
<p>有一个新的解决方案，动态的修改 include，达到更新的效果</p>
<p>比如，t1 组件是要缓存的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive :include='array'>
  <router-view></router-view>
</keep-alive>
// ...
watch: {
  $route(to) {
    if (to.name === 't1') {
      this.array = 't1'
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>&lt;keep-<span class="hljs-built_in">alive</span> :include=<span class="hljs-string">'array'</span>&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/keep-<span class="hljs-built_in">alive</span>&gt;
<span class="hljs-comment">// ...</span>
watch: {
  $route(<span class="hljs-keyword">to</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.<span class="hljs-built_in">name</span> === <span class="hljs-string">'t1'</span>) {
      this.array = <span class="hljs-string">'t1'</span>
    }
  }
}
</code></pre>
<p>每次要去到 t1 页面，对页面设置为缓存。然后在 t1 页面要跳去其他页面时候，判断是否需要缓存页面，如果不需要，修改 array 这个值。而这个 array 值，应该存在 vuex 中，这样可以更好地处理它</p>
<h2 id="articleHeader2">代码分割</h2>
<p>在 <code>router.js</code> 文件里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ path: '/home', component: resolve => require(['@/module/home'], resolve) },
{ path: '/h1', component: resolve => require(['@/module/h1'], resolve) },
{ path: '/h2', component: resolve => require(['@/module/h2'], resolve) }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{ <span class="hljs-attribute">path</span>: <span class="hljs-string">'/home'</span>, component: resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/module/home'</span>], resolve) },
{ <span class="hljs-attribute">path</span>: <span class="hljs-string">'/h1'</span>, component: resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/module/h1'</span>], resolve) },
{ <span class="hljs-attribute">path</span>: <span class="hljs-string">'/h2'</span>, component: resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/module/h2'</span>], resolve) }</code></pre>
<p>这里使用了 <code>vue-router</code> 的懒加载，结合 webpack 的代码分割，将代码按页面进行分割，达到懒加载效果。进入某个页面，会按需加载 js 文件，有效地降低首屏文件大小</p>
<p>但这里有个问题，如果某页面的 js 文件很大，用户在跳转页面时，会出现暂时性的白屏或者无法点击的情况，影响用户体验</p>
<p>这里我觉得就要根据项目情况去考虑了。在某个项目中，有5个页面是没用代码分割的，而这5个页面，浏览数会比较多，并且文件的大小相对会比较大。所以取消使用了代码分隔后，当用户首次点入这几个页面，就不会出现延迟的情况</p>
<p>当你这个页面使用了很多 icon ，经过 base64 转换后，这个 js 文件也会相对很大，是否不应该在页面的 js 文件出现 base64 ?提前把 base64 的图片加载了？</p>
<p>上面的操作都是为了提高用户的体验，这个要看情况而定了</p>
<p>使用代码分割，文件的大小，会稍微比不用的时候大一点</p>
<h2 id="articleHeader3">优化依赖文件</h2>
<p>当我们 <code>npm run build</code> 后，通常可以看到一个依赖文件，有好几百 KB，甚至 1、2MB 大，而这个文件是所有依赖文件的集合，像 <code>vue.js, vue-router.js, axios.js, mint-ui.js</code> 等</p>
<p>这里我们可以使用 webpack 的 <code>externals</code> 进行优化，webpack 文档是这样说 <code>externals</code>: "防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖"</p>
<p><code>externals</code> 其实很多大神的优化贴都有写了，根据自己得体验，这里只是简单得说明</p>
<p>我们在 <code>index.html</code> 引入两个 js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//cdn.bootcss.com/vue/2.2.2/vue.min.js&quot;></script>
<script src='//cdn.bootcss.com/mint-ui/2.2.3/index.js'></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/vue/2.2.2/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'//cdn.bootcss.com/mint-ui/2.2.3/index.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 <code>webpack.base.conf.js</code> 里，添加一代代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: {
  'vue': 'Vue',
  'mint-ui': 'MINT'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">externals:</span> {
  <span class="hljs-string">'vue'</span>: <span class="hljs-string">'Vue'</span>,
  <span class="hljs-string">'mint-ui'</span>: <span class="hljs-string">'MINT'</span>
}</code></pre>
<p>这样就能无缝切换，使用 cdn 去加载比较大的依赖文件，减少打包后的 bundle 文件大小</p>
<h3 id="articleHeader4">打包文件大小对比</h3>
<p>没有使用 externals 的情况， vendor.js 文件是 307KB</p>
<p><span class="img-wrap"><img data-src="http://oxnbdd4i9.bkt.clouddn.com/vueOptimizationpic3.jpg" src="https://static.alili.techhttp://oxnbdd4i9.bkt.clouddn.com/vueOptimizationpic3.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>使用 externals 的情况， vendor.js 文件是 107KB</p>
<p><span class="img-wrap"><img data-src="http://oxnbdd4i9.bkt.clouddn.com/vueOptimizationpic4.jpg" src="https://static.alili.techhttp://oxnbdd4i9.bkt.clouddn.com/vueOptimizationpic4.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里面是去掉了 vue 和 mint-ui 两个 js 文件，而这两个 js 文件通过外链 cdn 进行引用，两个 js 文件大约都是 31KB 左右，这里面节省了 140KB 左右的大小</p>
<p>这样做，虽然加多了 HTTP 请求，但是不会影响并发的数量，而且大大减少了单个文件的大小，性能更好</p>
<p>在 ngrok 里运行时，会运行得更快（测试过）</p>
<h2 id="articleHeader5">使用 v-once</h2>
<p>在 vue 文档中，是这样提示的：对低开销的静态组件使用 v-once</p>
<p>使用了 v-once ，除了第一次的渲染，后面就不会再次渲染了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-once>"{{" a "}}"</div>

<script>
// ...
data() {
  return {
    a: 1
  }
},
created() {
  this.a = 2
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> v-once&gt;"{{" <span class="hljs-selector-tag">a</span> "}}"&lt;/div&gt;

&lt;script&gt;
<span class="hljs-comment">// ...</span>
<span class="hljs-function"><span class="hljs-title">data</span><span class="hljs-params">()</span></span> {
  return {
    <span class="hljs-selector-tag">a</span>: <span class="hljs-number">1</span>
  }
},
<span class="hljs-function"><span class="hljs-title">created</span><span class="hljs-params">()</span></span> {
  this<span class="hljs-selector-class">.a</span> = <span class="hljs-number">2</span>
}
&lt;/script&gt;</code></pre>
<p>最后 div 还是显示 1。这可以用于优化更新性能</p>
<h2 id="articleHeader6">总结</h2>
<p>以上的一些问题，在 PC 端好像影响不大，移动端的话，还是比较严重的。很多优化点都是根据实际情况入手，上面这几个，都是我在做项目时，感觉不合适而进行优化的，后面会持续补充下去~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
个人 vue 项目的优化总结

## 原文链接
[https://segmentfault.com/a/1190000012631049](https://segmentfault.com/a/1190000012631049)

