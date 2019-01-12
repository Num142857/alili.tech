---
title: 'Vue2.0 探索之路——vue-router入门教程和总结' 
date: 2019-01-13 2:30:11
hidden: true
slug: jjbolyim8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>这是关于vue的第三篇博文。<br><strong>没想到写的还有人看，正是因为你们的阅读和点赞收藏，才给了我无比的动力。请关注我的专栏，我不会停更的。</strong></p>
<p>最近也一直在想，前端知识怎么提高，前端知识的碎片化，让我感觉好多好多都不会，觉得这个时候我应该确定一个方向，重点的培养自己的招牌技能，再加以辅助技能。不过看了很多博文也暂时没有形成具体的路线，就先暂定写博文吧。</p>
<p>今天主要讲解一下 <code>vue-router</code> 的相关知识，路由路由嘛，在单页应用里还是蛮重要的。</p>
<h2 id="articleHeader1">安装和引入</h2>
<p>首先我们先安装依赖<br><code> npm install vue-router</code></p>
<p>紧接着项目引入，看下面的图噢，非常清晰，代码就自己敲吧。</p>
<p><span class="img-wrap"><img data-src="/img/bVOD2k?w=575&amp;h=349" src="https://static.alili.tech/img/bVOD2k?w=575&amp;h=349" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">router.js 的配置</h3>
<p>首先引入 <code>vue-router</code>组件，<code>Vue.use</code>是用来加载全局组件的。那下面我们就开始看看这个<code>VueRouter</code>的写法和配置吧。</p>
<p><strong>mode:</strong> </p>
<p>默认为<code>hash</code>，但是用<code>hash</code>模式的话，页面地址会变成被加个<code>#</code>号比较难看了， <code>http://localhost:8080/#/linkParams/xuxiao</code><br>所以一般我们会采用 <code>history</code>模式，它会使得我们的地址像平常一样。<code>http://localhost:8080/linkParams/xuxiao</code></p>
<p><strong>base</strong><br>应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。<br>一般写成 <code>__dirname</code>，在webpack中有配置。</p>
<p><strong>routes</strong><br><code>routes</code>就是我们的大核心了，里面包含我们所有的页面配置。<br><code>path</code> 很简单，就是我们的访问这个页面的路径<br><code>name</code> 给这个页面路径定义一个名字，当在页面进行跳转的时候也可以用名字跳转，要唯一哟<br><code>component</code> 组件，就是咱们在最上面引入的 <code>import ...</code>了，当然这个组件的写法还有一种<strong><code>懒加载</code></strong></p>
<p>懒加载的方式，我们就不需要再用<code>import</code>去引入组件了，直接如下即可。懒加载的好处是当你访问到这个页面的时候才会去加载相关资源，这样的话能提高页面的访问速度。<br><code>component: resolve =&gt; require(['./page/linkParamsQuestion.vue'], resolve)</code></p>
<p><span class="img-wrap"><img data-src="/img/bVOEsg?w=726&amp;h=462" src="https://static.alili.tech/img/bVOEsg?w=726&amp;h=462" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">router的使用</h2>
<p>对于vue-router的使用，详细的可以看看文档，但是你知道的，文档也只是一个指引，具体的实现还是得靠自己码代码哟。不过我把官方文档放在下面，有兴趣的可以去看看。</p>
<blockquote><p><a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn...</a></p></blockquote>
<p>我通读文档 + 代码实现再结合平时项目开发的使用情况，主要讲下面几个点。</p>
<h3 id="articleHeader4">router传参数</h3>
<p>在我们的平时开发跳转里，很明显，传参数是必要的。那么在vue-router中如何跳转，如何传参数呢。请看下面。</p>
<h4>1.路由匹配参数</h4>
<p>首先在路由配置文件<code>router.js</code>中做好配置。标红出就是对 <code>/linkParams/</code>的路径做拦截，这种类型的链接后面的内容会被<code>vue-router</code>映射成<code>name</code>参数。<br><span class="img-wrap"><img data-src="/img/bVOD2O?w=271&amp;h=145" src="https://static.alili.tech/img/bVOD2O?w=271&amp;h=145" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>代码中获取<code>name</code>的方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = this.$route.params.name; // 链接里的name被封装进了 this.$route.params" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> name = <span class="hljs-keyword">this</span>.$route.<span class="hljs-keyword">params</span>.name; <span class="hljs-comment">// 链接里的name被封装进了 this.$route.params</span></code></pre>
<h4>2.Get请求传参</h4>
<p>这个明明实在不好形容啊。不过真的是和Get请求一样。你完全可以在链接后加上?进行传参。</p>
<p>样例：<code>http://localhost:8080/linkParamsQuestion?age=18</code></p>
<p>项目里获取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let age = this.$route.query.age;   //问号后面参数会被封装进 this.$route.query;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">let age = this.<span class="hljs-variable">$route</span>.query.age;   <span class="hljs-regexp">//</span>问号后面参数会被封装进 this.<span class="hljs-variable">$route</span>.query;</code></pre>
<h3 id="articleHeader5">编程式导航</h3>
<p>这里就开始利用vue-router讲发起跳转了。其实也非常简单，主要利用 <code>&lt;router-link&gt;</code>来创建可跳转链接，还可以在方法里利用 <code>this.$router.push('xxx')</code> 来进行跳转。</p>
<p><strong>样例</strong>： <code>&lt;router-link to="/linkParams/xuxiao"&gt;点我不会怀孕&lt;/router-link&gt;</code><br>上面的这个<code>router-link</code>就相当于加了个可跳转属性。</p>
<p>至于<code>this.$router.push</code>这里直接用官网的荔枝了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 字符串,这里的字符串是路径path匹配噢，不是router配置里的name
this.$router.push('home')

