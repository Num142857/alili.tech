---
title: '【Geek议题】合理的VueSPA架构讨论（上）' 
date: 2018-12-08 2:30:30
hidden: true
slug: 06gjuq492k49
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>web前端发展到现代，已经不再是严格意义上的后端MVC的V层，它越来越向类似客户端开发的方向发展，已独立拥有了自己的MVVM设计模型。前后端的分离也使前端人员拥有更大的自由，可以独立设计客户端部分的架构。</p>
<blockquote>【科普】MVVM是Model-View-ViewModel的简写。它本质上就是MVC 的改进版。MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。当然这些事 ViewModel 已经帮我们做了，它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。</blockquote>
<p>Vue作为现在流行的MVVM框架，也是本人平常业务中用得最多的框架。如何才能更合理、优雅的写VueSPA，是本人一直研究的课题，经过一年左右的思考和实践总结出本文。  <br>本文属于中高级实践讨论，不适合新手。  <br>本人个人的观点，不代表是最佳实践，欢迎大牛一起讨论，批评指正。</p>
<h2 id="articleHeader1">工程搭建</h2>
<p>秉着不重复造轮子的原则（其实就是懒），工程直接使用Vue2.0官方脚手架生成，使用最新webpack模板。与标准模板的主要差异：</p>
<ol>
<li>增加了Sass预编译器</li>
<li>增加了Vuex状态管理</li>
<li>增加了Axios基础Ajax工具库</li>
</ol>
<p>新增部分的安装请参考他们各自的文档，这里不赘述。</p>
<h2 id="articleHeader2">项目结构</h2>
<h3 id="articleHeader3">模拟需求</h3>
<p>讨论架构前我们需要一个项目需求，这里简单模拟一个。  <br>需求点:3个一级页面，2个二级页面，底部的tabbar只在一级页面出现，首页、个人中心和登录页面是未登录也可以进入；财务和编辑个人信息是只有登录用户可见，简单原型如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV7gDD?w=1330&amp;h=1250" src="https://static.alili.tech/img/bV7gDD?w=1330&amp;h=1250" alt="原型" title="原型" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">开发目录</h3>
<p>下面不讨论脚手架生成的部分目录，只聚焦src开发目录，依据原型我们可以大致规划出下面的目录：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build
├── config
├── dist
├── src  开发目录
│   ├── api  公共api集
│   │   ├── axiosConfig.js  axios实例配置
|   |   └── index.js  公共api集入口
│   ├── assets  资源目录
│   │   ├── images  图片
│   │   ├── scripts  第三方脚本
|   |   └── styles  基础样式库
│   ├── components  公共组件
│   │   ├── common  一般通用组件
│   │   ├── form  表单通用组件
│   │   └── popup  弹出类通用组件
│   │── config  项目配置
│   │   ├── dev.env.js  开发模式配置
│   │   ├── env.js  一般配置
│   │   ├── modules.js  模块配置
│   │   └── prod.env.js  生产模式配置
│   │── mixin  用于vue文件混合的模板
│   │── modules  模块
│   │   ├── finance  财务模块
│   │   │   ├── components  财务模块私有组件
│   │   │   │   └── FinanceIndexItem.vue  财务模块首页里的条目项
│   │   │   ├── pages  财务模块页面
│   │   │   │   └── FinanceIndex.vue  财务模块首页
│   │   │   ├── api.js  模块api集
│   │   │   ├── index.js  模块入口
│   │   │   ├── Layout.vue  模块承载页
│   │   │   └── router.js  模块内路由
│   │   ├── home  首页模块（子目录同上）
│   │   └── user  用户模块（子目录同上）
│   │── pages  公共页面
│   │   ├── Success.vue  公共状态管理模块
│   │   └── NotFound.vue  用户模块（子目录同上）
│   ├── router  路由管理
│   ├── store  公共状态管理
│   │   ├── modules  公共状态管理模块
│   │   │   ├── com.js  通用状态
│   │   │   └── user.js  用户状态
│   │   └── index.js  公共状态管理入口
│   └── utils  基础工具
└── static
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>├── <span class="hljs-keyword">build
</span>├── <span class="hljs-built_in">config</span>
├── <span class="hljs-keyword">dist
</span>├── src  开发目录
│   ├── api  公共api集
│   │   ├── axiosConfig.<span class="hljs-keyword">js </span> axios实例配置
<span class="hljs-title">|   |</span>   └── index.<span class="hljs-keyword">js </span> 公共api集入口
│   ├── assets  资源目录
│   │   ├── images  图片
│   │   ├── <span class="hljs-keyword">scripts </span> 第三方脚本
<span class="hljs-title">|   |</span>   └── styles  基础样式库
│   ├── components  公共组件
│   │   ├── common  一般通用组件
│   │   ├── form  表单通用组件
│   │   └── popup  弹出类通用组件
│   │── <span class="hljs-built_in">config</span>  项目配置
│   │   ├── dev.env.<span class="hljs-keyword">js </span> 开发模式配置
│   │   ├── env.<span class="hljs-keyword">js </span> 一般配置
│   │   ├── modules.<span class="hljs-keyword">js </span> 模块配置
│   │   └── prod.env.<span class="hljs-keyword">js </span> 生产模式配置
│   │── mixin  用于vue文件混合的模板
│   │── modules  模块
│   │   ├── finance  财务模块
│   │   │   ├── components  财务模块私有组件
│   │   │   │   └── FinanceIndexItem.vue  财务模块首页里的条目项
│   │   │   ├── pages  财务模块页面
│   │   │   │   └── FinanceIndex.vue  财务模块首页
│   │   │   ├── api.<span class="hljs-keyword">js </span> 模块api集
│   │   │   ├── index.<span class="hljs-keyword">js </span> 模块入口
│   │   │   ├── Layout.vue  模块承载页
│   │   │   └── router.<span class="hljs-keyword">js </span> 模块内路由
│   │   ├── home  首页模块（子目录同上）
│   │   └── user  用户模块（子目录同上）
│   │── pages  公共页面
│   │   ├── Success.vue  公共状态管理模块
│   │   └── NotFound.vue  用户模块（子目录同上）
│   ├── router  路由管理
│   ├── store  公共状态管理
│   │   ├── modules  公共状态管理模块
│   │   │   ├── com.<span class="hljs-keyword">js </span> 通用状态
│   │   │   └── user.<span class="hljs-keyword">js </span> 用户状态
│   │   └── index.<span class="hljs-keyword">js </span> 公共状态管理入口
│   └── utils  基础工具
└── static
</code></pre>
<h3 id="articleHeader5">一些规范约定</h3>
<p>根据本人个人开发经验总结的规范，不代表必须这么做。</p>
<ol>
<li>所有vue组件都以大写字面开头的驼峰命名法命名，这样保持到模板代码上，可以便于区分开html的原生标签；</li>
<li>人为划分vue组件为“页面”和“页面上的组件”，原则上“页面上的组件”不发请求，不改变公共状态，全部通过事件交由“页面”完成，本人更倾向用˙集中管理。（其实vue中并没有页面概念）；</li>
<li>各个模块，包括路由管理、公共状态管理、接口集等都在目录下有个index.js的入口文件，方便引用；</li>
<li>基础工具内的工具使用函数式编程，做到可移植，不要对本项目产生依赖；</li>
<li>资源图片只在项目中保留小图（就是会被webpack处理成base64那些），大图应使用cdn，可以动态获取也可以把地址写到一个脚本里；</li>
<li>使用eslint使js代码符合Airbnb规范。</li>
</ol>
<h2 id="articleHeader6">低耦合模块化开发</h2>
<p>项目过程中常遇到要把原来的项目分开部署，或是组件间耦合、或是多人开发时组件冲突等问题。本人提出的解决办法是将项目细分成模块进行开发，每个模块由若干相关“页面”组成，拥有私有组件、路由、api等，如示例所示：划分了三个模块，首页模块、财务模块、用户模块。</p>
<blockquote>【小结】这种方案的核心就是要将太过零散的组件（页面）聚合成模块，每个模块都有一定迁移性，互不耦合，实现按需打包，并且在代码分割上比单纯的分页面加载更加灵活可控。</blockquote>
<h3 id="articleHeader7">Layout模块承载页</h3>
<p>这个是为了让开发这个模块的程序员有类似根组件<code>&lt;App&gt;</code>的公共空间。从路由的角度来说，所有的模块内页面都是它的子路由，这样隔离了对全局路由的影响，至少路径定义可以随意些。  <br>一般来说它只是个空的路由跳转页，当然你把模块的公共数据放这里也可以的，在子路由就能<code>this.$parent</code>拿到数据，可以当成子路由间的bus使用，如下以示例的user模块为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <router-view/>
</template>
<script>
export default {
  name: 'user',
  data(){
    return {
      name: '大白',
      age: 12,
    };
  },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'user'</span>,
  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'大白'</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>,
    };
  },
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader8">模块内路由</h3>
<p>模块内路由最后都会被导入总路由中，不要以为只是简单合并了文件，这里的设计也跟Layout模块承载页有关，<br>下面以user模块为例，我们把个人中心、登录和修改个人信息这三个页面归为user模块，路由规划如下。</p>
<ul>
<li>个人中心：<code>/user</code>
</li>
<li>登录：<code>/user/login</code>
</li>
<li>修改个人信息：<code>/user/userInfo</code>
</li>
</ul>
<p>其中由于“个人中心”是一级页面，需求要求底部有tabBar，所以使它只能是一级路由。  <br>接下来你会发现Layout模块承载页的路由路劲也是'/user'，这里不用担心会乱，因为路由管理是按顺序匹配的，至于为什么要路径一样，这只是为了满足路由规划，让路径好看而已。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通用的tabbar
import IndexTabBar from '@/components/common/IndexTabBar';
// 模块内的页面
import UserIndex from './pages/UserIndex';
import UserLogin from './pages/UserLogin';
import UserInfo from './pages/UserInfo';

