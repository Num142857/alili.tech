---
title: 'node-vue前后端分离记录' 
date: 2018-12-22 2:30:11
hidden: true
slug: bkroq5dk27e
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">node vue项目开发</h2>
<p>看了近一周的vue开发，有诸多感触，我之前接触过react、angular所以特别想学学久仰大名的vue。学习半天以后发现，接触到的东西多了，学习起来就是容易很多，vue的指令我能个联想到angular的指令，vue组件化设计类似于react的组件化设计，包括一些router的设置跟react里的路由或者nodejs里的路由都差不多，vuex更是根据redux、flux改写的，虽然我还搞不太明白怎么用，至于vue的模板渲染，跟expres渲染ejs没有太大的区别。使用vue可以完全脱离jq，虽然我还没感受到不用jq有什么神奇的赶脚，但是我觉得这种双向数据绑定的还是挺方便的，此文档用来记录我学习vue的一些新的知识和想法。</p>
<h3 id="articleHeader1">指令</h3>
<ol>
<li>
<code>v-bind</code> 主要用于动态绑定DOM元素属性，即元素属性实际的值是 有vm实例中的data属性提供的。</li>
<li>
<code>v-model</code> 主要对表单元素进行双向数据绑定，在修改表单元素的值时，实例vm中对应的vm对应的属性也同时更新。</li>
<li>
<p><code>v-if</code>,<code>v-show</code>,<code>v-else</code>这几个指令来说明模板和数据间的逻辑关系</p>
<ul>
<li>v-if和v-else的作用是根据数值来判断是否输出该dom元素，以及包含的子元素。<br>  eg:<br><code>&lt;div v-if="yes"&gt;yes&lt;/div&gt;</code> 当vm实例中的data.yes=true时，模板引擎会编   译这个dom节点，输出      <code>&lt;div&gt;yes&lt;/div&gt;</code>值得注意的是：v-else要紧跟v-if否则不起作用。</li>
<li>
<code>v-show</code>与<code>v-if</code>的效果差不多，都是通过判断真假显示内容，唯一不同的是，v-show不显示的时候是<code>display:none</code>,也就是保留了dom节点，但是v-if不会。</li>
</ul>
</li>
<li>
<code>v-for</code> 用于列表渲染，可以循环遍历数组和对象,注意<code>v-for="b in 10"</code>目前指的是1-10的迭代</li>
<li>
<code>v-on</code> 事件绑定，简写<code>@:</code>
</li>
<li>
<code>v-text</code> <code>&lt;p v-text="msg"&gt;&lt;p&gt;</code>相当于innerText,与"{{"msg"}}"相比，避免了闪现的问题。</li>
<li>
<code>v-HTML</code> 类似于innerHTML,也可以避免闪现</li>
<li>
<code>v-el</code> 这个指令相当于给dom元素添加了个索引，例如<code>&lt;div v-el="demo"&gt;this is a test &lt;/div&gt;</code>,如果想获取当前dom里的值,可以<code>vm.$els.demo.innerText</code>,注意：html不区分大小写，驼峰式的写法会自动转成小写，可以通过<code>-</code>的方式转换成大写。</li>
<li>
<code>v-ref</code>  与<code>v-el</code>类似 通过<code>vim.$refs</code>访问</li>
<li>
<code>v-pre</code> 跳过编译这个元素</li>
<li>
<code>v-cloak</code> 感觉没啥用</li>
<li>
<code>v-once</code>新增内置指令，用于标明元素或组件只渲染一次。</li>
</ol>
<h3 id="articleHeader2">模板渲染</h3>
<ol>
<li>
<p><code>v-for</code> 主要用于列表渲染，讲根据接受到的数组重复渲染v-for绑定到的dom元素及内部子元素，并可以通过设置别名的方式，获取数组内数据渲染到节点中。<br>  eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ul v-for=&quot;item in items&quot;>
      <li>"{{"item.title"}}"</li>
      <li>"{{"item.description"}}"</li>
    </ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.description"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
</li>
<li>
<code>v-for</code>在vue1.x内置<code>$index</code>变量，在vue.2x移除了此变量，直接使用<code>"{{"index"}}"</code>,例如<code>&lt;li v-for="(item,index) in items"&gt;"{{"index"}}"&lt;/li&gt;</code>
</li>
<li>
<p>修改数据</p>
<ul>
<li>直接修改数组可以改变数据</li>
<li>
<p>不能直接改变数组的情况</p>
<ul>
<li>1.vm.items[0]={},这种情况下无法修改，解决：<code>vm.item.$set(0,{})</code>或者<code>vm.$set('item[0]',{})</code>
</li>
<li>2.vm.item.length=0</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code>v-for</code>遍历对象，可以使用<code>（key,value）</code>的形式自定义key变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;(key,value)&quot; in objectDemo>
   "{{"key"}}":"{{"vue"}}"
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;<span class="hljs-built_in">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(key,value)"</span> <span class="hljs-keyword">in</span> objectDemo&gt;
   "{{"<span class="hljs-built_in">key</span>"}}":"{{"vue"}}"
