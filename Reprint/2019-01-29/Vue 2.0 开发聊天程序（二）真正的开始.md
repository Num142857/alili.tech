---
title: 'Vue 2.0 开发聊天程序（二）真正的开始' 
date: 2019-01-29 2:30:10
hidden: true
slug: i2c3q591mbs
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>借我杀死庸碌的情怀，借我纵容的悲怆与哭喊</strong><br><strong>　　　　　　　　　　　　　　　　　　　- 谢知非</strong></p>
<p>上一节已经把架子搭好了，接下来就要开始真正的使用vue2.0进行开发了。废话不多说，先捞到几句(<em>^__^</em>) 。</p>
<ol>
<li><p>既然是SPA项目，先把路由搞定</p></li>
<li><p>既然是基于组件的开发，那组件怎么写，组件之间的通信是个大问题</p></li>
<li><p>肯定有一个主对象，来控制全局的公共参数、方法</p></li>
<li><p>websocket要怎么和vue完美结合</p></li>
<li><p>我没有服务器，后端怎么办？</p></li>
</ol>
<p>以上是我罗列出来的关键，接下来的开发都是基于这些观点的。</p>
<h2 id="articleHeader0">一、启动原理</h2>
<p>打开我们的src目录，能看到这样的结构：</p>
<p><span class="img-wrap"><img data-src="/img/bVHxkC?w=192&amp;h=193" src="https://static.alili.tech/img/bVHxkC?w=192&amp;h=193" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>很简单有木有，assets存放资源。components存放组件，也就是说我们的.vue文件就存放在这里，App.vue是我们挂载的组件，main.js是入口文件。</p>
<p><code>.vue</code> 文件是什么？</p>
<p>不得不说，.vue文件真的很像一个小盒子，它把一个组件的html，css，js都存放到了一起，就像一副扑克，非常的完整，拆开就能打斗地主，多拿两幅扑克可以玩升级，虽然我不玩。<br>App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <hello></hello>
  </div>
</template>

<script>
/*js是些什么鬼，看都看不懂*/
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/*js是些什么鬼，看都看不懂*/</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    Hello
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>除了js部分比较陌生，其他的都是old friend了。</p>
<h3 id="articleHeader1">先从入口文件说起....</h3>
<p>太简单了把，整个入口文件，引入了vue(这里是node_modules中的vue模块，也就是vue框架)，还有App(也就是App.vue)。new 了一个 Vue并传入了一个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'  // 没有加路径，会默认去node_modules找
import App from './App' // 没有加后缀会根据对应的名称匹配

/* eslint-disable no-new */
new Vue({
  el: '#app', // 挂载到id=app的element上 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例
  template: '<App/>', // 一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发 slot。
  components: { App } // 包含 Vue 实例可用组件的哈希表，这里只有一个App组件，也就是指App.vue
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>// The Vue build version to <span class="hljs-keyword">load</span> <span class="hljs-keyword">with</span> the <span class="hljs-string">`import`</span> command
// (runtime-<span class="hljs-keyword">only</span> <span class="hljs-keyword">or</span> <span class="hljs-keyword">standalone</span>) has been <span class="hljs-keyword">set</span> <span class="hljs-keyword">in</span> webpack.base.conf <span class="hljs-keyword">with</span> an alias.
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>  // 没有加路径，会默认去node_modules找
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span> // 没有加后缀会根据对应的名称匹配

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>, // 挂载到<span class="hljs-keyword">id</span>=app的<span class="hljs-keyword">element</span>上 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>, // 一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发 slot。
  components: { App } // 包含 Vue 实例可用组件的哈希表，这里只有一个App组件，也就是指App.vue
})</code></pre>
<p>上面的注释其实都是从vue官网扒下来的...<a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/</a><br>关于更详细的vue教程，请以官网为准。</p>
<p>根据上面的内容，我们很容易就能得出这样的启动原理：<strong>根据引入的vue模块和APP.vue,创建一个挂载到id为app的元素上面的对象，并配置了tempate和components属性。然后根据配置对document进行渲染。</strong></p>
<p>原理看似很简单，但是vue做了大量的工作。</p>
<h2 id="articleHeader2">二、组件的使用</h2>
<p>还是看我们的App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <hello></hello> // 类似angular中的自定义指令
  </div>
