---
title: 'vue-cli+vue-router+vuex+iview书店案例（简单易学）' 
date: 2019-01-15 2:30:12
hidden: true
slug: 6cc1pmjkybu
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>Vue书店</strong></h2>
<p><a href="https://hk-kevin.github.io/vue_Book/#/home" rel="nofollow noreferrer" target="_blank">demo地址</a><br><a href="https://github.com/HK-Kevin/vue_Book" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<blockquote><p>1.案例所用技术</p></blockquote>
<ul>
<li><p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>脚手架；</p></li>
<li><p><a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router</a>路由管理；</p></li>
<li><p><a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vuex2.0</a>状态管理;</p></li>
<li><p><a href="https://www.iviewui.com/docs/guide/install" rel="nofollow noreferrer" target="_blank">iview</a>视图;</p></li>
</ul>
<blockquote><p>2.能有什么收获</p></blockquote>
<hr>
<ul>
<li><p>初步熟悉<code>vue-cli</code>手交架；</p></li>
<li><p>初步学会处理<code>vue-router</code>路由管理，状态管理的内容，以及用<code>iview</code>简单布局；</p></li>
</ul>
<hr>
<blockquote><p>3.书店的功能需求</p></blockquote>
<ul>
<li><p>主导航是<code>首页</code>、<code>书单</code>、以及<code>图书管理</code>；</p></li>
<li><p>图书管理包含<code>添加图书</code>、<code>修改图书</code>和<code>删除图书</code>；</p></li>
<li><p>效果如下图：<br><span class="img-wrap"><img data-src="/img/bVNiLT?w=597&amp;h=504" src="https://static.alili.tech/img/bVNiLT?w=597&amp;h=504" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
<hr>
<blockquote><p>4.功能实现</p></blockquote>
<ul>
<li>
<p>(1)安装<code>vue-cli</code></p>
<ul>
<li><p>a:<code>npm install -g vue-cli</code>（只用安装一次，以后直接从b开始）；</p></li>
<li><p>b:<code>vue init webpack my-project</code>（<code>my-project</code>是文件名）；</p></li>
<li><p>c:<code>cd my-project</code>（进入文件夹）;</p></li>
<li><p>d:<code>npm install</code>（安装依赖）;</p></li>
<li><p>e:<code>npm run dev</code>（启动服务）；<br>我们实现简单的操作逻辑所用的操作集中在src目录下</p></li>
</ul>
</li>
<li>
<p>(2)组件</p>
<ul>
<li><p><code>Home</code>   首页组件</p></li>
<li><p><code>List</code>   书单组件</p></li>
<li><p><code>Manger</code> 图书管理</p></li>
<li><p><code>Delete</code> 删除组件</p></li>
<li><p><code>Add</code>    增加组件</p></li>
<li><p><code>Update</code> 修改组件</p></li>
</ul>
</li>
<li>
<p>（3）<code>vue-router</code>路由管理</p>
<ul><li>
<p>为了方便路由管理，我们将用这样的结构来描述路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'  //引入vue
import Router from 'vue-router'  //引入vue-router
import Home from '../components/Home.vue'  //引入各个组件
import List from '../components/List.vue'
import Add from '../components/Add.vue'
import Manger from '../components/Manger.vue'
import Detail from '../components/Detail.vue'
import Update from '../components/Update.vue'
import Delete from '../components/Delete.vue'

Vue.use(Router);     //在vue中使用vue-router

const routes = [            //定义路由
  {path:'/home',           //主路由
   component:Home},        //组件 
  {path:'/list',
   component:List},
  {path:'/manger',
   component:Manger,
  children:[              //子路由
    {path:'add',          
    component:Add},
    {path:'update',
    component:Update},
    {path:'delete',
    component:Delete}]},
{ path:'/detail/:id',    //子路由动态绑定
name:'detail',         //子路由名 
component:Detail}]
export default new Router({  //导出路由
routes})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>  <span class="hljs-comment">//引入vue</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>  <span class="hljs-comment">//引入vue-router</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Home.vue'</span>  <span class="hljs-comment">//引入各个组件</span>
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/List.vue'</span>
<span class="hljs-keyword">import</span> Add <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Add.vue'</span>
<span class="hljs-keyword">import</span> Manger <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Manger.vue'</span>
<span class="hljs-keyword">import</span> Detail <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Detail.vue'</span>
<span class="hljs-keyword">import</span> Update <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Update.vue'</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">Delete</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/Delete.vue'</span>