&lt;/<span class="hljs-built_in">li</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意：在vue1.x内置`$key`变量，在vue.2x移除了此变量，直接使用`"{{"key"}}"`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">注意：在vue1.x内置`$key`变量，在vue<span class="hljs-number">.2</span>x移除了此变量，直接使用`"{{"key"}}"`</code></pre>
</li>
<li>template标签</li>
</ol>
<p>用来作为模板渲染的跟节点，但是渲染出来不存在此节点</p>
<h3 id="articleHeader3">事件绑定与监听</h3>
<p><code>v-on</code>可以绑定实例属性methods中的方法作为事件的处理器，<code>v-on:</code>后面可以接受所有的原生事件名称。</p>
<ul>
<li>简写 <code>@:</code>
</li>
<li>可以绑定methods函数，也支持内联js，但是仅限一个语句。</li>
<li>绑定methods函数和内联js都可以获取原生dom元素，event.</li>
<li>绑定多个事件时，为顺序执行。</li>
</ul>
<h3 id="articleHeader4">ui组件 <a href="http://element.eleme.io" rel="nofollow noreferrer" target="_blank">饿了吗</a>
</h3>
<h4>使用指南</h4>
<ol><li>安装</li></ol>
<blockquote>npm install cnpm install element-ui --save-dev</blockquote>
<ol><li>引入文件main.js</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'small' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-chalk/index.css'</span>
Vue.use(ElementUI, { <span class="hljs-keyword">size</span>: <span class="hljs-string">'small'</span> })</code></pre>
<ol><li>
<p>使用</p>
<ul>
<li>在components文件夹下新建一个页面，从<a href="http://element.eleme.io" rel="nofollow noreferrer" target="_blank">饿了吗</a>找到自己喜欢的组件，比如走马灯 Carousel.vue 把代码复制到这个页面</li>
<li>在需要的此组件的文件下，比如APP.vue里</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Carousel from './components/Carousel'
export default {
  name: 'app',
  components: {  //components加s
    Carousel: Carousel
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Carousel <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Carousel'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {  <span class="hljs-comment">//components加s</span>
    Carousel: Carousel
  }
}</code></pre>
<ul><li>在模板里载入组件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div id=&quot;app&quot;>
  <Carousel></Carousel>
  <img src=&quot;./assets/logo.png&quot;>
  <router-view/>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Carousel</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Carousel</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<ul><li>这样就可运行了</li></ul>
</li></ol>
<h3 id="articleHeader5">自定义组件</h3>
<p>例如我想在加一个导航组件名字叫做<code>headerBar</code>,我在components里加一个文件叫做<code>headerBar.vue</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <h2>这是一个导航</h2>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>这是一个导航<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>使用：<br>在App.vue中需要先导入这个组件，再注册这个组件，最后使用它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div id=&quot;app&quot;>
  <headerBar></headerBar>
  //以标签形式使用，注意：避免使用原生html的标签
  <img src=&quot;./assets/logo.png&quot;>
  <router-view/>
</div>
</template>

