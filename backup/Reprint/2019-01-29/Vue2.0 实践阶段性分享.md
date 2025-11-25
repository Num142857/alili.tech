---
title: 'Vue2.0 实践阶段性分享' 
date: 2019-01-29 2:30:10
hidden: true
slug: 546qtmt98vb
categories: [reprint]
---

{{< raw >}}

                    
<p>近来忙于学习、开发，已有一段时间没写文章了。这段时间用 Vue2.0 开发项目，踩坑之余，也收获了不少！趁热打铁，来个阶段性分享吧！</p>
<p>整个后台我们使用 Vue-router 来管理路由，用 Vuex 统一状态管理，Vue-resource 来完成ajax请求，Element-ui 来快速开发UI，webpack 编译打包，eslint 规范团队代码规范。</p>
<h3 id="articleHeader0">框架相关</h3>
<p>框架搭建，大家可以采用<a href="http://vuejs.org/v2/guide/installation.html#CLI" rel="nofollow noreferrer" target="_blank">官网</a> 的 <code>vue-cli</code> 开始着手构建。安装过程中，我们可以根据项目所需，选择版本、单元测试、e2e测试，以及是否使用eslint等（已经有很多搭建入门篇了，这里就不多赘述，有兴趣的同学可以去网上搜下）。初步搭建后，可以执行下 <code>yarn init</code>，项目会自动生成 <code>yarn.lock</code> 文件，锁定版本。（关于yarn，可以参考下这篇<a href="https://segmentfault.com/a/1190000007173332">文章</a>）。</p>
<p>框架初始化后，我们可以在 <code>build</code> 文件夹中的 <code>webpack.base.conf.js</code> 查看到 webpack 的基本配置，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909111?w=881&amp;h=552" src="https://static.alili.tech/img/remote/1460000007909111?w=881&amp;h=552" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在 <code>config</code> 文件夹下的index.js可以配置本地开发的端口，默认是8080，你可以根据需要调整：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909112?w=779&amp;h=119" src="https://static.alili.tech/img/remote/1460000007909112?w=779&amp;h=119" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在 <code>.eslintrc.js</code> 文件的 <code>rules</code> 里面自定义团队js的书写规范，简单示例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909113?w=732&amp;h=176" src="https://static.alili.tech/img/remote/1460000007909113?w=732&amp;h=176" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其中 <code>0</code> 为关闭，<code>1</code> 为警告, <code>2</code> 为报错。</p>
<h3 id="articleHeader1">路由</h3>
<p>首先根据官网提示安装 <code>npm install vue-router</code> 或者 <code>yarn add vue-router</code>， 然后在main.js里面，根据官网提示引入。接着，写一个路由配置文件，在main.js里面引入使用，现在 main.js 里面关于路由的配置应该是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909114?w=800&amp;h=304" src="https://static.alili.tech/img/remote/1460000007909114?w=800&amp;h=304" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们需要把路由和全局状态管理 <code>store</code> (下文会讲到) 同步起来，可以使用 <code>vuex-router-sync</code>。安装引用后，在模块里面从state里面就可以拿到路由的相关信息了，如：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909115?w=656&amp;h=84" src="https://static.alili.tech/img/remote/1460000007909115?w=656&amp;h=84" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>有时候路由跳转需要检查是否需要授权，这时候就要定义路由的 <code>meta</code> 字段了。引用官网的一句话 “一个路由匹配到的所有路由记录会暴露为 $route 对象（还有在导航钩子中的 route 对象）的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。“</p>
<p>我们可以这样在全局导航钩子中检查 meta 字段，以此来判断是否需要跳转授权：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909116?w=648&amp;h=244" src="https://static.alili.tech/img/remote/1460000007909116?w=648&amp;h=244" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>注意</code>：不要忘记在需要授权的路由前面加上 <code>meta: { requiresAuth: true }</code> 。</p>
<h3 id="articleHeader2">Vuex状态管理</h3>
<p>首先根据官网提示安装 <code>npm install vuex</code> 或者 <code>yarn add vuex</code>，然后新建一个store文件夹，里面分别放置 <code>modules</code>, <code>actions</code>, <code>getters</code>, <code>mutations</code>, <code>constants</code> 和 <code>index.js</code> 等文件, 接着在 main.js 里面这样写：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909117?w=538&amp;h=208" src="https://static.alili.tech/img/remote/1460000007909117?w=538&amp;h=208" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>关于store的布局，我们可以根据项目所需，拆分成不同的 module、action 等，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909118?w=213&amp;h=344" src="https://static.alili.tech/img/remote/1460000007909118?w=213&amp;h=344" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>关于state里面数据的变动都在mutation里面处理，接口调用在action里面处理，需要<code>.vue</code> 文件里面获取数据可以通过 <code>mapGetters</code> 或者 <code>mapState</code>，大致实例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909119?w=730&amp;h=118" src="https://static.alili.tech/img/remote/1460000007909119?w=730&amp;h=118" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>mapGetters</code> 和 <code>mapState</code> 的区别在于 <code>mapGetters</code>，你写一个 getters function 可以在不同模块之间共用，而 <code>mapState</code> 只用于当前的模块。</p>
<p>由于所有 state 和 getters 等都放在store中，所以我们可以在 mutation 和<br>action 里面通过解构参数，拿到想要的 state 和 getter 等，如：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909120?w=661&amp;h=298" src="https://static.alili.tech/img/remote/1460000007909120?w=661&amp;h=298" alt="" title="" style="cursor: pointer;"></span></p>
<p>篇幅有限，无法面面俱到，详细用法建议大家参考<a href="http://vuex.vuejs.org/en/" rel="nofollow noreferrer" target="_blank">官网</a> 或者其它 vuex 详解篇。</p>
<h3 id="articleHeader3">组件和过滤器</h3>
<p>组件和过滤器的注册可分为全局使用和部分模块使用。例如，我们写了一个确认框组件<code>comfirm.vue</code>，这个组件要在模块a里面引用，我们可以在模块a里面这样引用，并传入对应的prop:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;f-confirm&quot;>
    <f-confirm :confirmData=&quot;confirmData&quot; :isBill=&quot;isBill&quot;></f-confirm>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import fConfirm from './confirm';

