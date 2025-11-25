---
title: 'vue-router带你出坑' 
date: 2019-01-29 2:30:10
hidden: true
slug: f94c7ynxto
categories: [reprint]
---

{{< raw >}}

                    
<p>最近学习vue，关于vue-router看了3遍，才开始有了一些自己的理解，而且，对于初学者，我认为<br>vue-router的官方手册顺序并不适用，所以把自己认为重点的和难以理解的，还有学习顺序进行调整，希望对其他<br>初学者有所帮助，嗯，共同进步~</p>
<h3 id="articleHeader0">配置路由模式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({//创建路由实例
  mode: 'history',
  routes
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({<span class="hljs-comment">//创建路由实例</span>
  mode: <span class="hljs-string">'history'</span>,
  routes
})</code></pre>
<p>配置路由模式:</p>
<ul>
<li><p>hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。</p></li>
<li><p>history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式.</p></li>
<li><p>abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。</p></li>
</ul>
<h4>hash模式（默认）</h4>
<blockquote><p>使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。</p></blockquote>
<h4>history模式</h4>
<blockquote><p>通过history完成 URL 跳转而无须重新加载页面。</p></blockquote>
<p>因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 <a href="http://oursite.com/user/id" rel="nofollow noreferrer" target="_blank">http://oursite.com/user/id</a> 就会返回 404，这就不好看了。</p>
<p><strong>注意</strong>为了防止404错误，需要写notFound.html页面防止页面找不到发生错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attr">component</span>: NotFoundComponent }
  ]
})</code></pre>
<h3 id="articleHeader1">动态路由匹配</h3>
<p>当前有路径/foo，当你/foo/XXX，不管XXX是什么，你需要让他都显示某个组件component：A，或者<br>说路由到某一个页面，就需要使用动态路由配置</p>
<p><strong>复制代码查看效果</strong><a href="http://jsfiddle.net/yyx990803/4xfa2f19/" rel="nofollow noreferrer" target="_blank">在线测试地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yyx990803/4xfa2f19/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<script src=&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;></script>

