---
title: 'vue-awesome-swiper滑块插件使用基础' 
date: 2019-01-09 2:30:11
hidden: true
slug: 0ornjtq0gz4a
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>目前(2017-07-11)在使用<code>vue-cli</code>建立的<code>webpack版</code>项目中，直接引入官方的<code>swiper</code>文件会导致报错，所以需要用到<code>vue版本的swiper</code>。</p>
<blockquote><p><code>webpack-simple版</code>可直接引入官方<code>swiper</code>文件，参考<a href="https://segmentfault.com/a/1190000010033481">这里</a></p></blockquote>
<h2 id="articleHeader1">新建vue项目</h2>
<blockquote><p>此处使用<code>vue-cli</code>新建项目</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack demo
//Enter + y 全部选 yes
cd demo
npm i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>vue init webpack demo
<span class="hljs-comment">//Enter + y 全部选 yes</span>
<span class="hljs-keyword">cd</span> demo
npm <span class="hljs-built_in">i</span></code></pre>
<h3 id="articleHeader2">补安装sass-loader node-sass</h3>
<blockquote><p>由于不明原因，<code>vue</code>的<code>webpack</code>版竟没有装<code>sass</code>，需要另外安装，不需要用<code>sass</code>则可跳过此步。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D sass-loader node-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm i -D sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre>
<h2 id="articleHeader3">安装vue版swiper</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -S vue-awesome-swiper" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -S vue-awesome-swiper</code></pre>
<h2 id="articleHeader4">配置使用</h2>
<blockquote><p>可参考 <a href="https://github.com/jaytanweb/vue-swiper-demo" rel="nofollow noreferrer" target="_blank">A simple vue-awesome-swiper demo</a></p></blockquote>
<h3 id="articleHeader5">import vue-awesome-swiper</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { swiper, swiperSlide } from 'vue-awesome-swiper'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { swiper, swiperSlide } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-swiper'</span></code></pre>
<h3 id="articleHeader6">插入滑块组件</h3>
<blockquote><p>与官方swiper相同，额外的控制器依然可以放到整个滑块之外。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<swiper :options=&quot;swiperOption&quot; ref=&quot;mySwiper&quot;>
 <!-- slides -->
 <swiper-slide>I'm Slide 1</swiper-slide>
 <swiper-slide>I'm Slide 2</swiper-slide>
 <swiper-slide>I'm Slide 3</swiper-slide>
 <!-- Optional controls -->
 <div class=&quot;swiper-pagination&quot;  slot=&quot;pagination&quot;></div>
 <div class=&quot;swiper-button-prev&quot; slot=&quot;button-prev&quot;></div>
 <div class=&quot;swiper-button-next&quot; slot=&quot;button-next&quot;></div>
 <div class=&quot;swiper-scrollbar&quot;   slot=&quot;scrollbar&quot;></div>
</swiper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"swiperOption"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"mySwiper"</span>&gt;</span>
 <span class="hljs-comment">&lt;!-- slides --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 1<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 2<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 3<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
 <span class="hljs-comment">&lt;!-- Optional controls --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-pagination"</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"pagination"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-button-prev"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"button-prev"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-button-next"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"button-next"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-scrollbar"</span>   <span class="hljs-attr">slot</span>=<span class="hljs-string">"scrollbar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span></code></pre>
<h3 id="articleHeader7">设置参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
 name: 'carrousel',
 data() {
   return {
     swiperOption: {
       // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
       notNextTick: true,
       // swiper configs 所有的配置同swiper官方api配置
       autoplay: 3000,
       prevButton:'.swiper-button-prev',
       nextButton:'.swiper-button-next',
     }
   }
 },
 components: {
 swiper,
 swiperSlide
},
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {
 name: <span class="hljs-string">'carrousel'</span>,
 <span class="hljs-keyword">data</span>() {
   <span class="hljs-keyword">return</span> {
     swiperOption: {
       <span class="hljs-comment">// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true</span>
       notNextTick: <span class="hljs-literal">true</span>,
       <span class="hljs-comment">// swiper configs 所有的配置同swiper官方api配置</span>
       autoplay: <span class="hljs-number">3000</span>,
       prevButton:<span class="hljs-string">'.swiper-button-prev'</span>,
       nextButton:<span class="hljs-string">'.swiper-button-next'</span>,
     }
   }
 },
 components: {
 swiper,
 swiperSlide
},
}
&lt;/script&gt;</code></pre>
<h3 id="articleHeader8">完整参考</h3>
<blockquote><p>demo.vue</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
...
<swiper :options=&quot;swiperOption&quot; ref=&quot;mySwiper&quot;>
 <!-- slides -->
 <swiper-slide>I'm Slide 1</swiper-slide>
 <swiper-slide>I'm Slide 2</swiper-slide>
 <swiper-slide>I'm Slide 3</swiper-slide>
 <!-- Optional controls -->
 <div class=&quot;swiper-pagination&quot;  slot=&quot;pagination&quot;></div>
 <div class=&quot;swiper-button-prev&quot; slot=&quot;button-prev&quot;></div>
 <div class=&quot;swiper-button-next&quot; slot=&quot;button-next&quot;></div>
 <div class=&quot;swiper-scrollbar&quot;   slot=&quot;scrollbar&quot;></div>