export default [
  // 一级路由
  {
    name: 'userIndex',
    path: '/user',
    meta: {
      title: '个人中心',
    },
    components: {
      default: UserIndex,
      footer: IndexTabBar,
    },
  },
  {
    path: '/user',
    // 这里分割子路由
    component: () => import('./layout.vue'),  
    children: [
      // 二级路由
      {
        name: 'userLogin',
        path: 'login',
        meta: {
          title: '登录',
        },
        component: UserLogin,
      },
      {
        name: 'userInfo',
        path: 'info',
        meta: {
          title: '修改个人信息',
          requiresAuth: true,
        },
        component: UserInfo,
      },
    ],
  },
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通用的tabbar</span>
<span class="hljs-keyword">import</span> IndexTabBar <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/common/IndexTabBar'</span>;
<span class="hljs-comment">// 模块内的页面</span>
<span class="hljs-keyword">import</span> UserIndex <span class="hljs-keyword">from</span> <span class="hljs-string">'./pages/UserIndex'</span>;
<span class="hljs-keyword">import</span> UserLogin <span class="hljs-keyword">from</span> <span class="hljs-string">'./pages/UserLogin'</span>;
<span class="hljs-keyword">import</span> UserInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'./pages/UserInfo'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
  <span class="hljs-comment">// 一级路由</span>
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'userIndex'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>,
    <span class="hljs-attr">meta</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">'个人中心'</span>,
    },
    <span class="hljs-attr">components</span>: {
      <span class="hljs-attr">default</span>: UserIndex,
      <span class="hljs-attr">footer</span>: IndexTabBar,
    },
  },
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>,
    <span class="hljs-comment">// 这里分割子路由</span>
    component: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./layout.vue'</span>),  
    <span class="hljs-attr">children</span>: [
      <span class="hljs-comment">// 二级路由</span>
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'userLogin'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'login'</span>,
        <span class="hljs-attr">meta</span>: {
          <span class="hljs-attr">title</span>: <span class="hljs-string">'登录'</span>,
        },
        <span class="hljs-attr">component</span>: UserLogin,
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'userInfo'</span>,
        <span class="hljs-attr">path</span>: <span class="hljs-string">'info'</span>,
        <span class="hljs-attr">meta</span>: {
          <span class="hljs-attr">title</span>: <span class="hljs-string">'修改个人信息'</span>,
          <span class="hljs-attr">requiresAuth</span>: <span class="hljs-literal">true</span>,
        },
        <span class="hljs-attr">component</span>: UserInfo,
      },
    ],
  },
];</code></pre>
<p>模块承载页以懒加载的形式<code>component: () =&gt; import('./layout.vue')</code>引入，这会使webpack在此处分割代码，也就是说进入模块内是需要再此请求的，可以减少首次加载的数据量，提高速度。  <br><a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">官方关于懒加载的文档</a>  <br>这里你会发现后续的子路由，又是以直接引入的方式加载，也就是说整个模块会一起加载，实现了<strong>分模块加载</strong>。  <br>这与简单的分页面加载不同，分页面加载一直有个难点，就是分割的量比较难把握（太多会增加请求次数，太少又降低了速度），而分模块可以将相关页面一起加载（跟提高缓存命中率很像），可以更灵活的规划我们的加载，最终效果：</p>
<ol>
<li>用户进入应用，首页的三个页面（有tabbar的）就已经加载完毕，这时点击哪个tabbar按钮都能流畅；</li>
<li>当用户进入某个页面内的子页面，会产生一次请求；</li>
<li>这时整个模块的页面都加载完（不一定要全部），用户在这个模块内又能流畅访问。</li>
</ol>
<h3 id="articleHeader9">模块api集</h3>
<p>这个设计跟模块内路由类似，目的也是为了按需加载和隔离全局。  <br>下面也是以user模块的模块api集为例，可以发现和路由有一些不同就是这里为了防止模块跟全局耦合，运用函数式编程思想（类似于依赖注入），将全局的axios实例作为函数参数传入，再返回出一个包含api的对象，这个导出的对象将会被<strong>以模块名命名</strong>，合并到全局的api集中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (axios) {
  return {
    postHeadImg(token, userId, data) {
      const options = {
        method: 'post',
        name: '换头像',
        url: '/data/user/updateHeadImg',
        headers: {
          token,
          userId,
        },
        data,
      };
      return axios(options);
    },
    postProduct(token, userId, data) {
      const options = {
        method: 'post',
        name: '提交产品选择',
        url: '/product/opt',
        headers: {
          token,
          userId,
        },
        data,
      };
      return axios(options);
    },
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">axios</span>) </span>{
  <span class="hljs-keyword">return</span> {
    postHeadImg(token, userId, data) {
      <span class="hljs-keyword">const</span> options = {
        <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'换头像'</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">'/data/user/updateHeadImg'</span>,
        <span class="hljs-attr">headers</span>: {
          token,
          userId,
        },
        data,
      };
      <span class="hljs-keyword">return</span> axios(options);
    },
    postProduct(token, userId, data) {
      <span class="hljs-keyword">const</span> options = {
        <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'提交产品选择'</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">'/product/opt'</span>,
        <span class="hljs-attr">headers</span>: {
          token,
          userId,
        },
        data,
      };
      <span class="hljs-keyword">return</span> axios(options);
    },
  };
}</code></pre>
<h3 id="articleHeader10">模块入口</h3>
<p>为了方便引用，每个模块目录下都有一个index.js，引入模块的时候可以省略，node会自动读这个文件。  <br>还是以user模块为例，这里主要是引入模块专属api和模块内路由，并定义了模块的名字，这个名字是后面挂载专属api是时候用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import api from './api';
import router from './router';

export default {
  name: 'user',
  api,
  router,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">'./api'</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'user'</span>,
  api,
  router,
};</code></pre>
<h3 id="articleHeader11">按需打包</h3>
<p>示例中config目录下有个modules.js文件是指定打包需要的模块，测试一下打包不同数量的模块，会发现产品文件大小会改变，这就证明了已经实现按需打包。<br>至于路由和api集的子模块整合实现，后面会提到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import home from '@/modules/home';
import finance from '@/modules/finance';
import user from '@/modules/user';

export default [
  home,
  finance,
  user
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'@/modules/home'</span>;
<span class="hljs-keyword">import</span> finance <span class="hljs-keyword">from</span> <span class="hljs-string">'@/modules/finance'</span>;
<span class="hljs-keyword">import</span> user <span class="hljs-keyword">from</span> <span class="hljs-string">'@/modules/user'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
  home,
  finance,
  user
]</code></pre>
<h2 id="articleHeader12">api集的配置</h2>
<blockquote>【背景】示例项目模拟常见的接口约定，服务器与应用交互有两个自定义头部：token和userId。token是权限标识符，几乎全部api都需要带上，为了防CSRF；userId是登录状态标识符，有些需要登录状态才能使用的接口才需要带上，这两个标识符都有有效期。本示例暂不考虑自动续期的机制。</blockquote>
<p>在api管理方面本人比较喜欢集中管理接口和配置，但发起请求和请求回调倾向与每个接口单独处理。</p>
<h3 id="articleHeader13">导出axios实例</h3>
<p>axios是比较流行的ajax的promise封装。<a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">axios官方文档</a>  <br>本人推荐在全局保留唯一的axios实例，所有的请求都使用这个公共实例发起，实现配置的统一。  <br>示例项目的在api文件夹下的axiosConfig.js就是axios的配置，主要是导出一个符合项目设置的实例，并进行一些拦截器设置。</p>
<blockquote>【PS】至于为什么到导出实例而不是直接修改axios默认值？  <br>这是为了预防某些特例情况下公共实例无法满足需求，需要单独配置axios的情况，所以为了不污染原始的axios默认值，不推荐修改默认值。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入axios包
import axios from 'axios';
// 引入环境配置
import env from '../config/env';
// 引入公共状态管理
import store from '../store/index';

// 全局默认配置
const myAxios = axios.create({
  // 跨域带cookie
  withCredentials: true,
  // 基础url
  baseURL: `${env.apiUrl}/${env.apiVersion}`,
  // 超时时间
  timeout: 12000,
});

// 请求发起前拦截器
myAxios.interceptors.request.use((_config) => {
  // ...
  return config;
}, () => {
  // 异常处理
});

// 响应拦截器
myAxios.interceptors.response.use((response) => {
  // ...
}, (error) => {
  // 异常处理
  return Promise.reject(error);
});

export default myAxios;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 引入axios包</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-comment">// 引入环境配置</span>
<span class="hljs-keyword">import</span> env <span class="hljs-keyword">from</span> <span class="hljs-string">'../config/env'</span>;
<span class="hljs-comment">// 引入公共状态管理</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../store/index'</span>;

<span class="hljs-comment">// 全局默认配置</span>
<span class="hljs-keyword">const</span> myAxios = axios.create({
  <span class="hljs-comment">// 跨域带cookie</span>
  withCredentials: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// 基础url</span>
  baseURL: <span class="hljs-string">`<span class="hljs-subst">${env.apiUrl}</span>/<span class="hljs-subst">${env.apiVersion}</span>`</span>,
  <span class="hljs-comment">// 超时时间</span>
  timeout: <span class="hljs-number">12000</span>,
});

<span class="hljs-comment">// 请求发起前拦截器</span>
myAxios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">_config</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> config;
}, () =&gt; {
  <span class="hljs-comment">// 异常处理</span>
});

