---
title: 'vue2.0一起在懵逼的海洋里越陷越深（六）' 
date: 2019-01-29 2:30:10
hidden: true
slug: oqucywm06kh
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>本文章系列：<a href="http://leenty.com/tags/vuejs/" rel="nofollow noreferrer" target="_blank">vue2.0一起在懵逼的海洋里越陷越深 (http://leenty.com/tags/vuejs/)</a><br><a href="http://vue2.leenty.com" rel="nofollow noreferrer" target="_blank">演示场地vue2.0 Demo</a>,这是<a href="https://github.com/leenty/vue2" rel="nofollow noreferrer" target="_blank">源码地址</a>,觉得靠谱的话欢迎加星跟随,有问题欢迎评论和指正?</p>
<p>在vue开发SPA应用的过程中，多数情况下我们需要解决一个问题<br>就是在路由跳转的过程中需要更新你SPA应用的<code>title</code> ，<br>这一节不说其他，就展示如何使用<code>vue-router</code>的<strong>导航钩子</strong>去解决这么一个问题。<br>接下来就愉快的去玩耍啦！<br><span class="img-wrap"><img data-src="/img/remote/1460000007858597?w=479&amp;h=475" src="https://static.alili.tech/img/remote/1460000007858597?w=479&amp;h=475" alt="去吧孩子" title="去吧孩子" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">正文</h3>
<p>好的，介绍下背景，我有这么一个<a href="http://vue2.leenty.com" rel="nofollow noreferrer" target="_blank">博客的demo</a>，里面有多个版块，每个版块有着不同的名称(<code>title</code>)<br>先看一下Demo的路由结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue2.leenty.com
├── home                # 首页版块
├── article             # 文章版块
│   ├── vue2-1            # 具体文章一
│   ├── vue2-2            # 具体文章二
│   ├── vue2-3            # 具体文章三
│   ├── vue2-4            # 具体文章四
│   ├── vue2-5            # 具体文章五
│   └── vue2-6            # 具体文章六
└── demo                # 演示版块
    └── demo-1            # 具体演示一" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>vue2.leenty.com
├── home                <span class="hljs-meta"># 首页版块</span>
├── article             <span class="hljs-meta"># 文章版块</span>
│   ├── vue2-<span class="hljs-number">1</span>            <span class="hljs-meta"># 具体文章一</span>
│   ├── vue2-<span class="hljs-number">2</span>            <span class="hljs-meta"># 具体文章二</span>
│   ├── vue2-<span class="hljs-number">3</span>            <span class="hljs-meta"># 具体文章三</span>
│   ├── vue2-<span class="hljs-number">4</span>            <span class="hljs-meta"># 具体文章四</span>
│   ├── vue2-<span class="hljs-number">5</span>            <span class="hljs-meta"># 具体文章五</span>
│   └── vue2-<span class="hljs-number">6</span>            <span class="hljs-meta"># 具体文章六</span>
└── demo                <span class="hljs-meta"># 演示版块</span>
    └── demo-<span class="hljs-number">1</span>            <span class="hljs-meta"># 具体演示一</span></code></pre>
<p>好的，接下来要实现的是在切换路由的时候同时的去切换你页面的<code>title</code></p>
<h4>思路</h4>
<p>这里思路是使用<code>vue-router</code>的路由全局导航钩子去解决这个问题<br>在路由对象里添加一个<code>title</code>字段以供路由全局导航钩子读取并更新页面<code>title</code></p>
<h4>配置路由</h4>
<p>所以第一步，先在路由对象里添加这一个字段。<br>打开<code>src/routes.js</code>(<a href="https://github.com/leenty/vue2/blob/master/src/routes.js" rel="nofollow noreferrer" target="_blank">源文件地址：https://github.com/leenty/vue2/blob/master/src/routes.js</a>)<br><strong>（注意是<code>routes.js</code>,这是咱用来存放路由对象的文件）</strong><br>在原有数据的基础上添加<code>title</code><br>这里其实vue1.0和vue2.0的实现是差不多的，所以vue1.0也是可以使用的。<br>vue2.0路由对象提供了一个<code>meta</code>字段来给你存放一些其他信息，所以这里就可以用来存放<code>title</code><br>vue1.0的话是没有这个字段的，所以可以直接与<code>path</code>平级。<br>具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
  {
    name: 'Home',
    path: '/',
    meta: {
      title: 'home' // 主页的title为home
    },
    component: require('./components/Home.vue')
  },
  {
    name: 'Article',
    path: '/article',
    meta: {
      title: 'article' // 文章模块相应的title为article
    },
    component: require('./components/Article.vue'),
    children: [
      {
        name: 'vue2_1',
        path: '/article/vue2_1',
        meta: {
          title: 'vue2.0一起在懵逼的海洋里越陷越深（一）' // 子路由也是一样的道理
        },
        component: require('./md/articles/vue2-1.md')
      },
      // ... 子路由和父路由都差不多，所以后面的就省略了
    ]
  },
  {
    name: 'Demo',
    path: '/demo',
    meta: {
      title: 'demo' // 演示模块title为demo
    },
    component: require('./components/Demo.vue'),
    children: [
      {
        name: 'DemoVuexState',
        path: 'vuex_state',
        meta: {
          title: 'vuex演示'
        },
        component: require('./components/DemoVuexState.vue')
      }
    ]
  }
]

export default routes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> routes = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Home'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">meta</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'home'</span> <span class="hljs-comment">// 主页的title为home</span>
    },
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/Home.vue'</span>)
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Article'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/article'</span>,
    <span class="hljs-attr">meta</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'article'</span> <span class="hljs-comment">// 文章模块相应的title为article</span>
    },
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/Article.vue'</span>),
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'vue2_1'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/article/vue2_1'</span>,
        <span class="hljs-attr">meta</span>: {
          <span class="hljs-attr">title</span>: <span class="hljs-string">'vue2.0一起在懵逼的海洋里越陷越深（一）'</span> <span class="hljs-comment">// 子路由也是一样的道理</span>
        },
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./md/articles/vue2-1.md'</span>)
      },
      <span class="hljs-comment">// ... 子路由和父路由都差不多，所以后面的就省略了</span>
    ]
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Demo'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/demo'</span>,
    <span class="hljs-attr">meta</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'demo'</span> <span class="hljs-comment">// 演示模块title为demo</span>
    },
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/Demo.vue'</span>),
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'DemoVuexState'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'vuex_state'</span>,
        <span class="hljs-attr">meta</span>: {
          <span class="hljs-attr">title</span>: <span class="hljs-string">'vuex演示'</span>
        },
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/DemoVuexState.vue'</span>)
      }
    ]
  }
]

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> routes</code></pre>
<p>如此这般，各个页面的<code>title</code>就预设好了</p>
<p>小明：”为什么<code>title</code>里不加上站点名后缀？像<code>demo - leenty blog</code>这样？“<br>老师：“滚出去！”</p>
<p>其实是这样的，后缀如果一个个加也是可以的，但为什么不用语句帮我们加上去呢？<br>这样就一劳永逸啦，再也不用自己一个个打后缀了，哈哈哈，真TM机智！<br><span class="img-wrap"><img data-src="/img/remote/1460000007858598?w=161&amp;h=155" src="https://static.alili.tech/img/remote/1460000007858598?w=161&amp;h=155" alt="mdzz" title="mdzz" style="cursor: pointer; display: inline;"></span></p>
<h4>路由导航钩子介绍</h4>
<p>讲一讲这个所谓的全局导航钩子，听起来玄不愣登的。。。</p>
<p>导航是发生在路由改变时的事件，这也是为何网页的导航条叫导航条的原因<br>尤大大的原话是：“正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的”<br>说的很明白，言简意赅，其实就是能让你控制导航的一个方法而已<br>导航钩子分为全局，单个路由独享和组件级别的。<br>但不论如何，导航钩子都接受一个函数为参数，并会在导航过程中调用这个函数。<br>函数会被传入3个参数，分别为<code>to, from, next</code><br>没错，你看字面意思应该理解了个大概，即：<br><code>from</code>：你从哪里来？(问询消息的小弟A)<br><code>to</code>：要到哪里去？(问询消息的小弟B)<br><code>next</code>：让不让过去还得看老子我的！(大哥你懂不)</p>
<p>上面这位大哥(<code>next</code>)会有三种方法！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="next() // 默认通过路由
next(false) // 中止导航，那么将会跳回到from的地址
next({ path: '/' }) // 跟一个路由参数对象，将会中止当前导航并跳往指向的路由" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">next() <span class="hljs-comment">// 默认通过路由</span>
next(<span class="hljs-literal">false</span>) <span class="hljs-comment">// 中止导航，那么将会跳回到from的地址</span>
next({ <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span> }) <span class="hljs-comment">// 跟一个路由参数对象，将会中止当前导航并跳往指向的路由</span></code></pre>
<p>好的，先看看全局的写法<br><strong>全局导航钩子</strong> 一共两个，<code>router.beforeEach</code>和<code>router.afterEach</code><br>一个触发于导航开始前，一个触发于导航开始后。用法呢，都是一样的，如下！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
  console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
  next(false) // 大哥：谁让你过去的？
  // 调用next(false)中止导航，于是页面回到跳转前
})

