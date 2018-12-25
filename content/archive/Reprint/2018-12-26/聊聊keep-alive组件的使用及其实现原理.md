---
title: '聊聊keep-alive组件的使用及其实现原理' 
date: 2018-12-26 2:30:14
hidden: true
slug: rjmpbrliy6c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>因为对Vue.js很感兴趣，而且平时工作的技术栈也是Vue.js，这几个月花了些时间研究学习了一下Vue.js源码，并做了总结与输出。</p>
<p>文章的原地址：<a href="https://github.com/answershuto/learnVue" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue</a>。</p>
<p>在学习过程中，为Vue加上了中文的注释<a href="https://github.com/answershuto/learnVue/tree/master/vue-src" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue/tree/master/vue-src</a>以及Vuex的注释<a href="https://github.com/answershuto/learnVue/tree/master/vuex-src" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto/learnVue/tree/master/vuex-src</a>，希望可以对其他想学习源码的小伙伴有所帮助。</p>
<p>可能会有理解存在偏差的地方，欢迎提issue指出，共同学习，共同进步。</p>
<h2 id="articleHeader1">keep-alive</h2>
<p>keep-alive是Vue.js的一个内置组件。它能够不活动的组件实例保存在内存中，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中。</p>
<p>它提供了include与exclude两个属性，允许组件有条件地进行缓存。</p>
<p>具体内容可以参考<a href="https://cn.vuejs.org/v2/api/#keep-alive" rel="nofollow noreferrer" target="_blank">官网</a>。</p>
<h2 id="articleHeader2">使用</h2>
<h3 id="articleHeader3">用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
    <component></component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<p>这里的component组件会被缓存起来。</p>
<h3 id="articleHeader4">举个栗子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
    <coma v-if=&quot;test&quot;></coma>
    <comb v-else=&quot;test&quot;></comb>
</keep-alive>
<button @click=&quot;test=handleClick&quot;>请点击</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">coma</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"test"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">coma</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">comb</span> <span class="hljs-attr">v-else</span>=<span class="hljs-string">"test"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comb</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"test=handleClick"</span>&gt;</span>请点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data () {
        return {
            test: true
        }
    },
    methods: {
        handleClick () {
            this.test = !this.test;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">test</span>: <span class="hljs-literal">true</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        handleClick () {
            <span class="hljs-keyword">this</span>.test = !<span class="hljs-keyword">this</span>.test;
        }
    }
}</code></pre>
<p>在点击button时候，coma与comb两个组件会发生切换，但是这时候这两个组件的状态会被缓存起来，比如说coma与comb组件中都有一个input标签，那么input标签中的内容不会因为组件的切换而消失。</p>
<h3 id="articleHeader5">props</h3>
<p>keep-alive组件提供了include与exclude两个属性来允许组件有条件地进行缓存，二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive include=&quot;a&quot;>
  <component></component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">"a"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<p>将缓存name为a的组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive exclude=&quot;a&quot;>
  <component></component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">exclude</span>=<span class="hljs-string">"a"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<p>name为a的组件将不会被缓存。</p>
