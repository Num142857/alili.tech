---
title: 'Vue-router2.0学习笔记' 
date: 2019-01-29 2:30:10
hidden: true
slug: 80g0y66qpow
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue.js的一大特色就是构建单页面应用十分方便，既然要方便构建单页面应用那么自然少不了路由，vue-router就是vue官方提供的一个路由框架。总体来说，vue-router设计得简单好用，下面就来聊聊我实际用到过的一些方法，文章没有提到的可以去查看<a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">官方文档</a>。vue-router的安装这里就不提了，相信会来看这篇博客同学，这些基本能力都是有的。</p>
<h1 id="articleHeader0">先上例子</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html部分，省略head -->
<div id=&quot;app&quot;>
    <div class=&quot;content&quot;>
        <router-link to=&quot;/goods&quot;>商品</router-link>
        <router-link to=&quot;/ratings&quot;>评论</router-link>
        <router-link to=&quot;/seller&quot;>商家</router-link>
    </div>
    <router-view></router-view>
</div>
<script src=&quot;path-to-vue&quot;></script>
<script src=&quot;path-to-vue-router&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html部分，省略head --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/goods"</span>&gt;</span>商品<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/ratings"</span>&gt;</span>评论<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/seller"</span>&gt;</span>商家<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path-to-vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"path-to-vue-router"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首先定义或者引入路由的组件
// 方法一：直接定义路由组件
const goods = { template: '<p>goods</p>' };
const ratings = { template: '<p>ratings</p>' };
const seller = { template: '<p>seller</p>' };
// 方法二：import引入路由组件
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
// 然后定义路由(routes)，components还可以是Vue.extend()创建的
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];
// 接着创建路由实例
const router = new VueRouter({
  // ES6缩写语法，相当于routes:routes
  routes  
});
// 最后创建vue实例并挂载
const app = new Vue({
  el: '#app',
  router
});
// 或者
const app = new Vue({
  router
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 首先定义或者引入路由的组件</span>
<span class="hljs-comment">// 方法一：直接定义路由组件</span>
<span class="hljs-keyword">const</span> goods = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;goods&lt;/p&gt;'</span> };
<span class="hljs-keyword">const</span> ratings = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;ratings&lt;/p&gt;'</span> };
<span class="hljs-keyword">const</span> seller = { <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p&gt;seller&lt;/p&gt;'</span> };
<span class="hljs-comment">// 方法二：import引入路由组件</span>
<span class="hljs-keyword">import</span> goods <span class="hljs-keyword">from</span> <span class="hljs-string">'components/goods/goods'</span>;
<span class="hljs-keyword">import</span> ratings <span class="hljs-keyword">from</span> <span class="hljs-string">'components/ratings/ratings'</span>;
<span class="hljs-keyword">import</span> seller <span class="hljs-keyword">from</span> <span class="hljs-string">'components/seller/seller'</span>;
<span class="hljs-comment">// 然后定义路由(routes)，components还可以是Vue.extend()创建的</span>
<span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/goods'</span>, <span class="hljs-attr">component</span>: goods },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/ratings'</span>, <span class="hljs-attr">component</span>: ratings },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/seller'</span>, <span class="hljs-attr">component</span>: seller }
];
<span class="hljs-comment">// 接着创建路由实例</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-comment">// ES6缩写语法，相当于routes:routes</span>
  routes  
});
<span class="hljs-comment">// 最后创建vue实例并挂载</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router
});
<span class="hljs-comment">// 或者</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  router
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>到这里就可以用vue-router轻松搭建一个单页面应用了。我一般都是使用模块化编程的形式，用.vue单文件，不知道在模块化编程里怎么加载vue-router的可以参考我的<a href="https://github.com/hieeyh/tong2-family" rel="nofollow noreferrer" target="_blank">某个项目源码</a>。</p>
<h1 id="articleHeader1">router-link和router-view</h1>
<p>看了上面的例子，一定对router-link和router-view很感兴趣。</p>
<h2 id="articleHeader2">router-link</h2>
<p>从上面例子中的书写形式就可以看出，router-link是一个组件，它默认会被渲染成一个带有链接的a标签，通过to属性指定链接地址。<br><strong>注意</strong>：被选中的router-link将自动添加一个class属性值<code>.router-link-active</code>。</p>
<h3 id="articleHeader3">router-link属性配置</h3>
<h4>to</h4>
<p>这是一个必须设置的属性，否则路由无法生效。它表示路由的链接，可以是一个字符串也可以是一个描述目标位置的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;goods&quot;></router-link>
<router-link to=&quot;{path='goods'}&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"goods"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"{path='goods'}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h4>replace</h4>
<p>一个布尔类型，默认为false。如果replace设置为true，那么导航不会留下history记录，点击浏览器回退按钮不会再回到这个路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;goods&quot; replace></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"goods"</span> <span class="hljs-attr">replace</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h4>tag</h4>
<p>router-link默认渲染成a标签，也有方法让它渲染成其他标签，tag属性就用来设置router-link渲染成什么标签的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 渲染成li标签 -->
<router-link to=&quot;goods&quot; tag=&quot;li&quot;></router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 渲染成li标签 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"goods"</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"li"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h4>active-class</h4>
<p>上面说了被选中的router-link将自动添加一个class属性值<code>.router-link-active</code>，这个属性就是来修改这个class值的。</p>
<h2 id="articleHeader4">router-view</h2>
<p>这个组件十分关键，它就是用来渲染匹配到的路由的。     <br>可以给router-view组件设置transition过渡，具体用法见<a href="http://hyuhan.com/2016/12/08/vue-transition/" rel="nofollow noreferrer" target="_blank">Vue2.0 Transition常见用法全解惑</a>。    <br>还可以配合<code>&lt;keep-alive&gt;</code>使用，keep-alive可以缓存数据，这样不至于重新渲染路由组件的时候，之前那个路由组件的数据被清除了。比如对当前的路由组件a进行了一些DOM操作之后，点击进入另一个路由组件b，再回到路由组件a的时候之前的DOM操作还保存在，如果不加keep-alive再回到路由组件a时，之前的DOM操作就没有了，得重新进行。如果你的应用里有一个购物车组件，就需要用到keep-alive。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<h1 id="articleHeader5">一些小需求怎么实现</h1>
<h2 id="articleHeader6">不同路由不同页面标题</h2>
<p>多页面应用我们可以给每一个页面都设置一个不同的标题，但是如果是单页面应用的路由呢？其实也是可以实现的，实现的方法不止一种，我之前用的是结合命名路由和导航钩子函数的方法。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义路由的时候如下定义，name也可为中文
const routes = [
  { path: '/goods', component: goods, name: 'goods' },
  { path: '/ratings', component: ratings, name: 'ratings' },
  { path: '/seller', component: seller, name: 'seller' }
];
// 创建路由实例
const router = new VueRouter({
  routes: routes
})
// 关键在这里，设置afterEach钩子函数
router.afterEach((to, from, next) => {
  document.title = to.name;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义路由的时候如下定义，name也可为中文</span>
<span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/goods'</span>, <span class="hljs-attr">component</span>: goods, <span class="hljs-attr">name</span>: <span class="hljs-string">'goods'</span> },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/ratings'</span>, <span class="hljs-attr">component</span>: ratings, <span class="hljs-attr">name</span>: <span class="hljs-string">'ratings'</span> },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/seller'</span>, <span class="hljs-attr">component</span>: seller, <span class="hljs-attr">name</span>: <span class="hljs-string">'seller'</span> }
];
<span class="hljs-comment">// 创建路由实例</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: routes
})
<span class="hljs-comment">// 关键在这里，设置afterEach钩子函数</span>
router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-built_in">document</span>.title = to.name;
})</code></pre>
<h3 id="articleHeader7">命名路由</h3>
<p>既然用到了命名路由，这里就提一下吧。命名路由就是用一个名称来标识一个路由，在定义路由的时候设置一个name属性即可。在router-link中也可以用路由的名字来链接到一个路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{ name: 'seller'}&quot;>seller</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{ name: 'seller'}"</span>&gt;</span>seller<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h3 id="articleHeader8">导航钩子</h3>
<p>这个我还没怎么用过，它主要是用来拦截导航的，想使用的参考<a href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">官方文档</a>吧。</p>
<h2 id="articleHeader9">怎么刚进入应用就渲染某个路由组件</h2>
<p>刚进入应用都是进入到“/”这个路由的，如果想直接进入到“/goods”怎么办，这里提供两种方法。一种是利用重定向，另一种是利用vue-router的导航式编程。</p>
<h3 id="articleHeader10">重定向</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
  { path: '/', redirect: '/goods'}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/goods'</span>}
]</code></pre>
<p>是不是很简单呢？重定向的目标也可以是一个命名的路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
  { path: '/', redirect: { name: 'goods' "}}"
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">redirect</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'goods'</span> "}}"
]
</code></pre>
<h3 id="articleHeader11">导航式编程</h3>
<p>利用vue-router的导航式编程的router.push方法也可以实现上面的需求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在创建vue实例并挂载后调用
router.push('/goods')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在创建vue实例并挂载后调用</span>
router.push(<span class="hljs-string">'/goods'</span>)</code></pre>
<p>router.push方法就是用来动态导航到不同的链接的。它会向history栈添加一个新的记录，点击<code>&lt;router-link :to="..."&gt;</code>等同于调用router.push(...)。</p>
<p>vue-router中还有router.replace方法和router.go方法，概念及用法可参考<a href="https://router.vuejs.org/zh-cn/essentials/navigation.html" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh-cn/essentials/navigation.html</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-router2.0学习笔记

## 原文链接
[https://segmentfault.com/a/1190000007825106](https://segmentfault.com/a/1190000007825106)

