---
title: 'vue+node+mongodb 搭建一个完整博客' 
date: 2018-12-16 2:30:10
hidden: true
slug: 26xnmi82r2f
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue + Node + Mongodb 开发一个完整博客流程</h1>
<h2 id="articleHeader1">前言</h2>
<p>前段时间刚把自己的个人网站写完， 于是这段时间因为事情不是太多，便整理了一下，写了个简易版的博客系统<br>  服务端用的是 <strong>koa2框架</strong> 进行开发</p>
<h2 id="articleHeader2">技术栈</h2>
<p>Vue + vuex + element-ui + webpack + nodeJs + koa2 + mongodb</p>
<hr>
<h2 id="articleHeader3">目录结构讲解</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013025455?w=583&amp;h=212" src="https://static.alili.tech/img/remote/1460000013025455?w=583&amp;h=212" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>build - webpack的配置文件</li>
<li>code - 放置代码文件</li>
<li>config - 项目参数配置的文件</li>
<li>logs - 日志打印文件</li>
<li>node_modules - 项目依赖模块</li>
<li>public - 项目静态文件的入口  例如: public下的 demo.html文件, 可通过 localhost:3000/demo.html  访问</li>
<li>static - 静态资源文件</li>
<li>.babelrc - babel编译</li>
<li>postcss.config.js - css后处理器配置</li>
</ul>
<h2 id="articleHeader4">build 文件讲解</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013025456?w=623&amp;h=177" src="https://static.alili.tech/img/remote/1460000013025456?w=623&amp;h=177" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul>
<li>build.js - 执行webpack编译任务, 还有打包动画 等等</li>
<li>get-less-variables.js - 解析less文件, 赋值less全局变量</li>
<li>style-loader.js - 样式loader配置</li>
<li>vue-config.js - vue配置</li>
<li>webpack.base.conf.js - webpack 基本通用配置</li>
<li>webpack.dev.conf.js - webpack 开发环境配置</li>
<li>webpack.prod.conf.js - webpack 生产环境配置</li>
</ul>
<h2 id="articleHeader5">code 文件</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013025457?w=416&amp;h=78" src="https://static.alili.tech/img/remote/1460000013025457?w=416&amp;h=78" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>1.admin - 后台管理界面源码<br><span class="img-wrap"><img data-src="/img/remote/1460000013025458?w=668&amp;h=316" src="https://static.alili.tech/img/remote/1460000013025458?w=668&amp;h=316" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src - 代码区域
  1. components - 组件
  2. filters - 过滤器
  3. font - 字体/字体图标
  4. images - 图片
  5. router - 路由
  6. store - vuex状态管理
  7. styles - 样式表
  8. utils - 请求封装
  9. views - 页面模块
  10. App.vue - app组件
  11. custom-components.js - 自定义组件导出
  12. main.js - 入口JS
index.html - webpack 模板文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>src - 代码区域
  <span class="hljs-number">1.</span> components - 组件
  <span class="hljs-number">2.</span> filters - 过滤器
  <span class="hljs-number">3.</span> font - 字体/字体图标
  <span class="hljs-number">4.</span> images - 图片
  <span class="hljs-number">5.</span> router - 路由
  <span class="hljs-number">6.</span> store - vuex状态管理
  <span class="hljs-number">7.</span> styles - 样式表
  <span class="hljs-number">8.</span> utils - 请求封装
  <span class="hljs-number">9.</span> views - 页面模块
  <span class="hljs-number">10.</span> App.vue - app组件
  <span class="hljs-number">11.</span> custom-components.js - 自定义组件导出
  <span class="hljs-number">12.</span> main.js - 入口JS
