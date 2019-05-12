---
title: 'Vuex 模块化实现待办事项的状态管理' 
date: 2019-01-18 2:30:35
hidden: true
slug: yiouj4epwxk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在vue里，组件之间的作用域是独立的，父组件跟子组件之间的通讯可以通过prop属性来传参，但是在兄弟组件之间通讯就比较麻烦了。比如A组件要告诉一件事给B组件，那么A就要先告诉他们的爸组件，然后爸组件再告诉B。当组件比较多，要互相通讯的事情很多的话，爸组件要管他们那么多事，很累的。vuex正是为了解决这个问题，让多个子组件之间可以方便的通讯。</p>
<h2 id="articleHeader1">项目介绍</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008688542?w=319&amp;h=536" src="https://static.alili.tech/img/remote/1460000008688542?w=319&amp;h=536" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>待办事项中的一个事件，它可能拥有几个状态，未完成、已完成、已取消或被删除等。这个事件需要在这多种状态之间切换，那么使用vuex来管理也是非常方便的。</p>
<p>来看一下vuex怎么完成状态管理的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008688543?w=597&amp;h=449" src="https://static.alili.tech/img/remote/1460000008688543?w=597&amp;h=449" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>所有组件都是调用actions，分发mutation去修改state，然后state经过getter又更新到各个组件里。state又通过localStorage存储数据到本地，下次重新打开时再读取保存的数据。</p>
<h2 id="articleHeader2">模块化</h2>
<p>为什么要用模块化？当我们的项目比较大，组件很多，功能也多，会导致state里要存放很多内容，整个 store 都会很庞大，很难管理。</p>
<p>我模块化的store目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-store/                   // 存放vuex代码
|   |-eventModule          // 事件模块
|   |   |-actions.js
|   |   |-getters.js
|   |   |-index.js
|   |   |-mutations.js
|   |   |-state.js
|   |-themeModule           // 主题颜色模块
|   |   |-actions.js
|   |   |-getters.js
|   |   |-index.js
|   |   |-mutations.js
|   |   |-state.js
|   |-index.js              // vuex的核心，创建一个store
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">-store/                   // 存放vuex代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-eventModule          // 事件模块
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-actions.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-getters.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-index.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-mutations.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-state.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-themeModule           // 主题颜色模块
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-actions.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-getters.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-index.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-mutations.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-state.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-index.js              // vuex的核心，创建一个store
</span></code></pre>
<p>可以看到，每个模块拥有自己的state、mutation、action、getter，这样子我们就可以把我们的项目根据功能划分为多个模块去使用vuex了，而且后期维护也不会一脸懵逼。</p>
<h2 id="articleHeader3">状态管理</h2>
<p>接下来，我们来看看vuex完成状态管理的一个流程。<br>举个栗子：一个待办事项，勾选之后，会在未完成列表里移除，并在已完成的列表里出现。这个过程，是这个待办事项的状态发生了改变。勾选的时候，是执行了一个方法，那我们就先写这个方法。在 event_list.vue 文件里新建一个moveToDone方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    moveToDone(id){ //移至已完成
        this.$store.dispatch('eventdone', id);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods: {
    moveToDone(id){ <span class="hljs-comment">//移至已完成</span>
        <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'eventdone'</span>, id);
    }
}</code></pre>
<p>在 moveToDone 方法中通过 store.dispatch 方法触发 action, 接下来我们在 eventModule/actions.js 中来注册这个 action, 接受一个 id 的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    eventdone = ({ commit }, param) =>{
        commit('EVENTDONE',{id: param});
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    eventdone = <span class="hljs-function">(<span class="hljs-params">{ commit }, param</span>) =&gt;</span>{
        commit(<span class="hljs-string">'EVENTDONE'</span>,{<span class="hljs-attr">id</span>: param});
    }
}</code></pre>
<p>action 通过调用 store.commit 提交载荷(也就是{id: param}这个对象)到名为'EVENTDONE'的 mutation，那我们再来注册这个 mutation</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    EVENTDONE(states,obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 2;
                states.event[i].time = getDate();
                var item = states.event[i];
                states.event.splice(i, 1);          // 把该事件在数组中删除
                break;
            }
        }
        states.event.unshift(item);                 // 把该事件存到数组的第一个元素
        local.set(states);                          // 将整个状态存到本地
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    EVENTDONE(states,obj){
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; states.event.length; i++) {
            <span class="hljs-keyword">if</span> (states.event[i].id === obj.id) {
                states.event[i].type = <span class="hljs-number">2</span>;
                states.event[i].time = getDate();
                <span class="hljs-keyword">var</span> item = states.event[i];
                states.event.splice(i, <span class="hljs-number">1</span>);          <span class="hljs-comment">// 把该事件在数组中删除</span>
                <span class="hljs-keyword">break</span>;
            }
        }
        states.event.unshift(item);                 <span class="hljs-comment">// 把该事件存到数组的第一个元素</span>
        local.set(states);                          <span class="hljs-comment">// 将整个状态存到本地</span>
    }
}</code></pre>
<p>通过 mutation 去修改 state, state里我们存放了一个 event 属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    event: []
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">event</span>: []
};</code></pre>
<p>在组件中要获得这个 state 里的 event, 那就需要写个getters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    getDone(states){
        return states.event.filter(function (d) {
            if (d.type === 2) {                 // type == 2表示已完成
                return d;                       // 返回已完成的事件
            }
        });
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    getDone(states){
        <span class="hljs-keyword">return</span> states.event.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">d</span>) </span>{
            <span class="hljs-keyword">if</span> (d.type === <span class="hljs-number">2</span>) {                 <span class="hljs-comment">// type == 2表示已完成</span>
                <span class="hljs-keyword">return</span> d;                       <span class="hljs-comment">// 返回已完成的事件</span>
            }
        });
    }
};</code></pre>
<p>然后每个module里都有一个index.js文件，把自己的state、mutation、action、getters都集合起来，就是一个module</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as func from '../function';
import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import getters from './getters.js';

