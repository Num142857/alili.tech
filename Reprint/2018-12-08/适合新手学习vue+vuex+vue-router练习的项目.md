---
title: '适合新手学习vue+vuex+vue-router练习的项目' 
date: 2018-12-08 2:30:30
hidden: true
slug: 8vobufy0oxd
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue练手项目</h1>
<h3 id="articleHeader1">目的</h3>
<p>这个项目主要是用vue+vuex实现一个单页面应用，纯粹是熟悉vue全家桶相关开发模式，用于练手非常合适。</p>
<p>着手开发完了之后可以学的东西：</p>
<ol>
<li>熟悉vue单文件组件开发方式</li>
<li>熟悉如何写一个vue插件</li>
<li>熟悉如何使用vue-router以及挂载路由钩子函数</li>
<li>熟悉vuex是如何运作的，模块化维护应用状态数据</li>
<li>体验typescript的开发方式</li>
</ol>
<p>如果想学vue的不妨<a href="https://github.com/snayan/vue-task" rel="nofollow noreferrer" target="_blank">进来看看</a>。</p>
<h3 id="articleHeader2">技术栈</h3>
<ul>
<li>vue</li>
<li>vuex</li>
<li>vue-router</li>
<li>typescript</li>
</ul>
<h3 id="articleHeader3">开始</h3>
<p>开始之前，还是有必要去vue官网学习一下vue，至少得有个大致的了解，后面在用到vue-router和vuex时，再去对应的仓库看文档就可以了。</p>
<ul>
<li><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">vue官网地址</a></li>
<li><a href="https://router.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue-router地址</a></li>
<li><a href="https://vuex.vuejs.org/" rel="nofollow noreferrer" target="_blank">vuex地址</a></li>
</ul>
<p>创建项目可以用vue-cli，具体看<a href="https://github.com/vuejs/vue-cli/blob/dev/docs/README.md" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h3 id="articleHeader4">结构</h3>
<p>项目结构一般来说非常重要，定义好的目录结构，非常利于后续的项目维护，以及别人阅读理解。下面就是这个项目的结构，应该看一下就知道是干什么的，大致说一下。</p>
<p>项目结构分为静态资源目录，api接口请求目录，组件目录，插件目录，路由配置目录，公共样式目录，状态维护目录，工具类目录，页面视图目录。</p>
<p><span class="img-wrap"><img data-src="/img/bV61bQ?w=902&amp;h=704" src="https://static.alili.tech/img/bV61bQ?w=902&amp;h=704" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">单页面组件</h3>
<p>vue开发一般都是单页面组件的方式，即一个以vue为后缀的文件就是一个组件，组件里包含了template模版，script脚本，style样式，组件内的逻辑可以完全封装在里面，对外可以提供接受的Props数据，可以对外发射一个事件emit，或者将外部组件组合到自己内部的slot里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;topNav&quot;>
    <ul class=&quot;list&quot;>
      <li class=&quot;item left&quot;>
        <app-icon :link=&quot;left&quot; @click.native.stop=&quot;clickLeft&quot; />
      </li>
    </ul>
  </div>
</template>

<script lang=&quot;ts&quot;>
import { Component, Prop, Emit , Vue } from 'vue-property-decorator';
import AppIcon from './AppIcon.vue';
import {PREFIX} from '@/store/modules/user/CONSTANTS';

@Component({
  components: {
    AppIcon,
  },
})
export default class TopNav extends Vue {
  @Prop({required: true})
  private left!: string;
  private get avatar() {
    return this.$store.state[PREFIX].avatar;
  }
  private clickLeft() {
    this.$emit('left');
  }
}
</script>