</swiper>
...
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
 name: 'carrousel',
 data() {
   return {
     swiperOption: {
       // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
       // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
       notNextTick: true,
       // swiper configs 所有的配置同swiper官方api配置
       autoplay: 3000,
       // direction : 'vertical',
       effect:&quot;coverflow&quot;,
       grabCursor : true,
       setWrapperSize :true,
       // autoHeight: true,
       // paginationType:&quot;bullets&quot;,
       pagination : '.swiper-pagination',
       paginationClickable :true,
       prevButton:'.swiper-button-prev',
       nextButton:'.swiper-button-next',
       // scrollbar:'.swiper-scrollbar',
       //mousewheelControl : true,
       observeParents:true,
       // if you need use plugins in the swiper, you can config in here like this
       // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
       // debugger: true,
       // swiper callbacks
       // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
       // onTransitionStart(swiper){
       //   console.log(swiper)
       // },
       // more Swiper configs and callbacks...
       // ...
     }
   }
 },
 components: {
 swiper,
 swiperSlide
},
 // you can find current swiper instance object like this, while the notNextTick property value must be true
 // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
 computed: {
   swiper() {
     return this.$refs.mySwiper.swiper
   }
 },
 mounted() {
   // you can use current swiper instance object to do something(swiper methods)
   // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
   // console.log('this is current swiper instance object', this.swiper)
   // this.swiper.slideTo(3, 1000, false)
    console.log('mounted');
 }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"swiperOption"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"mySwiper"</span>&gt;</span>
 <span class="hljs-comment">&lt;!-- slides --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 1<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 2<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 3<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
 <span class="hljs-comment">&lt;!-- Optional controls --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-pagination"</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"pagination"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-button-prev"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"button-prev"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-button-next"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"button-next"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-scrollbar"</span>   <span class="hljs-attr">slot</span>=<span class="hljs-string">"scrollbar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
...
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { swiper, swiperSlide } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-swiper'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
 <span class="hljs-attr">name</span>: <span class="hljs-string">'carrousel'</span>,
 data() {
   <span class="hljs-keyword">return</span> {
     <span class="hljs-attr">swiperOption</span>: {
       <span class="hljs-comment">// NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)</span>
       <span class="hljs-comment">// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true</span>
       notNextTick: <span class="hljs-literal">true</span>,
       <span class="hljs-comment">// swiper configs 所有的配置同swiper官方api配置</span>
       autoplay: <span class="hljs-number">3000</span>,
       <span class="hljs-comment">// direction : 'vertical',</span>
       effect:<span class="hljs-string">"coverflow"</span>,
       <span class="hljs-attr">grabCursor</span> : <span class="hljs-literal">true</span>,
       <span class="hljs-attr">setWrapperSize</span> :<span class="hljs-literal">true</span>,
       <span class="hljs-comment">// autoHeight: true,</span>
       <span class="hljs-comment">// paginationType:"bullets",</span>
       pagination : <span class="hljs-string">'.swiper-pagination'</span>,
       <span class="hljs-attr">paginationClickable</span> :<span class="hljs-literal">true</span>,
       <span class="hljs-attr">prevButton</span>:<span class="hljs-string">'.swiper-button-prev'</span>,
       <span class="hljs-attr">nextButton</span>:<span class="hljs-string">'.swiper-button-next'</span>,
       <span class="hljs-comment">// scrollbar:'.swiper-scrollbar',</span>
       <span class="hljs-comment">//mousewheelControl : true,</span>
       observeParents:<span class="hljs-literal">true</span>,
       <span class="hljs-comment">// if you need use plugins in the swiper, you can config in here like this</span>
       <span class="hljs-comment">// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger</span>
       <span class="hljs-comment">// debugger: true,</span>
       <span class="hljs-comment">// swiper callbacks</span>
       <span class="hljs-comment">// swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样</span>
       <span class="hljs-comment">// onTransitionStart(swiper){</span>
       <span class="hljs-comment">//   console.log(swiper)</span>
       <span class="hljs-comment">// },</span>
       <span class="hljs-comment">// more Swiper configs and callbacks...</span>
       <span class="hljs-comment">// ...</span>
     }
   }
 },
 <span class="hljs-attr">components</span>: {
 swiper,
 swiperSlide
},
 <span class="hljs-comment">// you can find current swiper instance object like this, while the notNextTick property value must be true</span>
 <span class="hljs-comment">// 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true</span>
 computed: {
   swiper() {
     <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$refs.mySwiper.swiper
   }
 },
 mounted() {
   <span class="hljs-comment">// you can use current swiper instance object to do something(swiper methods)</span>
   <span class="hljs-comment">// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了</span>
   <span class="hljs-comment">// console.log('this is current swiper instance object', this.swiper)</span>
   <span class="hljs-comment">// this.swiper.slideTo(3, 1000, false)</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'mounted'</span>);
 }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader9">附官方api</h2>
<p><a href="http://www.swiper.com.cn/api/pagination/2016/0126/299.html" rel="nofollow noreferrer" target="_blank">swiper官方api</a></p>
<h2 id="articleHeader10">vue版swiper项目地址</h2>
<p><a href="https://github.com/surmon-china/vue-awesome-swiper.git" rel="nofollow noreferrer" target="_blank">github地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-awesome-swiper滑块插件使用基础

## 原文链接
[https://segmentfault.com/a/1190000010142118](https://segmentfault.com/a/1190000010142118)

