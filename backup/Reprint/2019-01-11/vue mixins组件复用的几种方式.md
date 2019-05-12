---
title: 'vue mixins组件复用的几种方式' 
date: 2019-01-11 2:30:08
hidden: true
slug: slmokp01pw
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li><p>最近在做项目的时候，研究了mixins，此功能有妙处。用的时候有这样一个场景，页面的风格不同，但是执行的方法，和需要的数据非常的相似。我们是否要写两种组件呢？还是保留一个并且然后另个一并兼容另一个呢？</p></li>
<li><p>不管以上那种方式都不是很合理，因为组件写成2个，不仅麻烦而且维护麻烦；第二种虽然做了兼容但是页面逻辑造成混乱，必然不清晰；有没有好的方法，有那就是用vue的混合插件<code>mixins</code>。混合在Vue是为了提出相似的数据和功能，使代码易懂，简单、清晰。</p></li>
</ul>
<h3 id="articleHeader0">1.场景</h3>
<p>假设我们有几个不同的组件，它们的工作是切换状态布尔、模态和工具提示。这些提示和情态动词不有很多共同点，除了功能：他们看起来不一样，他们不习惯相同，但逻辑是相同的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//弹框
const Modal = {
  template: '#modal',
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}

//提示框
const Tooltip = {
  template: '#tooltip',
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//弹框</span>
const Modal = {
  template: <span class="hljs-string">'#modal'</span>,
  <span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
      isShowing: <span class="hljs-literal">false</span>
    }
  },
  methods: {
    toggleShow() {
      <span class="hljs-keyword">this</span>.isShowing = !<span class="hljs-keyword">this</span>.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}

<span class="hljs-comment">//提示框</span>
const Tooltip = {
  template: <span class="hljs-string">'#tooltip'</span>,
  <span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
      isShowing: <span class="hljs-literal">false</span>
    }
  },
  methods: {
    toggleShow() {
      <span class="hljs-keyword">this</span>.isShowing = !<span class="hljs-keyword">this</span>.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}</code></pre>
<p>上面是一个弹框和提示框，如果考虑做2个组件，或者一个兼容另一个都不是合理方式。请看一下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const toggle = {
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
}

const Modal = {
  template: '#modal',
  mixins: [toggle],
  components: {
    appChild: Child
  }
};

const Tooltip = {
  template: '#tooltip',
  mixins: [toggle],
  components: {
    appChild: Child
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">toggle</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
  <span class="hljs-string">data()</span> <span class="hljs-string">{</span>
    <span class="hljs-string">return</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      isShowing:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  methods:</span> <span class="hljs-string">{</span>
    <span class="hljs-string">toggleShow()</span> <span class="hljs-string">{</span>
      <span class="hljs-string">this.isShowing</span> <span class="hljs-string">=</span> <span class="hljs-string">!this.isShowing;</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">}</span>

<span class="hljs-string">const</span> <span class="hljs-string">Modal</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  template:</span> <span class="hljs-string">'#modal'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  mixins:</span> <span class="hljs-string">[toggle],</span>
<span class="hljs-attr">  components:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    appChild:</span> <span class="hljs-string">Child</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">};</span>

<span class="hljs-string">const</span> <span class="hljs-string">Tooltip</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  template:</span> <span class="hljs-string">'#tooltip'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  mixins:</span> <span class="hljs-string">[toggle],</span>
<span class="hljs-attr">  components:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    appChild:</span> <span class="hljs-string">Child</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">};</span></code></pre>
<p>用mixins引入toggle功能相似的js文件，进行混合使用</p>
<h3 id="articleHeader1">2.可以合并生命周期</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//mixin
const hi = {
  mounted() {
    console.log('this mixin!')
  }
}

//vue组件
new Vue({
  el: '#app',
  mixins: [hi],
  mounted() {
    console.log('this Vue instance!')
  }
});

//Output in console
> this  mixin!
> this Vue instance!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//mixin</span>
<span class="hljs-keyword">const</span> hi = {
  mounted() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this mixin!'</span>)
  }
}

<span class="hljs-comment">//vue组件</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">mixins</span>: [hi],
  mounted() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this Vue instance!'</span>)
  }
});

<span class="hljs-comment">//Output in console</span>
&gt; <span class="hljs-keyword">this</span>  mixin!
&gt; <span class="hljs-keyword">this</span> Vue instance!</code></pre>
<p>先输出的是<code>mixins</code>的数据</p>
<h3 id="articleHeader2">3、可以全局混合（类似已filter）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.mixin({
  mounted() {
    console.log('hello from mixin!')
  },
  method:{
     test:function(){
     }
    }
})

new Vue({
  el: '#app',
  mounted() {
    console.log('this Vue instance!')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>Vue.mixin(<span class="hljs-comment">{
  mounted() {
    console.log('hello from mixin!')
  }</span>,
  <span class="hljs-function"><span class="hljs-keyword">method</span>:</span><span class="hljs-comment">{
     test:function(){
     }</span>
    }
})

<span class="hljs-keyword">new</span> Vue(<span class="hljs-comment">{
  el: '#app',
  mounted() {
    console.log('this Vue instance!')
  }</span>
})</code></pre>
<p>会在每一个组件中答应周期中的log，同时里面的方法，类似于vue的prototype添加实例方法一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (options) {
    // 逻辑...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue, options)</span> </span>{
  <span class="hljs-comment">// 1. 添加全局方法或属性</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
  <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 3. 注入组件</span>
  Vue.mixin({
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
}</code></pre>
<p>有兴趣的可以试试,若想了解更多请<a href="https://github.com/holidaying" rel="nofollow noreferrer" target="_blank">关注github账号holidaying</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue mixins组件复用的几种方式

## 原文链接
[https://segmentfault.com/a/1190000009875015](https://segmentfault.com/a/1190000009875015)

