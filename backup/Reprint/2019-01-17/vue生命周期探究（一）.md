---
title: 'vue生命周期探究（一）' 
date: 2019-01-17 2:30:25
hidden: true
slug: xyndkboi83
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA" rel="nofollow noreferrer" target="_blank">vue官方文档---实例生命周期</a><br><a href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">vue-router2.3版文档---路由勾子</a><br><a href="https://cn.vuejs.org/v2/guide/custom-directive.html" rel="nofollow noreferrer" target="_blank">vue官方文档---指令及其绑定周期</a></p>
<h2 id="articleHeader0">前言</h2>
<p>在使用vue开发的过程中，我们经常会接触到生命周期的问题。那么你知道，一个标准的工程项目中，会有多少个生命周期勾子吗？让我们来一起来盘点一下：</p>
<ol>
<li><p>根组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)</p></li>
<li><p>组件实例：8个 (beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed)</p></li>
<li><p>全局路由钩子：2个 (beforeEach、afterEach)</p></li>
<li><p>组件路由钩子：3个 (beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave)</p></li>
<li><p>指令的周期： 5个 (bind、inserted、update、componentUpdated、unbind)</p></li>
<li><p>beforeRouteEnter的next所对应的周期</p></li>
<li><p>nextTick所对应的周期</p></li>
</ol>
<p>吓到了吗？合计竟然一共有28个周期，是否看得头昏眼花了呢？接下来让我们一起来介绍一下各个周期的通常用途与使用细节吧</p>
<h2 id="articleHeader1">组件实例周期</h2>
<p>这一块vue2的官方文档有一张图示，我们简要提一下用法和注意</p>
<h3 id="articleHeader2">beforeCreate</h3>
<p>在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tip：

此时组件的选项还未挂载，因此无法访问methods，data,computed上的方法或数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">tip</span>：

此时组件的选项还未挂载，因此无法访问methods，<span class="hljs-class"><span class="hljs-keyword">data</span>,computed上的方法或数据</span></code></pre>
<h3 id="articleHeader3">created</h3>
<p>实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。</p>
<p>这是一个常用的生命周期，因为你可以调用methods中的方法、改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上、获取computed中的计算属性等等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tip:

通常我们可以在这里对实例进行预处理。
也有一些童鞋喜欢在这里发ajax请求，值得注意的是，这个周期中是没有什么方法来对实例化过程进行拦截的。
因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个页面发请求。
建议在组件路由勾子beforeRouteEnter中来完成。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">tip:</span>

通常我们可以在这里对实例进行预处理。
也有一些童鞋喜欢在这里发ajax请求，值得注意的是，这个周期中是没有什么方法来对实例化过程进行拦截的。
因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个页面发请求。
建议在组件路由勾子beforeRouteEnter中来完成。</code></pre>
<h3 id="articleHeader4">beforeMonut</h3>
<p>在挂载开始之前被调用：相关的 render 函数首次被调用。</p>
<h3 id="articleHeader5">mounted</h3>
<p>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tip:

1.在这个周期内，对data的改变可以生效。但是要进下一轮的dom更新，dom上的数据才会更新。
2.这个周期可以获取 dom。 之前的论断有误，感谢@冯银超 和 @AnHour的提醒
3.beforeRouteEnter的next的勾子比mounted触发还要靠后
4.指令的生效在mounted周期之前
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">tip</span>:

<span class="hljs-number">1</span>.在这个周期内，对data的改变可以生效。但是要进下一轮的dom更新，dom上的数据才会更新。
<span class="hljs-number">2</span>.这个周期可以获取 dom。 之前的论断有误，感谢@冯银超 和 <span class="hljs-variable">@AnHour</span>的提醒
<span class="hljs-number">3</span>.beforeRouteEnter的next的勾子比mounted触发还要靠后
<span class="hljs-number">4</span>.指令的生效在mounted周期之前
</code></pre>
<h3 id="articleHeader6">beforeUpdate</h3>
<p>数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。</p>
<h3 id="articleHeader7">updated</h3>
<p>由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。</p>
<h3 id="articleHeader8">beforeDestroy</h3>
<p>实例销毁之前调用。在这一步，实例仍然完全可用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tip:

1.这一步还可以用this来获取实例。
2.一般在这一步做一些重置的操作。比如清除掉组件中的 定时器 和 监听的dom事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">tip:</span>

