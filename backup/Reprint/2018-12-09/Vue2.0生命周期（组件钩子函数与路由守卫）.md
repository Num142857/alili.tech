---
title: 'Vue2.0生命周期（组件钩子函数与路由守卫）' 
date: 2018-12-09 2:30:08
hidden: true
slug: s9351b0nhe
categories: [reprint]
---

{{< raw >}}

                    
<p>组件相关钩子函数： beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destoryed<br>还有两个特殊的（使用keep-alive）：<a href="https://cn.vuejs.org/v2/api/#activated" rel="nofollow noreferrer" target="_blank">activated</a>、<a href="https://cn.vuejs.org/v2/api/#deactivated" rel="nofollow noreferrer" target="_blank">deactivated</a>（不详述）<br>v2.5.0+新增： <a href="https://cn.vuejs.org/v2/api/#errorCaptured" rel="nofollow noreferrer" target="_blank">errorCaptured</a> (暂时还不知道咋用)</p>
<p>路由守卫：<br>全局&amp;路由独享：beforeEach、beforeResolve（v2.5.0+新增）、afterEach ；beforeEnter（路由独享，类似beforeEach）<br>组件内：beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave</p>
<h2 id="articleHeader0">组件生命周期钩子函数</h2>
<h3 id="articleHeader1">beforeCreate</h3>
<p>实例初始化之后</p>
<p>this指向创建的实例<br>数据观测（data observer）和event/watcher配置尚未完成<br>不能访问到methods、data、computed、watch上的方法和数据</p>
<h3 id="articleHeader2">created</h3>
<p>实例创建完成，并已经完成以下配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调<br>此时可以调用methods中定义的方法，修改data的数据，并且可触发响应式变化、computed值重新计算，watch到变更等</p>
<p>还未挂载到DOM，不能访问到$el属性，$ref属性内容为空数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  data () {
    return {
      a : 1
    }
  } ,
  created (){
    console.log( this.a )  // 1
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>new Vue({
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      a : <span class="hljs-number">1</span>
    }
  } ,
  created (){
    console.log( <span class="hljs-keyword">this</span>.a )  <span class="hljs-comment">// 1</span>
  }
})</code></pre>
<p>这个生命周期阶段比较常用，比如ajax请求获取初始化数据对实例进行初始化预处理等操作；但要注意在结合vue-router使用时，进入created生命周期阶段后是无法对挂载实例进行拦截的，此时实例已经创建完成；故如果需要某些数据获取完成情况才允许进入页面的场景，建议在路由钩子beforeRouteEnter中实现</p>
<h3 id="articleHeader3">beforeMount</h3>
<p>在挂载开始之前被调用</p>
<p>注意：从vue生命周期图可以看出<br>当new Vue({...})的配置中没有el属性时，生命周期暂停，等待vm.$mount(el)调用时才继续<br><span class="img-wrap"><img data-src="/img/remote/1460000013956948" src="https://static.alili.tech/img/remote/1460000013956948" alt="created-&amp;gt;beforeMount" title="created-&amp;gt;beforeMount" style="cursor: pointer;"></span></p>
<p>beforeMount之前，会找到对应的template，并编译成render函数<br>（这个步骤如果使用.vue文件和运行时版本将会在构建时提前完成）</p>
<p>template查找的优先级顺序:<br><strong> template参数  &gt; el 外部HTML</strong><br>如果指定了render函数，则直接采用render函数，即忽略template参数和el外部HTML</p>
<p>写个栗子测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>template outside</div>
...
import App from './App.vue';  // App是任一Vue组件对象