<style lang=&quot;scss&quot; scoped>
@import '../scss/theme.scss';
.topNav {
  background: $topBarBgColor;
  position: fixed;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topNav"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">app-icon</span> <span class="hljs-attr">:link</span>=<span class="hljs-string">"left"</span> @<span class="hljs-attr">click.native.stop</span>=<span class="hljs-string">"clickLeft"</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="actionscript">
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> { Component, Prop, Emit , Vue } from 'vue-property-decorator';</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> AppIcon from './AppIcon.vue';</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> {PREFIX} from '@/store/modules/user/CONSTANTS';</span>

@Component({
  components: {
    AppIcon,
  },
})
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TopNav</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  @Prop({required: <span class="hljs-literal">true</span>})
  <span class="hljs-keyword">private</span> left!: string;
  <span class="hljs-keyword">private</span> <span class="hljs-keyword">get</span> avatar() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state[PREFIX].avatar;
  }
  <span class="hljs-keyword">private</span> clickLeft() {
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'left'</span>);
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
@<span class="hljs-keyword">import</span> <span class="hljs-string">'../scss/theme.scss'</span>;
<span class="hljs-selector-class">.topNav</span> {
  <span class="hljs-attribute">background</span>: $topBarBgColor;
  <span class="hljs-attribute">position</span>: fixed;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader6">配置路由</h3>
<p>由于在客户端渲染的单页面应用，需要在客户端配置路由，实现页面间的切换。开发vue时官方推荐使用vue-router，在配置这个项目时，由于考虑登录态的维护，所以对路由配置加了meta数据，并增加了路由跳转钩子函数，进行鉴权控制受登录态的页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Router from 'vue-router';
import Sign from '@/views/Sign.vue';
import Me from '@/views/Me.vue';
import { hasLogin } from '@/util/session';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign,
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      meta: { requiredAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!hasLogin()) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

export default router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> Sign <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/Sign.vue'</span>;
<span class="hljs-keyword">import</span> Me <span class="hljs-keyword">from</span> <span class="hljs-string">'@/views/Me.vue'</span>;
<span class="hljs-keyword">import</span> { hasLogin } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/util/session'</span>;

Vue.use(Router);

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  mode: <span class="hljs-string">'history'</span>,
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'sign'</span>,
      component: Sign,
    },
    {
      path: <span class="hljs-string">'/me'</span>,
      name: <span class="hljs-string">'me'</span>,
      component: Me,
      meta: { requiredAuth: <span class="hljs-literal">true</span> },
    },
  ],
});

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (to.matched.some(<span class="hljs-function">(<span class="hljs-params">record</span>) =&gt;</span> record.meta.requiredAuth)) {
    <span class="hljs-comment">// this route requires auth, check if logged in</span>
    <span class="hljs-comment">// if not, redirect to login page.</span>
    <span class="hljs-keyword">if</span> (!hasLogin()) {
      next({
        path: <span class="hljs-string">'/'</span>,
        query: { redirect: to.fullPath },
      });
    } <span class="hljs-keyword">else</span> {
      next();
    }
  } <span class="hljs-keyword">else</span> {
    next(); <span class="hljs-comment">// 确保一定要调用 next()</span>
  }
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router;</code></pre>
<h3 id="articleHeader7">vue插件编写</h3>
<p>对于那种需要全组件共享，或者全局注入的方法等可以使用vue插件。其实，vue-router和vuex实际就是vue的插件，在入口处，调<code>Vue.use(Router);</code> 就可以了，比如 <code>Vue.use(Router);</code></p>
<p>一个插件，可以是一个函数，或者一个包含<code>install</code>方法的对象，在调用<code>Vue.use</code>时，会调用<code>install</code>方法。</p>
<p>在插件里，我们可以</p>
<ol>
<li>添加全局方法或者属性，</li>
<li>添加全局资源</li>
<li>通过全局 mixin 方法添加一些组件选项</li>
<li>添加 Vue 实例方法</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue, { VueConstructor, PluginObject } from 'vue';
import Loading from './Loading.vue';

type ShowFunc = () => () => void;

const plugin: PluginObject<{}> = {
  install(Vue: VueConstructor, options = {}) {
    const CONSTRUCTOR = Vue.extend(Loading);
    let cache: Vue &amp; { show: ShowFunc } | null = null;

    function loading(): () => void {
      const loadingComponent = cache || (cache = new CONSTRUCTOR());
      if (!loadingComponent.$el) {
        const vm = loadingComponent.$mount();
        (document.querySelector('body') as HTMLElement).appendChild(vm.$el);
      }
      return loadingComponent.show();
    }
    Vue.prototype.$loading = loading;
  },
};

export default plugin;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> Vue, { VueConstructor, PluginObject } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Loading <span class="hljs-keyword">from</span> <span class="hljs-string">'./Loading.vue'</span>;

<span class="hljs-keyword">type</span> ShowFunc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> () =&gt; <span class="hljs-built_in">void</span>;

