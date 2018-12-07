---
title: 'Vue.js最佳实践（五招让你成为Vue.js大师）' 
date: 2018-12-08 2:30:30
hidden: true
slug: y20wom1k1ys
categories: [reprint]
---

{{< raw >}}

                    
<p><em>本文面向对象是有一定Vue.js编程经验的开发者。如果有人需要Vue.js入门系列的文章可以在评论区告诉我，有空就给你们写。</em></p>
<p>对大部分人来说，掌握Vue.js基本的几个API后就已经能够正常地开发前端网站。但如果你想更加高效地使用Vue来开发，成为Vue.js大师，那下面我要传授的这五招你一定得认真学习一下了。</p>
<h2 id="articleHeader0">第一招：化繁为简的Watchers</h2>
<p><em>场景还原：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created(){
    this.fetchPostList()
},
watch: {
    searchInputValue(){
        this.fetchPostList()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>created(){
    <span class="hljs-keyword">this</span>.fetchPostList()
},
watch: {
    searchInputValue(){
        <span class="hljs-keyword">this</span>.fetchPostList()
    }
}</code></pre>
<p>组件创建的时候我们获取一次列表，同时监听input框，每当发生变化的时候重新获取一次筛选后的列表这个场景很常见，有没有办法优化一下呢？</p>
<p><em>招式解析：</em><br>首先，在watchers中，可以直接使用函数的字面量名称；其次，声明immediate:true表示创建组件时立马执行一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
    searchInputValue:{
        handler: 'fetchPostList',
        immediate: true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">watch:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    searchInputValue:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        handler:</span> <span class="hljs-string">'fetchPostList'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        immediate:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<h2 id="articleHeader1">第二招：一劳永逸的组件注册</h2>
<p><em>场景还原：</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import BaseButton from './baseButton'
import BaseIcon from './baseIcon'
import BaseInput from './baseInput'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> BaseButton <span class="hljs-keyword">from</span> <span class="hljs-string">'./baseButton'</span>
<span class="hljs-keyword">import</span> BaseIcon <span class="hljs-keyword">from</span> <span class="hljs-string">'./baseIcon'</span>
<span class="hljs-keyword">import</span> BaseInput <span class="hljs-keyword">from</span> <span class="hljs-string">'./baseInput'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<BaseInput
  v-model=&quot;searchText&quot;
  @keydown.enter=&quot;search&quot;
/>
<BaseButton @click=&quot;search&quot;>
  <BaseIcon name=&quot;search&quot;/>
</BaseButton>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">BaseInput</span>
  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchText"</span>
  @<span class="hljs-attr">keydown.enter</span>=<span class="hljs-string">"search"</span>
/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">BaseButton</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"search"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">BaseIcon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"search"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">BaseButton</span>&gt;</span></code></pre>
<p>我们写了一堆基础UI组件，然后每次我们需要使用这些组件的时候，都得先import，然后声明components，很繁琐！秉持能偷懒就偷懒的原则，我们要想办法优化！</p>
<p><em>招式解析：</em><br>我们需要借助一下神器webpack，使用 <code>require.context()</code> 方法来创建自己的（模块）上下文，从而实现自动动态require组件。这个方法需要3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。</p>
<p>我们在components文件夹添加一个叫global.js的文件，在这个文件里借助webpack动态将需要的基础组件统统打包进来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
  '.', false, /\.vue$/
   //找到components文件夹下以.vue命名的文件
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">capitalizeFirstLetter</span>(<span class="hljs-params"><span class="hljs-built_in">string</span></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">string</span>.charAt(<span class="hljs-number">0</span>).toUpperCase() + <span class="hljs-built_in">string</span>.slice(<span class="hljs-number">1</span>)
}

<span class="hljs-keyword">const</span> requireComponent = <span class="hljs-built_in">require</span>.context(
  <span class="hljs-string">'.'</span>, <span class="hljs-literal">false</span>, <span class="hljs-regexp">/\.vue$/</span>
   <span class="hljs-comment">//找到components文件夹下以.vue命名的文件</span>
)

requireComponent.keys().forEach(<span class="hljs-function"><span class="hljs-params">fileName</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> componentConfig = requireComponent(fileName)

  <span class="hljs-keyword">const</span> componentName = capitalizeFirstLetter(
    fileName.replace(<span class="hljs-regexp">/^\.\//</span>, <span class="hljs-string">''</span>).replace(<span class="hljs-regexp">/\.\w+$/</span>, <span class="hljs-string">''</span>)
    <span class="hljs-comment">//因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名</span>
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
</code></pre>
<p>最后我们在main.js中<code>import 'components/global.js'</code>，然后我们就可以随时随地使用这些基础组件，无需手动引入了。</p>
<h2 id="articleHeader2">第三招：釜底抽薪的router key</h2>
<p><em>场景还原：</em><br>下面这个场景真的是伤透了很多程序员的心...先默认大家用的是Vue-router来实现路由的控制。<br>假设我们在写一个博客网站，需求是从/post-page/a，跳转到/post-page/b。然后我们惊人的发现，页面跳转后数据竟然没更新？！原因是vue-router"智能地"发现这是同一个组件，然后它就决定要复用这个组件，所以你在created函数里写的方法压根就没执行。通常的解决方案是监听<code>$route</code>的变化来初始化数据，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    loading: false,
    error: null,
    post: null
  }
}, 
watch: {
  '$route': {
    handler: 'resetData',
    immediate: true
  }
},
methods: {
  resetData() {
    this.loading = false
    this.error = null
    this.post = null
    this.getPost(this.$route.params.id)
  },
  getPost(id){

  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>() {
  <span class="hljs-keyword">return</span> {
    loading: <span class="hljs-literal">false</span>,
    error: <span class="hljs-literal">null</span>,
    post: <span class="hljs-literal">null</span>
  }
}, 
watch: {
  <span class="hljs-string">'$route'</span>: {
    handler: <span class="hljs-string">'resetData'</span>,
    immediate: <span class="hljs-literal">true</span>
  }
},
methods: {
  resetData() {
    <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.error = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">this</span>.post = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">this</span>.getPost(<span class="hljs-keyword">this</span>.$route.params.id)
  },
  getPost(id){

  }
}</code></pre>
<p>bug是解决了，可每次这么写也太不优雅了吧？秉持着能偷懒则偷懒的原则，我们希望代码这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
created () {
  this.getPost(this.$route.params.id)
},
methods () {
  getPost(postId) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>() {
  <span class="hljs-keyword">return</span> {
    loading: <span class="hljs-literal">false</span>,
    error: <span class="hljs-literal">null</span>,
    post: <span class="hljs-literal">null</span>
  }
},
created () {
  <span class="hljs-keyword">this</span>.getPost(<span class="hljs-keyword">this</span>.$route.params.id)
},
methods () {
  getPost(postId) {
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p><em>招式解析:</em></p>
<p>那要怎么样才能实现这样的效果呢，答案是给router-view添加一个unique的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件。（虽然损失了一丢丢性能，但避免了无限的bug）。同时，注意我将key直接设置为路由的完整路径，一举两得。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-view :key=&quot;$route.fullpath&quot;></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-view <span class="hljs-symbol">:key=<span class="hljs-string">"$route.fullpath"</span>&gt;&lt;/router-view&gt;</span></code></pre>
<h2 id="articleHeader3">第四招: 无所不能的render函数</h2>
<p><em>场景还原:</em><br>vue要求每一个组件都只能有一个根元素，当你有多个根元素时，vue就会给你报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <li
    v-for=&quot;route in routes&quot;
    :key=&quot;route.name&quot;
  >
    <router-link :to=&quot;route&quot;>
      "{{" route.title "}}"
    </router-link>
  </li>
</template>


 ERROR - Component template should contain exactly one root element. 
    If you are using v-if on multiple elements, use v-else-if 
    to chain them instead." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;template&gt;
  &lt;<span class="hljs-keyword">li</span>
    v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"route in routes"</span>
    :key=<span class="hljs-string">"route.name"</span>
  &gt;
    &lt;router-link :to=<span class="hljs-string">"route"</span>&gt;
      "{{" route.title "}}"
    &lt;/router-link&gt;
  &lt;/<span class="hljs-keyword">li</span>&gt;
&lt;/template&gt;


 <span class="hljs-keyword">ERROR</span> - Component template should contain exactly <span class="hljs-keyword">one</span> root element. 
    <span class="hljs-keyword">If</span> you are using v-<span class="hljs-keyword">if</span> <span class="hljs-keyword">on</span> multiple elements, <span class="hljs-keyword">use</span> v-<span class="hljs-keyword">else</span>-<span class="hljs-keyword">if</span> 
    to chain them instead.</code></pre>
<p><em>招式解析:</em><br>那有没有办法化解呢，答案是有的，只不过这时候我们需要使用render()函数来创建HTML，而不是template。其实用js来生成html的好处就是极度的灵活功能强大，而且你不需要去学习使用vue的那些功能有限的指令API，比如v-for, v-if。（reactjs就完全丢弃了template）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="functional: true,
render(h, { props }) {
  return props.routes.map(route =>
    <li key={route.name}>
      <router-link to={route}>
        {route.title}
      </router-link>
    </li>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>functional: <span class="hljs-literal">true</span>,
render(h, { props }) {
  <span class="hljs-keyword">return</span> props.routes.map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span>
    &lt;li key={route.name}&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">{route}</span>&gt;</span>
        {route.title}
      <span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
  )
}</code></pre>
<h2 id="articleHeader4">第五招：无招胜有招的高阶组件</h2>
<p><strong>划重点：这一招威力无穷，请务必掌握</strong><br>当我们写组件的时候，通常我们都需要从父组件传递一系列的props到子组件，同时父组件监听子组件emit过来的一系列事件。举例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父组件
<BaseInput 
    :value=&quot;value&quot;
    label=&quot;密码&quot; 
    placeholder=&quot;请填写密码&quot;
    @input=&quot;handleInput&quot;
    @focus=&quot;handleFocus>
</BaseInput>

//子组件
<template>
  <label>
    "{{" label "}}"
    <input
      :value=&quot;value&quot;
      :placeholder=&quot;placeholder&quot;
      @focus=$emit('focus', $event)&quot;
      @input=&quot;$emit('input', $event.target.value)&quot;
    >
  </label>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//父组件</span>
&lt;BaseInput 
    :value=<span class="hljs-string">"value"</span>
    <span class="hljs-keyword">label</span>=<span class="hljs-string">"密码"</span> 
    placeholder=<span class="hljs-string">"请填写密码"</span>
    @<span class="hljs-keyword">input</span>=<span class="hljs-string">"handleInput"</span>
    @focus="handleFocus&gt;
&lt;/BaseInput&gt;

<span class="hljs-comment">//子组件</span>
&lt;template&gt;
  &lt;<span class="hljs-keyword">label</span>&gt;
    "{{" <span class="hljs-keyword">label</span> "}}"
    &lt;<span class="hljs-keyword">input</span>
      :value=<span class="hljs-string">"value"</span>
      :placeholder=<span class="hljs-string">"placeholder"</span>
      @focus=<span class="hljs-variable">$emit</span>('focus', <span class="hljs-variable">$event</span>)"
      @<span class="hljs-keyword">input</span>=<span class="hljs-string">"$emit('input', $event.target.value)"</span>
    &gt;
  &lt;/<span class="hljs-keyword">label</span>&gt;
&lt;/template&gt;</code></pre>
<p>有下面几个优化点：</p>
<p>1.每一个从父组件传到子组件的props,我们都得在子组件的Props中显式的声明才能使用。这样一来，我们的子组件每次都需要申明一大堆props, 而类似placeholer这种dom原生的property我们其实完全可以直接从父传到子，无需声明。方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <input
      :value=&quot;value&quot;
      v-bind=&quot;$attrs&quot;
      @input=&quot;$emit('input', $event.target.value)&quot;
    >
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>    &lt;input
      :value=<span class="hljs-string">"value"</span>
      v-<span class="hljs-keyword">bind</span>=<span class="hljs-string">"$attrs"</span>
      @input=<span class="hljs-string">"$emit('input', $event.target.value)"</span>
    &gt;
   </code></pre>
<p><code>$attrs</code>包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。</p>
<p>2.注意到子组件的<code>@focus=$emit('focus', $event)"</code>其实什么都没做，只是把event传回给父组件而已，那其实和上面类似，我完全没必要显式地申明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input
    :value=&quot;value&quot;
    v-bind=&quot;$attrs&quot;
    v-on=&quot;listeners&quot;
>

computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: event => 
        this.$emit('input', event.target.value)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span>
    :value=<span class="hljs-string">"value"</span>
    v-bind=<span class="hljs-string">"$attrs"</span>
    v-on=<span class="hljs-string">"listeners"</span>
&gt;

computed: {
  listeners() {
    return {
      ..<span class="hljs-selector-class">.this</span>.<span class="hljs-variable">$listeners</span>,
      <span class="hljs-selector-tag">input</span>: event =&gt; 
        this.<span class="hljs-variable">$emit</span>(<span class="hljs-string">'input'</span>, event<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.value</span>)
    }
  }
}</code></pre>
<p><code>$listeners</code>包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。</p>
<p>3.需要注意的是，由于我们input并不是BaseInput这个组件的根节点，而默认情况下父作用域的不被认作 props 的特性绑定将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。所以我们需要设置<code>inheritAttrs:false</code>，这些默认行为将会被去掉, 以上两点的优化才能成功。</p>
<hr>
<h2 id="articleHeader5">结尾</h2>
<p>掌握了以上五招，你就能在Vue.js的海洋中自由驰骋了，去吧少年。<br>陆续可能还会更新一些别的招数，敬请期待。</p>
<p>如果你对VueJs或者ReactJs的虚拟DOM是如何实现的感兴趣，可以去看我的这个系列文章：<br><a href="https://segmentfault.com/a/1190000014572815">【React进阶系列】从零开始手把手教你实现一个Virtual DOM（一）</a><br><a href="https://segmentfault.com/a/1190000014603332" target="_blank">【React进阶系列】从零开始手把手教你实现一个Virtual DOM（二）</a><br><a href="https://segmentfault.com/a/1190000014641724">【React进阶系列】从零开始手把手教你实现一个Virtual DOM（二）</a></p>
<p>标题虽然是React进阶，但事实上Vuejs从2.0开始也使用了虚拟DOM，虽然你仍然可以使用Vuejs的模板template写代码，但本质上template最后也会complile成虚拟DOM。（官方文档<a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer" target="_blank">Vuejs 渲染函数 &amp; JSX</a>）。</p>
<p><strong><em>广告时间：阿里巴巴电商板块增速最快的新业务之一内推招人，请大家多多推荐或自荐，内部推荐优先面试，技术面试一周内出结果。可以私信我了解详情，或者直接把简历发到我邮箱：zeqiang.wang@alibaba-inc.com </em></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js最佳实践（五招让你成为Vue.js大师）

## 原文链接
[https://segmentfault.com/a/1190000014085613](https://segmentfault.com/a/1190000014085613)

