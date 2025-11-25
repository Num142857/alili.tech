---
title: 'Vuex 基础总结' 
date: 2018-12-11 2:30:10
hidden: true
slug: tvxdu8j9wpp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vuex基础总结</h2>
<p><strong>1、Vuex:数据共享</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">Vuex 是一个专为 Vue<span class="hljs-selector-class">.js</span> 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</code></pre>
<p><strong>2、Vuex介绍:</strong><br>（1）、什么时候使用Vuex:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。
如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 global event bus 就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。
如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 <span class="hljs-meta">global</span> event <span class="hljs-keyword">bus </span>就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。</code></pre>
<p>(2)、Vuex状态管理：</p>
<p><span class="img-wrap"><img data-src="/img/bV4Y8N?w=1344&amp;h=996" src="https://static.alili.tech/img/bV4Y8N?w=1344&amp;h=996" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="view ——> (dispatch) Action ——>(commit)Mutations ——> (Mutate)State ——> view" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">view</span> ——&gt; (dispatch) <span class="hljs-selector-tag">Action</span> ——&gt;(commit)<span class="hljs-selector-tag">Mutations</span> ——&gt; (Mutate)<span class="hljs-selector-tag">State</span> ——&gt; <span class="hljs-selector-tag">view</span></code></pre>
<blockquote>
<strong>注意：</strong><br>Action不是必须的，如果有异步操作才能使用到Action，否则可以不使用。</blockquote>
<p><strong>2、Vuex之mutations</strong></p>
<p>(1)、安装Vuex:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install vuex --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>(2)、在'src/'路径下创建文件:'store/index.js',其中index.js配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({
  //设置状态对象
  state:{
    count:10
  },
  //设置mutations,包含行为事件
  mutations:{
    increment(state){
      state.count++;
    },
    decrement(state){
      state.count--;
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Vue <span class="hljs-keyword">from</span> 'vue'
import Vuex <span class="hljs-keyword">from</span> 'vuex'

Vue.use(Vuex)

export <span class="hljs-keyword">default</span>  new Vuex.Store({
  //设置状态对象
  <span class="hljs-keyword">state</span>:{
    count:<span class="hljs-number">10</span>
  },
  //设置mutations,包含行为事件
  mutations:{
    increment(<span class="hljs-keyword">state</span>){
      <span class="hljs-keyword">state</span>.count++;
    },
    decrement(<span class="hljs-keyword">state</span>){
      <span class="hljs-keyword">state</span>.count--;
    }
  }
})</code></pre>
<p>(3)、创建两个相互独立的组件：inner.vue,outer.vue:</p>
<p>//<strong>inner.vue组件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    内部值："{{"getCount"}}"
    <button @click=&quot;add&quot;>加法运算</button>
  </div>
</template>
<script>
export default {
  name: 'inner',
  computed:{
    getCount(){
      //通过this.$store.state获取状态对象
      return this.$store.state.count;
    }
  },
  methods:{
    add(state){
      //通过this.$store.commit方法触发状态变更
      this.$store.commit(&quot;increment&quot;)
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-variable">&lt;template&gt;</span>
  <span class="hljs-variable">&lt;div&gt;</span>
    内部值："{{"getCount"}}"
    <span class="hljs-variable">&lt;button @click="add"&gt;</span>加法运算&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;
<span class="hljs-variable">&lt;script&gt;</span>
export <span class="hljs-keyword">default</span> {
  name: 'inner',
  computed:{
    getCount(){
      //通过this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>获取状态对象
      return this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.count;
    }
  },
  methods:{
    add(<span class="hljs-keyword">state</span>){
      //通过this.<span class="hljs-variable">$store</span>.commit方法触发状态变更
      this.<span class="hljs-variable">$store</span>.commit(<span class="hljs-string">"increment"</span>)
    }
  }
}
&lt;/script&gt;
</code></pre>
<p>//<strong>outer.vue组件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
      外部值："{{"getCount"}}"
      <button @click=&quot;sub&quot;>减法</button>
    </div>
</template>
<script>
  export default {
    name: &quot;outer&quot;,
    computed:{
      getCount(){
        return this.$store.state.count;
      }
    },
    methods:{
      sub(){
        this.$store.commit(&quot;decrement&quot;)
      }
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      外部值：</span><span class="hljs-template-variable">"{{"getCount"}}"</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"sub"</span>&gt;</span>减法<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"outer"</span>,
    <span class="hljs-attr">computed</span>:{
      getCount(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.count;
      }
    },
    <span class="hljs-attr">methods</span>:{
      sub(){
        <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">"decrement"</span>)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<blockquote>注意：虽然inner.vue和outer.vue是相互独立的，但是他们通过Vuex可以访问到相同的数据，达到了数据共享。</blockquote>
<p>结果如图所示：点击'加法运算'或者'减法'，inner.vue和outer.vue的值是同步变化的。</p>
<p><span class="img-wrap"><img data-src="/img/bV42ky?w=207&amp;h=90" src="https://static.alili.tech/img/bV42ky?w=207&amp;h=90" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3、Vuex之actions</strong></p>
<p>(1)、在store/index.js设置actions：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import Vuex from &quot;vuex&quot;;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    incrementAction(context) {
      context.commit(&quot;increment&quot;);
    },
    decrementAction(context) {
      context.commit(&quot;decrement&quot;);
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
import Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">"vuex"</span>;

Vue.use(Vuex);

export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    count: <span class="hljs-number">10</span>
  },
  mutations: {
    increment(<span class="hljs-keyword">state</span>) {
      <span class="hljs-keyword">state</span>.count++;
    },
    decrement(<span class="hljs-keyword">state</span>) {
      <span class="hljs-keyword">state</span>.count--;
    }
  },
  actions: {
    incrementAction(context) {
      context.commit(<span class="hljs-string">"increment"</span>);
    },
    decrementAction(context) {
      context.commit(<span class="hljs-string">"decrement"</span>);
    }
  }
});</code></pre>
<p>（2）、更改inner.vue 和 outer.vue 的方法</p>
<p>//<strong>outer.vue组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    外部值："{{"getCount"}}"
    <button @click=&quot;sub&quot;>减法</button>
  </div>
</template>
<script>
export default {
  name: &quot;outer&quot;,
  computed: {
    getCount() {
      return this.$store.state.count;
    }
  },
  methods: {
    sub() {
     //这里的触发方法需要使用dispatch触发actions定义的方法。
     this.$store.dispatch(&quot;decrementAction&quot;);
    }
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    外部值：</span><span class="hljs-template-variable">"{{"getCount"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"sub"</span>&gt;</span>减法<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"outer"</span>,
  <span class="hljs-attr">computed</span>: {
    getCount() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.count;
    }
  },
  <span class="hljs-attr">methods</span>: {
    sub() {
     <span class="hljs-comment">//这里的触发方法需要使用dispatch触发actions定义的方法。</span>
     <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">"decrementAction"</span>);
    }
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>//<strong>inner.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <template>
  <div>
    内部值："{{"getCount"}}"
    <button @click=&quot;add&quot;>加法运算</button>
  </div>
</template>
<script>
export default {
  name: &quot;inner&quot;,
  computed: {
    getCount() {
      return this.$store.state.count;
    }
  },
  methods: {
    add(state) {
     //这里使用dispatch触发actions中定义的方法
     this.$store.dispatch(&quot;incrementAction&quot;);
    }
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    内部值：</span><span class="hljs-template-variable">"{{"getCount"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add"</span>&gt;</span>加法运算<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"inner"</span>,
  <span class="hljs-attr">computed</span>: {
    getCount() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.count;
    }
  },
  <span class="hljs-attr">methods</span>: {
    add(state) {
     <span class="hljs-comment">//这里使用dispatch触发actions中定义的方法</span>
     <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">"incrementAction"</span>);
    }
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<blockquote>
<strong>注意：</strong><br>   Actions与mutation不同：<br>   ① Action 提交的是mutation，而不是直接变更状态。<br>   ② mutation不能操作异步行为,它只能改变本地数据；而 Action可以包含任意异步操作,比如进行网络请求数据操作。</blockquote>
<p><strong>4、Vuex之getter</strong></p>
<blockquote>注意：针对上面的数值，可以一直减到它变为负数，在有些情况下，数值要求不能为复制，这时候就需要用getter属性了。</blockquote>
<p>(1)、在store/index.js中设置getter:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &quot;vue&quot;;
import Vuex from &quot;vuex&quot;;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    incrementAction(context) {
      context.commit(&quot;increment&quot;);
    },
    decrementAction(context) {
      context.commit(&quot;decrement&quot;);
    }
  },
  getters: {
    getState(state) {
      return state.count > 0 ? state.count : 0;
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Vue <span class="hljs-keyword">from</span> <span class="hljs-string">"vue"</span>;
import Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">"vuex"</span>;

Vue.use(Vuex);

export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    count: <span class="hljs-number">10</span>
  },
  mutations: {
    increment(<span class="hljs-keyword">state</span>) {
      <span class="hljs-keyword">state</span>.count++;
    },
    decrement(<span class="hljs-keyword">state</span>) {
      <span class="hljs-keyword">state</span>.count--;
    }
  },
  actions: {
    incrementAction(context) {
      context.commit(<span class="hljs-string">"increment"</span>);
    },
    decrementAction(context) {
      context.commit(<span class="hljs-string">"decrement"</span>);
    }
  },
  getters: {
    getState(<span class="hljs-keyword">state</span>) {
      return <span class="hljs-keyword">state</span>.count &gt; <span class="hljs-number">0</span> ? <span class="hljs-keyword">state</span>.count : <span class="hljs-number">0</span>;
    }
  }
});</code></pre>
<p>(2)、inner.vue和outer.vue中获取值的方法做调整</p>
<p>//<strong>inner.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    内部值："{{"getCount"}}"
    <button @click=&quot;add&quot;>加法运算</button>
  </div>
</template>
<script>
export default {
  name: &quot;inner&quot;,
  computed: {
    getCount() {
      //这里通过this.$store.getters中定义的方法getState获取值
      return this.$store.getters.getState;
    }
  },
  methods: {
    add(state) {
      this.$store.dispatch(&quot;incrementAction&quot;);
    }
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    内部值：</span><span class="hljs-template-variable">"{{"getCount"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add"</span>&gt;</span>加法运算<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"inner"</span>,
  <span class="hljs-attr">computed</span>: {
    getCount() {
      <span class="hljs-comment">//这里通过this.$store.getters中定义的方法getState获取值</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.getState;
    }
  },
  <span class="hljs-attr">methods</span>: {
    add(state) {
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">"incrementAction"</span>);
    }
  }
};</span></span></code></pre>
<blockquote>同理，outer.vue中也是同样的更改方式。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex 基础总结

## 原文链接
[https://segmentfault.com/a/1190000013549251](https://segmentfault.com/a/1190000013549251)

