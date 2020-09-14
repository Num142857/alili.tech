---
title: 'vuejs单页应用的权限管理实践' 
date: 2018-12-08 2:30:30
hidden: true
slug: z3skidqyiy
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文发布于 <a href="http://blog.ahui.me/posts/2018-03-26/permission-control-of-vuejs/" rel="nofollow noreferrer" target="_blank">http://blog.ahui.me/posts/201...</a>
</blockquote>
<p>在众多的B端应用中,简单如小型企业的管理后台,还是大型的CMS,CRM系统,权限管理都是一个重中之重的需求,过往的web应用大多采取服务端模板+服务端路由的模式,权限管理自然也由服务端进行控制和过滤.但是在前后端分离的大潮下,如果采用单页应用开发模式的话,前端也无可避免要配合服务端共同进行权限管理,接下来会以vuejs开发单页应用为例,给出一些尝试方案,希望也能给大家提供一些思路.注意采用nodejs作为中间层的前后端分离不在此文讨论范围.</p>
<h2 id="articleHeader0">目标</h2>
<p>关于权限管理,由于本人对服务端并不能算得上十分了解,我只能从我以往的项目经验中进行总结,并不一定十分准确.</p>
<p>一般权限管理分为以下几部分.</p>
<ul>
<li>应用使用权</li>
<li>页面级别权限</li>
<li>模块级别权限</li>
<li>接口级别权限</li>
</ul>
<p>接下来会逐一讲解上述部分.完整的实例代码托管在<a href="https://github.com/funkyLover/vue-permission-control-demo" rel="nofollow noreferrer" target="_blank">github-funkyLover/vue-permission-control-demo</a>上.</p>
<h2 id="articleHeader1">应用使用权-登录状态管理与保存</h2>
<p>首先<code>应用使用权</code>其实就是简单的判断登录状态而已.在很多C端应用,登录之后能使用更多的功能在一定程度上也可以算作权限管理的一部分.而在B端应用中一般表现为不登录则不能使用(当然还能使用类似找回密码之类的功能).</p>
<p>以往登录状态的保持一般通过session+cookie/token管理,用户在打开网页时就带上cookie/token,由后端逻辑判断并进行重定向.在SPA的模式下,页面跳转是由前端路由进行控制的,用户状态的判断则需要由前端主动发送一次<code>自动登录</code>的请求,根据返回结果进行跳转.</p>
<p>这个<code>自动登录</code>的逻辑可以深挖做出多种实现,例如登录成功之后把用户信息加密并通过localstorage在多个tab之间公用,这样再新打开tab时就不需要再次<code>自动登录</code>.这里就以最简单的实现来进行讲解,基本流程如下:</p>
<ol>
<li>用户请求页面资源</li>
<li>检查本地cookie/localstorage是否有token</li>
<li>如果没有token,不管用户请求打开的是哪个路由,都一律跳转到login路由</li>
<li>如果检查到token,先请求<code>自动登录</code>的接口,根据返回的结果判断是进入用户请求的路由还是跳转到login路由</li>
</ol>
<p>而关于用户状态的判断,一般应该针对<code>进入login路由</code>(包括忘记密码之类的路由)和<code>进入其他路由</code>进行判断,在基于vuejs@2.x的前提下,可以在router的beforeEach钩子上进行用户状态判断并切换路由即可.下面给出部分代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      }, {
        path: 'page1',
        name: 'Page1',
        component: Page1
      }, {
        path: 'page2',
        name: 'Page2',
        component: Page2
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new Router({
  routes,
  mode: 'history'
  // 其他配置
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    // 当进入路由为login时,判断是否已经登录
    if (store.getters.user.isLogin) {
      // 如果已经登录,则进入功能页面
      return next('/')
    } else {
      return next()
    }
  } else {
    if (store.getters.user.isLogin) {
      return next()
    } else {
      // 如果没有登录,则进入login路由
      return next('/login')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> routes = [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">component</span>: Layout,
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Dashboard'</span>,
        <span class="hljs-attr">component</span>: Dashboard
      }, {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'page1'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Page1'</span>,
        <span class="hljs-attr">component</span>: Page1
      }, {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'page2'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Page2'</span>,
        <span class="hljs-attr">component</span>: Page2
      }
    ]
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Login'</span>,
    <span class="hljs-attr">component</span>: Login
  }
]

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  routes,
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>
  <span class="hljs-comment">// 其他配置</span>
})

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (to.name === <span class="hljs-string">'Login'</span>) {
    <span class="hljs-comment">// 当进入路由为login时,判断是否已经登录</span>
    <span class="hljs-keyword">if</span> (store.getters.user.isLogin) {
      <span class="hljs-comment">// 如果已经登录,则进入功能页面</span>
      <span class="hljs-keyword">return</span> next(<span class="hljs-string">'/'</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> next()
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (store.getters.user.isLogin) {
      <span class="hljs-keyword">return</span> next()
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 如果没有登录,则进入login路由</span>
      <span class="hljs-keyword">return</span> next(<span class="hljs-string">'/login'</span>)
    }
  }
})</code></pre>
<p>在设定好跳转逻辑后,我们则需要在login路由中检查是否有token并进行自动登录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Login.vue
async mounted () {
  var token = Cookie.get('vue-login-token')
  if (token) {
    var { data } = await axios.post('/api/loginByToken', {
      token: token
    })
    if (data.ok) {
      this[LOGIN]()
      Cookie.set('vue-login-token', data.token)
      this.$router.push('/')
    } else {
      // 登录失败逻辑
    }
  }
},
methods: {
  ...mapMutations([
    LOGIN
  ]),
  async login () {
    var { data } = await axios.post('/api/login', {
      username: this.username,
      password: this.password
    })
    if (data.ok) {
      this[LOGIN]()
      Cookie.set('vue-login-token', data.token)
      this.$router.push('/')
    } else {
      // 登录错误逻辑
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Login.vue</span>
<span class="hljs-keyword">async</span> mounted () {
  <span class="hljs-keyword">var</span> token = Cookie.get(<span class="hljs-string">'vue-login-token'</span>)
  <span class="hljs-keyword">if</span> (token) {
    <span class="hljs-keyword">var</span> { data } = <span class="hljs-keyword">await</span> axios.post(<span class="hljs-string">'/api/loginByToken'</span>, {
      <span class="hljs-attr">token</span>: token
    })
    <span class="hljs-keyword">if</span> (data.ok) {
      <span class="hljs-keyword">this</span>[LOGIN]()
      Cookie.set(<span class="hljs-string">'vue-login-token'</span>, data.token)
      <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 登录失败逻辑</span>
    }
  }
},
<span class="hljs-attr">methods</span>: {
  ...mapMutations([
    LOGIN
  ]),
  <span class="hljs-keyword">async</span> login () {
    <span class="hljs-keyword">var</span> { data } = <span class="hljs-keyword">await</span> axios.post(<span class="hljs-string">'/api/login'</span>, {
      <span class="hljs-attr">username</span>: <span class="hljs-keyword">this</span>.username,
      <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.password
    })
    <span class="hljs-keyword">if</span> (data.ok) {
      <span class="hljs-keyword">this</span>[LOGIN]()
      Cookie.set(<span class="hljs-string">'vue-login-token'</span>, data.token)
      <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 登录错误逻辑</span>
    }
  }
}</code></pre>
<p>同理退出登录时把token置空即可.注意这里给出的逻辑实现相对粗糙,实际应该根据需求进行改动,例如在进行自动登录的时候给用户适当的提示,把读取/存储token的逻辑放进store中进行统一管理,处理token的过时逻辑等.</p>
<h2 id="articleHeader2">页面级别权限-根据权限生成router对象</h2>
<p>这里可以借助<a href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB" rel="nofollow noreferrer" target="_blank">vue-router/路由独享的守卫</a>来进行处理.基本思路为在每一个需要检查权限的路由中设置beforeEnter钩子函数,并在其中对用户的权限进行判断.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      }, {
        path: 'page1',
        name: 'Page1',
        component: Page1,
        beforeEnter: (to, from, next) => {
          // 这里检查权限并进行跳转
          next()
        }
      }, {
        path: 'page2',
        name: 'Page2',
        component: Page2,
        beforeEnter: (to, from, next) => {
          // 这里检查权限并进行跳转
          next()
        }
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">const</span> routes = [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">component</span>: Layout,
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Dashboard'</span>,
        <span class="hljs-attr">component</span>: Dashboard
      }, {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'page1'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Page1'</span>,
        <span class="hljs-attr">component</span>: Page1,
        <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
          <span class="hljs-comment">// 这里检查权限并进行跳转</span>
          next()
        }
      }, {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'page2'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Page2'</span>,
        <span class="hljs-attr">component</span>: Page2,
        <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
          <span class="hljs-comment">// 这里检查权限并进行跳转</span>
          next()
        }
      }
    ]
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'Login'</span>,
    <span class="hljs-attr">component</span>: Login
  }
]</code></pre>
<p>上面代码是足以完成需求的,再配合上<a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">vue-router/路由懒加载</a>也可以实现对于没有权限的路由不会加载相应页面组件的资源.不过上述实现还是有一些问题.</p>
<ol>
<li>当页面权限足够细致时,router的配置将会变得更加庞大难以维护</li>
<li>每当后台更新页面权限规则时,前端的判断逻辑也要跟着改变,这就相当于前后端需要共同维护一套页面级别权限.</li>
</ol>
<p>第一个问题尚且可以通过编码手段来减轻,例如把逻辑放到beforeEach钩子中,又或者借助高阶函数对权限检查逻辑进行抽象.但是第二个问题却是无可避免的,如果我们只在后端进行路由的配置,而前端根据后端返回的配置扩展router呢,这样就可以避免在前后端共同维护一套逻辑了,根据这个思路我们对之前逻辑进行一下改写.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Login.vue
async mounted () {
  var token = Cookie.get('vue-login-token')
  if (token) {
    var { data } = await axios.post('/api/loginByToken', {
      token: token
    })
    if (data.ok) {
      this[LOGIN]()
      Cookie.set('vue-login-token', data.token)
      // 这里调用更新router的方法
      this.updateRouter(data.routes)
    }
  }
},
// ...
methods: {
  async updateRouter (routes) {
    // routes是后台返回来的路由信息
    const routers = [
      {
        path: '/',
        component: Layout,
        children: [
          {
            path: '',
            name: 'Dashboard',
            component: Dashboard
          }
        ]
      }
    ]
    routes.forEach(r => {
      routers[0].children.push({
        name: r.name,
        path: r.path,
        component: () => routesMap[r.component]
      })
    })
    this.$router.addRoutes(routers)
    this.$router.push('/')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Login.vue</span>
<span class="hljs-keyword">async</span> mounted () {
  <span class="hljs-keyword">var</span> token = Cookie.get(<span class="hljs-string">'vue-login-token'</span>)
  <span class="hljs-keyword">if</span> (token) {
    <span class="hljs-keyword">var</span> { data } = <span class="hljs-keyword">await</span> axios.post(<span class="hljs-string">'/api/loginByToken'</span>, {
      <span class="hljs-attr">token</span>: token
    })
    <span class="hljs-keyword">if</span> (data.ok) {
      <span class="hljs-keyword">this</span>[LOGIN]()
      Cookie.set(<span class="hljs-string">'vue-login-token'</span>, data.token)
      <span class="hljs-comment">// 这里调用更新router的方法</span>
      <span class="hljs-keyword">this</span>.updateRouter(data.routes)
    }
  }
},
<span class="hljs-comment">// ...</span>
methods: {
  <span class="hljs-keyword">async</span> updateRouter (routes) {
    <span class="hljs-comment">// routes是后台返回来的路由信息</span>
    <span class="hljs-keyword">const</span> routers = [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">component</span>: Layout,
        <span class="hljs-attr">children</span>: [
          {
            <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>,
            <span class="hljs-attr">name</span>: <span class="hljs-string">'Dashboard'</span>,
            <span class="hljs-attr">component</span>: Dashboard
          }
        ]
      }
    ]
    routes.forEach(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> {
      routers[<span class="hljs-number">0</span>].children.push({
        <span class="hljs-attr">name</span>: r.name,
        <span class="hljs-attr">path</span>: r.path,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> routesMap[r.component]
      })
    })
    <span class="hljs-keyword">this</span>.$router.addRoutes(routers)
    <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
  }
}</code></pre>
<p>这样就实现了根据后端的返回动态扩展路由,当然也可以根据后端的返回生成侧栏或顶栏的导航菜单,这样就不需要再在前端处理页面权限了.这里还是要再提醒一下,本文的例子只实现最基本的功能,省略了很多可优化的逻辑</p>
<ol>
<li>每打开新的tab(非login路由)时都会重新<code>自动登录</code>并重新扩展router</li>
<li>每打开新的tab,自动登录之后依然会跳转到<code>/</code>路由,就算新打开的url为<code>/page1</code>
</li>
</ol>
<p>解决思路是把用户登录信息和路由信息存储在localstorage中,当打开新tab时直接通过localstorage中存储的信息直接生成router对象.借助<a href="https://github.com/marcuswestin/store.js/" rel="nofollow noreferrer" target="_blank">store.js</a>和<a href="https://github.com/xanf/vuex-shared-mutations" rel="nofollow noreferrer" target="_blank">vuex-shared-mutations</a>一类的插件可以一定程度上简化这部分逻辑,这里不展开讨论.</p>
<h2 id="articleHeader3">模块级别权限-组件权限</h2>
<p>模块级别的权限很好理解,其实就是带权限判断的组件.在React中借助高阶组件来定义需要过滤权限的组件是非常简单且容易理解的.请看下面的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const withAuth = (Comp, auth) => {
  return class AuthComponent extends Component {
    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this)
    }

    checkAuth () {
      const auths = this.props;
      return auths.indexOf(auth) !== -1;
    }

    render () {
      if (this.checkAuth()) {
        <Comp { ...this.props }/>
      } else {
        return null
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> withAuth = <span class="hljs-function">(<span class="hljs-params">Comp, auth</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AuthComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.checkAuth = <span class="hljs-keyword">this</span>.checkAuth.bind(<span class="hljs-keyword">this</span>)
    }

    checkAuth () {
      <span class="hljs-keyword">const</span> auths = <span class="hljs-keyword">this</span>.props;
      <span class="hljs-keyword">return</span> auths.indexOf(auth) !== <span class="hljs-number">-1</span>;
    }

    render () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.checkAuth()) {
        &lt;Comp { ...this.props }/&gt;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
      }
    }
  }
}</code></pre>
<p>上面的例子展示的就是有权限时展示该组件,没有权限时则隐藏组件们可以根据不同权限过滤需求来定义各种高阶组件来处理.</p>
<p>而在vuejs中可以使用通过render函数来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Auth.vue
import { mapGetters } from 'vuex'