</template>

<script>
import Hello from './components/Hello' // 引入了Hello.vue

export default {
  name: 'app', // 给组件指定名字
  components: { // 包含 Vue 实例可用组件的哈希表 和main.js中的用法一样
    Hello // 将导入的hello组件赋给对象，这样在渲染dom的时候遇到<hello>就将Hello.vue中的tamplate替换
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span> // 类似angular中的自定义指令
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello'</span> <span class="hljs-comment">// 引入了Hello.vue</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>, <span class="hljs-comment">// 给组件指定名字</span>
  components: { <span class="hljs-comment">// 包含 Vue 实例可用组件的哈希表 和main.js中的用法一样</span>
    Hello <span class="hljs-comment">// 将导入的hello组件赋给对象，这样在渲染dom的时候遇到&lt;hello&gt;就将Hello.vue中的tamplate替换</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p><strong>export default</strong> ？</p>
<p><span class="img-wrap"><img data-src="/img/bVHxI9?w=440&amp;h=388" src="https://static.alili.tech/img/bVHxI9?w=440&amp;h=388" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这是ES6的语法，使用关键字default，可将对象标注为default对象导出。default关键字在每一个模块中只能使用一次。它既可以用于内联导出，也可以用于一组对象导出声明中。也就是将default后面跟着的对象当作default对象导出。</p>
<p>default导出的对象(可以看作是组件对象)属性有很多，官网上都有非常详细的解释。<a href="http://cn.vuejs.org/v2/api/#components" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/v2/api/#c...</a></p>
<p>根据main.js和App.js可以得到这样的一个层级关系：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.comenonts ==> { App } ===> App.conenonts ==> { Hello }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">    Vue<span class="hljs-selector-class">.comenonts</span> ==&gt; { App } ===&gt; App<span class="hljs-selector-class">.conenonts</span> ==&gt; { Hello }</code></pre>
<p>看上去貌似就是定义了组件的包含关系呢。这样的话不是很简单？写一个组件测试下：</p>
<p>Test.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
 <!--最外层只能有一个标签 -->
  <div class=&quot;test&quot;>
   <p>我是全英雄联盟最骚的骚猪</p>
   <p></p> 
  </div>
  <!-- <div>加了我会报错</div> -->
</template>

<script>
export default {
  name: 'test'
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-comment">&lt;!--最外层只能有一个标签 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是全英雄联盟最骚的骚猪<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> 
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- &lt;div&gt;加了我会报错&lt;/div&gt; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>然后在App.vue中引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <hello></hello>
<!-- 这里加上对应的标签  注意名字不能和html原有的标签重复 -->
    <test></test>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Test from './components/Test'  // 这里引入Test组件

export default {
  name: 'app',
  components: {
    Hello,
    Test // 在components中添加Test
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 这里加上对应的标签  注意名字不能和html原有的标签重复 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">test</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">test</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello'</span>
<span class="hljs-keyword">import</span> Test <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Test'</span>  <span class="hljs-comment">// 这里引入Test组件</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    Hello,
    Test <span class="hljs-comment">// 在components中添加Test</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>然后在浏览器打开：</p>
<p><span class="img-wrap"><img data-src="/img/bVHydF?w=607&amp;h=714" src="https://static.alili.tech/img/bVHydF?w=607&amp;h=714" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>红色的字就是我们的<strong>Test.vue</strong>组件的内容了。</p>
<h2 id="articleHeader3">三、增加路由</h2>
<p>需要在页面显示一个组件，像上面那样添加上去就好了，那想切换组件的显示呢？当然是用路由了。vue提供了一个vue-router的插件，用来实现路由之间的转换。关于这个插件的文档在这里：<a href="http://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn/</a></p>
<p>首先，先增加我们的路由插件。在根目录下安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-router <span class="hljs-comment">--save</span></code></pre>
<p>--save代表将在你的package.json中添加对应的依赖。<br>安装成功会看到如下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="C:\Users\59227\Desktop\x-chat>npm install vue-router --save
x-chat@1.0.0 C:\Users\59227\Desktop\x-chat
`-- vue-router@2.1.1

npm WARN optional Skipping failed optional dependency /chokidar/fsevents:
npm WARN notsup Not compatible with your operating system or architecture: fsevents@1.0.15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">C</span>:\Users\<span class="hljs-number">59227</span>\Desktop\x-chat&gt;npm install vue-router --save
x-chat<span class="hljs-variable">@1</span>.<span class="hljs-number">0.0</span> <span class="hljs-attribute">C</span>:\Users\<span class="hljs-number">59227</span>\Desktop\x-chat
`-- vue-router<span class="hljs-variable">@2</span>.<span class="hljs-number">1.1</span>

npm WARN optional Skipping failed optional dependency /chokidar/<span class="hljs-attribute">fsevents</span>:
npm WARN notsup Not compatible with your operating system or <span class="hljs-attribute">architecture</span>: fsevents<span class="hljs-variable">@1</span>.<span class="hljs-number">0.15</span></code></pre>
<p>然后在入口文件main.js中引用:</p>
<p>官网上的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中&quot;component&quot; 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)</span>

<span class="hljs-comment">// 1. 定义（路由）组件。</span>
<span class="hljs-comment">// 可以从其他文件 import 进来</span>
<span class="hljs-keyword">const</span> Foo = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;foo&lt;/div&gt;'</span> }
<span class="hljs-keyword">const</span> Bar = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;bar&lt;/div&gt;'</span> }

<span class="hljs-comment">// 2. 定义路由</span>
<span class="hljs-comment">// 每个路由应该映射一个组件。 其中"component" 可以是</span>
<span class="hljs-comment">// 通过 Vue.extend() 创建的组件构造器，</span>
<span class="hljs-comment">// 或者，只是一个组件配置对象。</span>
<span class="hljs-comment">// 我们晚点再讨论嵌套路由。</span>
<span class="hljs-keyword">const</span> routes = [
  { path: <span class="hljs-string">'/foo'</span>, component: Foo },
  { path: <span class="hljs-string">'/bar'</span>, component: Bar }
]

<span class="hljs-comment">// 3. 创建 router 实例，然后传 `routes` 配置</span>
<span class="hljs-comment">// 你还可以传别的配置参数, 不过先这么简单着吧。</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes <span class="hljs-comment">// （缩写）相当于 routes: routes</span>
})

<span class="hljs-comment">// 4. 创建和挂载根实例。</span>
<span class="hljs-comment">// 记得要通过 router 配置参数注入路由，</span>
<span class="hljs-comment">// 从而让整个应用都有路由功能</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  router
}).$mount(<span class="hljs-string">'#app'</span>)

<span class="hljs-comment">// 现在，应用已经启动了！</span></code></pre>
<p>我自己写的main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import Apart from  './components/Apart' // 新创建的组件
import Bpart from  './components/Bpart' // 新创建的组件
import VueRouter from 'vue-router' // 引入vue-router模块

Vue.use(VueRouter) // 安装 Vue.js 插件
/* 创建一个组件 并指定组件的template属性，类似穿件一个 const为ES6语法，标识声明一个不可改变的变量 */
const Error = {template: '<p style=&quot;color: red&quot;>is Error!!</p>'}

const routes = [  //创建一个路由数组
    {
        path: '/',
        component: Apart //将组件Apart作为路由‘/’下显示的组件
    },
    {
        path: '/bb',
        component: Bpart 
    },
    {
        path: '*', // ‘*’代表在上面的路由中查找不到就默认显示‘*’路由的内容，必须放在最后，不然在‘*’之后的路由都不起作用
        component: Error
    }
]

const router = new VueRouter({ routes }) //创建一个router对象
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 将router对象传给vue，这样就可以通过this.$router获取到router对象了
  template: '<App/>', 
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> Apart <span class="hljs-keyword">from</span>  <span class="hljs-string">'./components/Apart'</span> <span class="hljs-comment">// 新创建的组件</span>
<span class="hljs-keyword">import</span> Bpart <span class="hljs-keyword">from</span>  <span class="hljs-string">'./components/Bpart'</span> <span class="hljs-comment">// 新创建的组件</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span> <span class="hljs-comment">// 引入vue-router模块</span>

Vue.use(VueRouter) <span class="hljs-comment">// 安装 Vue.js 插件</span>
<span class="hljs-comment">/* 创建一个组件 并指定组件的template属性，类似穿件一个 const为ES6语法，标识声明一个不可改变的变量 */</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">Error</span> = {<span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p style="color: red"&gt;is Error!!&lt;/p&gt;'</span>}

<span class="hljs-keyword">const</span> routes = [  <span class="hljs-comment">//创建一个路由数组</span>
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">component</span>: Apart <span class="hljs-comment">//将组件Apart作为路由‘/’下显示的组件</span>
    },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/bb'</span>,
        <span class="hljs-attr">component</span>: Bpart 
    },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-comment">// ‘*’代表在上面的路由中查找不到就默认显示‘*’路由的内容，必须放在最后，不然在‘*’之后的路由都不起作用</span>
        component: <span class="hljs-built_in">Error</span>
    }
]

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({ routes }) <span class="hljs-comment">//创建一个router对象</span>
<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router, <span class="hljs-comment">// 将router对象传给vue，这样就可以通过this.$router获取到router对象了</span>
  template: <span class="hljs-string">'&lt;App/&gt;'</span>, 
  <span class="hljs-attr">components</span>: { App }
})
</code></pre>
<p>新建的组件：</p>
<p>Apart.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <p>我是Apart</p>
        <!-- 类似anguar的ng-click，用于绑定事件监听 -->
        <a v-on:click=&quot;goPage&quot;>点我切换</a>
    </div>