<div id=&quot;app&quot;>
  <p>
    <router-link to=&quot;/user/foo&quot;>/user/foo</router-link>
    <router-link to=&quot;/user/bar&quot;>/user/bar</router-link>
    <router-link to=&quot;/user/aa&quot;>/user/aa</router-link>
    <router-link to=&quot;/user/bb&quot;>/user/bb</router-link>
  </p>
  <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue-router/dist/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/foo"</span>&gt;</span>/user/foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/bar"</span>&gt;</span>/user/bar<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/aa"</span>&gt;</span>/user/aa<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/user/bb"</span>&gt;</span>/user/bb<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = {
  template: `<div>你的ID是 "{{" $route.params.id "}}"</div>`
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

const app = new Vue({ router }).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> User = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;你的ID是 "{{" $route.params.id "}}"&lt;/div&gt;`</span>
}

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/user/:id'</span>, <span class="hljs-attr">component</span>: User }
  ]
})

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({ router }).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<h3 id="articleHeader2">嵌套路由</h3>
<p>个人觉得和动态路由有点像，/foo下能有两个子路由/foo/a和/foo/b分别跳转A和B页面，这时就可以<br>使用嵌套路由。</p>
<h3 id="articleHeader3">编程式的导航</h3>
<ol><li><p>就是说你在代码中可以控制路由，包含几个跳转函数。</p></li></ol>
<ul>
<li><p>router.push(location) history中会有记录</p></li>
<li><p>router.replace(location) history中不会有记录</p></li>
<li><p>router.go(n) 在history记录中向前跳转几页或者向后几页</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// 后退一步记录，等同于 history.back()</span>
router.go<span class="hljs-comment">(-1)</span>

<span class="hljs-comment">// 前进 3 步记录</span>
router.go<span class="hljs-comment">(3)</span>

<span class="hljs-comment">// 如果 history 记录不够用，那就默默地失败呗</span>
router.go<span class="hljs-comment">(-100)</span></code></pre>
<ol><li><p>location的值可以有一下几种类型：</p></li></ol>
<ul>
<li><p>'home'</p></li>
<li><p>{path:'home'}</p></li>
<li><p>{ name: 'user', params: { userId: 123 "}}" // 命名路由，变成/user/123</p></li>
<li><p>{ path: 'register', query: { plan: 'private' "}}" // 带查询参数，变成 /register?plan=private</p></li>
</ul>
<h3 id="articleHeader4">命名视图</h3>
<p>一个视图叫router-view，通俗的说，就是一个页面可以有多个视图，一个视图对应一个组件。<br>一个路由，n个视图n个组件，相当于一次路由展示了多个组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-view class=&quot;view one&quot;></router-view>
<router-view class=&quot;view two&quot; name=&quot;a&quot;></router-view>
<router-view class=&quot;view three&quot; name=&quot;b&quot;></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"view one"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"view two"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"a"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"view three"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">components</span>: {
        <span class="hljs-attr">default</span>: Foo,
        <span class="hljs-attr">a</span>: Bar,
        <span class="hljs-attr">b</span>: Baz
      }
    }
  ]
})</code></pre>
<h3 id="articleHeader5">路由信息对象</h3>
<blockquote><p>一个 route object（路由信息对象） 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）。</p></blockquote>
<p>route object 出现在多个地方:</p>
<ul>
<li><p>组件内的 this.$route 和 $route watcher 回调（监测变化处理）;</p></li>
<li><p>router.match(location) 的返回值</p></li>
<li><p>scrollBehavior 方法的参数</p></li>
<li><p>导航钩子的参数：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  // to 和 from 都是 路由信息对象,后面使用路由的钩子函数就容易理解了
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-comment">// to 和 from 都是 路由信息对象,后面使用路由的钩子函数就容易理解了</span>
})</code></pre>
<p><strong>具体还有其他属性请自行去看官方文档</strong></p>
<h3 id="articleHeader6">Router 构造配置</h3>
<p>有几个重要的点容易出错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare type RouteConfig = {
  path: string;
  component?: Component;
  name?: string; // for named routes (命名路由)
  components?: { [name: string]: Component }; // for named views (命名视图组件)
  redirect?: string | Location | Function;
  alias?: string | Array<string>;
  children?: Array<RouteConfig>; // for nested routes
  beforeEnter?: (to: Route, from: Route, next: Function) => void;
  meta?: any;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">declare</span> <span class="hljs-keyword">type</span> RouteConfig = {
  path: <span class="hljs-built_in">string</span>;
  component?: Component;
  name?: <span class="hljs-built_in">string</span>; <span class="hljs-comment">// for named routes (命名路由)</span>
  components?: { [name: <span class="hljs-built_in">string</span>]: Component }; <span class="hljs-comment">// for named views (命名视图组件)</span>
  redirect?: <span class="hljs-built_in">string</span> | Location | <span class="hljs-built_in">Function</span>;
  alias?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">Array</span>&lt;<span class="hljs-built_in">string</span>&gt;;
  children?: <span class="hljs-built_in">Array</span>&lt;RouteConfig&gt;; <span class="hljs-comment">// for nested routes</span>
  beforeEnter?: <span class="hljs-function">(<span class="hljs-params">to: Route, <span class="hljs-keyword">from</span>: Route, next: <span class="hljs-built_in">Function</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  meta?: <span class="hljs-built_in">any</span>;
}</code></pre>
<h4>scrollBehavior</h4>
<p>下属代码意思，浏览网页滚动中间位置，下一页，点击浏览器返回键，保持上一页浏览位置，使用<br>vue-router返回上一页，从浏览器顶部从新开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>scrollBehavior: <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(to, from, savedPosition) {
        <span class="hljs-keyword">return</span> <span class="hljs-type">savedPosition</span> || { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
    },</code></pre>
<ul>
<li><p>savedPosition ：在使用正常浏览器返回前进，遵从浏览器属性，记录浏览位置</p></li>
<li><p>{ x: 0, y: 0 }：在使用vue-router路由的页面从顶端开始显示</p></li>
</ul>
<h3 id="articleHeader7">参考文档</h3>
<ul><li><p><a href="http://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">vue-router手册</a></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-router带你出坑

## 原文链接
[https://segmentfault.com/a/1190000007837361](https://segmentfault.com/a/1190000007837361)