export default {
  name: 'Auth-Comp',
  render (h) {
    if (this.auths.indexOf(this.auth) !== -1) {
      return this.$slots.default
    } else {
      return null
    }
  },
  props: {
    auth: String
  },
  computed: {
    ...mapGetters(['auths'])
  }
}
// 使用
<Auth auth=&quot;canShowHello&quot;>
  <Hello></Hello>
</Auth>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Auth.vue</span>
<span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Auth-Comp'</span>,
  render (h) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.auths.indexOf(<span class="hljs-keyword">this</span>.auth) !== <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$slots.default
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    }
  },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">auth</span>: <span class="hljs-built_in">String</span>
  },
  <span class="hljs-attr">computed</span>: {
    ...mapGetters([<span class="hljs-string">'auths'</span>])
  }
}
<span class="hljs-comment">// 使用</span>
&lt;Auth auth=<span class="hljs-string">"canShowHello"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Hello</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/Auth&gt;</span></code></pre>
<p>vuejs中的render函数提供完全编程的能力,甚至还能在render函数使用jsx语法,获得接近React的开发体验,详情参考<a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">vuejs文档/渲染函数&amp;jsx</a>.</p>
<h2 id="articleHeader4">接口级别权限</h2>
<p>接口级别的权限一般就与UI库关联不大,这里简单讲一下如何处理.</p>
<ol>
<li>首先从后端获取允许当前用户访问的Api接口的权限</li>
<li>根据返回来的结果配置前端的ajax请求库(如axios)的拦截器</li>
<li>在拦截器中判断权限,根据需求提示用户即可</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.interceptors.request.use((config) => {
  // 这里进行权限判断
  if (/* 没有权限 */) {
    return Promise.reject('no auth')
  } else {
    return config
  }
}, err => {
  return Promise.reject(err)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
  <span class="hljs-comment">// 这里进行权限判断</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 没有权限 */</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'no auth'</span>)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> config
  }
}, err =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
})</code></pre>
<p>其实个人认为前端也不一定有必要对请求的api进行权限判断,毕竟接口不像路由,路由现在已经由前端来管理了,但是接口最终都需要通过服务器的校验.可以视需求加上.</p>
<h2 id="articleHeader5">后记</h2>
<p>写得比较乱,像流水账似的,完整的实例代码在<a href="https://github.com/funkyLover/vue-permission-control-demo" rel="nofollow noreferrer" target="_blank">github-funkyLover/vue-permission-control-demo</a>,如有问题或者意见请评论留言,我必虚心受教.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs单页应用的权限管理实践

## 原文链接
[https://segmentfault.com/a/1190000014029196](https://segmentfault.com/a/1190000014029196)

