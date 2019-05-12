---
title: 'Vue 后台模板 [Vue admin] SanJi Boot Admin Iview' 
date: 2018-12-18 2:30:10
hidden: true
slug: n1pcle8ybqg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">导读：</h2>
<p>很久没有写文章了,最近一直在忙,之前一直想着可以把SanJi Boot Security项目中的页面使用 Vue+webpack 进行重写,前几天算是阶段性的完成了这个计划,后期会随着SanJi Boot 的模块不断增多 对<a href="https://gitee.com/sunxyz/sanji-boot-admin/tree/master/sanji-boot-admin-iview" rel="nofollow noreferrer" target="_blank">其</a>进行对应的升级与扩展</p>
<h2 id="articleHeader1">简介:</h2>
<p>项目源码已托管到<a href="https://gitee.com/sunxyz/sanji-boot-admin/tree/master/sanji-boot-admin-iview" rel="nofollow noreferrer" target="_blank">码云上</a></p>
<h3 id="articleHeader2">使用技术：</h3>
<p>webpack + Vue + Vue Router + iviewUI</p>
<h3 id="articleHeader3">实现了什么功能：</h3>
<p><strong>基于token进行登陆时的认证 支持跨域 需要后台配合</strong></p>
<p>修改 config/index.js 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { '/api':
      {
        target:'http://localhost:8089/api',
        changeOrigin:true,
        pathRewrite:{
        '^/api': ''
        }
      }
    }
   ...
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  dev: {

    <span class="hljs-comment">// Paths</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    proxyTable: { <span class="hljs-string">'/api'</span>:
      {
        target:<span class="hljs-string">'http://localhost:8089/api'</span>,
        changeOrigin:<span class="hljs-keyword">true</span>,
        pathRewrite:{
        <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }
      }
    }
   ...
  }
}
</code></pre>
<p>自定义 axios  src/api/http.js 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import router from '../router'
import axios from 'axios'
import bus from '../bus'


// axios 配置
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  config => {
    if (bus.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${bus.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          bus.state.token=undefined;
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
export default axios;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'../router'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../bus'</span>


<span class="hljs-comment">// axios 配置</span>
axios.defaults.timeout = <span class="hljs-number">30000</span>;

axios.interceptors.request.use(
  <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (bus.state.token) {  <span class="hljs-comment">// 判断是否存在token，如果存在的话，则每个http header都加上token</span>
      config.headers.Authorization = <span class="hljs-string">`<span class="hljs-subst">${bus.state.token}</span>`</span>;
    }
    <span class="hljs-keyword">return</span> config;
  },
  <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
  });

<span class="hljs-comment">// http response 拦截器</span>
axios.interceptors.response.use(
  <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> response;
  },
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (error.response) {
      <span class="hljs-keyword">switch</span> (error.response.status) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
          <span class="hljs-comment">// 返回 401 清除token信息并跳转到登录页面</span>
          bus.state.token=<span class="hljs-literal">undefined</span>;
          router.replace({
            path: <span class="hljs-string">'login'</span>,
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data)   <span class="hljs-comment">// 返回接口返回的错误信息</span>
  });
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> axios;
</code></pre>
<p><strong>基于Vue Router 在进入页面前进行权限的前端认证</strong></p>
<p>编写 src/router/index.js 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import bus from '../bus'

Vue.use(Router)

//base

const Index = resolve => require(['../views/Index'], resolve)

const Login = resolve => require(['../views/Login'], resolve)

const Home = resolve => require(['../views/demo/Home'], resolve)

const Forbidden = resolve => require(['../views/demo/403'], resolve)

const NotFound = resolve => require(['../views/demo/NotFound'], resolve)

const Icon = resolve => require(['../views/demo/Icon'], resolve)

const Demo = resolve => require(['../views/demo/Demo'], resolve)

// sys

const UserManager = resolve => require(['../views/sys/User'], resolve)

const RoleManager = resolve => require(['../views/sys/Role'], resolve)



const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '//',
          name: '首页',
          component: Home,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/demo',
          name: 'demo',
          component: Demo,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        }, {
          path: '/icon',
          name: 'icon',
          component: Icon,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/sys/user',
          name: '用戶管理',
          component: UserManager,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            permissions:'sys-user'
          }
        },
        {
          path: '/sys/role',
          name: '角色管理',
          component: RoleManager,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            permissions:'sys-role'
          }
        },
        {
          path: '/403',
          name: '403',
          component: Forbidden,
        },{
          path: '/*',
          name: '404',
          component: NotFound,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    }]
});

