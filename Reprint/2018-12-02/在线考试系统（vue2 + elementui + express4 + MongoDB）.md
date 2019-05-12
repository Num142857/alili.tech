---
title: '在线考试系统（vue2 + elementui + express4 + MongoDB）' 
date: 2018-12-02 2:30:15
hidden: true
slug: 2v66gs6dz1s
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这是我毕业项目，从0到1，前后台独立开发完成。功能不多，在此记录,温故而知新！项目github地址:<a href="https://github.com/FinGet/Exam" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/FinGet/Exam" rel="nofollow noreferrer" target="_blank">https://github.com/FinGet/Exam</a> ，博客地址：<a href="https://finget.github.io/" rel="nofollow noreferrer" target="_blank"></a><a href="https://finget.github.io/" rel="nofollow noreferrer" target="_blank">https://finget.github.io/</a>
</blockquote>
<hr>
<blockquote>更新记录：2018-4-9，md5加密</blockquote>
<h2 id="articleHeader0">安装mongodb</h2>
<p>window下安装mongodb，需要参考的可以移步我的博客中：<a href="https://finget.github.io/2018/05/05/win-mongodb/" rel="nofollow noreferrer" target="_blank">win10安装mongodb</a></p>
<h2 id="articleHeader1">项目初始化</h2>
<p>本次项目使用的是express4 + vue2+ + elementUI1+ + mongodb3.4+</p>
<p>先看项目文件目录结构：<br><span class="img-wrap"><img data-src="/img/remote/1460000014737443?w=165&amp;h=668" src="https://static.alili.tech/img/remote/1460000014737443?w=165&amp;h=668" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>我页面用的vue所以<code>server/views</code>和<code>server/public</code>都没有用</blockquote>
<ul>
<li>项目建立用的是vue-cli:<br><code>vue init webpack exam</code>
</li>
<li>
<p>项目中前后台是写在一个项目中的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm i -g express-generator
 // 在项目文件根目录下
 express server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> npm i -g express-generator
 <span class="hljs-comment">// 在项目文件根目录下</span>
 express server</code></pre>