<h3 id="articleHeader6">生命钩子</h3>
<p>keep-alive提供了两个生命钩子，分别是activated与deactivated。</p>
<p>因为keep-alive会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的created等方法，需要用activated与deactivated这两个生命钩子来得知当前组件是否处于活动状态。</p>
<hr>
<h2 id="articleHeader7">深入keep-alive组件实现</h2>
<p>说完了keep-alive组件的使用，我们从源码角度看一下keep-alive组件究竟是如何实现组件的缓存的呢？</p>
<h3 id="articleHeader8">created与destroyed钩子</h3>
<p>created钩子会创建一个cache对象，用来作为缓存容器，保存vnode节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created () {
    /* 缓存对象 */
    this.cache = Object.create(null)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">created () {
    <span class="hljs-comment">/* 缓存对象 */</span>
    <span class="hljs-keyword">this</span>.cache = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
},</code></pre>
<p>destroyed钩子则在组件被销毁的时候清除cache缓存中的所有组件实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* destroyed钩子中销毁所有cache中的组件实例 */
destroyed () {
    for (const key in this.cache) {
        pruneCacheEntry(this.cache[key])
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* destroyed钩子中销毁所有cache中的组件实例 */</span>
destroyed () {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.cache) {
        pruneCacheEntry(<span class="hljs-keyword">this</span>.cache[key])
    }
},</code></pre>
<h3 id="articleHeader9">render</h3>
<p>接下来是render函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
    /* 得到slot插槽中的第一个组件 */
    const vnode: VNode = getFirstComponentChild(this.$slots.default)

    const componentOptions: ?VNodeComponentOptions = vnode &amp;&amp; vnode.componentOptions
    if (componentOptions) {
        // check pattern
        /* 获取组件名称，优先获取组件的name字段，否则是组件的tag */
        const name: ?string = getComponentName(componentOptions)
        /* name不在inlcude中或者在exlude中则直接返回vnode（没有取缓存） */
        if (name &amp;&amp; (
        (this.include &amp;&amp; !matches(this.include, name)) ||
        (this.exclude &amp;&amp; matches(this.exclude, name))
        )) {
            return vnode
        }
        const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
        /* 如果已经做过缓存了则直接从缓存中获取组件实例给vnode，还未缓存过则进行缓存 */
        if (this.cache[key]) {
            vnode.componentInstance = this.cache[key].componentInstance
        } else {
            this.cache[key] = vnode
        }
        /* keepAlive标记位 */
        vnode.data.keepAlive = true
    }
    return vnode
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render () {
    <span class="hljs-comment">/* 得到slot插槽中的第一个组件 */</span>
    <span class="hljs-keyword">const</span> vnode: VNode = getFirstComponentChild(<span class="hljs-keyword">this</span>.$slots.default)

    <span class="hljs-keyword">const</span> componentOptions: ?VNodeComponentOptions = vnode &amp;&amp; vnode.componentOptions
    <span class="hljs-keyword">if</span> (componentOptions) {
        <span class="hljs-comment">// check pattern</span>
        <span class="hljs-comment">/* 获取组件名称，优先获取组件的name字段，否则是组件的tag */</span>
        <span class="hljs-keyword">const</span> name: ?string = getComponentName(componentOptions)
        <span class="hljs-comment">/* name不在inlcude中或者在exlude中则直接返回vnode（没有取缓存） */</span>
        <span class="hljs-keyword">if</span> (name &amp;&amp; (
        (<span class="hljs-keyword">this</span>.include &amp;&amp; !matches(<span class="hljs-keyword">this</span>.include, name)) ||
        (<span class="hljs-keyword">this</span>.exclude &amp;&amp; matches(<span class="hljs-keyword">this</span>.exclude, name))
        )) {
            <span class="hljs-keyword">return</span> vnode
        }
        <span class="hljs-keyword">const</span> key: ?string = vnode.key == <span class="hljs-literal">null</span>
        <span class="hljs-comment">// same constructor may get registered as different local components</span>
        <span class="hljs-comment">// so cid alone is not enough (#3269)</span>
        ? componentOptions.Ctor.cid + (componentOptions.tag ? <span class="hljs-string">`::<span class="hljs-subst">${componentOptions.tag}</span>`</span> : <span class="hljs-string">''</span>)
        : vnode.key
        <span class="hljs-comment">/* 如果已经做过缓存了则直接从缓存中获取组件实例给vnode，还未缓存过则进行缓存 */</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.cache[key]) {
            vnode.componentInstance = <span class="hljs-keyword">this</span>.cache[key].componentInstance
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.cache[key] = vnode
        }
        <span class="hljs-comment">/* keepAlive标记位 */</span>
        vnode.data.keepAlive = <span class="hljs-literal">true</span>
    }
    <span class="hljs-keyword">return</span> vnode
}</code></pre>
<p>首先通过getFirstComponentChild获取第一个子组件，获取该组件的name（存在组件名则直接使用组件名，否则会使用tag）。接下来会将这个name通过include与exclude属性进行匹配，匹配不成功（说明不需要进行缓存）则不进行任何操作直接返回vnode，vnode是一个VNode类型的对象，不了解VNode的同学可以参考笔者的另一篇文章<a href="https://github.com/answershuto/learnVue/blob/master/docs/VNode%E8%8A%82%E7%82%B9.MarkDown" rel="nofollow noreferrer" target="_blank">《VNode节点》</a> .</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 检测name是否匹配 */
function matches (pattern: string | RegExp, name: string): boolean {
  if (typeof pattern === 'string') {
    /* 字符串情况，如a,b,c */
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    /* 正则 */
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 检测name是否匹配 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">matches</span> (<span class="hljs-params">pattern: string | RegExp, name: string</span>): <span class="hljs-title">boolean</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> pattern === <span class="hljs-string">'string'</span>) {
    <span class="hljs-comment">/* 字符串情况，如a,b,c */</span>
    <span class="hljs-keyword">return</span> pattern.split(<span class="hljs-string">','</span>).indexOf(name) &gt; <span class="hljs-number">-1</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isRegExp(pattern)) {
    <span class="hljs-comment">/* 正则 */</span>
    <span class="hljs-keyword">return</span> pattern.test(name)
  }
  <span class="hljs-comment">/* istanbul ignore next */</span>
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}</code></pre>
<p>检测include与exclude属性匹配的函数很简单，include与exclude属性支持字符串如"a,b,c"这样组件名以逗号隔开的情况以及正则表达式。matches通过这两种方式分别检测是否匹配当前组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (this.cache[key]) {
    vnode.componentInstance = this.cache[key].componentInstance
} else {
    this.cache[key] = vnode
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.cache[key]) {
    vnode.componentInstance = <span class="hljs-keyword">this</span>.cache[key].componentInstance
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.cache[key] = vnode
}</code></pre>
<p>接下来的事情很简单，根据key在this.cache中查找，如果存在则说明之前已经缓存过了，直接将缓存的vnode的componentInstance（组件实例）覆盖到目前的vnode上面。否则将vnode存储在cache中。</p>
<p>最后返回vnode（有缓存时该vnode的componentInstance已经被替换成缓存中的了）。</p>
<h3 id="articleHeader10">watch</h3>
<p>用watch来监听pruneCache与pruneCache这两个属性的改变，在改变的时候修改cache缓存中的缓存数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
    /* 监视include以及exclude，在被修改的时候对cache进行修正 */
    include (val: string | RegExp) {
        pruneCache(this.cache, this._vnode, name => matches(val, name))
    },
    exclude (val: string | RegExp) {
        pruneCache(this.cache, this._vnode, name => !matches(val, name))
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watch: {
    <span class="hljs-comment">/* 监视include以及exclude，在被修改的时候对cache进行修正 */</span>
    include (val: string | <span class="hljs-built_in">RegExp</span>) {
        pruneCache(<span class="hljs-keyword">this</span>.cache, <span class="hljs-keyword">this</span>._vnode, name =&gt; matches(val, name))
    },
    exclude (val: string | <span class="hljs-built_in">RegExp</span>) {
        pruneCache(<span class="hljs-keyword">this</span>.cache, <span class="hljs-keyword">this</span>._vnode, name =&gt; !matches(val, name))
    }
},</code></pre>
<p>来看一下pruneCache的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 修正cache */
function pruneCache (cache: VNodeCache, current: VNode, filter: Function) {
  for (const key in cache) {
    /* 取出cache中的vnode */
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      /* name不符合filter条件的，同时不是目前渲染的vnode时，销毁vnode对应的组件实例（Vue实例），并从cache中移除 */
      if (name &amp;&amp; !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode)
        }
        cache[key] = null
      }
    }
  }
} 