router.beforeEach((to, from, next) => {
  if (to.path === &quot;/logout&quot;) {
    bus.state.token = undefined;
    next({
      path: '/login'
    })
  }else{
    bus.state.menu_title = to.name;
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      // console.log('token:',bus.state.token!=null,bus.state.token,)
      if (bus.state.token!=&quot;undefined&quot;&amp;&amp;bus.state.token) {  // 通过vuex state获取当前的token是否存在
        if(to.meta.permissions){
          if(bus.action.hasPermissions(bus,to.meta.permissions)){
            next();
          }else{
            bus.state.menu_title = '403'
            next('/403');
          }
        }else{
          next();
        }
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      next();
    }
  }
})

export default router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> bus <span class="hljs-keyword">from</span> <span class="hljs-string">'../bus'</span>

Vue.use(Router)

<span class="hljs-comment">//base</span>

<span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/Index'</span>], resolve)

<span class="hljs-keyword">const</span> Login = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/Login'</span>], resolve)

<span class="hljs-keyword">const</span> Home = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/demo/Home'</span>], resolve)

<span class="hljs-keyword">const</span> Forbidden = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/demo/403'</span>], resolve)

<span class="hljs-keyword">const</span> NotFound = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/demo/NotFound'</span>], resolve)

<span class="hljs-keyword">const</span> Icon = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/demo/Icon'</span>], resolve)

<span class="hljs-keyword">const</span> Demo = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/demo/Demo'</span>], resolve)

<span class="hljs-comment">// sys</span>

<span class="hljs-keyword">const</span> UserManager = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/sys/User'</span>], resolve)

<span class="hljs-keyword">const</span> RoleManager = <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'../views/sys/Role'</span>], resolve)