export default {
  data() {
    return {
      isBill: true
    }
  },
  
  computed: mapGetters({
    confirmData 'getConfirmData'
  }),
  
  components: { fConfirm },
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"f-confirm"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">f-confirm</span> <span class="hljs-attr">:confirmData</span>=<span class="hljs-string">"confirmData"</span> <span class="hljs-attr">:isBill</span>=<span class="hljs-string">"isBill"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">f-confirm</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> </span></span></span><span class="hljs-template-variable">{ mapGetters, mapActions }</span><span class="xml"><span class="javascript"> <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> fConfirm <span class="hljs-keyword">from</span> <span class="hljs-string">'./confirm'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  data() {
    return {
      isBill: true
    }</span><span class="xml"><span class="undefined">
  },
  
  computed: mapGetters(</span></span><span class="hljs-template-variable">{
    confirmData 'getConfirmData'
  }</span><span class="xml"><span class="undefined">),
  
  components: </span></span><span class="hljs-template-variable">{ fConfirm }</span><span class="xml"><span class="undefined">,
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>此外，对于共用的组件和过滤器注册，我们可以统一在 main.js 里面，把它们加载进来，然后全局注册，做法如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909121?w=733&amp;h=199" src="https://static.alili.tech/img/remote/1460000007909121?w=733&amp;h=199" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这样注册后，我们在需要用到它们的任何一个组件里面，都可以使用。比如我需要在模块b里面用到 <code>header.vue</code> 和 <code>content.vue</code> 这两个组件，我直接在模块a里面这样写就行：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909122?w=499&amp;h=179" src="https://static.alili.tech/img/remote/1460000007909122?w=499&amp;h=179" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>注意</code>： 这时候 <code>&lt;script&gt;</code> 标签里面不需要再去 import 这个组件，也不需要写在<code>components</code> 里面了。</p>
<h3 id="articleHeader4">混合（mixin）</h3>
<p>写过 <code>Sass</code> 的同学都知道混合宏，那么，在Vue里面，mixin又是什么呢？官网是这样描述的，“<code>混合</code>是一种灵活的分布式复用 Vue 组件的方式。混合对象可以包含任意组件选项。以组件使用混合对象时，所有混合对象的选项将被混入该组件本身的选项。”</p>
<p>举个例子，比如我在 <code>模块a</code> 和 <code>模块b</code> 里面都需要用到这样的代码，那么我可以把它写成一个mixin，如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008122738?w=711&amp;h=427" src="https://static.alili.tech/img/remote/1460000008122738?w=711&amp;h=427" alt="" title="" style="cursor: pointer;"></span></p>
<p>在 <code>模块a</code> 或 <code>模块b</code> 里面这样引用就可以了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008122739?w=728&amp;h=136" src="https://static.alili.tech/img/remote/1460000008122739?w=728&amp;h=136" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>要注意的是，当组件和 <code>混合</code>对象有同名钩子时，这些钩子将混合成一个数组，都会被调用，但是 <code>混合</code> 对象的钩子会比组件自身的钩子先被调用。引用官网的一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var mixin = {
      created: function () {
        console.log('混合对象的钩子被调用')
      }
    }
    new Vue({
      mixins: [mixin],
      created: function () {
        console.log('组件钩子被调用')
      }
    })
    // -> &quot;混合对象的钩子被调用&quot;
    // -> &quot;组件钩子被调用&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="javascrpt">    <span class="hljs-keyword">var</span> mixin = {
      <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'混合对象的钩子被调用'</span>)
      }
    }
    <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">mixins</span>: [mixin],
      <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件钩子被调用'</span>)
      }
    })
    <span class="hljs-comment">// -&gt; "混合对象的钩子被调用"</span>
    <span class="hljs-comment">// -&gt; "组件钩子被调用"</span></code></pre>