index.html - webpack 模板文件
</code></pre>
<p>2.client - web端界面源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="跟后台管理界面的结构基本一样
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>跟后台管理界面的结构基本一样
</code></pre>
<p>3.server - 服务端源码<br><span class="img-wrap"><img data-src="/img/remote/1460000013025459?w=570&amp;h=331" src="https://static.alili.tech/img/remote/1460000013025459?w=570&amp;h=331" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. controller: 所有接口逻辑代码
2. middleware: 所有的中间件
3. models: 数据库model
4. router: 路由/接口
5. app.js: 入口
6. config.js: 配置文件
7. index.js: babel编译
8. mongodb.js: mongodb配置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>controller: 所有接口逻辑代码
<span class="hljs-bullet">2. </span>middleware: 所有的中间件
<span class="hljs-bullet">3. </span>models: 数据库model
<span class="hljs-bullet">4. </span>router: 路由/接口
<span class="hljs-bullet">5. </span>app.js: 入口
<span class="hljs-bullet">6. </span>config.js: 配置文件
<span class="hljs-bullet">7. </span>index.js: babel编译
<span class="hljs-bullet">8. </span>mongodb.js: mongodb配置
</code></pre>
<h3 id="articleHeader6">config - 项目参数配置的文件</h3>
<h3 id="articleHeader7">logs - 日志文件</h3>
<h3 id="articleHeader8">public -  项目静态文件的入口</h3>
<h3 id="articleHeader9">static - 静态资源文件</h3>
<h3 id="articleHeader10">.babelrc - babel编译</h3>
<h3 id="articleHeader11">postcss.config.js - css后处理器配置</h3>
<hr>
<h1 id="articleHeader12">后台管理</h1>
<h2 id="articleHeader13">开发中用的一些依赖模块</h2>
<ul>
<li>vue/vue-router/vuex - Vue全家桶</li>
<li>axios - 一个现在主流并且很好用的请求库 支持Promise</li>
<li>qs - 用于解决axios POST请求参数的问题</li>
<li>element-ui - 饿了么出品的vue2.0 pc UI框架</li>
<li>babel-polyfill - 用于实现浏览器不支持原生功能的代码</li>
<li>highlight.js / marked- 两者搭配实现Markdown的常用语法</li>
<li>js-md5 - 用于登陆时加密</li>
<li>nprogress - 顶部加载条</li>
</ul>
<h2 id="articleHeader14">components</h2>
<p>这个文件夹一般放入常用的组件， 比如 Loading组件等等</p>
<h2 id="articleHeader15">views</h2>
<p>所有模块页面</p>
<h2 id="articleHeader16">store</h2>
<p>vuex用来统一管理公用属性， 和统一管理接口</p>
<h2 id="articleHeader17">1. 登陆</h2>
<p>登陆是采用 <strong><a href="https://www.npmjs.com/package/jsonwebtoken" rel="nofollow noreferrer" target="_blank">jsonwebtoken方案</a></strong> 来实现整个流程的</p>
<ul>
<li>
<code>jwt.sign(payload, secretOrPrivateKey, [options, callback])</code> 生成TOKEN</li>
<li>
<code>jwt.verify(token，secretOrPublicKey，[options，callback])</code> 验证TOKEN</li>
<li>获取用户的账号密码</li>
<li>
<p>通过 <code>jwt.sign</code> 方法来生成token</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server端
import jwt from 'jsonwebtoken'

let data = { //用户信息
    username,
    roles,
    ...
}

let payload = { // 可以把常用信息存进去
    id: data.userId, //用户ID
    username: data.username, // 用户名
    roles: data.roles // 用户权限
},
secret = 'admin_token'

// 通过调用 sign 方法, 把 **用户信息**、**密钥** 生成token，并设置过期时间 
let token = jwt.sign(payload, secret, {expiresIn: '24h'})

// 存入cookie发送给前台
ctx.cookies.set('Token-Auth', token, {httpOnly: false })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//server端</span>
<span class="hljs-keyword">import</span> jwt from <span class="hljs-string">'jsonwebtoken'</span>

<span class="hljs-keyword">let</span> <span class="hljs-built_in">data</span> = { <span class="hljs-comment">//用户信息</span>
    username,
    roles,
    <span class="hljs-params">...</span>
}

<span class="hljs-keyword">let</span> payload = { <span class="hljs-comment">// 可以把常用信息存进去</span>
    id: <span class="hljs-built_in">data</span>.userId, <span class="hljs-comment">//用户ID</span>
    username: <span class="hljs-built_in">data</span>.username, <span class="hljs-comment">// 用户名</span>
    roles: <span class="hljs-built_in">data</span>.roles <span class="hljs-comment">// 用户权限</span>
},
secret = <span class="hljs-string">'admin_token'</span>

<span class="hljs-comment">// 通过调用 sign 方法, 把 **用户信息**、**密钥** 生成token，并设置过期时间 </span>
<span class="hljs-keyword">let</span> token = jwt.sign(payload, secret, {expiresIn: <span class="hljs-string">'24h'</span>})