<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'login'</span>,
      <span class="hljs-attr">component</span>: Login
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
      <span class="hljs-attr">component</span>: Index,
      <span class="hljs-attr">meta</span>: {
        <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
      },
      <span class="hljs-attr">children</span>: [
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'//'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'首页'</span>,
          <span class="hljs-attr">component</span>: Home,
          <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
          },
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/demo'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'demo'</span>,
          <span class="hljs-attr">component</span>: Demo,
          <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
          },
        }, {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/icon'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'icon'</span>,
          <span class="hljs-attr">component</span>: Icon,
          <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
          },
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/sys/user'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'用戶管理'</span>,
          <span class="hljs-attr">component</span>: UserManager,
          <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
            permissions:<span class="hljs-string">'sys-user'</span>
          }
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/sys/role'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'角色管理'</span>,
          <span class="hljs-attr">component</span>: RoleManager,
          <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
            permissions:<span class="hljs-string">'sys-role'</span>
          }
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/403'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'403'</span>,
          <span class="hljs-attr">component</span>: Forbidden,
        },{
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/*'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'404'</span>,
          <span class="hljs-attr">component</span>: NotFound,
          <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
          }
        }
      ]
    }]
});

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">"/logout"</span>) {
    bus.state.token = <span class="hljs-literal">undefined</span>;
    next({
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>
    })
  }<span class="hljs-keyword">else</span>{
    bus.state.menu_title = to.name;
    <span class="hljs-keyword">if</span> (to.meta.requireAuth) {  <span class="hljs-comment">// 判断该路由是否需要登录权限</span>
      <span class="hljs-comment">// console.log('token:',bus.state.token!=null,bus.state.token,)</span>
      <span class="hljs-keyword">if</span> (bus.state.token!=<span class="hljs-string">"undefined"</span>&amp;&amp;bus.state.token) {  <span class="hljs-comment">// 通过vuex state获取当前的token是否存在</span>
        <span class="hljs-keyword">if</span>(to.meta.permissions){
          <span class="hljs-keyword">if</span>(bus.action.hasPermissions(bus,to.meta.permissions)){
            next();
          }<span class="hljs-keyword">else</span>{
            bus.state.menu_title = <span class="hljs-string">'403'</span>
            next(<span class="hljs-string">'/403'</span>);
          }
        }<span class="hljs-keyword">else</span>{
          next();
        }
      } <span class="hljs-keyword">else</span> {
        next({
          <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
          <span class="hljs-attr">query</span>: {<span class="hljs-attr">redirect</span>: to.fullPath}  <span class="hljs-comment">// 将跳转的路由path作为参数，登录成功后跳转到该路由</span>
        })
      }
    } <span class="hljs-keyword">else</span> {
      next();
    }
  }
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router;</code></pre>
<p><strong>后台界面主框架 material design 风格</strong></p>
<p>基于material_admin 实现前端界面响应式设计 支持快速切换后台界面主框架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <Index :current_system=&quot;current_system&quot; :system_list=&quot;system_list&quot; :user=&quot;user&quot; :user_menus=&quot;user_menus&quot;
         :menus=&quot;menus&quot; :menu_title=&quot;bus.state.menu_title&quot;
         @click_sys_switch=&quot;sys_switch&quot; @click_search=&quot;search&quot; @open_tab=&quot;open_tab&quot;>
    <transition name=&quot;slide-left&quot;>
      <router-view></router-view>
    </transition>
  </Index>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">Index</span> <span class="hljs-attr">:current_system</span>=<span class="hljs-string">"current_system"</span> <span class="hljs-attr">:system_list</span>=<span class="hljs-string">"system_list"</span> <span class="hljs-attr">:user</span>=<span class="hljs-string">"user"</span> <span class="hljs-attr">:user_menus</span>=<span class="hljs-string">"user_menus"</span>
         <span class="hljs-attr">:menus</span>=<span class="hljs-string">"menus"</span> <span class="hljs-attr">:menu_title</span>=<span class="hljs-string">"bus.state.menu_title"</span>
         @<span class="hljs-attr">click_sys_switch</span>=<span class="hljs-string">"sys_switch"</span> @<span class="hljs-attr">click_search</span>=<span class="hljs-string">"search"</span> @<span class="hljs-attr">open_tab</span>=<span class="hljs-string">"open_tab"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"slide-left"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Index</span>&gt;</span>
</code></pre>
<h3 id="articleHeader4">目前有哪些功能模块：</h3>
<p>用户管理<br>角色管理<br>demo表格+Icon图标</p>
<h2 id="articleHeader5">界面截图：</h2>
<p>登陆页面<br><span class="img-wrap"><img data-src="/img/bV1S8q?w=1916&amp;h=1079" src="https://static.alili.tech/img/bV1S8q?w=1916&amp;h=1079" alt="登陆页面" title="登陆页面" style="cursor: pointer;"></span><br>用户管理<br><span class="img-wrap"><img data-src="/img/bV1S7Q?w=1918&amp;h=1080" src="https://static.alili.tech/img/bV1S7Q?w=1918&amp;h=1080" alt="用户管理" title="用户管理" style="cursor: pointer;"></span><br>角色管理<br><span class="img-wrap"><img data-src="/img/bV1S79?w=1920&amp;h=1078" src="https://static.alili.tech/img/bV1S79?w=1920&amp;h=1078" alt="角色管理" title="角色管理" style="cursor: pointer;"></span><br>icon<br><span class="img-wrap"><img data-src="/img/bV1S80?w=1919&amp;h=1080" src="https://static.alili.tech/img/bV1S80?w=1919&amp;h=1080" alt="ICON" title="ICON" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">后记</h2>
<p><strong>项目已托管 <a href="https://gitee.com/sunxyz/sanji-boot-admin/tree/master/sanji-boot-admin-iview" rel="nofollow noreferrer" target="_blank">码云</a></strong><br><strong>需要配合 <a href="https://gitee.com/sunxyz/sanji-boot/tree/webpack/sanji-boot-security" rel="nofollow noreferrer" target="_blank">sanji-boot-security</a> 使用</strong></p>
<h2 id="articleHeader7">学习资料</h2>
<p><a href="https://segmentfault.com/a/1190000012804508">快速上手 webpack+vue - vue cli 起手式</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 后台模板 [Vue admin] SanJi Boot Admin Iview

## 原文链接
[https://segmentfault.com/a/1190000012804392](https://segmentfault.com/a/1190000012804392)

