---
title: '实例化vue发生了什么?(详解vue生命周期)' 
date: 2018-12-17 2:30:07
hidden: true
slug: ilebde498ws
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">实例化vue发生了什么?(详解vue生命周期)</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本文将对vue的生命周期进行详细的讲解,让你了解一个vue实例的诞生都经历了什么~" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">本文将对vue的生命周期进行详细的讲解,让你了解一个vue实例的诞生都经历了什么~</code></pre>
<p>我在Github上建立了一个存放vue笔记的仓库,以后会陆续更新一些知识和项目中遇到的坑,有兴趣的同学可以去看看哈(欢迎star)!  </p>
<p><a href="https://github.com/webfansplz/vue-note/issues/2" rel="nofollow noreferrer" target="_blank">传送门</a></p>
<h2 id="articleHeader1">实例化一个Vue</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = new Vue({
  el:&quot;#app',
  data:{
    message:'hello,lifePeriod'
  },
  methods:{
    init(){
      console.log('这是一个方法!')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span><span class="hljs-comment">"#app',</span>
  dat<span class="hljs-variable">a:</span>{
    message:<span class="hljs-string">'hello,lifePeriod'</span>
  },
  method<span class="hljs-variable">s:</span>{
    init(){
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'这是一个方法!'</span>)
    }
  }
})</code></pre>
<h2 id="articleHeader2">1.触发 beforeCreate 钩子函数</h2>
<p>组件实例刚被创建,此时无法访问到 el 属性和 data 属性等..</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeCreate(){

    console.log(`元素:${this.$el}`)   //undefined

    console.log(`属性message:${this.message}`) //undefined

    console.log(`方法init:${this.init}`)   //undefined
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>beforeCreate(){

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`元素:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$el}</span>`</span>)   <span class="hljs-comment">//undefined</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`属性message:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.message}</span>`</span>) <span class="hljs-comment">//undefined</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`方法init:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.init}</span>`</span>)   <span class="hljs-comment">//undefined</span>
}</code></pre>
<h2 id="articleHeader3">2.对data进行双向绑定,初始化方法(Observer Data &amp;&amp; init events)</h2>
<p>当一个 vue 实例被创建时,他向 Vue 的响应式系统中加入了其 data 对象中能找到的所有属性.</p>
<p>利用 es5 特性 Object.defineProperty,遍历 data 对象下所有属性,将其转化为 getter/setter,以便拦截对象赋值与取值操作,然后利用发布/订阅者模式,从而实现数据的双向绑定!</p>
<p>所以只有当实例被创建时 data 中存在的属性才是响应式的!!!!</p>
<p>将methods 下的所有方法进行声明.</p>
<p>将methods下的方法和data下的属性通过遍历和利用 es5 特性 Object.defineProperty代理到实例下.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.a = this.$data.a = this.data.a;

this.fn = this.$methods.fn = this.methods.fn; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.a = <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">data</span>.a = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>.a;

<span class="hljs-keyword">this</span>.fn = <span class="hljs-keyword">this</span>.$methods.fn = <span class="hljs-keyword">this</span>.methods.fn; 
</code></pre>
<h2 id="articleHeader4">3.触发 created 钩子函数</h2>
<p>组件实例创建完成,属性已绑定,但 DOM 还未生成,$el 属性还不存在!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created(){

    console.log(`元素:${this.$el}`)   //undefined

    console.log(`属性message:${this.message}`) //message:hey,vue-lifePeriod!

    console.log(`方法init:${this.init}`)   //function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>created(){

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`元素:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$el}</span>`</span>)   <span class="hljs-comment">//undefined</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`属性message:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.message}</span>`</span>) <span class="hljs-comment">//message:hey,vue-lifePeriod!</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`方法init:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.init}</span>`</span>)   <span class="hljs-comment">//function n(n){var r=arguments.length;return r?r&gt;1?t.apply(e,arguments):t.call(e,n):t.call(e)}</span>
}</code></pre>
<h2 id="articleHeader5">4.将模板编译成函数 (compile template into render function)</h2>
<p>将模板 template 编译成 AST 树、render 函数(new Watch 将模板与数据建立联系)以及 staticRenderFns 函数(通过 diff 算法优化 dom 更新);<br>运行 render 方法,返回一个 vnode 对象(virtual dom)</p>
<h2 id="articleHeader6">5. 触发 beforeMount 钩子函数</h2>
<p>模板编译/挂载之前</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeMount(){

    console.log(`元素:${(this.$el)}`)

    console.log(this.$el)  //<div id=&quot;app&quot;>"{{"message"}}"</div> ,我们发现此时的el还未对数据进行渲染.(虚拟dom的内容)

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>beforeMount(){

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`元素:<span class="hljs-subst">${(<span class="hljs-keyword">this</span>.$el)}</span>`</span>)

    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el)  <span class="hljs-comment">//&lt;div id="app"&gt;"{{"message"}}"&lt;/div&gt; ,我们发现此时的el还未对数据进行渲染.(虚拟dom的内容)</span>

}</code></pre>
<h2 id="articleHeader7">6. 触发 mounted 钩子函数</h2>
<p>模板编译/挂载之后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted(){

  console.log(`元素:${(this.$el)}`)

  console.log(this.$el)   //<div id=&quot;app&quot;>"{{"hello,vue-lifePeriod!"}}"</div>   ,已将数据渲染到真实dom

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>mounted(){

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`元素:<span class="hljs-subst">${(<span class="hljs-keyword">this</span>.$el)}</span>`</span>)

  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el)   <span class="hljs-comment">//&lt;div id="app"&gt;"{{"hello,vue-lifePeriod!"}}"&lt;/div&gt;   ,已将数据渲染到真实dom</span>

}</code></pre>
<h2 id="articleHeader8">我们这时将 app.message 改变为'hey,vue-lifePeriod';</h2>
<h2 id="articleHeader9">7.触发 beforeUpdate 钩子函数</h2>
<p>组件更新之前</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeUpdate(){

    console.log(this.$el.innerHTML);  //hello,vue-lifePeriod   ,此时,元素的真实dom内容还未改变.

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>beforeUpdate(){

    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">this</span>.$el.innerHTML);  <span class="hljs-comment">//hello,vue-lifePeriod   ,此时,元素的真实dom内容还未改变.</span>

}</code></pre>
<h2 id="articleHeader10">8.重新渲染虚拟 dom,并通过 diff 算法对比 vnode 节点差异更新真实 dom (virtual DOM re-render and patch)</h2>
<h2 id="articleHeader11">9.触发 updated 钩子函数</h2>
<p>组件更新之后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updated(){

  console.log(this.$el.innerHTML);  //hey,vue-lifePeriod   ,此时,元素的真实dom内容已经改变.

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>updated(){

  console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">this</span>.$el.innerHTML);  <span class="hljs-comment">//hey,vue-lifePeriod   ,此时,元素的真实dom内容已经改变.</span>

}</code></pre>
<h2 id="articleHeader12">我们这时调用 app.$destroy()函数对组件进行销毁</h2>
<h2 id="articleHeader13">10.触发 beforeDestroy 钩子函数</h2>
<p>组件销毁之前</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeDestroy(){

    console.log(this.$el)   //<div id=&quot;app&quot;>"{{"hey,vue-lifePeriod!"}}"</div>

    console.log(`属性message:${this.message}`) //message:hey,vue-lifePeriod!

    console.log(`方法init:${this.init}`)   //function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>beforeDestroy(){

    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el)   <span class="hljs-comment">//&lt;div id="app"&gt;"{{"hey,vue-lifePeriod!"}}"&lt;/div&gt;</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`属性message:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.message}</span>`</span>) <span class="hljs-comment">//message:hey,vue-lifePeriod!</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`方法init:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.init}</span>`</span>)   <span class="hljs-comment">//function n(n){var r=arguments.length;return r?r&gt;1?t.apply(e,arguments):t.call(e,n):t.call(e)}</span>

}</code></pre>
<h2 id="articleHeader14">11. 销毁数据监听,子组件和解除事件监听!</h2>
<h2 id="articleHeader15">12. 触发 destroyed钩子函数</h2>
<p>组件销毁之后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="destroyed(){

    console.log(this.$el)   //<div id=&quot;app&quot;>"{{"hey,vue-lifePeriod!"}}"</div>

    console.log(`属性message:${this.message}`) //message:hey,vue-lifePeriod!

    console.log(`方法init:${this.init}`)   //function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>destroyed(){

    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el)   <span class="hljs-comment">//&lt;div id="app"&gt;"{{"hey,vue-lifePeriod!"}}"&lt;/div&gt;</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`属性message:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.message}</span>`</span>) <span class="hljs-comment">//message:hey,vue-lifePeriod!</span>

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`方法init:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.init}</span>`</span>)   <span class="hljs-comment">//function n(n){var r=arguments.length;return r?r&gt;1?t.apply(e,arguments):t.call(e,n):t.call(e)}</span>
}</code></pre>
<p>实例销毁后虽然 dom 和属性方法都还存在,但改变他们都将不再生效!</p>
<p>app.message = 'hu,vue-lifePeriod';</p>
<p>console.log(app.message) //hey,vue-lifePeriod</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实例化vue发生了什么?(详解vue生命周期)

## 原文链接
[https://segmentfault.com/a/1190000012835456](https://segmentfault.com/a/1190000012835456)