<span class="hljs-comment">// 存入cookie发送给前台</span>
ctx.cookies.<span class="hljs-built_in">set</span>(<span class="hljs-string">'Token-Auth'</span>, token, {httpOnly: <span class="hljs-literal">false</span> })</code></pre>
</li>
<li>每次请求数据的时候通过 <code>jwt.verify</code> 检测token的合法性 <code>jwt.verify(token, secret)</code>
</li>
</ul>
<h2 id="articleHeader18">2. 权限</h2>
<p><strong> 通过不同的权限来动态修改路由表</strong></p>
<ul>
<li>
<p>通过 vue的 钩子函数 beforeEach 来控制并展示哪些路由， 以及判断是否需要登陆</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from '../store'
import { getToken } from 'src/utils/auth'
import { router } from './index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
    NProgress.start()

    if (getToken()) { //存在token
        if (to.path === '/login') { //当前页是登录直接跳过进入主页
            next('/')
        }else{
            if (!store.state.user.roles) { //拉取用户信息
                store.dispatch('getUserInfo').then( res => {
                    let roles = res.data.roles
                    store.dispatch('setRoutes', {roles}).then( () => { //根据权限动态添加路由
                        router.addRoutes(store.state.permission.addRouters)
                        next({ ...to }) //hash模式  确保路由加载完成
                    })
                })
            }else{
                next()
            }
        }
    }else{
        if (whiteList.indexOf(to.path) >= 0) { //是否在白名单内,不在的话直接跳转登录页
            next()
        }else{
            next('/login')
        }

    }    

})
router.afterEach((to, from) => {
    document.title = to.name
    NProgress.done()
})

export default router
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../store'</span>
<span class="hljs-keyword">import</span> { getToken } <span class="hljs-keyword">from</span> <span class="hljs-string">'src/utils/auth'</span>
<span class="hljs-keyword">import</span> { router } <span class="hljs-keyword">from</span> <span class="hljs-string">'./index'</span>
<span class="hljs-keyword">import</span> NProgress <span class="hljs-keyword">from</span> <span class="hljs-string">'nprogress'</span> <span class="hljs-comment">// Progress 进度条</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'nprogress/nprogress.css'</span> <span class="hljs-comment">// Progress 进度条样式</span>

<span class="hljs-keyword">const</span> whiteList = [<span class="hljs-string">'/login'</span>];
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    NProgress.start()

    <span class="hljs-keyword">if</span> (getToken()) { <span class="hljs-comment">//存在token</span>
        <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">'/login'</span>) { <span class="hljs-comment">//当前页是登录直接跳过进入主页</span>
            next(<span class="hljs-string">'/'</span>)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">if</span> (!store.state.user.roles) { <span class="hljs-comment">//拉取用户信息</span>
                store.dispatch(<span class="hljs-string">'getUserInfo'</span>).then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                    <span class="hljs-keyword">let</span> roles = res.data.roles
                    store.dispatch(<span class="hljs-string">'setRoutes'</span>, {roles}).then( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-comment">//根据权限动态添加路由</span>
                        router.addRoutes(store.state.permission.addRouters)
                        next({ ...to }) <span class="hljs-comment">//hash模式  确保路由加载完成</span>
                    })
                })
            }<span class="hljs-keyword">else</span>{
                next()
            }
        }
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">if</span> (whiteList.indexOf(to.path) &gt;= <span class="hljs-number">0</span>) { <span class="hljs-comment">//是否在白名单内,不在的话直接跳转登录页</span>
            next()
        }<span class="hljs-keyword">else</span>{
            next(<span class="hljs-string">'/login'</span>)
        }

    }    

})
router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span></span>) =&gt;</span> {
    <span class="hljs-built_in">document</span>.title = to.name
    NProgress.done()
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router
</code></pre>
<ul><li>
<p>通过调用 <code>getUserInfo</code>方法传入 token 获取用户信息, 后台直接解析 token 获取里面的 信息 返回给前台</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getUserInfo ({state, commit}) {
    return new Promise( (resolve, reject) => {
        axios.get('user/info',{
            token: state.token
        }).then( res => {
            commit('SET_USERINFO', res.data)
            resolve(res)
        }).catch( err => {
            reject(err)
        })
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>getUserInfo ({state, commit}) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        axios.get(<span class="hljs-string">'user/info'</span>,{
            <span class="hljs-attr">token</span>: state.token
        }).then( <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
            commit(<span class="hljs-string">'SET_USERINFO'</span>, res.data)
            resolve(res)
        }).catch( <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
            reject(err)
        })
    })
}</code></pre>
</li></ul>
</li>
<li>
<p>通过调用 <code>setRoutes</code>方法 动态生成路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { constantRouterMap, asyncRouterMap } from 'src/router'