<p><code>混合</code> 对于减少重复的代码是个很好的选择，但是要注意谨慎使用全局的mixin, 因为它会影响到每个单独创建的 Vue 实例。</p>
<h3 id="articleHeader5">api 调用</h3>
<p>文首已经提及，我们采用vue-resource来完成ajax请求。vue-resource是一个非常小巧的库，压缩后大约只有12KB，服务端启用gzip压缩后只有4.5KB大小。它和Vue.js一样，除了不支持IE 9以下的浏览器，其他主流的浏览器都支持。它支持Promise API和URI Templates，也支持拦截器。拦截器是全局的，拦截器可以在请求发送前和发送请求后做一些处理。这里提供 vue-resource <a href="https://github.com/pagekit/vue-resource" rel="nofollow noreferrer" target="_blank">github</a> 地址，没用过的同学可以先去看下。</p>
<p>为了不必每次调用都要写上诸如下面这样繁琐的代码，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.$http.get(this.apiUrl, ...)
    .then((response) => {
        this.$set('gridData', response.data)
    })
    .catch(function(response) {
        console.log(response)
    });
    
    this.$http.post(this.apiUrl, data, ...)
    .then((response) => {
        this.$set('gridData', response.data)
    })
    .catch(function(response) {
        console.log(response)
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript">    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-keyword">this</span>.apiUrl, ...)
    .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
        <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'gridData'</span>, response.data)
    })
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
        <span class="hljs-built_in">console</span>.log(response)
    });
    
    <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-keyword">this</span>.apiUrl, data, ...)
    .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
        <span class="hljs-keyword">this</span>.$set(<span class="hljs-string">'gridData'</span>, response.data)
    })
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
        <span class="hljs-built_in">console</span>.log(response)
    })</code></pre>
<p>我们可以把 ajax 相关的调用方法封装起来，简单示例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909123?w=719&amp;h=365" src="https://static.alili.tech/img/remote/1460000007909123?w=719&amp;h=365" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在需要用到的模块里面，这样引用：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007909124?w=578&amp;h=252" src="https://static.alili.tech/img/remote/1460000007909124?w=578&amp;h=252" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>此外，项目所用到的接口地址也建议统一写在一份配置文件，这样比较好管理，简单可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = {
  base: '/bill/manage',
  ports: {
    export: '/export/refresh/'
    bank: '/bank/filter/',
    online: '/online/filter/',
    ...
  }
};

export const getUri = (key) => {
  if (!path.ports[key]) {
    return false;
  }
  return path.base + path.ports[key];
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = {
  <span class="hljs-attr">base</span>: <span class="hljs-string">'/bill/manage'</span>,
  <span class="hljs-attr">ports</span>: {
    <span class="hljs-attr">export</span>: <span class="hljs-string">'/export/refresh/'</span>
    bank: <span class="hljs-string">'/bank/filter/'</span>,
    <span class="hljs-attr">online</span>: <span class="hljs-string">'/online/filter/'</span>,
    ...
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getUri = <span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!path.ports[key]) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">return</span> path.base + path.ports[key];
};</code></pre>
<p>在调用接口时，直接传参数调用 <code>getUri</code> 来获取对应的url, 如 <code>getUri(bank)</code>。<br>不过，这种方法我感觉还不大满意，如果大家有更好的做法，欢迎分享！</p>
<h3 id="articleHeader6">总结</h3>
<p>篇幅有限，没有办法细讲每个小标题，只能把大致地跟大家分享下。这段时间，也喜欢自己做一下vue功能组件，如 vue-upload, vue-chart 等，有时间整理后，再和大家一起分享！当然现在网上已经有很多现成的库了，有兴趣的同学都可以去看看。</p>
<p>如果你也在用vue2开发, 欢迎交流、分享！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 实践阶段性分享

## 原文链接
[https://segmentfault.com/a/1190000007909108](https://segmentfault.com/a/1190000007909108)

