---
title: 'vue项目实践（vuex + vue-router + vue-resource）' 
date: 2019-02-04 2:30:58
hidden: true
slug: th7y7p0aiv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>2018.3.1更：</blockquote>
<p>有赞·微商城(base杭州)部门招前端啦，最近的前端hc有十多个，跪求大佬扔简历，我直接进行内推实时反馈进度，有兴趣的邮件 lvdada#youzan.com，或直接微信勾搭我 wsldd225 了解跟多</p>
<p>有赞开源组件库·<a href="https://www.youzanyun.com/zanui" rel="nofollow noreferrer" target="_blank">zanUI</a></p>
<hr>
<blockquote>初次接触vue，刷完了堪称经典的vue官网文档+vue-router文档+vuex文档+vue-cli文档，然后就开始刷项目了。这篇文章总结了项目实践的一些思路。</blockquote>
<p>首先看下项目的总览图（mockplus制作）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006763836?w=1598&amp;h=922" src="https://static.alili.tech/img/remote/1460000006763836?w=1598&amp;h=922" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个项目我负责的部分是一个控制台的需求，用户可以在这个模块进行佣金、订单等项目的修改设置，可以看到第1张图相当于控制台首页，页面上有1、2、3、4、5个入口，其中1-4入口进入的页面对应4个页面，但是4个页面主要结构相同，中间商品列表样式信息不同，为了简略4图归为第二张图。入口5对应第三张图。</p>
<p>这几个页面需求并不复杂，大项目本身也是是基于zepto的，单单把这个模块拿出来抽离成单页形式主要为了两点考虑：</p>
<ol>
<li>控制台毕竟涉及操作dom的需求会很多，为了兼容未来产品迭代的复杂需求。</li>
<li>控制台从产品最终的形态上更像是一个独立的应用，且用户进入控制台首页后所有的操作就在当前单页内进行操作，无需a链接跳转，在体验上也是很贴合用户的。</li>
</ol>
<p>基于以上两点使用vue以及vue大礼包编写了这个单页模块。</p>
<h2 id="articleHeader0">vue-router路由控制</h2>
<p>由入口而知一共有6个页面（包含控制台首页），虽然是单页模块，也是必须要符合通过url地址直接进入对应分页的需求。在切换的过程中，留下url路由信息也方便用户进行后退操作。</p>
<p>首先是顶级路由的配置，六个页面（组件）分别设置六个顶级路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在App.vue文件中设置<router-view>
<template>
  <div id=&quot;app&quot;>
    <router-view  keep-alive :style=&quot;{'padding-bottom': paddingBottom + 'rem'}&quot;></router-view>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">// 在App.vue文件中设置<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>  <span class="hljs-attr">keep-alive</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'padding-bottom': paddingBottom + 'rem'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在main.js中配置路由

