---
title: 'vue2.0 项目开发小结' 
date: 2019-01-01 2:30:07
hidden: true
slug: mtkkszlnuq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目架构</h2>
<h3 id="articleHeader1">项目目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build
├── config
├── dist
│&nbsp;&nbsp; └── static
│&nbsp;&nbsp;     ├── css
│&nbsp;&nbsp;     ├── fonts
│&nbsp;&nbsp;     ├── images
│&nbsp;&nbsp;     ├── js
│&nbsp;&nbsp;     └── lib
├── src
│&nbsp;&nbsp; ├── api
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── global
│&nbsp;&nbsp; │&nbsp;&nbsp; └── images
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── footer
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── common
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── news
│&nbsp;&nbsp; │&nbsp;&nbsp; └── profile
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── charge
│&nbsp;&nbsp; ├── config
│&nbsp;&nbsp; ├── mixin
│&nbsp;&nbsp; ├── router
│&nbsp;&nbsp; ├── service
│&nbsp;&nbsp; ├── store
│&nbsp;&nbsp; └── util
└── static
    ├── images
    └── lib " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>├── build
├── config
├── dist
│&nbsp;&nbsp; └── static
│&nbsp;&nbsp;     ├── css
│&nbsp;&nbsp;     ├── fonts
│&nbsp;&nbsp;     ├── images
│&nbsp;&nbsp;     ├── js
│&nbsp;&nbsp;     └── <span class="hljs-class"><span class="hljs-keyword">lib</span></span>
├── src
│&nbsp;&nbsp; ├── api
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── global
│&nbsp;&nbsp; │&nbsp;&nbsp; └── images
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── footer
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── common
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── news
│&nbsp;&nbsp; │&nbsp;&nbsp; └── profile
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── charge
│&nbsp;&nbsp; ├── config
│&nbsp;&nbsp; ├── mixin
│&nbsp;&nbsp; ├── router
│&nbsp;&nbsp; ├── service
│&nbsp;&nbsp; ├── store
│&nbsp;&nbsp; └── util
└── static
    ├── images
    └── <span class="hljs-class"><span class="hljs-keyword">lib</span> </span></code></pre>
<p>项目目录是采用 <code>vue-cli</code> 自动生成，其它按需自己新建就好了。</p>
<h2 id="articleHeader2">开发实践</h2>
<h3 id="articleHeader3">动态修改 document title</h3>
<p>在不同的路由页面，我们需要动态的修改文档标题，可以将每个页面的标题配置在路由元信息 <code>meta</code> 里面带上，然后在 <code>router.afterEach</code> 钩子函数中修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index, meta: { title: '推荐产品得丰厚奖金' } },
    {
      path: '/news',
      component: News,
      meta: { title: '公告列表' },
      children: [
        { path: '', redirect: 'list' },
        { path: 'list', component: NewsList },
        { path: 'detail/:newsId', component: NewsDetail, meta: { title: '公告详情' } }
      ]
    },
    {
      path: '/guide',
      component: GuideProtocol,
      meta: {
        title: '新手指南'
      }
    }
  ]
});

// 使用 afterEach 钩子函数，保证路由已经跳转成功之后修改 title
router.afterEach((route) => {
  let documentTitle = 'xxx商城会员平台';
  route.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle += ` - ${path.meta.title}`;
    }
  });

  document.title = documentTitle;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-keyword">import</span> Vue from 'vue';