Vue.use(Router);     <span class="hljs-comment">//在vue中使用vue-router</span>

const routes = [            <span class="hljs-comment">//定义路由</span>
  {path:<span class="hljs-string">'/home'</span>,           <span class="hljs-comment">//主路由</span>
   component:Home},        <span class="hljs-comment">//组件 </span>
  {path:<span class="hljs-string">'/list'</span>,
   component:List},
  {path:<span class="hljs-string">'/manger'</span>,
   component:Manger,
  children:[              <span class="hljs-comment">//子路由</span>
    {path:<span class="hljs-string">'add'</span>,          
    component:Add},
    {path:<span class="hljs-string">'update'</span>,
    component:Update},
    {path:<span class="hljs-string">'delete'</span>,
    component:<span class="hljs-keyword">Delete</span>}]},
{ path:<span class="hljs-string">'/detail/:id'</span>,    <span class="hljs-comment">//子路由动态绑定</span>
name:<span class="hljs-string">'detail'</span>,         <span class="hljs-comment">//子路由名 </span>
component:Detail}]
export <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({  <span class="hljs-comment">//导出路由</span>
routes})</code></pre>
</li></ul>
</li>
<li>
<p>（4）vuex状态管理</p>
<ul>
<li>
<p><code>getters</code><br><code>getters</code>的作用参见<a href="https://segmentfault.com/a/1190000009105708">Vue值理解Getters</a>，在这里<code>getters</code>的作用就是拿到<code>store</code>仓库里面存放的<code>bookInfo</code>书单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const  books =state => state.bookInfo //导出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">export const  books =<span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.bookInfo //导出</code></pre>
</li>
<li>
<p><code>types</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export const BOOK_ADD = 'BOOK_ADD'
    export const BOOK_DELETE = 'BOOK_DELETE'
    export const BOOK_UPDATE = 'BOOK_UPDATE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> BOOK_ADD = <span class="hljs-string">'BOOK_ADD'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> BOOK_DELETE = <span class="hljs-string">'BOOK_DELETE'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> BOOK_UPDATE = <span class="hljs-string">'BOOK_UPDATE'</span></code></pre>
</li>
<li>
<p><code>mutations</code><br><code>mutations</code>的作用就是用来操作<code>state</code>里面的数据，而且在<code>vuex</code>里面只有在<code>mutations</code>里面才能操作<code>state</code>里面的数据，详情<a href="https://segmentfault.com/a/1190000009119500" target="_blank">参考Vuex之理解Mutations</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {BOOK_ADD, BOOK_DELETE,BOOK_UPDATE} from './types'
   //引入types