const hasPermission = (roles, route) => {
    if (route.meta &amp;&amp; route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

const filterAsyncRouter = (asyncRouterMap, roles) => {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children &amp;&amp; route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routes: constantRouterMap.concat(asyncRouterMap),
        addRouters: []
    },
    mutations: {
        SETROUTES(state, routers) {
            state.addRouters = routers;
            state.routes = constantRouterMap.concat(routers);
        }
    },
    actions: {
        setRoutes({ commit }, info) {
            return new Promise( (resolve, reject) => {
                let {roles} = info;
                let accessedRouters = [];
                if (roles.indexOf('admin') >= 0) {
                    accessedRouters = asyncRouterMap;
                }else{
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }

                commit('SETROUTES', accessedRouters)
                resolve()
            })
        }
        
    }
}
export default permission" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { constantRouterMap, asyncRouterMap } <span class="hljs-keyword">from</span> <span class="hljs-string">'src/router'</span>

<span class="hljs-keyword">const</span> hasPermission = <span class="hljs-function">(<span class="hljs-params">roles, route</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (route.meta &amp;&amp; route.meta.role) {
        <span class="hljs-keyword">return</span> roles.some(<span class="hljs-function"><span class="hljs-params">role</span> =&gt;</span> route.meta.role.indexOf(role) &gt;= <span class="hljs-number">0</span>)
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }
}

<span class="hljs-keyword">const</span> filterAsyncRouter = <span class="hljs-function">(<span class="hljs-params">asyncRouterMap, roles</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> accessedRouters = asyncRouterMap.filter(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (hasPermission(roles, route)) {
            <span class="hljs-keyword">if</span> (route.children &amp;&amp; route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    })
    <span class="hljs-keyword">return</span> accessedRouters
}

<span class="hljs-keyword">const</span> permission = {
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">routes</span>: constantRouterMap.concat(asyncRouterMap),
        <span class="hljs-attr">addRouters</span>: []
    },
    <span class="hljs-attr">mutations</span>: {
        SETROUTES(state, routers) {
            state.addRouters = routers;
            state.routes = constantRouterMap.concat(routers);
        }
    },
    <span class="hljs-attr">actions</span>: {
        setRoutes({ commit }, info) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                <span class="hljs-keyword">let</span> {roles} = info;
                <span class="hljs-keyword">let</span> accessedRouters = [];
                <span class="hljs-keyword">if</span> (roles.indexOf(<span class="hljs-string">'admin'</span>) &gt;= <span class="hljs-number">0</span>) {
                    accessedRouters = asyncRouterMap;
                }<span class="hljs-keyword">else</span>{
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }

                commit(<span class="hljs-string">'SETROUTES'</span>, accessedRouters)
                resolve()
            })
        }
        
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> permission</code></pre>
</li>
</ul>
<h2 id="articleHeader19">axios 请求封装, 统一对请求进行管理</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'


axios.defaults.withCredentials = true 

// 发送时
axios.interceptors.request.use(config => {
    // 开始（LLoading动画..）
    return config
}, err => {
    return Promise.reject(err)
})

// 响应时
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus(res) { 
    // 结束（结束动画..）
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    return res
}


// 检查CODE值
function checkCode(res) {
    if (res.code === 0) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 2 * 1000
        })

        throw new Error(res.msg)
    }
    
    return res
}

const prefix = '/admin_demo_api/'
export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: prefix + url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: prefix + url,
            data: qs.stringify(data),
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    postFile(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: prefix + url,
            data
        }).then(checkStatus).then(checkCode)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>
<span class="hljs-keyword">import</span> { Message } <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>


axios.defaults.withCredentials = <span class="hljs-literal">true</span> 

<span class="hljs-comment">// 发送时</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-comment">// 开始（LLoading动画..）</span>
    <span class="hljs-keyword">return</span> config
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
})

<span class="hljs-comment">// 响应时</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve(err.response))