<span class="hljs-number">1.</span>这一步还可以用<span class="hljs-keyword">this</span>来获取实例。
<span class="hljs-number">2.</span>一般在这一步做一些重置的操作。比如清除掉组件中的 定时器 和 监听的dom事件</code></pre>
<h3 id="articleHeader9">destroyed</h3>
<p>Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</p>
<h2 id="articleHeader10">全局路由钩子</h2>
<p>作用于所有路由切换，一般在main.js里面定义</p>
<h3 id="articleHeader11">router.beforeEach</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="示例
router.beforeEach((to, from, next) => {
  console.log('路由全局勾子：beforeEach -- 有next方法')
  next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>示例
router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  console.log(<span class="hljs-string">'路由全局勾子：beforeEach -- 有next方法'</span>)
  <span class="hljs-built_in">next</span>()
})</code></pre>
<p>一般在这个勾子的回调中，对路由进行拦截。<br>比如，未登录的用户，直接进入了需要登录才可见的页面，那么可以用next(false)来拦截，使其跳回原页面。<br>值得注意的是，如果没有调用next方法，那么页面将卡在那。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="next的四种用法
1.next() 跳入下一个页面
2.next('/path') 改变路由的跳转方向，使其跳到另一个路由
3.next(false)  返回原来的页面
4.next((vm)=>{})  仅在beforeRouteEnter中可用，vm是组件实例。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code><span class="hljs-built_in">next</span>的四种用法
<span class="hljs-number">1.</span><span class="hljs-built_in">next</span>() 跳入下一个页面
<span class="hljs-number">2.</span><span class="hljs-built_in">next</span>(<span class="hljs-string">'/path'</span>) 改变路由的跳转方向，使其跳到另一个路由
<span class="hljs-number">3.</span><span class="hljs-built_in">next</span>(<span class="hljs-literal">false</span>)  返回原来的页面
<span class="hljs-number">4.</span><span class="hljs-built_in">next</span>(<span class="hljs-function"><span class="hljs-params">(vm)</span>=&gt;</span>{})  仅在beforeRouteEnter中可用，vm是组件实例。</code></pre>
<h3 id="articleHeader12">router.afterEach</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="示例
router.afterEach((to, from) => {
  console.log('路由全局勾子：afterEach --- 没有next方法')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">示例</span>
<span class="hljs-string">router.afterEach((to,</span> <span class="hljs-string">from)</span> <span class="hljs-string">=&gt;</span> <span class="hljs-string">{</span>
  <span class="hljs-string">console.log('路由全局勾子：afterEach</span> <span class="hljs-meta">---</span> <span class="hljs-string">没有next方法')</span>
<span class="hljs-string">})</span></code></pre>
<p>在所有路由跳转结束的时候调用，和beforeEach是类似的，但是它没有next方法</p>
<h2 id="articleHeader13">组件路由勾子</h2>
<p>和全局勾子不同的是，它仅仅作用于某个组件，一般在.vue文件中去定义。</p>
<h3 id="articleHeader14">beforeRouteEnter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="示例
  beforeRouteEnter (to, from, next) {
    console.log(this)  //undefined，不能用this来获取vue实例
    console.log('组件路由勾子：beforeRouteEnter')
    next(vm => {
      console.log(vm)  //vm为vue的实例
      console.log('组件路由勾子beforeRouteEnter的next')
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>示例
  beforeRouteEnter (to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)  <span class="hljs-comment">//undefined，不能用this来获取vue实例</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件路由勾子：beforeRouteEnter'</span>)
    next(<span class="hljs-function"><span class="hljs-params">vm</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(vm)  <span class="hljs-comment">//vm为vue的实例</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件路由勾子beforeRouteEnter的next'</span>)
    })
  }</code></pre>
<p>这个是一个很不同的勾子。因为beforeRouterEnter在组件创建之前调用，所以它无法直接用this来访问组件实例。<br>为了弥补这一点，vue-router开发人员，给他的next方法加了特技，可以传一个回调，回调的第一个参数即是组件实例。<br>一般我们可以利用这点，对实例上的数据进行修改，调用实例上的方法。</p>
<p>我们可以在这个方法去请求数据，在数据获取到之后，再调用next就能保证你进页面的时候，数据已经获取到了。没错，这里next有阻塞的效果。你没调用的话，就会一直卡在那</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tip:

next(vm=>{console.log('next')  })
这个里面的代码是很晚执行的，在组件mounted周期之后。没错，这是一个坑。你要注意。
beforeRouteEnter的代码时很早执行的，在组件beforeCreate之前；
但是next里面回调的执行，很晚，在mounted之后，可以说是目前我找到的，离dom渲染最近的一个周期。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>tip:

<span class="hljs-keyword">next</span>(<span class="hljs-keyword">vm</span>=&gt;{console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'next'</span>)  })
这个里面的代码是很晚执行的，在组件mounted周期之后。没错，这是一个坑。你要注意。
beforeRouteEnter的代码时很早执行的，在组件beforeCreate之前；
但是<span class="hljs-keyword">next</span>里面回调的执行，很晚，在mounted之后，可以说是目前我找到的，离dom渲染最近的一个周期。</code></pre>
<h3 id="articleHeader15">beforeRouteLeave</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  beforeRouteLeave (to, from, next) {
    console.log(this)    //可以访问vue实例
    console.log('组件路由勾子：beforeRouteLeave')
    next()
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>  beforeRouteLeave (<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>) {
    console.<span class="hljs-built_in">log</span>(this)    //可以访问vue实例
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'组件路由勾子：beforeRouteLeave'</span>)
    <span class="hljs-keyword">next</span>()
  },</code></pre>
<p>在离开路由时调用。可以用this来访问组件实例。但是next中不能传回调。</p>
<h3 id="articleHeader16">beforeRouteUpdate</h3>
<p>这个方法是vue-router2.2版本加上的。因为原来的版本中，如果一个在两个子路由之间跳转，是不触发beforeRouteLeave的。这会导致某些重置操作，没地方触发。在之前，我们都是用watch $route来hack的。但是通过这个勾子，我们有了更好的方式。</p>
<p>老实讲，我没用过这个勾子，所以各位可以查看一下文章之前的文档，去尝试一下，再和我交流交流。</p>
<h2 id="articleHeader17">指令周期</h2>
<p>绑定自定义指令的时候也会有对应的周期。<br>这几个周期，我比较常用的，一般是只有bind。</p>
<h3 id="articleHeader18">bind</h3>
<p>只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。</p>
<h3 id="articleHeader19">inserted</h3>
<p>被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。<br>实际上是插入vnode的时候调用。</p>
<h3 id="articleHeader20">update</h3>
<p>被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。<br>慎用，如果在指令里绑定事件，并且用这个周期的，记得把事件注销</p>
<h3 id="articleHeader21">componentUpdated</h3>
<p>被绑定元素所在模板完成一次更新周期时调用。</p>
<h3 id="articleHeader22">unbind</h3>
<p>只调用一次， 指令与元素解绑时调用。</p>
<h2 id="articleHeader23">Vue.nextTick、vm.$nextTick</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="示例：
  created () {
    this.$nextTick(() => {
      console.log('nextTick')  //回调里的函数一直到真实的dom渲染结束后，才执行
    })
    console.log('组件：created')
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>示例：
  created () {
    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'nextTick'</span>)  <span class="hljs-regexp">//</span>回调里的函数一直到真实的dom渲染结束后，才执行
    })
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'组件：created'</span>)
  },</code></pre>
<p>nextTick方法的回调会在dom更新后再执行，因此可以和一些dom操作搭配一起用，如 ref。<br>非常好用，可以解决很多疑难杂症。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="场景：
你用ref获得一个输入框，用v-model绑定。
在某个方法里改变绑定的值，在这个方法里用ref去获取dom并取值，你会发现dom的值并没有改变。
因为此时vue的方法，还没去触发dom的改变。
因此你可以把获取dom值的操作放在vm.$nextTick的回调里，就可以了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>场景：
你用<span class="hljs-keyword">ref</span>获得一个输入框，用v-model绑定。
在某个方法里改变绑定的值，在这个方法里用<span class="hljs-keyword">ref</span>去获取dom并取值，你会发现dom的值并没有改变。
因为此时vue的方法，还没去触发dom的改变。
因此你可以把获取dom值的操作放在vm.$nextTick的回调里，就可以了。</code></pre>
<p><a href="https://segmentfault.com/a/1190000008923105">vue生命周期探究（二）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue生命周期探究（一）

## 原文链接
[https://segmentfault.com/a/1190000008879966](https://segmentfault.com/a/1190000008879966)