export default {
    state,
    getters,
    actions,
    mutations
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> func <span class="hljs-keyword">from</span> <span class="hljs-string">'../function'</span>;
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions.js'</span>;
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations.js'</span>;
<span class="hljs-keyword">import</span> state <span class="hljs-keyword">from</span> <span class="hljs-string">'./state.js'</span>;
<span class="hljs-keyword">import</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters.js'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    state,
    getters,
    actions,
    mutations
}</code></pre>
<p>在 store/index.js 里创建一个 store 对象来存放这个module</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Vuex from 'vuex';
import event from './eventModule';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        event
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> event <span class="hljs-keyword">from</span> <span class="hljs-string">'./eventModule'</span>;
Vue.use(Vuex);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">modules</span>: {
        event
    }
});</code></pre>
<p>最后在 event_list.vue 组件上，我们通过计算属性 computed 来获取到这个从未完成的状态改变到已完成的状态，我们要用到 store 这个对象里的getters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    getDone(){
        return this.$store.getters.getDone;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
    getDone(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.getDone;
    }
}</code></pre>
<p>这样子，完成了 '未完成' =&gt; '已完成' 从提交修改到更新视图读取的整个流程，也是 vuex 工作的整个流程。通过 module 的封装，更加方便多模块项目的开发和维护。</p>
<h4>演示地址 : <a href="http://blog.gdfengshuo.com/example/notepad/" rel="nofollow noreferrer" target="_blank">demo</a>
</h4>
<h4>源码地址 : <a href="https://github.com/lin-xin/notepad/" rel="nofollow noreferrer" target="_blank">notepad</a>
</h4>
<h4>更多文章 : <a href="https://github.com/lin-xin/blog/" rel="nofollow noreferrer" target="_blank">blog</a>
</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex 模块化实现待办事项的状态管理

## 原文链接
[https://segmentfault.com/a/1190000008688539](https://segmentfault.com/a/1190000008688539)