<span class="hljs-comment">// 检查状态码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkStatus</span>(<span class="hljs-params">res</span>) </span>{ 
    <span class="hljs-comment">// 结束（结束动画..）</span>
    <span class="hljs-keyword">if</span> (res.status === <span class="hljs-number">200</span> || res.status === <span class="hljs-number">304</span>) {
        <span class="hljs-keyword">return</span> res.data
    }
    <span class="hljs-keyword">return</span> {
        code: <span class="hljs-number">0</span>,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    <span class="hljs-keyword">return</span> res
}


<span class="hljs-comment">// 检查CODE值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkCode</span>(<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">if</span> (res.code === <span class="hljs-number">0</span>) {
        Message({
          message: res.msg,
          <span class="hljs-keyword">type</span>: <span class="hljs-string">'error'</span>,
          duration: <span class="hljs-number">2</span> * <span class="hljs-number">1000</span>
        })

        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(res.msg)
    }
    
    <span class="hljs-keyword">return</span> res
}

<span class="hljs-keyword">const</span> prefix = <span class="hljs-string">'/admin_demo_api/'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">get</span>(url, params) {
        <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">return</span> axios({
            method: <span class="hljs-string">'get'</span>,
            url: prefix + url,
            params,
            timeout: <span class="hljs-number">30000</span>
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">return</span> axios({
            method: <span class="hljs-string">'post'</span>,
            url: prefix + url,
            data: qs.stringify(data),
            timeout: <span class="hljs-number">30000</span>
        }).then(checkStatus).then(checkCode)
    },
    postFile(url, data) {
        <span class="hljs-keyword">if</span> (!url) <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">return</span> axios({
            method: <span class="hljs-string">'post'</span>,
            url: prefix + url,
            data
        }).then(checkStatus).then(checkCode)
    }
}
</code></pre>
<h2 id="articleHeader20">面包屑 / 标签路径</h2>
<ul>
<li>通过检测路由来把当前路径转换成面包屑</li>
<li>
<p>把访问过的路径储存在本地，记录下来，通过标签直接访问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 面包屑
getBreadcrumb() {
    let matched = this.$route.matched.filter(item => item.name);
    let first = matched[0],
        second = matched[1];
    if (first &amp;&amp; first.name !== '首页' &amp;&amp; first.name !== '') {
        matched = [{name: '首页', path: '/'}].concat(matched);
    }
    if (second &amp;&amp; second.name === '首页') {
        this.levelList = [second];
    }else{
        this.levelList = matched;
    }
}