const  mutations ={  //定义mutations
[BOOK_ADD](state,book){    //增加图书方法
if(state.bookInfo.length == 0){
  book.id=1
}else{
 book.id= state.bookInfo[state.bookInfo.length-1].id+1
}
   state.bookInfo.push(book)  //其实就是store里面的state里面的bookInfo增加一本书
   },
   [BOOK_DELETE](state,bid){  //删除图书的方法
 state.bookInfo=state.bookInfo.filter(item=>{ //通过id删掉bookInfo里面指定的图书
   return  item.id != bid
 })
   },
   [BOOK_UPDATE](state,book){//更新图书的方法 
   state.bookInfo.map(item=>{
 if(item.id == book.id){  
   return book"}}")"}}" 
   export defalut mutaions  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import {BOOK_ADD, BOOK_DELETE,BOOK_UPDATE} <span class="hljs-keyword">from</span> './types'
   //引入types
const  mutations ={  //定义mutations
[BOOK_ADD](<span class="hljs-keyword">state</span>,book){    //增加图书方法
if(<span class="hljs-keyword">state</span>.bookInfo.length == <span class="hljs-number">0</span>){
  book.id=<span class="hljs-number">1</span>
}else{
 book.id= <span class="hljs-keyword">state</span>.bookInfo[<span class="hljs-keyword">state</span>.bookInfo.length-<span class="hljs-number">1</span>].id+<span class="hljs-number">1</span>
}
   <span class="hljs-keyword">state</span>.bookInfo.push(book)  //其实就是store里面的<span class="hljs-keyword">state</span>里面的bookInfo增加一本书
   },
   [BOOK_DELETE](<span class="hljs-keyword">state</span>,bid){  //删除图书的方法
 <span class="hljs-keyword">state</span>.bookInfo=<span class="hljs-keyword">state</span>.bookInfo.filter(item=&gt;{ //通过id删掉bookInfo里面指定的图书
   return  item.id != bid
 })
   },
   [BOOK_UPDATE](<span class="hljs-keyword">state</span>,book){//更新图书的方法 
   <span class="hljs-keyword">state</span>.bookInfo.map(item=&gt;{
 if(item.id == book.id){  
   return book"}}")"}}" 
   export defalut mutaions  </code></pre>
</li>
<li>
<p><code>actions</code><br><code>actions</code>是用来提交<code>mutations</code>里面的方法的，而且可以异步操作。详情见<a href="https://segmentfault.com/a/1190000009132572">Vuex之理解Actions</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {BOOK_ADD, BOOK_DELETE,BOOK_UPDATE} from './types'
const  actions ={
addBook:({commit},book)=>commit('BOOK_ADD',book),
deleteBook:({commit},id)=>commit('BOOK_DELETE',id),
updateBook:({commit},book)=>commit('BOOK_UPDATE',book),}
export default actions" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> {BOOK_ADD, BOOK_DELETE,BOOK_UPDATE} <span class="hljs-keyword">from</span> <span class="hljs-string">'./types'</span>
const  actions ={
addBook:<span class="hljs-function"><span class="hljs-params">({commit},book)</span>=&gt;</span>commit(<span class="hljs-string">'BOOK_ADD'</span>,book),
deleteBook:<span class="hljs-function"><span class="hljs-params">({commit},id)</span>=&gt;</span>commit(<span class="hljs-string">'BOOK_DELETE'</span>,id),
updateBook:<span class="hljs-function"><span class="hljs-params">({commit},book)</span>=&gt;</span>commit(<span class="hljs-string">'BOOK_UPDATE'</span>,book),}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> actions</code></pre>
</li>
<li>
<p>index<br>  定义state，就是定义状态，也就是数据，详情见<a href="https://segmentfault.com/a/1190000009102710" target="_blank">Vuex之理解state</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters' //引入getters
import actions from './actions'   //引入actions
import mutations from  './mutations' //引入mutations

Vue.use(Vuex)
const state ={  
 bookInfo:[{
 id:1,
 bookName:'Vue权威指南',
 imgUrl:'http://i-3.391k.com/2016/9/21/b2235ffb-4fbd-427e-b49f-3b60f1af4492.png',
 price:12},
 {id:2,
 bookName:'Vue实践揭秘',
 imgUrl:'http://img5.imgtn.bdimg.com/it/u=2842506561,1290810338&amp;fm=11&amp;gp=0.jpg',
 price:12}]
}
export  default  new Vuex.Store({//导出store
 state,
 getters,
 mutations,
 actions})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters'</span> <span class="hljs-comment">//引入getters</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>   <span class="hljs-comment">//引入actions</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span>  <span class="hljs-string">'./mutations'</span> <span class="hljs-comment">//引入mutations</span>

Vue.use(Vuex)
<span class="hljs-keyword">const</span> state ={  
 <span class="hljs-attr">bookInfo</span>:[{
 <span class="hljs-attr">id</span>:<span class="hljs-number">1</span>,
 <span class="hljs-attr">bookName</span>:<span class="hljs-string">'Vue权威指南'</span>,
 <span class="hljs-attr">imgUrl</span>:<span class="hljs-string">'http://i-3.391k.com/2016/9/21/b2235ffb-4fbd-427e-b49f-3b60f1af4492.png'</span>,
 <span class="hljs-attr">price</span>:<span class="hljs-number">12</span>},
 {<span class="hljs-attr">id</span>:<span class="hljs-number">2</span>,
 <span class="hljs-attr">bookName</span>:<span class="hljs-string">'Vue实践揭秘'</span>,
 <span class="hljs-attr">imgUrl</span>:<span class="hljs-string">'http://img5.imgtn.bdimg.com/it/u=2842506561,1290810338&amp;fm=11&amp;gp=0.jpg'</span>,
 <span class="hljs-attr">price</span>:<span class="hljs-number">12</span>}]
}
<span class="hljs-keyword">export</span>  <span class="hljs-keyword">default</span>  <span class="hljs-keyword">new</span> Vuex.Store({<span class="hljs-comment">//导出store</span>
 state,
 getters,
 mutations,
 actions})</code></pre>
</li>
</ul>
</li>
<li>
<p>(5)<code>main.js</code><br> 主文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import Vue from 'vue'
 import App from './App'
 import iview from 'iview'  //引入iview
 import  router from './router/index'
 import 'iview/dist/styles/iview.css'//引入iview的css文件
 import store from './store'//引入store状态管理

 Vue.config.productionTip = false

 Vue.use(iview)

 new Vue({
   el: '#app',
   router,
   store,
   template: '<App/>',
   components: { App }
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code> <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
 <span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
 <span class="hljs-keyword">import</span> iview <span class="hljs-keyword">from</span> <span class="hljs-string">'iview'</span>  <span class="hljs-comment">//引入iview</span>
 <span class="hljs-keyword">import</span>  router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router/index'</span>
 <span class="hljs-keyword">import</span> <span class="hljs-string">'iview/dist/styles/iview.css'</span><span class="hljs-comment">//引入iview的css文件</span>
 <span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span><span class="hljs-comment">//引入store状态管理</span>

 Vue.config.productionTip = <span class="hljs-keyword">false</span>

 Vue.use(iview)

 <span class="hljs-keyword">new</span> Vue({
   el: <span class="hljs-string">'#app'</span>,
   router,
   store,
   template: <span class="hljs-string">'&lt;App/&gt;'</span>,
   components: { App }
 })</code></pre>
</li>
<li>
<p>（6）组件代码<br>  这里用删除组件举例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;listContainer&quot;>
 <Col span=&quot;5&quot; offset=&quot;1&quot; v-for=&quot;（book ,index）in books&quot; :key=&quot;index&quot; class=&quot;text&quot;>
 //v-for循环拿到每本书，注意key，不然会警告
 <Card >
   <p slot=&quot;title&quot;>"{{"book.bookName"}}"</p>
   <img  class=&quot;bookimg&quot; :src=&quot;book.imgUrl&quot; alt=&quot;&quot;>
   <p>售价："{{"book.price"}}"</p>
   <Icon type=&quot;close-round&quot;></Icon>
   <Button type=&quot;error&quot; @click=&quot;deleteBook(book.id)&quot;>删除</Button>
   //点击时触发删除函数，将要删除的图书id传过去
 </Card>
 </Col>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default{
 name: 'Home',
 computed:{
   ...mapGetters({//拿到getters里面的函数
     books:'books'  
   })
 },
 methods:{
   deleteBook(id){
     this.$store.dispatch('deleteBook',id)
     //用dispatch方法触发actions里面deleteBook函数，并传入id
   }
 }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"listContainer"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">Col</span> <span class="hljs-attr">span</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">offset</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"（book ,index）in books"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>
 //v-for循环拿到每本书，注意key，不然会警告
 <span class="hljs-tag">&lt;<span class="hljs-name">Card</span> &gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span></span><span class="hljs-template-variable">"{{"book.bookName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">img</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"bookimg"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"book.imgUrl"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>售价：</span><span class="hljs-template-variable">"{{"book.price"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"close-round"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Icon</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"error"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteBook(book.id)"</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
   //点击时触发删除函数，将要删除的图书id传过去
 <span class="hljs-tag">&lt;/<span class="hljs-name">Card</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">Col</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
 <span class="hljs-attr">name</span>: <span class="hljs-string">'Home'</span>,
 <span class="hljs-attr">computed</span>:{
   ...mapGetters({<span class="hljs-comment">//拿到getters里面的函数</span>
     books:<span class="hljs-string">'books'</span>  
   })
 },
 <span class="hljs-attr">methods</span>:{
   deleteBook(id){
     <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'deleteBook'</span>,id)
     <span class="hljs-comment">//用dispatch方法触发actions里面deleteBook函数，并传入id</span>
   }
 }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
</li>
<li><p><code>update增加购物车</code><br><a href="https://hk-kevin.github.io/vue_Book/#/home" rel="nofollow noreferrer" target="_blank">demo地址</a><br><a href="https://github.com/HK-Kevin/vue_Book" rel="nofollow noreferrer" target="_blank">源码地址</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli+vue-router+vuex+iview书店案例（简单易学）

## 原文链接
[https://segmentfault.com/a/1190000009330778](https://segmentfault.com/a/1190000009330778)

