---
title: '基于vue-router的动态权限实现方案' 
date: 2019-01-14 2:30:07
hidden: true
slug: azd1mvvh8fr
categories: [reprint]
---

{{< raw >}}

                    
<p>使用vue开发带权限管理系统，尤其是采用了vue-router做路由，很多人都遇到的一个问题就是如何动态加载路由path对应的component。</p>
<p>典型的应用场景就是：前端菜单不静态的写在vue程序里，而是要从后台程序和数据库返回的菜单来动态加载到vue应用中。</p>
<p>网上很多问权限的问题，但几乎找不到很好的解决答案，在很长一段时间里，非常打击使用vue技术栈开发的信心。最有质量的一篇文章是：<br><a href="http://blog.csdn.net/s8460049/article/details/61190709" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/s8460049...</a><br>但作者并没有完全解决这个问题，还留有几个问题是：<br>1）登录之后跳转到首页，此时路由已经是加载完成的了不能更改，菜单可以显示但是没有路由。<br>2）前端应用人为刷新网页路由产生某些问题。</p>
<p>本文即在这篇文章的基础上对这两个问题解决，以使其完整。</p>
<p>前提是认真拜读上面提到的那篇文章，下面直接用代码说话:</p>
<p>问题1的解决思路：<br>登录之后跳转到首页，router是vue应用的router 引入进登录方法，在登录之后跳转之前对router进行改变，改变要点1是精确赋值到router的routes具体地方，比如我这里是routes[0]的子路由，2是用addRoutes函数使其生效。</p>
<p>登录功能的js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const login = ({commit}, data) => {  Service.post('/login', Qs.stringify(data))
    .then(res => {
      const success = Object.is(res.statusText, 'OK') &amp;&amp; Object.is(res.data.code, '0')
      if (success) {
        var menus = generateMenus(res.data.menus)
        window.sessionStorage.routes = JSON.stringify(menus)
        if (menuModule.state.items.length <= 0) { // 避免注销后在不刷新页面的情况下再登录重复加载路由
          commit(types.ADD_MENU, menus)
          // 动态加载路由关键2行
          router.options.routes[0].children.push(...generateRoutesFromMenu(menuModule.state.items))
          router.addRoutes(router.options.routes)
        }
        window.sessionStorage.loginName = data.loginName
        router.push({path: '/'})
      } else {
        commit('loginErr', res.data.msg)
      }
    })
}


function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      item.component = resolve => require([`views/` + item.component + `.vue`], resolve)
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> login = <span class="hljs-function">(<span class="hljs-params">{commit}, data</span>) =&gt;</span> {  Service.post(<span class="hljs-string">'/login'</span>, Qs.stringify(data))
    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> success = <span class="hljs-built_in">Object</span>.is(res.statusText, <span class="hljs-string">'OK'</span>) &amp;&amp; <span class="hljs-built_in">Object</span>.is(res.data.code, <span class="hljs-string">'0'</span>)
      <span class="hljs-keyword">if</span> (success) {
        <span class="hljs-keyword">var</span> menus = generateMenus(res.data.menus)
        <span class="hljs-built_in">window</span>.sessionStorage.routes = <span class="hljs-built_in">JSON</span>.stringify(menus)
        <span class="hljs-keyword">if</span> (menuModule.state.items.length &lt;= <span class="hljs-number">0</span>) { <span class="hljs-comment">// 避免注销后在不刷新页面的情况下再登录重复加载路由</span>
          commit(types.ADD_MENU, menus)
          <span class="hljs-comment">// 动态加载路由关键2行</span>
          router.options.routes[<span class="hljs-number">0</span>].children.push(...generateRoutesFromMenu(menuModule.state.items))
          router.addRoutes(router.options.routes)
        }
        <span class="hljs-built_in">window</span>.sessionStorage.loginName = data.loginName
        router.push({<span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>})
      } <span class="hljs-keyword">else</span> {
        commit(<span class="hljs-string">'loginErr'</span>, res.data.msg)
      }
    })
}


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateRoutesFromMenu</span> (<span class="hljs-params">menu = [], routes = []</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = menu.length; i &lt; l; i++) {
    <span class="hljs-keyword">let</span> item = menu[i]
    <span class="hljs-keyword">if</span> (item.path) {
      routes.push(item)
    }
    <span class="hljs-keyword">if</span> (!item.component) {
      item.component = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">`views/`</span> + item.component + <span class="hljs-string">`.vue`</span>], resolve)
      generateRoutesFromMenu(item.children, routes)
    }
  }
  <span class="hljs-keyword">return</span> routes
}</code></pre>
<p>问题2的解决思路：<br>是不在主app里引入实例化vue-router的js，而是直接在app里实例化router，目的就是网页刷新的时候每次都确保生成动态的router。</p>
<p>app.js部分代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Vue.use(Router)
let menus = window.sessionStorage.routes //登录成功返回的菜单
if (menus) {
  let items = JSON.parse(menus)
  store.commit(ADD_MENU, items)
}

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Main',
      path: '/',
      component: require('views/Main.vue'),
      children: [ //动态路由之所以作为Main的子路由是基于：登录之后跳转到Main主页，该主页是类似于frame的页面加载框架，只有将动态路由作为Main的子路由才能确保其他页面显示到Main框架内。
        ...generateRoutesFromMenu(menuModule.state.items)
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: require('views/Login.vue')
    }
  ]
})