/* 销毁vnode对应的组件实例（Vue实例） */
function pruneCacheEntry (vnode: ?VNode) {
  if (vnode) {
    vnode.componentInstance.$destroy()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 修正cache */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pruneCache</span> (<span class="hljs-params">cache: VNodeCache, current: VNode, filter: Function</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> cache) {
    <span class="hljs-comment">/* 取出cache中的vnode */</span>
    <span class="hljs-keyword">const</span> cachedNode: ?VNode = cache[key]
    <span class="hljs-keyword">if</span> (cachedNode) {
      <span class="hljs-keyword">const</span> name: ?string = getComponentName(cachedNode.componentOptions)
      <span class="hljs-comment">/* name不符合filter条件的，同时不是目前渲染的vnode时，销毁vnode对应的组件实例（Vue实例），并从cache中移除 */</span>
      <span class="hljs-keyword">if</span> (name &amp;&amp; !filter(name)) {
        <span class="hljs-keyword">if</span> (cachedNode !== current) {
          pruneCacheEntry(cachedNode)
        }
        cache[key] = <span class="hljs-literal">null</span>
      }
    }
  }
} 

<span class="hljs-comment">/* 销毁vnode对应的组件实例（Vue实例） */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pruneCacheEntry</span> (<span class="hljs-params">vnode: ?VNode</span>) </span>{
  <span class="hljs-keyword">if</span> (vnode) {
    vnode.componentInstance.$destroy()
  }
}</code></pre>
<p>遍历cache中的所有项，如果不符合filter指定的规则的话，则会执行pruneCacheEntry。pruneCacheEntry则会调用组件实例的$destroy方法来将组件销毁。</p>
<h2 id="articleHeader11">最后</h2>
<p>Vue.js内部将DOM节点抽象成了一个个的<a href="https://github.com/answershuto/learnVue/blob/master/docs/VNode%E8%8A%82%E7%82%B9.MarkDown" rel="nofollow noreferrer" target="_blank">VNode节点</a>，keep-alive组件的缓存也是基于VNode节点的而不是直接存储DOM结构。它将满足条件（pruneCache与pruneCache）的组件在cache对象中缓存起来，在需要重新渲染的时候再将vnode节点从cache对象中取出并渲染。</p>
<h2 id="articleHeader12">关于</h2>
<p>作者：染陌 </p>
<p>Email：answershuto@gmail.com  or  answershuto@126.com</p>
<p>Github:  <a href="https://github.com/answershuto" rel="nofollow noreferrer" target="_blank">https://github.com/answershuto</a></p>
<p>知乎：<a href="https://www.zhihu.com/people/cao-yang-49/activities" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/people/cao-yang-49/activities</a></p>
<p>转载请注明出处，谢谢。</p>
<p>欢迎关注我的公众号</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011335965" src="https://static.alili.tech/img/remote/1460000011335965" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊聊keep-alive组件的使用及其实现原理

## 原文链接
[https://segmentfault.com/a/1190000011978825](https://segmentfault.com/a/1190000011978825)