router.afterEach((to, from, next) => {
  console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
  console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
  next() // 大哥：过去吧！
  // 调用next通过路由
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({ ... })

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟B：哎呀妈呀！大兄弟，这是要去哪呀？'</span>, to)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟A：大兄弟，哪儿旮沓的呀！'</span>, <span class="hljs-keyword">from</span>)
  next(<span class="hljs-literal">false</span>) <span class="hljs-comment">// 大哥：谁让你过去的？</span>
  <span class="hljs-comment">// 调用next(false)中止导航，于是页面回到跳转前</span>
})

router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟B：哎呀妈呀！大兄弟，这是要去哪呀？'</span>, to)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟A：大兄弟，哪儿旮沓的呀！'</span>, <span class="hljs-keyword">from</span>)
  next() <span class="hljs-comment">// 大哥：过去吧！</span>
  <span class="hljs-comment">// 调用next通过路由</span>
})</code></pre>
<p><strong>单个路由独享的钩子</strong> ，同样是两个方法<code>beforeEnter</code>和<code>afterEnter</code>，同样的套路。<br>套路如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/demo',
      component: Demo,
      beforeEnter: (to, from, next) => {
        console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
        console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
        next() // 大哥：过去吧！
        // 调用next通过路由
      },
      afterEnter: (to, from, next) => {
        console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
        console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
        next({ path: '/' }) // 大哥：像那边走！
        // 调用next({ path: '/' })中止导航，并跳到首页
      }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/demo'</span>,
      <span class="hljs-attr">component</span>: Demo,
      <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟B：哎呀妈呀！大兄弟，这是要去哪呀？'</span>, to)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟A：大兄弟，哪儿旮沓的呀！'</span>, <span class="hljs-keyword">from</span>)
        next() <span class="hljs-comment">// 大哥：过去吧！</span>
        <span class="hljs-comment">// 调用next通过路由</span>
      },
      <span class="hljs-attr">afterEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟B：哎呀妈呀！大兄弟，这是要去哪呀？'</span>, to)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟A：大兄弟，哪儿旮沓的呀！'</span>, <span class="hljs-keyword">from</span>)
        next({ <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span> }) <span class="hljs-comment">// 大哥：像那边走！</span>
        <span class="hljs-comment">// 调用next({ path: '/' })中止导航，并跳到首页</span>
      }
    }
  ]
})</code></pre>
<p><strong>组件内的钩子</strong>，依然是一对基友方法<code>beforeRouteEnter</code>和<code>beforeRouteLeave</code><br>套路还是一样的0.0</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Demo = {
  template: `<div>this is a Demo </div>`,
  beforeRouteEnter (to, from, next) {
    console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
    console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
    next() // 大哥：过去吧！
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteLeave (to, from, next) {
    console.log('小弟B：哎呀妈呀！大兄弟，这是要去哪呀？', to)
    console.log('小弟A：大兄弟，哪儿旮沓的呀！', from)
    next() // 大哥：过去吧！
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Demo = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;this is a Demo &lt;/div&gt;`</span>,
  beforeRouteEnter (to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟B：哎呀妈呀！大兄弟，这是要去哪呀？'</span>, to)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟A：大兄弟，哪儿旮沓的呀！'</span>, <span class="hljs-keyword">from</span>)
    next() <span class="hljs-comment">// 大哥：过去吧！</span>
    <span class="hljs-comment">// 在渲染该组件的对应路由被 confirm 前调用</span>
    <span class="hljs-comment">// 不！能！获取组件实例 `this`</span>
    <span class="hljs-comment">// 因为当钩子执行前，组件实例还没被创建</span>
  },
  beforeRouteLeave (to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟B：哎呀妈呀！大兄弟，这是要去哪呀？'</span>, to)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'小弟A：大兄弟，哪儿旮沓的呀！'</span>, <span class="hljs-keyword">from</span>)
    next() <span class="hljs-comment">// 大哥：过去吧！</span>
    <span class="hljs-comment">// 导航离开该组件的对应路由时调用</span>
    <span class="hljs-comment">// 可以访问组件实例 `this`</span>
  }
}</code></pre>
<h4>配合路由全局导航钩子去更新<code>title</code>
</h4>
<p>好的，三种都介绍完了，那么打开<code>src/router.js</code>，没错，这回是<code>router.js</code>，这是咱装载路由的文件</p>
<p>在此之前，我们还需要知道在一个嵌套路由情况下的节点分布。<br>三个参数之一的<code>to</code>存在属性<code>to.matched</code>,里面存在了一个包含路由节点的数组<br>顺序是从子路由到根路由</p>
<p>好的，确定下title文案</p>
<table>
<thead><tr>
<th align="left">router</th>
<th align="center">title</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>├── home         </code></td>
<td align="center">leenty blog</td>
</tr>
<tr>
<td align="left"><code>├── article      </code></td>
<td align="center">article - leenty blog</td>
</tr>
<tr>
<td align="left"><code>│   ├── vue2-1   </code></td>
<td align="center">vue2.0一起在懵逼的海洋里越陷越深（一） - article - leenty blog</td>
</tr>
<tr>
<td align="left"><code>│   ├── ...      </code></td>
<td align="center">... - article - leenty blog</td>
</tr>
<tr>
<td align="left"><code>│   └── vue2-6   </code></td>
<td align="center">vue2.0一起在懵逼的海洋里越陷越深（六） - article - leenty blog</td>
</tr>
<tr>
<td align="left"><code>└── demo         </code></td>
<td align="center">demo - leenty blog</td>
</tr>
<tr>
<td align="left"><code>    └── demo-1   </code></td>
<td align="center">具体演示1 - demo - leenty blog</td>
</tr>
</tbody>
</table>
<p>里面的结构是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

const title = 'leenty blog'
// 定义我们站点的名字

Vue.use(VueRouter)

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'u-link--Active',
  routes
})

// 路由导航钩子，beforeEach，在路由进入前调用
router.beforeEach((to, from, next) => {
  let titleStr = ''
  // 检测是不是要跳转首页，如果是，则不处理
  if (to.name !== 'Home') {
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
      titleStr += `${to.matched[i].meta.title} - `
    }
  }
  // 添加站点名
  titleStr += title
  // 更新title
  document.title = titleStr
  // 继续路由导航
  next()
})

export default router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>

<span class="hljs-keyword">const</span> title = <span class="hljs-string">'leenty blog'</span>
<span class="hljs-comment">// 定义我们站点的名字</span>

Vue.use(VueRouter)

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">'u-link--Active'</span>,
  routes
})

<span class="hljs-comment">// 路由导航钩子，beforeEach，在路由进入前调用</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> titleStr = <span class="hljs-string">''</span>
  <span class="hljs-comment">// 检测是不是要跳转首页，如果是，则不处理</span>
  <span class="hljs-keyword">if</span> (to.name !== <span class="hljs-string">'Home'</span>) {
    <span class="hljs-comment">// 倒序遍历数组获取匹配到的路由节点，拼接各部分title</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = to.matched.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
      titleStr += <span class="hljs-string">`<span class="hljs-subst">${to.matched[i].meta.title}</span> - `</span>
    }
  }
  <span class="hljs-comment">// 添加站点名</span>
  titleStr += title
  <span class="hljs-comment">// 更新title</span>
  <span class="hljs-built_in">document</span>.title = titleStr
  <span class="hljs-comment">// 继续路由导航</span>
  next()
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router</code></pre>
<p>ok，打完收工！现在可以切换路由看看<code>title</code>有没有在变化了。<br>可以看我的Demo<a href="http://vue2.leenty.com" rel="nofollow noreferrer" target="_blank">http://vue2.leenty.com</a>，四处切换路由，看看标题如何变化吧！</p>
<h3 id="articleHeader2">其他</h3>
<p><a href="http://vue2.leenty.com" rel="nofollow noreferrer" target="_blank">演示地址(http://vue2.leenty.com)</a><br><a href="https://github.com/leenty/vue2" rel="nofollow noreferrer" target="_blank">源码地址(https://github.com/leenty/vue2)</a><br><a href="https://github.com/leenty" rel="nofollow noreferrer" target="_blank">github主页</a>,觉得靠谱的话欢迎加星跟随</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0一起在懵逼的海洋里越陷越深（六）

## 原文链接
[https://segmentfault.com/a/1190000007858594](https://segmentfault.com/a/1190000007858594)