<span class="hljs-keyword">import</span> Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  mode: <span class="hljs-string">'history'</span>,
  routes: [
    { <span class="hljs-built_in">path</span>: <span class="hljs-string">'/'</span>, component: Index, meta: { <span class="hljs-built_in">title</span>: <span class="hljs-string">'推荐产品得丰厚奖金'</span> } },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/news'</span>,
      component: News,
      meta: { <span class="hljs-built_in">title</span>: <span class="hljs-string">'公告列表'</span> },
      children: [
        { <span class="hljs-built_in">path</span>: <span class="hljs-string">''</span>, redirect: <span class="hljs-string">'list'</span> },
        { <span class="hljs-built_in">path</span>: <span class="hljs-string">'list'</span>, component: NewsList },
        { <span class="hljs-built_in">path</span>: <span class="hljs-string">'detail/:newsId'</span>, component: NewsDetail, meta: { <span class="hljs-built_in">title</span>: <span class="hljs-string">'公告详情'</span> } }
      ]
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/guide'</span>,
      component: GuideProtocol,
      meta: {
        <span class="hljs-built_in">title</span>: <span class="hljs-string">'新手指南'</span>
      }
    }
  ]
});

<span class="hljs-comment">// 使用 afterEach 钩子函数，保证路由已经跳转成功之后修改 title</span>
router.afterEach((route) =&gt; {
  let documentTitle = <span class="hljs-string">'xxx商城会员平台'</span>;
  route.matched.forEach((<span class="hljs-built_in">path</span>) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">path</span>.meta.<span class="hljs-built_in">title</span>) {
      documentTitle += ` - ${<span class="hljs-built_in">path</span>.meta.<span class="hljs-built_in">title</span>}`;
    }
  });

  document.<span class="hljs-built_in">title</span> = documentTitle;
});</code></pre>
<h3 id="articleHeader4">根据 URL 的变化，动态更新数据</h3>
<p>通常在一个列表集合页，我们需要做分页操作，同时分页数据需要体现在 URL 中，那么如何动态的根据 URL 的变动来动态的获取数据呢，我们可以使用 <code>watch</code> API，在 <code>watch</code> 里面监听 <code>$route</code>，同时使用 <code>this.$router.replace</code> API 来改变 URL 的值。下面是示例代码 <code>common.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import qs from 'qs';

