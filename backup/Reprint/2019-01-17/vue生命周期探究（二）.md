---
title: 'vue生命周期探究（二）' 
date: 2019-01-17 2:30:25
hidden: true
slug: srfd58hlpe
categories: [reprint]
---

{{< raw >}}

                    
<p>上一章我们介绍了vue的组件生命周期和路由勾子，这一章，让我们来看看在vue-cli项目中，各个勾子的顺序是如何的吧。主要聚焦在页面加载的这条时间线。</p>
<h2 id="articleHeader0">页面加载的时候，vue生命周期的触发顺序是怎样的呢？</h2>
<p>那么进入某个路由对应的组件的时候，我们会触发哪些类型的周期呢？</p>
<ol>
<li><p>根实例的加载相关的生命周期（beforeCreate、created、beforeMount、mounted）</p></li>
<li><p>组件实例的加载相关的生命周期(beforeCreate、created、beforeMount、mounted)</p></li>
<li><p>全局路由勾子(router.beforeEach)</p></li>
<li><p>组件路由勾子(beforeRouteEnter)</p></li>
<li><p>组件路由勾子的next里的回调(beforeRouteEnter)</p></li>
<li><p>指令的周期(bind,inserted)</p></li>
<li><p>nextTick方法的回调</p></li>
</ol>
<p>接下来，让我们用vue-cli简单改造后的项目，做一个测试，看看各个声明周期的触发顺序是怎样的</p>
<p>main.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  console.log('路由全局勾子：beforeEach')
  next()
})

router.afterEach((to, from) => {
  console.log('路由全局勾子：afterEach')
})

new Vue({
  beforeCreate () {
    console.log('根组件：beforeCreate')
  },
  created () {
    console.log('根组件：created')
  },
  beforeMount () {
    console.log('根组件：beforeMount')
  },
  mounted () {
    console.log('根组件：mounted')
  }
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, next)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'路由全局勾子：beforeEach'</span>)
  next()
})

router.afterEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>)</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'路由全局勾子：afterEach'</span>)
})

<span class="hljs-keyword">new</span> Vue({
  beforeCreate () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'根组件：beforeCreate'</span>)
  },
  created () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'根组件：created'</span>)
  },
  beforeMount () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'根组件：beforeMount'</span>)
  },
  mounted () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'根组件：mounted'</span>)
  }
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>test.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <h1 v-ooo @click = &quot;$router.push('/')&quot;>test</h1>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log('组件路由勾子：beforeRouteEnter')
    next(vm => {
      console.log('组件路由勾子beforeRouteEnter的next')
    })
  },
  beforeCreate () {
    console.log('组件：beforeCreate')
  },
  created () {
    this.$nextTick(() => {
      console.log('nextTick')
    })
    console.log('组件：created')
  },
  beforeMount () {
    console.log('组件：beforeMount')
  },
  mounted () {
    console.log('组件：mounted')
  },
  directives: {
    ooo: {
      bind (el, binding, vnode) {
        console.log('指令binding')
      },
      inserted (el, binding, vnode) {
        console.log('指令inserted')
      }
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-ooo</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">"$router.push('/')"</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  beforeRouteEnter (to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件路由勾子：beforeRouteEnter'</span>)
    next(<span class="hljs-function"><span class="hljs-params">vm</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件路由勾子beforeRouteEnter的next'</span>)
    })
  },
  beforeCreate () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件：beforeCreate'</span>)
  },
  created () {
    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick'</span>)
    })
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件：created'</span>)
  },
  beforeMount () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件：beforeMount'</span>)
  },
  mounted () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件：mounted'</span>)
  },
  <span class="hljs-attr">directives</span>: {
    <span class="hljs-attr">ooo</span>: {
      bind (el, binding, vnode) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'指令binding'</span>)
      },
      inserted (el, binding, vnode) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'指令inserted'</span>)
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>接下来，直接进入test.vue对应的路由。在控制台，我们看到如下的输出</p>
<p><span class="img-wrap"><img data-src="/img/bVLBpk?w=839&amp;h=346" src="https://static.alili.tech/img/bVLBpk?w=839&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们看到执行的顺序为</p>
<ol>
<li><p>路由勾子 (beforeEach、beforeRouteEnter、afterEach)</p></li>
<li><p>根组件 (beforeCreate、created、beforeMount)</p></li>
<li><p>组件 (beforeCreate、created、beforeMount)</p></li>
<li><p>指令 (bind、inserted)</p></li>
<li><p>组件 mounted</p></li>
<li><p>根组件 mounted</p></li>
<li><p>beforeRouteEnter的next的回调</p></li>
<li><p>nextTick</p></li>
</ol>
<h2 id="articleHeader1">结论</h2>
<h3 id="articleHeader2">路由勾子执行周期非常早，甚至在根实例的渲染之前</h3>
<p>具体的顺序  router.beforeEach &gt; beforeRouteEnter &gt; router.afterEach</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tip:在进行路由拦截的时候要避免使用实例内部的方法或属性。
在开发项目时候，我们脑门一拍把，具体拦截的程序，写在了根实例的方法上了，到beforeEach去调用。
结果导致整个拦截的周期，推迟到实例渲染的之后。
因此对于一些路由组件的beforeRouteEnter里的请求并无法拦截，页面看上去好像已经拦截下来了。
实际上请求依然发了出去，beforeRouteEnter内的函数依然执行了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">tip</span>:在进行路由拦截的时候要避免使用实例内部的方法或属性。
在开发项目时候，我们脑门一拍把，具体拦截的程序，写在了根实例的方法上了，到<span class="hljs-keyword">beforeEach去调用。
</span>结果导致整个拦截的周期，推迟到实例渲染的之后。
因此对于一些路由组件的<span class="hljs-keyword">beforeRouteEnter里的请求并无法拦截，页面看上去好像已经拦截下来了。
</span>实际上请求依然发了出去，<span class="hljs-keyword">beforeRouteEnter内的函数依然执行了。</span></code></pre>
<h3 id="articleHeader3">指令的绑定在组件mounted之前，组件的beforeMount之后</h3>
<h3 id="articleHeader4">不得不提的, beforeRouteEnter的next勾子</h3>
<p>beforeRouteEnter的执行顺序是如此靠前，而其中next的回调勾子的函数，执行则非常靠后，在mounted之后！！<br>我们通常是在beforeRouteEnter中加载一些首屏用数据，待数据收到后，再调用next勾子，通过回调的参数vm将数据绑定到实例上。<br>因此，请注意next的勾子是非常靠后的。</p>
<h3 id="articleHeader5">nextTick</h3>
<p>越早注册的nextTick触发越早</p>
<p><a href="https://segmentfault.com/a/1190000008879966">vue生命周期探究（一）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue生命周期探究（二）

## 原文链接
[https://segmentfault.com/a/1190000008923105](https://segmentfault.com/a/1190000008923105)