function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      item.component = resolve => require([`views/` + item.component + `.vue`], resolve)
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
Vue.use(Router)
<span class="hljs-keyword">let</span> menus = <span class="hljs-built_in">window</span>.sessionStorage.routes <span class="hljs-comment">//登录成功返回的菜单</span>
<span class="hljs-keyword">if</span> (menus) {
  <span class="hljs-keyword">let</span> items = <span class="hljs-built_in">JSON</span>.parse(menus)
  store.commit(ADD_MENU, items)
}

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'hash'</span>,
  <span class="hljs-attr">linkActiveClass</span>: <span class="hljs-string">'is-active'</span>,
  <span class="hljs-attr">scrollBehavior</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({ <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }),
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Main'</span>,
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'views/Main.vue'</span>),
      <span class="hljs-attr">children</span>: [ <span class="hljs-comment">//动态路由之所以作为Main的子路由是基于：登录之后跳转到Main主页，该主页是类似于frame的页面加载框架，只有将动态路由作为Main的子路由才能确保其他页面显示到Main框架内。</span>
        ...generateRoutesFromMenu(menuModule.state.items)
      ]
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Login'</span>,
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'views/Login.vue'</span>)
    }
  ]
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateRoutesFromMenu</span> (<span class="hljs-params">menu = [], routes = []</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = menu.length; i &lt; l; i++) {
    <span class="hljs-keyword">let</span> item = menu[i]
    <span class="hljs-keyword">if</span> (item.path) {
      routes.push(item)
    }
    <span class="hljs-keyword">if</span> (!item.component) {
      item.component = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">`views/`</span> + item.component + <span class="hljs-string">`.vue`</span>], resolve)
      generateRoutesFromMenu(item.children, routes)
    }
  }
  <span class="hljs-keyword">return</span> routes
}</code></pre>
<p>另附menu items代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
  items: [  // 什么菜单都不定义，完全由后端返回
  ]
}
const mutations = {
  [types.ADD_MENU] (state, menuItems) {
    if (menuItems.length > 0) {
      menuItems.map(function (item) {
        item.children.map(function (child) {
          child.component = lazyLoading(child.component)
        })
      })
      state.items.push(...menuItems)
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const <span class="hljs-keyword">state</span> = {
  items: [  // 什么菜单都不定义，完全由后端返回
  ]
}
const mutations = {
  [types.ADD_MENU] (<span class="hljs-keyword">state</span>, menuItems) {
    if (menuItems.length &gt; <span class="hljs-number">0</span>) {
      menuItems.map(function (item) {
        item.children.map(function (child) {
          child.component = lazyLoading(child.component)
        })
      })
      <span class="hljs-keyword">state</span>.items.push(...menuItems)
    }
  },</code></pre>
<p>lazyloding</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default (name, index = false) => () => import(`views/${name}${index ? '/index' : ''}.vue`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (name, index = <span class="hljs-literal">false</span>) =&gt; <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">`views/<span class="hljs-subst">${name}</span><span class="hljs-subst">${index ? <span class="hljs-string">'/index'</span> : <span class="hljs-string">''</span>}</span>.vue`</span>)</code></pre>
<p>git代码暂不能全部公开，有问题可留言。</p>
<p>**</p>
<p>更新：</p>
<p>现在公开git代码： <br><a href="https://github.com/m3shine/vue-admin.git" rel="nofollow noreferrer" target="_blank">https://github.com/m3shine/vu...</a> <br>注意： <br>本文讲的内容是基于cookie的，此次公开的代码是纯净的代码，不含业务，登录是基于vue-jwt-auth，动态路由部分原理跟本文讲到的地方一样。</p>
<p>**</p>
<p>打个区块链小程序的广告：<br><a href="https://www.sbeauty.la" rel="nofollow noreferrer" target="_blank">https://www.sbeauty.la</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue-router的动态权限实现方案

## 原文链接
[https://segmentfault.com/a/1190000009396901](https://segmentfault.com/a/1190000009396901)