export default {
  data() {
    return {
      queryParams: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handlePageNoChange(e) {
      this.queryParams.currentPage = e;
      this.replaceRouter();
    },

    replaceRouter() {
      const query = qs.stringify(this.queryParams);
      this.$router.replace(`${location.pathname}?${query}`);
    },

    routeChange() {
      this.assignParams();
      this.fetchData();
    },

    assignParams() {
      this.queryParams = Object.assign({}, this.queryParams, this.$route.query);
    }
  },
  mounted() {
    this.assignParams();
    this.fetchData();
  },
  watch: {
    $route: 'routeChange'
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">queryParams</span>: {
        <span class="hljs-attr">currentPage</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">pageSize</span>: <span class="hljs-number">10</span>
      }
    };
  },
  <span class="hljs-attr">methods</span>: {
    handlePageNoChange(e) {
      <span class="hljs-keyword">this</span>.queryParams.currentPage = e;
      <span class="hljs-keyword">this</span>.replaceRouter();
    },

    replaceRouter() {
      <span class="hljs-keyword">const</span> query = qs.stringify(<span class="hljs-keyword">this</span>.queryParams);
      <span class="hljs-keyword">this</span>.$router.replace(<span class="hljs-string">`<span class="hljs-subst">${location.pathname}</span>?<span class="hljs-subst">${query}</span>`</span>);
    },

    routeChange() {
      <span class="hljs-keyword">this</span>.assignParams();
      <span class="hljs-keyword">this</span>.fetchData();
    },

    assignParams() {
      <span class="hljs-keyword">this</span>.queryParams = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.queryParams, <span class="hljs-keyword">this</span>.$route.query);
    }
  },
  mounted() {
    <span class="hljs-keyword">this</span>.assignParams();
    <span class="hljs-keyword">this</span>.fetchData();
  },
  <span class="hljs-attr">watch</span>: {
    <span class="hljs-attr">$route</span>: <span class="hljs-string">'routeChange'</span>
  }
};
</code></pre>
<p>我们将这部分代码抽取到一个公共的 <code>mixin</code> 中，在需要的组件那里引入它，同时实现自定义的同名 <code>fetchData()</code> 方法<br><code>mixin</code> API 文档：<a href="https://cn.vuejs.org/v2/guide/mixins.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default DemoComponent {
  mixins: [common],
  data() {
    return {
      // 组件内部自定义同名查询参数，将会和 mixin 中的默认参数合并
      queryParams: {
        categoryId: '',
        pageSize: 12
      },
    }
  },
  methods: {
    fetchData() {
       // 发送请求
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> DemoComponent {
  <span class="hljs-attr">mixins</span>: [common],
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// 组件内部自定义同名查询参数，将会和 mixin 中的默认参数合并</span>
      queryParams: {
        <span class="hljs-attr">categoryId</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">pageSize</span>: <span class="hljs-number">12</span>
      },
    }
  },
  <span class="hljs-attr">methods</span>: {
    fetchData() {
       <span class="hljs-comment">// 发送请求</span>
    }
  }
}</code></pre>
<h3 id="articleHeader5">Event Bus 使用场景</h3>
<p><span class="img-wrap"><img data-src="/img/bVUDeS?w=657&amp;h=503" src="https://static.alili.tech/img/bVUDeS?w=657&amp;h=503" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们在项目中引入了 <code>vuex</code> ，通常情况下是不需要使用 <code>event bus</code> 的，但是有一种情况下我们需要使用它，那就是在路由钩子函数内部的时，在项目中，我们需要在 <code>beforeEnter</code> 路由钩子里面对外抛出事件，在这个钩子函数中我们无法去到 <code>this</code> 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEnter: (to, from, next) => {
    const userInfo = localStorage.getItem(userFlag);
    if (isPrivateMode()) {
        EventBus.$emit('get-localdata-error');
        next(false);
        return;
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code><span class="hljs-name">beforeEnter</span>: <span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
    const userInfo = localStorage.getItem(userFlag);
    <span class="hljs-keyword">if</span> (isPrivateMode()) {
        EventBus.$emit(<span class="hljs-string">'get-localdata-error'</span>);
        <span class="hljs-built_in">next</span>(<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">return</span>;
    }
})</code></pre>
<p>在 <code>App.vue</code> 的 <code>mouted</code> 方法中监听这个事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EventBus.$on('get-localdata-error', () => {
    this.$alert('请勿使用无痕模式浏览');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>EventBus.$<span class="hljs-literal">on</span>(<span class="hljs-string">'get-localdata-error'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.$alert(<span class="hljs-string">'请勿使用无痕模式浏览'</span>);
});</code></pre>
<h3 id="articleHeader6">自定义指令实现埋点数据统计</h3>
<p>在项目中通常需要做数据埋点，这个时候，使用自定义指令将会变非常简单</p>
<p>在项目入口文件 <code>main.js</code> 中配置我们的自定义指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 坑位埋点指令
Vue.directive('stat', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      const data = binding.value;
      let prefix = 'store';
      if (OS.isAndroid || OS.isPhone) {
        prefix = 'mall';
      }
      analytics.request({
        ty: `${prefix}_${data.type}`,
        dc: data.desc || ''
      }, 'n');
    }, false);
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 坑位埋点指令</span>
Vue.directive(<span class="hljs-string">'stat'</span>, {
  bind(el, binding) {
    el.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> data = binding.value;
      <span class="hljs-keyword">let</span> prefix = <span class="hljs-string">'store'</span>;
      <span class="hljs-keyword">if</span> (OS.isAndroid || OS.isPhone) {
        prefix = <span class="hljs-string">'mall'</span>;
      }
      analytics.request({
        ty: <span class="hljs-string">`<span class="hljs-subst">${prefix}</span>_<span class="hljs-subst">${data.type}</span>`</span>,
        dc: data.desc || <span class="hljs-string">''</span>
      }, <span class="hljs-string">'n'</span>);
    }, <span class="hljs-literal">false</span>);
  }
});
</code></pre>
<h3 id="articleHeader7">使用路由拦截统计页面级别的 PV</h3>
<p>由于第一次在单页应用中尝试数据埋点，在项目上线一个星期之后，数据统计后台发现，首页的 PV 远远高于其它页面，数据很不正常。后来跟数据后台的人沟通询问他们的埋点统计原理之后，才发现其中的问题所在。</p>
<p><em>传统应用，一般都在页面加载的时候，会有一个异步的 js 加载，就像百度的统计代码类似，所以我们每个页面的加载的时候，都会统计到数据；然而在单页应用，页面加载初始化只有一次，所以其它页面的统计数据需要我们自己手动上报</em></p>
<p><strong>解决方案</strong></p>
<p>使用 <code>vue-router</code> 的 <code>beforeEach</code> 或者 <code>afterEach</code> 钩子上报数据，具体使用哪个最好是根据业务逻辑来选择。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const analyticsRequest = (to, from) => {
  // 只统计页面跳转数据，不统计当前页 query 不同的数据
  // 所以这里只使用了 path, 如果需要统计 query 的，可以使用 to.fullPath
  if (to.path !== from.path) {
    analytics.request({
      url: `${location.protocol}//${location.host}${to.path}`
    });
  }
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这里做登录等前置逻辑判断
    // 判断通过之后，再上报数据
    ...
    analyticsRequest(to, from);
  } else {
    // 不需要判断的，直接上报数据
    analyticsRequest(to, from);
    next();
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> analyticsRequest = <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span></span>) =&gt;</span> {
  <span class="hljs-comment">// 只统计页面跳转数据，不统计当前页 query 不同的数据</span>
  <span class="hljs-comment">// 所以这里只使用了 path, 如果需要统计 query 的，可以使用 to.fullPath</span>
  <span class="hljs-keyword">if</span> (to.path !== <span class="hljs-keyword">from</span>.path) {
    analytics.request({
      <span class="hljs-attr">url</span>: <span class="hljs-string">`<span class="hljs-subst">${location.protocol}</span>//<span class="hljs-subst">${location.host}</span><span class="hljs-subst">${to.path}</span>`</span>
    });
  }
};

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (to.matched.some(<span class="hljs-function"><span class="hljs-params">record</span> =&gt;</span> record.meta.requiresAuth)) {
    <span class="hljs-comment">// 这里做登录等前置逻辑判断</span>
    <span class="hljs-comment">// 判断通过之后，再上报数据</span>
    ...
    analyticsRequest(to, <span class="hljs-keyword">from</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 不需要判断的，直接上报数据</span>
    analyticsRequest(to, <span class="hljs-keyword">from</span>);
    next();
  }
});</code></pre>
<p>在组件中使用我们的自定义指令</p>
<p><span class="img-wrap"><img data-src="/img/bVUAV0?w=1118&amp;h=249" src="https://static.alili.tech/img/bVUAV0?w=1118&amp;h=249" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">使用过滤器实现展示信息格式化</h3>
<p>如下图中奖金数据信息，我们需要将后台返回的奖金格式化为带两位小数点的格式，同时，如果返回的金额是区间类型，需要额外加上 &lt;span style="color:red;font-weight: bold;"&gt;起&lt;/span&gt; 字和 &lt;span style="color:red;font-weight: bold;"&gt;￥&lt;/span&gt; 金额符号</p>
<p><span class="img-wrap"><img data-src="/img/bVUAV0?w=1118&amp;h=249" src="https://static.alili.tech/img/bVUAV0?w=1118&amp;h=249" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在入口文件 <code>main.js</code> 中配置我们自定义的过滤器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.filter('money', (value, config = { unit: '￥', fixed: 2 }) => {
  const moneyStr = `${value}`;
  if (moneyStr.indexOf('-') > -1) {
    const scope = moneyStr.split('-');
    return `${config.unit}${parseFloat(scope[0]).toFixed(config.fixed).toString()} 起`;
  } else if (value === 0) {
    return value;
  }

  return `${config.unit}${parseFloat(moneyStr).toFixed(config.fixed).toString()}`;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.filter(<span class="hljs-string">'money'</span>, (value, config = { <span class="hljs-attr">unit</span>: <span class="hljs-string">'￥'</span>, <span class="hljs-attr">fixed</span>: <span class="hljs-number">2</span> }) =&gt; {
  <span class="hljs-keyword">const</span> moneyStr = <span class="hljs-string">`<span class="hljs-subst">${value}</span>`</span>;
  <span class="hljs-keyword">if</span> (moneyStr.indexOf(<span class="hljs-string">'-'</span>) &gt; <span class="hljs-number">-1</span>) {
    <span class="hljs-keyword">const</span> scope = moneyStr.split(<span class="hljs-string">'-'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${config.unit}</span><span class="hljs-subst">${<span class="hljs-built_in">parseFloat</span>(scope[<span class="hljs-number">0</span>]).toFixed(config.fixed).toString()}</span> 起`</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> value;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${config.unit}</span><span class="hljs-subst">${<span class="hljs-built_in">parseFloat</span>(moneyStr).toFixed(config.fixed).toString()}</span>`</span>;
});</code></pre>
<p>在组件中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;price&quot;>"{{"detail.priceScope | money"}}"</p>
<div :class=&quot;{singleWrapper: isMobile}&quot;>
    <p class=&quot;rate&quot;>比率："{{"detail.commissionRateScope"}}"%</p>
    <p class=&quot;income&quot;>奖金："{{"detail.expectedIncome | money"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"price"</span>&gt;</span></span><span class="hljs-template-variable">"{{"detail.priceScope | money}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{singleWrapper: isMobile}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rate"</span>&gt;</span>比率：</span><span class="hljs-template-variable">"{{"detail.commissionRateScope}</span><span class="xml">}%<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"income"</span>&gt;</span>奖金：</span><span class="hljs-template-variable">"{{"detail.expectedIncome | money}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h3 id="articleHeader9">axios 使用配置</h3>
<p>在项目中，我们使用了 <a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a> 做接口请求</p>
<p>在项目中全局配置 <code>/api/common.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';
import qs from 'qs';
import store from '../store';

// 全局默认配置
// 设置 POST 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 配置 CORS 跨域
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

// 请求发起前拦截器
axios.interceptors.request.use((config) => {
  // 全局 loading 状态，触发 loading 效果
  store.dispatch('updateLoadingStatus', {
    isLoading: true
  });
  
  // POST 请求参数处理成 axios post 方法所需的格式
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  
  // 这句不能省，不然后面的请求就无法成功发起，因为读不到配置参数
  return config;
}, () => {
  // 异常处理
  store.dispatch('updateLoadingStatus', {
    isLoading: false
  });
});

// 响应拦截
axios.interceptors.response.use((response) => {
  // 关闭 loading 效果
  store.dispatch('updateLoadingStatus', {
    isLoading: false
  });

  // 全局登录过滤，如果没有登录，直接跳转到登录 URL
  if (response.data.code === 300) {
    // 未登录
    window.location.href = getLoginUrl();
    return false;
  }

  // 这里返回的 response.data 是被 axios 包装过的一成，所以在这里抽取出来
  return response.data;
}, (error) => {
  store.dispatch('updateLoadingStatus', {
    isLoading: false
  });
  return Promise.reject(error);
});

// 导出
export default axios;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">'qs'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../store'</span>;

<span class="hljs-comment">// 全局默认配置</span>
<span class="hljs-comment">// 设置 POST 请求头</span>
axios.defaults.headers.post[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>;
<span class="hljs-comment">// 配置 CORS 跨域</span>
axios.defaults.withCredentials = <span class="hljs-literal">true</span>;
axios.defaults.crossDomain = <span class="hljs-literal">true</span>;

<span class="hljs-comment">// 请求发起前拦截器</span>
axios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">config</span>) =&gt;</span> {
  <span class="hljs-comment">// 全局 loading 状态，触发 loading 效果</span>
  store.dispatch(<span class="hljs-string">'updateLoadingStatus'</span>, {
    isLoading: <span class="hljs-literal">true</span>
  });
  
  <span class="hljs-comment">// POST 请求参数处理成 axios post 方法所需的格式</span>
  <span class="hljs-keyword">if</span> (config.method === <span class="hljs-string">'post'</span>) {
    config.data = qs.stringify(config.data);
  }
  
  <span class="hljs-comment">// 这句不能省，不然后面的请求就无法成功发起，因为读不到配置参数</span>
  <span class="hljs-keyword">return</span> config;
}, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 异常处理</span>
  store.dispatch(<span class="hljs-string">'updateLoadingStatus'</span>, {
    isLoading: <span class="hljs-literal">false</span>
  });
});

<span class="hljs-comment">// 响应拦截</span>
axios.interceptors.response.use(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-comment">// 关闭 loading 效果</span>
  store.dispatch(<span class="hljs-string">'updateLoadingStatus'</span>, {
    isLoading: <span class="hljs-literal">false</span>
  });

  <span class="hljs-comment">// 全局登录过滤，如果没有登录，直接跳转到登录 URL</span>
  <span class="hljs-keyword">if</span> (response.data.code === <span class="hljs-number">300</span>) {
    <span class="hljs-comment">// 未登录</span>
    <span class="hljs-built_in">window</span>.location.href = getLoginUrl();
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }

  <span class="hljs-comment">// 这里返回的 response.data 是被 axios 包装过的一成，所以在这里抽取出来</span>
  <span class="hljs-keyword">return</span> response.data;
}, <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  store.dispatch(<span class="hljs-string">'updateLoadingStatus'</span>, {
    isLoading: <span class="hljs-literal">false</span>
  });
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});