router.map({
  '/': {
    component: Index,
    name: 'index'
  },
  '/commission': {
    name: 'commission',
    component: Commission
  },
  '/order': {
    name: 'order',
    component: Order
  },
  '/inventory': {
    name: 'inventory',
    component: Inventory
  },
  '/shop': {
    name: 'shopList',
    component: ShopList
  },
  '/qcode': {
    name: 'qcode',
    component: Qcode
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// 在main.js中配置路由

router.<span class="hljs-keyword">map</span>({
  <span class="hljs-string">'/'</span>: {
    component: Index,
    name: <span class="hljs-string">'index'</span>
  },
  <span class="hljs-string">'/commission'</span>: {
    name: <span class="hljs-string">'commission'</span>,
    component: Commission
  },
  <span class="hljs-string">'/order'</span>: {
    name: <span class="hljs-string">'order'</span>,
    component: Order
  },
  <span class="hljs-string">'/inventory'</span>: {
    name: <span class="hljs-string">'inventory'</span>,
    component: Inventory
  },
  <span class="hljs-string">'/shop'</span>: {
    name: <span class="hljs-string">'shopList'</span>,
    component: ShopList
  },
  <span class="hljs-string">'/qcode'</span>: {
    name: <span class="hljs-string">'qcode'</span>,
    component: Qcode
  }
})</code></pre>
<h3 id="articleHeader1">路由查询参数</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006763837?w=954&amp;h=642" src="https://static.alili.tech/img/remote/1460000006763837?w=954&amp;h=642" alt="" title="" style="cursor: pointer;"></span></p>
<p>由上图具体的佣金页面（组件）可以看到，这个页面有两个主要操作，一：搜索，根据搜索结果展示商品条目；二：翻页，根据页数展示商品条目。</p>
<p>原始的思路是搜索与翻页都在当前页面（组件）操作，将异步获取的数据替换当前页面的items数组。Vue会将变化的数据与view绑定，同步刷新view页面。</p>
<p>这样做有个缺陷，任何操作（搜索、翻页）都不会留下可追溯的路径，假设有个场景：</p>
<blockquote>用户翻n页，发现了一款商品点击进入详情页（外链，属于大项目中的页面），用户返回佣金设置页面时发现又从第一页开始浏览了。</blockquote>
<p>基于此类场景结合vue-router的路由查询参数功能可以换一种实现方式。</p>
<p>点击搜索不再在当前页面（组件）异步请求数据，而是通过$route对象进行路由跳转。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$route.router.go({
    name: 'index',
    query: {
        keyWord: 'searchWorld',
        page: 1
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.router</span><span class="hljs-selector-class">.go</span>({
    name: <span class="hljs-string">'index'</span>,
    query: {
        keyWord: <span class="hljs-string">'searchWorld'</span>,
        page: <span class="hljs-number">1</span>
    }
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006748326" src="https://static.alili.tech/img/remote/1460000006748326" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>根据上图，搜索n次，或者是点击翻页n次，都会改变当前的url的查询参数。实际上改变路由查询参数，就相当于重新进入一次当前页面（组件），Vue会识别计算是否重用当前组件，这种情况&lt;router-view&gt;并不会产生切换效果，因为即使查询参数变化，当前页面组件始终都是<code>component: Commission</code>同一个组件。</p>
<p>这样设计就留下了一系列的路径，可供历史回退。</p>
<p>那么数据该如何获取呢？</p>
<p><code>vue-router</code>有一个「<a href="http://router.vuejs.org/zh-cn/pipeline/index.html" rel="nofollow noreferrer" target="_blank">切换控制流水线</a>」的概念，即在不同路由切换的过程中会有不同的钩子函数可以调用。</p>
<p>其中<code>data</code>钩子函数不管组件是否可以重用，在每次路由切换的时候都会触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="route: {
  data (transition) {
    this.$http.get('/api/test/test', {
      params: {
        keyword: this.keyWord,
        page: this.currentPage,
        pageSize: this.numberPerPage
      }
    }).then((response) => {
        transition.next({
          items: response.json().data.item.items,
          listNumber: response.json().data.item.totalNum
        })
    }, (response) => {
        // error
    })
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>route: {
  <span class="hljs-keyword">data</span> (transition) {
    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/api/test/test'</span>, {
      params: {
        keyword: <span class="hljs-keyword">this</span>.keyWord,
        page: <span class="hljs-keyword">this</span>.currentPage,
        pageSize: <span class="hljs-keyword">this</span>.numberPerPage
      }
    }).then((response) =&gt; {
        transition.next({
          items: response.json().<span class="hljs-keyword">data</span>.item.items,
          listNumber: response.json().<span class="hljs-keyword">data</span>.item.totalNum
        })
    }, (response) =&gt; {
        <span class="hljs-comment">// error</span>
    })
  }
},</code></pre>
<p>这样实现了数据的获取，参数部分依靠当前组件的<code>$route</code>对象获取。</p>
<h2 id="articleHeader2">vue 组件</h2>
<p>上文已经提到的6大分页其实就是6个组件，但是为了在开发环境下区分资源，将这6个组件放在了views文件下内。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|
|-src
|  |
|  |-components
|  |-views
|  |  |-Index.vue
|  |  |-Commission.vue
|  |  |-Order.vue
|  |  |-...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">
</span>|<span class="hljs-string">-src
</span>|<span class="hljs-string">  </span>|
|<span class="hljs-string">  </span>|<span class="hljs-string">-components
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">-views
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">-Index.vue
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">-Commission.vue
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">-Order.vue
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  </span>|<span class="hljs-string">-...
</span></code></pre>
<h3 id="articleHeader3">common components（通用业务组件）</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006748328" src="https://static.alili.tech/img/remote/1460000006748328" alt="" title="" style="cursor: pointer;"></span></p>
<p>由上图可知可以将1.title 2.搜索栏 3.confirm 4.toast 5.分页器 6.loading等待封装成全局组件。在<code>main.js</code>中进行注册。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Toast from './components/common/Toast'

Vue.component('c-toast', Toast);

... 
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Toast <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/common/Toast'</span>

Vue.component(<span class="hljs-string">'c-toast'</span>, Toast);

... 
...</code></pre>
<p>商品列表也可以抽离成组件，但是在每个分页里的商品列表是不同的，所以每个分页里的商品列表都独立抽离成组件，并注册在对应的分页组件里。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ListCommission from '../components/ListCommission'

export default {
    name: 'commission',
    components: {
      ListCommission
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> ListCommission <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/ListCommission'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    name: <span class="hljs-string">'commission'</span>,
    components: {
      ListCommission
    }
}</code></pre>
<h2 id="articleHeader4">vuex 状态管理</h2>
<p>控制台这个模块状态并不复杂，多数状态的传递都只发生在父组件和子组件这种上下层级的关系之间。</p>
<p>比如Commission组件（佣金分页）中的ListCommission组件（佣金页的商品列表组件）之间的状态传递就只发生在这两级之间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Commission.vue

<template>
<list-commission :visible=&quot;listNumber > 0&quot; v-if=&quot;!$loadingRouteData&quot; :items=&quot;items&quot;></list-commission>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>// <span class="hljs-string">Commission.</span><span class="hljs-string">vue
</span>
&lt;<span class="hljs-string">template&gt;</span>
&lt;<span class="hljs-built_in">list-commission</span> :<span class="hljs-string">visible=</span><span class="hljs-string">"listNumber &gt; 0"</span> <span class="hljs-string">v-if=</span><span class="hljs-string">"!$loadingRouteData"</span> :<span class="hljs-string">items=</span><span class="hljs-string">"items"</span>&gt;&lt;/<span class="hljs-built_in">list-commission&gt;</span>
&lt;/<span class="hljs-string">template&gt;</span></code></pre>
<p>其中<code>items</code>状态属于父组件，会传递到<code>ListCommission</code>组件内供其view展示。这种状态称为「组件本地状态」，组件本身管理自己的状态。</p>
<p>但是现在有这么一个功能点，生成二维码模块需要使用一个完整url路径，这个路径需要根据测试、线上环境的不同对应<code>.net/.com</code>。这个状态也许还有许多不同层级的组件需要使用，那么这样的状态就适合用vuex去管理。</p>
<p>1.首先在store中定义状态初始值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
  suffix: '.net'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const <span class="hljs-keyword">state</span> = {
  suffix: '.net'
}</code></pre>
<p>2.在根组件App.vue中触发action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let suffix = window.location.hostname.indexOf('showjoy.net') > -1 ? '.net' : '.com';

export const setGlobalSuffix = function ({dispatch}, suffix) {
  dispatch('SET_GLOBAL_SUFFIX', suffix);
}
this.setGlobalSuffix(suffix);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> suffix = <span class="hljs-built_in">window</span>.location.hostname.indexOf(<span class="hljs-string">'showjoy.net'</span>) &gt; <span class="hljs-number">-1</span> ? <span class="hljs-string">'.net'</span> : <span class="hljs-string">'.com'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setGlobalSuffix = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{dispatch}, suffix</span>) </span>{
  dispatch(<span class="hljs-string">'SET_GLOBAL_SUFFIX'</span>, suffix);
}
<span class="hljs-keyword">this</span>.setGlobalSuffix(suffix);</code></pre>
<p>3.触发dispatch</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SET_GLOBAL_SUFFIX (state, suffix) {
    state.suffix = suffix;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>SET_GLOBAL_SUFFIX (<span class="hljs-keyword">state</span>, suffix) {
    <span class="hljs-keyword">state</span>.suffix = suffix;
  }</code></pre>
<p>4.get状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getSuffix (state) {
  return state.suffix;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export function getSuffix (<span class="hljs-keyword">state</span>) {
  return <span class="hljs-keyword">state</span>.suffix;
}</code></pre>
<p>只要在相应组件中定义了getSuffix的getters，就可以在相应的组件中调用这个函数，获取suffix状态。此时suffix状态可称为「应用层级状态」。应用层级状态不属于任何特定的组件，但每个组件都可以监视其变化并响应式的更新DOM。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006748342" src="https://static.alili.tech/img/remote/1460000006748342" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>suffix</code>状态只是一个简单的例子，像上图所示，当同级组件之间或者是不同直系关系的父子组件之间需要进行状态的变更，依赖「组件本地状态」将难以维护。</p>
<p>比如<code>Commission组件</code>需要改变<code>Order组件</code>的一个状态，如果不借助vuex，那么需要显示的编写事件将状态分发到上层组件App，Order组件需要监听这个事件。状态变更一多，那维护将是噩梦。</p>
<p>对我以上的理解有疑问和意见的欢迎找我私聊~<a href="http://weibo.com/2115840795/profile?topnav=1&amp;wvr=6&amp;is_all=1" rel="nofollow noreferrer" target="_blank">微博-写前端的暹罗</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目实践（vuex + vue-router + vue-resource）

## 原文链接
[https://segmentfault.com/a/1190000006747096](https://segmentfault.com/a/1190000006747096)

