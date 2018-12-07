---
title: '【Geek议题】合理的VueSPA架构讨论（下）' 
date: 2018-12-08 2:30:30
hidden: true
slug: 87kj87jmt38
categories: [reprint]
---

{{< raw >}}

                    
<p>接上篇《【Geek议题】合理的VueSPA架构讨论（上）》<a href="https://segmentfault.com/a/1190000014086261">传送门</a>。</p>
<h2 id="articleHeader0">自动化维护登录状态</h2>
<p>登录状态标识符跟token类似，都是需要自动维护有效期，但也有些许不同，获取过程只在用户登录或注册的时候，不需要自动获取。  <br>本人比较推荐使用<strong>公共状态管理vuex进行自动化管理</strong>，并配合路由钩子，减少代码编写时的顾虑。</p>
<h3 id="articleHeader1">妙用公共状态管理维护userId</h3>
<p>示例中公共状态管理中的user模块里定义了userIdObj，其中包含了userId登录状态标识符和过期时间。  <br>维护userId是否过期主要是通过vuex中的getter来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getters = {
  getUserId: (_state) => {
    // 获取公共状态中的userIdObj
    const userIdObj = {
      ..._state.userIdObj,
    };
    // 是否过期标识
    let isExpire = false;
    // 判断是否过期
    if (userIdObj &amp;&amp; userIdObj.userId) {
      isExpire = new Date().getTime() - userIdObj.expireTime > -10000;
    }
    // 如果过期则返回空字符串（不一定）
    if (!userIdObj || !userIdObj.userId || isExpire) {
      return '';
    }
    // 没过期则返回userId
    return userIdObj.userId;
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> getters = {
  <span class="hljs-attr">getUserId</span>: <span class="hljs-function">(<span class="hljs-params">_state</span>) =&gt;</span> {
    <span class="hljs-comment">// 获取公共状态中的userIdObj</span>
    <span class="hljs-keyword">const</span> userIdObj = {
      ..._state.userIdObj,
    };
    <span class="hljs-comment">// 是否过期标识</span>
    <span class="hljs-keyword">let</span> isExpire = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// 判断是否过期</span>
    <span class="hljs-keyword">if</span> (userIdObj &amp;&amp; userIdObj.userId) {
      isExpire = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - userIdObj.expireTime &gt; <span class="hljs-number">-10000</span>;
    }
    <span class="hljs-comment">// 如果过期则返回空字符串（不一定）</span>
    <span class="hljs-keyword">if</span> (!userIdObj || !userIdObj.userId || isExpire) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }
    <span class="hljs-comment">// 没过期则返回userId</span>
    <span class="hljs-keyword">return</span> userIdObj.userId;
  },
};</code></pre>
<h3 id="articleHeader2">路由钩子中处理userId</h3>
<p>回顾上篇中全局的路由钩子<code>router.beforeEach</code>，当目标路由元信息requiresAuth为true则表示，这个路由必须有登录状态才能访问，这时候就会进行登录状态检查。处理思路如下：</p>
<ol>
<li>使用上面定义的getter方法获取userId；</li>
<li>如果能获取到则说明有<strong>有效的userId</strong>，则时候即可跳转到目标页；</li>
<li>如果获取到空字符串，则说明<strong>userId无效</strong>或<strong>userId不存在</strong>，跳转至登录页面。</li>
</ol>
<blockquote>【PS】示例这里的处理还不完美，最好跳转登录前保存好目标路由，登录成功就直接跳转去该路由。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  // ...
  // 检查登录状态
  if (to.meta.requiresAuth) {
    console.log('目标路由需要登录状态');
    if (!store.getters.getUserId) {
      console.log('内存无登录信息，尝试在本地存储中找');
      const localUserIdObj = JSON.parse(localStorage.getItem('userIdObj'));
      if (localUserIdObj) {
        // 如果本地存储中有userIdObj，则提交到公共状态
        store.commit('setUserIdObj', localUserIdObj);
      }
    }
    // 再次检查公共状态里有没有userId
    if (!store.getters.getUserId) {
      console.log('依旧无登录信息');
      router.push({
        name: 'userLogin',
      });
    }
  }
  next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-comment">// 检查登录状态</span>
  <span class="hljs-keyword">if</span> (to.meta.requiresAuth) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'目标路由需要登录状态'</span>);
    <span class="hljs-keyword">if</span> (!store.getters.getUserId) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'内存无登录信息，尝试在本地存储中找'</span>);
      <span class="hljs-keyword">const</span> localUserIdObj = <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">'userIdObj'</span>));
      <span class="hljs-keyword">if</span> (localUserIdObj) {
        <span class="hljs-comment">// 如果本地存储中有userIdObj，则提交到公共状态</span>
        store.commit(<span class="hljs-string">'setUserIdObj'</span>, localUserIdObj);
      }
    }
    <span class="hljs-comment">// 再次检查公共状态里有没有userId</span>
    <span class="hljs-keyword">if</span> (!store.getters.getUserId) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'依旧无登录信息'</span>);
      router.push({
        <span class="hljs-attr">name</span>: <span class="hljs-string">'userLogin'</span>,
      });
    }
  }
  next();
});</code></pre>
<h3 id="articleHeader3">”页面”中获取登录状态</h3>
<p>在“页面”中获取userId也很简单，使用计算属性是最好的，返回的userId具有响应性，这做的好处也是为了实时将登录状态反应到页面上，才不会出现显示已登录，但用户刷新一下才能知道登录状态已过期的尴尬情况。</p>
<blockquote>【PS】一些需要用户登录状态的api函数，也是通过这样的方法获取并使用。当然，建议在非首屏加载使用的api函数（比如提交表单），需要在调用前，检查一下userId还存不存在，以免出错。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  // 获取登录状态
  userId() {
    return this.$store.getters.getUserId;
  },
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
  <span class="hljs-comment">// 获取登录状态</span>
  userId() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.getUserId;
  },
},</code></pre>
<h2 id="articleHeader4">使用公共状态管理维护连接</h2>
<p>有时会有需要取消请求的需求，比如上传文件耗时过长，用户不想等，这时候就必须有取消的功能。  <br>上篇提到的axios已经提供了一个基于CancelToken的取消机制，这里我们要配合vuex实现对全局连接的实时监控。</p>
<blockquote>【PS】示例的接口名称都是在写api函数的时候定义好的，想要更加灵活，可以每次请求都单独指定名字。</blockquote>
<h3 id="articleHeader5">公共状态管理配置</h3>
<p>示例中给公共状态下的com模块添加了cancelToken数组，用来保存发起的连接的名称和source（取消标记），并提供了如下三个mutations方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 增加cancelToken
addCancelToken(_state, cancelToken) {
  _state.cancelToken.push(cancelToken);
  const arr = _state.cancelToken;
  _state.cancelToken = arr;
},
// 删除指定名字的cancelToken
deleteCancelToken(_state, name) {
  _state.cancelToken.some((i, index) => {
    if (i.name === name) {
      _state.cancelToken.splice(index, 1);
      return true;
    }
    return false;
  });
},
// 清空cancelToken
clearCancelToken(_state) {
  _state.cancelToken.forEach((i) => {
    if (i.source &amp;&amp; typeof i.source.cancel === 'function') {
      i.source.cancel(`cancel${name}`);
    }
  });
  _state.cancelToken = [];
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 增加cancelToken</span>
addCancelToken(_state, cancelToken) {
  _state.cancelToken.push(cancelToken);
  <span class="hljs-keyword">const</span> arr = _state.cancelToken;
  _state.cancelToken = arr;
},
<span class="hljs-comment">// 删除指定名字的cancelToken</span>
deleteCancelToken(_state, name) {
  _state.cancelToken.some(<span class="hljs-function">(<span class="hljs-params">i, index</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (i.name === name) {
      _state.cancelToken.splice(index, <span class="hljs-number">1</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  });
},
<span class="hljs-comment">// 清空cancelToken</span>
clearCancelToken(_state) {
  _state.cancelToken.forEach(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (i.source &amp;&amp; <span class="hljs-keyword">typeof</span> i.source.cancel === <span class="hljs-string">'function'</span>) {
      i.source.cancel(<span class="hljs-string">`cancel<span class="hljs-subst">${name}</span>`</span>);
    }
  });
  _state.cancelToken = [];
},</code></pre>
<h3 id="articleHeader6">请求拦截器配置</h3>
<p>基本思路：</p>
<ol>
<li>在“请求发起前拦截器”中获取到source（取消标记），写入请求配置，并提交名称和source到公共状态管理；</li>
<li>这时候通过查询公共状态中是否有这个名字的连接就可以获取到source进行取消；</li>
<li>在“响应拦截器”中我们将已经成功的请求在公共状态管理中移除。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 请求发起前拦截器
myAxios.interceptors.request.use((_config) => {
  const config = _config;
  const source = axios.CancelToken.source();
  // 获取cancelToken
  config.cancelToken = source.token;

  // 取消请求标记保存
  store.commit('addCancelToken', {
    name: config.name,
    source,
  });

  return config;
}, () => {
  // 异常处理
  console.error('请求发起前拦截器异常');
});

// 响应拦截器
myAxios.interceptors.response.use((response) => {
  // 删除取消标记
  store.commit('deleteCancelToken', response.config.name);

  console.log(response);
  return response;
}, (error) => {
  console.error(error);
  // 清理取消标记
  store.commit('clearCancelToken');
  return Promise.reject(error);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 请求发起前拦截器</span>
myAxios.interceptors.request.use(<span class="hljs-function">(<span class="hljs-params">_config</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> config = _config;
  <span class="hljs-keyword">const</span> source = axios.CancelToken.source();
  <span class="hljs-comment">// 获取cancelToken</span>
  config.cancelToken = source.token;

  <span class="hljs-comment">// 取消请求标记保存</span>
  store.commit(<span class="hljs-string">'addCancelToken'</span>, {
    <span class="hljs-attr">name</span>: config.name,
    source,
  });

  <span class="hljs-keyword">return</span> config;
}, () =&gt; {
  <span class="hljs-comment">// 异常处理</span>
  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'请求发起前拦截器异常'</span>);
});

<span class="hljs-comment">// 响应拦截器</span>
myAxios.interceptors.response.use(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-comment">// 删除取消标记</span>
  store.commit(<span class="hljs-string">'deleteCancelToken'</span>, response.config.name);

  <span class="hljs-built_in">console</span>.log(response);
  <span class="hljs-keyword">return</span> response;
}, (error) =&gt; {
  <span class="hljs-built_in">console</span>.error(error);
  <span class="hljs-comment">// 清理取消标记</span>
  store.commit(<span class="hljs-string">'clearCancelToken'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
});</code></pre>
<h3 id="articleHeader7">代码中使用</h3>
<p>使用计算属性获取cancelToken数组，这里是响应式的，所有我们其实可以知道现在有多少个请求还未完成了。</p>
<blockquote>【PS】实时对全局请求的监控已经实现，其实可以做的扩展就很多了，比如可以全局化loading的显示，只要数组内一直不为空持续一段时间就可以判断需要显示loading，如果为空则关闭loading。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  // 获取连接列表
  cancelToken() {
    return this.$store.state.com.cancelToken;
  },
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
  <span class="hljs-comment">// 获取连接列表</span>
  cancelToken() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.com.cancelToken;
  },
},</code></pre>
<p>遍历这个数组，查找到对应名字的连接就可以取消了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.cancelToken.forEach((i) => {
  console.log(i);
  if (i.name === '上传文件' &amp;&amp; typeof i.source.cancel === 'function') {
    console.log('取消上传');
    i.source.cancel(`cancel${name}`);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.cancelToken.forEach(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(i);
  <span class="hljs-keyword">if</span> (i.name === <span class="hljs-string">'上传文件'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> i.source.cancel === <span class="hljs-string">'function'</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'取消上传'</span>);
    i.source.cancel(<span class="hljs-string">`cancel<span class="hljs-subst">${name}</span>`</span>);
  }
});</code></pre>
<h2 id="articleHeader8">其他细节技巧</h2>
<h3 id="articleHeader9">挂载常用工具到vue原型上减少引用</h3>
<p>在初始化Vue的根组件前，给Vue的原型链上添加常用的工具，可以方便在vue文件中使用。这样做会影响所有Vue示例推荐只在单页面应用中使用。  <br>比如下面以我们的api集为例，这样在vue文件中<code>this.$api</code>就可以使用我们的api集，不需要重复引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将api模块挂载进vue方便在this调用
Vue.prototype.$api = api;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 将api模块挂载进vue方便在this调用</span>
Vue.prototype.$api = api;</code></pre>
<h3 id="articleHeader10">批量导入过滤器</h3>
<p>在util文件夹下可以新建一个专门用来存过滤器的filter.js，然后批量导入的全局过滤器中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as filters from './util/filter';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> filters <span class="hljs-keyword">from</span> <span class="hljs-string">'./util/filter'</span>;
<span class="hljs-built_in">Object</span>.keys(filters).forEach(<span class="hljs-function"><span class="hljs-params">k</span> =&gt;</span> Vue.filter(k, filters[k]));</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Geek议题】合理的VueSPA架构讨论（下）

## 原文链接
[https://segmentfault.com/a/1190000014097786](https://segmentfault.com/a/1190000014097786)