// 检测路由变化 
watch: {
    $route() {
        this.getBreadcrumb();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 面包屑</span>
getBreadcrumb() {
    let matched = <span class="hljs-keyword">this</span>.$route.matched.<span class="hljs-built_in">filter</span>(item =&gt; item.name);
    let first = matched[<span class="hljs-number">0</span>],
        <span class="hljs-built_in">second</span> = matched[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">if</span> (first &amp;&amp; first.name !== <span class="hljs-string">'首页'</span> &amp;&amp; first.name !== <span class="hljs-string">''</span>) {
        matched = [{name: <span class="hljs-string">'首页'</span>, path: <span class="hljs-string">'/'</span>}].<span class="hljs-built_in">concat</span>(matched);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">second</span> &amp;&amp; <span class="hljs-built_in">second</span>.name === <span class="hljs-string">'首页'</span>) {
        <span class="hljs-keyword">this</span>.levelList = [<span class="hljs-built_in">second</span>];
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.levelList = matched;
    }
}

<span class="hljs-comment">// 检测路由变化 </span>
watch: {
    $route() {
        <span class="hljs-keyword">this</span>.getBreadcrumb();
    }
}</code></pre>
</li>
</ul>
<p>上面介绍了几个主要以及必备的后台管理功能，其余的功能模块 按照需求增加就好</p>
<hr>
<h1 id="articleHeader21">前台</h1>
<p>前台展示的页面跟后台管理界面差不多， 也是用vue+webpack搭建，基本的结构都差不多，具体代码实现的可以直接在<a href="https://github.com/cd-dongzi/vue-node-blog" rel="nofollow noreferrer" target="_blank">github</a>下载便行</p>
<hr>
<h1 id="articleHeader22">server端</h1>
<h2 id="articleHeader23">权限</h2>
<p>主要是通过 <code>jsonwebtoken</code> 的verify方法检测cookie 里面的token 验证它的合法性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import jwt from 'jsonwebtoken'
import conf from '../../config'

export default () => {
    return async (ctx, next) => {
        if ( conf.auth.blackList.some(v => ctx.path.indexOf(v) >= 0) ) { // 检测是否在黑名单内
            let token = ctx.cookies.get(conf.auth.tokenKey);
            try {
                jwt.verify(token, conf.auth.admin_secret);
            }catch (e) {
                if ('TokenExpiredError' === e.name) {
                    ctx.sendError('token已过期, 请重新登录!');
                    ctx.throw(401, 'token expired,请及时本地保存数据！');
                }
                ctx.sendError('token验证失败, 请重新登录!');
                ctx.throw(401, 'invalid token');
            }
            console.log(&quot;鉴权成功&quot;);
        }
        await next();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">import</span> jwt from <span class="hljs-string">'jsonwebtoken'</span>
<span class="hljs-keyword">import</span> conf from <span class="hljs-string">'../../config'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">if</span> ( conf.auth.blackList.some(v =&gt; ctx.path.indexOf(v) &gt;= <span class="hljs-number">0</span>) ) { <span class="hljs-comment">// 检测是否在黑名单内</span>
            let token = ctx.cookies.<span class="hljs-keyword">get</span>(conf.auth.tokenKey);
            <span class="hljs-keyword">try</span> {
                jwt.verify(token, conf.auth.admin_secret);
            }<span class="hljs-keyword">catch</span> (e) {
                <span class="hljs-keyword">if</span> (<span class="hljs-string">'TokenExpiredError'</span> === e.name) {
                    ctx.sendError(<span class="hljs-string">'token已过期, 请重新登录!'</span>);
                    ctx.<span class="hljs-keyword">throw</span>(<span class="hljs-number">401</span>, <span class="hljs-string">'token expired,请及时本地保存数据！'</span>);
                }
                ctx.sendError(<span class="hljs-string">'token验证失败, 请重新登录!'</span>);
                ctx.<span class="hljs-keyword">throw</span>(<span class="hljs-number">401</span>, <span class="hljs-string">'invalid token'</span>);
            }
            console.log(<span class="hljs-string">"鉴权成功"</span>);
        }
        <span class="hljs-keyword">await</span> next();
    }
}</code></pre>
<h2 id="articleHeader24">日志</h2>
<p>日志是采用 <code>log4js</code> 来进行管理的， <br><code>log4js</code> 算 nodeJs 常用的日志处理模块，用起来额也比较简单</p>
<ul>
<li>
<p>log4js 的日志分为九个等级，各个级别的名字和权重如下：</p>
<blockquote>图</blockquote>
</li>
<li>设置  Logger 实例的类型 <code>logger = log4js.getLogger('cheese')</code>
</li>
<li>通过 <strong><code>Appender</code></strong> 来控制文件的 <strong>名字</strong>、<strong>路径</strong>、<strong>类型</strong>
</li>
<li>配置到 <code>log4js.configure</code>
</li>
<li>
<p>便可通过 logger 上的打印方法 来输出日志了 <code>logger.info(JSON.stringify(currTime: </code>当前时间为${Date.now()}s<code>))</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//指定要记录的日志分类
let appenders = {}
appenders.all = {
    type: 'dateFile', //日志文件类型，可以使用日期作为文件名的占位符
    filename: `${dir}/all/`, //日志文件名，可以设置相对路径或绝对路径 
    pattern: 'task-yyyy-MM-dd.log', //占位符，紧跟在filename后面  
    alwaysIncludePattern: true //是否总是有后缀名 
}
let logConfig = {
    appenders,

    /**
     * 指定日志的默认配置项
     * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
     */
    categories: {
        default: {
            appenders: Object.keys(appenders),
            level: logLevel
        }
    }
}
log4js.configure(logConfig)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
<span class="hljs-comment">//指定要记录的日志分类</span>
<span class="hljs-keyword">let</span> appenders = {}
appenders.all = {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'dateFile'</span>, <span class="hljs-comment">//日志文件类型，可以使用日期作为文件名的占位符</span>
    filename: <span class="hljs-string">`<span class="hljs-subst">${dir}</span>/all/`</span>, <span class="hljs-comment">//日志文件名，可以设置相对路径或绝对路径 </span>
    pattern: <span class="hljs-string">'task-yyyy-MM-dd.log'</span>, <span class="hljs-comment">//占位符，紧跟在filename后面  </span>
    alwaysIncludePattern: <span class="hljs-literal">true</span> <span class="hljs-comment">//是否总是有后缀名 </span>
}
<span class="hljs-keyword">let</span> logConfig = {
    appenders,

    <span class="hljs-comment">/**
     * 指定日志的默认配置项
     * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
     */</span>
    categories: {
        <span class="hljs-keyword">default</span>: {
            appenders: <span class="hljs-built_in">Object</span>.keys(appenders),
            level: logLevel
        }
    }
}
log4js.configure(logConfig)
</code></pre>
</li>
</ul>
<h2 id="articleHeader25">定制书写规范(API)</h2>
<ul><li>
<p>设计思路<br>  当应用程序启动时候，读取指定目录下的 js 文件，以文件名作为属性名，挂载在实例 app 上，然后把文件中的接口函数，扩展到文件对象上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//other.js
const path = require('path');

module.exports = {
    async markdown_upload_img (ctx, next) {
        console.log('----------------添加图片 markdown_upload_img-----------------------');
        let opts = {
            path: path.resolve(__dirname, '../../../../public')
        }
        let result = await ctx.uploadFile(ctx, opts)
        ctx.send(result)
    },

    async del_markdown_upload_img (ctx, next) {
        console.log('----------------删除图片 del_markdown_upload_img-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(musicModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
        // console.log(id)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//other.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">async</span> markdown_upload_img (ctx, next) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'----------------添加图片 markdown_upload_img-----------------------'</span>);
        <span class="hljs-keyword">let</span> opts = {
            <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'../../../../public'</span>)
        }
        <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> ctx.uploadFile(ctx, opts)
        ctx.send(result)
    },

    <span class="hljs-keyword">async</span> del_markdown_upload_img (ctx, next) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'----------------删除图片 del_markdown_upload_img-----------------------'</span>);
        <span class="hljs-keyword">let</span> id = ctx.request.query.id
        <span class="hljs-keyword">try</span> {
            ctx.remove(musicModel, {<span class="hljs-attr">_id</span>: id})
            ctx.send()
        }<span class="hljs-keyword">catch</span>(e){
            ctx.sendError(e)
        }
        <span class="hljs-comment">// console.log(id)</span>
    }
}</code></pre>
<p>读取出来的便是以下形式：<br><code>app.controller.admin.other.markdown_upload_img</code> 便能读取到 <code>markdown_upload_img</code> 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async markdown_upload_img (ctx, next) {
    console.log('----------------添加图片 markdown_upload_img-----------------------');
    let opts = {
        path: path.resolve(__dirname, '../../../../public')
    }
    let result = await ctx.uploadFile(ctx, opts)
    ctx.send(result)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">markdown_upload_img</span> (<span class="hljs-params">ctx, next</span>) </span>{
    console.log(<span class="hljs-string">'----------------添加图片 markdown_upload_img-----------------------'</span>);
    <span class="hljs-keyword">let</span> opts = {
        path: path.resolve(__dirname, <span class="hljs-string">'../../../../public'</span>)
    }
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> ctx.uploadFile(ctx, opts)
    ctx.send(result)
}</code></pre>
<p>在把该形式的方法 赋值过去就行 <br><code>router.post('/markdown_upload_img', app.controller.admin.other.markdown_upload_img)</code></p>
</li></ul>
<h2 id="articleHeader26">通过 <code>mongoose</code> 链接 <strong>mongodb</strong>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import mongoose from 'mongoose'
import conf from './config'
// const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`
const DB_URL = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}`; // 账号登陆
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, { useMongoClient: true }, err => {
    if (err) {
        console.log(&quot;数据库连接失败！&quot;)
    }else{
        console.log(&quot;数据库连接成功！&quot;)
    }
})
export default mongoose
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">'mongoose'</span>
<span class="hljs-keyword">import</span> conf <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>
<span class="hljs-comment">// const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`</span>
<span class="hljs-keyword">const</span> DB_URL = <span class="hljs-string">`mongodb://<span class="hljs-subst">${conf.mongodb.username}</span>:<span class="hljs-subst">${conf.mongodb.pwd}</span>@<span class="hljs-subst">${conf.mongodb.address}</span>/<span class="hljs-subst">${conf.mongodb.db}</span>`</span>; <span class="hljs-comment">// 账号登陆</span>
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, { useMongoClient: <span class="hljs-literal">true</span> }, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"数据库连接失败！"</span>)
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"数据库连接成功！"</span>)
    }
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> mongoose
</code></pre>
<h2 id="articleHeader27">封装返回的send函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default () => {
    let render = ctx => {
        return (json, msg) => {
            ctx.set(&quot;Content-Type&quot;, &quot;application/json&quot;);
            ctx.body = JSON.stringify({
                code: 1,
                data: json || {},
                msg: msg || 'success'
            });
        }
    }
    let renderError = ctx => {
        return msg => {
            ctx.set(&quot;Content-Type&quot;, &quot;application/json&quot;);
            ctx.body = JSON.stringify({
                code: 0,
                data: {},
                msg: msg.toString()
            });
        }
    }
    return async (ctx, next) => {
        ctx.send = render(ctx);
        ctx.sendError = renderError(ctx);
        await next()    
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; {
    <span class="hljs-keyword">let</span> render = <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">json, msg</span>) =&gt;</span> {
            ctx.set(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json"</span>);
            ctx.body = <span class="hljs-built_in">JSON</span>.stringify({
                <span class="hljs-attr">code</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">data</span>: json || {},
                <span class="hljs-attr">msg</span>: msg || <span class="hljs-string">'success'</span>
            });
        }
    }
    <span class="hljs-keyword">let</span> renderError = <span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">msg</span> =&gt;</span> {
            ctx.set(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json"</span>);
            ctx.body = <span class="hljs-built_in">JSON</span>.stringify({
                <span class="hljs-attr">code</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">data</span>: {},
                <span class="hljs-attr">msg</span>: msg.toString()
            });
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        ctx.send = render(ctx);
        ctx.sendError = renderError(ctx);
        <span class="hljs-keyword">await</span> next()    
    }
}</code></pre>
<h2 id="articleHeader28">通过 <code>koa-static</code> 管理静态文件入口</h2>
<h2 id="articleHeader29">注意事项：</h2>
<ol>
<li>
<code>cnpm run server</code> 启动服务器</li>
<li>启动时，记得启动mongodb数据库，账号密码  可以在 server/config.js  文件下进行配置</li>
<li>
<code>db.createUser({user:"cd",pwd:"123456",roles:[{role:"readWrite",db:'test'}]})</code> (mongodb 注册用户)</li>
<li>
<code>cnpm run dev:admin</code> 启动后台管理界面</li>
<li>登录后台管理界面录制数据</li>
<li>
<p>登录后台管理时需要在数据库 创建 users 集合注册一个账号进行登录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="db.users.insert({
    &quot;name&quot; : &quot;cd&quot;,
    &quot;pwd&quot; : &quot;e10adc3949ba59abbe56e057f20f883e&quot;,
    &quot;username&quot; : &quot;admin&quot;,
    &quot;roles&quot; : [ 
        &quot;admin&quot;
    ]
})

