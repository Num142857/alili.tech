---
title: 'Vue+mint-ui+flexible仿移动端App(网易云课堂)' 
date: 2018-12-11 2:30:10
hidden: true
slug: 4w3xfvnku4
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue-wyclass 仿网易云课堂App</h1>
<blockquote><h3 id="articleHeader1">在线预览：<a href="http://120.79.232.154:8080/#/home" rel="nofollow noreferrer" target="_blank">手机浏览或切换谷歌浏览器移动调试</a>
</h3></blockquote>
<blockquote><h3 id="articleHeader2">Gif预览</h3></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606354?w=351&amp;h=626" src="https://static.alili.tech/img/remote/1460000013606354?w=351&amp;h=626" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606355" src="https://static.alili.tech/img/remote/1460000013606355" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606356?w=351&amp;h=626" src="https://static.alili.tech/img/remote/1460000013606356?w=351&amp;h=626" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606357?w=351&amp;h=626" src="https://static.alili.tech/img/remote/1460000013606357?w=351&amp;h=626" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606358?w=351&amp;h=626" src="https://static.alili.tech/img/remote/1460000013606358?w=351&amp;h=626" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">描述</h1>
<p>前端部分</p>
<ul>
<li>Vue2.0 + Mint-ui快速构建前端界面（轮播图，swiper滑块）   ---<a href="http://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint-ui</a>
</li>
<li>Vuex 管理现非父子组件之间的通信</li>
<li>移动设备兼容：使用rem+flexible.js</li>
<li>Stylus实现css预编译</li>
<li>icon-font实现所有小图标的加载，减少http请求 ----<a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">Icon-font</a>
</li>
<li>路由懒加载：Vue Router结合 Vue异步组件和Webpack 的 Code Splitting</li>
<li>axios做ajax请求</li>
<li>sessionStorage 存储用户信息</li>
</ul>
<p>后端部分</p>
<ul>
<li>本地使用webpack dev-server 搭建小型express服务</li>
<li>服务器端使用express搭建静态资源资源接口</li>
</ul>
<p>待更新的功能</p>
<ul><li>用 express + mongodb 保存用户状态</li></ul>
<h1 id="articleHeader4">功能实现</h1>
<h3 id="articleHeader5">首页</h3>
<ul>
<li>1、搜索框</li>
<li>1、tabbar切换</li>
<li>4、swiper滑动，切换页面</li>
<li>6、首页各个界面</li>
</ul>
<h3 id="articleHeader6">分类</h3>
<ul>
<li>1、实现切换分类模块</li>
<li>2、右侧菜单</li>
</ul>
<h3 id="articleHeader7">我的学习</h3>
<ul>
<li>1、判断登录状态</li>
<li>2、用户所学课程展示</li>
</ul>
<h3 id="articleHeader8">个人</h3>
<ul>
<li>1、账户的登录</li>
<li>2、设置界面 退出当前账号</li>
</ul>
<h3 id="articleHeader9">搜索界面</h3>
<ul><li>1、根据用户输入查找所有课程中符合要求的课程并显示</li></ul>
<h3 id="articleHeader10">课程详细界面</h3>
<ul>
<li>1、通过router传参查找课程</li>
<li>1、根据用户是否拥有选择播放视频权限</li>
<li>2、课程介绍界面</li>
</ul>
<h2 id="articleHeader11">总结</h2>
<ul>
<li>1、熟悉使用Vue2.0</li>
<li>2、在项目中，将组件进行分离，编写可以复用的组件，提高效率</li>
<li>3、Vuex的状态管理模块，统一的状态的管理，让我们更好的去对数据操作</li>
<li>4、util的工具，倒计时js</li>
<li>5、对axios有更进一步的理解，利用cros进行跨域处理</li>
<li>6、进行路由的懒加载，优化页面加载</li>
</ul>
<h2 id="articleHeader12">实现细节</h2>
<h3 id="articleHeader13">登录拦截</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  // NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('userInfo');
  }
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
   if (!userInfo &amp;&amp; to.path != '/account/login') {
     next({ path: '/account/login' })
   } else {
     next()
   }                            
  next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  // NProgress.start();
  <span class="hljs-keyword">if</span> (to.path == <span class="hljs-string">'/login'</span>) {
    sessionStorage.removeItem(<span class="hljs-string">'userInfo'</span>);
  }
  let userInfo = JSON.parse(sessionStorage.getItem(<span class="hljs-string">'userInfo'</span>));
   <span class="hljs-keyword">if</span> (!userInfo &amp;&amp; to.path != <span class="hljs-string">'/account/login'</span>) {
     <span class="hljs-built_in">next</span>({ <span class="hljs-name">path</span>: <span class="hljs-string">'/account/login'</span> })
   } <span class="hljs-keyword">else</span> {
     <span class="hljs-built_in">next</span>()
   }                            
  <span class="hljs-built_in">next</span>()
})</code></pre>
<h3 id="articleHeader14">路由懒加载</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['@/views/Home/Home'], resolve),
    },
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
  <span class="hljs-attribute">routes</span>: [
    {
      path: <span class="hljs-string">'/home'</span>,
      name: <span class="hljs-string">'Home'</span>,
      component: resolve =&gt; <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/views/Home/Home'</span>], resolve),
    },
    ]
})</code></pre>
<h3 id="articleHeader15">vue-router  url传参</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   changeToCoursedetails(course){
      this.$router.push({path:&quot;/home/coursedetails&quot; , query:{id:course.id"}}")
      // this.$router.push({name:&quot;Coursedetails&quot; , params:{id:course.id"}}") 
      // 可使用vue.$route 获取query和params
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>   changeToCoursedetails(course){
      this.$router.push({path:<span class="hljs-string">"/home/coursedetails"</span> , query:{id:course.id"}}")
      // this.$router.push({name:<span class="hljs-string">"Coursedetails"</span> , params:{id:course.id"}}") 
      // 可使用vue.$route 获取query和params
    },</code></pre>
<p>params的特点是 路由后面要带参数名<br>并且传参的时候，参数名要跟路由后面设置的参数名对应。</p>
<p>但是 刷新界面，或者跳到别的界面，参数就会消失<br>params一旦设置在路由，params就是路由的一部分</p>
<h3 id="articleHeader16">CORS解决跨域问题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.use</span>(function (req, res, next) {
    <span class="hljs-comment">// Website you wish to allow to connect</span>
    <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>);
    <span class="hljs-comment">// Request methods you wish to allow</span>
    <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">'Access-Control-Allow-Methods'</span>, <span class="hljs-string">'GET, POST, OPTIONS, PUT, PATCH, DELETE'</span>);
    <span class="hljs-comment">// Request headers you wish to allow</span>
    <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">'Access-Control-Allow-Headers'</span>, <span class="hljs-string">'X-Requested-With,content-type'</span>);
    <span class="hljs-comment">// Set to true if you need the website to include cookies in the requests sent</span>
    <span class="hljs-comment">// to the API (e.g. in case you use sessions)</span>
    <span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.setHeader</span>(<span class="hljs-string">'Access-Control-Allow-Credentials'</span>, true);
    <span class="hljs-comment">// Pass to next layer of middleware</span>
    <span class="hljs-selector-tag">next</span>();
});</code></pre>
<h2 id="articleHeader17">文件目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─api
│      api.js        ---Axios请求
├─common             
│  ├─font           ---iconfont
│  ├─js
│  └─stylus             ---stylus预处理和函数
├─components
│  │  loading.vue       ---加载界面组件
│  │  NotFound.vue      ---notFound组件
│  │  search.vue        ---查找组件
│  │  tabbar.vue        ---tabbar组件
│  │  
│  └─star               ---星级组件
├─router
│      index.js         ---router入口文件
│      
├─views
│  │  Classify.vue          ---主页分类界面
│  │  Classifydetails.vue   ---分类详细界面
│  │  Login.vue             ---登录界面
│  │  Mystudy.vue           ---主页我的学习界面
│  │  
│  ├─Account                ---主页我的账号界面
│  │      Account.vue       
│  │      setting.vue       ---设置界面
│  │      
│  ├─Coursedetails          ---课程详细界面
│  │      catalog.vue       
│  │      comment.vue
│  │      Coursedetails.vue 
│  │      introduce.vue     ---暂开发课程介绍界面
│  │      
│  └─Home                   ---我的主页中首页界面
│          classic.vue      ---经典课程界面
│          expert.vue       ---专家界面
│          Home.vue
│          major.vue        ---行家界面
│          recommend.vue    ---推荐界面
│          
└─vuex
    │  store.js             
    │  types.js
    │  
    └─modules
            com.js      ---vuex 状态管理
            user.js     ---vuex 用户管理
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├─api
│      api<span class="hljs-selector-class">.js</span>        ---Axios请求
├─common             
│  ├─<span class="hljs-attribute">font</span>           ---iconfont
│  ├─js
│  └─stylus             ---stylus预处理和函数
├─components
│  │  loading<span class="hljs-selector-class">.vue</span>       ---加载界面组件
│  │  NotFound<span class="hljs-selector-class">.vue</span>      ---notFound组件
│  │  search<span class="hljs-selector-class">.vue</span>        ---查找组件
│  │  tabbar<span class="hljs-selector-class">.vue</span>        ---tabbar组件
│  │  
│  └─star               ---星级组件
├─router
│      index<span class="hljs-selector-class">.js</span>         ---router入口文件
│      
├─views
│  │  Classify<span class="hljs-selector-class">.vue</span>          ---主页分类界面
│  │  Classifydetails<span class="hljs-selector-class">.vue</span>   ---分类详细界面
│  │  Login<span class="hljs-selector-class">.vue</span>             ---登录界面
│  │  Mystudy<span class="hljs-selector-class">.vue</span>           ---主页我的学习界面
│  │  
│  ├─Account                ---主页我的账号界面
│  │      Account<span class="hljs-selector-class">.vue</span>       
│  │      setting<span class="hljs-selector-class">.vue</span>       ---设置界面
│  │      
│  ├─Coursedetails          ---课程详细界面
│  │      catalog<span class="hljs-selector-class">.vue</span>       
│  │      comment<span class="hljs-selector-class">.vue</span>
│  │      Coursedetails<span class="hljs-selector-class">.vue</span> 
│  │      introduce<span class="hljs-selector-class">.vue</span>     ---暂开发课程介绍界面
│  │      
│  └─Home                   ---我的主页中首页界面
│          classic<span class="hljs-selector-class">.vue</span>      ---经典课程界面
│          expert<span class="hljs-selector-class">.vue</span>       ---专家界面
│          Home<span class="hljs-selector-class">.vue</span>
│          major<span class="hljs-selector-class">.vue</span>        ---行家界面
│          recommend<span class="hljs-selector-class">.vue</span>    ---推荐界面
│          
└─vuex
    │  store<span class="hljs-selector-class">.js</span>             
    │  types<span class="hljs-selector-class">.js</span>
    │  
    └─modules
            com<span class="hljs-selector-class">.js</span>      ---vuex 状态管理
            user<span class="hljs-selector-class">.js</span>     ---vuex 用户管理
</code></pre>
<h2 id="articleHeader18">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report</code></pre>
<blockquote><h1 id="articleHeader19">源码地址：<a href="https://github.com/fishman17/vue-wyclass" rel="nofollow noreferrer" target="_blank">Github</a> 欢迎star哦</h1></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue+mint-ui+flexible仿移动端App(网易云课堂)

## 原文链接
[https://segmentfault.com/a/1190000013606349](https://segmentfault.com/a/1190000013606349)