<span class="hljs-comment">// 导出</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> axios;</code></pre>
<p>然后我们在接口中使用就方便很多了 <code>/api/xxx.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from './common';

const baseURL = '/api/profile';
const USER_BASE_INFO = `${baseURL}/getUserBaseInfo.json`;
const UPDATE_USER_INFO = `${baseURL}/saveUserInfo.json`;

// 更新用户实名认证信息
const updateUserInfo = userinfo => axios.post(UPDATE_USER_INFO, userinfo);

// 获取用户基础信息
const getUserBaseInfo = () => axios.get(USER_BASE_INFO);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'./common'</span>;

<span class="hljs-keyword">const</span> baseURL = <span class="hljs-string">'/api/profile'</span>;
<span class="hljs-keyword">const</span> USER_BASE_INFO = <span class="hljs-string">`<span class="hljs-subst">${baseURL}</span>/getUserBaseInfo.json`</span>;
<span class="hljs-keyword">const</span> UPDATE_USER_INFO = <span class="hljs-string">`<span class="hljs-subst">${baseURL}</span>/saveUserInfo.json`</span>;

<span class="hljs-comment">// 更新用户实名认证信息</span>
<span class="hljs-keyword">const</span> updateUserInfo = <span class="hljs-function"><span class="hljs-params">userinfo</span> =&gt;</span> axios.post(UPDATE_USER_INFO, userinfo);