</li>
</ul>
<p>由于前后台都是写在一个项目中的，我就将<code>server</code>下的<code>package.json</code>和<code>vue</code>下的<code>package.json</code>合并了<br><span class="img-wrap"><img data-src="/img/remote/1460000014737444?w=555&amp;h=723" src="https://static.alili.tech/img/remote/1460000014737444?w=555&amp;h=723" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">安装一些插件</h3>
<h4>axios 请求数据</h4>
<p><code>npm i axios --save</code><br>首先axios不支持vue.use()式声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在main.js中如下声明使用
import axios from 'axios';
Vue.prototype.$axios=axios;
// 那么在其他vue组件中就可以this.$axios调用使用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在main.js中如下声明使用</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
Vue.prototype.$axios=axios;
<span class="hljs-comment">// 那么在其他vue组件中就可以this.$axios调用使用</span></code></pre>
<h4>elementUI</h4>
<p><code>npm i element-ui --save</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ElementUI from 'element-ui' // 加载ElementUI
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI) // 全局使用elementUI" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span> <span class="hljs-comment">// 加载ElementUI</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
Vue.use(ElementUI) <span class="hljs-comment">// 全局使用elementUI</span></code></pre>
<h4>vue-lazyload 图片懒加载</h4>
<p><code>npm i vue-lazyload --save</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, { // 全局使用图片懒加载
  loading: 'static/loading-svg/loading-bars.svg', // 图片还没加载时的svg图片
  try: 1 // default 1
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> VueLazyLoad <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-lazyload'</span>
Vue.use(VueLazyLoad, { <span class="hljs-comment">// 全局使用图片懒加载</span>
  loading: <span class="hljs-string">'static/loading-svg/loading-bars.svg'</span>, <span class="hljs-comment">// 图片还没加载时的svg图片</span>
  <span class="hljs-keyword">try</span>: <span class="hljs-number">1</span> <span class="hljs-comment">// default 1</span>
})</code></pre>
<p>使用懒加载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img width=&quot;300&quot; height=&quot;53&quot; v-lazy=&quot;logoSrc&quot; alt=&quot;&quot;>
logoSrc:require('../common/img/logo.png')
// 不能写成：<img width=&quot;300&quot; height=&quot;53&quot; v-lazy=&quot;../common/img/logo.png&quot; alt=&quot;&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;img width=<span class="hljs-string">"300"</span> height=<span class="hljs-string">"53"</span> v-lazy=<span class="hljs-string">"logoSrc"</span> alt=<span class="hljs-string">""</span>&gt;
logoSrc:<span class="hljs-built_in">require</span>(<span class="hljs-string">'../common/img/logo.png'</span>)
<span class="hljs-comment">// 不能写成：&lt;img width="300" height="53" v-lazy="../common/img/logo.png" alt=""&gt;</span></code></pre>
<h4>mongoose 操作mongodb的</h4>
<p><code>npm i mongoose --save</code></p>
<blockquote>就不一一列举所有的插件了（没有用vuex）</blockquote>
<h2 id="articleHeader3">开发上的一些事</h2>
<h3 id="articleHeader4">前台相关</h3>
<h4>sessionStorage</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// commonFun.js
//获取sessionStorage
function getSessionStorage(key, format) {
  var data;
  if (sessionStorage.getItem(key)) {
    if (format == 'json') {
      data = JSON.parse(sessionStorage.getItem(key));
    } else {
      data = sessionStorage.getItem(key);
    }
  } else {
    data = false
  }
  return data;
}
//写入sessionStorage
function setSessionStorage(key, content, format) {
  var data;
  if (format == 'json') {
    data = JSON.stringify(content);
  } else {
    data = content;
  }
  sessionStorage.setItem(key, data);
}
export var mySessionStorage = {
  get: getSessionStorage,
  set: setSessionStorage
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// commonFun.js</span>
<span class="hljs-comment">//获取sessionStorage</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSessionStorage</span>(<span class="hljs-params">key, format</span>) </span>{
  <span class="hljs-keyword">var</span> data;
  <span class="hljs-keyword">if</span> (sessionStorage.getItem(key)) {
    <span class="hljs-keyword">if</span> (format == <span class="hljs-string">'json'</span>) {
      data = <span class="hljs-built_in">JSON</span>.parse(sessionStorage.getItem(key));
    } <span class="hljs-keyword">else</span> {
      data = sessionStorage.getItem(key);
    }
  } <span class="hljs-keyword">else</span> {
    data = <span class="hljs-literal">false</span>
  }
  <span class="hljs-keyword">return</span> data;
}
<span class="hljs-comment">//写入sessionStorage</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setSessionStorage</span>(<span class="hljs-params">key, content, format</span>) </span>{
  <span class="hljs-keyword">var</span> data;
  <span class="hljs-keyword">if</span> (format == <span class="hljs-string">'json'</span>) {
    data = <span class="hljs-built_in">JSON</span>.stringify(content);
  } <span class="hljs-keyword">else</span> {
    data = content;
  }
  sessionStorage.setItem(key, data);
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> mySessionStorage = {
  <span class="hljs-attr">get</span>: getSessionStorage,
  <span class="hljs-attr">set</span>: setSessionStorage
}</code></pre>
<p>全局挂载</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import * as commonFun from './common/js/commonFun.js'
Vue.prototype.$mySessionStorage = commonFun.mySessionStorage;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> commonFun <span class="hljs-keyword">from</span> <span class="hljs-string">'./common/js/commonFun.js'</span>
Vue.prototype.$mySessionStorage = commonFun.mySessionStorage;</code></pre>
<p>在页面中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$mySessionStorage.set(key,content,format);
this.$mySessionStorage.get(key);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.$mySessionStorage.set(key,content,format);
<span class="hljs-keyword">this</span>.$mySessionStorage.get(key);</code></pre>
<h4>登录检测</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
// 登录判断
router.beforeEach((to, from, next) => {
  var userdata = getUserData();
  if (to.path != '/managelogin'&amp;&amp;to.name!='404'&amp;&amp;to.path != '/'&amp;&amp;to.path != &quot;/frontregister&quot;&amp;&amp;to.path!='/manageregister') {  // 判断是否登录
    if(!userdata.userName){
      ElementUI.Message.error('抱歉，您还没有登录！');
      if(to.path.indexOf('front')>0){
        router.push({path:'/'});
      } else {
        router.push({path:'/managelogin'});
      }
    } else {
      next();
    }
  }
  else {
    next();
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// main.js</span>
<span class="hljs-comment">// 登录判断</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">var</span> userdata = getUserData();
  <span class="hljs-keyword">if</span> (to.path != <span class="hljs-string">'/managelogin'</span>&amp;&amp;to.name!=<span class="hljs-string">'404'</span>&amp;&amp;to.path != <span class="hljs-string">'/'</span>&amp;&amp;to.path != <span class="hljs-string">"/frontregister"</span>&amp;&amp;to.path!=<span class="hljs-string">'/manageregister'</span>) {  <span class="hljs-comment">// 判断是否登录</span>
    <span class="hljs-keyword">if</span>(!userdata.userName){
      ElementUI.Message.error(<span class="hljs-string">'抱歉，您还没有登录！'</span>);
      <span class="hljs-keyword">if</span>(to.path.indexOf(<span class="hljs-string">'front'</span>)&gt;<span class="hljs-number">0</span>){
        router.push({<span class="hljs-attr">path</span>:<span class="hljs-string">'/'</span>});
      } <span class="hljs-keyword">else</span> {
        router.push({<span class="hljs-attr">path</span>:<span class="hljs-string">'/managelogin'</span>});
      }
    } <span class="hljs-keyword">else</span> {
      next();
    }
  }
  <span class="hljs-keyword">else</span> {
    next();
  }
})</code></pre>
<h4>面包屑导航</h4>
<blockquote>绑定面包屑要根据实际情况来定，但是<code>this.$router.currentRoute.matched</code>是最主要的</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;bread&quot;>
    <el-breadcrumb separator=&quot;/&quot;>
      <el-breadcrumb-item v-for=&quot;(item, index) in breadData&quot; :key=&quot;item.id&quot; :to=&quot;{ name: item.meta.breadName=='管理系统'?'Index':item.name }&quot;>"{{"item.meta.breadName"}}"</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type=&quot;text/ecmascript-6&quot;>
  export default {
    data() {
      return {
        breadData:[]
      }
    },
    watch: {
      $route () {
        this.initBreadData();
      }
    },
    methods:{
      //面包屑
      initBreadData(){
        this.breadData=this.$router.currentRoute.matched;
        // console.log(this.breadData)
      }
    },
    created(){
      this.initBreadData();
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bread"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-breadcrumb</span> <span class="hljs-attr">separator</span>=<span class="hljs-string">"/"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-breadcrumb-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in breadData"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{ name: item.meta.breadName=='管理系统'?'Index':item.name }"</span>&gt;</span>"{{"item.meta.breadName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">el-breadcrumb-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-breadcrumb</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/ecmascript-6"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">breadData</span>:[]
      }
    },
    <span class="hljs-attr">watch</span>: {
      $route () {
        <span class="hljs-keyword">this</span>.initBreadData();
      }
    },
    <span class="hljs-attr">methods</span>:{
      <span class="hljs-comment">//面包屑</span>
      initBreadData(){
        <span class="hljs-keyword">this</span>.breadData=<span class="hljs-keyword">this</span>.$router.currentRoute.matched;
        <span class="hljs-comment">// console.log(this.breadData)</span>
      }
    },
    created(){
      <span class="hljs-keyword">this</span>.initBreadData();
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>路由部分：<br><span class="img-wrap"><img data-src="/img/remote/1460000014737445?w=1069&amp;h=357" src="https://static.alili.tech/img/remote/1460000014737445?w=1069&amp;h=357" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>elementui面包屑导航与左侧导航相对应</h4>
<blockquote>根据实际情况来，不能套用，要看你的路由怎么写的 <code>this.$router.currentRoute.path</code><br><code>:default-active="activeIndex"</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// conponents/sidebar.vue
//初始化列表active状态
...
methods:{
  initActiveIndex(){
    // var str =this.$router.currentRoute.path;
    this.activeIndex=this.$router.currentRoute.path;
    // console.log(str)
  }
},
watch:{
  '$route':'initActiveIndex'
},
created(){
  this.initActiveIndex();
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// conponents/sidebar.vue</span>
<span class="hljs-comment">//初始化列表active状态</span>
...
methods:{
  initActiveIndex(){
    <span class="hljs-comment">// var str =this.$router.currentRoute.path;</span>
    <span class="hljs-keyword">this</span>.activeIndex=<span class="hljs-keyword">this</span>.$router.currentRoute.path;
    <span class="hljs-comment">// console.log(str)</span>
  }
},
<span class="hljs-attr">watch</span>:{
  <span class="hljs-string">'$route'</span>:<span class="hljs-string">'initActiveIndex'</span>
},
created(){
  <span class="hljs-keyword">this</span>.initActiveIndex();
}
...</code></pre>
<h4>配置代理</h4>
<p>要想请求到后台数据，这一步是必须的<br>配置代理之后，localhost:8088/api/<em> -&gt; localhost:3000/api/</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config/index.js
proxyTable: {
  // proxy all requests starting with /api to jsonplaceholder
  '/api': {
    target: 'http://127.0.0.1:3000/api', // 端口号根据后台设置来，默认是3000
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''  // 若target中没有/api、这里又为空，则404；
    }
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>config/<span class="hljs-keyword">index</span>.js
proxyTable: {
  <span class="hljs-comment">// proxy all requests starting with /api to jsonplaceholder</span>
  <span class="hljs-string">'/api'</span>: {
    target: <span class="hljs-string">'http://127.0.0.1:3000/api'</span>, <span class="hljs-comment">// 端口号根据后台设置来，默认是3000</span>
    changeOrigin: <span class="hljs-keyword">true</span>,
    pathRewrite: {
      <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>  <span class="hljs-comment">// 若target中没有/api、这里又为空，则404；</span>
    }
  }
},</code></pre>
<h4>ElementUi动态增加表单的表单验证 大坑</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div  v-if=&quot;dialogForm.type!='judgement'&amp;&amp;dialogForm.type!='Q&amp;A'&quot;>
    <el-form-item v-for=&quot;(item,index) in dialogForm.surveyQuestionOptionList&quot;
    :key=&quot;item.key&quot;
    :label=&quot;'选项'+(index+1) +'：'&quot;
    :prop=&quot;'surveyQuestionOptionList.' + index + '.optionContent'&quot;
    :rules=&quot;{
      required:true, message:'选项不能为空', trigger:'blur'
    }&quot;
    >
    // 最重要的是prop 一定要带上`.optionContent`，也就是你绑定值的key
      <el-input placeholder=&quot;请输入选项&quot; class=&quot;dialog_input&quot; v-model=&quot;item.optionContent&quot;></el-input>
      <i class=&quot;el-icon-delete delete-icon&quot; @click=&quot;deleteDlalogOption(index)&quot;></i>
    </el-form-item>
    <el-button type=&quot;primary&quot; size=&quot;small&quot; class=&quot;marginB10&quot; @click=&quot;addDialogOption&quot;>添加选项</el-button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div  v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"dialogForm.type!='judgement'&amp;&amp;dialogForm.type!='Q&amp;A'"</span>&gt;
    &lt;el-form-item v-for="(item,index) in dialogForm.surveyQuestionOptionList"
    :key="item.key"
    :label="'选项'+(index+1) +'：'"
    :prop="'surveyQuestionOptionList.' + index + '.optionContent'"
    :rules="{
      required:true, message:'选项不能为空', trigger:'blur'
    }"
    &gt;
    // 最重要的是prop 一定要带上`.optionContent`，也就是你绑定值的key
      &lt;el-input placeholder="请输入选项" class="dialog_input" v-model="item.optionContent"&gt;&lt;/el-input&gt;
      &lt;i class="el-icon-delete delete-icon" @click="deleteDlalogOption(index)"&gt;&lt;/i&gt;
    &lt;/el-form-item&gt;
    &lt;el-button type="primary" size="small" class="marginB10" @click="addDialogOption"&gt;添加选项&lt;/el-button&gt;
&lt;/div&gt;</code></pre>
<h4>query要用path来引入，params要用name来引入</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="goToExam(id){
// params传参只能用name引入
  this.$router.push({name:'ForntExam',params:{id:id"}}");
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">goToExam(id){
<span class="hljs-comment">// params传参只能用name引入</span>
  <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">name</span>:<span class="hljs-string">'ForntExam'</span>,<span class="hljs-attr">params</span>:{<span class="hljs-attr">id</span>:id"}}");
}</code></pre>
<h4>Elementui 单选框对上单选题</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;single&quot;>
    <h4>单选题（只有一个正确答案）</h4>
    <ul>
      <li class=&quot;marginB10&quot; v-for=&quot;(item,index) in singleQuestions&quot; :key=&quot;item.id&quot;>
        <p class=&quot;question-title&quot;>"{{"index+1"}}" 、"{{"item.name"}}"（）</p>
    
        <span class=&quot;option&quot;
              v-if=&quot;item.type!='judgement'&amp;&amp;item.type!='Q&amp;A'&quot;item
              v-for=&quot;(item1,index1) in item.selection&quot; :key=&quot;item1.id&quot;>
          <el-radio v-model=&quot;item.sanswer&quot; :label=&quot;options[index1]&quot; :key=&quot;index1&quot;>"{{"options[index1]"}}"、"{{"item1"}}"</el-radio>
          </span>
      </li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"single"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>单选题（只有一个正确答案）<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span></span>
    &lt;ul&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marginB10"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in singleQuestions"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"question-title"</span>&gt;</span>"{{"index+1"}}" 、"{{"item.name"}}"（）<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"option"</span>
              <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.type!='judgement'&amp;&amp;item.type!='Q&amp;A'"</span><span class="hljs-attr">item</span>
              <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item1,index1) in item.selection"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item1.id"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"item.sanswer"</span> <span class="hljs-attr">:label</span>=<span class="hljs-string">"options[index1]"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index1"</span>&gt;</span>"{{"options[index1]"}}"、"{{"item1"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">el-radio</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="init(){
  if(this.id == '' || !this.id ){
    this.$router.push({path:'forntexamindex'});
    return
  } else {
    this.$axios.get('/api/getExamInfo',{
      params:{
        id: this.id
      }
    }).then(response => {
      let res = response.data;
      if(res.status == '0') {
        for(let key in this.paperData) {
          this.paperData[key] = res.result[key];
        }
        res.result._questions.forEach(item => {
          if(item.type=='single'){
            item.sanswer = ''; // 重要的在这 给他新增一个属性，用来存答案
            this.singleQuestions.push(item);
          } else if(item.type == 'multi'){
            item.sanswer = []; // 多选题
            this.multiQuestions.push(item);
          } else if(item.type == 'Q&amp;A') {
            item.sanswer = ''; 
            this.QAQuestions.push(item);
          } else if(item.type == 'judgement'){
            item.sanswer = '';
            this.judgeQuestions.push(item);
          }
        })
      }
  }).catch(err => {
    this.$message.error(err);
  })
}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">init(){
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.id == <span class="hljs-string">''</span> || !<span class="hljs-keyword">this</span>.id ){
    <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">path</span>:<span class="hljs-string">'forntexamindex'</span>});
    <span class="hljs-keyword">return</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.$axios.get(<span class="hljs-string">'/api/getExamInfo'</span>,{
      <span class="hljs-attr">params</span>:{
        <span class="hljs-attr">id</span>: <span class="hljs-keyword">this</span>.id
      }
    }).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> res = response.data;
      <span class="hljs-keyword">if</span>(res.status == <span class="hljs-string">'0'</span>) {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.paperData) {
          <span class="hljs-keyword">this</span>.paperData[key] = res.result[key];
        }
        res.result._questions.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
          <span class="hljs-keyword">if</span>(item.type==<span class="hljs-string">'single'</span>){
            item.sanswer = <span class="hljs-string">''</span>; <span class="hljs-comment">// 重要的在这 给他新增一个属性，用来存答案</span>
            <span class="hljs-keyword">this</span>.singleQuestions.push(item);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(item.type == <span class="hljs-string">'multi'</span>){
            item.sanswer = []; <span class="hljs-comment">// 多选题</span>
            <span class="hljs-keyword">this</span>.multiQuestions.push(item);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(item.type == <span class="hljs-string">'Q&amp;A'</span>) {
            item.sanswer = <span class="hljs-string">''</span>; 
            <span class="hljs-keyword">this</span>.QAQuestions.push(item);
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(item.type == <span class="hljs-string">'judgement'</span>){
            item.sanswer = <span class="hljs-string">''</span>;
            <span class="hljs-keyword">this</span>.judgeQuestions.push(item);
          }
        })
      }
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.$message.error(err);
  })
}
}</code></pre>
<h3 id="articleHeader5">后台相关</h3>
<h4>连接数据库</h4>
<p>在server根目录下新建<code>db.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// db.js
var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1:27017/examSystem';
var db = mongoose.connect(dbUrl);
db.connection.on('error',function(error) {
    console.log('数据库链接失败：'+ error);
});
db.connection.on('connected',function() {
    console.log('数据库链接成功!');
});
db.connection.on('disconnected',function() {
    console.log('Mongoose connection disconnected');
});

module.exports = db;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// db.js</span>
<span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">var</span> dbUrl = <span class="hljs-string">'mongodb://127.0.0.1:27017/examSystem'</span>;
<span class="hljs-keyword">var</span> db = mongoose.connect(dbUrl);
db.connection.on(<span class="hljs-string">'error'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'数据库链接失败：'</span>+ error);
});
db.connection.on(<span class="hljs-string">'connected'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'数据库链接成功!'</span>);
});
db.connection.on(<span class="hljs-string">'disconnected'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Mongoose connection disconnected'</span>);
});