<script>
import headerBar from './components/headerBar.vue'  //导入组件
export default {
  name: 'app',
  components: {
    headerBar: headerBar  //注册组件
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">headerBar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">headerBar</span>&gt;</span>
  //以标签形式使用，注意：避免使用原生html的标签
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> headerBar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/headerBar.vue'</span>  <span class="hljs-comment">//导入组件</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    <span class="hljs-attr">headerBar</span>: headerBar  <span class="hljs-comment">//注册组件</span>
  }
}</span></code></pre>
<h3 id="articleHeader6">前后端分离</h3>
<p>习惯了用node做全栈开发,现在用vue-webpack做前端开发，node做后端开发也挺爽的，前后端实现了分离。</p>
<ol><li>启动后端接口</li></ol>
<blockquote>cd back<br>cnpm install<br>npm run dev</blockquote>
<ol><li>启动前端服务器</li></ol>
<blockquote>cd front<br>cnpm install<br>npm start</blockquote>
<ol><li>进入登录页面，点击登录，控制台打印访问成功的信息,并成功跳转到helloworld页面</li></ol>
<h3 id="articleHeader7">前后端通信</h3>
<ol>
<li>
<p>vue-resource</p>
<ul>
<li>
<p>安装vue-resource 并在main.js中引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueResource from 'vue-resource'
Vue.use(VueResource)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
Vue.use(VueResource)</code></pre>
</li>
<li>在config/index.js 配置 proxyTable代理服务器</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api/**': {
    target: 'http://localhost:3000',
    pathRewrite: {
      '^/api': '/api'
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/api/**'</span>: {
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://localhost:3000'</span>,
    <span class="hljs-attribute">pathRewrite</span>: {
      <span class="hljs-string">'^/api'</span>: <span class="hljs-string">'/api'</span>
    }
  }
}</code></pre>
<ul><li>使用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.get('api/apptest')
       .then((response) => {
         // 响应成功回调
         console.log(response)
       }).catch(e => {
             // 打印一下错误
         console.log(e)
       })
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'api/apptest'</span>)
       .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
         <span class="hljs-comment">// 响应成功回调</span>
         <span class="hljs-built_in">console</span>.log(response)
       }).catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
             <span class="hljs-comment">// 打印一下错误</span>
         <span class="hljs-built_in">console</span>.log(e)
       })
   }</code></pre>
<ul><li>缺点：在开发环境下没有问题，但是在生产环境下请求后端接口不成功</li></ul>
</li>
<li>
<p>axios</p>
<ul><li>首先配置axios,在src下新建一个http.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from ‘axios'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">import</span> axios from ‘axios<span class="hljs-string">'
axios.defaults.timeout = 5000
axios.defaults.baseURL = '</span>http:<span class="hljs-comment">//localhost:3000'</span>
axios.defaults.headers.post[<span class="hljs-string">'Content-Type'</span>] = <span class="hljs-string">'application/x-www-form-urlencoded'</span>
export <span class="hljs-keyword">default</span> axios</code></pre>
<ul><li>在main.js中引入</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from './http'
Vue.prototype.axios = axios
new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> axios from <span class="hljs-string">'./http'</span>
Vue.prototype.axios = axios
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  axios,
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<ul><li>使用</li></ul>
</li>
</ol>
<p>get方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="login () {
  // 获取已有账号密码
  this.axios.get('/apptest')
    .then((response) => {
      // 响应成功回调
      console.log(response)
      // this.$router.go({name: 'main'})// 不管用
      this.$router.push({name: 'HelloWorld'})
    }).catch(e => {
      // 打印一下错误
      console.log(e)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>login () {
  <span class="hljs-comment">// 获取已有账号密码</span>
  <span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">'/apptest'</span>)
    .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      <span class="hljs-comment">// 响应成功回调</span>
      <span class="hljs-built_in">console</span>.log(response)
      <span class="hljs-comment">// this.$router.go({name: 'main'})// 不管用</span>
      <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>})
    }).catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
      <span class="hljs-comment">// 打印一下错误</span>
      <span class="hljs-built_in">console</span>.log(e)
    })
}</code></pre>
<p>post方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="register () {
  console.log(this)
  // 获取已有账号密码
  let params = {
    user: this.userinfo.account,
    password: this.userinfo.password,
    directionId: this.userinfo.directionId
  }
  this.axios.post('/signup', params)
    .then((response) => {
      // 响应成功回调
      console.log(response)
    }).catch(e => {
      // 打印一下错误
      console.log(e)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>register () {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)
  <span class="hljs-comment">// 获取已有账号密码</span>
  <span class="hljs-keyword">let</span> params = {
    <span class="hljs-attr">user</span>: <span class="hljs-keyword">this</span>.userinfo.account,
    <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.userinfo.password,
    <span class="hljs-attr">directionId</span>: <span class="hljs-keyword">this</span>.userinfo.directionId
  }
  <span class="hljs-keyword">this</span>.axios.post(<span class="hljs-string">'/signup'</span>, params)
    .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      <span class="hljs-comment">// 响应成功回调</span>
      <span class="hljs-built_in">console</span>.log(response)
    }).catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
      <span class="hljs-comment">// 打印一下错误</span>
      <span class="hljs-built_in">console</span>.log(e)
    })
}</code></pre>
<h3 id="articleHeader8">生产环境路径问题</h3>
<p>在生产环境下发现打包以后路径不对，修改config下的index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build: {
  // Template for index.html
  index: path.resolve(__dirname, '../dist/index.html'),

  // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: './',  //原来是 assetsPublicPath: '/'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">build</span>: {
  <span class="hljs-comment">// Template for index.html</span>
  <span class="hljs-attribute">index</span>: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),

  <span class="hljs-comment">// Paths</span>
  <span class="hljs-attribute">assetsRoot</span>: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
  <span class="hljs-attribute">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
  <span class="hljs-attribute">assetsPublicPath</span>: <span class="hljs-string">'./'</span>,  <span class="hljs-comment">//原来是 assetsPublicPath: '/'</span></code></pre>
<p>源码位置 <a href="https://gitee.com/react-module/node-vue" rel="nofollow noreferrer" target="_blank">https://gitee.com/react-modul...</a></p>
<h2 id="articleHeader9">遇到的问题</h2>
<ol><li>
<code>vue.esm.js?dcc1:574 [Vue warn]: Do not use built-in or reserved HTML elements as component id: Header</code><br>原因：因为header在HTML5里面是个原生的标签，所以在开发的时候会提示错误。    <br>解决方法：修改components里面左边的header名称</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node-vue前后端分离记录

## 原文链接
[https://segmentfault.com/a/1190000012400755](https://segmentfault.com/a/1190000012400755)