new Vue({
  el: '#app',
  // template: '<p>template inside</p>',   // part inside
  // render: h => h(App)     //  part render
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;div id=<span class="hljs-string">"app"</span>&gt;<span class="hljs-keyword">template</span> outside&lt;/div&gt;
...
<span class="hljs-keyword">import</span> App from <span class="hljs-string">'./App.vue'</span>;  <span class="hljs-comment">// App是任一Vue组件对象</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-comment">// template: '&lt;p&gt;template inside&lt;/p&gt;',   // part inside</span>
  <span class="hljs-comment">// render: h =&gt; h(App)     //  part render</span>
})</code></pre>
<p>需要Vue完整版本支持，注释part inside和part render依次打开即可观察到三次不同的结果</p>
<p>Vue的编译过程暂略</p>
<h3 id="articleHeader4">mounted</h3>
<p>el被新创建的$el替换 ----  怎么理解？</p>
<p>这个可以理解为挂载前为实例寻找了一个暂时容身之处el，编译完成($el创建完成)后替换这个容身之处完成实例的挂载<br>如：之前那个栗子中，将part render打开后观察生成的DOM结构，<code>&lt;div id="app"&gt;template outside&lt;/div&gt;</code>这个节点即原el已经被替换掉</p>
<p>实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问</p>
<p>虽然经常观察到先进入子组件mounted，但根据Vue官方文档：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意&nbsp;`mounted`&nbsp;不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染
完毕，可以用&nbsp;[vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)&nbsp;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>注意&nbsp;<span class="hljs-code">`mounted`</span>&nbsp;不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染
完毕，可以用&nbsp;[<span class="hljs-string">vm.$nextTick</span>](<span class="hljs-link">https://cn.vuejs.org/v2/api/#vm-nextTick</span>)&nbsp;

</code></pre>
<p>在这个阶段改变data上的值，相关的computed属性可以立刻更新；但需要进入到下一次DOM更新，才能看到DOM上数据更新</p>
<p>栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  template: '<p id=&quot;testa&quot;>"{{"a"}}"</p>',
  router,
  data ()
  {
    return {
      a : 0
    }
  },
  mounted() {
    this.a ++;
    console.log(this.b);   //  2
    console.log(document.getElementById('testa').innerHTML)  //  0
  },
  computed :{
    b (){
      return this.a+1;
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>new Vue({
  el: <span class="hljs-string">'#app'</span>,
  template: <span class="hljs-string">'&lt;p id="testa"&gt;"{{"a"}}"&lt;/p&gt;'</span>,
  router,
  <span class="hljs-keyword">data</span> ()
  {
    <span class="hljs-keyword">return</span> {
      a : <span class="hljs-number">0</span>
    }
  },
  mounted() {
    <span class="hljs-keyword">this</span>.a ++;
    console.log(<span class="hljs-keyword">this</span>.b);   <span class="hljs-comment">//  2</span>
    console.log(document.getElementById(<span class="hljs-string">'testa'</span>).innerHTML)  <span class="hljs-comment">//  0</span>
  },
  computed :{
    b (){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a+<span class="hljs-number">1</span>;
    }
  }
})</code></pre>
<p>beforeRouteEnter的next的勾子比mounted触发还要靠后 - 这个待会说到路由相关钩子时再展开</p>
<h3 id="articleHeader5">beforeUpdate</h3>
<p>这里的更新对象是模板，即需要虚拟 DOM 重新渲染和打补丁，beforeUpdate发生在以上两个流程之前，此时新的虚拟DOM已经生成</p>
<p><strong>如果发生变更的数据在模板中并没有使用（包括直接和间接，间接：比如某个依赖该数据的计算属性在模板中使用了），则不会触发更新流程！！！</strong></p>
<p>如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  template: '<p id=&quot;testa&quot;>"{{"a"}}"</p>',
  router,
  data ()
  {
    return {
      a : 0,
      b :  1
    }
  },
  mounted (){
    this.b ++;   //   b并没有在模板中使用
  },
  beforeUpdate (){
    debugger;  //  不会进入这个断点
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;p id="testa"&gt;"{{"a"}}"&lt;/p&gt;'</span>,
  router,
  data ()
  {
    return {
      <span class="hljs-attribute">a </span>: <span class="hljs-number">0</span>,
      <span class="hljs-attribute">b </span>:  <span class="hljs-number">1</span>
    }
  },
  mounted (){
    <span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.b</span> ++;   <span class="hljs-comment">//   b并没有在模板中使用</span>
  },
  <span class="hljs-selector-tag">beforeUpdate</span> (){
    <span class="hljs-selector-tag">debugger</span>;  <span class="hljs-comment">//  不会进入这个断点</span>
  }
})</code></pre>
<p>在一些参考文章中看到：<br><code>在这个钩子函数中，可以对状态进行进一步更改，不会再次触发重渲染流程</code>  --- 这个说法有问题<br>如果对状态进行变更会导致重新进入beforeUpdate（这里变更的状态同样要在模板中使用，如果变更没有在模板中使用的data，才不会再次触发重渲染流程）<br>而且若变更操作不是基础类型的简单赋值，还会引起死循环（不断重新进入beforeUpdate）！</p>
<p>看看这个栗子，依次把注释打开测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  template: '<p id=&quot;testa&quot;>"{{"a"}}"</p>',
  router,
  data ()
  {
    return {
      a : 0,
      c:  0
    }
  },
  beforeUpdate() {
    console.log(document.getElementById('testa').innerHTML)
    // this.c = 1;   //  this.c没有在模板中使用，变更不会引起重渲染流程
    // this.a = 3;  //  会再次进入一次重渲染流程，第二次进入时发现a仍是3，值没有变更，不会再次重渲染
    // this.a ++;   //  会引起死循环，每次进入重渲染流程时，a的值都会变更
  },
  updated() {
    console.log(document.getElementById('testa').innerHTML)
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;p id="testa"&gt;"{{"a"}}"&lt;/p&gt;'</span>,
  router,
  data ()
  {
    return {
      <span class="hljs-attribute">a </span>: <span class="hljs-number">0</span>,
      <span class="hljs-attribute">c</span>:  <span class="hljs-number">0</span>
    }
  },
  beforeUpdate() {
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(document.getElementById(<span class="hljs-string">'testa'</span>).innerHTML)
    <span class="hljs-comment">// this.c = 1;   //  this.c没有在模板中使用，变更不会引起重渲染流程</span>
    <span class="hljs-comment">// this.a = 3;  //  会再次进入一次重渲染流程，第二次进入时发现a仍是3，值没有变更，不会再次重渲染</span>
    <span class="hljs-comment">// this.a ++;   //  会引起死循环，每次进入重渲染流程时，a的值都会变更</span>
  },
  <span class="hljs-selector-tag">updated</span>() {
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(document.getElementById(<span class="hljs-string">'testa'</span>).innerHTML)
  }
})
</code></pre>
<p><strong>应该避免在这个钩子函数中操作数据</strong></p>
<h3 id="articleHeader6">updated</h3>
<p>由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。</p>
<p>当这个钩子被调用时，组件 DOM 已经更新，可以执行依赖于 DOM 的操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意&nbsp;`updated`&nbsp;不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，
可以用&nbsp;[vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)&nbsp;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>注意&nbsp;<span class="hljs-code">`updated`</span>&nbsp;不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，
可以用&nbsp;[<span class="hljs-string">vm.$nextTick</span>](<span class="hljs-link">https://cn.vuejs.org/v2/api/#vm-nextTick</span>)&nbsp;
</code></pre>
<p>同样，<strong>应该避免在这个钩子函数中操作数据</strong></p>
<h4>beforeDestroy</h4>
<p>实例销毁之前调用。在这一步，实例仍然完全可用，this仍能获取到实例</p>
<p>一般在这一步中进行：销毁定时器、解绑全局事件、销毁插件对象等操作</p>
<h3 id="articleHeader7">destroyed</h3>
<p>Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁</p>
<p><strong>注意：vue2.0之后主动调用$destroy()不会移除dom节点，作者不推荐直接destroy这种做法，具体参考<a href="https://github.com/vuejs/vue/issues/5256" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue/...</a>，如果实在需要这样用可以在这个生命周期钩子中手动移除dom节点</strong></p>
<h3 id="articleHeader8">总结</h3>
<p>参考<a href="https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA" rel="nofollow noreferrer" target="_blank">官方文档中的生命周期说明图</a></p>
<h2 id="articleHeader9">路由守卫 —— 路由级别的（全局&amp;路由独享）</h2>
<h3 id="articleHeader10">router.beforeEach</h3>
<p>全局前置守卫<br>当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 <em>等待中</em></p>
<p>如何使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  console.log('全局前置守卫：beforeEach -- next需要调用')
  next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  console.log(<span class="hljs-string">'全局前置守卫：beforeEach -- next需要调用'</span>)
  <span class="hljs-built_in">next</span>()
})</code></pre>
<p>一般在这个守卫方法中进行全局拦截，比如必须满足某种条件（用户登录等）才能进入路由的情况</p>
<p>参数to和from都是路由对象<code>Route</code><br>next是个Function，有以下几种用法（from api文档）</p>
<ul>
<li>next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）</li>
<li>next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址  ——  也就是说并不是单纯的中断，还会检查URL的变更以保证不会错误的进入到next路由</li>
<li>next('/')&nbsp;或者&nbsp;next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。可传递的参数与router.push中选项一致</li>
<li>next(error): (v2.4.0+) 如果传入&nbsp;<code>next</code>&nbsp;的参数是一个&nbsp;<code>Error</code>&nbsp;实例，则导航会被终止且该错误会被传递给&nbsp;<a href="https://router.vuejs.org/zh-cn/api/router-instance.html#%E6%96%B9%E6%B3%95" rel="nofollow noreferrer" target="_blank"><code>router.onError()</code></a>&nbsp;注册过的回调</li>
</ul>
<h3 id="articleHeader11">router.beforeResolve (v 2.5.0+)</h3>
<p>全局解析守卫</p>
<p>和beforeEach类似，区别是在<strong>导航被确认之前</strong>，同时在所有<strong>组件内守卫和异步路由组件被解析之后</strong>，解析守卫就被调用<br>即在 beforeEach 和 组件内beforeRouteEnter 之后</p>
<p>参数和beforeEach一致，也需要调用next对导航确认</p>
<h3 id="articleHeader12">router.afterEach</h3>
<p>全局后置钩子<br>在所有路由跳转结束的时候调用<br>这些钩子不会接受 next 函数也不会改变导航本身</p>
<h3 id="articleHeader13">beforeEnter</h3>
<p>可直接定义在路由配置上，和beforeEach方法参数、用法相同</p>
<h2 id="articleHeader14">路由守卫 —— 组件内</h2>
<h3 id="articleHeader15">beforeRouteEnter</h3>
<p>在渲染该组件的对应路由被<code>确认</code>前调用，用法和参数与beforeEach类似，<strong>next需要被主动调用</strong><br>注意：</p>
<ul>
<li>此时组件实例还未被创建，不能访问this</li>
<li>可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeRouteEnter (to, from, next) {
  // 这里还无法访问到组件实例，this === undefined
  next( vm => {
    // 通过 `vm` 访问组件实例
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>beforeRouteEnter (to, from, <span class="hljs-keyword">next</span>) {
  <span class="hljs-regexp">//</span> 这里还无法访问到组件实例，this === undefined
  <span class="hljs-keyword">next</span>( vm =&gt; {
    <span class="hljs-regexp">//</span> 通过 <span class="hljs-string">`vm`</span> 访问组件实例
  })
}</code></pre>
<ul>
<li>可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用next并在回调中通过 <code>vm</code>访问组件实例进行赋值等操作</li>
<li>beforeRouteEnter触发在导航确认、组件实例创建之前：beforeCreate之前；而next中函数的调用在mounted之后：为了确保能对组件实例的完整访问</li>
</ul>
<h3 id="articleHeader16">beforeRouteUpdate (v 2.2+)</h3>
<p>在当前路由改变，并且该组件被复用时调用，可以通过this访问实例， <strong>next需要被主动调用，不能传回调</strong></p>
<ul>
<li>对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，组件实例会被复用，该守卫会被调用</li>
<li>当前路由query变更时，该守卫会被调用</li>
<li>vue-router推荐的数据获取方法二中，结合beforeRouteEnter使用，在路由参数变更时可以重新获取数据，获取成功再调用next()，参考：<a href="https://router.vuejs.org/zh-cn/advanced/data-fetching.html" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh-c...</a>
</li>
</ul>
<p>之前在手机浏览器中好像发现这个守卫的bug？@TODO 待确认</p>
<h3 id="articleHeader17">beforeRouteLeave</h3>
<p>导航离开该组件的对应路由时调用，可以访问组件实例 <code>this</code>，<strong>next需要被主动调用，不能传回调</strong></p>
<h2 id="articleHeader18">总结</h2>
<p>结合并扩展Vue-router官方文档的说明：</p>
<ul>
<li>
<strong>导航行为被触发</strong>，此时导航未被确认。</li>
<li>在失活的组件里调用离开守卫 beforeRouteLeave。</li>
<li>调用全局的 beforeEach 守卫。</li>
<li>在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。</li>
<li>在路由配置里调用 beforeEnter。</li>
<li>解析异步路由组件（如果有）。</li>
<li>在被激活的组件里调用 beforeRouteEnter。</li>
<li>调用全局的 beforeResolve 守卫 (2.5+)，标示解析阶段完成。</li>
<li>
<strong>导航被确认</strong>。</li>
<li>调用全局的 afterEach 钩子。</li>
<li>
<p>非重用组件，开始<strong>组件实例的生命周期</strong></p>
<ul>
<li>beforeCreate&amp;created</li>
<li>beforeMount&amp;mounted</li>
</ul>
</li>
<li>触发 DOM 更新。</li>
<li>用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。</li>
<li><strong>导航完成</strong></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013956949" src="https://static.alili.tech/img/remote/1460000013956949" alt="路由守卫与组件生命周期-首次" title="路由守卫与组件生命周期-首次" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0生命周期（组件钩子函数与路由守卫）

## 原文链接
[https://segmentfault.com/a/1190000013956945](https://segmentfault.com/a/1190000013956945)

