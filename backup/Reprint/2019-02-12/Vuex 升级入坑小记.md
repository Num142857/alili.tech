---
title: 'Vuex 升级入坑小记' 
date: 2019-02-12 2:30:12
hidden: true
slug: uxsgax9sgi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vuex 升级入坑小记</h1>
<h2 id="articleHeader1">场景描述</h2>
<p>引入Vuex的版本为0.3，开启调试工具默认升级后可以调试Vuex。给作者一个大大的赞。为提高开发体验也是操碎了心 (๑•̀ㅂ•́)و✧  (8。安利下(<a href="https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?utm_source=chrome-ntp-icon" rel="nofollow noreferrer" target="_blank">Vue Devtools</a>）。</p>
<p>Vue Devtools 只支持了v0.5＋。遂升级Vuex，发现大量Vuex使用失效，报<code>vuex actions undefined</code>，Vuex的中文文档，没有及时更新。英文文档Api的改动已经同步文档。</p>
<p>关于Vuex 接口升级的说明 <a href="https://github.com/vuejs/vuex/issues/54" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vuex/issues/54</a></p>
<h2 id="articleHeader2">升级</h2>
<p>升级Vuex以后的写法和route的方式类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import MyComponent from './MyComponent'

// important, teaches Vue components how to
// handle Vuex-related options
Vue.use(Vuex)

var app = new Vue({
    el: '#app',
    // provide the store using the &quot;store&quot; option.
    // this will inject the store instance to all child components.
    store,
    components: {
       MyComponent
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> MyComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./MyComponent'</span>

<span class="hljs-comment">// important, teaches Vue components how to</span>
<span class="hljs-comment">// handle Vuex-related options</span>
Vue.use(Vuex)

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-comment">// provide the store using the "store" option.</span>
    <span class="hljs-comment">// this will inject the store instance to all child components.</span>
    store,
    <span class="hljs-attr">components</span>: {
       MyComponent
    }
});</code></pre>
<p>应用store数据的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    computed: {
        data () {
             return this.$store.state.data
           }
    },
      methods {
          doSomething () {
              ...
              this.$store.dispatch('MUTATIONS', arguments);
              ...
        }
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span>: {
        data () {
             <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.data
           }
    },
      methods {
          doSomething () {
              ...
              this.$store.dispatch(<span class="hljs-string">'MUTATIONS'</span>, <span class="hljs-built_in">arguments</span>);
              ...
        }
    }
};
</code></pre>
<p>升级后的直观感受，<code>this.$store</code>的方式取值 和 调用actions更方便了。</p>
<h2 id="articleHeader3">Vuex改善开发体验之处</h2>
<p>引入<code>Vue-route</code> Vue才算正儿八经开发SPA了。<code>Vue-route</code> 的使命是不断切换，组件树。虽然子组件可以复用，但是不能共享数据，View切换父组件的生命周期结束，随之子组件的生命周期结束。子组件的数据随之清空。在特定场景需要一些数据持久化。官方给了一些例子 <a href="https://github.com/vuejs/vuex/tree/master/examples" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vuex/tree/master/examples</a></p>
<p>我的项目中适合用Vuex的地方：1持久化用户信息。2机票订单和用户信息。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex 升级入坑小记

## 原文链接
[https://segmentfault.com/a/1190000004666675](https://segmentfault.com/a/1190000004666675)