<span class="hljs-comment">// 获取用户基础信息</span>
<span class="hljs-keyword">const</span> getUserBaseInfo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> axios.get(USER_BASE_INFO);</code></pre>
<h3 id="articleHeader10">vuex 状态在响应式页面中的妙用</h3>
<p>由于项目是响应式页面，PC 端和移动端在表现成有很多不一致的地方，有时候单单通过 CSS 无法实现交互，这个时候，我们的 <code>vuex</code> 状态就派上用场了，</p>
<p>我们一开始在 <code>App.vue</code> 里面监听了页面的 <code>resize</code> 事件，动态的更新 <code>vuex</code> 里面 <code>isMobile</code> 的状态值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = throttle(() => {
 this.updatePlatformStatus({
   isMobile: isMobile()
 });
}, 500);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">window</span>.onresize = throttle(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
 <span class="hljs-keyword">this</span>.updatePlatformStatus({
   isMobile: isMobile()
 });
}, <span class="hljs-number">500</span>);</code></pre>
<p>然后，我们在组件层，就能响应式的渲染不同的 <code>dom</code> 结构了。其中最常见的是 PC 端和移动端加载的图片需要不同的规格的，这个时候我们可以这个做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  loadImgAssets(name, suffix = '.jpg') {
    return require(`../assets/images/${name}${this.isMobile ? '-mobile' : ''}${suffix}`);
  },
}