// 对象
this.$router.push({ path: 'home' })

// 命名的路由 这里会变成 /user/123
this.$router.push({ name: 'user', params: { userId: 123 "}}")

// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' "}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 字符串,这里的字符串是路径path匹配噢，不是router配置里的name</span>
<span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'home'</span>)

<span class="hljs-comment">// 对象</span>
<span class="hljs-keyword">this</span>.$router.push({ <span class="hljs-string">path:</span> <span class="hljs-string">'home'</span> })

<span class="hljs-comment">// 命名的路由 这里会变成 /user/123</span>
<span class="hljs-keyword">this</span>.$router.push({ <span class="hljs-string">name:</span> <span class="hljs-string">'user'</span>, <span class="hljs-string">params:</span> { <span class="hljs-string">userId:</span> <span class="hljs-number">123</span> "}}")

<span class="hljs-comment">// 带查询参数，变成 /register?plan=private</span>
<span class="hljs-keyword">this</span>.$router.push({ <span class="hljs-string">path:</span> <span class="hljs-string">'register'</span>, <span class="hljs-string">query:</span> { <span class="hljs-string">plan:</span> <span class="hljs-string">'private'</span> "}}")</code></pre>
<h3 id="articleHeader6">导航钩子</h3>
<p>导航钩子函数，主要是在导航跳转的时候做一些操作，比如可以做<strong><code>登录的拦截</code></strong>，而钩子函数根据其生效的范围可以分为 <code>全局钩子函数</code>、<code>路由独享钩子函数</code>和<code>组件内钩子函数</code>。</p>
<h4>全局钩子函数</h4>
<p>可以直接在路由配置文件<code>router.js</code>里编写代码逻辑。可以做一些全局性的路由拦截。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next)=>{
  //do something
  next();
});
router.afterEach((to, from, next) => {
    console.log(to.path);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span>=&gt;</span>{
  //<span class="hljs-keyword">do</span> something
  <span class="hljs-built_in">next</span>();
});
router.afterEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
    console.log(to.path);
});</code></pre>
<p>每个钩子方法接收三个参数：</p>
<ul>
<li><p><strong>to: Route:</strong> 即将要进入的目标 路由对象</p></li>
<li><p><strong>from: Route:</strong> 当前导航正要离开的路由</p></li>
<li><p><strong>next: Function:</strong> 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。</p></li>
<li>
<p><strong>next():</strong>  进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。</p>
<ul>
<li><p><strong>next(false):</strong> 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么     URL 地址会重置到 from 路由对应的地址。</p></li>
<li><p><strong>next('/')</strong> 或者 <strong>next({ path: '/' })</strong>: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。</p></li>
</ul>
</li>
</ul>
<p><strong>确保要调用 next 方法，否则钩子就不会被 resolved。</strong></p>
<h4>路由独享钩子函数</h4>
<p>可以做一些单个路由的跳转拦截。在配置文件编写代码即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/foo'</span>,
      <span class="hljs-attr">component</span>: Foo,
      <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
        <span class="hljs-comment">// ...</span>
      }
    }
  ]
})</code></pre>
<h4>组件内钩子函数</h4>
<p>更细粒度的路由拦截，只针对一个进入某一个组件的拦截。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在渲染该组件的对应路由被 confirm 前调用
    <span class="hljs-regexp">//</span> 不！能！获取组件实例 `this`
    <span class="hljs-regexp">//</span> 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在当前路由改变，但是该组件被复用时调用
    <span class="hljs-regexp">//</span> 举例来说，对于一个带有动态参数的路径 <span class="hljs-regexp">/foo/</span>:id，在 <span class="hljs-regexp">/foo/</span><span class="hljs-number">1</span> 和 <span class="hljs-regexp">/foo/</span><span class="hljs-number">2</span> 之间跳转的时候，
    <span class="hljs-regexp">//</span> 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 导航离开该组件的对应路由时调用
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
  }
}</code></pre>
<h4>钩子函数使用场景</h4>
<p>其实路由钩子函数在项目开发中用的并不是非常多，一般用于登录态的校验，没有登录跳转到登录页；权限的校验等等。当然随着项目的开发进展，也会有更多的功能可能用钩子函数实现会更好，我们知道有钩子函数这个好东西就行了，下次遇到问题脑海就能浮现，噢，这个功能用钩子实现会比较棒。我们的目的就达到了。当然，有兴趣的可以再去研究下源码的实现。开启下脑洞。</p>
<h2 id="articleHeader7">其他知识点</h2>
<h3 id="articleHeader8">滚动行为</h3>
<p>在利用<code>vue-router</code>去做跳转的时候，到了新页面如果对页面的滚动条位置有要求的话，可以利用下面这个方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes: [...],
  scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
    <span class="hljs-comment">// return 期望滚动到哪个的位置</span>
  }
})</code></pre>
<p><code>scrollBehavior</code> 方法接收 <code>to</code> 和 <code>from</code> 路由对象。<br>第三个参数 <code>savedPosition</code> 当且仅当 <code>popstate</code> 导航 (<code>mode</code>为 <code>history</code> 通过浏览器的 前进/后退 按钮触发) 时才可用。<br>这里就不细致的讲了，文档都有也非常简单，记住有这个东西就行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//所有路由新页面滚动到顶部：
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}