</template>

<script>
export default {
  name: 'test',
  methods: { // methods参数用来声明组件下的方法
      goPage: function () {
/*push方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。*/
          this.$router.push('/bb')
      }
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
div {
    width: 100%;
    height: 100px;
    background-color: green;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是Apart<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 类似anguar的ng-click，用于绑定事件监听 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"goPage"</span>&gt;</span>点我切换<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">methods</span>: { <span class="hljs-comment">// methods参数用来声明组件下的方法</span>
      goPage: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-comment">/*push方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。*/</span>
          <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/bb'</span>)
      }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: green;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>Bpart.vue：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <p>我是Bpart</p>
        <a v-on:click=&quot;goPage&quot;>点我切换</a>
    </div>
</template>

<script>
export default {
  name: 'test',
  methods: {
      goPage: function () {
          this.$router.push('/')
      }
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
p {
  color: red;
}
div {
    width: 100%;
    height: 100px;
    background-color: yellow;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我是Bpart<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"goPage"</span>&gt;</span>点我切换<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">methods</span>: {
      <span class="hljs-attr">goPage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
      }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span> {
  <span class="hljs-attribute">color</span>: red;
}
<span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-color</span>: yellow;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>然后修改我们的App.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
    <test></test>
    <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Test from './components/Test'  // 这里引入Test组件

export default {
  name: 'app',
  components: {
    Test // 在components中添加Test
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">test</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">test</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 路由出口 --&gt;</span>
  <span class="hljs-comment">&lt;!-- 路由匹配到的组件将渲染在这里 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Test <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Test'</span>  <span class="hljs-comment">// 这里引入Test组件</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    Test <span class="hljs-comment">// 在components中添加Test</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#app</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Avenir'</span>, Helvetica, Arial, sans-serif;
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2c3e50</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>完成以上步骤之后，在cmd输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>打开浏览器就可以看到如下效果了：<br><span class="img-wrap"><img data-src="/img/bVHyyd?w=930&amp;h=630" src="https://static.alili.tech/img/bVHyyd?w=930&amp;h=630" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>很完美，路由功能撸好了。还有嵌套路由又该怎么做呢？官网上有很详细的例子，对着官网撸，绝对能搞得很完美。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 开发聊天程序（二）真正的开始

## 原文链接
[https://segmentfault.com/a/1190000007958583](https://segmentfault.com/a/1190000007958583)