<img class=&quot;feed-back&quot; :src=&quot;loadImgAssets('feed-back')&quot;

<img v-lazy=&quot;{src: isMobile ? detail.imgUrlMobile : detail.imgUrlPc, loading: placeholder}&quot;>

// 动态渲染不同规格的 dislog
<el-dialog :visible.sync=&quot;dialogVisible&quot; :size=&quot;isMobile ? 'full' : 'tiny'&quot; top=&quot;30%&quot; custom-class=&quot;unCertification-dialog&quot;>
</el-dialog>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>methods: {
  loadImgAssets(name, suffix = <span class="hljs-string">'.jpg'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">`../assets/images/<span class="hljs-subst">${name}</span><span class="hljs-subst">${<span class="hljs-keyword">this</span>.isMobile ? <span class="hljs-string">'-mobile'</span> : <span class="hljs-string">''</span>}</span><span class="hljs-subst">${suffix}</span>`</span>);
  },
}

&lt;img <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"feed-back"</span> :src=<span class="hljs-string">"loadImgAssets('feed-back')"</span>

&lt;img v-lazy=<span class="hljs-string">"{src: isMobile ? detail.imgUrlMobile : detail.imgUrlPc, loading: placeholder}"</span>&gt;

<span class="hljs-comment">// 动态渲染不同规格的 dislog</span>
&lt;el-dialog :visible.sync=<span class="hljs-string">"dialogVisible"</span> :size=<span class="hljs-string">"isMobile ? 'full' : 'tiny'"</span> top=<span class="hljs-string">"30%"</span> custom-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"unCertification-dialog"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span></span></code></pre>
<p>下图分别是 PC 端和移动短的表现形式，然后配合 CSS 媒体查询实现各种布局</p>
<p><span class="img-wrap"><img data-src="/img/bVUAWl?w=1049&amp;h=762" src="https://static.alili.tech/img/bVUAWl?w=1049&amp;h=762" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVUAWs?w=401&amp;h=681" src="https://static.alili.tech/img/bVUAWs?w=401&amp;h=681" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">开发相关配置</h2>
<h3 id="articleHeader12">反向代理</h3>
<p>在项目目录的 <code>config</code> 文件下面的 <code>index.js</code> 配置我们的本地反向代理和端口信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {
  env: require('./dev.env'),
  port: 80,
  autoOpenBrowser: true,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
    '/api/profile': {
      target: '[真实接口地址]:[端口号]', // 例如： http://api.xxx.com
      changeOrigin: true,
      pathRewrite: {
        '^/api/profile': '/profile'
      }
    }
    ...
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dev: {
  <span class="hljs-attr">env</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
  <span class="hljs-attr">port</span>: <span class="hljs-number">80</span>,
  <span class="hljs-attr">autoOpenBrowser</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
  <span class="hljs-attr">assetsPublicPath</span>: <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">proxyTable</span>: {
    <span class="hljs-string">'/api/profile'</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">'[真实接口地址]:[端口号]'</span>, <span class="hljs-comment">// 例如： http://api.xxx.com</span>
      changeOrigin: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">pathRewrite</span>: {
        <span class="hljs-string">'^/api/profile'</span>: <span class="hljs-string">'/profile'</span>
      }
    }
    ...
  },</code></pre>