<span class="hljs-keyword">const</span> plugin: PluginObject&lt;{}&gt; = {
  install(Vue: VueConstructor, options = {}) {
    <span class="hljs-keyword">const</span> CONSTRUCTOR = Vue.extend(Loading);
    <span class="hljs-keyword">let</span> cache: Vue &amp; { show: ShowFunc } | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loading</span>(<span class="hljs-params"></span>): (<span class="hljs-params"></span>) =&gt; <span class="hljs-title">void</span> </span>{
      <span class="hljs-keyword">const</span> loadingComponent = cache || (cache = <span class="hljs-keyword">new</span> CONSTRUCTOR());
      <span class="hljs-keyword">if</span> (!loadingComponent.$el) {
        <span class="hljs-keyword">const</span> vm = loadingComponent.$mount();
        (<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'body'</span>) <span class="hljs-keyword">as</span> HTMLElement).appendChild(vm.$el);
      }
      <span class="hljs-keyword">return</span> loadingComponent.show();
    }
    Vue.prototype.$loading = loading;
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> plugin;</code></pre>
<h3 id="articleHeader8">状态管理</h3>
<p>单页面应用的状态管理使用vuex，上面提到了，它就是一个vue的插件，会在组件实例上注入$store对象，这个对象就是<code>new Vuex.Store()</code>,相比redux ，我觉得vuex简单很多。使用需要注意一下几点就可以了，</p>
<ol>
<li>改变state，始终是通过commit一个mutation方式进行，mutation函数里必须是同步改变state，不能异步改变state。对应redux中，就是reducer函数的功能了。</li>
<li>对于异步改变state，可以通过dispatch一个action，action里面异步获取数据之后在commit一个对应的mutation。这个在redux里，是通过中间件处理异步action的。</li>
<li>对于state的过滤筛选，可以定义getter，getter是缓存依赖的。</li>
<li>对于大型复杂的state，可以采用模块化的方式管理各个模块的state，这个跟redux的思想是一样的。</li>
</ol>
<p>本次项目也是用模块化的管理状态的方式，把整个应用的状态以业务划分为子状态，最后在modules中合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  modules: {
    user,
    list,
    filter,
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  modules: {
    user,
    list,
    filter,
  },</code></pre>
<p>对于单个模块的state，按照上面的注意点即可以。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// user模块的state
import { ActionTree, MutationTree, ActionContext } from 'vuex';
import { login, loginOut, LoginInfo } from '@/api/login';
import { getUserInfo, getUserActions } from '@/api/user';
import { User } from './user';
import { RootState } from '../../rootstate';

const namespaced = true;

/* initial state */
const state = () => ({
  id: null,
  username: null,
  email: null,
  avatar: null,
  likes_count: null,
  goings_count: null,
  past_count: null,
});

/* user actions */
const actions: ActionTree<User, RootState> = {
  login({ commit, state }: ActionContext<User, RootState>, payload: LoginInfo) {
    return login(payload).then(
      ({ token, user }: { token: string; user: User }) => {
        commit('saveToken', token, { root: true });
        commit('saveUser', user);
      },
    );
  },
  getUserInfo({ commit, state }: ActionContext<User, RootState>) {
    return getUserInfo().then((user: User) => {
      commit('saveUser', user);
    });
  },
};

/* user mutations */
const mutations: MutationTree<User> = {
  saveUser(state, user) {
    state.id = user.id;
    state.username = user.username;
    state.email = user.email;
    state.avatar = user.avatar;
    state.likes_count = user.likes_count;
    state.goings_count = user.goings_count;
    state.past_count = user.past_count;
  },
};

export default {
  state,
  actions,
  mutations,
  namespaced,
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// user模块的state</span>
<span class="hljs-keyword">import</span> { ActionTree, MutationTree, ActionContext } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> { login, loginOut, LoginInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/api/login'</span>;
<span class="hljs-keyword">import</span> { getUserInfo, getUserActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'@/api/user'</span>;
<span class="hljs-keyword">import</span> { User } <span class="hljs-keyword">from</span> <span class="hljs-string">'./user'</span>;
<span class="hljs-keyword">import</span> { RootState } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../rootstate'</span>;

<span class="hljs-keyword">const</span> namespaced = <span class="hljs-literal">true</span>;

<span class="hljs-comment">/* initial state */</span>
<span class="hljs-keyword">const</span> state = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  id: <span class="hljs-literal">null</span>,
  username: <span class="hljs-literal">null</span>,
  email: <span class="hljs-literal">null</span>,
  avatar: <span class="hljs-literal">null</span>,
  likes_count: <span class="hljs-literal">null</span>,
  goings_count: <span class="hljs-literal">null</span>,
  past_count: <span class="hljs-literal">null</span>,
});

<span class="hljs-comment">/* user actions */</span>
<span class="hljs-keyword">const</span> actions: ActionTree&lt;User, RootState&gt; = {
  login({ commit, state }: ActionContext&lt;User, RootState&gt;, payload: LoginInfo) {
    <span class="hljs-keyword">return</span> login(payload).then(
      <span class="hljs-function">(<span class="hljs-params">{ token, user }: { token: <span class="hljs-built_in">string</span>; user: User }</span>) =&gt;</span> {
        commit(<span class="hljs-string">'saveToken'</span>, token, { root: <span class="hljs-literal">true</span> });
        commit(<span class="hljs-string">'saveUser'</span>, user);
      },
    );
  },
  getUserInfo({ commit, state }: ActionContext&lt;User, RootState&gt;) {
    <span class="hljs-keyword">return</span> getUserInfo().then(<span class="hljs-function">(<span class="hljs-params">user: User</span>) =&gt;</span> {
      commit(<span class="hljs-string">'saveUser'</span>, user);
    });
  },
};

<span class="hljs-comment">/* user mutations */</span>
<span class="hljs-keyword">const</span> mutations: MutationTree&lt;User&gt; = {
  saveUser(state, user) {
    state.id = user.id;
    state.username = user.username;
    state.email = user.email;
    state.avatar = user.avatar;
    state.likes_count = user.likes_count;
    state.goings_count = user.goings_count;
    state.past_count = user.past_count;
  },
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  state,
  actions,
  mutations,
  namespaced,
};
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
适合新手学习vue+vuex+vue-router练习的项目

## 原文链接
[https://segmentfault.com/a/1190000014026878](https://segmentfault.com/a/1190000014026878)