// 账号： admin  密码： 123456" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>db<span class="hljs-selector-class">.users</span><span class="hljs-selector-class">.insert</span>({
    <span class="hljs-string">"name"</span> : <span class="hljs-string">"cd"</span>,
    <span class="hljs-string">"pwd"</span> : <span class="hljs-string">"e10adc3949ba59abbe56e057f20f883e"</span>,
    <span class="hljs-string">"username"</span> : <span class="hljs-string">"admin"</span>,
    <span class="hljs-string">"roles"</span> : [ 
        <span class="hljs-string">"admin"</span>
    ]
})

<span class="hljs-comment">// 账号： admin  密码： 123456</span></code></pre>
</li>
<li>
<code>cnpm run dev:client</code> 启动前台页面</li>
</ol>
<p><strong>参考文章</strong></p>
<blockquote>
<a href="http://dzblog.cn/article/5a69609c3c04164b0bd4b964" rel="nofollow noreferrer" target="_blank">个人博客</a><br><a href="https://github.com/cd-dongzi/vue-node-blog" rel="nofollow noreferrer" target="_blank">github</a><br><a href="https://github.com/ikcamp/koa2-tutorial" rel="nofollow noreferrer" target="_blank">基于Koa2搭建Node.js实战项目教程</a><br><a href="https://segmentfault.com/a/1190000010043013">手摸手，带你用vue撸后台</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+node+mongodb 搭建一个完整博客

## 原文链接
[https://segmentfault.com/a/1190000013025450](https://segmentfault.com/a/1190000013025450)