<span class="hljs-built_in">module</span>.exports = db;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server/app.js
// 链接数据库
require('./db');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server/app.js</span>
<span class="hljs-comment">// 链接数据库</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./db'</span>);</code></pre>
<h4>配置seesion</h4>
<p>需要<code>express-session</code> 和 <code>cookie-parser</code>插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
// 加载解析session的中间件
// session 的 store 有四个常用选项：1）内存 2）cookie 3）缓存 4）数据库
// 数据库 session。除非你很熟悉这一块，知道自己要什么，否则还是老老实实用缓存吧 需要用到（connect-mongo插件 line 7）
// app.use(sessionParser({ 会在数据库中新建一个session集合存储session
//     secret: 'express',
//     store: new mongoStore({
//         url:'mongodb://127.0.0.1:27017/examSystem',
//         collection:'session'
//     })
// }));

// 默认使用内存来存 session，对于开发调试来说很方便
app.use(sessionParser({
  secret: '12345', // 建议使用 128 个字符的随机字符串
  name: 'userInfo',
  cookie: { maxAge: 1800000 }, // 时间可以长点
  resave:true,
  rolling:true,
  saveUninitialized:false
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app.js</span>
<span class="hljs-comment">// 加载解析session的中间件</span>
<span class="hljs-comment">// session 的 store 有四个常用选项：1）内存 2）cookie 3）缓存 4）数据库</span>
<span class="hljs-comment">// 数据库 session。除非你很熟悉这一块，知道自己要什么，否则还是老老实实用缓存吧 需要用到（connect-mongo插件 line 7）</span>
<span class="hljs-comment">// app.use(sessionParser({ 会在数据库中新建一个session集合存储session</span>
<span class="hljs-comment">//     secret: 'express',</span>
<span class="hljs-comment">//     store: new mongoStore({</span>
<span class="hljs-comment">//         url:'mongodb://127.0.0.1:27017/examSystem',</span>
<span class="hljs-comment">//         collection:'session'</span>
<span class="hljs-comment">//     })</span>
<span class="hljs-comment">// }));</span>

<span class="hljs-comment">// 默认使用内存来存 session，对于开发调试来说很方便</span>
app.use(sessionParser({
  <span class="hljs-attr">secret</span>: <span class="hljs-string">'12345'</span>, <span class="hljs-comment">// 建议使用 128 个字符的随机字符串</span>
  name: <span class="hljs-string">'userInfo'</span>,
  <span class="hljs-attr">cookie</span>: { <span class="hljs-attr">maxAge</span>: <span class="hljs-number">1800000</span> }, <span class="hljs-comment">// 时间可以长点</span>
  resave:<span class="hljs-literal">true</span>,
  <span class="hljs-attr">rolling</span>:<span class="hljs-literal">true</span>,
  <span class="hljs-attr">saveUninitialized</span>:<span class="hljs-literal">false</span>
}));</code></pre>
<h4>配置后台路由</h4>
<p>默认的使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// appi.js
var index = require('./routes/index');
app.use('/', index);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// appi.js</span>
<span class="hljs-keyword">var</span> index = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/index'</span>);
app.use(<span class="hljs-string">'/'</span>, index);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// routes/index
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});

module.exports = router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// routes/index</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> router = express.Router();

<span class="hljs-comment">/* GET home page. */</span>
router.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
   res.render(<span class="hljs-string">'index'</span>, { <span class="hljs-attr">title</span>: <span class="hljs-string">'Express'</span> });
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre>
<p>我之前做的一个电子商城采用的这种方式：<a href="https://github.com/FinGet/Node-vue-mongodb" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<p>我的项目中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
var indexs = require('./routes/index');
var routes = require('./routes/routes');

indexs(app);
routes(app);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app.js</span>
<span class="hljs-keyword">var</span> indexs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/index'</span>);
<span class="hljs-keyword">var</span> routes = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/routes'</span>);

indexs(app);
routes(app);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// routes/index.js
module.exports = function(app) {
  app.get('/api', (req, res) => {
    res.render('index', {title: 'Express'});
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// routes/index.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
  app.get(<span class="hljs-string">'/api'</span>, (req, res) =&gt; {
    res.render(<span class="hljs-string">'index'</span>, {<span class="hljs-attr">title</span>: <span class="hljs-string">'Express'</span>});
  })
}</code></pre>
<p>两种方式有什么不同：</p>
<ul><li>如果你有多个路由文件 （例如<code>goods.js</code>,<code>index.js</code>,<code>users.js</code>……）,你都需要去app.js中引入</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app.js</span>
<span class="hljs-keyword">var</span> index = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/index'</span>);
<span class="hljs-keyword">var</span> users = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/users'</span>);
<span class="hljs-keyword">var</span> goods = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./routes/goods'</span>);
app.use(<span class="hljs-string">'/'</span>, index);
app.use(<span class="hljs-string">'/users'</span>, users);
app.use(<span class="hljs-string">'/goods'</span>, goods);</code></pre>
<p>在前台请求的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// goods.js
....
router.get(&quot;/list&quot;, function (req, res, next) {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// goods.js</span>
....
router.get(<span class="hljs-string">"/list"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
    ...
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// xxx.vue
...
this.$axios.get('/goods/list').then()... // 不能忘了加上goods，也就是你在app.js中定义的一级路由
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// xxx.vue</span>
...
this.$axios.get(<span class="hljs-string">'/goods/list'</span>).then()... <span class="hljs-comment">// 不能忘了加上goods，也就是你在app.js中定义的一级路由</span>
...</code></pre>
<blockquote>如果没看懂，可以去<a href="https://github.com/FinGet/Node-vue-mongodb" rel="nofollow noreferrer" target="_blank">GitHub</a>上看一下实际代码，有助于理解</blockquote>
<ul><li>第二种方式</li></ul>
<p>不用在app.js中引入各个路由文件，一个<code>route.js</code>就搞定了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// route.js
var Teacher = require('../controllers/teacher'),
    Student = require('../controllers/student');
module.exports = function(app) {

  /*----------------------教师用户----------------------*/
  app.post('/api/register',Teacher.register);
  // 用户登录
  app.post('/api/login', Teacher.signup);
  // 登出
  app.post(&quot;/api/logout&quot;, Teacher.signout);
  // 获取用户信息
  app.post('/api/getUserInfo',Teacher.getUserInfo);
  // 修改用户信息
  app.post('/api/updateUser', Teacher.updateUser);
  // 获取试卷(分页、模糊查询)
  app.get('/api/mypapers', Teacher.getPapers);
  // 保存试卷
  app.post('/api/savePaper', Teacher.savePaper);
  // 发布试卷
  app.post('/api/publishPaper', Teacher.publishPaper);
  // 删除试卷
  app.post('/api/deletePaper', Teacher.deletePaper);
  // 查找试卷
  app.post('/api/findPaper', Teacher.findPaper);
  // 修改试题
  app.post('/api/updateQuestion', Teacher.updateQuestion);
  // 修改试卷
  app.post('/api/updatePaper', Teacher.updatePaper);
  // 获取所有的考试
  app.get('/api/getAllExams',Teacher.getAllExams);
  // 获取已考试的试卷
  app.get('/api/getExams',Teacher.getExams);
  // 获取学生考试成绩
  app.get('/api/getScores', Teacher.getScores);
  // 批阅试卷
  app.get('/api/getCheckPapers', Teacher.getCheckPapers);
  // 打分提交
  app.get('/api/submitScore', Teacher.submitScore);


  /*----------------------学生用户----------------------*/
  // 学生注册
  app.post('/api/studentregister',Student.register);
  // 学生登录
  app.post('/api/studentlogin', Student.signup);
  // 学生登出
  app.post('/api/studentlogout', Student.signout);
  // 修改信息
  app.post('/api/updateStudent', Student.updateStudent);
  // 获取考试记录
  app.get('/api/getexamlogs', Student.getExamLogs);
  // 获取个人信息
  app.get('/api/studentinfo', Student.getInfo);
  // 获取考试信息
  app.get('/api/getExamsPaper',Student.getExams);
  // 获取试卷信息
  app.get('/api/getExamInfo',Student.getExamInfo);
  // 提交考试信息
  app.post('/api/submitExam',Student.submitExam);

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// route.js</span>
<span class="hljs-keyword">var</span> Teacher = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../controllers/teacher'</span>),
    Student = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../controllers/student'</span>);
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{

  <span class="hljs-comment">/*----------------------教师用户----------------------*/</span>
  app.post(<span class="hljs-string">'/api/register'</span>,Teacher.register);
  <span class="hljs-comment">// 用户登录</span>
  app.post(<span class="hljs-string">'/api/login'</span>, Teacher.signup);
  <span class="hljs-comment">// 登出</span>
  app.post(<span class="hljs-string">"/api/logout"</span>, Teacher.signout);
  <span class="hljs-comment">// 获取用户信息</span>
  app.post(<span class="hljs-string">'/api/getUserInfo'</span>,Teacher.getUserInfo);
  <span class="hljs-comment">// 修改用户信息</span>
  app.post(<span class="hljs-string">'/api/updateUser'</span>, Teacher.updateUser);
  <span class="hljs-comment">// 获取试卷(分页、模糊查询)</span>
  app.get(<span class="hljs-string">'/api/mypapers'</span>, Teacher.getPapers);
  <span class="hljs-comment">// 保存试卷</span>
  app.post(<span class="hljs-string">'/api/savePaper'</span>, Teacher.savePaper);
  <span class="hljs-comment">// 发布试卷</span>
  app.post(<span class="hljs-string">'/api/publishPaper'</span>, Teacher.publishPaper);
  <span class="hljs-comment">// 删除试卷</span>
  app.post(<span class="hljs-string">'/api/deletePaper'</span>, Teacher.deletePaper);
  <span class="hljs-comment">// 查找试卷</span>
  app.post(<span class="hljs-string">'/api/findPaper'</span>, Teacher.findPaper);
  <span class="hljs-comment">// 修改试题</span>
  app.post(<span class="hljs-string">'/api/updateQuestion'</span>, Teacher.updateQuestion);
  <span class="hljs-comment">// 修改试卷</span>
  app.post(<span class="hljs-string">'/api/updatePaper'</span>, Teacher.updatePaper);
  <span class="hljs-comment">// 获取所有的考试</span>
  app.get(<span class="hljs-string">'/api/getAllExams'</span>,Teacher.getAllExams);
  <span class="hljs-comment">// 获取已考试的试卷</span>
  app.get(<span class="hljs-string">'/api/getExams'</span>,Teacher.getExams);
  <span class="hljs-comment">// 获取学生考试成绩</span>
  app.get(<span class="hljs-string">'/api/getScores'</span>, Teacher.getScores);
  <span class="hljs-comment">// 批阅试卷</span>
  app.get(<span class="hljs-string">'/api/getCheckPapers'</span>, Teacher.getCheckPapers);
  <span class="hljs-comment">// 打分提交</span>
  app.get(<span class="hljs-string">'/api/submitScore'</span>, Teacher.submitScore);


  <span class="hljs-comment">/*----------------------学生用户----------------------*/</span>
  <span class="hljs-comment">// 学生注册</span>
  app.post(<span class="hljs-string">'/api/studentregister'</span>,Student.register);
  <span class="hljs-comment">// 学生登录</span>
  app.post(<span class="hljs-string">'/api/studentlogin'</span>, Student.signup);
  <span class="hljs-comment">// 学生登出</span>
  app.post(<span class="hljs-string">'/api/studentlogout'</span>, Student.signout);
  <span class="hljs-comment">// 修改信息</span>
  app.post(<span class="hljs-string">'/api/updateStudent'</span>, Student.updateStudent);
  <span class="hljs-comment">// 获取考试记录</span>
  app.get(<span class="hljs-string">'/api/getexamlogs'</span>, Student.getExamLogs);
  <span class="hljs-comment">// 获取个人信息</span>
  app.get(<span class="hljs-string">'/api/studentinfo'</span>, Student.getInfo);
  <span class="hljs-comment">// 获取考试信息</span>
  app.get(<span class="hljs-string">'/api/getExamsPaper'</span>,Student.getExams);
  <span class="hljs-comment">// 获取试卷信息</span>
  app.get(<span class="hljs-string">'/api/getExamInfo'</span>,Student.getExamInfo);
  <span class="hljs-comment">// 提交考试信息</span>
  app.post(<span class="hljs-string">'/api/submitExam'</span>,Student.submitExam);

}</code></pre>
<p>可以看到，我将每个路由的方法都是提取出去的，这样可以避免这个文件不会有太多的代码，可读性降低，将代码分离开来，也有助于维护<br><span class="img-wrap"><img data-src="/img/remote/1460000014737446?w=864&amp;h=601" src="https://static.alili.tech/img/remote/1460000014737446?w=864&amp;h=601" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在使用的时候：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// xxx.vue
...
this.$axios.get('/api/getexamlogs').then()... 
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// xxx.vue</span>
...
this.$axios.get(<span class="hljs-string">'/api/getexamlogs'</span>).then()... 
...</code></pre>
<h4>数据库的相关操作</h4>
<p>我这次用mongodb，主要是因为可以用js来操作，对我来说比较简单，mysql我不会用。在实际开发过程中发现，考试系统各个表（集合）都是需要关联，mongodb这种非关系型数据库，做起来反而麻烦了不少。在此将一些数据库增删改查的方法回顾一下。</p>
<h5>初始化一条数据</h5>
<blockquote>如果对mongodb，mongoose没有基础的了解，建议看一看<a href="https://www.villainhr.com/page/2016/05/11/%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BAmongoose" rel="nofollow noreferrer" target="_blank">mongoose深入浅出</a> ，<a href="https://segmentfault.com/a/1190000014736907">mongoose基础操作</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// controllers/student.js
const Student = require('../model/student');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var student = new Student({
    userId: 12001, // 学号
    userName: '张三', // 用户名
    passWord: '123321', // 密码
    grade: 3, // 年级 1~6 分别代表一年级到六年级
    class: 3, // 班级
    exams:[{ // 参加的考试
      _paper:Schema.Types.ObjectId(&quot;5a40a4ef485a584d44764ff1&quot;), // 这个是_id，在mongodb自动生成的，从数据库复制过来，初始化一个学生，应该是没有参加考试的
      score:100,
      date: new Date(),
      answers: []
    }]
})
// 保存
student.save((err,doc) => {
  console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// controllers/student.js</span>
<span class="hljs-keyword">const</span> Student = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../model/student'</span>);
<span class="hljs-keyword">var</span> mongoose = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mongoose'</span>);
<span class="hljs-keyword">var</span> Schema = mongoose.Schema;

<span class="hljs-keyword">var</span> student = <span class="hljs-keyword">new</span> Student({
    <span class="hljs-attr">userId</span>: <span class="hljs-number">12001</span>, <span class="hljs-comment">// 学号</span>
    userName: <span class="hljs-string">'张三'</span>, <span class="hljs-comment">// 用户名</span>
    passWord: <span class="hljs-string">'123321'</span>, <span class="hljs-comment">// 密码</span>
    grade: <span class="hljs-number">3</span>, <span class="hljs-comment">// 年级 1~6 分别代表一年级到六年级</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span>: 3, // 班级
    <span class="hljs-title">exams</span>:[</span>{ <span class="hljs-comment">// 参加的考试</span>
      _paper:Schema.Types.ObjectId(<span class="hljs-string">"5a40a4ef485a584d44764ff1"</span>), <span class="hljs-comment">// 这个是_id，在mongodb自动生成的，从数据库复制过来，初始化一个学生，应该是没有参加考试的</span>
      score:<span class="hljs-number">100</span>,
      <span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(),
      <span class="hljs-attr">answers</span>: []
    }]
})
<span class="hljs-comment">// 保存</span>
student.save(<span class="hljs-function">(<span class="hljs-params">err,doc</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre>
<h5>用户注册，其实就是创建一条数据</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.register = function (req,res) {
  let userInfo = req.body.userInfo; // req.body 获取post方式传递的参数
  Student.findOne(userInfo,(err,doc) => {
    if(err) {
      ...
     } else {
       if(doc) {
         res.json({
           status:'2',
           msg: '用户已存在'
         })
        } else {
          userInfo.exams = [];
          // userInfo 是个对象，包含了用户相关的信息
          Student.create(userInfo,(err1,doc1) => {
          if(err1) {
            ...
          }else {
            if(doc1) {
              ...
            } else {
             ...
          }
        }
      })
     }
    }
   })
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.register = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
  <span class="hljs-keyword">let</span> userInfo = req.body.userInfo; <span class="hljs-comment">// req.body 获取post方式传递的参数</span>
  Student.findOne(userInfo,(err,doc) =&gt; {
    <span class="hljs-keyword">if</span>(err) {
      ...
     } <span class="hljs-keyword">else</span> {
       <span class="hljs-keyword">if</span>(doc) {
         res.json({
           <span class="hljs-attr">status</span>:<span class="hljs-string">'2'</span>,
           <span class="hljs-attr">msg</span>: <span class="hljs-string">'用户已存在'</span>
         })
        } <span class="hljs-keyword">else</span> {
          userInfo.exams = [];
          <span class="hljs-comment">// userInfo 是个对象，包含了用户相关的信息</span>
          Student.create(userInfo,(err1,doc1) =&gt; {
          <span class="hljs-keyword">if</span>(err1) {
            ...
          }<span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span>(doc1) {
              ...
            } <span class="hljs-keyword">else</span> {
             ...
          }
        }
      })
     }
    }
   })
 };</code></pre>
<h5>获取考试记录,子文档数组分页模糊查询</h5>
<p>如下图是我的<code>student</code>集合:<br><span class="img-wrap"><img data-src="/img/remote/1460000014737447?w=758&amp;h=440" src="https://static.alili.tech/img/remote/1460000014737447?w=758&amp;h=440" alt="" title="" style="cursor: pointer;"></span><br>在该集合中，学生参加过的考试记录，存在<code>exams</code>数组中，当想实现分页查询几条数据的时候，需要用到<code>$slice</code></p>
<blockquote>
<code>$slice:[start,size]</code>  第一个参数表示，数组开始的下标，第二个表示截取的数量<br>在后台接收到前台传递的<code>pageSize</code>和<code>pageNumber</code>时，需要计算出当前需要截取的下标，即<code>let  skip = (pageNumber-1)*pageSize</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.getExamLogs = function (req, res){
  let userName =req.session.userName;
  let name = req.param('name');
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.param('pageSize'));
  let  pageNumber = parseInt(req.param('pageNumber'));
  let  skip = (pageNumber-1)*pageSize; // 跳过几条
  let  reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  Student.findOne({&quot;userName&quot;:userName},{&quot;exams&quot;:{$slice:[skip,pageSize]"}}").populate({path:'exams._paper',match:{name: reg"}}")
    .exec((err,doc) => {
      if (err) {
        ...
      } else {
        if (doc) {
          res.json({
            status: '0',
            msg:'success',
            result:doc,
            count: doc.exams.length?doc.exams.length:0
          })
        } else {
          ...
        }
      }
    })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.getExamLogs = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>)</span>{
  <span class="hljs-keyword">let</span> userName =req.session.userName;
  <span class="hljs-keyword">let</span> name = req.param(<span class="hljs-string">'name'</span>);
    <span class="hljs-comment">// 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数</span>
  <span class="hljs-keyword">let</span>  pageSize = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageSize'</span>));
  <span class="hljs-keyword">let</span>  pageNumber = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageNumber'</span>));
  <span class="hljs-keyword">let</span>  skip = (pageNumber<span class="hljs-number">-1</span>)*pageSize; <span class="hljs-comment">// 跳过几条</span>
  <span class="hljs-keyword">let</span>  reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(name,<span class="hljs-string">'i'</span>); <span class="hljs-comment">// 在nodejs中，必须要使用RegExp，来构建正则表达式对象。</span>
  Student.findOne({<span class="hljs-string">"userName"</span>:userName},{<span class="hljs-string">"exams"</span>:{<span class="hljs-attr">$slice</span>:[skip,pageSize]"}}").populate({<span class="hljs-attr">path</span>:<span class="hljs-string">'exams._paper'</span>,<span class="hljs-attr">match</span>:{<span class="hljs-attr">name</span>: reg"}}")
    .exec(<span class="hljs-function">(<span class="hljs-params">err,doc</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) {
        ...
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (doc) {
          res.json({
            <span class="hljs-attr">status</span>: <span class="hljs-string">'0'</span>,
            <span class="hljs-attr">msg</span>:<span class="hljs-string">'success'</span>,
            <span class="hljs-attr">result</span>:doc,
            <span class="hljs-attr">count</span>: doc.exams.length?doc.exams.length:<span class="hljs-number">0</span>
          })
        } <span class="hljs-keyword">else</span> {
          ...
        }
      }
    })
};</code></pre>
<h5>另一种分页模糊查询--在文档之间（document）</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014737448?w=723&amp;h=576" src="https://static.alili.tech/img/remote/1460000014737448?w=723&amp;h=576" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>每个试卷都是独立的文档，通过他们的名称<code>name</code>实现模糊查询</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取考试信息
exports.getExams = function (req,res) {
  let userName =req.session.userName;
  let name = req.param('name');
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.param('pageSize'));
  let  pageNumber = parseInt(req.param('pageNumber'));
  let skip = (pageNumber-1)*pageSize; // 跳过几条
  let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  Student.findOne({&quot;userName&quot;:userName},(err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
      // 关键在这里
        Paper.find({startTime:{$exists:true},name:reg}).skip(skip).limit(pageSize).populate({path:'_questions'}).exec((err1,doc1)=>{
        ....  
  })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取考试信息</span>
exports.getExams = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
  <span class="hljs-keyword">let</span> userName =req.session.userName;
  <span class="hljs-keyword">let</span> name = req.param(<span class="hljs-string">'name'</span>);
    <span class="hljs-comment">// 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数</span>
  <span class="hljs-keyword">let</span>  pageSize = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageSize'</span>));
  <span class="hljs-keyword">let</span>  pageNumber = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageNumber'</span>));
  <span class="hljs-keyword">let</span> skip = (pageNumber<span class="hljs-number">-1</span>)*pageSize; <span class="hljs-comment">// 跳过几条</span>
  <span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(name,<span class="hljs-string">'i'</span>); <span class="hljs-comment">// 在nodejs中，必须要使用RegExp，来构建正则表达式对象。</span>
  Student.findOne({<span class="hljs-string">"userName"</span>:userName},(err,doc)=&gt;{
    <span class="hljs-keyword">if</span>(err) {
      res.json({
        <span class="hljs-attr">status</span>: <span class="hljs-string">'1'</span>,
        <span class="hljs-attr">msg</span>: err.message
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span>(doc) {
      <span class="hljs-comment">// 关键在这里</span>
        Paper.find({<span class="hljs-attr">startTime</span>:{<span class="hljs-attr">$exists</span>:<span class="hljs-literal">true</span>},<span class="hljs-attr">name</span>:reg}).skip(skip).limit(pageSize).populate({<span class="hljs-attr">path</span>:<span class="hljs-string">'_questions'</span>}).exec(<span class="hljs-function">(<span class="hljs-params">err1,doc1</span>)=&gt;</span>{
        ....  
  })
};</code></pre>
<h5>还有一种模糊分页查询--查询关联文档再模糊分页查询</h5>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014737449?w=699&amp;h=236" src="https://static.alili.tech/img/remote/1460000014737449?w=699&amp;h=236" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>先通过<code>populate</code>查询除关联文档，在模糊分页查询</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.getPapers = function (req, res) {
  // console.log(req.session.userName);
  let name = req.param('name'),
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
    pageSize = parseInt(req.param('pageSize')),
    pageNumber = parseInt(req.param('pageNumber')),
    userName = req.session.userName;
  let skip = (pageNumber-1)*pageSize; // 跳过几条
  let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  let params = {
    name: reg
  };
  Teacher.findOne({'userName':userName}).populate({path:'_papers',match:{name: reg},options:{skip:skip,limit:pageSize"}}")
    .exec((err, doc) => {
      ....
    })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.getPapers = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-comment">// console.log(req.session.userName);</span>
  <span class="hljs-keyword">let</span> name = req.param(<span class="hljs-string">'name'</span>),
    <span class="hljs-comment">// 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数</span>
    pageSize = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageSize'</span>)),
    pageNumber = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageNumber'</span>)),
    userName = req.session.userName;
  <span class="hljs-keyword">let</span> skip = (pageNumber<span class="hljs-number">-1</span>)*pageSize; <span class="hljs-comment">// 跳过几条</span>
  <span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(name,<span class="hljs-string">'i'</span>); <span class="hljs-comment">// 在nodejs中，必须要使用RegExp，来构建正则表达式对象。</span>
  <span class="hljs-keyword">let</span> params = {
    <span class="hljs-attr">name</span>: reg
  };
  Teacher.findOne({<span class="hljs-string">'userName'</span>:userName}).populate({<span class="hljs-attr">path</span>:<span class="hljs-string">'_papers'</span>,<span class="hljs-attr">match</span>:{<span class="hljs-attr">name</span>: reg},<span class="hljs-attr">options</span>:{<span class="hljs-attr">skip</span>:skip,<span class="hljs-attr">limit</span>:pageSize"}}")
    .exec(<span class="hljs-function">(<span class="hljs-params">err, doc</span>) =&gt;</span> {
      ....
    })
};</code></pre>
<h5>populate</h5>
<p>mongodb本来就是非关系型的数据库，但是有很多时候不同的集合直接是需要关联的，这是就用到了mongoose提供的<code>populate</code></p>
<p>直接看图，不同集合直接的关联，用的就是<code>_id</code>,比如下图中，学生参加的考试，关联了试卷，试卷里面又关联了题目<br><span class="img-wrap"><img data-src="/img/remote/1460000014737450?w=624&amp;h=406" src="https://static.alili.tech/img/remote/1460000014737450?w=624&amp;h=406" alt="" title="" style="cursor: pointer;"></span></p>
<p>怎么查询呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Student.findOne({}).populate({path:'exams._paper'}).exec(....)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Student.findOne({}).populate({<span class="hljs-attr">path</span>:<span class="hljs-string">'exams._paper'</span>}).exec(....)</code></pre>
<p>更多的可以看看我项目中的实际代码都在<code>server/controllers</code>下面</p>
<h5>关联集合的新增</h5>
<p>在系统中，教师可以增加试卷，这个时候我就不知道该怎么保存前台传过来的数据。数据中既有试卷的信息，也有很多题目。题目都属于该试卷，改试卷又属于当前登录系统的老师（即创建试卷的老师）。<br>怎么才能让试卷、教师、问题关联起来啊，ref存的是_id,然而这些新增的数据，是保存之后才有_id的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.savePaper = function (req, res) {
  let paperForm = req.body.paperForm;
  let userName = req.session.userName;
  if(paperForm == {}){
    res.json({
      status:'5',
      msg: '数据不能为空'
    })
  }
  // 第一步查找当前登录的教师
  Teacher.findOne({&quot;userName&quot;: userName}, (err,doc)=>{
    if (err) {
      ...
    } else {
      if (doc) {
        let paperData = {
          name:paperForm.name,
          totalPoints:paperForm.totalPoints,
          time:paperForm.time,
          _teacher: doc._id, // 这里就可以拿到教师的_id
          _questions: [],
          examnum:0
        }
        // 第二步创建试卷
        Paper.create(paperData,function (err1,doc1) {
          if (err1) {
            ...
          } else {
            if (doc1) {
              doc._papers.push(doc1._id); // 教师中添加该试卷的_id
              doc.save(); // 很重要 不save则没有数据
              
              // 第三步 创建问题
              paperForm._questions.forEach(item => {
                item._papers = [];
                item._papers.push(doc1._id); // 试卷中存入试卷的_id，因为此时已经创建了试卷，所以可以拿到_id
                item._teacher = doc._id;  // 试卷中存入教师的_id
              })
              Question.create(paperForm._questions,function (err2,doc2) {
                if (err2) {
                  ...
                } else {
                  if (doc2) {
                    doc2.forEach(item => {
                      doc1._questions.push(item._id); // 当问题创建成功，则在试卷中存入问题的_id
                    })
                    doc1.save();
                    res.json({
                      status:'0',
                      msg: 'success'
                    })
                  } else {
                    ...
                  }
                }
              })
            } else {
              ...
            }
          }
        })
      }
      else {
       ...
      }
    }
  })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.savePaper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">let</span> paperForm = req.body.paperForm;
  <span class="hljs-keyword">let</span> userName = req.session.userName;
  <span class="hljs-keyword">if</span>(paperForm == {}){
    res.json({
      <span class="hljs-attr">status</span>:<span class="hljs-string">'5'</span>,
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'数据不能为空'</span>
    })
  }
  <span class="hljs-comment">// 第一步查找当前登录的教师</span>
  Teacher.findOne({<span class="hljs-string">"userName"</span>: userName}, (err,doc)=&gt;{
    <span class="hljs-keyword">if</span> (err) {
      ...
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (doc) {
        <span class="hljs-keyword">let</span> paperData = {
          <span class="hljs-attr">name</span>:paperForm.name,
          <span class="hljs-attr">totalPoints</span>:paperForm.totalPoints,
          <span class="hljs-attr">time</span>:paperForm.time,
          <span class="hljs-attr">_teacher</span>: doc._id, <span class="hljs-comment">// 这里就可以拿到教师的_id</span>
          _questions: [],
          <span class="hljs-attr">examnum</span>:<span class="hljs-number">0</span>
        }
        <span class="hljs-comment">// 第二步创建试卷</span>
        Paper.create(paperData,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err1,doc1</span>) </span>{
          <span class="hljs-keyword">if</span> (err1) {
            ...
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span> (doc1) {
              doc._papers.push(doc1._id); <span class="hljs-comment">// 教师中添加该试卷的_id</span>
              doc.save(); <span class="hljs-comment">// 很重要 不save则没有数据</span>
              
              <span class="hljs-comment">// 第三步 创建问题</span>
              paperForm._questions.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                item._papers = [];
                item._papers.push(doc1._id); <span class="hljs-comment">// 试卷中存入试卷的_id，因为此时已经创建了试卷，所以可以拿到_id</span>
                item._teacher = doc._id;  <span class="hljs-comment">// 试卷中存入教师的_id</span>
              })
              Question.create(paperForm._questions,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err2,doc2</span>) </span>{
                <span class="hljs-keyword">if</span> (err2) {
                  ...
                } <span class="hljs-keyword">else</span> {
                  <span class="hljs-keyword">if</span> (doc2) {
                    doc2.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                      doc1._questions.push(item._id); <span class="hljs-comment">// 当问题创建成功，则在试卷中存入问题的_id</span>
                    })
                    doc1.save();
                    res.json({
                      <span class="hljs-attr">status</span>:<span class="hljs-string">'0'</span>,
                      <span class="hljs-attr">msg</span>: <span class="hljs-string">'success'</span>
                    })
                  } <span class="hljs-keyword">else</span> {
                    ...
                  }
                }
              })
            } <span class="hljs-keyword">else</span> {
              ...
            }
          }
        })
      }
      <span class="hljs-keyword">else</span> {
       ...
      }
    }
  })
};</code></pre>
<h5>关联集合的删除---删除试卷</h5>
<blockquote>删除某一个试卷，既要删除教师中对应的试卷_id,也要删除问题中对应的试卷_id</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 删除试卷
exports.deletePaper = function (req, res) {
  let id = req.body.id;
  let userName = req.session.userName;
  // 第一步 删除教师中的_id _papers是一个数组，所以用到了`$pull`
  Teacher.update({&quot;userName&quot;:userName},{'$pull':{'_papers':{$in:id"}}"}, (err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        // 第二步  删除试卷 即 移除一个文档
        Paper.remove({&quot;_id&quot;:{$in:id"}}",function (err1,doc1){
          if(err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          } else {
            if (doc1) {
            // 第三步  updateMany删除多个问题中的_id 这里并没有删除试卷中包含的问题，是为了以后题库做准备
              Question.updateMany({'_papers':{$in:id"}}",{'$pull':{'_papers':{$in:id"}}"},function (err2,doc2) {
                if(err2){
                  ...
                } else {
                  if (doc2){
                    ...
                  }
                }
              })
            } else {
              ...
            }
          }
        })
      } else {
       ...
      }
    }
  })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 删除试卷</span>
exports.deletePaper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">let</span> id = req.body.id;
  <span class="hljs-keyword">let</span> userName = req.session.userName;
  <span class="hljs-comment">// 第一步 删除教师中的_id _papers是一个数组，所以用到了`$pull`</span>
  Teacher.update({<span class="hljs-string">"userName"</span>:userName},{<span class="hljs-string">'$pull'</span>:{<span class="hljs-string">'_papers'</span>:{<span class="hljs-attr">$in</span>:id"}}"}, (err,doc)=&gt;{
    <span class="hljs-keyword">if</span> (err) {
      res.json({
        <span class="hljs-attr">status</span>:<span class="hljs-string">'1'</span>,
        <span class="hljs-attr">msg</span>: err.message
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (doc) {
        <span class="hljs-comment">// 第二步  删除试卷 即 移除一个文档</span>
        Paper.remove({<span class="hljs-string">"_id"</span>:{<span class="hljs-attr">$in</span>:id"}}",<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err1,doc1</span>)</span>{
          <span class="hljs-keyword">if</span>(err1) {
            res.json({
              <span class="hljs-attr">status</span>:<span class="hljs-string">'1'</span>,
              <span class="hljs-attr">msg</span>: err1.message
            })
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span> (doc1) {
            <span class="hljs-comment">// 第三步  updateMany删除多个问题中的_id 这里并没有删除试卷中包含的问题，是为了以后题库做准备</span>
              Question.updateMany({<span class="hljs-string">'_papers'</span>:{<span class="hljs-attr">$in</span>:id"}}",{<span class="hljs-string">'$pull'</span>:{<span class="hljs-string">'_papers'</span>:{<span class="hljs-attr">$in</span>:id"}}"},<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err2,doc2</span>) </span>{
                <span class="hljs-keyword">if</span>(err2){
                  ...
                } <span class="hljs-keyword">else</span> {
                  <span class="hljs-keyword">if</span> (doc2){
                    ...
                  }
                }
              })
            } <span class="hljs-keyword">else</span> {
              ...
            }
          }
        })
      } <span class="hljs-keyword">else</span> {
       ...
      }
    }
  })
};</code></pre>
<h5>关联集合多条数据的更新--修改试卷</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改试卷-修改试卷
exports.updatePaper = function (req,res) {
  let userName = req.session.userName;
  let params = req.body.params;
  let paperParams = { // 试卷需要更新的字段
    name: params.name,
    totalPoints: params.totalPoints,
    time: params.time
  }
  let updateQuestion = []; // 需要更新的题目
  let addQuestion = []; // 需要新增的题目
  params._questions.forEach(item => {
    if(item._id) {  // 通过判断是否有_id区分已有的或者是新增的
      updateQuestion.push(item);
    } else {
      addQuestion.push(item);
    }
  })
  Teacher.findOne({'userName':userName},(err,doc)=>{
    if (err) {
      ...
    } else {
      if (doc) {
        Paper.findOneAndUpdate({&quot;_id&quot;:params._id},paperParams,(err1,doc1) => {
          if(err1) {
            ...
          }else {
            if(doc1){
              updateQuestion.forEach((item,index)=>{ // 循环更新题目，好像很傻的方法，可能有更好的办法
                Question.update({&quot;_id&quot;:item._id},item,(err2,doc2)=>{
                  if(err2){
                    res.json({
                      status:'1',
                      msg: err2.message
                    })
                  }else {
                    if(doc2){
                      if(index == (updateQuestion.length-1)){
                        if (addQuestion.length>0){
                          addQuestion.forEach(item => {
                            item._papers = [];
                            item._papers.push(doc1._id);
                            item._teacher = doc._id;
                          })
                          // 创建新增题目
                          Question.create(addQuestion,(err3,doc3) => {
                            if(err3) {
                             ...
                            } else {
                              if(doc3) {
                                doc3.forEach(item => {
                                  doc1._questions.push(item._id); // 还要将新增的题目关联到试卷当中
                                })

                                doc1.save(); // 很重要 不save则没有数据
                                res.json({
                                  status:'0',
                                  msg: 'success'
                                })
             // .......................判断太长省略........................
  })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 修改试卷-修改试卷</span>
exports.updatePaper = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
  <span class="hljs-keyword">let</span> userName = req.session.userName;
  <span class="hljs-keyword">let</span> params = req.body.params;
  <span class="hljs-keyword">let</span> paperParams = { <span class="hljs-comment">// 试卷需要更新的字段</span>
    name: params.name,
    <span class="hljs-attr">totalPoints</span>: params.totalPoints,
    <span class="hljs-attr">time</span>: params.time
  }
  <span class="hljs-keyword">let</span> updateQuestion = []; <span class="hljs-comment">// 需要更新的题目</span>
  <span class="hljs-keyword">let</span> addQuestion = []; <span class="hljs-comment">// 需要新增的题目</span>
  params._questions.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    <span class="hljs-keyword">if</span>(item._id) {  <span class="hljs-comment">// 通过判断是否有_id区分已有的或者是新增的</span>
      updateQuestion.push(item);
    } <span class="hljs-keyword">else</span> {
      addQuestion.push(item);
    }
  })
  Teacher.findOne({<span class="hljs-string">'userName'</span>:userName},(err,doc)=&gt;{
    <span class="hljs-keyword">if</span> (err) {
      ...
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (doc) {
        Paper.findOneAndUpdate({<span class="hljs-string">"_id"</span>:params._id},paperParams,(err1,doc1) =&gt; {
          <span class="hljs-keyword">if</span>(err1) {
            ...
          }<span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span>(doc1){
              updateQuestion.forEach(<span class="hljs-function">(<span class="hljs-params">item,index</span>)=&gt;</span>{ <span class="hljs-comment">// 循环更新题目，好像很傻的方法，可能有更好的办法</span>
                Question.update({<span class="hljs-string">"_id"</span>:item._id},item,(err2,doc2)=&gt;{
                  <span class="hljs-keyword">if</span>(err2){
                    res.json({
                      <span class="hljs-attr">status</span>:<span class="hljs-string">'1'</span>,
                      <span class="hljs-attr">msg</span>: err2.message
                    })
                  }<span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">if</span>(doc2){
                      <span class="hljs-keyword">if</span>(index == (updateQuestion.length<span class="hljs-number">-1</span>)){
                        <span class="hljs-keyword">if</span> (addQuestion.length&gt;<span class="hljs-number">0</span>){
                          addQuestion.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                            item._papers = [];
                            item._papers.push(doc1._id);
                            item._teacher = doc._id;
                          })
                          <span class="hljs-comment">// 创建新增题目</span>
                          Question.create(addQuestion,(err3,doc3) =&gt; {
                            <span class="hljs-keyword">if</span>(err3) {
                             ...
                            } <span class="hljs-keyword">else</span> {
                              <span class="hljs-keyword">if</span>(doc3) {
                                doc3.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
                                  doc1._questions.push(item._id); <span class="hljs-comment">// 还要将新增的题目关联到试卷当中</span>
                                })

                                doc1.save(); <span class="hljs-comment">// 很重要 不save则没有数据</span>
                                res.json({
                                  <span class="hljs-attr">status</span>:<span class="hljs-string">'0'</span>,
                                  <span class="hljs-attr">msg</span>: <span class="hljs-string">'success'</span>
                                })
             <span class="hljs-comment">// .......................判断太长省略........................</span>
  })
};</code></pre>
<h5>更新子文档数组--阅卷打分</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 打分提交
exports.submitScore = function (req, res) {
  let name = req.param('userName'),
    date = req.param('date'),
    score = req.param('score') - 0,
    userName = req.session.userName;
  Teacher.findOne({'userName':userName},(err,doc) => {
    if(err) {
      ...
    } else {
      if(doc) {
        Student.update({&quot;userName&quot;:name,&quot;exams.date&quot;:date},{$set:{&quot;exams.$.score&quot;:score,&quot;exams.$.isSure&quot;:true"}}",(err1, doc1) => {
          if(err1) {
            ...
          } else {
            if(doc1) {
              ...
            } else {
              ...
            }
          }
        })
      } else {
        ...
      }
    }
  })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 打分提交</span>
exports.submitScore = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">let</span> name = req.param(<span class="hljs-string">'userName'</span>),
    date = req.param(<span class="hljs-string">'date'</span>),
    score = req.param(<span class="hljs-string">'score'</span>) - <span class="hljs-number">0</span>,
    userName = req.session.userName;
  Teacher.findOne({<span class="hljs-string">'userName'</span>:userName},(err,doc) =&gt; {
    <span class="hljs-keyword">if</span>(err) {
      ...
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span>(doc) {
        Student.update({<span class="hljs-string">"userName"</span>:name,<span class="hljs-string">"exams.date"</span>:date},{<span class="hljs-attr">$set</span>:{<span class="hljs-string">"exams.$.score"</span>:score,<span class="hljs-string">"exams.$.isSure"</span>:<span class="hljs-literal">true</span>"}}",(err1, doc1) =&gt; {
          <span class="hljs-keyword">if</span>(err1) {
            ...
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">if</span>(doc1) {
              ...
            } <span class="hljs-keyword">else</span> {
              ...
            }
          }
        })
      } <span class="hljs-keyword">else</span> {
        ...
      }
    }
  })
};</code></pre>
<h4>md5加密</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//student.js
const crypto = require('crypto');

let mdHash = function(data){
  // hash 的定义要写在这个方法内，不然会报错Digest already called ****
  const hash = crypto.createHash('md5');
  return hash.update(data).digest('hex');
}

// 使用
//注册
exports.register = function (req,res) {
    let userInfo = req.body.userInfo;
    获取到前台传过来的密码，先加密再存储
    userInfo.passWord = mdHash(userInfo.passWord);
    ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//student.js</span>
<span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>);

<span class="hljs-keyword">let</span> mdHash = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
  <span class="hljs-comment">// hash 的定义要写在这个方法内，不然会报错Digest already called ****</span>
  <span class="hljs-keyword">const</span> hash = crypto.createHash(<span class="hljs-string">'md5'</span>);
  <span class="hljs-keyword">return</span> hash.update(data).digest(<span class="hljs-string">'hex'</span>);
}

<span class="hljs-comment">// 使用</span>
<span class="hljs-comment">//注册</span>
exports.register = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req,res</span>) </span>{
    <span class="hljs-keyword">let</span> userInfo = req.body.userInfo;
    获取到前台传过来的密码，先加密再存储
    userInfo.passWord = mdHash(userInfo.passWord);
    ...
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在线考试系统（vue2 + elementui + express4 + MongoDB）

## 原文链接
[https://segmentfault.com/a/1190000014737438](https://segmentfault.com/a/1190000014737438)