//如果有锚点
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code><span class="hljs-comment">//所有路由新页面滚动到顶部：</span>
scrollBehavior (<span class="hljs-keyword">to</span>, from, savedPosition) {
  <span class="hljs-keyword">return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
}

<span class="hljs-comment">//如果有锚点</span>
scrollBehavior (<span class="hljs-keyword">to</span>, from, savedPosition) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.hash) {
    <span class="hljs-keyword">return</span> {
      selector: <span class="hljs-keyword">to</span>.hash
    }
  }
}</code></pre>
<h3 id="articleHeader9">路由元信息</h3>
<p>这个概念非常简单，就是在路由配置里有个属性叫 <code>meta</code>，它的数据结构是一个对象。你可以放一些key-value进去，方便在钩子函数执行的时候用。<br>举个例子，你要配置哪几个页面需要登录的时候，你可以在<code>meta</code>中加入一个 <code>requiresAuth</code>标志位。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      meta: { requiresAuth: true }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">router</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueRouter({</span>
<span class="hljs-attr">  routes:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      path:</span> <span class="hljs-string">'/foo'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      component:</span> <span class="hljs-string">Foo,</span>
<span class="hljs-attr">      meta:</span> <span class="hljs-string">{</span> <span class="hljs-attr">requiresAuth:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">]</span>
<span class="hljs-string">})</span></code></pre>
<p>然后在 全局钩子函数 <code>beforeEach</code>中去校验目标页面是否需要登录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //校验这个目标页面是否需要登录
    if (!auth.loggedIn()) {  
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>router.beforeEach((to, from, next) =&gt; {
  <span class="hljs-keyword">if</span> (to<span class="hljs-selector-class">.matched</span><span class="hljs-selector-class">.some</span>(record =&gt; record<span class="hljs-selector-class">.meta</span><span class="hljs-selector-class">.requiresAuth</span>)) {
    <span class="hljs-comment">//校验这个目标页面是否需要登录</span>
    <span class="hljs-keyword">if</span> (!auth.loggedIn()) {  
      next({
        path: <span class="hljs-string">'/login'</span>,
        query: { redirect: to<span class="hljs-selector-class">.fullPath</span> }
      })
    } <span class="hljs-keyword">else</span> {
      next()
    }
  } <span class="hljs-keyword">else</span> {
    next() <span class="hljs-comment">// 确保一定要调用 next()</span>
  }
})</code></pre>
<blockquote><p>这个<strong><code>auth.loggedIn</code></strong> 方法是外部引入的，你可以先写好一个校验是否登录的方法，再<code>import</code>进 <code>router.js</code>中去判断。</p></blockquote>
<h2 id="articleHeader10">总结</h2>
<p>总的来看，<code>vue-router</code>是比较简单的，重点就是路由匹配，编程式导航，钩子函数。这篇只是一个<code>vue-router</code>的实用的知识点的梳理讲解，成文有点杂，哈哈，望见谅哈。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 探索之路——vue-router入门教程和总结

## 原文链接
[https://segmentfault.com/a/1190000009651628](https://segmentfault.com/a/1190000009651628)

