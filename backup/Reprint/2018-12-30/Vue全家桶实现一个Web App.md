---
title: 'Vue全家桶实现一个Web App' 
date: 2018-12-30 2:30:10
hidden: true
slug: jdjt2kecclg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-jumei-app</h1>
<blockquote><p>好的生活，聚集美丽，成人之美！从现在做起！<br><span class="img-wrap"><img data-src="/img/bVVMIo?w=3888&amp;h=1136" src="https://static.alili.tech/img/bVVMIo?w=3888&amp;h=1136" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p></blockquote>
<h2 id="articleHeader1">效果预览</h2>
<blockquote>
<h3 id="articleHeader2">?预览地址：[请点我！在线预览，手机浏览或切换浏览器移动调试]()</h3>
<h3 id="articleHeader3">PS：google浏览器在切换不同的手机测试，需要重新刷新页面；安卓手机可能不适应</h3>
<h3 id="articleHeader4">?源码地址：<a href="https://github.com/wuyuanlijie/vue-jumei-app" rel="nofollow noreferrer" target="_blank">Github在这里</a>
</h3>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVVMID?w=323&amp;h=572" src="https://static.alili.tech/img/bVVMID?w=323&amp;h=572" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVVMIO?w=321&amp;h=572" src="https://static.alili.tech/img/bVVMIO?w=321&amp;h=572" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">项目描述</h2>
<h3 id="articleHeader6">技术栈</h3>
<p>Vue2.0全家桶 + axios +　Vuex +  Mint-Ui + Mock.js + Stylus</p>
<h3 id="articleHeader7">前端部分</h3>
<blockquote><ul>
<li>Vue2.0 前端页面的展示</li>
<li>SPA单页应用，前端后分离</li>
<li>Stylus css预编译</li>
<li>Axios 异步数据的请求</li>
<li>localStorage 个人信息以及购物车信息的存储</li>
<li>ES6 Js语言的标准</li>
<li>Mint_UI 实现图片轮播，图片懒加载等等</li>
<li>Better-Scroll 实现移动端滚动，让滚动更加协调</li>
<li>flexible.js和rem，解决移动端设备兼容</li>
</ul></blockquote>
<h3 id="articleHeader8">后端部分</h3>
<blockquote><ul><li>Mock.js 实现后端数据的托管</li></ul></blockquote>
<h3 id="articleHeader9">待更新的功能</h3>
<blockquote><ul>
<li>后端平台搭建，利用新一代的Koa服务器框架</li>
<li>订单页面的展示</li>
<li>商家页面的请求</li>
<li>下拉，加载更多的商品数据</li>
</ul></blockquote>
<h2 id="articleHeader10">实现功能</h2>
<h3 id="articleHeader11">首页</h3>
<ul>
<li>1、tabbar切换</li>
<li>2、优惠商品倒计时</li>
<li>3、活动的商品的推荐</li>
<li>4、swiper滑动，切换页面</li>
<li>5、搜索框</li>
<li>6、首页不同页面的展示</li>
</ul>
<h3 id="articleHeader12">商品详情</h3>
<ul>
<li>1、商品图片放大显示</li>
<li>2、商品具体的显示、评论、图片展示</li>
<li>3、加入购车车页面弹窗，选择商品的种类，以及数量</li>
<li>4、商品加入购物车，动画</li>
</ul>
<h3 id="articleHeader13">购物车</h3>
<ul>
<li>1、登录状态判断</li>
<li>2、全选，以及非全选的切换</li>
<li>3、添加商品、以及减少与删除</li>
</ul>
<h3 id="articleHeader14">个人</h3>
<ul>
<li>1、账户的登录</li>
<li>2、注册账户</li>
<li>3、设置页面</li>
</ul>
<h2 id="articleHeader15">总结</h2>
<ul>
<li>1、熟悉使用Vue2.0</li>
<li>2、在项目中，将组件进行分离，编写可以复用的组件，提高效率</li>
<li>3、Vuex的状态管理模块，统一的状态的管理，让我们更好的去对数据操作</li>
<li>4、util的工具，倒计时js</li>
<li>5、对axios有更进一步的理解，利用cros进行跨域处理</li>
<li>6、进行路由的懒加载，优化页面加载</li>
</ul>
<h2 id="articleHeader16">具体功能实现</h2>
<h4>路由结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
  routes: [
    { //这里要设置一个默认的主页面 后面才起作用 /代表根目录
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index/index'], resolve),
      redirect: '/index/page1'
    },
    { 
      path: '/index',
      component: resolve => require(['@/pages/index/index'], resolve),
      meta: {keepAlive: true},
      children: [
        {
          path: '',
          component: resolve => require(['@/pages/index/index'], resolve)
        },
        {
          path: 'page1', 
          name: 'page1',
          component: resolve => require(['@/pages/index/page1'], resolve)
        },
        {
          path: 'page2',
          name: 'page2',
          component: resolve => require(['@/pages/index/page2'], resolve)
        },
        {
          path: 'page3',
          name: 'page3',
          component: resolve => require(['@/pages/index/page3'], resolve)
        },
        {
          path: 'page4',
          name: 'page4',
          component: resolve => require(['@/pages/index/page4'], resolve)
        },
        {
          path: 'page5',
          name: 'page5',
          component: resolve => require(['@/pages/index/page5'], resolve)
        },
        {
          path: 'page6',
          name: 'page6',
          component: resolve => require(['@/pages/index/page6'], resolve)
        },
        {
          path: 'page7',
          component: resolve => require(['@/pages/index/page7'], resolve)
        },
      ]
    },
    {
      path: '/brandsale',
      name: 'brandSale', 
      component: resolve => require(['@/pages/brandsale/index'], resolve)
    },
    {
      path: '/livecommunity',
      name: 'liveCommunity',
      component:  resolve => require(['@/pages/livecommunity/index'], resolve)
    },
    {
      path: '/shopcart',
      name: 'shopCart',
      component:  resolve => require(['@/pages/shopCart/index'], resolve)
    },
    {
      path: '/myself',
      name: 'mySelf',
      component: resolve => require(['@/pages/mySelf/index'], resolve)
    },
    {
      path: &quot;/setter&quot;,
      name: 'setter',
      component:  resolve => require(['@/pages/mySelf/setter'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component:  resolve => require(['@/pages/mySelf/login'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component:  resolve => require(['@/pages/product/index'], resolve),
      redirect: '/product/info', 
      children: [
        {
          path: 'info',
          name: 'productInfo',
          component: resolve => require(['@/pages/product/info'], resolve)
        },
        {
          path: 'detail',
          name: 'productDetail',
          component: resolve => require(['@/pages/product/detail'], resolve)
        },
        {
          path: 'comment',
          name: 'productComment',
          component: resolve => require(['@/pages/product/comment'], resolve)
        }
      ]
    },

  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-comment">//这里要设置一个默认的主页面 后面才起作用 /代表根目录</span>
      path: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/index'</span>], resolve),
      <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/index/page1'</span>
    },
    { 
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/index'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/index'</span>], resolve),
      <span class="hljs-attr">meta</span>: {<span class="hljs-attr">keepAlive</span>: <span class="hljs-literal">true</span>},
      <span class="hljs-attr">children</span>: [
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">''</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/index'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page1'</span>, 
          <span class="hljs-attr">name</span>: <span class="hljs-string">'page1'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page1'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page2'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'page2'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page2'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page3'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'page3'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page3'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page4'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'page4'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page4'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page5'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'page5'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page5'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page6'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'page6'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page6'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'page7'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/index/page7'</span>], resolve)
        },
      ]
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/brandsale'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'brandSale'</span>, 
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/brandsale/index'</span>], resolve)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/livecommunity'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'liveCommunity'</span>,
      <span class="hljs-attr">component</span>:  <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/livecommunity/index'</span>], resolve)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/shopcart'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'shopCart'</span>,
      <span class="hljs-attr">component</span>:  <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/shopCart/index'</span>], resolve)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/myself'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'mySelf'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/mySelf/index'</span>], resolve)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">"/setter"</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'setter'</span>,
      <span class="hljs-attr">component</span>:  <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/mySelf/setter'</span>], resolve)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'login'</span>,
      <span class="hljs-attr">component</span>:  <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/mySelf/login'</span>], resolve)
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/product'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'product'</span>,
      <span class="hljs-attr">component</span>:  <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/product/index'</span>], resolve),
      <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/product/info'</span>, 
      <span class="hljs-attr">children</span>: [
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'info'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'productInfo'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/product/info'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'detail'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'productDetail'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/product/detail'</span>], resolve)
        },
        {
          <span class="hljs-attr">path</span>: <span class="hljs-string">'comment'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'productComment'</span>,
          <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/pages/product/comment'</span>], resolve)
        }
      ]
    },

  ]
})
</code></pre>
<h4>Vuex状态管理</h4>
<blockquote><p>这里我贴出购物车模块。它的使用场景：添加商品到购物车，更新商品的信息、进行增删，并且在操作过程中，将数据保存到</p></blockquote>
<p>localStorage，持久存储，由于后台服务器尚未搭建，利用这样来保持数据的存储。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from '../mutation-types.js'
const storage = window.localStorage
const state = {
  added: [],
  checkoutStatus: null
}
const getters = {
  checkoutStatus: state => state.checkoutStatus,
  cartLists: state => state.added
}
const mutations = {
  [types.ADD_TO_CART] (state, product) {
    let id = product.id
    const record = state.added.find(p => p.id === id &amp;&amp; p.type === product.type)
    // 解决方法一 找到数据遍历一次
    // 方法二 是获取到父级的数据
    if (!record) {
      state.added.push(product)
    } else {
      record.quantity += product.quantity
    }
    storage.setItem('cart', JSON.stringify(state.added))
  },
  //传入商品的信息 product  id和类型判断当前存储的商品       要修改的数量
  // 更新产品的数据
  [types.UPDATE_THIS_PRODUCT] (state, product) {
    let {id,type,quantity} = product //对象的解构
    const record = state.added.find(p => p.id===id &amp;&amp;p.type===type)
    if (quantity>0) {
      record?record.quantity = quantity : ''
    } else {
      // 传入的商品数量为0 就删除这个商品 删除指定的序号的商品
      let index = state.added.indexOf(record)
      state.added.splice(index,1)
    }
    storage.setItem('cart', JSON.stringify(state.added))   
  },  
}
export default {
  state,
  getters,
  mutations
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'../mutation-types.js'</span>
<span class="hljs-keyword">const</span> storage = <span class="hljs-built_in">window</span>.localStorage
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">added</span>: [],
  <span class="hljs-attr">checkoutStatus</span>: <span class="hljs-literal">null</span>
}
<span class="hljs-keyword">const</span> getters = {
  <span class="hljs-attr">checkoutStatus</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.checkoutStatus,
  <span class="hljs-attr">cartLists</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.added
}
<span class="hljs-keyword">const</span> mutations = {
  [types.ADD_TO_CART] (state, product) {
    <span class="hljs-keyword">let</span> id = product.id
    <span class="hljs-keyword">const</span> record = state.added.find(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.id === id &amp;&amp; p.type === product.type)
    <span class="hljs-comment">// 解决方法一 找到数据遍历一次</span>
    <span class="hljs-comment">// 方法二 是获取到父级的数据</span>
    <span class="hljs-keyword">if</span> (!record) {
      state.added.push(product)
    } <span class="hljs-keyword">else</span> {
      record.quantity += product.quantity
    }
    storage.setItem(<span class="hljs-string">'cart'</span>, <span class="hljs-built_in">JSON</span>.stringify(state.added))
  },
  <span class="hljs-comment">//传入商品的信息 product  id和类型判断当前存储的商品       要修改的数量</span>
  <span class="hljs-comment">// 更新产品的数据</span>
  [types.UPDATE_THIS_PRODUCT] (state, product) {
    <span class="hljs-keyword">let</span> {id,type,quantity} = product <span class="hljs-comment">//对象的解构</span>
    <span class="hljs-keyword">const</span> record = state.added.find(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.id===id &amp;&amp;p.type===type)
    <span class="hljs-keyword">if</span> (quantity&gt;<span class="hljs-number">0</span>) {
      record?record.quantity = quantity : <span class="hljs-string">''</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 传入的商品数量为0 就删除这个商品 删除指定的序号的商品</span>
      <span class="hljs-keyword">let</span> index = state.added.indexOf(record)
      state.added.splice(index,<span class="hljs-number">1</span>)
    }
    storage.setItem(<span class="hljs-string">'cart'</span>, <span class="hljs-built_in">JSON</span>.stringify(state.added))   
  },  
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  state,
  getters,
  mutations
}
</code></pre>
<h2 id="articleHeader17">来个广告，拍卖自己！！！</h2>
<ul>
<li>?jerrylee：<a href="http://www.jerrylee520.cn:3001/jerrylee.html" rel="nofollow noreferrer" target="_blank">感兴趣请点我，这是我的简历</a> <br>
</li>
<li>?微信号：JerryLeelisa</li>
<li>?电  话：<a>15279106115</a>
</li>
<li>?邮  箱：<a>958171512@qq.com</a> <br>
</li>
</ul>
<h2 id="articleHeader18">Build Setup</h2>
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
<p>For detailed explanation on how things work, checkout the <a href="http://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">guide</a> and <a href="http://vuejs.github.io/vue-loader" rel="nofollow noreferrer" target="_blank">docs for vue-loader</a>.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶实现一个Web App

## 原文链接
[https://segmentfault.com/a/1190000011349222](https://segmentfault.com/a/1190000011349222)