<p>然后我们调用接口的形式就会变成如下映射，当我们调用 <code>/api/profile/xxxx</code> 的时候，其实是调用了 <code>[真实接口地址]/profile/xxxx</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/api/profile/xxxx => [真实接口地址]/profile/xxxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">/api/</span>profile<span class="hljs-regexp">/xxxx =&gt; [真实接口地址]/</span>profile<span class="hljs-regexp">/xxxx</span></code></pre>
<p><strong>nginx 配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upstream api.xxx.com
{
 #ip_hash;
  server [接口服务器 ip 地址]:[端口];
}

server {
  ...
  location ^~ /api/profile {
    index index.php index.html index.html;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://api.xxx.com;
    
    rewrite ^/api/profile/(.*)$ /profile/$1 break;
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>upstream api.xxx.com
{
 <span class="hljs-meta">#ip_hash;</span>
  <span class="hljs-keyword">server</span> [接口服务器 ip 地址]:[端口];
}

<span class="hljs-keyword">server</span> {
  ...
  location ^~ /api/profile {
    <span class="hljs-keyword">index</span> <span class="hljs-keyword">index</span>.php <span class="hljs-keyword">index</span>.html <span class="hljs-keyword">index</span>.html;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http:<span class="hljs-comment">//api.xxx.com;</span>
    
    rewrite ^/api/profile/(.*)$ /profile/$<span class="hljs-number">1</span> <span class="hljs-keyword">break</span>;
  }
  ...
}</code></pre>
<h3 id="articleHeader13">线上部署</h3>
<p>如果路由使用的是 <code>history</code> 模式的话，需要在 <code>nginx</code> 里面配置将所有的请求到转发到 <code>index.html</code> 去</p>
<p>在 <code>nginx.conf</code> 或者对应的站点 <code>vhost</code> 文件下面配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location / {
    try_files $uri $uri/ /index.html;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">location</span> / {
    <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html;
}</code></pre>
<h2 id="articleHeader14">优化</h2>
<p><strong>开启静态资源长缓存</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|woff|ttf|eot|svg)$ {
    expires 1y;
}

location ~ .*\.(js|css)$ {
    expires 1y;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>location ~ .*\.(gif|<span class="hljs-type">jpg</span>|<span class="hljs-type">jpeg</span>|<span class="hljs-type">png</span>|<span class="hljs-type">bmp</span>|<span class="hljs-type">swf</span>|<span class="hljs-type">woff</span>|<span class="hljs-type">ttf</span>|<span class="hljs-type">eot</span>|<span class="hljs-type">svg</span>)$ {
    expires <span class="hljs-number">1</span>y;
}

location ~ .*\.(js|<span class="hljs-type">css</span>)$ {
    expires <span class="hljs-number">1</span>y;
}</code></pre>
<p><strong>开启静态资源 gzip 压缩</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 找到 nginx.conf 配置文件
vim /data/nginx/conf/nginx.conf

gzip on;
gzip_min_length  1k;
gzip_buffers     4 8k;
gzip_http_version 1.1;
gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> 找到 nginx.conf 配置文件
vim <span class="hljs-regexp">/data/</span>nginx<span class="hljs-regexp">/conf/</span>nginx.conf

gzip on;
gzip_min_length  <span class="hljs-number">1</span>k;
gzip_buffers     <span class="hljs-number">4</span> <span class="hljs-number">8</span>k;
gzip_http_version <span class="hljs-number">1.1</span>;
gzip_types text<span class="hljs-regexp">/plain application/</span>javascript application<span class="hljs-regexp">/x-javascript text/</span>javascript text<span class="hljs-regexp">/xml text/</span>css;</code></pre>
<p>开启了 gzip 压缩之后，页面资源请求大小将大大减小，如下图所示，表示已经开启了 <code>gzip</code> 压缩</p>
<p><span class="img-wrap"><img data-src="/img/bVUAWK?w=1076&amp;h=304" src="https://static.alili.tech/img/bVUAWK?w=1076&amp;h=304" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">Q&amp;A</h2>
<p>文章到这就结束了，如果有遗漏或者错误的地方，欢迎私信指出。<br>希望这篇文章能带给大家一丝丝收获。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0 项目开发小结

## 原文链接
[https://segmentfault.com/a/1190000011066120](https://segmentfault.com/a/1190000011066120)