<span class="hljs-comment">// 响应拦截器</span>
myAxios.interceptors.response.use(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
}, (error) =&gt; {
  <span class="hljs-comment">// 异常处理</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> myAxios;</code></pre>
<h3 id="articleHeader14">公共api集</h3>
<p>项目的所有公共api都会编写到这里，实现集中化管理，最后公共api集会挂载到vue根实例下，使用<code>this.$api</code>就可以方便的访问。  <br>由于token和userId不是必须头部，这里我推荐每个接口函数都单独处理，按需传入，这样api函数也能更加清晰。<br>给每个接口起名字，是为了后续取消请求所设计的。  <br>整体思路：<strong>先定义公共api，再将模块内api（按需）挂载进来</strong>，最后导出api集。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入已经配置好的axios实例
import axios from './axiosConfig';
// 引入模块
import modules from '../config/modules';

const apiList = {
  // 获取token不需要
  getToken() {
    const options = {
      method: 'post',
      name: '获取token',
      url: '/token/get',
    };
    return axios(options);
  },
  loginWithName(token, data) {
    const options = {
      method: 'post',
      name: '用户名密码登录',
      url: '/data/user/login4up',
      headers: {
        token,
      },
      data,
    };
    return axios(options);
  },
  postHeadImg(token, userId, data) {
    const options = {
      method: 'post',
      name: '换头像',
      url: '/data/user/updateHeadImg',
      headers: {
        token,
        userId,
      },
      data,
    };
    return axios(options);
  },
};
// 使每个模块里的api集挂载到以模块名为名的命名空间下
modules.forEach((i) => {
  Object.assign(apiList, {
    [i.name]: i.api(axios),
  });
});

export default apiList;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 引入已经配置好的axios实例</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'./axiosConfig'</span>;
<span class="hljs-comment">// 引入模块</span>
<span class="hljs-keyword">import</span> modules <span class="hljs-keyword">from</span> <span class="hljs-string">'../config/modules'</span>;

<span class="hljs-keyword">const</span> apiList = {
  <span class="hljs-comment">// 获取token不需要</span>
  getToken() {
    <span class="hljs-keyword">const</span> options = {
      <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'获取token'</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">'/token/get'</span>,
    };
    <span class="hljs-keyword">return</span> axios(options);
  },
  loginWithName(token, data) {
    <span class="hljs-keyword">const</span> options = {
      <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'用户名密码登录'</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">'/data/user/login4up'</span>,
      <span class="hljs-attr">headers</span>: {
        token,
      },
      data,
    };
    <span class="hljs-keyword">return</span> axios(options);
  },
  postHeadImg(token, userId, data) {
    <span class="hljs-keyword">const</span> options = {
      <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'换头像'</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">'/data/user/updateHeadImg'</span>,
      <span class="hljs-attr">headers</span>: {
        token,
        userId,
      },
      data,
    };
    <span class="hljs-keyword">return</span> axios(options);
  },
};
<span class="hljs-comment">// 使每个模块里的api集挂载到以模块名为名的命名空间下</span>
modules.forEach(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> {
  <span class="hljs-built_in">Object</span>.assign(apiList, {
    [i.name]: i.api(axios),
  });
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> apiList;</code></pre>
<h2 id="articleHeader15">路由管理配置</h2>
<h3 id="articleHeader16">导入模块内路由</h3>
<p>使用示例中用router文件夹下的index.js配置全局路由，api集类似实现集中化管理，导出路由实例会挂载到vue根实例下，使用<code>this.$router</code>就可以方便的访问。  <br>配置参考官方文档，这里主要提的一点是，模块内路由的整合，见实例代码段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(Router);
// 路由配置
const routerConfig = {
  routes: [
    {
      path: '/',
      meta: {
        title: env.appName,
      },
      redirect: { name: 'home' },
    },
    {
      name: 'success',
      path: '/success',
      meta: {
        title: '成功',
      },
      component: Success,
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
};
// 将模块内的路由拼接到全局
modules.forEach((i) => {
  routerConfig.routes = routerConfig.routes.concat(i.router);
});
const router = new Router(routerConfig);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.use(Router);
<span class="hljs-comment">// 路由配置</span>
<span class="hljs-keyword">const</span> routerConfig = {
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">meta</span>: {
        <span class="hljs-attr">title</span>: env.appName,
      },
      <span class="hljs-attr">redirect</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">'home'</span> },
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'success'</span>,
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/success'</span>,
      <span class="hljs-attr">meta</span>: {
        <span class="hljs-attr">title</span>: <span class="hljs-string">'成功'</span>,
      },
      <span class="hljs-attr">component</span>: Success,
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
      <span class="hljs-attr">component</span>: NotFound,
    },
  ],
};
<span class="hljs-comment">// 将模块内的路由拼接到全局</span>
modules.forEach(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> {
  routerConfig.routes = routerConfig.routes.concat(i.router);
});
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router(routerConfig);</code></pre>
<h3 id="articleHeader17">在路由钩子函数中处理标题和权限</h3>
<p>路由的钩子函数有很多妙用，这里列举了一些例子。  <br>路由元信息meta可以自定义需要的数据，相当于给路由一个标记，然后在router.afterEach钩子函数中可以读取到并进行处理。  <br>回顾上面示例的模块内路由，meta中定义了title（标题）和requiresAuth（是否要登录状态），这就会在这里体现出用处。把登录权限设置在这里判断是为了防止用户进入某些需要权限的“页面”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  // 关闭公共弹框
  if (window.loading) {
    window.loading.close();
  }
  // 设置微信分享（如果有）
  wxShare({
    title: '哇哈哈',
    desc: '在路由钩子函数中处理标题和权限',
    link: env.shareBaseUrl,
    imgUrl: env.shareBaseUrl + '/images/shareLogo.png'
  });
  // 设置标题
  document.title = to.meta.title ? to.meta.title : '示例';
  // 检查登录状态
  if (to.meta.requiresAuth) {
    // 目标路由需要登录状态
    // ...
  }
  next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-comment">// 关闭公共弹框</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.loading) {
    <span class="hljs-built_in">window</span>.loading.close();
  }
  <span class="hljs-comment">// 设置微信分享（如果有）</span>
  wxShare({
    <span class="hljs-attr">title</span>: <span class="hljs-string">'哇哈哈'</span>,
    <span class="hljs-attr">desc</span>: <span class="hljs-string">'在路由钩子函数中处理标题和权限'</span>,
    <span class="hljs-attr">link</span>: env.shareBaseUrl,
    <span class="hljs-attr">imgUrl</span>: env.shareBaseUrl + <span class="hljs-string">'/images/shareLogo.png'</span>
  });
  <span class="hljs-comment">// 设置标题</span>
  <span class="hljs-built_in">document</span>.title = to.meta.title ? to.meta.title : <span class="hljs-string">'示例'</span>;
  <span class="hljs-comment">// 检查登录状态</span>
  <span class="hljs-keyword">if</span> (to.meta.requiresAuth) {
    <span class="hljs-comment">// 目标路由需要登录状态</span>
    <span class="hljs-comment">// ...</span>
  }
  next();
});</code></pre>
<h2 id="articleHeader18">自动化管理权限标识符（token）</h2>
<p>权限标识符的特点就是几乎每个链接都要带上，需要维护有效期，为了不浪费服务器资源还需要持久化并保证请求唯一。  <br>本人比较推荐使用<strong>公共状态管理vuex进行自动化管理</strong>，减少代码编写时的顾虑。</p>
<h3 id="articleHeader19">妙用公共状态管理获取token</h3>
<p>示例中公共状态中的com模块里有tokenObj和waitToken两个字段，其中tokenObj包含了token和过期时间，waitToken是一个标记是否当前在获取token的布尔值。</p>
<blockquote>【PS】为什么要token保证唯一一次请求？  <br>常见的场景：当用户进入应用，这时候token要么没有要么已过期，这时页面需要并发两个ajax请求，由于都没有token，不唯一化处理的话，会同时先发起两个token请求，这样首先是浪费了请求资源，其次由于是异步请求，不能保证两次token的顺序，如果服务器对token管理较严格则会出问题。</blockquote>
<p>由于获取token是异步操作，所以getToken写在actions中，把主要过程包裹成立即执行函数，并通过waitToken判断是否要等待，如果要等待就隔一段时间再检查，这样就保证了并发请求时，token能唯一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
  // needToRegain是为了特殊条件下强制获取使用
  getToken({ commit, state: _state }, needToRegain) {
    return new Promise((resolve, reject) => {
      (function main() {
        // 如果waitToken为真即表示发起了请求但还未回应
        if (_state.waitToken) {
          console.log('等待token');
          setTimeout(() => {
            main();
          }, 1000);
          return;
        }
        // 是否过期标记
        let isExpire = false;
        // 提取现有的tokenObj
        let tokenObj = {
          ..._state.tokenObj,
        };
        // 如果没有token就从本地存储中读取
        if (!tokenObj.token) {
          tokenObj = JSON.parse(localStorage.getItem('tokenObj'));
          // 如果本地有tokenObj会顺便添加到状态管理
          if (tokenObj) {
            commit('setTokenObj', tokenObj);
          }
        }
        // token是否过时
        if (tokenObj &amp;&amp; tokenObj.token) {
          isExpire = new Date().getTime() - tokenObj.expireTime > -10000;
        }
        // 综合判断是否需要获取token
        if (!tokenObj || !tokenObj.token || isExpire || needToRegain) {
          commit('setWaitToken', true);
          api.getToken().then((res) => {
            // 检查返回的数据
            const checkedData = connect.dataCheck(res);
            if (checkedData.isDataReady) {
              const newTokenObj = {
                token: checkedData.data.token,
                expireTime: new Date().getTime() + (checkedData.data.expire_time * 1000),
              };
              // 设置TokenObj会顺便保留一份到本地存储
              commit('setTokenObj', newTokenObj);
              commit('setWaitToken', false);
              console.log('获取token成功');
              resolve(newTokenObj.token);
            } else {
              commit('setWaitToken', false);
              console.error('获取token失败');
              reject(checkedData.msg);
            }
          }).catch((err) => {
            window.toast('网络错误');
            commit('setWaitToken', false);
            reject(err);
          });
        } else {
          console.log('token已存在，直接返回');
          resolve(tokenObj.token);
        }
      }());
    });
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> actions = {
  <span class="hljs-comment">// needToRegain是为了特殊条件下强制获取使用</span>
  getToken({ commit, <span class="hljs-attr">state</span>: _state }, needToRegain) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 如果waitToken为真即表示发起了请求但还未回应</span>
        <span class="hljs-keyword">if</span> (_state.waitToken) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'等待token'</span>);
          setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            main();
          }, <span class="hljs-number">1000</span>);
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">// 是否过期标记</span>
        <span class="hljs-keyword">let</span> isExpire = <span class="hljs-literal">false</span>;
        <span class="hljs-comment">// 提取现有的tokenObj</span>
        <span class="hljs-keyword">let</span> tokenObj = {
          ..._state.tokenObj,
        };
        <span class="hljs-comment">// 如果没有token就从本地存储中读取</span>
        <span class="hljs-keyword">if</span> (!tokenObj.token) {
          tokenObj = <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">'tokenObj'</span>));
          <span class="hljs-comment">// 如果本地有tokenObj会顺便添加到状态管理</span>
          <span class="hljs-keyword">if</span> (tokenObj) {
            commit(<span class="hljs-string">'setTokenObj'</span>, tokenObj);
          }
        }
        <span class="hljs-comment">// token是否过时</span>
        <span class="hljs-keyword">if</span> (tokenObj &amp;&amp; tokenObj.token) {
          isExpire = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - tokenObj.expireTime &gt; <span class="hljs-number">-10000</span>;
        }
        <span class="hljs-comment">// 综合判断是否需要获取token</span>
        <span class="hljs-keyword">if</span> (!tokenObj || !tokenObj.token || isExpire || needToRegain) {
          commit(<span class="hljs-string">'setWaitToken'</span>, <span class="hljs-literal">true</span>);
          api.getToken().then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
            <span class="hljs-comment">// 检查返回的数据</span>
            <span class="hljs-keyword">const</span> checkedData = connect.dataCheck(res);
            <span class="hljs-keyword">if</span> (checkedData.isDataReady) {
              <span class="hljs-keyword">const</span> newTokenObj = {
                <span class="hljs-attr">token</span>: checkedData.data.token,
                <span class="hljs-attr">expireTime</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() + (checkedData.data.expire_time * <span class="hljs-number">1000</span>),
              };
              <span class="hljs-comment">// 设置TokenObj会顺便保留一份到本地存储</span>
              commit(<span class="hljs-string">'setTokenObj'</span>, newTokenObj);
              commit(<span class="hljs-string">'setWaitToken'</span>, <span class="hljs-literal">false</span>);
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'获取token成功'</span>);
              resolve(newTokenObj.token);
            } <span class="hljs-keyword">else</span> {
              commit(<span class="hljs-string">'setWaitToken'</span>, <span class="hljs-literal">false</span>);
              <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'获取token失败'</span>);
              reject(checkedData.msg);
            }
          }).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
            <span class="hljs-built_in">window</span>.toast(<span class="hljs-string">'网络错误'</span>);
            commit(<span class="hljs-string">'setWaitToken'</span>, <span class="hljs-literal">false</span>);
            reject(err);
          });
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'token已存在，直接返回'</span>);
          resolve(tokenObj.token);
        }
      }());
    });
  },
};</code></pre>
<h3 id="articleHeader20">token在请求代码中使用</h3>
<p>将需要token的api函数套在getToken的回调中，就能方便的使用，不用再担心token是否过期。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sendData = {
  mobile: this.formData1.mobile,
};
this.$store.dispatch('getToken').then((token) => {
  this.$api.sendSMS(token, sendData).then((res) => {
    const checkedData = this.$connect.dataCheck(res);
    if (checkedData.isDataReady) {
      window.toast('验证码已发送，请查收短信');
    } else {
      window.toast('验证码发送失败');
    }
  }).catch(() => {
    window.toast('网络错误');
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> sendData = {
  <span class="hljs-attr">mobile</span>: <span class="hljs-keyword">this</span>.formData1.mobile,
};
<span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'getToken'</span>).then(<span class="hljs-function">(<span class="hljs-params">token</span>) =&gt;</span> {
  <span class="hljs-keyword">this</span>.$api.sendSMS(token, sendData).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> checkedData = <span class="hljs-keyword">this</span>.$connect.dataCheck(res);
    <span class="hljs-keyword">if</span> (checkedData.isDataReady) {
      <span class="hljs-built_in">window</span>.toast(<span class="hljs-string">'验证码已发送，请查收短信'</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">window</span>.toast(<span class="hljs-string">'验证码发送失败'</span>);
    }
  }).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">window</span>.toast(<span class="hljs-string">'网络错误'</span>);
  });
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Geek议题】合理的VueSPA架构讨论（上）

## 原文链接
[https://segmentfault.com/a/1190000014086261](https://segmentfault.com/a/1190000014086261)

